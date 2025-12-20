/**
 * build-web-assets.js
 *
 * 웹 배포용 파일 통합 빌드 스크립트
 *
 * 역할:
 * 1. Order Sheet 템플릿 → ordersheets.js 번들링
 * 2. 안내문 HTML → guides.js 번들링
 * 3. PROJECT_SAL_GRID_MANUAL.md → HTML 변환
 * 4. 모든 배포 위치에 복사
 *
 * 사용법:
 *   node Production/build-web-assets.js
 *   node Production/build-web-assets.js --ordersheets   # Order Sheets만
 *   node Production/build-web-assets.js --guides        # Guides만
 *   node Production/build-web-assets.js --manual        # Manual만
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 프로젝트 루트 경로
const PROJECT_ROOT = path.resolve(__dirname, '..');

// 경로 설정
const PATHS = {
    // 소스 경로
    ordersheetsGenerator: path.join(PROJECT_ROOT, 'P2_프로젝트_기획/User_Flows/Order_Sheet_템플릿/generate-ordersheets-js.js'),
    guidesGenerator: path.join(PROJECT_ROOT, 'P2_프로젝트_기획/User_Flows/상황별_안내문/generate-guides-js.js'),
    serviceGuidesGenerator: path.join(PROJECT_ROOT, '부수적_고유기능/콘텐츠/외부_연동_설정_Guide/generate-service-guides-js.js'),
    manualMd: path.join(PROJECT_ROOT, 'S0_Project-SAL-Grid_생성/manual/PROJECT_SAL_GRID_MANUAL.md'),

    // 출력 경로
    ordersheetsOutput: path.join(PROJECT_ROOT, 'Production/Frontend/ordersheets.js'),
    guidesOutput: path.join(PROJECT_ROOT, 'Production/Frontend/guides.js'),
    serviceGuidesOutput: path.join(PROJECT_ROOT, 'Production/Frontend/service-guides.js'),
    manualHtml: path.join(PROJECT_ROOT, '참고자료/PROJECT_SAL_GRID_MANUAL.html'),

    // 복사 대상 경로
    copyTargets: {
        ordersheets: [
            path.join(PROJECT_ROOT, 'Production/ordersheets.js'),
            path.join(PROJECT_ROOT, 'P3_프로토타입_제작/Frontend/Prototype/ordersheets.js')
        ],
        guides: [
            path.join(PROJECT_ROOT, 'Production/guides.js'),
            path.join(PROJECT_ROOT, 'P3_프로토타입_제작/Frontend/Prototype/guides.js')
        ],
        serviceGuides: [
            path.join(PROJECT_ROOT, 'Production/service-guides.js'),
            path.join(PROJECT_ROOT, 'P3_프로토타입_제작/Frontend/Prototype/service-guides.js')
        ]
    }
};

// 콘솔 출력 헬퍼
const log = {
    info: (msg) => console.log(`\x1b[36mℹ️  ${msg}\x1b[0m`),
    success: (msg) => console.log(`\x1b[32m✅ ${msg}\x1b[0m`),
    error: (msg) => console.log(`\x1b[31m❌ ${msg}\x1b[0m`),
    header: (msg) => console.log(`\n\x1b[33m${'='.repeat(50)}\n📦 ${msg}\n${'='.repeat(50)}\x1b[0m\n`)
};

// 파일 복사 함수
function copyFile(src, dest) {
    try {
        fs.copyFileSync(src, dest);
        log.success(`복사됨: ${path.basename(dest)} → ${path.dirname(dest)}`);
        return true;
    } catch (err) {
        log.error(`복사 실패: ${dest} - ${err.message}`);
        return false;
    }
}

// Order Sheets 빌드
function buildOrdersheets() {
    log.header('Order Sheets 빌드');

    try {
        log.info('generate-ordersheets-js.js 실행 중...');
        execSync(`node "${PATHS.ordersheetsGenerator}"`, {
            stdio: 'inherit',
            cwd: path.dirname(PATHS.ordersheetsGenerator)
        });

        // 추가 위치에 복사
        log.info('추가 위치에 복사 중...');
        PATHS.copyTargets.ordersheets.forEach(target => {
            copyFile(PATHS.ordersheetsOutput, target);
        });

        log.success('Order Sheets 빌드 완료!');
        return true;
    } catch (err) {
        log.error(`Order Sheets 빌드 실패: ${err.message}`);
        return false;
    }
}

// Guides 빌드
function buildGuides() {
    log.header('Guides (안내문) 빌드');

    try {
        log.info('generate-guides-js.js 실행 중...');
        execSync(`node "${PATHS.guidesGenerator}"`, {
            stdio: 'inherit',
            cwd: path.dirname(PATHS.guidesGenerator)
        });

        // 추가 위치에 복사
        log.info('추가 위치에 복사 중...');
        PATHS.copyTargets.guides.forEach(target => {
            copyFile(PATHS.guidesOutput, target);
        });

        log.success('Guides 빌드 완료!');
        return true;
    } catch (err) {
        log.error(`Guides 빌드 실패: ${err.message}`);
        return false;
    }
}

// Service Guides (외부 연동 설정 가이드) 빌드
function buildServiceGuides() {
    log.header('Service Guides (외부 연동 설정) 빌드');

    try {
        log.info('generate-service-guides-js.js 실행 중...');
        execSync(`node "${PATHS.serviceGuidesGenerator}"`, {
            stdio: 'inherit',
            cwd: path.dirname(PATHS.serviceGuidesGenerator)
        });

        // 추가 위치에 복사
        log.info('추가 위치에 복사 중...');
        PATHS.copyTargets.serviceGuides.forEach(target => {
            copyFile(PATHS.serviceGuidesOutput, target);
        });

        log.success('Service Guides 빌드 완료!');
        return true;
    } catch (err) {
        log.error(`Service Guides 빌드 실패: ${err.message}`);
        return false;
    }
}

// Manual HTML 변환
function buildManual() {
    log.header('PROJECT_SAL_GRID_MANUAL HTML 변환');

    try {
        // pandoc 존재 확인
        try {
            execSync('pandoc --version', { stdio: 'ignore' });
        } catch {
            log.error('pandoc이 설치되어 있지 않습니다. pandoc을 설치해주세요.');
            return false;
        }

        log.info('pandoc으로 MD → HTML 변환 중...');
        execSync(`pandoc "${PATHS.manualMd}" -o "${PATHS.manualHtml}" --standalone --metadata title="PROJECT SAL GRID MANUAL"`, {
            stdio: 'inherit'
        });

        log.success(`Manual HTML 생성됨: ${PATHS.manualHtml}`);
        return true;
    } catch (err) {
        log.error(`Manual 빌드 실패: ${err.message}`);
        return false;
    }
}

// 전체 빌드
function buildAll() {
    log.header('웹 배포 파일 전체 빌드 시작');

    const startTime = Date.now();
    const results = {
        ordersheets: buildOrdersheets(),
        guides: buildGuides(),
        serviceGuides: buildServiceGuides(),
        manual: buildManual()
    };

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);

    // 결과 요약
    console.log('\n' + '='.repeat(50));
    console.log('📊 빌드 결과 요약');
    console.log('='.repeat(50));
    console.log(`  Order Sheets:   ${results.ordersheets ? '✅ 성공' : '❌ 실패'}`);
    console.log(`  Guides:         ${results.guides ? '✅ 성공' : '❌ 실패'}`);
    console.log(`  Service Guides: ${results.serviceGuides ? '✅ 성공' : '❌ 실패'}`);
    console.log(`  Manual:         ${results.manual ? '✅ 성공' : '❌ 실패'}`);
    console.log(`  소요 시간:      ${elapsed}초`);
    console.log('='.repeat(50) + '\n');

    return Object.values(results).every(r => r);
}

// CLI 처리
const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
    console.log(`
웹 배포 파일 빌드 스크립트

사용법:
  node build-web-assets.js [옵션]

옵션:
  --ordersheets      Order Sheet 템플릿만 빌드
  --guides           안내문(Guides)만 빌드
  --service-guides   외부 연동 설정 가이드만 빌드
  --manual           Manual HTML만 빌드
  --help, -h         도움말 표시

옵션 없이 실행하면 전체 빌드를 수행합니다.
`);
    process.exit(0);
}

// 실행
let success = true;

if (args.length === 0) {
    success = buildAll();
} else {
    if (args.includes('--ordersheets')) {
        success = buildOrdersheets() && success;
    }
    if (args.includes('--guides')) {
        success = buildGuides() && success;
    }
    if (args.includes('--service-guides')) {
        success = buildServiceGuides() && success;
    }
    if (args.includes('--manual')) {
        success = buildManual() && success;
    }
}

process.exit(success ? 0 : 1);
