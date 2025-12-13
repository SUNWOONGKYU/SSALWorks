# Task Instruction - S4F1

## Task ID
S4F1

## Task Name
결제 UI

## Task Goal
토스 페이먼트 결제 위젯 연동 UI 구현

## Prerequisites (Dependencies)
- S2F2 (구독 플랜 페이지) 완료
- S4M1 (MVP 최종 검토) 완료

## Specific Instructions

### 1. 토스 페이먼트 SDK 로드
- 위치: `P3_프로토타입_제작/Frontend/Prototype/pages/subscription/payment.html`

```html
<!-- 토스 페이먼트 SDK -->
<script src="https://js.tosspayments.com/v1/payment-widget"></script>
```

### 2. 결제 페이지 UI
```html
<!-- pages/subscription/payment.html -->
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>결제하기 - SSALWorks</title>
    <link rel="stylesheet" href="../../shared.css">
    <script src="https://js.tosspayments.com/v1/payment-widget"></script>
</head>
<body>
    <div class="payment-container">
        <header class="payment-header">
            <h1>구독 결제</h1>
            <p>선택하신 플랜으로 결제를 진행합니다</p>
        </header>

        <section class="order-summary">
            <h2>주문 정보</h2>
            <div class="plan-info">
                <span class="plan-name" id="planName">Premium 플랜</span>
                <span class="plan-price" id="planPrice">₩29,900/월</span>
            </div>
            <div class="plan-features">
                <ul id="planFeatures">
                    <li>무제한 AI Q&A</li>
                    <li>모든 프리미엄 콘텐츠</li>
                    <li>우선 지원</li>
                </ul>
            </div>
        </section>

        <section class="payment-method">
            <h2>결제 수단</h2>
            <!-- 토스 페이먼트 위젯이 렌더링될 영역 -->
            <div id="payment-widget"></div>
        </section>

        <section class="agreement">
            <h2>약관 동의</h2>
            <!-- 토스 페이먼트 약관 위젯 -->
            <div id="agreement-widget"></div>
        </section>

        <div class="payment-actions">
            <button id="payButton" class="btn-primary">
                <span id="payAmount">29,900원</span> 결제하기
            </button>
            <button id="cancelButton" class="btn-secondary">취소</button>
        </div>
    </div>

    <script src="../../payment.js"></script>
</body>
</html>
```

### 3. 결제 JavaScript
- 위치: `P3_프로토타입_제작/Frontend/Prototype/payment.js`

```javascript
// payment.js
const clientKey = 'test_ck_xxx'; // 토스 클라이언트 키
const customerKey = generateCustomerKey(); // 고객 고유 키

// 결제 위젯 초기화
const paymentWidget = PaymentWidget(clientKey, customerKey);

// URL 파라미터에서 플랜 정보 가져오기
const urlParams = new URLSearchParams(window.location.search);
const planId = urlParams.get('plan');
const amount = parseInt(urlParams.get('amount')) || 29900;
const planName = urlParams.get('name') || 'Premium 플랜';

// UI 업데이트
document.getElementById('planName').textContent = planName;
document.getElementById('planPrice').textContent = `₩${amount.toLocaleString()}/월`;
document.getElementById('payAmount').textContent = `${amount.toLocaleString()}원`;

// 결제 위젯 렌더링
paymentWidget.renderPaymentMethods('#payment-widget', { value: amount });
paymentWidget.renderAgreement('#agreement-widget');

// 결제 버튼 클릭
document.getElementById('payButton').addEventListener('click', async () => {
    try {
        await paymentWidget.requestPayment({
            orderId: generateOrderId(),
            orderName: planName,
            successUrl: `${window.location.origin}/pages/subscription/payment-success.html`,
            failUrl: `${window.location.origin}/pages/subscription/payment-fail.html`,
            customerEmail: getUserEmail(),
            customerName: getUserName()
        });
    } catch (error) {
        console.error('결제 요청 실패:', error);
        alert('결제 요청에 실패했습니다. 다시 시도해주세요.');
    }
});

// 취소 버튼
document.getElementById('cancelButton').addEventListener('click', () => {
    window.history.back();
});

// 유틸리티 함수
function generateOrderId() {
    return 'ORDER_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function generateCustomerKey() {
    // 로그인된 사용자 ID 사용
    return localStorage.getItem('userId') || 'guest_' + Date.now();
}

function getUserEmail() {
    return localStorage.getItem('userEmail') || '';
}

function getUserName() {
    return localStorage.getItem('userName') || '';
}
```

### 4. 결제 CSS 스타일
```css
/* payment.css */
.payment-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
}

.payment-header {
    text-align: center;
    margin-bottom: 2rem;
}

.order-summary {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 2rem;
}

.plan-info {
    display: flex;
    justify-content: space-between;
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 1rem;
}

.payment-actions {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
}

.btn-primary {
    flex: 1;
    padding: 1rem;
    background: #3182ce;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    cursor: pointer;
}

.btn-secondary {
    padding: 1rem 2rem;
    background: #e2e8f0;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}
```

## Expected Output Files
- `P3_프로토타입_제작/Frontend/Prototype/pages/subscription/payment.html`
- `P3_프로토타입_제작/Frontend/Prototype/payment.js`
- `P3_프로토타입_제작/Frontend/Prototype/payment.css`

## Completion Criteria
- [ ] 토스 페이먼트 SDK 로드
- [ ] 결제 위젯 렌더링
- [ ] 약관 동의 위젯 렌더링
- [ ] 결제 요청 기능 구현
- [ ] URL 파라미터로 플랜 정보 전달
- [ ] 반응형 UI

## Tech Stack
- HTML/CSS/JavaScript
- 토스 페이먼트 SDK

## Tools
- Write, Read

## Execution Type
AI-Only

## Remarks
- 테스트 키로 개발 진행
- 실제 결제는 토스 샌드박스에서 테스트
- 정기결제(빌링) 연동은 S4BA1에서 처리
