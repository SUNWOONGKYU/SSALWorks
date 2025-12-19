# Task Instruction - S4T2

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
S4T2

## Task Name
E2E 결제 테스트

## Task Goal
전체 결제 플로우 End-to-End 테스트 수행

## Prerequisites (Dependencies)
- S4T1 (결제 테스트) 완료
- S4F2 (결제 완료 페이지) 완료

## Specific Instructions

### 1. E2E 테스트 환경 설정
- 위치: `tests/e2e/playwright.config.js`

```javascript
// playwright.config.js
module.exports = {
  testDir: './tests/e2e',
  timeout: 60000,
  retries: 2,
  use: {
    baseURL: process.env.TEST_URL || 'http://localhost:3000',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'firefox', use: { browserName: 'firefox' } }
  ]
};
```

### 2. 결제 플로우 E2E 테스트
- 위치: `tests/e2e/payment-flow.spec.js`

```javascript
// tests/e2e/payment-flow.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Payment Flow E2E', () => {

  test.beforeEach(async ({ page }) => {
    // 테스트 사용자 로그인
    await page.goto('/pages/auth/login.html');
    await page.fill('#email', 'test@example.com');
    await page.fill('#password', 'testpassword');
    await page.click('#loginButton');
    await page.waitForURL('**/dashboard**');
  });

  test('should complete subscription purchase flow', async ({ page }) => {
    // 1. 플랜 선택 페이지로 이동
    await page.goto('/pages/subscription/pricing.html');
    await expect(page.locator('h1')).toContainText('구독 플랜');

    // 2. Premium 플랜 선택
    await page.click('[data-plan="premium"]');

    // 3. 결제 페이지로 이동 확인
    await page.waitForURL('**/payment.html**');
    await expect(page.locator('#planName')).toContainText('Premium');
    await expect(page.locator('#planPrice')).toContainText('29,900');

    // 4. 토스 결제 위젯 로드 확인
    await expect(page.locator('#payment-widget')).toBeVisible();

    // 5. 약관 동의 확인
    await expect(page.locator('#agreement-widget')).toBeVisible();

    // 참고: 실제 결제는 토스 샌드박스 환경에서만 테스트
  });

  test('should display correct plan information', async ({ page }) => {
    await page.goto('/pages/subscription/payment.html?plan=premium&amount=29900&name=Premium%20플랜');

    await expect(page.locator('#planName')).toHaveText('Premium 플랜');
    await expect(page.locator('#payAmount')).toContainText('29,900');
  });

  test('should handle payment cancellation', async ({ page }) => {
    await page.goto('/pages/subscription/payment.html?plan=premium&amount=29900');

    // 취소 버튼 클릭
    await page.click('#cancelButton');

    // 이전 페이지로 돌아감 확인
    // 또는 특정 페이지로 리다이렉트
  });

  test('should show success page after payment', async ({ page }) => {
    // 결제 성공 시뮬레이션
    await page.goto('/pages/subscription/payment-success.html?paymentKey=test&orderId=test&amount=29900');

    await expect(page.locator('h1')).toContainText('결제가 완료되었습니다');
    await expect(page.locator('.result-icon.success')).toBeVisible();
  });

  test('should show failure page with error message', async ({ page }) => {
    await page.goto('/pages/subscription/payment-fail.html?code=USER_CANCEL&message=사용자가%20결제를%20취소했습니다');

    await expect(page.locator('h1')).toContainText('결제에 실패했습니다');
    await expect(page.locator('#errorCode')).toHaveText('USER_CANCEL');
    await expect(page.locator('#errorMessage')).toContainText('취소');
  });

});

test.describe('Billing Key Registration', () => {

  test('should display billing registration page', async ({ page }) => {
    await page.goto('/pages/subscription/billing-auth.html');

    await expect(page.locator('h1')).toContainText('정기결제');
    await expect(page.locator('#card-widget')).toBeVisible();
    await expect(page.locator('#submitButton')).toBeVisible();
  });

});

test.describe('Subscription Management', () => {

  test('should display subscription status', async ({ page }) => {
    // 로그인 후
    await page.goto('/pages/mypage/subscription.html');

    // 구독 상태 표시 확인
    await expect(page.locator('.subscription-status')).toBeVisible();
  });

  test('should allow subscription cancellation', async ({ page }) => {
    await page.goto('/pages/mypage/subscription.html');

    // 해지 버튼 확인
    const cancelButton = page.locator('#cancelSubscription');
    if (await cancelButton.isVisible()) {
      await cancelButton.click();

      // 확인 모달 표시
      await expect(page.locator('.confirm-modal')).toBeVisible();
    }
  });

});
```

### 3. 결제 위젯 테스트 (토스 샌드박스)
- 위치: `tests/e2e/toss-sandbox.spec.js`

```javascript
// tests/e2e/toss-sandbox.spec.js
// 토스 페이먼트 샌드박스 환경에서만 실행

const { test, expect } = require('@playwright/test');

test.describe('Toss Payments Sandbox Tests', () => {

  test.skip(process.env.NODE_ENV !== 'sandbox', 'Sandbox only');

  test('should complete card payment in sandbox', async ({ page }) => {
    await page.goto('/pages/subscription/payment.html?plan=basic&amount=9900');

    // 토스 결제 위젯에서 카드 선택
    const paymentFrame = page.frameLocator('#payment-widget iframe');

    // 테스트 카드 정보 입력 (토스 샌드박스 테스트 카드)
    await paymentFrame.locator('[data-testid="card-number"]').fill('4330000000000000');
    await paymentFrame.locator('[data-testid="expiry"]').fill('12/25');
    await paymentFrame.locator('[data-testid="cvc"]').fill('123');

    // 결제 버튼 클릭
    await page.click('#payButton');

    // 결제 성공 페이지 확인
    await page.waitForURL('**/payment-success.html**');
    await expect(page.locator('h1')).toContainText('완료');
  });

});
```

### 4. 테스트 데이터 시딩
- 위치: `tests/e2e/fixtures/test-data.js`

```javascript
// tests/e2e/fixtures/test-data.js
const testUsers = {
  freeUser: {
    email: 'free@test.com',
    password: 'testpass123',
    plan: 'free'
  },
  basicUser: {
    email: 'basic@test.com',
    password: 'testpass123',
    plan: 'basic'
  },
  premiumUser: {
    email: 'premium@test.com',
    password: 'testpass123',
    plan: 'premium'
  }
};

const testPlans = {
  basic: { id: 'basic_monthly', name: 'Basic', price: 9900 },
  premium: { id: 'premium_monthly', name: 'Premium', price: 29900 }
};

module.exports = { testUsers, testPlans };
```

### 5. 테스트 실행 스크립트
```json
{
  "scripts": {
    "test:e2e": "playwright test",
    "test:e2e:headed": "playwright test --headed",
    "test:e2e:debug": "playwright test --debug",
    "test:e2e:payment": "playwright test payment-flow.spec.js"
  }
}
```

### 6. CI/CD 통합
```yaml
# .github/workflows/e2e-test.yml
name: E2E Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npx playwright install
      - run: npm run test:e2e
      - uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
```

## Expected Output Files
- `tests/e2e/playwright.config.js`
- `tests/e2e/payment-flow.spec.js`
- `tests/e2e/toss-sandbox.spec.js`
- `tests/e2e/fixtures/test-data.js`
- `.github/workflows/e2e-test.yml`

## Completion Criteria
- [ ] Playwright 설정 완료
- [ ] 결제 플로우 E2E 테스트 작성
- [ ] 성공/실패 페이지 테스트 작성
- [ ] 구독 관리 테스트 작성
- [ ] 토스 샌드박스 테스트 작성
- [ ] CI/CD 통합
- [ ] 모든 E2E 테스트 통과

## Tech Stack
- Playwright
- Node.js

## Tools
- Write, Read
- Bash (npx playwright test)

## Execution Type
AI-Only

## Remarks
- 실제 결제 테스트는 토스 샌드박스에서만 수행
- 테스트 데이터는 테스트 환경에서만 사용
- 스크린샷/비디오로 실패 디버깅
- CI에서 자동 실행

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

