# Task Instruction - S2BA3

## Task ID
S2BA3

## Task Name
구독 관리 API

## Task Goal
구독 신청/상태 조회/해지 API 구현

## Prerequisites (Dependencies)
- S1D1 (DB 스키마 확정) 완료

## Specific Instructions

### 1. 구독 상태 조회 API
- 위치: `api/subscription/status.js`

```javascript
// api/subscription/status.js
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.replace('Bearer ', '');
  const { data: { user }, error: authError } = await supabase.auth.getUser(token);

  if (authError || !user) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  const { data: subscription, error } = await supabase
    .from('subscriptions')
    .select('*, subscription_plans(*)')
    .eq('user_id', user.id)
    .single();

  if (error) {
    return res.status(200).json({ subscription: null, status: 'none' });
  }

  res.status(200).json({ subscription });
};
```

### 2. 구독 신청 API
- 위치: `api/subscription/create.js`

```javascript
// api/subscription/create.js
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { plan_id } = req.body;
  // 인증 확인...

  const { data, error } = await supabase
    .from('subscriptions')
    .insert({
      user_id: user.id,
      plan_id,
      status: 'pending', // 결제 완료 후 active로 변경
      start_date: new Date().toISOString(),
      end_date: null // 월 구독의 경우
    })
    .select()
    .single();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(201).json({ subscription: data });
};
```

### 3. 구독 해지 API
- 위치: `api/subscription/cancel.js`

```javascript
// api/subscription/cancel.js
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 인증 확인...

  const { data, error } = await supabase
    .from('subscriptions')
    .update({
      status: 'cancelled',
      cancelled_at: new Date().toISOString()
    })
    .eq('user_id', user.id)
    .eq('status', 'active')
    .select()
    .single();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(200).json({ subscription: data, message: 'Subscription cancelled' });
};
```

### 4. 공통 인증 미들웨어 사용
- S2S1에서 구현될 인증 미들웨어 활용

## Expected Output Files
- `api/subscription/status.js`
- `api/subscription/create.js`
- `api/subscription/cancel.js`

## Completion Criteria
- [ ] 구독 상태 조회 API 구현
- [ ] 구독 신청 API 구현
- [ ] 구독 해지 API 구현
- [ ] 인증 검증 구현
- [ ] API 테스트 완료

## Tech Stack
- Vercel Serverless Functions
- Supabase

## Tools
- Write, Read
- Bash (API 테스트)

## Execution Type
AI-Only

## Remarks
- 실제 결제 연동은 S4BA1에서 구현
- 구독 상태: pending, active, cancelled, expired
