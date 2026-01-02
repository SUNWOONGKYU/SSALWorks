# Development Process Monitor - DB Method

> 프로젝트 P0~S5 진행률을 사이드바에 표시하는 시스템
> **버전:** 3.0 (DB Method)
> **최종 수정일:** 2026-01-02

---

## 개요

Development Process Monitor는 git commit 시 진행률을 계산하여 Supabase DB에 업로드하고, 웹에서 DB를 조회하여 사이드바에 표시하는 **DB Method** 시스템입니다.

---

## 핵심 특징

| 항목 | 내용 |
|------|------|
| **방식** | DB Method (Supabase) |
| **데이터 소스** | `project_phase_progress` 테이블 |
| **업데이트 시점** | git commit 시 자동 업로드 |
| **조회 방식** | index.html에서 DB 직접 조회 |

---

## 데이터 흐름

```
┌─────────────────────────────────────────────────────────────────┐
│                    git commit 실행                               │
│                         ↓                                       │
│                 pre-commit hook 실행                             │
└─────────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────────┐
│  Step 1: build-progress.js                                      │
│  - P0~S0: 폴더/파일 존재 여부로 진행률 계산                        │
│  - S1~S5: sal_grid.csv에서 Task 완료율로 진행률 계산              │
│  - 출력: Development_Process_Monitor/data/phase_progress.json    │
└─────────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────────┐
│  Step 2: upload-progress.js                                     │
│  - phase_progress.json 읽기                                     │
│  - Supabase project_phase_progress 테이블에 UPSERT              │
│  - Project ID: .ssal-project.json 또는 이메일 기반 생성          │
└─────────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────────┐
│  Step 3: index.html loadProjectProgress()                       │
│  - Supabase에서 project_phase_progress 테이블 조회               │
│  - 사이드바 진행률 표시                                          │
└─────────────────────────────────────────────────────────────────┘
```

---

## 관련 파일

| 파일 | 위치 | 역할 |
|------|------|------|
| `build-progress.js` | `Development_Process_Monitor/` | 진행률 계산 → JSON 생성 |
| `upload-progress.js` | `scripts/` | JSON → DB 업로드 |
| `phase_progress.json` | `Development_Process_Monitor/data/` | 중간 산출물 (JSON) |
| `index.html` | 프로젝트 루트 | DB 조회 → 사이드바 표시 |
| `pre-commit` | `.git/hooks/` | 자동 실행 hook |

---

## 1. Pre-commit Hook

**위치:** `.git/hooks/pre-commit`

> **참고:** 실제 pre-commit hook은 4단계로 구성됨. 아래는 진행률 관련 부분만 발췌.

```bash
#!/bin/sh
PROJECT_ROOT="$(git rev-parse --show-toplevel)"

# === 1. 웹 배포 파일 빌드 ===
node "$PROJECT_ROOT/scripts/build-web-assets.js"

# === 2. 매뉴얼 빌드 ===
node "$PROJECT_ROOT/S0_Project-SAL-Grid_생성/manual/build-manual.js"

# === 3. 진행률 빌드 (phase_progress.json 생성) ===
echo "📊 진행률 빌드 중..."
node "$PROJECT_ROOT/Development_Process_Monitor/build-progress.js"

if [ $? -ne 0 ]; then
    echo "⚠️ 진행률 빌드 실패 (계속 진행)"
fi

# 진행률 파일 스테이징에 추가
git add "$PROJECT_ROOT/Development_Process_Monitor/data/phase_progress.json" 2>/dev/null

# === 4. 진행률 DB 업로드 ===
echo "📤 진행률 DB 업로드 중..."
node "$PROJECT_ROOT/scripts/upload-progress.js"

if [ $? -ne 0 ]; then
    echo "⚠️ 진행률 DB 업로드 실패 (계속 진행)"
fi
```

---

## 2. 빌드 스크립트: build-progress.js

**위치:** `Development_Process_Monitor/build-progress.js`

### 진행률 계산 방식

| 단계 | 계산 방식 | 데이터 소스 |
|------|----------|------------|
| P0~S0 | 폴더/파일 존재 여부 | 로컬 폴더 구조 |
| S1~S5 | Task 완료율 | sal_grid.csv |

- **P0~S0:** 하위 폴더 중 파일이 있는 폴더 수 / 전체 하위 폴더 수
- **S1~S5:** Completed 상태 Task 수 / 전체 Task 수

### 출력 파일: phase_progress.json

**위치:** `Development_Process_Monitor/data/phase_progress.json`

```json
{
  "project_id": "SSALWORKS",
  "updated_at": "2026-01-02T00:00:00.000Z",
  "phases": {
    "P0": { "name": "작업 디렉토리 구조 생성", "progress": 100, "completed": 2, "total": 2 },
    "P1": { "name": "사업계획", "progress": 100, "completed": 5, "total": 5 },
    "S5": { "name": "개발 마무리", "progress": 0, "completed": 0, "total": 9 }
  }
}
```

---

## 3. 업로드 스크립트: upload-progress.js

**위치:** `scripts/upload-progress.js`

### Project ID 결정 순서

1. `.ssal-project.json` 파일에서 `project_id` 읽기 (우선)
2. 없으면 Git 이메일에서 생성: `{email_prefix}_PROJECT`

### DB 테이블 구조

**테이블명:** `project_phase_progress`

```sql
CREATE TABLE project_phase_progress (
    id SERIAL PRIMARY KEY,
    project_id VARCHAR(100) NOT NULL,
    phase_code VARCHAR(10) NOT NULL,
    phase_name VARCHAR(100),
    progress INTEGER DEFAULT 0,
    completed_items INTEGER DEFAULT 0,
    total_items INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'pending',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(project_id, phase_code)
);
```

### UPSERT 로직

```javascript
const record = {
    project_id: projectId,
    phase_code: phaseCode,          // P0, P1, ..., S5
    phase_name: phaseData.name,
    progress: phaseData.progress,   // 0~100
    completed_items: phaseData.completed,
    total_items: phaseData.total,
    status: phaseData.progress === 100 ? 'completed'
          : phaseData.progress > 0 ? 'in_progress'
          : 'pending',
    updated_at: new Date().toISOString()
};
```

---

## 4. 웹 조회: index.html loadProjectProgress()

**위치:** `index.html` (line 2888~2940)

```javascript
async function loadProjectProgress(projectId) {
    console.log('📊 프로젝트 진행률 로드, Project ID:', projectId);

    try {
        // 로그인 사용자 확인
        const { data: { session } } = await window.supabaseClient.auth.getSession();
        if (!session || !session.user) {
            console.log('📊 로그인 필요 - 진행률 0%');
            resetAllProgressToZero();
            return;
        }

        // DB에서 진행률 조회
        const { data, error } = await window.supabaseClient
            .from('project_phase_progress')
            .select('*')
            .eq('project_id', projectId);

        if (error || !data || data.length === 0) {
            resetAllProgressToZero();
            return;
        }

        // 진행률 적용
        data.forEach(phase => {
            const progress = phase.progress || 0;
            const code = phase.phase_code;

            if (code === 'P0' || code === 'S0') {
                updateSpecialProgress(code, progress);
            } else if (code.startsWith('P')) {
                updatePrepProgressByCode(code, progress);
            } else if (code.startsWith('S')) {
                updateStageProgress(code, progress);
            }
        });

        console.log('📊 DB에서 진행률 로드 완료:', data.length + '개 단계');
    } catch (e) {
        console.warn('📊 진행률 로드 오류:', e);
        resetAllProgressToZero();
    }
}
```

---

## 5. 진행률 업데이트 함수

### updateStageProgress() - 일반단계 (P1~P3, S1~S5)

```javascript
function updateStageProgress(stageId, progress) {
    const processItems = document.querySelectorAll('.process-item');
    processItems.forEach(item => {
        const header = item.querySelector('.process-icon');
        if (header && header.textContent.includes(stageId)) {
            const progressFill = item.querySelector('.process-progress-fill');
            const percentText = item.querySelector('.process-percent');
            const majorDiv = item.querySelector('.process-major, .process-special-major');

            if (progressFill) progressFill.style.width = progress + '%';
            if (percentText) percentText.textContent = progress + '%';
            if (majorDiv) {
                majorDiv.setAttribute('data-progress', progress);
                if (progress === 100) {
                    majorDiv.classList.add('completed');
                } else {
                    majorDiv.classList.remove('completed');
                }
            }
        }
    });
}
```

### updateSpecialProgress() - 특별단계 (P0, S0)

```javascript
function updateSpecialProgress(stageId, progress) {
    const iconText = stageId + '.';
    document.querySelectorAll('.process-special-major').forEach(el => {
        const iconEl = el.querySelector('.process-icon');
        if (iconEl && iconEl.textContent === iconText) {
            el.setAttribute('data-progress', progress);
            const fillEl = el.querySelector('.process-progress-fill');
            if (fillEl) fillEl.style.width = `${progress}%`;
            const percentEl = el.querySelector('.process-percent');
            if (percentEl) percentEl.textContent = `${progress}%`;
            if (progress === 100) {
                el.classList.add('completed');
            } else {
                el.classList.remove('completed');
            }
        }
    });
}
```

---

## 6. 폴더 구조

```
Development_Process_Monitor/
├── build-progress.js          # 진행률 계산 스크립트
├── README.md                  # 이 문서
├── DEVELOPMENT_PROCESS_WORKFLOW.md  # 워크플로우 개요
├── DB_Method/                 # DB 관련 참조 파일
│   └── create_table.sql       # 테이블 생성 SQL
└── data/
    └── phase_progress.json    # 빌드 출력 (중간 산출물)

scripts/
└── upload-progress.js         # DB 업로드 스크립트

.git/hooks/
└── pre-commit                 # 자동 실행 hook
```

---

## 7. 환경 설정

### 필수 환경변수

**위치:** `P3_프로토타입_제작/Database/.env`

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 프로젝트 설정 파일 (선택)

**위치:** `.ssal-project.json`

```json
{
  "project_id": "SSALWORKS",
  "project_name": "SSAL Works"
}
```

---

## 8. 실행 방법

### 자동 실행 (권장)

```bash
git commit -m "작업 내용"
# pre-commit hook이 자동으로:
# 1. build-progress.js 실행
# 2. upload-progress.js 실행
```

### 수동 실행

```bash
# 진행률 계산
node Development_Process_Monitor/build-progress.js

# DB 업로드
node scripts/upload-progress.js
```

### 예상 출력

```
📊 Progress Builder - P0~S5 진행률 계산

=== P0~S0 (폴더/파일 기반) ===
✅ P0: 2/2 = 100%
✅ P1: 5/5 = 100%
...

=== S1~S5 (SAL Grid CSV 기반) ===
⏳ S1: 0/9 = 0%
...

✅ 저장 완료: Development_Process_Monitor/data/phase_progress.json

📤 Progress Uploader - DB 업로드 시작
✅ 환경변수 로드 완료
🆔 Project ID: SSALWORKS
📊 Phase 데이터: 10개
🔄 Supabase에 업로드 중...
📊 업로드 결과: 10/10 성공
✅ Progress 업로드 완료
```

---

## 9. 트러블슈팅

### 진행률이 표시되지 않음

1. **로그인 확인** - 로그인하지 않으면 0% 표시
2. **DB 데이터 확인**
   ```sql
   SELECT * FROM project_phase_progress WHERE project_id = 'SSALWORKS';
   ```
3. **브라우저 콘솔 확인** - `📊 DB에서 진행률 로드 완료` 메시지 확인

### DB 업로드 실패

1. **환경변수 확인** - `.env` 파일에 `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` 있는지
2. **테이블 존재 확인** - `project_phase_progress` 테이블 생성 여부
3. **네트워크 확인** - Supabase 연결 가능 여부

### CSV 파싱 오류 (S1~S5 진행률)

1. **CSV 경로 확인** - `S0_Project-SAL-Grid_생성/method/csv/data/in_progress/sal_grid.csv`
2. **CSV 형식 확인** - `stage`, `task_status` 컬럼 존재 여부
3. **CSV 파일 미존재 시** - S1~S5 진행률이 모두 0%로 표시됨 (정상 동작)

---

## 10. 테이블 생성 SQL

**위치:** `Development_Process_Monitor/DB_Method/create_table.sql`

```sql
CREATE TABLE IF NOT EXISTS project_phase_progress (
    id SERIAL PRIMARY KEY,
    project_id VARCHAR(100) NOT NULL,
    phase_code VARCHAR(10) NOT NULL,
    phase_name VARCHAR(100),
    progress INTEGER DEFAULT 0,
    completed_items INTEGER DEFAULT 0,
    total_items INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'pending',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(project_id, phase_code)
);

CREATE INDEX IF NOT EXISTS idx_phase_progress_project ON project_phase_progress(project_id);
CREATE INDEX IF NOT EXISTS idx_phase_progress_phase ON project_phase_progress(phase_code);
```

---

**작성일:** 2026-01-02
**버전:** 3.0 (DB Method)
