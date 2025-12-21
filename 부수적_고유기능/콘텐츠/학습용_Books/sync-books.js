/**
 * 학습용 Books 동기화 스크립트
 *
 * books-list.json을 읽어서 3개 파일의 CONTENTS를 자동 업데이트합니다.
 *
 * 사용법: node sync-books.js
 */

const fs = require('fs');
const path = require('path');

// 경로 설정
const BOOKS_DIR = __dirname;
const PRODUCTION_DIR = path.join(__dirname, '../../../Production');

const FILES = {
    source: path.join(BOOKS_DIR, 'books-list.json'),
    viewer1: path.join(BOOKS_DIR, 'viewer.html'),
    viewer2: path.join(PRODUCTION_DIR, 'learning-viewer.html'),
    index: path.join(PRODUCTION_DIR, 'index.html')
};

// JSON 읽기
function loadBooksList() {
    const data = fs.readFileSync(FILES.source, 'utf8');
    return JSON.parse(data);
}

// viewer.html용 객체 형식 생성
function generateViewerObject(booksList) {
    const basePath = booksList.basePath;
    let lines = [];

    booksList.categories.forEach((cat, idx) => {
        const comma = idx < booksList.categories.length - 1 ? ',' : '';
        lines.push(`            '${cat.id}': {`);
        lines.push(`                name: '${cat.name}',`);
        lines.push(`                icon: '${cat.icon}',`);
        lines.push(`                description: '${cat.description}',`);
        lines.push(`                files: [`);

        cat.files.forEach((file, fIdx) => {
            const fComma = fIdx < cat.files.length - 1 ? ',' : '';
            const filePath = `${basePath}${cat.folder}/${file.file}`;
            lines.push(`                    { name: '${file.name}', path: '${filePath}' }${fComma}`);
        });

        lines.push(`                ]`);
        lines.push(`            }${comma}`);
    });

    return lines.join('\n');
}

// index.html용 배열 형식 생성
function generateIndexArray(booksList) {
    const basePath = booksList.basePath;
    let items = [];

    booksList.categories.forEach(cat => {
        cat.files.forEach(file => {
            const filePath = `${basePath}${cat.folder}/${file.file}`;
            items.push(`            { category: '${cat.name}', title: '${file.name}', path: '${filePath}' }`);
        });
    });

    return items.join(',\n');
}

// viewer.html 업데이트
function updateViewerFile(filePath, newContent) {
    if (!fs.existsSync(filePath)) {
        console.log(`  ⚠️ 파일 없음: ${filePath}`);
        return false;
    }

    let content = fs.readFileSync(filePath, 'utf8');

    // CONTENTS 객체 교체 (정규식으로 찾기)
    const pattern = /const CONTENTS = \{[\s\S]*?\n        \};/;
    const replacement = `const CONTENTS = {\n${newContent}\n        };`;

    if (pattern.test(content)) {
        content = content.replace(pattern, replacement);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`  ✅ 업데이트: ${path.basename(filePath)}`);
        return true;
    } else {
        console.log(`  ⚠️ CONTENTS 패턴 못 찾음: ${filePath}`);
        return false;
    }
}

// index.html 업데이트 (LEARNING_CONTENTS)
function updateIndexFile(filePath, newContent) {
    if (!fs.existsSync(filePath)) {
        console.log(`  ⚠️ 파일 없음: ${filePath}`);
        return false;
    }

    let content = fs.readFileSync(filePath, 'utf8');

    // LEARNING_CONTENTS 배열 교체
    const pattern = /const LEARNING_CONTENTS = \[[\s\S]*?\n        \];/;
    const replacement = `const LEARNING_CONTENTS = [\n${newContent}\n        ];`;

    if (pattern.test(content)) {
        content = content.replace(pattern, replacement);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`  ✅ 업데이트: ${path.basename(filePath)} (LEARNING_CONTENTS)`);
        return true;
    } else {
        console.log(`  ⚠️ LEARNING_CONTENTS 패턴 못 찾음: ${filePath}`);
        return false;
    }
}

// 메인 실행
function main() {
    console.log('');
    console.log('🔄 학습용 Books 동기화 시작...');
    console.log('');

    // 1. JSON 로드
    console.log('📄 books-list.json 로드...');
    const booksList = loadBooksList();
    const categories = booksList.categories;

    // 통계
    let totalFiles = 0;
    categories.forEach(cat => totalFiles += cat.files.length);
    console.log(`   카테고리: ${categories.length}개`);
    console.log(`   콘텐츠 파일: ${totalFiles}개`);
    console.log('');

    // 2. 콘텐츠 생성
    const viewerContent = generateViewerObject(booksList);
    const indexContent = generateIndexArray(booksList);

    // 3. 파일 업데이트
    console.log('📝 파일 업데이트...');

    updateViewerFile(FILES.viewer1, viewerContent);
    updateViewerFile(FILES.viewer2, viewerContent);
    updateIndexFile(FILES.index, indexContent);

    console.log('');
    console.log('✅ 동기화 완료!');
    console.log('');
}

main();
