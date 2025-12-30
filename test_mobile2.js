const { chromium, devices } = require("playwright");

(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({
        ...devices["iPhone 12"],
    });
    const page = await context.newPage();
    
    await page.goto("https://ssal-works.vercel.app/");
    await page.waitForLoadState("networkidle");
    
    // 1. 좌측 메뉴 열기
    await page.click(".mobile-menu-btn");
    await page.waitForTimeout(500);
    
    // 2. "새로운 Project 등록" 클릭
    const newProjectBtn = page.locator("text=새로운 Project 등록");
    if (await newProjectBtn.count() > 0) {
        await newProjectBtn.first().click();
        await page.waitForTimeout(800);
        await page.screenshot({ path: "mobile_new_project_modal.png" });
        console.log("새로운 Project 등록 모달: mobile_new_project_modal.png");
        
        // 모달 닫기
        await page.keyboard.press("Escape");
        await page.waitForTimeout(300);
    }
    
    // 3. 외부 연동 설정 Guide 테스트
    // 먼저 사이드바 열기
    await page.click(".mobile-menu-btn").catch(() => {});
    await page.waitForTimeout(300);
    
    // 스크롤 다운해서 외부 연동 설정 Guide 찾기
    await page.evaluate(() => {
        const sidebar = document.querySelector('.left-sidebar');
        if (sidebar) sidebar.scrollTop = sidebar.scrollHeight;
    });
    await page.waitForTimeout(500);
    await page.screenshot({ path: "mobile_sidebar_scrolled.png" });
    console.log("사이드바 스크롤 후: mobile_sidebar_scrolled.png");
    
    // 4. 연계 서비스 바로가기 섹션까지 스크롤
    await page.evaluate(() => {
        const sidebar = document.querySelector('.left-sidebar');
        if (sidebar) {
            const links = sidebar.querySelector('.quick-links');
            if (links) links.scrollIntoView();
        }
    });
    await page.waitForTimeout(300);
    await page.screenshot({ path: "mobile_quick_links.png" });
    
    // 5. P1 사업계획 펼치고 Vision_Mission 클릭해서 가이드 모달 확인
    await page.evaluate(() => {
        const sidebar = document.querySelector('.left-sidebar');
        if (sidebar) sidebar.scrollTop = 0;
    });
    await page.waitForTimeout(300);
    
    // P1 사업계획 클릭
    await page.click("text=P1. 사업계획");
    await page.waitForTimeout(300);
    
    // Vision_Mission 클릭
    const vmBtn = page.locator("text=Vision_Mission");
    if (await vmBtn.count() > 0) {
        await vmBtn.first().click();
        await page.waitForTimeout(1000);
        
        // 사이드바 닫기 버튼 클릭
        const closeBtn = page.locator(".left-sidebar .sidebar-close-btn");
        if (await closeBtn.isVisible()) {
            await closeBtn.click();
            await page.waitForTimeout(500);
        }
        
        await page.screenshot({ path: "mobile_guide_full.png" });
        console.log("가이드 모달 전체화면: mobile_guide_full.png");
    }
    
    await browser.close();
})();
