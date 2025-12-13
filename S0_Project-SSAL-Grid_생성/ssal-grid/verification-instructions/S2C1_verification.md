# Verification Instruction - S2C1

## Task ID
S2C1

## Task Name
Books 콘텐츠 업로드

## Verification Checklist

### 1. 콘텐츠 파일 검증
- [ ] 학습용_콘텐츠/1_Claude_사용법/ 폴더 존재
- [ ] MD 파일 목록 확인
- [ ] 파일명 일관성 검증

### 2. SQL 파일 검증
- [ ] seed_learning_contents.sql 존재
- [ ] INSERT 문 형식 정확
- [ ] 모든 콘텐츠 포함

### 3. 데이터 구조 검증
```sql
-- 필수 컬럼 확인
id, title, category, subcategory, content_path, sort_order, is_premium
```

### 4. viewer.html 동기화 검증
- [ ] CONTENTS 객체와 DB 데이터 일치
- [ ] 경로 정보 정확

### 5. 데이터 삽입 확인
```sql
-- 콘텐츠 수 확인
SELECT COUNT(*) FROM learning_contents;

-- 카테고리별 확인
SELECT category, COUNT(*) FROM learning_contents GROUP BY category;
```

## Test Commands
```bash
# 콘텐츠 파일 확인
ls -la 학습용_콘텐츠/1_Claude_사용법/Claude\&ClaudeCode사용법/

# SQL 파일 확인
cat P3_프로토타입_제작/Database/seed_learning_contents.sql
```

## Expected Results
- 콘텐츠 파일 존재
- SQL INSERT 파일 생성
- DB 삽입 성공

## Verification Agent
database-developer

## Pass Criteria
- 모든 콘텐츠 파일 존재
- SQL 파일 유효
- DB에 데이터 삽입 확인
