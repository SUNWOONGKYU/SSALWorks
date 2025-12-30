const { chromium, devices } = require("playwright");

(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({
        ...devices["iPhone 12"],
    });
    const page = await context.newPage();
    
    // 로컬 파일 직접 열기 (수정된 코드 테스트)
    await page.goto("file:///C:/!SSAL_Works_Private/index.html");
    await page.waitForTimeout(2000);
    
    // 1. 좌측 메뉴 열기
    await page.click(".mobile-menu-btn");
    await page.waitForTimeout(500);
    await page.screenshot({ path: "test_fix_1_sidebar_open.png" });
    console.log("1. 사이드바 열림: test_fix_1_sidebar_open.png");
    
    // 2. P1 사업계획 펼치기
    await page.click("text=P1. 사업계획");
    await page.waitForTimeout(300);
    
    // 3. Vision_Mission 클릭 - 사이드바가 자동으로 닫혀야 함
    const vmBtn = page.locator("text=Vision_Mission");
    if (await vmBtn.count() > 0) {
        await vmBtn.first().click();
        await page.waitForTimeout(1000);
        await page.screenshot({ path: "test_fix_2_guide_opened.png" });
        console.log("2. 가이드 팝업 열림 (사이드바 닫힘 확인): test_fix_2_guide_opened.png");
    }
    
    await browser.close();
    console.log("테스트 완료!");
})();
