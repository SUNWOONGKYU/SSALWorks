/**
 * create-dev-package-template.js
 *
 * Dev Package 템플릿 zip 파일 생성 스크립트
 * Project_Dev_Package 폴더를 zip으로 압축하여 assets/dev-package/에 저장
 *
 * 사용법: node scripts/create-dev-package-template.js
 */

const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// 경로 설정
const SOURCE_DIR = path.join(__dirname, '..', '공개_전환_업무', 'Project_Dev_Package');
const OUTPUT_DIR = path.join(__dirname, '..', 'assets', 'dev-package');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'Project_Dev_Package_Template.zip');

// 제외할 파일/폴더 목록 (프로젝트별로 동적 생성되는 것들)
const EXCLUDE_PATTERNS = [
    '.ssal-project.json',  // 프로젝트별 ID
    '.env',                 // 환경변수 (프로젝트별 설정)
    'node_modules',         // npm 모듈
    '.git',                 // Git 폴더
    '.DS_Store',            // macOS
    'Thumbs.db'             // Windows
];

async function createZip() {
    console.log('📦 Dev Package 템플릿 zip 생성 시작...\n');

    // 소스 폴더 확인
    if (!fs.existsSync(SOURCE_DIR)) {
        console.error(`❌ 소스 폴더를 찾을 수 없습니다: ${SOURCE_DIR}`);
        process.exit(1);
    }

    // 출력 폴더 생성
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
        console.log(`📁 출력 폴더 생성: ${OUTPUT_DIR}`);
    }

    // 기존 파일 삭제
    if (fs.existsSync(OUTPUT_FILE)) {
        fs.unlinkSync(OUTPUT_FILE);
        console.log('🗑️  기존 zip 파일 삭제');
    }

    // zip 파일 생성
    const output = fs.createWriteStream(OUTPUT_FILE);
    const archive = archiver('zip', {
        zlib: { level: 9 }  // 최대 압축
    });

    return new Promise((resolve, reject) => {
        output.on('close', () => {
            const sizeKB = (archive.pointer() / 1024).toFixed(2);
            console.log(`\n✅ zip 파일 생성 완료!`);
            console.log(`   📄 파일: ${OUTPUT_FILE}`);
            console.log(`   📊 크기: ${sizeKB} KB`);
            resolve();
        });

        archive.on('error', (err) => {
            console.error('❌ zip 생성 오류:', err);
            reject(err);
        });

        archive.pipe(output);

        // 폴더 내용 추가 (제외 패턴 적용)
        archive.glob('**/*', {
            cwd: SOURCE_DIR,
            ignore: EXCLUDE_PATTERNS,
            dot: true  // .claude 같은 dotfile 포함
        });

        archive.finalize();
    });
}

// 실행
createZip().catch(err => {
    console.error('오류 발생:', err);
    process.exit(1);
});
