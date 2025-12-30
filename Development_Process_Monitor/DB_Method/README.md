# DB Method - 사용자별 진행률 표시

> 중앙 DB에 진행률을 저장하여 웹에서 사용자별 진행률을 표시하는 방식

---

## 문제

기존 방식의 문제점:
- 웹사이트(ssalworks.com)는 중앙 서버에서 실행
- 사용자 진행률 데이터는 사용자 PC에 있음
- 중앙 서버에서 사용자 PC 데이터를 가져올 수 없음
- 결과: 모든 사용자에게 SSAL Works의 진행률(100%)이 표시됨

---

## 해결책

**Push 방식**: 사용자 PC → DB → 웹

```
사용자 PC (git commit)
     ↓
build-progress.js (진행률 계산)
     ↓
upload-progress.js (DB 업로드)
     ↓
project_phase_progress 테이블
     ↓
웹사이트 loadProjectProgress() (DB 조회)
     ↓
사용자별 진행률 표시
```

---

## 진행률 계산 방식

| 단계 | 계산 방식 | 데이터 소스 |
|------|----------|------------|
| P0~S0 | 폴더/파일 존재 여부 | 로컬 폴더 구조 |
| S1~S5 | Task 완료율 | sal_grid.csv |

- P0~S0: 하위 폴더 중 파일이 있는 폴더 수 / 전체 하위 폴더 수
- S1~S5: Completed 상태 Task 수 / 전체 Task 수

---

## 파일 구성

```
DB_Method/
├── README.md                        ← 이 문서
├── create_table.sql                 ← 테이블 생성 SQL
├── upload-progress.js               ← DB 업로드 스크립트
├── pre-commit-hook-example.sh       ← pre-commit hook 예시
└── loadProjectProgress-snippet.js   ← index.html 함수 스니펫
```

---

## 설정 방법

### 1. 테이블 생성

Supabase Dashboard에서 `create_table.sql` 실행

### 2. 환경변수 설정

`.env` 파일에 추가:
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 3. upload-progress.js 배치

`scripts/upload-progress.js`에 복사

### 4. Pre-commit Hook 수정

`.git/hooks/pre-commit`에 추가:
```bash
# 진행률 빌드
node "$PROJECT_ROOT/Development_Process_Monitor/build-progress.js"
git add "$PROJECT_ROOT/Development_Process_Monitor/data/phase_progress.json" 2>/dev/null

# 진행률 DB 업로드
node "$PROJECT_ROOT/scripts/upload-progress.js"
```

### 5. index.html 수정

`loadProjectProgress` 함수를 `loadProjectProgress-snippet.js` 내용으로 교체

---

## Project ID 규칙

```
git config user.email = dev@example.com
                          ↓
project_id = dev_PROJECT
```

- 이메일 @ 앞 부분 + "_PROJECT"
- 동일 이메일 사용자는 동일 project_id

---

## DB 테이블 구조

```sql
project_phase_progress
├── id (SERIAL)
├── project_id (VARCHAR) -- dev_PROJECT
├── phase_code (VARCHAR) -- P0, P1, ..., S5
├── phase_name (VARCHAR) -- 단계명
├── progress (INTEGER)   -- 0~100
├── completed_items (INTEGER)
├── total_items (INTEGER)
├── status (VARCHAR)     -- pending, in_progress, completed
├── updated_at (TIMESTAMP)
└── created_at (TIMESTAMP)

UNIQUE(project_id, phase_code) -- UPSERT용
```

---

## 작동 확인

1. `git commit` 실행
2. 콘솔에서 "📤 Progress Uploader" 메시지 확인
3. Supabase에서 `project_phase_progress` 테이블 조회
4. 웹사이트 로그인 후 진행률 표시 확인

---

## 주의사항

- Supabase 설정 없으면 업로드 건너뛰기 (커밋은 진행)
- 로그인하지 않은 사용자는 0% 표시
- 데이터가 없는 사용자도 0% 표시
