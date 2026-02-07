-- ai_service_pricing RLS 정책 수정
-- 문제: anon 키로 UPDATE/DELETE 가능 (보안 취약점)
-- 해결: RLS 활성화 + SELECT만 public 허용, CUD는 service_role만

-- 1. RLS 활성화
ALTER TABLE ai_service_pricing ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_service_pricing FORCE ROW LEVEL SECURITY;

-- 2. 기존 정책 모두 삭제
DROP POLICY IF EXISTS "Authenticated users can read pricing" ON ai_service_pricing;
DROP POLICY IF EXISTS "Only admins can modify pricing" ON ai_service_pricing;
DROP POLICY IF EXISTS "ai_service_pricing_select_all" ON ai_service_pricing;
DROP POLICY IF EXISTS "ai_service_pricing_select_public" ON ai_service_pricing;
DROP POLICY IF EXISTS "ai_service_pricing_insert_admin" ON ai_service_pricing;
DROP POLICY IF EXISTS "ai_service_pricing_update_admin" ON ai_service_pricing;
DROP POLICY IF EXISTS "ai_service_pricing_delete_admin" ON ai_service_pricing;
DROP POLICY IF EXISTS "ai_service_pricing_insert_deny" ON ai_service_pricing;
DROP POLICY IF EXISTS "ai_service_pricing_update_deny" ON ai_service_pricing;
DROP POLICY IF EXISTS "ai_service_pricing_delete_deny" ON ai_service_pricing;

-- 3. SELECT: 모든 사용자 허용 (가격 정보는 공개 데이터)
CREATE POLICY "ai_service_pricing_select_public"
ON ai_service_pricing FOR SELECT
TO public
USING (true);

-- 4. INSERT: authenticated 사용자 차단 (service_role만 가능)
CREATE POLICY "ai_service_pricing_insert_deny"
ON ai_service_pricing FOR INSERT
TO authenticated
WITH CHECK (false);

-- 5. UPDATE: authenticated 사용자 차단 (service_role만 가능)
CREATE POLICY "ai_service_pricing_update_deny"
ON ai_service_pricing FOR UPDATE
TO authenticated
USING (false)
WITH CHECK (false);

-- 6. DELETE: authenticated 사용자 차단 (service_role만 가능)
CREATE POLICY "ai_service_pricing_delete_deny"
ON ai_service_pricing FOR DELETE
TO authenticated
USING (false);
