# Verification Instruction - S2BI1

## Task ID
S2BI1

## Task Name
Resend 이메일 서비스 설정

## Verification Checklist

### 1. Resend 계정 및 API 설정 검증
- [ ] Resend 계정 생성 완료
- [ ] API Key 발급 완료
- [ ] 환경변수 `RESEND_API_KEY` 설정 완료

### 2. 파일 존재 검증
- [ ] `api/lib/email/resend.js` - Resend 클라이언트
- [ ] `api/lib/email/templates/welcome.js` - 환영 이메일 템플릿
- [ ] `api/lib/email/templates/password-reset.js` - 비밀번호 재설정 템플릿
- [ ] `docs/EMAIL_SETUP.md` 또는 `S2_개발-1차/Backend_Infra/RESEND_SETUP.md` - 설정 문서

### 3. Resend 클라이언트 구현 검증
- [ ] Resend SDK import
- [ ] API Key 환경변수 사용
- [ ] 클라이언트 인스턴스 export

### 4. ⭐ 실제 작동 테스트 (필수!)
- [ ] 테스트 이메일 발송 성공
- [ ] 발신자 주소 확인 (`onboarding@resend.dev` 또는 인증된 도메인)
- [ ] 수신자에게 이메일 도착 확인
- [ ] Resend Dashboard에서 발송 로그 확인

### 5. 도메인 인증 (선택사항)
- [ ] 커스텀 도메인 추가 (ssalworks.com)
- [ ] SPF 레코드 설정
- [ ] DKIM 레코드 설정
- [ ] 도메인 인증 완료

## Test Commands
```bash
# 로컬 서버 실행 후 테스트
cd Production/Backend_APIs
npm install resend

# 테스트 스크립트 실행 (환경변수 설정 필요)
node -e "
const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'your-email@example.com',
  subject: 'SSALWorks 테스트',
  html: '<p>테스트 이메일입니다.</p>'
}).then(console.log).catch(console.error);
"
```

## Expected Results
- Resend API 연동 성공
- 테스트 이메일 발송 및 수신 확인
- Resend Dashboard에서 발송 기록 확인

## Verification Agent
devops-troubleshooter

## Pass Criteria
- Resend 계정 및 API Key 설정 완료
- Resend 클라이언트 파일 생성
- **⭐ 실제 테스트 이메일 발송 성공 (필수)**

## ⚠️ Human-AI Task 검증 주의사항

이 Task는 **Human-AI** 유형입니다.
- 가이드 문서 작성만으로는 완료가 아닙니다
- **PO가 실제로 Resend 계정 및 API 설정을 완료해야 합니다**
- **실제 이메일 발송 테스트가 필수입니다**

### 검증 절차
1. AI: 설정 가이드 및 코드 템플릿 제공
2. PO: Resend 계정 가입 및 API Key 발급 (Human)
3. PO: 환경변수 설정 (Human)
4. AI + PO: 테스트 이메일 발송
5. 테스트 성공 시에만 "완료" 처리

---

## ⚠️ 저장 위치 검증 항목

### 필수 검증
- [ ] Resend 클라이언트 코드가 `S2_개발-1차/Backend_Infra/`에 저장되었는가?
- [ ] Production 코드가 `Production/Backend_APIs/`에도 저장되었는가?
- [ ] 외부 서비스(Resend) 설정이 완료되었는가?
- [ ] 실제 이메일 발송 테스트가 성공했는가?
