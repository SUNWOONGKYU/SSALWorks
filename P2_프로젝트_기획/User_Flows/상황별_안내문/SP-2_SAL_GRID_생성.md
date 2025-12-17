# SP-2 Project SSAL Grid 생성 안내 (S0)

> **Stage**: 특별단계 (S0)
> **Task ID**: SP-2
> **버전**: 2.1 (Stage Context 추가)

---

## 1. Stage 맥락 (Context)

### 현재 위치
```
┌─────────────────────────────────────────────────────────────────────────┐
│                        SSAL Works 프로젝트 흐름                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   P0   ▶▶▶   [S0]   ▶▶▶   P1   ▶▶▶   P2   ▶▶▶   P3   ▶▶▶   S1~S5     │
│   특별단계     특별단계      예비단계   예비단계   예비단계    실행단계     │
│   (디렉토리)   (Grid)        (사업계획) (기획)    (프로토타입) (개발/운영)  │
│               ────────                                                  │
│               현재 위치                                                 │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Stage 간 관계

| 단계 | Stage | 설명 | 비고 |
|------|-------|------|------|
| 이전 | P0 | 프로젝트 디렉토리 구조 생성 | ✅ 완료됨 |
| **현재** | **S0** | **Project SSAL Grid 생성** | **🔄 진행 중** |
| 다음 | P1 | 사업계획 수립 | ⏳ 대기 |

### 이전 단계에서 완료된 것 (P0)
- ✅ SSALWorks 표준 디렉토리 구조 생성
- ✅ P0~P3, S0~S5 폴더 생성
- ✅ 기본 문서 생성 (PROJECT_DIRECTORY_STRUCTURE.md, PROJECT_STATUS.md)
- ✅ .claude/CLAUDE.md 설정 파일 생성

### 현재 단계에서 수행할 것 (S0)
- 🔄 Project SSAL Grid 시스템 구축
- 🔄 5×11 Matrix 생성 (5 Stage × 11 Area)
- 🔄 Task Plan 및 의존성 정의
- 🔄 Grid 관리 매뉴얼 (PROJECT_SSAL_GRID_MANUAL.md)
- 🔄 Stage Gate 검증 체계 구축

### 다음 단계에서 수행할 것 (P1)
- ⏳ 비전/미션 정의
- ⏳ 시장 분석
- ⏳ 비즈니스 모델 수립

---

## 2. 이 단계에서 수행하는 작업

**프로젝트 그리드(SSAL GRID) 생성**을 위한 Order Sheet를 발행합니다.

---

## 3. 작업 목적

Task 기반 개발을 위한 Project SSAL Grid 시스템을 생성합니다.

---

## 4. 주요 작업 내용

### 4.1 Project Grid 구조 설정
- Stage 정의 (S1~S5)
- Area 정의 (M, U, F, BI, BA, D, S, T, O, E, C)
- Task ID 규칙 적용

### 4.2 Task 목록 생성
- Stage별 Task 목록
- Task별 상세 정보 (22개 속성)
- 의존성 관계

### 4.3 문서 및 시스템 생성
- PROJECT_SSAL_GRID_MANUAL.md
- ssal-grid/ 폴더 구조
- Stage Gate 검증 체크리스트

---

## 5. 필요한 입력 정보

| 항목 | 설명 |
|------|------|
| 프로젝트 범위 | 개발할 기능 범위 |
| Stage 계획 | 각 Stage별 범위 |
| 초기 Task 목록 | 이미 정의된 Task (선택) |

---

## 6. 예상 결과물

- `S0_Project-SSAL-Grid_생성/` 폴더
- `PROJECT_SSAL_GRID_MANUAL.md`
- Stage별 Task 목록
- Stage Gate 체크리스트

---

## 7. Task 정보

| 항목 | 값 |
|------|-----|
| Task Agent | devops-troubleshooter |
| Verification Agent | qa-specialist |
| 실행 유형 | AI-Only |
| 의존성 | SP-1 완료 |

---

## 8. Area 코드 정의

| 코드 | 영역 |
|-----|------|
| M | Documentation (문서화) |
| U | Design (UI/UX 디자인) |
| F | Frontend (프론트엔드) |
| BI | Backend Infrastructure (백엔드 기반) |
| BA | Backend APIs (백엔드 API) |
| D | Database (데이터베이스) |
| S | Security (보안/인증/인가) |
| T | Testing (테스트) |
| O | DevOps (운영/배포) |
| E | External (외부 연동) |
| C | Content (콘텐츠 시스템) |

---

## 9. Task ID 형식

**형식**: `S[Stage][Area][Seq]`

**예시**:
- S1S1: Stage 1, Security, 1번 Task
- S2F1: Stage 2, Frontend, 1번 Task

---

## 10. 다음 단계

SP-2 완료 → P1-1 (Vision & Mission) 또는 S1 (개발 준비) 진행

---

**확인 버튼을 클릭하면 Workspace에 Order Sheet가 로드됩니다.**
