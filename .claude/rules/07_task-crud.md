# Task 추가/삭제/수정 프로세스

> Task 추가, 삭제, 수정 시 반드시 아래 **6개 위치**를 모두 업데이트해야 함
>
> **업데이트 필수 위치:**
> 1. Supabase DB (`ssalworks_tasks` 테이블)
> 2. Task Instruction 파일
> 3. Verification Instruction 파일
> 4. SSALWORKS_TASK_PLAN.md
> 5. PROJECT_SAL_GRID_MANUAL.md (버전 이력)
> 6. 작업 로그 (work_logs/current.md)

---

## Task 신규 추가 프로세스

### Step 1: Task ID 결정

```
형식: S[Stage][Area][번호]
예시: S4F5 = Stage 4 + Frontend + 5번째
```

**기존 Task 확인:**
```bash
ls S0_Project-SAL-Grid_생성/sal-grid/task-instructions/ | grep "S4F"
```

### Step 2: Supabase DB 추가

```javascript
// ssalworks_tasks 테이블에 INSERT
const { data, error } = await supabase
    .from('ssalworks_tasks')
    .insert({
        task_id: 'S4F5',
        task_name: 'Task 이름',
        stage: 4,  // integer: 1~5
        area: 'F', // M, U, F, BI, BA, D, S, T, O, E, C
        task_status: 'Pending',
        task_progress: 0,
        dependencies: 'S2BA5',  // 선행 Task ID (없으면 null)
        task_instruction: 'Task 수행 지침 요약',
        task_agent: 'frontend-developer',
        verification_instruction: '검증 지침 요약',
        verification_agent: 'code-reviewer',
        execution_type: 'AI-Only'  // AI-Only, Human-AI, Human-Assisted
    });
```

**Stage 번호:**
| Stage | 번호 |
|-------|------|
| S1 | 1 |
| S2 | 2 |
| S3 | 3 |
| S4 | 4 |
| S5 | 5 |

### Step 3: Task Instruction 파일 생성

**저장 위치:** `S0_Project-SAL-Grid_생성/sal-grid/task-instructions/{TaskID}_instruction.md`

**템플릿:**
```markdown
# {TaskID}: {Task Name}

## Task 정보
- **Task ID**: {TaskID}
- **Task Name**: {Task Name}
- **Stage**: S{N} ({Stage Name})
- **Area**: {Area Code} ({Area Name})
- **Dependencies**: {선행 Task ID}

## Task 목표

{목표 설명}

## 수정 사항

{구체적인 수정 내용}

## 생성/수정 파일

| 파일 | 변경 내용 |
|------|----------|
| `파일경로` | 변경 설명 |

---

## 필수 참조 규칙

| 규칙 파일 | 내용 | 참조 시점 |
|----------|------|----------|
| `.claude/rules/02_save-location.md` | 저장 위치 규칙 | 파일 저장 시 |
| `.claude/rules/05_execution-process.md` | 6단계 실행 프로세스 | 작업 전체 |
```

### Step 4: Verification Instruction 파일 생성

**저장 위치:** `S0_Project-SAL-Grid_생성/sal-grid/verification-instructions/{TaskID}_verification.md`

**템플릿:**
```markdown
# {TaskID}: {Task Name} - 검증 지침

## 검증 정보
- **Task ID**: {TaskID}
- **Verification Agent**: code-reviewer

## 검증 항목

### 1. 코드 검증
- [ ] 검증 항목 1
- [ ] 검증 항목 2

### 2. 기능 테스트
- [ ] 테스트 항목 1
- [ ] 테스트 항목 2

## 통과 기준

{통과 조건 설명}

---

## 필수 참조 규칙

| 규칙 파일 | 내용 | 참조 시점 |
|----------|------|----------|
| `.claude/rules/06_verification.md` | 검증 기준 | 핵심 참조 |
```

### Step 5: SSALWORKS_TASK_PLAN.md 업데이트

**파일 위치:** `S0_Project-SAL-Grid_생성/sal-grid/SSALWORKS_TASK_PLAN.md`

**업데이트 항목:**
1. **총 Task 수 업데이트**: 헤더의 `총 Task 수` 변경
2. **Stage별 Task 수 표**: 해당 Stage 행 수정
3. **Area별 분포 표**: 해당 Area 열 수정
4. **Stage 섹션**: 해당 Stage의 Area 섹션에 Task 추가
5. **버전 및 수정일**: 버전 증가, 수정일 업데이트
6. **변경 이력 섹션**: 변경 내용 기록

해당 Stage의 Area 섹션에 Task 추가:
```markdown
| S4F5 | Task 이름 | 설명 | 의존성 |
```

변경 이력 추가:
```markdown
### v4.X (YYYY-MM-DD)
- **신규 Task 추가**: {TaskID} ({Task Name})
- **Task 수 변경**: N → N+1 tasks
- **S{N} Task 수**: N → N+1
- **이유**: {추가 이유}
```

### Step 6: PROJECT_SAL_GRID_MANUAL.md 버전 이력 업데이트

**파일 위치:** `S0_Project-SAL-Grid_생성/manual/PROJECT_SAL_GRID_MANUAL.md`

**업데이트 항목:**
1. **헤더 버전**: v3.X → v3.(X+1)
2. **최종 수정일**: 현재 날짜
3. **버전 이력 섹션**: 변경 내용 추가
4. **푸터 버전**: 동일하게 수정

### Step 7: 작업 로그 업데이트

**파일 위치:** `.claude/work_logs/current.md`

작업 내용 기록:
```markdown
## {TaskID} Task 추가 (YYYY-MM-DD)

### 작업 상태: ✅ 완료

### 추가된 Task
| Task ID | Task Name | Area | 설명 |
|---------|-----------|------|------|
| {TaskID} | {Task Name} | {Area} | {설명} |

### 업데이트된 파일
1. Supabase DB
2. task-instructions/{TaskID}_instruction.md
3. verification-instructions/{TaskID}_verification.md
4. SSALWORKS_TASK_PLAN.md
5. PROJECT_SAL_GRID_MANUAL.md
```

### Step 8: Git 커밋 & 푸시

```bash
git add S0_Project-SAL-Grid_생성/sal-grid/task-instructions/{TaskID}_instruction.md
git add S0_Project-SAL-Grid_생성/sal-grid/verification-instructions/{TaskID}_verification.md
git add S0_Project-SAL-Grid_생성/sal-grid/SSALWORKS_TASK_PLAN.md
git add S0_Project-SAL-Grid_생성/manual/PROJECT_SAL_GRID_MANUAL.md
git add .claude/work_logs/current.md
git commit -m "feat: {TaskID} {Task Name} Task 추가"
git push
```

---

## Task 삭제 프로세스

### Step 1: Supabase DB 삭제

```javascript
const { error } = await supabase
    .from('ssalworks_tasks')
    .delete()
    .eq('task_id', 'S4F5');
```

### Step 2: Instruction 파일 삭제

```bash
rm S0_Project-SAL-Grid_생성/sal-grid/task-instructions/{TaskID}_instruction.md
rm S0_Project-SAL-Grid_생성/sal-grid/verification-instructions/{TaskID}_verification.md
```

### Step 3: SSALWORKS_TASK_PLAN.md에서 제거

**업데이트 항목:**
1. **총 Task 수**: 감소
2. **Stage별 Task 수 표**: 해당 Stage 행 수정
3. **Area별 분포 표**: 해당 Area 열 수정
4. **Stage 섹션**: 해당 Task 행 삭제
5. **버전 및 수정일**: 버전 증가, 수정일 업데이트
6. **변경 이력 섹션**: 삭제 내용 기록

### Step 4: PROJECT_SAL_GRID_MANUAL.md 버전 이력 업데이트

버전 이력 섹션에 삭제 내용 기록

### Step 5: 작업 로그 업데이트

`.claude/work_logs/current.md`에 삭제 내용 기록

### Step 6: Git 커밋 & 푸시

```bash
git add -A
git commit -m "chore: {TaskID} Task 삭제"
git push
```

---

## Task 수정 프로세스

> Task 이름, 목표, 설명 등을 변경할 때 사용

### Step 1: 수정 내용 정의

**수정 가능 항목:**
- task_name (Task 이름)
- task_instruction (Task 목표/지침)
- verification_instruction (검증 지침)
- remarks (설명)
- dependencies (의존성)
- task_agent / verification_agent
- execution_type
- tools

### Step 2: Task Instruction 파일 수정

**파일 위치:** `S0_Project-SAL-Grid_생성/sal-grid/task-instructions/{TaskID}_instruction.md`

```bash
# 파일 열어서 내용 수정
# Task Name, Task Goal, Instructions 등 변경
```

### Step 3: Verification Instruction 파일 수정

**파일 위치:** `S0_Project-SAL-Grid_생성/sal-grid/verification-instructions/{TaskID}_verification.md`

```bash
# 검증 목표, 체크리스트 등 변경
```

### Step 4: SSALWORKS_TASK_PLAN.md 업데이트

**파일 위치:** `S0_Project-SAL-Grid_생성/sal-grid/SSALWORKS_TASK_PLAN.md`

**업데이트 항목:**
1. **해당 Task 행**: Task 이름, 설명 변경
2. **의존성 다이어그램**: Task 이름이 변경된 경우 다이어그램도 수정
3. **버전 및 수정일**: 버전 증가, 수정일 업데이트
4. **변경 이력 섹션**: 변경 내용 기록

```bash
# sed 명령어로 일괄 수정 가능
sed -i 's/이전 이름/새 이름/g' SSALWORKS_TASK_PLAN.md
```

변경 이력 추가:
```markdown
### v4.X (YYYY-MM-DD)
- **Task 수정**: {TaskID} "{이전 이름}" → "{새 이름}"
- **변경 내용**: {변경 사항 설명}
- **이유**: {수정 이유}
```

### Step 5: Supabase DB 업데이트

```bash
# curl로 PATCH 요청
curl -X PATCH "https://zwjmfewyshhwpgwdtrus.supabase.co/rest/v1/ssalworks_tasks?task_id=eq.{TaskID}" \
  -H "apikey: {SUPABASE_ANON_KEY}" \
  -H "Authorization: Bearer {SUPABASE_ANON_KEY}" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=representation" \
  -d @update.json
```

**update.json 예시:**
```json
{
  "task_name": "새로운 Task 이름",
  "remarks": "새로운 설명"
}
```

**주의:** 한글이 포함된 JSON은 파일로 저장 후 `@파일명` 방식 사용

### Step 6: PROJECT_SAL_GRID_MANUAL.md 버전 이력 업데이트

**파일 위치:** `S0_Project-SAL-Grid_생성/manual/PROJECT_SAL_GRID_MANUAL.md`

버전 이력 섹션에 수정 내용 기록

### Step 7: 작업 로그 업데이트

**파일 위치:** `.claude/work_logs/current.md`

```markdown
## {TaskID} Task 수정 (YYYY-MM-DD)

### 작업 상태: ✅ 완료

### 수정 내용
| 항목 | 이전 | 이후 |
|------|------|------|
| Task Name | {이전 이름} | {새 이름} |
| 설명 | {이전 설명} | {새 설명} |

### 업데이트된 파일/위치
1. task-instructions/{TaskID}_instruction.md
2. verification-instructions/{TaskID}_verification.md
3. SSALWORKS_TASK_PLAN.md
4. Supabase ssalworks_tasks 테이블
5. PROJECT_SAL_GRID_MANUAL.md
```

### Step 8: Git 커밋 & 푸시

```bash
git add S0_Project-SAL-Grid_생성/sal-grid/task-instructions/{TaskID}_instruction.md
git add S0_Project-SAL-Grid_생성/sal-grid/verification-instructions/{TaskID}_verification.md
git add S0_Project-SAL-Grid_생성/sal-grid/SSALWORKS_TASK_PLAN.md
git add S0_Project-SAL-Grid_생성/manual/PROJECT_SAL_GRID_MANUAL.md
git add .claude/work_logs/current.md
git commit -m "refactor: {TaskID} Task 수정 - {변경 요약}"
git push
```

---

## 체크리스트

### 신규 추가 시

- [ ] Supabase `ssalworks_tasks` 테이블에 INSERT
- [ ] task-instructions/{TaskID}_instruction.md 생성
- [ ] verification-instructions/{TaskID}_verification.md 생성
- [ ] SSALWORKS_TASK_PLAN.md 업데이트 (Task 추가 + 수치 변경 + 변경 이력)
- [ ] PROJECT_SAL_GRID_MANUAL.md 버전 이력 추가
- [ ] .claude/work_logs/current.md 작업 로그 기록
- [ ] Git 커밋 & 푸시

### 삭제 시

- [ ] Supabase `ssalworks_tasks` 테이블에서 DELETE
- [ ] task-instructions/{TaskID}_instruction.md 삭제
- [ ] verification-instructions/{TaskID}_verification.md 삭제
- [ ] SSALWORKS_TASK_PLAN.md 업데이트 (Task 제거 + 수치 변경 + 변경 이력)
- [ ] PROJECT_SAL_GRID_MANUAL.md 버전 이력 추가
- [ ] .claude/work_logs/current.md 작업 로그 기록
- [ ] Git 커밋 & 푸시

### 수정 시

- [ ] task-instructions/{TaskID}_instruction.md 내용 수정
- [ ] verification-instructions/{TaskID}_verification.md 내용 수정
- [ ] SSALWORKS_TASK_PLAN.md 업데이트 (해당 행 수정 + 의존성 다이어그램 + 변경 이력)
- [ ] Supabase `ssalworks_tasks` 테이블 PATCH
- [ ] PROJECT_SAL_GRID_MANUAL.md 버전 이력 추가
- [ ] .claude/work_logs/current.md 작업 로그 기록
- [ ] Git 커밋 & 푸시

---

## 주의사항

1. **6개 위치 모두 수행**: 하나라도 빠지면 불일치 발생
2. **Task ID 중복 금지**: 기존 Task 확인 후 번호 결정
3. **Stage 번호는 integer**: S4 → 4 (문자열 아님)
4. **Order Sheet는 자동 포함**: Grid 참조 방식이므로 별도 수정 불필요
5. **SSALWORKS_TASK_PLAN.md 수치 정확하게**: 총 Task 수, Stage별/Area별 분포 표 모두 업데이트
6. **변경 이력 필수**: Task Plan과 Manual 모두 변경 이력 섹션에 기록

---

## 관련 파일

| 항목 | 위치 |
|------|------|
| Task Instructions | `S0_Project-SAL-Grid_생성/sal-grid/task-instructions/` |
| Verification Instructions | `S0_Project-SAL-Grid_생성/sal-grid/verification-instructions/` |
| Task Plan | `S0_Project-SAL-Grid_생성/sal-grid/SSALWORKS_TASK_PLAN.md` |
| Manual | `S0_Project-SAL-Grid_생성/manual/PROJECT_SAL_GRID_MANUAL.md` |
| 작업 로그 | `.claude/work_logs/current.md` |
| Supabase 테이블 | `ssalworks_tasks` |
| .env 파일 | `P3_프로토타입_제작/Database/.env` |
