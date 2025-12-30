# 처음 프로젝트 개발환경설정 가이드

> **이 안내는 첫 번째 프로젝트 등록 시에만 표시됩니다.**
>
> 두 번째 이후 프로젝트는 이미 개발 환경이 구축되어 있으므로 간단한 폴더 준비만 하면 됩니다.

---

## 프로젝트 정보 입력 완료

프로젝트 정보 입력이 완료되었습니다.

다음 단계로 **1회성 개발 환경 설정**이 필요합니다.

---

## 왜 개발 환경 설정이 필요한가요?

이 플랫폼은 **내 컴퓨터에서 직접 개발**하는 방식입니다. 이를 위해 3가지가 필요합니다.

**Dev Package**
- 무엇인가: 프로젝트 폴더 + AI 작업 규칙
- 왜 필요한가: AI가 올바르게 코드를 작성하도록 안내

**개발 도구 (Git, Node.js)**
- 무엇인가: 코드 실행 및 버전 관리 도구
- 왜 필요한가: 코드 실행 및 버전 관리

**Claude Code**
- 무엇인가: AI 개발 어시스턴트
- 왜 필요한가: 내가 말하면 AI가 코드 작성

> 한 번만 설치하면 이후 프로젝트에서는 다시 설치할 필요 없습니다.

---

## STEP 1: Dev Package 다운로드

### Dev Package 전체 구조

```
Project_Dev_Package/
├── .claude/                          # Claude Code 설정 (63개 파일)
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
├── .gitignore                        # Git 제외 설정
└── README.md                         # 패키지 설명
```

**총 119개 폴더, 107개 파일**

---

### .claude/

Claude Code가 프로젝트 실행 시 가장 먼저 읽는 폴더.

```
.claude/
├── CLAUDE.md                    # AI 최상위 지침
├── CAUTION.md                   # 주의사항
├── rules/                       # 7대 작업 규칙
│   ├── 01_file-naming.md
│   ├── 02_save-location.md
│   ├── 03_area-stage.md
│   ├── 04_grid-writing.md
│   ├── 05_execution-process.md
│   ├── 06_verification.md
│   └── 07_task-crud.md
├── methods/                     # 작업 방법
│   └── 01_grid-crud.md
├── commands/                    # 슬래시 커맨드 (15개)
├── skills/                      # AI 스킬 정의 (14개)
├── subagents/                   # 서브에이전트 정의 (17개)
├── compliance/                  # AI 준수사항
│   └── AI_12_COMPLIANCE.md
└── work_logs/                   # 작업 기록
```

**CLAUDE.md** - AI의 최상위 지침 파일. 7대 규칙 파일 참조 지시, 절대 금지 행동 정의.

**rules/** - 7대 작업 규칙
- 01: 파일명 규칙 (kebab-case)
- 02: 저장 위치 규칙 (Stage → Root 자동 복사)
- 03: Area/Stage 매핑 (11개 Area, 5개 Stage)
- 04: Grid 작성 및 DB 작업 규칙
- 05: 6단계 실행 프로세스
- 06: 검증 규칙 및 상태 전이
- 07: Task CRUD 프로세스

**commands/** - 슬래시 커맨드 (15개): commit, deploy, test, review 등

**skills/** - AI 스킬 정의 (14개): fullstack-dev, api-builder, db-schema 등

**subagents/** - 서브에이전트 정의 (17개): frontend-developer, backend-developer, code-reviewer 등

---

### P0_작업_디렉토리_구조_생성/

- **Project_Status.md**: 프로젝트 현재 상태 기록
- **Project_Directory_Structure.md**: 프로젝트 전체 폴더 구조 문서화

---

### P1_사업계획/

시장조사, 경쟁분석, 사업계획서 저장 폴더

하위 폴더: Business_Model, BusinessPlan, Market_Analysis, Patent, Vision_Mission

---

### P2_프로젝트_기획/

요구사항 정의서, 아키텍처 설계, UI/UX 와이어프레임 저장 폴더

하위 폴더: Design_System, Project_Plan, Requirements, Service_Introduction, Tech_Stack, UI_UX_Mockup, User_Flows, Workflows

---

### P3_프로토타입_제작/

프로토타입 개발을 위한 폴더

하위 폴더: Database, Documentation, Frontend

- Database/: DB 스키마, 환경변수(.env)
- Documentation/: 프로토타입 관련 문서
- Frontend/Prototype/: 프로토타입 HTML 페이지

---

### S0_Project-SAL-Grid_생성/

```
S0_Project-SAL-Grid_생성/
├── data/
│   └── sal_grid.csv              # Task 데이터 (CSV)
├── sal-grid/
│   ├── stage-gates/              # Stage Gate 검증 리포트
│   ├── task-instructions/        # Task 수행 지침
│   └── task-results/             # Task 결과 저장
├── manual/
│   ├── PROJECT_SAL_GRID_MANUAL.md  # SAL Grid 매뉴얼
│   ├── manual_template.md        # 매뉴얼 템플릿
│   └── build-manual.js           # 매뉴얼 빌드 스크립트
├── method/
│   └── csv/                      # CSV Method (JSON 파일)
│       └── data/
│           └── project_sal_grid.json
├── viewer/
│   ├── viewer_csv.html           # PC용 뷰어
│   └── viewer_mobile_csv.html    # 모바일용 뷰어
└── build-sal-grid-csv.js         # CSV 빌드 스크립트
```

---

### S1_개발_준비/ ~ S5_개발_마무리/

각 Stage 폴더는 11개 Area 폴더를 포함.

- **S1** - S1_개발_준비
- **S2** - S2_개발-1차
- **S3** - S3_개발-2차
- **S4** - S4_개발-3차
- **S5** - S5_개발_마무리

**11개 Area:**
Backend_APIs, Backend_Infra, Content_System, Database, Design, DevOps, Documentation, External, Frontend, Security, Testing

---

### Development_Process_Monitor/

개발 프로세스 진행 상황 모니터링 시스템

- data/phase_progress.json: 단계별 진행률 데이터
- README.md: 모니터 사용 가이드

---

### Human_ClaudeCode_Bridge/

사람과 AI 간 협업을 위한 브릿지 시스템

- **Orders/**: 사람이 AI에게 전달하는 작업 요청 파일
- **Reports/**: AI가 작업 완료 후 결과 보고 파일

---

### 📥 다운로드 방법

> **지금 바로 다운로드하세요!**

1. **My Page > 파일 다운로드**에서 Dev Package 다운로드
2. ZIP 파일 압축 해제
3. 원하는 위치에 폴더 이동 (권장: `C:\Projects\내프로젝트명`)
4. 폴더 이름을 프로젝트에 맞게 변경 (예: `MyWebsite`)

---

## STEP 2: 개발 도구 설치

패키지만으로는 개발이 안 됩니다. 컴퓨터에 개발 도구도 설치해야 합니다.

### 필수 도구 목록

**Git** - 버전 관리
- 코드 변경 이력 추적, 실수 시 복구 가능

**Node.js** - 실행 환경
- JavaScript 코드를 컴퓨터에서 실행

**npm** - 패키지 관리
- 외부 라이브러리 설치 (Node.js에 포함)

**Claude Code** - AI 어시스턴트
- 코드 작성, 문제 해결, 자동화

---

### 2-1. Git 설치

**Git이란?**
코드의 변경 이력을 기록하는 "버전 관리 시스템"입니다. 실수로 코드를 삭제해도 이전 버전으로 복구할 수 있습니다.

**설치 방법:**

1. https://git-scm.com 방문
2. "Download for Windows" 클릭
3. 다운로드된 파일 실행
4. 설치 중 모든 옵션은 기본값으로 "Next" 클릭

**설치 확인:**
```bash
git --version
```
버전 번호가 나오면 성공입니다.

---

### 2-2. Node.js 설치

**Node.js란?**
JavaScript를 웹 브라우저 밖에서도 실행할 수 있게 해주는 환경입니다. 웹 개발의 필수 도구입니다.

**npm이란?**
Node Package Manager의 약자로, 다른 개발자들이 만든 코드(라이브러리)를 쉽게 설치하고 관리합니다. Node.js를 설치하면 npm도 함께 설치됩니다.

**설치 방법:**

1. https://nodejs.org 방문
2. **LTS 버전** (왼쪽 초록색 버튼) 다운로드
3. 다운로드된 파일 실행
4. 설치 중 모든 옵션은 기본값으로 "Next" 클릭

**설치 확인:**
```bash
node --version
npm --version
```
두 명령어 모두 버전 번호가 나오면 성공입니다.

---

### 2-3. Claude Code 설치

**Claude Code란?**
Anthropic에서 만든 AI 개발 어시스턴트입니다. 터미널에서 실행하며, 코드 작성, 파일 수정, 명령어 실행 등을 AI가 대신 해줍니다.

**Claude Code가 할 수 있는 것:**
- 코드 파일 읽기/쓰기/수정
- 터미널 명령어 실행
- 웹 검색 및 정보 수집
- 프로젝트 구조 분석
- 버그 찾기 및 수정

**설치 방법:**

Node.js 설치 후, 터미널에서 다음 명령어 실행:

```bash
npm install -g @anthropic-ai/claude-code
```

**설치 확인:**
```bash
claude --version
```

**최초 실행 시:**
- Anthropic 계정 로그인 필요
- API 키 또는 Pro/Max 구독 필요

---

## STEP 3: Claude Code로 개발 시작

### 실행 방법

1. **패키지 폴더로 이동**
   - 압축 해제한 Dev Package 폴더

2. **폴더에서 터미널 열기**
   - Windows: 폴더에서 마우스 우클릭 → "터미널에서 열기"
   - 또는: 폴더 주소창에 `cmd` 입력 후 Enter

3. **Claude Code 실행**
   ```bash
   claude
   ```

4. **개발 환경 확인 요청**
   ```
   개발 환경 확인하고 프로젝트 초기 설정 해줘
   ```

### Claude Code가 자동으로 수행하는 작업

- **설치 확인**: STEP 2에서 설치한 Git, Node.js가 정상 설치되었는지 확인
- **추가 설치**: 부족한 도구가 있으면 설치 방법 안내 또는 자동 설치
- **npm 패키지 설치**: 프로젝트에 필요한 라이브러리(의존성) 자동 설치
- **프로젝트 초기화**: 설정 파일 생성, 폴더 구조 확인, 개발 준비 완료

---

## STEP 4: 설치 완료 후

모든 설치가 완료되면 컨트롤 데스크로 가서 Claude Code와 함께 개발을 시작하세요.

### 개발 진행 방법

**1단계: 진행 프로세스 확인**
- 왼쪽 사이드바에서 진행 프로세스 확인

**2단계: 안내문 읽기**
- 각 단계별 안내문 확인

**3단계: Order Sheet 전달**
- Order Sheet를 컨트롤 데스크에 로딩하여 수정한 후 Claude Code에게 전달해서 작업 지시

**4단계: 결과 확인**
- AI가 수행한 작업 결과 검토

### 개발 프로세스

**P0 - 작업 환경**
- 디렉토리 구조 생성, 상태 관리

**P1 - 사업계획**
- 시장조사, 경쟁분석, 사업계획서

**P2 - 프로젝트 기획**
- 요구사항, 아키텍처, UI/UX 설계

**P3 - 프로토타입**
- 페이지 개발, DB 구축

**S1~S5 - 본개발**
- 인증, API, 결제, 배포

---

## 도움이 필요하면

- **학습용 Books**, **실전 Tips**, **외부 연동 설정 가이드**를 확인해 보세요
- **AI 튜터**에게 질문하거나 **써니에게 질문하기**를 통해 해결하세요

