# Verification Instruction - S2BI1

## Task ID
S2BI1

## Task Name
인증 클라이언트 모듈

## Verification Checklist

### 1. 파일 존재 검증
- [ ] auth.js 파일 존재
- [ ] 모든 인증 함수 export

### 2. 함수 구현 검증
- [ ] signUp 함수 구현
- [ ] signIn 함수 구현
- [ ] signOut 함수 구현
- [ ] getSession 함수 구현
- [ ] resetPassword 함수 구현

### 3. Google OAuth 검증
- [ ] signInWithGoogle 함수 구현
- [ ] OAuth 콜백 처리

### 4. 세션 관리 검증
- [ ] 세션 상태 확인 함수
- [ ] 토큰 갱신 처리
- [ ] 로그아웃 시 세션 정리

### 5. 에러 핸들링 검증
- [ ] 인증 실패 에러 처리
- [ ] 네트워크 에러 처리
- [ ] 에러 메시지 반환

## Test Commands
```bash
# 파일 존재 확인
ls -la P3_프로토타입_제작/Frontend/Prototype/lib/auth.js

# 함수 확인
grep -E "^(export|async function|function)" P3_프로토타입_제작/Frontend/Prototype/lib/auth.js
```

## Expected Results
- 인증 모듈 파일 존재
- 모든 필수 함수 구현
- Supabase Auth 연동

## Verification Agent
backend-developer

## Pass Criteria
- 5개 필수 함수 구현
- Google OAuth 지원
- 에러 핸들링 구현
