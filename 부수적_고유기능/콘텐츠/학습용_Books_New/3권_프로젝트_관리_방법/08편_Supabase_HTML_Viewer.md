# 8편 | Supabase + HTML Viewer

---

SAL Grid 데이터는 Supabase 데이터베이스에 저장된다. 이를 통해 여러 세션에서 데이터를 공유하고, 프로젝트 상태를 영속적으로 관리할 수 있다. 이 편에서는 Supabase 설정과 HTML Viewer 사용법을 살펴본다.

## 1. 왜 DB에 저장하는가

### AI 세션의 한계

AI 세션은 끊어지면 컨텍스트가 사라진다. Grid 데이터를 메모리에만 두면:

```
세션 1: Task 5개 완료
    ↓ (세션 종료)
세션 2: "어디까지 했더라?" → 처음부터 다시 파악 필요
```

### DB 저장의 장점

```
세션 1: Task 5개 완료 → DB에 저장
    ↓ (세션 종료)
세션 2: DB에서 읽기 → 즉시 현재 상태 파악
```

**장점 정리:**
- 세션 간 데이터 공유
- 프로젝트 상태 영속성
- 여러 사람/AI가 동시 접근 가능
- 진행 상황 시각화 (Viewer)

---

## 2. DB 테이블 구조

SAL Grid는 3개의 테이블을 사용한다.

### 2.1 테이블 목록

| 테이블명 | 용도 |
|----------|------|
| project_ssal_grid_tasks_template | 템플릿 Task (범용 예시) |
| ssalworks_tasks | 실전 Task (SSALWorks 프로젝트) |
| stage_verification | Stage Gate 검증 |

### 2.2 ssalworks_tasks 테이블

실제 프로젝트의 Task를 저장하는 핵심 테이블이다.

```sql
CREATE TABLE ssalworks_tasks (
    id UUID PRIMARY KEY,

    -- [1-4] Basic Info
    stage INTEGER NOT NULL,           -- 단계 (1~6)
    area VARCHAR(30) NOT NULL,        -- 영역 (M, F, BA 등)
    task_id VARCHAR(20) UNIQUE,       -- Task ID (S2BA1 등)
    task_name TEXT NOT NULL,          -- Task 이름

    -- [5-9] Task Definition
    task_instruction TEXT,            -- 작업 지침
    task_agent VARCHAR(100),          -- 수행 Agent
    tools TEXT,                       -- 사용 도구
    execution_type VARCHAR(20),       -- AI-Only, Human-AI 등
    dependencies TEXT,                -- 선행 Task

    -- [10-13] Task Execution
    task_progress INTEGER DEFAULT 0,  -- 진행률 (0~100)
    task_status VARCHAR(20),          -- Pending, In Progress, Completed
    generated_files TEXT,             -- 생성된 파일
    modification_history TEXT,        -- 수정 이력

    -- [14-15] Verification Definition
    verification_instruction TEXT,    -- 검증 지침
    verification_agent VARCHAR(100),  -- 검증 Agent

    -- [16-19] Verification Execution
    test JSONB,                       -- 테스트 결과
    build JSONB,                      -- 빌드 결과
    integration_verification JSONB,   -- 통합 검증
    blockers JSONB,                   -- 차단 요소

    -- [20-22] Verification Completion
    comprehensive_verification TEXT,  -- 종합 검증
    verification_status VARCHAR(20),  -- Not Verified, Passed, Failed
    remarks TEXT,                     -- 비고

    -- 시스템 필드
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
);
```

### 2.3 stage_verification 테이블

Stage Gate 검증 상태를 저장한다.

```sql
CREATE TABLE stage_verification (
    id UUID PRIMARY KEY,
    stage_name VARCHAR(50) NOT NULL,  -- 'S1', 'S2' 등
    project_id VARCHAR(50),           -- 'SSALWORKS'

    -- AI 자동 검증
    auto_verification_status VARCHAR(20),   -- Not Verified, Verified
    auto_verification_result TEXT,          -- 검증 결과 상세
    auto_verification_date TIMESTAMPTZ,

    -- PO 수동 검증
    manual_verification_status VARCHAR(20), -- Not Verified, Approved, Rejected
    manual_verification_comment TEXT,       -- PO 코멘트
    manual_verification_date TIMESTAMPTZ,

    -- Stage Gate 최종 상태
    stage_gate_status VARCHAR(20)           -- Not Started, AI Verified, Approved, Rejected
);
```

**stage_gate_status 값:**
- `Not Started`: 검증 시작 안 함
- `AI Verified`: AI 검증 완료, PO 승인 대기
- `Approved`: PO 승인 완료
- `Rejected`: PO 거부 (사유와 함께)

---

## 3. Supabase 설정

### 3.1 프로젝트 생성

1. https://supabase.com 접속
2. "New Project" 클릭
3. 프로젝트 정보 입력:
   - Name: 프로젝트 이름
   - Database Password: 강력한 비밀번호
   - Region: Northeast Asia (Seoul)

### 3.2 스키마 실행

Supabase SQL Editor에서 schema.sql 실행:

```
위치: S0_Project-SAL-Grid_생성/supabase/schema.sql
```

실행 순서:
1. schema.sql (테이블 생성)
2. seed_ssalworks_tasks.sql (초기 데이터)

### 3.3 API 키 확인

```
Project Settings → API

- Project URL: https://[프로젝트ID].supabase.co
- anon (public) key: eyJhbGci... (클라이언트용)
- service_role key: eyJhbGci... (서버용, 비공개)
```

---

## 4. 데이터 조회/수정

### 4.1 기본 조회

**모든 Task 조회:**
```sql
SELECT * FROM ssalworks_tasks ORDER BY stage, area, task_id;
```

**특정 Stage Task 조회:**
```sql
SELECT task_id, task_name, task_status, verification_status
FROM ssalworks_tasks
WHERE stage = 2
ORDER BY task_id;
```

**완료되지 않은 Task:**
```sql
SELECT task_id, task_name, task_status
FROM ssalworks_tasks
WHERE task_status != 'Completed'
ORDER BY stage, task_id;
```

### 4.2 상태 업데이트

**Task 상태 변경:**
```sql
UPDATE ssalworks_tasks
SET task_status = 'Completed',
    task_progress = 100,
    updated_at = NOW()
WHERE task_id = 'S2BA1';
```

**검증 결과 기록:**
```sql
UPDATE ssalworks_tasks
SET test = '{"unit_test": "✅ 5/5 통과", "integration_test": "✅ 3/3 통과"}'::jsonb,
    verification_status = 'Passed',
    updated_at = NOW()
WHERE task_id = 'S2BA1';
```

### 4.3 Stage Gate 상태 업데이트

**AI 검증 완료:**
```sql
UPDATE stage_verification
SET auto_verification_status = 'Verified',
    auto_verification_result = '모든 Task 검증 통과',
    auto_verification_date = NOW(),
    stage_gate_status = 'AI Verified'
WHERE stage_name = 'S2' AND project_id = 'SSALWORKS';
```

**PO 승인:**
```sql
UPDATE stage_verification
SET manual_verification_status = 'Approved',
    manual_verification_comment = '테스트 완료, 승인함',
    manual_verification_date = NOW(),
    stage_gate_status = 'Approved'
WHERE stage_name = 'S2' AND project_id = 'SSALWORKS';
```

---

## 5. HTML Viewer

### 5.1 Viewer란

HTML Viewer는 Grid 데이터를 웹 브라우저에서 시각적으로 보여주는 도구이다.

```
위치: S0_Project-SAL-Grid_생성/viewer/viewer.html
```

### 5.2 주요 기능

**1. Task 목록 조회**
- Stage별 필터링
- Area별 필터링
- 상태별 필터링 (Pending, In Progress, Completed)

**2. Task 상세 보기**
- 22개 속성 전체 확인
- 검증 결과 확인
- 의존성 확인

**3. 진행 상황 대시보드**
- Stage별 완료율
- 전체 진행률
- Blocker 현황

### 5.3 사용 방법

1. Supabase 연결 정보 설정 (URL, anon key)
2. 브라우저에서 viewer.html 열기
3. 데이터 자동 로드

### 5.4 필터링/검색

**Stage 필터:**
```
[S1] [S2] [S3] [S4] [S5] [전체]
```

**Status 필터:**
```
[Pending] [In Progress] [Completed] [전체]
```

**검색:**
```
Task ID 또는 Task Name으로 검색
```

---

## 6. 실전 활용 예시

### 6.1 새 세션 시작 시

```
1. Viewer에서 현재 상태 확인
2. 진행 중인 Task 파악
3. 다음 작업할 Task 결정
4. 작업 시작
```

### 6.2 Task 완료 시

```
1. 코드 작성 완료
2. DB 업데이트:
   - task_status = 'Completed'
   - task_progress = 100
   - generated_files = 파일 목록
3. Viewer에서 반영 확인
```

### 6.3 Stage Gate 시

```
1. Viewer에서 Stage 내 모든 Task 확인
2. 미완료 Task 있으면 완료
3. AI 검증 수행
4. stage_verification 테이블 업데이트
5. PO에게 테스트 요청
6. PO 승인 후 stage_gate_status = 'Approved'
```

---

## 7. RLS 정책

### Row Level Security

현재 개발 환경에서는 public 접근을 허용한다.

```sql
-- 읽기 허용
CREATE POLICY "Allow public read"
    ON ssalworks_tasks FOR SELECT TO public USING (true);

-- 쓰기 허용
CREATE POLICY "Allow public write"
    ON ssalworks_tasks FOR ALL TO public USING (true);
```

**프로덕션 배포 시 주의:**
- 인증된 사용자만 수정 가능하도록 변경
- anon 역할의 쓰기 권한 제한

---

## 8. 다음 단계

8편에서는 Supabase DB와 HTML Viewer를 살펴봤다.

- 3개 테이블: ssalworks_tasks, stage_verification, template
- Task 상태 및 검증 결과 저장
- Viewer로 시각적 확인

다음 편에서는 SAL Grid 매뉴얼을 효과적으로 활용하는 방법을 살펴본다.

---

*다음 편: 9편 | SAL Grid 매뉴얼 활용법*

---

**작성일: 2025-12-20 / 글자수: 약 4,500자 / 작성자: Claude / 프롬프터: 써니**
