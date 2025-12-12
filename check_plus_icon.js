const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // 네트워크 요청 차단 (outbox 오류 무시)
    await page.setRequestInterception(true);
    page.on('request', (req) => {
        if (req.url().includes('/outbox/')) {
            req.abort();
        } else {
            req.continue();
        }
    });

    await page.setViewport({ width: 1920, height: 1080 });

    console.log('📍 Loading dashboard.html...');
    await page.goto('http://localhost:3030/dashboard.html', {
        waitUntil: 'domcontentloaded',
        timeout: 30000
    });

    console.log('✅ Page loaded');

    // 2초 대기
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 플러스 아이콘 색상 확인
    const plusIconColor = await page.evaluate(() => {
        const plusIcon = document.querySelector('.project-menu-item span:first-child');
        if (!plusIcon) {
            return { error: 'Plus icon not found' };
        }

        const computed = window.getComputedStyle(plusIcon);
        return {
            color: computed.color,
            innerHTML: plusIcon.innerHTML,
            textContent: plusIcon.textContent
        };
    });

    console.log('\n=== 플러스 아이콘 실제 렌더링 ===');
    if (plusIconColor.error) {
        console.log('❌ 오류:', plusIconColor.error);
    } else {
        console.log('아이콘:', plusIconColor.textContent);
        console.log('색상:', plusIconColor.color);
        console.log('HTML:', plusIconColor.innerHTML);
    }

    // 스크린샷 저장
    const plusElement = await page.$('.project-menu-item');
    if (plusElement) {
        await plusElement.screenshot({
            path: 'C:/!SSAL_Works_Private/plus_icon_check.png'
        });
        console.log('\n📸 스크린샷 저장: plus_icon_check.png');
    }

    await browser.close();
    console.log('\n✅ 확인 완료!');
})();
