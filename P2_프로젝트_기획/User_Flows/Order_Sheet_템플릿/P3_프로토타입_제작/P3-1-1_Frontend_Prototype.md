# Order Sheet - P3-1-1 프론트엔드 프로토타입

> **작성일**: 2025-12-17
> **버전**: 2.0 (종합 템플릿)
> **Stage**: P3 프로토타입 제작
> **Task ID**: P3-1-1

---

## 1. Task 개요

### 1.1 목표
프로젝트의 프론트엔드 프로토타입을 HTML/CSS/JS로 구현합니다.

### 1.2 Task 정보

| 항목 | 값 |
|------|-----|
| Task ID | P3-1-1 |
| Task Name | 프론트엔드 프로토타입 |
| Stage | P3 (프로토타입 제작) |
| Area | Frontend |
| 실행 유형 | AI-Only |
| 의존성 | P2 완료 |
| Task Agent | frontend-developer |
| Verification Agent | qa-specialist |

---

## 2. 작업 내용

### 2.1 프로토타입 구현
- 지정된 화면 HTML/CSS/JS 구현
- 디자인 가이드라인 적용
- 반응형 레이아웃 구현

### 2.2 공통 컴포넌트 작성
- 헤더, 푸터, 사이드바
- 버튼, 입력 필드 등 UI 컴포넌트
- 모달, 토스트, 로딩 등 인터랙티브 요소

### 2.3 기본 인터랙션 구현
- 네비게이션 동작
- 폼 인터랙션 (유효성 검사)
- 상태 변화 시각화

---

## 3. Order Sheet 템플릿

```json
{
  "task_id": "P3-1-1",
  "task_name": "프론트엔드 프로토타입",
  "stage": "P3",
  "area": "Frontend",
  "execution_type": "AI-Only",

  "task_instruction": {
    "목표": "프론트엔드 프로토타입 HTML/CSS/JS 구현",
    "산출물": [
      "프로토타입 HTML 파일들",
      "스타일시트 (CSS)",
      "인터랙션 스크립트 (JS)",
      "공통 컴포넌트"
    ]
  },

  "user_input": {
    "구현할_화면": "[메인, 로그인, 대시보드 등]",
    "기술_스택": "[순수 HTML/CSS/JS, Tailwind 등]",
    "참고_디자인": "[목업 파일 경로 또는 URL]"
  },

  "output": {
    "파일_저장": [
      "P3_프로토타입_제작/Frontend/Prototype/",
      "Production/Frontend/ (이중 저장)"
    ]
  },

  "task_agent": "frontend-developer",
  "verification_agent": "qa-specialist"
}
```

---

## 4. 검증 기준

- [ ] 디자인 가이드라인이 일관되게 적용되었는가?
- [ ] 웹 접근성 (a11y)이 고려되었는가?
- [ ] 반응형 레이아웃이 동작하는가?
- [ ] 크로스 브라우저 호환이 되는가?

---

## 5. 다음 Task
P3-1-1 완료 → P3-1-2 (페이지 추가) 진행

---

| 버전 | 날짜 | 내용 |
|------|------|------|
| 1.0 | - | 기본 템플릿 |
| 2.0 | 2025-12-17 | 종합 템플릿 업데이트 |
