# Order Sheet - S0-3 SAL Grid Supabase 연동

> **버전**: 5.4
> **단계**: S0-3 (SAL Grid Supabase)
> **목적**: Project SAL Grid의 Supabase 데이터베이스 연동

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

1. 스키마 작성
   - project_sal_grid 테이블 스키마
   - stage_verification 테이블 스키마
   - 인덱스 및 제약조건

2. RLS 정책 설정
   - 테이블별 접근 권한
   - 인증 기반 접근 제어

3. 동기화 스크립트 작성
   - JSON → DB 동기화
   - DB → JSON 역동기화
   - 자동 업데이트 스크립트

4. Seed 데이터 작성
   - 초기 Task 데이터
   - Stage 정보 데이터

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

**체크리스트**:
- [ ] schema.sql 작성
- [ ] RLS 정책 SQL 작성
- [ ] seed_project_sal_grid.sql 작성
- [ ] 동기화 스크립트 작성 (Node.js)

---

### 4단계: 검증 (Verification)

**체크리스트**:
- [ ] SQL 문법이 정확한가?
- [ ] RLS 정책이 올바르게 설정되었는가?
- [ ] 동기화 스크립트가 정상 동작하는가?
- [ ] 22개 속성이 모두 저장 가능한가?

**출력**: `'검증 완료'`

---

### 5단계: 완료 보고 (Report)

**보고서 생성**:
- 파일명: `S0-3_completion_report.md`
- 저장 위치: `Human_ClaudeCode_Bridge/Reports/`

**보고 내용**:
- 완료된 작업 요약
- 생성된 SQL 파일
- **PO 실행 가이드** (SQL 실행 순서)
- 다음 단계 안내 (S0-4)

---

## A4. 산출물

| 산출물 | 저장 위치 |
|--------|----------|
| schema.sql | `S0_Project-SSAL-Grid_생성/supabase/` |
| seed_project_sal_grid.sql | `S0_Project-SSAL-Grid_생성/supabase/` |
| 동기화 스크립트 | `S0_Project-SSAL-Grid_생성/scripts/` |
| 완료 보고서 | `Human_ClaudeCode_Bridge/Reports/` |

---

## A5. 참조 문서

| 항목 | 위치 |
|------|------|
| 규칙 파일 | `.claude/rules/` |
| S0-1 결과물 | `S0_Project-SSAL-Grid_생성/ssal-grid/` |
| SAL Grid 매뉴얼 | `S0_Project-SSAL-Grid_생성/manual/` |
| Briefing | `Briefings_OrderSheets/Briefings/S0/S0-3_Briefing.md` |

---

# PART B: 프로젝트별 추가 내용

## B1. 특별 지시사항

> 이번 Order에만 적용되는 특별한 지시 (없으면 비워둠)

**PO 작업 필요:**
- AI가 SQL 파일 생성 후, PO가 Supabase SQL Editor에서 실행

**SQL 실행 순서:**
1. schema.sql (테이블 생성)
2. seed_project_sal_grid.sql (데이터 삽입)
3. 검증: `SELECT COUNT(*) FROM project_sal_grid;`

---

## B2. 참고사항

> AI가 작업과 관련하여 알아야 할 배경 정보 등 (없으면 비워둠)

**테이블 정보:**

| 테이블 | 용도 |
|--------|------|
| project_sal_grid | Task 데이터 저장 |
| stage_verification | Stage Gate 검증 기록 |

**SQL 파일 위치:**
```
S0_Project-SSAL-Grid_생성/supabase/
├── schema.sql                    (테이블 생성)
├── seed_project_sal_grid.sql     (Task 데이터)
└── TEMPLATE_STANDARD_...sql      (참고용 템플릿)
```

**S0-3 완료 후:**
- S0-4 (Grid Viewer) 진행

---

> 본 Order Sheet는 템플릿입니다. Project Owner가 프로젝트에 맞게 자유롭게 수정할 수 있습니다.
