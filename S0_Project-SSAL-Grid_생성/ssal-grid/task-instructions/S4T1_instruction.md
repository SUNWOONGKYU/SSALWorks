# Task Instruction - S4T1

---

## 📌 필수 참조 규칙 파일 (2025-12-19)

> **⚠️ 작업 전 반드시 아래 규칙 파일을 확인하세요!**

| 규칙 파일 | 내용 | 참조 시점 |
|----------|------|----------|
| `.claude/rules/01_file-naming.md` | 파일 명명 규칙 | 파일 생성 시 |
| `.claude/rules/02_save-location.md` | 저장 위치 규칙 | 파일 저장 시 |
| `.claude/rules/03_area-stage.md` | Area/Stage 매핑 | 폴더 선택 시 |
| `.claude/rules/05_execution-process.md` | 6단계 실행 프로세스 | 작업 전체 |



## Task ID
S4T1

## Task Name
결제 테스트

## Task Goal
결제 API에 대한 단위 테스트 및 통합 테스트 작성

## Prerequisites (Dependencies)
- S4BA1 (결제 API) 완료
- S4BA2 (웹훅 핸들러) 완료
- S4S1 (결제 보안) 완료

## Specific Instructions

### 1. 테스트 파일 구조
```
tests/
├── unit/
│   └── payment/
│       ├── validator.test.js
│       ├── rate-limiter.test.js
│       └── secure-payment.test.js
└── integration/
    └── payment/
        ├── confirm.test.js
        ├── billing.test.js
        └── webhook.test.js
```

### 2. 금액 검증 테스트
- 위치: `tests/unit/payment/validator.test.js`

```javascript
// tests/unit/payment/validator.test.js
const { validatePaymentAmount, PLAN_PRICES } = require('../../../api/lib/payment/validator');

describe('Payment Validator', () => {
  describe('validatePaymentAmount', () => {
    test('should accept valid payment', async () => {
      const result = await validatePaymentAmount(
        'ORDER_user123_1234567890_abc123',
        9900,
        'basic_monthly'
      );
      expect(result.valid).toBe(true);
    });

    test('should reject invalid plan ID', async () => {
      const result = await validatePaymentAmount(
        'ORDER_user123_1234567890_abc123',
        9900,
        'invalid_plan'
      );
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Invalid plan ID');
    });

    test('should reject amount mismatch', async () => {
      const result = await validatePaymentAmount(
        'ORDER_user123_1234567890_abc123',
        100,  // 잘못된 금액
        'basic_monthly'
      );
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Amount mismatch');
      expect(result.expected).toBe(9900);
    });

    test('should reject invalid order ID format', async () => {
      const result = await validatePaymentAmount(
        'INVALID_ORDER_ID',
        9900,
        'basic_monthly'
      );
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Invalid order ID format');
    });
  });

  describe('PLAN_PRICES', () => {
    test('should have all plan prices defined', () => {
      expect(PLAN_PRICES.basic_monthly).toBe(9900);
      expect(PLAN_PRICES.basic_yearly).toBe(99000);
      expect(PLAN_PRICES.premium_monthly).toBe(29900);
      expect(PLAN_PRICES.premium_yearly).toBe(299000);
    });
  });
});
```

### 3. Rate Limiter 테스트
- 위치: `tests/unit/payment/rate-limiter.test.js`

```javascript
// tests/unit/payment/rate-limiter.test.js
const { checkRateLimit } = require('../../../api/lib/payment/rate-limiter');

describe('Rate Limiter', () => {
  test('should allow requests within limit', () => {
    const userId = 'test-user-' + Date.now();

    for (let i = 0; i < 5; i++) {
      const result = checkRateLimit(userId, 'payment');
      expect(result.allowed).toBe(true);
    }
  });

  test('should block requests exceeding limit', () => {
    const userId = 'test-user-' + Date.now();

    // 5회 허용
    for (let i = 0; i < 5; i++) {
      checkRateLimit(userId, 'payment');
    }

    // 6번째는 차단
    const result = checkRateLimit(userId, 'payment');
    expect(result.allowed).toBe(false);
    expect(result.error).toBe('Rate limit exceeded');
  });

  test('should return remaining count', () => {
    const userId = 'test-user-' + Date.now();

    const result = checkRateLimit(userId, 'payment');
    expect(result.remaining).toBe(4); // 5 - 1
  });
});
```

### 4. 결제 승인 API 테스트
- 위치: `tests/integration/payment/confirm.test.js`

```javascript
// tests/integration/payment/confirm.test.js
const fetch = require('node-fetch');

const BASE_URL = process.env.TEST_API_URL || 'http://localhost:3000';

describe('Payment Confirm API', () => {
  test('POST /api/payment/confirm should require all fields', async () => {
    const response = await fetch(`${BASE_URL}/api/payment/confirm`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('Missing required fields');
  });

  test('POST /api/payment/confirm should validate payment', async () => {
    const response = await fetch(`${BASE_URL}/api/payment/confirm`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer test_token'
      },
      body: JSON.stringify({
        paymentKey: 'test_payment_key',
        orderId: 'ORDER_testuser_1234567890_abc123',
        amount: 9900
      })
    });

    // 테스트 환경에서는 토스 API 모킹 필요
    expect([200, 400, 401]).toContain(response.status);
  });
});
```

### 5. 웹훅 테스트
- 위치: `tests/integration/payment/webhook.test.js`

```javascript
// tests/integration/payment/webhook.test.js
const crypto = require('crypto');

describe('Payment Webhook', () => {
  const WEBHOOK_SECRET = process.env.TOSS_WEBHOOK_SECRET || 'test_secret';

  function generateSignature(payload) {
    return crypto
      .createHmac('sha256', WEBHOOK_SECRET)
      .update(JSON.stringify(payload))
      .digest('base64');
  }

  test('POST /api/webhook/toss-payments should verify signature', async () => {
    const payload = {
      eventType: 'PAYMENT_STATUS_CHANGED',
      data: { paymentKey: 'test', status: 'DONE' }
    };

    const response = await fetch(`${BASE_URL}/api/webhook/toss-payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'toss-signature': generateSignature(payload)
      },
      body: JSON.stringify(payload)
    });

    expect(response.status).toBe(200);
  });

  test('POST /api/webhook/toss-payments should reject invalid signature', async () => {
    const response = await fetch(`${BASE_URL}/api/webhook/toss-payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'toss-signature': 'invalid_signature'
      },
      body: JSON.stringify({ eventType: 'TEST' })
    });

    expect(response.status).toBe(401);
  });
});
```

### 6. 테스트 실행 스크립트
```json
{
  "scripts": {
    "test:payment": "jest --testPathPattern=tests/.*payment.* --coverage",
    "test:payment:unit": "jest --testPathPattern=tests/unit/payment",
    "test:payment:integration": "jest --testPathPattern=tests/integration/payment"
  }
}
```

### 7. Mock 설정
- 위치: `tests/__mocks__/toss-api.js`

```javascript
// tests/__mocks__/toss-api.js
const mockTossPayments = {
  confirm: jest.fn().mockResolvedValue({
    paymentKey: 'test_payment_key',
    orderId: 'test_order_id',
    status: 'DONE',
    method: 'CARD',
    approvedAt: new Date().toISOString()
  }),

  cancel: jest.fn().mockResolvedValue({
    paymentKey: 'test_payment_key',
    status: 'CANCELED'
  }),

  issueBillingKey: jest.fn().mockResolvedValue({
    billingKey: 'test_billing_key',
    customerKey: 'test_customer',
    card: { company: 'SHINHAN', number: '1234****5678' }
  })
};

module.exports = mockTossPayments;
```

## Expected Output Files
- `tests/unit/payment/validator.test.js`
- `tests/unit/payment/rate-limiter.test.js`
- `tests/unit/payment/secure-payment.test.js`
- `tests/integration/payment/confirm.test.js`
- `tests/integration/payment/billing.test.js`
- `tests/integration/payment/webhook.test.js`
- `tests/__mocks__/toss-api.js`

## Completion Criteria
- [ ] 금액 검증 테스트 작성
- [ ] Rate Limiter 테스트 작성
- [ ] 결제 승인 API 테스트 작성
- [ ] 웹훅 테스트 작성
- [ ] Mock 설정
- [ ] 모든 테스트 통과
- [ ] 코드 커버리지 80% 이상

## Tech Stack
- Jest
- Node.js

## Tools
- Write, Read
- Bash (npm test)

## Execution Type
AI-Only

## Remarks
- 토스 API는 Mock으로 대체
- 실제 결제 테스트는 토스 샌드박스 사용
- CI/CD에서 자동 실행 설정

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

