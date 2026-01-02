/**
 * JSON to CSV 변환 스크립트
 *
 * 용도: project_sal_grid.json → sal_grid.csv 변환
 * 위치: S0_Project-SAL-Grid_생성/CSV_Method/scripts/
 *
 * 사용법:
 *   node json-to-csv.js                           # 기본: in_progress 폴더
 *   node json-to-csv.js --user=사용자이메일        # 특정 사용자 폴더
 */

const fs = require('fs');
const path = require('path');

// CSV에 포함할 필드 (22개 속성)
const CSV_FIELDS = [
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
    'tools',
    'execution_type',
    'generated_files',
    'modification_history',
    'verification_instruction',
    'verification_agent',
    'test_result',
    'build_verification',
    'integration_verification',
    'blockers',
    'comprehensive_verification',
    'remarks'
];

// JSON 값을 CSV 셀로 변환
function escapeCSV(value) {
    if (value === null || value === undefined) {
        return '';
    }

    // 객체나 배열은 JSON 문자열로 변환
    if (typeof value === 'object') {
        value = JSON.stringify(value);
    }

    // 문자열로 변환
    value = String(value);

    // 쉼표, 줄바꿈, 따옴표가 있으면 따옴표로 감싸기
    if (value.includes(',') || value.includes('\n') || value.includes('"')) {
        value = '"' + value.replace(/"/g, '""') + '"';
    }

    return value;
}

// JSON을 CSV로 변환
function convertToCSV(tasks) {
    // 헤더 행
    const header = CSV_FIELDS.join(',');

    // 데이터 행
    const rows = tasks.map(task => {
        return CSV_FIELDS.map(field => escapeCSV(task[field])).join(',');
    });

    return header + '\n' + rows.join('\n');
}

// 메인 함수
function main() {
    const args = process.argv.slice(2);

    // 사용자 인자 파싱
    let userEmail = null;
    args.forEach(arg => {
        if (arg.startsWith('--user=')) {
            userEmail = arg.substring(7);
        }
    });

    // 경로 결정
    const baseDir = path.join(__dirname, '..');
    let jsonDir, csvDir;

    if (userEmail) {
        jsonDir = path.join(baseDir, 'data', 'users', userEmail);
        csvDir = jsonDir;
    } else {
        jsonDir = path.join(baseDir, 'data', 'in_progress');
        csvDir = jsonDir;
    }

    const jsonPath = path.join(jsonDir, 'project_sal_grid.json');
    const csvPath = path.join(csvDir, 'sal_grid.csv');

    // JSON 파일 확인
    if (!fs.existsSync(jsonPath)) {
        console.error(`JSON 파일을 찾을 수 없습니다: ${jsonPath}`);
        process.exit(1);
    }

    // JSON 읽기
    console.log(`JSON 파일 읽기: ${jsonPath}`);
    const jsonContent = fs.readFileSync(jsonPath, 'utf-8');
    const jsonData = JSON.parse(jsonContent);
    const tasks = jsonData.tasks || [];

    console.log(`Task 수: ${tasks.length}`);

    // CSV 변환
    const csvContent = convertToCSV(tasks);

    // CSV 저장
    fs.writeFileSync(csvPath, csvContent, 'utf-8');
    console.log(`CSV 파일 저장 완료: ${csvPath}`);

    console.log('\n변환 완료!');
}

main();
