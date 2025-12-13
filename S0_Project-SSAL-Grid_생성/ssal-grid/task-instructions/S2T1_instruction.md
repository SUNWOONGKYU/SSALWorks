# Task Instruction - S2T1

## Task ID
S2T1

## Task Name
인증 API 테스트

## Task Goal
OAuth 및 이메일 API에 대한 단위 테스트 작성

## Prerequisites (Dependencies)
- S2BA1 (Google OAuth Serverless API) 완료
- S2BA2 (이메일 발송 API) 완료

## Specific Instructions

### 1. 테스트 파일 구조
```
tests/
├── unit/
│   └── auth/
│       ├── middleware.test.js
│       └── oauth.test.js
└── integration/
    └── auth/
        ├── google-auth.test.js
        └── email.test.js
```

### 2. 인증 미들웨어 테스트
- 위치: `tests/unit/auth/middleware.test.js`

```javascript
const { verifyAuth } = require('../../../api/lib/auth/middleware');

describe('Auth Middleware', () => {
  test('should return error when no token provided', async () => {
    const req = { headers: {} };
    const result = await verifyAuth(req);
    expect(result.error).toBe('No token provided');
  });

  test('should return error for invalid token', async () => {
    const req = { headers: { authorization: 'Bearer invalid_token' } };
    const result = await verifyAuth(req);
    expect(result.error).toBeTruthy();
  });

  test('should return user for valid token', async () => {
    // Mock valid token test
    // ...
  });
});
```

### 3. OAuth 플로우 테스트
- 위치: `tests/integration/auth/google-auth.test.js`

```javascript
describe('Google OAuth Flow', () => {
  test('GET /api/auth/google should redirect to Google', async () => {
    const response = await fetch('http://localhost:3000/api/auth/google', {
      redirect: 'manual'
    });
    expect(response.status).toBe(302);
    expect(response.headers.get('location')).toContain('accounts.google.com');
  });

  test('GET /api/auth/google/callback without code should redirect with error', async () => {
    const response = await fetch('http://localhost:3000/api/auth/google/callback', {
      redirect: 'manual'
    });
    expect(response.status).toBe(302);
    expect(response.headers.get('location')).toContain('error=no_code');
  });
});
```

### 4. 이메일 API 테스트
- 위치: `tests/integration/auth/email.test.js`

```javascript
describe('Email API', () => {
  test('POST /api/email/password-reset should require email', async () => {
    const response = await fetch('http://localhost:3000/api/email/password-reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('Email is required');
  });

  test('POST /api/email/password-reset with valid email should return 200', async () => {
    const response = await fetch('http://localhost:3000/api/email/password-reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@example.com' })
    });
    expect(response.status).toBe(200);
  });
});
```

### 5. 테스트 실행 스크립트
```json
{
  "scripts": {
    "test:auth": "jest --testPathPattern=tests/.*auth.*"
  }
}
```

## Expected Output Files
- `tests/unit/auth/middleware.test.js`
- `tests/unit/auth/oauth.test.js`
- `tests/integration/auth/google-auth.test.js`
- `tests/integration/auth/email.test.js`

## Completion Criteria
- [ ] 인증 미들웨어 단위 테스트 작성
- [ ] OAuth 통합 테스트 작성
- [ ] 이메일 API 테스트 작성
- [ ] 모든 테스트 통과
- [ ] 코드 커버리지 80% 이상

## Tech Stack
- Jest
- Node.js

## Tools
- Write, Read
- Bash (npm test)

## Execution Type
AI-Only

## Remarks
- Mock 사용하여 외부 의존성 분리
- 통합 테스트는 로컬 서버 실행 필요
- CI/CD에서 자동 실행 설정 필요
