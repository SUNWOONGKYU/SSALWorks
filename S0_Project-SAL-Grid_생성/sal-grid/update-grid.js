/**
 * SSAL Grid UPDATE 스크립트
 * 용도: Claude Code가 project_ssal_grid 테이블을 UPDATE할 때 사용
 *
 * 사용법:
 * node update-grid.js <task_id> <field=value> [field=value] ...
 *
 * 예시:
 * node update-grid.js S3BA1 task_status=Completed task_progress=100
 * node update-grid.js S3BA1 verification_status=Passed
 */

const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const fs = require('fs');

// .env 파일에서 환경변수 읽기
const envPath = path.join(__dirname, '../../../P3_프로토타입_제작/Database/.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) envVars[match[1].trim()] = match[2].trim();
});

const supabase = createClient(envVars.SUPABASE_URL, envVars.SUPABASE_ANON_KEY);

async function updateGrid(taskId, updates) {
    console.log(`\n📝 Grid UPDATE: ${taskId}`);
    console.log('─'.repeat(50));
    console.log('Updates:', JSON.stringify(updates, null, 2));
    console.log('─'.repeat(50));

    try {
        const { data, error } = await supabase
            .from('project_sal_grid')
            .update(updates)
            .eq('task_id', taskId)
            .select();

        if (error) {
            console.error('❌ UPDATE 실패:', error.message);
            console.error('Error code:', error.code);
            console.error('Details:', error.details);
            return { success: false, error };
        }

        if (data && data.length > 0) {
            console.log('✅ UPDATE 성공!');
            console.log('Updated record:', JSON.stringify(data[0], null, 2));
            return { success: true, data: data[0] };
        } else {
            console.log('⚠️ 업데이트된 레코드 없음 (task_id가 존재하지 않을 수 있음)');
            return { success: false, error: 'No records updated' };
        }
    } catch (err) {
        console.error('❌ 예외 발생:', err.message);
        return { success: false, error: err };
    }
}

async function getTask(taskId) {
    console.log(`\n🔍 Grid SELECT: ${taskId}`);

    try {
        const { data, error } = await supabase
            .from('project_sal_grid')
            .select('*')
            .eq('task_id', taskId)
            .single();

        if (error) {
            console.error('❌ SELECT 실패:', error.message);
            return null;
        }

        console.log('✅ Task found:', JSON.stringify(data, null, 2));
        return data;
    } catch (err) {
        console.error('❌ 예외 발생:', err.message);
        return null;
    }
}

// CLI 실행
async function main() {
    const args = process.argv.slice(2);

    if (args.length < 2) {
        console.log(`
사용법: node update-grid.js <task_id> <field=value> [field=value] ...

예시:
  node update-grid.js S3BA1 task_status=Completed task_progress=100
  node update-grid.js S3BA1 verification_status=Passed
  node update-grid.js S3BA1 generated_files="file1.js,file2.js"

JSON 필드:
  node update-grid.js S3BA1 test='{"unit_test":"✅","integration_test":"✅"}'
`);
        process.exit(1);
    }

    const taskId = args[0];
    const updates = {};

    for (let i = 1; i < args.length; i++) {
        const [key, ...valueParts] = args[i].split('=');
        let value = valueParts.join('='); // '='이 값에 포함된 경우 처리

        // 숫자로 변환 시도
        if (!isNaN(value) && value !== '') {
            value = Number(value);
        }
        // JSON 파싱 시도
        else if (value.startsWith('{') || value.startsWith('[')) {
            try {
                value = JSON.parse(value);
            } catch (e) {
                // JSON 파싱 실패 시 문자열로 유지
            }
        }

        updates[key] = value;
    }

    // 먼저 현재 상태 확인
    await getTask(taskId);

    // UPDATE 실행
    const result = await updateGrid(taskId, updates);

    process.exit(result.success ? 0 : 1);
}

main();
