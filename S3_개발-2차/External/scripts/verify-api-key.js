// S3E1: AI API 키 설정 - 검증 스크립트
const Anthropic = require('@anthropic-ai/sdk');

async function verifyApiKey() {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    console.error('❌ ANTHROPIC_API_KEY not found');
    console.log('\n환경 변수 설정 방법:');
    console.log('1. .env.local 파일에 ANTHROPIC_API_KEY=sk-ant-... 추가');
    console.log('2. Vercel Dashboard > Settings > Environment Variables에서 설정');
    process.exit(1);
  }

  console.log('🔍 API 키 검증 중...');
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
