# Development Package

SSAL Works 프로젝트 개발을 위한 표준 디렉토리 구조입니다.

---

# 사용자 안내

## 필수 도구 설치

| 도구 | 용도 | 설치 |
|------|------|------|
| Git | 버전 관리 | https://git-scm.com |
| Node.js | JavaScript 런타임 | https://nodejs.org (LTS) |
| Claude Code | AI 개발 어시스턴트 | `npm install -g @anthropic-ai/claude-code` |

## 개발 시작

1. 다운로드한 압축 파일 해제
2. 폴더 이름을 프로젝트에 맞게 변경
3. 터미널에서 폴더 열기
4. `claude` 명령어 실행

**Claude Code가 자동으로:**
- 이 README.md와 `.claude/CLAUDE.md` 파일을 읽고
- 프로젝트 규칙을 파악한 뒤
- 개발을 시작합니다

## 작업 흐름

```
SSAL Works 웹사이트 접속 (www.ssalworks.ai.kr)
        ↓
사이드바에서 현재 단계 확인 (P0 → P1 → ... → S5)
        ↓
안내문 읽기 → Order Sheet를 Claude Code에게 전달
        ↓
결과 확인 → 다음 단계
```

## 도움이 필요할 때

SSAL Works 웹사이트에서:
- **학습용 Books** - Claude/Claude Code, 풀스택 개발 (80편)
- **실전 Tips** - 18개 카테고리, 65개 팁
- **외부 연동 설정 Guide** - Supabase, Vercel, OAuth 등 (5개)
- **Sunny에게 질문하기** - 1:1 상담

---

# Claude Code 안내

## 핵심 규칙 파일

> **Claude Code는 반드시 이 파일들을 참조해야 합니다**

| 파일 | 내용 | 언제 참조 |
|------|------|----------|
| **`.claude/CLAUDE.md`** | 7대 작업 규칙 + 5개 절대 규칙 | **세션 시작 시 필수** |
| `.claude/rules/` | 7개 규칙 파일 상세 | 해당 작업 수행 시 |
| `.claude/methods/` | 작업 방법 | JSON CRUD 등 |
| `.claude/work_logs/current.md` | 이전 작업 기록 | **세션 시작 시 필수** |

## 7대 작업 규칙 (상세는 `.claude/rules/` 참조)

| # | 규칙 | 파일 | 확인 시점 |
|---|------|------|----------|
| 1 | 파일명 규칙 | `01_file-naming.md` | 파일명 정할 때 |
| 2 | 저장 위치 규칙 | `02_save-location.md` | 파일 저장할 때 |
| 3 | Area/Stage 매핑 | `03_area-stage.md` | 폴더 선택할 때 |
| 4 | Grid/JSON 작업 | `04_grid-writing-json.md` | JSON 작업할 때 |
| 5 | 실행 프로세스 | `05_execution-process.md` | Task 실행할 때 |
| 6 | 검증 기준 | `06_verification.md` | 검증할 때 |
| 7 | Task CRUD | `07_task-crud.md` | Task 추가/삭제/수정 |

## 5개 절대 규칙 (상세는 `.claude/CLAUDE.md` 참조)

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

# 프로젝트 구조

## 개발 프로세스 폴더 (P0 → S5 순서)

```
├── P0_작업_디렉토리_구조_생성/    # Step 1
├── P1_사업계획/                  # Step 2
├── P2_프로젝트_기획/              # Step 3
├── P3_프로토타입_제작/            # Step 4
├── S0_Project-SAL-Grid_생성/     # Step 5
├── S1_개발_준비/                 # Step 6
├── S2_개발-1차/                  # Step 7
├── S3_개발-2차/                  # Step 8
├── S4_개발-3차/                  # Step 9
└── S5_개발_마무리/               # Step 10
```

## 배포용 폴더 (자동 복사됨)

```
├── api/      ← 백엔드 API
├── pages/    ← 프론트엔드 페이지
└── assets/   ← 이미지, CSS, JS
```

## 설정 폴더

```
├── .claude/                      # AI 작업 규칙
├── scripts/                      # 자동화 스크립트
├── Development_Process_Monitor/  # 진행률 확인
└── Human_ClaudeCode_Bridge/      # Claude Code 파일 교환
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
| JSON CRUD 방법 | `.claude/methods/01_json-crud.md` |

## Project SAL Grid

| 정보 | 위치 |
|------|------|
| SAL Grid 매뉴얼 | `S0_Project-SAL-Grid_생성/manual/PROJECT_SAL_GRID_MANUAL.md` |
| Task 목록 | `S0_Project-SAL-Grid_생성/sal-grid/TASK_PLAN.md` |
| Task Instruction | `S0_Project-SAL-Grid_생성/sal-grid/task-instructions/` |
| Verification Instruction | `S0_Project-SAL-Grid_생성/sal-grid/verification-instructions/` |
| JSON 데이터 (index) | `S0_Project-SAL-Grid_생성/method/json/data/index.json` |
| JSON 데이터 (개별 Task) | `S0_Project-SAL-Grid_생성/method/json/data/grid_records/{TaskID}.json` |
| Viewer (데스크톱) | `S0_Project-SAL-Grid_생성/viewer/viewer_json.html` |
| Stage Gate 리포트 | `S0_Project-SAL-Grid_생성/method/json/stage-gates/` |

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
| DB 업로드 설정 (선택) | `.claude/CLAUDE.md` → "Progress Monitor - DB 업로드" 섹션 |
| DB 업로드 상세 | `Development_Process_Monitor/DB_Method/README.md` |

## 기타

| 정보 | 위치 |
|------|------|
| AI 12대 준수사항 | `.claude/compliance/AI_12_COMPLIANCE.md` |
| 주의사항 | `.claude/CAUTION.md` |
| 환경변수 샘플 | `.env.sample` |
| 프로젝트 설정 | `.ssal-project.json` |

---

# 자주 묻는 질문

### Q: 어디서 시작해야 하나요?
**A:** SSAL Works 웹사이트 사이드바에서 P0부터 시작하세요.

### Q: Claude Code가 규칙을 어떻게 알아요?
**A:** 이 README.md와 `.claude/CLAUDE.md` 파일을 자동으로 읽습니다.

### Q: 코딩을 몰라도 되나요?
**A:** 네. Claude Code가 코드를 작성합니다. Order Sheet만 전달하면 됩니다.

### Q: 규칙 상세 내용은 어디서 보나요?
**A:** `.claude/rules/` 폴더에 7개 규칙 파일이 있습니다.
