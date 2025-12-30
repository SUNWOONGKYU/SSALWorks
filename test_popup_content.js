const { chromium, devices } = require("playwright");

(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({
        ...devices["iPhone 12"],
    });
    const page = await context.newPage();
    
    await page.goto("https://ssal-works.vercel.app/");
    await page.waitForLoadState("networkidle");
    
    // 1. 좌측 메뉴 열기 -> P1 -> Vision_Mission 클릭
    await page.click(".mobile-menu-btn");
    await page.waitForTimeout(500);
    await page.click("text=P1. 사업계획");
    await page.waitForTimeout(300);
    
    const vmBtn = page.locator("text=Vision_Mission");
    if (await vmBtn.count() > 0) {
        await vmBtn.first().click();
        await page.waitForTimeout(1500);
        await page.screenshot({ path: "popup_content_1.png", fullPage: false });
        console.log("1. Vision_Mission 팝업: popup_content_1.png");
        
        // 팝업 내용 스크롤
        await page.evaluate(() => {
            const content = document.querySelector('#guidePopupContent');
            if (content) content.scrollTop = content.scrollHeight / 2;
        });
        await page.waitForTimeout(500);
        await page.screenshot({ path: "popup_content_2.png", fullPage: false });
        console.log("2. 팝업 스크롤: popup_content_2.png");
        
        // 닫기
        await page.click("#guidePopup button:has-text('닫기')").catch(() => {});
        await page.waitForTimeout(300);
    }
    
    // 2. P2 -> Service_Introduction 테스트
    await page.click(".mobile-menu-btn");
    await page.waitForTimeout(500);
    await page.click("text=P2. 프로젝트 기획");
    await page.waitForTimeout(300);
    
    const siBtn = page.locator("text=Service_Introduction");
    if (await siBtn.count() > 0) {
        await siBtn.first().click();
        await page.waitForTimeout(1500);
        await page.screenshot({ path: "popup_content_3_service_intro.png", fullPage: false });
        console.log("3. Service_Introduction 팝업: popup_content_3_service_intro.png");
    }
    
    await browser.close();
    console.log("테스트 완료!");
})();
