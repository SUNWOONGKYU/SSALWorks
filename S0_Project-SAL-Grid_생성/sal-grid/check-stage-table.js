/**
 * stage_verification 테이블 구조 확인
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
