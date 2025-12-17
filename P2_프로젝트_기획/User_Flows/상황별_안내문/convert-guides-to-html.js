/**
 * 상황별 안내문 MD → HTML 변환 스크립트 (팝업용)
 *
 * 이 스크립트는 상황별_안내문 폴더의 MD 파일들을
 * 팝업 표시용 HTML 조각 파일로 변환합니다.
 *
 * 사용법: node scripts/convert-guides-to-html.js
 */

const fs = require('fs');
const path = require('path');

// 소스 폴더 (MD와 HTML을 같은 폴더에 보관)
// 스크립트가 상황별_안내문 폴더 안에 있으므로 __dirname 사용
const SOURCE_DIR = __dirname;
const TARGET_DIR = SOURCE_DIR;  // 같은 폴더에 HTML 생성

// 간단한 MD → HTML 변환 (팝업용)
function convertMdToHtml(mdContent) {
    let html = mdContent;

    // # 제목 → h2 (팝업에서는 h2가 최상위)
    html = html.replace(/^# (.+)$/gm, '<h2 style="color: var(--primary-dark); border-bottom: 2px solid var(--primary); padding-bottom: 8px;">$1</h2>');

    // ## 소제목 → h3
    html = html.replace(/^## (.+)$/gm, '<h3 style="margin-top: 24px; color: #333;">$1</h3>');

    // ### 소소제목 → h4
    html = html.replace(/^### (.+)$/gm, '<h4 style="margin-top: 16px; color: #555;">$1</h4>');

    // **굵은글씨** → strong
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    // *기울임* → em
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

    // - 리스트 항목 처리
    const lines = html.split('\n');
    let inList = false;
    let result = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const isListItem = line.match(/^- (.+)$/);

        if (isListItem) {
            if (!inList) {
                result.push('<ul style="padding-left: 20px; margin-bottom: 15px;">');
                inList = true;
            }
            result.push(`<li style="margin-bottom: 8px;">${isListItem[1]}</li>`);
        } else {
            if (inList) {
                result.push('</ul>');
                inList = false;
            }

            // 빈 줄이 아니고, 제목이 아닌 일반 텍스트는 p 태그로 감싸기
            if (line.trim() && !line.startsWith('<h') && !line.startsWith('---')) {
                result.push(`<p style="margin-bottom: 12px;">${line}</p>`);
            } else if (line.startsWith('---')) {
                result.push('<hr style="margin: 20px 0; border: none; border-top: 1px solid #dee2e6;">');
            } else {
                result.push(line);
            }
        }
    }

    if (inList) {
        result.push('</ul>');
    }

    return result.join('\n');
}

// 메인 함수
function main() {
    console.log('📋 상황별 안내문 MD → HTML 변환 시작...\n');

    // 소스 폴더 확인
    if (!fs.existsSync(SOURCE_DIR)) {
        console.log(`❌ 소스 폴더가 없습니다: ${SOURCE_DIR}`);
        return;
    }

    // MD 파일 목록 가져오기
    const files = fs.readdirSync(SOURCE_DIR).filter(f => f.endsWith('.md'));
    console.log(`📄 발견된 MD 파일: ${files.length}개\n`);

    let converted = 0;
    let failed = 0;

    files.forEach(file => {
        try {
            const mdPath = path.join(SOURCE_DIR, file);
            const htmlFile = file.replace('.md', '.html');
            const htmlPath = path.join(TARGET_DIR, htmlFile);

            // MD 파일 읽기
            const mdContent = fs.readFileSync(mdPath, 'utf8');

            // HTML로 변환
            const htmlContent = convertMdToHtml(mdContent);

            // HTML 파일 저장
            fs.writeFileSync(htmlPath, htmlContent, 'utf8');

            console.log(`✅ ${file} → ${htmlFile}`);
            converted++;
        } catch (error) {
            console.log(`❌ ${file}: ${error.message}`);
            failed++;
        }
    });

    console.log('\n' + '─'.repeat(50));
    console.log(`\n📊 변환 완료: ${converted}개 성공, ${failed}개 실패`);
}

main();
