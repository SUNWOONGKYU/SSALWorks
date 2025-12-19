# Supabase 쿼리 최적화

## 요약
필요한 컬럼만 SELECT, 자주 조회하는 컬럼에 인덱스 추가, 복잡한 쿼리는 View로 관리. N+1 문제 피하기.

## 상세

### 기본 원칙

```sql
-- ❌ 모든 컬럼 조회
SELECT * FROM products;

-- ✅ 필요한 컬럼만
SELECT id, name, price FROM products;
```

### 인덱스 추가

```sql
-- 자주 필터링하는 컬럼
CREATE INDEX idx_products_category ON products (category_id);

-- 복합 인덱스
CREATE INDEX idx_orders_user_date ON orders (user_id, created_at);
```

### JavaScript 클라이언트 최적화

```javascript
// ❌ N+1 문제
const orders = await supabase.from('orders').select('*');
for (const order of orders.data) {
  await supabase.from('users').select('*').eq('id', order.user_id);
}

// ✅ JOIN으로 한 번에
const { data } = await supabase
  .from('orders')
  .select('id, total_amount, users (id, email, name)');
```

### View 활용

```sql
CREATE VIEW user_order_summary AS
SELECT u.id, u.email, COUNT(o.id) AS order_count
FROM users u LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.email;
```

### 성능 분석

```sql
EXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = 'uuid';
-- Seq Scan = 느림, Index Scan = 빠름
```

---
📚 더 자세히: Supabase Dashboard → Database → Query Performance
