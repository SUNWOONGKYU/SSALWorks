# S4F6: 인앱 알림 UI

## Task 정보
- **Task ID**: S4F6
- **Task Name**: 인앱 알림 UI
- **Stage**: S4 (개발-3차)
- **Area**: F (Frontend)
- **Dependencies**: S4D2

## Task 목표

메인 대시보드(index.html) 헤더에 알림 벨 아이콘과 드롭다운 알림 목록 UI를 구현한다.

## 수행 내용

### 1. 헤더 알림 벨 추가

- 헤더 우측에 🔔 알림 벨 아이콘 추가
- 읽지 않은 알림 개수 배지 표시
- 클릭 시 드롭다운 토글

### 2. 알림 드롭다운 UI

```html
<div class="notification-dropdown">
    <div class="notification-header">
        🔔 알림
        <button onclick="markAllNotificationsRead()">모두 읽음</button>
    </div>
    <div id="notificationList">
        <!-- 알림 목록 렌더링 -->
    </div>
</div>
```

### 3. JavaScript 함수

| 함수 | 기능 |
|------|------|
| `loadUserNotifications()` | 사용자 알림 목록 로드 (최근 20개) |
| `renderNotificationList()` | 알림 목록 HTML 렌더링 |
| `toggleNotificationDropdown()` | 드롭다운 표시/숨김 토글 |
| `markNotificationRead()` | 개별 알림 읽음 처리 |
| `markAllNotificationsRead()` | 전체 알림 읽음 처리 |
| `formatTimeAgo()` | 상대 시간 포맷 (방금 전, N분 전 등) |

### 4. 알림 유형별 아이콘

| 유형 | 아이콘 |
|------|--------|
| `credit_low` | ⚠️ |
| `credit_charged` | 💰 |
| `deposit_confirmed` | ✅ |
| `free_period_ending` | 📅 |
| `payment_failed` | ❌ |
| `system` | 📢 |

### 5. 관리자 대시보드 연동

관리자 작업 시 자동으로 사용자 알림 생성:
- 크레딧 입금 확인 → `deposit_confirmed`
- 잔액 부족 알림 → `credit_low`
- 개발자 계정 개설 → `system`
- 무료 기간 종료 안내 → `free_period_ending`

## 생성/수정 파일

| 파일 | 변경 내용 |
|------|----------|
| `Production/index.html` | 헤더에 알림 벨 및 드롭다운 UI 추가 |
| `Production/admin-dashboard.html` | 각 기능에서 user_notifications INSERT 추가 |

## Task Agent
- **Task Agent**: frontend-developer
- **Verification Agent**: code-reviewer

---

## 필수 참조 규칙

| 규칙 파일 | 내용 | 참조 시점 |
|----------|------|----------|
| `.claude/rules/02_save-location.md` | 저장 위치 규칙 | 파일 저장 시 |
| `.claude/rules/05_execution-process.md` | 6단계 실행 프로세스 | 작업 전체 |
