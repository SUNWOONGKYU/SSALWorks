# Email API Documentation

> **Task ID**: S2BA2
> **작성일**: 2025-12-14
> **목적**: Resend를 사용한 이메일 발송 Serverless API

---

## 📋 개요

이 디렉토리는 Resend 서비스를 활용한 이메일 발송 API를 포함합니다. S2BI1에서 구현한 email 모듈을 기반으로 작동합니다.

**구현된 API**:
1. `POST /api/email/send` - 일반 이메일 발송
2. `POST /api/email/welcome` - 환영 이메일 발송
3. `POST /api/email/password-reset` - 비밀번호 재설정 이메일 발송

---

## 🔧 환경 설정

### 필수 환경 변수

`.env` 파일에 다음 환경 변수가 설정되어 있어야 합니다:

```env
# Resend API Key
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx

# Supabase
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=xxxxx

# Site URL
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Internal API Secret (비밀번호 재설정용)
INTERNAL_API_SECRET=your-secret-key
```

### 의존성

```json
{
  "@supabase/supabase-js": "^2.x",
  "resend": "^2.x"
}
```

---

## 📡 API 명세

### 1. POST /api/email/send

일반 이메일 발송 API

#### Request

**Headers**:
```
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Body**:
```json
{
  "to": "user@example.com",
  "subject": "이메일 제목",
  "html": "<h1>이메일 내용</h1><p>HTML 형식</p>"
}
```

#### Response

**성공 (200 OK)**:
```json
{
  "success": true,
  "data": {
    "id": "resend_email_id_xxx",
    "to": "user@example.com",
    "subject": "이메일 제목"
  },
  "message": "Email sent successfully"
}
```

**실패 (400 Bad Request)**:
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Missing required fields: to, subject, html"
  }
}
```

**실패 (401 Unauthorized)**:
```json
{
  "error": {
    "code": "AUTH_001",
    "message": "No token provided"
  }
}
```

**실패 (500 Internal Server Error)**:
```json
{
  "error": {
    "code": "EMAIL_SEND_ERROR",
    "message": "Failed to send email"
  }
}
```

#### 사용 예시

```javascript
const response = await fetch('/api/email/send', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    to: 'user@example.com',
    subject: '테스트 이메일',
    html: '<h1>안녕하세요</h1><p>테스트 이메일입니다.</p>'
  })
});

const data = await response.json();
console.log(data);
```

---

### 2. POST /api/email/welcome

신규 가입자 환영 이메일 발송 API

#### Request

**Headers**:
```
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Body**:
```json
{
  "to": "newuser@example.com",
  "name": "홍길동",
  "dashboardUrl": "https://yourdomain.com/dashboard" // 선택 필드
}
```

#### Response

**성공 (200 OK)**:
```json
{
  "success": true,
  "data": {
    "id": "resend_email_id_xxx",
    "to": "newuser@example.com",
    "name": "홍길동"
  },
  "message": "Welcome email sent successfully"
}
```

**실패 (400 Bad Request)**:
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Missing required fields: to, name"
  }
}
```

#### 사용 예시

```javascript
// 회원가입 성공 후 환영 이메일 발송
const response = await fetch('/api/email/welcome', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    to: user.email,
    name: user.name,
    dashboardUrl: 'https://yourdomain.com/dashboard'
  })
});

const data = await response.json();
if (data.success) {
  console.log('환영 이메일 발송 완료');
}
```

---

### 3. POST /api/email/password-reset

비밀번호 재설정 이메일 발송 API

#### Request

**Headers**:
```
Authorization: Bearer {access_token}
Content-Type: application/json

# 또는 내부 호출용
X-Internal-Call: {INTERNAL_API_SECRET}
Content-Type: application/json
```

**Body**:
```json
{
  "to": "user@example.com",
  "name": "홍길동",
  "resetToken": "secure-reset-token-xxxxxx",
  "expiryMinutes": 30 // 선택 필드 (기본값: 30분)
}
```

#### Response

**성공 (200 OK)**:
```json
{
  "success": true,
  "data": {
    "id": "resend_email_id_xxx",
    "to": "user@example.com",
    "name": "홍길동",
    "expiresIn": "30 minutes"
  },
  "message": "Password reset email sent successfully"
}
```

**실패 (400 Bad Request)**:
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid reset token format"
  }
}
```

#### 사용 예시

```javascript
// 외부 호출 (인증 필요)
const response = await fetch('/api/email/password-reset', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    to: user.email,
    name: user.name,
    resetToken: generatedToken,
    expiryMinutes: 30
  })
});

// 내부 호출 (서버 간 통신)
const response = await fetch('/api/email/password-reset', {
  method: 'POST',
  headers: {
    'X-Internal-Call': process.env.INTERNAL_API_SECRET,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    to: user.email,
    name: user.name,
    resetToken: generatedToken
  })
});

const data = await response.json();
if (data.success) {
  console.log('비밀번호 재설정 이메일 발송 완료');
}
```

---

## 🔐 인증

모든 API는 기본적으로 Bearer Token 인증을 요구합니다.

### Bearer Token 인증

```
Authorization: Bearer {access_token}
```

- `access_token`은 Supabase Auth를 통해 발급받은 JWT 토큰입니다.
- 토큰은 `S2_개발-1차/Security/api/lib/auth/middleware.js`의 `verifyAuth()` 함수로 검증됩니다.

### 내부 호출 (비밀번호 재설정 전용)

비밀번호 재설정 API는 서버 간 통신을 위해 내부 호출 방식도 지원합니다:

```
X-Internal-Call: {INTERNAL_API_SECRET}
```

---

## 🏗️ 파일 구조

```
S2_개발-1차/Backend_APIs/api/email/
├── send.js              # 일반 이메일 발송 API
├── welcome.js           # 환영 이메일 발송 API
├── password-reset.js    # 비밀번호 재설정 이메일 발송 API
└── README.md            # 이 파일

Production/Backend_APIs/api/email/
├── send.js              # (동일한 파일)
├── welcome.js           # (동일한 파일)
├── password-reset.js    # (동일한 파일)
└── README.md            # (동일한 파일)
```

---

## 🔗 관련 모듈

### Email 모듈 (S2BI1)

이 API들은 다음 모듈을 사용합니다:

- **위치**: `S2_개발-1차/Backend_Infra/api/lib/email/`
- **함수**:
  - `sendEmail()` - 기본 이메일 발송
  - `sendWelcomeEmail()` - 환영 이메일 발송
  - `sendPasswordResetEmail()` - 비밀번호 재설정 이메일 발송

### 인증 미들웨어 (S2S1)

토큰 검증은 다음 미들웨어를 사용합니다:

- **위치**: `S2_개발-1차/Security/api/lib/auth/middleware.js`
- **함수**: `verifyAuth(req)`

---

## 📊 에러 코드

| 코드 | 설명 | HTTP Status |
|------|------|-------------|
| `METHOD_NOT_ALLOWED` | POST 메서드가 아닌 경우 | 405 |
| `AUTH_001` | 인증 토큰이 없는 경우 | 401 |
| `AUTH_002` | 유효하지 않은 토큰 | 401 |
| `AUTH_003` | 토큰 만료 | 401 |
| `VALIDATION_ERROR` | 필수 필드 누락 또는 형식 오류 | 400 |
| `EMAIL_SEND_ERROR` | 이메일 발송 실패 | 500 |
| `INTERNAL_ERROR` | 예상치 못한 서버 오류 | 500 |

---

## 🧪 테스트

### Postman/Insomnia 테스트

**1. 일반 이메일 발송 테스트**:
```
POST /api/email/send
Authorization: Bearer {your_token}
Content-Type: application/json

{
  "to": "test@example.com",
  "subject": "테스트 이메일",
  "html": "<h1>테스트</h1>"
}
```

**2. 환영 이메일 발송 테스트**:
```
POST /api/email/welcome
Authorization: Bearer {your_token}
Content-Type: application/json

{
  "to": "newuser@example.com",
  "name": "테스트 사용자"
}
```

**3. 비밀번호 재설정 이메일 테스트**:
```
POST /api/email/password-reset
Authorization: Bearer {your_token}
Content-Type: application/json

{
  "to": "user@example.com",
  "name": "테스트 사용자",
  "resetToken": "test_token_12345678901234567890"
}
```

---

## 📝 주의사항

1. **이메일 형식 검증**: 모든 API는 이메일 주소 형식을 검증합니다.
2. **토큰 보안**: Bearer 토큰은 절대 클라이언트에 노출하지 마세요.
3. **Rate Limiting**: Resend는 무료 플랜 기준 월 100개 제한이 있습니다.
4. **환경 변수**: 프로덕션 환경에서는 `.env` 파일이 아닌 Vercel 환경 변수를 사용하세요.
5. **리셋 토큰**: 비밀번호 재설정 토큰은 최소 20자 이상이어야 합니다.

---

## 🚀 배포

### Vercel 배포 시 설정

1. **환경 변수 설정** (Vercel Dashboard):
   ```
   RESEND_API_KEY=...
   SUPABASE_URL=...
   SUPABASE_SERVICE_ROLE_KEY=...
   NEXT_PUBLIC_SITE_URL=...
   INTERNAL_API_SECRET=...
   ```

2. **Serverless Function 설정** (`vercel.json`):
   ```json
   {
     "functions": {
       "api/email/*.js": {
         "memory": 1024,
         "maxDuration": 10
       }
     }
   }
   ```

---

## 📚 참고 자료

- [Resend 공식 문서](https://resend.com/docs)
- [Supabase Auth 문서](https://supabase.com/docs/guides/auth)
- [Vercel Serverless Functions](https://vercel.com/docs/functions/serverless-functions)

---

**작성자**: Claude (S2BA2)
**최종 수정일**: 2025-12-14
