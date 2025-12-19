/**
 * Task Results JSON → Supabase 동기화 스크립트
 *
 * 실행 방법:
 * 1. npm install @supabase/supabase-js
 * 2. node sync_task_results_to_db.js
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const SUPABASE_URL = 'https://zwjmfewyshhwpgwdtrus.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3am1mZXd5c2hod3Bnd2R0cnVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1NzE1NTEsImV4cCI6MjA3OTE0NzU1MX0.AJy34h5VR8QS6WFEcUcBeJJu8I3bBQ6UCk1I84Wb7y4';

const RESULTS_DIR = path.join(__dirname, '../ssal-grid/task-results');

async function syncToSupabase() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  const files = fs.readdirSync(RESULTS_DIR).filter(f => f.endsWith('_result.json'));

  console.log(`Found ${files.length} task result files`);

  for (const file of files) {
    const filePath = path.join(RESULTS_DIR, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const updateData = {
      task_progress: data.task_progress,
      task_status: data.task_status,
      generated_files: Array.isArray(data.generated_files)
        ? data.generated_files.join(', ')
        : data.generated_files,
      modification_history: data.modification_history,
      test: data.test,
      build: data.build,
      integration_verification: data.integration_verification,
      blockers: data.blockers,
      comprehensive_verification: typeof data.comprehensive_verification === 'object'
        ? Object.entries(data.comprehensive_verification).map(([k, v]) => `[${k}] ${v}`).join('\n')
        : data.comprehensive_verification,
      verification_status: data.verification_status,
      remarks: data.remarks
    };

    const { error } = await supabase
      .from('ssalworks_tasks')
      .update(updateData)
      .eq('task_id', data.task_id);

    if (error) {
      console.error(`❌ ${data.task_id}: ${error.message}`);
    } else {
      console.log(`✅ ${data.task_id}: Updated`);
    }
  }

  console.log('Sync completed!');
}

syncToSupabase().catch(console.error);
