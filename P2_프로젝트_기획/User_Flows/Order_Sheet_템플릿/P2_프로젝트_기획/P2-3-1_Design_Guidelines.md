# Order Sheet - P2-3-1 디자인 가이드라인

> **작성일**: 2025-12-17
> **버전**: 2.0 (종합 템플릿)
> **Stage**: P2 프로젝트 기획
> **Task ID**: P2-3-1

---

## 1. Task 개요

### 1.1 목표
프로젝트의 UI/UX 디자인 가이드라인을 수립합니다.

### 1.2 Task 정보

| 항목 | 값 |
|------|-----|
| Task ID | P2-3-1 |
| Task Name | 디자인 가이드라인 |
| Stage | P2 (프로젝트 기획) |
| Area | Design |
| 실행 유형 | AI-Only |
| 의존성 | P2-2 완료 |
| Task Agent | design-specialist |
| Verification Agent | qa-specialist |

---

## 2. 작업 내용

### 2.1 컬러 시스템
- Primary/Secondary/Accent 컬러 정의
- Semantic 컬러 (Success/Warning/Error/Info)
- Neutral 컬러 (Background/Text/Border)
- 다크 모드 대응 (선택)

### 2.2 타이포그래피
- 폰트 패밀리 선정
- 폰트 사이즈 체계 (H1~H6, Body, Caption)
- 라인 높이 및 자간
- 웹폰트 vs 시스템 폰트

### 2.3 컴포넌트 스타일
- 버튼 스타일 (Primary/Secondary/Outline/Ghost)
- 입력 필드 스타일 (Default/Focus/Error/Disabled)
- 카드, 모달, 토스트 등 공통 컴포넌트
- 아이콘 라이브러리 선정

### 2.4 레이아웃 시스템
- 그리드 시스템 (12컬럼 등)
- 브레이크포인트 정의 (Mobile/Tablet/Desktop)
- 간격(Spacing) 체계

---

## 3. Order Sheet 템플릿

```json
{
  "task_id": "P2-3-1",
  "task_name": "디자인 가이드라인",
  "stage": "P2",
  "area": "Design",
  "execution_type": "AI-Only",

  "task_instruction": {
    "목표": "UI/UX 디자인 가이드라인 수립",
    "산출물": [
      "컬러 시스템 정의",
      "타이포그래피 가이드",
      "컴포넌트 스타일 가이드",
      "레이아웃 시스템"
    ]
  },

  "user_input": {
    "브랜드_컨셉": "[브랜드 느낌, 키워드]",
    "참고_디자인": "[참고 사이트/앱 URL]",
    "선호_컬러": "[선호하는 메인 컬러]"
  },

  "output": {
    "파일_저장": "P2_프로젝트_기획/UI_UX_Design/Design_Guidelines.md"
  },

  "task_agent": "design-specialist",
  "verification_agent": "qa-specialist"
}
```

---

## 4. 검증 기준

- [ ] 컬러 시스템이 일관성 있게 정의되었는가?
- [ ] 웹 접근성 기준 (WCAG 2.1) 충족하는가?
- [ ] 반응형 디자인이 고려되었는가?
- [ ] 확장 가능한 시스템인가?

---

## 5. 다음 Task
P2-3-1 완료 → P2-3-2 (목업 제작) 진행

---

| 버전 | 날짜 | 내용 |
|------|------|------|
| 1.0 | - | 기본 템플릿 |
| 2.0 | 2025-12-17 | 종합 템플릿 업데이트 |
