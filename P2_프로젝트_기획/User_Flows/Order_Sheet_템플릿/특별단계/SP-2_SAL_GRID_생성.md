# Order Sheet - SP-2 Project Grid (SAL GRID) 생성

## 작업 지시

**Claude AI에게**: Task 기반 개발을 위한 Project Grid 시스템을 생성해주세요.

---

## 작업 내용

### 1. Project Grid 구조 설정
- Phase 정의 (1~4단계)
- Area 정의 (FE, BA, AU, DB, TS, DP)
- Task ID 규칙 적용

### 2. Task 목록 생성
- Phase별 Task 목록
- Task별 상세 정보
- 의존성 관계

### 3. 문서 생성
- project_grid.json
- Task Instruction 템플릿
- Phase Gate 체크리스트

---

## 사용자 입력 (필수)

**프로젝트 범위:**
```
[프로젝트에서 개발할 기능 범위]
```

**Phase 계획:**
```
Phase 1: [범위] (예: 핵심 기능, MVP)
Phase 2: [범위] (예: 확장 기능)
Phase 3: [범위] (예: 외부 연동)
Phase 4: [범위] (예: 테스트/안정화)
```

**초기 Task 목록 (선택):**
```
[이미 정의된 Task가 있으면 나열]
```

---

## Area 코드 정의

| 코드 | 영역 | 설명 |
|-----|------|------|
| FE | Frontend | 프론트엔드 개발 |
| BA | Backend API | 백엔드 API 개발 |
| AU | Authentication | 인증 시스템 |
| DB | Database | 데이터베이스 |
| TS | Test | 테스트 |
| DP | Deploy | 배포 |

---

## Task ID 형식

**형식**: `P[Phase][Area][Seq]`
- P1FE1: Phase 1, Frontend, 1번 Task
- P2BA3: Phase 2, Backend API, 3번 Task

---

## 결과물 저장 위치

- `S1_개발_준비/2-5_Project_Grid/`
  - `project_grid.json`
  - `task_instructions/`
  - `phase_gates/`

---

## 제약 조건

- Dual Execution System 적용 준비
- Task ID 규칙 준수
- Phase Gate 검증 필수
