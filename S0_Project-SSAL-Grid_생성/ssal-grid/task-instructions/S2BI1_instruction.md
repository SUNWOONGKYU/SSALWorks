# Task Instruction - S2BI1

## Task ID
S2BI1

## Task Name
Resend 이메일 서비스 설정

## Task Goal
Resend API 키 설정, 도메인 인증, 발신자 설정

## Prerequisites (Dependencies)
- S1BI1 (환경변수 설정) 완료

## Specific Instructions

### 1. Resend 계정 설정
- Resend (https://resend.com) 가입
- API Key 생성
- 환경변수에 추가: `RESEND_API_KEY`

### 2. 도메인 인증 (선택사항)
- Resend Dashboard > Domains
- ssalworks.com 추가
- DNS 레코드 설정:
  - SPF 레코드
  - DKIM 레코드
  - 검증 대기

### 3. 발신자 설정
- 도메인 인증 전: `onboarding@resend.dev` 사용
- 도메인 인증 후: `noreply@ssalworks.com` 사용

### 4. 이메일 템플릿 구조 생성
```
api/
├── lib/
│   └── email/
│       ├── resend.js          # Resend 클라이언트
│       └── templates/
│           ├── welcome.js      # 환영 이메일
│           └── password-reset.js # 비밀번호 재설정
```

### 5. Resend 클라이언트 설정
```javascript
// api/lib/email/resend.js
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = { resend };
```

### 6. 테스트 이메일 발송
```javascript
const { resend } = require('./resend');

await resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'test@example.com',
  subject: 'SSALWorks 테스트',
  html: '<p>테스트 이메일입니다.</p>'
});
```

## Expected Output Files
- `api/lib/email/resend.js`
- `api/lib/email/templates/welcome.js`
- `api/lib/email/templates/password-reset.js`
- `docs/EMAIL_SETUP.md`

## Completion Criteria
- [ ] Resend 계정 생성
- [ ] API Key 환경변수 설정
- [ ] Resend 클라이언트 파일 생성
- [ ] 이메일 템플릿 구조 생성
- [ ] 테스트 이메일 발송 성공
- [ ] 설정 문서 작성

## Tech Stack
- Resend
- Node.js

## Tools
- Write, Read
- Bash (npm install resend)
- WebFetch (Resend Dashboard)

## Execution Type
Human-AI (Resend Dashboard 접속 필요)

## Remarks
- 무료 티어: 월 3,000 이메일
- 도메인 인증은 DNS 전파 시간 필요
- 개발 중에는 @resend.dev 도메인 사용 가능

---

## ⚠️ 작업 결과물 저장 2대 규칙

> **이 규칙은 반드시 준수하세요!**

### 제1 규칙: Stage + Area 폴더에 저장
- Task ID의 Stage와 Area에 해당하는 폴더에 저장
- 예: S1S1 → `S1_개발_준비/Security/`
- 예: S2F1 → `S2_개발-1차/Frontend/`

### 제2 규칙: Production 코드는 이중 저장
- Frontend, Database, Backend_APIs 코드는 Stage 폴더 + Production 폴더 둘 다 저장
- 문서(Documentation, Security, Testing, DevOps)는 Stage 폴더에만 저장

**Area 폴더 매핑:** M→Documentation, F→Frontend, BI→Backend_Infra, BA→Backend_APIs, D→Database, S→Security, T→Testing, O→DevOps, E→External, C→Content

