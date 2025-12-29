const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    
    console.log('🔄 프로덕션 사이트 접속...');
    await page.goto('https://www.ssalworks.ai.kr/', { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(2000);
    
    console.log('\n=== 테스트: Default 상태에서 지우기 ===\n');
    
    // 1. 초기 상태 확인 (Default 안내문)
    const initialState = await page.evaluate(() => {
        const workspace = document.getElementById('workspaceGuide');
        const editor = document.getElementById('textEditor');
        return {
            workspaceVisible: workspace ? getComputedStyle(workspace).display !== 'none' : false,
            editorVisible: editor ? getComputedStyle(editor).display !== 'none' : false,
            currentGuide: window.currentLoadedGuide || 'unknown',
            workspaceContent: workspace ? workspace.innerHTML.substring(0, 100) : ''
        };
    });
    
    console.log('1. 초기 상태 (페이지 로드 직후):');
    console.log('   - workspaceGuide 표시:', initialState.workspaceVisible ? '✅ 예' : '❌ 아니오');
    console.log('   - textEditor 표시:', initialState.editorVisible ? '✅ 예' : '❌ 아니오');
    console.log('   - 현재 가이드:', initialState.currentGuide);
    console.log('   - Default 상태인가?:', initialState.currentGuide === 'Default' ? '✅ 예' : '❌ 아니오');
    
    // 2. 지우기 버튼 클릭 시뮬레이션
    console.log('\n2. Default 상태에서 clearEditor() 호출...');
    await page.evaluate(() => {
        clearEditor();  // async 함수 호출
    });
    
    await page.waitForTimeout(500);
    
    // 3. 모달 팝업 확인
    const modalState = await page.evaluate(() => {
        const dialog = document.getElementById('customConfirmDialog');
        return {
            visible: dialog ? dialog.style.display === 'flex' : false,
            title: document.getElementById('confirmDialogTitle')?.textContent || '',
            message: document.getElementById('confirmDialogMessage')?.textContent || ''
        };
    });
    
    console.log('\n3. customConfirm 모달 팝업:');
    console.log('   - 모달 표시됨:', modalState.visible ? '✅ 예' : '❌ 아니오');
    if (modalState.visible) {
        console.log('   - 제목:', modalState.title);
        console.log('   - 메시지:', modalState.message);
    }
    
    // 4. 확인 버튼 클릭
    if (modalState.visible) {
        console.log('\n4. 확인 버튼 클릭...');
        await page.click('#confirmDialogConfirm');
        await page.waitForTimeout(500);
        
        // 5. 지우기 후 상태 확인
        const afterClear = await page.evaluate(() => {
            const workspace = document.getElementById('workspaceGuide');
            const editor = document.getElementById('textEditor');
            return {
                workspaceVisible: workspace ? getComputedStyle(workspace).display !== 'none' : false,
                editorVisible: editor ? getComputedStyle(editor).display !== 'none' : false,
                editorEmpty: editor ? editor.value === '' : true,
                currentGuide: window.currentLoadedGuide || 'unknown',
                hasDefaultContent: workspace ? workspace.innerHTML.includes('SSAL Works에 오신 것을 환영합니다') : false
            };
        });
        
        console.log('\n5. 지우기 후 상태:');
        console.log('   - workspaceGuide 표시:', afterClear.workspaceVisible ? '✅ 예' : '❌ 아니오');
        console.log('   - textEditor 숨김:', !afterClear.editorVisible ? '✅ 예' : '❌ 아니오');
        console.log('   - textEditor 비어있음:', afterClear.editorEmpty ? '✅ 예' : '❌ 아니오');
        console.log('   - 현재 가이드:', afterClear.currentGuide);
        console.log('   - Default 콘텐츠 표시:', afterClear.hasDefaultContent ? '✅ 예' : '❌ 아니오');
        
        console.log('\n========================================');
        if (afterClear.workspaceVisible && !afterClear.editorVisible && afterClear.hasDefaultContent) {
            console.log('✅ 결론: Default 상태에서 지우기 정상 작동!');
        } else {
            console.log('❌ 결론: 문제 있음');
        }
        console.log('========================================');
    } else {
        console.log('\n❌ 모달이 표시되지 않음 - 테스트 실패');
    }
    
    await browser.close();
})();
