# Task Instruction - S3BI1

## Task ID
S3BI1

## Task Name
AI API 클라이언트 통합

## Task Goal
Gemini, ChatGPT, Perplexity 3개 AI 서비스 클라이언트 통합 및 사용량 추적 시스템 구현

## Prerequisites (Dependencies)
- S2BA3 (구독 관리 API) 완료
- S2S1 (인증 미들웨어) 완료
- S3E1 (AI API 키 설정) 완료

## Specific Instructions

### 1. SDK 설치
```bash
npm install @google/generative-ai openai
```

### 2. AI 클라이언트 래퍼 생성
- 위치: api/lib/ai/

#### 2-1. Gemini 클라이언트
```javascript
// api/lib/ai/gemini-client.js
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function sendGeminiMessage(message, options = {}) {
  const model = genAI.getGenerativeModel({ 
    model: options.model || 'gemini-pro' 
  });
  
  const result = await model.generateContent(message);
  const response = await result.response;
  
  return {
    success: true,
    content: response.text(),
    provider: 'gemini'
  };
}

module.exports = { sendGeminiMessage };
```

#### 2-2. ChatGPT 클라이언트
```javascript
// api/lib/ai/chatgpt-client.js
const OpenAI = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function sendChatGPTMessage(message, options = {}) {
  const response = await openai.chat.completions.create({
    model: options.model || 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: message }],
    max_tokens: options.maxTokens || 1024
  });
  
  return {
    success: true,
    content: response.choices[0].message.content,
    usage: response.usage,
    provider: 'chatgpt'
  };
}

module.exports = { sendChatGPTMessage };
```

#### 2-3. Perplexity 클라이언트
```javascript
// api/lib/ai/perplexity-client.js
async function sendPerplexityMessage(message, options = {}) {
  const response = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: options.model || 'llama-3.1-sonar-small-128k-online',
      messages: [{ role: 'user', content: message }],
      max_tokens: options.maxTokens || 1024
    })
  });
  
  const data = await response.json();
  
  return {
    success: true,
    content: data.choices[0].message.content,
    usage: data.usage,
    provider: 'perplexity'
  };
}

module.exports = { sendPerplexityMessage };
```

#### 2-4. 통합 클라이언트
```javascript
// api/lib/ai/index.js
const { sendGeminiMessage } = require('./gemini-client');
const { sendChatGPTMessage } = require('./chatgpt-client');
const { sendPerplexityMessage } = require('./perplexity-client');

async function sendMessage(provider, message, options = {}) {
  switch (provider) {
    case 'gemini':
      return sendGeminiMessage(message, options);
    case 'chatgpt':
      return sendChatGPTMessage(message, options);
    case 'perplexity':
      return sendPerplexityMessage(message, options);
    default:
      throw new Error(`Unknown provider: ${provider}`);
  }
}

module.exports = { 
  sendMessage,
  sendGeminiMessage,
  sendChatGPTMessage,
  sendPerplexityMessage
};
```

### 3. 사용량 제한 체크
```javascript
// api/lib/ai/usage-limiter.js
const DAILY_LIMITS = {
  free: 0,        // AI 사용 불가
  basic: 20,      // 일일 20회
  premium: 100    // 일일 100회
};

async function checkUsageLimit(userId, planType) {
  // 구현...
}

module.exports = { checkUsageLimit, DAILY_LIMITS };
```

## Expected Output Files
- api/lib/ai/gemini-client.js
- api/lib/ai/chatgpt-client.js
- api/lib/ai/perplexity-client.js
- api/lib/ai/index.js
- api/lib/ai/usage-limiter.js
- api/lib/ai/errors.js

## Completion Criteria
- [ ] Gemini 클라이언트 구현
- [ ] ChatGPT 클라이언트 구현
- [ ] Perplexity 클라이언트 구현
- [ ] 통합 인터페이스 구현
- [ ] 사용량 제한 체크 구현
- [ ] 에러 핸들링 구현

## Tech Stack
- Google Gemini API
- OpenAI ChatGPT API
- Perplexity API
- Supabase
- Node.js

## Execution Type
AI-Only

## Remarks
- 3개 AI 서비스를 동일 인터페이스로 사용 가능하게 구현
- 프론트엔드에서 사용자가 AI 선택 가능
- 사용량은 구독 등급별로 제한
