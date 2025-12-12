// ================================================
// 공지사항 CRUD 테스트
// ================================================
// 목적: Supabase에 직접 공지사항 추가/수정/삭제 테스트
// ================================================

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testCRUD() {
    console.log('');
    console.log('═'.repeat(80));
    console.log('  공지사항 CRUD 테스트');
    console.log('═'.repeat(80));
    console.log('');

    let testNoticeId = null;

    try {
        // 1. CREATE - 공지사항 추가
        console.log('📝 Step 1: CREATE - 공지사항 추가 테스트');
        console.log('─'.repeat(80));

        const { data: createData, error: createError } = await supabase
            .from('notices')
            .insert([
                {
                    title: '[테스트] AI가 직접 작성한 공지사항',
                    content: '이 공지사항은 Claude가 CRUD 테스트를 위해 자동으로 생성했습니다.\n\n테스트 항목:\n1. 생성 (CREATE)\n2. 조회 (READ)\n3. 수정 (UPDATE)\n4. 삭제 (DELETE)',
                    important: true
                }
            ])
            .select();

        if (createError) {
            console.error('❌ CREATE 실패:', createError.message);
            console.error('   상세:', createError);
            throw createError;
        }

        testNoticeId = createData[0].id;
        console.log('✅ CREATE 성공!');
        console.log('   생성된 ID:', testNoticeId);
        console.log('   제목:', createData[0].title);
        console.log('   중요:', createData[0].important ? '🔴 중요' : '일반');
        console.log('');

        // 2. READ - 전체 목록 조회
        console.log('📋 Step 2: READ - 전체 공지사항 조회');
        console.log('─'.repeat(80));

        const { data: readData, error: readError } = await supabase
            .from('notices')
            .select('*')
            .order('created_at', { ascending: false });

        if (readError) {
            console.error('❌ READ 실패:', readError.message);
            throw readError;
        }

        console.log(`✅ READ 성공! (총 ${readData.length}개)`);
        readData.forEach((notice, index) => {
            const mark = notice.important ? '🔴' : '  ';
            const isTest = notice.id === testNoticeId ? ' ← 방금 생성' : '';
            console.log(`   ${index + 1}. ${mark} ${notice.title}${isTest}`);
        });
        console.log('');

        // 3. UPDATE - 수정
        console.log('✏️  Step 3: UPDATE - 공지사항 수정 테스트');
        console.log('─'.repeat(80));

        const { data: updateData, error: updateError } = await supabase
            .from('notices')
            .update({
                title: '[테스트 수정됨] AI가 직접 수정한 공지사항',
                content: '이 공지사항은 Claude가 수정 테스트를 수행했습니다.\n\n수정 완료!',
                important: false,
                updated_at: new Date().toISOString()
            })
            .eq('id', testNoticeId)
            .select();

        if (updateError) {
            console.error('❌ UPDATE 실패:', updateError.message);
            throw updateError;
        }

        console.log('✅ UPDATE 성공!');
        console.log('   수정된 제목:', updateData[0].title);
        console.log('   중요도 변경:', '🔴 중요 → 일반');
        console.log('');

        // 4. 수정 확인
        console.log('🔍 Step 4: 수정 확인');
        console.log('─'.repeat(80));

        const { data: verifyData, error: verifyError } = await supabase
            .from('notices')
            .select('*')
            .eq('id', testNoticeId)
            .single();

        if (verifyError) {
            console.error('❌ 수정 확인 실패:', verifyError.message);
            throw verifyError;
        }

        console.log('✅ 수정 내용 확인:');
        console.log('   제목:', verifyData.title);
        console.log('   내용:', verifyData.content.substring(0, 50) + '...');
        console.log('   중요:', verifyData.important ? '🔴 중요' : '일반');
        console.log('');

        // 5. DELETE - 삭제
        console.log('🗑️  Step 5: DELETE - 공지사항 삭제 테스트');
        console.log('─'.repeat(80));

        const { error: deleteError } = await supabase
            .from('notices')
            .delete()
            .eq('id', testNoticeId);

        if (deleteError) {
            console.error('❌ DELETE 실패:', deleteError.message);
            throw deleteError;
        }

        console.log('✅ DELETE 성공!');
        console.log('   삭제된 ID:', testNoticeId);
        console.log('');

        // 6. 삭제 확인
        console.log('🔍 Step 6: 삭제 확인');
        console.log('─'.repeat(80));

        const { data: finalData, error: finalError } = await supabase
            .from('notices')
            .select('*')
            .order('created_at', { ascending: false });

        if (finalError) {
            console.error('❌ 최종 확인 실패:', finalError.message);
            throw finalError;
        }

        console.log(`✅ 최종 공지사항 목록 (총 ${finalData.length}개):`);
        finalData.forEach((notice, index) => {
            const mark = notice.important ? '🔴' : '  ';
            console.log(`   ${index + 1}. ${mark} ${notice.title}`);
        });
        console.log('');

        // 최종 결과
        console.log('═'.repeat(80));
        console.log('🎉 모든 CRUD 테스트 완료!');
        console.log('═'.repeat(80));
        console.log('');
        console.log('✅ 테스트 결과:');
        console.log('   - CREATE: 성공');
        console.log('   - READ: 성공');
        console.log('   - UPDATE: 성공');
        console.log('   - DELETE: 성공');
        console.log('');
        console.log('📌 결론: Supabase CRUD 기능 정상 작동!');
        console.log('');

    } catch (error) {
        console.error('');
        console.error('═'.repeat(80));
        console.error('❌ 테스트 실패!');
        console.error('═'.repeat(80));
        console.error('');
        console.error('오류 상세:', error);
        console.error('');

        // 테스트 데이터 정리
        if (testNoticeId) {
            console.log('🧹 테스트 데이터 정리 중...');
            const { error: cleanupError } = await supabase
                .from('notices')
                .delete()
                .eq('id', testNoticeId);

            if (!cleanupError) {
                console.log('✅ 테스트 데이터 정리 완료');
            }
        }
    }
}

testCRUD();
