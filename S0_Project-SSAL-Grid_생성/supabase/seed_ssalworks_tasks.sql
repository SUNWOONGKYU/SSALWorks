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
--
-- ⚠️ 🚨 AI 필수 준수 규칙 (이 파일 수정 시 반드시 확인!) 🚨 ⚠️
--
-- 📌 Stage 명칭 (정확히 사용):
--   S1: 개발 준비 (Development Setup) ❌ 기반 구축 금지
--   S2: 개발 1차 (Core Development)   ❌ 핵심 기능 금지
--   S3: 개발 2차 (Advanced Features)  ❌ AI 기능 금지
--   S4: 개발 3차 (QA & Optimization)  ❌ 결제 연동 금지
--   S5: 운영 (Operations)             ❌ 배포 운영 금지
--
-- 📌 Area 명칭 (정확히 사용):
--   M: Documentation (문서화)          ❌ Management 금지
--   U: Design (UI/UX 디자인)
--   F: Frontend (프론트엔드)
--   BI: Backend Infrastructure (백엔드 기반)
--   BA: Backend APIs (백엔드 API)
--   D: Database (데이터베이스)
--   S: Security (보안/인증/인가)
--   T: Testing (테스트)
--   O: DevOps (운영/배포)
--   E: External (외부 연동)
--   C: Content System (콘텐츠 시스템)
--
-- 📌 Task Agent (작업자) - Area별 적합한 Agent:
--   M → documentation-specialist
--   F → frontend-developer
--   BI, BA → backend-developer
--   D → database-specialist
--   S → security-specialist
--   T → test-engineer
--   O, E → devops-troubleshooter
--   C → content-specialist
--   ❌ code-reviewer는 Task Agent에 사용 금지 (Verification Agent용)
--
-- 📌 Verification Agent (검증자) - Task Agent와 다르게!:
--   code-reviewer, qa-specialist, security-auditor, database-specialist
--
-- 📌 🔄 종합 검증 프로세스 규칙 (2025-12-13 확정):
--
--   [1단계: Task 실행 및 검증]
--   ┌──────────────┬─────────────────────────┬────────────┬─────────────┐
--   │ 단계         │ 수행자                  │ 기록자     │ 기록 필드   │
--   ├──────────────┼─────────────────────────┼────────────┼─────────────┤
--   │ Task 작업    │ Task Agent 서브에이전트 │ Main Agent │ Grid #10-13 │
--   │ Task 검증    │ Verif Agent 서브에이전트│ Main Agent │ Grid #16-21 │
--   └──────────────┴─────────────────────────┴────────────┴─────────────┘
--
--   프로세스:
--   Main Agent → Task Agent 서브에이전트 투입 → 작업 → 결과 반환 → Main Agent가 Grid 기록
--   Main Agent → Verification Agent 서브에이전트 투입 → 검증 → 결과 반환 → Main Agent가 Grid 기록
--
--   ❌ 금지: Main Agent가 직접 Task 작업/검증 수행
--   ❌ 금지: Task Agent가 검증까지 수행 (작성자 ≠ 검증자)
--
--   [2단계: Stage Gate 검증 (Main Agent 직접)]
--   - Main Agent가 직접 Stage 전체 검증 수행
--   - 검증 리포트 파일 생성: ssal-grid/stage-gates/S{N}GATE_verification_report.md
--   - DB에 파일 경로 기록: stage_verification.verification_report_path
--
--   Stage Gate 리포트 저장 위치:
--   S0_Project-SSAL-Grid_생성/ssal-grid/stage-gates/
--   ├── S1GATE_verification_report.md
--   ├── S2GATE_verification_report.md
--   └── ...
--
-- 📌 Tools (올바른 값):
--   ✅ /review-pr, /deploy, /test (Slash Commands)
--   ✅ gh, vercel-cli, npm (CLI)
--   ✅ /mcp__supabase__*, browser-mcp (MCP)
--   ❌ Read, Write 금지 (기본 동작)
--   ❌ TypeScript, React 금지 (기술 스택 - Task Instruction에 기재)
--
-- 📌 Verification 필드: 반드시 JSON 형식!
--
-- 📌 참조 문서:
--   - PROJECT_SSAL_GRID_MANUAL.md (매뉴얼)
--   - SSALWORKS_TASK_PLAN.md (Task 계획)
--   - SSALWORKS_5x11_MATRIX.md (매트릭스)
--
-- ================================================================

-- 기존 데이터 삭제 (선택)
-- DELETE FROM ssalworks_tasks;

-- ============================================
-- STAGE 1: 개발 준비 (8 Tasks) - TASK_PLAN.md 기준
-- ============================================

INSERT INTO ssalworks_tasks (
  stage, area, task_id, task_name,
  task_instruction, task_agent, tools, execution_type, dependencies,
  task_progress, task_status, generated_files, modification_history,
  verification_instruction, verification_agent,
  test, build, integration_verification, blockers,
  comprehensive_verification, verification_status, remarks
) VALUES
-- S1M1: 개발 가이드
(
  1, 'M', 'S1M1', '개발 가이드',
  'task-instructions/S1M1_instruction.md', 'code-reviewer', 'Read, Write', 'AI-Only', NULL,
  100, 'Completed', 'S1_개발_준비/Documentation/DEVELOPMENT_GUIDE.md', '2025-12-13: 초기 작성 완료',
  'verification-instructions/S1M1_verification.md', 'code-reviewer',
  NULL, NULL, NULL, NULL,
  NULL, 'Verified', '코딩 컨벤션, 파일 명명 규칙, Serverless API 구조'
),

-- S1F1: Vercel 프로젝트 설정
(
  1, 'F', 'S1F1', 'Vercel 프로젝트 설정',
  'task-instructions/S1F1_instruction.md', 'devops-troubleshooter', 'Write, Read, Bash', 'Human-Assisted', NULL,
  100, 'Completed', 'S1_개발_준비/Frontend/vercel.json, Production/Frontend/vercel.json', '2025-12-13: Vercel 프로젝트 생성 완료',
  'verification-instructions/S1F1_verification.md', 'devops-troubleshooter',
  NULL, NULL, NULL, NULL,
  NULL, 'Verified', 'Git 연결, 프레임워크 설정'
),

-- S1F2: vercel.json 설정
(
  1, 'F', 'S1F2', 'vercel.json 설정',
  'task-instructions/S1F2_instruction.md', 'frontend-developer', 'Write, Read', 'AI-Only', 'S1F1',
  100, 'Completed', 'S1_개발_준비/Frontend/vercel.json, Production/Frontend/vercel.json', '2025-12-13: CORS, 보안헤더, cron 설정 완료',
  'verification-instructions/S1F2_verification.md', 'frontend-developer',
  NULL, NULL, NULL, NULL,
  NULL, 'Verified', '빌드 설정, 라우팅, 보안 헤더, CORS 설정'
),

-- S1BI1: 환경변수 설정
(
  1, 'BI', 'S1BI1', '환경변수 설정',
  'task-instructions/S1BI1_instruction.md', 'backend-developer', 'Write, Read', 'AI-Only', 'S1F1',
  100, 'Completed', 'S1_개발_준비/Backend_Infra/Environment/ENV_SETUP.md', '2025-12-13: 환경변수 가이드 작성 완료',
  'verification-instructions/S1BI1_verification.md', 'backend-developer',
  NULL, NULL, NULL, NULL,
  NULL, 'Verified', '.env 파일 구조, Vercel 환경변수 설정'
),

-- S1D1: DB 스키마 확정
(
  1, 'D', 'S1D1', 'DB 스키마 확정',
  'task-instructions/S1D1_instruction.md', 'database-developer', 'Write, Read', 'AI-Only', NULL,
  100, 'Completed', 'S1_개발_준비/Database/*.sql (42개), Production/Database/*.sql', '2025-12-13: 전체 스키마 확정',
  'verification-instructions/S1D1_verification.md', 'database-developer',
  NULL, NULL, NULL, NULL,
  NULL, 'Verified', '마이그레이션 파일 점검, RLS 정책 확인'
),

-- S1S1: Supabase Auth Provider 설정
(
  1, 'S', 'S1S1', 'Supabase Auth Provider 설정',
  'task-instructions/S1S1_instruction.md', 'backend-developer', 'Write, Read, WebFetch', 'Human-AI', 'S1BI1',
  100, 'Completed', 'S1_개발_준비/Security/AUTH_PROVIDER_SETUP.md', '2025-12-13: Google OAuth Provider 설정 가이드 작성',
  'verification-instructions/S1S1_verification.md', 'backend-developer',
  NULL, NULL, NULL, NULL,
  NULL, 'Verified', 'Google OAuth Provider 설정, Redirect URL 등록'
),

-- S1T1: 테스트 환경 설정
(
  1, 'T', 'S1T1', '테스트 환경 설정',
  'task-instructions/S1T1_instruction.md', 'test-engineer', 'Write, Read', 'AI-Only', 'S1F1',
  100, 'Completed', 'S1_개발_준비/Testing/jest.config.js, S1_개발_준비/Testing/playwright.config.js', '2025-12-13: Jest/Playwright 설정 완료',
  'verification-instructions/S1T1_verification.md', 'test-engineer',
  NULL, NULL, NULL, NULL,
  NULL, 'Verified', 'Jest/Vitest 설정, Playwright 설정'
),

-- S1O1: DNS 설정
(
  1, 'O', 'S1O1', 'DNS 설정',
  'task-instructions/S1O1_instruction.md', 'devops-troubleshooter', 'Write, Read', 'Human-Assisted', NULL,
  100, 'Completed', 'S1_개발_준비/DevOps/DNS_SETUP.md', '2025-12-13: DNS 설정 가이드 작성',
  'verification-instructions/S1O1_verification.md', 'devops-troubleshooter',
  NULL, NULL, NULL, NULL,
  NULL, 'Verified', 'DNS 레코드 설정, Vercel 연결 준비 (도메인은 P2에서 구매 완료)'
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
