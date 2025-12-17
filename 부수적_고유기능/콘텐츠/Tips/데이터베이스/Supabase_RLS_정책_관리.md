# Supabase RLS 정책 관리

## 핵심 요약

Row Level Security(RLS)는 데이터베이스 보안의 핵심입니다. 개발 환경에서는 완화된 정책을 사용할 수 있지만, 프로덕션 배포 전 반드시 보안이 강화된 원래 정책으로 교체하세요.

## RLS란?

### 기본 개념

```
RLS (Row Level Security):
행 단위로 데이터 접근을 제어하는 PostgreSQL 보안 기능

예시:
- 사용자 A는 자신의 데이터만 볼 수 있음
- 관리자는 모든 데이터를 볼 수 있음
- 비로그인 사용자는 공개 데이터만 볼 수 있음
```

### RLS 없을 때 vs 있을 때

```
❌ RLS 없을 때:
모든 사용자가 모든 데이터에 접근 가능
→ 심각한 보안 취약점

✅ RLS 사용 시:
정책에 따라 접근 제어
→ 데이터 보안 보장
```

## 개발 vs 프로덕션 정책

### 개발 환경 (완화된 정책)

```sql
-- 개발용: 테스트 편의를 위해 완화
-- 파일명: *_rls_dev.sql

CREATE POLICY "dev_allow_all" ON users
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- 특징:
-- - 모든 역할이 모든 작업 가능
-- - 빠른 개발/테스트 가능
-- - ⚠️ 보안 취약
```

### 프로덕션 환경 (강화된 정책)

```sql
-- 프로덕션용: 실제 보안 정책
-- 파일명: *_rls.sql

-- SELECT: 모든 사용자
CREATE POLICY "users_select" ON users
  FOR SELECT USING (true);

-- INSERT: 인증된 사용자만
CREATE POLICY "users_insert" ON users
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- UPDATE/DELETE: 본인만
CREATE POLICY "users_update" ON users
  FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "users_delete" ON users
  FOR DELETE
  USING (auth.uid() = id);
```

## 일반적인 RLS 패턴

### 패턴 1: 본인 데이터만 접근

```sql
-- 프로필, 설정 등 개인 데이터
CREATE POLICY "own_data_only" ON profiles
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
```

### 패턴 2: 공개 읽기 + 인증 쓰기

```sql
-- 게시글, 상품 등
CREATE POLICY "public_read" ON posts
  FOR SELECT USING (true);

CREATE POLICY "auth_write" ON posts
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "owner_update" ON posts
  FOR UPDATE
  USING (auth.uid() = author_id);
```

### 패턴 3: 역할 기반 접근

```sql
-- 관리자/일반 사용자 구분
CREATE POLICY "admin_all" ON sensitive_data
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
      AND role = 'admin'
    )
  );
```

### 패턴 4: 조건부 공개

```sql
-- 공개 설정된 데이터만 공개
CREATE POLICY "public_if_visible" ON posts
  FOR SELECT
  USING (is_public = true OR auth.uid() = author_id);
```

## RLS 정책 관리 절차

### 1단계: 테이블에 RLS 활성화

```sql
-- RLS 활성화 (필수!)
ALTER TABLE 테이블명 ENABLE ROW LEVEL SECURITY;
```

### 2단계: 정책 생성

```sql
CREATE POLICY "정책명" ON 테이블명
  FOR [SELECT|INSERT|UPDATE|DELETE|ALL]
  [TO 역할]
  USING (조건)        -- SELECT/UPDATE/DELETE용
  WITH CHECK (조건);  -- INSERT/UPDATE용
```

### 3단계: 정책 확인

```sql
SELECT * FROM pg_policies WHERE tablename = '테이블명';
```

### 4단계: 정책 수정/삭제

```sql
-- 정책 삭제
DROP POLICY "정책명" ON 테이블명;

-- 정책 수정 (삭제 후 재생성)
DROP POLICY "old_policy" ON 테이블명;
CREATE POLICY "new_policy" ON 테이블명 ...;
```

## 배포 전 체크리스트

### 개발 → 프로덕션 전환

```
⚠️ 배포 전 필수 확인:

1. 개발용 정책(_dev.sql) 식별
2. 프로덕션용 정책(.sql)으로 교체
3. 모든 테이블 RLS 활성화 확인
4. 정책 테스트 (각 역할별)
5. API 테스트 (인증/비인증)
```

### SQL 교체 절차

```sql
-- 1. 개발용 정책 삭제
DROP POLICY IF EXISTS "dev_allow_all" ON 테이블명;

-- 2. 프로덕션용 정책 적용
CREATE POLICY "prod_select" ON 테이블명 ...;
CREATE POLICY "prod_insert" ON 테이블명 ...;
CREATE POLICY "prod_update" ON 테이블명 ...;
CREATE POLICY "prod_delete" ON 테이블명 ...;
```

## Claude Code에게 요청하기

### RLS 정책 작성 요청

```
"users 테이블 RLS 정책 작성해줘:
- 개발용(_dev.sql)과 프로덕션용(.sql) 둘 다
- SELECT: 모든 사용자
- INSERT: 인증된 사용자
- UPDATE/DELETE: 본인만"
```

### 정책 검토 요청

```
"현재 RLS 정책 보안 검토해줘:
[SQL 내용]

보안 취약점 있어?"
```

### 교체 스크립트 요청

```
"개발용 RLS를 프로덕션용으로 교체하는 SQL 만들어줘"
```

## 테스트 방법

### Supabase Dashboard에서

```
1. SQL Editor에서 RLS 테스트
2. Table Editor에서 데이터 접근 테스트
3. API (REST/GraphQL)로 접근 테스트
```

### 역할별 테스트

```sql
-- anon 역할로 테스트
SET ROLE anon;
SELECT * FROM users;  -- 정책에 따라 결과 다름
RESET ROLE;

-- authenticated 역할로 테스트
SET ROLE authenticated;
SELECT * FROM users;
RESET ROLE;
```

## 주의사항

- RLS 미설정 테이블은 모든 데이터 노출됨
- 개발용 정책은 절대 프로덕션에 적용 금지
- 정책 변경 후 반드시 테스트
- `USING`과 `WITH CHECK` 차이 이해 필요
- 복잡한 정책은 성능에 영향 있을 수 있음
- 배포 전 모든 테이블 RLS 상태 확인

## 빠른 참조

### Supabase 역할

| 역할 | 설명 | auth.role() 값 |
|------|------|----------------|
| anon | 비로그인 사용자 | 'anon' |
| authenticated | 로그인 사용자 | 'authenticated' |
| service_role | 서버 전용 (RLS 무시) | - |

### 유용한 함수

```sql
auth.uid()       -- 현재 로그인 사용자 UUID
auth.role()      -- 현재 역할 ('anon'/'authenticated')
auth.email()     -- 현재 사용자 이메일
auth.jwt()       -- JWT 토큰 정보
```

