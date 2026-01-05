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
    serviceIntroMd: path.join(PROJECT_ROOT, 'P2_프로젝트_기획/Service_Introduction/서비스_소개.md'),
    indexHtml: path.join(PROJECT_ROOT, 'index.html'),
    manualMd: path.join(PROJECT_ROOT, 'S0_Project-SAL-Grid_생성/manual/PROJECT_SAL_GRID_MANUAL.md'),
    builderManualMd: path.join(PROJECT_ROOT, 'P2_프로젝트_기획/Service_Introduction/빌더용_사용_매뉴얼.md'),

    // 출력 경로 (해당 폴더에 직접 저장)
    ordersheetsOutput: path.join(PROJECT_ROOT, 'Briefings_OrderSheets/OrderSheet_Templates/ordersheets.js'),
    guidesOutput: path.join(PROJECT_ROOT, 'Briefings_OrderSheets/Briefings/guides.js'),
    serviceGuidesOutput: path.join(PROJECT_ROOT, '부수적_고유기능/콘텐츠/외부_연동_설정_Guide/service-guides.js'),
    manualHtml: path.join(PROJECT_ROOT, '참고자료/PROJECT_SAL_GRID_MANUAL.html'),
    builderManualHtml: path.join(PROJECT_ROOT, 'pages/mypage/manual.html'),
    builderManualPdf: path.join(PROJECT_ROOT, 'pages/mypage/manual.pdf'),

    // 복사 대상 경로 (프로토타입용)
    copyTargets: {
        ordersheets: [
            path.join(PROJECT_ROOT, 'P3_프로토타입_제작/Frontend/Prototype/ordersheets.js')
        ],
        guides: [
            path.join(PROJECT_ROOT, 'P3_프로토타입_제작/Frontend/Prototype/guides.js')
        ],
        serviceGuides: [
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

// Service Intro 스타일 상수 (v4.1 - 폰트 크기 균형 조정)
const SERVICE_INTRO_STYLES = {
    sectionTitle: 'font-size: 20px; font-weight: 800; color: #1F3563; margin-bottom: 18px; padding-bottom: 10px; border-bottom: 3px solid #D97706;',
    subsectionTitle: 'font-size: 16px; font-weight: 700; color: #1F3563; margin: 20px 0 10px 0;',
    paragraph: 'font-size: 14px; margin-bottom: 14px; line-height: 1.8;',
    list: 'font-size: 13px; margin: 0; padding-left: 20px; line-height: 1.8;',
    table: 'width: 100%; border-collapse: collapse; margin: 14px 0; font-size: 13px;',
    tableHeader: 'background: #f8f9fa; padding: 10px; border: 1px solid #dee2e6; font-weight: 600; text-align: left;',
    tableCell: 'padding: 10px; border: 1px solid #dee2e6;'
};

// MD 파싱 (v5.0 구조: ## N. 제목 형식 - 10개 섹션 통합 구조)
function parseServiceIntroMd(content) {
    // style 태그와 프론트매터 제거
    let mainContent = content;

    // <style>...</style> 태그 제거
    mainContent = mainContent.replace(/<style[\s\S]*?<\/style>/gi, '');

    // 프론트매터(문서 시작의 ---로 감싸진 YAML 블록) 제거
    // 주의: 문서 내 구분선 ---는 제거하지 않음
    // 프론트매터는 문서 시작에서 ---\nkey: value\n---\n 형식으로만 존재
    // 서비스_소개.md는 style 태그 이후 구분선 ---만 있으므로 프론트매터 없음
    // 따라서 전통적인 YAML 프론트매터만 제거 (문서 시작에서 key: value 패턴이 있는 경우)
    mainContent = mainContent.replace(/^---\n(?:[a-z_-]+:.+\n)+---\n?/im, '');

    // 첫 번째 # 제목 (문서 제목) 제거
    mainContent = mainContent.replace(/^# .+\n+/m, '');

    // > 인용문 (용도, 구조 설명) 제거
    mainContent = mainContent.replace(/^> .+\n?/gm, '');

    const sections = [];

    // "## N. 제목" 형식 인식 (H2 레벨, 숫자.제목)
    const sectionRegex = /^## (\d+)\. (.+)$/gm;
    const matches = [...mainContent.matchAll(sectionRegex)];

    for (let i = 0; i < matches.length; i++) {
        const match = matches[i];
        const nextMatch = matches[i + 1];
        const endIndex = nextMatch ? nextMatch.index : mainContent.length;

        const number = match[1];
        const title = match[2].trim();

        sections.push({
            number: number,
            title: title,
            content: mainContent.slice(match.index + match[0].length, endIndex).trim()
        });
    }

    return sections;
}

// 섹션 → HTML 변환
function convertServiceIntroSection(section) {
    let html = section.content;

    // 1. 코드 블록 변환 (```로 감싸진 블록) - 밝은 배경, 내부 줄바꿈 보존
    html = html.replace(/```([a-z]*)\n?([\s\S]*?)```/g, (match, lang, code) => {
        const escapedCode = code.trim()
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\n/g, '&#10;'); // 줄바꿈을 엔티티로 변환해서 나중에 파싱되지 않도록
        return `<pre style="background: #f8f9fa; color: #1f2937; padding: 16px 20px; border-radius: 8px; margin: 16px 0; font-family: 'Consolas', 'Monaco', monospace; font-size: 13px; overflow-x: auto; white-space: pre; line-height: 1.6; border: 1px solid #e5e7eb;"><code>${escapedCode}</code></pre>`;
    });

    // 2. 인라인 코드 변환 (`code`)
    html = html.replace(/`([^`]+)`/g, '<code style="background: #f1f5f9; color: #0f172a; padding: 2px 6px; border-radius: 4px; font-family: Consolas, Monaco, monospace; font-size: 0.9em;">$1</code>');

    // 3. 헤더 변환 (####, ###, ## 순서로) - 폰트 크기 축소
    html = html.replace(/^#### (.+)$/gm, '<h5 style="font-size: 13px; font-weight: 600; color: #374151; margin: 14px 0 6px 0;">$1</h5>');
    html = html.replace(/^### (.+)$/gm, '<h4 style="font-size: 14px; font-weight: 600; color: #1F3563; margin: 16px 0 8px 0;">$1</h4>');
    html = html.replace(/^## (\d+-\d+)\. (.+)$/gm, `<h3 style="${SERVICE_INTRO_STYLES.subsectionTitle}">$1. $2</h3>`);
    html = html.replace(/^## (.+)$/gm, `<h3 style="${SERVICE_INTRO_STYLES.subsectionTitle}">$1</h3>`);

    // 4. 볼드/이탤릭 변환
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

    // 5. 테이블 변환
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

    // 6. 번호 리스트 변환 (1. 2. 3.)
    html = html.replace(/^(\d+)\. (.+)$/gm, '<li value="$1">$2</li>');
    html = html.replace(/(<li value="\d+">.+<\/li>\n?)+/g, match => `<ol style="${SERVICE_INTRO_STYLES.list}">${match}</ol>`);

    // 7. 불릿 리스트 변환
    html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>(?!value=).+?<\/li>\n?)+/g, match => {
        return `<ul style="${SERVICE_INTRO_STYLES.list}">${match}</ul>`;
    });

    // 8. 구분선 변환
    html = html.replace(/^━+$/gm, '<hr style="border: none; border-top: 2px solid #e5e7eb; margin: 24px 0;">');
    html = html.replace(/^---$/gm, '<hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;">');

    // 9. 단락 변환 (v4.1 - 볼드 단독 줄도 paragraph 스타일 적용)
    const lines = html.split('\n');
    let result = '', inParagraph = false;

    // 블록 요소인지 확인 (p 태그로 감싸면 안 되는 것들)
    const isBlockElement = (line) => {
        const blockTags = ['<h2', '<h3', '<h4', '<h5', '<table', '<thead', '<tbody', '<tr', '<th', '<td',
                          '<ul', '<ol', '<li', '<hr', '<pre', '<nav', '<section', '<details', '<summary'];
        return blockTags.some(tag => line.startsWith(tag) || line.startsWith('</' + tag.slice(1)));
    };

    for (const line of lines) {
        const trimmed = line.trim();

        // 빈 줄이면 단락 닫기
        if (trimmed === '') {
            if (inParagraph) { result += '</p>\n'; inParagraph = false; }
            continue;
        }

        // 블록 요소면 단락 닫고 그대로 추가
        if (isBlockElement(trimmed)) {
            if (inParagraph) { result += '</p>\n'; inParagraph = false; }
            result += trimmed + '\n';
            continue;
        }

        // <strong>만 있는 줄은 paragraph로 감싸서 추가
        if (trimmed.startsWith('<strong>') && trimmed.endsWith('</strong>')) {
            if (inParagraph) { result += '</p>\n'; inParagraph = false; }
            result += `<p style="${SERVICE_INTRO_STYLES.paragraph}">${trimmed}</p>\n`;
            continue;
        }

        // <p>로 시작하는 기존 paragraph면 그대로 추가
        if (trimmed.startsWith('<p ')) {
            if (inParagraph) { result += '</p>\n'; inParagraph = false; }
            result += trimmed + '\n';
            continue;
        }

        // 일반 텍스트는 단락으로 감싸기
        if (!inParagraph) {
            result += `<p style="${SERVICE_INTRO_STYLES.paragraph}">`;
            inParagraph = true;
        } else {
            result += '<br>'; // 단락 내 줄바꿈
        }
        result += trimmed + ' ';
    }
    if (inParagraph) result += '</p>';

    return result;
}

// 모달 HTML 생성
function generateServiceIntroModalHtml(sections) {
    // 개요 (section 0)와 상세 (section 1~12) 분리
    const overviewSection = sections.find(s => s.number === '0');
    const detailSections = sections.filter(s => s.number !== '0' && s.number !== '99');

    let html = `
                <!-- 목차 -->
                <nav style="background: #f8f9fa; padding: 20px 24px; border-radius: 12px; margin-bottom: 32px; border: 1px solid #e9ecef;">
                    <h3 style="font-size: 20px; font-weight: 800; color: #1F3563; margin: 0 0 16px 0;">목차</h3>

                    <div style="font-size: 14px; line-height: 2.2;">
                        <a href="#section0" style="color: #1F3563; text-decoration: none; font-weight: 600;">→ SSAL Works 소개</a><br>
                        <a href="#section1" style="color: #1F3563; text-decoration: none; font-weight: 600;">→ 상세 안내</a>
                        <div style="padding-left: 20px; font-size: 13px; line-height: 1.8; margin-top: 6px;">
                            ${detailSections.map(s => `<a href="#section${s.number}" style="color: #495057; text-decoration: none;">${s.number}. ${s.title}</a>`).join('<br>\n                            ')}
                        </div>
                    </div>
                </nav>
`;
    sections.forEach(section => {
        // 개요(0번)는 번호 없이, 상세(1~10)는 번호 표시
        const sectionHeader = section.number === '0'
            ? section.title
            : `${section.number}. ${section.title}`;
        html += `
                <!-- Section ${section.number}: ${section.title} -->
                <section id="section${section.number}" style="margin-bottom: 48px;">
                    <h2 style="${SERVICE_INTRO_STYLES.sectionTitle}">${sectionHeader}</h2>
                    ${convertServiceIntroSection(section)}
                </section>
`;
    });
    html += `
                <!-- Footer -->
                <div style="text-align: center; padding-top: 28px; border-top: 2px solid #e9ecef;">
                    <div style="display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 10px;">
                        <div style="display: flex; gap: 3px;">
                            <span style="width: 7px; height: 12px; background: linear-gradient(135deg, #D97706 0%, #B45309 100%); border-radius: 40%; transform: rotate(-10deg);"></span>
                            <span style="width: 7px; height: 12px; background: linear-gradient(135deg, #D97706 0%, #B45309 100%); border-radius: 40%;"></span>
                            <span style="width: 7px; height: 12px; background: linear-gradient(135deg, #D97706 0%, #B45309 100%); border-radius: 40%; transform: rotate(10deg);"></span>
                        </div>
                        <span style="font-size: 18px; font-weight: 800; color: #1F3563;">SSAL Works</span>
                    </div>
                    <p style="font-size: 12px; color: #6c757d; margin: 0;">AI와 함께 풀스택 웹사이트를 만드는 곳</p>
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
            log.info('서비스_소개.md 파일 없음 - 건너뜀');
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
            log.info('pandoc 미설치 - 건너뜀 (Vercel 환경에서는 정상)');
            return true;  // pandoc 없으면 건너뛰고 성공 처리
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

// P0~S5 진행률 JSON 생성
function buildProgress() {
    log.header('P0~S5 진행률 JSON 생성');

    try {
        const progressScript = path.join(PROJECT_ROOT, 'Development_Process_Monitor', 'build-progress.js');

        if (!fs.existsSync(progressScript)) {
            log.info('build-progress.js 파일 없음 - 건너뜀');
            return true;
        }

        log.info('build-progress.js 실행 중...');
        execSync(`node "${progressScript}"`, {
            stdio: 'inherit',
            cwd: path.dirname(progressScript)
        });

        log.success('진행률 JSON 생성 완료!');
        return true;
    } catch (err) {
        log.error(`진행률 빌드 실패: ${err.message}`);
        return false;
    }
}

// 빌더 계정 사용 매뉴얼 HTML 변환
function buildBuilderManual() {
    log.header('빌더 계정 사용 매뉴얼 HTML 변환');

    try {
        // 파일 존재 확인
        if (!fs.existsSync(PATHS.builderManualMd)) {
            log.info('빌더용_사용_매뉴얼.md 파일 없음 - 건너뜀');
            return true;
        }

        // pandoc 존재 확인
        try {
            execSync('pandoc --version', { stdio: 'ignore' });
        } catch {
            log.info('pandoc 미설치 - 건너뜀 (Vercel 환경에서는 정상)');
            return true;  // pandoc 없으면 건너뛰고 성공 처리
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

        // 스타일이 적용된 HTML 생성 (디자인 시스템 색상 적용)
        // 디자인 시스템 참조: P2_프로젝트_기획/Design_System/DESIGN_SYSTEM.md
        const styledHtml = `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>빌더 계정 사용 매뉴얼 - SSAL Works</title>
    <style>
        /* ===== 디자인 시스템 색상 (DESIGN_SYSTEM.md 기반) ===== */
        :root {
            /* Primary - Purple (메인 브랜드) */
            --primary: #6B5CCC;
            --primary-dark: #5847B3;
            --primary-light: #8B7FDD;
            --primary-alpha-10: rgba(107, 92, 204, 0.1);

            /* Secondary - Orange (액션 전용) */
            --secondary: #CC785C;
            --secondary-dark: #B35A44;

            /* Tertiary - Teal (상태 & 선택 전용) */
            --tertiary: #20808D;
            --tertiary-dark: #1A6B75;
            --tertiary-light: #4DA8B3;

            /* Status Colors */
            --success: #20808D;
            --success-bg: #d4edda;
            --warning: #ffc107;
            --warning-bg: #fff3cd;
            --warning-text: #856404;
            --danger: #dc3545;
            --info: #0099ff;

            /* Base Colors */
            --text-primary: #212529;
            --text-secondary: #666666;
            --bg-light: #f8f9fa;
            --bg-white: #ffffff;
            --bg-dark: #212529;
            --border-color: #dee2e6;
            --border-light: #e9ecef;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Malgun Gothic', '맑은 고딕', 'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif;
            background: var(--bg-light);
            min-height: 100vh;
            padding: 40px 20px;
            line-height: 1.8;
            color: var(--text-primary);
        }
        .container { max-width: 960px; margin: 0 auto; }

        /* 헤더 - Primary Purple */
        header {
            background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
            border-radius: 20px;
            padding: 50px 40px;
            color: white;
            text-align: center;
            margin-bottom: 40px;
            box-shadow: 0 15px 50px rgba(107, 92, 204, 0.35);
            position: relative;
            overflow: hidden;
        }
        header::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -50%;
            width: 100%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            pointer-events: none;
        }
        header h1 { font-size: 2.4rem; font-weight: 700; color: white; text-shadow: 0 2px 4px rgba(0,0,0,0.1); position: relative; border-bottom: none; }

        /* PDF 다운로드 버튼 */
        .pdf-download-btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: var(--secondary);
            color: white;
            padding: 12px 24px;
            border-radius: 30px;
            font-weight: 600;
            font-size: 0.95rem;
            text-decoration: none;
            margin-top: 20px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(204, 120, 92, 0.4);
            position: relative;
            z-index: 1;
        }
        .pdf-download-btn:hover {
            background: var(--secondary-dark);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(204, 120, 92, 0.5);
            text-decoration: none;
            color: white;
        }
        .pdf-download-btn svg {
            width: 18px;
            height: 18px;
        }

        /* 목차 네비게이션 */
        nav.toc {
            background: var(--bg-white);
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 30px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.06);
            border-left: 4px solid var(--primary);
        }

        /* 섹션 카드 */
        section, .content {
            background: var(--bg-white);
            border-radius: 16px;
            padding: 40px;
            margin-bottom: 25px;
            box-shadow: 0 4px 25px rgba(0,0,0,0.06);
            border: 1px solid var(--border-color);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        section:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 30px rgba(0,0,0,0.1);
        }

        /* 제목 스타일 - Primary Purple */
        h1, h2 {
            color: var(--primary);
            border-bottom: 3px solid var(--primary);
            padding-bottom: 12px;
            margin: 30px 0 20px;
            font-weight: 700;
        }
        h2 { font-size: 1.6rem; }
        h3 {
            color: var(--primary-dark);
            margin: 28px 0 16px;
            font-size: 1.25rem;
            font-weight: 600;
            padding-left: 12px;
            border-left: 4px solid var(--tertiary);
        }
        h4 { color: var(--text-primary); margin: 20px 0 12px; font-weight: 600; }

        p { margin-bottom: 16px; }
        ul, ol { margin: 16px 0 16px 28px; }
        li { margin-bottom: 10px; }

        /* 테이블 - Tertiary Teal 강조 */
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 24px 0;
            font-size: 0.95rem;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }
        th, td {
            border: 1px solid var(--border-color);
            padding: 14px 18px;
            text-align: left;
        }
        th {
            background: linear-gradient(135deg, var(--tertiary) 0%, var(--tertiary-light) 100%);
            color: white;
            font-weight: 600;
            text-transform: uppercase;
            font-size: 0.85rem;
            letter-spacing: 0.5px;
        }
        tr:nth-child(even) { background: var(--bg-light); }
        tr:hover { background: var(--border-light); }

        /* 코드 블록 */
        code {
            background: var(--bg-light);
            padding: 3px 8px;
            border-radius: 6px;
            font-family: 'Consolas', 'Monaco', monospace;
            font-size: 0.9em;
            color: var(--primary-dark);
            border: 1px solid var(--border-color);
        }
        pre {
            background: var(--bg-dark);
            color: var(--bg-light);
            padding: 20px 24px;
            border-radius: 12px;
            overflow-x: auto;
            margin: 20px 0;
            font-family: 'Consolas', 'Monaco', monospace;
            font-size: 0.9rem;
            line-height: 1.6;
            box-shadow: inset 0 2px 10px rgba(0,0,0,0.3);
        }
        pre code {
            background: transparent;
            padding: 0;
            color: var(--bg-light);
            border: none;
        }

        /* 인용 블록 - Warning 스타일 */
        blockquote {
            background: var(--warning-bg);
            border-left: 5px solid var(--warning);
            padding: 18px 24px;
            margin: 24px 0;
            border-radius: 0 12px 12px 0;
            font-style: italic;
            color: var(--warning-text);
        }

        /* 링크 - Secondary Orange */
        a {
            color: var(--secondary);
            text-decoration: none;
            font-weight: 500;
            transition: color 0.2s ease;
        }
        a:hover {
            color: var(--secondary-dark);
            text-decoration: underline;
        }

        /* Strong 강조 */
        strong {
            color: var(--text-primary);
            font-weight: 700;
        }

        /* 구분선 */
        hr {
            border: none;
            height: 2px;
            background: linear-gradient(90deg, transparent, var(--border-color), transparent);
            margin: 40px 0;
        }

        /* 푸터 */
        footer {
            text-align: center;
            padding: 40px 20px;
            color: var(--text-secondary);
            font-size: 0.9rem;
            border-top: 1px solid var(--border-color);
            margin-top: 40px;
        }
        footer p { margin: 0; }

        /* 반응형 */
        @media (max-width: 768px) {
            body { padding: 20px 15px; }
            header { padding: 35px 25px; border-radius: 16px; }
            header h1 { font-size: 1.8rem; }
            section { padding: 28px 22px; }
            table { font-size: 0.85rem; }
            th, td { padding: 10px 12px; }
            pre { padding: 15px 18px; font-size: 0.85rem; }
        }

        /* 프린트 스타일 */
        @media print {
            body { background: white; padding: 20px; }
            header { box-shadow: none; }
            section { box-shadow: none; border: 1px solid var(--border-color); }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>빌더 계정 사용 매뉴얼</h1>
            <a href="/pages/mypage/manual.pdf" download class="pdf-download-btn">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                PDF 다운로드
            </a>
        </header>
        <div class="content">
        ${bodyContent}
        </div>
        <footer>
            <p>&copy; 2025 SSAL Works. All rights reserved.</p>
        </footer>
    </div>
</body>
</html>`;

        fs.writeFileSync(PATHS.builderManualHtml, styledHtml, 'utf-8');
        if (fs.existsSync(tempHtml)) fs.unlinkSync(tempHtml);

        log.success(`빌더 계정 매뉴얼 HTML 생성됨: ${PATHS.builderManualHtml}`);

        // PDF 생성 (puppeteer 사용)
        try {
            log.info('PDF 생성 중...');
            const puppeteer = require('puppeteer');

            // 동기적으로 PDF 생성을 위해 즉시 실행 비동기 함수 사용
            const generatePdf = async () => {
                const browser = await puppeteer.launch({
                    headless: true,
                    args: ['--no-sandbox', '--disable-setuid-sandbox']
                });
                const page = await browser.newPage();

                // HTML 파일을 file:// 프로토콜로 로드
                const fileUrl = 'file:///' + PATHS.builderManualHtml.replace(/\\/g, '/');
                await page.goto(fileUrl, { waitUntil: 'networkidle0' });

                // PDF 생성
                await page.pdf({
                    path: PATHS.builderManualPdf,
                    format: 'A4',
                    margin: {
                        top: '20mm',
                        right: '15mm',
                        bottom: '20mm',
                        left: '15mm'
                    },
                    printBackground: true
                });

                await browser.close();
            };

            // 동기적으로 실행하기 위해 execSync로 별도 스크립트 실행
            const pdfScript = `
                const puppeteer = require('puppeteer');
                (async () => {
                    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
                    const page = await browser.newPage();
                    await page.goto('file:///${PATHS.builderManualHtml.replace(/\\/g, '/')}', { waitUntil: 'networkidle0' });
                    await page.pdf({
                        path: '${PATHS.builderManualPdf.replace(/\\/g, '/')}',
                        format: 'A4',
                        margin: { top: '20mm', right: '15mm', bottom: '20mm', left: '15mm' },
                        printBackground: true
                    });
                    await browser.close();
                    console.log('PDF 생성 완료');
                })();
            `;

            // 임시 스크립트 파일 생성 및 실행
            const tempPdfScript = path.join(path.dirname(PATHS.builderManualHtml), 'temp_pdf_gen.js');
            fs.writeFileSync(tempPdfScript, pdfScript, 'utf-8');
            execSync(`node "${tempPdfScript}"`, { stdio: 'inherit' });
            if (fs.existsSync(tempPdfScript)) fs.unlinkSync(tempPdfScript);

            log.success(`빌더 계정 매뉴얼 PDF 생성됨: ${PATHS.builderManualPdf}`);
        } catch (pdfErr) {
            log.error(`PDF 생성 실패 (HTML은 성공): ${pdfErr.message}`);
        }

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
        builderManual: buildBuilderManual(),
        progress: buildProgress()
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
    console.log(`  Progress:         ${results.progress ? '✅ 성공' : '❌ 실패'}`);
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
  --progress         P0~S5 진행률 JSON만 빌드
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
    if (args.includes('--progress')) {
        success = buildProgress() && success;
    }
}

process.exit(success ? 0 : 1);
