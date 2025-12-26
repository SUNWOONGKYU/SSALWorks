# Order Sheet - S0-2 SAL Grid 매뉴얼 작성

> **버전**: 5.4
> **단계**: S0-2 (SAL Grid 매뉴얼)
> **목적**: Project SAL Grid 사용 매뉴얼 작성 및 문서화

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

1. 매뉴얼 작성
   - Task ID 규칙 문서화
   - Area 코드 정의 설명
   - 22개 속성 상세 설명
   - 검증 프로세스 안내

2. 프로세스 가이드 작성
   - Task 작업 절차
   - 결과 기록 방법
   - Stage Gate 절차
   - Verification Agent 가이드

3. 참고 문서 작성
   - 22개 속성 참조 문서
   - 5x11 매트릭스 문서
   - Task Plan 문서

---

## A3. AI 작업 순서 (5단계)

### 1단계: Order Sheet 완전 이해

**체크리스트**:
- [ ] A2 작업 내용 확인
- [ ] A4 산출물 확인
- [ ] PART_B 특별 지시사항/참고사항 확인

**출력**: `'Order Sheet 확인 완료. 단계: S0-2'`

---

### 2단계: 문의사항 질문

**질문 형식**:
```
[S0-2] 질문: {내용}
옵션 A: {옵션1}
옵션 B: {옵션2}
```

**출력**: 질문 목록 또는 `'질문 없음'`

---

### 3단계: 실행 (Execution)

**체크리스트**:
- [ ] PROJECT_SAL_GRID_MANUAL.md 작성
- [ ] 22개 속성 참조 문서 작성
- [ ] 프로세스 가이드 작성
- [ ] 예제 코드/템플릿 추가

---

### 4단계: 검증 (Verification)

**체크리스트**:
- [ ] 모든 필수 내용이 포함되었는가?
- [ ] 프로세스 흐름이 명확한가?
- [ ] 예제가 이해하기 쉬운가?
- [ ] 신규 팀원이 바로 사용할 수 있는가?

**출력**: `'검증 완료'`

---

### 5단계: 완료 보고 (Report)

**보고서 생성**:
- 파일명: `S0-2_completion_report.md`
- 저장 위치: `Human_ClaudeCode_Bridge/Reports/`

**보고 내용**:
- 완료된 작업 요약
- 생성된 문서 목록
- 다음 단계 안내 (S0-3)

---

## A4. 산출물

| 산출물 | 저장 위치 |
|--------|----------|
| PROJECT_SAL_GRID_MANUAL.md | `S0_Project-SSAL-Grid_생성/manual/` |
| 22개 속성 참조 문서 | `S0_Project-SSAL-Grid_생성/manual/references/` |
| 완료 보고서 | `Human_ClaudeCode_Bridge/Reports/` |

---

## A5. 참조 문서

| 항목 | 위치 |
|------|------|
| 규칙 파일 | `.claude/rules/` |
| S0-1 결과물 | `S0_Project-SSAL-Grid_생성/ssal-grid/` |
| Briefing | `Briefings_OrderSheets/Briefings/S0/S0-2_Briefing.md` |

---

# PART B: 프로젝트별 추가 내용

## B1. 특별 지시사항

> 이번 Order에만 적용되는 특별한 지시 (없으면 비워둠)

**매뉴얼 구성:**
1. 개요 및 시작하기
2. Task ID 및 Area 코드
3. 22개 속성 상세
4. 작업 프로세스
5. Stage Gate 절차
6. FAQ 및 트러블슈팅

---

## B2. 참고사항

> AI가 작업과 관련하여 알아야 할 배경 정보 등 (없으면 비워둠)

**PO로부터 입력 필요:**
- 매뉴얼 추가 요구사항
- 특별히 강조할 프로세스

**S0-2 완료 후:**
- S0-3 (Supabase 연동) 진행

---

> 본 Order Sheet는 템플릿입니다. Project Owner가 프로젝트에 맞게 자유롭게 수정할 수 있습니다.
