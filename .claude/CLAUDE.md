# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## 📋 AI 규칙 체계 (4가지)

| # | 카테고리 | 개수 | 위치 | 성격 |
|---|----------|:----:|------|------|
| 1 | 7대 Rules | 7개 | `.claude/rules/` | 작업별 상세 규칙 |
| 2 | 3대 Methods | 3개 | `.claude/methods/` | 특정 상황 절차 |
| 3 | 12대 Compliance | 12개 | `.claude/compliance/` | 행동 원칙 |
| 4 | 5대 절대 규칙 | 5개 | 이 파일 (아래) | 위반 시 즉시 중단 |

> **상세 목록:** `.claude/AI_RULE_LIST.md` 참조

---

## 🚨🚨🚨 7대 작업 규칙 - 반드시 먼저 확인! 🚨🚨🚨

> **⛔ 파일 생성/저장 전 반드시 해당 규칙 파일을 읽어야 함!**
> **⛔ 규칙 확인 없이 폴더 생성/파일 저장 절대 금지!**
> **⛔ "이렇게 하면 되겠지" 추측 금지 - 규칙 파일이 정답!**

| # | 규칙 파일 | 확인 시점 | 내용 |
|---|----------|----------|------|
| 1 | `01_file-naming.md` | 파일명 정할 때 | 파일 명명 규칙 |
| 2 | `02_save-location.md` | **파일 저장할 때** ⭐ | 저장 위치 규칙 |
| 3 | `03_area-stage.md` | 폴더 선택할 때 | Area/Stage 매핑 |
| 4 | `04_grid-writing-supabase.md` | **Grid/DB 작업할 때** ⭐ | Grid 작성 + Supabase CRUD |
| 5 | `05_execution-process.md` | Task 실행할 때 | 6단계 실행 프로세스 |
| 6 | `06_verification.md` | 검증할 때 | 검증 기준 |
| 7 | `07_task-crud.md` | **Task 추가/삭제/수정할 때** ⭐ | Task CRUD 프로세스 |

**📁 위치:** `.claude/rules/`

---

## 📊 DB vs JSON 데이터 구분 (핵심 개념)

> **이 구분을 이해해야 viewer 관련 작업 시 혼란이 없음!**
> **데이터 형식:** JSON 파일 사용

### 두 가지 데이터 소스

| 구분 | 데이터 소스 | 용도 | Viewer |
|------|------------|------|--------|
| **DB (Supabase)** | SSAL Works 프로젝트 | **예시**로 보여줌 | `viewer_database.html` |
| **JSON 파일** | 이용자 본인 프로젝트 | **진행 중인 프로젝트** | `viewer_json.html` |

### 작동 원리

```
┌─────────────────────────────────────────────────────────────┐
│  viewer_database.html (Supabase DB)                         │
│  → 항상 SSAL Works 데이터 = "예시"로 고정                     │
│  → 모든 이용자에게 동일한 예시를 보여줌                        │
│  → 경로: Supabase project_sal_grid 테이블                    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  viewer_json.html (JSON 파일 - 개별 파일 구조)                │
│  → 해당 이용자의 "진행 중인 프로젝트" 데이터                   │
│  → 이용자마다 다른 내용                                       │
│  → 경로: method/json/data/index.json + grid_records/*.json   │
│  → 개별 Task 파일: grid_records/S1BI1.json, S2F1.json 등     │
└─────────────────────────────────────────────────────────────┘
```

### SSAL Works AI의 경우 (특수)

```
예시 (DB)         = SSAL Works 프로젝트
자기 프로젝트 (JSON) = SSAL Works 프로젝트
→ 동일함 (자기가 만든 서비스이므로)
```

### 일반 이용자의 경우

```
예시 (DB)         = SSAL Works 프로젝트 (고정, 참고용)
자기 프로젝트 (JSON) = 본인이 진행 중인 프로젝트
→ 서로 다름
```

### JSON 데이터 구조 ⭐ (개별 파일 방식)

> **viewer_json.html은 GitHub URL을 통해 index.json + grid_records/ 구조를 로드**

**데이터 구조:**
```
S0_Project-SAL-Grid_생성/method/json/data/
├── index.json             ← 프로젝트 메타데이터 + task_ids 배열
└── grid_records/          ← 개별 Task JSON 파일 (66개)
    ├── S1BI1.json
    ├── S1BI2.json
    ├── S2F1.json
    └── ... (Task ID별 파일)
```

**index.json 구조:**
```json
{
  "project_id": "SSALWORKS",
  "project_name": "SSAL Works",
  "total_tasks": 66,
  "task_ids": ["S1BI1", "S1BI2", "S1D1", ...]
}
```

**개별 Task JSON (grid_records/S1BI1.json):**
```json
{
  "task_id": "S1BI1",
  "task_name": "Task 이름",
  "stage": 1,
  "area": "BI",
  "task_status": "Completed",
  "task_progress": 100,
  "verification_status": "Verified",
  ...
}
```

### viewer_json.html 데이터 로딩 방식 ⭐ (GitHub URL 통합)

> **모든 사용자가 동일한 방식으로 GitHub raw URL에서 데이터 로드**

**로딩 프로세스:**
```javascript
// 1. 사용자 이메일 확인 (URL 파라미터 또는 Supabase 세션)
const urlParams = new URLSearchParams(window.location.search);
let userEmail = urlParams.get('email') || session?.user?.email;

// 2. Supabase users 테이블에서 github_repo_url 조회
const { data: userData } = await supabaseClient
    .from('users')
    .select('github_repo_url')
    .eq('email', userEmail)
    .single();

// 3. GitHub repo URL → raw URL 변환
// 예: github.com/user/repo → raw.githubusercontent.com/user/repo/master
const rawBaseUrl = githubToRawUrl(userData.github_repo_url);

// 4. index.json 로드
const indexUrl = `${rawBaseUrl}/S0_.../method/json/data/index.json`;
const indexData = await fetch(indexUrl).then(r => r.json());

// 5. 각 Task JSON 파일 로드
for (const taskId of indexData.task_ids) {
    const taskUrl = `${rawBaseUrl}/S0_.../method/json/data/grid_records/${taskId}.json`;
    const taskData = await fetch(taskUrl).then(r => r.json());
}
```

**핵심 포인트:**
- 모든 사용자 동일한 로딩 방식 (wksun999 특별 처리 없음)
- Supabase `users` 테이블의 `github_repo_url` 필드 사용
- GitHub raw URL로 즉시 반영 (캐시 없음)

**함수 위치:**
- `githubToRawUrl()`: `viewer_json.html` 라인 416-425
- 에러 핸들링: `viewer_json.html` 라인 574-598

### 에러 핸들링 ⭐

| 에러 상황 | 코드 | UI 표시 |
|----------|------|---------|
| 사용자 미등록 (users 테이블) | `PGRST116` | "GitHub 연결 필요" (회색) |
| github_repo_url 없음 | - | "프로젝트 없음" 메시지 |
| 기타 조회 실패 | - | "사용자 조회 실패" (빨강) |
| JSON 파일 404 | fetch error | "프로젝트 없음" 메시지 |

### "프로젝트 없음" 안내 메시지

사용자의 JSON 파일이 없을 때 (404) 표시되는 메시지:

```
📋 진행 중인 프로젝트가 아직 없습니다

프로젝트를 등록하고 Project SAL Grid를 생성하면
여기에 진행 현황이 표시됩니다.

👉 메인 화면 왼쪽 사이드바에서 새로운 프로젝트를 등록하세요.

💡 진행 프로세스에서 S0 단계인 'Project SAL Grid 생성'이 끝나면,
   Claude Code에게 Viewer 연결을 요청하세요.
```

### ⚠️ 주의사항

- **DB 데이터 수정** = SSAL Works 내부 관리용 (일반 이용자 해당 없음)
- **JSON 데이터 수정** = 개별 Task JSON 파일 수정 (`grid_records/{task_id}.json`)
- **Task 추가 시** = `index.json`의 `task_ids` 배열에 추가 + `grid_records/`에 새 파일 생성

---

## 📦 프로젝트 등록 프로세스 (중요!)

> **Dev Package 다운로드까지 완료해야 등록 완료!**

### 프로세스 플로우

```
┌───────────────────────────────────────────────────────────┐
│ Step 1: 프로젝트 정보 입력                                  │
│  - 프로젝트명 (필수)                                        │
│  - 프로젝트 설명 (선택)                                     │
│  - [다음 →] 버튼 클릭                                       │
└───────────────────────────────────────────────────────────┘
                         ↓
┌───────────────────────────────────────────────────────────┐
│ Step 2: Dev Package 다운로드 (필수!)                        │
│  ✅ "프로젝트 정보가 등록되었습니다!"                         │
│  📦 Dev Package 다운로드 버튼 클릭                           │
│  ⚠️ 다운로드 전까지 모달 닫기 불가                           │
└───────────────────────────────────────────────────────────┘
                         ↓
┌───────────────────────────────────────────────────────────┐
│ Step 3: 등록 완료                                           │
│  🎉 "프로젝트 등록 완료!"                                    │
│  📋 다음 단계 안내 + [확인] 버튼                             │
└───────────────────────────────────────────────────────────┘
```

### 핵심 규칙

| 규칙 | 설명 |
|------|------|
| Dev Package 필수 | 다운로드 없이는 등록 미완료 |
| 모달 닫기 방지 | Step 2에서 X 버튼, 배경 클릭 차단 |
| 상태 메시지 구분 | "정보 등록됨" ≠ "등록 완료" |

### 관련 함수

| 함수명 | 위치 | 역할 |
|--------|------|------|
| `registerNewProject()` | index.html:8743 | 등록 시작 |
| `downloadDevPackageAndComplete()` | index.html:8949 | 다운로드 후 완료 |
| `closeAddProjectModalFinal()` | index.html:8977 | 최종 모달 닫기 |

### Dev Package URL

```
https://drive.google.com/uc?export=download&id=1Lz0Qi99dSVDlrTEsxeXsUWbM8dv9W-ds
```

**상세 문서**: `P2_프로젝트_기획/User_Flows/Project_Registration_Process.md`

---

## ⛔⛔⛔ 절대 규칙 - 위반 시 작업 중단! ⛔⛔⛔

### 절대 규칙 1: 폴더 임의 생성 금지

```
🚫 폴더를 절대로 임의 생성하지 마라!
🚫 기존 폴더 확인 없이 새 폴더 만들면 파일 추적 불가!
🚫 "일단 만들고 나중에 정리" = 절대 금지!
```

**폴더 생성이 필요할 때 필수 프로세스:**

1. **즉시 작업 중단**
2. **기존 폴더 확인** - 정말 적절한 폴더가 없는가?
3. **사용자에게 승인 요청** (아래 양식 필수)
4. **승인 받은 후에만 폴더 생성**

**승인 요청 양식 (필수):**
```
"폴더 생성 승인 요청

📁 생성할 폴더: [전체 경로]
📝 생성 이유: [왜 이 폴더가 필요한지 구체적으로]
🔍 대안 검토: [기존 폴더 중 사용 가능한 것이 없는 이유]
📂 기존 폴더 목록: [확인한 유사 폴더들]

승인하시겠습니까?"
```

**❌ 절대 금지 행동:**
- 승인 없이 폴더 생성
- 기존 폴더 확인 없이 새 폴더 생성
- 오타나 유사 이름으로 중복 폴더 생성 (sal-grid vs ssal-grid 같은 실수)

---

### 절대 규칙 2: 일반 작업 - 검증 및 문서화 필수

> **적용 대상**: Project SAL Grid Task가 아닌 모든 요청 (한 건씩 처리)

```
🚫 작업만 하고 검증 없이 완료 보고 금지!
🚫 검증 없이 work_logs 업데이트 금지!
🚫 Reports 폴더 저장 생략 금지!
```

**필수 프로세스 (단순 - 4단계):**
```
1. 작업 수행
     ↓
2. 검증 에이전트 투입 (Task tool 사용)
   - 적합한 서브에이전트 선택 (code-reviewer, qa-specialist 등)
   - 검증 결과 받기
     ↓
3. 문서화 (두 곳 모두 필수!)
   ✅ .claude/work_logs/current.md - 작업 내역 기록
   ✅ Human_ClaudeCode_Bridge/Reports/{작업명}_report.json - 결과 저장
     ↓
4. 사용자에게 완료 보고
```

---

### 절대 규칙 3: Project SAL Grid Task - 프로세스 및 상태 전이 규칙

> **적용 대상**: Project SAL Grid의 Task 실행 (한 번에 여러 개 처리 가능)
> **핵심**: 6단계 프로세스 + 상태 전이 규칙 반드시 준수!

```
🚫 이 프로세스를 건너뛰면 Grid 데이터가 엉망이 됨!
🚫 상태 전이 순서 반드시 지켜야 함!
🚫 여러 Task를 동시에 처리할 때 각 Task마다 상태 관리 필수!
```

**📋 Task 실행 6단계 프로세스:**

```
┌─────────────────────────────────────────────────────────────┐
│  STEP 1: Task Instruction 읽기                              │
│  → sal-grid/task-instructions/{TaskID}_instruction.md       │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  STEP 2: 규칙 파일 확인                                      │
│  → .claude/rules/ 폴더의 관련 규칙 읽기                      │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  STEP 3: Grid 상태 업데이트 (DB)                             │
│  → task_status: 'Pending' → 'In Progress'                   │
│  → Supabase DB에 UPDATE                                     │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  STEP 4: Task Agent로 작업 수행                              │
│  → Task Instruction에 따라 작업 실행                         │
│  → 작업 완료 시: task_status: 'In Progress' → 'Executed'    │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  STEP 5: Verification Agent 투입 (서브에이전트)              │
│  → verification_status: 'Not Verified' → 'In Review'        │
│  → Verification Instruction에 따라 검증                      │
│  → 검증 결과: 'Verified' 또는 'Needs Fix'                    │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  STEP 6: 최종 상태 업데이트 (DB)                             │
│  → verification_status: 'Verified'일 때만                    │
│  → task_status: 'Executed' → 'Completed'                    │
│  → work_logs, Reports 저장                                  │
└─────────────────────────────────────────────────────────────┘
```

**📊 상태 전이 규칙 (순서 반드시 준수!):**

```
task_status 전이:
┌─────────┐    ┌─────────────┐    ┌──────────┐    ┌───────────┐
│ Pending │ →  │ In Progress │ →  │ Executed │ →  │ Completed │
└─────────┘    └─────────────┘    └──────────┘    └───────────┘
                                       ↑              ↑
                                   작업 완료      Verified 후만!

verification_status 전이:
┌──────────────┐    ┌───────────┐    ┌──────────┐
│ Not Verified │ →  │ In Review │ →  │ Verified │
└──────────────┘    └───────────┘    └──────────┘
                                           ↓
                                      Needs Fix (실패 시)
```

**⚠️ 핵심 규칙:**
- **Executed** = 작업은 끝났지만 검증 전 상태
- **Completed** = 검증(Verified)까지 완료된 상태
- **Completed는 Verified일 때만 가능!** (DB 트리거로 강제됨)
- **상태 건너뛰기 금지** (Pending → Completed 불가!)
- **각 Task마다 상태 업데이트 필수** (여러 개 처리 시)

**❌ 절대 금지 행동:**
- Executed 없이 바로 Completed 처리
- 검증 없이 Verified 표시
- 상태 전이 순서 건너뛰기
- Verification Agent 투입 생략
- DB 상태 업데이트 생략
- **검증만 하고 결과 기록 생략** ⭐ 신규 추가

**⭐ 검증 결과 기록 필수 (절대 생략 금지!):**

```
🚫 검증만 수행하고 기록 안 하면 무의미!
🚫 "검증했습니다" 말만 하고 DB에 기록 안 하면 안 됨!
✅ 검증 결과는 Supabase DB에만 기록!
```

**검증 후 필수 기록 위치:**
```
Supabase DB (project_sal_grid 테이블)
   → verification_status: 'Verified' 또는 'Needs Fix'
   → test_result: 테스트 결과 (JSON)
   → build_verification: 빌드 검증 (JSON)
   → integration_verification: 통합 검증 (JSON)
   → blockers: 차단 요소 (JSON)
   → comprehensive_verification: 종합 결과 (JSON)
```

**검증 기록 체크리스트:**
- [ ] DB에 verification_status 업데이트했는가?
- [ ] DB에 검증 관련 필드(test_result, build_verification 등) 저장했는가?

---

### 절대 규칙 4: Stage 폴더에 먼저 저장 → Pre-commit Hook 자동 복사

> **적용 대상**: Frontend, Backend_APIs, Security, Backend_Infra, External 코드 파일 생성/수정 시

```
✅ Stage 폴더에 먼저 저장 (원본, 프로세스 관리용)
✅ git commit 시 Pre-commit Hook이 자동으로 루트 폴더에 복사
🚫 수동으로 이중 저장 금지 - 자동화에 맡겨라!
```

**저장 순서:**

```
1. Stage 폴더에 저장 (원본)
      ↓
2. git commit 실행
      ↓
3. Pre-commit Hook 자동 실행 (scripts/sync-to-root.js)
      ↓
4. 루트 폴더로 자동 복사 (배포용)
```

**Stage → 루트 매핑:**
| Area | Stage 폴더 | 루트 폴더 (자동 복사) |
|------|-----------|---------------------|
| F (Frontend) | `S?_*/Frontend/` | `pages/` |
| BA (Backend_APIs) | `S?_*/Backend_APIs/` | `api/Backend_APIs/` |
| S (Security) | `S?_*/Security/` | `api/Security/` |
| BI (Backend_Infra) | `S?_*/Backend_Infra/` | `api/Backend_Infra/` |
| E (External) | `S?_*/External/` | `api/External/` |

**완료 보고 양식:**
```
"코드 파일 저장 완료

📁 Stage 저장: S2_개발-1차/Frontend/pages/auth/login.html (원본)
📁 자동 복사: pages/auth/login.html (배포용)

✅ git commit 시 자동 동기화됨"
```

**❌ 절대 금지 행동:**
- 루트 폴더에 직접 저장 (Stage 거치지 않고)
- 수동으로 이중 저장 (자동화 무시)

**⚠️ 폴더명 변경 금지:** Vercel이 `api` 이름을 인식함

**상세 규칙:** `.claude/rules/02_save-location.md` 참조

---

### 절대 규칙 5: Task 완료/수정 시 Grid 자동 업데이트 ⭐ 신규

> **적용 대상**: SAL Grid Task 작업 완료 또는 버그 수정 시

```
🚫 Task 작업만 하고 Grid 업데이트 없이 끝내지 마라!
🚫 "작업 완료했습니다" 말만 하고 DB 업데이트 안 하면 안 됨!
✅ 작업 완료 후 반드시 project_sal_grid 테이블 업데이트!
```

**업데이트 시점:**
| 상황 | 업데이트 필드 |
|------|-------------|
| Task 완료 | `task_status`, `task_progress`, `generated_files`, `remarks` |
| 버그 수정 | `modification_history`, `remarks`, `updated_at` |

**필수 프로세스:**
```
Task 작업 완료
     ↓
project_sal_grid 테이블 PATCH 업데이트
     ↓
work_logs/current.md 기록
     ↓
완료 보고
```

**상세 규칙:** `.claude/rules/04_grid-writing-supabase.md` 섹션 8 참조

---

## 📘 작업 방법 (Methods)

> **특정 작업 수행 시 반드시 해당 방법을 따라야 함!**

| # | 방법 파일 | 적용 시점 | 핵심 |
|---|----------|----------|------|
| 1 | `01_supabase-crud.md` | **Supabase CRUD 작업 시** | PO에게 요청 금지, AI가 직접 실행 |
| 2 | `02_builder-id.md` | **빌더 계정 ID 부여 시** ⭐ | 12자리 형식 (YYMMNNNNNNXX) 필수! |
| 3 | `03_login-error.md` | **로그인 에러 발생 시** ⭐ | 증상별 대처방법, OAuth 설정 확인 |

**📁 위치:** `.claude/methods/`

### Supabase CRUD 작업 시 필수 준수

```
🚫 PO(사람)에게 SQL 실행을 요청하지 마라!
🚫 "이 SQL을 실행해주세요" 금지!
🚫 "Supabase Dashboard에서 실행해주세요" 금지!
✅ AI가 REST API (Node.js)로 직접 실행해야 함!
```

**우선순위:**
```
1. REST API (Node.js) ← 기본 방법, 항상 작동
2. Supabase MCP ← 연결 시
3. Supabase CLI ← 설치 시
4. Dashboard (PO 수동) ← 최후 수단
```

**⚠️ PO에게 요청해야 하는 경우 (모두 충족 시만):**
```
1. REST API 시도 → 실패 (3회 이상)
2. MCP 시도 → 실패 또는 연결 안 됨
3. CLI 시도 → 설치 안 됨 또는 실패

→ 위 3가지 모두 실패한 경우에만 PO에게 요청
→ "모든 방법 시도 후 실패했습니다. Dashboard에서 실행해주세요."
→ SQL 파일 생성하여 제공
```

**환경변수 위치:** `P3_프로토타입_제작/Database/.env`

### 빌더 계정 ID 부여 시 필수 준수

```
⛔ 잘못된 형식 사용 금지!
⛔ "BLDR-2512-001" 같은 비표준 형식 금지!
✅ 반드시 12자리 형식 사용: YYMMNNNNNNXX
```

**형식 (12자리):**
```
YY MM NNNNNN XX
│  │  │      └─ 금액 코드 (TH=300만, FO=400만, FI=500만...)
│  │  └──────── 일련번호 (6자리, 월별 초기화)
│  └─────────── 월 (2자리)
└────────────── 연도 (2자리)
```

**예시:** `2512000001TH` = 2025년 12월, 첫 번째, 300만원

**금액 코드:**
| 금액 | 코드 |
|------|------|
| 300만원 | TH |
| 400만원 | FO |
| 500만원 | FI |
| 600만원 | SI |
| 700만원 | SE |
| 800만원 | EI |
| 900만원 | NI |

**⚠️ 코드 작성 시 주의:**
- 일련번호 `padStart(6, '0')` (6자리!)
- `builder_id` 기준 카운트 (user_id 아님!)

### 로그인 에러 발생 시 필수 확인

```
⚠️ 로그인 간헐적 오류는 대부분 OAuth 설정 불일치가 원인!
⚠️ 증상별 대처법을 먼저 확인하고 수정!
```

**주요 증상 및 원인:**

| 증상 | 원인 | 대처 |
|------|------|------|
| 로그인 화면이 금방 사라짐 | 이미 로그인된 상태 | 정상 동작, 메인에서 확인 |
| Google 로그인 후 UI 미업데이트 | OAuth 콜백 타이밍 | 새로고침 또는 캐시 삭제 |
| `ADMIN_EMAIL is not defined` | 변수 미정의 | index.html에 변수 추가 |
| 로그인 됐다 안됐다 반복 | redirectTo URL 불일치 | OAuth 설정 통일 |

**핵심 확인 사항:**
1. **google-login.html**의 `redirectTo`와 **Supabase Dashboard** Redirect URL 일치 여부
2. **Google Cloud Console** 인증 리다이렉트 URI 등록 여부
3. **index.html**에 `onAuthStateChange` 리스너 등록 여부

**상세 규칙:** `.claude/methods/03_login-error.md` 참조

---

## 📋 기타 참조 문서

### AI 12대 준수사항
> `.claude/compliance/AI_12_COMPLIANCE.md`

### SAL Grid 매뉴얼
> `S0_Project-SAL-Grid_생성/manual/PROJECT_SAL_GRID_MANUAL.md`

### 주의사항
> `.claude/CAUTION.md` (RLS, 본개발 TODO, Supabase 대안 프로세스)

---

## 🌾 세션 시작 시 확인

### 1. 작업 기록
`.claude/work_logs/current.md` 🔴 최우선

### 2. 이전 작업 결과
`Human_ClaudeCode_Bridge/Reports/` 확인

### 3. 프로젝트 상태
- `P0_작업_디렉토리_구조_생성/Project_Status.md`
- `P0_작업_디렉토리_구조_생성/Project_Directory_Structure.md`

---

## 📂 웹 배포 파일 업데이트

Order Sheet, 안내문, Manual 수정 시:
```bash
node scripts/build-web-assets.js
```

---

## ⚠️ 빌드 vs 서버 구분 (혼동 금지!)

| 작업 | 사용 파일 | 용도 |
|------|----------|------|
| **빌드** (MD→JS 번들) | `build-web-assets.js` | 배포용 파일 생성 |
| **서버** (실시간 API) | `bridge_server.js` | 개발용 로컬 서버 |

**⛔ 혼동 금지:**
- "Order Sheet 빌드해" → `build-web-assets.js` 실행
- "안내문 빌드해" → `build-web-assets.js` 실행
- **`bridge_server.js`는 빌드 도구가 아님!** (런타임 API 서버)

**스크립트 저장 원칙:**
```
1. 단일 대상 스크립트 → 해당 폴더에 저장
2. 복수 대상 스크립트 → 루트 scripts/에 저장
```

**빌드 스크립트 위치:**
```
scripts/build-web-assets.js             ← 통합 빌드 (복수 대상)
Briefings_OrderSheets/OrderSheet_Templates/generate-ordersheets-js.js  ← Order Sheet (단일)
Briefings_OrderSheets/Briefings/generate-briefings-js.js               ← Briefings (단일)
```

