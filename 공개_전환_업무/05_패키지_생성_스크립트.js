/**
 * SSAL Works Development Package Generator
 *
 * ⚠️ 상태: 초안 (DRAFT)
 * ⚠️ 주의: 이 스크립트는 아직 사용할 수 없습니다!
 *
 * 사용 전 필요한 작업:
 * 1. SSALWorks 전용 파일 정리 (일반화 작업)
 * 2. CLAUDE.md 일반화
 * 3. Order Sheet 템플릿 일반화
 * 4. Briefing 일반화
 * 5. SAL Grid Viewer 일반화
 * 6. Supabase Key 하드코딩 제거
 *
 * 용도: 배포용 개발 패키지 ZIP 파일 생성
 * 버전: 0.1 (초안)
 *
 * 사용법 (파일 정리 완료 후):
 *   node 05_패키지_생성_스크립트.js
 *   node 05_패키지_생성_스크립트.js --output ./dist
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ============================================
// 설정
// ============================================

const CONFIG = {
  // 패키지 이름
  packageName: 'SSAL_Works_Dev_Package',

  // 출력 디렉토리 (기본값)
  outputDir: './dist',

  // 패키지에 포함할 폴더들
  includeFolders: [
    // 표준 작업 디렉토리
    'P0_작업_디렉토리_구조_생성',
    'P1_사업계획',
    'P2_프로젝트_기획',
    'P3_프로토타입_제작',
    'S0_Project-SAL-Grid_생성',
    'S1_개발_준비',
    'S2_개발-1차',
    'S3_개발-2차',
    'S4_개발-3차',
    'S5_개발_마무리',
    'Production',

    // 개발 도구
    'Development_Process_Monitor',
    'Human_ClaudeCode_Bridge',

    // 안내문/템플릿
    'Briefings_OrderSheets',

    // AI 설정 (선택)
    '.claude',
  ],

  // 패키지에 포함할 루트 파일들
  includeFiles: [
    '.gitignore',
    'package.json',
    'README.md',
  ],

  // 제외할 패턴들
  excludePatterns: [
    'node_modules',
    '.env',
    '.env.local',
    '.env.production',
    '*.log',
    '.DS_Store',
    'Thumbs.db',
    '.git',

    // SSALWorks 전용 (범용 아님)
    '부수적_고유기능',

    // 기존 작업 결과물 (빈 템플릿만 제공)
    '**/task-results/*',
    '**/Reports/*',
    '**/Orders/*',
    '**/work_logs/*.md',
  ],

  // 빈 폴더로 유지할 패턴 (내용 제거, 폴더만 유지)
  emptyFolderPatterns: [
    'Human_ClaudeCode_Bridge/Orders',
    'Human_ClaudeCode_Bridge/Reports',
    'S0_Project-SAL-Grid_생성/sal-grid/task-results',
    '.claude/work_logs',
  ],
};

// ============================================
// 유틸리티 함수
// ============================================

function log(message, type = 'info') {
  const prefix = {
    info: '[INFO]',
    success: '[OK]',
    warning: '[WARN]',
    error: '[ERROR]',
  };
  console.log(`${prefix[type] || '[INFO]'} ${message}`);
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    log(`Created directory: ${dirPath}`);
  }
}

function shouldExclude(filePath, excludePatterns) {
  const normalizedPath = filePath.replace(/\\/g, '/');

  for (const pattern of excludePatterns) {
    // 단순 문자열 매칭
    if (normalizedPath.includes(pattern.replace('**/', '').replace('/*', ''))) {
      return true;
    }

    // 와일드카드 패턴
    if (pattern.startsWith('*.')) {
      const ext = pattern.slice(1);
      if (normalizedPath.endsWith(ext)) {
        return true;
      }
    }
  }

  return false;
}

function shouldEmptyFolder(folderPath, emptyFolderPatterns) {
  const normalizedPath = folderPath.replace(/\\/g, '/');

  for (const pattern of emptyFolderPatterns) {
    if (normalizedPath.endsWith(pattern) || normalizedPath.includes(pattern + '/')) {
      return true;
    }
  }

  return false;
}

function copyRecursive(src, dest, excludePatterns, emptyFolderPatterns) {
  const stats = fs.statSync(src);

  if (stats.isDirectory()) {
    ensureDir(dest);

    // 빈 폴더로 유지해야 하는 경우
    if (shouldEmptyFolder(src, emptyFolderPatterns)) {
      // .gitkeep 파일만 생성
      fs.writeFileSync(path.join(dest, '.gitkeep'), '');
      log(`Created empty folder with .gitkeep: ${dest}`);
      return;
    }

    const items = fs.readdirSync(src);
    for (const item of items) {
      const srcPath = path.join(src, item);
      const destPath = path.join(dest, item);

      if (!shouldExclude(srcPath, excludePatterns)) {
        copyRecursive(srcPath, destPath, excludePatterns, emptyFolderPatterns);
      }
    }
  } else {
    // 파일 복사
    if (!shouldExclude(src, excludePatterns)) {
      fs.copyFileSync(src, dest);
    }
  }
}

// ============================================
// 메인 함수
// ============================================

function generatePackage() {
  const startTime = Date.now();

  log('========================================');
  log('SSAL Works Development Package Generator');
  log('========================================');

  // 명령행 인자 처리
  const args = process.argv.slice(2);
  let outputDir = CONFIG.outputDir;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--output' && args[i + 1]) {
      outputDir = args[i + 1];
    }
  }

  const sourceDir = path.resolve(__dirname, '..');
  const packageDir = path.join(outputDir, CONFIG.packageName);
  const zipPath = path.join(outputDir, `${CONFIG.packageName}.zip`);

  log(`Source: ${sourceDir}`);
  log(`Output: ${packageDir}`);

  // 1. 출력 디렉토리 정리
  log('');
  log('Step 1: Cleaning output directory...');

  if (fs.existsSync(packageDir)) {
    fs.rmSync(packageDir, { recursive: true, force: true });
    log(`Removed existing: ${packageDir}`);
  }

  if (fs.existsSync(zipPath)) {
    fs.unlinkSync(zipPath);
    log(`Removed existing: ${zipPath}`);
  }

  ensureDir(outputDir);
  ensureDir(packageDir);

  // 2. 폴더 복사
  log('');
  log('Step 2: Copying folders...');

  for (const folder of CONFIG.includeFolders) {
    const srcPath = path.join(sourceDir, folder);
    const destPath = path.join(packageDir, folder);

    if (fs.existsSync(srcPath)) {
      copyRecursive(srcPath, destPath, CONFIG.excludePatterns, CONFIG.emptyFolderPatterns);
      log(`Copied: ${folder}`, 'success');
    } else {
      log(`Folder not found: ${folder}`, 'warning');
    }
  }

  // 3. 루트 파일 복사
  log('');
  log('Step 3: Copying root files...');

  for (const file of CONFIG.includeFiles) {
    const srcPath = path.join(sourceDir, file);
    const destPath = path.join(packageDir, file);

    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      log(`Copied: ${file}`, 'success');
    } else {
      log(`File not found: ${file}`, 'warning');
    }
  }

  // 4. 패키지 전용 README 생성
  log('');
  log('Step 4: Generating package README...');

  const readmeContent = generatePackageReadme();
  fs.writeFileSync(path.join(packageDir, 'README.md'), readmeContent);
  log('Generated: README.md', 'success');

  // 5. ZIP 파일 생성
  log('');
  log('Step 5: Creating ZIP archive...');

  try {
    // Windows에서는 PowerShell의 Compress-Archive 사용
    if (process.platform === 'win32') {
      execSync(
        `powershell Compress-Archive -Path "${packageDir}\\*" -DestinationPath "${zipPath}" -Force`,
        { stdio: 'inherit' }
      );
    } else {
      // Unix 계열에서는 zip 명령어 사용
      execSync(`cd "${outputDir}" && zip -r "${CONFIG.packageName}.zip" "${CONFIG.packageName}"`, {
        stdio: 'inherit',
      });
    }
    log(`Created: ${zipPath}`, 'success');
  } catch (error) {
    log(`Failed to create ZIP: ${error.message}`, 'error');
    log('Package folder is ready, but ZIP creation failed.', 'warning');
  }

  // 완료 보고
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);

  log('');
  log('========================================');
  log('Package Generation Complete!', 'success');
  log('========================================');
  log(`Time: ${elapsed}s`);
  log(`Package folder: ${packageDir}`);
  log(`ZIP file: ${zipPath}`);
  log('');

  // 패키지 내용 요약
  log('Package Contents:');
  CONFIG.includeFolders.forEach(f => log(`  - ${f}`));
  CONFIG.includeFiles.forEach(f => log(`  - ${f}`));
}

function generatePackageReadme() {
  return `# SSAL Works Development Package

이 패키지는 **SSAL Works 프로젝트 개발**을 위한 표준 디렉토리 구조와 개발 도구를 포함합니다.

## 패키지 설치 방법

1. **압축 해제**: 원하는 위치에 이 폴더를 압축 해제하세요.
2. **폴더 이름 변경**: 프로젝트에 맞게 폴더 이름을 변경하세요.
3. **개발 도구 설치**: 아래 "필수 도구 설치" 섹션을 참고하세요.

## 필수 도구 설치

이 패키지만으로는 개발이 불가능합니다. **다음 도구를 별도로 설치**해야 합니다:

| 도구 | 용도 | 설치 방법 |
|------|------|----------|
| **Git** | 버전 관리 | https://git-scm.com |
| **Node.js** | JavaScript 런타임 | https://nodejs.org |
| **npm** | 패키지 매니저 | Node.js에 포함 |
| **Claude Code** | AI 개발 어시스턴트 | \`npm install -g @anthropic-ai/claude-code\` |

### Claude Code로 한 번에 설치

패키지 폴더에서 터미널을 열고:

\`\`\`bash
claude
\`\`\`

Claude Code에게 다음과 같이 요청하세요:

\`\`\`
"프로젝트 개발 환경 설정을 위한 필수 도구 다 설치해 줘"
\`\`\`

## 패키지 구조

\`\`\`
${CONFIG.packageName}/
├── P0_작업_디렉토리_구조_생성/    # 프로젝트 설정
├── P1_사업계획/                   # 사업 계획
├── P2_프로젝트_기획/              # 프로젝트 기획
├── P3_프로토타입_제작/            # 프로토타입
├── S0_Project-SAL-Grid_생성/     # SAL Grid 설정
├── S1_개발_준비/                  # 개발 환경 구축
├── S2_개발-1차/                   # 핵심 기능 개발
├── S3_개발-2차/                   # 고급 기능 개발
├── S4_개발-3차/                   # QA 및 최적화
├── S5_개발_마무리/                # 배포 및 문서화
├── Production/                    # 배포용 코드
├── Development_Process_Monitor/   # 진행 상황 시각화
├── Human_ClaudeCode_Bridge/       # 작업 지시/결과 교환
├── Briefings_OrderSheets/         # 안내문 및 템플릿
├── .claude/                       # AI 설정 (선택)
├── .gitignore
├── package.json
└── README.md
\`\`\`

## 다음 단계

1. **Dashboard 접속**: SSAL Works 웹사이트에서 프로젝트 Dashboard로 이동
2. **사이드바 확인**: 현재 진행 단계 확인
3. **안내문 읽기**: Briefings 폴더의 단계별 안내문 확인
4. **Order Sheet 작성**: Claude Code에게 작업 지시

## 도움말

- **📖 Books**: 웹 개발 학습 자료
- **❓ FAQ**: 자주 묻는 질문
- **💬 써니에게 묻기**: 1:1 멘토링

---

**프로젝트 성공을 응원합니다!**

Generated by SSAL Works Package Generator
`;
}

// 실행
generatePackage();
