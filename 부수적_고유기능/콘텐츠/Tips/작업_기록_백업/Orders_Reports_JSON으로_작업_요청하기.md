# Orders/Reports JSON으로 작업 요청하기

> 이 문서는 JSON 형식의 Order Sheet와 Report를 활용하여 Claude Code와 구조화된 방식으로 소통하는 방법을 설명합니다.

---

## 왜 JSON을 사용하는가

구조화된 형식으로 작업을 요청하면 세션이 끊어져도 AI가 이전 작업을 정확히 파악할 수 있습니다. 또한 작업 결과를 일관된 형식으로 기록할 수 있습니다.

---

## 폴더 구조

```
Human_ClaudeCode_Bridge/
├── Orders/     # 작업 요청 (사람 → AI)
└── Reports/    # 작업 결과 (AI → 사람)
```

---

## Order Sheet 예시

```json
{
  "order_id": "ORDER-FE-251214-01",
  "order_type": "Task 수행",
  "task_id": "S2F1",
  "task_name": "로그인 페이지 UI",
  "instructions": [
    "이메일/비밀번호 입력 폼",
    "Google 소셜 로그인 버튼",
    "반응형 디자인"
  ],
  "expected_files": [
    "Production/Frontend/pages/auth/login.html"
  ]
}
```

---

## Report 예시

```json
{
  "report_id": "REPORT-FE-251214-01",
  "order_id": "ORDER-FE-251214-01",
  "status": "completed",
  "files_created": [
    "S2_개발-1차/Frontend/login.html",
    "Production/Frontend/pages/auth/login.html"
  ],
  "summary": "로그인 페이지 UI 구현 완료",
  "next_steps": ["S2BA1: 로그인 API 구현"]
}
```

---

## 사용법

| 단계 | 행동 |
|------|------|
| 1 | Order Sheet JSON 작성 → Orders/ 저장 |
| 2 | Claude Code에 "Order Sheet 확인하고 작업해줘" |
| 3 | 작업 완료 후 Reports/ 폴더 확인 |

---

## 체크리스트

- [ ] Order Sheet에 필요한 정보가 모두 있는가?
- [ ] JSON 문법이 올바른가?
- [ ] 작업 완료 후 Report가 생성되었는가?

---

*상세 내용: `HUMAN_CLAUDECODE_BRIDGE_GUIDE.md` 참조*

