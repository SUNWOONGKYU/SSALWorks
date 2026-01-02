/**
 * create-task.js
 *
 * 새 Task JSON 파일 생성 스크립트
 *
 * 사용법:
 *   node create-task.js S4F99 "Task 이름" F frontend-developer
 *   node create-task.js <task_id> <task_name> <area> <task_agent>
 *
 * 생성 결과:
 *   - data/tasks/{task_id}.json
 *   - index.json 자동 업데이트
 */

const fs = require('fs');
const path = require('path');

// 경로 설정
const BASE_DIR = path.join(__dirname, '..');
const TASKS_DIR = path.join(BASE_DIR, 'data', 'tasks');
const INDEX_FILE = path.join(BASE_DIR, 'data', 'index.json');

// 22개 속성 템플릿
const TASK_TEMPLATE = {
    task_id: '',
    task_name: '',
    stage: 0,
    area: '',
    task_status: 'Pending',
    task_progress: 0,
    verification_status: 'Not Verified',
    dependencies: '',
    task_instruction: '',
    task_agent: '',
    tools: '',
    execution_type: 'AI-Only',
    generated_files: '',
    modification_history: '',
    verification_instruction: '',
    verification_agent: 'code-reviewer',
    test_result: '',
    build_verification: '',
    integration_verification: '',
    blockers: '',
    comprehensive_verification: '',
    remarks: ''
};

// Area → Verification Agent 매핑
const VERIFICATION_AGENT_MAP = {
    'M': 'code-reviewer',
    'U': 'qa-specialist',
    'F': 'code-reviewer',
    'BI': 'code-reviewer',
    'BA': 'code-reviewer',
    'D': 'database-specialist',
    'S': 'security-auditor',
    'T': 'qa-specialist',
    'O': 'code-reviewer',
    'E': 'code-reviewer',
    'C': 'qa-specialist'
};

function parseTaskId(taskId) {
    // S4F99 → stage: 4, area: F
    const match = taskId.match(/^S(\d+)([A-Z]+)\d+$/);
    if (!match) {
        throw new Error(`잘못된 Task ID 형식: ${taskId} (예: S4F99)`);
    }
    return {
        stage: parseInt(match[1]),
        area: match[2]
    };
}

function createTask(taskId, taskName, area, taskAgent) {
    const { stage } = parseTaskId(taskId);

    const task = { ...TASK_TEMPLATE };
    task.task_id = taskId;
    task.task_name = taskName;
    task.stage = stage;
    task.area = area;
    task.task_agent = taskAgent;
    task.verification_agent = VERIFICATION_AGENT_MAP[area] || 'code-reviewer';
    task.task_instruction = `S0_Project-SAL-Grid_생성/sal-grid/task-instructions/${taskId}_instruction.md`;
    task.verification_instruction = `S0_Project-SAL-Grid_생성/sal-grid/verification-instructions/${taskId}_verification.md`;

    return task;
}

function updateIndex(task) {
    let indexData;

    if (fs.existsSync(INDEX_FILE)) {
        indexData = JSON.parse(fs.readFileSync(INDEX_FILE, 'utf-8'));
    } else {
        indexData = {
            project_id: 'SSALWORKS',
            project_name: 'SSAL Works',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            total_tasks: 0,
            tasks: []
        };
    }

    // 중복 체크
    const exists = indexData.tasks.find(t => t.task_id === task.task_id);
    if (exists) {
        console.log(`⚠️  ${task.task_id}는 이미 존재합니다. 덮어씁니다.`);
        indexData.tasks = indexData.tasks.filter(t => t.task_id !== task.task_id);
    }

    // 인덱스 엔트리 추가 (요약 정보만)
    indexData.tasks.push({
        task_id: task.task_id,
        task_name: task.task_name,
        stage: task.stage,
        area: task.area,
        task_status: task.task_status,
        task_progress: task.task_progress,
        verification_status: task.verification_status,
        dependencies: task.dependencies
    });

    // Stage, Area, Task ID 순으로 정렬
    indexData.tasks.sort((a, b) => {
        if (a.stage !== b.stage) return a.stage - b.stage;
        if (a.area !== b.area) return a.area.localeCompare(b.area);
        return a.task_id.localeCompare(b.task_id);
    });

    indexData.total_tasks = indexData.tasks.length;
    indexData.updated_at = new Date().toISOString();

    fs.writeFileSync(INDEX_FILE, JSON.stringify(indexData, null, 2), 'utf-8');
}

function main() {
    const args = process.argv.slice(2);

    if (args.length < 4) {
        console.log(`
사용법: node create-task.js <task_id> <task_name> <area> <task_agent>

예시:
  node create-task.js S4F99 "새로운 기능" F frontend-developer
  node create-task.js S3BA5 "API 엔드포인트" BA backend-developer

Area 코드: M, U, F, BI, BA, D, S, T, O, E, C
Task Agent: frontend-developer, backend-developer, database-specialist,
            security-specialist, devops-troubleshooter, test-engineer,
            documentation-specialist, content-specialist
        `);
        process.exit(1);
    }

    const [taskId, taskName, area, taskAgent] = args;

    console.log(`\n📝 새 Task 생성 중...`);
    console.log(`   Task ID: ${taskId}`);
    console.log(`   Task Name: ${taskName}`);
    console.log(`   Area: ${area}`);
    console.log(`   Task Agent: ${taskAgent}\n`);

    try {
        // Task 생성
        const task = createTask(taskId, taskName, area, taskAgent);

        // 개별 파일 저장
        const taskFile = path.join(TASKS_DIR, `${taskId}.json`);
        fs.writeFileSync(taskFile, JSON.stringify(task, null, 2), 'utf-8');
        console.log(`✅ Task 파일 생성: ${taskFile}`);

        // 인덱스 업데이트
        updateIndex(task);
        console.log(`✅ index.json 업데이트 완료`);

        console.log(`\n📋 다음 단계:`);
        console.log(`   1. Task Instruction 파일 생성:`);
        console.log(`      sal-grid/task-instructions/${taskId}_instruction.md`);
        console.log(`   2. Verification Instruction 파일 생성:`);
        console.log(`      sal-grid/verification-instructions/${taskId}_verification.md`);
        console.log(`   3. (선택) DB 동기화: node sync-to-db.js ${taskId}`);

    } catch (err) {
        console.error(`❌ 오류: ${err.message}`);
        process.exit(1);
    }
}

main();
