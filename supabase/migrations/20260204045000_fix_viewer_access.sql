-- viewer_database.html이 anon 키로 project_sal_grid를 조회함
-- 현재 SELECT 정책이 authenticated만 허용 → viewer가 빈 화면
-- anon SELECT 정책 추가하여 viewer 복구

-- project_sal_grid: anon SELECT 허용 (읽기 전용, viewer용)
CREATE POLICY "anon_select_project_sal_grid"
ON project_sal_grid FOR SELECT
TO anon
USING (true);
