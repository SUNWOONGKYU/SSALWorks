const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
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
            inlineDisplay: popup.style.display
        };
    });

    console.log('PC guidePopup 상태:', JSON.stringify(guidePopupInfo, null, 2));

    // GUIDE_CONTENTS 확인
    const guideContents = await page.evaluate(() => {
        return typeof GUIDE_CONTENTS !== 'undefined' ? Object.keys(GUIDE_CONTENTS) : 'GUIDE_CONTENTS not defined';
    });
    console.log('PC GUIDE_CONTENTS:', guideContents);

    await browser.close();
})();
