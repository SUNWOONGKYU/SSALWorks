/**
 * Briefing MD 파일들을 JavaScript 객체로 변환
 *
 * file:// 프로토콜에서 fetch가 CORS로 차단되므로
 * MD 내용을 JS 파일로 미리 번들링
 *
 * 기존 guides.js (상황별 안내문)를 대체하여
 * Briefings (P0~S5 안내문)로 전환
 *
 * 사용법: node Briefings_OrderSheets/Briefings/generate-briefings-js.js
 */

const fs = require('fs');
const path = require('path');

// Briefings 폴더 위치 (스크립트가 Briefings 폴더에 있음)
const BRIEFINGS_DIR = __dirname;
// 상황별 안내문 폴더 위치 (Briefings/Situational/)
const SITUATIONAL_DIR = path.join(__dirname, 'Situational');
// 출력 JS 파일 위치 - 현재 폴더(Briefings)에 저장
const OUTPUT_FILE = path.join(__dirname, 'guides.js');


/**
 * 디렉토리를 재귀적으로 탐색하여 모든 MD 파일 찾기
 */
function findMdFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            findMdFiles(filePath, fileList);
        } else if (file.endsWith('.md')) {
            fileList.push(filePath);
        }
    });

    return fileList;
}

/**
 * Markdown을 간단한 HTML로 변환
 */
function mdToHtml(md) {
    let html = md;

    // 제목 변환
    html = html.replace(/^### (.+)$/gm, '<h3 style="margin-top: 24px; color: #333;">$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2 style="color: var(--primary-dark); border-bottom: 2px solid var(--primary); padding-bottom: 8px;">$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1 style="color: var(--primary-dark);">$1</h1>');

    // 굵은 글씨
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    // 기울임
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

    // 인라인 코드
    html = html.replace(/`([^`]+)`/g, '<code style="background: #f0f0f0; padding: 2px 6px; border-radius: 4px;">$1</code>');

    // 인용문 (> 로 시작하는 줄)
    html = html.replace(/^> (.+)$/gm, '<blockquote style="border-left: 4px solid var(--primary); padding-left: 16px; margin: 16px 0; color: #555;">$1</blockquote>');

    // 수평선
    html = html.replace(/^---$/gm, '<hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;">');

    // 테이블 변환
    html = html.replace(/\|(.+)\|/g, (match) => {
        const cells = match.split('|').filter(c => c.trim());
        if (cells.every(c => c.trim().match(/^[-:]+$/))) {
            return ''; // 구분선 행 제거
        }
        const cellHtml = cells.map(c => `<td style="padding: 8px; border: 1px solid #ddd;">${c.trim()}</td>`).join('');
        return `<tr>${cellHtml}</tr>`;
    });

    // 빈 줄을 기준으로 테이블 감싸기
    html = html.replace(/(<tr>.+<\/tr>\n?)+/g, (match) => {
        return `<table style="width: 100%; border-collapse: collapse; margin: 16px 0;">${match}</table>`;
    });

    // 리스트 변환 (- 로 시작)
    html = html.replace(/^- (.+)$/gm, '<li style="margin-bottom: 8px;">$1</li>');
    html = html.replace(/(<li.+<\/li>\n?)+/g, (match) => {
        return '<ul style="padding-left: 20px; margin: 16px 0;">' + match + '</ul>';
    });

    // 숫자 리스트
    html = html.replace(/^\d+\. (.+)$/gm, '<li style="margin-bottom: 8px;">$1</li>');

    // 단락 (빈 줄로 구분된 텍스트) - 블록 요소만 제외, 인라인 요소는 <p>로 감쌈
    const blockTags = /^<(h[1-6]|ul|ol|li|table|tr|td|th|blockquote|hr|div|pre|p)/;
    html = html.split('\n\n').map(para => {
        if (blockTags.test(para) || para.trim() === '') return para;
        return '<p style="margin: 16px 0; font-size: 13px; line-height: 1.7;">' + para + '</p>';
    }).join('\n');

    return html;
}

function main() {
    console.log('📋 guides.js (Briefings) 생성 시작...\n');

    if (!fs.existsSync(BRIEFINGS_DIR)) {
        console.log(`❌ Briefings 폴더가 없습니다: ${BRIEFINGS_DIR}`);
        return;
    }

    // 모든 MD 파일 찾기 (하위 폴더 포함)
    const mdFiles = findMdFiles(BRIEFINGS_DIR);
    console.log(`📄 발견된 Briefing MD 파일: ${mdFiles.length}개\n`);

    const briefings = {};

    // 상황별 안내문 먼저 추가 (Briefings/Situational 폴더)
    if (fs.existsSync(SITUATIONAL_DIR)) {
        const situationalFiles = fs.readdirSync(SITUATIONAL_DIR).filter(f => f.endsWith('.md'));
        console.log(`📌 상황별 안내문: ${situationalFiles.length}개\n`);

        situationalFiles.forEach(file => {
            const filePath = path.join(SITUATIONAL_DIR, file);
            const mdContent = fs.readFileSync(filePath, 'utf8');
            const htmlContent = mdToHtml(mdContent);
            const fileName = path.basename(file, '.md');
            briefings[fileName] = htmlContent;
            console.log(`✅ Situational: ${file}`);
        });
        console.log('');
    }

    mdFiles.forEach(filePath => {
        const mdContent = fs.readFileSync(filePath, 'utf8');
        const htmlContent = mdToHtml(mdContent);

        // 파일명에서 .md 제거하여 키로 사용
        // 예: P0/P0-1_Briefing.md → P0-1_Briefing
        const fileName = path.basename(filePath, '.md');
        briefings[fileName] = htmlContent;

        // 상대 경로 표시
        const relativePath = path.relative(BRIEFINGS_DIR, filePath);
        console.log(`✅ ${relativePath}`);
    });

    // JavaScript 파일 생성
    const jsContent = `/**
 * Briefings HTML 콘텐츠 (안내문)
 * 자동 생성됨 - 직접 수정하지 마세요
 * 생성 시간: ${new Date().toISOString()}
 *
 * 용도: Project Owner(PO)에게 각 단계 안내
 *
 * 사용법: GUIDE_CONTENTS['P0-1_Briefing']
 *        GUIDE_CONTENTS['S1-1_Briefing']
 */

const GUIDE_CONTENTS = ${JSON.stringify(briefings, null, 2)};
`;

    fs.writeFileSync(OUTPUT_FILE, jsContent, 'utf8');

    console.log('\n' + '─'.repeat(50));
    console.log(`\n✅ guides.js 생성 완료: ${OUTPUT_FILE}`);
    console.log(`📊 총 ${Object.keys(briefings).length}개 Briefings 포함`);
}

main();
