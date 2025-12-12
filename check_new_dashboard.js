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

    // 좌측 사이드바만 스크린샷
    const sidebar = await page.$('.left-sidebar');
    if (sidebar) {
        await sidebar.screenshot({
            path: 'C:/!SSAL_Works_Private/sidebar_only.png'
        });
        console.log('📸 좌측 사이드바 스크린샷: sidebar_only.png');
    }

    // Phase 0과 Phase 1의 실제 HTML 내용 확인
    const htmlContent = await page.evaluate(() => {
        const phase0 = document.querySelector('[data-progress="0"]');
        const phase1 = document.querySelector('[data-progress="55"]');

        if (!phase0 || !phase1) {
            return {
                error: 'Elements not found',
                allDataProgress: Array.from(document.querySelectorAll('[data-progress]')).map(el => ({
                    name: el.querySelector('.process-name')?.textContent,
                    progress: el.getAttribute('data-progress'),
                    percentText: el.querySelector('.process-percent')?.textContent,
                    barWidth: el.querySelector('.process-progress-fill')?.style.width
                }))
            };
        }

        return {
            phase0: {
                name: phase0.querySelector('.process-name')?.textContent,
                dataProgress: phase0.getAttribute('data-progress'),
                percentText: phase0.querySelector('.process-percent')?.textContent,
                barWidth: phase0.querySelector('.process-progress-fill')?.style.width,
                backgroundColor: window.getComputedStyle(phase0).backgroundColor,
                percentColor: window.getComputedStyle(phase0.querySelector('.process-percent')).color,
                barColor: window.getComputedStyle(phase0.querySelector('.process-progress-fill')).backgroundColor
            },
            phase1: {
                name: phase1.querySelector('.process-name')?.textContent,
                dataProgress: phase1.getAttribute('data-progress'),
                percentText: phase1.querySelector('.process-percent')?.textContent,
                barWidth: phase1.querySelector('.process-progress-fill')?.style.width,
                backgroundColor: window.getComputedStyle(phase1).backgroundColor,
                percentColor: window.getComputedStyle(phase1.querySelector('.process-percent')).color,
                barColor: window.getComputedStyle(phase1.querySelector('.process-progress-fill')).backgroundColor
            }
        };
    });

    console.log('\n=== 브라우저에서 실제로 렌더링된 내용 ===\n');

    if (htmlContent.error) {
        console.log('❌ 오류:', htmlContent.error);
        console.log('\n모든 data-progress 요소:');
        console.log(JSON.stringify(htmlContent.allDataProgress, null, 2));
    } else {
        console.log('Phase 0 (사업계획):');
        console.log('  - 이름:', htmlContent.phase0.name);
        console.log('  - data-progress 속성:', htmlContent.phase0.dataProgress);
        console.log('  - 퍼센티지 텍스트:', htmlContent.phase0.percentText);
        console.log('  - 진행률 바 너비:', htmlContent.phase0.barWidth);
        console.log('  - 배경색:', htmlContent.phase0.backgroundColor);
        console.log('  - 퍼센티지 색상:', htmlContent.phase0.percentColor);
        console.log('  - 진행률 바 색상:', htmlContent.phase0.barColor);

        console.log('\nPhase 1 (기획):');
        console.log('  - 이름:', htmlContent.phase1.name);
        console.log('  - data-progress 속성:', htmlContent.phase1.dataProgress);
        console.log('  - 퍼센티지 텍스트:', htmlContent.phase1.percentText);
        console.log('  - 진행률 바 너비:', htmlContent.phase1.barWidth);
        console.log('  - 배경색:', htmlContent.phase1.backgroundColor);
        console.log('  - 퍼센티지 색상:', htmlContent.phase1.percentColor);
        console.log('  - 진행률 바 색상:', htmlContent.phase1.barColor);
    }

    await browser.close();
    console.log('\n✅ 확인 완료!');
})();
