# S1 Stage (개발 준비) 안내문 + Order Sheet

> **작성일**: 2025-12-17
> **버전**: 1.0
> **목적**: S1 Stage 작업을 위한 종합 안내문 및 Order Sheet 템플릿
> **기반**: S2 실제 작업 경험 역설계

---

## 1. S1 Stage 개요

### 1.1 Stage 목표

**S1 (개발 준비 - Development Setup)**는 개발 환경과 기반을 구축하는 단계입니다.

- 프로젝트 기본 구조 설정
- 디자인 시스템 구축 (SSAL Works 브랜딩)
- DB 스키마 확정 및 적용
- 인증 Provider 설정 (Google OAuth)
- Vercel 배포 환경 구축
- 기술 문서화

### 1.2 S1 Task 목록 (6개)

| Task ID | Task Name | Area | 유형 |
|---------|-----------|------|------|
| S1F1 | 기본 프론트엔드 구조 | Frontend | AI-Only |
| S1F2 | 디자인 시스템 (SSAL Works) | Frontend | AI-Only |
| S1BI1 | Vercel 배포 설정 | Backend_Infra | **Human-AI** |
| S1D1 | DB 스키마 확정 | Database | **PO 실행** |
| S1S1 | Supabase Auth Provider 설정 | Security | **Human-AI** |
| S1M1 | 기술 문서화 | Documentation | AI-Only |

### 1.3 의존성 관계

```
P3 프로토타입 완료 (선행)
    │
    ├── S1D1 (DB 스키마) ─────────► 모든 후속 Task의 기반
    │
    ├── S1F1 (프론트엔드 구조) ───► S1F2, S2F*
    │
    ├── S1F2 (디자인 시스템) ─────► 모든 Frontend Task
    │
    ├── S1S1 (Auth Provider) ─────► S2BA1 (Google OAuth)
    │
    ├── S1BI1 (Vercel 설정) ──────► 모든 배포 관련 Task
    │
    └── S1M1 (기술 문서화) ────────► 개발 참조 자료
```

### 1.4 S1 Stage의 중요성

```
⚠️ S1 Stage는 모든 후속 Stage의 기반입니다!
⚠️ S1이 제대로 완료되지 않으면 S2-S5가 모두 영향받습니다!
⚠️ 특히 S1S1(Auth Provider), S1D1(DB 스키마)은 필수 선행!
```

---

## 2. 작업 규칙 (필수 준수)

### 2.1 파일 저장 규칙

**모든 코드 파일은 이중 저장:**

| Area | Stage 폴더 | Production 폴더 |
|------|------------|-----------------|
| F (Frontend) | `S1_개발_준비/Frontend/` | `Production/Frontend/` |
| BI (Backend_Infra) | `S1_개발_준비/Backend_Infra/` | `Production/Backend_Infra/` |
| D (Database) | `S1_개발_준비/Database/` | `Production/Database/` |

**문서 파일은 Stage 폴더에만:**
- M (Documentation) → `S1_개발_준비/Documentation/`
- S (Security) → `S1_개발_준비/Security/`

### 2.2 Task ID 코멘트 규칙

**모든 파일 첫 줄에 Task ID 명시:**

```javascript
// Task ID: S1F1 - 기본 프론트엔드 구조
```

```css
/* Task ID: S1F2 - SSAL Works 디자인 시스템 */
```

```sql
-- Task ID: S1D1 - DB 스키마 확정
```

### 2.3 새 폴더 생성 금지

```
⛔ 프로젝트 폴더 구조는 이미 완성됨
⛔ 새 폴더 생성 전 반드시 PO 승인 필요
⛔ S1_개발_준비/ 하위에만 작업
```

---

## 3. 3단계 검증 시스템

### 3.1 검증 프로세스 (S2와 동일)

```
[1단계: Task 작업]
Main Agent → Task Agent 서브에이전트 투입

[2단계: Task 검증]
Main Agent → Verification Agent 서브에이전트 투입

[3단계: Stage Gate 검증]
Main Agent → 직접 수행 + PO 테스트 가이드 제공

[4단계: PO 최종 승인]
PO → 테스트 수행 + 승인/거부
```

### 3.2 Task Agent / Verification Agent 매핑

| Task | Task Agent | Verification Agent |
|------|------------|-------------------|
| S1F1, S1F2 | frontend-developer | code-reviewer |
| S1BI1 | devops-troubleshooter | qa-specialist |
| S1D1 | database-specialist | database-specialist |
| S1S1 | security-specialist | security-auditor |
| S1M1 | documentation-specialist | qa-specialist |

---

## 4. PO(Project Owner)가 해야 할 작업

### 4.1 Human-AI Task 목록

| Task ID | 작업 내용 | PO 필요 작업 |
|---------|----------|-------------|
| S1S1 | Supabase Auth Provider 설정 | Google Cloud Console + Supabase Dashboard |
| S1D1 | DB 스키마 확정 | Supabase SQL Editor에서 SQL 실행 |
| S1BI1 | Vercel 배포 설정 | Vercel 프로젝트 생성 + GitHub 연결 |

### 4.2 Google OAuth 설정 가이드 (S1S1)

```
[1단계: Google Cloud Console]
1. https://console.cloud.google.com 접속
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. APIs & Services → OAuth consent screen
   - User Type: External
   - App name: SSALWorks
   - User support email: 본인 이메일
4. APIs & Services → Credentials → Create Credentials → OAuth client ID
   - Application type: Web application
   - Name: SSALWorks Web Client
   - Authorized redirect URIs:
     - https://zwjmfewyshhwpgwdtrus.supabase.co/auth/v1/callback
5. Client ID와 Client Secret 복사

[2단계: Supabase Dashboard]
1. Supabase Dashboard 접속
2. Authentication → Providers → Google
3. Enable Google 활성화
4. Client ID 입력 (Google에서 복사)
5. Client Secret 입력 (Google에서 복사)
6. Save 클릭

[3단계: 테스트]
1. 로그인 페이지에서 Google 로그인 버튼 클릭
2. Google 계정 선택
3. 로그인 성공 확인
4. AI에게 "설정 완료" 알림
```

### 4.3 DB 스키마 실행 가이드 (S1D1)

```
[Supabase SQL Editor]
1. Supabase Dashboard → SQL Editor
2. SQL 파일들 순서대로 실행:
   - 01_users_schema.sql
   - 02_notices_schema.sql
   - 03_learning_contents_schema.sql
   - ... (순서 중요!)
3. 각 파일 실행 후 Success 확인
4. 모든 테이블 생성 확인
5. AI에게 "실행 완료" 알림
```

### 4.4 Vercel 설정 가이드 (S1BI1)

```
[Vercel 프로젝트 설정]
1. https://vercel.com 접속 및 로그인
2. New Project 클릭
3. GitHub 저장소 연결 (Import Git Repository)
4. Project Settings:
   - Framework Preset: Other
   - Root Directory: Production (또는 프로젝트 루트)
5. Environment Variables 설정:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
6. Deploy 클릭
7. 배포 완료 확인
8. AI에게 "설정 완료" 알림
```

---

## 5. Order Sheet 템플릿

### 5.1 S1F1 - 기본 프론트엔드 구조

```json
{
  "task_id": "S1F1",
  "task_name": "기본 프론트엔드 구조",
  "stage": "S1",
  "area": "F",
  "execution_type": "AI-Only",

  "task_instruction": {
    "목표": "프로젝트 프론트엔드 기본 구조 설정",
    "기능": [
      "HTML 기본 템플릿 구조",
      "공통 레이아웃 (헤더, 푸터, 네비게이션)",
      "페이지 라우팅 구조",
      "공통 스타일시트 기반"
    ],
    "폴더_구조": {
      "pages": "HTML 페이지들",
      "assets/css": "스타일시트",
      "assets/js": "JavaScript 파일",
      "assets/images": "이미지 리소스"
    },
    "파일_생성": [
      "S1_개발_준비/Frontend/index.html (메인 템플릿)",
      "S1_개발_준비/Frontend/assets/css/common.css",
      "S1_개발_준비/Frontend/assets/js/common.js",
      "(+ Production 폴더 이중 저장)"
    ]
  },

  "verification_instruction": {
    "검증_항목": [
      "폴더 구조 표준 준수",
      "HTML 문법 유효성",
      "공통 레이아웃 일관성",
      "반응형 기반 준비",
      "Task ID 코멘트 존재"
    ]
  },

  "task_agent": "frontend-developer",
  "verification_agent": "code-reviewer"
}
```

### 5.2 S1F2 - 디자인 시스템 (SSAL Works)

```json
{
  "task_id": "S1F2",
  "task_name": "SSAL Works 디자인 시스템",
  "stage": "S1",
  "area": "F",
  "execution_type": "AI-Only",

  "task_instruction": {
    "목표": "SSAL Works 브랜딩 기반 디자인 시스템 구축",
    "브랜드_컬러": {
      "primary": "#1a237e (Navy Blue)",
      "secondary": "#f5f5f5 (Light Gray)",
      "accent": "#4caf50 (Green)",
      "text_primary": "#212121",
      "text_secondary": "#757575"
    },
    "로고": "쌀 이삭 로고 (rice logo)",
    "타이포그래피": "Noto Sans KR",
    "컴포넌트": [
      "버튼 스타일 (primary, secondary, outline)",
      "입력 폼 스타일",
      "카드 컴포넌트",
      "Toast 알림",
      "모달 다이얼로그"
    ],
    "파일_생성": [
      "S1_개발_준비/Frontend/assets/css/design-system.css",
      "S1_개발_준비/Frontend/assets/css/variables.css",
      "(+ Production 폴더 이중 저장)"
    ]
  },

  "verification_instruction": {
    "검증_항목": [
      "브랜드 컬러 일관성",
      "CSS 변수 활용",
      "반응형 디자인",
      "접근성 (색상 대비)",
      "컴포넌트 재사용성"
    ]
  },

  "task_agent": "frontend-developer",
  "verification_agent": "code-reviewer"
}
```

### 5.3 S1S1 - Supabase Auth Provider 설정 (Human-AI)

```json
{
  "task_id": "S1S1",
  "task_name": "Supabase Auth Provider 설정",
  "stage": "S1",
  "area": "S",
  "execution_type": "Human-AI",

  "task_instruction": {
    "AI_작업": {
      "목표": "Auth Provider 설정 가이드 작성 및 검증 코드 준비",
      "산출물": [
        "S1_개발_준비/Security/AUTH_PROVIDER_SETUP_GUIDE.md",
        "S1_개발_준비/Security/auth-test.js (테스트 코드)"
      ]
    },
    "PO_작업": {
      "목표": "Google Cloud Console + Supabase 실제 설정",
      "단계": [
        "1. Google Cloud Console에서 OAuth Client 생성",
        "2. Supabase Dashboard에서 Google Provider 활성화",
        "3. Client ID, Client Secret 입력",
        "4. Redirect URI 확인",
        "5. 테스트 로그인 수행"
      ],
      "필요_정보": {
        "supabase_callback_url": "https://zwjmfewyshhwpgwdtrus.supabase.co/auth/v1/callback",
        "google_console_url": "https://console.cloud.google.com"
      }
    }
  },

  "verification_instruction": {
    "검증_항목": [
      "Google OAuth 버튼 클릭 시 Google 로그인 페이지 이동",
      "로그인 후 콜백 처리 정상",
      "사용자 정보 Supabase에 저장",
      "세션 유지 확인"
    ],
    "PO_필수_확인": "실제 Google 계정으로 로그인 테스트"
  },

  "task_agent": "security-specialist",
  "verification_agent": "security-auditor",

  "po_action_required": {
    "필요": true,
    "내용": "Google Cloud Console + Supabase Dashboard 설정",
    "시점": "AI 가이드 작성 후",
    "완료_조건": "실제 Google 로그인 테스트 성공"
  }
}
```

### 5.4 S1D1 - DB 스키마 확정 (PO 실행)

```json
{
  "task_id": "S1D1",
  "task_name": "DB 스키마 확정",
  "stage": "S1",
  "area": "D",
  "execution_type": "Human-AI",

  "task_instruction": {
    "AI_작업": {
      "목표": "프로덕션용 DB 스키마 SQL 작성",
      "파일_생성": [
        "S1_개발_준비/Database/01_users_schema.sql",
        "S1_개발_준비/Database/02_notices_schema.sql",
        "S1_개발_준비/Database/03_learning_contents_schema.sql",
        "S1_개발_준비/Database/04_faqs_schema.sql",
        "S1_개발_준비/Database/05_credit_transactions_schema.sql",
        "S1_개발_준비/Database/06_ai_usage_log_schema.sql",
        "(+ Production 폴더 이중 저장)"
      ],
      "포함_내용": [
        "테이블 생성 (CREATE TABLE)",
        "기본 인덱스 생성",
        "RLS 정책 설정",
        "트리거 (필요시)"
      ]
    },
    "PO_작업": {
      "목표": "Supabase SQL Editor에서 SQL 실행",
      "주의사항": [
        "SQL 파일 순서대로 실행 (번호 순)",
        "각 파일 실행 후 Success 확인",
        "오류 발생 시 AI에게 즉시 알림"
      ]
    }
  },

  "verification_instruction": {
    "검증_항목": [
      "모든 테이블 생성 확인",
      "컬럼 타입 및 제약조건 확인",
      "인덱스 생성 확인",
      "RLS 정책 적용 확인",
      "외래키 관계 확인"
    ],
    "PO_확인": "Supabase Table Editor에서 테이블 목록 확인"
  },

  "task_agent": "database-specialist",
  "verification_agent": "database-specialist",

  "po_action_required": {
    "필요": true,
    "내용": "Supabase SQL Editor에서 SQL 직접 실행",
    "시점": "AI가 SQL 작성 완료 후",
    "완료_조건": "모든 SQL 실행 성공 + 테이블 확인"
  }
}
```

### 5.5 S1BI1 - Vercel 배포 설정 (Human-AI)

```json
{
  "task_id": "S1BI1",
  "task_name": "Vercel 배포 설정",
  "stage": "S1",
  "area": "BI",
  "execution_type": "Human-AI",

  "task_instruction": {
    "AI_작업": {
      "목표": "Vercel 배포 설정 가이드 및 설정 파일 작성",
      "파일_생성": [
        "vercel.json (루트)",
        "S1_개발_준비/Backend_Infra/VERCEL_SETUP_GUIDE.md"
      ]
    },
    "PO_작업": {
      "목표": "Vercel 프로젝트 생성 및 배포",
      "단계": [
        "1. Vercel 로그인",
        "2. New Project → GitHub 연결",
        "3. 저장소 선택",
        "4. 환경변수 설정",
        "5. Deploy 클릭"
      ],
      "환경변수": [
        "NEXT_PUBLIC_SUPABASE_URL",
        "NEXT_PUBLIC_SUPABASE_ANON_KEY",
        "SUPABASE_SERVICE_ROLE_KEY"
      ]
    }
  },

  "verification_instruction": {
    "검증_항목": [
      "Vercel 배포 성공",
      "프로덕션 URL 접속 가능",
      "환경변수 적용 확인",
      "빌드 로그 오류 없음"
    ],
    "PO_확인": "배포된 URL 접속 테스트"
  },

  "task_agent": "devops-troubleshooter",
  "verification_agent": "qa-specialist",

  "po_action_required": {
    "필요": true,
    "내용": "Vercel Dashboard에서 프로젝트 생성 및 배포",
    "시점": "AI 가이드 작성 후",
    "완료_조건": "배포 성공 + URL 접속 가능"
  }
}
```

### 5.6 S1M1 - 기술 문서화

```json
{
  "task_id": "S1M1",
  "task_name": "기술 문서화",
  "stage": "S1",
  "area": "M",
  "execution_type": "AI-Only",

  "task_instruction": {
    "목표": "개발자를 위한 기술 문서 작성",
    "문서_목록": [
      "TECH_STACK.md - 기술 스택 설명",
      "ARCHITECTURE.md - 시스템 아키텍처",
      "DEVELOPMENT_GUIDE.md - 개발 가이드",
      "API_CONVENTIONS.md - API 규칙"
    ],
    "파일_저장": "S1_개발_준비/Documentation/"
  },

  "verification_instruction": {
    "검증_항목": [
      "문서 완성도",
      "코드 예제 포함",
      "실제 프로젝트 구조와 일치",
      "가독성"
    ]
  },

  "task_agent": "documentation-specialist",
  "verification_agent": "qa-specialist"
}
```

---

## 6. Stage Gate 테스트 가이드

### 6.1 PO 테스트 항목

```
[S1S1: Google OAuth]
- 테스트: Google 로그인 버튼 클릭 → Google 계정 선택 → 로그인 성공
- 확인: Supabase Auth Users에 사용자 추가됨

[S1D1: DB 스키마]
- 테스트: Supabase Table Editor에서 테이블 목록 확인
- 확인: 모든 테이블 존재, 컬럼 확인

[S1BI1: Vercel 배포]
- 테스트: 배포된 URL 접속
- 확인: 페이지 정상 로드, 에러 없음

[S1F1, S1F2: 프론트엔드]
- 테스트: 로컬 또는 배포 URL에서 페이지 확인
- 확인: 디자인 시스템 적용, 반응형 동작
```

### 6.2 PO 테스트 체크리스트

- [ ] S1S1: Google 로그인 성공
- [ ] S1D1: 모든 DB 테이블 생성 확인
- [ ] S1BI1: Vercel 배포 URL 접속 가능
- [ ] S1F1: 기본 페이지 구조 확인
- [ ] S1F2: 디자인 시스템 적용 확인

---

## 7. S1 Stage 완료 기준

### 7.1 Task 완료 기준

- [ ] 모든 6개 Task 완료 (task_status: 'Completed')
- [ ] 모든 검증 통과 (verification_status: 'Passed')
- [ ] Human-AI Task 실제 작동 확인
- [ ] 파일 이중 저장 완료

### 7.2 Stage Gate 완료 기준

- [ ] AI Stage Gate 검증 완료
- [ ] PO 테스트 완료 및 승인
- [ ] 모든 외부 서비스 설정 완료

### 7.3 다음 Stage 진행 조건

```
S1 Stage 완료 → S2 Stage 시작 가능

필수 조건:
1. S1S1 (Auth Provider) 실제 작동 확인
2. S1D1 (DB 스키마) 모든 테이블 생성 완료
3. S1BI1 (Vercel) 배포 성공
4. PO 최종 승인
```

---

## 버전 이력

| 버전 | 날짜 | 내용 |
|------|------|------|
| 1.0 | 2025-12-17 | 최초 작성 (S2 경험 기반 역설계) |
