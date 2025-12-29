# Order Sheet - Method

> **버전**: 5.4
> **단계**: S0-3 (Method)
> **목적**: SAL Grid 데이터 저장 방식 (CSV Method) 설정

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

1. CSV Method 설정 (기본)
   - project_sal_grid.json 파일 확인
   - JSON 파일 구조 검증
   - 데이터 입력 방법 안내

2. JSON 파일 초기화
   - S0-2에서 생성한 Task 목록을 JSON에 반영
   - 22개 속성 확인
   - 초기 상태값 설정 (Pending, Not Verified)

---

## A3. AI 작업 순서 (5단계)

### 1단계: Order Sheet 완전 이해

**체크리스트**:
- [ ] A2 작업 내용 확인
- [ ] A4 산출물 확인
- [ ] PART_B 특별 지시사항/참고사항 확인

**출력**: `'Order Sheet 확인 완료. 단계: S0-3'`

---

### 2단계: 문의사항 질문

**질문 형식**:
```
[S0-3] 질문: {내용}
옵션 A: {옵션1}
옵션 B: {옵션2}
```

**출력**: 질문 목록 또는 `'질문 없음'`

---

### 3단계: 실행 (Execution)

**체크리스트:**
- [ ] project_sal_grid.json 파일 확인
- [ ] S0-2에서 생성한 Task 목록을 JSON에 반영
- [ ] 22개 속성 구조 검증
- [ ] 초기 상태값 설정 (task_status: Pending, verification_status: Not Verified)
- [ ] 사용 방법 안내

---

### 4단계: 검증 (Verification)

**체크리스트:**
- [ ] JSON 파일 구조가 올바른가?
- [ ] 모든 Task가 JSON에 포함되었는가?
- [ ] 22개 속성이 모두 정의되었는가?
- [ ] 초기 상태값이 올바른가?

**출력**: `'검증 완료'`

---

### 5단계: 완료 보고 (Report)

**보고서 생성**:
- 파일명: `S0-3_completion_report.md`
- 저장 위치: `Human_ClaudeCode_Bridge/Reports/`

**보고 내용**:
- CSV Method 설정 완료
- JSON 파일 초기화 완료
- 다음 단계 안내 (S0-4 Viewer)

---

## A4. 산출물

| 산출물 | 저장 위치 |
|--------|----------|
| project_sal_grid.json | `S0_Project-SAL-Grid_생성/CSV_Method/data/` |
| 완료 보고서 | `Human_ClaudeCode_Bridge/Reports/` |

---

## A5. 참조 문서

| 항목 | 위치 |
|------|------|
| 규칙 파일 | `.claude/rules/` |
| S0-2 결과물 | `S0_Project-SAL-Grid_생성/sal-grid/` |
| Briefing | `Briefings_OrderSheets/Briefings/S0/S0-3_Briefing.md` |

---

# PART B: 프로젝트별 추가 내용

## B1. 특별 지시사항

**CSV Method가 기본입니다.**

외부 서비스 없이 JSON 파일로 Task를 관리합니다.

**JSON 파일 구조:**
```
S0_Project-SAL-Grid_생성/
└── CSV_Method/
    ├── data/
    │   ├── project_sal_grid.json  ← Task 데이터
    │   └── stage_verification.json
    ├── scripts/
    │   └── json-to-csv.js
    └── templates/
        └── template.json
```

---

## B2. 참고사항

**22개 속성 초기값:**
- task_status: `Pending`
- verification_status: `Not Verified`
- task_progress: `0`

**참고: Database Method**

> 팀 프로젝트나 대규모 Task 관리가 필요한 경우 Supabase를 사용할 수 있습니다.
> 자세한 내용은 `S0_Project-SAL-Grid_생성/method/database/` 참조

**S0-3 완료 후:**
- S0-4 (Viewer) 진행

---

> 본 Order Sheet는 템플릿입니다. Project Owner가 프로젝트에 맞게 자유롭게 수정할 수 있습니다.
