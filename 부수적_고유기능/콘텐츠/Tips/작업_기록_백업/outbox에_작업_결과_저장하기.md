# outbox에 작업 결과 저장하기

## 요약
작업 결과를 `Web_ClaudeCode_Bridge/outbox/`에 JSON으로 저장. Task 완료, 검증 결과, Stage Gate 보고서 등 기록해두면 나중에 참고 가능.

## 상세

### 저장할 파일 종류

| 유형 | 파일명 패턴 |
|------|------------|
| Task 완료 | `task_S2F1_completed.json` |
| Task 검증 | `task_S2F1_verification.json` |
| Stage Gate | `S2_stage_gate_report.json` |

### 완료 보고서 예시

```json
{
  "task_id": "S2F1",
  "status": "completed",
  "completed_at": "2025-01-15T14:30:00Z",
  "files_created": [
    "Production/Frontend/pages/auth/login.html"
  ]
}
```

### 저장 시점

| 저장 O | 저장 X |
|--------|--------|
| Task 완료 시 | 진행 중 |
| 검증 완료 시 | 임시 테스트 |
| Stage Gate 통과 시 | 사소한 변경 |

### 관리 규칙
- 1주 이상 된 파일: archive/ 이동 고려
- JSON 문법 오류 없이 작성
- 민감정보 포함 금지

---
📚 더 자세히: `Orders_Reports_JSON으로_작업_요청하기.md`
