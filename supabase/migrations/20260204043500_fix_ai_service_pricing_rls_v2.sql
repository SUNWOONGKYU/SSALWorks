-- ai_service_pricing RLS 정책 수정 v2
-- 문제: anon 키로 UPDATE/DELETE 가능 (v1 적용 후에도 여전히 취약)
-- 원인: 정책이 authenticated만 대상으로 했고 anon에 대한 명시적 deny 없음
-- 해결: anon 역할에 대한 명시적 deny 정책 추가

-- 1. 기존 정책 모두 삭제 (깔끔하게 다시 시작)
DROP POLICY IF EXISTS "ai_service_pricing_select_public" ON ai_service_pricing;
DROP POLICY IF EXISTS "ai_service_pricing_insert_deny" ON ai_service_pricing;
DROP POLICY IF EXISTS "ai_service_pricing_update_deny" ON ai_service_pricing;
DROP POLICY IF EXISTS "ai_service_pricing_delete_deny" ON ai_service_pricing;

-- 2. RLS 확실히 활성화
ALTER TABLE ai_service_pricing ENABLE ROW LEVEL SECURITY;

-- 3. SELECT: 모든 사용자 허용 (가격 정보는 공개)
CREATE POLICY "ai_service_pricing_select_public"
ON ai_service_pricing FOR SELECT
TO anon, authenticated
USING (true);

-- 4. INSERT: anon과 authenticated 모두 차단
CREATE POLICY "ai_service_pricing_insert_deny_anon"
ON ai_service_pricing FOR INSERT
TO anon
WITH CHECK (false);

CREATE POLICY "ai_service_pricing_insert_deny_auth"
ON ai_service_pricing FOR INSERT
TO authenticated
WITH CHECK (false);

-- 5. UPDATE: anon과 authenticated 모두 차단
CREATE POLICY "ai_service_pricing_update_deny_anon"
ON ai_service_pricing FOR UPDATE
TO anon
USING (false)
WITH CHECK (false);

CREATE POLICY "ai_service_pricing_update_deny_auth"
ON ai_service_pricing FOR UPDATE
TO authenticated
USING (false)
WITH CHECK (false);

-- 6. DELETE: anon과 authenticated 모두 차단
CREATE POLICY "ai_service_pricing_delete_deny_anon"
ON ai_service_pricing FOR DELETE
TO anon
USING (false);

CREATE POLICY "ai_service_pricing_delete_deny_auth"
ON ai_service_pricing FOR DELETE
TO authenticated
USING (false);
