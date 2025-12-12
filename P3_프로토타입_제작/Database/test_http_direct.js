// HTTP로 직접 Supabase REST API 테스트
const https = require('https');

const SUPABASE_URL = 'https://zwjmfewyshhwpgwdtrus.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3am1mZXd5c2hod3Bnd2R0cnVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1NzE1NTEsImV4cCI6MjA3OTE0NzU1MX0.AJy34h5VR8QS6WFEcUcBeJJu8I3bBQ6UCk1I84Wb7y4';

async function testHTTPRequest() {
    console.log('');
    console.log('═'.repeat(80));
    console.log('  HTTP 직접 요청 테스트 (브라우저와 동일한 방식)');
    console.log('═'.repeat(80));
    console.log('');

    const url = `${SUPABASE_URL}/rest/v1/notices?select=*&order=important.desc,created_at.desc&limit=3`;

    console.log('📤 요청 URL:');
    console.log('  ', url);
    console.log('');
    console.log('📤 요청 헤더:');
    console.log('   apikey:', SUPABASE_ANON_KEY.substring(0, 30) + '...');
    console.log('   Authorization: Bearer', SUPABASE_ANON_KEY.substring(0, 30) + '...');
    console.log('');

    const options = {
        method: 'GET',
        headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
        }
    };

    return new Promise((resolve, reject) => {
        const req = https.request(url, options, (res) => {
            let data = '';

            console.log('📥 응답 상태:', res.statusCode, res.statusMessage);
            console.log('📥 응답 헤더:');
            Object.keys(res.headers).forEach(key => {
                if (key.includes('content') || key.includes('type')) {
                    console.log(`   ${key}: ${res.headers[key]}`);
                }
            });
            console.log('');

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                console.log('═'.repeat(80));
                console.log('  결과');
                console.log('═'.repeat(80));
                console.log('');

                if (res.statusCode === 200) {
                    try {
                        const json = JSON.parse(data);
                        console.log('✅ 성공!', json.length, '개 공지사항 로드됨');
                        console.log('');

                        if (json.length > 0) {
                            console.log('공지사항 목록:');
                            console.log('─'.repeat(80));
                            json.forEach((notice, i) => {
                                const mark = notice.important ? '🔴' : '📌';
                                console.log(`${i+1}. ${mark} ${notice.title}`);
                                console.log(`   작성일: ${new Date(notice.created_at).toLocaleDateString('ko-KR')}`);
                                console.log('');
                            });
                        }

                        resolve(json);
                    } catch (e) {
                        console.error('❌ JSON 파싱 실패:', e.message);
                        console.error('응답 데이터:', data);
                        reject(e);
                    }
                } else {
                    console.error(`❌ HTTP ${res.statusCode} 오류`);
                    console.error('');
                    console.error('응답 본문:');
                    console.error(data);
                    reject(new Error(`HTTP ${res.statusCode}`));
                }

                console.log('');
                console.log('═'.repeat(80));
            });
        });

        req.on('error', (error) => {
            console.error('❌ 요청 실패:', error.message);
            reject(error);
        });

        req.end();
    });
}

testHTTPRequest().catch(err => {
    console.error('');
    console.error('최종 오류:', err);
    process.exit(1);
});
