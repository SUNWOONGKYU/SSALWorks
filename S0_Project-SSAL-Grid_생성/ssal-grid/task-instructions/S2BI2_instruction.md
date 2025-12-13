# Task Instruction - S2BI2

## Task ID
S2BI2

## Task Name
에러 핸들링 시스템

## Task Goal
전역 에러 처리, 토스트 알림, 에러 로깅 시스템 구축

## Prerequisites (Dependencies)
- 없음 (독립 Task)

## Specific Instructions

### 1. 전역 에러 핸들러
- 위치: `assets/js/error-handler.js`

```javascript
// 전역 에러 핸들러
window.onerror = function(message, source, lineno, colno, error) {
  console.error('Global Error:', { message, source, lineno, colno, error });
  showToast('오류가 발생했습니다.', 'error');
  // Sentry 등 에러 트래킹 서비스로 전송 (S4BI1에서 구현)
  return false;
};

// Promise rejection 핸들러
window.addEventListener('unhandledrejection', function(event) {
  console.error('Unhandled Rejection:', event.reason);
  showToast('처리 중 오류가 발생했습니다.', 'error');
});
```

### 2. 토스트 알림 시스템
- 위치: `assets/js/toast.js`

```javascript
function showToast(message, type = 'info', duration = 3000) {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 100);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// 타입: success, error, warning, info
```

### 3. 토스트 스타일
- 위치: `assets/css/toast.css`

```css
.toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 12px 24px;
  border-radius: 8px;
  color: white;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s;
  z-index: 10000;
}

.toast.show {
  opacity: 1;
  transform: translateY(0);
}

.toast-success { background: #10B981; }
.toast-error { background: #EF4444; }
.toast-warning { background: #F59E0B; }
.toast-info { background: #3B82F6; }
```

### 4. API 에러 핸들링 유틸리티
```javascript
// assets/js/api-utils.js
async function apiCall(url, options = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'API 요청 실패');
    }

    return await response.json();
  } catch (error) {
    showToast(error.message, 'error');
    throw error;
  }
}
```

### 5. 모든 페이지에 스크립트 포함
```html
<script src="/assets/js/toast.js"></script>
<script src="/assets/js/error-handler.js"></script>
<script src="/assets/js/api-utils.js"></script>
```

## Expected Output Files
- `assets/js/error-handler.js`
- `assets/js/toast.js`
- `assets/js/api-utils.js`
- `assets/css/toast.css`

## Completion Criteria
- [ ] 전역 에러 핸들러 구현
- [ ] 토스트 알림 시스템 구현
- [ ] API 에러 핸들링 유틸리티 구현
- [ ] 토스트 스타일 구현
- [ ] 모든 페이지에 스크립트 포함

## Tech Stack
- JavaScript (Vanilla)
- CSS

## Tools
- Write, Read, Edit

## Execution Type
AI-Only

## Remarks
- Sentry 연동은 S4BI1에서 구현
- 토스트는 스택 형태로 여러 개 표시 가능하도록 개선 가능
