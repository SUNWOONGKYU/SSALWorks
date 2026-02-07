-- ai_service_pricing의 개발용 ALLOW-ALL 정책 삭제
-- 이 정책들이 TO public USING(true)로 모든 접근을 허용하여 RLS가 무효화됨
DROP POLICY IF EXISTS "ai_pricing_select_dev" ON ai_service_pricing;
DROP POLICY IF EXISTS "ai_pricing_insert_dev" ON ai_service_pricing;
DROP POLICY IF EXISTS "ai_pricing_update_dev" ON ai_service_pricing;
DROP POLICY IF EXISTS "ai_pricing_delete_dev" ON ai_service_pricing;

-- 불필요한 중복 deny 정책도 정리 (anon/auth 분리 → 단일 정책으로)
DROP POLICY IF EXISTS "ai_service_pricing_insert_deny_anon" ON ai_service_pricing;
DROP POLICY IF EXISTS "ai_service_pricing_insert_deny_auth" ON ai_service_pricing;
DROP POLICY IF EXISTS "ai_service_pricing_update_deny_anon" ON ai_service_pricing;
DROP POLICY IF EXISTS "ai_service_pricing_update_deny_auth" ON ai_service_pricing;
DROP POLICY IF EXISTS "ai_service_pricing_delete_deny_anon" ON ai_service_pricing;
DROP POLICY IF EXISTS "ai_service_pricing_delete_deny_auth" ON ai_service_pricing;
DROP POLICY IF EXISTS "ai_service_pricing_select_public" ON ai_service_pricing;

-- 깔끔한 최종 정책 (3개만)
-- SELECT: 가격 정보 공개 조회
CREATE POLICY "ai_service_pricing_select"
ON ai_service_pricing FOR SELECT
TO anon, authenticated
USING (true);

-- INSERT/UPDATE/DELETE: 정책 없음 = 기본 DENY
-- service_role은 RLS를 bypass하므로 관리자만 CUD 가능
-- FORCE ROW LEVEL SECURITY는 불필요 (service_role은 bypass 유지)
ALTER TABLE ai_service_pricing NO FORCE ROW LEVEL SECURITY;
