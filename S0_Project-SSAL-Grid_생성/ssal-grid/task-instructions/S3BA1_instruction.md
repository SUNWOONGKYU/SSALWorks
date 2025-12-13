# Task Instruction - S3BA1

## Task ID
S3BA1

## Task Name
AI Q&A API

## Task Goal
학습 콘텐츠 기반 AI 질의응답 API 구현

## Prerequisites (Dependencies)
- S3BI1 (AI API 클라이언트 통합) 완료
- S2C1 (Books 콘텐츠 업로드) 완료

## Specific Instructions

### 1. Q&A API 엔드포인트 생성
- 위치: `api/ai/qa.js`

```javascript
// api/ai/qa.js
const { sendMessage } = require('../lib/ai/anthropic-client');
const { checkUsageLimit } = require('../lib/ai/usage-limiter');
const { withAuth } = require('../lib/auth/withAuth');

module.exports = withAuth(async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { question, context, contentId } = req.body;
  const user = req.user;

  if (!question) {
    return res.status(400).json({ error: 'Question is required' });
  }

  // 사용량 제한 체크
  const usageStatus = await checkUsageLimit(user.id, user.plan_type);
  if (usageStatus.exceeded) {
    return res.status(429).json({
      error: 'Daily usage limit exceeded',
      usage: usageStatus
    });
  }

  // 시스템 프롬프트 구성
  const systemPrompt = `당신은 SSALWorks의 AI 튜터입니다.
사용자가 학습 콘텐츠에 대해 질문하면 친절하고 정확하게 답변해주세요.
${context ? `참고 콘텐츠:\n${context}` : ''}

답변 규칙:
1. 한국어로 답변하세요
2. 초보자도 이해할 수 있게 설명하세요
3. 필요시 코드 예제를 포함하세요
4. 답변은 간결하면서도 충분히 상세하게 작성하세요`;

  try {
    const result = await sendMessage(user.id, question, {
      systemPrompt,
      maxTokens: 2048
    });

    if (!result.success) {
      return res.status(500).json({ error: result.error });
    }

    res.status(200).json({
      answer: result.content,
      usage: result.usage,
      remainingTokens: usageStatus.remaining - result.usage.inputTokens - result.usage.outputTokens
    });
  } catch (error) {
    res.status(500).json({ error: 'AI service error' });
  }
});
```

### 2. 콘텐츠 컨텍스트 로더
```javascript
// api/lib/ai/context-loader.js
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function loadContentContext(contentId) {
  const { data, error } = await supabase
    .from('learning_contents')
    .select('title, content_path, category')
    .eq('id', contentId)
    .single();

  if (error || !data) {
    return null;
  }

  // jsdelivr에서 콘텐츠 로드
  const cdnUrl = `https://cdn.jsdelivr.net/gh/user/repo@main/${data.content_path}`;
  try {
    const response = await fetch(cdnUrl);
    const content = await response.text();
    return {
      title: data.title,
      content: content.slice(0, 3000) // 컨텍스트 길이 제한
    };
  } catch {
    return null;
  }
}

module.exports = { loadContentContext };
```

### 3. Q&A 히스토리 저장 (선택)
```javascript
// api/lib/ai/qa-history.js
async function saveQAHistory(userId, question, answer, contentId) {
  await supabase.from('qa_history').insert({
    user_id: userId,
    question,
    answer,
    content_id: contentId,
    created_at: new Date().toISOString()
  });
}

module.exports = { saveQAHistory };
```

### 4. 프론트엔드 연동
```javascript
// 클라이언트 측 호출 예시
async function askQuestion(question, context) {
  const session = await supabase.auth.getSession();
  const response = await fetch('/api/ai/qa', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.data.session.access_token}`
    },
    body: JSON.stringify({ question, context })
  });
  return response.json();
}
```

## Expected Output Files
- `api/ai/qa.js`
- `api/lib/ai/context-loader.js`
- `api/lib/ai/qa-history.js` (선택)

## Completion Criteria
- [ ] Q&A API 엔드포인트 구현
- [ ] 시스템 프롬프트 구성
- [ ] 콘텐츠 컨텍스트 로딩 구현
- [ ] 사용량 제한 연동
- [ ] API 테스트 완료
- [ ] 응답 품질 확인

## Tech Stack
- Vercel Serverless Functions
- Anthropic Claude API
- Supabase

## Tools
- Write, Read
- Bash (API 테스트)

## Execution Type
AI-Only

## Remarks
- 컨텍스트 길이 제한으로 토큰 비용 관리
- 프리미엄 사용자는 더 긴 컨텍스트 허용 가능
- Q&A 히스토리는 MVP에서 선택 사항
