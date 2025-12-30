
const { chromium } = require("playwright");

(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({
        ...require("playwright").devices["iPhone 12"],
    });
    const page = await context.newPage();
    
    await page.goto("https://ssal-works.vercel.app/");
    await page.waitForLoadState("networkidle");
    
    // 1. 좌측 메뉴 열기
    await page.click(".mobile-menu-btn");
    await page.waitForTimeout(500);
    
    // 스크린샷 - 좌측 사이드바 열린 상태
    await page.screenshot({ path: "mobile_left_sidebar.png" });
    
    console.log("좌측 사이드바 스크린샷 저장: mobile_left_sidebar.png");
    
    // 2. P1 사업계획 클릭해서 펼치기
    await page.click("text=P1. 사업계획");
    await page.waitForTimeout(300);
    
    // 3. Vision_Mission 클릭
    const visionMission = page.locator("text=Vision_Mission");
    if (await visionMission.count() > 0) {
        await visionMission.first().click();
        await page.waitForTimeout(1000);
        await page.screenshot({ path: "mobile_guide_popup.png" });
        console.log("가이드 팝업 스크린샷: mobile_guide_popup.png");
    }
    
    await browser.close();
})();

