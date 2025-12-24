const { chromium, devices } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const iPhone = devices['iPhone 12'];
    const context = await browser.newContext({ ...iPhone });
    const page = await context.newPage();

    // 메인 도메인 테스트
    await page.goto('https://www.ssalworks.ai.kr');
    await page.waitForTimeout(5000);

    // guidePopup 상태 확인
    const guidePopupInfo = await page.evaluate(() => {
        const popup = document.getElementById('guidePopup');
        if (!popup) return { exists: false };

        const style = window.getComputedStyle(popup);
        return {
            exists: true,
            display: style.display,
            visibility: style.visibility,
            opacity: style.opacity,
            position: style.position,
            top: style.top,
            left: style.left,
            right: style.right,
            width: style.width,
            height: style.height,
            zIndex: style.zIndex,
            inlineDisplay: popup.style.display,
            innerHTML: popup.innerHTML.substring(0, 200)
        };
    });

    console.log('guidePopup 상태:', JSON.stringify(guidePopupInfo, null, 2));

    // GUIDE_CONTENTS 확인
    const guideContents = await page.evaluate(() => {
        return typeof GUIDE_CONTENTS !== 'undefined' ? Object.keys(GUIDE_CONTENTS) : 'GUIDE_CONTENTS not defined';
    });
    console.log('GUIDE_CONTENTS:', guideContents);

    await page.screenshot({ path: 'guide_mobile_test.png', fullPage: true });
    console.log('Screenshot saved');

    await browser.close();
})();
