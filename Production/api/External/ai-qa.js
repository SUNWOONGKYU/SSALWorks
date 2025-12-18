/**
 * @task S3BA1
 * @description AI Q&A API - Gemini, ChatGPT, Perplexity 지원
 * 로그인한 사용자는 모두 AI 기능 사용 가능 (구독 체크 없음)
 */

const { sendMessage, VALID_PROVIDERS } = require('../Backend_Infrastructure/ai');
const { createClient } = require('@supabase/supabase-js');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { question, provider, contentId, context } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'Question is required' });
  }

  if (!provider || !VALID_PROVIDERS.includes(provider)) {
    return res.status(400).json({
      error: 'Invalid provider',
      validProviders: VALID_PROVIDERS,
      message: 'Provider must be one of: gemini, chatgpt, perplexity'
    });
  }

  // 학습 콘텐츠 컨텍스트 (선택적)
  let learningContext = context || '';
  if (contentId) {
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      );
      const { data: content } = await supabase
        .from('learning_contents')
        .select('title, content, description')
        .eq('id', contentId)
        .single();
      if (content) {
        learningContext = `학습 콘텐츠: ${content.title}
설명: ${content.description || ''}
내용: ${content.content || ''}`;
      }
    } catch (e) {
      // 콘텐츠 로드 실패해도 계속 진행
      console.error('Failed to load learning content:', e);
    }
  }

  // 학습 콘텐츠가 있으면 질문에 포함
  const fullQuestion = learningContext
    ? `${question}\n\n[참고 콘텐츠]\n${learningContext}`
    : question;

  try {
    const result = await sendMessage(provider, fullQuestion, { maxTokens: 2048 });

    if (!result.success) {
      return res.status(500).json({
        error: 'AI service error',
        details: result.error,
        provider
      });
    }

    return res.status(200).json({
      success: true,
      answer: result.content,
      provider: result.provider,
      model: result.model,
      usage: result.usage
    });
  } catch (error) {
    console.error('AI Q&A Error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
};
