-- ================================================================
-- S2BI3: 이메일 도메인 인증 (Resend) - INSERT
-- Generated: 2025-12-15
-- ================================================================

INSERT INTO ssalworks_tasks (
  stage, area, task_id, task_name,
  task_instruction, task_agent, tools, execution_type, dependencies,
  task_progress, task_status, generated_files, modification_history,
  verification_instruction, verification_agent,
  test, build, integration_verification, blockers,
  comprehensive_verification, verification_status, remarks
) VALUES (
  2, 'BI', 'S2BI3', '이메일 도메인 인증 (Resend)',
  'task-instructions/S2BI3_instruction.md',
  'devops-troubleshooter',
  'Write, Read, Bash, WebFetch',
  'Human-AI',
  'S2BI1',
  0,
  'Pending',
  NULL,
  NULL,
  'verification-instructions/S2BI3_verification.md',
  'devops-troubleshooter',
  NULL, NULL, NULL, NULL,
  NULL,
  'Not Verified',
  'Whois DNS 고급설정으로 SPF/DKIM 레코드 추가, ssalworks.ai.kr 도메인 인증'
);

-- ================================================================
-- 실행 방법:
--   1. Supabase SQL Editor에서 실행
--   또는
--   2. psql로 직접 실행
-- ================================================================
