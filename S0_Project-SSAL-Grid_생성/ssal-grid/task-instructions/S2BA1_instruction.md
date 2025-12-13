# Task Instruction - S2BA1

## Task ID
S2BA1

## Task Name
Google OAuth Serverless API

## Task Goal
Google OAuth 인증을 위한 Serverless API 엔드포인트 구현 (/api/auth/google, /api/auth/google/callback)

## Prerequisites (Dependencies)
- S1S1 (Supabase Auth Provider 설정) 완료

## Specific Instructions

### 1. OAuth 시작 API
- 위치: `api/auth/google.js`

```javascript
// api/auth/google.js
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

module.exports = async (req, res) => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.APP_URL}/api/auth/google/callback`
    }
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  // OAuth URL로 리다이렉트
  res.redirect(data.url);
};
```

### 2. OAuth 콜백 API
- 위치: `api/auth/google/callback.js`

```javascript
// api/auth/google/callback.js
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

module.exports = async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.redirect('/pages/auth/login.html?error=no_code');
  }

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return res.redirect(`/pages/auth/login.html?error=${encodeURIComponent(error.message)}`);
  }

  // 세션 쿠키 설정 또는 토큰 전달
  // 대시보드로 리다이렉트
  res.redirect('/pages/dashboard/index.html');
};
```

### 3. 로그아웃 API
- 위치: `api/auth/logout.js`

```javascript
// api/auth/logout.js
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

module.exports = async (req, res) => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.redirect('/pages/auth/login.html');
};
```

### 4. Vercel 설정 확인
- `vercel.json`에 API 라우팅 설정 확인

### 5. 에러 처리
- OAuth 실패 시 에러 메시지 전달
- 사용자 친화적 에러 페이지 리다이렉트

## Expected Output Files
- `api/auth/google.js`
- `api/auth/google/callback.js`
- `api/auth/logout.js`

## Completion Criteria
- [ ] OAuth 시작 API 구현
- [ ] OAuth 콜백 API 구현
- [ ] 로그아웃 API 구현
- [ ] Google 로그인 플로우 테스트
- [ ] 에러 처리 구현
- [ ] Vercel 배포 후 테스트

## Tech Stack
- Vercel Serverless Functions
- Supabase Auth
- OAuth 2.0

## Tools
- Write, Read
- Bash (vercel dev 로컬 테스트)

## Execution Type
AI-Only

## Remarks
- Supabase의 내장 OAuth 기능 활용
- 세션 관리는 Supabase가 처리
- 클라이언트 측에서 supabase.auth.getSession() 사용
