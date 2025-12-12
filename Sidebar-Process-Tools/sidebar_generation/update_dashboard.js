// update_dashboard.js
// 대시보드 HTML 파일의 embedded JSON을 최신 sidebar_structure.json으로 업데이트

const fs = require('fs');
const path = require('path');

// 파일 경로
const SIDEBAR_JSON_PATH = path.join(__dirname, 'sidebar_structure.json');
const DASHBOARD_PATH = path.join(__dirname, '..', '..', 'P2_프로젝트_기획', '1-6_UI_UX_Mockup', 'dashboard-mockup.html');

console.log('📂 파일 읽는 중...');

// sidebar_structure.json 읽기
const sidebarData = JSON.parse(fs.readFileSync(SIDEBAR_JSON_PATH, 'utf8'));
const minifiedJSON = JSON.stringify(sidebarData);

console.log(`✅ sidebar_structure.json 읽기 완료 (${minifiedJSON.length} bytes)`);

// dashboard-mockup.html 읽기
let dashboardHTML = fs.readFileSync(DASHBOARD_PATH, 'utf8');

console.log(`✅ dashboard-mockup.html 읽기 완료`);

// const SIDEBAR_STRUCTURE = { ... }; 부분 찾기 및 교체
const pattern = /const SIDEBAR_STRUCTURE = \{[^;]+\};/;

if (pattern.test(dashboardHTML)) {
    console.log('🔍 기존 SIDEBAR_STRUCTURE 발견!');

    // 교체
    dashboardHTML = dashboardHTML.replace(
        pattern,
        `const SIDEBAR_STRUCTURE = ${minifiedJSON};`
    );

    // 저장
    fs.writeFileSync(DASHBOARD_PATH, dashboardHTML, 'utf8');

    console.log('✅ dashboard-mockup.html 업데이트 완료!');
    console.log('📊 업데이트된 내용:');
    console.log(`   - 최종 업데이트: ${sidebarData.metadata.lastUpdate}`);
    console.log(`   - 대분류: ${sidebarData.structure.length}개`);

    let totalItems = 0;
    sidebarData.structure.forEach(phase => {
        if (phase.items) totalItems += phase.items.length;
        if (phase.categories) {
            phase.categories.forEach(cat => {
                if (cat.items) totalItems += cat.items.length;
            });
        }
    });

    console.log(`   - 총 항목: ${totalItems}개`);

} else {
    console.error('❌ dashboard-mockup.html에서 SIDEBAR_STRUCTURE를 찾을 수 없습니다!');
    process.exit(1);
}
