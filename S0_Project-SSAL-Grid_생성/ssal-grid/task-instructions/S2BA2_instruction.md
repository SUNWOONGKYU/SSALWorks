# Task Instruction - S2BA2

## Task ID
S2BA2

## Task Name
이메일 발송 API (Resend)

## Task Goal
비밀번호 재설정, 환영 메일 발송 API 구현

## Prerequisites (Dependencies)
- S2BI1 (Resend 이메일 서비스 설정) 완료

## Specific Instructions

### 1. 비밀번호 재설정 이메일 API
- 위치: `api/email/password-reset.js`

```javascript
// api/email/password-reset.js
const { Resend } = require('resend');
const { createClient } = require('@supabase/supabase-js');

const resend = new Resend(process.env.RESEND_API_KEY);
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // Supabase 비밀번호 재설정 링크 생성
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.APP_URL}/pages/auth/reset-password.html`
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  // 커스텀 이메일 발송 (선택사항)
  await resend.emails.send({
    from: 'SSALWorks <noreply@ssalworks.com>',
    to: email,
    subject: '[SSALWorks] 비밀번호 재설정',
    html: `
      <h2>비밀번호 재설정</h2>
      <p>아래 버튼을 클릭하여 비밀번호를 재설정하세요.</p>
      <a href="${data.url}" style="background:#10B981;color:white;padding:12px 24px;text-decoration:none;border-radius:8px;">
        비밀번호 재설정
      </a>
      <p>이 링크는 1시간 후 만료됩니다.</p>
    `
  });

  res.status(200).json({ message: 'Password reset email sent' });
};
```

### 2. 환영 이메일 API
- 위치: `api/email/welcome.js`

```javascript
// api/email/welcome.js
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, name } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  await resend.emails.send({
    from: 'SSALWorks <noreply@ssalworks.com>',
    to: email,
    subject: 'SSALWorks에 오신 것을 환영합니다!',
    html: `
      <h2>${name || '회원'}님, 환영합니다!</h2>
      <p>SSALWorks에 가입해 주셔서 감사합니다.</p>
      <p>이제 다양한 학습 콘텐츠와 AI 기능을 이용하실 수 있습니다.</p>
      <a href="${process.env.APP_URL}/pages/dashboard/index.html"
         style="background:#10B981;color:white;padding:12px 24px;text-decoration:none;border-radius:8px;">
        대시보드 바로가기
      </a>
    `
  });

  res.status(200).json({ message: 'Welcome email sent' });
};
```

### 3. 이메일 템플릿 공통화
```javascript
// api/lib/email/templates.js
const passwordResetTemplate = (resetUrl) => `...`;
const welcomeTemplate = (name) => `...`;

module.exports = { passwordResetTemplate, welcomeTemplate };
```

## Expected Output Files
- `api/email/password-reset.js`
- `api/email/welcome.js`
- `api/lib/email/templates.js`

## Completion Criteria
- [ ] 비밀번호 재설정 이메일 API 구현
- [ ] 환영 이메일 API 구현
- [ ] 이메일 템플릿 공통화
- [ ] 이메일 발송 테스트
- [ ] 에러 처리 구현

## Tech Stack
- Resend
- Vercel Serverless Functions
- Supabase Auth

## Tools
- Write, Read
- Bash (API 테스트)

## Execution Type
AI-Only

## Remarks
- 도메인 인증 전에는 발신자를 @resend.dev 사용
- 이메일 템플릿은 반응형으로 작성
