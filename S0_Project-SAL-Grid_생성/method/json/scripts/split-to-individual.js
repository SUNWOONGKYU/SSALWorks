/**
 * split-to-individual.js
 *
 * 단일 JSON 파일을 Task별 개별 파일로 분리
 *
 * 입력: data/in_progress/project_sal_grid.json (전체)
 * 출력:
 *   - data/tasks/{task_id}.json (개별 파일)
 *   - data/index.json (인덱스)
 */

const fs = require('fs');
const path = require('path');

// 경로 설정
const BASE_DIR = path.join(__dirname, '..');
const SOURCE_FILE = path.join(BASE_DIR, 'data', 'in_progress', 'project_sal_grid.json');
const TASKS_DIR = path.join(BASE_DIR, 'data', 'tasks');
const INDEX_FILE = path.join(BASE_DIR, 'data', 'index.json');

async function splitToIndividual() {
    console.log('📂 개별 파일 분리 시작...\n');

    // 1. 소스 파일 읽기
    if (!fs.existsSync(SOURCE_FILE)) {
        console.error('❌ 소스 파일을 찾을 수 없습니다:', SOURCE_FILE);
        process.exit(1);
    }

    const sourceData = JSON.parse(fs.readFileSync(SOURCE_FILE, 'utf-8'));
    const tasks = sourceData.tasks || [];

    console.log(`📄 소스 파일: ${SOURCE_FILE}`);
    console.log(`📊 총 Task 수: ${tasks.length}개\n`);

    // 2. tasks 폴더 생성
    if (!fs.existsSync(TASKS_DIR)) {
        fs.mkdirSync(TASKS_DIR, { recursive: true });
        console.log(`📁 폴더 생성: ${TASKS_DIR}\n`);
    }

    // 3. 각 Task를 개별 파일로 저장
    const indexEntries = [];

    for (const task of tasks) {
        const taskId = task.task_id;
        const taskFile = path.join(TASKS_DIR, `${taskId}.json`);

        // 개별 Task JSON 저장
        fs.writeFileSync(taskFile, JSON.stringify(task, null, 2), 'utf-8');

        // 인덱스 엔트리 추가 (요약 정보만)
        indexEntries.push({
            task_id: task.task_id,
            task_name: task.task_name,
            stage: task.stage,
            area: task.area,
            task_status: task.task_status,
            task_progress: task.task_progress,
            verification_status: task.verification_status,
            dependencies: task.dependencies
        });

        console.log(`✅ ${taskId}.json 생성`);
    }

    // 4. 인덱스 파일 생성
    const indexData = {
        project_id: sourceData.project_id,
        project_name: sourceData.project_name,
        created_at: sourceData.created_at,
        updated_at: new Date().toISOString(),
        total_tasks: tasks.length,
        tasks: indexEntries
    };

    fs.writeFileSync(INDEX_FILE, JSON.stringify(indexData, null, 2), 'utf-8');

    console.log(`\n📋 인덱스 파일 생성: ${INDEX_FILE}`);
    console.log(`\n✅ 완료! ${tasks.length}개 Task 파일 생성됨`);
    console.log(`\n📂 구조:`);
    console.log(`   data/`);
    console.log(`   ├── index.json (요약 정보)`);
    console.log(`   ├── tasks/`);
    console.log(`   │   ├── S1BI1.json`);
    console.log(`   │   ├── S1BI2.json`);
    console.log(`   │   └── ... (${tasks.length}개)`);
    console.log(`   └── in_progress/`);
    console.log(`       └── project_sal_grid.json (원본, 백업용)`);
}

splitToIndividual().catch(console.error);
