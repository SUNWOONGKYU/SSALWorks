# 처음 프로젝트 개발환경설정 가이드

> **이 안내는 첫 번째 프로젝트 등록 시에만 표시됩니다.**
>
> 두 번째 이후 프로젝트는 이미 개발 환경이 구축되어 있으므로 간단한 폴더 준비만 하면 됩니다.

---

## 축하합니다!

프로젝트가 성공적으로 등록되었습니다.

이제 내 컴퓨터에서 개발을 시작하기 위한 **1회성 환경 설정**이 필요합니다.

---

## 왜 개발 환경 설정이 필요한가요?

SSAL Works는 **내 컴퓨터에서 직접 개발**하는 방식입니다. 이를 위해 3가지가 필요합니다.

| 구분 | 무엇인가? | 왜 필요한가? |
|------|----------|-------------|
| **Dev Package** | 프로젝트 폴더 + AI 작업 규칙 | AI가 올바르게 코드를 작성하도록 안내 |
| **개발 도구** | Git, Node.js | 코드 실행 및 버전 관리 |
| **Claude Code** | AI 개발 어시스턴트 | 내가 말하면 AI가 코드 작성 |

> 한 번만 설치하면 이후 프로젝트에서는 다시 설치할 필요 없습니다.

---

## STEP 1: Dev Package 다운로드

### Dev Package 전체 구조

```
SSAL_Works_Dev_Package/
├── .claude/
├── P0_작업_디렉토리_구조_생성/
├── P1_사업계획/
├── P2_프로젝트_기획/
├── P3_프로토타입_제작/
├── S0_Project-SAL-Grid_생성/
├── S1_개발_준비/
├── S2_개발-1차/
├── S3_개발-2차/
├── S4_개발-3차/
├── S5_개발_마무리/
├── Briefings_OrderSheets/
└── Human_ClaudeCode_Bridge/
```

---

### .claude/

Claude Code가 프로젝트 실행 시 가장 먼저 읽는 폴더.

```
.claude/
├── CLAUDE.md
├── rules/
│   ├── 01_file-naming.md
│   ├── 02_save-location.md
│   ├── 03_area-stage.md
│   ├── 04_grid-writing-supabase.md
│   ├── 05_execution-process.md
│   ├── 06_verification.md
│   └── 07_task-crud.md
├── methods/
│   └── 01_supabase-crud.md
├── work_logs/
│   └── current.md
└── compliance/
    └── AI_12_COMPLIANCE.md
```

**CLAUDE.md** - AI의 최상위 지침 파일. 7대 규칙 파일 참조 지시, 절대 금지 행동 정의.

**rules/01_file-naming.md** - 파일명 규칙: kebab-case 사용, 형식: `[기능]-[동작].확장자`

**rules/02_save-location.md** - Stage 폴더에 먼저 저장, Pre-commit Hook으로 루트에 자동 복사

**rules/03_area-stage.md** - 11개 Area 목록, 5개 Stage 목록, Task ID 구조

**rules/04_grid-writing-supabase.md** - Grid 22개 속성 정의, Supabase CRUD 방법

**rules/05_execution-process.md** - 6단계 실행 프로세스 정의

**rules/06_verification.md** - 상태 전이 규칙, Task 검증 항목, Stage Gate 검증 기준

**rules/07_task-crud.md** - Task 추가/삭제/수정 프로세스

**methods/01_supabase-crud.md** - Supabase CRUD 작업 우선순위 및 방법

**work_logs/current.md** - 현재 세션 작업 기록

**compliance/AI_12_COMPLIANCE.md** - AI 준수사항 12가지

---

### P0_작업_디렉토리_구조_생성/

- Project_Status.md: 프로젝트 현재 상태 기록
- Project_Directory_Structure.md: 프로젝트 전체 폴더 구조 문서화

---

### P1_사업계획/

시장조사, 경쟁분석, 사업계획서 저장 폴더

---

### P2_프로젝트_기획/

요구사항 정의서, 아키텍처 설계, UI/UX 와이어프레임 저장 폴더

---

### P3_프로토타입_제작/

- Frontend/Prototype/: 프로토타입 HTML 페이지
- Database/.env: Supabase 환경변수
- Database/schema/: DB 테이블 스키마 SQL 파일

---

### S0_Project-SAL-Grid_생성/

- sal-grid/SSALWORKS_TASK_PLAN.md: 전체 Task 목록 및 의존성 관계
- sal-grid/task-instructions/: 각 Task 수행 지침 파일
- sal-grid/verification-instructions/: 각 Task 검증 지침 파일
- manual/PROJECT_SAL_GRID_MANUAL.md: SAL Grid 시스템 매뉴얼

---

### S1_개발_준비/ ~ S5_개발_마무리/

각 Stage 폴더는 11개 Area 폴더를 포함.

| Stage | 폴더명 | 주요 작업 |
|-------|--------|----------|
| S1 | S1_개발_준비 | 환경설정, DB 스키마, Auth 설정 |
| S2 | S2_개발-1차 | OAuth, 이메일 인증, 회원가입 |
| S3 | S3_개발-2차 | AI 연동, AI Q&A |
| S4 | S4_개발-3차 | 결제, 관리자, 크레딧 |
| S5 | S5_개발_마무리 | 배포, QA, 안정화 |

---

### Briefings_OrderSheets/

```
Briefings_OrderSheets/
├── Briefings/
│   ├── {Stage별 폴더}/
│   ├── Situational/
│   ├── guides.js
│   └── generate-briefings-js.js
└── OrderSheet_Templates/
    ├── {Stage별 폴더}/
    ├── ordersheets.js
    └── generate-ordersheets-js.js
```

**Briefings/** - 각 단계별 안내문 Markdown 파일, guides.js로 번들링

**OrderSheet_Templates/** - 각 단계별 Order Sheet 템플릿, ordersheets.js로 번들링

---

### Human_ClaudeCode_Bridge/

- Requests/: 사람이 AI에게 전달하는 작업 요청 파일
- Reports/: AI가 작업 완료 후 결과 보고 파일

---

### 다운로드 방법

1. **My Page > 자료 다운로드**에서 Dev Package 다운로드
2. ZIP 파일 압축 해제
3. 원하는 위치에 폴더 이동 (권장: `C:\Projects\내프로젝트명`)
4. 폴더 이름을 프로젝트에 맞게 변경 (예: `MyWebsite`)

---

## STEP 2: 개발 도구 설치

패키지만으로는 개발이 안 됩니다. 컴퓨터에 개발 도구도 설치해야 합니다.

### 필수 도구 목록

| 도구 | 역할 | 왜 필요한가? |
|------|------|-------------|
| **Git** | 버전 관리 | 코드 변경 이력 추적, 실수 시 복구 가능 |
| **Node.js** | 실행 환경 | JavaScript 코드를 컴퓨터에서 실행 |
| **npm** | 패키지 관리 | 외부 라이브러리 설치 (Node.js에 포함) |
| **Claude Code** | AI 어시스턴트 | 코드 작성, 문제 해결, 자동화 |

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

4. **개발 환경 설정 요청**
   ```
   프로젝트 개발 환경 설정을 위한 필수 도구 다 설치해 줘
   ```

### Claude Code가 자동으로 수행하는 작업

| 작업 | 설명 |
|------|------|
| Git 확인 | 설치 여부 확인, 미설치 시 안내 |
| Node.js 확인 | 설치 여부 확인, 미설치 시 안내 |
| npm 패키지 설치 | 필요한 라이브러리 자동 설치 |
| 프로젝트 초기화 | 설정 파일 생성, 폴더 구조 확인 |

---

## STEP 4: 설치 완료 후

모든 설치가 완료되면 Dashboard로 돌아와서 개발을 시작하세요.

### 개발 진행 방법

| 단계 | 할 일 | 설명 |
|------|-------|------|
| 1 | **사이드바 확인** | 좌측에서 현재 진행 단계 확인 |
| 2 | **안내문(Briefing) 읽기** | 각 단계별 상세 안내 확인 |
| 3 | **Order Sheet 작성** | Claude Code에게 작업 지시 |
| 4 | **결과 확인** | AI가 수행한 작업 결과 검토 |

### 5단계 개발 프로세스

| 단계 | 이름 | 내용 |
|------|------|------|
| P0 | 작업 환경 | 디렉토리 구조 생성, 상태 관리 |
| P1 | 사업계획 | 시장조사, 경쟁분석, 사업계획서 |
| P2 | 프로젝트 기획 | 요구사항, 아키텍처, UI/UX 설계 |
| P3 | 프로토타입 | 페이지 개발, DB 구축 |
| S1-S5 | 본개발 | 인증, API, 결제, 배포 |

---

## 📞 플랫폼 사용법 안내 (권장)

설치가 완료되었다면, **프로젝트를 시작하기 전에** 전화로 플랫폼 사용법 안내를 받으시는 것을 권장합니다.

- **소요 시간**: 10분 이내
- **내용**: 플랫폼 사용법, 개발 진행 방법 등 간단한 안내
- **전화번호**: 📞 010-5067-8306

짧은 통화로 플랫폼을 더 효과적으로 활용하실 수 있습니다.

---

## 도움이 필요하면

- **📖 Books**: 웹 개발 학습 자료
- **❓ FAQ**: 자주 묻는 질문
- **💬 써니에게 묻기**: 1:1 멘토링
- **📞 전화 문의**: 010-5067-8306

