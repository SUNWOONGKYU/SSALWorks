const SUPABASE_URL = 'https://zwjmfewyshhwpgwdtrus.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3am1mZXd5c2hod3Bnd2R0cnVzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzU3MTU1MSwiZXhwIjoyMDc5MTQ3NTUxfQ.ZMNl9_lCJQMG8lC0MEQjHrLEuYbCFJYsVsBIzvwnj1s';

async function checkSchema() {
    // 기존 사용자 하나 조회해서 스키마 확인
    const res = await fetch(
        `${SUPABASE_URL}/rest/v1/users?limit=1`,
        {
            headers: {
                'apikey': SUPABASE_SERVICE_KEY,
                'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`
            }
        }
    );

    const data = await res.json();
    console.log('Users table sample:');
    console.log(JSON.stringify(data, null, 2));

    if (data.length > 0) {
        console.log('\nAvailable columns:');
        console.log(Object.keys(data[0]));
    }
}

checkSchema().catch(console.error);
