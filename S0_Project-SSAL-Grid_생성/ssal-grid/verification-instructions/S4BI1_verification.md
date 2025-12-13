# Verification Instruction - S4BI1

## Task ID
S4BI1

## Task Name
결제 클라이언트 SDK

## Verification Checklist

### 1. 파일 존재 검증
- [ ] lib/toss-payments.js 존재
- [ ] lib/payment-utils.js 존재
- [ ] lib/payment-config.js 존재

### 2. TossPaymentsClient 클래스 검증
- [ ] initialize 메서드
- [ ] renderPaymentMethods 메서드
- [ ] renderAgreement 메서드
- [ ] requestPayment 메서드
- [ ] requestBillingAuth 메서드 (정기결제)

### 3. 유틸리티 함수 검증
- [ ] generateOrderId 함수
- [ ] formatPrice 함수
- [ ] getPaymentStatusText 함수

### 4. 환경 설정 검증
- [ ] development/production 분리
- [ ] clientKey/secretKey 분리
- [ ] 환경별 키 올바른 사용

### 5. 빌링키 발급 페이지 검증
- [ ] billing-auth.html 존재
- [ ] 카드 등록 위젯
- [ ] 등록 버튼

## Test Commands
```bash
# 파일 존재 확인
ls -la P3_프로토타입_제작/Frontend/Prototype/lib/toss-*.js
ls -la P3_프로토타입_제작/Frontend/Prototype/lib/payment-*.js

# 클래스 export 확인
grep -E "export|module.exports" P3_프로토타입_제작/Frontend/Prototype/lib/toss-payments.js
```

## Expected Results
- SDK 래퍼 파일 존재
- 모든 메서드 구현
- 환경별 설정 분리

## Verification Agent
frontend-developer

## Pass Criteria
- TossPaymentsClient 클래스 동작
- 유틸리티 함수 동작
- 환경 설정 분리 확인
