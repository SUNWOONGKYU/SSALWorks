/**
 * 외부_연동_설정_Guide 폴더의 MD 파일들을 JavaScript 객체로 변환
 *
 * file:// 프로토콜에서 fetch가 CORS로 차단되므로
 * MD 내용을 JS 파일로 미리 번들링
 *
 * 사용법: node generate-service-guides-js.js
 */

const fs = require('fs');
const path = require('path');

// MD 파일 위치 (스크립트가 외부_연동_설정_Guide 폴더에 있음)
const GUIDES_DIR = __dirname;
// 출력 JS 파일 위치 - Production/Frontend에 저장
const OUTPUT_FILE = path.join(__dirname, '..', '..', '..', 'Production', 'Frontend', 'service-guides.js');

function main() {
    console.log('📋 service-guides.js 생성 시작...\n');

    if (!fs.existsSync(GUIDES_DIR)) {
        console.log(`❌ 폴더가 없습니다: ${GUIDES_DIR}`);
        return;
    }

    const files = fs.readdirSync(GUIDES_DIR).filter(f => f.endsWith('.md'));
    console.log(`📄 발견된 MD 파일: ${files.length}개\n`);

    const guides = {};

    // 파일명과 서비스 ID 매핑
    const fileToServiceId = {
        '01_데이터베이스_설정.md': 'database',
        '02_회원인증_설정.md': 'auth',
        '03_이메일_시스템_설정.md': 'email',
        '04_배포_도메인_설정.md': 'deploy',
        '05_결제_시스템_설정.md': 'payment'
    };

    files.forEach(file => {
        const filePath = path.join(GUIDES_DIR, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const serviceId = fileToServiceId[file];

        if (serviceId) {
            guides[serviceId] = content;
            console.log(`✅ ${file} → ${serviceId}`);
        } else {
            console.log(`⏭️ ${file} (매핑 없음, 건너뜀)`);
        }
    });

    // JavaScript 파일 생성
    const jsContent = `/**
 * 외부 연동 설정 가이드 MD 콘텐츠
 * 자동 생성됨 - 직접 수정하지 마세요
 * 생성 시간: ${new Date().toISOString()}
 *
 * 사용법: SERVICE_GUIDE_CONTENTS['database']
 */

const SERVICE_GUIDE_CONTENTS = ${JSON.stringify(guides, null, 2)};
`;

    fs.writeFileSync(OUTPUT_FILE, jsContent, 'utf8');

    console.log('\n' + '─'.repeat(50));
    console.log(`\n✅ service-guides.js 생성 완료: ${OUTPUT_FILE}`);
    console.log(`📊 총 ${Object.keys(guides).length}개 가이드 포함`);
}

main();
