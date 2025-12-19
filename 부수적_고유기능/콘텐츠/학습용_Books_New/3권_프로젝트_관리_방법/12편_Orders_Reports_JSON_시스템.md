# 12편 | Orders/Reports JSON 시스템

---

SAL Grid 시스템에서 Orders/Reports는 Human-AI 통신의 핵심이다. 구조화된 JSON으로 요청과 결과를 저장하면 세션 간 연속성이 보장되고 AI 메모리 문제가 해결된다. 이 편에서는 JSON 시스템의 상세 구조를 살펴본다.

## 1. 시스템 개요

### 왜 JSON인가

```
채팅 방식: "로그인 기능 만들어줘" → 세션 끊기면 휘발
JSON 방식: { "task_id": "S2F1", ... } → 파일로 영구 저장
```

### 핵심 이점

| 이점 | 설명 |
|------|------|
| 구조화 | 필드별로 명확하게 구분 |
| 검색 가능 | task_id, status 등으로 필터링 |
| 세션 독립 | 세션이 끊어져도 파일 유지 |
| 자동화 | 프로그래밍으로 처리 가능 |
| AI 메모리 | 이전 작업 100% 참조 가능 |

### 폴더 구조

```
Human_ClaudeCode_Bridge/
├── Orders/                # 작업 요청 (Human → AI)
│   ├── ORDER-S2F1-251218.json
│   └── ORDER-S3-251220-001.json
└── Reports/               # 작업 결과 (AI → Human)
    ├── S2F1_completed.json
    ├── S2F1_verification.json
    └── S2_stage_gate_report.json
```

---

## 2. Order JSON 구조

### 기본 구조

```json
{
  "order_id": "ORDER-S2F1-251218",
  "task_id": "S2F1",
  "task_name": "Google 로그인 UI",
  "stage": "S2",
  "area": "F",
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
  ],

  "additional_context": {
    "design_reference": "Figma 링크 또는 설명",
    "api_spec": "연동할 API 정보"
  }
}
```

### 필드별 설명

**필수 필드:**

| 필드 | 타입 | 설명 |
|------|------|------|
| order_id | string | Order 고유 ID |
| task_id | string | Grid Task ID |
| task_name | string | Task 이름 |
| created_at | ISO 8601 | 생성 시간 |
| instructions | string | 작업 지시사항 |
| expected_output | array | 예상 결과물 경로 |
| rules_reference | array | 참조할 규칙 파일 |

**선택 필드:**

| 필드 | 타입 | 설명 |
|------|------|------|
| stage | string | Stage 코드 (S1~S5) |
| area | string | Area 코드 (11개) |
| priority | string | 우선순위 |
| dependencies | array | 선행 Task ID |
| additional_context | object | 추가 정보 |

---

## 3. Stage 단위 Order

### 구조

개별 Task가 아닌 Stage 전체를 요청할 때 사용한다.

```json
{
  "order_id": "ORDER-S3-20251220-001",
  "stage": "S3",
  "stage_name": "개발 2차 (Advanced Features)",
  "version": "3.0",
  "created_at": "2025-12-20",
  "status": "in_progress",

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

  "references": {
    "sal_grid": "S0_Project-SAL-Grid_생성/ssal-grid/",
    "grid_manual": "S0_Project-SAL-Grid_생성/manual/PROJECT_SAL_GRID_MANUAL.md",
    "project_rules": ".claude/CLAUDE.md"
  },

  "core_principles": [
    "Grid가 진실의 원천: 모든 Task 정보는 SAL Grid에 있음",
    "Grid를 읽고 실행: Order Sheet는 Grid 보고 해라라고 지시할 뿐",
    "Grid에 기록: 작업 결과는 Grid에 업데이트"
  ]
}
```

### Stage Order의 특징

**Grid 중심 실행:**
- Order에 상세 지시 없음
- "Grid 보고 실행하라"는 지시만 있음
- 실제 Task 정보는 SAL Grid에서 읽음

**자동 순서 결정:**
- dependencies 필드로 실행 순서 자동 결정
- 의존성 없는 Task는 병렬 실행 가능

---

## 4. Report JSON 구조

### 4.1 Task 완료 보고서

```json
{
  "report_type": "task_completion",
  "order_id": "ORDER-S2F1-251218",
  "task_id": "S2F1",
  "task_name": "Google 로그인 UI",
  "status": "completed",

  "execution": {
    "started_at": "2025-12-18T10:30:00Z",
    "completed_at": "2025-12-18T11:45:00Z",
    "duration": "1h 15m",
    "task_agent": "frontend-developer"
  },

  "files_created": [
    {
      "path": "S2_개발-1차/Frontend/pages/auth/google-login.html",
      "type": "stage"
    },
    {
      "path": "Production/Frontend/pages/auth/google-login.html",
      "type": "production"
    }
  ],

  "summary": "Google OAuth 로그인 페이지 구현 완료. 버튼 클릭 시 Supabase Auth로 연동.",

  "next_steps": [
    "S2BA1 - 로그인 API 구현",
    "S2F2 - 회원가입 페이지 UI"
  ]
}
```

### 4.2 검증 보고서

```json
{
  "report_type": "verification",
  "task_id": "S2F1",
  "verification_agent": "code-reviewer",
  "verified_at": "2025-12-18T12:00:00Z",

  "test_result": {
    "unit_test": "✅ 5/5 통과",
    "integration_test": "✅ 3/3 통과",
    "edge_cases": "✅ 2/2 통과",
    "manual_test": "✅ UI 확인 완료"
  },

  "build_verification": {
    "compile": "✅ 성공",
    "lint": "✅ ESLint 에러 0개",
    "deploy": "✅ Vercel 배포 성공",
    "runtime": "✅ 에러 없음"
  },

  "integration_verification": {
    "dependency_propagation": "✅ S1S1 Supabase Auth 연동 확인",
    "cross_task_connection": "✅ S1BI1 Client 정상 사용",
    "data_flow": "✅ 입출력 정상"
  },

  "blockers": {
    "dependency": "None",
    "environment": "None",
    "external_api": "None",
    "status": "No Blockers ✅"
  },

  "comprehensive_verification": {
    "task_instruction": "✅ 모든 요구사항 구현",
    "test": "✅ 10/10 통과",
    "build": "✅ 4/4 통과",
    "integration": "✅ 3/3 통과",
    "blockers": "✅ None",
    "final": "✅ Passed"
  }
}
```

### 4.3 Stage Gate 보고서

```json
{
  "report_type": "stage_gate",
  "stage": "S2",
  "stage_name": "개발 1차 (Core Development)",
  "verified_at": "2025-12-18T15:00:00Z",

  "task_summary": {
    "total": 12,
    "completed": 12,
    "passed": 12,
    "failed": 0,
    "completion_rate": "100%"
  },

  "tasks": [
    {
      "task_id": "S2F1",
      "task_name": "Google 로그인 UI",
      "status": "✅ 완료",
      "verification": "✅ Passed"
    },
    {
      "task_id": "S2BA1",
      "task_name": "구독 취소 API",
      "status": "✅ 완료",
      "verification": "✅ Passed"
    }
  ],

  "overall_verification": {
    "all_tasks_completed": true,
    "all_tests_passed": true,
    "no_blockers": true,
    "build_success": true,
    "integration_verified": true
  },

  "ai_verification_note": "모든 S2 Task가 정상적으로 완료되었습니다. S3 진행 준비 완료.",

  "po_test_guide": {
    "pre_conditions": [
      "Supabase Google Provider 설정 완료",
      "환경 변수 설정 완료"
    ],
    "test_cases": [
      {
        "feature": "Google 로그인",
        "file": "Production/Frontend/pages/auth/google-login.html",
        "method": "브라우저에서 열고 버튼 클릭",
        "expected": "Google 로그인 페이지로 이동"
      }
    ]
  },

  "stage_gate_status": "AI Verified - PO 승인 대기"
}
```

---

## 5. Report 파일 명명 규칙

### 파일명 형식

| Report 유형 | 파일명 형식 | 예시 |
|-------------|-------------|------|
| Task 완료 | `{task_id}_completed.json` | `S2F1_completed.json` |
| 검증 결과 | `{task_id}_verification.json` | `S2F1_verification.json` |
| Stage Gate | `{stage}_stage_gate_report.json` | `S2_stage_gate_report.json` |
| 특수 보고 | `{날짜}_{설명}.json` | `2025-12-18_api_restructure.json` |

### 저장 위치

```
Human_ClaudeCode_Bridge/Reports/
├── S2F1_completed.json
├── S2F1_verification.json
├── S2BA1_completed.json
├── S2BA1_verification.json
├── S2_stage_gate_report.json
└── ...
```

---

## 6. 세션 간 연속성

### 새 세션에서 이전 작업 파악

```
1. Reports 폴더 확인
      ↓
2. 최신 Report 읽기
      ↓
3. 마지막 작업 상태 파악
      ↓
4. 이어서 작업 진행
```

### 실전 예시

```
세션 1: S2F1 완료 → S2F1_completed.json 저장
        (세션 종료)

세션 2: Reports/ 확인 → S2F1_completed.json 읽기
        → "S2F1 완료됨, next_steps: S2BA1"
        → S2BA1 작업 시작
```

### 검색 활용

```bash
# 특정 Task 상태 확인
grep -l "S2F1" Reports/*.json

# 완료된 Task 목록
grep -l '"status": "completed"' Reports/*_completed.json

# 실패한 검증 찾기
grep -l '"final": "❌ Failed"' Reports/*_verification.json
```

---

## 7. 방식별 비교 (최종)

| 항목 | 채팅 | work_log | Orders/Reports |
|------|------|----------|----------------|
| 구조화 | ❌ | ❌ | ✅ JSON |
| 검색 | ❌ | △ | ✅ 필드별 |
| 자동화 | ❌ | ❌ | ✅ 쉬움 |
| 연속성 | ❌ | △ | ✅ 완벽 |
| AI 기억 | ❌ | △ | ✅ 100% |
| 웹 연동 | ❌ | ❌ | ✅ Dashboard |

---

## 8. 다음 단계

12편에서는 Orders/Reports JSON 시스템을 살펴봤다.

- Order JSON: 구조화된 작업 요청
- Report JSON: Task 완료, 검증, Stage Gate 보고서
- 세션 간 완벽한 연속성 확보
- AI 메모리 문제 해결

3권 전체를 마무리한다.

---

## 3권 총정리

| 편 | 제목 | 핵심 |
|----|------|------|
| 1편 | SAL Grid 개요 | 3D 좌표계 + 22개 속성 |
| 2편 | 22개 속성 정의 | 기본 정보, 실행, 검증 |
| 3편 | 5×11 Matrix | Stage × Area |
| 4편 | Task 생성과 의존성 | Task ID, dependencies |
| 5편 | Task Instruction | 명확한 작업 지시 |
| 6편 | Verification Instruction | 검증 기준 |
| 7편 | 검증 시스템과 Stage Gate | 3단계 검증 |
| 8편 | Supabase + HTML Viewer | DB 저장, 시각화 |
| 9편 | SAL Grid 매뉴얼 활용법 | 27개 섹션 참조 |
| 10편 | Order Sheet 제도 | 구조화된 작업 요청 |
| 11편 | AI 작업 6대 규칙 | .claude/rules/ |
| 12편 | Orders/Reports JSON | 세션 간 연속성 |

---

*3권: 프로젝트 관리 방법 - 완료*

---

**작성일: 2025-12-20 / 글자수: 약 4,800자 / 작성자: Claude / 프롬프터: 써니**
