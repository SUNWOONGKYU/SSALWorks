# Order Sheet - S0-1 Project SAL Grid 생성

> **버전**: 5.4
> **단계**: S0-1 (SAL Grid 생성)
> **목적**: Task 기반 개발을 위한 Project SAL Grid 시스템 생성

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

1. Stage 및 Area 정의
   - Stage 정의 (S1~S5)
   - Area 코드 정의 (M, U, F, BI, BA, D, S, T, O, E, C)
   - Task ID 규칙 적용

2. Task 목록 생성
   - Stage별 Task 목록
   - Task별 상세 정보 (22개 속성)
   - 의존성 관계 정의

3. 문서 및 시스템 생성
   - PROJECT_SAL_GRID_MANUAL.md
   - ssal-grid/ 폴더 구조 생성
   - Stage Gate 검증 체크리스트

---

## A3. AI 작업 순서 (5단계)

### 1단계: Order Sheet 완전 이해

**체크리스트**:
- [ ] A2 작업 내용 확인
- [ ] A4 산출물 확인
- [ ] PART_B 특별 지시사항/참고사항 확인

**출력**: `'Order Sheet 확인 완료. 단계: S0-1'`

---

### 2단계: 문의사항 질문

**질문 형식**:
```
[S0-1] 질문: {내용}
옵션 A: {옵션1}
옵션 B: {옵션2}
```

**출력**: 질문 목록 또는 `'질문 없음'`

---

### 3단계: 실행 (Execution)

**체크리스트**:
- [ ] Stage/Area 정의 문서 작성
- [ ] Task ID 규칙 정의
- [ ] Task 목록 생성 (22개 속성 포함)
- [ ] ssal-grid/ 폴더 구조 생성
- [ ] Stage Gate 체크리스트 작성

---

### 4단계: 검증 (Verification)

**체크리스트**:
- [ ] Task ID 규칙이 준수되는가?
- [ ] 모든 Area가 정의되었는가?
- [ ] 의존성 관계가 올바른가?
- [ ] Stage Gate 검증 프로세스가 정의되었는가?

**출력**: `'검증 완료'`

---

### 5단계: 완료 보고 (Report)

**보고서 생성**:
- 파일명: `S0-1_completion_report.md`
- 저장 위치: `Human_ClaudeCode_Bridge/Reports/`

**보고 내용**:
- 완료된 작업 요약
- 생성된 문서
- 다음 단계 안내 (S0-2)

---

## A4. 산출물

| 산출물 | 저장 위치 |
|--------|----------|
| PROJECT_SAL_GRID_MANUAL.md | `S0_Project-SSAL-Grid_생성/manual/` |
| ssal-grid 폴더 구조 | `S0_Project-SSAL-Grid_생성/ssal-grid/` |
| Task 목록 | `S0_Project-SSAL-Grid_생성/ssal-grid/` |
| 완료 보고서 | `Human_ClaudeCode_Bridge/Reports/` |

---

## A5. 참조 문서

| 항목 | 위치 |
|------|------|
| 규칙 파일 | `.claude/rules/` |
| 디렉토리 구조 | `P0_작업_디렉토리_구조_생성/Project_Directory_Structure.md` |
| Briefing | `Briefings_OrderSheets/Briefings/S0/S0-1_Briefing.md` |

---

# PART B: 프로젝트별 추가 내용

## B1. 특별 지시사항

> 이번 Order에만 적용되는 특별한 지시 (없으면 비워둠)

**Area 코드 정의:**

| 코드 | 영역 | 설명 |
|-----|------|------|
| M | Documentation | 문서화 |
| U | Design | UI/UX 디자인 |
| F | Frontend | 프론트엔드 개발 |
| BI | Backend Infrastructure | 백엔드 기반 |
| BA | Backend APIs | 백엔드 API |
| D | Database | 데이터베이스 |
| S | Security | 보안/인증/인가 |
| T | Testing | 테스트 |
| O | DevOps | 운영/배포 |
| E | External | 외부 연동 |
| C | Content | 콘텐츠 시스템 |

**Task ID 형식**: `S[Stage][Area][Seq]` (예: S1S1, S2F1, S3BA2)

---

## B2. 참고사항

> AI가 작업과 관련하여 알아야 할 배경 정보 등 (없으면 비워둠)

**PO로부터 입력 필요:**
- 프로젝트 개발 범위
- Stage별 개발 계획
- 초기 Task 목록 (이미 정의된 것이 있다면)

**검증 프로세스 (3단계):**
```
Task 작업 → Task 검증 → Stage Gate → PO 최종 승인
```

1. **Task 검증**: Verification Agent가 Task 완료 후 검증
2. **Stage Gate**: Main Agent가 Stage 완료 후 종합 검증
3. **PO 승인**: Project Owner가 최종 승인

**S0-1 완료 후:**
- S0-2 (SAL Grid Manual) 진행

---

> 본 Order Sheet는 템플릿입니다. Project Owner가 프로젝트에 맞게 자유롭게 수정할 수 있습니다.
