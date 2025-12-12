/**
 * MD → HTML 변환 스크립트
 *
 * 학습용_콘텐츠, 매뉴얼 폴더의 모든 .md 파일을 .html로 변환합니다.
 * GitHub Actions에서 자동으로 실행됩니다.
 *
 * 참고: 상황별_안내문은 팝업용이라 별도 HTML로 관리 (이 스크립트 대상 아님)
 */

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

// 변환 대상 폴더 목록
const CONTENT_DIRS = [
    path.join(__dirname, '..', '학습용_콘텐츠'),
    path.join(__dirname, '..', 'Project-SSAL-Grid', 'manual')
];

// HTML 템플릿 (manual.html 스타일 적용)
function createHtmlTemplate(title, content, type = 'learning') {
    let typeLabel, headerBg;

    switch (type) {
        case 'manual':
            typeLabel = 'SSALWorks 매뉴얼';
            headerBg = 'linear-gradient(135deg, #2C4A8A 0%, #1F3563 100%)';
            break;
        case 'guide':
            typeLabel = 'SSALWorks 상황별 안내문';
            headerBg = 'linear-gradient(135deg, #e67e22 0%, #d35400 100%)';
            break;
        default:  // learning
            typeLabel = 'SSALWorks 학습용 콘텐츠';
            headerBg = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }

    return `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - ${typeLabel}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }

        :root {
            --primary: #10B981;
            --secondary: #F59E0B;
            --tertiary: #2C4A8A;
            --tertiary-dark: #1F3563;
            --bg-light: #f8f9fa;
            --border-color: #dee2e6;
            --text-dark: #212529;
            --text-muted: #6c757d;
        }

        body {
            font-family: 'Malgun Gothic', '맑은 고딕', 'Apple SD Gothic Neo', -apple-system, BlinkMacSystemFont, sans-serif;
            font-size: 15px;
            line-height: 1.7;
            color: var(--text-dark);
            background: var(--bg-light);
        }

        /* Header */
        .header {
            background: ${headerBg};
            color: white;
            padding: 20px 40px;
            position: sticky;
            top: 0;
            z-index: 1000;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }
        .header-title { font-size: 20px; font-weight: 700; }
        .close-btn {
            padding: 6px 14px;
            border-radius: 4px;
            border: 1px solid rgba(255,255,255,0.5);
            background: rgba(255,255,255,0.15);
            color: white;
            cursor: pointer;
            font-size: 12px;
            text-decoration: none;
            transition: all 0.2s;
        }
        .close-btn:hover { background: rgba(255,255,255,0.3); border-color: white; }

        /* Main Content */
        .main-content {
            max-width: 900px;
            margin: 0 auto;
            padding: 40px;
            background: white;
            min-height: calc(100vh - 70px);
        }

        /* Markdown Styles */
        .markdown-body h1 {
            font-size: 32px;
            font-weight: 800;
            color: var(--tertiary);
            margin: 40px 0 20px;
            padding-bottom: 16px;
            border-bottom: 3px solid var(--secondary);
        }
        .markdown-body h1:first-child { margin-top: 0; }
        .markdown-body h2 {
            font-size: 26px;
            font-weight: 700;
            color: var(--tertiary);
            margin: 48px 0 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid var(--border-color);
        }
        .markdown-body h3 {
            font-size: 20px;
            font-weight: 700;
            color: var(--tertiary);
            margin: 32px 0 16px;
        }
        .markdown-body h4 {
            font-size: 17px;
            font-weight: 700;
            color: var(--text-dark);
            margin: 24px 0 12px;
        }
        .markdown-body p { margin-bottom: 16px; color: var(--text-dark); }
        .markdown-body blockquote {
            background: linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(217, 119, 6, 0.1) 100%);
            border-left: 4px solid var(--secondary);
            padding: 16px 20px;
            margin: 20px 0;
            border-radius: 0 8px 8px 0;
        }
        .markdown-body blockquote p { margin: 0; font-style: italic; }
        .markdown-body pre {
            background: #2d2d2d;
            color: #f8f8f2;
            padding: 20px;
            border-radius: 8px;
            overflow-x: auto;
            margin: 16px 0;
            font-family: 'Consolas', 'Monaco', monospace;
            font-size: 14px;
            line-height: 1.5;
        }
        .markdown-body code {
            background: #e9ecef;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Consolas', 'Monaco', monospace;
            font-size: 14px;
            color: #e83e8c;
        }
        .markdown-body pre code { background: none; padding: 0; color: inherit; }
        .markdown-body table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            font-size: 14px;
        }
        .markdown-body th, .markdown-body td {
            padding: 12px 16px;
            text-align: left;
            border: 1px solid var(--border-color);
        }
        .markdown-body th { background: #f1f3f5; color: var(--text-dark); font-weight: 600; }
        .markdown-body tr:nth-child(even) { background: #f8f9fa; }
        .markdown-body tr:hover { background: #e9ecef; }
        .markdown-body ul, .markdown-body ol { margin: 16px 0; padding-left: 24px; }
        .markdown-body li { margin-bottom: 8px; }
        .markdown-body hr { border: none; border-top: 2px solid var(--border-color); margin: 40px 0; }
        .markdown-body a { color: var(--tertiary); text-decoration: none; }
        .markdown-body a:hover { text-decoration: underline; }
        .markdown-body img { max-width: 100%; height: auto; border-radius: 8px; margin: 16px 0; }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; }
        ::-webkit-scrollbar-thumb { background: #c1c1c1; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #a1a1a1; }

        /* Print */
        @media print {
            .header { display: none; }
            .main-content { padding: 0; max-width: none; }
        }
    </style>
</head>
<body>
    <header class="header">
        <div class="header-title">${title}</div>
        <a href="javascript:history.back()" class="close-btn">← 뒤로 가기</a>
    </header>
    <main class="main-content">
        <article class="markdown-body">
            ${content}
        </article>
    </main>
</body>
</html>`;
}

// 폴더 내 모든 .md 파일 찾기 (재귀)
function findMdFiles(dir, fileList = []) {
    if (!fs.existsSync(dir)) {
        console.log(`폴더가 존재하지 않습니다: ${dir}`);
        return fileList;
    }

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

// 파일 경로에서 콘텐츠 타입 판별
function getContentType(filePath) {
    if (filePath.includes('Project-SSAL-Grid') && filePath.includes('manual')) {
        return 'manual';
    }
    return 'learning';
}

// 메인 변환 함수
function convertMdToHtml() {
    console.log('📄 MD → HTML 변환 시작...\n');

    let allMdFiles = [];

    // 모든 대상 폴더에서 .md 파일 수집
    CONTENT_DIRS.forEach(dir => {
        const dirName = path.basename(dir);
        console.log(`📁 스캔 중: ${dirName}/`);
        const files = findMdFiles(dir);
        console.log(`   발견: ${files.length}개\n`);
        allMdFiles = allMdFiles.concat(files);
    });

    if (allMdFiles.length === 0) {
        console.log('변환할 .md 파일이 없습니다.');
        return;
    }

    console.log(`총 발견된 .md 파일: ${allMdFiles.length}개\n`);
    console.log('─'.repeat(50) + '\n');

    let converted = 0;
    let failed = 0;

    allMdFiles.forEach(mdPath => {
        try {
            // MD 파일 읽기
            const mdContent = fs.readFileSync(mdPath, 'utf8');

            // 제목 추출 (첫 번째 # 라인)
            const titleMatch = mdContent.match(/^#\s+(.+)$/m);
            const title = titleMatch ? titleMatch[1] : path.basename(mdPath, '.md');

            // 콘텐츠 타입 판별
            const contentType = getContentType(mdPath);

            // MD → HTML 변환
            const htmlContent = marked.parse(mdContent);

            // 전체 HTML 문서 생성
            const fullHtml = createHtmlTemplate(title, htmlContent, contentType);

            // HTML 파일 경로 (.md → .html)
            const htmlPath = mdPath.replace(/\.md$/, '.html');

            // HTML 파일 저장
            fs.writeFileSync(htmlPath, fullHtml, 'utf8');

            const relativePath = mdPath.replace(path.join(__dirname, '..') + path.sep, '');
            console.log(`✅ ${relativePath}`);
            converted++;

        } catch (error) {
            const relativePath = mdPath.replace(path.join(__dirname, '..') + path.sep, '');
            console.log(`❌ ${relativePath}: ${error.message}`);
            failed++;
        }
    });

    console.log('\n' + '─'.repeat(50));
    console.log(`\n📊 변환 완료: ${converted}개 성공, ${failed}개 실패`);
}

// 실행
convertMdToHtml();
