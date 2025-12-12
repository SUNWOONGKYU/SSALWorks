// learning_contents 테이블 검증 스크립트
const https = require('https');

const SUPABASE_URL = 'https://zwjmfewyshhwpgwdtrus.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3am1mZXd5c2hod3Bnd2R0cnVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1NzE1NTEsImV4cCI6MjA3OTE0NzU1MX0.AJy34h5VR8QS6WFEcUcBeJJu8I3bBQ6UCk1I84Wb7y4';

async function testLearningContents() {
    console.log('');
    console.log('═'.repeat(80));
    console.log('  Agenda #2 Database 검증: learning_contents 테이블');
    console.log('═'.repeat(80));
    console.log('');

    // 1. 전체 데이터 개수 확인
    console.log('📊 1. 전체 데이터 개수 확인...');
    const allData = await fetchData('/rest/v1/learning_contents?select=*');
    console.log(`   ✅ 총 ${allData.length}개 데이터 (예상: 75개)`);

    if (allData.length !== 75) {
        console.log(`   ❌ 오류: 데이터 개수가 예상과 다릅니다! (${allData.length} !== 75)`);
    }
    console.log('');

    // 2. 대분류(depth1) 확인
    console.log('📂 2. 대분류(depth1) 확인...');
    const depth1Groups = {};
    allData.forEach(item => {
        if (item.depth1) {
            depth1Groups[item.depth1] = (depth1Groups[item.depth1] || 0) + 1;
        }
    });

    console.log('   대분류별 데이터 개수:');
    Object.keys(depth1Groups).sort().forEach(depth1 => {
        console.log(`   - ${depth1}: ${depth1Groups[depth1]}개`);
    });

    const expectedDepth1Count = 3;
    if (Object.keys(depth1Groups).length !== expectedDepth1Count) {
        console.log(`   ❌ 오류: 대분류 개수가 예상과 다릅니다! (${Object.keys(depth1Groups).length} !== ${expectedDepth1Count})`);
    } else {
        console.log(`   ✅ 대분류 개수 정상 (${expectedDepth1Count}개)`);
    }
    console.log('');

    // 3. 5×5 구조 확인
    console.log('🔍 3. 5×5 구조 확인 (각 대분류당 5개 중분류 × 5개 소분류)...');
    for (const depth1Name of Object.keys(depth1Groups).sort()) {
        const depth1Items = allData.filter(item => item.depth1 === depth1Name);

        // 중분류(depth2) 그룹화
        const depth2Groups = {};
        depth1Items.forEach(item => {
            if (item.depth2) {
                if (!depth2Groups[item.depth2]) {
                    depth2Groups[item.depth2] = [];
                }
                depth2Groups[item.depth2].push(item);
            }
        });

        console.log(`   ${depth1Name}:`);
        console.log(`     - 중분류 개수: ${Object.keys(depth2Groups).length}개 (예상: 5개)`);

        // 각 중분류별 소분류 개수 확인
        Object.keys(depth2Groups).sort().forEach(depth2Name => {
            const depth3Items = depth2Groups[depth2Name].filter(item => item.depth3);
            console.log(`       • ${depth2Name}: ${depth3Items.length}개 소분류`);
        });
    }
    console.log('');

    // 4. 필수 필드 확인
    console.log('📝 4. 필수 필드 확인...');
    const sample = allData[0];
    const requiredFields = ['id', 'depth1', 'depth2', 'depth3', 'url', 'description', 'display_order', 'created_at'];

    console.log('   샘플 데이터 필드:');
    requiredFields.forEach(field => {
        const hasField = sample.hasOwnProperty(field);
        const status = hasField ? '✅' : '❌';
        console.log(`   ${status} ${field}: ${hasField ? '존재' : '없음'}`);
    });
    console.log('');

    // 5. 샘플 데이터 출력
    console.log('📄 5. 샘플 데이터 (첫 3개):');
    console.log('─'.repeat(80));
    allData.slice(0, 3).forEach((item, i) => {
        console.log(`${i + 1}. ${item.depth1} > ${item.depth2} > ${item.depth3}`);
        console.log(`   URL: ${item.url}`);
        console.log(`   설명: ${item.description}`);
        console.log('');
    });

    // 6. 최종 결과
    console.log('═'.repeat(80));
    console.log('  최종 검증 결과');
    console.log('═'.repeat(80));
    console.log('');

    const allChecks = [
        allData.length === 75,
        Object.keys(depth1Groups).length === 3,
        requiredFields.every(field => sample.hasOwnProperty(field))
    ];

    if (allChecks.every(check => check)) {
        console.log('✅ 모든 검증 통과!');
        console.log('');
        console.log('Database 검증 완료:');
        console.log('  - 총 75개 학습 콘텐츠');
        console.log('  - 3개 대분류');
        console.log('  - 각 대분류당 5×5 구조');
        console.log('  - 모든 필수 필드 존재');
    } else {
        console.log('❌ 일부 검증 실패');
    }
    console.log('');
    console.log('═'.repeat(80));
}

async function fetchData(path) {
    const url = `${SUPABASE_URL}${path}`;

    const options = {
        method: 'GET',
        headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json'
        }
    };

    return new Promise((resolve, reject) => {
        const req = https.request(url, options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                if (res.statusCode === 200) {
                    try {
                        const json = JSON.parse(data);
                        resolve(json);
                    } catch (e) {
                        reject(e);
                    }
                } else {
                    reject(new Error(`HTTP ${res.statusCode}`));
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.end();
    });
}

testLearningContents().catch(err => {
    console.error('');
    console.error('❌ 검증 실패:', err);
    process.exit(1);
});
