# Order Sheet - S0-5 Task Instructions 작성

> **버전**: 5.4
> **단계**: S0-5 (Task Instructions 작성)
> **목적**: SAL Grid 각 Task의 상세 작업 지시서 작성

---

# PART A: 표준 내용

## A1. AI 준수 사항

**AI가 반드시 지켜야 할 사항:**

1. 이 Order Sheet를 100% 이해할 때까지 작업 시작 금지
2. 규칙 파일(`.claude/rules/`) 확인 전 파일 생성/저장 금지
3. 불명확한 점은 추측 금지, 반드시 질문
4. 작업 순서 (A3 참조) 건너뛰거나 변경 금지
5. 거짓 기록 절대 금지

---

## A2. 작업 내용

**수행할 작업:**

1. Task Plan 확인
   - SSALWORKS_TASK_PLAN.md 읽기
   - Stage별 Task 목록 파악
   - Task 간 Dependencies 확인

2. Task Instruction 작성
   - 각 Task별 상세 작업 내용 정의
   - 수행 범위 및 한계 명시
   - 생성할 파일 목록 정의
   - 사용할 도구 (Skills/Subagents/Commands) 명시

3. Task Instruction 검증
   - Task Plan과 일치 여부 확인
   - 누락된 Task 없는지 확인

---

## A3. AI 작업 순서 (5단계)

### 1단계: Order Sheet 완전 이해

**체크리스트**:
- [ ] A2 작업 내용 확인
- [ ] A4 산출물 확인
- [ ] PART_B 특별 지시사항/참고사항 확인

**출력**: `'Order Sheet 확인 완료. 단계: S0-5'`

---

### 2단계: 문의사항 질문

**질문 형식**:
```
[S0-5] 질문: {내용}
옵션 A: {옵션1}
옵션 B: {옵션2}
```

**출력**: 질문 목록 또는 `'질문 없음'`

---

### 3단계: 실행 (Execution)

**체크리스트**:
- [ ] A2 작업 내용 순서대로 수행
- [ ] A4 산출물 생성 및 해당 경로에 저장

---

### 4단계: 검증 (Verification)

**체크리스트**:
- [ ] 모든 Task에 대한 Instruction 파일 존재?
- [ ] Task Plan과 일치?

**출력**: `'검증 완료'`

---

### 5단계: 완료 보고 (Report)

**보고서 생성**:
- 파일명: `S0-5_completion_report.md`
- 저장 위치: `Web_ClaudeCode_Bridge/Outbox/`

**보고 내용**:
- 완료된 작업 요약
- 생성된 파일 목록 및 저장 위치
- 다음 단계 안내

---

## A4. 산출물

| 산출물 | 저장 위치 |
|--------|----------|
| Task Instruction 파일들 | `S0_Project-SAL-Grid_생성/sal-grid/task-instructions/` |
| 완료 보고서 | `Web_ClaudeCode_Bridge/Outbox/` |

---

## A5. 참조 문서

| 항목 | 위치 |
|------|------|
| 규칙 파일 | `.claude/rules/` |
| Task Plan | `S0_Project-SAL-Grid_생성/sal-grid/SSALWORKS_TASK_PLAN.md` |
| Grid Manual | `S0_Project-SAL-Grid_생성/manual/PROJECT_SAL_GRID_MANUAL.md` |

---

# PART B: 프로젝트별 추가 내용

## B1. 특별 지시사항

> 이번 Order에만 적용되는 특별한 지시 (없으면 비워둠)

(없음)

---

## B2. 참고사항

> AI가 작업과 관련하여 알아야 할 배경 정보 등 (없으면 비워둠)

- Task Instruction은 AI가 작업 시 참조하는 핵심 문서
- 명확하고 구체적으로 작성 필요

---

> 본 Order Sheet는 템플릿입니다. Project Owner가 프로젝트에 맞게 자유롭게 수정할 수 있습니다.
