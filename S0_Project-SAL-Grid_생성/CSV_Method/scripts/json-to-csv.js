/**
 * JSON → CSV 변환 스크립트
 *
 * 용도: project_sal_grid.json → sal_grid.csv 변환
 * 대상: Supabase 없이 로컬에서 SAL Grid 관리하는 사용자
 *
 * 사용법:
 *   node json-to-csv.js
 *   node json-to-csv.js --input ../data/project_sal_grid.json --output ../../Production/data/sal_grid.csv
 */

const fs = require('fs');
const path = require('path');

// 기본 경로
const DEFAULT_INPUT = path.join(__dirname, '../data/project_sal_grid.json');
const DEFAULT_OUTPUT = path.join(__dirname, '../../../Production/data/sal_grid.csv');

// CSV 헤더 (22개 속성)
const CSV_HEADERS = [
    'task_id',
    'task_name',
    'stage',
    'area',
    'task_status',
    'task_progress',
    'verification_status',
    'dependencies',
    'task_instruction',
    'task_agent',
    'verification_instruction',
    'verification_agent',
    'execution_type',
    'generated_files',
    'duration',
    'build_result',
    'test_result',
    'build_verification',
    'integration_verification',
    'blockers',
    'comprehensive_verification',
    'ai_verification_note'
];

/**
 * CSV 이스케이프 처리
 */
function escapeCSV(value) {
    if (value === null || value === undefined) return '';

    const str = String(value);

    // JSON 객체인 경우 문자열로 변환
    if (typeof value === 'object') {
        return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
    }

    // 쉼표, 줄바꿈, 따옴표가 포함된 경우 이스케이프
    if (str.includes(',') || str.includes('\n') || str.includes('"')) {
        return `"${str.replace(/"/g, '""')}"`;
    }

    return str;
}

/**
 * JSON → CSV 변환
 */
function jsonToCSV(jsonData) {
    const tasks = jsonData.tasks || [];

    // 헤더 행
    const headerRow = CSV_HEADERS.join(',');

    // 데이터 행
    const dataRows = tasks.map(task => {
        return CSV_HEADERS.map(header => escapeCSV(task[header])).join(',');
    });

    return [headerRow, ...dataRows].join('\n');
}

/**
 * 메인 실행
 */
function main() {
    // 명령줄 인자 파싱
    const args = process.argv.slice(2);
    let inputPath = DEFAULT_INPUT;
    let outputPath = DEFAULT_OUTPUT;

    for (let i = 0; i < args.length; i++) {
        if (args[i] === '--input' && args[i + 1]) {
            inputPath = path.resolve(args[i + 1]);
            i++;
        } else if (args[i] === '--output' && args[i + 1]) {
            outputPath = path.resolve(args[i + 1]);
            i++;
        }
    }

    console.log('📋 JSON → CSV 변환 시작...\n');
    console.log(`📁 입력: ${inputPath}`);
    console.log(`📁 출력: ${outputPath}\n`);

    // JSON 파일 읽기
    if (!fs.existsSync(inputPath)) {
        console.error(`❌ 입력 파일을 찾을 수 없습니다: ${inputPath}`);
        process.exit(1);
    }

    const jsonContent = fs.readFileSync(inputPath, 'utf-8');
    const jsonData = JSON.parse(jsonContent);

    // 변환
    const csvContent = jsonToCSV(jsonData);

    // 출력 디렉토리 생성
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // CSV 파일 저장
    fs.writeFileSync(outputPath, csvContent, 'utf-8');

    console.log(`✅ CSV 변환 완료!`);
    console.log(`📊 총 ${jsonData.tasks?.length || 0}개 Task 포함`);
}

main();
