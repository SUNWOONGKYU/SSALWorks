# Verification Instruction - S4S1

## Task ID
S4S1

## Task Name
결제 보안

## Verification Checklist

### 1. 파일 존재 검증
- [ ] api/lib/payment/validator.js 존재
- [ ] api/lib/payment/rate-limiter.js 존재
- [ ] api/lib/payment/secure-payment.js 존재
- [ ] api/lib/payment/env-check.js 존재

### 2. 금액 검증 검증
- [ ] validatePaymentAmount 함수
- [ ] 플랜별 가격 일치 확인
- [ ] 주문 ID 형식 검증
- [ ] 중복 결제 방지

### 3. Rate Limiting 검증
- [ ] checkRateLimit 함수
- [ ] 결제: 1분 5회 제한
- [ ] 초과 시 429 응답

### 4. 보안 래퍼 검증
- [ ] withPaymentSecurity 함수
- [ ] 인증 + 금액검증 + Rate Limiting

### 5. 보안 로그 검증
- [ ] security_logs 테이블
- [ ] 의심스러운 활동 기록
- [ ] IP 주소 기록

## Test Commands
```bash
# 파일 존재 확인
ls -la api/lib/payment/

# Rate Limiting 테스트 (6회 연속 요청)
for i in {1..6}; do
  curl -X POST http://localhost:3000/api/payment/confirm \
    -H "Content-Type: application/json" \
    -d '{"paymentKey":"test","orderId":"test","amount":100}'
done
```

## Expected Results
- 보안 모듈 파일 존재
- 금액 검증 동작
- Rate Limiting 동작

## Verification Agent
backend-developer

## Pass Criteria
- 금액 조작 방지
- Rate Limiting 동작
- 보안 로그 기록

---

## ⚠️ 저장 위치 검증 항목

### 필수 검증
- [ ] Task ID의 Stage에 맞는 폴더에 저장되었는가? (S1→S1_개발_준비/, S2→S2_개발-1차/, ...)
- [ ] Task ID의 Area에 맞는 폴더에 저장되었는가? (S→Security/, F→Frontend/, ...)
- [ ] Production 관련 코드(F, BA, D)는 Production 폴더에도 저장되었는가?

