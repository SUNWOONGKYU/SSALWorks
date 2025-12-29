# Order Sheet - Viewer

> **버전**: 5.4
> **단계**: S0-4 (Viewer)
> **목적**: SAL Grid 현황을 시각적으로 조회하는 HTML Viewer 설정

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

1. Viewer 확인 및 설정
   - S0-3에서 선택한 Method에 맞는 Viewer 확인
   - Database Method: viewer_database.html
   - CSV Method: viewer_csv.html

2. 데이터 연동 확인
   - 선택한 Method의 데이터 소스 연결 확인
   - Task 목록이 정상 표시되는지 확인

3. 기능 테스트
   - Stage/Area 필터링 테스트
   - Task 상세 정보 팝업 테스트
   - 진행률 표시 확인

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
- [ ] S0-3에서 선택한 Method 확인
- [ ] 해당 Viewer 파일 확인
- [ ] 데이터 연동 설정 (Supabase URL 또는 JSON 경로)
- [ ] Viewer 기능 테스트

---

### 4단계: 검증 (Verification)

**체크리스트**:
- [ ] 모든 Task가 표시되는가?
- [ ] Stage/Area 필터링이 동작하는가?
- [ ] Task 상세 정보가 정확한가?
- [ ] 진행률이 올바르게 표시되는가?

**출력**: `'검증 완료'`

---

### 5단계: 완료 보고 (Report)

**보고서 생성**:
- 파일명: `S0-4_completion_report.md`
- 저장 위치: `Human_ClaudeCode_Bridge/Reports/`

**보고 내용**:
- 사용할 Viewer 파일
- 테스트 결과
- S0 완료 및 S1 시작 안내

---

## A4. 산출물

| 산출물 | 저장 위치 |
|--------|----------|
| Viewer 설정 완료 | `S0_Project-SAL-Grid_생성/viewer/` |
| 완료 보고서 | `Human_ClaudeCode_Bridge/Reports/` |

---

## A5. 참조 문서

| 항목 | 위치 |
|------|------|
| 규칙 파일 | `.claude/rules/` |
| S0-3 결과물 | Method 선택 결과 |
| Briefing | `Briefings_OrderSheets/Briefings/S0/S0-4_Briefing.md` |

---

# PART B: 프로젝트별 추가 내용

## B1. 특별 지시사항

**Viewer 종류 (4가지):**

| Viewer | Method | 플랫폼 |
|--------|--------|--------|
| viewer_database.html | Database (Supabase) | PC |
| viewer_csv.html | CSV (JSON) | PC |
| viewer_mobile_database.html | Database (Supabase) | 모바일 |
| viewer_mobile_csv.html | CSV (JSON) | 모바일 |

**Viewer 기능:**
- 전체 현황 대시보드 (Stage별 진행률)
- Task 목록 (필터링, 검색)
- Task 상세 정보 (22개 속성)

---

## B2. 참고사항

**Viewer 파일 위치:**
```
S0_Project-SAL-Grid_생성/
└── viewer/
    ├── viewer_database.html
    ├── viewer_csv.html
    ├── viewer_mobile_database.html
    └── viewer_mobile_csv.html
```

**Database Method 연동:**
- Supabase URL과 anon key 필요
- `project_sal_grid` 테이블 조회

**CSV Method 연동:**
- `project_sal_grid.json` 파일 경로 설정
- 브라우저에서 직접 열기 가능

**S0-4 완료 후:**
- S0 전체 완료
- S1 (개발 준비) 진행

---

> 본 Order Sheet는 템플릿입니다. Project Owner가 프로젝트에 맞게 자유롭게 수정할 수 있습니다.
