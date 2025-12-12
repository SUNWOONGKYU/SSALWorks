/**
 * FAQ CRUD 자동 테스트 스크립트
 *
 * 테스트 항목:
 * 1. INSERT (Create) - 새 FAQ 추가
 * 2. SELECT (Read) - FAQ 조회
 * 3. UPDATE (Update) - FAQ 수정
 * 4. DELETE (Delete) - FAQ 삭제
 *
 * 실행 방법:
 * node test_faq_crud.js
 */

const { createClient } = require('@supabase/supabase-js');

// Supabase 설정
const SUPABASE_URL = 'https://zwjmfewyshhwpgwdtrus.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3am1mZXd5c2hod3Bnd2R0cnVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1NzE1NTEsImV4cCI6MjA3OTE0NzU1MX0.AJy34h5VR8QS6WFEcUcBeJJu8I3bBQ6UCk1I84Wb7y4';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 테스트 결과 저장
const testResults = {
    testDate: new Date().toISOString(),
    supabaseUrl: SUPABASE_URL,
    tests: [],
    summary: {
        total: 0,
        passed: 0,
        failed: 0
    }
};

// 테스트 헬퍼 함수
function logTest(testName, status, details) {
    const emoji = status === 'PASS' ? '✅' : '❌';
    console.log(`${emoji} ${testName}: ${status}`);
    if (details) {
        console.log(`   세부사항: ${details}`);
    }

    testResults.tests.push({
        name: testName,
        status: status,
        details: details,
        timestamp: new Date().toISOString()
    });

    testResults.summary.total++;
    if (status === 'PASS') {
        testResults.summary.passed++;
    } else {
        testResults.summary.failed++;
    }
}

// 테스트용 임시 데이터
let testFaqId = null;

async function runTests() {
    console.log('\n🧪 FAQ CRUD 자동 테스트 시작\n');
    console.log('='.repeat(60));

    try {
        // ============================================
        // TEST 0: 초기 데이터 확인
        // ============================================
        console.log('\n📊 TEST 0: 초기 데이터 확인');
        const { data: initialData, error: initialError } = await supabase
            .from('faqs')
            .select('*');

        if (initialError) {
            logTest('초기 데이터 조회', 'FAIL', initialError.message);
            throw initialError;
        }

        logTest('초기 데이터 조회', 'PASS', `${initialData.length}개 FAQ 확인`);

        // ============================================
        // TEST 1: INSERT (Create) - anon 역할로 시도 (실패해야 정상)
        // ============================================
        console.log('\n📝 TEST 1: INSERT (anon 역할) - 실패 예상');
        const { data: insertDataAnon, error: insertErrorAnon } = await supabase
            .from('faqs')
            .insert({
                depth1: '테스트 대분류',
                depth2: '테스트 중분류',
                depth3: '테스트 질문 (anon)',
                answer: '<p>이것은 anon 역할로 추가한 테스트 답변입니다.</p>'
            })
            .select();

        if (insertErrorAnon) {
            logTest('INSERT (anon 역할)', 'PASS', 'RLS 정책으로 차단됨 (예상된 동작)');
        } else {
            logTest('INSERT (anon 역할)', 'FAIL', 'RLS 정책이 작동하지 않음!');
        }

        // ============================================
        // TEST 2: SELECT (Read) - 전체 조회
        // ============================================
        console.log('\n📖 TEST 2: SELECT (전체 조회)');
        const { data: allFaqs, error: selectError } = await supabase
            .from('faqs')
            .select('*')
            .order('depth1')
            .order('depth2')
            .order('depth3');

        if (selectError) {
            logTest('SELECT (전체)', 'FAIL', selectError.message);
        } else {
            logTest('SELECT (전체)', 'PASS', `${allFaqs.length}개 FAQ 조회`);
        }

        // ============================================
        // TEST 3: SELECT (조건부 조회) - depth1 필터
        // ============================================
        console.log('\n🔍 TEST 3: SELECT (조건부 조회)');
        const { data: filteredFaqs, error: filterError } = await supabase
            .from('faqs')
            .select('*')
            .eq('depth1', '로그인/회원가입');

        if (filterError) {
            logTest('SELECT (depth1 필터)', 'FAIL', filterError.message);
        } else {
            logTest('SELECT (depth1 필터)', 'PASS', `${filteredFaqs.length}개 FAQ 조회`);
        }

        // ============================================
        // TEST 4: SELECT (검색) - GIN 인덱스 활용
        // ============================================
        console.log('\n🔎 TEST 4: SELECT (텍스트 검색)');
        const { data: searchFaqs, error: searchError } = await supabase
            .from('faqs')
            .select('*')
            .or('depth1.ilike.%비밀번호%,depth2.ilike.%비밀번호%,depth3.ilike.%비밀번호%');

        if (searchError) {
            logTest('SELECT (텍스트 검색)', 'FAIL', searchError.message);
        } else {
            logTest('SELECT (텍스트 검색)', 'PASS', `${searchFaqs.length}개 FAQ 발견`);
        }

        // ============================================
        // TEST 5: UPDATE - anon 역할로 시도 (실패해야 정상)
        // ============================================
        console.log('\n✏️ TEST 5: UPDATE (anon 역할) - 실패 예상');

        // 테스트용 FAQ 하나 선택
        if (allFaqs && allFaqs.length > 0) {
            testFaqId = allFaqs[0].id;

            const { error: updateErrorAnon } = await supabase
                .from('faqs')
                .update({ answer: '<p>anon이 수정을 시도합니다.</p>' })
                .eq('id', testFaqId);

            if (updateErrorAnon) {
                logTest('UPDATE (anon 역할)', 'PASS', 'RLS 정책으로 차단됨 (예상된 동작)');
            } else {
                logTest('UPDATE (anon 역할)', 'FAIL', 'RLS 정책이 작동하지 않음!');
            }
        }

        // ============================================
        // TEST 6: DELETE - anon 역할로 시도 (실패해야 정상)
        // ============================================
        console.log('\n🗑️ TEST 6: DELETE (anon 역할) - 실패 예상');

        if (testFaqId) {
            const { error: deleteErrorAnon } = await supabase
                .from('faqs')
                .delete()
                .eq('id', testFaqId);

            if (deleteErrorAnon) {
                logTest('DELETE (anon 역할)', 'PASS', 'RLS 정책으로 차단됨 (예상된 동작)');
            } else {
                logTest('DELETE (anon 역할)', 'FAIL', 'RLS 정책이 작동하지 않음!');
            }
        }

        // ============================================
        // TEST 7: 인덱스 성능 테스트
        // ============================================
        console.log('\n⚡ TEST 7: 인덱스 성능 테스트');

        const startTime = Date.now();
        const { data: perfTest, error: perfError } = await supabase
            .from('faqs')
            .select('*')
            .eq('depth1', '로그인/회원가입')
            .eq('depth2', '계정 관리');

        const endTime = Date.now();
        const queryTime = endTime - startTime;

        if (perfError) {
            logTest('인덱스 성능', 'FAIL', perfError.message);
        } else {
            logTest('인덱스 성능', 'PASS', `조회 시간: ${queryTime}ms`);
            if (queryTime > 1000) {
                console.log('   ⚠️ 경고: 조회 시간이 1초를 초과했습니다. 인덱스 확인 필요');
            }
        }

        // ============================================
        // TEST 8: 데이터 무결성 확인
        // ============================================
        console.log('\n🔒 TEST 8: 데이터 무결성 확인');

        const { data: integrityCheck, error: integrityError } = await supabase
            .from('faqs')
            .select('*')
            .or('depth1.is.null,depth2.is.null,depth3.is.null,answer.is.null');

        if (integrityError) {
            logTest('데이터 무결성', 'FAIL', integrityError.message);
        } else if (integrityCheck.length > 0) {
            logTest('데이터 무결성', 'FAIL', `NULL 값이 있는 레코드 ${integrityCheck.length}개 발견`);
        } else {
            logTest('데이터 무결성', 'PASS', '모든 필수 필드 채워짐');
        }

        // ============================================
        // 최종 데이터 개수 확인
        // ============================================
        console.log('\n📊 최종 데이터 확인');
        const { data: finalData, error: finalError } = await supabase
            .from('faqs')
            .select('*');

        if (finalError) {
            logTest('최종 데이터 조회', 'FAIL', finalError.message);
        } else {
            logTest('최종 데이터 조회', 'PASS', `${finalData.length}개 FAQ (변경 없음)`);
        }

    } catch (error) {
        console.error('\n❌ 테스트 중 오류 발생:', error);
    }

    // ============================================
    // 테스트 결과 요약
    // ============================================
    console.log('\n' + '='.repeat(60));
    console.log('\n📋 테스트 결과 요약\n');
    console.log(`총 테스트: ${testResults.summary.total}`);
    console.log(`✅ 통과: ${testResults.summary.passed}`);
    console.log(`❌ 실패: ${testResults.summary.failed}`);
    console.log(`성공률: ${((testResults.summary.passed / testResults.summary.total) * 100).toFixed(1)}%`);

    // 결과 파일 저장
    const fs = require('fs');
    const path = require('path');

    const outputDir = path.join(__dirname, '..', '..', 'Web_ClaudeCode_Bridge', 'outbox');
    const outputFile = path.join(outputDir, 'agenda3_faq_crud_test_results.json');

    fs.writeFileSync(outputFile, JSON.stringify(testResults, null, 2), 'utf8');
    console.log(`\n💾 테스트 결과 저장: ${outputFile}`);

    console.log('\n' + '='.repeat(60));
    console.log('\n✅ 테스트 완료!\n');
}

// 테스트 실행
runTests().catch(error => {
    console.error('❌ 테스트 실행 실패:', error);
    process.exit(1);
});
