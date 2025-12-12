const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    // 캐시 비활성화
    await page.setCacheEnabled(false);

    console.log('📍 Loading dashboard...');
    await page.goto('http://localhost:3030/dashboard', {
        waitUntil: 'networkidle0',
        timeout: 10000
    });

    console.log('✅ Page loaded');

    // 좌측 사이드바의 진행 프로세스 섹션만 캡처
    const element = await page.$('.left-sidebar');
    if (element) {
        await element.screenshot({
            path: 'C:/!SSAL_Works_Private/dashboard_sidebar_check.png'
        });
        console.log('📸 Screenshot saved: dashboard_sidebar_check.png');
    }

    // Phase 0과 Phase 1의 계산된 스타일 확인
    const phase0Style = await page.evaluate(() => {
        const phase0 = document.querySelector('[data-progress="0"]');
        if (!phase0) return null;
        const computed = window.getComputedStyle(phase0);
        const percent = phase0.querySelector('.process-percent');
        const percentComputed = window.getComputedStyle(percent);
        const progressBar = phase0.querySelector('.process-progress-fill');
        const barComputed = window.getComputedStyle(progressBar);

        return {
            background: computed.backgroundColor,
            percentColor: percentComputed.color,
            progressBarBg: barComputed.backgroundColor,
            progressBarWidth: barComputed.width
        };
    });

    const phase1Style = await page.evaluate(() => {
        const phase1 = document.querySelector('[data-progress="55"]');
        if (!phase1) return null;
        const computed = window.getComputedStyle(phase1);
        const percent = phase1.querySelector('.process-percent');
        const percentComputed = window.getComputedStyle(percent);
        const progressBar = phase1.querySelector('.process-progress-fill');
        const barComputed = window.getComputedStyle(progressBar);

        return {
            background: computed.backgroundColor,
            percentColor: percentComputed.color,
            percentText: percent.textContent,
            progressBarBg: barComputed.backgroundColor,
            progressBarWidth: barComputed.width
        };
    });

    console.log('\n=== Phase 0 (사업계획) 실제 렌더링 스타일 ===');
    console.log('배경색:', phase0Style.background);
    console.log('퍼센티지 색상:', phase0Style.percentColor);
    console.log('진행률 바 배경:', phase0Style.progressBarBg);
    console.log('진행률 바 너비:', phase0Style.progressBarWidth);

    console.log('\n=== Phase 1 (기획) 실제 렌더링 스타일 ===');
    console.log('배경색:', phase1Style.background);
    console.log('퍼센티지 텍스트:', phase1Style.percentText);
    console.log('퍼센티지 색상:', phase1Style.percentColor);
    console.log('진행률 바 배경:', phase1Style.progressBarBg);
    console.log('진행률 바 너비:', phase1Style.progressBarWidth);

    await browser.close();

    console.log('\n✅ 확인 완료!');
})();
