# Verification Instruction - S4T1

## Task ID
S4T1

## Task Name
결제 테스트

## Verification Checklist

### 1. 테스트 파일 존재 검증
- [ ] tests/unit/payment/validator.test.js 존재
- [ ] tests/unit/payment/rate-limiter.test.js 존재
- [ ] tests/integration/payment/confirm.test.js 존재
- [ ] tests/integration/payment/webhook.test.js 존재

### 2. 단위 테스트 검증
- [ ] 금액 검증 테스트
- [ ] 주문 ID 검증 테스트
- [ ] Rate Limiter 테스트

### 3. 통합 테스트 검증
- [ ] 결제 승인 API 테스트
- [ ] 웹훅 서명 검증 테스트
- [ ] 에러 케이스 테스트

### 4. Mock 설정 검증
- [ ] 토스 API Mock
- [ ] Supabase Mock

### 5. 테스트 실행 검증
```bash
npm run test:payment
```
- [ ] 모든 테스트 통과
- [ ] 커버리지 80% 이상

## Test Commands
```bash
# 테스트 파일 확인
ls -la tests/unit/payment/
ls -la tests/integration/payment/

# 테스트 실행
npm run test:payment

# 커버리지 확인
npm run test:payment -- --coverage
```

## Expected Results
- 테스트 파일 존재
- 모든 테스트 통과
- 커버리지 목표 달성

## Verification Agent
test-engineer

## Pass Criteria
- 단위 테스트 100% 통과
- 통합 테스트 100% 통과
- 커버리지 80% 이상
