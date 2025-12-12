# PROJECT SAL GRID 매뉴얼

> **버전**: V4.0
> **최종 업데이트**: 2025-11-15
> **작성자**: SSALWorks
> **목적**: SAL 3D 그리드 기반 프로젝트 관리 방법론

---

## 📋 목차

1. [SAL 3D 그리드란?](#sal-3d-그리드란)
2. [그리드 구조](#그리드-구조)
3. [Task ID 규칙](#task-id-규칙)
4. [프로젝트 그리드 작성 방법](#프로젝트-그리드-작성-방법)
5. [Dual Execution System](#dual-execution-system)
6. [Export/Import 워크플로우](#exportimport-워크플로우)
7. [예시: SSALWorks 프로젝트](#예시-ssalworks-프로젝트)

---

## SAL 3D 그리드란?

**SAL 3D Grid**는 복잡한 프로젝트를 체계적으로 관리하기 위한 3차원 작업 분류 시스템입니다.

### 핵심 개념

- **X축 (Stage)**: 의존성 기반 순차 단계 (5-7 stages 권장)
- **Y축 (Area)**: 병렬 작업 영역 (7-10 areas 권장)
- **Z축 (Task)**: 개별 작업 카드

### 설계 원칙

1. **의존성은 X축으로**: 순차적으로 진행해야 하는 작업은 Stage로 분리
2. **병렬성은 Y축으로**: 동시에 진행 가능한 작업은 Area로 분리
3. **인접성은 Z축으로**: 밀접하게 관련된 작업은 같은 (Stage × Area) 셀에 배치

---

## 그리드 구조

### X축: Stage (단계)

프로젝트를 5-7개의 의존성 기반 단계로 분할합니다.

**예시: SSALWorks 프로젝트**
- **Phase 1**: 초기 설정 (Supabase, DB Schema, 기본 인증)
- **Phase 2**: 핵심 기능 (프로젝트 CRUD, Books API)
- **Phase 3**: 확장 기능 (AI 연동, 크레딧 관리)
- **Phase 4**: 통합 및 테스트
- **Phase 5**: 배포 및 운영

### Y축: Area (영역)

병렬로 작업 가능한 7-10개의 영역으로 분할합니다.

**예시: SSALWorks 프로젝트**
- **FE**: Frontend (React, UI 컴포넌트)
- **BA**: Backend API (비즈니스 로직)
- **BI**: Backend Infrastructure (Supabase 클라이언트, 미들웨어)
- **DB**: Database (스키마, RLS, 트리거)
- **DO**: DevOps (배포, CI/CD)
- **TE**: Test (단위, 통합, E2E)
- **AD**: Admin (관리자 기능, 운영)

### Z축: Task (작업)

각 (Stage × Area) 셀 내에서 개별 작업을 정의합니다.

**예시**:
- **P1FE1**: Phase 1, Frontend, Task 1 - 로그인 페이지
- **P1FE2**: Phase 1, Frontend, Task 2 - 회원가입 페이지
- **P1BA1**: Phase 1, Backend API, Task 1 - 회원가입 API

---

## Task ID 규칙

### 기본 형식

```
P{Phase}{Area}{TaskNumber}
```

- **P**: Phase (단계)
- **{Phase}**: 1-5 (Phase 번호)
- **{Area}**: FE, BA, BI, DB, DO, TE, AD 등 (2글자 약어)
- **{TaskNumber}**: 1, 2, 3... (해당 Area 내 작업 번호)

### 예시

| Task ID | 설명 |
|---------|------|
| P1FE1 | Phase 1, Frontend, Task 1 |
| P1BA1 | Phase 1, Backend API, Task 1 |
| P2DB3 | Phase 2, Database, Task 3 |
| P3TE2 | Phase 3, Test, Task 2 |

---

## 프로젝트 그리드 작성 방법

### 1단계: Phase 정의

프로젝트를 5-7개의 Phase로 분할합니다.

**체크리스트**:
- [ ] 각 Phase는 명확한 의존성을 가지는가?
- [ ] Phase 간 순서가 논리적인가?
- [ ] 각 Phase의 완료 기준이 명확한가?

### 2단계: Area 정의

병렬 작업 가능한 7-10개의 Area를 정의합니다.

**체크리스트**:
- [ ] 각 Area는 독립적으로 작업 가능한가?
- [ ] Area 간 책임이 명확히 구분되는가?
- [ ] 2글자 약어가 직관적인가?

### 3단계: Task 분할

각 (Phase × Area) 셀에 구체적인 Task를 정의합니다.

**Task 정의 시 포함사항**:
- **Task ID**: P{Phase}{Area}{TaskNumber}
- **작업명**: 간결하고 명확한 작업 이름
- **설명**: 작업 내용 상세 설명
- **기대 결과물**: 파일 경로 및 산출물
- **의존성**: 선행 작업 Task ID
- **예상 소요시간**: 시간 또는 일 단위

### 4단계: CSV 파일 생성

프로젝트 그리드를 CSV 형식으로 작성합니다.

**CSV 컬럼 구조**:
```csv
phase,area,task_id,task_name,description,expected_output,dependencies,estimated_hours,status,progress,assigned_agent
```

**예시**:
```csv
1,FE,P1FE1,로그인 페이지,로그인 UI 및 폼 구현,1_Frontend/pages/login.tsx,,8,pending,0,frontend-developer
1,BA,P1BA1,회원가입 API,회원가입 로직 및 DB 연동,3_Backend_APIs/auth/signup.ts,P1DB1,6,pending,0,backend-developer
```

---

## Dual Execution System

SSALWorks는 품질 보증을 위해 **이중 실행 시스템**을 사용합니다.

### 1차 실행: Claude Code Sub-agents

- **역할**: 초기 코드 구현 및 테스트
- **담당**: Task 유형별 전문 서브에이전트 배정
- **산출물**: 구현된 코드, 초기 테스트 결과

### 2차 실행: Claude Code (Different Session)

- **역할**: 검증, 수정, 재작성, 최종 품질 관리
- **권한**: 수정 없이 유지 / 부분 수정 / 전체 재작성 / 파일 추가
- **산출물**: 최종 검증 보고서 (JSON 형식)

### 기록 방법

**1차 실행**:
```json
{
  "assigned_agent": "1차: frontend-developer",
  "files": ["1_Frontend/pages/login.tsx"],
  "duration": "1차: 8시간",
  "build_result": "1차: ✅ 성공",
  "test_history": "1차: Test(10/10)@Claude"
}
```

**2차 실행**:
```json
{
  "assigned_agent": "1차: frontend-developer | 2차: Claude Code(실행 및 검증)",
  "files": {
    "generated_by_first": ["1_Frontend/pages/login.tsx"],
    "modified_by_second": ["1_Frontend/pages/login.tsx (ClaudeCode수정)"],
    "added_by_second": []
  },
  "test_history": "최종: Test(12/12) + E2E(3/3) + Build ✅",
  "validation_result": "✅ 통과"
}
```

---

## Export/Import 워크플로우

### 작업 흐름

```
[웹사이트] ← Export/Import → [Claude Code CLI]
```

1. **Export**: 웹사이트에서 Task JSON 생성 → `claude_code/inbox/` 저장
2. **Execute**: Claude Code가 `inbox/` 읽고 작업 실행
3. **Import**: Claude Code 결과를 `outbox/`에 저장 → 웹사이트에서 읽어 DB 업데이트

### Export JSON 형식

```json
{
  "task_id": "P1FE1",
  "task_name": "로그인 페이지",
  "phase": 1,
  "area": "FE",
  "description": "로그인 UI 및 폼 구현",
  "expected_output": ["1_Frontend/pages/login.tsx"],
  "dependencies": [],
  "status": "pending"
}
```

### Import JSON 형식

```json
{
  "task_id": "P1FE1",
  "status": "completed",
  "progress": 100,
  "files_generated": ["1_Frontend/pages/login.tsx"],
  "build_result": "✅ 성공",
  "test_result": "Test(12/12)@ClaudeCode",
  "validation_result": "✅ 통과"
}
```

---

## 예시: SSALWorks 프로젝트

### Phase 1: 초기 설정

| Task ID | Area | 작업명 | 기대 결과물 | 의존성 |
|---------|------|--------|-------------|--------|
| P1BI1 | BI | Supabase 클라이언트 초기화 | 2_Backend_Infrastructure/supabase/client.ts | - |
| P1DB1 | DB | 사용자 테이블 생성 | 4_Database/schema/01_auth_tables.sql | - |
| P1BA1 | BA | 회원가입 API | 3_Backend_APIs/auth/signup.ts | P1DB1 |
| P1FE1 | FE | 로그인 페이지 | 1_Frontend/pages/login.tsx | P1BA1 |

### Phase 2: 핵심 기능

| Task ID | Area | 작업명 | 기대 결과물 | 의존성 |
|---------|------|--------|-------------|--------|
| P2DB1 | DB | 프로젝트 테이블 생성 | 4_Database/schema/02_projects_tables.sql | P1DB1 |
| P2BA1 | BA | 프로젝트 CRUD API | 3_Backend_APIs/projects/crud.ts | P2DB1 |
| P2FE1 | FE | 프로젝트 대시보드 | 1_Frontend/pages/dashboard.tsx | P2BA1 |

---

## 📝 체크리스트

프로젝트 그리드 작성 완료 전 확인사항:

- [ ] Phase는 5-7개로 적절히 분할되었는가?
- [ ] Area는 7-10개로 병렬 작업 가능하게 구성되었는가?
- [ ] 모든 Task에 고유 ID가 부여되었는가?
- [ ] 의존성 관계가 명확히 정의되었는가?
- [ ] 기대 결과물이 구체적으로 명시되었는가?
- [ ] CSV 파일이 올바르게 생성되었는가?
- [ ] Dual Execution System 기록 방식을 이해했는가?
- [ ] Export/Import 워크플로우를 숙지했는가?

---

## 🔗 관련 문서

- **프로젝트 구조**: `C:\SSAL_Works\PROJECT_STRUCTURE.md`
- **프로세스 구조**: `C:\SSAL_Works\0-1_Project_Plan\sidebar_process_structure_CORRECTED.md`
- **프로젝트 그리드 CSV**: `C:\SSAL_Works\0-5_Development_ProjectGrid\PROJECT_GRID_SSALWORKS.csv`

---

**이 매뉴얼은 Claude Code가 작업 시 참고하는 핵심 문서입니다. 수정 시 반드시 버전을 업데이트하세요.**
