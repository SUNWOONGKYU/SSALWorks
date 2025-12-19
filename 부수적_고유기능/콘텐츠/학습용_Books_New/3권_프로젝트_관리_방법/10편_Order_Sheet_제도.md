# 10편 | Order Sheet 제도

---

Order Sheet는 사람이 AI에게 작업을 요청하는 표준 문서이다. 대화 방식이 아닌 구조화된 문서로 작업을 요청하면 더 정확하고 일관된 결과를 얻을 수 있다. 이 편에서는 Order Sheet 제도의 전체 구조와 사용법을 살펴본다.

## 1. Order Sheet란

### 정의

Order Sheet는 AI에게 작업을 요청하는 공식 문서이다.

```
일반 대화: "로그인 페이지 만들어줘. 아 그리고 Google 로그인도..."
Order Sheet: 구조화된 문서 + Task ID + 참조 규칙 + 결과물 경로
```

### 왜 Order Sheet를 사용하나

**대화 방식의 문제점:**
- 모호한 요청 → 잘못된 결과
- 요청 내용 휘발 → 나중에 추적 불가
- 일관성 없음 → 매번 다른 형식

**Order Sheet의 장점:**
- 구조화된 요청 → 명확한 결과
- JSON 저장 → 영구 기록
- 표준 형식 → 일관된 품질

### 핵심 특징

| 특징 | 설명 |
|------|------|
| 구조화 | Task ID, 의존성, 결과물 경로 등 명확한 필드 |
| 추적 가능 | Orders 폴더에 저장, 나중에 검색 가능 |
| 규칙 연결 | `.claude/rules/` 파일 참조로 일관성 유지 |
| 세션 독립 | 세션이 끊어져도 Order 파일로 이어서 작업 |

---

## 2. Order Sheet 형식

### 2.1 JSON 형식 (권장)

Claude Code가 파싱하기 쉬운 JSON 형식이 권장된다.

```json
{
  "order_id": "ORDER-S2F1-251218",
  "task_id": "S2F1",
  "task_name": "Google 로그인 UI",
  "priority": "높음",
  "created_at": "2025-12-18T10:00:00Z",
  "instructions": "Google OAuth 로그인 버튼이 있는 로그인 페이지 구현",
  "expected_output": [
    "Production/Frontend/pages/auth/google-login.html"
  ],
  "dependencies": ["S1S1", "S1BI1"],
  "rules_reference": [
    ".claude/rules/01_file-naming.md",
    ".claude/rules/02_save-location.md",
    ".claude/rules/05_execution-process.md"
  ]
}
```

### 2.2 필드 설명

| 필드 | 설명 | 필수 |
|------|------|:----:|
| order_id | Order 고유 ID | ✅ |
| task_id | Grid Task ID (S2F1 등) | ✅ |
| task_name | Task 이름 | ✅ |
| priority | 우선순위 (높음/중간/낮음) | ⭕ |
| created_at | 생성 시간 (ISO 8601) | ✅ |
| instructions | 작업 지시사항 | ✅ |
| expected_output | 예상 결과물 파일 목록 | ✅ |
| dependencies | 선행 Task ID 목록 | ⭕ |
| rules_reference | 필수 참조 규칙 파일 목록 | ✅ |

### 2.3 rules_reference 필드

**모든 Order Sheet에 반드시 포함해야 하는 필드이다.**

| Task Area | 필수 규칙 파일 |
|-----------|---------------|
| 모든 Task | `01_file-naming.md`, `02_save-location.md`, `05_execution-process.md` |
| F, BA, D | + `03_area-stage.md` (Production 이중 저장) |
| 검증 관련 | + `04_grid-writing.md`, `06_verification.md` |

---

## 3. MD 템플릿

### 3.1 표준 템플릿 구조

웹사이트에서 사용하는 MD 템플릿 형식이다.

```markdown
# Order Sheet - [단계명]

## 작업 지시

**Claude AI에게**: [작업 내용 설명]

---

## 작업 내용

### 1. [작업 항목 1]
[상세 설명]

### 2. [작업 항목 2]
[상세 설명]

---

## 사용자 입력 (필수)

**[입력 항목명]:**
```
[여기에 입력하세요]
```

---

## 결과물 저장 위치

- `[저장 경로]`

---

## 제약 조건

- [제약 사항 1]
- [제약 사항 2]
```

### 3.2 템플릿 목록

```
Order_Sheet_템플릿/
├── P1_사업계획/          # P1-1 ~ P1-3 (3개)
├── P2_프로젝트_기획/      # P2-1 ~ P2-4 (8개)
├── P3_프로토타입_제작/    # P3-1 ~ P3-3 (4개)
├── S1_개발_준비/         # S1 (1개)
├── S2_개발_1차/          # S2 (1개)
├── S3_개발_2차/          # S3 (1개)
├── S4_개발_3차/          # S4 (1개)
├── S5_운영/              # S5 (1개)
└── 특별단계/             # SP-1, SP-2 (2개)
```

총 22개 표준 템플릿이 있다.

---

## 4. 처리 프로세스

### 전체 흐름

```
┌─────────────────────────────────────────────────────────────────┐
│                    Order Sheet 처리 플로우                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   [Dashboard]                                                    │
│       │                                                          │
│       ├─ Order Sheet 작성                                        │
│       │                                                          │
│       ├─ [Order Sheet 전달하기] 버튼 클릭                         │
│       │         │                                                │
│       │         ├─► 📋 클립보드에 복사 ──► Claude Code 붙여넣기   │
│       │         │                                                │
│       │         └─► 💾 JSON 다운로드 ──► Orders 폴더 저장        │
│       │                                                          │
│       │                              ▼                           │
│       │                      [Claude Code]                       │
│       │                              │                           │
│       │                      1. Orders 폴더에 저장               │
│       │                      2. 작업 수행                        │
│       │                      3. Reports 폴더에 결과 저장         │
│       │                              │                           │
│       │                              ▼                           │
│       └─ [Reports 불러오기] 버튼 ◄────┘                          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Claude Code의 처리 순서

```
1. Order Sheet 받음
      ↓
2. Orders 폴더에 저장 (필수!)
   → Human_ClaudeCode_Bridge/Orders/ORDER-XXX.json
      ↓
3. 실제 작업 수행
   → 코드 작성, 파일 생성, 테스트 등
      ↓
4. 결과를 Reports 폴더에 저장
   → Human_ClaudeCode_Bridge/Reports/XXX_completed.json
      ↓
5. 사용자에게 완료 보고
```

---

## 5. 폴더 구조

### Human_ClaudeCode_Bridge

```
Human_ClaudeCode_Bridge/
├── Orders/                # Order Sheet 저장 (Claude Code가 받으면 여기 저장)
│   ├── ORDER-S2-20251218-001.json
│   ├── ORDER-S3-20251218-001.json
│   └── ...
├── Reports/               # 작업 결과 보고서 저장
│   ├── S2F1_completed.json
│   ├── S2F1_verification.json
│   └── ...
└── HUMAN_CLAUDECODE_BRIDGE_GUIDE.md  # 시스템 가이드
```

### 파일 형식 규칙

| 파일 종류 | 형식 | 이유 |
|----------|------|------|
| Order Sheet | `.json` | AI가 파싱하여 작업 내용 파악 |
| 작업 완료 보고서 | `.json` | 다음 세션에서 이전 작업 파악 |
| 검증 리포트 | `.json` | 구조화된 검증 결과 |
| 요약 문서 | `.md` | 사람이 읽기 편한 설명 (선택) |

---

## 6. Report 형식

### 작업 완료 보고서 (JSON)

```json
{
  "order_id": "ORDER-S2F1-251218",
  "task_id": "S2F1",
  "task_name": "Google 로그인 UI",
  "status": "completed",
  "files_created": [
    "Production/Frontend/pages/auth/google-login.html"
  ],
  "verification": {
    "test": "✅ 10/10 통과",
    "build": "✅ 성공"
  },
  "completed_at": "2025-12-18T11:30:00Z",
  "next_steps": [
    "S2BA1 - 로그인 API 구현"
  ]
}
```

### 핵심 필드

| 필드 | 설명 |
|------|------|
| order_id | 원본 Order ID |
| task_id | 완료한 Task ID |
| status | completed, failed, blocked |
| files_created | 생성된 파일 목록 |
| verification | 검증 결과 |
| next_steps | 다음 작업 |

---

## 7. 메모리/컨텍스트 이점

### 왜 JSON으로 저장하나

```
┌─────────────────────────────────────────────────────────────────┐
│              Orders/Reports 시스템의 메모리 이점                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ❌ 기존 방식의 문제점                                           │
│  ────────────────────────────────────────────────────────────   │
│  채팅 방식:                                                      │
│  - 세션 종료 시 대화 내용 휘발                                   │
│  - 컨텍스트 길이 제한 (토큰 한계)                                │
│  - 작업 추적 어려움                                              │
│                                                                  │
│  ✅ Orders/Reports JSON 시스템의 해결책                          │
│  ────────────────────────────────────────────────────────────   │
│  - 구조화된 JSON = 필드별 즉시 검색                              │
│  - 작업 요청 → Orders 폴더에 영구 저장                           │
│  - 작업 결과 → Reports 폴더에 영구 저장                          │
│  - 새 세션에서도 이전 작업 기록 참조 가능                        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 방식별 비교

| 항목 | 채팅 방식 | work_log | Orders/Reports |
|------|----------|----------|----------------|
| 구조화 | ❌ 없음 | ❌ 없음 | ✅ 완벽 |
| 검색 | ❌ 어려움 | △ 텍스트만 | ✅ 필드별 |
| 연속성 | ❌ 끊김 | △ 제한적 | ✅ 완벽 |
| AI 기억 | ❌ 제한 | △ 부분적 | ✅ 100% |

---

## 8. 웹사이트 연동

### Dashboard 버튼

| 버튼 | 색상 | 기능 |
|------|------|------|
| Workspace 지우기 | 회색 | Workspace 내용 초기화 |
| Order Sheet 전달하기 | 초록색 | 클립보드 복사 또는 JSON 저장 |
| Reports 불러오기 | 파란색 | Reports 폴더에서 파일 선택 |

### 전달하기 옵션

**옵션 1: 클립보드에 복사**
- 클립보드에 Order Sheet 복사
- Claude Code CLI에 `Ctrl+V`로 붙여넣기

**옵션 2: Orders 폴더에 저장**
- JSON 파일 다운로드
- `Human_ClaudeCode_Bridge/Orders/`에 저장

### Reports 불러오기

1. [Reports 불러오기] 버튼 클릭
2. `Human_ClaudeCode_Bridge/Reports/` 폴더에서 파일 선택
3. HTML 모달로 결과 확인

---

## 9. Stage 단위 Order Sheet

### Stage 단위 요청

개별 Task가 아닌 Stage 전체를 요청할 수 있다.

```json
{
  "order_id": "ORDER-S3-20251218-001",
  "stage": "S3",
  "stage_name": "개발 2차 (Advanced Features)",
  "execution_steps": {
    "step_1": "SAL Grid 확인 - S3 Task 목록 조회",
    "step_2": "Task 실행 순서 결정 - Dependencies 기반",
    "step_3": "각 Task 실행 - Task Agent 투입",
    "step_4": "결과물 저장 - Stage/Area + Production 이중 저장",
    "step_5": "검증 - Verification Agent 투입",
    "step_6": "Grid 업데이트",
    "step_7": "Stage Gate 검증",
    "step_8": "PO 기능 테스트 요청"
  },
  "core_principles": [
    "Grid가 진실의 원천: 모든 Task 정보는 SAL Grid에 있음",
    "Grid를 읽고 실행: Order Sheet는 Grid 보고 해라라고 지시할 뿐",
    "Grid에 기록: 작업 결과는 Grid에 업데이트"
  ]
}
```

### 핵심 원칙

**Grid가 진실의 원천:**
- Task 목록, Instruction, 의존성 모두 Grid에 있음
- Order Sheet는 "Grid 보고 해라"라고 지시할 뿐
- 작업 결과는 Grid에 업데이트

---

## 10. 다음 단계

10편에서는 Order Sheet 제도를 살펴봤다.

- Order Sheet = 구조화된 작업 요청 문서
- JSON 형식 + rules_reference 필수
- Orders(요청) / Reports(결과) 분리 저장
- 세션 간 완벽한 연속성 확보

다음 편에서는 AI 작업 6대 규칙과 규칙 반영 방법을 살펴본다.

---

*다음 편: 11편 | AI 작업 6대 규칙*

---

**작성일: 2025-12-20 / 글자수: 약 5,200자 / 작성자: Claude / 프롬프터: 써니**
