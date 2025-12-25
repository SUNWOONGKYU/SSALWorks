-- admin_settings 테이블에 notify_installation_request 컬럼 추가
-- 실행 위치: Supabase Dashboard > SQL Editor

ALTER TABLE admin_settings
ADD COLUMN IF NOT EXISTS notify_installation_request BOOLEAN DEFAULT true;

-- 기존 레코드에 기본값 설정
UPDATE admin_settings
SET notify_installation_request = true
WHERE notify_installation_request IS NULL;

-- 확인
SELECT * FROM admin_settings;
