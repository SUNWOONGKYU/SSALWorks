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

const supabase = createClient(
  envVars.SUPABASE_URL,
  envVars.SUPABASE_ANON_KEY
);

async function checkS4Tasks() {
  const { data, error } = await supabase
    .from('project_sal_grid')
    .select('task_id, task_name, task_status, verification_status, task_progress, generated_files, test, build, integration_verification, blockers, comprehensive_verification')
    .like('task_id', 'S4%')
    .order('task_id');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('=== S4 Stage Tasks 현재 상태 ===\n');
  data.forEach(t => {
    const missing = [];
    if (!t.generated_files) missing.push('generated_files');
    if (!t.test) missing.push('test');
    if (!t.build) missing.push('build');
    if (!t.integration_verification) missing.push('integration_verification');
    if (!t.blockers) missing.push('blockers');
    if (!t.comprehensive_verification) missing.push('comprehensive_verification');

    const status = t.task_status || 'null';
    const vStatus = t.verification_status || 'null';

    console.log(`${t.task_id} | status: ${status} | v_status: ${vStatus}`);
    if (missing.length > 0) {
      console.log(`  → 누락 필드: ${missing.join(', ')}`);
    }
  });
}

checkS4Tasks();
