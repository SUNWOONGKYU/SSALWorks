const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        viewport: { width: 375, height: 812 },
        deviceScaleFactor: 3,
        isMobile: true,
        hasTouch: true
    });
    const page = await context.newPage();

    console.log('📱 모바일 터치 타겟 크기 검증 시작...\n');

    // 1. 메인 페이지 로드
    await page.goto('https://www.ssalworks.ai.kr', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    // 메인 페이지 스크린샷
    await page.screenshot({ path: 'mobile_main_page.png', fullPage: true });
    console.log('📸 메인 페이지 스크린샷: mobile_main_page.png\n');

    // 2. 공지사항 섹션으로 스크롤 후 클릭
    console.log('1️⃣ 공지사항 모달 테스트...');
    try {
        // 공지사항 섹션 찾아서 스크롤
        const noticeSection = await page.$('text=📢 공지사항');
        if (noticeSection) {
            await noticeSection.scrollIntoViewIfNeeded();
            await page.waitForTimeout(500);
        }

        const noticeItem = await page.$('.notice-item');
        if (noticeItem) {
            await noticeItem.scrollIntoViewIfNeeded();
            await page.waitForTimeout(300);
            await noticeItem.click({ force: true });
            await page.waitForTimeout(1000);

            // 닫기 버튼 크기 측정
            const closeBtn = await page.$('.notice-detail-close-btn');
            if (closeBtn) {
                const box = await closeBtn.boundingBox();
                const width = Math.round(box.width);
                const height = Math.round(box.height);
                console.log('   닫기 버튼 크기: ' + width + 'x' + height + 'px');
                if (height >= 44) {
                    console.log('   ✅ WCAG 터치 타겟 기준 충족 (44px 이상)');
                } else {
                    console.log('   ❌ 터치 타겟 크기 부족!');
                }

                await page.screenshot({ path: 'mobile_notice_modal.png', fullPage: false });
                console.log('   📸 스크린샷: mobile_notice_modal.png\n');
            } else {
                console.log('   ⚠️ 닫기 버튼 없음 (모달이 열리지 않았을 수 있음)');
            }

            // 모달 닫기
            const overlay = await page.$('.notice-modal-overlay');
            if (overlay) {
                await overlay.click({ position: { x: 10, y: 10 } });
            }
            await page.waitForTimeout(500);
        } else {
            console.log('   ⚠️ 공지사항 항목 없음');
        }
    } catch (e) {
        console.log('   ⚠️ 공지사항 테스트 오류:', e.message);
    }

    // 3. popup-modal-close 버튼 테스트 (빌더 계정 모달 등)
    console.log('2️⃣ popup-modal-close 버튼 테스트...');
    try {
        // 빌더 계정 개설 버튼 찾기
        const builderBtn = await page.$('text=빌더 계정 개설');
        if (builderBtn) {
            await builderBtn.scrollIntoViewIfNeeded();
            await page.waitForTimeout(300);
            await builderBtn.click({ force: true });
            await page.waitForTimeout(1000);

            const closeBtn = await page.$('.popup-modal-close');
            if (closeBtn) {
                const box = await closeBtn.boundingBox();
                const width = Math.round(box.width);
                const height = Math.round(box.height);
                console.log('   닫기 버튼 (X) 크기: ' + width + 'x' + height + 'px');
                if (width >= 44 && height >= 44) {
                    console.log('   ✅ WCAG 터치 타겟 기준 충족');
                } else {
                    console.log('   ❌ 터치 타겟 크기 부족!');
                }

                await page.screenshot({ path: 'mobile_popup_modal.png', fullPage: false });
                console.log('   📸 스크린샷: mobile_popup_modal.png\n');

                await closeBtn.click();
                await page.waitForTimeout(500);
            }
        } else {
            console.log('   ⚠️ 빌더 계정 개설 버튼 없음');
        }
    } catch (e) {
        console.log('   ⚠️ popup-modal 테스트 오류:', e.message);
    }

    // 4. grid-fullscreen-close 버튼 테스트 (서비스 소개)
    console.log('3️⃣ grid-fullscreen-close 버튼 테스트...');
    try {
        // 서비스 소개 버튼 찾기
        const serviceBtn = await page.$('text=서비스 소개');
        if (serviceBtn) {
            await serviceBtn.scrollIntoViewIfNeeded();
            await page.waitForTimeout(300);
            await serviceBtn.click({ force: true });
            await page.waitForTimeout(1500);

            const closeBtn = await page.$('.grid-fullscreen-close');
            if (closeBtn) {
                const box = await closeBtn.boundingBox();
                const width = Math.round(box.width);
                const height = Math.round(box.height);
                console.log('   닫기 버튼 크기: ' + width + 'x' + height + 'px');
                if (height >= 44) {
                    console.log('   ✅ WCAG 터치 타겟 기준 충족');
                } else {
                    console.log('   ❌ 터치 타겟 크기 부족!');
                }

                await page.screenshot({ path: 'mobile_service_intro_modal.png', fullPage: false });
                console.log('   📸 스크린샷: mobile_service_intro_modal.png\n');

                await closeBtn.click();
                await page.waitForTimeout(500);
            }
        } else {
            console.log('   ⚠️ 서비스 소개 버튼 없음');
        }
    } catch (e) {
        console.log('   ⚠️ grid-fullscreen 테스트 오류:', e.message);
    }

    // 5. 학습용 Books 테스트
    console.log('4️⃣ 학습용 Books 테스트...');
    try {
        await page.goto('https://www.ssalworks.ai.kr/%EB%B6%80%EC%88%98%EC%A0%81_%EA%B3%A0%EC%9C%A0%EA%B8%B0%EB%8A%A5/%EC%BD%98%ED%85%90%EC%B8%A0/%ED%95%99%EC%8A%B5%EC%9A%A9_Books_New/viewer.html', {
            waitUntil: 'networkidle',
            timeout: 30000
        });
        await page.waitForTimeout(2000);

        // 닫기 버튼 측정
        const closeBtn = await page.$('.close-btn');
        if (closeBtn) {
            const box = await closeBtn.boundingBox();
            const width = Math.round(box.width);
            const height = Math.round(box.height);
            console.log('   닫기 버튼 크기: ' + width + 'x' + height + 'px');
            if (height >= 44) {
                console.log('   ✅ WCAG 터치 타겟 기준 충족');
            } else {
                console.log('   ❌ 터치 타겟 크기 부족!');
            }
        }

        // 햄버거 메뉴 버튼 측정
        const menuBtn = await page.$('.mobile-menu-btn');
        if (menuBtn) {
            const box = await menuBtn.boundingBox();
            const width = Math.round(box.width);
            const height = Math.round(box.height);
            console.log('   햄버거 메뉴 크기: ' + width + 'x' + height + 'px');

            // 햄버거 메뉴 클릭해서 사이드바 열기
            await menuBtn.click();
            await page.waitForTimeout(500);

            const sidebar = await page.$('.sidebar.active');
            if (sidebar) {
                console.log('   ✅ 사이드바 열림 확인');
            }
        }

        await page.screenshot({ path: 'mobile_books_viewer.png', fullPage: false });
        console.log('   📸 스크린샷: mobile_books_viewer.png\n');

    } catch (e) {
        console.log('   ⚠️ 학습용 Books 오류:', e.message);
    }

    console.log('═══════════════════════════════════════');
    console.log('✅ 모바일 터치 타겟 검증 완료!');
    console.log('═══════════════════════════════════════');

    await browser.close();
})();
