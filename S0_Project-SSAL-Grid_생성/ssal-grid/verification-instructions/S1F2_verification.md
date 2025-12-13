# Verification Instruction - S1F2

## Task ID
S1F2

## Task Name
로그인/회원가입 UI

## Verification Checklist

### 1. 파일 존재 검증
- [ ] login.html 존재
- [ ] signup.html 존재
- [ ] auth.css 또는 shared.css에 스타일 포함

### 2. 로그인 폼 검증
- [ ] 이메일 입력 필드
- [ ] 비밀번호 입력 필드
- [ ] 로그인 버튼
- [ ] Google OAuth 버튼
- [ ] 회원가입 링크
- [ ] 비밀번호 찾기 링크

### 3. 회원가입 폼 검증
- [ ] 이메일 입력 필드
- [ ] 비밀번호 입력 필드
- [ ] 비밀번호 확인 필드
- [ ] 약관 동의 체크박스
- [ ] 회원가입 버튼
- [ ] 로그인 링크

### 4. 유효성 검사 UI
- [ ] 필수 필드 표시 (*)
- [ ] 에러 메시지 표시 영역
- [ ] 입력값 검증 피드백

### 5. 반응형 검증
- [ ] 모바일에서 폼 사용 가능
- [ ] 버튼 터치 영역 적절 (44px+)

## Test Commands
```bash
# 파일 존재 확인
ls -la P3_프로토타입_제작/Frontend/Prototype/pages/auth/

# HTML 구조 확인
grep -E "(input|button|form)" P3_프로토타입_제작/Frontend/Prototype/pages/auth/login.html
```

## Expected Results
- 로그인/회원가입 페이지 존재
- 모든 필수 폼 요소 포함
- 유효성 검사 UI 준비

## Verification Agent
frontend-developer

## Pass Criteria
- 모든 필수 입력 필드 존재
- OAuth 버튼 존재
- 반응형 레이아웃 동작
