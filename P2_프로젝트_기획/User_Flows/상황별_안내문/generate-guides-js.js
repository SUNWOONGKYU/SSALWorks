/**
 * guides 폴더의 HTML 파일들을 JavaScript 객체로 변환
 *
 * file:// 프로토콜에서 fetch가 CORS로 차단되므로
 * HTML 내용을 JS 파일로 미리 번들링
 *
 * 사용법: node scripts/generate-guides-js.js
 */

const fs = require('fs');
const path = require('path');

// HTML 파일 위치 (스크립트가 상황별_안내문 폴더에 있음)
const GUIDES_DIR = __dirname;
// 출력 JS 파일 위치 - Production/Frontend에 저장
// 상황별_안내문 → User_Flows → P2_프로젝트_기획 → (root) → Production/Frontend
const OUTPUT_FILE = path.join(__dirname, '..', '..', '..', 'Production', 'Frontend', 'guides.js');

function main() {
    console.log('📋 guides.js 생성 시작...\n');

    if (!fs.existsSync(GUIDES_DIR)) {
        console.log(`❌ guides 폴더가 없습니다: ${GUIDES_DIR}`);
        return;
    }

    const files = fs.readdirSync(GUIDES_DIR).filter(f => f.endsWith('.html'));
    console.log(`📄 발견된 HTML 파일: ${files.length}개\n`);

    const guides = {};

    files.forEach(file => {
        const filePath = path.join(GUIDES_DIR, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const key = file.replace('.html', '');
        guides[key] = content;
        console.log(`✅ ${file}`);
    });

    // JavaScript 파일 생성
    const jsContent = `/**
 * 상황별 안내문 HTML 콘텐츠
 * 자동 생성됨 - 직접 수정하지 마세요
 * 생성 시간: ${new Date().toISOString()}
 *
 * 사용법: GUIDE_CONTENTS['S1_개발_준비']
 */

const GUIDE_CONTENTS = ${JSON.stringify(guides, null, 2)};
`;

    fs.writeFileSync(OUTPUT_FILE, jsContent, 'utf8');

    console.log('\n' + '─'.repeat(50));
    console.log(`\n✅ guides.js 생성 완료: ${OUTPUT_FILE}`);
    console.log(`📊 총 ${Object.keys(guides).length}개 안내문 포함`);
}

main();
