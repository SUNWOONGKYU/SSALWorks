const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://zwjmfewyshhwpgwdtrus.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3am1mZXd5c2hod3Bnd2R0cnVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1NzE1NTEsImV4cCI6MjA3OTE0NzU1MX0.AJy34h5VR8QS6WFEcUcBeJJu8I3bBQ6UCk1I84Wb7y4';

async function checkTasks() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  const { data, error } = await supabase
    .from('project_sal_grid')
    .select('task_id, stage, task_status, task_progress')
    .eq('stage', 2)
    .order('task_id');

  if (error) {
    console.error('Error:', error.message);
    return;
  }

  console.log('S2 Tasks:');
  console.table(data);
}

checkTasks();
