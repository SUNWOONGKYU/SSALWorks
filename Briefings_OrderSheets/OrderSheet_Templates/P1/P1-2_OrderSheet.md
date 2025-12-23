# Order Sheet - P1-2 시장 분석

> **작성일**: 2025-12-17
> **버전**: 2.0 (종합 템플릿)
> **Stage**: P1 사업계획
> **Task ID**: P1-2

---

## 1. Task 개요

### 1.1 목표
목표 시장과 경쟁 환경을 분석하여 사업 전략의 기반을 마련합니다.

### 1.2 Task 정보

| 항목 | 값 |
|------|-----|
| Task ID | P1-2 |
| Task Name | 시장 분석 |
| Stage | P1 (사업계획) |
| Area | Documentation |
| 실행 유형 | AI-Only |
| 의존성 | P1-1 완료 |
| Task Agent | documentation-specialist |
| Verification Agent | qa-specialist |

---

## 2. 작업 내용

### 2.1 시장 규모 분석 (TAM/SAM/SOM)
- TAM (Total Addressable Market): 전체 시장 규모
- SAM (Serviceable Available Market): 접근 가능 시장
- SOM (Serviceable Obtainable Market): 실제 목표 시장

### 2.2 목표 고객 정의
- 주요 타겟 고객 세그먼트
- 고객 페르소나 (3-5개)
- 고객 니즈 및 Pain Points

### 2.3 경쟁 분석
- 직접 경쟁사 (3-5개)
- 간접 경쟁사
- SWOT 분석
- 경쟁 우위 요소

### 2.4 시장 트렌드
- 현재 트렌드
- 성장 예측
- 기회 및 위협 요소

---

## 3. Order Sheet 템플릿

```json
{
  "task_id": "P1-2",
  "task_name": "시장 분석",
  "stage": "P1",
  "area": "Documentation",
  "execution_type": "AI-Only",

  "task_instruction": {
    "목표": "시장 및 경쟁 환경 분석",
    "산출물": [
      "TAM/SAM/SOM 분석",
      "고객 페르소나",
      "경쟁사 분석",
      "SWOT 분석"
    ]
  },

  "user_input": {
    "산업_분야": "[사용자 입력]",
    "알려진_경쟁사": "[사용자 입력]",
    "참고_자료": "[사용자 입력]"
  },

  "output": {
    "파일_저장": "P1_사업계획/Market_Analysis.md"
  },

  "task_agent": "documentation-specialist",
  "verification_agent": "qa-specialist"
}
```

---

## 4. 검증 기준

- [ ] TAM/SAM/SOM 수치가 합리적인가?
- [ ] 고객 페르소나가 구체적인가?
- [ ] 경쟁 분석이 객관적인가?
- [ ] SWOT가 실행 가능한 인사이트를 제공하는가?

---

## 5. 다음 Task
P1-2 완료 → P1-3 (비즈니스 모델) 진행

---

| 버전 | 날짜 | 내용 |
|------|------|------|
| 1.0 | - | 기본 템플릿 |
| 2.0 | 2025-12-17 | 종합 템플릿 업데이트 |

---

> 본 Order Sheet는 예시입니다. Project Owner가 프로젝트에 맞게 자유롭게 수정할 수 있습니다.
