# S2 Stage (개발 1차) 안내문 + Order Sheet

> **작성일**: 2025-12-17
> **버전**: 1.0
> **목적**: S2 Stage 작업을 위한 종합 안내문 및 Order Sheet 템플릿
> **기반**: S2 실제 작업 경험 역설계

---

## 1. S2 Stage 개요

### 1.1 Stage 목표

**S2 (개발 1차 - Core Development)**는 핵심 기능을 구현하는 단계입니다.

- 인증/인가 시스템 구축 (Google OAuth, 세션 관리)
- 이메일 시스템 구축 (Resend 연동)
- 구독 관리 API 구현
- 프론트엔드 인증 페이지 구현
- 테스트 인프라 구축
- API 문서화

### 1.2 S2 Task 목록 (13개)

| Task ID | Task Name | Area | 유형 |
|---------|-----------|------|------|
| S2F1 | Google 로그인 UI | Frontend | AI-Only |
| S2F2 | 비밀번호 재설정 UI | Frontend | AI-Only |
| S2BA1 | Google OAuth API | Backend_APIs | AI-Only |
| S2BA2 | 이메일 발송 API | Backend_APIs | AI-Only |
| S2BA3 | 구독 관리 API | Backend_APIs | AI-Only |
| S2S1 | 인증 미들웨어 | Security | AI-Only |
| S2BI1 | 이메일 모듈 | Backend_Infra | **Human-AI** |
| S2BI2 | 에러 처리/토스트 | Backend_Infra | AI-Only |
| S2C1 | 학습 콘텐츠 시드 | Content_System | **PO 실행** |
| S2D1 | DB 인덱스 최적화 | Database | **PO 실행** |
| S2M1 | API 문서화 | Documentation | AI-Only |
| S2T1 | 인증 API 테스트 | Testing | AI-Only |
| S2O1 | Vercel 환경변수 설정 | DevOps | **Human-AI** |

### 1.3 의존성 관계

```
S1 Stage 완료 (필수 선행)
    │
    ├── S2S1 (인증 미들웨어) ─────┬──► S2BA1, S2BA2, S2BA3
    │                            │
    ├── S2BI1 (이메일 모듈) ─────┴──► S2BA2
    │
    ├── S2BI2 (에러 처리) ──────────► S2F1, S2F2
    │
    ├── S2BA1 (Google OAuth) ──────► S2F1
    │
    ├── S2BA2 (이메일 API) ─────────► S2F2
    │
    └── S2T1 (테스트) ─────────────► 모든 BA/S 완료 후
```

---

## 2. 작업 규칙 (필수 준수)

### 2.1 파일 저장 규칙

**모든 코드 파일은 이중 저장:**

| Area | Stage 폴더 | Production 폴더 |
|------|------------|-----------------|
| F (Frontend) | `S2_개발-1차/Frontend/` | `Production/Frontend/` |
| BA (Backend_APIs) | `S2_개발-1차/Backend_API/` | `Production/Backend_API/` |
| BI (Backend_Infra) | `S2_개발-1차/Backend_Infra/` | `Production/Backend_Infra/` |
| D (Database) | `S2_개발-1차/Database/` | `Production/Database/` |

**문서 파일은 Stage 폴더에만:**
- M (Documentation) → `S2_개발-1차/Documentation/`
- T (Testing) → `S2_개발-1차/Testing/`
- S (Security) → `S2_개발-1차/Security/`

### 2.2 Task ID 코멘트 규칙

**모든 파일 첫 줄에 Task ID 명시:**

```javascript
// Task ID: S2BA1 - Google OAuth API
```

```html
<!-- Task ID: S2F1 - Google 로그인 UI -->
```

```sql
-- Task ID: S2D1 - DB 인덱스 최적화
```

### 2.3 새 폴더 생성 금지

```
⛔ 새 폴더 생성 전 반드시 PO 승인 필요
⛔ 기존 폴더 구조 내에서 작업
⛔ 임의로 폴더 만들면 프로젝트 구조 붕괴
```

---

## 3. 3단계 검증 시스템

### 3.1 검증 프로세스 개요

```
[1단계: Task 작업]
Main Agent → Task Agent 서브에이전트 투입
           → 작업 수행
           → 결과 반환

[2단계: Task 검증]
Main Agent → Verification Agent 서브에이전트 투입 (작성자 ≠ 검증자)
           → 검증 수행
           → 검증 결과 반환

[3단계: Stage Gate 검증]
Main Agent → 직접 수행
           → 모든 Task 완료 확인
           → Stage Gate 리포트 작성
           → PO 테스트 가이드 제공

[4단계: PO 최종 승인]
PO → AI 검증 리포트 확인
   → 직접 테스트 수행
   → 승인/거부
```

### 3.2 Task Agent / Verification Agent 매핑

| Task | Task Agent | Verification Agent |
|------|------------|-------------------|
| S2F1, S2F2 | frontend-developer | code-reviewer |
| S2BA1, S2BA2, S2BA3 | backend-developer | code-reviewer |
| S2S1 | security-specialist | security-auditor |
| S2BI1, S2BI2 | backend-developer | code-reviewer |
| S2C1, S2D1 | database-specialist | database-specialist |
| S2M1 | documentation-specialist | qa-specialist |
| S2T1 | test-engineer | qa-specialist |

**핵심 원칙: Task Agent ≠ Verification Agent (작성자와 검증자 분리)**

### 3.3 검증 결과 기록

**검증 완료 후 필수 파일 생성:**

1. `Web_ClaudeCode_Bridge/Outbox/{TaskID}_verification_report.json`
2. `S0_Project-SSAL-Grid_생성/ssal-grid/stage-gates/S2GATE_verification_report.md` (Stage Gate)

---

## 4. PO(Project Owner)가 해야 할 작업

### 4.1 Human-AI Task 목록

| Task ID | 작업 내용 | PO 필요 작업 |
|---------|----------|-------------|
| S2BI1 | Resend 이메일 모듈 | Resend API 키 발급 및 설정 |
| S2C1 | 학습 콘텐츠 시드 | Supabase SQL Editor에서 SQL 실행 |
| S2D1 | DB 인덱스 최적화 | Supabase SQL Editor에서 SQL 실행 |
| S2O1 | 환경변수 설정 | Vercel Dashboard에서 환경변수 추가 |

### 4.2 외부 서비스 설정 가이드

#### Resend 설정 (S2BI1)
```
1. https://resend.com 접속
2. Sign up / Login
3. API Keys → Create API Key
4. API Key 복사
5. Vercel Dashboard → Settings → Environment Variables
   - RESEND_API_KEY = [복사한 키]
6. Supabase Dashboard → Settings → API
   - 동일하게 설정 (필요시)
```

#### Vercel 환경변수 (S2O1)
```
필수 환경변수:
- RESEND_API_KEY
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY (서버용)
```

### 4.3 SQL 실행 가이드 (S2C1, S2D1)

```
1. Supabase Dashboard 접속
2. SQL Editor 클릭
3. 해당 SQL 파일 내용 복사 & 붙여넣기
   - S2C1: S2_개발-1차/Content_System/S2C1_seed_learning_contents.sql
   - S2D1: S2_개발-1차/Database/S2D1_indexes.sql
4. Run 버튼 클릭
5. 성공 메시지 확인
6. AI에게 "실행 완료했어" 알림
```

### 4.4 도메인 연결 가이드

```
Whois DNS 설정 (네임서버 고급설정):

1. A 레코드:
   - 호스트명: www
   - IP: 76.76.21.21

2. CNAME 레코드:
   - 호스트명: www
   - 값: cname.vercel-dns.com

3. TXT 레코드 (Vercel 검증용):
   - 호스트명: _vercel
   - 값: (Vercel Dashboard에서 제공하는 값)

Vercel Dashboard:
1. Settings → Domains
2. Add Domain: www.도메인.kr
3. DNS 레코드 확인
4. SSL 인증서 발급 대기
```

---

## 5. Stage Gate 테스트 가이드

### 5.1 AI 검증 완료 후 PO 테스트 항목

#### Frontend 테스트 (S2F1, S2F2)
```
[Google 로그인 UI - S2F1]
- 파일: Production/Frontend/pages/auth/google-login.html
- 테스트:
  1. 브라우저에서 파일 열기
  2. "Google로 로그인" 버튼 클릭
  3. Google 로그인 페이지로 이동 확인
- 필요 설정: Supabase Google Provider 활성화

[비밀번호 재설정 - S2F2]
- 파일: Production/Frontend/pages/auth/forgot-password.html
- 테스트:
  1. 브라우저에서 파일 열기
  2. 이메일 입력 후 "재설정 링크 받기" 클릭
  3. Toast 알림 확인
  4. 이메일 수신 확인 (Resend 설정 필요)
- 필요 설정: RESEND_API_KEY
```

#### API 테스트 (S2BA1, S2BA2, S2BA3)
```
[이메일 API - S2BA2]
- 엔드포인트: POST /api/email/send
- 테스트: Postman 또는 curl로 요청
- 확인: 실제 이메일 수신 여부

[구독 API - S2BA3]
- 엔드포인트: GET /api/subscription/status
- 테스트: 인증 토큰과 함께 요청
- 확인: 구독 정보 반환 여부
```

### 5.2 PO 테스트 체크리스트

- [ ] S2F1: Google 로그인 버튼 동작 확인
- [ ] S2F2: 비밀번호 재설정 플로우 확인
- [ ] S2BA2: 이메일 발송 테스트 (실제 수신 확인)
- [ ] S2S1: 인증 미들웨어 동작 확인
- [ ] S2C1: 학습 콘텐츠 시드 데이터 확인
- [ ] S2D1: DB 인덱스 생성 확인

---

## 6. Order Sheet 템플릿

### 6.1 S2F1 - Google 로그인 UI

```json
{
  "task_id": "S2F1",
  "task_name": "Google 로그인 UI",
  "stage": "S2",
  "area": "F",
  "execution_type": "AI-Only",

  "task_instruction": {
    "목표": "Google OAuth 로그인 페이지 구현",
    "기능": [
      "Google로 로그인 버튼",
      "SSAL Works 브랜딩 (쌀 로고, Navy Blue 테마)",
      "반응형 디자인",
      "로딩 상태 표시",
      "에러 핸들링"
    ],
    "파일_생성": [
      "S2_개발-1차/Frontend/pages/auth/google-login.html",
      "Production/Frontend/pages/auth/google-login.html"
    ],
    "의존성": ["S2BA1 (Google OAuth API)", "S2BI2 (에러 처리)"]
  },

  "verification_instruction": {
    "검증_항목": [
      "Google 로그인 버튼 클릭 시 OAuth 플로우 시작",
      "SSAL Works 브랜딩 일관성",
      "반응형 (모바일, 태블릿, 데스크톱)",
      "로딩/에러 상태 처리",
      "Task ID 코멘트 존재"
    ],
    "검증_방법": "브라우저 테스트 + 코드 리뷰"
  },

  "task_agent": "frontend-developer",
  "verification_agent": "code-reviewer"
}
```

### 6.2 S2BA2 - 이메일 발송 API

```json
{
  "task_id": "S2BA2",
  "task_name": "이메일 발송 API (Resend)",
  "stage": "S2",
  "area": "BA",
  "execution_type": "AI-Only",

  "task_instruction": {
    "목표": "Resend를 이용한 이메일 발송 API 구현",
    "엔드포인트": [
      "POST /api/email/send - 일반 이메일 발송",
      "POST /api/email/welcome - 환영 이메일",
      "POST /api/email/password-reset - 비밀번호 재설정"
    ],
    "파일_생성": [
      "S2_개발-1차/Backend_API/api/email/send.js",
      "S2_개발-1차/Backend_API/api/email/welcome.js",
      "S2_개발-1차/Backend_API/api/email/password-reset.js",
      "(+ Production 폴더 이중 저장)"
    ],
    "보안": [
      "Bearer 토큰 인증 (S2S1 미들웨어 사용)",
      "입력 유효성 검사",
      "환경변수로 API 키 관리"
    ],
    "의존성": ["S2S1 (인증 미들웨어)", "S2BI1 (이메일 모듈)"]
  },

  "verification_instruction": {
    "검증_항목": [
      "인증 없이 접근 시 401 에러",
      "필수 필드 누락 시 400 에러",
      "유효한 요청 시 이메일 발송 성공",
      "실제 이메일 수신 확인",
      "에러 핸들링 적절성"
    ],
    "검증_방법": "API 테스트 (Postman/curl) + 실제 이메일 수신 확인"
  },

  "task_agent": "backend-developer",
  "verification_agent": "code-reviewer",

  "po_action_required": {
    "필요": true,
    "내용": "Resend API 키 발급 및 Vercel 환경변수 설정",
    "시점": "코드 작성 후, 실제 테스트 전"
  }
}
```

### 6.3 S2D1 - DB 인덱스 최적화 (PO 실행)

```json
{
  "task_id": "S2D1",
  "task_name": "DB 인덱스 최적화",
  "stage": "S2",
  "area": "D",
  "execution_type": "Human-AI",

  "task_instruction": {
    "AI_작업": {
      "목표": "자주 사용하는 쿼리에 대한 인덱스 최적화 SQL 작성",
      "파일_생성": [
        "S2_개발-1차/Database/S2D1_indexes.sql",
        "Production/Database/S2D1_indexes.sql"
      ],
      "인덱스_대상_테이블": [
        "users (role, last_login, subscription_status)",
        "credit_transactions (user_id+created_at, user_id+type)",
        "ai_usage_log (user_id+created_at, service_name+created_at)",
        "ssalworks_tasks (stage+task_status, stage+area)"
      ]
    },
    "PO_작업": {
      "목표": "Supabase SQL Editor에서 SQL 실행",
      "단계": [
        "1. Supabase Dashboard → SQL Editor",
        "2. SQL 파일 내용 복사",
        "3. Run 버튼 클릭",
        "4. 'Success' 메시지 확인",
        "5. AI에게 '실행 완료' 알림"
      ]
    }
  },

  "verification_instruction": {
    "검증_항목": [
      "SQL 문법 오류 없음",
      "인덱스 생성 성공",
      "기존 인덱스와 충돌 없음",
      "테이블/컬럼 존재 확인"
    ],
    "PO_확인": "pg_indexes에서 인덱스 목록 조회"
  },

  "task_agent": "database-specialist",
  "verification_agent": "database-specialist",

  "po_action_required": {
    "필요": true,
    "내용": "Supabase SQL Editor에서 SQL 직접 실행",
    "시점": "AI가 SQL 작성 완료 후",
    "이유": "AI가 Supabase DB에 직접 접근 불가 (IPv6 전용)"
  }
}
```

---

## 7. 주의사항 및 경고

### 7.1 Human-AI Task 처리 규칙

```
⚠️ 가이드 문서만 작성하고 "완료" 처리 금지!
⚠️ PO가 실제 설정을 완료해야 Task 완료!
⚠️ 실제 작동 테스트 성공 필수!

올바른 프로세스:
1. AI가 가이드/코드 작성
2. AI가 PO에게 설정 요청
3. PO가 실제 설정 수행
4. AI + PO가 실제 작동 테스트
5. 테스트 성공 시 "Task 완료"
```

### 7.2 검증 없이 완료 보고 금지

```
⚠️ Task Agent가 작업 완료 → Verification Agent 검증 필수
⚠️ 검증 없이 verification_status: 'Passed' 설정 금지
⚠️ 작성자 = 검증자 금지
```

### 7.3 외부 설정 필요 시 즉시 요청

```
⚠️ 작업 완료 후 "아, 설정 필요해요" 금지
⚠️ 작업 시작 시점에 PO에게 즉시 요청
⚠️ 필요한 설정: Resend, Google OAuth, Vercel 환경변수 등
```

---

## 8. S2 Stage 완료 기준

### 8.1 Task 완료 기준

- [ ] 모든 13개 Task 완료 (task_status: 'Completed')
- [ ] 모든 검증 통과 (verification_status: 'Passed')
- [ ] 모든 파일 이중 저장 완료 (Stage + Production)
- [ ] 모든 Task ID 코멘트 존재
- [ ] 검증 리포트 생성 완료

### 8.2 Stage Gate 완료 기준

- [ ] AI Stage Gate 검증 완료
- [ ] Stage Gate 리포트 작성
- [ ] PO 테스트 가이드 제공
- [ ] PO 직접 테스트 완료
- [ ] PO 최종 승인

### 8.3 다음 Stage 진행 조건

```
S2 Stage 완료 → S3 Stage 시작 가능

조건:
1. 모든 S2 Task 완료 및 검증 통과
2. Stage Gate PO 승인
3. 모든 Human-AI Task 실제 작동 확인
4. 외부 서비스 설정 완료 (Resend 등)
```

---

## 버전 이력

| 버전 | 날짜 | 내용 |
|------|------|------|
| 1.0 | 2025-12-17 | 최초 작성 (S2 실제 작업 경험 기반 역설계) |
