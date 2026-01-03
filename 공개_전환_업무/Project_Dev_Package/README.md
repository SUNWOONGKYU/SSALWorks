# Development Package - 종합 가이드

SSAL Works 프로젝트 개발을 위한 표준 디렉토리 구조와 AI 작업 규칙을 포함합니다.

---

# SSAL Works란?

**SSAL Works**는 **"Claude Code를 활용한 3차원 SAL Grid 기반 풀스택 웹사이트 개발 플랫폼"**입니다.

## 핵심 개념

### Claude Code
Anthropic이 개발한 AI 도구입니다. 터미널에서 실행되며, 사용자의 지시를 받아 코드를 작성하고, 파일을 만들고, 프로젝트를 관리합니다.

### 3차원 SAL Grid
**Stage(단계) × Area(영역) × Level(순서)**의 3차원 좌표계입니다. 풀스택 웹사이트 개발에 필요한 모든 작업(Task)을 이 좌표계 위에 배치하고, 각 Task를 22개 속성으로 관리합니다.

### 풀스택 웹사이트
프론트엔드(사용자가 보는 화면)와 백엔드(서버, 데이터베이스, API)가 모두 갖춰진 완전한 웹사이트입니다. 회원가입, 로그인, 결제, 데이터 저장, 관리자 기능 등 실제 비즈니스를 운영할 수 있는 완전한 웹사이트를 만듭니다.

## AI와 인간의 역할 분담

| 담당 | 역할 |
|------|------|
| **AI (Claude Code)** | 코딩, 문법, 도구 사용, 반복 작업, 기술적 구현 |
| **인간 (사용자)** | 무엇을 만들지 결정, 방향 결정, 비즈니스 모델 설계, 최종 승인 |

**쉽게 말해서:**
- **"무엇을 만들 것인가"**는 인간이 결정
- **"어떻게 만들 것인가"**는 AI가 담당

## "바이브 코딩"이 아닙니다

**바이브 코딩**이란 체계 없이 AI에게 "이거 해줘"라고만 시키는 방식입니다. 파일과 폴더가 난립하고, 코드가 뒤엉키고, 수정이 불가능해집니다.

**SSAL Works는 정반대입니다:**
- P0~S5까지 10단계 진행 프로세스로 체계적 관리
- SAL Grid로 모든 작업을 3차원 좌표계 위에서 관리
- Order Sheet로 AI에게 작업을 체계적으로 지시
- 각 Task는 22개 속성으로 추적
- 작업자와 검증자가 분리된 검증 시스템

---

# STEP 1: 개발 도구 설치

## 필수 도구

| 도구 | 용도 | 설치 방법 |
|------|------|----------|
| **Git** | 버전 관리 | https://git-scm.com 에서 다운로드 |
| **Node.js** | JavaScript 런타임 | https://nodejs.org 에서 LTS 버전 다운로드 |
| **Claude Code** | AI 개발 어시스턴트 | 터미널에서 `npm install -g @anthropic-ai/claude-code` |

## 설치 확인

```bash
git --version
node --version
npm --version
claude --version
```

각 명령어에서 버전 번호가 나오면 설치 완료입니다.

---

# STEP 2: Dev Package 설치

1. 다운로드한 ZIP 파일 압축 해제
2. 원하는 위치에 폴더 이동 (권장: `C:\Projects\내프로젝트명`)
3. 폴더 이름을 프로젝트에 맞게 변경 (예: `MyWebsite`)

---

# STEP 3: Claude Code 실행

## 실행 방법

1. **폴더에서 터미널 열기**
   - Windows: 폴더에서 우클릭 → "터미널에서 열기"
   - 또는: 폴더 주소창에 `cmd` 입력 후 Enter

2. **Claude Code 실행**
   ```bash
   claude
   ```

3. **개발 환경 확인 요청**
   ```
   개발 환경 확인하고 프로젝트 초기 설정 해줘
   ```

## Claude Code가 자동으로 수행하는 작업

- **설치 확인**: Git, Node.js가 정상 설치되었는지 확인
- **추가 설치**: 부족한 도구가 있으면 설치 방법 안내 또는 자동 설치
- **npm 패키지 설치**: 프로젝트에 필요한 라이브러리 자동 설치
- **프로젝트 초기화**: 설정 파일 생성, 폴더 구조 확인, 개발 준비 완료

---

# STEP 4: 개발 진행

## 진행 방법

1. **SSAL Works 웹사이트 접속** (www.ssalworks.ai.kr)
2. **왼쪽 사이드바에서 진행 프로세스 확인** (P0 → P1 → ... → S5)
3. **각 단계 클릭** → 안내문과 Order Sheet가 제공됨
4. **안내문 읽기** → Order Sheet를 Claude Code에게 전달
5. **결과 확인** → 다음 단계로 이동

## 개발 프로세스 흐름

| 단계 | 이름 | 내용 |
|------|------|------|
| P0 | 작업 환경 | 디렉토리 구조 생성, 상태 관리 |
| P1 | 사업계획 | 시장조사, 경쟁분석, 사업계획서 |
| P2 | 프로젝트 기획 | 요구사항, 아키텍처, UI/UX 설계 |
| P3 | 프로토타입 | 페이지 개발, DB 구축 |
| **S0** | **SAL Grid 생성** | **Task 목록 정하고 Project SAL Grid 생성** |
| S1~S5 | 본개발 | 계획된 Task들을 단계별로 작업 |

**핵심:**
- P0~P3: 기획 단계
- S0: Task 목록 정하고 Project SAL Grid 생성
- S1~S5: 계획된 Task들을 순서대로 작업

---

# Dev Package 구조

## 전체 구조

```
Project_Dev_Package/
├── .claude/                          # Claude Code 설정
├── api/                              # 백엔드 API (배포용)
├── assets/                           # 정적 자원 (CSS, JS, 이미지)
├── pages/                            # 프론트엔드 페이지 (배포용)
├── scripts/                          # 자동화 스크립트
├── Development_Process_Monitor/      # 개발 프로세스 모니터
├── Human_ClaudeCode_Bridge/          # Human-AI 협업 브릿지
├── P0_작업_디렉토리_구조_생성/        # 디렉토리 구조/상태 문서
├── P1_사업계획/                      # 사업계획
├── P2_프로젝트_기획/                  # 프로젝트 기획
├── P3_프로토타입_제작/                # 프로토타입 제작
├── S0_Project-SAL-Grid_생성/         # SAL Grid 시스템
├── S1_개발_준비/                     # 개발 환경 준비
├── S2_개발-1차/                      # 1차 개발 (핵심 기능)
├── S3_개발-2차/                      # 2차 개발 (확장 기능)
├── S4_개발-3차/                      # 3차 개발 (고급 기능)
├── S5_개발_마무리/                   # 개발 마무리 (배포/안정화)
├── .ssal-project.json                # 프로젝트 설정
├── .env.sample                       # 환경 변수 템플릿
├── .gitignore                        # Git 제외 설정
└── README.md                         # 이 파일
```

## .claude/ (Claude Code 설정)

Claude Code가 프로젝트 실행 시 가장 먼저 읽는 폴더입니다.

```
.claude/
├── CLAUDE.md                    # AI 최상위 지침
├── CAUTION.md                   # 주의사항
├── rules/                       # 7대 작업 규칙
│   ├── 01_file-naming.md
│   ├── 02_save-location.md
│   ├── 03_area-stage.md
│   ├── 04_grid-writing-json.md
│   ├── 05_execution-process.md
│   ├── 06_verification.md
│   └── 07_task-crud.md
├── methods/                     # 작업 방법
├── commands/                    # 슬래시 커맨드
├── skills/                      # AI 스킬 정의
├── subagents/                   # 서브에이전트 정의
├── compliance/                  # AI 준수사항
└── work_logs/                   # 작업 기록
```

## S0_Project-SAL-Grid_생성/

```
S0_Project-SAL-Grid_생성/
├── sal-grid/
│   ├── stage-gates/              # Stage Gate 검증 리포트
│   ├── task-instructions/        # Task 수행 지침
│   ├── verification-instructions/ # 검증 지침
│   └── TASK_PLAN.md              # Task 계획 문서
├── manual/
│   └── PROJECT_SAL_GRID_MANUAL.md  # SAL Grid 매뉴얼
├── method/
│   └── json/
│       └── data/
│           ├── index.json        # 프로젝트 메타데이터 + task_ids 배열
│           └── grid_records/     # 개별 Task JSON 파일
└── viewer/
    ├── viewer_json.html          # PC용 JSON 뷰어 (내 프로젝트)
    └── viewer_mobile_json.html   # 모바일용 JSON 뷰어
```

**초기 상태 (다운로드 직후):**

| 파일/폴더 | 초기 상태 | S0 완료 후 |
|-----------|----------|-----------|
| `index.json` | 빈 상태 (project_id, task_ids 비어있음) | 프로젝트 정보 + Task ID 목록 |
| `grid_records/` | `_TEMPLATE.json` 템플릿만 있음 | 각 Task별 JSON 파일 생성 |
| `task-instructions/` | 비어있음 | 각 Task별 지침 파일 생성 |
| `verification-instructions/` | 비어있음 | 각 Task별 검증 지침 생성 |

**S0 단계에서 Claude Code가 Task 목록을 정하고 SAL Grid를 생성하면 이 파일들이 채워집니다.**

## S1~S5 (개발 Stage 폴더)

각 Stage 폴더는 11개 Area 폴더를 포함합니다:

Backend_APIs, Backend_Infra, Content_System, Database, Design, DevOps, Documentation, External, Frontend, Security, Testing

---

# 환경 변수 설정

## .env 파일

`.env.sample` 파일이 Dev Package에 포함되어 있습니다. SSAL Works에서 미리 준비한 데이터베이스 관련 정보입니다.

**설정 방법:**
1. `.env.sample`을 `.env`로 복사
2. 필요한 값 입력 (Supabase URL, API Key 등)

**참고:** DB 연동은 선택사항입니다. GitHub Pages로 Viewer만 사용할 경우 설정하지 않아도 됩니다.

---

# Claude Code 규칙 안내

## 핵심 규칙 파일

| 파일 | 내용 | 언제 참조 |
|------|------|----------|
| **`.claude/CLAUDE.md`** | 7대 작업 규칙 + 5개 절대 규칙 | **세션 시작 시 필수** |
| `.claude/rules/` | 7개 규칙 파일 상세 | 해당 작업 수행 시 |
| `.claude/methods/` | 작업 방법 | JSON CRUD 등 |
| `.claude/work_logs/current.md` | 이전 작업 기록 | **세션 시작 시 필수** |

## 7대 작업 규칙

| # | 규칙 | 파일 | 확인 시점 |
|---|------|------|----------|
| 1 | 파일명 규칙 | `01_file-naming.md` | 파일명 정할 때 |
| 2 | 저장 위치 규칙 | `02_save-location.md` | 파일 저장할 때 |
| 3 | Area/Stage 매핑 | `03_area-stage.md` | 폴더 선택할 때 |
| 4 | Grid/JSON 작업 | `04_grid-writing-json.md` | JSON 작업할 때 |
| 5 | 실행 프로세스 | `05_execution-process.md` | Task 실행할 때 |
| 6 | 검증 기준 | `06_verification.md` | 검증할 때 |
| 7 | Task CRUD | `07_task-crud.md` | Task 추가/삭제/수정 |

## 5개 절대 규칙

| # | 규칙 | 핵심 |
|---|------|------|
| 1 | 폴더 임의 생성 금지 | 기존 폴더 확인 → 승인 요청 후 생성 |
| 2 | 검증 및 문서화 필수 | 작업 → 검증 → work_logs + Reports |
| 3 | Task 6단계 프로세스 | Instruction → 규칙 → 상태 → 작업 → 검증 → 완료 |
| 4 | Stage 폴더 먼저 저장 | Stage 저장 → Pre-commit Hook → 루트 자동 복사 |
| 5 | Task 완료 시 JSON 업데이트 | grid_records/{TaskID}.json 필수 업데이트 |

## 세션 시작 시 확인 순서

```
1. .claude/work_logs/current.md     ← 이전 작업 기록 (최우선)
2. Human_ClaudeCode_Bridge/Reports/ ← 이전 작업 결과
3. P0_작업_디렉토리_구조_생성/Project_Status.md ← 프로젝트 상태
```

---

# 정보 위치 인덱스

## Claude Code 규칙

| 정보 | 위치 |
|------|------|
| 전체 규칙 요약 | `.claude/CLAUDE.md` |
| 파일명 규칙 상세 | `.claude/rules/01_file-naming.md` |
| 저장 위치 규칙 상세 | `.claude/rules/02_save-location.md` |
| Area/Stage 규칙 상세 | `.claude/rules/03_area-stage.md` |
| JSON CRUD 규칙 상세 | `.claude/rules/04_grid-writing-json.md` |
| 6단계 실행 프로세스 | `.claude/rules/05_execution-process.md` |
| 검증 기준 상세 | `.claude/rules/06_verification.md` |
| Task CRUD 프로세스 | `.claude/rules/07_task-crud.md` |

## Project SAL Grid

| 정보 | 위치 |
|------|------|
| SAL Grid 매뉴얼 | `S0_Project-SAL-Grid_생성/manual/PROJECT_SAL_GRID_MANUAL.md` |
| Task 목록 | `S0_Project-SAL-Grid_생성/sal-grid/TASK_PLAN.md` |
| Task Instruction | `S0_Project-SAL-Grid_생성/sal-grid/task-instructions/` |
| Verification Instruction | `S0_Project-SAL-Grid_생성/sal-grid/verification-instructions/` |
| JSON 데이터 (index) | `S0_Project-SAL-Grid_생성/method/json/data/index.json` |
| JSON 데이터 (개별 Task) | `S0_Project-SAL-Grid_생성/method/json/data/grid_records/{TaskID}.json` |
| Viewer | `S0_Project-SAL-Grid_생성/viewer/viewer_json.html` |

## 프로젝트 상태

| 정보 | 위치 |
|------|------|
| 프로젝트 상태 | `P0_작업_디렉토리_구조_생성/Project_Status.md` |
| 디렉토리 구조 | `P0_작업_디렉토리_구조_생성/Project_Directory_Structure.md` |
| 작업 기록 | `.claude/work_logs/current.md` |
| 작업 결과 | `Human_ClaudeCode_Bridge/Reports/` |

## 배포 관련

| 정보 | 위치 |
|------|------|
| GitHub Pages 배포 | `.claude/CLAUDE.md` → "GitHub Pages로 Viewer 배포" 섹션 |
| SSAL Works 연동 | `.claude/CLAUDE.md` → "SSAL Works 플랫폼 연동" 섹션 |
| DB 업로드 설정 | `Development_Process_Monitor/DB_Method/README.md` |

---

# 도움이 필요할 때

SSAL Works 웹사이트에서:
- **학습용 Books** - Claude/Claude Code, 풀스택 개발 (80편)
- **실전 Tips** - 18개 카테고리, 65개 팁
- **외부 연동 설정 Guide** - Supabase, Vercel, OAuth 등 (5개)
- **Sunny에게 질문하기** - 1:1 상담

---

# 자주 묻는 질문

### Q: 어디서 시작해야 하나요?
**A:** SSAL Works 웹사이트 사이드바에서 P0부터 시작하세요. 각 단계에 안내문과 Order Sheet가 있습니다.

### Q: Order Sheet가 뭔가요?
**A:** Claude Code에게 작업을 지시하는 문서입니다. 각 단계 클릭하면 안내문과 함께 제공됩니다.

### Q: Claude Code가 규칙을 어떻게 알아요?
**A:** 이 README.md와 `.claude/CLAUDE.md` 파일을 자동으로 읽습니다.

### Q: 코딩을 몰라도 되나요?
**A:** 네. Claude Code가 코드를 작성합니다. Order Sheet만 전달하면 됩니다.

### Q: Task는 언제 생기나요?
**A:** S0 단계에서 Task 목록을 정하고 Project SAL Grid를 생성합니다. S1~S5에서 그 Task들을 작업합니다.
