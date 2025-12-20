# outbox에 작업 결과 저장하기

> 이 문서는 작업 결과를 outbox 폴더에 JSON 형식으로 저장하여 관리하는 방법을 설명합니다.

---

## 왜 결과를 저장하는가

작업 결과를 JSON으로 저장하면 나중에 참고할 수 있고, AI가 이전 작업 이력을 파악할 수 있습니다. Stage Gate 검증 시에도 완료된 Task 목록을 확인할 수 있습니다.

---

## 저장할 파일 종류

| 유형 | 파일명 패턴 | 저장 시점 |
|------|------------|----------|
| Task 완료 | `task_S2F1_completed.json` | Task 완료 시 |
| Task 검증 | `task_S2F1_verification.json` | 검증 완료 시 |
| Stage Gate | `S2_stage_gate_report.json` | Stage Gate 통과 시 |

---

## 완료 보고서 예시

```json
{
  "task_id": "S2F1",
  "task_name": "로그인 페이지 UI",
  "status": "completed",
  "completed_at": "2025-01-15T14:30:00Z",
  "files_created": [
    "S2_개발-1차/Frontend/login.html",
    "Production/Frontend/pages/auth/login.html"
  ],
  "summary": "이메일/비밀번호 로그인 + Google 소셜 로그인 UI 구현"
}
```

---

## 저장 시점

| 저장 O | 저장 X |
|--------|--------|
| Task 완료 시 | 진행 중 |
| 검증 완료 시 | 임시 테스트 |
| Stage Gate 통과 시 | 사소한 변경 |

---

## 관리 규칙

- 1주 이상 된 파일: archive/ 폴더로 이동 고려
- JSON 문법 오류 없이 작성
- 민감정보 포함 금지

---

## 체크리스트

- [ ] Task 완료 시 결과 JSON을 저장했는가?
- [ ] 파일명이 규칙에 맞는가?
- [ ] JSON 문법이 올바른가?

---

*상세 내용: `Orders_Reports_JSON으로_작업_요청하기.md` 참조*

