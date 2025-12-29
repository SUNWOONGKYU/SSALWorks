/**
 * setup-hooks.js
 *
 * Pre-commit Hook 자동 설치 스크립트
 * 패키지 설치 후 최초 1회 실행하면 Git Hook이 설정됨
 *
 * 사용법: node scripts/setup-hooks.js
 */

const fs = require('fs');
const path = require('path');

// 프로젝트 루트 경로
const PROJECT_ROOT = path.join(__dirname, '..');

// Pre-commit Hook 내용
const PRE_COMMIT_HOOK = `#!/bin/sh
# Pre-commit Hook
# Stage 폴더 → 루트 폴더 자동 동기화

echo "🔄 Stage → Root 동기화 중..."

node scripts/sync-to-root.js

if [ $? -ne 0 ]; then
    echo "❌ 동기화 실패! 커밋을 중단합니다."
    exit 1
fi

echo "✅ 동기화 완료! 커밋을 진행합니다."

# 빌드 스크립트 실행 (선택)
if [ -f "scripts/build-web-assets.js" ]; then
    echo "🔨 웹 배포 파일 빌드 중..."
    node scripts/build-web-assets.js

    # 빌드로 생성된 파일도 커밋에 포함
    git add -A

    echo "✅ 빌드 완료! 커밋을 진행합니다."
fi
`;

// 메인 함수
function main() {
    console.log('🔧 Pre-commit Hook 설치 시작...\n');

    // .git 폴더 확인
    const gitDir = path.join(PROJECT_ROOT, '.git');
    if (!fs.existsSync(gitDir)) {
        console.error('❌ .git 폴더를 찾을 수 없습니다.');
        console.log('   먼저 git init을 실행하세요.');
        process.exit(1);
    }

    // hooks 폴더 확인/생성
    const hooksDir = path.join(gitDir, 'hooks');
    if (!fs.existsSync(hooksDir)) {
        fs.mkdirSync(hooksDir, { recursive: true });
        console.log('📁 hooks 폴더 생성됨');
    }

    // pre-commit 파일 경로
    const preCommitPath = path.join(hooksDir, 'pre-commit');

    // 기존 파일 백업
    if (fs.existsSync(preCommitPath)) {
        const backupPath = path.join(hooksDir, 'pre-commit.backup');
        fs.copyFileSync(preCommitPath, backupPath);
        console.log('📦 기존 pre-commit 백업됨: pre-commit.backup');
    }

    // pre-commit 파일 생성
    fs.writeFileSync(preCommitPath, PRE_COMMIT_HOOK, { mode: 0o755 });
    console.log('✅ pre-commit hook 설치 완료!');

    // sync-to-root.js 확인
    const syncScript = path.join(PROJECT_ROOT, 'scripts', 'sync-to-root.js');
    if (!fs.existsSync(syncScript)) {
        console.warn('\n⚠️  경고: scripts/sync-to-root.js가 없습니다.');
        console.log('   동기화 스크립트를 scripts/ 폴더에 추가하세요.');
    } else {
        console.log('✅ sync-to-root.js 확인됨');
    }

    console.log('\n🎉 설치 완료!');
    console.log('   이제 git commit 시 자동으로 Stage → Root 동기화가 실행됩니다.');
}

// 실행
main();
