# Supabase 쿼리 최적화

## 핵심 요약

데이터베이스 성능을 위해 자주 조회하는 컬럼에 인덱스를 추가하고, 필요한 컬럼만 SELECT하세요. 복잡한 쿼리는 View로 만들면 관리와 성능 모두 개선됩니다.

## 쿼리 최적화 기본 원칙

### 1. 필요한 컬럼만 SELECT

```sql
-- ❌ 나쁜 예: 모든 컬럼 조회
SELECT * FROM products;

-- ✅ 좋은 예: 필요한 컬럼만
SELECT id, name, price FROM products;
```

### 2. 적절한 WHERE 조건

```sql
-- ❌ 나쁜 예: 전체 스캔
SELECT * FROM orders WHERE YEAR(created_at) = 2024;

-- ✅ 좋은 예: 인덱스 활용 가능
SELECT * FROM orders
WHERE created_at >= '2024-01-01'
AND created_at < '2025-01-01';
```

### 3. LIMIT 사용

```sql
-- ❌ 나쁜 예: 전체 조회
SELECT * FROM logs;

-- ✅ 좋은 예: 필요한 만큼만
SELECT * FROM logs
ORDER BY created_at DESC
LIMIT 100;
```

## 인덱스 활용

### 인덱스가 필요한 컬럼

| 상황 | 인덱스 대상 |
|------|------------|
| WHERE 조건 | 자주 필터링하는 컬럼 |
| JOIN | 외래키 컬럼 |
| ORDER BY | 정렬 기준 컬럼 |
| UNIQUE 제약 | 고유값 확인 컬럼 |

### 인덱스 생성

```sql
-- 단일 컬럼 인덱스
CREATE INDEX idx_products_category
ON products (category_id);

-- 복합 인덱스 (자주 함께 조회되는 컬럼)
CREATE INDEX idx_orders_user_date
ON orders (user_id, created_at);

-- 부분 인덱스 (특정 조건만)
CREATE INDEX idx_active_users
ON users (email)
WHERE is_active = true;
```

### 인덱스 확인

```sql
-- 테이블의 인덱스 목록
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'products';
```

### 인덱스 삭제

```sql
DROP INDEX idx_products_category;
```

## View 활용

### View란?

```
View = 저장된 쿼리
- 복잡한 쿼리를 이름 붙여 저장
- 테이블처럼 SELECT 가능
- 코드 재사용성 향상
- 복잡도 감소
```

### View 생성

```sql
-- 복잡한 쿼리를 View로
CREATE VIEW user_order_summary AS
SELECT
  u.id,
  u.email,
  COUNT(o.id) AS order_count,
  SUM(o.total_amount) AS total_spent,
  MAX(o.created_at) AS last_order_date
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.email;
```

### View 사용

```sql
-- 간단하게 조회
SELECT * FROM user_order_summary
WHERE total_spent > 100000;
```

### Materialized View (성능 극대화)

```sql
-- 결과를 물리적으로 저장 (빠른 조회)
CREATE MATERIALIZED VIEW mv_daily_stats AS
SELECT
  DATE(created_at) AS date,
  COUNT(*) AS order_count,
  SUM(total_amount) AS revenue
FROM orders
GROUP BY DATE(created_at);

-- 데이터 갱신
REFRESH MATERIALIZED VIEW mv_daily_stats;
```

## Supabase JavaScript 클라이언트 최적화

### 필요한 컬럼만 선택

```javascript
// ❌ 나쁜 예
const { data } = await supabase
  .from('products')
  .select('*');

// ✅ 좋은 예
const { data } = await supabase
  .from('products')
  .select('id, name, price, thumbnail');
```

### 관계 데이터 효율적 조회

```javascript
// ❌ 나쁜 예: N+1 문제
const orders = await supabase.from('orders').select('*');
for (const order of orders.data) {
  const user = await supabase
    .from('users')
    .select('*')
    .eq('id', order.user_id);
}

// ✅ 좋은 예: JOIN
const { data } = await supabase
  .from('orders')
  .select(`
    id,
    total_amount,
    users (id, email, name)
  `);
```

### 페이지네이션

```javascript
// 페이지네이션으로 대량 데이터 처리
const { data } = await supabase
  .from('products')
  .select('id, name, price')
  .range(0, 19)  // 첫 20개
  .order('created_at', { ascending: false });
```

## 쿼리 성능 분석

### EXPLAIN 사용

```sql
-- 쿼리 실행 계획 확인
EXPLAIN ANALYZE
SELECT * FROM orders
WHERE user_id = 'uuid-here';

-- 결과 해석:
-- Seq Scan: 전체 스캔 (느림)
-- Index Scan: 인덱스 사용 (빠름)
-- cost: 예상 비용
-- actual time: 실제 소요 시간
```

### 느린 쿼리 찾기

```sql
-- Supabase Dashboard → Database → Query Performance
-- 또는 pg_stat_statements 확장 사용
```

## 최적화 요청 예시

### Claude Code에게 요청

```
"products 테이블 쿼리 최적화해줘:
- 카테고리별 검색이 자주 됨
- 가격 범위 필터 자주 사용
- 생성일 기준 정렬

필요한 인덱스 SQL 만들어줘"
```

```
"주문 통계 View 만들어줘:
- 일별 주문 수
- 일별 매출
- 일별 평균 주문 금액

Materialized View로 만들어줘"
```

## 최적화 체크리스트

### 쿼리 작성 시

- [ ] SELECT *가 아닌 필요한 컬럼만 지정
- [ ] WHERE 조건에 인덱스 활용 가능한가?
- [ ] LIMIT 사용했는가?
- [ ] N+1 문제 없는가?

### 인덱스 점검

- [ ] 자주 사용하는 WHERE 컬럼에 인덱스 있는가?
- [ ] 외래키에 인덱스 있는가?
- [ ] 불필요한 인덱스는 없는가?

### 성능 모니터링

- [ ] 느린 쿼리 확인했는가?
- [ ] EXPLAIN으로 실행 계획 확인했는가?
- [ ] 정기적으로 성능 점검하는가?

## 주의사항

- 인덱스가 많으면 INSERT/UPDATE 느려짐
- 인덱스는 적절한 균형이 중요
- Materialized View는 수동 갱신 필요
- SELECT *는 네트워크 비용 증가
- 복잡한 쿼리는 View로 관리
- 프로덕션 DB에서 EXPLAIN 시 주의

