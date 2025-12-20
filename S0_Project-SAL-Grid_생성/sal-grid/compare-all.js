const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// .env 파일에서 환경변수 읽기
const envPath = path.join(__dirname, '../../../P3_프로토타입_제작/Database/.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) envVars[match[1].trim()] = match[2].trim();
});

const supabase = createClient(envVars.SUPABASE_URL, envVars.SUPABASE_ANON_KEY);

// Task Plan 데이터 (하드코딩 - SSALWORKS_TASK_PLAN.md 기준)
const taskPlan = {
    'S1M1': '개발 가이드',
    'S1F1': 'Vercel 프로젝트 설정',
    'S1F2': 'vercel.json 설정',
    'S1BI1': '환경변수 설정',
    'S1D1': 'DB 스키마 확정',
    'S1S1': 'Supabase Auth Provider 설정',
    'S1T1': '테스트 환경 설정',
    'S1O1': 'DNS 설정 및 도메인 연결',
    'S2M1': 'API 문서 v1',
    'S2F1': 'Google 소셜 로그인 UI',
    'S2F2': '비밀번호 재설정 UI',
    'S2BI1': 'Resend 이메일 서비스 설정',
    'S2BI2': '에러 핸들링 시스템',
    'S2BI3': '이메일 도메인 인증 (Resend)',
    'S2BA1': 'Google OAuth Serverless API',
    'S2BA2': '이메일 발송 API (Resend)',
    'S2BA3': '구독 관리 API',
    'S2D1': '인덱스 최적화',
    'S2S1': '인증 미들웨어',
    'S2T1': '인증 API 테스트',
    'S2C1': 'Books 콘텐츠 업로드',
    'S3BI1': 'AI API 클라이언트 통합',
    'S3BA1': 'AI Q&A API',
    'S3S1': 'AI 서비스 구독 상태 확인 (Health Check)',
    'S3E1': 'AI API 키 설정',
    'S4M1': '관리자 가이드',
    'S4F1': '관리자 대시보드 강화',
    'S4F2': 'AI Q&A 인터페이스',
    'S4BI1': 'Sentry 에러 트래킹 설정',
    'S4BA1': '결제 API (토스 페이먼트)',
    'S4BA2': '결제 웹훅 API',
    'S4S1': '관리자 권한 체크',
    'S4T1': 'E2E 테스트',
    'S4T2': 'API 통합 테스트',
    'S4O1': 'Cron Jobs 설정',
    'S5M1': '운영 매뉴얼',
    'S5F1': '버그 수정 (프론트엔드)',
    'S5BA1': 'API 버그 수정 및 최적화',
    'S5D1': '데이터 백업 설정',
    'S5S1': '보안 점검 및 패치',
    'S5O1': '프로덕션 배포',
    'S5O3': 'SSL 인증서 확인'
};

async function main() {
    // 1. Grid 데이터 가져오기
    const { data: gridData, error } = await supabase
        .from('ssalworks_tasks')
        .select('task_id, task_name')
        .order('task_id');

    if (error) {
        console.error('Grid 조회 실패:', error.message);
        return;
    }

    const grid = {};
    gridData.forEach(t => grid[t.task_id] = t.task_name);

    // 2. Task Instruction 파일에서 Task Name 추출
    const dir = './task-instructions';
    const files = fs.readdirSync(dir).filter(f => f.endsWith('_instruction.md') && f.startsWith('S'));
    
    const instructions = {};
    files.forEach(file => {
        const content = fs.readFileSync(path.join(dir, file), 'utf-8');
        const taskId = file.replace('_instruction.md', '');
        
        // ## Task Name 다음 줄에서 이름 추출
        const lines = content.split('\n');
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].trim() === '## Task Name' && lines[i+1]) {
                instructions[taskId] = lines[i+1].trim();
                break;
            }
        }
    });

    // 3. 비교 표 출력
    console.log('# Grid vs Task Plan vs Task Instruction 비교표\n');
    console.log('| Task ID | Grid 데이터 | Task Plan | Task Instruction | 일치 |');
    console.log('|---------|-------------|-----------|------------------|------|');

    const allTaskIds = [...new Set([...Object.keys(grid), ...Object.keys(taskPlan), ...Object.keys(instructions)])].sort();
    
    let mismatchCount = 0;
    
    allTaskIds.forEach(taskId => {
        const g = grid[taskId] || '-';
        const p = taskPlan[taskId] || '-';
        const i = instructions[taskId] || '-';
        
        // 일치 여부 확인
        let match = '✅';
        if (g !== p || g !== i || p !== i) {
            if (g !== '-' && p !== '-' && g !== p) match = '❌';
            else if (g !== '-' && i !== '-' && g !== i) match = '❌';
            else if (p !== '-' && i !== '-' && p !== i) match = '❌';
            else if (g === '-' || p === '-' || i === '-') match = '⚠️';
        }
        
        if (match === '❌') mismatchCount++;
        
        console.log(`| ${taskId} | ${g} | ${p} | ${i} | ${match} |`);
    });

    console.log(`\n## 불일치 개수: ${mismatchCount}개`);
}

main().catch(console.error);
