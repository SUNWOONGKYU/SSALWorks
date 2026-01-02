const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres.zwjmfewyshhwpgwdtrus:DkvOOSG1fm1K17Vc@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres',
  ssl: { rejectUnauthorized: false }
});

async function checkPolicies() {
  await client.connect();
  console.log('✅ PostgreSQL 연결 성공!\n');

  const result = await client.query(`
    SELECT tablename, policyname, cmd, qual, with_check
    FROM pg_policies
    WHERE tablename IN ('learning_contents', 'faqs')
    ORDER BY tablename, policyname
  `);

  console.log('=== 현재 적용된 RLS 정책 ===\n');
  result.rows.forEach(row => {
    console.log('테이블:', row.tablename);
    console.log('정책명:', row.policyname);
    console.log('명령:', row.cmd);
    console.log('---');
  });

  await client.end();
}

checkPolicies().catch(e => {
  console.error('❌ 에러:', e.message);
  client.end();
});
