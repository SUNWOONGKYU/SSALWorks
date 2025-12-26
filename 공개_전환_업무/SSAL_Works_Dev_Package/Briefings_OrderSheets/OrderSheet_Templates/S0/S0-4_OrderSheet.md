# Order Sheet - S0-4 SAL Grid Viewer 개발

> **버전**: 5.4
> **단계**: S0-4 (SAL Grid Viewer)
> **목적**: Project SAL Grid 현황을 시각화하는 웹 뷰어 개발

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

1. 뷰어 기본 구조
   - 5x11 매트릭스 시각화
   - Task 상태 표시 기능
   - 진행률 표시

2. UI/UX 구현
   - Stage별 필터링
   - Area별 필터링
   - Task 상세 정보 팝업
   - 반응형 디자인

3. 데이터 연동
   - Supabase 연동
   - 실시간 업데이트
   - 캐싱 처리

---

## A3. AI 작업 순서 (5단계)

### 1단계: Order Sheet 완전 이해

**체크리스트**:
- [ ] A2 작업 내용 확인
- [ ] A4 산출물 확인
- [ ] PART_B 특별 지시사항/참고사항 확인

**출력**: `'Order Sheet 확인 완료. 단계: S0-4'`

---

### 2단계: 문의사항 질문

**질문 형식**:
```
[S0-4] 질문: {내용}
옵션 A: {옵션1}
옵션 B: {옵션2}
```

**출력**: 질문 목록 또는 `'질문 없음'`

---

### 3단계: 실행 (Execution)

**체크리스트**:
- [ ] viewer.html 개발
- [ ] Supabase 연동 구현
- [ ] 필터링 기능 구현
- [ ] Task 상세 팝업 구현
- [ ] 진행률 차트 구현

---

### 4단계: 검증 (Verification)

**체크리스트**:
- [ ] 모든 Stage/Area가 표시되는가?
- [ ] Task 상태가 정확히 반영되는가?
- [ ] 필터링이 정상 동작하는가?
- [ ] 반응형 디자인이 적용되었는가?

**출력**: `'검증 완료'`

---

### 5단계: 완료 보고 (Report)

**보고서 생성**:
- 파일명: `S0-4_completion_report.md`
- 저장 위치: `Human_ClaudeCode_Bridge/Reports/`

**보고 내용**:
- 완료된 작업 요약
- 뷰어 기능 목록
- 사용 방법
- 다음 단계 안내 (S1 개발 준비)

---

## A4. 산출물

| 산출물 | 저장 위치 |
|--------|----------|
| viewer.html | `S0_Project-SSAL-Grid_생성/viewer/` |
| 스타일/스크립트 | `S0_Project-SSAL-Grid_생성/viewer/` |
| 완료 보고서 | `Human_ClaudeCode_Bridge/Reports/` |

---

## A5. 참조 문서

| 항목 | 위치 |
|------|------|
| 규칙 파일 | `.claude/rules/` |
| S0-3 결과물 | `S0_Project-SSAL-Grid_생성/supabase/` |
| SAL Grid 매뉴얼 | `S0_Project-SSAL-Grid_생성/manual/` |
| Briefing | `Briefings_OrderSheets/Briefings/S0/S0-4_Briefing.md` |

---

# PART B: 프로젝트별 추가 내용

## B1. 특별 지시사항

> 이번 Order에만 적용되는 특별한 지시 (없으면 비워둠)

**표시할 데이터 (22개 속성):**

| 카테고리 | 속성 |
|----------|------|
| Basic Info | Stage, Area, Task ID, Task Name |
| Task Definition | Task Instruction, Agent, Tools, Execution Type, Dependencies |
| Task Execution | Progress, Status, Generated Files, Modification History |
| Verification | Verification Instruction, Agent, Test, Build, Integration, Blockers, Comprehensive, Status, Remarks |

---

## B2. 참고사항

> AI가 작업과 관련하여 알아야 할 배경 정보 등 (없으면 비워둠)

**PO로부터 입력 필요:**
- 추가 UI/UX 요구사항
- 특별 표시 기능

**뷰어 파일 위치:**
```
S0_Project-SSAL-Grid_생성/viewer/
└── viewer.html
```

**Supabase 연동:**
- `project_sal_grid` 테이블 데이터 시각화
- Supabase Realtime 활용 가능

**S0-4 완료 후:**
- S0 완료
- S1 (개발 준비) 진행

---

> 본 Order Sheet는 템플릿입니다. Project Owner가 프로젝트에 맞게 자유롭게 수정할 수 있습니다.
