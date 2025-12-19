const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://zwjmfewyshhwpgwdtrus.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3am1mZXd5c2hod3Bnd2R0cnVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1NzE1NTEsImV4cCI6MjA3OTE0NzU1MX0.AJy34h5VR8QS6WFEcUcBeJJu8I3bBQ6UCk1I84Wb7y4';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function main() {
    console.log('🔧 S1O1 Grid 데이터 수정...\n');

    // S1O1 task_name 업데이트
    const { data, error } = await supabase
        .from('ssalworks_tasks')
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
