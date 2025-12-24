const { chromium, devices } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const iPhone = devices['iPhone 12'];
    const context = await browser.newContext({ ...iPhone });
    const page = await context.newPage();

    const filePath = 'file:///' + __dirname.split('\\').join('/') + '/index.html';
    await page.goto(filePath);
    await page.waitForTimeout(1000);

    // 햄버거 버튼 스타일 확인
    const menuBtn = await page.locator('.mobile-menu-btn').first();
    const menuBtnStyle = await menuBtn.evaluate(el => {
        const style = getComputedStyle(el);
        return {
            display: style.display,
            backgroundColor: style.backgroundColor
        };
    });

    // FAB 버튼 확인
    const fabBtn = await page.locator('.fab-btn.fab-info').first();
    const fabStyle = await fabBtn.evaluate(el => {
        const style = getComputedStyle(el);
        return {
            display: style.display,
            backgroundColor: style.backgroundColor
        };
    });

    // 푸터 메타데이터 확인
    const footerBusiness = await page.locator('.footer-business').first();
    const footerStyle = await footerBusiness.evaluate(el => {
        const spans = el.querySelectorAll('span');
        return {
            spanCount: spans.length
        };
    });

    console.log('=== Mobile UI Test ===');
    console.log('Hamburger Button:');
    console.log('  - Display:', menuBtnStyle.display);
    console.log('  - Background:', menuBtnStyle.backgroundColor);
    console.log('');
    console.log('FAB Button (Right Sidebar):');
    console.log('  - Display:', fabStyle.display);
    console.log('  - Background:', fabStyle.backgroundColor);
    console.log('');
    console.log('Footer Business:');
    console.log('  - Span count:', footerStyle.spanCount);

    await page.screenshot({ path: 'mobile_test3.png', fullPage: true });
    console.log('');
    console.log('Screenshot saved: mobile_test3.png');

    await browser.close();
})();
