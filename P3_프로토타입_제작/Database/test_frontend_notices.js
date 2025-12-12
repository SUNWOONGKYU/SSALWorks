// ================================================
// Frontend 공지사항 로드 테스트
// ================================================
// 목적: Frontend와 동일한 조건으로 공지사항 조회 테스트
// ================================================

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testFrontendNotices() {
    console.log('');
    console.log('═'.repeat(80));
    console.log('  Frontend 공지사항 로드 테스트');
    console.log('═'.repeat(80));
    console.log('');

    try {
        console.log('📋 공지사항 로드 시작 (Frontend와 동일한 쿼리)');
        console.log('');

        // Frontend와 동일한 쿼리
        const { data, error } = await supabase
            .from('notices')
            .select('*')
            .order('important', { ascending: false })
            .order('created_at', { ascending: false })
            .limit(5);

        if (error) {
            console.error('❌ 오류 발생:');
            console.error('   코드:', error.code);
            console.error('   메시지:', error.message);
            console.error('   상세:', error.details);
            console.error('   힌트:', error.hint);
            throw error;
        }

        console.log('✅ 공지사항 로드 성공:', data.length, '개');
        console.log('');

        if (data.length === 0) {
            console.log('⚠️  공지사항이 없습니다.');
        } else {
            console.log('📋 공지사항 목록:');
            console.log('─'.repeat(80));
            data.forEach((notice, index) => {
                const mark = notice.important ? '🔴' : '  ';
                const date = new Date(notice.created_at).toLocaleDateString('ko-KR', {
                    month: 'numeric',
                    day: 'numeric'
                });
                console.log(`   ${index + 1}. ${mark} ${notice.title} (${date})`);
            });
        }

        console.log('');
        console.log('═'.repeat(80));
        console.log('✅ 테스트 완료!');
        console.log('═'.repeat(80));
        console.log('');

    } catch (error) {
        console.error('');
        console.error('═'.repeat(80));
        console.error('❌ 테스트 실패!');
        console.error('═'.repeat(80));
        console.error('');
        console.error('오류:', error);
        console.error('');
    }
}

testFrontendNotices();
