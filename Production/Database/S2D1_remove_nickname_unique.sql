-- =====================================================
-- 닉네임 UNIQUE 제약 제거
-- =====================================================
-- 작성일: 2025-12-22
-- 목적: 한 사람이 여러 계정을 가질 수 있으므로 닉네임 중복 허용
-- =====================================================

-- 1. 닉네임 UNIQUE 인덱스 삭제
DROP INDEX IF EXISTS users_nickname_key;
DROP INDEX IF EXISTS idx_users_nickname;

-- 2. 닉네임 컬럼 재생성 (UNIQUE 없이)
-- 기존 데이터 보존하면서 제약 제거
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_nickname_key;

-- 3. 일반 인덱스로 재생성 (검색 성능용, UNIQUE 아님)
CREATE INDEX IF NOT EXISTS idx_users_nickname ON users(nickname);

-- =====================================================
-- 완료 확인
-- =====================================================
SELECT 'nickname UNIQUE 제약 제거 완료!' as status;
