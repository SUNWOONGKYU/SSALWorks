# Task Instruction - S4BI1

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
S4BI1

## Task Name
결제 클라이언트 SDK

## Task Goal
토스 페이먼트 클라이언트 SDK 설정 및 정기결제(빌링) 연동

## Prerequisites (Dependencies)
- S4F1 (결제 UI) 완료
- S4O1 (PG사 설정) 완료

## Specific Instructions

### 1. 토스 페이먼트 SDK 설정
- 위치: `P3_프로토타입_제작/Frontend/Prototype/lib/toss-payments.js`

```javascript
// lib/toss-payments.js
const TOSS_CLIENT_KEY = 'test_ck_xxx'; // 환경별로 다른 키 사용

class TossPaymentsClient {
    constructor() {
        this.clientKey = TOSS_CLIENT_KEY;
        this.paymentWidget = null;
    }

    async initialize(customerKey) {
        if (typeof PaymentWidget === 'undefined') {
            throw new Error('Toss Payments SDK not loaded');
        }

        this.paymentWidget = PaymentWidget(this.clientKey, customerKey);
        return this;
    }

    renderPaymentMethods(selector, options) {
        if (!this.paymentWidget) {
            throw new Error('PaymentWidget not initialized');
        }

        return this.paymentWidget.renderPaymentMethods(selector, {
            value: options.amount,
            currency: 'KRW',
            ...options
        });
    }

    renderAgreement(selector) {
        if (!this.paymentWidget) {
            throw new Error('PaymentWidget not initialized');
        }

        return this.paymentWidget.renderAgreement(selector);
    }

    async requestPayment(options) {
        if (!this.paymentWidget) {
            throw new Error('PaymentWidget not initialized');
        }

        return this.paymentWidget.requestPayment({
            orderId: options.orderId,
            orderName: options.orderName,
            successUrl: options.successUrl,
            failUrl: options.failUrl,
            customerEmail: options.customerEmail,
            customerName: options.customerName
        });
    }

    // 빌링키 발급 요청 (정기결제용)
    async requestBillingAuth(options) {
        if (!this.paymentWidget) {
            throw new Error('PaymentWidget not initialized');
        }

        return this.paymentWidget.requestPayment({
            orderId: options.orderId,
            orderName: options.orderName,
            successUrl: options.successUrl,
            failUrl: options.failUrl,
            customerEmail: options.customerEmail,
            customerName: options.customerName,
            // 정기결제용 설정
            flowMode: 'DIRECT',
            easyPay: options.easyPay || null
        });
    }
}

// 싱글톤 인스턴스
let instance = null;

export function getTossPayments() {
    if (!instance) {
        instance = new TossPaymentsClient();
    }
    return instance;
}

export default TossPaymentsClient;
```

### 2. 빌링키 발급 페이지
- 위치: `P3_프로토타입_제작/Frontend/Prototype/pages/subscription/billing-auth.html`

```html
<!-- 빌링키 발급용 페이지 -->
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>결제 수단 등록 - SSALWorks</title>
    <script src="https://js.tosspayments.com/v1/payment-widget"></script>
</head>
<body>
    <div class="billing-container">
        <h1>정기결제 수단 등록</h1>
        <p>다음 달부터 자동으로 결제됩니다.</p>

        <div id="card-widget"></div>

        <button id="submitButton">등록하기</button>
    </div>

    <script>
        const clientKey = 'test_ck_xxx';
        const customerKey = getUserId();

        const paymentWidget = PaymentWidget(clientKey, customerKey);

        // 카드 등록 위젯만 렌더링
        paymentWidget.renderPaymentMethods('#card-widget', {
            value: 0, // 빌링키 발급은 0원
        });

        document.getElementById('submitButton').addEventListener('click', async () => {
            try {
                await paymentWidget.requestPayment({
                    orderId: 'BILLING_' + Date.now(),
                    orderName: 'SSALWorks 정기결제 등록',
                    successUrl: window.location.origin + '/api/payment/billing-success',
                    failUrl: window.location.origin + '/pages/subscription/billing-fail.html'
                });
            } catch (error) {
                console.error('빌링키 발급 실패:', error);
            }
        });

        function getUserId() {
            return localStorage.getItem('userId') || 'guest_' + Date.now();
        }
    </script>
</body>
</html>
```

### 3. 결제 유틸리티 함수
- 위치: `P3_프로토타입_제작/Frontend/Prototype/lib/payment-utils.js`

```javascript
// lib/payment-utils.js

// 주문 ID 생성
export function generateOrderId(prefix = 'ORDER') {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 11);
    return `${prefix}_${timestamp}_${random}`;
}

// 가격 포맷팅
export function formatPrice(amount, currency = 'KRW') {
    return new Intl.NumberFormat('ko-KR', {
        style: 'currency',
        currency: currency
    }).format(amount);
}

// 결제 상태 텍스트
export function getPaymentStatusText(status) {
    const statusMap = {
        'READY': '결제 대기',
        'IN_PROGRESS': '결제 진행 중',
        'DONE': '결제 완료',
        'CANCELED': '결제 취소',
        'PARTIAL_CANCELED': '부분 취소',
        'ABORTED': '결제 중단',
        'EXPIRED': '결제 만료'
    };
    return statusMap[status] || status;
}

// 결제 수단 텍스트
export function getPaymentMethodText(method) {
    const methodMap = {
        'CARD': '신용/체크카드',
        'VIRTUAL_ACCOUNT': '가상계좌',
        'TRANSFER': '계좌이체',
        'MOBILE_PHONE': '휴대폰',
        'EASY_PAY': '간편결제'
    };
    return methodMap[method] || method;
}

// 다음 결제일 계산
export function getNextPaymentDate(startDate = new Date()) {
    const next = new Date(startDate);
    next.setMonth(next.getMonth() + 1);
    return next;
}
```

### 4. 환경별 설정
```javascript
// lib/payment-config.js
const config = {
    development: {
        clientKey: 'test_ck_xxx',
        secretKey: 'test_sk_xxx',
        baseUrl: 'https://api.tosspayments.com/v1'
    },
    production: {
        clientKey: 'live_ck_xxx',
        secretKey: 'live_sk_xxx',
        baseUrl: 'https://api.tosspayments.com/v1'
    }
};

export function getPaymentConfig() {
    const env = process.env.NODE_ENV || 'development';
    return config[env];
}
```

## Expected Output Files
- `P3_프로토타입_제작/Frontend/Prototype/lib/toss-payments.js`
- `P3_프로토타입_제작/Frontend/Prototype/lib/payment-utils.js`
- `P3_프로토타입_제작/Frontend/Prototype/lib/payment-config.js`
- `P3_프로토타입_제작/Frontend/Prototype/pages/subscription/billing-auth.html`

## Completion Criteria
- [ ] 토스 페이먼트 클라이언트 클래스 구현
- [ ] 결제 위젯 초기화 함수 구현
- [ ] 빌링키 발급 요청 기능 구현
- [ ] 결제 유틸리티 함수 구현
- [ ] 환경별 설정 분리

## Tech Stack
- 토스 페이먼트 SDK
- JavaScript (ES6+)

## Tools
- Write, Read

## Execution Type
AI-Only

## Remarks
- 테스트 환경에서는 test_ 키 사용
- 빌링키는 서버에서 안전하게 저장
- 실제 결제 전 테스트 모드에서 충분히 테스트

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

