/**
 * generate-service-intro-html.js
 *
 * 서비스_소개_모달.md → index.html의 serviceIntroModal 콘텐츠 변환
 *
 * 사용법:
 *   node generate-service-intro-html.js
 *
 * 역할:
 *   1. 서비스_소개_모달.md 읽기
 *   2. Markdown → HTML 변환 (스타일 적용)
 *   3. Production/index.html의 serviceIntroModal 내용 교체
 */

const fs = require('fs');
const path = require('path');

// 경로 설정
const PATHS = {
    mdSource: path.join(__dirname, '서비스_소개_모달.md'),
    indexHtml: path.resolve(__dirname, '../../Production/index.html')
};

// 콘솔 출력 헬퍼
const log = {
    info: (msg) => console.log(`\x1b[36mℹ️  ${msg}\x1b[0m`),
    success: (msg) => console.log(`\x1b[32m✅ ${msg}\x1b[0m`),
    error: (msg) => console.log(`\x1b[31m❌ ${msg}\x1b[0m`),
    header: (msg) => console.log(`\n\x1b[33m${'='.repeat(50)}\n📦 ${msg}\n${'='.repeat(50)}\x1b[0m\n`)
};

// 스타일 상수
const STYLES = {
    sectionTitle: 'font-size: 22px; font-weight: 800; color: #1F3563; margin-bottom: 20px; padding-bottom: 12px; border-bottom: 3px solid #F59E0B;',
    subsectionTitle: 'font-size: 18px; font-weight: 700; color: #1F3563; margin: 24px 0 12px 0;',
    paragraph: 'font-size: 15px; margin-bottom: 16px;',
    list: 'font-size: 14px; margin: 0; padding-left: 20px; line-height: 1.8;',
    highlightBox: 'background: linear-gradient(135deg, #1F3563 0%, #2d4a7c 100%); color: white; padding: 24px; border-radius: 12px;',
    infoBox: 'background: #FEF3C7; padding: 20px; border-radius: 8px; border-left: 4px solid #F59E0B;',
    grayBox: 'background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 16px;',
    greenBox: 'background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: white; padding: 20px; border-radius: 12px;',
    table: 'width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 14px;',
    tableHeader: 'background: #f8f9fa; padding: 12px; border: 1px solid #dee2e6; font-weight: 600; text-align: left;',
    tableCell: 'padding: 12px; border: 1px solid #dee2e6;'
};

/**
 * Markdown 파싱
 */
function parseMd(content) {
    // 메타데이터 제거 (첫 번째 --- 이전)
    const parts = content.split(/^---$/m);
    const mainContent = parts.length > 1 ? parts.slice(1).join('---') : content;

    // 섹션으로 분할
    const sections = [];
    const sectionRegex = /^# 섹션 (\d+): (.+)$/gm;
    let lastIndex = 0;
    let match;

    const matches = [...mainContent.matchAll(sectionRegex)];

    for (let i = 0; i < matches.length; i++) {
        const match = matches[i];
        const nextMatch = matches[i + 1];
        const endIndex = nextMatch ? nextMatch.index : mainContent.length;

        sections.push({
            number: match[1],
            title: match[2],
            content: mainContent.slice(match.index + match[0].length, endIndex).trim()
        });
    }

    return sections;
}

/**
 * 섹션 콘텐츠를 HTML로 변환
 */
function convertSectionToHtml(section) {
    let html = section.content;

    // ## 서브섹션 제목
    html = html.replace(/^## (\d+-\d+)\. (.+)$/gm, (match, num, title) => {
        return `<h3 style="${STYLES.subsectionTitle}">${num}. ${title}</h3>`;
    });

    // **굵은 텍스트**
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    // 테이블 변환
    html = html.replace(/\|(.+)\|\n\|[-| ]+\|\n((?:\|.+\|\n?)+)/g, (match, header, rows) => {
        const headerCells = header.split('|').filter(c => c.trim());
        const rowLines = rows.trim().split('\n');

        let tableHtml = `<table style="${STYLES.table}"><thead><tr>`;
        headerCells.forEach(cell => {
            tableHtml += `<th style="${STYLES.tableHeader}">${cell.trim()}</th>`;
        });
        tableHtml += '</tr></thead><tbody>';

        rowLines.forEach(row => {
            const cells = row.split('|').filter(c => c.trim());
            tableHtml += '<tr>';
            cells.forEach(cell => {
                tableHtml += `<td style="${STYLES.tableCell}">${cell.trim()}</td>`;
            });
            tableHtml += '</tr>';
        });

        tableHtml += '</tbody></table>';
        return tableHtml;
    });

    // 리스트 변환
    html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.+<\/li>\n?)+/g, (match) => {
        return `<ul style="${STYLES.list}">${match}</ul>`;
    });

    // 단락 변환 (빈 줄로 구분된 텍스트)
    const lines = html.split('\n');
    let result = '';
    let inParagraph = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        if (line === '' || line === '---') {
            if (inParagraph) {
                result += '</p>';
                inParagraph = false;
            }
            continue;
        }

        // 이미 HTML 태그로 시작하는 경우
        if (line.startsWith('<')) {
            if (inParagraph) {
                result += '</p>';
                inParagraph = false;
            }
            result += line;
            continue;
        }

        // 일반 텍스트
        if (!inParagraph) {
            result += `<p style="${STYLES.paragraph}">`;
            inParagraph = true;
        }
        result += line + ' ';
    }

    if (inParagraph) {
        result += '</p>';
    }

    return result;
}

/**
 * 전체 모달 콘텐츠 HTML 생성
 */
function generateModalHtml(sections) {
    // 목차 생성
    const tocItems = sections.map(s =>
        `<a href="#section${s.number}" style="color: #495057; text-decoration: none; padding: 4px 0;">${s.number}. ${s.title}</a>`
    );

    // 2열 그리드로 배치
    const leftToc = tocItems.filter((_, i) => i % 2 === 0).join('\n                        ');
    const rightToc = tocItems.filter((_, i) => i % 2 === 1).join('\n                        ');

    let html = `
                <!-- 목차 -->
                <nav style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 24px 28px; border-radius: 12px; margin-bottom: 40px; border: 1px solid #dee2e6;">
                    <h3 style="font-size: 16px; font-weight: 700; color: #1F3563; margin: 0 0 16px 0;">📑 목차</h3>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px 24px; font-size: 14px;">
                        ${tocItems.join('\n                        ')}
                    </div>
                </nav>
`;

    // 섹션별 HTML 생성
    sections.forEach(section => {
        const sectionContent = convertSectionToHtml(section);
        html += `
                <!-- Section ${section.number}: ${section.title} -->
                <section id="section${section.number}" style="margin-bottom: 48px;">
                    <h2 style="${STYLES.sectionTitle}">${section.number}. ${section.title}</h2>
                    ${sectionContent}
                </section>
`;
    });

    // Footer
    html += `
                <!-- Footer -->
                <div style="text-align: center; padding-top: 32px; border-top: 2px solid #e9ecef;">
                    <div style="display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 12px;">
                        <div style="display: flex; gap: 3px;">
                            <span style="width: 8px; height: 14px; background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); border-radius: 40%; transform: rotate(-10deg);"></span>
                            <span style="width: 8px; height: 14px; background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); border-radius: 40%;"></span>
                            <span style="width: 8px; height: 14px; background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); border-radius: 40%; transform: rotate(10deg);"></span>
                        </div>
                        <span style="font-size: 20px; font-weight: 800; color: #1F3563;">SSAL Works</span>
                    </div>
                    <p style="font-size: 14px; color: #6c757d; margin: 0;">AI와 함께 풀스택 웹사이트를 만드는 곳</p>
                </div>
`;

    return html;
}

/**
 * index.html의 serviceIntroModal 콘텐츠 교체
 */
function updateIndexHtml(modalContent) {
    let indexHtml = fs.readFileSync(PATHS.indexHtml, 'utf-8');

    // serviceIntroModal 내부 콘텐츠 영역 찾기
    // <div class="grid-fullscreen-content" ... > 와 그 끝 </div> 사이
    const contentStartMarker = '<div class="grid-fullscreen-content" style="padding: 40px; max-width: 900px; margin: 0 auto; background: white; border-radius: 12px; box-shadow: var(--shadow-sm);">';
    const contentStartIndex = indexHtml.indexOf(contentStartMarker);

    if (contentStartIndex === -1) {
        throw new Error('serviceIntroModal의 content 영역을 찾을 수 없습니다.');
    }

    // line-height div 시작 찾기
    const lineHeightStart = indexHtml.indexOf('<div style="line-height: 1.9; color: #333;">', contentStartIndex);
    const lineHeightEnd = findMatchingClosingTag(indexHtml, lineHeightStart + 45);

    if (lineHeightStart === -1 || lineHeightEnd === -1) {
        throw new Error('콘텐츠 영역을 찾을 수 없습니다.');
    }

    // 콘텐츠 교체
    const before = indexHtml.slice(0, lineHeightStart + 45);
    const after = indexHtml.slice(lineHeightEnd);

    const newHtml = before + '\n' + modalContent + '\n            ' + after;

    fs.writeFileSync(PATHS.indexHtml, newHtml, 'utf-8');
    log.success('index.html 업데이트 완료');
}

/**
 * 매칭되는 닫는 태그 찾기
 */
function findMatchingClosingTag(html, startIndex) {
    let depth = 1;
    let i = startIndex;

    while (i < html.length && depth > 0) {
        if (html.slice(i, i + 4) === '<div') {
            depth++;
        } else if (html.slice(i, i + 6) === '</div>') {
            depth--;
            if (depth === 0) return i;
        }
        i++;
    }

    return -1;
}

/**
 * 메인 실행
 */
function main() {
    log.header('서비스 소개 모달 빌드');

    try {
        // 1. MD 파일 읽기
        log.info('MD 파일 읽는 중...');
        const mdContent = fs.readFileSync(PATHS.mdSource, 'utf-8');

        // 2. 파싱
        log.info('Markdown 파싱 중...');
        const sections = parseMd(mdContent);
        log.info(`${sections.length}개 섹션 발견`);

        // 3. HTML 생성
        log.info('HTML 생성 중...');
        const modalHtml = generateModalHtml(sections);

        // 4. index.html 업데이트
        log.info('index.html 업데이트 중...');
        updateIndexHtml(modalHtml);

        log.success('서비스 소개 모달 빌드 완료!');

    } catch (err) {
        log.error(`빌드 실패: ${err.message}`);
        console.error(err);
        process.exit(1);
    }
}

main();
