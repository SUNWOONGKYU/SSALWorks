# S0-6. Verification Instructions 작성

---

## 개요

SAL Grid의 각 Task에 대한 검증 지시서를 작성합니다.

---

## 이 단계에서 하는 일

| 항목 | 설명 |
|------|------|
| Verification Instruction 작성 | 각 Task별 검증 기준 정의 |
| 검증 항목 명시 | 확인해야 할 체크리스트 |
| 통과 기준 정의 | 검증 통과/실패 기준 |

---

## Verification Instruction 구조

```markdown
# Verification: {Task ID}

## 검증 항목
- [ ] 체크항목 1
- [ ] 체크항목 2

## 통과 기준
- 모든 체크항목 통과 시 Verified

## 실패 시 조치
- 재작업 필요 항목 명시
```

---

## 참고 폴더

`S0_Project-SAL-Grid_생성/sal-grid/verification-instructions/`

---

> Verification Instruction은 작성자와 다른 검증자가 수행합니다 (분리 원칙).
