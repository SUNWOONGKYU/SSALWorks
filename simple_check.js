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

    console.log('📍 Loading dashboard...');
    await page.goto('http://localhost:3030/dashboard', {
        waitUntil: 'domcontentloaded',
        timeout: 30000
    });

    console.log('✅ Page loaded');

    // 2초 대기 (렌더링 완료)
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Phase 0과 Phase 1의 계산된 스타일 확인
    const styles = await page.evaluate(() => {
        const phase0 = document.querySelector('[data-progress="0"]');
        const phase1 = document.querySelector('[data-progress="55"]');

        if (!phase0 || !phase1) {
            return { error: 'Elements not found' };
        }

        const p0Computed = window.getComputedStyle(phase0);
        const p0Percent = phase0.querySelector('.process-percent');
        const p0PercentComputed = window.getComputedStyle(p0Percent);
        const p0Bar = phase0.querySelector('.process-progress-fill');
        const p0BarComputed = window.getComputedStyle(p0Bar);

        const p1Computed = window.getComputedStyle(phase1);
        const p1Percent = phase1.querySelector('.process-percent');
        const p1PercentComputed = window.getComputedStyle(p1Percent);
        const p1Bar = phase1.querySelector('.process-progress-fill');
        const p1BarComputed = window.getComputedStyle(p1Bar);

        return {
            phase0: {
                background: p0Computed.backgroundColor,
                percentColor: p0PercentComputed.color,
                percentText: p0Percent.textContent,
                progressBarBg: p0BarComputed.backgroundColor,
                progressBarWidth: p0BarComputed.width
            },
            phase1: {
                background: p1Computed.backgroundColor,
                percentColor: p1PercentComputed.color,
                percentText: p1Percent.textContent,
                progressBarBg: p1BarComputed.backgroundColor,
                progressBarWidth: p1BarComputed.width
            }
        };
    });

    if (styles.error) {
        console.log('\n❌ 오류:', styles.error);
    } else {
        console.log('\n=== Phase 0 (사업계획 0%) 실제 렌더링 ===');
        console.log('배경색:', styles.phase0?.background || 'N/A');
        console.log('퍼센티지 텍스트:', styles.phase0?.percentText || 'N/A');
        console.log('퍼센티지 색상:', styles.phase0?.percentColor || 'N/A');
        console.log('진행률 바 배경:', styles.phase0?.progressBarBg || 'N/A');
        console.log('진행률 바 너비:', styles.phase0?.progressBarWidth || 'N/A');

        console.log('\n=== Phase 1 (기획 55%) 실제 렌더링 ===');
        console.log('배경색:', styles.phase1?.background || 'N/A');
        console.log('퍼센티지 텍스트:', styles.phase1?.percentText || 'N/A');
        console.log('퍼센티지 색상:', styles.phase1?.percentColor || 'N/A');
        console.log('진행률 바 배경:', styles.phase1?.progressBarBg || 'N/A');
        console.log('진행률 바 너비:', styles.phase1?.progressBarWidth || 'N/A');
    }

    // 스크린샷 저장
    await page.screenshot({
        path: 'C:/!SSAL_Works_Private/dashboard_full_check.png',
        fullPage: true
    });
    console.log('\n📸 스크린샷 저장: dashboard_full_check.png');

    await browser.close();
    console.log('\n✅ 확인 완료!');
})();
