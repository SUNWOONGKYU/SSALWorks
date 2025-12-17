# outbox에 작업 결과 저장하기

## 핵심 요약

작업 결과를 `Web_ClaudeCode_Bridge/outbox/` 폴더에 JSON 파일로 저장하세요. 검증 결과, 완료 보고서 등을 저장해두면 나중에 참고하기 좋고, 작업 기록이 체계적으로 남습니다.

## outbox란?

Claude Code 작업 결과물을 **구조화된 형식으로 저장하는 폴더**입니다. 웹사이트나 다른 시스템에서 결과를 확인하거나, 나중에 참고할 때 활용합니다.

### 폴더 구조

```
Web_ClaudeCode_Bridge/
├── inbox/              # 작업 요청 (입력)
├── outbox/             # 작업 결과 (출력) ← 여기
│   ├── task_S2F1_completed.json
│   ├── task_S2F1_verification.json
│   └── ...
└── status/             # 상태 정보
```

## 왜 outbox를 사용하나?

### 1. 작업 이력 관리

```
outbox 없이:
"저번에 뭘 완료했더라?" → 기억 안 남

outbox 사용:
outbox/ 폴더 확인 → 완료된 작업 목록 → 상세 내용 확인 가능
```

### 2. 검증 결과 보관

```
검증 결과를 JSON으로 저장
→ 언제든 확인 가능
→ 문제 발생 시 추적 용이
```

### 3. 웹 연동

웹사이트에서 outbox 파일을 읽어 진행 상황을 표시할 수 있습니다.

## 저장할 파일 종류

### 1. 작업 완료 보고서

```json
{
  "task_id": "S2F1",
  "task_name": "로그인 UI 구현",
  "status": "completed",
  "completed_at": "2025-01-15T14:30:00Z",
  "summary": "로그인 페이지 UI 구현 완료",
  "files_created": [
    "Production/Frontend/pages/auth/login.html",
    "Production/Frontend/css/auth.css"
  ],
  "files_modified": [],
  "notes": "반응형 레이아웃 적용 완료"
}
```

**파일명**: `task_S2F1_completed.json`

### 2. 검증 결과 보고서

```json
{
  "task_id": "S2F1",
  "task_name": "로그인 UI 구현",
  "verification_type": "code_review",
  "verified_at": "2025-01-15T14:45:00Z",
  "result": "passed",
  "checks": {
    "file_structure": "✅ 통과",
    "code_quality": "✅ 통과",
    "responsive_design": "✅ 통과",
    "accessibility": "⚠️ alt 속성 1개 누락"
  },
  "issues": [
    {
      "severity": "low",
      "file": "login.html",
      "line": 42,
      "message": "이미지 alt 속성 누락",
      "status": "fixed"
    }
  ],
  "final_result": "✅ 검증 통과"
}
```

**파일명**: `task_S2F1_verification.json`

### 3. Stage Gate 보고서

```json
{
  "stage": "S2",
  "stage_name": "개발-1차",
  "gate_type": "stage_gate",
  "verified_at": "2025-01-15T16:00:00Z",
  "tasks_total": 10,
  "tasks_completed": 10,
  "all_verifications_passed": true,
  "summary": {
    "frontend": "3/3 완료",
    "backend": "4/4 완료",
    "database": "2/2 완료",
    "testing": "1/1 완료"
  },
  "recommendation": "S3 진행 가능"
}
```

**파일명**: `S2_stage_gate_report.json`

## 파일 명명 규칙

### 기본 형식

```
[카테고리]_[식별자]_[유형].json

예시:
task_S2F1_completed.json      # Task 완료
task_S2F1_verification.json   # Task 검증
S2_stage_gate_report.json     # Stage Gate
daily_2025-01-15_summary.json # 일일 요약
```

### 권장 파일명 패턴

| 유형 | 파일명 패턴 | 예시 |
|------|------------|------|
| Task 완료 | `task_[ID]_completed.json` | `task_S2F1_completed.json` |
| Task 검증 | `task_[ID]_verification.json` | `task_S2F1_verification.json` |
| Stage Gate | `[Stage]_stage_gate_report.json` | `S2_stage_gate_report.json` |
| 일일 요약 | `daily_[날짜]_summary.json` | `daily_2025-01-15_summary.json` |

## 작성 시점

### 언제 저장하나?

```
✅ 저장해야 하는 시점:
- Task 완료 시 → 완료 보고서
- Task 검증 완료 시 → 검증 결과
- Stage Gate 통과 시 → Stage 보고서
- 중요한 마일스톤 달성 시

❌ 저장 불필요:
- 진행 중인 작업 (완료 전)
- 임시 테스트 결과
- 사소한 변경
```

## JSON 작성 팁

### 필수 포함 항목

```json
{
  "task_id": "식별자",
  "timestamp": "ISO 8601 형식",
  "status": "completed/failed/in_progress",
  "summary": "한 줄 요약"
}
```

### 일관된 형식 유지

```json
// ✅ 좋은 예: 일관된 키 이름
{
  "task_id": "S2F1",
  "completed_at": "2025-01-15T14:30:00Z"
}

// ❌ 나쁜 예: 일관성 없음
{
  "taskID": "S2F1",
  "completedTime": "2025-01-15 14:30"
}
```

### 타임스탬프 형식

```
ISO 8601 형식 사용:
2025-01-15T14:30:00Z
2025-01-15T14:30:00+09:00
```

## outbox 관리

### 정리 주기

```
1주 이상 된 파일:
→ archive/ 폴더로 이동 (선택)
→ 또는 그대로 보관

1개월 이상 된 파일:
→ 압축하여 보관
→ 또는 삭제 검토
```

### 폴더 구조 예시

```
outbox/
├── current/           # 최근 결과물
│   ├── task_S2F1_completed.json
│   └── task_S2F2_verification.json
└── archive/           # 오래된 결과물
    └── 2025-01/
        └── ...
```

## 웹사이트 연동

### 연동 방식

```
Claude Code → outbox에 JSON 저장
→ 웹사이트에서 outbox 폴더 읽기
→ 대시보드에 진행 상황 표시
```

### 활용 예시

```javascript
// 웹사이트에서 outbox 파일 읽기
const completedTasks = fs.readdirSync('outbox/')
  .filter(f => f.includes('_completed.json'))
  .map(f => JSON.parse(fs.readFileSync(`outbox/${f}`)));
```

## 주의사항

- JSON 문법 오류 없이 작성 (파싱 실패 방지)
- 민감정보(API 키 등) 포함 금지
- 파일명에 공백 사용 금지 (언더스코어 사용)
- 너무 큰 파일은 분할 저장
- 정기적으로 오래된 파일 정리
