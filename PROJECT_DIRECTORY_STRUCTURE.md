# SSALWorks 프로젝트 디렉토리 구조 가이드

> **버전**: v6.0
> **최종 업데이트**: 2025-12-12
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
# ========== 독립 폴더 ==========
├── Project-SSAL-Grid/           # 프로젝트 그리드 관리 시스템
├── Web_ClaudeCode_Bridge/       # AI ↔ 웹 플랫폼 브릿지
├── AI_Link/                     # AI 서비스 연동 (ChatGPT, Gemini, Perplexity)
├── Sidebar-Process-Tools/       # 사이드바 프로세스 관리 도구
├── 학습용_콘텐츠/                # 학습 및 참고 자료
├── 참고자료/                    # 참고용 파일들
├── scripts/                     # 유틸리티 스크립트
│
# ========== 설정 폴더 ==========
├── .claude/                     # Claude Code 설정
├── .git/                        # Git 저장소
├── .github/                     # GitHub 설정 (Actions, etc.)
│
# ========== 루트 파일 ==========
├── PROJECT_DIRECTORY_STRUCTURE.md   # 이 파일!
├── PROJECT_STATUS.md                # 프로젝트 진행 상황
├── .gitignore                       # Git 제외 파일 목록
└── package.json                     # Node.js 의존성
```

---

## 🎯 디렉토리 네이밍 규칙

### 규칙 1: 예비단계는 P + 숫자
```
✅ P1_사업계획/
✅ P2_프로젝트_기획/
✅ P3_프로토타입_제작/
```

### 규칙 2: 실행단계는 S + 숫자
```
✅ S1_개발_준비/
✅ S2_개발-1차/
✅ S3_개발-2차/
✅ S4_개발-3차/
✅ S5_운영/
```

### 규칙 3: 하위 폴더는 영문 사용
```
✅ P2_프로젝트_기획/User_Flows/
✅ S2_개발-1차/Backend_API/
❌ S2_개발-1차/백엔드_API/  (한글 사용 X)
```

---

## 🔄 개발 프로세스 흐름

```
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
├── BusenessPlan/           # 사업 계획서
└── Patent/                 # 특허 관련
```

**언제 사용하나요?**
- 사업 계획 수립할 때
- 투자 유치 자료 준비할 때
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
    └── Proto_Backup/               # 백업 파일
```

**현재 상태:** ✅ Agenda #1~#10 완료
- 15개 DB 테이블
- 22개 HTML 페이지
- Admin Dashboard 8개 섹션

---

## 📂 실행단계 (S1-S5) 상세 구조

### S1_개발_준비/

**용도:** 개발 환경 구축 및 준비 (GRID 관리)

```
S1_개발_준비/
├── Backend_Infra/          # 백엔드 인프라 설정
│   ├── Docker/                     # Docker 컨테이너화
│   ├── Environment/                # 환경 변수
│   ├── Git/                        # Git 설정
│   ├── Node/                       # Node.js 설치
│   ├── Supabase/                   # Supabase CLI
│   └── Vercel/                     # Vercel CLI
├── Database/               # 데이터베이스 초기 설정
├── Documentation/          # 문서화
│   ├── manual/                     # 매뉴얼
│   ├── project_grid/               # 프로젝트 그리드
│   ├── scripts/                    # 스크립트
│   ├── tasks/                      # 작업 목록
│   └── validation/                 # 검증
└── Security/               # 보안 초기 설정
```

**핵심 작업:**
- 개발 환경 구축
- RLS 정책 설정
- CI/CD 파이프라인 구축

---

### S2_개발-1차/ (핵심 기능)

**용도:** 1차 개발 - 핵심 기능 구현 (GRID 관리)

```
S2_개발-1차/
├── Backend_API/            # 백엔드 API
├── Backend_Infra/          # 백엔드 인프라
├── Content_System/         # 콘텐츠 시스템
├── Database/               # 데이터베이스
│   ├── scripts/                    # DB 스크립트
│   └── Supabase/                   # Supabase 설정
├── Design/                 # 디자인
├── DevOps/                 # DevOps
│   ├── CI_CD/                      # CI/CD 파이프라인
│   ├── Environment_Variables/      # 환경 변수
│   ├── Production_Config/          # 프로덕션 설정
│   ├── scripts/                    # 배포 스크립트
│   └── Vercel_Deploy/              # Vercel 배포
├── Documentation/          # 문서화
├── External/               # 외부 서비스
│   ├── Email/                      # 이메일 (Resend)
│   └── Payments/                   # 결제 (TossPayments)
├── Frontend/               # 프론트엔드
│   ├── css/                        # 스타일시트
│   ├── js/                         # JavaScript
│   ├── pages/                      # 페이지
│   └── public/                     # 정적 파일
├── Security/               # 보안/인증
│   ├── Email_Auth/                 # 이메일 인증
│   ├── Google_OAuth/               # Google OAuth
│   └── Session_Management/         # 세션 관리
└── Testing/                # 테스트
    ├── 1_api/                      # API 테스트
    ├── 2_auth/                     # 인증 테스트
    ├── 3_e2e/                      # E2E 테스트
    ├── 4_integration/              # 통합 테스트
    ├── 5_unit/                     # 단위 테스트
    ├── Hotfix/                     # 긴급 수정
    ├── Patch/                      # 일반 패치
    ├── Performance_Tuning/         # 성능 튜닝
    └── Troubleshooting/            # 문제 해결
```

**핵심 작업:**
- OAuth 연동 (Google)
- 이메일 서비스 연동 (Resend)
- 핵심 API 개발

---

### S3_개발-2차/ (확장 기능)

**용도:** 2차 개발 - 확장 기능 구현 (GRID 관리)

**구조:** S2_개발-1차/와 동일

**핵심 작업:**
- 그리드 API 개발
- AI 서비스 연동

---

### S4_개발-3차/ (고급 기능)

**용도:** 3차 개발 - 고급 기능 구현 (GRID 관리)

**구조:** S2_개발-1차/와 동일

**핵심 작업:**
- 결제 연동 (TossPayments)
- 관리자 기능 강화
- QA 및 최적화

---

### S5_운영/

**용도:** 서비스 운영 및 유지보수 (GRID 관리)

```
S5_운영/
├── Backend_API/            # 운영 API
├── Content_System/         # 콘텐츠 시스템
├── Database/               # 데이터베이스 운영
├── DevOps/                 # DevOps 운영
├── Documentation/          # 운영 문서
├── External/               # 외부 서비스 운영
├── Frontend/               # 프론트엔드 운영
├── Security/               # 보안 운영
└── Testing/                # 운영 테스트
```

**핵심 작업:**
- 배포 및 도메인 연결
- 모니터링
- 유지보수

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
│       ├── SSALWORKS_6x11_MATRIX.md
│       └── TASK_SELECTION_MATRIX.md
├── supabase/               # Supabase 연동
├── task-instructions/      # 작업 지시서
├── verification-instructions/  # 검증 지시서
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
├── 3_AI_도구_활용/         # AI 도구 활용
│   └── Claude_Code/
└── 3_기타/                 # 기타 콘텐츠
    ├── AI_Prompting/
    ├── Project_Management/
    └── Writing_Guide/
```

**중요:**
- 모든 파일은 Markdown (.md) 형식
- 사용법 = 학습용_콘텐츠 (여기)
- 설치법 = S1_개발_준비/Backend_Infra/

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
| 프로토타입 HTML | `P3_프로토타입_제작/Frontend/Prototype/` |
| SQL 파일 | `P3_프로토타입_제작/Database/` |
| 개발 환경 설정 | `S1_개발_준비/Backend_Infra/` |
| API 코드 | `S2~S4_개발/Backend_API/` |
| 테스트 코드 | `S2~S4_개발/Testing/` |
| 배포 설정 | `S2~S4_개발/DevOps/` |
| 학습 자료 | `학습용_콘텐츠/` |
| Order Sheet | `Web_ClaudeCode_Bridge/Inbox/` |
| 작업 결과 보고 | `Web_ClaudeCode_Bridge/Outbox/` |

### 체크리스트

**Q: 새로운 가이드 문서를 작성했어요**
→ `학습용_콘텐츠/`

**Q: HTML 프로토타입 페이지를 만들었어요**
→ `P3_프로토타입_제작/Frontend/Prototype/pages/`

**Q: SQL 파일을 작성했어요**
→ `P3_프로토타입_제작/Database/`

**Q: API 코드를 작성했어요**
→ `S2_개발-1차/Backend_API/` (또는 해당 Stage)

**Q: 테스트 코드를 작성했어요**
→ `S2_개발-1차/Testing/` (또는 해당 Stage)

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
| **v6.0** | **2025-12-12** | **전면 재작성: P1-P3 + S1-S5 실제 구조 반영** | Claude Code |

---

**현재 버전:** v6.0
**작성자:** SSALWorks Team
**마지막 업데이트:** 2025-12-12
