# Task Instruction - S3BI1

## Task ID
S3BI1

## Task Name
AI API 클라이언트 통합

## Task Goal
Anthropic Claude API 클라이언트 통합 및 사용량 추적 시스템 구현

## Prerequisites (Dependencies)
- S2BA3 (구독 관리 API) 완료
- S2S1 (인증 미들웨어) 완료

## Specific Instructions

### 1. Anthropic SDK 설치
```bash
npm install @anthropic-ai/sdk
```

### 2. API 클라이언트 래퍼 생성
- 위치: `api/lib/ai/anthropic-client.js`

```javascript
// api/lib/ai/anthropic-client.js
const Anthropic = require('@anthropic-ai/sdk');
const { createClient } = require('@supabase/supabase-js');

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function sendMessage(userId, message, options = {}) {
  const startTime = Date.now();

  try {
    const response = await anthropic.messages.create({
      model: options.model || 'claude-3-haiku-20240307',
      max_tokens: options.maxTokens || 1024,
      messages: [{ role: 'user', content: message }],
      system: options.systemPrompt || ''
    });

    const endTime = Date.now();
    const inputTokens = response.usage.input_tokens;
    const outputTokens = response.usage.output_tokens;

    // 사용량 로깅
    await logUsage(userId, {
      inputTokens,
      outputTokens,
      model: options.model || 'claude-3-haiku-20240307',
      responseTime: endTime - startTime
    });

    return {
      success: true,
      content: response.content[0].text,
      usage: { inputTokens, outputTokens }
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

async function logUsage(userId, usage) {
  await supabase.from('ai_usage_logs').insert({
    user_id: userId,
    tokens_used: usage.inputTokens + usage.outputTokens,
    model: usage.model,
    response_time_ms: usage.responseTime,
    created_at: new Date().toISOString()
  });
}

module.exports = { sendMessage, logUsage };
```

### 3. 사용량 제한 체크
```javascript
// api/lib/ai/usage-limiter.js
async function checkUsageLimit(userId, planType) {
  const limits = {
    free: 1000,      // 일일 토큰
    basic: 50000,    // 일일 토큰
    premium: 200000  // 일일 토큰
  };

  const today = new Date().toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('ai_usage_logs')
    .select('tokens_used')
    .eq('user_id', userId)
    .gte('created_at', today);

  const totalUsed = data?.reduce((sum, log) => sum + log.tokens_used, 0) || 0;
  const limit = limits[planType] || limits.free;

  return {
    used: totalUsed,
    limit,
    remaining: limit - totalUsed,
    exceeded: totalUsed >= limit
  };
}

module.exports = { checkUsageLimit };
```

### 4. 에러 핸들링
```javascript
// api/lib/ai/errors.js
const AI_ERRORS = {
  RATE_LIMITED: { code: 'AI_001', message: 'Rate limit exceeded' },
  INVALID_REQUEST: { code: 'AI_002', message: 'Invalid request' },
  API_ERROR: { code: 'AI_003', message: 'AI service error' },
  USAGE_EXCEEDED: { code: 'AI_004', message: 'Daily usage limit exceeded' }
};

module.exports = { AI_ERRORS };
```

## Expected Output Files
- `api/lib/ai/anthropic-client.js`
- `api/lib/ai/usage-limiter.js`
- `api/lib/ai/errors.js`

## Completion Criteria
- [ ] Anthropic SDK 통합
- [ ] 메시지 전송 함수 구현
- [ ] 사용량 로깅 구현
- [ ] 사용량 제한 체크 구현
- [ ] 에러 핸들링 구현
- [ ] 단위 테스트 통과

## Tech Stack
- Anthropic Claude API
- Supabase
- Node.js

## Tools
- Write, Read
- Bash (npm install, 테스트)

## Execution Type
AI-Only

## Remarks
- API 키는 환경 변수로 관리
- 모델 선택은 구독 등급에 따라 다르게 적용
- 토큰 비용 계산 로직 추후 추가

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

