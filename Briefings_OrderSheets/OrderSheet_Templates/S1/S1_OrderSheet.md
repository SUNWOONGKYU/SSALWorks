# Order Sheet - S1 개발 준비

> **버전**: 5.4
> **Stage**: S1 (개발 준비)
> **목적**: S1 개발 준비 전체 Task 실행 및 검증

---

# PART A: 표준 내용

## A1. AI 준수 사항

**AI가 반드시 지켜야 할 사항:**

1. 이 Order Sheet를 100% 이해할 때까지 작업 시작 금지
2. 4개 소스(Order Sheet / Task Instruction / Task Plan / SAL Grid) 일치 확인 전 작업 금지
3. 규칙 파일(`.claude/rules/`) 확인 전 파일 생성/저장 금지
4. 불명확한 점은 추측 금지, 반드시 질문
5. 7단계 작업 순서 (A3 참조) 건너뛰거나 변경 금지
6. 거짓 기록 절대 금지
7. **Main Agent는 Task 직접 수행 금지** - 반드시 Task Agent 서브에이전트 투입
8. **Main Agent는 검증 직접 수행 금지** - 반드시 Verification Agent 서브에이전트 투입
9. **Task Agent ≠ Verification Agent** - 작성자와 검증자 분리 필수

---

## A2. 작업 내용

**이 Order Sheet의 작업:**

Project SAL Grid의 S1에 있는 모든 Task를 수행하라.

**Project SAL Grid란:**
- 위치: Supabase `project_sal_grid` 테이블
- Task Instruction: `S0_Project-SAL-Grid_생성/sal-grid/task-instructions/`
- Verification Instruction: `S0_Project-SAL-Grid_생성/sal-grid/verification-instructions/`

---

## A3. AI 작업 순서 (7단계)

### 1단계: Order Sheet 완전 이해

**목적**: Order Sheet의 모든 내용을 100% 파악

**체크리스트**:
- [ ] 1-1. ORDER_SHEET 확인 → Stage, 목적 파악
- [ ] 1-2. PART_B 특별 지시사항 확인
- [ ] 1-3. PART_B 참고사항 확인

**출력**: `'Order Sheet 확인 완료. Stage: S1, Task: {N}개'`

---

### 2단계: 4개 소스 일관성 검증

**목적**: Order Sheet, Task Instruction, Task Plan, SAL Grid 일치 확인

**4개 소스**:
| 소스 | 위치 |
|------|------|
| Order Sheet | 이 파일 |
| Task Instruction | A6 참조 |
| Task Plan | A6 참조 |
| SAL Grid | A6 참조 |

**체크리스트**:
- [ ] 2-1. Task 개수 일치?
- [ ] 2-2. Task ID 일치?
- [ ] 2-3. Task Name 일치?
- [ ] 2-4. Dependencies 일치?
- [ ] 2-5. Instruction 파일 존재?

**불일치 시**: PO에게 보고 후 수정 지시 대기

**출력**: `'일관성 검증 완료. 불일치: {0/N}개'`

---

### 3단계: 작업 규칙 확인

**목적**: 작업 수행 전 규칙 파일 확인

**규칙 파일 위치**: `.claude/rules/`

| 규칙 파일 | 적용 시점 |
|----------|----------|
| 01_file-naming.md | 파일 생성 시 |
| **02_save-location.md** | **파일 저장 시 (필독!)** |
| 03_area-stage.md | 폴더 선택 시 |
| 04_grid-writing-supabase.md | Grid 업데이트 시 |
| 05_execution-process.md | Task 실행 시 |
| 06_verification.md | 검증 시 |
| 07_task-crud.md | Task 추가/삭제/수정 시 |

**필수 확인**: `02_save-location.md`, `05_execution-process.md`

**출력**: `'규칙 확인 완료'`

---

### 4단계: 문의사항 질문

**목적**: 불명확한 점 해소

**질문할 상황**:
- Task Instruction이 불명확할 때
- 여러 해석이 가능할 때
- 기술적 결정이 필요할 때
- 파일 저장 위치가 불분명할 때

**질문 형식**:
```
[{Task ID}] 질문: {내용}
옵션 A: {옵션1}
옵션 B: {옵션2}
```

**금지 사항**: 추측 진행, 임의 결정, 애매하면 일단 진행

**출력**: 질문 목록 또는 `'질문 없음'`

---

### 5단계: 실행

**목적**: Task 순서대로 실행 및 검증

**⛔ Main Agent 역할 제한**:
- Main Agent는 **오케스트레이션만** 수행
- Main Agent는 **직접 작업/검증 금지**
- 반드시 **Task tool로 서브에이전트 투입**

**실행 순서**:
1. Dependencies 기반 Task 순서 결정 (SAL Grid 참조)
2. 각 Task: 서브에이전트 투입 → 검증 → SAL Grid에 기록 → 파일 저장

**Task별 실행 순서**:

1. Task Instruction (A6 참조) 읽기
2. task_status → `In Progress` 변경
3. **Task Agent 서브에이전트 투입** (Task tool 사용)
   ```
   Task tool 호출:
   - subagent_type: Task Instruction의 task_agent 값
   - prompt: Task Instruction 내용 전달
   ```
4. 작업 완료 확인 → task_status → `Executed` 변경
5. **Verification Agent 서브에이전트 투입** (Task tool 사용)
   ```
   Task tool 호출:
   - subagent_type: Task Instruction의 verification_agent 값
   - prompt: Verification Instruction 내용 전달
   ```
6. 검증 통과 확인 → verification_status → `Verified`, task_status → `Completed` 변경
7. SAL Grid에 기록 (A4 참조)
8. 파일 저장 (A5 참조)

**⛔ 절대 금지**:
- Main Agent가 직접 코드 작성
- Main Agent가 직접 검증 수행
- Task Agent = Verification Agent (같은 에이전트 금지)

**출력**: 각 Task SAL Grid에 기록

---

### 6단계: Stage Gate 검증

**목적**: Stage 전체 완료 여부 최종 확인

**검증 항목**:
- [ ] Stage 내 모든 Task verification_status = Verified
- [ ] 전체 빌드 통과
- [ ] 전체 테스트 통과
- [ ] 미해결 Blocker 없음

**리포트 저장 위치**: `S0_Project-SAL-Grid_생성/sal-grid/stage-gates/S1GATE_verification_report.md`

**출력**: Stage Gate 검증 리포트 + PO 테스트 가이드

---

### 7단계: PO 승인 대기

**목적**: PO가 테스트 후 최종 승인

**PO 수행 항목**:
- AI 검증 리포트 검토
- 테스트 가이드 따라 직접 테스트
- 기능 정상 작동 확인

**출력**: 승인 → 다음 Stage 진행 / 거부 → 수정 후 재검증

---

## A4. SAL Grid 기록 규칙

| 상태 | task_status | verification_status | task_progress |
|------|-------------|---------------------|---------------|
| 초기 | Pending | Not Verified | 0 |
| 작업 시작 | In Progress | - | 0~99 |
| 작업 완료 (검증 전) | Executed | - | 100 |
| 검증 완료 | Completed | Verified | 100 |

**상태 전이**: `Executed + Verified → Completed`

---

## A5. 파일 저장 규칙

**규칙 1**: `S1_개발_준비/{Area}/` 폴더에 저장

**규칙 2**: F, BA, D, BI 코드는 두 곳에 저장
- Production/ (배포용)
- S1_개발_준비/ (개발작업 기록용)

**규칙 3**: 저장 전 `02_save-location.md` 반드시 확인

**Area 매핑**:
| Area 코드 | 폴더명 |
|-----------|--------|
| M | Documentation |
| F | Frontend |
| BI | Backend_Infra |
| BA | Backend_APIs |
| D | Database |
| S | Security |
| T | Testing |
| O | DevOps |

---

## A6. 참조 문서

| 항목 | 위치 |
|------|------|
| 규칙 파일 | `.claude/rules/` |
| Task Plan | `S0_Project-SAL-Grid_생성/sal-grid/SSALWORKS_TASK_PLAN.md` |
| Task Instruction | `S0_Project-SAL-Grid_생성/sal-grid/task-instructions/` |
| Verification Instruction | `S0_Project-SAL-Grid_생성/sal-grid/verification-instructions/` |
| Grid Manual | `S0_Project-SAL-Grid_생성/manual/PROJECT_SAL_GRID_MANUAL.md` |
| SAL Grid | Supabase `project_sal_grid` 테이블 |

---

# PART B: 프로젝트별 추가 내용

## B1. 특별 지시사항

> 이번 Order에만 적용되는 특별한 지시 (없으면 비워둠)

(없음)

---

## B2. 참고사항

> AI가 작업과 관련하여 알아야 할 배경 정보 등 참고사항 (없으면 비워둠)

(없음)

---

> 본 Order Sheet는 템플릿입니다. Project Owner가 프로젝트에 맞게 자유롭게 수정할 수 있습니다.
