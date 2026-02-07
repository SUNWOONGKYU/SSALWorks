-- RLS 상태 확인용 함수 생성
CREATE OR REPLACE FUNCTION public.check_rls_status()
RETURNS TABLE(table_name text, rls_enabled boolean, rls_forced boolean, policy_count bigint)
LANGUAGE sql SECURITY DEFINER
AS $$
  SELECT
    c.relname::text as table_name,
    c.relrowsecurity as rls_enabled,
    c.relforcerowsecurity as rls_forced,
    (SELECT count(*) FROM pg_policies p WHERE p.tablename = c.relname) as policy_count
  FROM pg_class c
  JOIN pg_namespace n ON c.relnamespace = n.oid
  WHERE n.nspname = 'public'
  AND c.relkind = 'r'
  AND c.relname IN ('ai_service_pricing', 'project_sal_grid', 'learning_contents', 'faqs', 'content_embeddings', 'users', 'projects')
  ORDER BY c.relname;
$$;

-- RLS 정책 상세 확인용 함수
CREATE OR REPLACE FUNCTION public.check_rls_policies(p_table text)
RETURNS TABLE(policy_name text, cmd text, roles text[], permissive text, qual text, with_check text)
LANGUAGE sql SECURITY DEFINER
AS $$
  SELECT
    policyname::text,
    cmd::text,
    roles::text[],
    permissive::text,
    qual::text,
    with_check::text
  FROM pg_policies
  WHERE tablename = p_table;
$$;
