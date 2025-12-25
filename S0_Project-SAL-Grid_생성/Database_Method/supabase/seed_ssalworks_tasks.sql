-- ================================================================
-- SSALWorks v1.0 Task Data Insert
-- 64 Tasks with 22 Attributes
-- Generated: 2025-12-19
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
-- 📌 참조 문서:
--   - PROJECT_SSAL_GRID_MANUAL.md (매뉴얼)
--   - SSALWORKS_TASK_PLAN.md (Task 계획)
--   - SSALWORKS_5x11_MATRIX.md (매트릭스)
--
-- ================================================================

-- 기존 데이터 삭제 (선택)
-- DELETE FROM ssalworks_tasks;

-- ============================================
-- STAGE 1: 개발 준비 (9 Tasks)
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
  'task-instructions/S1M1_instruction.md', 'documentation-specialist', '/review-pr', 'AI-Only', NULL,
  100, 'Completed', 'S1_개발_준비/Documentation/DEVELOPMENT_GUIDE.md', '2025-12-13: 초기 작성 완료',
  'verification-instructions/S1M1_verification.md', 'code-reviewer',
  NULL, NULL, NULL, NULL,
  NULL, 'Verified', '코딩 컨벤션, 파일 명명 규칙, Serverless API 구조'
),

-- S1F1: Vercel 프로젝트 설정
(
  1, 'F', 'S1F1', 'Vercel 프로젝트 설정',
  'task-instructions/S1F1_instruction.md', 'devops-troubleshooter', 'vercel-cli, gh', 'Human-Assisted', NULL,
  100, 'Completed', 'S1_개발_준비/Frontend/vercel.json, Production/Frontend/vercel.json', '2025-12-13: Vercel 프로젝트 생성 완료',
  'verification-instructions/S1F1_verification.md', 'qa-specialist',
  NULL, NULL, NULL, NULL,
  NULL, 'Verified', 'Git 연결, 프레임워크 설정'
),

-- S1F2: vercel.json 설정
(
  1, 'F', 'S1F2', 'vercel.json 설정',
  'task-instructions/S1F2_instruction.md', 'frontend-developer', '/deploy', 'AI-Only', 'S1F1',
  100, 'Completed', 'S1_개발_준비/Frontend/vercel.json, Production/Frontend/vercel.json', '2025-12-13: CORS, 보안헤더, cron 설정 완료',
  'verification-instructions/S1F2_verification.md', 'code-reviewer',
  NULL, NULL, NULL, NULL,
  NULL, 'Verified', '빌드 설정, 라우팅, 보안 헤더, CORS 설정'
),

-- S1BI1: 환경변수 설정
(
  1, 'BI', 'S1BI1', '환경변수 설정',
  'task-instructions/S1BI1_instruction.md', 'backend-developer', 'vercel-cli', 'AI-Only', 'S1F1',
  100, 'Completed', 'S1_개발_준비/Backend_Infra/Environment/ENV_SETUP.md', '2025-12-13: 환경변수 가이드 작성 완료',
  'verification-instructions/S1BI1_verification.md', 'code-reviewer',
  NULL, NULL, NULL, NULL,
  NULL, 'Verified', '.env 파일 구조, Vercel 환경변수 설정'
),

-- S1BI2: Sentry 에러 트래킹 설정 (NEW - S4BI1에서 이동)
(
  1, 'BI', 'S1BI2', 'Sentry 에러 트래킹 설정',
  'task-instructions/S1BI2_instruction.md', 'backend-developer', 'npm, vercel-cli', 'AI-Only', 'S1BI1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S1BI2_verification.md', 'qa-specialist',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', '클라이언트/서버 에러 모니터링, 개발 초기 버그 조기 발견'
),

-- S1D1: DB 스키마 확정
(
  1, 'D', 'S1D1', 'DB 스키마 확정',
  'task-instructions/S1D1_instruction.md', 'database-specialist', '/mcp__supabase__*', 'AI-Only', NULL,
  100, 'Completed', 'S1_개발_준비/Database/*.sql, Production/Database/*.sql', '2025-12-13: 전체 스키마 확정',
  'verification-instructions/S1D1_verification.md', 'database-specialist',
  NULL, NULL, NULL, NULL,
  NULL, 'Verified', '마이그레이션 파일 점검, RLS 정책 확인'
),

-- S1S1: Supabase Auth Provider 설정
(
  1, 'S', 'S1S1', 'Supabase Auth Provider 설정',
  'task-instructions/S1S1_instruction.md', 'security-specialist', '/mcp__supabase__*', 'Human-AI', 'S1BI1',
  100, 'Completed', 'S1_개발_준비/Security/AUTH_PROVIDER_SETUP.md', '2025-12-13: Google OAuth Provider 설정 가이드 작성',
  'verification-instructions/S1S1_verification.md', 'security-auditor',
  NULL, NULL, NULL, NULL,
  NULL, 'Verified', 'Google OAuth Provider 설정, Redirect URL 등록'
),

-- S1T1: 테스트 환경 설정
(
  1, 'T', 'S1T1', '테스트 환경 설정',
  'task-instructions/S1T1_instruction.md', 'test-engineer', 'npm, /test', 'AI-Only', 'S1F1',
  100, 'Completed', 'S1_개발_준비/Testing/jest.config.js, S1_개발_준비/Testing/playwright.config.js', '2025-12-13: Jest/Playwright 설정 완료',
  'verification-instructions/S1T1_verification.md', 'qa-specialist',
  NULL, NULL, NULL, NULL,
  NULL, 'Verified', 'Jest/Vitest 설정, Playwright 설정'
),

-- S1O1: DNS 설정 및 도메인 연결
(
  1, 'O', 'S1O1', 'DNS 설정 및 도메인 연결',
  'task-instructions/S1O1_instruction.md', 'devops-troubleshooter', 'vercel-cli', 'Human-Assisted', NULL,
  100, 'Completed', 'S1_개발_준비/DevOps/DNS_SETUP.md', '2025-12-13: DNS 설정 가이드 작성, ssalworks.ai.kr 연결 완료',
  'verification-instructions/S1O1_verification.md', 'qa-specialist',
  NULL, NULL, NULL, NULL,
  NULL, 'Verified', 'DNS 레코드 설정, Vercel 도메인 연결 (✅ ssalworks.ai.kr)'
),

-- ============================================
-- STAGE 2: 개발 1차 (16 Tasks)
-- ============================================

-- S2M1: API 문서 v1
(
  2, 'M', 'S2M1', 'API 문서 v1',
  'task-instructions/S2M1_instruction.md', 'documentation-specialist', '/review-pr', 'AI-Only', 'S2BA1, S2BA2, S2BA3',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S2M1_verification.md', 'code-reviewer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', 'Serverless API 명세서 (인증/구독 API)'
),

-- S2F1: Google 소셜 로그인 UI
(
  2, 'F', 'S2F1', 'Google 소셜 로그인 UI',
  'task-instructions/S2F1_instruction.md', 'frontend-developer', 'browser-mcp', 'AI-Only', 'S2BA1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S2F1_verification.md', 'code-reviewer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', 'Google 로그인 버튼, OAuth 콜백 페이지'
),

-- S2F2: 비밀번호 재설정 UI
(
  2, 'F', 'S2F2', '비밀번호 재설정 UI',
  'task-instructions/S2F2_instruction.md', 'frontend-developer', 'browser-mcp', 'AI-Only', 'S2BA2',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S2F2_verification.md', 'code-reviewer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', '이메일 인증 기반 재설정 폼 + 이메일 전송 연동'
),

-- S2F3: 회원가입 UI (NEW)
(
  2, 'F', 'S2F3', '회원가입 UI',
  'task-instructions/S2F3_instruction.md', 'frontend-developer', 'browser-mcp', 'AI-Only', 'S2BA4',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S2F3_verification.md', 'code-reviewer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', '이메일/비밀번호 회원가입 폼 (Google OAuth 외 별도)'
),

-- S2BI1: Resend 이메일 서비스 설정
(
  2, 'BI', 'S2BI1', 'Resend 이메일 서비스 설정',
  'task-instructions/S2BI1_instruction.md', 'backend-developer', 'npm, vercel-cli', 'AI-Only', 'S1BI1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S2BI1_verification.md', 'code-reviewer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', 'Resend API 키 설정, 발신자 설정'
),

-- S2BI2: 에러 핸들링 시스템
(
  2, 'BI', 'S2BI2', '에러 핸들링 시스템',
  'task-instructions/S2BI2_instruction.md', 'backend-developer', 'npm', 'AI-Only', NULL,
  0, 'Pending', NULL, NULL,
  'verification-instructions/S2BI2_verification.md', 'code-reviewer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', '전역 에러 처리, 토스트 알림, 에러 로깅'
),

-- S2BI3: 이메일 도메인 인증 (Resend)
(
  2, 'BI', 'S2BI3', '이메일 도메인 인증 (Resend)',
  'task-instructions/S2BI3_instruction.md', 'devops-troubleshooter', 'vercel-cli', 'Human-Assisted', 'S2BI1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S2BI3_verification.md', 'qa-specialist',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', 'Whois DNS 설정으로 ssalworks.ai.kr 도메인 인증'
),

-- S2BA1: Google OAuth Serverless API
(
  2, 'BA', 'S2BA1', 'Google OAuth Serverless API',
  'task-instructions/S2BA1_instruction.md', 'backend-developer', 'npm, vercel-cli, /test', 'AI-Only', 'S1S1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S2BA1_verification.md', 'code-reviewer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', '/api/auth/google, /api/auth/google/callback'
),

-- S2BA2: 이메일 발송 API (Resend)
(
  2, 'BA', 'S2BA2', '이메일 발송 API (Resend)',
  'task-instructions/S2BA2_instruction.md', 'backend-developer', 'npm, vercel-cli, /test', 'AI-Only', 'S2BI1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S2BA2_verification.md', 'code-reviewer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', '비밀번호 재설정, 환영 메일 API'
),

-- S2BA3: 구독 관리 API
(
  2, 'BA', 'S2BA3', '구독 관리 API',
  'task-instructions/S2BA3_instruction.md', 'backend-developer', 'npm, vercel-cli, /mcp__supabase__*', 'AI-Only', 'S1D1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S2BA3_verification.md', 'code-reviewer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', '구독 신청/상태 조회/해지 API'
),

-- S2BA4: 회원가입 API (NEW)
(
  2, 'BA', 'S2BA4', '회원가입 API',
  'task-instructions/S2BA4_instruction.md', 'backend-developer', 'npm, vercel-cli, /mcp__supabase__*', 'AI-Only', 'S1S1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S2BA4_verification.md', 'code-reviewer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', 'POST /api/auth/signup (이메일/비밀번호 회원가입)'
),

-- S2BA5: 프로젝트 관리 API (NEW)
(
  2, 'BA', 'S2BA5', '프로젝트 관리 API',
  'task-instructions/S2BA5_instruction.md', 'backend-developer', 'npm, vercel-cli, /mcp__supabase__*', 'AI-Only', 'S1D1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S2BA5_verification.md', 'code-reviewer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', 'POST /api/projects (생성), GET (목록), PUT (수정), POST /complete (완료)'
),

-- S2D1: 인덱스 최적화
(
  2, 'D', 'S2D1', '인덱스 최적화',
  'task-instructions/S2D1_instruction.md', 'database-specialist', '/mcp__supabase__*', 'AI-Only', 'S1D1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S2D1_verification.md', 'database-specialist',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', '자주 사용 쿼리 인덱스 추가'
),

-- S2S1: 인증 미들웨어
(
  2, 'S', 'S2S1', '인증 미들웨어',
  'task-instructions/S2S1_instruction.md', 'security-specialist', 'npm, /test', 'AI-Only', 'S2BA1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S2S1_verification.md', 'security-auditor',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', 'Serverless API 인증 미들웨어, 토큰 검증'
),

-- S2T1: 인증 API 테스트
(
  2, 'T', 'S2T1', '인증 API 테스트',
  'task-instructions/S2T1_instruction.md', 'test-engineer', 'npm, /test', 'AI-Only', 'S2BA1, S2BA2',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S2T1_verification.md', 'qa-specialist',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', 'OAuth/이메일 API 유닛 테스트'
),

-- S2C1: Books 콘텐츠 업로드
(
  2, 'C', 'S2C1', 'Books 콘텐츠 업로드',
  'task-instructions/S2C1_instruction.md', 'content-specialist', 'gh', 'AI-Only', NULL,
  0, 'Pending', NULL, NULL,
  'verification-instructions/S2C1_verification.md', 'code-reviewer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', 'viewer.html/index.html 콘텐츠 목록 동기화 (jsdelivr CDN)'
),

-- ============================================
-- STAGE 3: 개발 2차 (6 Tasks)
-- ============================================

-- S3F1: AI Q&A 인터페이스 (NEW - S4F2에서 이동 및 변경)
(
  3, 'F', 'S3F1', 'AI Q&A 인터페이스',
  'task-instructions/S3F1_instruction.md', 'frontend-developer', 'browser-mcp', 'AI-Only', 'S3BA1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S3F1_verification.md', 'code-reviewer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', 'Gemini/ChatGPT/Perplexity 선택, 질문 입력, 답변 표시, 크레딧'
),

-- S3BI1: AI API 클라이언트 통합
(
  3, 'BI', 'S3BI1', 'AI API 클라이언트 통합',
  'task-instructions/S3BI1_instruction.md', 'backend-developer', 'npm, vercel-cli', 'AI-Only', NULL,
  0, 'Pending', NULL, NULL,
  'verification-instructions/S3BI1_verification.md', 'code-reviewer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', 'Gemini, ChatGPT, Perplexity 3개 서비스 연동 구조'
),

-- S3BA1: AI Q&A API
(
  3, 'BA', 'S3BA1', 'AI Q&A API',
  'task-instructions/S3BA1_instruction.md', 'backend-developer', 'npm, vercel-cli, /test', 'AI-Only', 'S3BI1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S3BA1_verification.md', 'code-reviewer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', 'Gemini, ChatGPT, Perplexity 프록시 API, 크레딧 차감'
),

-- S3BA2: AI 가격 조회 API (NEW)
(
  3, 'BA', 'S3BA2', 'AI 가격 조회 API',
  'task-instructions/S3BA2_instruction.md', 'backend-developer', 'npm, vercel-cli, /mcp__supabase__*', 'AI-Only', 'S3BI1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S3BA2_verification.md', 'code-reviewer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', 'GET /api/ai/pricing (실시간 가격 조회)'
),

-- S3S1: AI 서비스 구독 상태 확인 (Health Check)
(
  3, 'S', 'S3S1', 'AI 서비스 구독 상태 확인 (Health Check)',
  'task-instructions/S3S1_instruction.md', 'security-specialist', 'npm, /test', 'AI-Only', 'S2S1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S3S1_verification.md', 'security-auditor',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', 'Books/AI 접근 권한 검증'
),

-- S3E1: AI API 키 설정
(
  3, 'E', 'S3E1', 'AI API 키 설정',
  'task-instructions/S3E1_instruction.md', 'devops-troubleshooter', 'vercel-cli', 'Human-Assisted', 'S1BI1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S3E1_verification.md', 'qa-specialist',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', 'Gemini, ChatGPT, Perplexity API 키 환경변수 설정'
),

-- ============================================
-- STAGE 4: 개발 3차 (14 Tasks)
-- ============================================

-- S4M1: 관리자 가이드
(
  4, 'M', 'S4M1', '관리자 가이드',
  'task-instructions/S4M1_instruction.md', 'documentation-specialist', '/review-pr', 'AI-Only', 'S4F1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S4M1_verification.md', 'code-reviewer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', 'Admin Dashboard 사용법'
),

-- S4F1: 관리자 대시보드 강화
(
  4, 'F', 'S4F1', '관리자 대시보드 강화',
  'task-instructions/S4F1_instruction.md', 'frontend-developer', 'browser-mcp', 'AI-Only', 'S4BA2',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S4F1_verification.md', 'code-reviewer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', '통계, 사용자 관리, 구독 승인'
),

-- S4F3: 크레딧 충전 UI (NEW)
(
  4, 'F', 'S4F3', '크레딧 충전 UI',
  'task-instructions/S4F3_instruction.md', 'frontend-developer', 'browser-mcp, toss-payments-sdk', 'AI-Only', 'S4BA4',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S4F3_verification.md', 'code-reviewer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', '충전 금액 선택, 결제 수단 선택 페이지'
),

-- S4F4: 결제 수단 등록 UI (NEW)
(
  4, 'F', 'S4F4', '결제 수단 등록 UI',
  'task-instructions/S4F4_instruction.md', 'frontend-developer', 'browser-mcp, toss-payments-sdk', 'AI-Only', 'S4BA3',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S4F4_verification.md', 'code-reviewer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', '카드/계좌 정보 입력 페이지'
),

-- S4BA1: 결제 API (토스페이먼츠)
(
  4, 'BA', 'S4BA1', '결제 API (토스페이먼츠)',
  'task-instructions/S4BA1_instruction.md', 'backend-developer', 'npm, vercel-cli, toss-payments-sdk', 'AI-Only', 'S2BA3',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S4BA1_verification.md', 'code-reviewer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', '결제 요청/확인 Serverless API'
),

-- S4BA2: 결제 웹훅 API
(
  4, 'BA', 'S4BA2', '결제 웹훅 API',
  'task-instructions/S4BA2_instruction.md', 'backend-developer', 'npm, vercel-cli, /mcp__supabase__*', 'AI-Only', 'S4BA1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S4BA2_verification.md', 'code-reviewer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', '토스 결제 완료 콜백, 구독 상태 업데이트'
),

-- S4BA3: 결제 수단 등록 API (NEW)
(
  4, 'BA', 'S4BA3', '결제 수단 등록 API',
  'task-instructions/S4BA3_instruction.md', 'backend-developer', 'npm, vercel-cli, toss-payments-sdk', 'AI-Only', 'S4D1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S4BA3_verification.md', 'code-reviewer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', 'POST /api/subscription/payment-method (카드/계좌 자동이체 등록)'
),

-- S4BA4: 크레딧 충전 API (NEW)
(
  4, 'BA', 'S4BA4', '크레딧 충전 API',
  'task-instructions/S4BA4_instruction.md', 'backend-developer', 'npm, vercel-cli, toss-payments-sdk', 'AI-Only', 'S4D1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S4BA4_verification.md', 'code-reviewer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', 'POST /api/credit/purchase (크레딧 구매)'
),

-- S4BA5: 설치비 입금 확인 API (NEW)
(
  4, 'BA', 'S4BA5', '설치비 입금 확인 API',
  'task-instructions/S4BA5_instruction.md', 'backend-developer', 'npm, vercel-cli, /mcp__supabase__*', 'AI-Only', 'S4D1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S4BA5_verification.md', 'code-reviewer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', 'POST /api/payment/installation-confirm, POST /api/admin/confirm-installation'
),

-- S4BA6: 결제/알림 이메일 템플릿 (NEW)
(
  4, 'BA', 'S4BA6', '결제/알림 이메일 템플릿',
  'task-instructions/S4BA6_instruction.md', 'backend-developer', 'npm, resend-api', 'AI-Only', 'S2BA2, S4BA1, S4BA2',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S4BA6_verification.md', 'code-reviewer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', '결제 영수증, 구독료 결제, 결제 실패, 환불, 크레딧 부족 등 13종 이메일 템플릿'
),

-- S4D1: 결제/크레딧 테이블 (NEW)
(
  4, 'D', 'S4D1', '결제/크레딧 테이블',
  'task-instructions/S4D1_instruction.md', 'database-specialist', '/mcp__supabase__*', 'AI-Only', 'S1D1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S4D1_verification.md', 'database-specialist',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', 'billing_history, credit_history, ai_pricing, api_usage_log 테이블'
),

-- S4S1: 관리자 권한 체크
(
  4, 'S', 'S4S1', '관리자 권한 체크',
  'task-instructions/S4S1_instruction.md', 'security-specialist', 'npm, /test', 'AI-Only', 'S2S1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S4S1_verification.md', 'security-auditor',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', 'Admin 전용 라우트 보호, 역할 검증'
),

-- S4T1: E2E 테스트
(
  4, 'T', 'S4T1', 'E2E 테스트',
  'task-instructions/S4T1_instruction.md', 'test-engineer', 'npm, playwright-mcp', 'AI-Only', 'S4F1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S4T1_verification.md', 'qa-specialist',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', '주요 사용자 시나리오 (회원가입→결제→그리드)'
),

-- S4T2: API 통합 테스트
(
  4, 'T', 'S4T2', 'API 통합 테스트',
  'task-instructions/S4T2_instruction.md', 'test-engineer', 'npm, /test', 'AI-Only', 'S4BA2',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S4T2_verification.md', 'qa-specialist',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', '모든 Serverless API 엔드포인트 테스트'
),

-- S4O1: Cron Jobs 설정
(
  4, 'O', 'S4O1', 'Cron Jobs 설정',
  'task-instructions/S4O1_instruction.md', 'devops-troubleshooter', 'vercel-cli', 'AI-Only', 'S1F2',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S4O1_verification.md', 'qa-specialist',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', '정기 작업 (구독 만료 체크, 통계 집계 등)'
),

-- ============================================
-- STAGE 5: 운영 (7 Tasks)
-- ============================================

-- S5M1: 운영 매뉴얼
(
  5, 'M', 'S5M1', '운영 매뉴얼',
  'task-instructions/S5M1_instruction.md', 'documentation-specialist', '/review-pr', 'AI-Only', 'S5O1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S5M1_verification.md', 'code-reviewer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', '시스템 관리, 백업, 복구 절차, 장애 대응'
),

-- S5F1: 버그 수정 (프론트엔드)
(
  5, 'F', 'S5F1', '버그 수정 (프론트엔드)',
  'task-instructions/S5F1_instruction.md', 'frontend-developer', 'browser-mcp, /test', 'AI-Only', 'S5O1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S5F1_verification.md', 'code-reviewer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', '보고된 버그 수정, UI/UX 개선'
),

-- S5BA1: API 버그 수정 및 최적화
(
  5, 'BA', 'S5BA1', 'API 버그 수정 및 최적화',
  'task-instructions/S5BA1_instruction.md', 'backend-developer', 'npm, /test', 'AI-Only', 'S5O1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S5BA1_verification.md', 'code-reviewer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', 'Serverless API 성능 개선, 버그 수정'
),

-- S5D1: 데이터 백업 설정
(
  5, 'D', 'S5D1', '데이터 백업 설정',
  'task-instructions/S5D1_instruction.md', 'devops-troubleshooter', '/mcp__supabase__*', 'Human-Assisted', 'S5O1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S5D1_verification.md', 'qa-specialist',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', 'Supabase 자동 백업 확인, 복구 테스트'
),

-- S5S1: 보안 점검 및 패치
(
  5, 'S', 'S5S1', '보안 점검 및 패치',
  'task-instructions/S5S1_instruction.md', 'security-specialist', 'npm, /test', 'AI-Only', 'S5O1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S5S1_verification.md', 'security-auditor',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', '취약점 스캔, 보안 패치, 의존성 업데이트'
),

-- S5O1: 프로덕션 배포
(
  5, 'O', 'S5O1', '프로덕션 배포',
  'task-instructions/S5O1_instruction.md', 'devops-troubleshooter', 'vercel-cli, /deploy', 'Human-Assisted', 'S4T2',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S5O1_verification.md', 'qa-specialist',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', 'Vercel 프로덕션 배포, 환경변수 확인'
),

-- S5O3: SSL 인증서 확인
(
  5, 'O', 'S5O3', 'SSL 인증서 확인',
  'task-instructions/S5O3_instruction.md', 'devops-troubleshooter', 'vercel-cli', 'Human-Assisted', 'S5O1, S1O1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S5O3_verification.md', 'qa-specialist',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', 'HTTPS 설정 확인, 인증서 자동 갱신 확인'
),

-- ============================================
-- ADDITIONAL TASKS (Added 2025-12-20)
-- ============================================

-- S1BI2: Sentry 에러 트래킹 설정
(
  1, 'BI', 'S1BI2', 'Sentry 에러 트래킹 설정',
  'task-instructions/S1BI2_instruction.md', 'devops-troubleshooter', 'Sentry Dashboard, Vercel', 'AI-Only', 'S1BI1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S1BI2_verification.md', 'code-reviewer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', '클라이언트/서버 에러 모니터링을 위한 Sentry 설정'
),

-- S2BA4: 회원가입 API
(
  2, 'BA', 'S2BA4', '회원가입 API',
  'task-instructions/S2BA4_instruction.md', 'backend-developer', 'supabase-js, Vercel', 'AI-Only', 'S1S1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S2BA4_verification.md', 'code-reviewer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', '이메일/비밀번호 기반 회원가입 Serverless API'
),

-- S2BA5: 프로젝트 관리 API
(
  2, 'BA', 'S2BA5', '프로젝트 관리 API',
  'task-instructions/S2BA5_instruction.md', 'backend-developer', 'supabase-js', 'AI-Only', 'S1D1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S2BA5_verification.md', 'code-reviewer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', '프로젝트 생성, 목록, 수정, 완료 처리 API'
),

-- S2F3: 회원가입 UI
(
  2, 'F', 'S2F3', '회원가입 UI',
  'task-instructions/S2F3_instruction.md', 'frontend-developer', 'HTML/CSS/JS', 'AI-Only', 'S2BA4',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S2F3_verification.md', 'qa-specialist',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', '이메일/비밀번호 회원가입 폼 및 이메일 확인 페이지'
),

-- S3BA2: AI 가격 조회 API
(
  3, 'BA', 'S3BA2', 'AI 가격 조회 API',
  'task-instructions/S3BA2_instruction.md', 'backend-developer', 'supabase-js', 'AI-Only', 'S3BI1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S3BA2_verification.md', 'code-reviewer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', 'Gemini, ChatGPT, Perplexity AI 가격 정보 조회'
),

-- S3F1: AI Q&A 인터페이스
(
  3, 'F', 'S3F1', 'AI Q&A 인터페이스',
  'task-instructions/S3F1_instruction.md', 'frontend-developer', 'HTML/CSS/JS', 'AI-Only', 'S3BA1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S3F1_verification.md', 'qa-specialist',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', 'AI 모델 선택, 질문 입력, 답변 표시 UI'
),

-- S4BA3: 토스페이먼츠 결제 API
(
  4, 'BA', 'S4BA3', '토스페이먼츠 결제 API',
  'task-instructions/S4BA3_instruction.md', 'backend-developer', '토스페이먼츠 API, supabase-js', 'Human-AI', 'S4BA2, S4D1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S4BA3_verification.md', 'code-reviewer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', '크레딧 충전 및 월 이용료 자동결제 API'
),

-- S4BA4: 크레딧 충전 API
(
  4, 'BA', 'S4BA4', '크레딧 충전 API',
  'task-instructions/S4BA4_instruction.md', 'backend-developer', 'supabase-js, Toss Payments API', 'AI-Only', 'S4D1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S4BA4_verification.md', 'code-reviewer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', 'AI 서비스 이용을 위한 크레딧 구매 및 충전 API'
),

-- S4BA5: 설치비 입금 확인 API
(
  4, 'BA', 'S4BA5', '설치비 입금 확인 API',
  'task-instructions/S4BA5_instruction.md', 'backend-developer', 'supabase-js, Email API', 'AI-Only', 'S4D1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S4BA5_verification.md', 'code-reviewer',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', '설치비 무통장 입금 신청 및 관리자 확인 API'
),

-- S4D1: 결제/크레딧 테이블
(
  4, 'D', 'S4D1', '결제/크레딧 테이블',
  'task-instructions/S4D1_instruction.md', 'database-specialist', 'Supabase SQL Editor', 'AI-Only', 'S1D1',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S4D1_verification.md', 'database-specialist',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', 'billing_history, credit_history, ai_pricing 등 테이블'
),

-- S4F3: 크레딧 충전 UI
(
  4, 'F', 'S4F3', '크레딧 충전 UI',
  'task-instructions/S4F3_instruction.md', 'frontend-developer', 'HTML/CSS/JS, 토스 SDK', 'AI-Only', 'S4BA4',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S4F3_verification.md', 'qa-specialist',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', '충전 금액 선택, 결제 수단 선택, 결제 진행 페이지'
),

-- S4F4: 결제 수단 등록 UI
(
  4, 'F', 'S4F4', '결제 수단 등록 UI',
  'task-instructions/S4F4_instruction.md', 'frontend-developer', 'HTML/CSS/JS, 토스 SDK', 'AI-Only', 'S4BA3',
  0, 'Pending', NULL, NULL,
  'verification-instructions/S4F4_verification.md', 'qa-specialist',
  NULL, NULL, NULL, NULL,
  NULL, 'Not Verified', '카드/계좌 정보 입력 및 빌링키 발급 페이지'
);

-- ============================================
-- Verification: Check inserted data
-- ============================================

-- 전체 개수 확인
-- SELECT COUNT(*) as total_tasks FROM ssalworks_tasks;
-- 결과: 64

-- Stage별 개수 확인
-- SELECT stage, COUNT(*) FROM ssalworks_tasks GROUP BY stage ORDER BY stage;
-- 결과: 1=10, 2=19, 3=8, 4=20, 5=7

-- Area별 개수 확인
-- SELECT area, COUNT(*) FROM ssalworks_tasks GROUP BY area ORDER BY area;
