# Order Sheet - P3-3 유틸리티 스크립트

> **작성일**: 2025-12-17
> **버전**: 2.0 (종합 템플릿)
> **Stage**: P3 프로토타입 제작
> **Task ID**: P3-3

---

## 1. Task 개요

### 1.1 목표
프로토타입 개발/운영에 필요한 유틸리티 스크립트를 작성합니다.

### 1.2 Task 정보

| 항목 | 값 |
|------|-----|
| Task ID | P3-3 |
| Task Name | 유틸리티 스크립트 |
| Stage | P3 (프로토타입 제작) |
| Area | Scripts |
| 실행 유형 | AI-Only |
| 의존성 | P3-2 완료 |
| Task Agent | backend-developer |
| Verification Agent | qa-specialist |

---

## 2. 작업 내용

### 2.1 스크립트 작성
- 지정된 기능의 스크립트 구현
- 에러 처리 포함
- 재사용 가능한 구조

### 2.2 의존성 관리
- 필요한 패키지 설치/설정
- package.json 업데이트
- 환경 변수 설정 (.env.example)

### 2.3 사용 가이드 작성
- 스크립트 실행 방법
- 옵션/인자 설명
- 예제 사용법

---

## 3. Order Sheet 템플릿

```json
{
  "task_id": "P3-3",
  "task_name": "유틸리티 스크립트",
  "stage": "P3",
  "area": "Scripts",
  "execution_type": "AI-Only",

  "task_instruction": {
    "목표": "유틸리티 스크립트 작성",
    "산출물": [
      "스크립트 파일들",
      "package.json 업데이트",
      "사용 가이드"
    ]
  },

  "user_input": {
    "필요한_스크립트": "[스크립트 이름과 용도 목록]",
    "스크립트_언어": "[Node.js/Python 등]",
    "입출력_요구": "[각 스크립트의 입력/출력 설명]"
  },

  "output": {
    "파일_저장": [
      "P3_프로토타입_제작/Scripts/",
      "Web_ClaudeCode_Bridge/ (브릿지 관련)"
    ]
  },

  "task_agent": "backend-developer",
  "verification_agent": "qa-specialist"
}
```

---

## 4. 검증 기준

- [ ] 에러 처리가 충분히 되어 있는가?
- [ ] 로깅이 명확한가?
- [ ] 재사용 가능한 구조인가?
- [ ] 사용 가이드가 명확한가?

---

## 5. Stage 완료 후
P3 완료 → S1 (개발 준비) 진행

---

| 버전 | 날짜 | 내용 |
|------|------|------|
| 1.0 | - | 기본 템플릿 |
| 2.0 | 2025-12-17 | 종합 템플릿 업데이트 |
