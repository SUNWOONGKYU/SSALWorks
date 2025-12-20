# 결제 시스템 설정 가이드 (Part B - Claude Code용)

> 기술 참조 문서: SDK 연동, 빌링키 발급, 정기결제, 웹훅 구현

**대상**: Claude Code / 개발자
**전제조건**: Part A 완료 (토스 페이먼트 가입, API 키 발급)

---

## 1. 결제 구조

```
사용자
    ↓ 구독 결제 요청
SSALWorks 앱
    ↓ 카드 정보 입력 (토스 SDK)
토스 페이먼트
    ↓ 빌링키 발급
SSALWorks API
    ↓ 빌링키 저장
Supabase (user_payment_methods)
    ↓ 정기결제 실행
토스 페이먼트
    ↓ 결제 결과 웹훅
SSALWorks API (/api/webhook/toss)
    ↓ 구독 상태 업데이트
Supabase (users.subscription_status)
```

---

## 2. 환경변수

### 2.1 로컬 개발 (.env.local)

```bash
# 토스 페이먼트 (테스트)
TOSS_CLIENT_KEY=test_ck_xxxxxxxxxxxxxxxx
TOSS_SECRET_KEY=test_sk_xxxxxxxxxxxxxxxx

# 토스 페이먼트 (프로덕션) - 심사 완료 후
# TOSS_CLIENT_KEY=live_ck_xxxxxxxxxxxxxxxx
# TOSS_SECRET_KEY=live_sk_xxxxxxxxxxxxxxxx
```

### 2.2 Vercel 환경변수

```
| Key             | Value            | Environment             |
|-----------------|------------------|-------------------------|
| TOSS_CLIENT_KEY | test_ck_xxx...   | Preview, Development    |
| TOSS_SECRET_KEY | test_sk_xxx...   | Preview, Development    |
| TOSS_CLIENT_KEY | live_ck_xxx...   | Production              |
| TOSS_SECRET_KEY | live_sk_xxx...   | Production              |
```

---

## 3. 토스 SDK 연동

### 3.1 SDK 로드

```html
<script src="https://js.tosspayments.com/v1/payment"></script>
```

### 3.2 빌링키 발급 요청

```javascript
const tossPayments = TossPayments('test_ck_xxxxxxxxxxxxxxxx');

async function requestBillingKey() {
  await tossPayments.requestBillingAuth('카드', {
    customerKey: 'user_uuid_here',  // 사용자 고유 ID
    successUrl: 'https://www.ssalworks.ai.kr/api/payment/billing/success',
    failUrl: 'https://www.ssalworks.ai.kr/api/payment/billing/fail',
  });
}
```

---

## 4. 빌링키 발급 API

### 4.1 Success 콜백 엔드포인트

```javascript
// /api/payment/billing/success
export async function GET(request) {
  const { authKey, customerKey } = request.query;

  // 토스 API로 빌링키 발급 확정
  const response = await fetch('https://api.tosspayments.com/v1/billing/authorizations/issue', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(TOSS_SECRET_KEY + ':').toString('base64')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      authKey,
      customerKey,
    }),
  });

  const { billingKey, card } = await response.json();

  // Supabase에 빌링키 저장
  await supabase.from('user_payment_methods').insert({
    user_id: customerKey,
    billing_key: billingKey,
    card_company: card.company,
    card_number_masked: card.number,
  });

  // 결제 수단 등록 완료 페이지로 리다이렉트
  return Response.redirect('/subscription/payment-complete');
}
```

### 4.2 Fail 콜백 엔드포인트

```javascript
// /api/payment/billing/fail
export async function GET(request) {
  const { code, message } = request.query;

  console.error('빌링키 발급 실패:', code, message);

  // 실패 페이지로 리다이렉트
  return Response.redirect(`/subscription/payment-failed?error=${encodeURIComponent(message)}`);
}
```

---

## 5. 정기결제 실행

### 5.1 결제 API 호출

```javascript
async function executeSubscriptionPayment(userId, billingKey, amount) {
  const response = await fetch('https://api.tosspayments.com/v1/billing/' + billingKey, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(TOSS_SECRET_KEY + ':').toString('base64')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      customerKey: userId,
      amount: amount,
      orderId: `order_${Date.now()}`,
      orderName: 'SSALWorks 월 구독',
    }),
  });

  return response.json();
}
```

### 5.2 Vercel Cron Job 설정

```json
// vercel.json
{
  "crons": [
    {
      "path": "/api/cron/subscription-payment",
      "schedule": "0 9 1 * *"  // 매월 1일 09:00
    }
  ]
}
```

```javascript
// /api/cron/subscription-payment
export async function GET(request) {
  // 결제 예정인 구독자 조회
  const { data: subscribers } = await supabase
    .from('users')
    .select('user_id, user_payment_methods(billing_key)')
    .eq('subscription_status', 'active')
    .lte('next_payment_date', new Date());

  for (const user of subscribers) {
    await executeSubscriptionPayment(
      user.user_id,
      user.user_payment_methods[0].billing_key,
      9900  // 구독 금액
    );
  }

  return new Response('OK');
}
```

---

## 6. 웹훅 구현

### 6.1 웹훅 URL 등록

```
토스 페이먼트 개발자센터 → 웹훅 설정
웹훅 URL: https://www.ssalworks.ai.kr/api/webhook/toss
```

### 6.2 웹훅 엔드포인트

```javascript
// /api/webhook/toss
export async function POST(request) {
  const payload = await request.json();

  switch (payload.eventType) {
    case 'PAYMENT_STATUS_CHANGED':
      if (payload.status === 'DONE') {
        // 결제 성공 → 구독 상태 업데이트
        await supabase.from('users').update({
          subscription_status: 'active',
          subscription_start_date: new Date(),
          next_payment_date: getNextPaymentDate(),
        }).eq('user_id', payload.customerKey);
      } else if (payload.status === 'CANCELED') {
        // 결제 취소
        await supabase.from('users').update({
          subscription_status: 'canceled',
        }).eq('user_id', payload.customerKey);
      }
      break;

    case 'BILLING_KEY_DELETED':
      // 빌링키 삭제
      await supabase.from('user_payment_methods')
        .delete()
        .eq('billing_key', payload.billingKey);
      break;
  }

  return new Response('OK');
}
```

---

## 7. PG 이용약관 동의 UI

### 7.1 법적 필수 약관

| 약관 | 법적 근거 |
|------|----------|
| 전자금융거래 이용약관 | 전자금융거래법 |
| 개인정보 제3자 제공 동의 | 개인정보보호법 |
| 결제대행 서비스 이용약관 | PG사 요구 |

### 7.2 HTML 구현

```html
<div class="payment-terms">
  <h3>결제 약관 동의</h3>

  <label>
    <input type="checkbox" id="terms-all" onchange="toggleAllTerms(this)">
    <strong>전체 동의</strong>
  </label>

  <label>
    <input type="checkbox" class="term-checkbox" required>
    [필수] 전자금융거래 이용약관
    <a href="#" onclick="showTermsPopup('efin')">보기</a>
  </label>

  <label>
    <input type="checkbox" class="term-checkbox" required>
    [필수] 개인정보 제3자 제공 동의 (토스페이먼트)
    <a href="#" onclick="showTermsPopup('privacy')">보기</a>
  </label>
</div>

<button onclick="proceedPayment()" id="pay-button" disabled>
  결제하기
</button>
```

### 7.3 동의 여부 저장

```javascript
await supabase.from('payment_consents').insert({
  user_id: userId,
  efin_terms_agreed: true,
  privacy_third_party_agreed: true,
  pg_terms_agreed: true,
  agreed_at: new Date(),
});
```

---

## 8. 데이터베이스 스키마

### 8.1 user_payment_methods 테이블

```sql
CREATE TABLE user_payment_methods (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
  billing_key TEXT NOT NULL,
  card_company TEXT,
  card_number_masked TEXT,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE user_payment_methods ENABLE ROW LEVEL SECURITY;
```

### 8.2 payment_consents 테이블

```sql
CREATE TABLE payment_consents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
  efin_terms_agreed BOOLEAN DEFAULT false,
  privacy_third_party_agreed BOOLEAN DEFAULT false,
  pg_terms_agreed BOOLEAN DEFAULT false,
  agreed_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 9. 테스트 카드

| 항목 | 값 |
|------|-----|
| 카드번호 | 4330-0000-0000-0010 |
| 유효기간 | 12/30 |
| CVC | 123 |
| 비밀번호 앞 2자리 | 12 |

---

## 10. 에러 핸들링

### 10.1 결제 실패 시 재시도

```javascript
async function retryPayment(userId, billingKey, amount, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const result = await executeSubscriptionPayment(userId, billingKey, amount);
      if (result.status === 'DONE') return result;
    } catch (error) {
      console.error(`결제 시도 ${i + 1} 실패:`, error);
      await new Promise(r => setTimeout(r, 1000 * (i + 1)));  // 점진적 대기
    }
  }

  // 최종 실패 → 구독 정지
  await supabase.from('users').update({
    subscription_status: 'payment_failed',
  }).eq('user_id', userId);
}
```

### 10.2 환불 처리

```javascript
async function refundPayment(paymentKey, cancelReason) {
  const response = await fetch(`https://api.tosspayments.com/v1/payments/${paymentKey}/cancel`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(TOSS_SECRET_KEY + ':').toString('base64')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      cancelReason: cancelReason,
    }),
  });

  return response.json();
}
```

---

## 참고 문서

- [토스 페이먼트 개발자 문서](https://docs.tosspayments.com/)
- [빌링키 발급 가이드](https://docs.tosspayments.com/guides/billing)
- [결제 웹훅 가이드](https://docs.tosspayments.com/guides/webhook)
- [테스트 카드 정보](https://docs.tosspayments.com/reference/test-card)
