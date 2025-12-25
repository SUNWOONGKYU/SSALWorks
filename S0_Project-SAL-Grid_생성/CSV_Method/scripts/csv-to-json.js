/**
 * CSV → JSON 변환 스크립트
 *
 * 용도: sal_grid.csv → project_sal_grid.json 변환
 * 대상: CSV 파일을 JSON으로 변환하여 편집하고 싶은 사용자
 *
 * 사용법:
 *   node csv-to-json.js
 *   node csv-to-json.js --input ../../Production/data/sal_grid.csv --output ../data/project_sal_grid.json
 */

const fs = require('fs');
const path = require('path');

// 기본 경로
const DEFAULT_INPUT = path.join(__dirname, '../../../Production/data/sal_grid.csv');
const DEFAULT_OUTPUT = path.join(__dirname, '../data/project_sal_grid.json');

/**
 * CSV 파싱 (간단한 파서)
 */
function parseCSV(csvContent) {
    const lines = csvContent.split('\n').filter(line => line.trim());
    if (lines.length === 0) return [];

    const headers = parseCSVLine(lines[0]);
    const rows = [];

    for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i]);
        const row = {};

        headers.forEach((header, index) => {
            let value = values[index] || '';

            // 숫자 변환
            if (header === 'stage' || header === 'task_progress') {
                value = parseInt(value) || 0;
            }

            // JSON 객체 파싱 시도
            if (value.startsWith('{') || value.startsWith('[')) {
                try {
                    value = JSON.parse(value);
                } catch (e) {
                    // 파싱 실패 시 문자열 유지
                }
            }

            row[header] = value;
        });

        rows.push(row);
    }

    return rows;
}

/**
 * CSV 라인 파싱 (따옴표 처리)
 */
function parseCSVLine(line) {
    const values = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const nextChar = line[i + 1];

        if (char === '"' && !inQuotes) {
            inQuotes = true;
        } else if (char === '"' && inQuotes) {
            if (nextChar === '"') {
                current += '"';
                i++; // 이스케이프된 따옴표 건너뛰기
            } else {
                inQuotes = false;
            }
        } else if (char === ',' && !inQuotes) {
            values.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }

    values.push(current.trim());
    return values;
}

/**
 * 메인 실행
 */
function main() {
    // 명령줄 인자 파싱
    const args = process.argv.slice(2);
    let inputPath = DEFAULT_INPUT;
    let outputPath = DEFAULT_OUTPUT;
    let projectName = 'My Project';
    let projectId = 'PROJECT-001';

    for (let i = 0; i < args.length; i++) {
        if (args[i] === '--input' && args[i + 1]) {
            inputPath = path.resolve(args[i + 1]);
            i++;
        } else if (args[i] === '--output' && args[i + 1]) {
            outputPath = path.resolve(args[i + 1]);
            i++;
        } else if (args[i] === '--name' && args[i + 1]) {
            projectName = args[i + 1];
            i++;
        } else if (args[i] === '--id' && args[i + 1]) {
            projectId = args[i + 1];
            i++;
        }
    }

    console.log('📋 CSV → JSON 변환 시작...\n');
    console.log(`📁 입력: ${inputPath}`);
    console.log(`📁 출력: ${outputPath}\n`);

    // CSV 파일 읽기
    if (!fs.existsSync(inputPath)) {
        console.error(`❌ 입력 파일을 찾을 수 없습니다: ${inputPath}`);
        process.exit(1);
    }

    const csvContent = fs.readFileSync(inputPath, 'utf-8');
    const tasks = parseCSV(csvContent);

    // JSON 구조 생성
    const jsonData = {
        metadata: {
            project_name: projectName,
            project_id: projectId,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            version: '1.0'
        },
        tasks: tasks,
        stage_gates: {
            S1: { status: 'Pending', verified_at: null },
            S2: { status: 'Pending', verified_at: null },
            S3: { status: 'Pending', verified_at: null },
            S4: { status: 'Pending', verified_at: null },
            S5: { status: 'Pending', verified_at: null }
        }
    };

    // Stage Gate 상태 자동 계산
    const stageCompletion = {};
    tasks.forEach(task => {
        const stage = `S${task.stage}`;
        if (!stageCompletion[stage]) {
            stageCompletion[stage] = { total: 0, completed: 0 };
        }
        stageCompletion[stage].total++;
        if (task.task_status === 'Completed') {
            stageCompletion[stage].completed++;
        }
    });

    Object.keys(stageCompletion).forEach(stage => {
        const { total, completed } = stageCompletion[stage];
        if (total > 0 && completed === total) {
            jsonData.stage_gates[stage] = {
                status: 'Completed',
                verified_at: new Date().toISOString()
            };
        }
    });

    // 출력 디렉토리 생성
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // JSON 파일 저장
    fs.writeFileSync(outputPath, JSON.stringify(jsonData, null, 2), 'utf-8');

    console.log(`✅ JSON 변환 완료!`);
    console.log(`📊 총 ${tasks.length}개 Task 포함`);
    console.log(`📁 프로젝트명: ${projectName}`);
}

main();
