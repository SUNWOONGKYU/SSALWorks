# Task Instruction - S3S1

## Task ID
S3S1

## Task Name
구독 권한 체크

## Task Goal
AI 기능 접근을 위한 구독 등급별 권한 체크 미들웨어 구현

## Prerequisites (Dependencies)
- S2BA3 (구독 관리 API) 완료
- S2S1 (인증 미들웨어) 완료

## Specific Instructions

### 1. 구독 권한 미들웨어 생성
- 위치: `api/lib/subscription/check-permission.js`

```javascript
// api/lib/subscription/check-permission.js
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// 기능별 필요 구독 등급
const FEATURE_REQUIREMENTS = {
  'ai-qa': ['basic', 'premium'],           // AI Q&A
  'ai-advanced': ['premium'],              // 고급 AI 기능
  'premium-content': ['basic', 'premium'], // 프리미엄 콘텐츠
  'unlimited-api': ['premium']             // 무제한 API
};

async function checkSubscriptionPermission(userId, feature) {
  // 사용자의 현재 구독 조회
  const { data: subscription, error } = await supabase
    .from('subscriptions')
    .select('*, subscription_plans(*)')
    .eq('user_id', userId)
    .eq('status', 'active')
    .single();

  if (error || !subscription) {
    return {
      hasPermission: false,
      currentPlan: 'free',
      requiredPlans: FEATURE_REQUIREMENTS[feature] || [],
      message: 'No active subscription'
    };
  }

  const planType = subscription.subscription_plans?.plan_type || 'free';
  const requiredPlans = FEATURE_REQUIREMENTS[feature] || [];
  const hasPermission = requiredPlans.includes(planType);

  return {
    hasPermission,
    currentPlan: planType,
    requiredPlans,
    subscription,
    message: hasPermission ? 'Access granted' : 'Upgrade required'
  };
}

module.exports = { checkSubscriptionPermission, FEATURE_REQUIREMENTS };
```

### 2. 권한 체크 래퍼 함수
```javascript
// api/lib/subscription/withSubscription.js
const { verifyAuth } = require('../auth/middleware');
const { checkSubscriptionPermission } = require('./check-permission');

function withSubscription(feature) {
  return function(handler) {
    return async (req, res) => {
      // 1. 인증 체크
      const { user, error: authError } = await verifyAuth(req);
      if (authError) {
        return res.status(401).json({ error: authError });
      }

      // 2. 구독 권한 체크
      const permission = await checkSubscriptionPermission(user.id, feature);
      if (!permission.hasPermission) {
        return res.status(403).json({
          error: 'Subscription required',
          currentPlan: permission.currentPlan,
          requiredPlans: permission.requiredPlans,
          upgradeUrl: '/pricing'
        });
      }

      // 3. req에 구독 정보 추가
      req.user = user;
      req.subscription = permission.subscription;

      return handler(req, res);
    };
  };
}

module.exports = { withSubscription };
```

### 3. 사용 예시
```javascript
// api/ai/advanced.js
const { withSubscription } = require('../lib/subscription/withSubscription');

// 프리미엄 전용 API
module.exports = withSubscription('ai-advanced')(async (req, res) => {
  const { user, subscription } = req;
  // 프리미엄 기능 로직
  res.status(200).json({ message: 'Premium feature accessed' });
});
```

### 4. 클라이언트 측 권한 체크
```javascript
// 클라이언트 측 유틸
async function checkFeatureAccess(feature) {
  const response = await fetch(`/api/subscription/check?feature=${feature}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.json();
}
```

### 5. 권한 체크 API
- 위치: `api/subscription/check.js`

```javascript
// api/subscription/check.js
const { withAuth } = require('../lib/auth/withAuth');
const { checkSubscriptionPermission } = require('../lib/subscription/check-permission');

module.exports = withAuth(async (req, res) => {
  const { feature } = req.query;
  const user = req.user;

  if (!feature) {
    return res.status(400).json({ error: 'Feature parameter required' });
  }

  const permission = await checkSubscriptionPermission(user.id, feature);
  res.status(200).json(permission);
});
```

## Expected Output Files
- `api/lib/subscription/check-permission.js`
- `api/lib/subscription/withSubscription.js`
- `api/subscription/check.js`

## Completion Criteria
- [ ] 구독 권한 체크 함수 구현
- [ ] withSubscription 래퍼 구현
- [ ] 기능별 권한 매핑 정의
- [ ] 권한 체크 API 구현
- [ ] 테스트 완료

## Tech Stack
- Vercel Serverless Functions
- Supabase

## Tools
- Write, Read
- Bash (API 테스트)

## Execution Type
AI-Only

## Remarks
- Free 사용자도 일부 기능 제한적 접근 가능
- 구독 만료 시 자동으로 권한 해제
- 업그레이드 유도 메시지 포함
