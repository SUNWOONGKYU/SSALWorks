const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    
    console.log('🔄 프로덕션 사이트 접속 중...');
    await page.goto('https://www.ssalworks.ai.kr/', { waitUntil: 'networkidle', timeout: 60000 });
    
    // 페이지 로드 후 잠시 대기
    await page.waitForTimeout(2000);
    
    console.log('\n=== 테스트 1: 전역 변수 확인 ===');
    
    // GUIDE_CONTENTS 확인
    const guideContentsExists = await page.evaluate(() => {
        return typeof GUIDE_CONTENTS !== 'undefined' && GUIDE_CONTENTS !== null;
    });
    console.log('GUIDE_CONTENTS 존재:', guideContentsExists ? '✅' : '❌');
    
    // ORDER_SHEET_TEMPLATES 확인
    const orderSheetTemplatesExists = await page.evaluate(() => {
        return typeof ORDER_SHEET_TEMPLATES !== 'undefined' && ORDER_SHEET_TEMPLATES !== null;
    });
    console.log('ORDER_SHEET_TEMPLATES 존재:', orderSheetTemplatesExists ? '✅' : '❌');
    
    // Default 안내문 키 확인
    const hasDefaultGuide = await page.evaluate(() => {
        return typeof GUIDE_CONTENTS !== 'undefined' && GUIDE_CONTENTS['Default'] !== undefined;
    });
    console.log('GUIDE_CONTENTS["Default"] 존재:', hasDefaultGuide ? '✅' : '❌');
    
    // P0-1_OrderSheet 키 확인
    const hasP01OrderSheet = await page.evaluate(() => {
        return typeof ORDER_SHEET_TEMPLATES !== 'undefined' && ORDER_SHEET_TEMPLATES['P0-1_OrderSheet'] !== undefined;
    });
    console.log('ORDER_SHEET_TEMPLATES["P0-1_OrderSheet"] 존재:', hasP01OrderSheet ? '✅' : '❌');
    
    console.log('\n=== 테스트 2: 초기 상태 확인 ===');
    
    // workspaceGuide 표시 상태
    const workspaceGuideVisible = await page.evaluate(() => {
        const el = document.getElementById('workspaceGuide');
        if (!el) return 'not found';
        const style = getComputedStyle(el);
        return style.display !== 'none' ? 'visible' : 'hidden';
    });
    console.log('workspaceGuide 상태:', workspaceGuideVisible);
    
    // textEditor 표시 상태
    const textEditorVisible = await page.evaluate(() => {
        const el = document.getElementById('textEditor');
        if (!el) return 'not found';
        const style = getComputedStyle(el);
        return style.display !== 'none' ? 'visible' : 'hidden';
    });
    console.log('textEditor 상태:', textEditorVisible);
    
    console.log('\n=== 테스트 3: loadTemplate 함수 테스트 ===');
    
    // loadTemplate 호출 (P0-1)
    const loadTemplateResult = await page.evaluate(async () => {
        try {
            // 먼저 customConfirm을 패치해서 자동 승인
            window.originalConfirm = window.confirm;
            window.confirm = () => true;
            
            // customConfirm도 패치
            const originalCustomConfirm = window.customConfirm;
            window.customConfirm = async () => true;
            
            await loadTemplate('P0-1');
            
            const editor = document.getElementById('textEditor');
            const content = editor ? editor.value : '';
            
            // 복원
            window.confirm = window.originalConfirm;
            window.customConfirm = originalCustomConfirm;
            
            return {
                success: content.length > 0,
                contentLength: content.length,
                preview: content.substring(0, 100)
            };
        } catch (e) {
            return { success: false, error: e.message };
        }
    });
    
    console.log('loadTemplate("P0-1") 결과:', loadTemplateResult.success ? '✅ 성공' : '❌ 실패');
    if (loadTemplateResult.success) {
        console.log('  - 콘텐츠 길이:', loadTemplateResult.contentLength);
        console.log('  - 미리보기:', loadTemplateResult.preview.substring(0, 50) + '...');
    } else {
        console.log('  - 에러:', loadTemplateResult.error);
    }
    
    // textEditor 상태 확인
    const textEditorAfterLoad = await page.evaluate(() => {
        const el = document.getElementById('textEditor');
        if (!el) return 'not found';
        const style = getComputedStyle(el);
        return {
            display: style.display,
            visibility: style.visibility,
            hasContent: el.value.length > 0
        };
    });
    console.log('loadTemplate 후 textEditor:', textEditorAfterLoad);
    
    console.log('\n=== 테스트 4: clearEditor 함수 테스트 ===');
    
    // clearEditor 호출
    const clearEditorResult = await page.evaluate(() => {
        try {
            // confirm 패치
            window.confirm = () => true;
            
            clearEditor();
            
            const editor = document.getElementById('textEditor');
            const workspace = document.getElementById('workspaceGuide');
            
            return {
                success: true,
                editorEmpty: editor ? editor.value === '' : false,
                editorDisplay: editor ? getComputedStyle(editor).display : 'not found',
                workspaceDisplay: workspace ? getComputedStyle(workspace).display : 'not found',
                workspaceHasContent: workspace ? workspace.innerHTML.length > 0 : false
            };
        } catch (e) {
            return { success: false, error: e.message };
        }
    });
    
    console.log('clearEditor() 결과:', clearEditorResult.success ? '✅ 성공' : '❌ 실패');
    if (clearEditorResult.success) {
        console.log('  - textEditor 비어있음:', clearEditorResult.editorEmpty ? '✅' : '❌');
        console.log('  - textEditor display:', clearEditorResult.editorDisplay);
        console.log('  - workspaceGuide display:', clearEditorResult.workspaceDisplay);
        console.log('  - workspaceGuide 콘텐츠 있음:', clearEditorResult.workspaceHasContent ? '✅' : '❌');
    } else {
        console.log('  - 에러:', clearEditorResult.error);
    }
    
    console.log('\n=== 테스트 완료 ===');
    
    await browser.close();
})();
