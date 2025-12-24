const { chromium, devices } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const iPhone = devices['iPhone 12'];
    const context = await browser.newContext({
        ...iPhone,
        locale: 'ko-KR'
    });
    const page = await context.newPage();

    console.log('📱 viewer_mobile.html 모달 기능 검증');
    console.log('='.repeat(50));

    try {
        await page.goto('https://www.ssalworks.ai.kr/viewer_mobile.html', {
            waitUntil: 'networkidle',
            timeout: 30000
        });

        // 데이터 로드 대기 (3초)
        await page.waitForTimeout(3000);

        // 상태 확인
        const statusText = await page.$eval('#statusText', el => el.textContent);
        const taskCount = await page.$eval('#taskCount', el => el.textContent);
        console.log(`📊 연결 상태: ${statusText}`);
        console.log(`📊 Task 수: ${taskCount}`);

        // Task 카드 개수
        const taskCards = await page.$$('.task-card');
        console.log(`📊 Task 카드 개수: ${taskCards.length}개`);

        // 첫 번째 Task 클릭하여 모달 테스트
        if (taskCards.length > 0) {
            const firstTaskId = await taskCards[0].$eval('.task-id', el => el.textContent);
            console.log(`\n🔍 ${firstTaskId} 클릭하여 모달 테스트...`);

            await taskCards[0].click();
            await page.waitForTimeout(1500);

            // 모달 표시 확인
            const modalActive = await page.$eval('#taskModal', el => el.classList.contains('active'));
            console.log(`📊 모달 활성화: ${modalActive ? '✅ 예' : '❌ 아니오'}`);

            if (modalActive) {
                // 모달 제목 확인
                const modalTitle = await page.$eval('#modalTitle', el => el.textContent);
                console.log(`📊 모달 제목: ${modalTitle}`);

                // 모달 내용 확인
                const modalContent = await page.$eval('#modalContent', el => el.textContent);
                console.log(`📊 모달 내용 길이: ${modalContent.length}자`);

                // 세부 섹션 확인
                const detailSections = await page.$$('.detail-section');
                console.log(`📊 세부 섹션 개수: ${detailSections.length}개`);

                // 스크린샷 (모달 열린 상태)
                await page.screenshot({ path: 'screenshot_modal_open.png', fullPage: true });
                console.log('📸 스크린샷: screenshot_modal_open.png');

                // 모달 닫기 테스트
                await page.click('.modal-close');
                await page.waitForTimeout(500);

                const modalClosed = await page.$eval('#taskModal', el => !el.classList.contains('active'));
                console.log(`📊 모달 닫힘: ${modalClosed ? '✅ 예' : '❌ 아니오'}`);
            }
        }

        // 최종 스크린샷
        await page.screenshot({ path: 'screenshot_viewer_final.png', fullPage: true });
        console.log('📸 스크린샷: screenshot_viewer_final.png');

        console.log('\n✅ 모달 기능 검증 완료');

    } catch (e) {
        console.log(`❌ 오류: ${e.message}`);
    }

    await browser.close();
})();
