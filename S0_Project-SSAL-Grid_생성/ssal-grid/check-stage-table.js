/**
 * stage_verification 테이블 구조 확인
 */

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://zwjmfewyshhwpgwdtrus.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3am1mZXd5c2hod3Bnd2R0cnVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1NzE1NTEsImV4cCI6MjA3OTE0NzU1MX0.AJy34h5VR8QS6WFEcUcBeJJu8I3bBQ6UCk1I84Wb7y4';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function checkTable() {
    console.log('📋 stage_verification 테이블 확인...\n');

    // 모든 데이터 조회 시도
    const { data, error } = await supabase
        .from('stage_verification')
        .select('*')
        .limit(5);

    if (error) {
        console.error('❌ 오류:', error.message);
        console.error('상세:', error);
    } else {
        console.log('✅ 테이블 데이터:');
        console.log(JSON.stringify(data, null, 2));

        if (data && data.length > 0) {
            console.log('\n📌 컬럼 목록:');
            console.log(Object.keys(data[0]));
        }
    }
}

checkTable();
