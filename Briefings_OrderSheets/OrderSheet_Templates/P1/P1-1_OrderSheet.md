# Order Sheet - P1-1 Vision & Mission 정의

> **작성일**: 2025-12-17
> **버전**: 2.0 (종합 템플릿)
> **Stage**: P1 사업계획
> **Task ID**: P1-1

---

## 1. Task 개요

### 1.1 목표
프로젝트의 핵심 방향을 정의하는 Vision과 Mission 문서를 작성합니다.

### 1.2 Task 정보

| 항목 | 값 |
|------|-----|
| Task ID | P1-1 |
| Task Name | Vision & Mission 정의 |
| Stage | P1 (사업계획) |
| Area | Documentation |
| 실행 유형 | AI-Only |
| Task Agent | documentation-specialist |
| Verification Agent | qa-specialist |

---

## 2. 작업 내용

### 2.1 Vision Statement (비전)
```
프로젝트가 궁극적으로 달성하고자 하는 목표를 1-2문장으로 작성:
- 이 프로젝트가 완성되면 어떤 가치를 제공하는가?
- 사용자에게 어떤 변화를 가져다주는가?
```

### 2.2 Mission Statement (미션)
```
비전을 달성하기 위한 구체적인 방법:
- 어떤 방식으로 비전을 달성하는가?
- 핵심 차별점은 무엇인가?
- 주요 타겟 사용자는 누구인가?
```

### 2.3 Core Values (핵심 가치)
- 프로젝트에서 중요시하는 3~5개의 핵심 가치 정의

### 2.4 엘리베이터 피치
- 30초 내에 프로젝트를 설명할 수 있는 소개 문구

---

## 3. Order Sheet 템플릿

```json
{
  "task_id": "P1-1",
  "task_name": "Vision & Mission 정의",
  "stage": "P1",
  "area": "Documentation",
  "execution_type": "AI-Only",

  "task_instruction": {
    "목표": "프로젝트 비전/미션 정의",
    "산출물": [
      "Vision Statement (1-2문장)",
      "Mission Statement (구체적 방법)",
      "Core Values (3-5개)",
      "Elevator Pitch (30초)"
    ]
  },

  "user_input": {
    "프로젝트_설명": "[사용자 입력]",
    "목표_고객": "[사용자 입력]",
    "기대_효과": "[사용자 입력]"
  },

  "output": {
    "파일_저장": "P1_사업계획/Vision_Mission.md"
  },

  "task_agent": "documentation-specialist",
  "verification_agent": "qa-specialist"
}
```

---

## 4. 검증 기준

### 4.1 검증 항목
- [ ] Vision이 영감을 주고 간결한가?
- [ ] Mission이 구체적이고 실행 가능한가?
- [ ] Core Values가 의사결정에 적용 가능한가?
- [ ] Elevator Pitch가 30초 내에 설명 가능한가?

### 4.2 완료 기준
- Vision/Mission 문서 작성 완료
- PO 검토 및 승인

---

## 5. 다음 Task
P1-1 완료 → P1-2 (시장 분석) 진행

---

**버전 이력**

| 버전 | 날짜 | 내용 |
|------|------|------|
| 1.0 | - | 기본 템플릿 |
| 2.0 | 2025-12-17 | 종합 템플릿 업데이트 |

---

> 본 Order Sheet는 예시입니다. Project Owner가 프로젝트에 맞게 자유롭게 수정할 수 있습니다.
