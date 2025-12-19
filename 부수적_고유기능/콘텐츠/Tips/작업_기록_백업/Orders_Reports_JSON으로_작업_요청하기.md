# Orders/Reports JSON으로 작업 요청하기

## 요약
`Human_ClaudeCode_Bridge/Orders/`에 Order Sheet JSON 저장 → Claude Code 작업 → `Reports/`에 결과 JSON 저장. 구조화된 형식으로 세션이 끊어져도 AI가 이전 작업 기억.

## 상세

### 폴더 구조

```
Human_ClaudeCode_Bridge/
├── Orders/     # 작업 요청 (사람 → AI)
└── Reports/    # 작업 결과 (AI → 사람)
```

### Order Sheet 예시

```json
{
  "order_id": "ORDER-FE-251214-01",
  "task_name": "로그인 페이지 UI",
  "instructions": [
    "이메일/비밀번호 입력 폼",
    "반응형 디자인"
  ],
  "expected_files": [
    "Production/Frontend/pages/auth/login.html"
  ]
}
```

### Report 예시

```json
{
  "report_id": "REPORT-FE-251214-01",
  "status": "completed",
  "files_created": ["login.html"],
  "next_steps": ["S2BA1: 로그인 API"]
}
```

### 사용법

| 단계 | 행동 |
|------|------|
| 1 | Order Sheet JSON 작성 → Orders/ 저장 |
| 2 | "Order Sheet 확인하고 작업해줘" |
| 3 | 완료 후 Reports/ 확인 |

---
📚 더 자세히: `HUMAN_CLAUDECODE_BRIDGE_GUIDE.md`
