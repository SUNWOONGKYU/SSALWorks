/**
 * merge-to-project.js
 *
 * 개별 Task JSON 파일들을 통합 파일로 합치기
 *
 * 입력: data/grid_records/*.json (개별 파일)
 * 출력: data/in_progress/project_sal_grid.json (통합 파일)
 *
 * 사용법: node merge-to-project.js
 */

const fs = require('fs');
const path = require('path');

// 경로 설정
const BASE_DIR = path.join(__dirname, '..');
const GRID_RECORDS_DIR = path.join(BASE_DIR, 'data', 'grid_records');
const OUTPUT_FILE = path.join(BASE_DIR, 'data', 'in_progress', 'project_sal_grid.json');

async function mergeToProject() {
    console.log('📂 개별 파일 → 통합 파일 합치기 시작...\n');

    // 1. grid_records 폴더의 모든 JSON 파일 읽기
    if (!fs.existsSync(GRID_RECORDS_DIR)) {
        console.error('❌ grid_records 폴더를 찾을 수 없습니다:', GRID_RECORDS_DIR);
        process.exit(1);
    }

    const files = fs.readdirSync(GRID_RECORDS_DIR)
        .filter(f => f.endsWith('.json') && !f.startsWith('_'));  // _TEMPLATE.json 제외

    console.log(`📄 발견된 Task 파일: ${files.length}개\n`);

    // 2. 각 파일 읽어서 tasks 배열에 추가
    const tasks = [];

    for (const file of files) {
        const filePath = path.join(GRID_RECORDS_DIR, file);
        try {
            const content = fs.readFileSync(filePath, 'utf-8');
            const task = JSON.parse(content);
            tasks.push(task);
            console.log(`  ✅ ${file} → ${task.task_id}: ${task.task_name}`);
        } catch (err) {
            console.error(`  ❌ ${file} 읽기 실패:`, err.message);
        }
    }

    // 3. Stage, Area, Task ID 순으로 정렬
    tasks.sort((a, b) => {
        if (a.stage !== b.stage) return a.stage - b.stage;
        if (a.area !== b.area) return a.area.localeCompare(b.area);
        return a.task_id.localeCompare(b.task_id);
    });

    // 4. 통합 JSON 생성
    const projectData = {
        project_id: "SSALWORKS",
        project_name: "SSAL Works",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        tasks: tasks
    };

    // 5. 기존 파일이 있으면 created_at 유지
    if (fs.existsSync(OUTPUT_FILE)) {
        try {
            const existing = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf-8'));
            if (existing.created_at) {
                projectData.created_at = existing.created_at;
            }
            if (existing.project_id) {
                projectData.project_id = existing.project_id;
            }
            if (existing.project_name) {
                projectData.project_name = existing.project_name;
            }
        } catch (err) {
            // 기존 파일 읽기 실패해도 계속 진행
        }
    }

    // 6. 파일 저장
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(projectData, null, 2), 'utf-8');

    console.log(`\n✅ 통합 완료!`);
    console.log(`   📁 출력: ${OUTPUT_FILE}`);
    console.log(`   📊 Task 수: ${tasks.length}개`);
}

mergeToProject().catch(err => {
    console.error('❌ 오류 발생:', err);
    process.exit(1);
});
