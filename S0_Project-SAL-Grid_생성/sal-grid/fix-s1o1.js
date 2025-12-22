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

async function main() {
    console.log('🔧 S1O1 Grid 데이터 수정...\n');

    // S1O1 task_name 업데이트
    const { data, error } = await supabase
        .from('project_sal_grid')
        .update({ task_name: 'DNS 설정 및 도메인 연결' })
        .eq('task_id', 'S1O1')
        .select();

    if (error) {
        console.error('❌ 수정 실패:', error.message);
    } else {
        console.log('✅ S1O1 수정 완료');
        console.log('   변경: "DNS 설정" → "DNS 설정 및 도메인 연결"');
    }
}

main().catch(console.error);
