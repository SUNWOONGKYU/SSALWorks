# Verification Instruction - S4T2

## Task ID
S4T2

## Task Name
E2E 결제 테스트

## Verification Checklist

### 1. 테스트 파일 존재 검증
- [ ] playwright.config.js 존재
- [ ] tests/e2e/payment-flow.spec.js 존재
- [ ] tests/e2e/fixtures/test-data.js 존재

### 2. 결제 플로우 테스트 검증
- [ ] 플랜 선택 → 결제 페이지 이동
- [ ] 결제 정보 표시 확인
- [ ] 토스 위젯 로드 확인

### 3. 성공/실패 페이지 테스트 검증
- [ ] 성공 페이지 표시
- [ ] 실패 페이지 에러 메시지
- [ ] 재시도 버튼 동작

### 4. 구독 관리 테스트 검증
- [ ] 구독 상태 표시
- [ ] 해지 버튼 동작

### 5. CI 통합 검증
- [ ] GitHub Actions 워크플로우
- [ ] 자동 테스트 실행

## Test Commands
```bash
# Playwright 설치 확인
npx playwright --version

# E2E 테스트 실행
npm run test:e2e

# 특정 테스트만 실행
npx playwright test payment-flow.spec.js
```

## Expected Results
- E2E 테스트 파일 존재
- 결제 플로우 테스트 통과
- CI 통합 완료

## Verification Agent
test-engineer

## Pass Criteria
- 결제 플로우 E2E 테스트 통과
- 성공/실패 시나리오 통과
- CI에서 자동 실행
