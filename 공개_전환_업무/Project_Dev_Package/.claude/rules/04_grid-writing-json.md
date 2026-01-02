# 04. Grid 작성 및 JSON 작업 규칙

> Project Task Grid 데이터 작성 및 JSON 파일 CRUD 작업 시 준수 사항

---

## 1. Grid 22개 속성

| # | 필드명 | 설명 | 작성자 |
|---|--------|------|--------|
| 1 | task_id | Task 고유 ID | 설계 시 |
| 2 | task_name | Task 이름 | 설계 시 |
| 3 | stage | Stage 코드 (S1~S5) | 설계 시 |
| 4 | area | Area 코드 (11개) | 설계 시 |
| 5 | level | Level (1~3) | 설계 시 |
| 6 | status | 상태 (대기/진행/완료) | Main Agent |
| 7 | progress | 진행률 (0~100) | Main Agent |
| 8 | dependencies | 선행 Task | 설계 시 |
| 9 | task_instruction | Task 수행 지침 | 설계 시 |
| 10 | task_agent | Task 수행 Agent | 설계 시 |
| 11 | generated_files | 생성된 파일 | Main Agent |
| 12 | duration | 소요 시간 | Main Agent |
| 13 | build_result | 빌드 결과 | Main Agent |
| 14 | verification_instruction | 검증 지침 | 설계 시 |
| 15 | verification_agent | 검증 Agent | 설계 시 |
| 16 | test_result | 테스트 결과 | Main Agent |
| 17 | build_verification | 빌드 검증 | Main Agent |
| 18 | integration_verification | 통합 검증 | Main Agent |
| 19 | blockers | 차단 요소 | Main Agent |
| 20 | comprehensive_verification | 종합 검증 | Main Agent |
| 21 | ai_verification_note | AI 검증 의견 | Main Agent |
| 22 | stage_gate_status | Stage Gate 상태 | PO |

---

## 2. Task Agent 올바른 값

| Area | Task Agent |
|------|------------|
| M (Documentation) | `documentation-specialist` |
| U (Design) | `frontend-developer` |
| F (Frontend) | `frontend-developer` |
| BI (Backend Infra) | `backend-developer`, `devops-troubleshooter` |
| BA (Backend APIs) | `backend-developer` |
| D (Database) | `database-specialist` |
| S (Security) | `security-specialist` |
| T (Testing) | `test-engineer` |
| O (DevOps) | `devops-troubleshooter` |
| E (External) | `backend-developer`, `devops-troubleshooter` |
| C (Content) | `content-specialist` |

---

## 3. Verification Agent 올바른 값

| 용도 | Verification Agent |
|------|-------------------|
| 코드 리뷰 | `code-reviewer` |
| 품질 보증 | `qa-specialist` |
| 보안 감사 | `security-auditor` |
| DB 검증 | `database-specialist` |

**핵심 원칙:** Task Agent ≠ Verification Agent (작성자와 검증자 분리)

---

## 4. Verification 필드 JSON 형식

### #16 Test Result
```json
{
    "unit_test": "PASS/FAIL/PENDING 설명",
    "integration_test": "PASS/FAIL/PENDING 설명",
    "edge_cases": "PASS/FAIL/PENDING 설명",
    "manual_test": "PASS/FAIL/PENDING 설명"
}
```

### #17 Build Verification
```json
{
    "compile": "PASS/FAIL/N/A 설명",
    "lint": "PASS/FAIL/N/A 설명",
    "deploy": "PASS/FAIL/N/A 설명",
    "runtime": "PASS/FAIL/N/A 설명"
}
```

### #18 Integration Verification
```json
{
    "dependency_propagation": "PASS/FAIL 설명",
    "cross_task_connection": "PASS/FAIL 설명",
    "data_flow": "PASS/FAIL 설명"
}
```

### #19 Blockers
```json
{
    "dependency": "None/WARNING 설명",
    "environment": "None/WARNING 설명",
    "external_api": "None/WARNING 설명",
    "status": "No Blockers / N Blockers"
}
```

### #20 Comprehensive Verification
```json
{
    "task_instruction": "PASS/FAIL 설명",
    "test": "PASS/FAIL N/N 통과",
    "build": "PASS/FAIL N/N 통과",
    "integration": "PASS/FAIL N/N 통과",
    "blockers": "None/N개",
    "final": "Passed / Failed"
}
```

---

## 5. Tools 필드 올바른 값

**포함해야 할 것:**
- Slash Commands: `/review-pr`, `/deploy`, `/test`
- CLI 도구: `gh`, `vercel-cli`, `npm`
- MCP Servers: `browser-mcp`
- Skills: `pdf-skill`, `playwright-mcp`
- SDK: `openai-sdk`

**포함하면 안 되는 것:**
- `Read`, `Write` (기본 동작)
- `TypeScript`, `React` (기술 스택)

---

## 6. JSON 파일 정보 (개별 파일 방식)

### JSON 폴더 구조

```
{project-root}/S0_Project-SAL-Grid_생성/method/json/data/
├── index.json             ← 프로젝트 메타데이터 + task_ids 배열
└── grid_records/          ← 개별 Task JSON 파일
    ├── S1BI1.json
    ├── S1BI2.json
    ├── S2F1.json
    └── ... (Task ID별 파일)
```

**핵심:**
- `index.json` = 프로젝트 정보 + Task ID 목록
- `grid_records/{TaskID}.json` = 개별 Task 데이터
- Viewer는 `index.json` 먼저 로드 → `task_ids`로 개별 파일 로드

### index.json 구조

```json
{
  "project_id": "프로젝트ID",
  "project_name": "프로젝트명",
  "total_tasks": 66,
  "task_ids": ["S1BI1", "S1BI2", "S1D1", "S1F1", ...]
}
```

### 개별 Task JSON 구조 (grid_records/{TaskID}.json)

```json
{
  "task_id": "S1F1",
  "task_name": "로그인 페이지 구현",
  "stage": 1,
  "area": "F",
  "task_status": "Pending",
  "task_progress": 0,
  "verification_status": "Not Verified",
  ...
}
```

### 필수 필드

| 필드 | 설명 | 예시 값 |
|------|------|--------|
| task_id | Task 고유 ID | S1F1, S2BA1 |
| task_name | Task 이름 | 로그인 페이지 구현 |
| stage | Stage 번호 | 1, 2, 3, 4, 5 |
| area | Area 코드 | F, BA, D, S, ... |
| task_status | 작업 상태 | Pending, In Progress, Executed, Completed |
| task_progress | 진행률 | 0~100 |
| verification_status | 검증 상태 | Not Verified, In Review, Verified, Needs Fix |

---

## 7. JSON CRUD 작업 방법

### 핵심 원칙

```
개별 Task JSON 파일을 직접 수정!
해당 Task 파일 Read -> Modify -> Write 순서로 작업
```

### 읽기 (Read)

```javascript
const fs = require('fs');
const path = require('path');

// index.json 읽기 (Task ID 목록 확인)
const indexPath = path.join(__dirname, 'S0_Project-SAL-Grid_생성/method/json/data/index.json');
const indexData = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));

// 개별 Task 파일 읽기
const taskPath = path.join(__dirname, 'S0_Project-SAL-Grid_생성/method/json/data/grid_records/S1F1.json');
const taskData = JSON.parse(fs.readFileSync(taskPath, 'utf-8'));
```

### 수정 (Update)

```javascript
// 개별 Task 파일 직접 수정
taskData.task_status = 'Completed';
taskData.task_progress = 100;
taskData.verification_status = 'Verified';
taskData.updated_at = new Date().toISOString();
```

### 쓰기 (Write)

```javascript
// 개별 Task JSON 파일 저장 (pretty print)
fs.writeFileSync(taskPath, JSON.stringify(taskData, null, 2), 'utf-8');
```

### Task 추가 시

```javascript
// 1. index.json의 task_ids 배열에 추가
indexData.task_ids.push('S4F5');
indexData.total_tasks = indexData.task_ids.length;
fs.writeFileSync(indexPath, JSON.stringify(indexData, null, 2), 'utf-8');

// 2. 새 Task JSON 파일 생성
const newTaskData = {
    task_id: 'S4F5',
    task_name: 'Task 이름',
    stage: 4,
    area: 'F',
    task_status: 'Pending',
    task_progress: 0,
    verification_status: 'Not Verified'
};
const newTaskPath = path.join(__dirname, 'S0_Project-SAL-Grid_생성/method/json/data/grid_records/S4F5.json');
fs.writeFileSync(newTaskPath, JSON.stringify(newTaskData, null, 2), 'utf-8');
```

---

## 8. Task 완료/수정 시 Grid 자동 업데이트

### 핵심 원칙

```
Task 작업만 하고 Grid 업데이트 없이 끝내지 마라!
작업 완료 후 반드시 JSON 파일 업데이트!
```

### 업데이트 시점

| 상황 | 업데이트 필드 |
|------|-------------|
| Task 시작 | `task_status`: 'In Progress', `task_progress`: 진행률 |
| Task 작업 완료 | `task_status`: 'Executed', `task_progress`: 100, `generated_files` |
| 검증 완료 | `verification_status`: 'Verified', `task_status`: 'Completed' |
| 버그 수정 | `modification_history`, `remarks`, `updated_at` |

### 업데이트 프로세스

```
Task 작업 완료
     |
grid_records/{TaskID}.json 파일 읽기
     |
상태/진행률/파일목록 업데이트
     |
JSON 파일 저장
     |
work_logs/current.md에 작업 내역 기록
     |
완료 보고
```

---

## 체크리스트

### Grid 작성
- [ ] Task Agent가 Area에 맞는가?
- [ ] Verification Agent가 Task Agent와 다른가?
- [ ] Verification 필드가 JSON 형식인가?
- [ ] Tools에 기본 도구(Read/Write)가 없는가?

### JSON 작업
- [ ] JSON 파일 경로가 올바른가?
- [ ] JSON 문법이 올바른가? (쉼표, 중괄호 등)
- [ ] 수정 후 파일을 저장했는가?
- [ ] UTF-8 인코딩으로 저장했는가?

### Task 완료/수정 시 Grid 업데이트
- [ ] task_status를 'Completed'로 변경했는가?
- [ ] task_progress를 100으로 변경했는가?
- [ ] generated_files에 생성/수정 파일 기록했는가?
- [ ] verification_status를 'Verified'로 변경했는가?
- [ ] JSON 파일을 저장했는가?

---

## 9. Viewer 확인 방법 (로컬 + 배포)

> JSON 데이터를 Viewer로 확인하는 두 가지 방법
> Claude Code가 상황에 맞게 안내

### 확인 방법 비교

| 방법 | 설명 | 필요한 것 | 장점 |
|------|------|----------|------|
| **로컬 확인** | 내 컴퓨터에서 바로 확인 | 로컬 서버 | 빠름, 인터넷 불필요 |
| **GitHub Pages 배포** | 웹에서 어디서든 확인 | GitHub 계정 | 공유 가능, 항상 접근 |

---

### 9.1 로컬에서 Viewer 확인

**간단한 로컬 서버 실행:**

```bash
# 방법 1: npx 사용 (Node.js 설치 필요)
npx serve

# 방법 2: Python 사용
python -m http.server 3000

# 방법 3: VS Code Live Server 확장 사용
# (VS Code에서 HTML 파일 우클릭 → Open with Live Server)
```

**접속 URL:**
```
http://localhost:3000/S0_Project-SAL-Grid_생성/viewer/viewer_json.html
```

**⚠️ 주의:** `file://` 프로토콜로 직접 열면 JSON 로드가 안 됨 (CORS 제한)

**Claude Code 안내 템플릿:**
```
"로컬에서 Viewer를 확인하려면:

1. 터미널에서 프로젝트 폴더로 이동
2. 다음 명령어 실행: npx serve
3. 브라우저에서 열기: http://localhost:3000/S0_Project-SAL-Grid_생성/viewer/viewer_json.html

서버를 종료하려면 터미널에서 Ctrl+C를 누르세요."
```

---

### 9.2 GitHub Pages로 배포 (웹에서 확인)

> S0 완료 후 웹에서 언제 어디서든 Viewer 확인 가능
> Claude Code가 자동으로 배포 수행

#### 사전 조건 확인 (Claude Code 필수 수행)

```bash
# 1. GitHub CLI 설치 확인
gh --version

# 2. GitHub 로그인 상태 확인
gh auth status
```

**❌ 미설치 시 안내:**
```
"GitHub Pages 배포를 위해 설정이 필요합니다.

1. GitHub CLI 설치:
   - Windows: winget install GitHub.cli
   - Mac: brew install gh
   - 또는: https://cli.github.com/

2. GitHub 로그인:
   gh auth login
   (브라우저에서 인증)

설정 완료 후 '배포해줘'라고 말씀해주세요."
```

#### 배포 프로세스 (Claude Code 자동 수행)

```bash
# Step 1: Git 초기화 (없으면)
git init

# Step 2: 커밋
git add .
git commit -m "Initial commit: Project SAL Grid setup complete"

# Step 3: GitHub 레포 생성 + 푸시
gh repo create {프로젝트명} --public --source=. --push

# Step 4: GitHub Pages 활성화
gh api repos/{owner}/{repo}/pages -X POST -f source='{"branch":"main","path":"/"}'
```

**Step 4 실패 시 수동 안내:**
```
"GitHub Pages 수동 설정이 필요합니다:

1. https://github.com/{username}/{repo}/settings/pages 접속
2. Source: 'Deploy from a branch' 선택
3. Branch: 'main', Folder: '/ (root)' 선택
4. Save 클릭

설정 후 알려주세요."
```

#### 배포 완료 안내

```
"배포 완료!

Viewer URL: https://{username}.github.io/{repo}/S0_Project-SAL-Grid_생성/viewer/viewer_json.html

첫 배포는 1-2분 후 접속 가능합니다.
북마크 해두면 언제든 진행 상황을 확인할 수 있습니다!"
```

---

### 9.3 Task 완료 시 자동 업데이트

Task 완료 후 JSON이 업데이트되면 Claude Code가 자동으로:

```bash
git add .
git commit -m "Update: {TaskID} {Task Name} 완료"
git push
```

**커밋 메시지 형식:** `Update: {TaskID} {Task Name} 완료`

---

### 9.4 문제 해결

| 문제 | 해결 방법 |
|------|----------|
| 로컬에서 JSON 안 보임 | `file://` 대신 로컬 서버 사용 |
| `gh` 명령어 없음 | GitHub CLI 설치: https://cli.github.com/ |
| GitHub 인증 실패 | `gh auth login` 실행 |
| Pages 404 에러 | 1-2분 대기 또는 경로 확인 |
| 푸시 권한 없음 | `gh auth login`으로 재인증 |

---

### Viewer 확인 체크리스트

#### 로컬 확인
- [ ] 로컬 서버 실행했는가? (`npx serve` 등)
- [ ] `localhost:3000`으로 접속했는가?
- [ ] Viewer에서 Task 목록이 보이는가?

#### GitHub Pages 배포
- [ ] `gh --version` 작동하는가?
- [ ] `gh auth status` 로그인 되어 있는가?
- [ ] GitHub 레포 생성되었는가?
- [ ] GitHub Pages 활성화되었는가?
- [ ] Viewer URL 접속 가능한가?

---

### 9.5 SSAL Works 플랫폼 연동 ⭐

> GitHub Pages 배포 완료 후, SSAL Works 플랫폼(www.ssalworks.ai.kr)에서도 확인 가능!
> "Viewer 연결해줘"라고 말하면 Claude Code가 자동으로 연동

#### 연동 방식 (개인정보 보호)

```
┌─────────────────────────────────────────────────────────────┐
│  📁 프로젝트 데이터 = 본인 GitHub에만 저장 (안전)             │
│  🔗 SSAL Works는 GitHub URL만 저장 (데이터 X)               │
│  📊 SSAL Works Viewer는 GitHub에서 직접 fetch                │
└─────────────────────────────────────────────────────────────┘
```

**개인정보 보호:**
- ✅ 프로젝트 데이터는 **본인 GitHub**에만 저장
- ✅ SSAL Works 서버에는 **GitHub URL 레퍼런스만** 저장
- ❌ SSAL Works가 프로젝트 데이터를 저장하지 않음

#### "Viewer 연결해줘" 명령어

**사용 시점:** GitHub 배포 완료 후

**Claude Code가 수행하는 작업:**
```
1. 현재 Git remote URL 확인
   git remote get-url origin

2. SSAL Works users 테이블에 github_repo_url 등록
   (사용자 이메일 기준)

3. 연동 완료 안내
```

**사용자가 말할 것:**
```
"Viewer 연결해줘"
또는
"SSAL Works에 연결해줘"
```

#### 연동 확인 방법

**SSAL Works 사이트에서:**
1. www.ssalworks.ai.kr 접속
2. 같은 이메일로 로그인
3. 사이드바 → Project SAL Grid → "내 프로젝트" 클릭
4. 프로젝트 진행 현황 확인

**연동 안 되면:**
- "GitHub 연결이 필요합니다" 메시지 표시
- Claude Code에게 "Viewer 연결해줘" 요청

#### SSAL Works 연동 체크리스트

- [ ] GitHub 배포 완료되었는가?
- [ ] Git remote URL이 설정되었는가?
- [ ] SSAL Works에 같은 이메일로 로그인했는가?
- [ ] "Viewer 연결해줘" 실행했는가?
- [ ] SSAL Works에서 프로젝트가 보이는가?
