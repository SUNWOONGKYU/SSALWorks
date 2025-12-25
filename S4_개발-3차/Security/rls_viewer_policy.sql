-- =============================================================================
-- S4S2: Viewer 접근 보안 RLS 정책
--
-- 목적: SAL Grid Viewer에 대한 접근 보안 구현
-- 작성일: 2025-12-25
-- =============================================================================

-- =============================================================================
-- 1. projects 테이블 RLS 정책
-- =============================================================================

-- RLS 활성화
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- 기존 정책 삭제 (있으면)
DROP POLICY IF EXISTS "projects_select_own" ON projects;
DROP POLICY IF EXISTS "projects_select_admin" ON projects;
DROP POLICY IF EXISTS "projects_insert_own" ON projects;
DROP POLICY IF EXISTS "projects_update_own" ON projects;
DROP POLICY IF EXISTS "projects_delete_own" ON projects;

-- SELECT: 자신의 프로젝트만 조회 가능
CREATE POLICY "projects_select_own" ON projects
    FOR SELECT
    USING (
        auth.uid() = user_id
        OR EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid()
            AND users.role = 'admin'
        )
    );

-- INSERT: 자신의 프로젝트만 생성 가능
CREATE POLICY "projects_insert_own" ON projects
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- UPDATE: 자신의 프로젝트만 수정 가능
CREATE POLICY "projects_update_own" ON projects
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- DELETE: 자신의 프로젝트만 삭제 가능
CREATE POLICY "projects_delete_own" ON projects
    FOR DELETE
    USING (auth.uid() = user_id);

-- =============================================================================
-- 2. project_sal_grid 테이블 RLS 정책
-- =============================================================================

-- RLS 활성화
ALTER TABLE project_sal_grid ENABLE ROW LEVEL SECURITY;

-- 기존 정책 삭제 (있으면)
DROP POLICY IF EXISTS "sal_grid_select_public" ON project_sal_grid;
DROP POLICY IF EXISTS "sal_grid_select_own" ON project_sal_grid;
DROP POLICY IF EXISTS "sal_grid_select_admin" ON project_sal_grid;
DROP POLICY IF EXISTS "sal_grid_modify_own" ON project_sal_grid;

-- SELECT (공개): SSALWORKS 예시 프로젝트는 모두 조회 가능
CREATE POLICY "sal_grid_select_public" ON project_sal_grid
    FOR SELECT
    USING (
        project_id IS NULL  -- 예시 프로젝트 (project_id 없음)
        OR project_id = 'SSALWORKS'  -- SSALWORKS 공개 예시
    );

-- SELECT (로그인 사용자): 자신의 프로젝트 조회
CREATE POLICY "sal_grid_select_own" ON project_sal_grid
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM projects
            WHERE projects.id::text = project_sal_grid.project_id
            AND projects.user_id = auth.uid()
        )
    );

-- SELECT (관리자): 모든 프로젝트 조회
CREATE POLICY "sal_grid_select_admin" ON project_sal_grid
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid()
            AND users.role = 'admin'
        )
    );

-- INSERT/UPDATE/DELETE: 자신의 프로젝트만 수정 가능
CREATE POLICY "sal_grid_modify_own" ON project_sal_grid
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM projects
            WHERE projects.id::text = project_sal_grid.project_id
            AND projects.user_id = auth.uid()
        )
        OR EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid()
            AND users.role = 'admin'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM projects
            WHERE projects.id::text = project_sal_grid.project_id
            AND projects.user_id = auth.uid()
        )
        OR EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid()
            AND users.role = 'admin'
        )
    );

-- =============================================================================
-- 3. 접근 제어 정책 요약
-- =============================================================================
--
-- | 사용자 유형     | 접근 가능 데이터              |
-- |----------------|------------------------------|
-- | 비로그인        | SSALWORKS 예시 프로젝트만      |
-- | 로그인 (일반)   | 자신의 프로젝트만              |
-- | 로그인 (관리자) | 모든 프로젝트                 |
--
-- =============================================================================
