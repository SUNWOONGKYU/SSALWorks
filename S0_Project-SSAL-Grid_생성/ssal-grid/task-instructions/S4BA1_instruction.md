# Task Instruction - S4BA1

## Task ID
S4BA1

## Task Name
결제 API

## Task Goal
토스 페이먼트 결제 승인 및 빌링 API 구현

## Prerequisites (Dependencies)
- S4BI1 (결제 클라이언트 SDK) 완료
- S2BA3 (구독 관리 API) 완료

## Specific Instructions

### 1. 결제 승인 API
- 위치: `api/payment/confirm.js`

```javascript
// api/payment/confirm.js
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const TOSS_SECRET_KEY = process.env.TOSS_SECRET_KEY;
const TOSS_API_URL = 'https://api.tosspayments.com/v1/payments/confirm';

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { paymentKey, orderId, amount } = req.body;

    if (!paymentKey || !orderId || !amount) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // 토스 페이먼트 결제 승인 요청
        const tossResponse = await fetch(TOSS_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${Buffer.from(TOSS_SECRET_KEY + ':').toString('base64')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ paymentKey, orderId, amount })
        });

        const tossResult = await tossResponse.json();

        if (!tossResponse.ok) {
            return res.status(400).json({
                error: tossResult.message || 'Payment confirmation failed',
                code: tossResult.code
            });
        }

        // 결제 정보 저장
        const { error: dbError } = await supabase
            .from('payments')
            .insert({
                payment_key: paymentKey,
                order_id: orderId,
                amount,
                status: 'DONE',
                method: tossResult.method,
                approved_at: tossResult.approvedAt,
                raw_response: tossResult
            });

        if (dbError) {
            console.error('Payment save error:', dbError);
        }

        // 구독 활성화 (orderId에서 userId 추출)
        await activateSubscription(orderId, tossResult);

        res.status(200).json({
            success: true,
            paymentKey,
            orderId,
            amount,
            method: tossResult.method,
            approvedAt: tossResult.approvedAt
        });

    } catch (error) {
        console.error('Payment error:', error);
        res.status(500).json({ error: 'Payment processing failed' });
    }
};

async function activateSubscription(orderId, paymentResult) {
    // orderId 형식: ORDER_{userId}_{timestamp}
    const parts = orderId.split('_');
    const userId = parts[1];

    if (!userId) return;

    await supabase
        .from('subscriptions')
        .update({
            status: 'active',
            payment_key: paymentResult.paymentKey,
            start_date: new Date().toISOString(),
            end_date: getNextMonthDate()
        })
        .eq('user_id', userId)
        .eq('status', 'pending');
}

function getNextMonthDate() {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    return date.toISOString();
}
```

### 2. 빌링키 발급 API
- 위치: `api/payment/billing-key.js`

```javascript
// api/payment/billing-key.js
const { withAuth } = require('../lib/auth/withAuth');

const TOSS_API_URL = 'https://api.tosspayments.com/v1/billing/authorizations/issue';

module.exports = withAuth(async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { authKey, customerKey } = req.body;
    const user = req.user;

    try {
        // 토스 페이먼트 빌링키 발급
        const response = await fetch(TOSS_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${Buffer.from(process.env.TOSS_SECRET_KEY + ':').toString('base64')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ authKey, customerKey })
        });

        const result = await response.json();

        if (!response.ok) {
            return res.status(400).json({ error: result.message });
        }

        // 빌링키 저장 (암호화 필요)
        await supabase
            .from('user_billing')
            .upsert({
                user_id: user.id,
                billing_key: result.billingKey,
                customer_key: customerKey,
                card_company: result.card?.company,
                card_number: result.card?.number, // 마스킹된 번호
                created_at: new Date().toISOString()
            });

        res.status(200).json({
            success: true,
            cardCompany: result.card?.company,
            cardNumber: result.card?.number
        });

    } catch (error) {
        console.error('Billing key error:', error);
        res.status(500).json({ error: 'Billing key issuance failed' });
    }
});
```

### 3. 자동결제 실행 API (Cron용)
- 위치: `api/payment/auto-charge.js`

```javascript
// api/payment/auto-charge.js
// Vercel Cron으로 매일 실행

const TOSS_BILLING_URL = 'https://api.tosspayments.com/v1/billing';

module.exports = async (req, res) => {
    // Cron 인증 확인
    if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // 오늘 결제 예정인 구독 조회
    const today = new Date().toISOString().split('T')[0];

    const { data: subscriptions, error } = await supabase
        .from('subscriptions')
        .select('*, user_billing(*)')
        .eq('status', 'active')
        .lte('end_date', today);

    if (error || !subscriptions.length) {
        return res.status(200).json({ message: 'No payments due' });
    }

    const results = [];

    for (const subscription of subscriptions) {
        const billingKey = subscription.user_billing?.billing_key;
        if (!billingKey) continue;

        try {
            const response = await fetch(TOSS_BILLING_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${Buffer.from(process.env.TOSS_SECRET_KEY + ':').toString('base64')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    billingKey,
                    customerKey: subscription.user_id,
                    amount: subscription.amount,
                    orderId: `AUTO_${subscription.id}_${Date.now()}`,
                    orderName: 'SSALWorks 월 구독'
                })
            });

            const result = await response.json();

            if (response.ok) {
                // 구독 기간 연장
                await supabase
                    .from('subscriptions')
                    .update({
                        end_date: getNextMonthDate(),
                        last_payment_at: new Date().toISOString()
                    })
                    .eq('id', subscription.id);

                results.push({ userId: subscription.user_id, status: 'success' });
            } else {
                results.push({ userId: subscription.user_id, status: 'failed', error: result.message });
            }
        } catch (error) {
            results.push({ userId: subscription.user_id, status: 'error', error: error.message });
        }
    }

    res.status(200).json({ processed: results.length, results });
};
```

### 4. 결제 취소 API
- 위치: `api/payment/cancel.js`

```javascript
// api/payment/cancel.js
module.exports = withAuth(async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { paymentKey, cancelReason } = req.body;

    const response = await fetch(`https://api.tosspayments.com/v1/payments/${paymentKey}/cancel`, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${Buffer.from(process.env.TOSS_SECRET_KEY + ':').toString('base64')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cancelReason })
    });

    const result = await response.json();

    if (!response.ok) {
        return res.status(400).json({ error: result.message });
    }

    // DB 업데이트
    await supabase
        .from('payments')
        .update({ status: 'CANCELED', canceled_at: new Date().toISOString() })
        .eq('payment_key', paymentKey);

    res.status(200).json({ success: true, ...result });
});
```

## Expected Output Files
- `api/payment/confirm.js`
- `api/payment/billing-key.js`
- `api/payment/auto-charge.js`
- `api/payment/cancel.js`

## Completion Criteria
- [ ] 결제 승인 API 구현
- [ ] 빌링키 발급 API 구현
- [ ] 자동결제 API 구현
- [ ] 결제 취소 API 구현
- [ ] 에러 핸들링
- [ ] 결제 정보 DB 저장

## Tech Stack
- Vercel Serverless Functions
- 토스 페이먼트 API
- Supabase

## Tools
- Write, Read
- Bash (API 테스트)

## Execution Type
AI-Only

## Remarks
- Secret Key는 서버에서만 사용
- 빌링키는 암호화하여 저장 권장
- 자동결제 실패 시 재시도 로직 필요
- PG 수수료 고려
