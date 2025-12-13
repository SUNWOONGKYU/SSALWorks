# SSALWorks 프로젝트 디렉토리 구조 가이드

> **버전**: v8.0
> **최종 업데이트**: 2025-12-13
> **프로젝트**: SaaS 구독형 학습 + 프로젝트 관리 통합 플랫폼

---

## 📖 이 문서는 무엇인가요?

이 문서는 **SSALWorks 프로젝트의 모든 폴더와 파일이 어디에 있고, 왜 그렇게 구성되어 있는지**를 설명합니다.

**이 문서를 읽으면:**
- 어떤 파일을 어디에 저장해야 하는지 알 수 있습니다
- 프로젝트 구조를 이해하고 효율적으로 작업할 수 있습니다
- 팀원들과 일관된 방식으로 협업할 수 있습니다

---

## 📁 전체 디렉토리 구조 (한눈에 보기)

```
C:\!SSAL_Works_Private\
│
# ========== 특별단계 (P0, S0) - 프로젝트 기초 ==========
├── P0_작업_디렉토리_구조_생성/    # 프로젝트 구조 및 상태 관리 ⭐ 핵심 문서
│   ├── Project_Directory_Structure.md   # 이 파일!
│   └── Project_Status.md                # 프로젝트 진행 상황
├── S0_Project-SSAL-Grid_생성/    # 프로젝트 그리드 관리 시스템
│
# ========== 예비단계 (P1-P3) - GRID 범위 밖 ==========
├── P1_사업계획/                  # 비즈니스 계획
├── P2_프로젝트_기획/              # 프로젝트 기획
├── P3_프로토타입_제작/            # 프로토타입 제작 (완료)
│
# ========== 실행단계 (S1-S5) - GRID 관리 ==========
├── S1_개발_준비/                 # 개발 환경 준비
├── S2_개발-1차/                  # 1차 개발 (핵심 기능)
├── S3_개발-2차/                  # 2차 개발 (확장 기능)
├── S4_개발-3차/                  # 3차 개발 (고급 기능)
├── S5_운영/                      # 서비스 운영
│
# ========== 배포용 코드 (종합집결지) ==========
├── Production/                  # 실제 배포되는 코드 (S1-S5 작업 결과 집결)
│
# ========== 부수적 고유기능 (SSALWorks 전용) ==========
├── 부수적_고유기능/              # SSALWorks에만 필요한 고유 기능 모음
│   ├── AI_Link/                 # AI 서비스 연동 (ChatGPT, Gemini, Perplexity)
│   ├── 학습용_콘텐츠/            # 학습 및 참고 자료
│   └── 콘텐츠_변환_자동화_scripts/  # MD→HTML 변환, JS 생성 자동화
│
# ========== 독립 폴더 ==========
├── Web_ClaudeCode_Bridge/       # AI ↔ 웹 플랫폼 브릿지
├── Sidebar-Process-Tools/       # 사이드바 프로세스 관리 도구
├── 참고자료/                    # 참고용 파일들
│
# ========== 설정 폴더 ==========
├── .claude/                     # Claude Code 설정
├── .git/                        # Git 저장소
├── .github/                     # GitHub 설정 (Actions, etc.)
│
# ========== 루트 파일 ==========
├── .gitignore                       # Git 제외 파일 목록
└── package.json                     # Node.js 의존성
```

---

## 🎯 디렉토리 네이밍 규칙

### 규칙 1: 특별단계는 P0, S0
```
✅ P0_작업_디렉토리_구조_생성/    # 프로젝트 구조 문서
✅ S0_Project-SSAL-Grid_생성/    # 프로젝트 그리드
```

### 규칙 2: 예비단계는 P + 숫자
```
✅ P1_사업계획/
✅ P2_프로젝트_기획/
✅ P3_프로토타입_제작/
```

### 규칙 3: 실행단계는 S + 숫자
```
✅ S1_개발_준비/
✅ S2_개발-1차/
✅ S3_개발-2차/
✅ S4_개발-3차/
✅ S5_운영/
```

### 규칙 4: 하위 폴더는 영문 사용
```
✅ P2_프로젝트_기획/User_Flows/
✅ S2_개발-1차/Backend_API/
❌ S2_개발-1차/백엔드_API/  (한글 사용 X)
```

---

## 🔄 개발 프로세스 흐름

```
┌─────────────────────────────────────────────────────────────┐
│                    특별단계 (프로젝트 기초)                     │
├─────────────────────────────────────────────────────────────┤
│  P0_작업_디렉토리_구조_생성 + S0_Project-SSAL-Grid_생성        │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    예비단계 (GRID 범위 밖)                     │
├─────────────────────────────────────────────────────────────┤
│  P1_사업계획 → P2_프로젝트_기획 → P3_프로토타입_제작 ✅ 완료    │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    실행단계 (GRID 관리)                       │
├─────────────────────────────────────────────────────────────┤
│  S1_개발_준비 → S2_개발-1차 → S3_개발-2차 → S4_개발-3차 → S5_운영 │
└─────────────────────────────────────────────────────────────┘
```

---

## 📂 예비단계 (P1-P3) 상세 구조

### P1_사업계획/

**용도:** 비즈니스 전략 및 계획 (GRID 범위 밖)

```
P1_사업계획/
├── Vision_Mission/         # 비전과 미션
├── Market_Analysis/        # 시장 분석
├── Business_Model/         # 비즈니스 모델
├── BusinessPlan/           # 사업 계획서
└── Patent/                 # 특허 관련
```

**언제 사용하나요?**
- 사업 계획 수립할 때
- 사업 방향 검토할 때

---

### P2_프로젝트_기획/

**용도:** 프로젝트 기획 및 설계 (GRID 범위 밖)

```
P2_프로젝트_기획/
├── Project_Plan/           # 프로젝트 계획
├── User_Flows/             # 사용자 플로우
│   ├── 1_Signup/                   # 회원가입 플로우
│   ├── 2_Project_Registration/     # 프로젝트 등록 플로우
│   ├── 3_Subscription/             # 구독 플로우
│   ├── 4_Credit_Purchase/          # 크레딧 구매 플로우
│   ├── 5_Development_Process/      # 개발 프로세스 플로우
│   ├── Order_Sheet_템플릿/         # Order Sheet 템플릿
│   └── 상황별_안내문/              # 상황별 안내 메시지
├── Requirements/           # 기능 요구사항
├── Design_System/          # 디자인 시스템
├── UI_UX_Mockup/           # UI/UX 목업
│   ├── Wireframes/                 # 와이어프레임
│   ├── Mockups/                    # 목업 HTML
│   └── Design_Specs/               # 디자인 명세
├── Tech_Stack/             # 기술 스택
└── Workflows/              # 워크플로우
```

**Wireframe vs Mockup vs Prototype 차이:**

| 구분 | Wireframe | Mockup | Prototype |
|------|-----------|--------|-----------|
| 목적 | 화면 배치 설계 | 시각적 샘플 | 실제 작동 코드 |
| DB 연결 | ❌ 없음 | ❌ 없음 | ✅ 있음 |
| 위치 | P2/UI_UX_Mockup/Wireframes/ | P2/UI_UX_Mockup/Mockups/ | P3_프로토타입_제작/ |

---

### P3_프로토타입_제작/ ✅ 완료

**용도:** 실제 작동하는 프로토타입 (DB 연결, GRID 범위 밖)

```
P3_프로토타입_제작/
├── Database/               # SQL 파일 (31개+)
├── Documentation/          # 문서화
│   ├── 01_Feature_Specification.md
│   └── 02_Database_Schema.md
└── Frontend/               # 프론트엔드 코드
    ├── Prototype/                  # 실제 프로토타입 (22개 HTML)
    │   ├── index.html              # 메인 페이지
    │   ├── admin-dashboard.html    # 관리자 대시보드
    │   └── pages/                  # 하위 페이지들
    │       ├── auth/               # 로그인/회원가입
    │       ├── mypage/             # 마이페이지
    │       ├── projects/           # 프로젝트
    │       ├── payment/            # 결제
    │       ├── subscription/       # 구독
    │       ├── manual/             # 매뉴얼
    │       └── legal/              # 약관/정책
              
```

**현재 상태:** ✅ Agenda #1~#10 완료
- 15개 DB 테이블
- 22개 HTML 페이지
- Admin Dashboard 8개 섹션

---

## 📂 실행단계 (S1-S5) 상세 구조

> **참고**: 각 Stage의 폴더 구조는 SSALWORKS_TASK_PLAN.md의 Area 분포와 일치합니다.
> Area 약어: M(Documentation), F(Frontend), BI(Backend_Infra), BA(Backend_API), D(Database), S(Security), T(Testing), O(DevOps), E(External), C(Content_System)

### S1_개발_준비/

**용도:** 개발 환경 구축 및 준비 (GRID 관리)

**TASK_PLAN Areas:** M(1), F(2), BI(1), D(1), S(1), T(1), O(1) = 8 Tasks

```
S1_개발_준비/
├── Backend_Infra/          # BI: 백엔드 인프라 설정
│   ├── Docker/
│   ├── Environment/
│   ├── Git/
│   ├── Node/
│   ├── Supabase/
│   └── Vercel/
├── Database/               # D: 데이터베이스 초기 설정
├── DevOps/                 # O: 운영/배포 설정
├── Documentation/          # M: 문서화
│   ├── manual/
│   ├── project_grid/
│   ├── scripts/
│   ├── tasks/
│   └── validation/
├── Frontend/               # F: 프론트엔드 설정
├── Security/               # S: 보안 초기 설정
└── Testing/                # T: 테스트 환경 설정
```

**핵심 작업:**
- Vercel 프로젝트 설정 (S1F1, S1F2)
- 환경변수 설정 (S1BI1)
- DB 스키마 확정 (S1D1)
- Auth Provider 설정 (S1S1)
- 테스트 환경 설정 (S1T1)
- DNS 설정 (S1O1)

---

### S2_개발-1차/ (핵심 기능)

**용도:** 1차 개발 - 핵심 기능 구현 (GRID 관리)

**TASK_PLAN Areas:** M(1), F(2), BI(2), BA(3), D(1), S(1), T(1), C(1) = 12 Tasks

```
S2_개발-1차/
├── Backend_API/            # BA: 백엔드 API
├── Backend_Infra/          # BI: 백엔드 인프라
├── Content_System/         # C: 콘텐츠 시스템
├── Database/               # D: 데이터베이스
├── Documentation/          # M: 문서화
├── Frontend/               # F: 프론트엔드
├── Security/               # S: 보안/인증
└── Testing/                # T: 테스트
```

**핵심 작업:**
- Google OAuth API (S2BA1)
- Resend 이메일 서비스 (S2BI1, S2BA2)
- 구독 관리 API (S2BA3)
- 인증 미들웨어 (S2S1)
- Books 콘텐츠 업로드 (S2C1)

---

### S3_개발-2차/ (확장 기능)

**용도:** 2차 개발 - 확장 기능 구현 (GRID 관리)

**TASK_PLAN Areas:** BI(1), BA(1), S(1), E(1) = 4 Tasks

```
S3_개발-2차/
├── Backend_API/            # BA: AI Q&A API
├── Backend_Infra/          # BI: AI API 클라이언트
├── External/               # E: AI API 키 설정
└── Security/               # S: 구독 권한 체크
```

**핵심 작업:**
- AI API 클라이언트 통합 (S3BI1)
- AI Q&A API (S3BA1)
- 구독 권한 체크 (S3S1)
- AI API 키 설정 (S3E1)

---

### S4_개발-3차/ (고급 기능)

**용도:** 3차 개발 - 고급 기능 구현 (GRID 관리)

**TASK_PLAN Areas:** M(1), F(2), BI(1), BA(2), S(1), T(2), O(1) = 10 Tasks

```
S4_개발-3차/
├── Backend_API/            # BA: 결제 API, 웹훅
├── Backend_Infra/          # BI: Sentry 에러 트래킹
├── DevOps/                 # O: Cron Jobs 설정
├── Documentation/          # M: 관리자 가이드
├── Frontend/               # F: 관리자 대시보드, AI Q&A UI
├── Security/               # S: 관리자 권한 체크
└── Testing/                # T: E2E 테스트, API 통합 테스트
```

**핵심 작업:**
- 결제 API (S4BA1, S4BA2)
- 관리자 대시보드 강화 (S4F1)
- AI Q&A 인터페이스 (S4F2)
- E2E/통합 테스트 (S4T1, S4T2)

---

### S5_운영/

**용도:** 서비스 운영 및 유지보수 (GRID 관리)

**TASK_PLAN Areas:** M(1), F(1), BA(1), D(1), S(1), O(3) = 8 Tasks

```
S5_운영/
├── Backend_API/            # BA: API 버그 수정 및 최적화
├── Database/               # D: 데이터 백업 설정
├── DevOps/                 # O: 프로덕션 배포, 도메인 연결, SSL
├── Documentation/          # M: 운영 매뉴얼
├── Frontend/               # F: 버그 수정
└── Security/               # S: 보안 점검 및 패치
```

**핵심 작업:**
- 배포 및 도메인 연결
- 모니터링
- 유지보수

---

## 📦 Production/ (종합집결지)

**용도:** S1-S5 작업 결과가 모이는 실제 배포용 코드

```
Production/
├── Frontend/               # 프론트엔드 코드 (HTML, CSS, JS)
├── Backend_API/            # API 코드 (Serverless Functions)
└── Database/               # DB 스키마 (SQL 파일)
```

**워크플로우:**
1. 각 Stage(S1-S5)에서 작업 수행
2. 작업 완료 후 Production/에 반영
3. Production/은 항상 배포 가능한 최신 상태 유지

**장점:**
- 버전 관리: 각 Stage에 작업 이력 남음
- 추적 가능: 언제, 어디서 변경됐는지 파악
- 배포 기준점 명확: Production/ = 배포 대상

---

## 📂 독립 폴더 상세 설명

### Project-SSAL-Grid/

**용도:** 프로젝트 그리드 관리 시스템

```
Project-SSAL-Grid/
├── manual/                 # 매뉴얼
│   ├── PROJECT_SSAL_GRID_MANUAL.md
│   └── references/                 # 참조 문서
│       ├── SSALWORKS_TASK_PLAN.md
│       ├── SSALWORKS_5x11_MATRIX.md
│       └── TASK_SELECTION_MATRIX.md
├── ssal-grid/              # SSAL Grid 코어
├── supabase/               # Supabase 연동
└── viewer/                 # 그리드 뷰어
```

**프로젝트 그리드란?**
- 3차원 그리드로 모든 개발 작업 관리
- X축 (Stage): S1 → S2 → S3 → S4 → S5
- Y축 (Area): DevOps, Database, Backend, Frontend, Test 등
- Z축 (Level): 개별 Task (S1F1, S2BA3 등)

---

### Web_ClaudeCode_Bridge/

**용도:** 웹사이트 ↔ Claude Code 정보 교환 브릿지

```
Web_ClaudeCode_Bridge/
├── Inbox/                  # 웹사이트 → Claude Code (입력)
└── Outbox/                 # Claude Code → 웹사이트 (출력)
```

**작업 흐름:**
1. 웹사이트에서 Order Sheet를 `Inbox/`에 저장
2. Claude Code가 읽고 작업 수행
3. 결과 보고서를 `Outbox/`에 생성
4. 웹사이트에서 결과 확인

---

### AI_Link/

**용도:** AI 서비스 연동

```
AI_Link/
└── AI/
    ├── ChatGPT/            # ChatGPT 연동
    ├── Gemini/             # Gemini 연동
    └── Perplexity/         # Perplexity 연동
```

---

### Sidebar-Process-Tools/

**용도:** 플랫폼 사이드바의 프로세스 관리 도구

```
Sidebar-Process-Tools/
├── progress_data/          # 진도 추적 데이터
└── sidebar_generation/     # 사이드바 자동 생성
```

---

### 학습용_콘텐츠/

**용도:** 학습 자료 및 개발 지식 저장소

```
학습용_콘텐츠/
├── 1_Claude_사용법/        # Claude & Claude Code 가이드
│   └── Claude&ClaudeCode사용법/
├── 2_웹개발_지식/          # 웹 개발 관련 지식
│   ├── Web_Development/
│   └── 웹개발 기초지식/
└── 3_AI_도구_활용/         # AI 도구 활용
    └── Claude_Code/
```

**중요:**
- 모든 파일은 Markdown (.md) 형식
- 사용법 = 학습용_콘텐츠 (여기)

---

### 참고자료/

**용도:** 분류하기 애매한 참고용 파일

```
참고자료/
└── Project_Grid_DB/        # 프로젝트 그리드 DB 참고
```

---

### .claude/

**용도:** Claude Code 설정 및 커스터마이징

```
.claude/
├── CLAUDE.md               # Claude에게 주는 전역 지시사항
├── commands/               # Slash Commands (14개)
├── skills/                 # Skills (16개)
├── subagents/              # Subagents (18개)
├── workflows/              # 워크플로우
└── work_logs/              # 작업 로그
    ├── current.md          # 현재 활성 로그
    └── archive/            # 아카이브
```

**Skills (16개):** 특정 작업에 특화된 워크플로우
**Subagents (18개):** 전문 분야별 AI 어시스턴트
**Commands (14개):** 슬래시 명령어로 빠른 작업

---

## 🎯 파일을 어디에 저장해야 할까?

### 빠른 참조 테이블

| 파일 유형 | 저장 위치 |
|----------|----------|
| 사업 계획서 | `P1_사업계획/` |
| UI/UX 목업 | `P2_프로젝트_기획/UI_UX_Mockup/Mockups/` |
| 와이어프레임 | `P2_프로젝트_기획/UI_UX_Mockup/Wireframes/` |
| 사용자 플로우 | `P2_프로젝트_기획/User_Flows/` |
| 개발 환경 설정 | `S1_개발_준비/Backend_Infra/` |
| HTML 페이지 | 해당 Stage `Frontend/` + `Production/Frontend/` |
| SQL 파일 | 해당 Stage `Database/` + `Production/Database/` |
| API 코드 | 해당 Stage `Backend_API/` + `Production/Backend_API/` |
| 테스트 코드 | 해당 Stage `Testing/` |
| 배포 설정 | 해당 Stage `DevOps/` |
| 배포용 코드 | `Production/` (종합집결지) |
| 학습 자료 | `학습용_콘텐츠/` |
| Order Sheet | `Web_ClaudeCode_Bridge/Inbox/` |
| 작업 결과 보고 | `Web_ClaudeCode_Bridge/Outbox/` |

### 체크리스트

**Q: 학습용 문서를 작성했어요**
→ `학습용_콘텐츠/`

**Q: HTML 페이지를 만들었어요**
→ 해당 Stage의 `Frontend/` + `Production/Frontend/`에 반영

**Q: SQL 파일을 작성했어요**
→ 해당 Stage의 `Database/` + `Production/Database/`에 반영

**Q: API 코드를 작성했어요**
→ 해당 Stage의 `Backend_API/` + `Production/Backend_API/`에 반영

**Q: 테스트 코드를 작성했어요**
→ 해당 Stage의 `Testing/`

**Q: 어디에 넣어야 할지 모르겠어요**
→ `참고자료/` (임시 보관 후 나중에 정리)

---

## 🛠️ 기술 스택 정리

### Frontend
- HTML5, CSS3 (Flexbox, Grid)
- JavaScript (ES6+, Vanilla)
- DOMPurify (XSS 방지)

### Backend
- **Supabase**
  - PostgreSQL (데이터베이스)
  - Auth (인증 - 이메일/비밀번호, Google OAuth)
  - RLS (Row Level Security)
  - REST API

### Deployment
- Vercel (Frontend + Serverless)

### External Services
- **Resend**: 이메일
- **토스 페이먼트**: 결제
- **Google OAuth**: 소셜 로그인

### AI & Automation
- **Claude Code** (Skills 16개, Subagents 18개, Commands 14개)

---

## 📝 중요 원칙 및 규칙

### ✅ 반드시 지켜야 할 것

1. **P1-P3는 GRID 범위 밖** (예비단계)
2. **S1-S5는 GRID로 관리** (실행단계)
3. **네이밍 규칙 준수** (대분류: 한글+숫자, 하위: 영문)
4. **순서대로 진행** (P1 → P2 → P3 → S1 → S2 → S3 → S4 → S5)
5. **문서화 필수**

### ❌ 절대 하지 말아야 할 것

1. **기획 없이 코딩 시작**
2. **디렉토리 구조 무시**
3. **비밀 정보 Git에 올리기** (.env 파일은 .gitignore에)
4. **문서 없이 코드만 작성**

---

## ⚠️ 현재 프로젝트 상태

### 완료
- ✅ P1_사업계획
- ✅ P2_프로젝트_기획
- ✅ P3_프로토타입_제작 (Agenda #1~#10)

### 대기 중
- ⏳ S1_개발_준비
- ⏳ S2_개발-1차
- ⏳ S3_개발-2차
- ⏳ S4_개발-3차
- ⏳ S5_운영

### 주의 사항
- ⚠️ 개발용 RLS 정책 적용 중 (프로덕션 배포 전 교체 필요)
- ⚠️ 토스 페이먼트 연동 대기 (가맹점 등록 필요)

---

## 📝 문서 수정 이력

| 버전 | 수정일 | 수정 내용 | 수정자 |
|-----|--------|---------|--------|
| v1.0 | 2025-11-17 | 초기 문서 작성 | Claude Code |
| v2.0 | 2025-11-17 | 콘텐츠 → 학습용_콘텐츠 변경 | Claude Code |
| v3.0 | 2025-11-17 | 사업계획 → P1_사업계획 변경 | Claude Code |
| v4.0 | 2025-11-17 | 실전 프로젝트 참고 구조 개선 | Claude Code |
| v5.0 | 2025-12-02 | P2, P3 폴더 구조 상세화 | Claude Code |
| v6.0 | 2025-12-12 | 전면 재작성: P1-P3 + S1-S5 실제 구조 반영 | Claude Code |
| v7.0 | 2025-12-13 | S1-S5 구조를 SSALWORKS_TASK_PLAN.md와 완전 일치하도록 수정 | Claude Code |
| **v8.0** | **2025-12-13** | **Production/ 종합집결지 추가, 체크리스트 개선** | Claude Code |

---

**현재 버전:** v8.0
**작성자:** SSALWorks Team
**마지막 업데이트:** 2025-12-13
