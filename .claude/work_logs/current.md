# SSAL Works 작업 로그

> **이전 로그**: [2025-12-19.md](./2025-12-19.md)

---

## Supabase DB Task 동기화 (2025-12-20)

### 작업 상태: ✅ 완료

**문제**: Viewer에서 Task 수가 로컬 파일과 불일치
- 로컬 instruction 파일: 53개
- Supabase DB: 43개 (이전 세션에서 S4BA6만 추가됨)
- 차이: 12개 Task 누락

**해결**: 누락된 12개 Task를 Supabase에 삽입

**추가된 Task:**
| Task ID | Task Name |
|---------|-----------|
| S1BI2 | Sentry 에러 트래킹 설정 |
| S2BA4 | 회원가입 API |
| S2BA5 | 프로젝트 관리 API |
| S2F3 | 회원가입 UI |
| S3BA2 | AI 가격 조회 API |
| S3F1 | AI Q&A 인터페이스 |
| S4BA3 | 토스 페이먼트 결제 API |
| S4BA4 | 크레딧 충전 API |
| S4BA5 | 설치비 입금 확인 API |
| S4D1 | 결제/크레딧 테이블 |
| S4F3 | 크레딧 충전 UI |
| S4F4 | 결제 수단 등록 UI |

**결과:**
- Supabase DB 총 Task 수: 55개
- (로컬 53개 + DB에만 있는 S4BI1, S4F2 = 55개)

**수정된 파일:**
- `S0_Project-SAL-Grid_생성/supabase/seed_ssalworks_tasks.sql` - 12개 INSERT 문 추가 (52 → 64 Tasks)

---

## 안내문 일반화 및 SSAL → SAL 명칭 변경 (2025-12-19)

### 작업 상태: ✅ 완료

**변경 사항 요약:**

#### 1. 용어 통일
- "SSAL Grid" → "Project SAL Grid" (정식 명칭)
- "ssalworks_tasks" → "tasks"
- "SSAL Works 개발 흐름" → "웹 개발 프로젝트 흐름"

#### 2. 폴더/파일명 변경
| 변경 전 | 변경 후 |
|--------|--------|
| S0_Project-SSAL-Grid_생성 | S0_Project-SAL-Grid_생성 |
| ssal-grid | sal-grid |
| PROJECT_SSAL_GRID_MANUAL.md | PROJECT_SAL_GRID_MANUAL.md |
| S0-1_SSAL_Grid_생성.md | S0-1_SAL_Grid_생성.md |
| (S0-2, S0-3, S0-4도 동일) | |

#### 3. Order_Sheet_템플릿 안내문 수정 (S0-S5)
- "SSAL Grid 기반" → "Project SAL Grid 기반"
- "ssalworks_tasks" → "tasks"
- 파일 경로 참조 업데이트

#### 4. 상황별_안내문 일반화 (S1~S5)
**변경 원칙:**
- 안내문 = 개요만, 일반론만
- 구체적 Task 목록 → Order Sheet에만 기재
- Task ID 제거, Area 기반 개요 테이블로 대체

**수정된 파일:**
- `S1_개발_준비.md` - 일반화 완료 (v3.0)
- `S2_개발_1차.md` - 일반화 완료 (v3.0)
- `S3_개발_2차.md` - 일반화 완료 (v3.0)
- `S4_개발_3차.md` - 일반화 완료 (v3.0)
- `S5_운영.md` - 일반화 완료 (v3.0)

**새 포맷 예시:**
```markdown
## 3. Stage 작업 영역

| Area | 작업 내용 | 유형 |
|------|----------|------|
| Documentation | 개발 가이드 문서화 | AI-Only |
| Frontend | 프로젝트 설정, 빌드 구성 | Human-AI |
...

**상세 Task 목록은 Order Sheet를 참조하세요.**
```

#### 5. 변경하지 않은 파일
- `SSALWORKS_TASK_PLAN.md` - SSALWorks 프로젝트 자체 파일
- `!SSAL_Works_Private` 폴더명 - 프로젝트 루트 폴더

---

## .claude/rules/ 폴더 생성 - 작업 규칙 체계화 (2025-12-19)

### 작업 상태: ✅ 완료

**완료된 작업:**

#### 1. 6개 규칙 파일 생성

**저장 위치**: `.claude/rules/`

| # | 파일명 | 내용 | 상태 |
|---|--------|------|------|
| 1 | 01_file-naming.md | 파일 명명 규칙 (kebab-case, Task ID 주석) | ✅ |
| 2 | 02_save-location.md | 저장 위치 규칙 (5개 Area 이중 저장) | ✅ |
| 3 | 03_area-stage.md | 11개 Area, 5개 Stage 매핑 | ✅ |
| 4 | 04_grid-writing.md | Grid 22개 속성 작성 규칙 | ✅ |
| 5 | 05_execution-process.md | 6단계 실행 프로세스 (PO 협력 포함) | ✅ |
| 6 | 06_verification.md | Task/Stage Gate/PO 검증 기준 | ✅ |

#### 2. CLAUDE.md 업데이트

- 상세 작업 규칙 참조 섹션 추가
- 규칙 파일 목록 및 설명 테이블
- 규칙 참조 우선순위 명시:
  1. 절대 불변 규칙 (ABSOLUTE RULES)
  2. .claude/rules/ 상세 규칙
  3. Order Sheet 지시사항
  4. PROJECT_SSAL_GRID_MANUAL.md

#### 3. Git 커밋

- `8c1d240`: docs: .claude/rules/ 폴더 생성 - 6개 작업 규칙 파일 분리
- `0cc5516`: docs: CLAUDE.md에 .claude/rules/ 참조 섹션 추가
- `f420812`: docs: PROJECT_SSAL_GRID_MANUAL v3.4 - .claude/rules/ 참조 통합
- `6f17331`: docs: Order Sheet 템플릿에 rules_reference 필드 추가

#### 4. PROJECT_SSAL_GRID_MANUAL 업데이트 (v3.3 → v3.4)

**업데이트된 섹션:**
- AI 필수 준수 규칙 섹션: 상세 규칙 참조 추가
- Task Instruction 섹션 (7.1): 필수 참조 규칙 파일 테이블 추가
- Verification Instruction 섹션 (8.1): 필수 참조 규칙 파일 테이블 추가

#### 5. Order Sheet 템플릿 업데이트 (v2.1 → v2.2)

**수정된 파일**: `Human_ClaudeCode_Bridge/HUMAN_CLAUDECODE_BRIDGE_GUIDE.md`

**추가된 내용:**
- Order Sheet Markdown 예시에 "필수 참조 규칙" 섹션 추가
- Order Sheet JSON 구조에 `rules_reference` 필드 추가
- JSON 필드 설명 테이블 추가
- Area별 필수 규칙 매핑 가이드 추가:
  - 모든 Task: `01_file-naming.md`, `02_save-location.md`, `05_execution-process.md`
  - F, BA, D Area: + `03_area-stage.md` (Production 이중 저장)
  - 검증 관련: + `04_grid-writing.md`, `06_verification.md`

#### 6. Instruction 파일 84개에 규칙 참조 추가

**수정된 폴더:**
- `S0_Project-SSAL-Grid_생성/ssal-grid/task-instructions/` (42개)
- `S0_Project-SSAL-Grid_생성/ssal-grid/verification-instructions/` (42개)

**추가된 내용:**

**Task Instructions:**
```
| 규칙 파일 | 내용 | 참조 시점 |
|----------|------|----------|
| .claude/rules/01_file-naming.md | 파일 명명 규칙 | 파일 생성 시 |
| .claude/rules/02_save-location.md | 저장 위치 규칙 | 파일 저장 시 |
| .claude/rules/03_area-stage.md | Area/Stage 매핑 | 폴더 선택 시 |
| .claude/rules/05_execution-process.md | 6단계 실행 프로세스 | 작업 전체 |
```

**Verification Instructions:**
```
| 규칙 파일 | 내용 | 참조 시점 |
|----------|------|----------|
| .claude/rules/04_grid-writing.md | Grid 속성 검증 | 결과 기록 시 |
| .claude/rules/05_execution-process.md | 검증 프로세스 | 검증 수행 순서 |
| .claude/rules/06_verification.md | 검증 기준 | **핵심 참조** |
```

**추가 파일:**
- `add_rules_reference.js`: 일괄 적용 스크립트
- `seed_ssalworks_tasks.sql`: 주석에 규칙 파일 목록 추가

**Git 커밋:**
- `447da9e`: docs: instruction 파일 84개에 .claude/rules/ 참조 추가

**규칙 연결 구조:**
```
CLAUDE.md (절대 규칙)
    ↓
.claude/rules/ (상세 규칙 6개 파일)
    ↓
PROJECT_SSAL_GRID_MANUAL (Task/Verification에서 참조)
    ↓
DB ssal_grid (task_instruction, verification_instruction)
```

**배경:**
- CLAUDE.md가 너무 길어짐 (2000줄 이상)
- 작업 규칙을 별도 파일로 분리하여 관리성 향상
- 규칙 저장 위치 체계화:
  - CLAUDE.md: 기본 원칙 + 참조
  - .claude/rules/: 상세 작업 규칙
  - PROJECT_SSAL_GRID_MANUAL: Task/Verification 템플릿
  - DB (ssal_grid): task_instruction, verification_instruction
  - DB (stage_verification): 검증 리포트 경로

---

## 특별 안내문 생성 및 Welcome.html 업데이트 (2025-12-19)

### 작업 상태: ✅ 완료

**완료된 작업:**

#### 1. 특별 안내문 5개 신규 생성

**저장 위치**: `P2_프로젝트_기획/User_Flows/상황별_안내문/`

| # | 파일명 | 용도 | 상태 |
|---|--------|------|------|
| 1 | BeforeSignup.html | 회원가입 전 (비로그인 상태) | ✅ 생성 |
| 2 | Project_Completed.html | 완료된 프로젝트 클릭 시 | ✅ 생성 |
| 3 | Project_First.html | 프로젝트 첫 등록 시 | ✅ 생성 |
| 4 | Project_Add.html | 프로젝트 추가 등록 시 | ✅ 생성 |
| 5 | Default.html | 평소 로그인 상태 (워크스페이스만) | ✅ 생성 |

**기존 파일 (변경 없음):**
- Welcome.html (회원가입 완료 시)
- Project_Example.html (예시 프로젝트)
- Project_Work.html (진행 중인 프로젝트)

#### 2. Welcome.html Claude Code 설치 안내 추가

**수정된 파일**: `P2_프로젝트_기획/User_Flows/상황별_안내문/Welcome.html`

**추가된 내용:**
- Step 1: Claude Code 설치
  - Node.js 설치 안내 (nodejs.org 링크)
  - `npm install -g @anthropic-ai/claude-code` 명령어
  - `claude --version` 확인 방법
  - 상세 설치 방법은 학습 콘텐츠 Tips 안내
- Step 2: 프로젝트 시작
  - 프로젝트 등록 → 진행 프로세스 → Order Sheet

---

### 특별 안내문 전체 목록 (8개 완성)

| # | 상황 | 파일명 | 상태 |
|---|------|--------|------|
| 1 | 회원가입 전 | BeforeSignup.html | ✅ |
| 2 | 회원가입 완료 시 | Welcome.html | ✅ (설치 안내 추가) |
| 3 | 예시 프로젝트 클릭 시 | Project_Example.html | ✅ |
| 4 | 진행 중인 프로젝트 클릭 시 | Project_Work.html | ✅ |
| 5 | 완료된 프로젝트 클릭 시 | Project_Completed.html | ✅ |
| 6 | 프로젝트 첫 등록 시 | Project_First.html | ✅ |
| 7 | 프로젝트 추가 등록 시 | Project_Add.html | ✅ |
| 8 | 평소 로그인 상태 | Default.html | ✅ (워크스페이스만) |

---

---

## 대시보드 안내문 연결 (2025-12-19)

### 작업 상태: ✅ 완료

**완료된 작업:**

#### 1. 불필요한 Inbox 서버 체크 제거
- `Production/index.html`에서 localhost:3030 서버 상태 체크 코드 제거
- 새로고침 시 "🔴 Inbox 서버 미실행" 빨간 알림 제거

#### 2. guides.js 재생성
- 새로운 안내문 파일들 포함 (총 29개)
- `Production/guides.js`에 BeforeSignup, Default 등 모든 안내문 포함 확인

#### 3. 인증 상태 기반 안내문 로드 시스템 추가
- `loadGuideToWorkspace()` 함수 추가
- 비로그인 상태: BeforeSignup 안내문 팝업 자동 표시
- 로그인 상태: Default 안내문 준비 (자동 표시 안함)
- Supabase 세션 확인 기반 동작

#### 4. 중복 호출 제거
- `loadWelcomeMessage()` 호출 주석 처리 (line 5500)
- 새 인증 기반 로딩 시스템으로 대체

**수정된 파일:**
- `Production/index.html`
  - Inbox 서버 체크 코드 제거
  - `loadWelcomeMessage()` 중복 호출 제거
  - `loadGuideToWorkspace()` 함수 추가
  - 인증 상태 확인 및 안내문 로드 로직 추가

**동작 방식:**
```
페이지 로드
    ↓
Supabase 세션 확인
    ↓
로그인됨? → Default 안내문 준비 (팝업 안함)
로그인 안됨? → BeforeSignup 안내문 팝업 표시
```

---

---

## Control Space Naming Change (2025-12-19)

### Status: ✅ Completed

**Modified File:** `Production/index.html`

**Changes:** "Workspace" → "Control Space" (all user-visible UI text in English)

| # | Line | Change |
|---|------|--------|
| 1 | 2792 | Header title `<span>Control Space</span>` |
| 2 | 2798 | Button text `Control Space` |
| 3 | 2850-2852 | Translation preview (English only) |
| 4 | 3937 | `Clear Control Space content?` |
| 5 | 3987 | `Replace current Control Space content with this template?` |
| 6 | 4088 | `Replace Control Space content with template?` |
| 7 | 5347 | `Load Order Sheet to Control Space?` |
| 8 | 8407 | `② Control Space (Center)` |

**Code Internal (unchanged):**
- CSS comments: `/* Center Workspace */`
- HTML comments: `<!-- Center Workspace -->`
- Function names: `loadOrderSheetToWorkspace()`, `loadGuideToWorkspace()`

---

### Next Tasks

- Git commit & push

---

## S3S1 AI 서비스 헬스체크 구현 (2025-12-19)

### 작업 상태: ✅ 완료

**Task 목적 변경:**
- 기존: 사용자 구독 등급별 권한 체크
- 변경: PO의 AI 서비스 구독 상태 확인 (Health Check)

**배경:**
- PO가 AI API 비용을 지불 (도매)
- 사용자들은 PO의 API를 통해 AI 기능 사용 (소매)
- API 키가 있어도 요금 미납, 쿼터 초과 등으로 사용 불가할 수 있음
- 실제 사용 가능한 상태인지 주기적으로 확인 필요

**생성된 파일:**
- `Production/api/External/ai-health.js` - 헬스체크 API
- `Production/vercel.json` - `/api/ai/health` 라우트 추가
- `S0_Project-SSAL-Grid_생성/ssal-grid/task-instructions/S3S1_instruction.md` - 수정

**API 테스트 결과:**
```
GET /api/ai/health

{
  "timestamp": "2025-12-18T17:55:31.369Z",
  "overall": "healthy",
  "summary": "3/3 services active",
  "services": {
    "gemini": {"status": "active", "latency": "766ms"},
    "perplexity": {"status": "active", "latency": "1164ms"},
    "chatgpt": {"status": "active", "latency": "1871ms"}
  }
}
```

**S3 Stage 검증 결과:**
- S3E1: ✅ AI API 키 설정 완료
- S3S1: ✅ AI 서비스 헬스체크 구현 완료
- S3BI1: ✅ AI 클라이언트 통합 완료
- S3BA1: ✅ AI Q&A API 완료 (구독 체크 제거)

**Git 커밋:**
- `9f11996` - feat(S3S1): AI 서비스 구독 상태 헬스체크 API 구현
- `d924c99` - docs: S3S1 Task Result 및 Stage Verification Report 업데이트

---

## 프론트엔드 AI Q&A 오류 수정 (2025-12-19)

### 작업 상태: ✅ 완료

**해결된 문제들:**

#### 1. API 엔드포인트 오류
- **문제**: 프론트엔드가 `localhost:3031/ask-${selectedAI}` 호출
- **해결**: `/api/ai/qa` Vercel API로 변경

#### 2. Null Reference 오류
- **문제**: `Cannot read properties of null (reading 'style')`
- **원인**: `event.target` undefined
- **해결**: `id="askAIButton"` 추가 + `getElementById` 사용

#### 3. Socket.IO CORS 오류
- **문제**: Production에서 localhost:3030 연결 시도
- **해결**: `IS_PRODUCTION` 체크로 localhost 연결 스킵

#### 4. 거짓 에러 알림
- **문제**: AI 응답 성공해도 에러 메시지 표시
- **원인**: `saveQuestionHistory()` 에러가 외부 catch로 전파
- **해결**: `saveQuestionHistory()` 자체 try-catch로 에러 격리

#### 5. 삭제 버튼 UI 개선
- **변경**: 빨간색(`#dc3545`) → 회색(`#6c757d`)

**수정된 파일:**
- `Production/index.html` (AI Q&A 함수 전반 수정)

**Git 커밋:**
- `42033c8` - fix: AI 질문 응답 성공 시에도 에러 메시지 표시되는 버그 수정

---

## Gemini 시스템 프롬프트 문제 해결 (2025-12-19)

### 작업 상태: ✅ 완료

**문제:**
- Gemini가 "SSALWorks AI 튜터입니다"라고 자신을 소개
- 실제 Google AI인데 거짓 정체성 주장

**원인:**
- `ai-qa.js`에 시스템 프롬프트 추가됨: "당신은 SSALWorks의 AI 튜터입니다"
- Gemini가 이를 문자 그대로 해석하여 정체성 혼동

**해결:**
- 시스템 프롬프트 완전 제거
- 질문만 직접 전달 (학습 콘텐츠 있으면 참고로 첨부)

**수정된 파일:**
- `Production/api/External/ai-qa.js`

**Git 커밋:**
- `fix: AI Q&A API에서 시스템 프롬프트 제거 - Gemini 정체성 혼동 방지`

---

## S3 Stage 폴더 구조 수정 (2025-12-19)

### 작업 상태: ✅ 완료

**문제:**
- S3_개발-2차 폴더에 Backend_API/, Security/ 2개만 존재
- Backend_Infra/, External/ 2개 누락 (이중 저장 규칙 위반)

**해결:**
- `Backend_Infra/` 폴더 생성 및 AI 클라이언트 파일 복사
- `External/` 폴더 생성 및 S3E1 가이드 문서 생성

**생성된 파일:**
- `S3_개발-2차/Backend_Infra/ai/` - AI 클라이언트 파일들 (Production에서 복사)
- `S3_개발-2차/External/S3E1_AI_API_키_설정_가이드.md` - API 키 설정 가이드

---

## S3 Stage Gate 검증 완료 (2025-12-19)

### 작업 상태: ✅ 완료 (PO 승인됨)

**검증 결과:**
- 4/4 Tasks 완료 (100%)
- AI API 3종 (Gemini, ChatGPT, Perplexity) 정상 작동
- 헬스체크 API 정상 작동
- 프론트엔드 AI Q&A 기능 테스트 통과

**생성된 파일:**
- `S0_Project-SSAL-Grid_생성/ssal-grid/stage-gates/S3GATE_verification_report.md`
- `S0_Project-SSAL-Grid_생성/ssal-grid/update-stage-gate.js`
- `S0_Project-SSAL-Grid_생성/ssal-grid/check-stage-table.js`

**Supabase 업데이트:**
- `stage_verification` 테이블 Stage 3 데이터 업데이트
- `stage_gate_status`: 'Approved' (PO 승인 완료)

---

## SSAL Grid 통계표 Supabase 실시간 연동 (2025-12-19)

### 작업 상태: ✅ 완료

**문제:**
- 대시보드 Grid 통계표가 하드코딩된 값 표시
- 실제 Grid 데이터와 불일치 (Pending: 45 vs 실제 31)

**해결:**
- HTML 통계 요소에 ID 추가 (`grid-stat-pending`, `grid-stat-completed` 등)
- `loadGridStats()` 함수 생성 (Supabase에서 실시간 조회)
- `initSupabase()`에서 호출하여 페이지 로드 시 자동 업데이트

**수정된 파일:**
- `Production/index.html`
  - HTML: 통계 요소에 ID 추가
  - JS: `loadGridStats()` 함수 추가
  - JS: `initSupabase()`에 호출 추가

**Git 커밋:**
- `feat: SSAL Grid 통계표 Supabase 실시간 연동 - 자동 업데이트`

---

## Order Sheet SSAL→SAL 경로 수정 (2025-12-19)

### 작업 상태: ✅ 완료

**문제 발견:**
- Order Sheet 파일들에 `S0_Project-SSAL-Grid_생성` 경로 참조 존재
- 실제 폴더명은 `S0_Project-SAL-Grid_생성` (SSAL→SAL 변경됨)

**수정된 파일:**

#### Order_Sheet_템플릿 (8개 MD 파일)
- S0_Grid_생성/S0_Grid_생성.md
- S1_개발_준비/S1_개발_준비.md
- S2_개발_1차/S2_개발_1차.md
- S3_개발_2차/S3_개발_2차.md
- S4_개발_3차/S4_개발_3차.md
- S5_운영/S5_운영.md
- P2-4_DB_Design/P2-4_DB_Design.md
- P3-1-1_Frontend_Prototype/P3-1-1_Frontend_Prototype.md

#### 상황별_안내문 (16개 HTML 파일)
- S0 Grid 관련: S0-1~S0-4_*.html (4개)
- S1~S5 Stage 관련: S1~S5_*.html (5개)
- P1~P3 Stage 관련: P1~P3 *.html (7개)

**변경 내용:**
- `S0_Project-SSAL-Grid_생성` → `S0_Project-SAL-Grid_생성`
- `ssal-grid` → `sal-grid`
- `PROJECT_SSAL_GRID_MANUAL.md` → `PROJECT_SAL_GRID_MANUAL.md`
- `Backend_APIs` → `Backend_API`

---

## 웹 배포 파일 재생성 (2025-12-19)

### 작업 상태: ✅ 완료

**재생성된 파일:**

| 파일 | 항목 수 | 배포 위치 |
|------|---------|-----------|
| ordersheets.js | 53개 템플릿 | Production/, Production/Frontend/, P3_프로토타입_제작/Frontend/Prototype/ |
| guides.js | 29개 안내문 | Production/, Production/Frontend/, P3_프로토타입_제작/Frontend/Prototype/ |

**실행 명령:**
- `node Production/Frontend/build/generate-ordersheets-js.js`
- `node Production/Frontend/build/generate-guides-js.js`

---

## S4BA6 SAL Grid 파일 확인 (2025-12-19)

### 작업 상태: ✅ 확인 완료 (이미 존재)

**확인된 파일:**
- `S0_Project-SAL-Grid_생성/sal-grid/task-instructions/S4BA6_instruction.md` ✅
- `S0_Project-SAL-Grid_생성/sal-grid/verification-instructions/S4BA6_verification.md` ✅

**Task 내용:**
- Task Name: 결제/알림 이메일 템플릿
- Task Goal: 결제 및 자동화 시스템에서 사용할 이메일 템플릿 구현 (총 13종)
- Dependencies: S2BA2, S4BA1, S4BA2

**13종 이메일 템플릿:**
| 카테고리 | 템플릿 ID |
|----------|-----------|
| 결제 | receipt, billing-success, payment-failure, payment-rejected, refund-complete |
| 크레딧 | low-credit |
| 리텐션 | feature-intro, recharge |
| 구독 | subscription-suspended |
| 온보딩 | verify-email-reminder, project-registration-reminder, day7-reminder |
| 챌린지 | challenge-expiry |

---

## 다음 작업 예정

- **S4 Stage**: 진행 예정 (PO 지시)
  - S4: 개발 3차 (QA & Optimization)
  - 주요 내용: 결제 연동, 성능 최적화, QA
  - S4BA6 (결제/알림 이메일 템플릿) SAL Grid 파일 준비 완료

---
