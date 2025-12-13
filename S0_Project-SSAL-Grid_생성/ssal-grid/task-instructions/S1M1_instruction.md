# Task Instruction - S1M1

## Task ID
S1M1

## Task Name
개발 가이드

## Task Goal
SSALWorks v1.0 프로덕션 개발을 위한 코딩 컨벤션, 파일 명명 규칙, Serverless API 구조 가이드 문서 작성

## Prerequisites (Dependencies)
- 없음 (독립 Task)

## Specific Instructions

### 1. 문서 구조
- 위치: `docs/DEVELOPMENT_GUIDE.md`
- 형식: Markdown

### 2. 필수 포함 내용

#### 2.1 코딩 컨벤션
- JavaScript/TypeScript 스타일 가이드
- 변수/함수 네이밍 규칙 (camelCase, PascalCase 사용처)
- 주석 작성 규칙
- ESLint/Prettier 설정

#### 2.2 파일 명명 규칙
- 컴포넌트 파일: PascalCase (예: `ProfileCard.js`)
- 유틸리티 파일: camelCase (예: `formatDate.js`)
- API 라우트: kebab-case (예: `/api/auth/google-callback`)
- 상수 파일: UPPER_SNAKE_CASE (예: `API_ENDPOINTS.js`)

#### 2.3 Serverless API 구조
```
api/
├── auth/
│   ├── google.js
│   ├── google-callback.js
│   └── logout.js
├── subscription/
│   ├── create.js
│   ├── status.js
│   └── cancel.js
├── payment/
│   ├── request.js
│   └── webhook.js
└── ai/
    └── query.js
```

#### 2.4 디렉토리 구조
- P3_프로토타입_제작/Frontend/Prototype/ 구조 설명
- api/ 폴더 구조
- 공통 유틸리티 위치

#### 2.5 환경변수 규칙
- 네이밍: UPPER_SNAKE_CASE
- 필수 환경변수 목록
- .env.example 파일 유지

### 3. 기술 스택 명시
- HTML/CSS/JavaScript (프론트엔드)
- Vercel Serverless Functions (백엔드)
- Supabase (데이터베이스, 인증)

## Expected Output Files
- `docs/DEVELOPMENT_GUIDE.md`

## Completion Criteria
- [ ] 코딩 컨벤션 섹션 완성
- [ ] 파일 명명 규칙 섹션 완성
- [ ] Serverless API 구조 섹션 완성
- [ ] 디렉토리 구조 섹션 완성
- [ ] 환경변수 규칙 섹션 완성
- [ ] 문서 형식 검증 (Markdown lint 통과)

## Tech Stack
- Markdown

## Tools
- Read, Write, Glob

## Execution Type
AI-Only

## Remarks
- 이 문서는 모든 개발자/AI가 참조하는 기준 문서
- P3 프로토타입에서 사용된 패턴을 기반으로 작성

---

## ⚠️ 작업 결과물 저장 2대 규칙

> **이 규칙은 반드시 준수하세요!**

### 제1 규칙: Stage + Area 폴더에 저장
- Task ID의 Stage와 Area에 해당하는 폴더에 저장
- 예: S1S1 → `S1_개발_준비/Security/`
- 예: S2F1 → `S2_개발-1차/Frontend/`

### 제2 규칙: Production 코드는 이중 저장
- Frontend, Database, Backend_APIs 코드는 Stage 폴더 + Production 폴더 둘 다 저장
- 문서(Documentation, Security, Testing, DevOps)는 Stage 폴더에만 저장

**Area 폴더 매핑:** M→Documentation, F→Frontend, BI→Backend_Infra, BA→Backend_APIs, D→Database, S→Security, T→Testing, O→DevOps, E→External, C→Content

