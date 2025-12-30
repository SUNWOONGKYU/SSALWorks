const { chromium, devices } = require("playwright");

(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({
        ...devices["iPhone 12"],
    });
    const page = await context.newPage();
    
    await page.goto("https://ssal-works.vercel.app/");
    await page.waitForLoadState("networkidle");
    
    // 1. 새로운 Project 등록 모달 테스트
    console.log("1. 새로운 Project 등록 모달 테스트...");
    await page.click(".mobile-menu-btn");
    await page.waitForTimeout(500);
    
    // registerNewProject 함수 직접 호출
    await page.evaluate(() => {
        if (typeof registerNewProject === 'function') {
            registerNewProject();
        }
    });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: "mobile_add_project.png" });
    console.log("새로운 Project 등록: mobile_add_project.png");
    
    // ESC로 닫기
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);
    
    // 2. SAL Grid 전체화면 모달 테스트
    console.log("2. SAL Grid 전체화면 모달 테스트...");
    // 스크롤해서 Project SAL Grid 섹션 찾기
    await page.evaluate(() => {
        const gridExpandBtn = document.querySelector('.expand-btn-inline');
        if (gridExpandBtn) {
            gridExpandBtn.click();
        }
    });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: "mobile_sal_grid_fullscreen.png" });
    console.log("SAL Grid 전체화면: mobile_sal_grid_fullscreen.png");
    
    // 닫기
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);
    
    // 3. 외부 연동 설정 Guide 모달 (openServiceGuide) - 우측 사이드바지만 확인
    // 사용자가 좌측만 하라고 했으므로 스킵
    
    // 4. 좌측 사이드바 P0~S5 하위항목 가이드 팝업 테스트
    console.log("3. P2 Service_Introduction 가이드 테스트...");
    await page.click(".mobile-menu-btn").catch(() => {});
    await page.waitForTimeout(500);
    
    // P2 프로젝트 기획 펼치기
    await page.click("text=P2. 프로젝트 기획");
    await page.waitForTimeout(300);
    
    // Service_Introduction 클릭
    const siBtn = page.locator("text=Service_Introduction");
    if (await siBtn.count() > 0) {
        await siBtn.first().click();
        await page.waitForTimeout(1500);
        await page.screenshot({ path: "mobile_service_intro_from_sidebar.png" });
        console.log("Service Intro 가이드: mobile_service_intro_from_sidebar.png");
    }
    
    await browser.close();
    console.log("테스트 완료!");
})();
