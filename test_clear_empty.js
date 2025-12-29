const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    
    console.log('🔄 프로덕션 접속...');
    await page.goto('https://www.ssalworks.ai.kr/', { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(2000);
    
    // 1. 초기 상태
    const before = await page.evaluate(() => {
        const w = document.getElementById('workspaceGuide');
        const e = document.getElementById('textEditor');
        return {
            workspaceDisplay: w ? getComputedStyle(w).display : 'N/A',
            editorDisplay: e ? getComputedStyle(e).display : 'N/A',
            workspaceHasContent: w ? w.innerHTML.length > 0 : false
        };
    });
    console.log('\n[지우기 전]');
    console.log('  workspaceGuide:', before.workspaceDisplay, '| 콘텐츠:', before.workspaceHasContent ? '있음' : '없음');
    console.log('  textEditor:', before.editorDisplay);
    
    // 2. clearEditor 호출
    await page.evaluate(() => clearEditor());
    await page.waitForTimeout(500);
    
    // 3. 모달 확인 및 확인 클릭
    const modalVisible = await page.evaluate(() => {
        const d = document.getElementById('customConfirmDialog');
        return d && d.style.display === 'flex';
    });
    console.log('\n[모달 팝업]:', modalVisible ? '✅ 표시됨' : '❌ 안 뜸');
    
    if (modalVisible) {
        await page.click('#confirmDialogConfirm');
        await page.waitForTimeout(500);
    }
    
    // 4. 지우기 후 상태
    const after = await page.evaluate(() => {
        const w = document.getElementById('workspaceGuide');
        const e = document.getElementById('textEditor');
        return {
            workspaceDisplay: w ? getComputedStyle(w).display : 'N/A',
            editorDisplay: e ? getComputedStyle(e).display : 'N/A',
            workspaceHasContent: w ? w.innerHTML.length > 0 : false,
            workspaceInnerHTMLLength: w ? w.innerHTML.length : 0
        };
    });
    console.log('\n[지우기 후]');
    console.log('  workspaceGuide:', after.workspaceDisplay, '| 콘텐츠:', after.workspaceHasContent ? '있음' : '없음', '| innerHTML길이:', after.workspaceInnerHTMLLength);
    console.log('  textEditor:', after.editorDisplay);
    
    // 5. 결과 판정
    console.log('\n========================================');
    if (after.workspaceDisplay === 'none' && after.editorDisplay === 'none' && !after.workspaceHasContent) {
        console.log('✅ 지우기 성공: 모든 콘텐츠 사라짐!');
    } else {
        console.log('❌ 지우기 실패');
        if (after.workspaceDisplay !== 'none') console.log('   - workspaceGuide가 아직 보임');
        if (after.workspaceHasContent) console.log('   - workspaceGuide에 콘텐츠 남아있음');
    }
    console.log('========================================');
    
    await browser.close();
})();
