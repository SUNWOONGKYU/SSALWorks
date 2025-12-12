#!/usr/bin/env node

/**
 * create_project_structure.js
 *
 * 표준 프로젝트 디렉토리 구조를 자동으로 생성하는 스크립트
 *
 * 사용법:
 *   node create_project_structure.js [프로젝트명] [생성경로]
 *
 * 예시:
 *   node create_project_structure.js "MyProject" "C:/Projects"
 */

const fs = require('fs');
const path = require('path');

// 프로젝트 구조 정의
const PROJECT_STRUCTURE = {
    '.claude': {
        'CLAUDE.md': getCLAUDEContent,
        'commands': {
            '.gitkeep': ''
        }
    },
    'P1_사업계획': {
        'README.md': get사업계획ReadmeContent,
        '0-1_Vision_Mission': {
            'README.md': getVisionMissionReadmeContent,
            'GUIDE.md': getVisionMissionGuideContent,
            '.gitkeep': ''
        },
        '0-2_Market_Analysis': {
            'README.md': getMarketAnalysisReadmeContent,
            'GUIDE.md': getMarketAnalysisGuideContent,
            '.gitkeep': ''
        },
        '0-3_Business_Model': {
            'README.md': getBusinessModelReadmeContent,
            'GUIDE.md': getBusinessModelGuideContent,
            '.gitkeep': ''
        }
    },
    '1_기획': {
        'README.md': get기획ReadmeContent,
        '1-1_Project_Plan': {
            'README.md': getProjectPlanReadmeContent,
            'GUIDE.md': getProjectPlanGuideContent,
            '.gitkeep': ''
        },
        '1-2_UI_UX_Design': {
            'README.md': getUIUXReadmeContent,
            'GUIDE.md': getUIUXGuideContent,
            'Mockup': {
                '.gitkeep': ''
            },
            '.gitkeep': ''
        },
        '1-3_Database_Design': {
            'README.md': getDatabaseDesignReadmeContent,
            'GUIDE.md': getDatabaseDesignGuideContent,
            '.gitkeep': ''
        }
    },
    '2_개발준비': {
        'README.md': get개발준비ReadmeContent,
        '2-1_Tech_Stack': {
            'README.md': getTechStackReadmeContent,
            'GUIDE.md': getTechStackGuideContent,
            '.gitkeep': ''
        },
        '2-2_Architecture': {
            'README.md': getArchitectureReadmeContent,
            'GUIDE.md': getArchitectureGuideContent,
            '.gitkeep': ''
        },
        '2-3_Development_Setup': {
            'README.md': getDevSetupReadmeContent,
            'GUIDE.md': getDevSetupGuideContent,
            '.gitkeep': ''
        },
        '2-4_Project_Grid': {
            'README.md': getProjectGridReadmeContent,
            'GUIDE.md': getProjectGridGuideContent,
            '.gitkeep': ''
        }
    },
    '3_개발': {
        'README.md': get개발ReadmeContent,
        '3-1_Frontend': { 'README.md': getFrontendReadmeContent, 'GUIDE.md': getFrontendGuideContent, '.gitkeep': '' },
        '3-2_Engines': { 'README.md': getEnginesReadmeContent, 'GUIDE.md': getEnginesGuideContent, '.gitkeep': '' },
        '3-3_Authentication': { 'README.md': getAuthReadmeContent, 'GUIDE.md': getAuthGuideContent, '.gitkeep': '' },
        '3-4_Backend_Infrastructure': { 'README.md': getBackendInfraReadmeContent, 'GUIDE.md': getBackendInfraGuideContent, '.gitkeep': '' },
        '3-5_Backend_APIs': { 'README.md': getBackendAPIsReadmeContent, 'GUIDE.md': getBackendAPIsGuideContent, '.gitkeep': '' },
        '3-6_Database': { 'README.md': getDatabaseReadmeContent, 'GUIDE.md': getDatabaseGuideContent, '.gitkeep': '' },
        '3-7_External_Services': { 'README.md': getExternalServicesReadmeContent, 'GUIDE.md': getExternalServicesGuideContent, '.gitkeep': '' },
        '3-8_Test': { 'README.md': getTestReadmeContent, 'GUIDE.md': getTestGuideContent, '.gitkeep': '' },
        '3-9_Deployment': { 'README.md': getDeploymentReadmeContent, 'GUIDE.md': getDeploymentGuideContent, '.gitkeep': '' },
        '3-10_Stabilization': { 'README.md': getStabilizationReadmeContent, 'GUIDE.md': getStabilizationGuideContent, '.gitkeep': '' }
    },
    '4_운영': {
        'README.md': get운영ReadmeContent,
        '4-1_Monitoring': { 'README.md': getMonitoringReadmeContent, 'GUIDE.md': getMonitoringGuideContent, '.gitkeep': '' },
        '4-2_Maintenance': { 'README.md': getMaintenanceReadmeContent, 'GUIDE.md': getMaintenanceGuideContent, '.gitkeep': '' },
        '4-3_Backup': { 'README.md': getBackupReadmeContent, 'GUIDE.md': getBackupGuideContent, '.gitkeep': '' },
        '4-4_Security': { 'README.md': getSecurityReadmeContent, 'GUIDE.md': getSecurityGuideContent, '.gitkeep': '' }
    },
    'Web_ClaudeCode_Bridge': {
        'README.md': getWebBridgeReadmeContent,
        'Inbox': {
            'README.md': getInboxReadmeContent,
            '.gitkeep': ''
        },
        'Outbox': {
            'README.md': getOutboxReadmeContent,
            '.gitkeep': ''
        },
        'inbox_server.js': getInboxServerContent,
        'inbox_watcher.js': getInboxWatcherContent,
        'outbox_watcher.js': getOutboxWatcherContent,
        'package.json': getPackageJsonContent,
        '.env.example': getEnvExampleContent
    },
    '학습용_콘텐츠': {
        'README.md': get학습콘텐츠ReadmeContent,
        '.gitkeep': ''
    },
    '.gitignore': getGitignoreContent,
    'README.md': getRootReadmeContent,
    'PROJECT_STRUCTURE.md': getProjectStructureContent
};

// 재귀적으로 디렉토리 생성
function createStructure(basePath, structure, projectName) {
    Object.keys(structure).forEach(key => {
        const fullPath = path.join(basePath, key);
        const value = structure[key];

        if (typeof value === 'object' && value !== null && !value.call) {
            // 디렉토리 생성
            if (!fs.existsSync(fullPath)) {
                fs.mkdirSync(fullPath, { recursive: true });
                console.log(`📁 Created directory: ${fullPath}`);
            }
            // 재귀적으로 하위 구조 생성
            createStructure(fullPath, value, projectName);
        } else {
            // 파일 생성
            const content = typeof value === 'function' ? value(projectName) : value;
            fs.writeFileSync(fullPath, content, 'utf8');
            console.log(`📄 Created file: ${fullPath}`);
        }
    });
}

// 메인 실행 함수
function main() {
    const args = process.argv.slice(2);

    if (args.length < 1) {
        console.error('사용법: node create_project_structure.js [프로젝트명] [생성경로(선택)]');
        console.error('예시: node create_project_structure.js "MyProject" "C:/Projects"');
        process.exit(1);
    }

    const projectName = args[0];
    const basePath = args[1] || process.cwd();
    const projectPath = path.join(basePath, projectName);

    console.log(`\n🚀 표준 프로젝트 구조 생성 시작...\n`);
    console.log(`프로젝트명: ${projectName}`);
    console.log(`생성 경로: ${projectPath}\n`);

    // 이미 존재하는 경우 확인
    if (fs.existsSync(projectPath)) {
        console.error(`❌ 오류: 해당 경로에 이미 프로젝트가 존재합니다: ${projectPath}`);
        process.exit(1);
    }

    // 프로젝트 폴더 생성
    fs.mkdirSync(projectPath, { recursive: true });
    console.log(`📁 Created root directory: ${projectPath}\n`);

    // 구조 생성
    createStructure(projectPath, PROJECT_STRUCTURE, projectName);

    console.log(`\n✅ 프로젝트 구조 생성 완료!\n`);
    console.log(`다음 단계:`);
    console.log(`1. cd ${projectPath}`);
    console.log(`2. cd Web_ClaudeCode_Bridge && npm install`);
    console.log(`3. .env 파일 생성 (.env.example 참고)`);
    console.log(`4. node inbox_server.js 실행`);
    console.log(`5. Claude Code 실행: claude\n`);
}

// ======================
// 파일 내용 생성 함수들
// ======================

function getCLAUDEContent(projectName) {
    return `# CLAUDE.md

이 파일은 Claude Code가 "${projectName}" 프로젝트를 이해하는데 필요한 지침을 제공합니다.

## 프로젝트 개요
${projectName} 프로젝트입니다.

## 기술 스택
- Frontend:
- Backend:
- Database:
- 기타:

## 개발 가이드
- 코드 스타일:
- 커밋 컨벤션:
- 브랜치 전략:

## 특이사항
프로젝트 특수 요구사항을 입력하세요.
`;
}

function getRootReadmeContent(projectName) {
    return `# ${projectName}

## 프로젝트 소개
${projectName} 프로젝트 설명을 입력하세요.

## 디렉토리 구조
- \`P1_사업계획/\`: 비전, 미션, 시장 분석, 비즈니스 모델
- \`1_기획/\`: 프로젝트 계획, UI/UX, DB 설계
- \`2_개발준비/\`: 기술 스택, 아키텍처, 개발 환경
- \`3_개발/\`: 실제 개발 코드 및 테스트
- \`4_운영/\`: 모니터링, 유지보수, 백업, 보안
- \`Web_ClaudeCode_Bridge/\`: Claude Code 연동 폴더

## 시작하기

### 1. Claude Code 실행
\`\`\`bash
cd ${projectName}
claude
\`\`\`

### 2. Order Sheet 작성
- SSAL Works 대시보드에서 Order Sheet 작성
- \`Web_ClaudeCode_Bridge/Inbox/\`에 자동 저장

### 3. 결과 확인
- \`Web_ClaudeCode_Bridge/Outbox/\`에서 Claude Code 응답 확인

## 라이선스
MIT License
`;
}

function getGitignoreContent() {
    return `# Node.js
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Build outputs
dist/
build/
*.log

# Temporary files
*.tmp
temp/
tmp/

# Claude Code
.claude/sessions/
`;
}

function getProjectStructureContent(projectName) {
    return `# ${projectName} - 프로젝트 디렉토리 구조

이 문서는 프로젝트의 표준 디렉토리 구조를 설명합니다.

## 대분류 (Major Phases)

### P1_사업계획
비즈니스 관련 문서 및 전략

### 1_기획
프로젝트 기획 및 설계 문서

### 2_개발준비
개발 환경 및 인프라 설정

### 3_개발
실제 개발 코드

### 4_운영
운영 및 유지보수

## Web_ClaudeCode_Bridge
Claude Code와의 통신을 위한 폴더

- **Inbox/**: Order Sheet 저장
- **Outbox/**: Claude Code 응답 저장

## 학습용_콘텐츠
프로젝트 관련 학습 자료 및 문서
`;
}

// 대분류 README 함수들
function get사업계획ReadmeContent() {
    return `# 사업계획 (Business Planning)

## 목적
프로젝트의 비즈니스 측면을 정의하고 계획합니다.

## 포함 내용
- **0-1_Vision_Mission**: 비전과 미션 정의
- **0-2_Market_Analysis**: 시장 분석 및 경쟁사 분석
- **0-3_Business_Model**: 수익 모델 및 비즈니스 전략

## 작업 순서
1. 비전/미션 수립
2. 시장 조사 및 분석
3. 비즈니스 모델 설계
`;
}

function get기획ReadmeContent() {
    return `# 기획 (Planning)

## 목적
프로젝트의 기술적 기획 및 설계를 수행합니다.

## 포함 내용
- **1-1_Project_Plan**: 프로젝트 전체 계획
- **1-2_UI_UX_Design**: 사용자 인터페이스 및 경험 설계
- **1-3_Database_Design**: 데이터베이스 스키마 설계

## 작업 순서
1. 프로젝트 범위 및 일정 수립
2. UI/UX 설계 및 프로토타입
3. 데이터베이스 ERD 작성
`;
}

function get개발준비ReadmeContent() {
    return `# 개발준비 (Development Setup)

## 목적
개발 환경 및 인프라를 구축합니다.

## 포함 내용
- **2-1_Tech_Stack**: 기술 스택 선정
- **2-2_Architecture**: 시스템 아키텍처 설계
- **2-3_Development_Setup**: 개발 환경 설정
- **2-4_Project_Grid**: 프로젝트 관리 그리드

## 작업 순서
1. 기술 스택 선정 및 검증
2. 시스템 아키텍처 설계
3. 로컬 개발 환경 구축
4. 프로젝트 그리드 설정
`;
}

function get개발ReadmeContent() {
    return `# 개발 (Development)

## 목적
실제 프로덕트를 개발합니다.

## 포함 내용
- **3-1_Frontend**: 프론트엔드 코드
- **3-2_Engines**: 핵심 비즈니스 로직
- **3-3_Authentication**: 인증 시스템
- **3-4_Backend_Infrastructure**: 백엔드 인프라
- **3-5_Backend_APIs**: API 개발
- **3-6_Database**: 데이터베이스 구현
- **3-7_External_Services**: 외부 서비스 연동
- **3-8_Test**: 테스트 코드
- **3-9_Deployment**: 배포 설정
- **3-10_Stabilization**: 안정화 작업

## 개발 가이드
- 코드 리뷰 필수
- 테스트 커버리지 80% 이상 유지
- 문서화 철저히
`;
}

function get운영ReadmeContent() {
    return `# 운영 (Operations)

## 목적
서비스 운영 및 유지보수를 수행합니다.

## 포함 내용
- **4-1_Monitoring**: 모니터링 및 로깅
- **4-2_Maintenance**: 유지보수 작업
- **4-3_Backup**: 백업 및 복구
- **4-4_Security**: 보안 관리

## 운영 가이드
- 일일 모니터링 체크
- 주간 백업 확인
- 월간 보안 점검
`;
}

// 소분류 README & GUIDE 함수들 (샘플 - 실제로는 모두 구현 필요)
function getVisionMissionReadmeContent() {
    return `# 비전/미션\n\n프로젝트의 비전과 미션을 정의합니다.\n`;
}

function getVisionMissionGuideContent() {
    return `# 비전/미션 작업 가이드\n\n## 작업 목표\n프로젝트의 방향성 설정\n\n## 산출물\n- 비전 문서\n- 미션 문서\n`;
}

function getMarketAnalysisReadmeContent() {
    return `# 시장 분석\n\n시장 및 경쟁사를 분석합니다.\n`;
}

function getMarketAnalysisGuideContent() {
    return `# 시장 분석 작업 가이드\n\n## 작업 목표\n시장 기회 파악\n`;
}

function getBusinessModelReadmeContent() {
    return `# 비즈니스 모델\n\n수익 모델을 설계합니다.\n`;
}

function getBusinessModelGuideContent() {
    return `# 비즈니스 모델 작업 가이드\n\n## 작업 목표\n수익화 전략 수립\n`;
}

function getProjectPlanReadmeContent() {
    return `# 프로젝트 계획\n\n프로젝트 전체 계획을 수립합니다.\n`;
}

function getProjectPlanGuideContent() {
    return `# 프로젝트 계획 작업 가이드\n\n## 작업 목표\n프로젝트 범위 및 일정 계획\n`;
}

function getUIUXReadmeContent() {
    return `# UI/UX 디자인\n\n사용자 인터페이스를 설계합니다.\n`;
}

function getUIUXGuideContent() {
    return `# UI/UX 디자인 작업 가이드\n\n## 작업 목표\n사용자 중심 인터페이스 설계\n\n## 산출물\n- 와이어프레임\n- 프로토타입\n- 디자인 파일\n`;
}

function getDatabaseDesignReadmeContent() {
    return `# 데이터베이스 설계\n\nDB 스키마를 설계합니다.\n`;
}

function getDatabaseDesignGuideContent() {
    return `# 데이터베이스 설계 작업 가이드\n\n## 작업 목표\nDB 스키마 및 ERD 작성\n`;
}

function getTechStackReadmeContent() {
    return `# 기술 스택\n\n사용할 기술을 선정합니다.\n`;
}

function getTechStackGuideContent() {
    return `# 기술 스택 작업 가이드\n\n## 작업 목표\n최적의 기술 스택 선정\n`;
}

function getArchitectureReadmeContent() {
    return `# 아키텍처\n\n시스템 구조를 설계합니다.\n`;
}

function getArchitectureGuideContent() {
    return `# 아키텍처 작업 가이드\n\n## 작업 목표\n확장 가능한 시스템 설계\n`;
}

function getDevSetupReadmeContent() {
    return `# 개발 환경 설정\n\n로컬 개발 환경을 구축합니다.\n`;
}

function getDevSetupGuideContent() {
    return `# 개발 환경 설정 작업 가이드\n\n## 작업 목표\n표준 개발 환경 구축\n`;
}

function getProjectGridReadmeContent() {
    return `# 프로젝트 그리드\n\n작업 관리 그리드를 설정합니다.\n`;
}

function getProjectGridGuideContent() {
    return `# 프로젝트 그리드 작업 가이드\n\n## 작업 목표\n효율적인 작업 추적 시스템 구축\n`;
}

// 간단한 README & GUIDE 생성 함수 (나머지 소분류용)
function getFrontendReadmeContent() { return `# Frontend\n\n프론트엔드 개발\n`; }
function getFrontendGuideContent() { return `# Frontend 작업 가이드\n`; }
function getEnginesReadmeContent() { return `# Engines\n\n핵심 비즈니스 로직\n`; }
function getEnginesGuideContent() { return `# Engines 작업 가이드\n`; }
function getAuthReadmeContent() { return `# Authentication\n\n인증 시스템\n`; }
function getAuthGuideContent() { return `# Authentication 작업 가이드\n`; }
function getBackendInfraReadmeContent() { return `# Backend Infrastructure\n\n백엔드 인프라\n`; }
function getBackendInfraGuideContent() { return `# Backend Infrastructure 작업 가이드\n`; }
function getBackendAPIsReadmeContent() { return `# Backend APIs\n\nAPI 개발\n`; }
function getBackendAPIsGuideContent() { return `# Backend APIs 작업 가이드\n`; }
function getDatabaseReadmeContent() { return `# Database\n\nDB 구현\n`; }
function getDatabaseGuideContent() { return `# Database 작업 가이드\n`; }
function getExternalServicesReadmeContent() { return `# External Services\n\n외부 서비스 연동\n`; }
function getExternalServicesGuideContent() { return `# External Services 작업 가이드\n`; }
function getTestReadmeContent() { return `# Test\n\n테스트 코드\n`; }
function getTestGuideContent() { return `# Test 작업 가이드\n`; }
function getDeploymentReadmeContent() { return `# Deployment\n\n배포 설정\n`; }
function getDeploymentGuideContent() { return `# Deployment 작업 가이드\n`; }
function getStabilizationReadmeContent() { return `# Stabilization\n\n안정화 작업\n`; }
function getStabilizationGuideContent() { return `# Stabilization 작업 가이드\n`; }
function getMonitoringReadmeContent() { return `# Monitoring\n\n모니터링 및 로깅\n`; }
function getMonitoringGuideContent() { return `# Monitoring 작업 가이드\n`; }
function getMaintenanceReadmeContent() { return `# Maintenance\n\n유지보수\n`; }
function getMaintenanceGuideContent() { return `# Maintenance 작업 가이드\n`; }
function getBackupReadmeContent() { return `# Backup\n\n백업 및 복구\n`; }
function getBackupGuideContent() { return `# Backup 작업 가이드\n`; }
function getSecurityReadmeContent() { return `# Security\n\n보안 관리\n`; }
function getSecurityGuideContent() { return `# Security 작업 가이드\n`; }

// Web_ClaudeCode_Bridge 관련 함수들
function getWebBridgeReadmeContent(projectName) {
    return `# Web_ClaudeCode_Bridge

Claude Code와 대시보드 간의 통신을 담당하는 폴더입니다.

## 폴더 구조
- **Inbox/**: 대시보드에서 작성한 Order Sheet가 저장됩니다
- **Outbox/**: Claude Code의 작업 결과가 저장됩니다

## 서버 실행
\`\`\`bash
cd Web_ClaudeCode_Bridge
npm install
node inbox_server.js
\`\`\`
`;
}

function getInboxReadmeContent() {
    return `# Inbox\n\n## 용도\nSSAL Works 대시보드에서 작성한 Order Sheet가 이 폴더에 자동 저장됩니다.\n\n## 파일 형식\n- 파일명: \`ordersheet_YYYY-MM-DD_HH-mm-ss.md\`\n- 형식: Markdown\n`;
}

function getOutboxReadmeContent() {
    return `# Outbox\n\n## 용도\nClaude Code의 작업 완료 결과가 이 폴더에 저장됩니다.\n\n## 내용\n- 생성된 코드\n- 분석 결과\n- 문서\n`;
}

function get학습콘텐츠ReadmeContent() {
    return `# 학습용 콘텐츠\n\n프로젝트 관련 학습 자료 및 문서를 저장합니다.\n`;
}

function getInboxServerContent() {
    return `// inbox_server.js - 기본 서버 (실제 파일 복사 필요)\nconsole.log('Inbox server placeholder');`;
}

function getInboxWatcherContent() {
    return `// inbox_watcher.js - 기본 watcher (실제 파일 복사 필요)\nconsole.log('Inbox watcher placeholder');`;
}

function getOutboxWatcherContent() {
    return `// outbox_watcher.js - 기본 watcher (실제 파일 복사 필요)\nconsole.log('Outbox watcher placeholder');`;
}

function getPackageJsonContent(projectName) {
    return `{
  "name": "web-claudecode-bridge",
  "version": "1.0.0",
  "description": "Bridge between SSAL Works Dashboard and Claude Code for ${projectName}",
  "main": "inbox_server.js",
  "scripts": {
    "start": "node inbox_server.js",
    "watch:inbox": "node inbox_watcher.js",
    "watch:outbox": "node outbox_watcher.js"
  },
  "dependencies": {
    "express": "^4.18.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.0",
    "chokidar": "^3.5.0"
  }
}
`;
}

function getEnvExampleContent() {
    return `# OpenAI API Key
OPENAI_API_KEY=your_openai_api_key_here

# Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here

# Perplexity API Key
PERPLEXITY_API_KEY=your_perplexity_api_key_here

# Server Port
PORT=3030
`;
}

// 스크립트 실행
if (require.main === module) {
    main();
}

module.exports = { createStructure, PROJECT_STRUCTURE };
