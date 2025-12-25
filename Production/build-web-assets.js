/**
 * build-web-assets.js
 *
 * 웹 배포용 파일 통합 빌드 스크립트
 *
 * 역할:
 * 1. Order Sheet 템플릿 → ordersheets.js 번들링
 * 2. 안내문 HTML → guides.js 번들링
 * 3. PROJECT_SAL_GRID_MANUAL.md → HTML 변환
 * 4. 모든 배포 위치에 복사
 *
 * 사용법:
 *   node Production/build-web-assets.js
 *   node Production/build-web-assets.js --ordersheets   # Order Sheets만
 *   node Production/build-web-assets.js --guides        # Guides만
 *   node Production/build-web-assets.js --manual        # Manual만
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 프로젝트 루트 경로
const PROJECT_ROOT = path.resolve(__dirname, '..');

// 경로 설정
const PATHS = {
    // 소스 폴더 (MD 파일들 위치)
    ordersheetsDir: path.join(PROJECT_ROOT, 'Briefings_OrderSheets/OrderSheet_Templates'),
    guidesDir: path.join(PROJECT_ROOT, 'Briefings_OrderSheets/Briefings'),
    serviceGuidesDir: path.join(PROJECT_ROOT, '부수적_고유기능/콘텐츠/외부_연동_설정_Guide'),

    // Generator 스크립트 경로
    ordersheetsGenerator: path.join(PROJECT_ROOT, 'Briefings_OrderSheets/OrderSheet_Templates/generate-ordersheets-js.js'),
    guidesGenerator: path.join(PROJECT_ROOT, 'Briefings_OrderSheets/Briefings/generate-briefings-js.js'),
    serviceGuidesGenerator: path.join(PROJECT_ROOT, '부수적_고유기능/콘텐츠/외부_연동_설정_Guide/generate-service-guides-js.js'),
    serviceIntroMd: path.join(PROJECT_ROOT, 'P2_프로젝트_기획/Service_Introduction/서비스_소개_모달.md'),
    indexHtml: path.join(PROJECT_ROOT, 'Production/index.html'),
    manualMd: path.join(PROJECT_ROOT, 'S0_Project-SAL-Grid_생성/manual/PROJECT_SAL_GRID_MANUAL.md'),
    builderManualMd: path.join(PROJECT_ROOT, 'P2_프로젝트_기획/Service_Introduction/빌더계정_사용_매뉴얼.md'),

    // 출력 경로
    ordersheetsOutput: path.join(PROJECT_ROOT, 'Production/Frontend/ordersheets.js'),
    guidesOutput: path.join(PROJECT_ROOT, 'Production/Frontend/guides.js'),
    serviceGuidesOutput: path.join(PROJECT_ROOT, 'Production/Frontend/service-guides.js'),
    manualHtml: path.join(PROJECT_ROOT, '참고자료/PROJECT_SAL_GRID_MANUAL.html'),
    builderManualHtml: path.join(PROJECT_ROOT, 'Production/pages/mypage/manual.html'),

    // 복사 대상 경로
    copyTargets: {
        ordersheets: [
            path.join(PROJECT_ROOT, 'Production/ordersheets.js'),
            path.join(PROJECT_ROOT, 'P3_프로토타입_제작/Frontend/Prototype/ordersheets.js')
        ],
        guides: [
            path.join(PROJECT_ROOT, 'Production/guides.js'),
            path.join(PROJECT_ROOT, 'P3_프로토타입_제작/Frontend/Prototype/guides.js')
        ],
        serviceGuides: [
            path.join(PROJECT_ROOT, 'Production/service-guides.js'),
            path.join(PROJECT_ROOT, 'P3_프로토타입_제작/Frontend/Prototype/service-guides.js')
        ]
    }
};

// 콘솔 출력 헬퍼
const log = {
    info: (msg) => console.log(`\x1b[36mℹ️  ${msg}\x1b[0m`),
    success: (msg) => console.log(`\x1b[32m✅ ${msg}\x1b[0m`),
    error: (msg) => console.log(`\x1b[31m❌ ${msg}\x1b[0m`),
    header: (msg) => console.log(`\n\x1b[33m${'='.repeat(50)}\n📦 ${msg}\n${'='.repeat(50)}\x1b[0m\n`)
};

// 파일 복사 함수
function copyFile(src, dest) {
    try {
        fs.copyFileSync(src, dest);
        log.success(`복사됨: ${path.basename(dest)} → ${path.dirname(dest)}`);
        return true;
    } catch (err) {
        log.error(`복사 실패: ${dest} - ${err.message}`);
        return false;
    }
}

// Order Sheets 빌드
function buildOrdersheets() {
    log.header('Order Sheets 빌드');

    try {
        log.info('generate-ordersheets-js.js 실행 중...');
        execSync(`node "${PATHS.ordersheetsGenerator}"`, {
            stdio: 'inherit',
            cwd: path.dirname(PATHS.ordersheetsGenerator)
        });

        // 추가 위치에 복사
        log.info('추가 위치에 복사 중...');
        PATHS.copyTargets.ordersheets.forEach(target => {
            copyFile(PATHS.ordersheetsOutput, target);
        });

        log.success('Order Sheets 빌드 완료!');
        return true;
    } catch (err) {
        log.error(`Order Sheets 빌드 실패: ${err.message}`);
        return false;
    }
}

// Guides 빌드
function buildGuides() {
    log.header('Guides (안내문) 빌드');

    try {
        log.info('generate-guides-js.js 실행 중...');
        execSync(`node "${PATHS.guidesGenerator}"`, {
            stdio: 'inherit',
            cwd: path.dirname(PATHS.guidesGenerator)
        });

        // 추가 위치에 복사
        log.info('추가 위치에 복사 중...');
        PATHS.copyTargets.guides.forEach(target => {
            copyFile(PATHS.guidesOutput, target);
        });

        log.success('Guides 빌드 완료!');
        return true;
    } catch (err) {
        log.error(`Guides 빌드 실패: ${err.message}`);
        return false;
    }
}

// Service Guides (외부 연동 설정 가이드) 빌드
function buildServiceGuides() {
    log.header('Service Guides (외부 연동 설정) 빌드');

    try {
        log.info('generate-service-guides-js.js 실행 중...');
        execSync(`node "${PATHS.serviceGuidesGenerator}"`, {
            stdio: 'inherit',
            cwd: path.dirname(PATHS.serviceGuidesGenerator)
        });

        // 추가 위치에 복사
        log.info('추가 위치에 복사 중...');
        PATHS.copyTargets.serviceGuides.forEach(target => {
            copyFile(PATHS.serviceGuidesOutput, target);
        });

        log.success('Service Guides 빌드 완료!');
        return true;
    } catch (err) {
        log.error(`Service Guides 빌드 실패: ${err.message}`);
        return false;
    }
}

// Service Intro 스타일 상수
const SERVICE_INTRO_STYLES = {
    sectionTitle: 'font-size: 22px; font-weight: 800; color: #1F3563; margin-bottom: 20px; padding-bottom: 12px; border-bottom: 3px solid #F59E0B;',
    subsectionTitle: 'font-size: 18px; font-weight: 700; color: #1F3563; margin: 24px 0 12px 0;',
    paragraph: 'font-size: 15px; margin-bottom: 16px;',
    list: 'font-size: 14px; margin: 0; padding-left: 20px; line-height: 1.8;',
    table: 'width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 14px;',
    tableHeader: 'background: #f8f9fa; padding: 12px; border: 1px solid #dee2e6; font-weight: 600; text-align: left;',
    tableCell: 'padding: 12px; border: 1px solid #dee2e6;'
};

// MD 파싱
function parseServiceIntroMd(content) {
    const parts = content.split(/^---$/m);
    const mainContent = parts.length > 1 ? parts.slice(1).join('---') : content;
    const sections = [];
    const sectionRegex = /^# 섹션 (\d+): (.+)$/gm;
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

// 섹션 → HTML 변환
function convertServiceIntroSection(section) {
    let html = section.content;
    html = html.replace(/^## (\d+-\d+)\. (.+)$/gm, `<h3 style="${SERVICE_INTRO_STYLES.subsectionTitle}">$1. $2</h3>`);
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    // 테이블 변환
    html = html.replace(/\|(.+)\|\n\|[-| ]+\|\n((?:\|.+\|\n?)+)/g, (match, header, rows) => {
        const headerCells = header.split('|').filter(c => c.trim());
        const rowLines = rows.trim().split('\n');
        let tableHtml = `<table style="${SERVICE_INTRO_STYLES.table}"><thead><tr>`;
        headerCells.forEach(cell => tableHtml += `<th style="${SERVICE_INTRO_STYLES.tableHeader}">${cell.trim()}</th>`);
        tableHtml += '</tr></thead><tbody>';
        rowLines.forEach(row => {
            const cells = row.split('|').filter(c => c.trim());
            tableHtml += '<tr>';
            cells.forEach(cell => tableHtml += `<td style="${SERVICE_INTRO_STYLES.tableCell}">${cell.trim()}</td>`);
            tableHtml += '</tr>';
        });
        return tableHtml + '</tbody></table>';
    });

    // 리스트 변환
    html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.+<\/li>\n?)+/g, match => `<ul style="${SERVICE_INTRO_STYLES.list}">${match}</ul>`);

    // 단락 변환
    const lines = html.split('\n');
    let result = '', inParagraph = false;
    for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed === '' || trimmed === '---') {
            if (inParagraph) { result += '</p>'; inParagraph = false; }
            continue;
        }
        if (trimmed.startsWith('<')) {
            if (inParagraph) { result += '</p>'; inParagraph = false; }
            result += trimmed;
            continue;
        }
        if (!inParagraph) { result += `<p style="${SERVICE_INTRO_STYLES.paragraph}">`; inParagraph = true; }
        result += trimmed + ' ';
    }
    if (inParagraph) result += '</p>';
    return result;
}

// 모달 HTML 생성
function generateServiceIntroModalHtml(sections) {
    const tocItems = sections.map(s => `<a href="#section${s.number}" style="color: #495057; text-decoration: none; padding: 4px 0;">${s.number}. ${s.title}</a>`);
    let html = `
                <!-- 목차 -->
                <nav style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 24px 28px; border-radius: 12px; margin-bottom: 40px; border: 1px solid #dee2e6;">
                    <h3 style="font-size: 16px; font-weight: 700; color: #1F3563; margin: 0 0 16px 0;">📑 목차</h3>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px 24px; font-size: 14px;">
                        ${tocItems.join('\n                        ')}
                    </div>
                </nav>
`;
    sections.forEach(section => {
        html += `
                <!-- Section ${section.number}: ${section.title} -->
                <section id="section${section.number}" style="margin-bottom: 48px;">
                    <h2 style="${SERVICE_INTRO_STYLES.sectionTitle}">${section.number}. ${section.title}</h2>
                    ${convertServiceIntroSection(section)}
                </section>
`;
    });
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

// 닫는 태그 찾기
function findMatchingClosingTag(html, startIndex) {
    let depth = 1, i = startIndex;
    while (i < html.length && depth > 0) {
        if (html.slice(i, i + 4) === '<div') depth++;
        else if (html.slice(i, i + 6) === '</div>') { depth--; if (depth === 0) return i; }
        i++;
    }
    return -1;
}

// Service Intro Modal 빌드 (MD → HTML → index.html)
function buildServiceIntro() {
    log.header('Service Intro Modal 빌드');

    try {
        // 파일 존재 확인
        if (!fs.existsSync(PATHS.serviceIntroMd)) {
            log.info('서비스_소개_모달.md 파일 없음 - 건너뜀');
            return true;
        }

        log.info('MD 파일 읽는 중...');
        const mdContent = fs.readFileSync(PATHS.serviceIntroMd, 'utf-8');

        log.info('Markdown 파싱 중...');
        const sections = parseServiceIntroMd(mdContent);
        log.info(`${sections.length}개 섹션 발견`);

        log.info('HTML 생성 중...');
        const modalHtml = generateServiceIntroModalHtml(sections);

        log.info('index.html 업데이트 중...');
        let indexHtml = fs.readFileSync(PATHS.indexHtml, 'utf-8');

        const contentStartMarker = '<div class="grid-fullscreen-content" style="padding: 40px; max-width: 900px; margin: 0 auto; background: white; border-radius: 12px; box-shadow: var(--shadow-sm);">';
        const contentStartIndex = indexHtml.indexOf(contentStartMarker);
        if (contentStartIndex === -1) throw new Error('serviceIntroModal의 content 영역을 찾을 수 없습니다.');

        const lineHeightStart = indexHtml.indexOf('<div style="line-height: 1.9; color: #333;">', contentStartIndex);
        const lineHeightEnd = findMatchingClosingTag(indexHtml, lineHeightStart + 45);
        if (lineHeightStart === -1 || lineHeightEnd === -1) throw new Error('콘텐츠 영역을 찾을 수 없습니다.');

        const before = indexHtml.slice(0, lineHeightStart + 45);
        const after = indexHtml.slice(lineHeightEnd);
        fs.writeFileSync(PATHS.indexHtml, before + '\n' + modalHtml + '\n            ' + after, 'utf-8');

        log.success('Service Intro Modal 빌드 완료!');
        return true;
    } catch (err) {
        log.error(`Service Intro Modal 빌드 실패: ${err.message}`);
        return false;
    }
}

// Manual HTML 변환
function buildManual() {
    log.header('PROJECT_SAL_GRID_MANUAL HTML 변환');

    try {
        // pandoc 존재 확인
        try {
            execSync('pandoc --version', { stdio: 'ignore' });
        } catch {
            log.error('pandoc이 설치되어 있지 않습니다. pandoc을 설치해주세요.');
            return false;
        }

        log.info('pandoc으로 MD → HTML 변환 중...');
        execSync(`pandoc "${PATHS.manualMd}" -o "${PATHS.manualHtml}" --standalone --metadata title="PROJECT SAL GRID MANUAL"`, {
            stdio: 'inherit'
        });

        log.success(`Manual HTML 생성됨: ${PATHS.manualHtml}`);
        return true;
    } catch (err) {
        log.error(`Manual 빌드 실패: ${err.message}`);
        return false;
    }
}

// 빌더 계정 사용 매뉴얼 HTML 변환
function buildBuilderManual() {
    log.header('빌더 계정 사용 매뉴얼 HTML 변환');

    try {
        // 파일 존재 확인
        if (!fs.existsSync(PATHS.builderManualMd)) {
            log.info('빌더계정_사용_매뉴얼.md 파일 없음 - 건너뜀');
            return true;
        }

        // pandoc 존재 확인
        try {
            execSync('pandoc --version', { stdio: 'ignore' });
        } catch {
            log.error('pandoc이 설치되어 있지 않습니다.');
            return false;
        }

        log.info('MD 파일 읽는 중...');

        // pandoc으로 MD → HTML body 변환
        log.info('pandoc으로 MD → HTML 변환 중...');
        const tempHtml = path.join(path.dirname(PATHS.builderManualHtml), 'temp_manual.html');
        execSync(`pandoc "${PATHS.builderManualMd}" -o "${tempHtml}" --standalone`, { stdio: 'inherit' });

        // 변환된 HTML 읽기
        let htmlContent = fs.readFileSync(tempHtml, 'utf-8');
        const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*)<\/body>/i);
        const bodyContent = bodyMatch ? bodyMatch[1] : htmlContent;

        // 스타일이 적용된 HTML 생성
        const styledHtml = `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>빌더 계정 사용 매뉴얼 - SSAL Works</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans KR', sans-serif; background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%); min-height: 100vh; padding: 40px 20px; line-height: 1.8; color: #1f2937; }
        .container { max-width: 900px; margin: 0 auto; }
        header { background: linear-gradient(135deg, #10B981 0%, #059669 100%); border-radius: 20px; padding: 40px; color: white; text-align: center; margin-bottom: 40px; box-shadow: 0 10px 40px rgba(16, 185, 129, 0.3); }
        header h1 { font-size: 2.2rem; font-weight: 700; }
        header p { margin-top: 10px; opacity: 0.9; }
        section { background: white; border-radius: 16px; padding: 35px; margin-bottom: 25px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
        h1, h2 { color: #10B981; border-bottom: 2px solid #10B981; padding-bottom: 10px; margin-bottom: 20px; }
        h3 { color: #059669; margin: 25px 0 15px; }
        p { margin-bottom: 15px; }
        ul, ol { margin: 15px 0 15px 25px; }
        li { margin-bottom: 8px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 0.95rem; }
        th, td { border: 1px solid #e5e7eb; padding: 12px 15px; text-align: left; }
        th { background: #f0fdf4; color: #059669; font-weight: 600; }
        tr:hover { background: #f9fafb; }
        code { background: #f3f4f6; padding: 2px 6px; border-radius: 4px; font-family: 'Consolas', monospace; font-size: 0.9em; }
        blockquote { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px 20px; margin: 20px 0; border-radius: 0 10px 10px 0; }
        a { color: #10B981; }
        footer { text-align: center; padding: 30px; color: #6b7280; font-size: 0.9rem; }
        @media (max-width: 768px) { body { padding: 20px 15px; } header { padding: 30px 20px; } header h1 { font-size: 1.6rem; } section { padding: 25px 20px; } }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>빌더 계정 사용 매뉴얼</h1>
            <p>SSAL Works 플랫폼 완벽 가이드</p>
        </header>
        ${bodyContent}
        <footer>
            <p>&copy; 2025 SSAL Works. All rights reserved.</p>
        </footer>
    </div>
</body>
</html>`;

        fs.writeFileSync(PATHS.builderManualHtml, styledHtml, 'utf-8');
        if (fs.existsSync(tempHtml)) fs.unlinkSync(tempHtml);

        log.success(`빌더 계정 매뉴얼 HTML 생성됨: ${PATHS.builderManualHtml}`);
        return true;
    } catch (err) {
        log.error(`빌더 계정 매뉴얼 빌드 실패: ${err.message}`);
        return false;
    }
}

// 전체 빌드
function buildAll() {
    log.header('웹 배포 파일 전체 빌드 시작');

    const startTime = Date.now();
    const results = {
        ordersheets: buildOrdersheets(),
        guides: buildGuides(),
        serviceGuides: buildServiceGuides(),
        serviceIntro: buildServiceIntro(),
        manual: buildManual(),
        builderManual: buildBuilderManual()
    };

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);

    // 결과 요약
    console.log('\n' + '='.repeat(50));
    console.log('📊 빌드 결과 요약');
    console.log('='.repeat(50));
    console.log(`  Order Sheets:     ${results.ordersheets ? '✅ 성공' : '❌ 실패'}`);
    console.log(`  Guides:           ${results.guides ? '✅ 성공' : '❌ 실패'}`);
    console.log(`  Service Guides:   ${results.serviceGuides ? '✅ 성공' : '❌ 실패'}`);
    console.log(`  Service Intro:    ${results.serviceIntro ? '✅ 성공' : '❌ 실패'}`);
    console.log(`  Manual:           ${results.manual ? '✅ 성공' : '❌ 실패'}`);
    console.log(`  Builder Manual:   ${results.builderManual ? '✅ 성공' : '❌ 실패'}`);
    console.log(`  소요 시간:        ${elapsed}초`);
    console.log('='.repeat(50) + '\n');

    return Object.values(results).every(r => r);
}

// CLI 처리
const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
    console.log(`
웹 배포 파일 빌드 스크립트

사용법:
  node build-web-assets.js [옵션]

옵션:
  --ordersheets      Order Sheet 템플릿만 빌드
  --guides           안내문(Guides)만 빌드
  --service-guides   외부 연동 설정 가이드만 빌드
  --service-intro    서비스 소개 모달만 빌드
  --manual           PROJECT SAL GRID Manual HTML만 빌드
  --builder-manual   빌더 계정 사용 매뉴얼 HTML만 빌드
  --help, -h         도움말 표시

옵션 없이 실행하면 전체 빌드를 수행합니다.
`);
    process.exit(0);
}

// 실행
let success = true;

if (args.length === 0) {
    success = buildAll();
} else {
    if (args.includes('--ordersheets')) {
        success = buildOrdersheets() && success;
    }
    if (args.includes('--guides')) {
        success = buildGuides() && success;
    }
    if (args.includes('--service-guides')) {
        success = buildServiceGuides() && success;
    }
    if (args.includes('--service-intro')) {
        success = buildServiceIntro() && success;
    }
    if (args.includes('--manual')) {
        success = buildManual() && success;
    }
    if (args.includes('--builder-manual')) {
        success = buildBuilderManual() && success;
    }
}

process.exit(success ? 0 : 1);
