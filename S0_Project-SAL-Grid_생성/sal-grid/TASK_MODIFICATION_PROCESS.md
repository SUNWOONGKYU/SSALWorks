# Task 수정 프로세스 (5단계 연쇄 동기화)

> **작성일**: 2025-12-19
> **목적**: Task 수정 시 모든 관련 파일의 일관성 유지

---

## 개요

Task 내용이 수정되면 **5단계 연쇄 동기화**가 필요합니다.
한 곳만 수정하면 데이터 불일치가 발생합니다.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     Task 수정 5단계 연쇄 동기화                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   1️⃣ Task Plan 수정                                                     │
│       │                                                                 │
│       ▼                                                                 │
│   2️⃣ Task Instruction 수정                                              │
│       │                                                                 │
│       ▼                                                                 │
│   3️⃣ SSAL Grid (Seed SQL / DB) 수정                                     │
│       │                                                                 │
│       ▼                                                                 │
│   4️⃣ Verification Instruction 수정                                      │
│       │                                                                 │
│       ▼                                                                 │
│   5️⃣ Stage 안내문 / Order Sheet 수정                                    │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 1단계: Task Plan 수정

**파일**: `S0_Project-SSAL-Grid_생성/ssal-grid/SSALWORKS_TASK_PLAN.md`

**수정 항목**:
- Task ID
- Task명
- 설명
- 의존성
- Stage별 Task 목록 테이블
- Area별 분포 테이블
- 의존성 다이어그램
- 변경 이력 (맨 아래)

**체크리스트**:
- [ ] Task 정의 테이블 수정
- [ ] Stage 요약 Task 수 업데이트
- [ ] Area별 분포 표 업데이트
- [ ] 의존성 다이어그램 수정
- [ ] 변경 이력에 버전/날짜/내용 추가

---

## 2단계: Task Instruction 수정

**파일**: `S0_Project-SSAL-Grid_생성/ssal-grid/task-instructions/{TaskID}_instruction.md`

**수정 항목**:
```markdown
## Task ID
## Task Name           ← Task Plan과 일치
## Task Goal           ← Task Plan 설명과 일치
## Prerequisites       ← Task Plan 의존성과 일치
## Specific Instructions
## Expected Output Files
## Completion Criteria
## Tech Stack
## Tools
## Execution Type
## Remarks
```

**체크리스트**:
- [ ] Task Name이 Task Plan과 일치
- [ ] Task Goal이 Task Plan 설명과 일치
- [ ] Prerequisites가 Task Plan 의존성과 일치
- [ ] Specific Instructions가 실제 작업 내용 반영
- [ ] Expected Output Files가 명확
- [ ] Completion Criteria가 검증 가능

---

## 3단계: SSAL Grid (Seed SQL / DB) 수정

**파일**: `S0_Project-SSAL-Grid_생성/supabase/seed_ssalworks_tasks.sql`

**수정 항목 (22개 속성 중 관련 항목)**:
```sql
-- Basic Info
stage,                    -- Stage 번호
area,                     -- Area 코드
task_id,                  -- Task ID
task_name,                -- Task명 (Task Plan과 일치)

-- Task Definition
task_instruction,         -- Instruction 파일 경로
task_agent,               -- 담당 에이전트
tools,                    -- 사용 도구
execution_type,           -- 실행 유형
dependencies,             -- 의존성 (Task Plan과 일치)

-- Verification Definition
verification_instruction, -- Verification 파일 경로
verification_agent        -- 검증 에이전트
```

**체크리스트**:
- [ ] task_name이 Task Plan과 일치
- [ ] dependencies가 Task Plan과 일치
- [ ] task_instruction 경로가 실제 파일과 일치
- [ ] verification_instruction 경로가 실제 파일과 일치
- [ ] task_agent가 Area에 적합
- [ ] tools가 실제 필요 도구 반영

**DB 동기화**:
```bash
# Seed SQL 수정 후 DB에 반영
node sync_task_results_to_db.js
```

---

## 4단계: Verification Instruction 수정

**파일**: `S0_Project-SSAL-Grid_생성/ssal-grid/verification-instructions/{TaskID}_verification.md`

**수정 항목**:
```markdown
## Task ID
## Task Name           ← Task Plan과 일치
## Verification Goal   ← Task Goal에 대한 검증 목표
## Verification Criteria
### Test Criteria      ← Task 내용에 맞는 테스트 기준
### Build Criteria     ← 빌드 검증 기준
### Integration Criteria ← 통합 검증 기준
## Verification Steps
## Pass/Fail Criteria
## Remarks
```

**체크리스트**:
- [ ] Task Name이 Task Plan과 일치
- [ ] Verification Criteria가 Task Instruction의 Completion Criteria와 대응
- [ ] Test Criteria가 실제 Task 내용 검증 가능
- [ ] Integration Criteria가 의존성 체인 검증

---

## 5단계: Stage 안내문 / Order Sheet 수정

### 5-1. Stage 안내문

**파일**: `P2_프로젝트_기획/User_Flows/Order_Sheet_템플릿/{Stage}/*_안내문.md`

**수정 항목**:
- Stage 개요
- 포함된 Task 목록
- Task별 설명
- 실행 순서
- 의존성 관계

**체크리스트**:
- [ ] Stage에 포함된 Task 목록이 Task Plan과 일치
- [ ] Task별 설명이 Task Plan과 일치
- [ ] 실행 순서가 의존성 반영

### 5-2. Order Sheet 템플릿

**파일**: `Human_ClaudeCode_Bridge/Orders/*.json` 또는 관련 템플릿

**수정 항목**:
- Task ID
- Task Name
- 작업 지시 내용
- 의존성 정보
- 참조 규칙 파일

**체크리스트**:
- [ ] Task ID/Name이 Task Plan과 일치
- [ ] 작업 지시가 Task Instruction과 일치
- [ ] 의존성이 Task Plan과 일치

---

## 수정 유형별 영향 범위

### A. Task 추가 (새 Task)

| 단계 | 작업 | 파일 |
|------|------|------|
| 1 | Task Plan에 추가 | SSALWORKS_TASK_PLAN.md |
| 2 | Instruction 파일 생성 | task-instructions/{ID}_instruction.md |
| 3 | Seed SQL에 INSERT 추가 | seed_ssalworks_tasks.sql |
| 4 | Verification 파일 생성 | verification-instructions/{ID}_verification.md |
| 5 | 안내문에 Task 추가 | Order_Sheet_템플릿/{Stage}/*_안내문.md |

### B. Task 수정 (내용 변경)

| 단계 | 작업 | 파일 |
|------|------|------|
| 1 | Task Plan 수정 | SSALWORKS_TASK_PLAN.md |
| 2 | Instruction 내용 수정 | task-instructions/{ID}_instruction.md |
| 3 | Seed SQL UPDATE | seed_ssalworks_tasks.sql |
| 4 | Verification 내용 수정 | verification-instructions/{ID}_verification.md |
| 5 | 안내문 내용 수정 | Order_Sheet_템플릿/{Stage}/*_안내문.md |

### C. Task 삭제

| 단계 | 작업 | 파일 |
|------|------|------|
| 1 | Task Plan에서 제거 | SSALWORKS_TASK_PLAN.md |
| 2 | Instruction 파일 삭제 | task-instructions/{ID}_instruction.md |
| 3 | Seed SQL에서 DELETE | seed_ssalworks_tasks.sql |
| 4 | Verification 파일 삭제 | verification-instructions/{ID}_verification.md |
| 5 | 안내문에서 Task 제거 | Order_Sheet_템플릿/{Stage}/*_안내문.md |

### D. Stage 이동 (Task를 다른 Stage로)

| 단계 | 작업 | 파일 |
|------|------|------|
| 1 | Task Plan에서 Stage 변경 | SSALWORKS_TASK_PLAN.md |
| 2 | Instruction에서 Task ID 변경 | 파일명 및 내용 |
| 3 | Seed SQL에서 stage, task_id 변경 | seed_ssalworks_tasks.sql |
| 4 | Verification 파일명/내용 변경 | verification-instructions/ |
| 5 | 이전 Stage 안내문에서 제거, 새 Stage 안내문에 추가 | 양쪽 안내문 |

---

## 자동화 스크립트 (권장)

### validate_task_consistency.js

```javascript
// 모든 소스 간 Task Name/ID 일치 여부 검증
// Task Plan vs Instruction vs Seed SQL vs Verification

// 실행: node validate_task_consistency.js
// 출력: 불일치 목록 및 수정 필요 항목
```

### sync_all_tasks.js

```javascript
// Task Plan을 마스터로 하여 모든 파일 동기화
// 1. Task Plan 읽기
// 2. Instruction 파일 생성/수정
// 3. Seed SQL 생성
// 4. Verification 파일 생성/수정

// 실행: node sync_all_tasks.js
```

---

## 체크리스트 요약

Task 수정 완료 전 확인:

- [ ] **1단계**: Task Plan 수정 완료
- [ ] **2단계**: Task Instruction 수정 완료
- [ ] **3단계**: Seed SQL 수정 및 DB 동기화 완료
- [ ] **4단계**: Verification Instruction 수정 완료
- [ ] **5단계**: Stage 안내문 / Order Sheet 수정 완료
- [ ] **검증**: 모든 소스 간 일관성 확인

---

## 단일 진실 원천 (Single Source of Truth)

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   📌 MASTER: SSALWORKS_TASK_PLAN.md                             │
│                                                                 │
│   모든 수정은 Task Plan에서 시작하여 아래로 전파:               │
│                                                                 │
│   Task Plan (Master)                                            │
│       ↓                                                         │
│   Task Instruction (파생)                                       │
│       ↓                                                         │
│   Seed SQL / DB (파생)                                          │
│       ↓                                                         │
│   Verification Instruction (파생)                               │
│       ↓                                                         │
│   Stage 안내문 / Order Sheet (파생)                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

**문서 끝**
