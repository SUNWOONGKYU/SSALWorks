# Order Sheet - P1-3 비즈니스 모델

> **작성일**: 2025-12-17
> **버전**: 2.0 (종합 템플릿)
> **Stage**: P1 사업계획
> **Task ID**: P1-3

---

## 1. Task 개요

### 1.1 목표
수익 창출 방법과 비즈니스 구조를 정의합니다.

### 1.2 Task 정보

| 항목 | 값 |
|------|-----|
| Task ID | P1-3 |
| Task Name | 비즈니스 모델 |
| Stage | P1 (사업계획) |
| Area | Documentation |
| 실행 유형 | AI-Only |
| 의존성 | P1-2 완료 |
| Task Agent | documentation-specialist |
| Verification Agent | qa-specialist |

---

## 2. 작업 내용

### 2.1 비즈니스 모델 캔버스
1. 고객 세그먼트 (Customer Segments)
2. 가치 제안 (Value Propositions)
3. 채널 (Channels)
4. 고객 관계 (Customer Relationships)
5. 수익원 (Revenue Streams)
6. 핵심 자원 (Key Resources)
7. 핵심 활동 (Key Activities)
8. 핵심 파트너 (Key Partners)
9. 비용 구조 (Cost Structure)

### 2.2 수익 모델
- 주요 수익원 (구독료, 광고, 수수료 등)
- 가격 정책
- 예상 매출 시나리오

### 2.3 비용 구조
- 고정 비용
- 변동 비용
- 초기 투자 비용

### 2.4 손익 분기점 분석
- BEP (Break-Even Point) 계산
- 목표 달성 시나리오

---

## 3. Order Sheet 템플릿

```json
{
  "task_id": "P1-3",
  "task_name": "비즈니스 모델",
  "stage": "P1",
  "area": "Documentation",
  "execution_type": "AI-Only",

  "task_instruction": {
    "목표": "비즈니스 모델 및 수익 구조 정의",
    "산출물": [
      "비즈니스 모델 캔버스",
      "수익 모델",
      "비용 구조",
      "손익 분기점 분석"
    ]
  },

  "user_input": {
    "수익_모델_선호": "[예: 구독, 프리미엄, 광고 등]",
    "예상_가격대": "[사용자 입력]"
  },

  "output": {
    "파일_저장": "P1_사업계획/Business_Model.md"
  },

  "task_agent": "documentation-specialist",
  "verification_agent": "qa-specialist"
}
```

---

## 4. 검증 기준

- [ ] 비즈니스 모델 캔버스가 완성되었는가?
- [ ] 수익 모델이 실현 가능한가?
- [ ] 비용 구조가 현실적인가?
- [ ] BEP 분석이 합리적인가?

---

## 5. Stage 완료 후
P1 완료 → P2 (프로젝트 기획) 진행

---

| 버전 | 날짜 | 내용 |
|------|------|------|
| 1.0 | - | 기본 템플릿 |
| 2.0 | 2025-12-17 | 종합 템플릿 업데이트 |
