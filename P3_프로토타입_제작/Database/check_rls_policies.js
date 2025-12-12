// ================================================
// RLS 정책 확인
// ================================================

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

async function checkRLSPolicies() {
    console.log('');
    console.log('═'.repeat(80));
    console.log('  notices 테이블 RLS 정책 확인');
    console.log('═'.repeat(80));
    console.log('');

    try {
        // RLS 정책 조회
        const { data, error } = await supabase
            .from('pg_policies')
            .select('*')
            .eq('tablename', 'notices');

        if (error) {
            console.error('❌ 오류:', error.message);
            return;
        }

        console.log(`✅ notices 테이블의 RLS 정책 개수: ${data.length}개`);
        console.log('');

        if (data.length === 0) {
            console.log('⚠️  RLS 정책이 없습니다!');
            console.log('   → 이것이 문제일 수 있습니다. RLS가 활성화되어 있으면 정책이 필요합니다.');
        } else {
            data.forEach((policy, index) => {
                console.log(`${index + 1}. 정책명: ${policy.policyname}`);
                console.log(`   명령: ${policy.cmd}`);
                console.log(`   정의: ${policy.qual || '(없음)'}`);
                console.log('');
            });
        }

        // RLS 활성화 여부 확인
        const { data: tableInfo, error: tableError } = await supabase
            .rpc('exec_sql', {
                query: `SELECT relrowsecurity FROM pg_class WHERE relname = 'notices';`
            });

        if (!tableError && tableInfo) {
            console.log('RLS 활성화 여부:', tableInfo);
        }

    } catch (error) {
        console.error('오류:', error);
    }
}

checkRLSPolicies();
