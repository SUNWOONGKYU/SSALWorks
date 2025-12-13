# Task Instruction - S1BI1

## Task ID
S1BI1

## Task Name
환경변수 설정

## Task Goal
로컬 개발용 .env 파일 구조 정의 및 Vercel 환경변수 설정

## Prerequisites (Dependencies)
- S1F1 (Vercel 프로젝트 설정) 완료

## Specific Instructions

### 1. .env.example 파일 생성
- 위치: `P3_프로토타입_제작/Frontend/Prototype/.env.example`

### 2. 필수 환경변수 목록
```env
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Resend (이메일)
RESEND_API_KEY=your-resend-api-key

# AI APIs
OPENAI_API_KEY=your-openai-api-key
GOOGLE_AI_API_KEY=your-gemini-api-key
PERPLEXITY_API_KEY=your-perplexity-api-key

# 토스 페이먼트
TOSS_CLIENT_KEY=your-toss-client-key
TOSS_SECRET_KEY=your-toss-secret-key

# Sentry (에러 트래킹)
SENTRY_DSN=your-sentry-dsn

# App
APP_URL=http://localhost:3000
CRON_SECRET=your-cron-secret
```

### 3. Vercel 환경변수 설정
- Vercel Dashboard > Project Settings > Environment Variables
- Production/Preview/Development 환경별 설정
- 민감한 키는 Encrypted 옵션 사용

### 4. .gitignore 확인
```
.env
.env.local
.env.*.local
```

### 5. 환경변수 접근 방법 문서화
```javascript
// Serverless Function에서 접근
const supabaseUrl = process.env.SUPABASE_URL;

// 클라이언트에서 접근 (공개 키만)
// vercel.json에서 NEXT_PUBLIC_ 접두사 필요시 설정
```

## Expected Output Files
- `P3_프로토타입_제작/Frontend/Prototype/.env.example`
- `docs/ENV_SETUP.md` (환경변수 설정 가이드)

## Completion Criteria
- [ ] .env.example 파일 생성
- [ ] 모든 필수 환경변수 목록 포함
- [ ] Vercel 환경변수 설정 완료
- [ ] .gitignore에 .env 파일 제외 확인
- [ ] 환경변수 설정 가이드 문서 작성

## Tech Stack
- Environment Variables
- Vercel

## Tools
- Write, Read
- WebFetch (Vercel Dashboard)

## Execution Type
Human-AI (Vercel Dashboard 접속 필요)

## Remarks
- 실제 API 키는 별도 관리 (Human이 입력)
- .env.example은 템플릿으로 Git에 포함
- 실제 .env 파일은 절대 Git에 포함하지 않음
