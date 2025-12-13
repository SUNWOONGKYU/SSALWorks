# Verification Instruction - S4O1

## Task ID
S4O1

## Task Name
PG사 설정

## Verification Checklist

### 1. 계정 생성 검증
- [ ] 토스 페이먼트 계정 생성
- [ ] 개발자 대시보드 접근 가능

### 2. 테스트 키 검증
- [ ] Client Key (test_ck_xxx) 발급
- [ ] Secret Key (test_sk_xxx) 발급

### 3. Vercel 환경 변수 검증
- [ ] TOSS_CLIENT_KEY 설정
- [ ] TOSS_SECRET_KEY 설정
- [ ] TOSS_WEBHOOK_SECRET 설정

### 4. 웹훅 설정 검증
- [ ] 웹훅 URL 등록
- [ ] 이벤트 구독 설정
- [ ] 웹훅 수신 테스트

### 5. 테스트 결제 검증
- [ ] 테스트 카드로 결제 성공
- [ ] 결제 취소 테스트
- [ ] 웹훅 수신 확인

## Test Commands
```bash
# 환경 변수 확인
vercel env ls

# 테스트 결제 (토스 샌드박스)
# 테스트 카드: 4330000000000000

# 웹훅 테스트
curl -X POST http://localhost:3000/api/webhook/toss-payments \
  -H "Content-Type: application/json" \
  -d '{"eventType":"TEST"}'
```

## Expected Results
- 토스 페이먼트 계정 활성화
- 테스트 키 발급 완료
- 환경 변수 설정 완료

## Verification Agent
devops-troubleshooter

## Pass Criteria
- 테스트 환경 설정 완료
- 테스트 결제 성공
- 웹훅 수신 확인
