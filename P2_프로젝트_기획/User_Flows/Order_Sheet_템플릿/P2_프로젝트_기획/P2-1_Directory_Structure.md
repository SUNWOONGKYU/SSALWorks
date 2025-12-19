# Order Sheet - P2-1 디렉토리 구조 설계

> **작성일**: 2025-12-17
> **버전**: 2.0 (종합 템플릿)
> **Stage**: P2 프로젝트 기획
> **Task ID**: P2-1

---

## 1. Task 개요

### 1.1 목표
프로젝트의 전체 디렉토리 구조를 설계하고 문서화합니다.

### 1.2 Task 정보

| 항목 | 값 |
|------|-----|
| Task ID | P2-1 |
| Task Name | 디렉토리 구조 설계 |
| Stage | P2 (프로젝트 기획) |
| Area | Documentation |
| 실행 유형 | AI-Only |
| 의존성 | P1 완료 |
| Task Agent | documentation-specialist |
| Verification Agent | qa-specialist |

---

## 2. 작업 내용

### 2.1 SSALWorks 표준 구조

```
프로젝트명/
├── P0_작업_디렉토리_구조_생성/    # 특별단계
├── S0_Project-SSAL-Grid_생성/    # 특별단계
├── P1_사업계획/
├── P2_프로젝트_기획/
│   ├── Project_Plan/
│   ├── User_Flows/
│   └── UI_UX_Design/
├── P3_프로토타입_제작/
│   ├── Frontend/
│   ├── Database/
│   └── Scripts/
├── S1_개발_준비/
├── S2_개발-1차/
├── S3_개발-2차/
├── S4_개발-3차/
├── S5_운영/
├── Production/                   # 배포용 코드
├── Web_ClaudeCode_Bridge/        # AI 통신용
└── .claude/                      # Claude Code 설정
```

### 2.2 네이밍 규칙
- 대분류 폴더: 한글 + 숫자 (P1_사업계획)
- 하위 폴더: 영문 (Frontend, Database)
- 파일: Task ID 포함 권장

---

## 3. Order Sheet 템플릿

```json
{
  "task_id": "P2-1",
  "task_name": "디렉토리 구조 설계",
  "stage": "P2",
  "area": "Documentation",
  "execution_type": "AI-Only",

  "task_instruction": {
    "목표": "프로젝트 디렉토리 구조 설계",
    "산출물": [
      "PROJECT_DIRECTORY_STRUCTURE.md",
      "폴더 구조 생성"
    ]
  },

  "user_input": {
    "프로젝트_유형": "[웹앱/API/풀스택]",
    "기술_스택": "[사용자 입력]"
  },

  "output": {
    "파일_저장": [
      "PROJECT_DIRECTORY_STRUCTURE.md (루트)",
      "P2_프로젝트_기획/Project_Plan/"
    ]
  },

  "task_agent": "documentation-specialist",
  "verification_agent": "qa-specialist"
}
```

---

## 4. 검증 기준

- [ ] SSALWorks 표준 구조 준수
- [ ] 네이밍 규칙 일관성
- [ ] 확장 가능한 구조
- [ ] 문서화 완성

---

## 5. 다음 Task
P2-1 완료 → P2-2-1 (요구사항 정의) 진행

---

| 버전 | 날짜 | 내용 |
|------|------|------|
| 1.0 | - | 기본 템플릿 |
| 2.0 | 2025-12-17 | 종합 템플릿 업데이트 |

---

> 본 Order Sheet는 예시입니다. Project Owner가 프로젝트에 맞게 자유롭게 수정할 수 있습니다.
