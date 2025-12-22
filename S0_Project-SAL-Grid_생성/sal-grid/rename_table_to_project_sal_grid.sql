-- ============================================================
-- 테이블 이름 변경: ssalworks_tasks → project_sal_grid
-- 실행일: 2025-12-22
-- ============================================================

-- 1. 테이블 이름 변경
ALTER TABLE ssalworks_tasks RENAME TO project_sal_grid;

-- 2. 확인
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name = 'project_sal_grid';
