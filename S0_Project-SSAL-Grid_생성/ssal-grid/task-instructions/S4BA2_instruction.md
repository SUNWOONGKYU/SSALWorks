# Task Instruction - S4BA2

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
S4BA2

## Task Name
결제 웹훅 API

## Task Goal
토스 페이먼트 웹훅 수신 및 결제 상태 동기화 처리

## Prerequisites (Dependencies)
- S4BA1 (결제 API) 완료

## Specific Instructions

### 1. 웹훅 핸들러 생성
- 위치: `api/webhook/toss-payments.js`

```javascript
// api/webhook/toss-payments.js
const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const WEBHOOK_SECRET = process.env.TOSS_WEBHOOK_SECRET;

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // 웹훅 서명 검증
    const signature = req.headers['toss-signature'];
    if (!verifySignature(req.body, signature)) {
        console.error('Invalid webhook signature');
        return res.status(401).json({ error: 'Invalid signature' });
    }

    const { eventType, data } = req.body;

    console.log('Webhook received:', eventType);

    try {
        switch (eventType) {
            case 'PAYMENT_STATUS_CHANGED':
                await handlePaymentStatusChanged(data);
                break;

            case 'BILLING_STATUS_CHANGED':
                await handleBillingStatusChanged(data);
                break;

            case 'DEPOSIT_CALLBACK':
                await handleDepositCallback(data);
                break;

            default:
                console.log('Unhandled event type:', eventType);
        }

        res.status(200).json({ received: true });

    } catch (error) {
        console.error('Webhook processing error:', error);
        res.status(500).json({ error: 'Webhook processing failed' });
    }
};

// 웹훅 서명 검증
function verifySignature(payload, signature) {
    if (!signature || !WEBHOOK_SECRET) return false;

    const expectedSignature = crypto
        .createHmac('sha256', WEBHOOK_SECRET)
        .update(JSON.stringify(payload))
        .digest('base64');

    return signature === expectedSignature;
}

// 결제 상태 변경 처리
async function handlePaymentStatusChanged(data) {
    const { paymentKey, status, orderId } = data;

    // 결제 상태 업데이트
    await supabase
        .from('payments')
        .update({
            status,
            updated_at: new Date().toISOString()
        })
        .eq('payment_key', paymentKey);

    // 상태별 추가 처리
    switch (status) {
        case 'DONE':
            await handlePaymentSuccess(data);
            break;

        case 'CANCELED':
            await handlePaymentCanceled(data);
            break;

        case 'EXPIRED':
            await handlePaymentExpired(data);
            break;
    }

    // 웹훅 로그 저장
    await logWebhook('PAYMENT_STATUS_CHANGED', data);
}

// 결제 성공 처리
async function handlePaymentSuccess(data) {
    const userId = extractUserIdFromOrderId(data.orderId);
    if (!userId) return;

    // 구독 활성화
    await supabase
        .from('subscriptions')
        .update({
            status: 'active',
            payment_key: data.paymentKey,
            updated_at: new Date().toISOString()
        })
        .eq('user_id', userId)
        .eq('status', 'pending');
}

// 결제 취소 처리
async function handlePaymentCanceled(data) {
    const userId = extractUserIdFromOrderId(data.orderId);
    if (!userId) return;

    // 구독 상태 업데이트
    await supabase
        .from('subscriptions')
        .update({
            status: 'cancelled',
            cancelled_at: new Date().toISOString()
        })
        .eq('payment_key', data.paymentKey);
}

// 결제 만료 처리
async function handlePaymentExpired(data) {
    const userId = extractUserIdFromOrderId(data.orderId);
    if (!userId) return;

    // 대기 중인 구독 삭제
    await supabase
        .from('subscriptions')
        .delete()
        .eq('user_id', userId)
        .eq('status', 'pending');
}

// 빌링(정기결제) 상태 변경 처리
async function handleBillingStatusChanged(data) {
    const { billingKey, status, customerKey } = data;

    await supabase
        .from('user_billing')
        .update({
            status,
            updated_at: new Date().toISOString()
        })
        .eq('billing_key', billingKey);

    await logWebhook('BILLING_STATUS_CHANGED', data);
}

// 가상계좌 입금 콜백
async function handleDepositCallback(data) {
    const { paymentKey, status, depositedAmount } = data;

    if (status === 'DONE') {
        await supabase
            .from('payments')
            .update({
                status: 'DONE',
                deposited_at: new Date().toISOString(),
                deposited_amount: depositedAmount
            })
            .eq('payment_key', paymentKey);

        // 구독 활성화
        await handlePaymentSuccess(data);
    }

    await logWebhook('DEPOSIT_CALLBACK', data);
}

// 유틸리티 함수
function extractUserIdFromOrderId(orderId) {
    // ORDER_{userId}_{timestamp} 형식
    const parts = orderId.split('_');
    return parts.length >= 2 ? parts[1] : null;
}

async function logWebhook(eventType, data) {
    await supabase
        .from('webhook_logs')
        .insert({
            event_type: eventType,
            payload: data,
            received_at: new Date().toISOString()
        });
}
```

### 2. 웹훅 로그 테이블 (S1D1에 추가)
```sql
-- webhook_logs 테이블
CREATE TABLE IF NOT EXISTS webhook_logs (
    id SERIAL PRIMARY KEY,
    event_type VARCHAR(100) NOT NULL,
    payload JSONB,
    processed BOOLEAN DEFAULT false,
    received_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 3. 웹훅 재시도 핸들러
- 위치: `api/webhook/retry-failed.js`

```javascript
// api/webhook/retry-failed.js
// Cron으로 실패한 웹훅 재처리

module.exports = async (req, res) => {
    if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // 처리되지 않은 웹훅 조회
    const { data: failedWebhooks } = await supabase
        .from('webhook_logs')
        .select('*')
        .eq('processed', false)
        .order('received_at', { ascending: true })
        .limit(100);

    let processed = 0;

    for (const webhook of failedWebhooks || []) {
        try {
            // 재처리 로직
            await processWebhook(webhook.event_type, webhook.payload);

            await supabase
                .from('webhook_logs')
                .update({ processed: true })
                .eq('id', webhook.id);

            processed++;
        } catch (error) {
            console.error('Retry failed:', webhook.id, error);
        }
    }

    res.status(200).json({ processed });
};
```

### 4. Vercel 웹훅 URL 설정
```
토스 페이먼트 개발자센터에서 웹훅 URL 등록:
https://your-domain.vercel.app/api/webhook/toss-payments

이벤트 구독:
- PAYMENT_STATUS_CHANGED
- BILLING_STATUS_CHANGED
- DEPOSIT_CALLBACK
```

## Expected Output Files
- `api/webhook/toss-payments.js`
- `api/webhook/retry-failed.js`
- Supabase에 `webhook_logs` 테이블 추가

## Completion Criteria
- [ ] 웹훅 핸들러 구현
- [ ] 서명 검증 구현
- [ ] 이벤트별 처리 로직 구현
- [ ] 웹훅 로그 저장
- [ ] 재시도 핸들러 구현
- [ ] 토스 페이먼트에 웹훅 URL 등록

## Tech Stack
- Vercel Serverless Functions
- 토스 페이먼트 Webhook
- Supabase

## Tools
- Write, Read
- Bash (웹훅 테스트)

## Execution Type
AI-Only

## Remarks
- 웹훅 서명 검증 필수 (보안)
- 멱등성 고려 (중복 처리 방지)
- 실패 시 재시도 로직 필요
- 웹훅 로그로 디버깅 용이

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

