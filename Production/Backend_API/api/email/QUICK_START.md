# Email API Quick Start Guide

> **Task ID**: S2BA2
> **최종 수정**: 2025-12-14

---

## ⚡ 빠른 시작 (5분 설정)

### 1. 환경 변수 설정

`.env` 파일에 추가:

```env
RESEND_API_KEY=re_xxxxxxxxxxxx
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=xxxxx
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
INTERNAL_API_SECRET=your-random-secret-key
```

### 2. Resend API 키 발급

1. [Resend](https://resend.com) 가입
2. Dashboard → API Keys → Create API Key
3. 복사하여 `.env`에 저장

### 3. 테스트 (curl)

**일반 이메일 발송**:
```bash
curl -X POST http://localhost:3000/api/email/send \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "test@example.com",
    "subject": "테스트",
    "html": "<h1>테스트 이메일</h1>"
  }'
```

**환영 이메일 발송**:
```bash
curl -X POST http://localhost:3000/api/email/welcome \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "newuser@example.com",
    "name": "홍길동"
  }'
```

**비밀번호 재설정 이메일**:
```bash
curl -X POST http://localhost:3000/api/email/password-reset \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "user@example.com",
    "name": "홍길동",
    "resetToken": "secure_token_12345678901234567890"
  }'
```

---

## 📱 프론트엔드 사용 예시

### React/Next.js

```javascript
// 일반 이메일 발송
const sendEmail = async () => {
  const { data: { session } } = await supabase.auth.getSession();

  const response = await fetch('/api/email/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${session.access_token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      to: 'user@example.com',
      subject: '알림',
      html: '<p>메시지 내용</p>'
    })
  });

  const result = await response.json();
  console.log(result);
};

// 환영 이메일 발송 (회원가입 후)
const sendWelcomeEmail = async (user) => {
  const { data: { session } } = await supabase.auth.getSession();

  await fetch('/api/email/welcome', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${session.access_token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      to: user.email,
      name: user.name
    })
  });
};

// 비밀번호 재설정
const sendPasswordResetEmail = async (email, resetToken) => {
  const { data: { session } } = await supabase.auth.getSession();

  await fetch('/api/email/password-reset', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${session.access_token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      to: email,
      name: user.name,
      resetToken: resetToken
    })
  });
};
```

---

## 🔐 인증 토큰 얻기

### Supabase에서 토큰 얻기

```javascript
// 브라우저/프론트엔드
const { data: { session } } = await supabase.auth.getSession();
const token = session.access_token;

// 또는
const { data: { user } } = await supabase.auth.getUser();
const token = (await supabase.auth.getSession()).data.session.access_token;
```

---

## ❌ 자주 발생하는 에러

### 1. 401 Unauthorized - No token provided

**원인**: Authorization 헤더 누락
**해결**:
```javascript
headers: {
  'Authorization': `Bearer ${token}`,  // ← 이거 추가!
  'Content-Type': 'application/json'
}
```

### 2. 400 Validation Error - Invalid email format

**원인**: 이메일 형식 오류
**해결**: 올바른 이메일 주소 사용 (`user@example.com`)

### 3. 500 Email Send Error

**원인**: Resend API 키 미설정 또는 잘못됨
**해결**: `.env` 파일의 `RESEND_API_KEY` 확인

### 4. 400 Validation Error - Invalid reset token format

**원인**: 리셋 토큰이 20자 미만
**해결**: 최소 20자 이상의 토큰 생성
```javascript
const resetToken = crypto.randomBytes(32).toString('hex'); // 64자
```

---

## 📊 응답 형식

### 성공 응답 (200)
```json
{
  "success": true,
  "data": {
    "id": "resend_email_id",
    "to": "user@example.com",
    "subject": "제목" // send API만
  },
  "message": "Email sent successfully"
}
```

### 실패 응답 (4xx/5xx)
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "에러 메시지"
  }
}
```

---

## 🧪 Postman Collection

### 1. General Email Send

```
POST /api/email/send
Headers:
  Authorization: Bearer {{token}}
  Content-Type: application/json

Body (JSON):
{
  "to": "test@example.com",
  "subject": "테스트 이메일",
  "html": "<h1>안녕하세요</h1><p>테스트입니다.</p>"
}
```

### 2. Welcome Email

```
POST /api/email/welcome
Headers:
  Authorization: Bearer {{token}}
  Content-Type: application/json

Body (JSON):
{
  "to": "newuser@example.com",
  "name": "홍길동",
  "dashboardUrl": "https://yourdomain.com/dashboard"
}
```

### 3. Password Reset Email

```
POST /api/email/password-reset
Headers:
  Authorization: Bearer {{token}}
  Content-Type: application/json

Body (JSON):
{
  "to": "user@example.com",
  "name": "홍길동",
  "resetToken": "abc123def456ghi789jkl012mno345pqr678stu901vwx234yz",
  "expiryMinutes": 30
}
```

---

## 🚀 배포 체크리스트

- [ ] Resend API 키 발급 완료
- [ ] Vercel 환경 변수 설정 (RESEND_API_KEY, SUPABASE_URL, etc.)
- [ ] `package.json`에 `resend` 패키지 추가
- [ ] 로컬에서 모든 API 테스트 완료
- [ ] Postman/Insomnia 테스트 완료
- [ ] 프론트엔드 연동 테스트 완료
- [ ] 에러 핸들링 확인
- [ ] Rate Limiting 고려 (Resend 플랜 확인)

---

## 💡 팁

1. **Bearer Token 캐싱**: 프론트엔드에서 토큰을 캐시하여 매번 getSession() 호출 피하기
2. **에러 처리**: try-catch로 감싸서 네트워크 오류 처리
3. **Rate Limiting**: Resend 무료 플랜은 월 100개 제한 → 업그레이드 고려
4. **템플릿 커스터마이징**: `S2_개발-1차/Backend_Infra/api/lib/email/templates/`에서 수정
5. **내부 호출**: 비밀번호 재설정은 서버에서 직접 호출 가능 (X-Internal-Call 헤더 사용)

---

## 📚 더 알아보기

- [전체 API 문서](./README.md)
- [Resend 공식 문서](https://resend.com/docs)
- [Supabase Auth 문서](https://supabase.com/docs/guides/auth)

---

**작성**: Claude (S2BA2)
**최종 수정**: 2025-12-14
