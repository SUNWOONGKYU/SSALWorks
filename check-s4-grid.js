const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  'https://gqkziovmisijqhnpqqtr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdxa3ppb3ZtaXNpanFobnBxcXRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI1MTI0NzUsImV4cCI6MjA0ODA4ODQ3NX0.YGIKRO1lY4vd3Ym1TfCr7T7P5s7RWdpFBnNjabaLgkI'
);

async function checkS4Tasks() {
  const { data, error } = await supabase
    .from('tasks')
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
