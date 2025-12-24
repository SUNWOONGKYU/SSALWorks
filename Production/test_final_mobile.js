const { chromium, devices } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const iPhone = devices['iPhone 12'];
    const context = await browser.newContext({ ...iPhone });
    const page = await context.newPage();

    console.log('=== 비로그인 상태 모바일 안내문 테스트 ===\n');

    // 콘솔 로그 캡처
    page.on('console', msg => console.log('📋', msg.text()));

    await page.goto('https://www.ssalworks.ai.kr');
    await page.waitForTimeout(5000);

    const result = await page.evaluate(() => {
        const popup = document.getElementById('guidePopup');
        return {
            exists: !!popup,
            display: popup?.style.display,
            computedDisplay: popup ? window.getComputedStyle(popup).display : 'N/A',
            title: document.getElementById('guidePopupTitle')?.textContent,
            hasContent: popup?.innerHTML.length > 100
        };
    });

    console.log('\n📊 결과:', JSON.stringify(result, null, 2));
    console.log(`\n🎯 팝업 보임: ${result.computedDisplay === 'block' ? '✅ 예' : '❌ 아니오'}`);

    await page.screenshot({ path: 'final_mobile_test.png', fullPage: true });
    console.log('📸 스크린샷: final_mobile_test.png');

    await browser.close();
})();
