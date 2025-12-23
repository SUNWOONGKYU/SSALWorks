// update_sidebar_html.js
// sidebar_structure.json을 읽어서 Production/Frontend/index.html의
// S1-S5 process-small 항목들만 교체 (HTML 구조 유지)

const fs = require('fs');
const path = require('path');

// 파일 경로
const SIDEBAR_JSON_PATH = path.join(__dirname, 'sidebar_structure.json');
const PRODUCTION_HTML_PATH = path.join(__dirname, '..', '..', 'Production', 'Frontend', 'index.html');

// Stage ID 매핑
const STAGE_MARKERS = {
    'S1_개발_준비': '<!-- S1. 개발 준비 -->',
    'S2_개발-1차': '<!-- S2. 개발 1차 -->',
    'S3_개발-2차': '<!-- S3. 개발 2차 -->',
    'S4_개발-3차': '<!-- S4. 개발 3차 -->',
    'S5_운영': '<!-- S5. 운영 -->'
};

console.log('🚀 Sidebar HTML 자동 업데이트 시작...\n');

// 1. sidebar_structure.json 읽기
console.log('📂 sidebar_structure.json 읽는 중...');
const sidebarData = JSON.parse(fs.readFileSync(SIDEBAR_JSON_PATH, 'utf8'));
console.log(`✅ sidebar_structure.json 읽기 완료`);
console.log(`   - 최종 업데이트: ${sidebarData.metadata.lastUpdate}\n`);

// 2. S1-S5 Stage 데이터 추출
const executionStages = sidebarData.structure.filter(phase =>
    phase.id.startsWith('S1_') ||
    phase.id.startsWith('S2_') ||
    phase.id.startsWith('S3_') ||
    phase.id.startsWith('S4_') ||
    phase.id.startsWith('S5_')
);

console.log(`📋 실행 단계(S1-S5) 추출: ${executionStages.length}개`);
executionStages.forEach(stage => {
    console.log(`   - ${stage.id}: ${stage.categories.length}개 Area`);
});
console.log('');

// 3. Production/Frontend/index.html 읽기
console.log('📂 Production/Frontend/index.html 읽는 중...');
let htmlContent = fs.readFileSync(PRODUCTION_HTML_PATH, 'utf8');
const originalLength = htmlContent.length;
console.log(`✅ HTML 파일 읽기 완료 (${originalLength} bytes)\n`);

// 4. 각 Stage의 process-small 항목들만 교체
console.log('🔄 각 Stage의 Area 목록 교체 중...');

executionStages.forEach(stage => {
    const marker = STAGE_MARKERS[stage.id];
    if (!marker) {
        console.warn(`⚠️ 알 수 없는 Stage: ${stage.id}`);
        return;
    }

    // 해당 Stage 마커 위치 찾기
    const markerIdx = htmlContent.indexOf(marker);
    if (markerIdx === -1) {
        console.warn(`⚠️ ${stage.id} 마커를 찾을 수 없음`);
        return;
    }

    // process-small-list 시작 위치 찾기
    const listStartTag = '<div class="process-small-list">';
    const listStartIdx = htmlContent.indexOf(listStartTag, markerIdx);
    if (listStartIdx === -1 || listStartIdx > markerIdx + 2000) {
        console.warn(`⚠️ ${stage.id}에서 process-small-list를 찾을 수 없음`);
        return;
    }

    const contentStartIdx = listStartIdx + listStartTag.length;

    // process-small-list 닫는 태그 찾기 (중첩된 div 고려)
    let depth = 1;
    let searchIdx = contentStartIdx;
    let listEndIdx = -1;

    while (depth > 0 && searchIdx < htmlContent.length) {
        const nextOpen = htmlContent.indexOf('<div', searchIdx);
        const nextClose = htmlContent.indexOf('</div>', searchIdx);

        if (nextClose === -1) break;

        if (nextOpen !== -1 && nextOpen < nextClose) {
            depth++;
            searchIdx = nextOpen + 4;
        } else {
            depth--;
            if (depth === 0) {
                listEndIdx = nextClose;
            }
            searchIdx = nextClose + 6;
        }
    }

    if (listEndIdx === -1) {
        console.warn(`⚠️ ${stage.id}에서 process-small-list 닫는 태그를 찾을 수 없음`);
        return;
    }

    // 새로운 process-small 항목들 생성 (CRLF 사용)
    let newContent = '\r\n';
    stage.categories.forEach(category => {
        newContent += `                            <div class="process-small">\r\n`;
        newContent += `                                <div class="process-small-content">\r\n`;
        newContent += `                                    <span class="process-small-bullet">●</span>\r\n`;
        newContent += `                                    <span>${category.id}</span>\r\n`;
        newContent += `                                </div>\r\n`;
        newContent += `                            </div>\r\n`;
    });
    newContent += '                        ';

    // 교체
    htmlContent = htmlContent.substring(0, contentStartIdx) + newContent + htmlContent.substring(listEndIdx);

    console.log(`   ✅ ${stage.id}: ${stage.categories.length}개 Area로 업데이트`);
});

// 5. 파일 저장
console.log('\n💾 파일 저장 중...');
fs.writeFileSync(PRODUCTION_HTML_PATH, htmlContent, 'utf8');
console.log(`✅ Production/Frontend/index.html 업데이트 완료!`);
console.log(`   - 원본: ${originalLength} bytes`);
console.log(`   - 수정: ${htmlContent.length} bytes`);

// 6. 결과 요약
console.log('\n📊 업데이트 요약:');
console.log('─'.repeat(50));
executionStages.forEach(stage => {
    const stageNum = stage.id.split('_')[0];
    const areas = stage.categories.map(cat => cat.id).join(', ');
    console.log(`${stageNum}. ${stage.name_ko}`);
    console.log(`   Areas: ${areas}`);
});
console.log('─'.repeat(50));
console.log(`\n🎉 완료! sidebar_structure.json 기준으로 S1-S5 Area가 동기화되었습니다.`);
