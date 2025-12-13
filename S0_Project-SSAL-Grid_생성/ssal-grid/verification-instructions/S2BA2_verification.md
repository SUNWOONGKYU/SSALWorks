# Verification Instruction - S2BA2

## Task ID
S2BA2

## Task Name
이메일 발송 API

## Verification Checklist

### 1. 파일 존재 검증
- [ ] api/email/password-reset.js 존재
- [ ] api/email/welcome.js 존재 (선택)
- [ ] 이메일 템플릿 파일

### 2. 비밀번호 재설정 API 검증
- [ ] POST /api/email/password-reset
- [ ] 이메일 필수 파라미터 검증
- [ ] 리셋 토큰 생성
- [ ] 이메일 발송

### 3. 이메일 서비스 연동
- [ ] Resend API 연동
- [ ] 발신자 이메일 설정
- [ ] 이메일 템플릿 적용

### 4. API 응답 검증
```json
// 성공 응답
{ "success": true, "message": "Reset email sent" }

// 실패 응답
{ "error": "Email is required" }
```

### 5. 보안 검증
- [ ] Rate Limiting 적용
- [ ] 이메일 유효성 검사
- [ ] 토큰 만료 시간 설정

## Test Commands
```bash
# 파일 존재 확인
ls -la api/email/

# API 테스트
curl -X POST http://localhost:3000/api/email/password-reset \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

## Expected Results
- 이메일 API 동작
- 비밀번호 재설정 이메일 발송
- 에러 핸들링 정상

## Verification Agent
backend-developer

## Pass Criteria
- 이메일 발송 성공
- 토큰 생성 및 저장
- Rate Limiting 적용
