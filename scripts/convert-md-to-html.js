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

// HTML 템플릿
function createHtmlTemplate(title, content, type = 'learning') {
    let themeColor, typeLabel;

    switch (type) {
        case 'manual':
            themeColor = '#27ae60';  // 녹색
            typeLabel = 'SSALWorks 매뉴얼';
            break;
        case 'guide':
            themeColor = '#e67e22';  // 주황색
            typeLabel = 'SSALWorks 상황별 안내문';
            break;
        default:  // learning
            themeColor = '#3498db';  // 파란색
            typeLabel = 'SSALWorks 학습용 콘텐츠';
    }

    return `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - ${typeLabel}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.8;
            color: #333;
            background: #f8f9fa;
            padding: 20px;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #2c3e50;
            border-bottom: 3px solid ${themeColor};
            padding-bottom: 10px;
            margin-bottom: 30px;
        }
        h2 {
            color: #34495e;
            margin-top: 30px;
            margin-bottom: 15px;
        }
        h3 {
            color: #7f8c8d;
            margin-top: 25px;
            margin-bottom: 10px;
        }
        p {
            margin-bottom: 15px;
        }
        ul, ol {
            margin-bottom: 15px;
            padding-left: 30px;
        }
        li {
            margin-bottom: 8px;
        }
        code {
            background: #f4f4f4;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Consolas', 'Monaco', monospace;
        }
        pre {
            background: #2d2d2d;
            color: #f8f8f2;
            padding: 20px;
            border-radius: 8px;
            overflow-x: auto;
            margin-bottom: 20px;
        }
        pre code {
            background: none;
            padding: 0;
            color: inherit;
        }
        blockquote {
            border-left: 4px solid ${themeColor};
            padding-left: 20px;
            margin: 20px 0;
            color: #666;
            font-style: italic;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
        }
        th {
            background: ${themeColor};
            color: white;
        }
        tr:nth-child(even) {
            background: #f9f9f9;
        }
        a {
            color: ${themeColor};
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        .back-link {
            display: inline-block;
            margin-bottom: 20px;
            color: #666;
        }
        .type-badge {
            display: inline-block;
            background: ${themeColor};
            color: white;
            padding: 4px 12px;
            border-radius: 4px;
            font-size: 12px;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <a href="javascript:history.back()" class="back-link">← 뒤로 가기</a>
        <span class="type-badge">${typeLabel}</span>
        ${content}
    </div>
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
