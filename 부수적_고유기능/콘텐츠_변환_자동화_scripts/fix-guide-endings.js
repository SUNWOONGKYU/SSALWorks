/**
 * 상황별 안내문 MD 파일 마지막 문구 수정 스크립트
 *
 * 변경 내용:
 * - "⚠️ 특별단계 Order Sheet입니다." 제거
 * - "확인 버튼을 클릭하면 Order Sheet가 발행됩니다."
 *   → "확인 버튼을 클릭하면 Workspace에 Order Sheet가 로드됩니다."
 *
 * 사용법: node scripts/fix-guide-endings.js
 */

const fs = require('fs');
const path = require('path');

const SOURCE_DIR = path.join(__dirname, '..', 'P2_프로젝트_기획', 'User_Flows', '상황별_안내문');

function main() {
    console.log('📋 안내문 마지막 문구 수정 시작...\n');

    if (!fs.existsSync(SOURCE_DIR)) {
        console.log(`❌ 소스 폴더가 없습니다: ${SOURCE_DIR}`);
        return;
    }

    const files = fs.readdirSync(SOURCE_DIR).filter(f => f.endsWith('.md'));
    console.log(`📄 발견된 MD 파일: ${files.length}개\n`);

    let modified = 0;

    files.forEach(file => {
        const filePath = path.join(SOURCE_DIR, file);
        let content = fs.readFileSync(filePath, 'utf8');
        let changed = false;

        // "⚠️ 특별단계 Order Sheet입니다." 제거
        if (content.includes('**⚠️ 특별단계 Order Sheet입니다.**')) {
            content = content.replace('**⚠️ 특별단계 Order Sheet입니다.**\n\n', '');
            content = content.replace('**⚠️ 특별단계 Order Sheet입니다.**\n', '');
            content = content.replace('**⚠️ 특별단계 Order Sheet입니다.**', '');
            changed = true;
        }

        // "확인 버튼을 클릭하면 Order Sheet가 발행됩니다." 변경
        if (content.includes('**확인 버튼을 클릭하면 Order Sheet가 발행됩니다.**')) {
            content = content.replace(
                '**확인 버튼을 클릭하면 Order Sheet가 발행됩니다.**',
                '**확인 버튼을 클릭하면 Workspace에 Order Sheet가 로드됩니다.**'
            );
            changed = true;
        }

        if (changed) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ ${file}`);
            modified++;
        } else {
            console.log(`⏭️ ${file} (변경 없음)`);
        }
    });

    console.log('\n' + '─'.repeat(50));
    console.log(`\n📊 수정 완료: ${modified}개 파일 변경됨`);
}

main();
