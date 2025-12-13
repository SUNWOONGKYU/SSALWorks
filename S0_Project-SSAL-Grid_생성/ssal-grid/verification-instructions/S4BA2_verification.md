# Verification Instruction - S4BA2

## Task ID
S4BA2

## Task Name
웹훅 핸들러

## Verification Checklist

### 1. 파일 존재 검증
- [ ] api/webhook/toss-payments.js 존재
- [ ] api/webhook/retry-failed.js 존재

### 2. 웹훅 핸들러 검증
- [ ] POST /api/webhook/toss-payments
- [ ] 서명 검증 (toss-signature)
- [ ] 이벤트 타입별 처리

### 3. 이벤트 처리 검증
- [ ] PAYMENT_STATUS_CHANGED 처리
- [ ] BILLING_STATUS_CHANGED 처리
- [ ] DEPOSIT_CALLBACK 처리

### 4. 웹훅 로깅 검증
- [ ] webhook_logs 테이블 존재
- [ ] 웹훅 데이터 저장
- [ ] 처리 상태 기록

### 5. 재시도 핸들러 검증
- [ ] 실패한 웹훅 조회
- [ ] 재처리 로직
- [ ] 처리 완료 표시

## Test Commands
```bash
# 파일 존재 확인
ls -la api/webhook/

# 웹훅 테스트 (서명 포함)
curl -X POST http://localhost:3000/api/webhook/toss-payments \
  -H "Content-Type: application/json" \
  -H "toss-signature: <signature>" \
  -d '{"eventType":"PAYMENT_STATUS_CHANGED","data":{}}'
```

## Expected Results
- 웹훅 핸들러 동작
- 서명 검증 동작
- 이벤트 처리 동작

## Verification Agent
backend-developer

## Pass Criteria
- 서명 검증 정확
- 이벤트별 처리 동작
- 웹훅 로깅 동작
