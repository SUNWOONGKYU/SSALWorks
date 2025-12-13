# Task Instruction - S2F1

## Task ID
S2F1

## Task Name
Google 소셜 로그인 UI

## Task Goal
Google 로그인 버튼 및 OAuth 콜백 페이지 구현

## Prerequisites (Dependencies)
- S2BA1 (Google OAuth Serverless API) 완료

## Specific Instructions

### 1. Google 로그인 버튼 추가
- 위치: `pages/auth/login.html`
- 기존 이메일 로그인 폼 아래에 추가

### 2. 버튼 디자인
```html
<div class="social-login">
  <div class="divider">
    <span>또는</span>
  </div>
  <button id="googleLoginBtn" class="google-btn">
    <img src="/assets/icons/google-logo.svg" alt="Google" />
    <span>Google로 계속하기</span>
  </button>
</div>
```

### 3. 버튼 스타일
```css
.google-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  padding: 12px 24px;
  background: white;
  border: 1px solid #dadce0;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #3c4043;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
}

.google-btn:hover {
  background: #f8f9fa;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
```

### 4. 클릭 이벤트
```javascript
document.getElementById('googleLoginBtn').addEventListener('click', () => {
  window.location.href = '/api/auth/google';
});
```

### 5. 콜백 페이지
- 위치: `pages/auth/callback.html`
- OAuth 성공 시 토큰 처리
- 로딩 스피너 표시
- 에러 처리

### 6. Google 로고 아이콘
- 위치: `assets/icons/google-logo.svg`
- Google 공식 브랜드 가이드라인 준수

## Expected Output Files
- `pages/auth/login.html` (수정)
- `pages/auth/callback.html` (신규)
- `assets/icons/google-logo.svg` (신규)

## Completion Criteria
- [ ] Google 로그인 버튼 추가
- [ ] 버튼 스타일 적용
- [ ] 클릭 시 OAuth 플로우 시작
- [ ] 콜백 페이지 구현
- [ ] 로그인 성공 시 대시보드 이동
- [ ] 에러 처리 구현

## Tech Stack
- HTML/CSS/JavaScript
- OAuth 2.0

## Tools
- Read, Write, Edit

## Execution Type
AI-Only

## Remarks
- Google 브랜드 가이드라인 준수 필요
- 기존 이메일 로그인과 공존
