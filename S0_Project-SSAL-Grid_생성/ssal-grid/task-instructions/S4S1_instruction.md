# Task Instruction - S4S1

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
S4S1

## Task Name
관리자 권한 체크

## Task Goal
결제 프로세스 보안 강화 및 취약점 점검

## Prerequisites (Dependencies)
- S4BA1 (결제 API) 완료
- S4BA2 (웹훅 핸들러) 완료

## Specific Instructions

### 1. 결제 금액 검증
- 위치: `api/lib/payment/validator.js`

```javascript
// api/lib/payment/validator.js

// 플랜별 가격 정보 (서버에서 관리)
const PLAN_PRICES = {
    'basic_monthly': 9900,
    'basic_yearly': 99000,
    'premium_monthly': 29900,
    'premium_yearly': 299000
};

async function validatePaymentAmount(orderId, amount, planId) {
    // 1. 플랜 가격 확인
    const expectedPrice = PLAN_PRICES[planId];
    if (!expectedPrice) {
        return { valid: false, error: 'Invalid plan ID' };
    }

    // 2. 금액 일치 확인
    if (amount !== expectedPrice) {
        return {
            valid: false,
            error: 'Amount mismatch',
            expected: expectedPrice,
            received: amount
        };
    }

    // 3. 주문 ID 형식 검증
    if (!isValidOrderId(orderId)) {
        return { valid: false, error: 'Invalid order ID format' };
    }

    // 4. 중복 결제 방지
    const { data: existingPayment } = await supabase
        .from('payments')
        .select('id')
        .eq('order_id', orderId)
        .single();

    if (existingPayment) {
        return { valid: false, error: 'Duplicate order ID' };
    }

    return { valid: true };
}

function isValidOrderId(orderId) {
    // ORDER_{userId}_{timestamp}_{random} 형식 검증
    const pattern = /^ORDER_[a-zA-Z0-9-]+_\d+_[a-zA-Z0-9]+$/;
    return pattern.test(orderId);
}

module.exports = { validatePaymentAmount, PLAN_PRICES };
```

### 2. Rate Limiting
- 위치: `api/lib/payment/rate-limiter.js`

```javascript
// api/lib/payment/rate-limiter.js

// 메모리 기반 Rate Limiter (프로덕션에서는 Redis 권장)
const rateLimitStore = new Map();

const RATE_LIMITS = {
    payment: { windowMs: 60000, max: 5 },      // 1분에 5회
    billing: { windowMs: 86400000, max: 3 },   // 1일에 3회
    cancel: { windowMs: 3600000, max: 10 }     // 1시간에 10회
};

function checkRateLimit(userId, action) {
    const limit = RATE_LIMITS[action];
    if (!limit) return { allowed: true };

    const key = `${userId}:${action}`;
    const now = Date.now();

    // 기존 기록 조회
    let record = rateLimitStore.get(key);

    // 윈도우 초과 시 리셋
    if (!record || now - record.windowStart > limit.windowMs) {
        record = { windowStart: now, count: 0 };
    }

    // 제한 초과 확인
    if (record.count >= limit.max) {
        return {
            allowed: false,
            error: 'Rate limit exceeded',
            retryAfter: Math.ceil((record.windowStart + limit.windowMs - now) / 1000)
        };
    }

    // 카운트 증가
    record.count++;
    rateLimitStore.set(key, record);

    return { allowed: true, remaining: limit.max - record.count };
}

module.exports = { checkRateLimit };
```

### 3. 결제 API 보안 래퍼
- 위치: `api/lib/payment/secure-payment.js`

```javascript
// api/lib/payment/secure-payment.js
const { validatePaymentAmount } = require('./validator');
const { checkRateLimit } = require('./rate-limiter');
const { verifyAuth } = require('../auth/middleware');

function withPaymentSecurity(handler) {
    return async (req, res) => {
        // 1. 인증 확인
        const { user, error: authError } = await verifyAuth(req);
        if (authError) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // 2. Rate Limiting
        const rateCheck = checkRateLimit(user.id, 'payment');
        if (!rateCheck.allowed) {
            return res.status(429).json({
                error: 'Too many requests',
                retryAfter: rateCheck.retryAfter
            });
        }

        // 3. 금액 검증 (POST 요청의 경우)
        if (req.method === 'POST' && req.body.amount) {
            const validation = await validatePaymentAmount(
                req.body.orderId,
                req.body.amount,
                req.body.planId
            );

            if (!validation.valid) {
                // 보안 로그
                await logSecurityEvent(user.id, 'INVALID_PAYMENT_ATTEMPT', {
                    error: validation.error,
                    body: req.body
                });

                return res.status(400).json({ error: validation.error });
            }
        }

        // 4. 요청 처리
        req.user = user;
        return handler(req, res);
    };
}

async function logSecurityEvent(userId, eventType, details) {
    await supabase.from('security_logs').insert({
        user_id: userId,
        event_type: eventType,
        details,
        ip_address: null, // Vercel에서 가져오기
        created_at: new Date().toISOString()
    });
}

module.exports = { withPaymentSecurity };
```

### 4. 보안 로그 테이블
```sql
-- security_logs 테이블
CREATE TABLE IF NOT EXISTS security_logs (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    event_type VARCHAR(100) NOT NULL,
    details JSONB,
    ip_address VARCHAR(45),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 5. 환경 변수 검증
- 위치: `api/lib/payment/env-check.js`

```javascript
// api/lib/payment/env-check.js
function validatePaymentEnv() {
    const required = [
        'TOSS_SECRET_KEY',
        'TOSS_WEBHOOK_SECRET',
        'SUPABASE_URL',
        'SUPABASE_SERVICE_ROLE_KEY'
    ];

    const missing = required.filter(key => !process.env[key]);

    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }

    // Secret Key 형식 검증
    if (!process.env.TOSS_SECRET_KEY.startsWith('test_sk_') &&
        !process.env.TOSS_SECRET_KEY.startsWith('live_sk_')) {
        throw new Error('Invalid TOSS_SECRET_KEY format');
    }
}

module.exports = { validatePaymentEnv };
```

### 6. 보안 체크리스트
```markdown
## 결제 보안 체크리스트

### API 보안
- [ ] HTTPS만 허용
- [ ] 인증 토큰 검증
- [ ] Rate Limiting 적용
- [ ] 금액 서버 사이드 검증

### 데이터 보안
- [ ] Secret Key 환경 변수 사용
- [ ] 카드 정보 직접 저장 안 함
- [ ] 빌링키 암호화 저장
- [ ] 보안 로그 기록

### 웹훅 보안
- [ ] 서명 검증 필수
- [ ] IP 화이트리스트 (선택)
- [ ] 멱등성 처리

### 취약점 점검
- [ ] SQL Injection
- [ ] XSS
- [ ] CSRF
- [ ] Man-in-the-Middle
```

## Expected Output Files
- `api/lib/payment/validator.js`
- `api/lib/payment/rate-limiter.js`
- `api/lib/payment/secure-payment.js`
- `api/lib/payment/env-check.js`
- `docs/PAYMENT_SECURITY_CHECKLIST.md`

## Completion Criteria
- [ ] 금액 검증 로직 구현
- [ ] Rate Limiting 구현
- [ ] 보안 래퍼 함수 구현
- [ ] 보안 로그 구현
- [ ] 환경 변수 검증 구현
- [ ] 보안 체크리스트 작성 및 점검

## Tech Stack
- Node.js
- Supabase

## Tools
- Write, Read
- Bash (보안 테스트)

## Execution Type
AI-Only

## Remarks
- 프로덕션에서는 Redis Rate Limiter 권장
- 보안 로그 정기 모니터링 필요
- PCI DSS 규정 참고
- 의심스러운 활동 알림 설정 권장

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

