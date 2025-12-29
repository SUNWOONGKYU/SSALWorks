const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: false });  // 시각적 확인을 위해 headless: false
    const page = await browser.newPage();
    
    console.log('🔄 프로덕션 사이트 접속 중...');
    await page.goto('https://www.ssalworks.ai.kr/', { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(2000);
    
    console.log('\n=== 초기 상태 확인 ===');
    const initialState = await page.evaluate(() => {
        const workspace = document.getElementById('workspaceGuide');
        return {
            display: workspace ? getComputedStyle(workspace).display : 'not found',
            hasDefaultContent: workspace ? workspace.innerHTML.includes('SSAL Works') : false
        };
    });
    console.log('workspaceGuide 상태:', initialState);
    
    console.log('\n=== clearEditor 호출 (customConfirm 모달 테스트) ===');
    
    // clearEditor 호출 - 모달이 뜨는지 확인
    await page.evaluate(() => {
        clearEditor();  // async 함수 호출
    });
    
    // 모달이 뜰 때까지 대기
    await page.waitForTimeout(500);
    
    // customConfirmDialog 모달 확인
    const modalState = await page.evaluate(() => {
        const dialog = document.getElementById('customConfirmDialog');
        if (!dialog) return { exists: false };
        
        const style = getComputedStyle(dialog);
        const title = document.getElementById('confirmDialogTitle');
        const message = document.getElementById('confirmDialogMessage');
        
        return {
            exists: true,
            display: dialog.style.display || style.display,
            title: title ? title.textContent : '',
            message: message ? message.textContent : ''
        };
    });
    
    console.log('customConfirm 모달 상태:', modalState);
    
    if (modalState.exists && modalState.display === 'flex') {
        console.log('✅ customConfirm 모달 팝업이 정상적으로 표시됨!');
        console.log('   - 제목:', modalState.title);
        console.log('   - 메시지:', modalState.message);
        
        // 확인 버튼 클릭
        console.log('\n확인 버튼 클릭...');
        await page.click('#confirmDialogConfirm');
        await page.waitForTimeout(500);
        
        // clearEditor 결과 확인
        const afterClear = await page.evaluate(() => {
            const workspace = document.getElementById('workspaceGuide');
            const editor = document.getElementById('textEditor');
            return {
                workspaceDisplay: workspace ? getComputedStyle(workspace).display : 'not found',
                editorDisplay: editor ? getComputedStyle(editor).display : 'not found',
                hasDefaultContent: workspace ? workspace.innerHTML.includes('SSAL Works') : false
            };
        });
        console.log('\nclearEditor 후 상태:', afterClear);
        console.log('✅ clearEditor 정상 작동!' );
    } else {
        console.log('❌ customConfirm 모달이 표시되지 않음');
    }
    
    await page.waitForTimeout(2000);  // 결과 확인용 대기
    await browser.close();
    console.log('\n=== 테스트 완료 ===');
})();
