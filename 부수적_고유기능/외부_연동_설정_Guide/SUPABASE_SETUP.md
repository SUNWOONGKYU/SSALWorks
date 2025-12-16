# Supabase 설정 가이드

## 1. Supabase 프로젝트 생성

### 1.1 계정 생성
1. https://supabase.com 접속
2. "Start your project" 클릭
3. GitHub 계정으로 로그인

### 1.2 새 프로젝트 생성
1. Dashboard에서 "New Project" 클릭
2. Organization 선택 (없으면 생성)
3. 프로젝트 정보 입력:
   - **Name**: 프로젝트 이름 (예: ssalworks)
   - **Database Password**: 강력한 비밀번호 설정 (저장해둘 것!)
   - **Region**: Northeast Asia (Seoul) 선택
4. "Create new project" 클릭
5. 프로젝트 생성 완료까지 약 2분 대기

---

## 2. API 키 확인

### 2.1 API 키 찾기
1. Supabase Dashboard 접속
2. 좌측 메뉴 → **Project Settings** (톱니바퀴 아이콘)
3. **API** 탭 클릭

### 2.2 필요한 값들
```
Project URL: https://[프로젝트ID].supabase.co
anon (public) key: eyJhbGci... (공개용, 클라이언트에서 사용)
service_role key: eyJhbGci... (비밀, 서버에서만 사용)
```

**주의사항:**
- `anon key`: 클라이언트(브라우저)에서 사용 가능
- `service_role key`: 절대 클라이언트에 노출하면 안 됨! 서버(Serverless)에서만 사용

---

## 3. Authentication 설정

### 3.1 이메일/비밀번호 인증
1. Dashboard → **Authentication** → **Providers**
2. **Email** 활성화 확인
3. 설정 옵션:
   - Confirm email: 이메일 인증 필요 여부
   - Secure email change: 이메일 변경 시 인증

### 3.2 Google OAuth 설정
1. Dashboard → **Authentication** → **Providers**
2. **Google** 클릭하여 활성화
3. 필요한 값 입력:
   - **Client ID**: Google Cloud Console에서 발급
   - **Client Secret**: Google Cloud Console에서 발급
4. **Redirect URL** 복사 (Google Console에 등록 필요)
   ```
   https://[프로젝트ID].supabase.co/auth/v1/callback
   ```

> Google OAuth 상세 설정은 `GOOGLE_OAUTH_SETUP.md` 참조

### 3.3 Redirect URLs 설정
1. Dashboard → **Authentication** → **URL Configuration**
2. 설정:
   - **Site URL**: `https://yourdomain.com` (프로덕션 URL)
   - **Redirect URLs**: 허용할 콜백 URL 추가
     ```
     http://localhost:3000/**
     https://yourdomain.com/**
     https://*.vercel.app/**
     ```

---

## 4. Database 설정

### 4.1 테이블 생성
1. Dashboard → **Table Editor**
2. "Create a new table" 클릭
3. 테이블 정보 입력:
   - Name: 테이블 이름
   - Enable Row Level Security (RLS): 체크 권장

### 4.2 SQL Editor 사용
1. Dashboard → **SQL Editor**
2. "New query" 클릭
3. SQL 작성 후 "Run" 실행

예시:
```sql
CREATE TABLE notices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  important BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 4.3 RLS (Row Level Security) 설정
1. Dashboard → **Authentication** → **Policies**
2. 또는 Table Editor에서 테이블 선택 → RLS 탭

예시 정책:
```sql
-- 모든 사용자 읽기 허용
CREATE POLICY "Anyone can read notices"
ON notices FOR SELECT
TO public
USING (true);

-- 인증된 사용자만 쓰기 허용
CREATE POLICY "Authenticated users can insert"
ON notices FOR INSERT
TO authenticated
WITH CHECK (true);
```

---

## 5. 환경변수 연결

### 5.1 로컬 개발 (.env.local)
```env
SUPABASE_URL=https://[프로젝트ID].supabase.co
SUPABASE_ANON_KEY=[anon key]
SUPABASE_SERVICE_ROLE_KEY=[service_role key]
```

### 5.2 Vercel 환경변수
1. Vercel Dashboard → Project → Settings → Environment Variables
2. 위 3개 값 추가

### 5.3 클라이언트 코드에서 사용
```javascript
const SUPABASE_URL = 'https://[프로젝트ID].supabase.co';
const SUPABASE_ANON_KEY = '[anon key]';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
```

---

## 6. 자주 발생하는 문제

### 6.1 RLS 정책 오류
**증상**: 데이터 조회/삽입 시 빈 결과 또는 권한 오류

**해결**:
1. RLS가 활성화된 테이블인지 확인
2. 적절한 정책이 있는지 확인
3. 개발 중이면 임시로 RLS 비활성화 가능 (프로덕션에서는 비권장)

### 6.2 인증 콜백 오류
**증상**: OAuth 로그인 후 리다이렉트 실패

**해결**:
1. Redirect URLs에 현재 URL이 등록되어 있는지 확인
2. Site URL이 올바른지 확인
3. Provider 설정에서 Client ID/Secret이 맞는지 확인

### 6.3 API 키 오류
**증상**: "Invalid API key" 또는 401 에러

**해결**:
1. API 키가 올바른지 확인 (복사 시 공백 주의)
2. 환경변수가 제대로 로드되는지 확인
3. anon key vs service_role key 구분 확인

---

## 7. 참고 링크

- [Supabase 공식 문서](https://supabase.com/docs)
- [Supabase JavaScript 클라이언트](https://supabase.com/docs/reference/javascript)
- [RLS 가이드](https://supabase.com/docs/guides/auth/row-level-security)
- [Authentication 가이드](https://supabase.com/docs/guides/auth)

---

**Last Updated**: 2025-12-17
