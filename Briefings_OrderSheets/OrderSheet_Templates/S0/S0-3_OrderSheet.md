# Order Sheet - Method

> **버전**: 5.4
> **단계**: S0-3 (Method)
> **목적**: SAL Grid 데이터 저장 방식 선택 및 설정

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

1. Method 선택
   - 두 가지 방식 설명 (Database vs CSV)
   - 프로젝트 환경에 맞는 방식 선택
   - PO에게 선택 확인

2. (Database Method 선택 시)
   - schema.sql 작성
   - RLS 정책 설정
   - Seed 데이터 작성
   - PO에게 SQL 실행 가이드 제공

3. (CSV Method 선택 시)
   - project_sal_grid.json 설정
   - JSON 파일 구조 확인
   - 데이터 입력 방법 안내

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

**필수 질문 (PO에게):**
```
[S0-3] 질문: SAL Grid 데이터 저장 방식을 선택해주세요.

옵션 A: Database Method (Supabase)
- 실시간 동기화
- 다중 사용자 지원
- Supabase 설정 필요

옵션 B: CSV Method (JSON 파일)
- 외부 의존성 없음
- 독립 실행 가능
- 개인/오프라인 프로젝트에 적합
```

**출력**: PO 선택 결과

---

### 3단계: 실행 (Execution)

**Database Method 선택 시:**
- [ ] schema.sql 작성
- [ ] triggers.sql 작성 (상태 검증)
- [ ] rls_policies.sql 작성
- [ ] seed_project_sal_grid.sql 작성
- [ ] PO SQL 실행 가이드 제공

**CSV Method 선택 시:**
- [ ] project_sal_grid.json 확인
- [ ] JSON 구조 검증
- [ ] 사용 방법 안내

---

### 4단계: 검증 (Verification)

**Database Method:**
- [ ] SQL 문법이 정확한가?
- [ ] 22개 속성이 모두 저장 가능한가?
- [ ] PO가 SQL 실행 가이드를 받았는가?

**CSV Method:**
- [ ] JSON 파일 구조가 올바른가?
- [ ] Task 데이터가 정상적으로 로드되는가?

**출력**: `'검증 완료'`

---

### 5단계: 완료 보고 (Report)

**보고서 생성**:
- 파일명: `S0-3_completion_report.md`
- 저장 위치: `Human_ClaudeCode_Bridge/Reports/`

**보고 내용**:
- 선택된 Method
- 설정 완료 사항
- 다음 단계 안내 (S0-4 Viewer)

---

## A4. 산출물

| 산출물 | 저장 위치 |
|--------|----------|
| (DB) SQL 파일들 | `S0_Project-SAL-Grid_생성/method/database/` |
| (CSV) JSON 파일 | `S0_Project-SAL-Grid_생성/CSV_Method/data/` |
| 완료 보고서 | `Human_ClaudeCode_Bridge/Reports/` |

---

## A5. 참조 문서

| 항목 | 위치 |
|------|------|
| 규칙 파일 | `.claude/rules/04_grid-writing-supabase.md` |
| S0-2 결과물 | `S0_Project-SAL-Grid_생성/sal-grid/` |
| Briefing | `Briefings_OrderSheets/Briefings/S0/S0-3_Briefing.md` |

---

# PART B: 프로젝트별 추가 내용

## B1. 특별 지시사항

**두 가지 Method 비교:**

| 항목 | Database Method | CSV Method |
|------|----------------|------------|
| 저장소 | Supabase (PostgreSQL) | JSON 파일 |
| 동기화 | 실시간 | 파일 저장 시 |
| 다중 사용자 | 지원 | 미지원 |
| 외부 의존성 | Supabase 필요 | 없음 (독립 실행) |
| 권장 상황 | 팀 프로젝트 | 개인/오프라인 |

---

## B2. 참고사항

**Database Method 파일 구조:**
```
S0_Project-SAL-Grid_생성/
└── method/
    └── database/
        ├── schema.sql
        ├── triggers.sql
        └── rls_policies.sql
```

**CSV Method 파일 구조:**
```
S0_Project-SAL-Grid_생성/
└── CSV_Method/
    ├── data/
    │   └── project_sal_grid.json
    ├── scripts/
    └── templates/
```

**S0-3 완료 후:**
- S0-4 (Viewer) 진행

---

> 본 Order Sheet는 템플릿입니다. Project Owner가 프로젝트에 맞게 자유롭게 수정할 수 있습니다.
