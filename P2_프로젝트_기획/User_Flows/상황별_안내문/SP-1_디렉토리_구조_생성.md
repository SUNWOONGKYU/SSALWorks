# SP-1 디렉토리 구조 자동 생성 안내 (P0)

> **Stage**: 특별단계 (P0)
> **Task ID**: SP-1
> **버전**: 2.1 (Stage Context 추가)

---

## 1. Stage 맥락 (Context)

### 현재 위치
```
┌─────────────────────────────────────────────────────────────────────────┐
│                        SSAL Works 프로젝트 흐름                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   [P0]   ▶▶▶   S0   ▶▶▶   P1   ▶▶▶   P2   ▶▶▶   P3   ▶▶▶   S1~S5     │
│   특별단계      특별단계     예비단계   예비단계   예비단계    실행단계     │
│   (디렉토리)   (Grid)       (사업계획) (기획)    (프로토타입) (개발/운영)  │
│   ────────                                                              │
│   현재 위치                                                             │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Stage 간 관계

| 단계 | Stage | 설명 | 비고 |
|------|-------|------|------|
| **현재** | **P0** | **프로젝트 디렉토리 구조 생성** | **🔄 진행 중** |
| 다음 | S0 | Project SSAL Grid 생성 | ⏳ 대기 |

### 현재 단계에서 수행할 것 (P0)
- 🔄 SSALWorks 표준 디렉토리 구조 생성
- 🔄 P0~P3, S0~S5 폴더 생성
- 🔄 Production 폴더 구조 생성
- 🔄 기본 문서 생성 (PROJECT_DIRECTORY_STRUCTURE.md, PROJECT_STATUS.md)
- 🔄 .claude/CLAUDE.md 설정 파일 생성
- 🔄 Web_ClaudeCode_Bridge 구조 생성

### 다음 단계에서 수행할 것 (S0)
- ⏳ Project SSAL Grid 시스템 구축
- ⏳ 5×11 Matrix 생성 (5 Stage × 11 Area)
- ⏳ Task Plan 정의
- ⏳ Grid 관리 매뉴얼 작성

---

## 2. 이 단계에서 수행하는 작업

**프로젝트 디렉토리 구조 자동 생성**을 위한 Order Sheet를 발행합니다.

---

## 3. 작업 목적

새 프로젝트를 위한 SSALWorks 표준 디렉토리 구조를 자동 생성합니다.

---

## 4. 주요 작업 내용

### 3.1 표준 디렉토리 구조 생성
- P0~P3 예비단계 폴더
- S0~S5 실행단계 폴더
- 하위 폴더 구조 (Area별)
- Production 폴더 (배포용 코드)

### 3.2 기본 문서 생성
- PROJECT_DIRECTORY_STRUCTURE.md
- PROJECT_STATUS.md
- README.md
- .gitignore

### 3.3 설정 파일 생성
- .claude/CLAUDE.md (Claude Code 설정)
- .env.example (환경 변수 템플릿)
- Web_ClaudeCode_Bridge/ 구조

---

## 5. 필요한 입력 정보

| 항목 | 설명 |
|------|------|
| 프로젝트명 | 새 프로젝트 이름 |
| 저장 경로 | 프로젝트 생성 디렉토리 |
| 커스텀 요구사항 | 추가 폴더 필요 시 (선택) |

---

## 6. 예상 결과물

- 전체 디렉토리 구조
- `PROJECT_DIRECTORY_STRUCTURE.md`
- `PROJECT_STATUS.md`
- `.claude/CLAUDE.md`

---

## 7. Task 정보

| 항목 | 값 |
|------|-----|
| Task Agent | devops-troubleshooter |
| Verification Agent | qa-specialist |
| 실행 유형 | AI-Only |
| 의존성 | 없음 (첫 번째 Task) |

---

## 8. SSALWorks 표준 구조

```
[프로젝트명]/
├── P0_작업_디렉토리_구조_생성/
├── S0_Project-SSAL-Grid_생성/
├── P1_사업계획/
├── P2_프로젝트_기획/
├── P3_프로토타입_제작/
├── S1_개발_준비/
├── S2_개발-1차/
├── S3_개발-2차/
├── S4_개발-3차/
├── S5_운영/
├── Production/
├── Web_ClaudeCode_Bridge/
├── .claude/
└── README.md
```

---

## 9. 다음 단계

SP-1 완료 → SP-2 (Project Grid 생성) 진행

---

**확인 버튼을 클릭하면 Workspace에 Order Sheet가 로드됩니다.**
