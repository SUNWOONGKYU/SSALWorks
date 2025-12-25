-- ================================================================
-- PROJECT SAL GRID - [템플릿] 표준 Task 데이터
-- 버전: v7.0 (테이블 분리)
-- 생성일: 2025-11-27
--
-- ★★★ 주의: 이 파일은 [템플릿] 데이터입니다! ★★★
-- 테이블: project_ssal_grid_tasks_template
-- 범용 예시 데이터이며, 실제 프로젝트용이 아닙니다.
--
-- 실전용 SSALWorks Task:
-- → ssalworks_tasks 테이블
-- → SSALWORKS_TASKS_DATA.sql
--
-- 실행 전 schema.sql을 먼저 실행하세요!
-- ================================================================
--
-- Stage별 Area 할당 (6×11 매트릭스 - 기획 제외):
--   ☆ 디렉토리 구조 생성 (GRID 범위 외)
--   ○ 사업계획 (GRID 범위 외)
--   ○ 프로젝트 기획 (GRID 범위 외)
--   ☆ PROJECT SAL GRID 생성 (GRID 범위 외)
--   ─────────────────────────────
--   Stage 1 (프로토타입 제작): M, U, F, D (4개)
--   Stage 2 (개발 준비): M, BI, D, S (4개)
--   Stage 3 (개발 1차): M, U, F, BI, BA, D, S, T, O, E, C (11개 전부)
--   Stage 4 (개발 2차): M, U, F, BI, BA, D, S, T, O, E, C (11개 전부)
--   Stage 5 (개발 3차): M, U, F, BI, BA, D, S, T, O, E, C (11개 전부)
--   Stage 6 (운영): M, F, BA, D, S, T, O, E, C (9개)
--
-- 22개 속성 (원본 문서 순서):
-- [1-4] Basic Info: stage, area, task_id, task_name
-- [5-9] Task Definition: task_instruction, task_agent, tools, execution_type, dependencies
-- [10-13] Task Execution: task_progress, task_status, generated_files, modification_history
-- [14-15] Verification Definition: verification_instruction, verification_agent
-- [16-19] Verification Execution: test, build, integration_verification, blockers
-- [20-22] Verification Completion: comprehensive_verification, verification_status, remarks
--
-- Stage 정의 (GRID 관리 범위):
--   1 = 프로토타입 제작 (Prototype)
--   2 = 개발 준비 (Development Preparation)
--   3 = 개발 1차 (Development Phase 1)
--   4 = 개발 2차 (Development Phase 2)
--   5 = 개발 3차 (Development Phase 3)
--   6 = 운영 (Operations)
--
-- ================================================================

-- 기존 템플릿 데이터 삭제
DELETE FROM project_ssal_grid_tasks_template;

-- ================================================================
-- Stage 1: 프로토타입 제작 (Prototype)
-- Area: M, U, F, D (4개만!)
-- ⚠️ JSON 목데이터 금지! 처음부터 Supabase 사용
-- ================================================================

INSERT INTO project_ssal_grid_tasks_template (
    stage, area, task_id, task_name,
    task_instruction, task_agent, tools, execution_type, dependencies,
    task_progress, task_status, generated_files, modification_history,
    verification_instruction, verification_agent,
    test, build, integration_verification, blockers,
    comprehensive_verification, verification_status, remarks
) VALUES
-- M (Documentation)
(1, 'M', NULL, '프로토타입 설명서',
 'tasks/S1M1_instruction.md', 'documentation-specialist', 'Write, Edit, Read', 'AI-Only', NULL,
 0, 'Pending', NULL, NULL,
 'tasks/S1M1_verification.md', 'qa-specialist',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', '프로토타입 범위, 기능, 제한사항 문서'),

(1, 'M', NULL, '데모 시나리오',
 'tasks/S1M2_instruction.md', 'documentation-specialist', 'Write, Edit, Read', 'AI-Only', 'S1M1',
 0, 'Pending', NULL, NULL,
 'tasks/S1M2_verification.md', 'qa-specialist',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', '시연 순서 및 스크립트'),

-- U (Design)
(1, 'U', 'S1U1', '디자인 시스템 정의',
 'tasks/S1U1_instruction.md', 'design-specialist', 'Write, Edit, Read', 'AI-Only', NULL,
 0, 'Pending', NULL, NULL,
 'tasks/S1U1_verification.md', 'qa-specialist',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', '색상, 타이포그래피, 간격 등'),

(1, 'U', NULL, 'UI 컴포넌트 정의',
 'tasks/S1U2_instruction.md', 'design-specialist', 'Write, Edit, Read', 'AI-Only', 'S1U1',
 0, 'Pending', NULL, NULL,
 'tasks/S1U2_verification.md', 'qa-specialist',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', '버튼, 입력폼, 카드 등 재사용 컴포넌트'),

-- F (Frontend)
(1, 'F', 'S1F1', '주요 화면 구현',
 'tasks/S1F1_instruction.md', 'frontend-specialist', 'Bash, Write, Edit, Read', 'AI-Only', 'S1U2',
 0, 'Pending', NULL, NULL,
 'tasks/S1F1_verification.md', 'code-reviewer',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', '홈, 목록, 상세 등 핵심 화면'),

(1, 'F', 'S1F2', '인터랙션 구현',
 'tasks/S1F2_instruction.md', 'frontend-specialist', 'Write, Edit, Read', 'AI-Only', 'S1F1',
 0, 'Pending', NULL, NULL,
 'tasks/S1F2_verification.md', 'code-reviewer',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', '클릭, 호버, 폼 입력 등'),

-- D (Database) - JSON 목데이터 금지! Supabase 직접 사용
(1, 'D', 'S1D1', 'Supabase 테이블 생성',
 'tasks/S1D1_instruction.md', 'database-specialist', 'Bash, Write, Edit, Read', 'AI-Only', NULL,
 0, 'Pending', NULL, NULL,
 'tasks/S1D1_verification.md', 'code-reviewer',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', '기본 테이블 스키마 (JSON 목데이터 금지!)'),

(1, 'D', 'S1D2', '시드 데이터 입력',
 'tasks/S1D2_instruction.md', 'database-specialist', 'Bash, Write, Edit, Read', 'AI-Only', 'S1D1',
 0, 'Pending', NULL, NULL,
 'tasks/S1D2_verification.md', 'code-reviewer',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', '테스트용 샘플 데이터');

-- ================================================================
-- Stage 2: 개발 준비 (Development Preparation)
-- Area: M, BI, D, S (4개만!)
-- ================================================================

INSERT INTO project_ssal_grid_tasks_template (
    stage, area, task_id, task_name,
    task_instruction, task_agent, tools, execution_type, dependencies,
    task_progress, task_status, generated_files, modification_history,
    verification_instruction, verification_agent,
    test, build, integration_verification, blockers,
    comprehensive_verification, verification_status, remarks
) VALUES
-- M (Documentation)
(2, 'M', 'S1M1', '개발 가이드 작성',
 'tasks/S2M1_instruction.md', 'documentation-specialist', 'Write, Edit, Read', 'AI-Only', 'S1M2',
 0, 'Pending', NULL, NULL,
 'tasks/S2M1_verification.md', 'qa-specialist',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', '코딩 컨벤션, Git 브랜치 전략'),

(2, 'M', 'S1M2', '프로젝트 구조 문서',
 'tasks/S2M2_instruction.md', 'documentation-specialist', 'Write, Edit, Read', 'AI-Only', 'S2M1',
 0, 'Pending', NULL, NULL,
 'tasks/S2M2_verification.md', 'qa-specialist',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', '폴더 구조, 파일 명명 규칙'),

(2, 'M', 'S1M3', '라이브러리 선정 문서',
 'tasks/S2M3_instruction.md', 'documentation-specialist', 'Write, Edit, Read', 'Human-AI', 'S2M1',
 0, 'Pending', NULL, NULL,
 'tasks/S2M3_verification.md', 'qa-specialist',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', '사용할 라이브러리 목록 및 이유'),

(2, 'M', 'S1M4', '테스트/배포 계획',
 'tasks/S2M4_instruction.md', 'documentation-specialist', 'Write, Edit, Read', 'AI-Only', 'S2M1',
 0, 'Pending', NULL, NULL,
 'tasks/S2M4_verification.md', 'qa-specialist',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', '테스트 전략, 배포 파이프라인 계획'),

-- BI (Backend Infrastructure)
(2, 'BI', 'S1BI1', 'Supabase 클라이언트 설정',
 'tasks/S2BI1_instruction.md', 'backend-specialist', 'Bash, Write, Edit, Read', 'AI-Only', 'S1D1',
 0, 'Pending', NULL, NULL,
 'tasks/S2BI1_verification.md', 'code-reviewer',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', '클라이언트 초기화, 타입 생성'),

(2, 'BI', 'S1BI2', '공통 유틸 함수',
 'tasks/S2BI2_instruction.md', 'backend-specialist', 'Write, Edit, Read', 'AI-Only', 'S2BI1',
 0, 'Pending', NULL, NULL,
 'tasks/S2BI2_verification.md', 'code-reviewer',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', '헬퍼 함수, 유틸리티'),

(2, 'BI', 'S1BI3', '미들웨어 설정',
 'tasks/S2BI3_instruction.md', 'backend-specialist', 'Write, Edit, Read', 'AI-Only', 'S2BI1',
 0, 'Pending', NULL, NULL,
 'tasks/S2BI3_verification.md', 'code-reviewer',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', '인증 미들웨어, 에러 핸들러'),

-- D (Database)
(2, 'D', 'S1D1', '스키마 확정',
 'tasks/S2D1_instruction.md', 'database-specialist', 'Write, Edit, Read', 'AI-Only', 'S1D1',
 0, 'Pending', NULL, NULL,
 'tasks/S2D1_verification.md', 'code-reviewer',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', '마이그레이션 파일 생성'),

(2, 'D', 'S1D2', 'RLS 정책 설정',
 'tasks/S2D2_instruction.md', 'database-specialist', 'Write, Edit, Read', 'AI-Only', 'S2D1',
 0, 'Pending', NULL, NULL,
 'tasks/S2D2_verification.md', 'security-auditor',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', 'Row Level Security 정책'),

(2, 'D', 'S1D3', '시드 데이터 스크립트',
 'tasks/S2D3_instruction.md', 'database-specialist', 'Write, Edit, Read', 'AI-Only', 'S2D1',
 0, 'Pending', NULL, NULL,
 'tasks/S2D3_verification.md', 'code-reviewer',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', '초기 데이터 입력 스크립트'),

-- S (Security)
(2, 'S', 'S1S1', '인증 구조 설정',
 'tasks/S2S1_instruction.md', 'security-specialist', 'Write, Edit, Read', 'AI-Only', 'S2BI1',
 0, 'Pending', NULL, NULL,
 'tasks/S2S1_verification.md', 'security-auditor',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', 'Supabase Auth, 소셜 로그인'),

(2, 'S', 'S1S2', '환경변수 설정',
 'tasks/S2S2_instruction.md', 'security-specialist', 'Write, Edit, Read', 'AI-Only', 'S2BI1',
 0, 'Pending', NULL, NULL,
 'tasks/S2S2_verification.md', 'security-auditor',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', '.env 파일, 시크릿 관리');

-- ================================================================
-- Stage 3-5: 개발 (Development Phase 1/2/3)
-- Area: M, U, F, BI, BA, D, S, T, O, E, C (11개 전부)
-- ================================================================

INSERT INTO project_ssal_grid_tasks_template (
    stage, area, task_id, task_name,
    task_instruction, task_agent, tools, execution_type, dependencies,
    task_progress, task_status, generated_files, modification_history,
    verification_instruction, verification_agent,
    test, build, integration_verification, blockers,
    comprehensive_verification, verification_status, remarks
) VALUES
-- M (Documentation)
(3, 'M', 'S2M1', 'API 문서 작성',
 'tasks/S3M1_instruction.md', 'documentation-specialist', 'Write, Edit, Read', 'AI-Only', 'S2M4',
 0, 'Pending', NULL, NULL,
 'tasks/S3M1_verification.md', 'qa-specialist',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', '엔드포인트 명세'),

(3, 'M', 'S2M2', '사용자 가이드',
 'tasks/S3M2_instruction.md', 'documentation-specialist', 'Write, Edit, Read', 'AI-Only', 'S4F1,S4F2',
 0, 'Pending', NULL, NULL,
 'tasks/S3M2_verification.md', 'qa-specialist',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', '사용법 문서'),

(3, 'M', 'S2M3', 'README 작성',
 'tasks/S3M3_instruction.md', 'documentation-specialist', 'Write, Edit, Read', 'AI-Only', 'S2M2',
 0, 'Pending', NULL, NULL,
 'tasks/S3M3_verification.md', 'qa-specialist',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', '프로젝트 소개, 설치 방법'),

-- U (Design)
(3, 'U', 'S2U1', '세부 UI 완성',
 'tasks/S3U1_instruction.md', 'design-specialist', 'Write, Edit, Read', 'AI-Only', 'S1U2',
 0, 'Pending', NULL, NULL,
 'tasks/S3U1_verification.md', 'qa-specialist',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', '애니메이션, 마이크로인터랙션'),

(3, 'U', 'S2U2', '반응형 디자인',
 'tasks/S3U2_instruction.md', 'design-specialist', 'Write, Edit, Read', 'AI-Only', 'S3U1',
 0, 'Pending', NULL, NULL,
 'tasks/S3U2_verification.md', 'qa-specialist',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', '모바일/태블릿 대응'),

-- F (Frontend) - 파일 1개 = Task 1개 원칙
(3, 'F', 'S2F1', '페이지 구현 (인증)',
 'tasks/S3F1_instruction.md', 'frontend-specialist', 'Write, Edit, Read', 'AI-Only', 'S3BI3,S3S1',
 0, 'Pending', NULL, NULL,
 'tasks/S3F1_verification.md', 'code-reviewer',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', '로그인, 회원가입 페이지'),

(3, 'F', 'S2F2', '페이지 구현 (메인)',
 'tasks/S3F2_instruction.md', 'frontend-specialist', 'Write, Edit, Read', 'AI-Only', 'S2BI3',
 0, 'Pending', NULL, NULL,
 'tasks/S3F2_verification.md', 'code-reviewer',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', '대시보드, 홈 페이지'),

(3, 'F', 'S2F3', '컴포넌트 구현',
 'tasks/S3F3_instruction.md', 'frontend-specialist', 'Write, Edit, Read', 'AI-Only', 'S1U2',
 0, 'Pending', NULL, NULL,
 'tasks/S3F3_verification.md', 'code-reviewer',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', '재사용 컴포넌트'),

(3, 'F', 'S2F4', '상태 관리 구현',
 'tasks/S3F4_instruction.md', 'frontend-specialist', 'Write, Edit, Read', 'AI-Only', 'S2BI3',
 0, 'Pending', NULL, NULL,
 'tasks/S3F4_verification.md', 'code-reviewer',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', 'Zustand, Context 등'),

-- BI (Backend Infrastructure)
(3, 'BI', 'S2BI1', '에러 핸들링',
 'tasks/S3BI1_instruction.md', 'backend-specialist', 'Write, Edit, Read', 'AI-Only', 'S2BI3',
 0, 'Pending', NULL, NULL,
 'tasks/S3BI1_verification.md', 'code-reviewer',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', '전역 에러 처리'),

(3, 'BI', 'S2BI2', '로깅 시스템',
 'tasks/S3BI2_instruction.md', 'backend-specialist', 'Write, Edit, Read', 'AI-Only', 'S2BI3',
 0, 'Pending', NULL, NULL,
 'tasks/S3BI2_verification.md', 'code-reviewer',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', '로그 수집, 모니터링'),

-- BA (Backend APIs)
(3, 'BA', 'S2BA1', 'API 구현 (비즈니스 로직)',
 'tasks/S3BA1_instruction.md', 'backend-specialist', 'Write, Edit, Read', 'AI-Only', 'S3BI3,S3D1',
 0, 'Pending', NULL, NULL,
 'tasks/S3BA1_verification.md', 'code-reviewer',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', '핵심 비즈니스 로직 API'),

-- D (Database)
(3, 'D', 'S2D1', '쿼리 최적화',
 'tasks/S3D1_instruction.md', 'database-specialist', 'Write, Edit, Read', 'AI-Only', 'S2D1',
 0, 'Pending', NULL, NULL,
 'tasks/S3D1_verification.md', 'code-reviewer',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', '인덱스, 쿼리 튜닝'),

-- S (Security)
(3, 'S', 'S2S1', '인증/인가 완성',
 'tasks/S3S1_instruction.md', 'security-specialist', 'Write, Edit, Read', 'AI-Only', 'S3S1,S3D2',
 0, 'Pending', NULL, NULL,
 'tasks/S3S1_verification.md', 'security-auditor',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', '권한 체크, 보안 점검'),

-- T (Testing)
(3, 'T', 'S2T1', '유닛 테스트',
 'tasks/S3T1_instruction.md', 'qa-specialist', 'Write, Edit, Read', 'AI-Only', 'S3BA1',
 0, 'Pending', NULL, NULL,
 'tasks/S3T1_verification.md', 'qa-specialist',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', '개별 함수/컴포넌트 테스트'),

(3, 'T', 'S2T2', '통합 테스트',
 'tasks/S3T2_instruction.md', 'qa-specialist', 'Write, Edit, Read', 'AI-Only', 'S3T1',
 0, 'Pending', NULL, NULL,
 'tasks/S3T2_verification.md', 'qa-specialist',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', 'API, DB 연동 테스트'),

(3, 'T', 'S2T3', 'E2E 테스트',
 'tasks/S3T3_instruction.md', 'qa-specialist', 'Write, Edit, Read', 'AI-Only', 'S3T2',
 0, 'Pending', NULL, NULL,
 'tasks/S3T3_verification.md', 'qa-specialist',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', '사용자 시나리오 테스트'),

-- O (DevOps)
(3, 'O', 'S2O1', 'CI/CD 설정',
 'tasks/S3O1_instruction.md', 'devops-specialist', 'Bash, Write, Edit, Read', 'AI-Only', 'S2M4',
 0, 'Pending', NULL, NULL,
 'tasks/S3O1_verification.md', 'devops-specialist',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', 'GitHub Actions, Vercel 등'),

(3, 'O', 'S2O2', '프로덕션 배포',
 'tasks/S3O2_instruction.md', 'devops-specialist', 'Bash, Write, Edit, Read', 'AI-Only', 'S3O1',
 0, 'Pending', NULL, NULL,
 'tasks/S3O2_verification.md', 'devops-specialist',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', '배포 및 도메인 연결'),

-- E (External)
(3, 'E', 'S2E1', '외부 서비스 연동',
 'tasks/S3E1_instruction.md', 'integration-specialist', 'Write, Edit, Read', 'Human-AI', 'S1M4,S3BI3',
 0, 'Pending', NULL, NULL,
 'tasks/S3E1_verification.md', 'code-reviewer',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', '결제, 이메일, SMS 등'),

-- C (Content)
(3, 'C', 'S2C1', '콘텐츠 시스템',
 'tasks/S3C1_instruction.md', 'content-specialist', 'Write, Edit, Read', 'AI-Only', 'S3BA1',
 0, 'Pending', NULL, NULL,
 'tasks/S3C1_verification.md', 'qa-specialist',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', 'AI 통합, 콘텐츠 생성 엔진');

-- ================================================================
-- Stage 6: 운영 (Operations)
-- Area: M, F, BA, D, S, T, O, E, C (9개, U와 BI 제외)
-- ================================================================

INSERT INTO project_ssal_grid_tasks_template (
    stage, area, task_id, task_name,
    task_instruction, task_agent, tools, execution_type, dependencies,
    task_progress, task_status, generated_files, modification_history,
    verification_instruction, verification_agent,
    test, build, integration_verification, blockers,
    comprehensive_verification, verification_status, remarks
) VALUES
-- M (Documentation)
(6, 'M', 'S6M1', '운영 매뉴얼',
 'tasks/S6M1_instruction.md', 'documentation-specialist', 'Write, Edit, Read', 'AI-Only', 'S3O2',
 0, 'Pending', NULL, NULL,
 'tasks/S6M1_verification.md', 'qa-specialist',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', '시스템 관리 가이드'),

(6, 'M', 'S6M2', '장애 대응 가이드',
 'tasks/S6M2_instruction.md', 'documentation-specialist', 'Write, Edit, Read', 'AI-Only', 'S6M1',
 0, 'Pending', NULL, NULL,
 'tasks/S6M2_verification.md', 'qa-specialist',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', '트러블슈팅 문서'),

(6, 'M', 'S6M3', '업데이트 로그',
 'tasks/S6M3_instruction.md', 'documentation-specialist', 'Write, Edit, Read', 'AI-Only', 'S3O2',
 0, 'Pending', NULL, NULL,
 'tasks/S6M3_verification.md', 'qa-specialist',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', '변경 이력 관리'),

-- F (Frontend)
(6, 'F', 'S6F1', '버그 수정',
 'tasks/S6F1_instruction.md', 'frontend-specialist', 'Write, Edit, Read', 'AI-Only', 'S4F1,S4F2',
 0, 'Pending', NULL, NULL,
 'tasks/S6F1_verification.md', 'code-reviewer',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', '프론트엔드 버그 픽스'),

(6, 'F', 'S6F2', '기능 개선',
 'tasks/S6F2_instruction.md', 'frontend-specialist', 'Write, Edit, Read', 'AI-Only', 'S6F1',
 0, 'Pending', NULL, NULL,
 'tasks/S6F2_verification.md', 'code-reviewer',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', 'UI/UX 개선'),

-- BA (Backend APIs)
(6, 'BA', 'S6BA1', 'API 버그 수정',
 'tasks/S6BA1_instruction.md', 'backend-specialist', 'Write, Edit, Read', 'AI-Only', 'S3BA1',
 0, 'Pending', NULL, NULL,
 'tasks/S6BA1_verification.md', 'code-reviewer',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', '백엔드 버그 픽스'),

(6, 'BA', 'S6BA2', 'API 추가',
 'tasks/S6BA2_instruction.md', 'backend-specialist', 'Write, Edit, Read', 'AI-Only', 'S6BA1',
 0, 'Pending', NULL, NULL,
 'tasks/S6BA2_verification.md', 'code-reviewer',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', '신규 기능 API'),

-- D (Database)
(6, 'D', 'S6D1', '데이터 백업',
 'tasks/S6D1_instruction.md', 'database-specialist', 'Bash, Write, Edit, Read', 'AI-Only', 'S3O2',
 0, 'Pending', NULL, NULL,
 'tasks/S6D1_verification.md', 'code-reviewer',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', '정기 백업 설정'),

(6, 'D', 'S6D2', '스키마 변경',
 'tasks/S6D2_instruction.md', 'database-specialist', 'Write, Edit, Read', 'AI-Only', 'S3D1',
 0, 'Pending', NULL, NULL,
 'tasks/S6D2_verification.md', 'code-reviewer',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', '마이그레이션'),

-- S (Security)
(6, 'S', 'S6S1', '보안 패치',
 'tasks/S6S1_instruction.md', 'security-specialist', 'Write, Edit, Read', 'AI-Only', 'S3S1',
 0, 'Pending', NULL, NULL,
 'tasks/S6S1_verification.md', 'security-auditor',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', '취약점 수정'),

(6, 'S', 'S6S2', '권한 관리',
 'tasks/S6S2_instruction.md', 'security-specialist', 'Write, Edit, Read', 'AI-Only', 'S3S1',
 0, 'Pending', NULL, NULL,
 'tasks/S6S2_verification.md', 'security-auditor',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', '사용자 권한 조정'),

-- T (Testing)
(6, 'T', 'S6T1', '회귀 테스트',
 'tasks/S6T1_instruction.md', 'qa-specialist', 'Write, Edit, Read', 'AI-Only', 'S3T3',
 0, 'Pending', NULL, NULL,
 'tasks/S6T1_verification.md', 'qa-specialist',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', '변경 후 기존 기능 테스트'),

-- O (DevOps)
(6, 'O', 'S6O1', '모니터링',
 'tasks/S6O1_instruction.md', 'devops-specialist', 'Write, Edit, Read', 'AI-Only', 'S3O2',
 0, 'Pending', NULL, NULL,
 'tasks/S6O1_verification.md', 'devops-specialist',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', '성능/에러 모니터링'),

(6, 'O', 'S6O2', '스케일링',
 'tasks/S6O2_instruction.md', 'devops-specialist', 'Bash, Write, Edit, Read', 'AI-Only', 'S6O1',
 0, 'Pending', NULL, NULL,
 'tasks/S6O2_verification.md', 'devops-specialist',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', '트래픽 대응'),

-- E (External)
(6, 'E', 'S6E1', '외부 서비스 업데이트',
 'tasks/S6E1_instruction.md', 'integration-specialist', 'Write, Edit, Read', 'AI-Only', 'S3E1',
 0, 'Pending', NULL, NULL,
 'tasks/S6E1_verification.md', 'code-reviewer',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', 'API 버전 대응'),

-- C (Content)
(6, 'C', 'S6C1', '콘텐츠 업데이트',
 'tasks/S6C1_instruction.md', 'content-specialist', 'Write, Edit, Read', 'AI-Only', 'S3C1',
 0, 'Pending', NULL, NULL,
 'tasks/S6C1_verification.md', 'qa-specialist',
 NULL, NULL, NULL, NULL,
 NULL, 'Not Verified', '콘텐츠 추가/수정');

-- ================================================================
-- 완료!
-- ================================================================
-- Task 개수 (TASK_SELECTION_MATRIX.md 기준):
--   Stage 1 (기획): 9 tasks (M:6, U:3)
--   Stage 2 (프로토타입 제작): 8 tasks (M:2, U:2, F:2, D:2)
--   Stage 3 (개발 준비): 12 tasks (M:4, BI:3, D:3, S:2)
--   Stage 4 (개발): 21 tasks (M:3, U:2, F:4, BI:2, BA:1, D:1, S:1, T:3, O:2, E:1, C:1)
--   Stage 5 (운영): 16 tasks (M:3, F:2, BA:2, D:2, S:2, T:1, O:2, E:1, C:1)
--   총: 66개 Task
--
-- 실행 순서:
--   1. template/supabase/schema.sql 먼저 실행 (테이블 생성)
--   2. 이 파일 실행 (데이터 삽입)
-- ================================================================
