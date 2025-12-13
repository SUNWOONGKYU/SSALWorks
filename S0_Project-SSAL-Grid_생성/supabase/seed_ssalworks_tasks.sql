-- ================================================================
-- SSALWorks v1.0 Task Data Insert
-- 42 Tasks with 22 Attributes
-- Generated: 2025-12-13
-- ================================================================
--
-- 실행 순서:
--   1. 먼저 schema.sql 실행 (테이블 생성)
--   2. 이 파일 실행 (데이터 삽입)
--
-- 주의: stage는 INTEGER (1-5)
--   S1 → 1, S2 → 2, S3 → 3, S4 → 4, S5 → 5
-- ================================================================

-- 기존 데이터 삭제 (선택)
-- DELETE FROM ssalworks_tasks;

-- ============================================
-- STAGE 1: 기반 구축 (8 Tasks)
-- ============================================

INSERT INTO ssalworks_tasks (
  stage, area, task_id, task_name,
  task_instruction, task_agent, tools, execution_type, dependencies,
  task_progress, task_status, generated_files, modification_history,
  verification_instruction, verification_agent,
  test, build, integration_verification, blockers,
  comprehensive_verification, verification_status, remarks
) VALUES
-- S1M1: 요구사항 검토
(
  1, 'M', 'S1M1', '요구사항 검토',
  'task-instructions/S1M1_instruction.md', 'code-reviewer', 'Read, Write', 'AI-Only', NULL,
  0, 'Pending', NULL, NULL,
  'verification-instructions/S1M1_verification.md', 'code-reviewer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', 'MVP 요구사항 정의'
),

-- S1F1: 랜딩페이지 시안
(
  1, 'F', 'S1F1', '랜딩페이지 시안',
  'task-instructions/S1F1_instruction.md', 'frontend-developer', 'Write, Read', 'AI-Only', NULL,
  0, 'Pending', NULL, NULL,
  'verification-instructions/S1F1_verification.md', 'frontend-developer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', '반응형 디자인 필수'
),

-- S1F2: 로그인/회원가입 UI
(
  1, 'F', 'S1F2', '로그인/회원가입 UI',
  'task-instructions/S1F2_instruction.md', 'frontend-developer', 'Write, Read', 'AI-Only', 'S1F1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S1F2_verification.md', 'frontend-developer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', 'Google OAuth 버튼 포함'
),

-- S1BI1: Supabase 클라이언트 설정
(
  1, 'BI', 'S1BI1', 'Supabase 클라이언트 설정',
  'task-instructions/S1BI1_instruction.md', 'backend-developer', 'Write, Read, Bash', 'AI-Only', 'S1F1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S1BI1_verification.md', 'backend-developer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', '환경 변수 사용 필수'
),

-- S1D1: DB 스키마 확정
(
  1, 'D', 'S1D1', 'DB 스키마 확정',
  'task-instructions/S1D1_instruction.md', 'database-developer', 'Write, Read', 'AI-Only', NULL,
  0, 'Pending', NULL, NULL,
  'verification-instructions/S1D1_verification.md', 'database-developer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', 'RLS 정책 포함'
),

-- S1S1: 보안 정책 문서
(
  1, 'S', 'S1S1', '보안 정책 문서',
  'task-instructions/S1S1_instruction.md', 'code-reviewer', 'Write, Read', 'AI-Only', 'S1BI1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S1S1_verification.md', 'code-reviewer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', 'OWASP Top 10 참고'
),

-- S1T1: 테스트 전략 문서
(
  1, 'T', 'S1T1', '테스트 전략 문서',
  'task-instructions/S1T1_instruction.md', 'test-engineer', 'Write, Read', 'AI-Only', NULL,
  0, 'Pending', NULL, NULL,
  'verification-instructions/S1T1_verification.md', 'test-engineer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', 'Jest + Playwright'
),

-- S1O1: Vercel 프로젝트 설정
(
  1, 'O', 'S1O1', 'Vercel 프로젝트 설정',
  'task-instructions/S1O1_instruction.md', 'devops-troubleshooter', 'Bash', 'Human-Assisted', NULL,
  0, 'Pending', NULL, NULL,
  'verification-instructions/S1O1_verification.md', 'devops-troubleshooter',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', 'GitHub 연동 필수'
),

-- ============================================
-- STAGE 2: 핵심 기능 (12 Tasks)
-- ============================================

-- S2M1: 기능 명세서
(
  2, 'M', 'S2M1', '기능 명세서',
  'task-instructions/S2M1_instruction.md', 'code-reviewer', 'Write, Read', 'AI-Only', 'S1M1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S2M1_verification.md', 'code-reviewer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', 'API 명세 포함'
),

-- S2F1: 마이페이지 UI
(
  2, 'F', 'S2F1', '마이페이지 UI',
  'task-instructions/S2F1_instruction.md', 'frontend-developer', 'Write, Read', 'AI-Only', 'S1F2',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S2F1_verification.md', 'frontend-developer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', '구독/사용량 표시'
),

-- S2F2: 구독 플랜 페이지
(
  2, 'F', 'S2F2', '구독 플랜 페이지',
  'task-instructions/S2F2_instruction.md', 'frontend-developer', 'Write, Read', 'AI-Only', 'S1F1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S2F2_verification.md', 'frontend-developer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', 'Free/Basic/Premium 3가지'
),

-- S2BI1: 인증 클라이언트 모듈
(
  2, 'BI', 'S2BI1', '인증 클라이언트 모듈',
  'task-instructions/S2BI1_instruction.md', 'backend-developer', 'Write, Read', 'AI-Only', 'S1BI1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S2BI1_verification.md', 'backend-developer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', 'Supabase Auth 사용'
),

-- S2BI2: 구독 클라이언트 모듈
(
  2, 'BI', 'S2BI2', '구독 클라이언트 모듈',
  'task-instructions/S2BI2_instruction.md', 'backend-developer', 'Write, Read', 'AI-Only', 'S2BI1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S2BI2_verification.md', 'backend-developer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', '권한 체크 함수'
),

-- S2BA1: Google OAuth Serverless API
(
  2, 'BA', 'S2BA1', 'Google OAuth Serverless API',
  'task-instructions/S2BA1_instruction.md', 'backend-developer', 'Write, Read, Bash', 'AI-Only', 'S1S1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S2BA1_verification.md', 'backend-developer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', 'Vercel Serverless'
),

-- S2BA2: 이메일 발송 API
(
  2, 'BA', 'S2BA2', '이메일 발송 API',
  'task-instructions/S2BA2_instruction.md', 'backend-developer', 'Write, Read, Bash', 'AI-Only', 'S2BA1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S2BA2_verification.md', 'backend-developer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', 'Resend API 사용'
),

-- S2BA3: 구독 관리 API
(
  2, 'BA', 'S2BA3', '구독 관리 API',
  'task-instructions/S2BA3_instruction.md', 'backend-developer', 'Write, Read, Bash', 'AI-Only', 'S1D1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S2BA3_verification.md', 'backend-developer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', 'CRUD API'
),

-- S2D1: 인덱스 최적화
(
  2, 'D', 'S2D1', '인덱스 최적화',
  'task-instructions/S2D1_instruction.md', 'database-developer', 'Write, Read', 'AI-Only', 'S1D1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S2D1_verification.md', 'database-developer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', '쿼리 성능 향상'
),

-- S2S1: 인증 미들웨어
(
  2, 'S', 'S2S1', '인증 미들웨어',
  'task-instructions/S2S1_instruction.md', 'backend-developer', 'Write, Read', 'AI-Only', 'S2BA1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S2S1_verification.md', 'backend-developer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', 'JWT 검증'
),

-- S2T1: 인증 API 테스트
(
  2, 'T', 'S2T1', '인증 API 테스트',
  'task-instructions/S2T1_instruction.md', 'test-engineer', 'Write, Read, Bash', 'AI-Only', 'S2BA1, S2BA2',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S2T1_verification.md', 'test-engineer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', 'Jest 테스트'
),

-- S2C1: Books 콘텐츠 업로드
(
  2, 'C', 'S2C1', 'Books 콘텐츠 업로드',
  'task-instructions/S2C1_instruction.md', 'database-developer', 'Read, Write, Glob', 'AI-Only', 'S1D1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S2C1_verification.md', 'database-developer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', 'MD 파일 메타데이터'
),

-- ============================================
-- STAGE 3: AI 기능 (4 Tasks)
-- ============================================

-- S3BI1: AI API 클라이언트 통합
(
  3, 'BI', 'S3BI1', 'AI API 클라이언트 통합',
  'task-instructions/S3BI1_instruction.md', 'backend-developer', 'Write, Read, Bash', 'AI-Only', 'S2BA3, S2S1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S3BI1_verification.md', 'backend-developer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', 'Anthropic Claude API'
),

-- S3BA1: AI Q&A API
(
  3, 'BA', 'S3BA1', 'AI Q&A API',
  'task-instructions/S3BA1_instruction.md', 'backend-developer', 'Write, Read, Bash', 'AI-Only', 'S3BI1, S2C1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S3BA1_verification.md', 'backend-developer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', '학습 콘텐츠 기반'
),

-- S3S1: 구독 권한 체크
(
  3, 'S', 'S3S1', '구독 권한 체크',
  'task-instructions/S3S1_instruction.md', 'backend-developer', 'Write, Read', 'AI-Only', 'S2BA3, S2S1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S3S1_verification.md', 'backend-developer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', '기능별 권한 매핑'
),

-- S3E1: AI API 키 설정
(
  3, 'E', 'S3E1', 'AI API 키 설정',
  'task-instructions/S3E1_instruction.md', 'devops-troubleshooter', 'Bash, Write', 'Human-Assisted', 'S1O1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S3E1_verification.md', 'devops-troubleshooter',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', 'Anthropic API Key'
),

-- ============================================
-- STAGE 4: 결제 연동 (10 Tasks)
-- ============================================

-- S4M1: MVP 최종 검토
(
  4, 'M', 'S4M1', 'MVP 최종 검토',
  'task-instructions/S4M1_instruction.md', 'code-reviewer', 'Read', 'Human-Assisted', 'S3BA1, S3S1, S3E1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S4M1_verification.md', 'code-reviewer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', '결제 연동 전 점검'
),

-- S4F1: 결제 UI
(
  4, 'F', 'S4F1', '결제 UI',
  'task-instructions/S4F1_instruction.md', 'frontend-developer', 'Write, Read', 'AI-Only', 'S2F2, S4M1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S4F1_verification.md', 'frontend-developer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', '토스 위젯 연동'
),

-- S4F2: 결제 완료 페이지
(
  4, 'F', 'S4F2', '결제 완료 페이지',
  'task-instructions/S4F2_instruction.md', 'frontend-developer', 'Write, Read', 'AI-Only', 'S4F1, S3BA1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S4F2_verification.md', 'frontend-developer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', '성공/실패 페이지'
),

-- S4BI1: 결제 클라이언트 SDK
(
  4, 'BI', 'S4BI1', '결제 클라이언트 SDK',
  'task-instructions/S4BI1_instruction.md', 'frontend-developer', 'Write, Read', 'AI-Only', 'S4F1, S4O1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S4BI1_verification.md', 'frontend-developer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', '토스 SDK 래퍼'
),

-- S4BA1: 결제 API
(
  4, 'BA', 'S4BA1', '결제 API',
  'task-instructions/S4BA1_instruction.md', 'backend-developer', 'Write, Read, Bash', 'AI-Only', 'S4BI1, S2BA3',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S4BA1_verification.md', 'backend-developer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', '토스 API 연동'
),

-- S4BA2: 웹훅 핸들러
(
  4, 'BA', 'S4BA2', '웹훅 핸들러',
  'task-instructions/S4BA2_instruction.md', 'backend-developer', 'Write, Read, Bash', 'AI-Only', 'S4BA1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S4BA2_verification.md', 'backend-developer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', '결제 상태 동기화'
),

-- S4S1: 결제 보안
(
  4, 'S', 'S4S1', '결제 보안',
  'task-instructions/S4S1_instruction.md', 'backend-developer', 'Write, Read', 'AI-Only', 'S4BA1, S4BA2',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S4S1_verification.md', 'backend-developer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', '금액 검증, Rate Limit'
),

-- S4T1: 결제 테스트
(
  4, 'T', 'S4T1', '결제 테스트',
  'task-instructions/S4T1_instruction.md', 'test-engineer', 'Write, Read, Bash', 'AI-Only', 'S4BA1, S4BA2, S4S1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S4T1_verification.md', 'test-engineer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', '단위/통합 테스트'
),

-- S4T2: E2E 결제 테스트
(
  4, 'T', 'S4T2', 'E2E 결제 테스트',
  'task-instructions/S4T2_instruction.md', 'test-engineer', 'Write, Read, Bash', 'AI-Only', 'S4T1, S4F2',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S4T2_verification.md', 'test-engineer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', 'Playwright E2E'
),

-- S4O1: PG사 설정
(
  4, 'O', 'S4O1', 'PG사 설정',
  'task-instructions/S4O1_instruction.md', 'devops-troubleshooter', 'Bash', 'Human-Assisted', 'S4M1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S4O1_verification.md', 'devops-troubleshooter',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', '토스 페이먼트 가맹점'
),

-- ============================================
-- STAGE 5: 배포 및 운영 (8 Tasks)
-- ============================================

-- S5M1: 출시 체크리스트
(
  5, 'M', 'S5M1', '출시 체크리스트',
  'task-instructions/S5M1_instruction.md', 'code-reviewer', 'Read', 'Human-Assisted', 'S4T2, S4O1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S5M1_verification.md', 'code-reviewer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', '최종 출시 준비'
),

-- S5F1: 랜딩페이지 최적화
(
  5, 'F', 'S5F1', '랜딩페이지 최적화',
  'task-instructions/S5F1_instruction.md', 'frontend-developer', 'Write, Read, Bash', 'AI-Only', 'S1F1, S5M1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S5F1_verification.md', 'frontend-developer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', 'SEO, Performance'
),

-- S5BA1: 모니터링 API
(
  5, 'BA', 'S5BA1', '모니터링 API',
  'task-instructions/S5BA1_instruction.md', 'backend-developer', 'Write, Read', 'AI-Only', 'S5M1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S5BA1_verification.md', 'backend-developer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', 'Health Check API'
),

-- S5D1: 백업 설정
(
  5, 'D', 'S5D1', '백업 설정',
  'task-instructions/S5D1_instruction.md', 'devops-troubleshooter', 'Write, Read, Bash', 'Human-Assisted', 'S1D1, S5M1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S5D1_verification.md', 'devops-troubleshooter',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', 'Supabase 백업'
),

-- S5S1: SSL/보안 설정
(
  5, 'S', 'S5S1', 'SSL/보안 설정',
  'task-instructions/S5S1_instruction.md', 'devops-troubleshooter', 'Write, Read, Bash', 'AI-Only', 'S5O1, S5M1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S5S1_verification.md', 'devops-troubleshooter',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', '보안 헤더 설정'
),

-- S5O1: 도메인 연결
(
  5, 'O', 'S5O1', '도메인 연결',
  'task-instructions/S5O1_instruction.md', 'devops-troubleshooter', 'Bash', 'Human-Assisted', 'S5M1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S5O1_verification.md', 'devops-troubleshooter',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', '커스텀 도메인'
),

-- S5O2: Vercel 프로덕션 배포
(
  5, 'O', 'S5O2', 'Vercel 프로덕션 배포',
  'task-instructions/S5O2_instruction.md', 'devops-troubleshooter', 'Bash', 'Human-Assisted', 'S5O1, S5S1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S5O2_verification.md', 'devops-troubleshooter',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', '최종 배포'
),

-- S5O3: 모니터링 설정
(
  5, 'O', 'S5O3', '모니터링 설정',
  'task-instructions/S5O3_instruction.md', 'devops-troubleshooter', 'Write, Read, Bash', 'Human-Assisted', 'S5O2',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S5O3_verification.md', 'devops-troubleshooter',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', 'Vercel Analytics'
);

-- ============================================
-- Verification: Check inserted data
-- ============================================

-- 전체 개수 확인
-- SELECT COUNT(*) as total_tasks FROM ssalworks_tasks;
-- 결과: 42

-- Stage별 개수 확인
-- SELECT stage, COUNT(*) FROM ssalworks_tasks GROUP BY stage ORDER BY stage;
-- 결과: 1=8, 2=12, 3=4, 4=10, 5=8

-- Area별 개수 확인
-- SELECT area, COUNT(*) FROM ssalworks_tasks GROUP BY area ORDER BY area;
