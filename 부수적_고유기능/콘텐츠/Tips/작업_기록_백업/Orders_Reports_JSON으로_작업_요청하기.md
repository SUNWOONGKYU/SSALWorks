# Orders/Reports JSON으로 작업 요청하기

## 핵심 요약

Claude Code에게 작업을 요청할 때 **Order Sheet JSON 파일**을 만들어 `Human_ClaudeCode_Bridge/Orders/` 폴더에 저장하세요. 작업 완료 후 Claude Code가 **Report JSON**을 `Reports/` 폴더에 저장합니다. 이렇게 하면 세션이 끊어져도 AI가 이전 작업을 기억합니다.

## 왜 JSON 형식인가?

```
MD 파일로 요청:
"로그인 기능 만들어줘" → AI가 해석해야 함 → 오해 가능성

JSON 파일로 요청:
{
  "task_name": "로그인 API",
  "instructions": ["Supabase Auth 사용", "에러 핸들링"]
}
→ 구조화된 정보 → 정확한 이해
```

### JSON의 장점

| 특징 | MD 파일 | JSON 파일 |
|------|---------|-----------|
| AI 파싱 | 해석 필요 | 즉시 이해 |
| 세션 간 기억 | 제한적 | 완전 유지 |
| 자동화 | 어려움 | 스크립트 연동 가능 |
| 검색 | 텍스트만 | 필드별 쿼리 |

## 폴더 구조

```
Human_ClaudeCode_Bridge/
├── Orders/                    # 작업 요청서 (사람 → AI)
│   └── ORDER-GE-251213-01.json
├── Reports/                   # 작업 결과 (AI → 사람)
│   └── REPORT-GE-251213-01.json
└── HUMAN_CLAUDECODE_BRIDGE_GUIDE.md
```

## Order Sheet 작성법

### 기본 구조

```json
{
  "order_id": "ORDER-GE-251213-01",
  "created_at": "2025-12-13T14:30:00+09:00",
  "requester": "Human",
  "task_id": "S2BA1",
  "task_name": "회원가입 API 구현",
  "priority": "high",
  "instructions": [
    "이메일/비밀번호 검증 구현",
    "Supabase Auth 연동",
    "에러 핸들링 추가"
  ],
  "expected_files": [
    "Production/Backend_APIs/auth/signup.ts"
  ]
}
```

### Order ID 규칙

```
ORDER-[용도]-[날짜]-[번호]

용도 코드:
- GE: 일반
- FE: 프론트엔드
- BE: 백엔드
- BF: 버그 수정

예: ORDER-BE-251213-01
```

### 필수 필드

| 필드 | 설명 | 예시 |
|------|------|------|
| order_id | 고유 ID | "ORDER-GE-251213-01" |
| task_name | 작업명 | "회원가입 API" |
| instructions | 지시사항 배열 | ["구현1", "구현2"] |
| expected_files | 결과물 경로 | ["경로/파일.ts"] |

## Report 구조

Claude Code가 작업 완료 후 자동 생성:

```json
{
  "report_id": "REPORT-GE-251213-01",
  "order_id": "ORDER-GE-251213-01",
  "status": "completed",
  "summary": "회원가입 API 구현 완료",
  "files_created": [
    {
      "path": "Production/Backend_APIs/auth/signup.ts",
      "lines": 145
    }
  ],
  "verification": {
    "unit_test": "24/24 passed",
    "build": "success"
  },
  "next_steps": ["S2BA2: 로그인 API"]
}
```

## 실제 사용법

### 1. Order Sheet 작성

```json
// Orders/ORDER-FE-251214-01.json
{
  "order_id": "ORDER-FE-251214-01",
  "task_name": "로그인 페이지 UI",
  "instructions": [
    "이메일/비밀번호 입력 폼",
    "로그인 버튼 스타일링",
    "반응형 디자인"
  ],
  "expected_files": [
    "Production/Frontend/pages/auth/login.html"
  ]
}
```

### 2. Claude Code에게 전달

```
"Order Sheet 보냈으니 확인하고 작업해줘"
```

### 3. Report 확인

```
"Report 확인하고 다음 작업 알려줘"
```

## AI 메모리 활용

### 세션이 끊어졌을 때

```
이전 세션: Report JSON 저장됨
    ↓
새 세션 시작
    ↓
"Reports 폴더에서 최근 작업 확인해줘"
    ↓
AI가 Report 읽고 컨텍스트 파악
```

### 작업 히스토리 추적

```
"이번 주 완료된 Report들 정리해줘"
```

## 체크리스트

### Order Sheet 작성 시

- [ ] instructions 구체적으로 작성
- [ ] expected_files 명시
- [ ] priority 설정 (high/medium/low)
- [ ] task_id 연결 (SAL Grid 사용 시)

### Report 확인 시

- [ ] status 확인 (completed/partial/blocked)
- [ ] files_created 목록 확인
- [ ] verification 결과 확인
- [ ] next_steps 확인

## 주의사항

- 시간 추정은 포함하지 않기 (AI가 시간 추정 못함)
- 모호한 지시 피하기 ("적당히" → 구체적으로)
- 한 번에 너무 많은 작업 요청 피하기
- Report 없이 다음 작업 진행하지 않기
- 오래된 파일은 정기적으로 정리
