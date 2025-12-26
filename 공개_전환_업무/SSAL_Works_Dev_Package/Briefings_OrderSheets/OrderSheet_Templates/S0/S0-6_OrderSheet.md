# Order Sheet - S0-6 Verification Instructions 작성

> **버전**: 5.4
> **단계**: S0-6 (Verification Instructions 작성)
> **목적**: SAL Grid 각 Task의 검증 지시서 작성

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

1. Task Instruction 확인
   - 각 Task의 작업 내용 파악
   - 생성될 산출물 확인

2. Verification Instruction 작성
   - 각 Task별 검증 기준 정의
   - 확인할 체크리스트 작성
   - 통과/실패 기준 명시
   - 실패 시 조치사항 정의

3. 검증자 분리 원칙 적용
   - Task Agent ≠ Verification Agent
   - 독립적 검증 가능하도록 작성

---

## A3. AI 작업 순서 (5단계)

### 1단계: Order Sheet 완전 이해

**체크리스트**:
- [ ] A2 작업 내용 확인
- [ ] A4 산출물 확인
- [ ] PART_B 특별 지시사항/참고사항 확인

**출력**: `'Order Sheet 확인 완료. 단계: S0-6'`

---

### 2단계: 문의사항 질문

**질문 형식**:
```
[S0-6] 질문: {내용}
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
- [ ] 모든 Task에 대한 Verification Instruction 파일 존재?
- [ ] Task Instruction과 대응?

**출력**: `'검증 완료'`

---

### 5단계: 완료 보고 (Report)

**보고서 생성**:
- 파일명: `S0-6_completion_report.md`
- 저장 위치: `Web_ClaudeCode_Bridge/Outbox/`

**보고 내용**:
- 완료된 작업 요약
- 생성된 파일 목록 및 저장 위치
- 다음 단계 안내

---

## A4. 산출물

| 산출물 | 저장 위치 |
|--------|----------|
| Verification Instruction 파일들 | `S0_Project-SAL-Grid_생성/sal-grid/verification-instructions/` |
| 완료 보고서 | `Web_ClaudeCode_Bridge/Outbox/` |

---

## A5. 참조 문서

| 항목 | 위치 |
|------|------|
| 규칙 파일 | `.claude/rules/` |
| Task Instructions | `S0_Project-SAL-Grid_생성/sal-grid/task-instructions/` |
| Grid Manual | `S0_Project-SAL-Grid_생성/manual/PROJECT_SAL_GRID_MANUAL.md` |

---

# PART B: 프로젝트별 추가 내용

## B1. 특별 지시사항

> 이번 Order에만 적용되는 특별한 지시 (없으면 비워둠)

(없음)

---

## B2. 참고사항

> AI가 작업과 관련하여 알아야 할 배경 정보 등 (없으면 비워둠)

- Verification은 Task 작성자와 다른 Agent가 수행 (분리 원칙)
- 독립적으로 검증 가능하도록 명확히 작성

---

> 본 Order Sheet는 템플릿입니다. Project Owner가 프로젝트에 맞게 자유롭게 수정할 수 있습니다.
