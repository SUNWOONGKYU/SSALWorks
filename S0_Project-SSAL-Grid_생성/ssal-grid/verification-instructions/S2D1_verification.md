# Verification Instruction - S2D1

## Task ID
S2D1

## Task Name
인덱스 최적화

## Verification Checklist

### 1. 인덱스 SQL 파일 검증
- [ ] indexes.sql 파일 존재
- [ ] 모든 필요 인덱스 정의

### 2. users 테이블 인덱스
- [ ] idx_users_email 존재
- [ ] idx_users_created_at 존재

### 3. subscriptions 테이블 인덱스
- [ ] idx_subscriptions_user_id 존재
- [ ] idx_subscriptions_status 존재
- [ ] idx_subscriptions_end_date 존재

### 4. ai_usage_logs 테이블 인덱스
- [ ] idx_ai_usage_user_id 존재
- [ ] idx_ai_usage_created_at 존재

### 5. learning_contents 테이블 인덱스
- [ ] idx_learning_category 존재
- [ ] idx_learning_order 존재

### 6. 성능 검증
```sql
-- 쿼리 실행 계획 확인
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@example.com';
```

## Test Commands
```sql
-- 인덱스 목록 확인
SELECT tablename, indexname FROM pg_indexes WHERE schemaname = 'public';

-- 인덱스 사용 확인
EXPLAIN SELECT * FROM users WHERE email = 'test@example.com';
```

## Expected Results
- 인덱스 SQL 파일 존재
- 모든 인덱스 생성 완료
- 쿼리 성능 향상 확인

## Verification Agent
database-developer

## Pass Criteria
- 8개 이상 인덱스 생성
- 주요 쿼리에서 인덱스 사용 확인
- EXPLAIN 결과 Index Scan 확인

---

## ⚠️ 저장 위치 검증 항목

### 필수 검증
- [ ] Task ID의 Stage에 맞는 폴더에 저장되었는가? (S1→S1_개발_준비/, S2→S2_개발-1차/, ...)
- [ ] Task ID의 Area에 맞는 폴더에 저장되었는가? (S→Security/, F→Frontend/, ...)
- [ ] Production 관련 코드(F, BA, D)는 Production 폴더에도 저장되었는가?

