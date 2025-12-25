-- ================================================================
-- PROJECT SAL GRID - Schema v4.1
-- 상태값 확장 및 프로세스 명확화
-- 생성일: 2025-12-20
-- ================================================================
--
-- 변경 사항:
--   1. task_status 값 확장: Pending → In Progress → Executed → Completed
--   2. verification_status 값 확장: Not Verified → In Review → Needs Fix → Verified
--   3. verification_fixes_required 필드 추가
--
-- ================================================================

-- ================================================================
-- 1. 새 필드 추가
-- ================================================================

-- 검증 중 수정 필요 여부
ALTER TABLE ssalworks_tasks
ADD COLUMN IF NOT EXISTS verification_fixes_required BOOLEAN DEFAULT false;

-- 템플릿 테이블에도 동일 적용
ALTER TABLE project_ssal_grid_tasks_template
ADD COLUMN IF NOT EXISTS verification_fixes_required BOOLEAN DEFAULT false;

COMMENT ON COLUMN ssalworks_tasks.verification_fixes_required IS
'검증 과정에서 수정이 필요한지 여부. Needs Fix 상태일 때 true';

-- ================================================================
-- 2. task_status 값 정의 (기존 CHECK 제약 제거 후 재생성)
-- ================================================================

-- 기존 제약 조건 확인 및 제거 (있는 경우)
-- PostgreSQL에서는 ALTER TABLE ... DROP CONSTRAINT IF EXISTS 사용

-- task_status 허용 값:
--   Pending      : 아직 시작 안 함
--   In Progress  : 작업 진행 중 (파일 생성 중)
--   Executed     : 파일 생성 완료, 검증 대기
--   Completed    : 모든 과정 완료 (검증 통과 + 수정 반영)

-- ================================================================
-- 3. verification_status 값 정의
-- ================================================================

-- verification_status 허용 값:
--   Not Verified : 검증 시작 전
--   In Review    : 검증 진행 중
--   Needs Fix    : 검증 결과 수정 필요
--   Verified     : 검증 통과

-- ================================================================
-- 4. 상태 전이 규칙 (주석으로 문서화)
-- ================================================================

/*
┌──────────────────────────────────────────────────────────────────┐
│                      Task 완료 프로세스                            │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  [Task Execution]                                                │
│  Pending → In Progress → Executed                                │
│                              ↓                                   │
│  [Verification]         검증 시작                                 │
│                              ↓                                   │
│                    verification_status = In Review               │
│                              ↓                                   │
│                    ┌─────────┴─────────┐                         │
│                    ↓                   ↓                         │
│              이슈 없음              이슈 발견                      │
│                    ↓                   ↓                         │
│            Verified            Needs Fix                         │
│                    ↓           (fixes_required=true)             │
│                    ↓                   ↓                         │
│                    ↓              수정 진행                       │
│                    ↓                   ↓                         │
│                    ↓              수정 완료                       │
│                    ↓                   ↓                         │
│                    ↓              재검증                          │
│                    ↓                   ↓                         │
│                    ↓              Verified                       │
│                    ↓           (fixes_required=false)            │
│                    ↓                   ↓                         │
│                    └─────────┬─────────┘                         │
│                              ↓                                   │
│  [Completion]         task_status = Completed                    │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘

상태 조합표:
┌─────────────────┬──────────────────┬───────────────────┬─────────────┐
│ task_status     │ verification_    │ fixes_required    │ 의미        │
│                 │ status           │                   │             │
├─────────────────┼──────────────────┼───────────────────┼─────────────┤
│ Pending         │ Not Verified     │ false             │ 시작 전      │
│ In Progress     │ Not Verified     │ false             │ 작업 중      │
│ Executed        │ Not Verified     │ false             │ 파일 완료    │
│ Executed        │ In Review        │ false             │ 검증 중      │
│ Executed        │ Needs Fix        │ true              │ 수정 필요    │
│ Executed        │ Verified         │ false             │ 검증 통과    │
│ Completed       │ Verified         │ false             │ 최종 완료    │
└─────────────────┴──────────────────┴───────────────────┴─────────────┘

*/

-- ================================================================
-- 5. 상태 전이 함수 (선택적 - 상태 변경 시 규칙 적용)
-- ================================================================

CREATE OR REPLACE FUNCTION check_task_status_transition()
RETURNS TRIGGER AS $$
BEGIN
    -- Completed로 변경하려면 verification_status가 Verified여야 함
    IF NEW.task_status = 'Completed' AND NEW.verification_status != 'Verified' THEN
        RAISE EXCEPTION 'Cannot set task_status to Completed unless verification_status is Verified';
    END IF;

    -- Executed로 변경하려면 In Progress 상태여야 함 (또는 Executed 유지)
    -- (이 규칙은 선택적으로 활성화)

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 트리거 생성 (선택적)
DROP TRIGGER IF EXISTS check_task_status ON ssalworks_tasks;
CREATE TRIGGER check_task_status
    BEFORE UPDATE ON ssalworks_tasks
    FOR EACH ROW
    EXECUTE FUNCTION check_task_status_transition();

-- ================================================================
-- 6. 뷰: Task 진행 상황 요약
-- ================================================================

CREATE OR REPLACE VIEW task_progress_summary AS
SELECT
    stage,
    task_status,
    verification_status,
    verification_fixes_required,
    COUNT(*) as count
FROM ssalworks_tasks
GROUP BY stage, task_status, verification_status, verification_fixes_required
ORDER BY stage, task_status, verification_status;

-- ================================================================
-- 완료!
-- ================================================================
--
-- 실행 방법:
--   Supabase SQL Editor에서 이 파일 전체 실행
--
-- 주의사항:
--   - 기존 Completed 상태의 Task는 그대로 유지됨
--   - 새로운 Task부터 Executed → Completed 프로세스 적용
--
-- ================================================================
