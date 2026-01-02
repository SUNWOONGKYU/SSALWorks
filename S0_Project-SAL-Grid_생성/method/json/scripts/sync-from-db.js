/**
 * DB → JSON 동기화 스크립트
 *
 * DB Method의 데이터를 CSV Method의 JSON으로 복사
 * 주의: 이 스크립트는 SSAL Works 내부용 (DB + CSV 둘 다 사용)
 *
 * 사용법: node sync-from-db.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Supabase 설정
const SUPABASE_URL = 'https://zwjmfewyshhwpgwdtrus.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3am1mZXd5c2hod3Bnd2R0cnVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1NzE1NTEsImV4cCI6MjA3OTE0NzU1MX0.AJy34h5VR8QS6WFEcUcBeJJu8I3bBQ6UCk1I84Wb7y4';

// JSON에 포함할 필드 (22개 Grid 속성)
const GRID_FIELDS = [
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

// DB 필드명 → JSON 필드명 매핑
const FIELD_MAP = {
    'test': 'test_result',
    'build': 'build_verification'
};

function fetchFromDB() {
    return new Promise((resolve, reject) => {
        const url = `${SUPABASE_URL}/rest/v1/project_sal_grid?select=*&order=stage,area,task_id`;

        const options = {
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
            }
        };

        https.get(url, options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const tasks = JSON.parse(data);
                    resolve(tasks);
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

function transformTask(dbTask) {
    const jsonTask = {};

    GRID_FIELDS.forEach(field => {
        // DB 필드명이 다른 경우 매핑
        let dbField = field;
        Object.entries(FIELD_MAP).forEach(([db, json]) => {
            if (json === field) dbField = db;
        });

        const value = dbTask[dbField];

        if (value !== null && value !== undefined) {
            jsonTask[field] = value;
        }
    });

    return jsonTask;
}

async function main() {
    console.log('📥 DB에서 데이터 가져오는 중...');

    try {
        const dbTasks = await fetchFromDB();
        console.log(`✅ ${dbTasks.length}개 Task 로드 완료`);

        // 변환
        const jsonTasks = dbTasks.map(transformTask);

        // JSON 구조 생성
        const jsonData = {
            project_id: 'SSALWORKS',
            project_name: 'SSAL Works',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            tasks: jsonTasks
        };

        // 저장
        const outputPath = path.join(__dirname, '..', 'data', 'in_progress', 'project_sal_grid.json');
        fs.writeFileSync(outputPath, JSON.stringify(jsonData, null, 2), 'utf-8');
        console.log(`✅ JSON 저장 완료: ${outputPath}`);

        // 속성 개수 확인
        if (jsonTasks.length > 0) {
            const sampleTask = jsonTasks[0];
            const fieldCount = Object.keys(sampleTask).length;
            console.log(`📊 Task당 속성 수: ${fieldCount}개`);
            console.log(`📋 포함된 속성: ${Object.keys(sampleTask).join(', ')}`);
        }

    } catch (err) {
        console.error('❌ 오류:', err.message);
        process.exit(1);
    }
}

main();
