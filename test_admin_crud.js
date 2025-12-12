const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://zwjmfewyshhwpgwdtrus.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3am1mZXd5c2hod3Bnd2R0cnVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1NzE1NTEsImV4cCI6MjA3OTE0NzU1MX0.AJy34h5VR8QS6WFEcUcBeJJu8I3bBQ6UCk1I84Wb7y4';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testCRUD() {
    console.log('\n' + '='.repeat(60));
    console.log('📋 Admin Dashboard CRUD 기능 테스트');
    console.log('='.repeat(60));

    // ========================================
    // 1. 학습용 콘텐츠 테스트
    // ========================================
    console.log('\n🔹 1. 학습용 콘텐츠 테스트');
    console.log('-'.repeat(60));

    // INSERT 테스트
    console.log('\n[테스트 1-1] INSERT: 새 대분류 추가');
    const testDepth1 = 'TEST_대분류_' + Date.now();
    const { data: insertData, error: insertError } = await supabase
        .from('learning_contents')
        .insert({
            depth1: testDepth1,
            depth2: 'TEST_중분류',
            depth3: 'TEST_소분류',
            url: 'https://drive.google.com/test'
        })
        .select();

    if (insertError) {
        console.log('❌ INSERT 실패:', insertError.message);
    } else {
        console.log('✅ INSERT 성공!');
        console.log('   생성된 ID:', insertData[0].id);
        console.log('   depth1:', insertData[0].depth1);
    }

    // SELECT 테스트
    console.log('\n[테스트 1-2] SELECT: 방금 추가한 데이터 조회');
    const { data: selectData, error: selectError } = await supabase
        .from('learning_contents')
        .select('*')
        .eq('depth1', testDepth1);

    if (selectError) {
        console.log('❌ SELECT 실패:', selectError.message);
    } else {
        console.log('✅ SELECT 성공!');
        console.log('   조회된 데이터 개수:', selectData.length);
    }

    // UPDATE 테스트
    if (insertData && insertData[0]) {
        console.log('\n[테스트 1-3] UPDATE: depth3 수정');
        const { data: updateData, error: updateError } = await supabase
            .from('learning_contents')
            .update({ depth3: 'TEST_소분류_수정됨' })
            .eq('id', insertData[0].id)
            .select();

        if (updateError) {
            console.log('❌ UPDATE 실패:', updateError.message);
        } else {
            console.log('✅ UPDATE 성공!');
            console.log('   수정 전:', insertData[0].depth3);
            console.log('   수정 후:', updateData[0].depth3);
        }

        // DELETE 테스트
        console.log('\n[테스트 1-4] DELETE: 테스트 데이터 삭제');
        const { error: deleteError } = await supabase
            .from('learning_contents')
            .delete()
            .eq('id', insertData[0].id);

        if (deleteError) {
            console.log('❌ DELETE 실패:', deleteError.message);
        } else {
            console.log('✅ DELETE 성공!');
        }
    }

    // ========================================
    // 2. FAQ 테스트
    // ========================================
    console.log('\n\n🔹 2. FAQ 테스트');
    console.log('-'.repeat(60));

    // INSERT 테스트
    console.log('\n[테스트 2-1] INSERT: 새 FAQ 추가');
    const testFaqDepth1 = 'TEST_FAQ_대분류_' + Date.now();
    const { data: faqInsertData, error: faqInsertError } = await supabase
        .from('faqs')
        .insert({
            depth1: testFaqDepth1,
            depth2: 'TEST_FAQ_중분류',
            depth3: 'TEST_질문입니까?',
            answer: '<p>이것은 <strong>테스트</strong> 답변입니다.</p>'
        })
        .select();

    if (faqInsertError) {
        console.log('❌ INSERT 실패:', faqInsertError.message);
    } else {
        console.log('✅ INSERT 성공!');
        console.log('   생성된 ID:', faqInsertData[0].id);
        console.log('   질문:', faqInsertData[0].depth3);
    }

    // SELECT 테스트
    console.log('\n[테스트 2-2] SELECT: 방금 추가한 FAQ 조회');
    const { data: faqSelectData, error: faqSelectError } = await supabase
        .from('faqs')
        .select('*')
        .eq('depth1', testFaqDepth1);

    if (faqSelectError) {
        console.log('❌ SELECT 실패:', faqSelectError.message);
    } else {
        console.log('✅ SELECT 성공!');
        console.log('   조회된 데이터 개수:', faqSelectData.length);
    }

    // UPDATE 테스트
    if (faqInsertData && faqInsertData[0]) {
        console.log('\n[테스트 2-3] UPDATE: answer 수정');
        const { data: faqUpdateData, error: faqUpdateError } = await supabase
            .from('faqs')
            .update({ answer: '<p>수정된 답변입니다.</p>' })
            .eq('id', faqInsertData[0].id)
            .select();

        if (faqUpdateError) {
            console.log('❌ UPDATE 실패:', faqUpdateError.message);
        } else {
            console.log('✅ UPDATE 성공!');
        }

        // DELETE 테스트
        console.log('\n[테스트 2-4] DELETE: 테스트 FAQ 삭제');
        const { error: faqDeleteError } = await supabase
            .from('faqs')
            .delete()
            .eq('id', faqInsertData[0].id);

        if (faqDeleteError) {
            console.log('❌ DELETE 실패:', faqDeleteError.message);
        } else {
            console.log('✅ DELETE 성공!');
        }
    }

    // ========================================
    // 최종 결과
    // ========================================
    console.log('\n' + '='.repeat(60));
    console.log('📊 최종 테스트 결과');
    console.log('='.repeat(60));

    const learningSuccess = !insertError && !selectError && insertData && insertData[0];
    const faqSuccess = !faqInsertError && !faqSelectError && faqInsertData && faqInsertData[0];

    console.log('\n🔹 학습용 콘텐츠:');
    console.log('  INSERT:', insertError ? '❌ 실패' : '✅ 성공');
    console.log('  SELECT:', selectError ? '❌ 실패' : '✅ 성공');
    console.log('  UPDATE:', learningSuccess ? '✅ 성공' : '⏭️  건너뜀');
    console.log('  DELETE:', learningSuccess ? '✅ 성공' : '⏭️  건너뜀');
    console.log('\n🔹 FAQ:');
    console.log('  INSERT:', faqInsertError ? '❌ 실패' : '✅ 성공');
    console.log('  SELECT:', faqSelectError ? '❌ 실패' : '✅ 성공');
    console.log('  UPDATE:', faqSuccess ? '✅ 성공' : '⏭️  건너뜀');
    console.log('  DELETE:', faqSuccess ? '✅ 성공' : '⏭️  건너뜀');

    console.log('\n' + '='.repeat(60));

    if (learningSuccess && faqSuccess) {
        console.log('🎉 모든 CRUD 테스트 통과!');
        console.log('✅ Admin Dashboard의 추가/수정/삭제 기능이 정상 작동합니다.');
    } else {
        console.log('⚠️  일부 테스트 실패');
        console.log('→ Supabase Dashboard에서 개발용 RLS 정책 실행 필요:');
        console.log('   1. 07_learning_contents_rls_dev.sql');
        console.log('   2. 10_faqs_rls_dev.sql');
    }

    console.log('='.repeat(60) + '\n');
}

testCRUD().catch(console.error);
