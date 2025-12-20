# 데이터베이스 설정 가이드 (Part B - Claude Code용)

> 기술 참조 문서: 테이블 생성, RLS 정책, 환경변수 설정

**대상**: Claude Code / 개발자
**전제조건**: Part A 완료 (Supabase 프로젝트 생성, API 키 확보)

---

## 1. 환경변수 설정

### 1.1 필요한 환경변수

```bash
# Supabase 연결 정보
SUPABASE_URL=https://[프로젝트ID].supabase.co
SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
```

### 1.2 Vercel 환경변수 등록

```
Vercel Dashboard → Project → Settings → Environment Variables

| Key                       | Environment |
|---------------------------|-------------|
| SUPABASE_URL              | All         |
| SUPABASE_ANON_KEY         | All         |
| SUPABASE_SERVICE_ROLE_KEY | All         |
```

### 1.3 클라이언트 연결 코드

```javascript
// 브라우저용 (anon key만 사용)
const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// 서버용 (service_role key 사용, RLS 우회)
const supabaseAdmin = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY
);
```

---

## 2. Database 테이블 생성

### 2.1 SQL Editor 접근

```
Supabase Dashboard → SQL Editor → New query
```

### 2.2 기본 테이블 SQL

#### users 테이블
```sql
CREATE TABLE users (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  nickname TEXT,
  name TEXT,
  role TEXT DEFAULT 'user',
  is_active BOOLEAN DEFAULT true,
  subscription_status TEXT DEFAULT 'none',
  terms_agreed BOOLEAN DEFAULT false,
  privacy_agreed BOOLEAN DEFAULT false,
  marketing_agreed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
```

#### notices 테이블
```sql
CREATE TABLE notices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  important BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE notices ENABLE ROW LEVEL SECURITY;
```

#### user_payment_methods 테이블
```sql
CREATE TABLE user_payment_methods (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
  billing_key TEXT NOT NULL,
  card_company TEXT,
  card_number_masked TEXT,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE user_payment_methods ENABLE ROW LEVEL SECURITY;
```

### 2.3 테이블 확인 쿼리

```sql
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public';
```

---

## 3. RLS (Row Level Security) 정책

### 3.1 RLS 개념

| Role | 설명 |
|------|------|
| `public` | 모든 사용자 (비로그인 포함) |
| `anon` | 익명 사용자 |
| `authenticated` | 로그인한 사용자 |

| 작업 | SQL |
|------|-----|
| 조회 | `SELECT` |
| 생성 | `INSERT` |
| 수정 | `UPDATE` |
| 삭제 | `DELETE` |

### 3.2 users 테이블 RLS 정책

```sql
-- 본인 데이터만 조회
CREATE POLICY "Users can view own data"
ON users FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- 본인 데이터만 수정
CREATE POLICY "Users can update own data"
ON users FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- 회원가입 시 프로필 생성
CREATE POLICY "Users can insert own profile"
ON users FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);
```

### 3.3 notices 테이블 RLS 정책 (공개 읽기)

```sql
-- 모든 사용자 읽기 허용
CREATE POLICY "Anyone can read notices"
ON notices FOR SELECT
TO public
USING (true);

-- 인증된 사용자만 쓰기
CREATE POLICY "Authenticated users can insert"
ON notices FOR INSERT
TO authenticated
WITH CHECK (true);
```

### 3.4 정책 확인 쿼리

```sql
SELECT * FROM pg_policies WHERE tablename = 'users';
SELECT * FROM pg_policies WHERE tablename = 'notices';
```

---

## 4. 트러블슈팅

### 문제 1: 빈 결과 반환

**증상**: 데이터가 있는데 조회 시 빈 배열

**원인**: RLS 활성화 후 정책 미설정

**해결**:
```sql
-- 정책 확인
SELECT * FROM pg_policies WHERE tablename = '테이블명';

-- 개발 중 임시 비활성화 (프로덕션 금지!)
ALTER TABLE [테이블명] DISABLE ROW LEVEL SECURITY;
```

### 문제 2: 권한 오류 (403/401)

**증상**: "permission denied for table"

**해결**:
1. 서버에서는 `service_role key` 사용
2. 클라이언트는 적절한 RLS 정책 추가

### 문제 3: API 키 오류

**증상**: "Invalid API key"

**해결**:
1. 키 복사 시 공백 확인
2. anon key vs service_role key 구분

### 문제 4: Foreign Key 오류

**증상**: "violates foreign key constraint"

**해결**:
1. 참조 테이블에 데이터 먼저 생성
2. `ON DELETE CASCADE` 옵션 확인

---

## 5. 보안 주의사항

### 금지 사항
- ❌ `service_role key`를 클라이언트(브라우저)에 노출
- ❌ 프로덕션에서 RLS 비활성화
- ❌ `public` 역할에 INSERT/UPDATE/DELETE 허용

### 권장 사항
- ✅ 최소 권한 원칙 적용
- ✅ 민감 테이블은 `authenticated` 역할만 허용
- ✅ 정기적인 RLS 정책 검토

---

## 6. 유용한 쿼리

### 테이블 목록
```sql
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public';
```

### RLS 상태 확인
```sql
SELECT tablename, rowsecurity FROM pg_tables
WHERE schemaname = 'public';
```

### 정책 목록
```sql
SELECT schemaname, tablename, policyname, cmd, roles
FROM pg_policies
WHERE schemaname = 'public';
```

---

## 참고 문서

- [Supabase 공식 문서](https://supabase.com/docs)
- [RLS 가이드](https://supabase.com/docs/guides/auth/row-level-security)
- [PostgreSQL 정책 문법](https://www.postgresql.org/docs/current/sql-createpolicy.html)
