# Task Instruction - S2S1

## Task ID
S2S1

## Task Name
인증 미들웨어

## Task Goal
Serverless API용 인증 미들웨어 및 토큰 검증 구현

## Prerequisites (Dependencies)
- S2BA1 (Google OAuth Serverless API) 완료

## Specific Instructions

### 1. 인증 미들웨어 생성
- 위치: `api/lib/auth/middleware.js`

```javascript
// api/lib/auth/middleware.js
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function verifyAuth(req) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { user: null, error: 'No token provided' };
  }

  const token = authHeader.replace('Bearer ', '');

  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    return { user: null, error: 'Invalid token' };
  }

  return { user, error: null };
}

module.exports = { verifyAuth };
```

### 2. 인증 필수 API 래퍼
```javascript
// api/lib/auth/withAuth.js
const { verifyAuth } = require('./middleware');

function withAuth(handler) {
  return async (req, res) => {
    const { user, error } = await verifyAuth(req);

    if (error) {
      return res.status(401).json({ error });
    }

    req.user = user;
    return handler(req, res);
  };
}

module.exports = { withAuth };
```

### 3. 사용 예시
```javascript
// api/protected-endpoint.js
const { withAuth } = require('./lib/auth/withAuth');

module.exports = withAuth(async (req, res) => {
  const { user } = req;
  res.status(200).json({ message: `Hello, ${user.email}` });
});
```

### 4. 토큰 갱신 처리
```javascript
// 클라이언트 측
const { data: { session } } = await supabase.auth.getSession();
if (session) {
  // Authorization 헤더에 access_token 사용
  fetch('/api/protected', {
    headers: {
      'Authorization': `Bearer ${session.access_token}`
    }
  });
}
```

### 5. 에러 응답 표준화
```javascript
// api/lib/auth/errors.js
const AUTH_ERRORS = {
  NO_TOKEN: { code: 'AUTH_001', message: 'No token provided' },
  INVALID_TOKEN: { code: 'AUTH_002', message: 'Invalid token' },
  TOKEN_EXPIRED: { code: 'AUTH_003', message: 'Token expired' }
};

module.exports = { AUTH_ERRORS };
```

## Expected Output Files
- `api/lib/auth/middleware.js`
- `api/lib/auth/withAuth.js`
- `api/lib/auth/errors.js`

## Completion Criteria
- [ ] 인증 미들웨어 구현
- [ ] withAuth 래퍼 함수 구현
- [ ] 에러 응답 표준화
- [ ] 토큰 검증 테스트
- [ ] 보호된 API 엔드포인트 테스트

## Tech Stack
- Vercel Serverless Functions
- Supabase Auth
- JWT

## Tools
- Write, Read
- Bash (API 테스트)

## Execution Type
AI-Only

## Remarks
- Supabase JWT는 자동으로 서명 검증됨
- 토큰 만료 시 클라이언트에서 갱신 필요
- Service Role Key는 서버에서만 사용
