// S2BI3 Insert Script
const https = require('https');

const data = JSON.stringify({
  stage: 2,
  area: "BI",
  task_id: "S2BI3",
  task_name: "이메일 도메인 인증 (Resend)",
  task_instruction: "task-instructions/S2BI3_instruction.md",
  task_agent: "devops-troubleshooter",
  tools: "Write, Read, Bash, WebFetch",
  execution_type: "Human-AI",
  dependencies: "S2BI1",
  task_progress: 0,
  task_status: "Pending",
  verification_instruction: "verification-instructions/S2BI3_verification.md",
  verification_agent: "devops-troubleshooter",
  verification_status: "Not Verified",
  remarks: "Whois DNS 고급설정으로 SPF/DKIM 레코드 추가, ssalworks.ai.kr 도메인 인증"
});

const options = {
  hostname: 'zwjmfewyshhwpgwdtrus.supabase.co',
  port: 443,
  path: '/rest/v1/project_sal_grid',
  method: 'POST',
  headers: {
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3am1mZXd5c2hod3Bnd2R0cnVzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzU3MTU1MSwiZXhwIjoyMDc5MTQ3NTUxfQ.ZMNl9_lCJQMG8lC0MEQjHrLEuYbCFJYsVsBIzvwnj1s',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3am1mZXd5c2hod3Bnd2R0cnVzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzU3MTU1MSwiZXhwIjoyMDc5MTQ3NTUxfQ.ZMNl9_lCJQMG8lC0MEQjHrLEuYbCFJYsVsBIzvwnj1s',
    'Content-Type': 'application/json',
    'Prefer': 'return=representation',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = https.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Response:', body);
    if (res.statusCode === 201) {
      console.log('✅ S2BI3 등록 성공!');
    } else {
      console.log('❌ 등록 실패');
    }
  });
});

req.on('error', (e) => console.error('Error:', e.message));
req.write(data);
req.end();
