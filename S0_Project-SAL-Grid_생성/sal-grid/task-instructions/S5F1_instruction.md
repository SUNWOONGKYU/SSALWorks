# Task Instruction - S5F1

---

## 📌 필수 참조 규칙 파일 (2025-12-19)

> **⚠️ 작업 전 반드시 아래 규칙 파일을 확인하세요!**

| 규칙 파일 | 내용 | 참조 시점 |
|----------|------|----------|
| `.claude/rules/01_file-naming.md` | 파일 명명 규칙 | 파일 생성 시 |
| `.claude/rules/02_save-location.md` | 저장 위치 규칙 | 파일 저장 시 |
| `.claude/rules/03_area-stage.md` | Area/Stage 매핑 | 폴더 선택 시 |
| `.claude/rules/05_execution-process.md` | 6단계 실행 프로세스 | 작업 전체 |



## Task ID
S5F1

## Task Name
버그 수정 (프론트엔드)

## Task Goal
프로덕션 배포 후 보고된 프론트엔드 버그 수정 및 UI/UX 개선

## Prerequisites (Dependencies)
- S5O1 (프로덕션 배포) 완료

## Specific Instructions

### 1. 버그 추적 프로세스

```markdown
## 버그 추적 워크플로우

1. **버그 수집**
   - Sentry 에러 대시보드 확인
   - 사용자 피드백 수집 (이메일, 문의 폼)
   - QA 테스트 결과

2. **버그 분류**
   - P1 Critical: 서비스 이용 불가
   - P2 High: 핵심 기능 장애
   - P3 Medium: 일부 기능 오류
   - P4 Low: UI/UX 개선 사항

3. **수정 우선순위**
   - P1 → 즉시 수정
   - P2 → 24시간 내 수정
   - P3 → 1주일 내 수정
   - P4 → 다음 릴리즈에 포함
```

### 2. 일반적인 버그 유형 및 해결 방법

#### 2.1 폼 유효성 검사 버그
```javascript
// 수정 전: 이메일 유효성 검사 누락
function validateEmail(email) {
    return email.includes('@');
}

// 수정 후: 정규식 기반 검증
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
```

#### 2.2 비동기 처리 버그
```javascript
// 수정 전: 로딩 상태 미표시
async function fetchData() {
    const data = await api.getData();
    displayData(data);
}

// 수정 후: 로딩 및 에러 상태 처리
async function fetchData() {
    showLoading();
    try {
        const data = await api.getData();
        displayData(data);
    } catch (error) {
        showError('데이터를 불러올 수 없습니다');
        console.error(error);
    } finally {
        hideLoading();
    }
}
```

#### 2.3 모바일 반응형 버그
```css
/* 수정 전: 모바일에서 버튼 잘림 */
.btn-primary {
    padding: 20px 40px;
}

/* 수정 후: 반응형 패딩 */
.btn-primary {
    padding: 12px 24px;
}

@media (min-width: 768px) {
    .btn-primary {
        padding: 16px 32px;
    }
}
```

### 3. UI/UX 개선 체크리스트

```markdown
## 사용성 점검 항목

### 접근성 (A11y)
- [ ] 모든 이미지에 alt 텍스트
- [ ] 폼 요소에 label 연결
- [ ] 키보드 네비게이션 가능
- [ ] 색상 대비 충분 (4.5:1 이상)
- [ ] 스크린 리더 테스트

### 성능
- [ ] 이미지 lazy loading 적용
- [ ] CSS/JS 최소화
- [ ] 불필요한 리렌더링 제거
- [ ] 네트워크 요청 최적화

### 모바일
- [ ] 터치 타겟 크기 (44px 이상)
- [ ] 가로 스크롤 없음
- [ ] 폰트 크기 가독성 (16px 이상)
- [ ] 입력 필드 확대 방지
```

### 4. 버그 수정 템플릿

```markdown
## Bug Fix Report

### 버그 ID: BUG-001
### 제목: [간단한 설명]

### 증상
- 재현 경로: 홈 → 로그인 → ...
- 예상 동작: [예상한 결과]
- 실제 동작: [실제 발생한 결과]

### 원인 분석
- 파일: `pages/auth/login.html`
- 원인: [근본 원인]

### 수정 내용
- 파일: `pages/auth/login.html`
- 변경 사항:
  ```
  [코드 변경 내용]
  ```

### 테스트
- [ ] 로컬 테스트 완료
- [ ] 크로스 브라우저 테스트
- [ ] 모바일 테스트
- [ ] 회귀 테스트

### 배포
- PR: #xxx
- 배포일: YYYY-MM-DD
```

### 5. 공통 수정 사항

```javascript
// 에러 바운더리 추가
function safeExecute(fn, fallback) {
    try {
        return fn();
    } catch (error) {
        console.error('Error:', error);
        return fallback;
    }
}

// 네트워크 재시도 로직
async function fetchWithRetry(url, options, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error) {
            if (i === retries - 1) throw error;
            await new Promise(r => setTimeout(r, 1000 * (i + 1)));
        }
    }
}
```

### 6. 브라우저 호환성 수정

```javascript
// 구형 브라우저 지원
if (!Array.prototype.includes) {
    Array.prototype.includes = function(searchElement) {
        return this.indexOf(searchElement) !== -1;
    };
}

// CSS 변수 폴백
.btn {
    background-color: #3182ce; /* 폴백 */
    background-color: var(--primary-color, #3182ce);
}
```

## Expected Output Files
- 수정된 HTML/CSS/JS 파일들
- 버그 수정 보고서 (markdown)
- 테스트 결과 기록

## Completion Criteria
- [ ] 보고된 P1/P2 버그 모두 수정
- [ ] 접근성 점검 완료
- [ ] 크로스 브라우저 테스트 통과
- [ ] 모바일 반응형 테스트 통과
- [ ] 회귀 테스트 통과
- [ ] 수정 사항 문서화

## Tech Stack
- HTML/CSS/JavaScript

## Task Agent
`frontend-developer`

## Verification Agent
`code-reviewer`

## Tools
- Write, Read
- Bash (테스트 실행)
- 브라우저 개발자 도구

## Execution Type
AI-Only (버그 수정) / Human-Assisted (실제 버그 보고 수집)

## Remarks
- 운영 중 발생하는 버그는 지속적으로 관리
- Sentry 알림을 통해 실시간 모니터링
- 주요 수정 사항은 릴리즈 노트에 기록
- 사용자 영향도가 높은 버그 우선 수정

---

## ⚠️ 작업 결과물 저장 2대 규칙

> **이 규칙은 반드시 준수하세요!**

### 제1 규칙: Stage + Area 폴더에 저장
- Task ID의 Stage와 Area에 해당하는 폴더에 저장
- 예: S5F1 → `S5_운영/Frontend/`

### 제2 규칙: Production 코드는 이중 저장
- Frontend 코드는 Stage 폴더 + Production 폴더 둘 다 저장

**Area 폴더 매핑:** M→Documentation, F→Frontend, BI→Backend_Infra, BA→Backend_APIs, D→Database, S→Security, T→Testing, O→DevOps, E→External, C→Content
