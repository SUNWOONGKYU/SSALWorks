-- ================================================================
-- Project Phase Progress 테이블 생성
-- 작성일: 2025-12-23
-- 목적: P0~P3, S0~S5 진행률 저장 (배포 환경에서 사용)
-- Task: S4F7 (UX 개선)
-- ================================================================

-- 1. 테이블 생성
CREATE TABLE IF NOT EXISTS project_phase_progress (
    id SERIAL PRIMARY KEY,
    project_id VARCHAR(50) NOT NULL DEFAULT 'SSALWORKS',
    phase_code VARCHAR(10) NOT NULL,          -- P0, P1, P2, P3, S0, S1~S5
    phase_name VARCHAR(100) NOT NULL,         -- 작업 디렉토리 구조, 사업계획 등
    progress INTEGER NOT NULL DEFAULT 0,      -- 0~100
    completed_items INTEGER DEFAULT 0,        -- 완료된 항목 수
    total_items INTEGER DEFAULT 0,            -- 전체 항목 수
    status VARCHAR(20) DEFAULT 'Not Started', -- Not Started, In Progress, Completed
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(project_id, phase_code)
);

-- 2. 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_phase_progress_project ON project_phase_progress(project_id);
CREATE INDEX IF NOT EXISTS idx_phase_progress_code ON project_phase_progress(phase_code);

-- 3. 초기 데이터 삽입 (SSALWORKS 프로젝트)

-- P0: 작업 디렉토리 구조 생성 (완료)
INSERT INTO project_phase_progress (project_id, phase_code, phase_name, progress, completed_items, total_items, status)
VALUES ('SSALWORKS', 'P0', '작업 디렉토리 구조 생성', 100, 3, 3, 'Completed')
ON CONFLICT (project_id, phase_code) DO UPDATE SET
    progress = EXCLUDED.progress,
    completed_items = EXCLUDED.completed_items,
    total_items = EXCLUDED.total_items,
    status = EXCLUDED.status,
    updated_at = NOW();

-- P1: 사업계획 (완료)
INSERT INTO project_phase_progress (project_id, phase_code, phase_name, progress, completed_items, total_items, status)
VALUES ('SSALWORKS', 'P1', '사업계획', 100, 5, 5, 'Completed')
ON CONFLICT (project_id, phase_code) DO UPDATE SET
    progress = EXCLUDED.progress,
    completed_items = EXCLUDED.completed_items,
    total_items = EXCLUDED.total_items,
    status = EXCLUDED.status,
    updated_at = NOW();

-- P2: 프로젝트 기획 (완료)
INSERT INTO project_phase_progress (project_id, phase_code, phase_name, progress, completed_items, total_items, status)
VALUES ('SSALWORKS', 'P2', '프로젝트 기획', 100, 9, 9, 'Completed')
ON CONFLICT (project_id, phase_code) DO UPDATE SET
    progress = EXCLUDED.progress,
    completed_items = EXCLUDED.completed_items,
    total_items = EXCLUDED.total_items,
    status = EXCLUDED.status,
    updated_at = NOW();

-- P3: 프로토타입 제작 (완료)
INSERT INTO project_phase_progress (project_id, phase_code, phase_name, progress, completed_items, total_items, status)
VALUES ('SSALWORKS', 'P3', '프로토타입 제작', 100, 10, 10, 'Completed')
ON CONFLICT (project_id, phase_code) DO UPDATE SET
    progress = EXCLUDED.progress,
    completed_items = EXCLUDED.completed_items,
    total_items = EXCLUDED.total_items,
    status = EXCLUDED.status,
    updated_at = NOW();

-- S0: Project SAL Grid 생성 (완료)
INSERT INTO project_phase_progress (project_id, phase_code, phase_name, progress, completed_items, total_items, status)
VALUES ('SSALWORKS', 'S0', 'Project SAL Grid 생성', 100, 1, 1, 'Completed')
ON CONFLICT (project_id, phase_code) DO UPDATE SET
    progress = EXCLUDED.progress,
    completed_items = EXCLUDED.completed_items,
    total_items = EXCLUDED.total_items,
    status = EXCLUDED.status,
    updated_at = NOW();

-- S1: 개발 준비 (완료)
INSERT INTO project_phase_progress (project_id, phase_code, phase_name, progress, completed_items, total_items, status)
VALUES ('SSALWORKS', 'S1', '개발 준비', 100, 8, 8, 'Completed')
ON CONFLICT (project_id, phase_code) DO UPDATE SET
    progress = EXCLUDED.progress,
    completed_items = EXCLUDED.completed_items,
    total_items = EXCLUDED.total_items,
    status = EXCLUDED.status,
    updated_at = NOW();

-- S2: 개발 1차 (완료)
INSERT INTO project_phase_progress (project_id, phase_code, phase_name, progress, completed_items, total_items, status)
VALUES ('SSALWORKS', 'S2', '개발 1차', 100, 12, 12, 'Completed')
ON CONFLICT (project_id, phase_code) DO UPDATE SET
    progress = EXCLUDED.progress,
    completed_items = EXCLUDED.completed_items,
    total_items = EXCLUDED.total_items,
    status = EXCLUDED.status,
    updated_at = NOW();

-- S3: 개발 2차 (완료)
INSERT INTO project_phase_progress (project_id, phase_code, phase_name, progress, completed_items, total_items, status)
VALUES ('SSALWORKS', 'S3', '개발 2차', 100, 4, 4, 'Completed')
ON CONFLICT (project_id, phase_code) DO UPDATE SET
    progress = EXCLUDED.progress,
    completed_items = EXCLUDED.completed_items,
    total_items = EXCLUDED.total_items,
    status = EXCLUDED.status,
    updated_at = NOW();

-- S4: 개발 3차 (완료)
INSERT INTO project_phase_progress (project_id, phase_code, phase_name, progress, completed_items, total_items, status)
VALUES ('SSALWORKS', 'S4', '개발 3차', 100, 18, 18, 'Completed')
ON CONFLICT (project_id, phase_code) DO UPDATE SET
    progress = EXCLUDED.progress,
    completed_items = EXCLUDED.completed_items,
    total_items = EXCLUDED.total_items,
    status = EXCLUDED.status,
    updated_at = NOW();

-- S5: 개발 마무리 (완료)
INSERT INTO project_phase_progress (project_id, phase_code, phase_name, progress, completed_items, total_items, status)
VALUES ('SSALWORKS', 'S5', '개발 마무리', 100, 8, 8, 'Completed')
ON CONFLICT (project_id, phase_code) DO UPDATE SET
    progress = EXCLUDED.progress,
    completed_items = EXCLUDED.completed_items,
    total_items = EXCLUDED.total_items,
    status = EXCLUDED.status,
    updated_at = NOW();

-- 4. RLS 정책 (읽기 허용)
ALTER TABLE project_phase_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON project_phase_progress
    FOR SELECT USING (true);

CREATE POLICY "Allow authenticated update" ON project_phase_progress
    FOR UPDATE USING (auth.role() = 'authenticated');

-- 5. 확인 쿼리
-- SELECT phase_code, phase_name, progress, status FROM project_phase_progress ORDER BY phase_code;

-- ================================================================
-- 실행 방법:
--   1. Supabase Dashboard → SQL Editor
--   2. 이 파일 내용 붙여넣기
--   3. Run 클릭
-- ================================================================
