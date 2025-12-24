const { chromium, devices } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const iPhone = devices['iPhone 12'];
    const context = await browser.newContext({ ...iPhone });
    const page = await context.newPage();

    console.log('=== 모바일 안내문 상세 테스트 ===\n');

    // 콘솔 로그 캡처
    page.on('console', msg => {
        if (msg.text().includes('안내문') || msg.text().includes('Guide') || msg.text().includes('로그인')) {
            console.log('📋 Console:', msg.text());
        }
    });

    // 메인 도메인 테스트
    await page.goto('https://www.ssalworks.ai.kr');
    console.log('✅ 페이지 로드 완료');

    // 5초 대기 (JavaScript 실행 시간)
    await page.waitForTimeout(5000);
    console.log('✅ 5초 대기 완료\n');

    // 1. guidePopup 상태 확인
    const popupState = await page.evaluate(() => {
        const popup = document.getElementById('guidePopup');
        if (!popup) return { exists: false };

        const rect = popup.getBoundingClientRect();
        const style = window.getComputedStyle(popup);

        return {
            exists: true,
            // display 상태
            inlineDisplay: popup.style.display,
            computedDisplay: style.display,
            // visibility
            visibility: style.visibility,
            opacity: style.opacity,
            // 위치
            position: style.position,
            top: style.top,
            left: style.left,
            right: style.right,
            zIndex: style.zIndex,
            // 크기
            width: style.width,
            height: style.height,
            // 실제 화면 위치
            rectTop: rect.top,
            rectLeft: rect.left,
            rectWidth: rect.width,
            rectHeight: rect.height,
            // 화면 안에 있는지
            isOnScreen: rect.top >= 0 && rect.left >= 0 && rect.bottom <= window.innerHeight && rect.right <= window.innerWidth,
            // 뷰포트 크기
            viewportWidth: window.innerWidth,
            viewportHeight: window.innerHeight,
            // 내용 존재 여부
            hasContent: popup.innerHTML.length > 100,
            titleText: document.getElementById('guidePopupTitle')?.textContent || 'N/A'
        };
    });

    console.log('📊 guidePopup 상태:');
    console.log(JSON.stringify(popupState, null, 2));
    console.log('');

    // 2. GUIDE_CONTENTS 확인
    const guideContents = await page.evaluate(() => {
        return typeof GUIDE_CONTENTS !== 'undefined'
            ? { loaded: true, count: Object.keys(GUIDE_CONTENTS).length }
            : { loaded: false };
    });
    console.log('📚 GUIDE_CONTENTS:', JSON.stringify(guideContents));

    // 3. 팝업이 화면에 보이는지 최종 판단
    if (popupState.exists) {
        const isVisible =
            popupState.computedDisplay !== 'none' &&
            popupState.visibility !== 'hidden' &&
            parseFloat(popupState.opacity) > 0;

        console.log('\n🔍 팝업 가시성 분석:');
        console.log(`   - computedDisplay: ${popupState.computedDisplay} (none이면 안 보임)`);
        console.log(`   - visibility: ${popupState.visibility}`);
        console.log(`   - opacity: ${popupState.opacity}`);
        console.log(`   - 결론: ${isVisible ? '✅ 보임' : '❌ 안 보임'}`);

        if (isVisible) {
            console.log('\n📍 팝업 위치:');
            console.log(`   - 화면: ${popupState.viewportWidth}x${popupState.viewportHeight}`);
            console.log(`   - 팝업: (${popupState.rectLeft}, ${popupState.rectTop}) ${popupState.rectWidth}x${popupState.rectHeight}`);
            console.log(`   - 화면 안에 있는지: ${popupState.isOnScreen ? '✅ 예' : '❌ 아니오 (화면 밖)'}`);
        }
    }

    // 스크린샷 저장
    await page.screenshot({ path: 'test_mobile_guide_result.png', fullPage: true });
    console.log('\n📸 스크린샷 저장: test_mobile_guide_result.png');

    await browser.close();
})();
