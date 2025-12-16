# Inbox/Outbox JSON 시스템

> **카테고리**: Claude Code 고급 사용법
> **난이도**: ⭐⭐⭐⭐ (고급)
> **작성일**: 2025-11-18
> **학습 시간**: 60분

---

## 📚 목차

1. [개요](#개요)
2. [왜 필요한가?](#왜-필요한가)
3. [시스템 아키텍처](#시스템-아키텍처)
4. [Inbox: 작업 지시](#inbox-작업-지시)
5. [Outbox: 결과 보고](#outbox-결과-보고)
6. [완전한 워크플로우](#완전한-워크플로우)
7. [실전 예제](#실전-예제)
8. [고급 활용](#고급-활용)
9. [문제 해결](#문제-해결)
10. [요약 및 체크리스트](#요약-및-체크리스트)

---

## 개요

### Inbox/Outbox JSON 시스템이란?

**Claude Code AI와 사용자 간의 구조화된 작업 관리 시스템**

```
사용자 ─[작업 지시]→ Inbox/ → Claude Code AI
                                    ↓
                               [작업 수행]
                                    ↓
사용자 ←[결과 보고]─ Outbox/ ← Claude Code AI
```

**핵심:**
- ✅ JSON 형식으로 구조화된 데이터
- ✅ 파일 기반 통신 (로컬 서버)
- ✅ 세션 간 완벽한 연속성
- ✅ 웹 대시보드 실시간 연동
- ✅ 검색, 필터링, 통계 자동화

---

## 왜 필요한가?

### 기존 방식의 문제점

#### 1. 채팅 방식의 한계

```
사용자: "회원가입 API 만들어줘"
AI: "네, 만들겠습니다"
   [작업 수행]
AI: "완료했습니다"
```

**문제:**
- ❌ 요구사항이 모호함
- ❌ 완료 기준이 불명확
- ❌ 검증 과정 없음
- ❌ 세션 끊기면 컨텍스트 손실
- ❌ 작업 추적 어려움

#### 2. work_log의 한계

```markdown
# work_log.md
2025-11-18: 회원가입 API 작성. 테스트 완료. 다음은 로그인.
```

**문제:**
- ❌ 비구조화된 텍스트
- ❌ 검색 어려움 (전체 텍스트 검색만)
- ❌ 통계 추출 불가능
- ❌ 웹 연동 복잡
- ❌ 자동화 어려움

### Inbox/Outbox JSON의 해결책

#### 구조화된 데이터

```json
{
  "task_id": "P1BA1",
  "task_name": "회원가입 API",
  "status": "완료",
  "requirements": { ... },
  "deliverables": { ... },
  "verification": { ... }
}
```

**장점:**
- ✅ 필드별 즉시 검색 가능
- ✅ 통계 자동 추출
- ✅ 웹 대시보드 자동 연동
- ✅ 프로그래밍 가능 (자동화)
- ✅ 세션 간 완벽한 연속성

### 비교표

| 항목 | 채팅 방식 | work_log | Inbox/Outbox JSON |
|------|----------|----------|-------------------|
| **명확성** | ❌ 모호 | △ 보통 | ✅ 명확 |
| **구조화** | ❌ 없음 | ❌ 없음 | ✅ 완벽 |
| **검색** | ❌ 어려움 | △ 텍스트만 | ✅ 필드별 |
| **통계** | ❌ 불가능 | ❌ 수동 | ✅ 자동 |
| **웹 연동** | ❌ 없음 | ❌ 어려움 | ✅ 자동 |
| **자동화** | ❌ 불가능 | ❌ 어려움 | ✅ 쉬움 |
| **연속성** | ❌ 끊김 | △ 제한적 | ✅ 완벽 |
| **AI 기억** | ❌ 제한 | △ 부분적 | ✅ 100% |

---

## 시스템 아키텍처

### 전체 구조

```
프로젝트 루트/
├── Web_ClaudeCode_Bridge/
│   ├── inbox_server.js         ← 로컬 서버 (Node.js)
│   ├── Inbox/                  ← 작업 지시 (JSON)
│   │   ├── Archive/            ← 완료된 작업
│   │   ├── task_001.json
│   │   └── task_002.json
│   └── Outbox/                 ← 완료 보고 (JSON)
│       ├── task_001_completion.json
│       └── task_002_completion.json
│
├── .claude/workflows/
│   └── INBOX_OUTBOX_JSON_WORKFLOW.md  ← AI 지침
│
└── 1_기획/1-2_UI_UX_Design/
    └── Mockup/
        └── dashboard-mockup.html  ← 웹 대시보드
```

### 통신 흐름

```
┌─────────────┐         ┌──────────────────┐
│ 웹 대시보드  │◄───────►│ inbox_server.js  │
│ (브라우저)   │  HTTP   │   (Port 3030)    │
└─────────────┘         └──────────────────┘
                               ↕
                        ┌──────────────┐
                        │  Inbox/      │
                        │  Outbox/     │
                        │  (JSON 파일) │
                        └──────────────┘
                               ↕
                        ┌──────────────┐
                        │ Claude Code  │
                        │ AI Agent     │
                        └──────────────┘
```

### 로컬 서버 (inbox_server.js)

**역할:**
1. Inbox/Outbox 폴더 모니터링
2. HTTP API 제공 (웹 대시보드 연동)
3. 파일 읽기/쓰기 처리

**API 엔드포인트:**
```javascript
GET  /inbox      // Inbox JSON 파일 목록
GET  /outbox     // Outbox JSON 파일 목록
POST /inbox      // 새 작업 추가
GET  /status     // 서버 상태
```

**시작 방법:**
```bash
cd Web_ClaudeCode_Bridge
node inbox_server.js

# 확인
curl http://localhost:3030/status
```

---

## Inbox: 작업 지시

### 기본 개념

**Inbox = 사용자가 AI에게 보내는 작업 지시서**

```
사용자 작성 → Inbox/task.json → AI 자동 읽기 → 작업 수행
```

### JSON 구조

**필수 필드:**

```json
{
  "task_id": "P1BA1",                    // 고유 ID
  "task_name": "회원가입 API 구현",       // 작업 이름
  "phase": 1,                            // Phase (1~4)
  "area": "BA",                          // 영역 (BA/FA/DB)
  "priority": "high",                    // 우선순위
  "assigned_to": "backend-developer",    // 담당 에이전트
  "created_at": "2025-11-18T09:00:00Z", // 생성 시간
  "status": "대기 중",                   // 상태

  "requirements": {                      // 요구사항
    "description": "...",
    "details": { ... }
  },

  "acceptance_criteria": [               // 완료 조건
    "조건 1",
    "조건 2"
  ],

  "expected_files": [                    // 생성될 파일
    "경로/파일명"
  ],

  "dependencies": []                     // 의존성
}
```

### 작성 예시

#### 예시 1: Backend API 작업

**파일: `Inbox/task_signup_api.json`**

```json
{
  "task_id": "P1BA1",
  "task_name": "회원가입 API 구현",
  "phase": 1,
  "area": "BA",
  "priority": "high",
  "assigned_to": "backend-developer",
  "created_at": "2025-11-18T09:00:00Z",
  "status": "대기 중",

  "requirements": {
    "description": "사용자 회원가입 API 엔드포인트 구현",
    "endpoint": "/api/auth/signup",
    "method": "POST",

    "input_schema": {
      "email": {
        "type": "string",
        "required": true,
        "validation": "이메일 형식"
      },
      "password": {
        "type": "string",
        "required": true,
        "validation": "최소 8자, 영문+숫자+특수문자"
      },
      "name": {
        "type": "string",
        "required": true
      }
    },

    "output_schema": {
      "success": "boolean",
      "user_id": "string (UUID)",
      "token": "string (JWT)",
      "message": "string"
    },

    "business_logic": [
      "이메일 중복 검사",
      "비밀번호 암호화 (bcrypt, saltRounds=10)",
      "사용자 생성 (Supabase)",
      "JWT 토큰 발급 (만료 24시간)",
      "환영 이메일 발송 (선택)"
    ],

    "error_handling": [
      "이메일 중복: 409 Conflict",
      "입력 검증 실패: 400 Bad Request",
      "서버 오류: 500 Internal Server Error"
    ]
  },

  "acceptance_criteria": [
    "✅ 이메일 중복 검사 구현 및 테스트",
    "✅ 비밀번호 bcrypt 암호화 (saltRounds=10)",
    "✅ JWT 토큰 발급 (환경변수에서 secret 읽기)",
    "✅ 입력 데이터 Joi 스키마 검증",
    "✅ 에러 핸들링 (409, 400, 500)",
    "✅ 단위 테스트 커버리지 80% 이상",
    "✅ API 문서 주석 작성 (JSDoc)",
    "✅ Postman 테스트 컬렉션 생성"
  ],

  "expected_files": [
    "3_개발/3-2_Backend_APIs/auth/P1BA1_signup.ts",
    "3_개발/3-2_Backend_APIs/auth/P1BA1_signup.test.ts",
    "3_개발/3-2_Backend_APIs/auth/signup.postman.json"
  ],

  "dependencies": [],

  "reference_docs": [
    "2_개발준비/2-2_Database/schema/users_table.sql",
    "1_기획/1-2_UI_UX_Design/Design_Guidelines/DESIGN_SYSTEM.md"
  ],

  "constraints": {
    "performance": "응답 시간 < 500ms",
    "security": [
      "SQL Injection 방지",
      "XSS 방지",
      "Rate limiting (분당 5회)"
    ]
  }
}
```

#### 예시 2: Frontend 컴포넌트

**파일: `Inbox/task_login_form.json`**

```json
{
  "task_id": "P1FA3",
  "task_name": "로그인 폼 컴포넌트",
  "phase": 1,
  "area": "FA",
  "priority": "medium",
  "assigned_to": "frontend-developer",
  "created_at": "2025-11-18T10:00:00Z",
  "status": "대기 중",

  "requirements": {
    "description": "React 로그인 폼 컴포넌트 구현",
    "framework": "React 18 + TypeScript",
    "styling": "DESIGN_SYSTEM.md 준수 (Tailwind CSS)",

    "features": [
      "이메일 입력 필드",
      "비밀번호 입력 필드",
      "비밀번호 표시/숨김 토글",
      "로그인 버튼",
      "회원가입 링크",
      "비밀번호 찾기 링크",
      "입력 검증 및 실시간 에러 메시지",
      "로딩 상태 표시",
      "Enter 키 제출"
    ],

    "validation": {
      "email": "이메일 형식 검사",
      "password": "최소 1자 이상"
    },

    "props": {
      "onSubmit": "(email, password) => Promise<void>",
      "onSignupClick": "() => void",
      "onForgotPasswordClick": "() => void",
      "isLoading": "boolean (optional)"
    }
  },

  "acceptance_criteria": [
    "✅ TypeScript 타입 정의",
    "✅ DESIGN_SYSTEM.md의 색상/폰트/간격 사용",
    "✅ 반응형 디자인 (모바일/태블릿/데스크톱)",
    "✅ 접근성 (ARIA 레이블, 키보드 네비게이션)",
    "✅ 입력 검증 (실시간 피드백)",
    "✅ 로딩 상태 UI",
    "✅ React Testing Library 테스트",
    "✅ Storybook 스토리 작성"
  ],

  "expected_files": [
    "3_개발/3-1_Frontend/components/auth/LoginForm.tsx",
    "3_개발/3-1_Frontend/components/auth/LoginForm.test.tsx",
    "3_개발/3-1_Frontend/components/auth/LoginForm.stories.tsx"
  ],

  "dependencies": [],

  "reference_docs": [
    "1_기획/1-2_UI_UX_Design/Design_Guidelines/DESIGN_SYSTEM.md",
    "1_기획/1-2_UI_UX_Design/Mockup/dashboard-mockup.html"
  ]
}
```

### 작성 가이드라인

**DO (✅ 권장):**

1. **명확한 요구사항**
   ```json
   "input_schema": {
     "email": {
       "type": "string",
       "required": true,
       "validation": "이메일 형식"
     }
   }
   ```

2. **구체적인 완료 조건**
   ```json
   "acceptance_criteria": [
     "✅ 단위 테스트 커버리지 80% 이상",
     "✅ 응답 시간 < 500ms"
   ]
   ```

3. **참고 문서 명시**
   ```json
   "reference_docs": [
     "경로/파일명.md"
   ]
   ```

**DON'T (❌ 피해야 할 것):**

1. **모호한 요구사항**
   ```json
   "requirements": {
     "description": "API 만들어줘"  // ❌ 너무 모호
   }
   ```

2. **불명확한 완료 조건**
   ```json
   "acceptance_criteria": [
     "잘 동작하면 됨"  // ❌ 측정 불가능
   ]
   ```

3. **시간 추정**
   ```json
   "estimated_time": "2시간"  // ❌ 절대 금지!
   ```

---

## Outbox: 결과 보고

### 기본 개념

**Outbox = AI가 사용자에게 보내는 작업 완료 보고서**

```
AI 작업 완료 → Outbox/completion.json → 사용자 확인
```

### JSON 구조

```json
{
  "task_id": "P1BA1",
  "task_name": "회원가입 API 구현",
  "completion_time": "2025-11-18T11:30:00Z",
  "status": "완료",

  "execution_info": {
    "assigned_agent": "backend-developer",
    "executor": "Claude Code",
    "session_id": "2025-11-18_session_1"
  },

  "duration": {
    "actual_minutes": 45
  },

  "deliverables": {
    "files_created": [ ... ],
    "files_modified": [ ... ],
    "files_deleted": [ ... ]
  },

  "acceptance_criteria_met": {
    "이메일 중복 검사": "✅ 구현 완료",
    ...
  },

  "verification_completed": {
    "static_analysis": { ... },
    "dynamic_analysis": { ... }
  },

  "issues_found": [ ... ],

  "next_steps": [ ... ],

  "lessons_learned": [ ... ]
}
```

### 실제 예시

**파일: `Outbox/P1BA1_completion_2025-11-18.json`**

```json
{
  "task_id": "P1BA1",
  "task_name": "회원가입 API 구현",
  "completion_time": "2025-11-18T11:30:00Z",
  "status": "완료",

  "execution_info": {
    "assigned_agent": "backend-developer",
    "executor": "Claude Code",
    "session_id": "2025-11-18_session_1",
    "claude_model": "claude-sonnet-4-5-20250929"
  },

  "duration": {
    "actual_minutes": 45,
    "breakdown": {
      "planning": 5,
      "implementation": 25,
      "testing": 10,
      "verification": 5
    }
  },

  "deliverables": {
    "files_created": [
      {
        "path": "C:\\!SSAL_Works_Private\\3_개발\\3-2_Backend_APIs\\auth\\P1BA1_signup.ts",
        "purpose": "회원가입 API 엔드포인트",
        "size_kb": 12,
        "lines": 245,
        "functions": [
          "signupHandler",
          "validateEmail",
          "hashPassword",
          "generateToken"
        ]
      },
      {
        "path": "C:\\!SSAL_Works_Private\\3_개발\\3-2_Backend_APIs\\auth\\P1BA1_signup.test.ts",
        "purpose": "단위 테스트",
        "size_kb": 8,
        "lines": 180,
        "test_cases": 24
      }
    ],
    "files_modified": [],
    "files_deleted": []
  },

  "acceptance_criteria_met": {
    "이메일 중복 검사": "✅ 구현 완료 - Supabase unique constraint 활용",
    "비밀번호 암호화": "✅ bcrypt saltRounds=10 적용",
    "JWT 토큰 발급": "✅ 환경변수 JWT_SECRET 사용, 만료 24시간",
    "입력 데이터 검증": "✅ Joi 스키마 검증 구현",
    "에러 처리": "✅ 409, 400, 500 에러 핸들링",
    "단위 테스트": "✅ 커버리지 85% (목표 80% 초과)",
    "API 문서": "✅ JSDoc 주석 작성",
    "Postman 컬렉션": "✅ 생성 완료"
  },

  "verification_completed": {
    "static_analysis": {
      "typescript_check": "✅ 타입 오류 0개",
      "eslint": "✅ 0 errors, 0 warnings",
      "prettier": "✅ 포맷팅 완료",
      "code_review": "✅ 통과 - 베스트 프랙티스 준수"
    },
    "dynamic_analysis": {
      "unit_tests": "✅ 24/24 통과 (100%)",
      "integration_tests": "✅ 5/5 통과",
      "coverage": "✅ 85% (statements), 82% (branches)",
      "build": "✅ 성공",
      "performance": "✅ 평균 응답시간 245ms (목표 < 500ms)"
    }
  },

  "security_checks": {
    "sql_injection": "✅ Prepared statements 사용",
    "xss_prevention": "✅ 입력 sanitization",
    "password_security": "✅ bcrypt 암호화",
    "rate_limiting": "✅ 분당 5회 제한 구현",
    "jwt_security": "✅ Secret key 환경변수 관리"
  },

  "issues_found": [],

  "next_steps": [
    {
      "task_id": "P1BA2",
      "task_name": "로그인 API 구현",
      "priority": "high",
      "dependencies": ["P1BA1"],
      "status": "대기 중",
      "estimated_effort": "작성하지 않음"
    },
    {
      "task_id": "P1BA3",
      "task_name": "비밀번호 재설정 API",
      "priority": "medium",
      "dependencies": ["P1BA1", "P1BA2"],
      "status": "대기 중"
    }
  ],

  "lessons_learned": [
    "bcrypt의 saltRounds=10이 보안과 성능의 좋은 균형점",
    "Joi 스키마 검증이 입력 데이터 처리에 매우 효과적",
    "JWT secret은 반드시 환경변수로 관리해야 함",
    "Supabase의 unique constraint가 이메일 중복 검사에 유용",
    "단위 테스트를 먼저 작성하면 구현이 더 명확해짐"
  },

  "performance_metrics": {
    "average_response_time_ms": 245,
    "p95_response_time_ms": 380,
    "p99_response_time_ms": 450,
    "throughput_rps": 120
  },

  "notes": "모든 요구사항을 충족했으며, 보안 모범 사례를 적용했습니다. 성능 목표(< 500ms)를 초과 달성했습니다."
}
```

### Outbox 활용

**1. 대시보드 시각화**

```javascript
// 완료된 작업 표시
const outboxFiles = await fetch('http://localhost:3030/outbox')
  .then(r => r.json());

outboxFiles.forEach(task => {
  displayTask({
    id: task.task_id,
    name: task.task_name,
    status: task.status,
    duration: task.duration.actual_minutes,
    coverage: task.verification_completed.dynamic_analysis.coverage
  });
});
```

**2. 통계 분석**

```javascript
// 평균 소요 시간
const avgDuration = outboxFiles.reduce(
  (sum, t) => sum + t.duration.actual_minutes, 0
) / outboxFiles.length;

// 테스트 통과율
const passRate = outboxFiles.filter(
  t => t.verification_completed.dynamic_analysis.unit_tests.includes('✅')
).length / outboxFiles.length * 100;
```

**3. 다음 작업 자동 추천**

```javascript
// 다음 할 일 목록
const nextTasks = outboxFiles
  .flatMap(t => t.next_steps)
  .filter(t => t.status === "대기 중")
  .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
```

---

## 완전한 워크플로우

### AI 관점에서의 워크플로우

```
1. 세션 시작
   ↓
2. 📬 Inbox 자동 확인
   ├─ 파일 있음 → 읽고 작업 시작
   └─ 파일 없음 → 마지막 Outbox 확인
   ↓
3. 작업 수행
   ├─ 요구사항 분석
   ├─ 코드 구현
   ├─ 테스트 작성
   └─ 자체 검증
   ↓
4. 검증 제안
   ├─ 검증 도구 목록 제시
   └─ 사용자 승인 대기
   ↓
5. 검증 수행
   ├─ Static analysis
   ├─ Dynamic analysis
   └─ 결과 수집
   ↓
6. Outbox 보고
   ├─ 상세 JSON 작성
   ├─ Inbox 파일 → Archive
   └─ 📬 다음 Inbox 자동 확인
```

### 사용자 관점에서의 워크플로우

```
1. 작업 정의
   ├─ 무엇을 만들까?
   ├─ 요구사항은?
   └─ 완료 조건은?
   ↓
2. Inbox JSON 작성
   ├─ 웹 대시보드 사용 (추천)
   └─ 또는 수동 작성
   ↓
3. 대기
   ├─ AI가 자동으로 감지
   └─ 작업 수행
   ↓
4. Outbox 확인
   ├─ 웹 대시보드에서 확인
   ├─ 완료 여부 검토
   ├─ 검증 결과 확인
   └─ 다음 단계 확인
   ↓
5. 다음 작업
   ├─ next_steps 참고
   └─ 새로운 Inbox JSON 작성
```

---

## 실전 예제

### 예제 1: 프로젝트 초기 설정

**시나리오:**
- Next.js 프로젝트 초기 설정
- Tailwind CSS, TypeScript 설정
- 디렉토리 구조 생성

**Inbox JSON:**

```json
{
  "task_id": "P0ENV1",
  "task_name": "Next.js 프로젝트 초기 설정",
  "phase": 0,
  "area": "ENV",
  "priority": "critical",
  "assigned_to": "devops-specialist",
  "created_at": "2025-11-18T08:00:00Z",
  "status": "대기 중",

  "requirements": {
    "description": "Next.js 14 프로젝트 초기 설정",
    "stack": {
      "framework": "Next.js 14 (App Router)",
      "language": "TypeScript",
      "styling": "Tailwind CSS",
      "package_manager": "npm"
    },
    "additional_packages": [
      "@supabase/supabase-js",
      "react-icons",
      "date-fns",
      "zod"
    ],
    "directory_structure": [
      "src/app",
      "src/components",
      "src/lib",
      "src/types",
      "src/utils",
      "public/assets"
    ]
  },

  "acceptance_criteria": [
    "✅ Next.js 14 설치 (App Router)",
    "✅ TypeScript 설정 (strict mode)",
    "✅ Tailwind CSS 설정",
    "✅ 디렉토리 구조 생성",
    "✅ ESLint, Prettier 설정",
    "✅ .env.local.example 생성",
    "✅ 개발 서버 실행 확인"
  ],

  "expected_files": [
    "package.json",
    "tsconfig.json",
    "tailwind.config.js",
    "next.config.js",
    ".eslintrc.json",
    ".prettierrc",
    ".env.local.example"
  ],

  "dependencies": []
}
```

**예상 Outbox:**

```json
{
  "task_id": "P0ENV1",
  "status": "완료",
  "deliverables": {
    "files_created": [
      "package.json",
      "tsconfig.json",
      "tailwind.config.js",
      ...
    ],
    "directories_created": [
      "src/app",
      "src/components",
      ...
    ]
  },
  "verification_completed": {
    "static_analysis": {
      "typescript_check": "✅ 설정 유효",
      "eslint": "✅ 설정 완료"
    },
    "dynamic_analysis": {
      "dev_server": "✅ http://localhost:3000 실행 확인",
      "build": "✅ 성공"
    }
  },
  "next_steps": [
    {
      "task_id": "P1FA1",
      "task_name": "메인 레이아웃 컴포넌트"
    }
  ]
}
```

### 예제 2: 데이터베이스 작업

**Inbox:**

```json
{
  "task_id": "P1DB1",
  "task_name": "users 테이블 생성 및 RLS 설정",
  "phase": 1,
  "area": "DB",
  "priority": "high",
  "assigned_to": "database-developer",
  "created_at": "2025-11-18T09:30:00Z",
  "status": "대기 중",

  "requirements": {
    "description": "Supabase users 테이블 생성 및 보안 정책",
    "database": "Supabase PostgreSQL",

    "schema": {
      "table_name": "users",
      "columns": [
        {
          "name": "id",
          "type": "UUID",
          "constraints": ["PRIMARY KEY", "DEFAULT gen_random_uuid()"]
        },
        {
          "name": "email",
          "type": "VARCHAR(255)",
          "constraints": ["NOT NULL", "UNIQUE"]
        },
        {
          "name": "password_hash",
          "type": "VARCHAR(255)",
          "constraints": ["NOT NULL"]
        },
        {
          "name": "name",
          "type": "VARCHAR(100)",
          "constraints": ["NOT NULL"]
        },
        {
          "name": "created_at",
          "type": "TIMESTAMPTZ",
          "constraints": ["DEFAULT NOW()"]
        },
        {
          "name": "updated_at",
          "type": "TIMESTAMPTZ",
          "constraints": ["DEFAULT NOW()"]
        }
      ],
      "indexes": [
        {
          "name": "idx_users_email",
          "columns": ["email"],
          "unique": true
        }
      ]
    },

    "rls_policies": [
      {
        "name": "Users can view their own data",
        "operation": "SELECT",
        "check": "auth.uid() = id"
      },
      {
        "name": "Users can update their own data",
        "operation": "UPDATE",
        "check": "auth.uid() = id"
      }
    ]
  },

  "acceptance_criteria": [
    "✅ Supabase에 users 테이블 생성",
    "✅ 모든 제약조건 적용",
    "✅ 인덱스 생성",
    "✅ RLS 정책 2개 적용",
    "✅ 테스트 데이터 3건 삽입",
    "✅ RLS 정책 동작 확인"
  ],

  "expected_files": [
    "2_개발준비/2-2_Database/schema/users_table.sql",
    "2_개발준비/2-2_Database/schema/users_rls.sql",
    "2_개발준비/2-2_Database/seed/users_seed.sql"
  ],

  "dependencies": []
}
```

### 예제 3: 배치 작업 (여러 작업 동시 지시)

**시나리오:** Phase 1의 모든 Backend API 작업

```
Inbox/
├── P1BA1_signup_api.json
├── P1BA2_login_api.json
├── P1BA3_logout_api.json
├── P1BA4_password_reset_api.json
└── P1BA5_profile_update_api.json
```

**AI의 처리:**
1. 모든 Inbox 파일 스캔
2. 우선순위 + 의존성 기반 정렬
3. 순차적 처리
4. 각각 Outbox 생성

---

## 고급 활용

### 1. 의존성 그래프

**Inbox JSON에서 의존성 명시:**

```json
{
  "task_id": "P1BA2",
  "task_name": "로그인 API",
  "dependencies": ["P1BA1"]  // 회원가입 API 완료 후
}
```

**자동 처리:**
```javascript
// AI가 자동으로 확인
const P1BA1_completed = fs.existsSync(
  'Outbox/P1BA1_completion_*.json'
);

if (!P1BA1_completed) {
  console.log('P1BA1이 완료되지 않아 대기 중...');
  return;
}

// P1BA1 완료됨 → P1BA2 시작
startTask('P1BA2');
```

### 2. 템플릿 시스템

**템플릿 저장:**

```
Inbox/templates/
├── api_task_template.json
├── ui_component_template.json
├── db_schema_template.json
└── test_task_template.json
```

**템플릿 사용:**
```bash
# 복사 후 수정
cp Inbox/templates/api_task_template.json Inbox/task_my_api.json

# task_id, task_name, requirements만 수정
```

### 3. 웹 대시보드 통합

**작업 생성 UI:**

```typescript
// dashboard-mockup.html
function createTask() {
  const task = {
    task_id: document.getElementById('taskId').value,
    task_name: document.getElementById('taskName').value,
    priority: document.getElementById('priority').value,
    // ... 나머지 필드
  };

  fetch('http://localhost:3030/inbox', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  });
}
```

**실시간 모니터링:**

```typescript
// 5초마다 갱신
setInterval(async () => {
  const inbox = await fetch('http://localhost:3030/inbox').then(r => r.json());
  const outbox = await fetch('http://localhost:3030/outbox').then(r => r.json());

  updateDashboard(inbox, outbox);
}, 5000);
```

### 4. 통계 대시보드

```typescript
// 완료율
const completionRate = outbox.length / (inbox.length + outbox.length) * 100;

// 평균 소요 시간
const avgDuration = outbox.reduce(
  (sum, t) => sum + t.duration.actual_minutes, 0
) / outbox.length;

// 에이전트별 작업량
const byAgent = outbox.reduce((acc, t) => {
  const agent = t.execution_info.assigned_agent;
  acc[agent] = (acc[agent] || 0) + 1;
  return acc;
}, {});

// 우선순위별 분포
const byPriority = inbox.reduce((acc, t) => {
  acc[t.priority] = (acc[t.priority] || 0) + 1;
  return acc;
}, {});
```

### 5. 자동 Inbox 생성

**Project Grid 스크립트:**

```python
# generate_inbox_tasks.py
import json
from datetime import datetime

tasks = [
    ("P1BA1", "회원가입 API", "high"),
    ("P1BA2", "로그인 API", "high"),
    ("P1BA3", "로그아웃 API", "medium"),
]

for task_id, task_name, priority in tasks:
    inbox_json = {
        "task_id": task_id,
        "task_name": task_name,
        "priority": priority,
        "created_at": datetime.now().isoformat(),
        # ... 나머지 필드
    }

    with open(f'Inbox/{task_id}.json', 'w') as f:
        json.dump(inbox_json, f, indent=2)
```

---

## 문제 해결

### 문제 1: AI가 Inbox 파일을 읽지 않음

**증상:**
- Inbox에 JSON 파일을 넣었는데 AI가 반응 없음

**원인:**
1. 서버가 실행 중이 아님
2. 파일명이 잘못됨
3. JSON 문법 오류

**해결:**

```bash
# 1. 서버 상태 확인
curl http://localhost:3030/status

# 2. Inbox 파일 확인
ls Web_ClaudeCode_Bridge/Inbox/*.json

# 3. JSON 유효성 검사
cat Inbox/task.json | jq .

# 4. 서버 재시작
cd Web_ClaudeCode_Bridge
node inbox_server.js
```

### 문제 2: Outbox에 결과가 생성되지 않음

**증상:**
- AI가 작업은 했는데 Outbox에 파일이 없음

**원인:**
1. 작업이 아직 완료 안 됨
2. 검증 단계에서 대기 중
3. 오류 발생

**해결:**

```bash
# 1. work_log 확인
cat .claude/work_logs/current.md | tail -50

# 2. AI에게 직접 질문
"현재 작업 상태를 알려주세요. Outbox 보고를 했나요?"

# 3. 수동으로 Outbox 보고 요청
"작업이 완료되었다면 Outbox에 보고서를 작성해주세요."
```

### 문제 3: JSON 문법 오류

**증상:**
- `SyntaxError: Unexpected token`
- `JSON.parse() error`

**흔한 실수:**

```json
{
  "task_id": "P1BA1",
  "task_name": "회원가입 API",  // ❌ 마지막 필드에 쉼표
}
```

```json
{
  "task_id": 'P1BA1'  // ❌ 작은따옴표 사용
}
```

```json
{
  task_id: "P1BA1"  // ❌ 키에 따옴표 없음
}
```

**올바른 형식:**

```json
{
  "task_id": "P1BA1",
  "task_name": "회원가입 API"
}
```

**검증 도구:**

- [JSONLint](https://jsonlint.com/)
- VS Code의 JSON validation
- `jq` 커맨드

```bash
cat task.json | jq .
```

### 문제 4: 대시보드에서 파일이 안 보임

**증상:**
- Inbox/Outbox에 파일은 있는데 대시보드에서 안 보임

**원인:**
1. 서버 연결 문제
2. 경로 설정 오류
3. CORS 오류

**해결:**

```javascript
// dashboard-mockup.html의 PROJECT_CONFIGS 확인
const PROJECT_CONFIGS = {
  'SSAL Works': {
    inboxPath: 'C:\\!SSAL_Works_Private\\Web_ClaudeCode_Bridge\\Inbox',  // ✅ 정확한 경로
    status: '진행중'
  }
};

// 브라우저 개발자 도구 (F12) → Console 탭에서 오류 확인
```

---

## 요약 및 체크리스트

### 핵심 개념 요약

**Inbox/Outbox JSON 시스템 = 구조화된 작업 관리**

```
구조화 → 검색 쉬움 → 통계 자동 → 웹 연동 → 자동화
```

**vs 기존 방식:**

| | 채팅 | work_log | Inbox/Outbox |
|--|------|----------|--------------|
| **명확성** | ❌ | △ | ✅ |
| **구조화** | ❌ | ❌ | ✅ |
| **자동화** | ❌ | ❌ | ✅ |
| **연속성** | ❌ | △ | ✅ |

### 시작 체크리스트

**환경 설정:**
- [ ] `inbox_server.js` 실행 중
- [ ] `http://localhost:3030` 접속 가능
- [ ] `Inbox/`, `Outbox/` 폴더 존재
- [ ] 웹 대시보드 열림

**첫 작업 지시:**
- [ ] Inbox JSON 템플릿 확인
- [ ] `task_id` 고유하게 생성
- [ ] `requirements` 명확하게 작성
- [ ] `acceptance_criteria` 구체적으로 명시
- [ ] `expected_files` 경로 정확하게
- [ ] JSON 문법 검증 (JSONLint)

**결과 확인:**
- [ ] Outbox 폴더 확인
- [ ] `status` 필드 확인
- [ ] `verification_completed` 검토
- [ ] `next_steps` 확인
- [ ] 웹 대시보드에서 시각화

### 모범 사례

**DO (✅):**
1. 명확하고 구체적인 요구사항
2. 측정 가능한 완료 조건
3. JSON 문법 검증
4. 참고 문서 명시
5. 우선순위 설정
6. 의존성 명시

**DON'T (❌):**
1. 모호한 지시
2. 시간 추정 포함
3. JSON 문법 오류
4. 불명확한 완료 조건
5. 파일 경로 누락

### 추가 학습 자료

**관련 문서:**
- `.claude/workflows/INBOX_OUTBOX_JSON_WORKFLOW.md` - AI 에이전트용 상세 지침
- `Web_ClaudeCode_Bridge/INBOX_OUTBOX_GUIDE.md` - 사용자 가이드
- `1_기획/1-1_Project_Plan/프로젝트_디렉토리_구조_관리.md` - 프로젝트 구조

**웹 리소스:**
- [JSON 기초](https://www.json.org/json-ko.html)
- [JSONLint 검증](https://jsonlint.com/)
- [jq Tutorial](https://stedolan.github.io/jq/tutorial/)

### 다음 단계

**이제 할 수 있는 것:**
- ✅ 구조화된 작업 지시
- ✅ 상세한 결과 보고 받기
- ✅ 웹 대시보드로 모니터링
- ✅ 통계 및 분석
- ✅ 세션 간 완벽한 연속성

**다음 학습:**
- Claude Code Subagents 활용
- Skills 시스템
- 대규모 프로젝트 관리
- CI/CD 통합

---

## 실습 과제

### 과제 1: 첫 Inbox JSON 작성

**목표:** 간단한 API 작업을 Inbox JSON으로 작성하기

**요구사항:**
- task_id: P1BA999
- 사용자 프로필 조회 API
- GET /api/user/profile/:id
- JWT 인증 필요

**작성해볼 것:**
1. Inbox JSON 파일 생성
2. 모든 필수 필드 포함
3. JSON 문법 검증
4. 파일 저장

### 과제 2: Outbox 분석

**목표:** 기존 Outbox JSON 파일 분석하기

**작업:**
1. Outbox 폴더의 JSON 파일 하나 읽기
2. 다음 정보 추출:
   - 실제 소요 시간
   - 테스트 통과 여부
   - 생성된 파일 목록
   - 다음 단계

### 과제 3: 웹 대시보드 연동

**목표:** 웹 대시보드에서 작업 생성하기

**단계:**
1. 대시보드 열기
2. "새 작업" 버튼 찾기
3. 폼 작성
4. Inbox에 JSON 생성 확인
5. AI가 작업 시작하는지 관찰

---

**🎓 학습 완료!**

이제 Inbox/Outbox JSON 시스템을 사용하여:
- ✅ 명확한 작업 지시
- ✅ 상세한 결과 확인
- ✅ 프로젝트 진행 추적
- ✅ AI와 효율적인 협업

**다음 고급 주제:**
- Subagents 활용법
- Skills 시스템
- 대규모 프로젝트 관리

---

**작성자**: Claude Code
**버전**: 1.0
**최종 수정**: 2025-11-18
**피드백**: [GitHub Issues](https://github.com/anthropics/claude-code/issues)
