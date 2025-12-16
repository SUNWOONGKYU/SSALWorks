# Supabase RLS 정책 오류

## 질문
Supabase에서 데이터를 INSERT/UPDATE/DELETE할 때 권한 오류가 발생해요.

## 답변

### 원인
Row Level Security(RLS) 정책이 활성화되어 있고, 해당 작업에 대한 권한이 없는 경우 발생합니다.

### 개발 환경 vs 프로덕션 환경

**개발 환경 (현재 SSAL Works)**
```sql
-- anon 역할도 INSERT/UPDATE/DELETE 허용
CREATE POLICY "Allow anon insert" ON learning_contents
    FOR INSERT TO anon WITH CHECK (true);
```

**프로덕션 환경 (배포 시 적용 필요)**
```sql
-- authenticated 역할만 INSERT/UPDATE/DELETE 허용
CREATE POLICY "Allow authenticated insert" ON learning_contents
    FOR INSERT TO authenticated WITH CHECK (true);
```

### 현재 적용된 RLS 파일

| 테이블 | 개발용 파일 | 프로덕션 파일 |
|--------|------------|--------------|
| learning_contents | `07_learning_contents_rls_dev.sql` | `07_learning_contents_rls.sql` |
| faqs | `10_faqs_rls_dev.sql` | `10_faqs_rls.sql` |

### ⚠️ 배포 전 필수 작업

**반드시 프로덕션 RLS 정책으로 교체:**
1. Supabase SQL Editor 접속
2. 개발용 정책 삭제
3. 프로덕션 정책 적용

```sql
-- 1. 기존 정책 삭제
DROP POLICY IF EXISTS "Allow anon insert" ON learning_contents;

-- 2. 프로덕션 정책 적용
-- 07_learning_contents_rls.sql 실행
```

### 관련 문서
- `P3_프로토타입_제작/Database/` - RLS SQL 파일들
- `CLAUDE.md` - RLS 정책 경고 섹션
