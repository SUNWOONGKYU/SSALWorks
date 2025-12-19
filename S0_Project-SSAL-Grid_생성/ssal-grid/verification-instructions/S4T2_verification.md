# Verification Instruction - S4T2

---

## 📌 필수 참조 규칙 파일 (2025-12-19)

> **⚠️ 검증 전 반드시 아래 규칙 파일을 확인하세요!**

| 규칙 파일 | 내용 | 참조 시점 |
|----------|------|----------|
| `.claude/rules/04_grid-writing.md` | Grid 속성 검증 | 결과 기록 시 |
| `.claude/rules/05_execution-process.md` | 검증 프로세스 | 검증 수행 순서 |
| `.claude/rules/06_verification.md` | 검증 기준 | **핵심 참조** |



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

---

## ⚠️ 저장 위치 검증 항목

### 필수 검증
- [ ] Task ID의 Stage에 맞는 폴더에 저장되었는가? (S1→S1_개발_준비/, S2→S2_개발-1차/, ...)
- [ ] Task ID의 Area에 맞는 폴더에 저장되었는가? (S→Security/, F→Frontend/, ...)
- [ ] Production 관련 코드(F, BA, D)는 Production 폴더에도 저장되었는가?

