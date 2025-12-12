# SSALWorks 프로젝트 디렉토리 구조 가이드

> 초보자를 위한 완벽 가이드
> SaaS 구독형 학습 + 프로젝트 관리 통합 플랫폼
> 최종 업데이트: 2025-12-02
> 주요 변경: Workflow 문서 추가 (Admin_Operations, System_Automation, Integrated_Journey, Admin_Dashboard_Features)

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
# ========== 순차적 개발 프로세스 ==========
├── P1_사업계획/                  # 0단계: 비즈니스 계획
├── P2_프로젝트_기획/              # 1단계: 프로젝트 기획
├── P3_프로토타입_제작/            # 2단계: 프로토타입 제작
├── 2_개발준비/                  # 3단계: 개발 환경 준비
├── 3_개발/                      # 4단계: 실제 개발 (가장 큼!)
├── 4_운영/                      # 5단계: 서비스 운영
│
# ========== 독립 폴더 (프로젝트 외부) ==========
├── AI_Link/                    # AI 서버 (ChatGPT, Gemini 연동)
├── Sidebar_Process_Tools/       # 사이드바 프로세스 관리 도구
├── 학습용_콘텐츠/                # 학습 및 참고 자료
├── 참고자료/                    # 참고용 파일들
├── Web_ClaudeCode_Bridge/       # AI 작업 폴더
├── .claude/                    # Claude 설정
├── .git/                       # Git 저장소
├── .gitignore                  # Git 제외 파일 목록
│
# ========== 루트 파일 ==========
├── README.md                        # 프로젝트 소개
├── PROJECT_DIRECTORY_STRUCTURE.md   # 이 파일!
└── PROJECT_STATUS.md                # 프로젝트 진행 상황
```

---

## 🎯 디렉토리 네이밍 규칙

**일관성 있는 네이밍으로 혼란 방지!**

### 규칙 1: 대분류는 한글
```
✅ P2_프로젝트_기획/
✅ 2_개발준비/
✅ 3_개발/
❌ 1_Planning/  (영어 사용 X)
```

### 규칙 2: 하위 폴더는 영문
```
✅ P2_프로젝트_기획/1-1_Project_Plan/
✅ 3_개발/3-1_Frontend/
❌ P2_프로젝트_기획/1-1_프로젝트_계획/  (한글 사용 X)
```

### 규칙 3: 독립 폴더는 상황에 따라
```
✅ P1_사업계획/    (숫자+한글)
✅ Web_ClaudeCode_Bridge/   (영문)
✅ 학습용_콘텐츠/  (한글)
```

**왜 이렇게 하나요?**
- 한글: 직관적이고 이해하기 쉬움
- 영문: 코드/시스템과 호환성 좋음
- 혼용: 각각의 장점을 활용

---

## 📂 순차적 개발 프로세스

### P1_사업계획/

**용도:** 비즈니스 전략 및 계획 (Phase 0)

**왜 0단계인가요?**
개발 전에 먼저 사업 계획을 수립해야 합니다. 비즈니스 모델, 수익 구조, 타겟 사용자 등을 명확히 정의합니다.

**구조:**
```
P1_사업계획/
├── 0-1_Vision_Mission/         # 비전과 미션
├── 0-2_Market_Analysis/        # 시장 분석
└── 0-3_Business_Model/         # 비즈니스 모델
```

**언제 사용하나요?**
- 사업 계획 수립할 때
- 투자 유치 자료 준비할 때
- 사업 방향 검토할 때

---

### P2_프로젝트_기획/

**용도:** 프로젝트 기획 및 설계 (Phase 1)

**구조:**
```
P2_프로젝트_기획/
├── 1-1_Project_Plan/            # 프로젝트 계획
├── 1-2_User_Flows/              # 사용자 플로우
├── 1-3_Requirements/            # 기능 요구사항
├── 1-4_User_Stories/            # 사용자 스토리
├── 1-5_Design_System/           # 디자인 시스템
├── 1-6_UI_UX_Mockup/            # UI/UX 목업
│   ├── README.md               # 폴더 설명서
│   ├── Wireframes/             # 와이어프레임 (화면 배치 설계도)
│   ├── Mockups/                # 목업 (HTML 시각적 샘플)
│   │   ├── dashboard-mockup.html
│   │   ├── admin-dashboard.html
│   │   └── manual.html
│   ├── Design_Specs/           # 디자인 명세 (개발자 인계용)
│   │   └── website_layout_structure.md
│   └── ADMIN_DASHBOARD_설계.md  # 관리자 대시보드 종합 설계서
└── 1-7_Tech_Stack/              # 기술 스택
```

**언제 사용하나요?**
- 프로젝트 요구사항 정의
- UI/UX 디자인 및 목업 제작
- 데이터베이스 스키마 설계

---

### 2_개발준비/

**용도:** 개발 환경 및 도구 준비 (Phase 2)

**구조:**
```
2_개발준비/
├── 2-1_Tech_Stack/              # 기술 스택 선정
├── 2-2_Architecture/            # 아키텍처 설계
├── 2-3_Development_Setup/       # 개발 환경 설정
└── 2-4_Project_Grid/            # 프로젝트 그리드
```

---

### 3_개발/

**용도:** 실제 코드 개발 (Phase 3)

**구조:**
```
3_개발/
├── 3-1_Frontend/                # 프론트엔드
│   ├── css/
│   ├── js/
│   ├── pages/
│   └── public/
├── 3-2_Engines/                 # 엔진 개발
├── 3-3_Authentication/          # 인증
│   ├── Email_Auth/
│   ├── Google_OAuth/
│   └── Session_Management/
├── 3-4_Backend_Infra/           # 백엔드 인프라
├── 3-5_Backend_APIs/            # 백엔드 API
├── 3-6_Database/                # 데이터베이스
│   ├── Supabase/
│   │   ├── migrations/
│   │   └── seeds/
│   └── scripts/
├── 3-7_External_Services/       # 외부 서비스
│   ├── Email/
│   │   └── Resend/
│   └── Payments/
│       └── TossPayments/
├── 3-8_Test/                    # 테스트
│   ├── 1_api/
│   ├── 2_auth/
│   ├── 3_e2e/
│   ├── 4_integration/
│   └── 5_unit/
├── 3-9_Deployment/              # 배포
│   ├── .github/
│   │   └── workflows/
│   ├── CI_CD/
│   ├── Environment_Variables/
│   ├── Production_Config/
│   ├── scripts/
│   └── Vercel_Deploy/
└── 3-10_Stabilization/          # 안정화
    ├── Hotfix/
    ├── Patch/
    ├── Performance_Tuning/
    └── Troubleshooting/
```

---

### 4_운영/

**용도:** 서비스 운영 및 유지보수 (Phase 4)

**구조:**
```
4_운영/
├── 4-1_Monitoring/              # 모니터링
├── 4-2_Maintenance/             # 유지보수
├── 4-3_Backup/                  # 백업
└── 4-4_Security/                # 보안
```

---

## 📂 독립 폴더 상세 설명

### 학습용_콘텐츠/

**용도:** 학습 자료 및 개발 지식 저장소

**왜 독립 폴더인가요?**
학습 자료는 지속적으로 추가/수정되며, 개발과 독립적으로 관리됩니다. 개발자가 참고하고 학습하는 자료들을 체계적으로 정리합니다.

**3대 분류:**
```
학습용_콘텐츠/
├── 1_Claude_사용법/             # Claude & Claude Code 가이드
│   ├── Claude&ClaudeCode사용법/
│   ├── Claude_Code/
│   └── Claude_가이드.md
│
├── 2_웹개발_지식/               # 웹 개발 관련 지식
│   ├── Git/                    # Git 사용법
│   ├── Vercel/                 # Vercel 사용법
│   ├── Supabase/               # Supabase 사용법
│   ├── Web_Development/
│   └── 웹개발 기초지식/
│
└── 3_기타/                      # 기타 콘텐츠
    ├── AI_Prompting/           # AI 프롬프팅
    ├── Project_Management/     # 프로젝트 관리
    └── Writing_Guide/          # 글쓰기 가이드
```

**언제 사용하나요?**
- 새로운 가이드 작성할 때
- 기존 학습 자료 수정할 때
- 개발 지식 문서 추가할 때

**중요:**
- 모든 파일은 Markdown (.md) 형식
- 사용법 = 학습용_콘텐츠 (여기)
- 설치법 = 개발준비 (2_개발준비/)

---

### 참고자료/

**용도:** 분류하기 애매한 참고용 파일

**왜 필요한가요?**
모든 파일을 엄격하게 분류하면 오히려 복잡해집니다. 임시 파일, 예제, 실험적인 코드 등을 보관합니다.

**구조:**
```
참고자료/
├── Project_Grid_DB/         # 프로젝트 그리드 DB 참고
│   ├── project_grid_schema.sql
│   ├── create_project_grid_table.sql
│   ├── insert_sample_tasks.sql
│   └── README.md
├── examples/                # 예제 코드
├── experiments/             # 실험적인 코드
└── temp/                    # 임시 파일
```

**언제 사용하나요?**
- 어디에 넣어야 할지 애매할 때
- 임시로 보관할 파일이 있을 때
- 나중에 정리할 예정인 파일

---

### Sidebar_Process_Tools/

**용도:** 플랫폼 사이드바의 프로세스 관리 도구

**왜 독립 폴더인가요?**
이 도구들은 SSALWorks 프로젝트 자체가 아니라, 플랫폼 사이드바를 관리하기 위한 메타 도구입니다. 다른 사용자가 이 플랫폼을 사용할 때는 자신의 프로젝트를 관리하게 되므로, 이런 관리 도구는 별도로 분리되어 있습니다.

**구조:**
```
Sidebar_Process_Tools/
├── progress_data/                              # 진도 추적 데이터
│   ├── phase0_business_planning.json
│   ├── phase1_planning.json
│   └── phase2_dev_preparation.json
└── sidebar_generation/                         # 사이드바 자동 생성
    ├── sidebar_process_structure_CORRECTED.md  # 사이드바 구조 (수동 작성)
    ├── sidebar_structure.json                  # 사이드바 JSON (자동 생성)
    ├── sidebar_preview.html                    # HTML 미리보기
    ├── generate_sidebar_json.js                # JSON 생성 스크립트
    ├── generate_sidebar_from_structure.js      # 구조 파싱 스크립트
    ├── master_watcher.js                       # 자동화 감시자
    └── sidebar_watcher.js                      # 사이드바 전용 감시자
```

**자동화 파이프라인:**
```
PROJECT_DIRECTORY_STRUCTURE.md (변경)
    ↓
master_watcher.js (감지)
    ↓
generate_sidebar_from_structure.js (실행)
    ↓
sidebar_process_structure_CORRECTED.md (생성)
    ↓
generate_sidebar_json.js (실행)
    ↓
sidebar_structure.json + sidebar_preview.html (생성)
    ↓
대시보드 자동 업데이트
```

**언제 사용하나요?**
- 프로젝트 구조 변경 시 자동으로 사이드바 업데이트
- 진도 추적 데이터 관리
- 사이드바 미리보기 확인

---

### Web_ClaudeCode_Bridge/

**용도:** 웹사이트 ↔ Claude Code 정보 교환 브리지

**어떻게 동작하나요?**
```
Web_ClaudeCode_Bridge/
├── inbox/                      # 웹사이트 → Claude Code (입력)
│   └── task_P1F1.json
└── outbox/                     # Claude Code → 웹사이트 (출력)
    └── result_P1F1.json
```

**작업 흐름:**
1. 웹사이트에서 작업 지시를 `inbox/`에 저장
2. Claude Code가 읽고 작업 수행
3. Claude Code가 프로젝트 그리드 DB 업데이트 (Supabase)
4. Claude Code가 뷰어 업데이트
5. 결과 보고가 `outbox/`에 생성됨
6. 웹사이트는 뷰어에서 결과 확인

**언제 사용하나요?**
- 프로젝트 그리드 자동화
- CI/CD 통합
- 실시간 작업 모니터링

**중요:**
- 프로젝트 그리드 DB 업데이트는 Claude Code가 직접 수행
- 웹사이트는 결과 확인만 함 (업데이트 X)

---

### .claude/

**용도:** Claude Code 설정 및 커스터마이징

**왜 중요한가요?**
Claude Code의 모든 동작 방식을 여기서 설정합니다. 이 폴더를 잘 설정하면 AI가 더 똑똑하게 작동합니다!

**구조:**
```
.claude/
├── CLAUDE.md                   # Claude에게 주는 전역 지시사항
├── settings.local.json         # 권한 설정
├── mcp_servers.json            # 외부 서비스 연결 (GitHub, Supabase, Vercel)
│
├── skills/                     # Skills (16개)
│   ├── api-builder.md
│   ├── code-review.md
│   ├── db-schema.md
│   └── ... (총 16개)
│
├── subagents/                  # Subagents (18개)
│   ├── backend-developer.md
│   ├── frontend-developer.md
│   ├── code-reviewer.md
│   └── ... (총 18개)
│
└── commands/                   # Slash Commands (14개)
    ├── commit.md
    ├── review.md
    ├── test.md
    └── ... (총 14개)
```

#### CLAUDE.md
**역할:** Claude에게 주는 전역 규칙 (SSALWorks 프로젝트 전용)

**위치:** `C:/SSAL_Works/.claude/CLAUDE.md`

**중요 규칙:**
```markdown
# ⚠️ 🚨 CRITICAL: 파일 저장 위치 철칙
- 반드시 PROJECT_DIRECTORY_STRUCTURE.md에 정의된 폴더에만 저장
- 적절한 폴더가 없으면 사용자에게 문의 후 승인 받기
- 임의로 새 폴더 생성 금지

# 코딩 규칙
- 항상 TypeScript 사용
- 함수는 최대 50줄
- 주석은 한글로 작성
```

**프로젝트별 적용:**
- 이 파일은 SSALWorks 프로젝트에만 적용됨
- 다른 프로젝트에는 영향 없음

#### settings.local.json
**역할:** 자동 승인할 명령어 설정

**예시:**
```json
{
  "permissions": {
    "allow": ["Bash(mkdir:*)"],  // mkdir 자동 허용
    "deny": [],                   // 거부 목록
    "ask": []                     // 물어볼 목록
  }
}
```

#### mcp_servers.json
**역할:** GitHub, Supabase, Vercel 연결

**현재 설정:** (토큰은 나중에 입력)
- GitHub: Issue, PR 관리
- Supabase: 데이터베이스 접근
- Vercel: 배포 상태 확인

#### skills/ (16개)
**역할:** 특정 작업에 특화된 워크플로우

**예시:**
- `api-builder.md`: API 만들기
- `db-schema.md`: DB 스키마 설계
- `test-runner.md`: 테스트 실행

**언제 작동하나요?**
Claude가 자동으로 판단해서 필요할 때 로드합니다.

#### subagents/ (18개)
**역할:** 전문 분야별 AI 어시스턴트

**Anthropic 공식 (3개):**
1. code-reviewer - 코드 리뷰
2. debugger - 디버깅
3. data-scientist - 데이터 분석

**커뮤니티 인기 (15개):**
4. backend-developer - 백엔드 개발
5. frontend-developer - 프론트엔드 개발
6. database-developer - DB 개발
7. devops-troubleshooter - 배포 문제 해결
8. test-runner - 테스트
9. ui-designer - UI 디자인
10. security-auditor - 보안 검사
11. performance-optimizer - 성능 최적화
12. documentation-writer - 문서 작성
13. refactoring-specialist - 리팩토링
14. api-designer - API 설계
15. copywriter - 카피라이팅
16. fullstack-developer - 풀스택 개발
17. security-specialist - 보안 전문
18. test-engineer - 테스트 엔지니어

**사용법:**
```
사용자: "백엔드 API 만들어줘"
→ backend-developer subagent 자동 활성화
```

#### commands/ (14개)
**역할:** 슬래시 명령어로 빠른 작업

**목록:**
1. `/commit` - 자동 커밋
2. `/review` - 코드 리뷰
3. `/test` - 테스트 실행
4. `/deploy` - 배포
5. `/optimize` - 최적화
6. `/api-design` - API 설계
7. `/debug` - 디버깅
8. `/deploy-check` - 배포 체크
9. `/docs-gen` - 문서 생성
10. `/perf-test` - 성능 테스트
11. `/refactor` - 리팩토링
12. `/security-audit` - 보안 감사
13. `/test-gen` - 테스트 생성
14. `/evaluate` - 평가

**사용법:**
```
사용자: "/commit"
→ Git 상태 확인, 커밋 메시지 생성, 푸시 자동 실행
```

---

### .git/

**용도:** Git 버전 관리 시스템

**자동 생성:** `git init` 명령어로 생성

**건드리지 마세요!**
이 폴더는 Git이 자동으로 관리합니다. 직접 수정하면 저장소가 망가질 수 있습니다.

---

### .gitignore

**용도:** Git에서 제외할 파일 목록

**왜 필요한가요?**
모든 파일을 Git에 올릴 필요는 없습니다. 비밀 정보, 임시 파일 등은 제외해야 합니다.

**예시:**
```
# 환경 변수 (비밀번호 등)
.env
.env.local

# Node 모듈
node_modules/

# 빌드 결과물
dist/
build/

# 로그
*.log
```

---

## 🔢 순차적 개발 프로세스 (0→1→2→3→4)

### 왜 번호가 있나요?

**순서대로 진행해야 하기 때문입니다!**

```
P1_사업계획 → P2_프로젝트_기획 → P3_프로토타입_제작 → 2_개발준비 → 3_개발 → 4_운영
```

**규칙:**
- 이전 단계가 끝나야 다음 단계 시작
- 번호로 진행 상황 파악 가능
- 신규 팀원도 쉽게 이해

---

## 1️⃣ P2_프로젝트_기획/

**목적:** 무엇을 만들지 결정하는 단계

**이 단계에서 하는 일:**
- 어떤 기능이 필요한가?
- 화면은 어떻게 생겼는가?
- 사용자 플로우는 어떻게 되는가?

**구조:**
```
P2_프로젝트_기획/
├── 1-1_Project_Plan/           # 프로젝트 계획
│   └── PROJECT_PLAN.md              # 종합 프로젝트 계획서
│
├── 1-2_User_Flows/             # 사용자 플로우
│   ├── 1_Signup/                    # 회원가입 플로우
│   ├── 2_Login/                     # 로그인 플로우
│   └── 5_Home_Screen_User_Guide.md  # 홈 화면 가이드 (11개 영역)
│
├── 1-3_Requirements/           # 기능 요구사항
│   └── functional_requirements.md   # 기능 요구사항
│
├── 1-4_User_Stories/           # 사용자 스토리
│
├── 1-5_Design_System/          # 디자인 시스템
│   └── DESIGN_SYSTEM_V2.md          # 디자인 시스템 문서
│
├── 1-6_UI_UX_Mockup/           # UI/UX 목업
│   ├── README.md                    # 폴더 설명서
│   ├── Wireframes/                  # 와이어프레임 (화면 배치 설계도)
│   ├── Mockups/                     # 목업 (HTML 시각적 샘플)
│   │   ├── dashboard-mockup.html
│   │   ├── admin-dashboard.html
│   │   └── manual.html
│   ├── Design_Specs/                # 디자인 명세 (개발자 인계용)
│   │   └── website_layout_structure.md
│   └── ADMIN_DASHBOARD_설계.md       # 관리자 대시보드 종합 설계서
│
└── 1-7_Tech_Stack/             # 기술 스택
    └── TECH_STACK.md                # 기술 스택 문서
```

### 1-1_Project_Plan/

**무엇을 담나요?**
- **PROJECT_PLAN.md**: 종합 프로젝트 계획서 (목표, 기능, 일정 등)

**예시 (PROJECT_PLAN.md 구조):**
```markdown
# SSALWorks 프로젝트 계획

## 1. 프로젝트 개요
## 2. 핵심 기능 (11개 영역)
## 3. 기술 스택
## 4. 개발 일정
## 5. 팀 구성
```

### 1-2_User_Flows/

**사용자 플로우가 무엇인가요?**
사용자가 서비스를 어떻게 사용하는지 단계별로 정리한 문서입니다.

**현재 구조:**
- **1_Signup/**: 회원가입 플로우 (ui_specs.md 포함)
- **2_Login/**: 로그인 플로우
- **5_Home_Screen_User_Guide.md**: 홈 화면 11개 영역 가이드

**예시 (회원가입 플로우):**
```
1. 회원가입 버튼 클릭
2. 이메일/비밀번호 입력
3. 웰컴 팝업 (11개 영역 소개)
4. 홈 화면 이동
```

### 1-6_UI_UX_Mockup/

**Wireframe vs Mockup vs Prototype 차이**

| 구분 | Wireframe | Mockup | Prototype |
|------|-----------|--------|-----------|
| 목적 | 화면 배치 설계 | 시각적 샘플 | 실제 작동 코드 |
| 해상도 | 저해상도 | 고해상도 | 고해상도 |
| DB 연결 | ❌ 없음 | ❌ 없음 | ✅ 있음 |
| 완성도 | 낮음 | 중간 | 높음 |
| 위치 | 여기 | 여기 | `P3_프로토타입_제작/` |

**폴더 구조:**
- **Wireframes/**: 화면 배치 설계도 (박스와 화살표)
- **Mockups/**: HTML/CSS로 만든 시각적 샘플
- **Design_Specs/**: 개발자 인계용 기술 명세서
- **ADMIN_DASHBOARD_설계.md**: 관리자 대시보드 종합 설계서

**작업 순서:**
```
Wireframes → Mockups → Design_Specs → Prototype (P3_프로토타입_제작/)
```

자세한 내용은 `P2_프로젝트_기획/1-6_UI_UX_Mockup/README.md` 참고

---

## 2️⃣ 2_개발준비/

**목적:** 개발 환경 설정 및 도구 준비

**이 단계에서 하는 일:**
- 필요한 프로그램 설치
- Git, Node.js, Vercel, Supabase 설정
- 프로젝트 그리드 작성

**구조:**
```
2_개발준비/
├── 2-1_Tech_Stack/             # 기술 스택 선정
│   ├── frontend_stack.md       # Frontend: HTML/CSS/JS
│   ├── backend_stack.md        # Backend: Supabase
│   ├── deployment.md           # Deploy: Vercel
│   └── external_services.md    # Resend, TossPayments
│
├── 2-2_Architecture/           # 시스템 아키텍처
│   ├── system_architecture.md  # 전체 구조
│   ├── api_design.md           # API 설계
│   └── security_design.md      # 보안 설계
│
├── 2-3_Development_Setup/      # 개발 환경 설정
│   ├── Git/                    # Git 설치 및 설정
│   │   ├── git_installation.md
│   │   ├── git_config.md
│   │   ├── .gitignore_template
│   │   ├── commit_convention.md
│   │   ├── branch_strategy.md
│   │   └── README.md
│   ├── Docker/                 # Docker 컨테이너화
│   │   ├── Dockerfile
│   │   ├── .dockerignore
│   │   ├── docker-compose.yml
│   │   ├── docker_installation.md
│   │   └── README.md
│   ├── Node/                   # Node.js 설치
│   │   └── node_installation.md
│   ├── Vercel/                 # Vercel CLI 설치
│   │   ├── vercel_cli_install.md
│   │   └── vercel_login.md
│   ├── Supabase/               # Supabase CLI 설치
│   │   ├── supabase_cli_install.md
│   │   └── supabase_project_setup.md
│   └── Environment/            # 환경 변수
│       ├── env_variables.md
│       └── .env.example
│
└── 2-4_Project_Grid/           # 프로젝트 그리드
    ├── manual/                 # 매뉴얼 (중요!)
    │   ├── PROJECT_GRID_매뉴얼_V4.0.md
    │   ├── quick_start.md
    │   └── advanced_usage.md
    ├── project_grid/           # 그리드 파일
    │   ├── project_grid.json
    │   ├── project_grid.md
    │   └── project_grid.html
    ├── tasks/                  # 작업 목록
    ├── validation/             # 검증
    │   ├── instructions/
    │   └── results/
    ├── scripts/                # 유틸리티
    └── README.md
```

### 2-1_Tech_Stack/

**왜 기술 스택을 문서화하나요?**
- 팀원들이 동일한 기술 사용
- 나중에 왜 이 기술을 선택했는지 기억
- 기술 변경 시 근거 자료로 활용

**우리 프로젝트 기술 스택:**
- Frontend: HTML, CSS, JavaScript
- Backend: Supabase (PostgreSQL + Auth)
- Deployment: Vercel
- Email: Resend
- Payment: 토스 페이먼트

### 2-2_Architecture/

**시스템 아키텍처가 뭔가요?**
건물 설계도처럼, 시스템 전체 구조를 그린 것입니다.

**예시 (system_architecture.md):**
```markdown
# 시스템 아키텍처

┌─────────────┐
│   사용자     │
└──────┬──────┘
       │
┌──────▼──────┐
│  Vercel     │ (프론트엔드)
│  Frontend   │
└──────┬──────┘
       │
┌──────▼──────┐
│  Supabase   │ (백엔드 + DB)
│  Backend    │
└─────────────┘
```

### 2-3_Development_Setup/

**중요! 설치 vs 사용법 구분**

| 항목 | 설치 (여기) | 사용법 (학습용_콘텐츠) |
|------|-------------|-----------------|
| Git | `git_installation.md` | `학습용_콘텐츠/2_웹개발_지식/Git/` |
| Vercel | `vercel_cli_install.md` | `학습용_콘텐츠/2_웹개발_지식/Vercel/` |
| Supabase | `supabase_cli_install.md` | `학습용_콘텐츠/2_웹개발_지식/Supabase/` |

**왜 나누나요?**
- 설치는 한 번만 (개발 준비)
- 사용법은 계속 참고 (학습용_콘텐츠)

**Environment/.env.example 예시:**
```
# Supabase
SUPABASE_URL=your-project-url
SUPABASE_ANON_KEY=your-anon-key

# Vercel
VERCEL_TOKEN=your-vercel-token

# Resend
RESEND_API_KEY=your-resend-key
```

### 2-4_Project_Grid/

**프로젝트 그리드가 뭔가요?**
모든 개발 작업을 3차원 그리드로 관리하는 시스템입니다.

**3차원 구조:**
- X축 (Stage): 기획 → 설계 → 개발 → 테스트 → 배포
- Y축 (Area): DevOps, Database, Backend, Frontend, Test
- Z축 (Level): 개별 Task (P1F1, P2BA3 등)

**왜 사용하나요?**
- 전체 작업을 한눈에 파악
- 진행 상황 추적
- AI와 협업 시 작업 지시서로 활용

---

## 3️⃣ 3_개발/

**목적:** 실제 코드 작성 및 개발

**가장 큰 폴더! 모든 코드가 여기에 있습니다.**

**구조:**
```
3_개발/
├── 3-1_Frontend/               # 프론트엔드
├── 3-2_Engines/                # 엔진
├── 3-3_Authentication/         # 인증
├── 3-4_Backend_Infrastructure/ # 백엔드 인프라
├── 3-5_Backend_APIs/           # 백엔드 API
├── 3-6_Database/               # 데이터베이스
├── 3-7_External_Services/      # 외부 서비스
├── 3-8_Test/                   # 테스트
├── 3-9_Deployment/             # 배포
└── 3-10_Stabilization/         # 안정화
```

### 3-1_Frontend/

**프론트엔드가 뭔가요?**
사용자가 보고 클릭하는 화면입니다.

**구조:**
```
3-1_Frontend/
├── pages/                      # HTML 페이지
│   ├── index.html              # 메인 페이지
│   ├── login.html              # 로그인
│   ├── dashboard.html          # 대시보드
│   └── grid-viewer.html        # 그리드 뷰어
│
├── components/                 # 재사용 컴포넌트
│   ├── header.js
│   ├── footer.js
│   └── card.js
│
├── css/                        # 스타일
│   ├── main.css
│   ├── components.css
│   └── responsive.css
│
├── js/                         # JavaScript
│   ├── supabase-client.js      # Supabase 연결
│   ├── auth.js                 # 인증 로직
│   └── grid.js                 # 그리드 로직
│
└── public/                     # 정적 파일
    ├── images/                 # 이미지
    └── assets/                 # 폰트, 아이콘 등
```

**왜 폴더를 나누나요?**
- pages: 각 페이지 HTML
- components: 여러 페이지에서 재사용 (헤더, 푸터 등)
- css: 스타일만 모음
- js: 로직만 모음
- public: 이미지, 폰트 등

### 3-2_Engines/

**엔진이 뭔가요?**
핵심 기능을 제공하는 시스템입니다.

**현재 비어있는 이유:**
엔진은 프로젝트마다 다릅니다. SSALWorks에서 필요한 엔진을 개발하면서 여기에 추가합니다.

**예상 엔진:**
- Grid_Engine: 3D 그리드 시각화
- AI_Integration: AI 연동
- Collaboration: 실시간 협업

### 3-3_Authentication/

**인증이 뭔가요?**
"누가 로그인했는지" 확인하는 시스템입니다.

**구조:**
```
3-3_Authentication/
├── Google_OAuth/               # 구글 로그인
├── Email_Auth/                 # 이메일 로그인
└── Session_Management/         # 세션 관리
```

**왜 여러 개?**
- 사용자마다 선호하는 로그인 방법이 다름
- 구글 로그인: 간편
- 이메일 로그인: 구글 계정 없어도 가능

### 3-4_Backend_Infrastructure/

**인프라가 뭔가요?**
모든 API가 공통으로 사용하는 기반 코드입니다.

**예시:**
- Supabase 클라이언트 설정
- 미들웨어 (인증 체크, 로깅 등)

### 3-5_Backend_APIs/

**API가 뭔가요?**
프론트엔드와 백엔드가 대화하는 통로입니다.

**구조:**
```
3-5_Backend_APIs/
├── Auth_APIs/                  # 로그인, 회원가입
├── Project_APIs/               # 프로젝트 CRUD
├── Books_APIs/                 # Books 조회
└── Payment_APIs/               # 결제
```

**예시 (Project_APIs):**
- `GET /api/projects` - 프로젝트 목록 가져오기
- `POST /api/projects` - 새 프로젝트 만들기
- `PUT /api/projects/:id` - 프로젝트 수정
- `DELETE /api/projects/:id` - 프로젝트 삭제

### 3-6_Database/

**데이터베이스 코드 보관**

**구조:**
```
3-6_Database/
├── Supabase/                   # Supabase 설정
├── schema/                     # 테이블 정의 SQL
├── migrations/                 # 변경 이력
├── seeds/                      # 초기 데이터
└── rls/                        # 보안 정책
```

**schema vs migrations?**
- schema: 현재 DB 구조
- migrations: 변경 이력 (v1 → v2 → v3)

### 3-7_External_Services/

**외부 서비스 연동**

**구조:**
```
3-7_External_Services/
├── Resend/                     # 이메일 (Resend)
└── TossPayments/               # 토스 페이먼트
```

**SendGrid는 없나요?**
Resend가 더 좋아서 Resend만 사용합니다.

### 3-8_Test/

**테스트 코드 보관**

**구조:**
```
3-8_Test/
├── unit/                       # 단위 테스트
├── integration/                # 통합 테스트
└── e2e/                        # E2E 테스트
```

**테스트가 왜 필요한가요?**
- 코드 변경 시 기존 기능이 망가지지 않았는지 확인
- 버그를 미리 발견
- 안정적인 서비스 제공

### 3-9_Deployment/

**배포 관련 설정 및 스크립트**

**구조:**
```
3-9_Deployment/
├── CI_CD/                      # 자동 배포 설정
├── Vercel_Deploy/              # Vercel 배포
├── Production_Config/          # 프로덕션 설정
└── Environment_Variables/      # 환경 변수
```

**CI/CD가 뭔가요?**
코드를 푸시하면 자동으로 테스트하고 배포하는 시스템입니다.

### 3-10_Stabilization/

**배포 후 안정화 (매우 중요!)**

**왜 별도 폴더인가요?**
실전 경험상 배포 후 문제 해결에 많은 시간이 걸립니다. 비중이 높아서 독립된 폴더로 관리합니다.

**구조:**
```
3-10_Stabilization/
├── Hotfix/                     # 긴급 수정
├── Patch/                      # 일반 수정
├── Troubleshooting/            # 문제 해결 가이드
└── Performance_Tuning/         # 성능 개선
```

**Hotfix vs Patch?**
- Hotfix: 서비스 중단될 정도로 급한 버그
- Patch: 급하지 않은 일반 버그

---

## 4️⃣ 4_운영/

**목적:** 서비스 운영 및 유지보수

**배포가 끝났다고 끝이 아닙니다!**
계속 모니터링하고, 백업하고, 보안을 점검해야 합니다.

**구조:**
```
4_운영/
├── 4-1_Monitoring/             # 모니터링
│   ├── uptime_monitoring.md    # 서버 상태 체크
│   └── error_tracking.md       # 에러 추적
│
├── 4-2_Maintenance/            # 유지보수
│   ├── update_schedule.md      # 업데이트 일정
│   └── maintenance_log.md      # 유지보수 기록
│
├── 4-3_Backup/                 # 백업
│   └── backup_strategy.md      # 백업 전략
│
└── 4-4_Security/               # 보안
    ├── security_checklist.md   # 보안 체크리스트
    └── vulnerability_scan.md   # 취약점 스캔
```

### 4-1_Monitoring/

**모니터링이 왜 필요한가요?**
서비스가 멈췄는지, 느려졌는지 실시간으로 확인해야 합니다.

**도구:**
- Uptime: 서버가 살아있는지
- Error Tracking: 어떤 에러가 발생했는지

### 4-2_Maintenance/

**정기적인 유지보수**
- 매주 화요일 오전 2시: 보안 업데이트
- 매달 첫째 주: DB 최적화
- 분기마다: 성능 점검

### 4-3_Backup/

**백업 전략**
- 매일: 증분 백업
- 매주: 전체 백업
- 백업 보관: 30일

**왜 백업하나요?**
DB가 망가지거나 해킹당해도 복구할 수 있습니다.

### 4-4_Security/

**보안 점검**
- 비밀번호 정책
- SQL Injection 방어
- XSS 방어
- HTTPS 적용

---

## 🔄 전체 개발 프로세스 흐름

```
┌─────────────────────────────────────────┐
│  P1_사업계획 (독립)                       │
│  ↓ 사업 계획 수립                        │
└─────────────────────────────────────────┘
                ↓
┌─────────────────────────────────────────┐
│  P2_프로젝트_기획                         │
│  → 무엇을 만들지 결정                    │
│  → UI/UX 목업 (Wireframe, Mockup)       │
│  → 사용자 플로우 설계                    │
└─────────────────────────────────────────┘
                ↓
┌─────────────────────────────────────────┐
│  P3_프로토타입_제작                       │
│  → Mockup을 실제 작동 코드로 변환        │
│  → DB 연결                               │
│  → 초기 테스트                           │
└─────────────────────────────────────────┘
                ↓
┌─────────────────────────────────────────┐
│  2_개발준비                              │
│  → 도구 설치 (Git, Node, Vercel 등)     │
│  → 프로젝트 그리드 작성                  │
└─────────────────────────────────────────┘
                ↓
┌─────────────────────────────────────────┐
│  3_개발                                  │
│  → Frontend 개발                         │
│  → Backend 개발                          │
│  → DB 구축                               │
│  → 테스트                                │
│  → 배포                                  │
│  → 안정화                                │
└─────────────────────────────────────────┘
                ↓
┌─────────────────────────────────────────┐
│  4_운영                                  │
│  → 모니터링                              │
│  → 유지보수                              │
│  → 백업                                  │
│  → 보안                                  │
└─────────────────────────────────────────┘
                ↓
        서비스 계속 운영! 🎉
```

---

## 📝 중요 원칙 및 규칙

### ✅ 반드시 지켜야 할 것

1. **처음부터 실제 DB 연결**
   - 목업 데이터 금지
   - Prototype 단계부터 Supabase 연결

2. **네이밍 규칙 준수**
   - 대분류: 한글
   - 하위 폴더: 영문
   - 일관성 유지

3. **순서대로 진행**
   - 1_기획 → 2_개발준비 → 3_개발 → 4_운영
   - 이전 단계 완료 후 다음 단계

4. **문서화**
   - 모든 결정에 대한 문서 작성
   - 나중에 왜 그렇게 했는지 기억하기 위해

5. **Git 커밋 규칙**
   ```
   feat: 새 기능 추가
   fix: 버그 수정
   docs: 문서 변경
   style: 코드 포맷팅
   refactor: 리팩토링
   test: 테스트 추가
   chore: 기타 작업
   ```

### ❌ 절대 하지 말아야 할 것

1. **기획 없이 코딩 시작**
   - 무엇을 만들지 먼저 결정

2. **디렉토리 구조 무시**
   - 정해진 위치에 파일 저장

3. **비밀 정보 Git에 올리기**
   - `.env` 파일은 `.gitignore`에 추가

4. **안정화 단계 생략**
   - 배포 후 반드시 문제 해결 시간 확보

5. **문서 없이 코드만 작성**
   - 나중에 본인도 이해 못 함

---

## 🎯 파일을 어디에 저장해야 할까?

### 체크리스트

**Q: 새로운 가이드 문서를 작성했어요**
→ `학습용_콘텐츠/1_Claude_사용법/` 또는 `학습용_콘텐츠/2_웹개발_지식/`

**Q: HTML 페이지를 만들었어요**
→ `3_개발/3-1_Frontend/pages/`

**Q: 디자인 목업을 여러 개 만들었어요**
→ `P2_프로젝트_기획/1-6_UI_UX_Mockup/Mockups/`

**Q: 와이어프레임 (화면 배치 설계도)을 만들었어요**
→ `P2_프로젝트_기획/1-6_UI_UX_Mockup/Wireframes/`

**Q: 디자인 명세서 (개발자 인계용)를 작성했어요**
→ `P2_프로젝트_기획/1-6_UI_UX_Mockup/Design_Specs/`

**Q: API 코드를 작성했어요**
→ `3_개발/3-5_Backend_APIs/`

**Q: 테스트 코드를 작성했어요**
→ `3_개발/3-8_Test/`

**Q: Git 설정 방법을 문서화했어요**
→ `2_개발준비/2-3_Development_Setup/Git/`

**Q: Git 사용법을 문서화했어요**
→ `학습용_콘텐츠/2_웹개발_지식/Git/`

**Q: 비즈니스 모델을 작성했어요**
→ `사업계획/`

**Q: 어디에 넣어야 할지 모르겠어요**
→ `참고자료/` (임시 보관 후 나중에 정리)

---

## 🛠️ 기술 스택 정리

### Frontend
- HTML5
- CSS3 (Flexbox, Grid)
- JavaScript (ES6+)
- Three.js (3D 시각화)

### Backend
- Supabase
  - PostgreSQL (데이터베이스)
  - Auth (인증)
  - Storage (파일 저장)
  - Edge Functions (서버리스)

### Deployment
- Vercel (프론트엔드 + 서버리스)

### External Services
- **Resend**: 이메일
- **토스 페이먼트**: 결제
- **Google OAuth**: 소셜 로그인

### DevOps
- Git + GitHub (버전 관리)
- Vercel CI/CD (자동 배포)

### AI & Automation
- **Claude Code**
  - Subagents: 18개
  - Skills: 16개
  - Commands: 14개
- **MCP Servers**
  - GitHub
  - Supabase
  - Vercel

---

## 🔍 디렉토리 찾기 가이드

### 사업 관련 문서를 찾고 싶다면
→ `사업계획/`

### 학습 자료를 찾고 싶다면
→ `학습용_콘텐츠/1_Claude_사용법/` 또는 `학습용_콘텐츠/2_웹개발_지식/`

### 프로젝트 계획을 보고 싶다면
→ `P2_프로젝트_기획/1-1_Project_Plan/`

### 사용자 플로우를 보고 싶다면
→ `P2_프로젝트_기획/1-2_User_Flows/`

### UI/UX 목업을 보고 싶다면
→ `P2_프로젝트_기획/1-6_UI_UX_Mockup/`

### 디자인 시스템을 보고 싶다면
→ `P2_프로젝트_기획/1-5_Design_System/`

### Git 설정 방법을 보고 싶다면
→ `2_개발준비/2-3_Development_Setup/Git/`

### 프론트엔드 코드를 보고 싶다면
→ `3_개발/3-1_Frontend/`

### API 코드를 보고 싶다면
→ `3_개발/3-5_Backend_APIs/`

### 테스트 코드를 보고 싶다면
→ `3_개발/3-8_Test/`

### 배포 설정을 보고 싶다면
→ `3_개발/3-9_Deployment/`

### 버그 수정 이력을 보고 싶다면
→ `3_개발/3-10_Stabilization/`

### 모니터링 설정을 보고 싶다면
→ `4_운영/4-1_Monitoring/`

---

## 💡 팁 & 트릭

### 1. 폴더 구조가 복잡해 보일 때
**방법:** 한 번에 하나씩만 보세요.
- 오늘은 프론트엔드만 → `3_개발/3-1_Frontend/`
- 내일은 백엔드만 → `3_개발/3-5_Backend_APIs/`

### 2. 파일을 어디에 저장할지 모를 때
**순서:**
1. 이 파일이 무엇인가? (코드? 문서? 디자인?)
2. 언제 사용하는가? (기획? 개발? 운영?)
3. 해당 단계 폴더로 이동

### 3. 비슷한 이름의 폴더가 헷갈릴 때
**예시:**
- `P2_프로젝트_기획/1-6_UI_UX_Mockup/` → 기획 단계 목업 (정적 HTML)
- `P3_프로토타입_제작/` → 프로토타입 (DB 연동, 실제 작동)
- `3-6_Database/` → 실제 DB 코드 (SQL)

**구분법:**
- 숫자가 작을수록 (0, 1, 2) → 문서, 계획, 프로토타입
- 숫자가 클수록 (3, 4) → 실제 코드, 운영

### 4. Claude Code를 처음 사용할 때
**시작:**
1. `.claude/CLAUDE.md` 읽기
2. `/commit` 명령어로 간단한 테스트
3. Subagent 하나씩 사용해보기

### 5. Git이 처음이라면
**순서:**
1. `2_개발준비/2-3_Development_Setup/Git/git_installation.md` → 설치
2. `학습용_콘텐츠/2_웹개발_지식/Git/` → 사용법 학습
3. `.gitignore_template` 복사해서 `.gitignore` 만들기

---

## 📚 추가 학습 자료

### Claude Code 배우기
→ `학습용_콘텐츠/1_Claude_사용법/`
- Skills 사용법
- Subagents 활용법
- MCP 설정법

### 웹 개발 배우기
→ `학습용_콘텐츠/2_웹개발_지식/`
- HTML/CSS/JavaScript
- Git 사용법
- Vercel 배포 방법
- Supabase 사용법

### 프로젝트 관리 배우기
→ `학습용_콘텐츠/3_기타/Project_Management/`
- 프로젝트 그리드 사용법
- Task 관리 방법

---

## 🎓 초보자 Q&A

**Q: 프로젝트 구조가 너무 복잡해요**
A: 처음엔 복잡해 보이지만, 각 폴더의 목적을 이해하면 오히려 쉽습니다. 한 번에 전체를 이해하려 하지 말고, 필요한 부분만 보세요.

**Q: 어디서부터 시작해야 하나요?**
A: `1_기획/` 부터 순서대로 진행하세요. 순서를 지키는 게 중요합니다.

**Q: 파일을 잘못된 곳에 저장했어요**
A: 괜찮습니다. 파일을 올바른 위치로 이동하면 됩니다. Git으로 이력 관리되므로 실수해도 복구 가능합니다.

**Q: Claude Code가 뭔가요?**
A: AI 코딩 어시스턴트입니다. `.claude/` 폴더에서 설정하고, Skills, Subagents, Commands로 커스터마이징 가능합니다.

**Q: MCP가 뭔가요?**
A: Claude Code가 GitHub, Supabase, Vercel 같은 외부 서비스와 통신하는 프로토콜입니다.

**Q: Supabase vs Vercel 차이가 뭔가요?**
A:
- Supabase: 백엔드 (데이터베이스, 인증)
- Vercel: 프론트엔드 배포 (웹사이트 호스팅)

**Q: 학습용_콘텐츠 폴더가 계속 커지면 어떡하나요?**
A: 괜찮습니다. 학습 자료는 지속적으로 추가되도록 설계되었습니다. 카테고리별로 잘 정리만 하면 됩니다.

---

## 🚀 다음 단계

### 지금 할 일

1. **이 문서를 끝까지 읽기** ✅
2. **Git 초기화하기**
   ```bash
   git init
   git add .
   git commit -m "feat: 프로젝트 초기 구조 완성"
   ```

3. **개발 환경 설정**
   - `2_개발준비/2-3_Development_Setup/` 순서대로 진행

4. **첫 번째 기획 문서 작성**
   - `P2_프로젝트_기획/1-1_Project_Plan/PROJECT_PLAN.md`

### 앞으로 할 일

1. **Phase 1: 기획 완료** (1주)
2. **Phase 2: 개발 준비** (3일)
3. **Phase 3: 개발** (4주)
4. **Phase 4: 배포 및 운영** (지속적)

---

## 📞 도움이 필요하면

### 프로젝트 구조 관련
→ 이 문서 다시 읽기

### Claude Code 관련
→ `학습용_콘텐츠/1_Claude_사용법/`

### 웹 개발 관련
→ `학습용_콘텐츠/2_웹개발_지식/`

### 기타 질문
→ `참고자료/`에 임시 메모 후 정리

---

## 🎉 마무리

**축하합니다!**
이 문서를 다 읽으셨다면, SSALWorks 프로젝트 구조를 완벽히 이해하신 겁니다.

**기억하세요:**
- 순서를 지키세요 (1→2→3→4)
- 문서화하세요
- 백업하세요
- 한 번에 하나씩 진행하세요

**성공적인 프로젝트를 응원합니다! 🚀**

---

---

## 📝 문서 수정 이력

| 수정 차수 | 수정 일자 | 수정 내용 | 수정자 |
|---------|----------|---------|--------|
| v1.0 | 2025-11-17 | 초기 문서 작성 (초보자용 상세 버전) | Claude Code |
| v2.0 | 2025-11-17 | 콘텐츠 → 학습용_콘텐츠 변경 반영 | Claude Code |
| v3.0 | 2025-11-17 | 사업계획 → P1_사업계획으로 변경, Phase 0 추가 | Claude Code |
| v4.0 | 2025-11-17 | 실전 프로젝트 참고하여 구조 대폭 개선: Docker/Git/.github/Test/Database/Deployment 상세 구조, .gitignore 추가, Project Grid 상세 구조 | Claude Code |
| v4.1 | 2025-11-17 | claude_code → Web_ClaudeCode_Bridge 폴더명 변경 (웹사이트↔Claude Code 정보 교환 브리지 명확화) | Claude Code |
| v4.2 | 2025-11-17 | 프로젝트 그리드 업데이트 주체 명확화: Claude Code가 DB/뷰어 직접 업데이트, 웹사이트는 결과 확인만 | Claude Code |
| v5.0 | 2025-12-02 | 실제 폴더 구조에 맞춰 대폭 업데이트: P2_프로젝트_기획/, P3_프로토타입_제작/ 추가, 1-6_UI_UX_Mockup/ 하위 구조 상세화 (Wireframes, Mockups, Design_Specs), AI_Link/ 추가 | Claude Code |

---

**현재 버전:** v5.0
**작성자:** SSALWorks Team
**마지막 업데이트:** 2025-12-02

---

