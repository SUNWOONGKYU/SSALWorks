-- ================================================================
-- Stage Verification 테이블 수정 및 초기 데이터 삽입
-- 작성일: 2025-12-13
-- 목적: viewer.html과 스키마 불일치 해결 + Stage 1~5 초기 레코드 생성
-- ================================================================

-- ================================================================
-- 1. 누락된 컬럼 추가 (ALTER TABLE)
-- ================================================================

-- AI 검증 관련 필드
ALTER TABLE stage_verification
ADD COLUMN IF NOT EXISTS ai_verification_note TEXT;

ALTER TABLE stage_verification
ADD COLUMN IF NOT EXISTS verification_report_path TEXT;

ALTER TABLE stage_verification
ADD COLUMN IF NOT EXISTS ai_verification_date TIMESTAMPTZ;

-- Project Owner 승인 관련 필드
ALTER TABLE stage_verification
ADD COLUMN IF NOT EXISTS po_approval_status VARCHAR(20);

ALTER TABLE stage_verification
ADD COLUMN IF NOT EXISTS po_approval_note TEXT;

ALTER TABLE stage_verification
ADD COLUMN IF NOT EXISTS po_approval_user VARCHAR(100);

ALTER TABLE stage_verification
ADD COLUMN IF NOT EXISTS po_approval_date TIMESTAMPTZ;

-- ================================================================
-- 2. Stage 1~5 초기 레코드 삽입 (존재하지 않으면 INSERT)
-- ================================================================

-- Stage 1
INSERT INTO stage_verification (stage_name, project_id, stage_gate_status)
SELECT 'Stage 1', 'SSALWORKS', 'Not Started'
WHERE NOT EXISTS (SELECT 1 FROM stage_verification WHERE stage_name = 'Stage 1');

-- Stage 2
INSERT INTO stage_verification (stage_name, project_id, stage_gate_status)
SELECT 'Stage 2', 'SSALWORKS', 'Not Started'
WHERE NOT EXISTS (SELECT 1 FROM stage_verification WHERE stage_name = 'Stage 2');

-- Stage 3
INSERT INTO stage_verification (stage_name, project_id, stage_gate_status)
SELECT 'Stage 3', 'SSALWORKS', 'Not Started'
WHERE NOT EXISTS (SELECT 1 FROM stage_verification WHERE stage_name = 'Stage 3');

-- Stage 4
INSERT INTO stage_verification (stage_name, project_id, stage_gate_status)
SELECT 'Stage 4', 'SSALWORKS', 'Not Started'
WHERE NOT EXISTS (SELECT 1 FROM stage_verification WHERE stage_name = 'Stage 4');

-- Stage 5
INSERT INTO stage_verification (stage_name, project_id, stage_gate_status)
SELECT 'Stage 5', 'SSALWORKS', 'Not Started'
WHERE NOT EXISTS (SELECT 1 FROM stage_verification WHERE stage_name = 'Stage 5');

-- ================================================================
-- 4. 확인용 쿼리
-- ================================================================

-- 테이블 구조 확인
-- SELECT column_name, data_type FROM information_schema.columns
-- WHERE table_name = 'stage_verification' ORDER BY ordinal_position;

-- 데이터 확인
-- SELECT stage_name, stage_gate_status, ai_verification_note, po_approval_status
-- FROM stage_verification ORDER BY stage_name;

-- ================================================================
-- 완료!
--
-- 실행 방법:
--   1. Supabase Dashboard → SQL Editor
--   2. 이 파일 내용 붙여넣기
--   3. Run 클릭
--
-- 실행 후:
--   - Stage 1~5 레코드 생성됨
--   - AI 검증 의견, 리포트 경로 저장 가능
--   - PO 승인 정보 저장 가능
-- ================================================================
