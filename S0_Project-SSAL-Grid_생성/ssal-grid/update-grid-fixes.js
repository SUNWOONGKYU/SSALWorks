/**
 * Grid 데이터 수정 스크립트
 * 1. S5O2 삭제
 * 2. S2C1, S3S1 이름은 Grid 기준으로 유지 (Task Plan 수정)
 */

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://zwjmfewyshhwpgwdtrus.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3am1mZXd5c2hod3Bnd2R0cnVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1NzE1NTEsImV4cCI6MjA3OTE0NzU1MX0.AJy34h5VR8QS6WFEcUcBeJJu8I3bBQ6UCk1I84Wb7y4';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function main() {
    console.log('🔧 Grid 데이터 수정 시작...\n');

    // 1. S5O2 삭제
    console.log('1. S5O2 (도메인 연결) 삭제...');
    const { error: deleteError } = await supabase
        .from('ssalworks_tasks')
        .delete()
        .eq('task_id', 'S5O2');

    if (deleteError) {
        console.error('❌ S5O2 삭제 실패:', deleteError.message);
    } else {
        console.log('✅ S5O2 삭제 완료');
    }

    // 2. 삭제 확인
    console.log('\n2. 삭제 확인...');
    const { data: checkData, error: checkError } = await supabase
        .from('ssalworks_tasks')
        .select('task_id, task_name')
        .eq('task_id', 'S5O2');

    if (checkError) {
        console.error('❌ 확인 실패:', checkError.message);
    } else if (checkData.length === 0) {
        console.log('✅ S5O2가 Grid에서 완전히 삭제됨');
    } else {
        console.log('⚠️ S5O2가 아직 존재함:', checkData);
    }

    // 3. 현재 S5 Task 목록 확인
    console.log('\n3. 현재 S5 Task 목록:');
    const { data: s5Data, error: s5Error } = await supabase
        .from('ssalworks_tasks')
        .select('task_id, task_name')
        .eq('stage', 5)
        .order('task_id');

    if (s5Error) {
        console.error('❌ S5 조회 실패:', s5Error.message);
    } else {
        console.log(`S5 Tasks (${s5Data.length}개):`);
        s5Data.forEach(t => console.log(`  - ${t.task_id}: ${t.task_name}`));
    }

    console.log('\n✅ Grid 수정 완료!');
}

main().catch(console.error);
