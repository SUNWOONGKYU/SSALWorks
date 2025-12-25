/**
 * Task Instruction 파일의 Task Name을 Task Plan/Grid 기준으로 수정
 * 실행: node fix_task_names.js
 */

const fs = require('fs');
const path = require('path');

// Task Plan/Grid 기준 올바른 Task Name 매핑
const CORRECT_NAMES = {
  'S2C1': 'Books 콘텐츠 업로드',
  'S3S1': 'AI 서비스 구독 상태 확인 (Health Check)',
  'S4M1': '관리자 가이드',
  'S4F1': '관리자 대시보드 강화',
  'S4F2': 'AI Q&A 인터페이스',
  'S4BI1': 'Sentry 에러 트래킹 설정',
  'S4BA1': '결제 API (토스페이먼츠)',
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

const INSTRUCTIONS_DIR = path.join(__dirname, 'task-instructions');

let updatedCount = 0;

for (const [taskId, correctName] of Object.entries(CORRECT_NAMES)) {
  const filePath = path.join(INSTRUCTIONS_DIR, `${taskId}_instruction.md`);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️ ${taskId}: 파일 없음`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // 줄 단위로 처리 (CRLF, LF 모두 처리)
  const lines = content.split(/\r?\n/);
  let modified = false;
  let oldName = '';

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === '## Task Name' && i + 1 < lines.length) {
      oldName = lines[i + 1].trim();
      if (oldName !== correctName) {
        lines[i + 1] = correctName;
        modified = true;
      }
      break;
    }
  }

  if (modified) {
    // 원래 줄바꿈 스타일 유지
    const lineEnding = content.includes('\r\n') ? '\r\n' : '\n';
    fs.writeFileSync(filePath, lines.join(lineEnding), 'utf8');
    console.log(`✅ ${taskId}: "${oldName}" → "${correctName}"`);
    updatedCount++;
  } else if (oldName === correctName) {
    console.log(`⏭️ ${taskId}: 이미 일치`);
  } else {
    console.log(`❌ ${taskId}: Task Name 섹션 못 찾음`);
  }
}

console.log(`\n완료: ${updatedCount}개 파일 수정됨`);
