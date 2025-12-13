# Task Instruction - S3E1

## Task ID
S3E1

## Task Name
AI API 키 설정

## Task Goal
Anthropic API 키 등록 및 Vercel 환경 변수 설정

## Prerequisites (Dependencies)
- S1O1 (Vercel 프로젝트 설정) 완료

## Specific Instructions

### 1. Anthropic API 키 발급
- Anthropic Console: https://console.anthropic.com/
- API Keys 메뉴에서 새 키 생성
- 키 이름: `ssalworks-production` 또는 `ssalworks-development`

### 2. Vercel 환경 변수 설정
```bash
# Vercel CLI로 설정
vercel env add ANTHROPIC_API_KEY

# 또는 Vercel 대시보드에서 설정
# Settings > Environment Variables
```

### 3. 환경 변수 목록
```
ANTHROPIC_API_KEY=sk-ant-api03-xxxxx
```

### 4. 로컬 개발 환경 설정
- 위치: `.env.local` (gitignore에 포함)

```env
# .env.local
ANTHROPIC_API_KEY=sk-ant-api03-xxxxx

# Supabase (기존)
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJxxxxx
SUPABASE_SERVICE_ROLE_KEY=eyJxxxxx
```

### 5. API 키 유효성 검증 스크립트
- 위치: `scripts/verify-api-key.js`

```javascript
// scripts/verify-api-key.js
const Anthropic = require('@anthropic-ai/sdk');

async function verifyApiKey() {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    console.error('❌ ANTHROPIC_API_KEY not found');
    process.exit(1);
  }

  const anthropic = new Anthropic({ apiKey });

  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 10,
      messages: [{ role: 'user', content: 'Hello' }]
    });

    console.log('✅ API Key is valid');
    console.log('Model:', response.model);
    console.log('Usage:', response.usage);
    return true;
  } catch (error) {
    console.error('❌ API Key verification failed:', error.message);
    process.exit(1);
  }
}

verifyApiKey();
```

### 6. package.json 스크립트 추가
```json
{
  "scripts": {
    "verify:api-key": "node scripts/verify-api-key.js"
  }
}
```

### 7. 환경별 설정
```
Production:
- Vercel Environment Variables에 등록
- Environment: Production

Preview:
- Vercel Environment Variables에 등록
- Environment: Preview

Development:
- .env.local 파일 사용
- gitignore에 포함되어 있어야 함
```

### 8. 보안 체크리스트
- [ ] API 키가 코드에 하드코딩되어 있지 않은지 확인
- [ ] .env 파일이 gitignore에 포함되어 있는지 확인
- [ ] Vercel 환경 변수가 올바르게 설정되었는지 확인
- [ ] API 키 접근 권한이 필요한 팀원에게만 제한되어 있는지 확인

## Expected Output Files
- `.env.local` (로컬 개발용, git에 포함 안 됨)
- `scripts/verify-api-key.js`
- Vercel 환경 변수 설정 완료

## Completion Criteria
- [ ] Anthropic API 키 발급
- [ ] Vercel 환경 변수 등록
- [ ] 로컬 환경 변수 설정
- [ ] API 키 검증 스크립트 실행 성공
- [ ] 보안 체크리스트 확인

## Tech Stack
- Anthropic API
- Vercel
- Node.js

## Tools
- Bash (vercel env, npm run)
- Write

## Execution Type
Human-Assisted

## Remarks
- API 키는 절대 코드에 직접 입력하지 않음
- 개발/프로덕션 키 분리 권장
- 키 로테이션 정책 수립 권장
- 사용량 모니터링을 위해 Anthropic Console 정기 확인
