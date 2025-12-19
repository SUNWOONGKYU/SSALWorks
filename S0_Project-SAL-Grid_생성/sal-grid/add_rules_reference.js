/**
 * @description 모든 instruction 파일에 .claude/rules/ 참조 섹션 추가
 * @date 2025-12-19
 */

const fs = require('fs');
const path = require('path');

const TASK_RULES_SECTION = `
---

## 📌 필수 참조 규칙 파일 (2025-12-19)

> **⚠️ 작업 전 반드시 아래 규칙 파일을 확인하세요!**

| 규칙 파일 | 내용 | 참조 시점 |
|----------|------|----------|
| \`.claude/rules/01_file-naming.md\` | 파일 명명 규칙 | 파일 생성 시 |
| \`.claude/rules/02_save-location.md\` | 저장 위치 규칙 | 파일 저장 시 |
| \`.claude/rules/03_area-stage.md\` | Area/Stage 매핑 | 폴더 선택 시 |
| \`.claude/rules/05_execution-process.md\` | 6단계 실행 프로세스 | 작업 전체 |

`;

const VERIFICATION_RULES_SECTION = `
---

## 📌 필수 참조 규칙 파일 (2025-12-19)

> **⚠️ 검증 전 반드시 아래 규칙 파일을 확인하세요!**

| 규칙 파일 | 내용 | 참조 시점 |
|----------|------|----------|
| \`.claude/rules/04_grid-writing.md\` | Grid 속성 검증 | 결과 기록 시 |
| \`.claude/rules/05_execution-process.md\` | 검증 프로세스 | 검증 수행 순서 |
| \`.claude/rules/06_verification.md\` | 검증 기준 | **핵심 참조** |

`;

function addRulesReference(filePath, rulesSection) {
    const content = fs.readFileSync(filePath, 'utf8');

    // 이미 규칙 참조가 있는지 확인
    if (content.includes('필수 참조 규칙 파일 (2025-12-19)')) {
        console.log(`[SKIP] Already has rules reference: ${path.basename(filePath)}`);
        return false;
    }

    // 첫 번째 # 헤더 찾기
    const lines = content.split('\n');
    const firstHeaderIndex = lines.findIndex(line => line.startsWith('# '));

    if (firstHeaderIndex === -1) {
        console.log(`[WARN] No header found: ${path.basename(filePath)}`);
        return false;
    }

    // 헤더 다음에 규칙 섹션 삽입
    const newLines = [
        ...lines.slice(0, firstHeaderIndex + 1),
        rulesSection,
        ...lines.slice(firstHeaderIndex + 1)
    ];

    fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
    console.log(`[OK] Updated: ${path.basename(filePath)}`);
    return true;
}

function processFolder(folderPath, rulesSection, label) {
    console.log(`\n=== Processing ${label} ===\n`);

    const files = fs.readdirSync(folderPath)
        .filter(f => f.endsWith('.md') && f !== 'TEMPLATE_instruction.md');

    let updated = 0;
    let skipped = 0;

    for (const file of files) {
        const filePath = path.join(folderPath, file);
        if (addRulesReference(filePath, rulesSection)) {
            updated++;
        } else {
            skipped++;
        }
    }

    console.log(`\n${label}: ${updated} updated, ${skipped} skipped`);
    return { updated, skipped };
}

// 메인 실행
const baseDir = __dirname;
const taskDir = path.join(baseDir, 'task-instructions');
const verifyDir = path.join(baseDir, 'verification-instructions');

console.log('Adding .claude/rules/ references to instruction files...\n');

const taskResult = processFolder(taskDir, TASK_RULES_SECTION, 'Task Instructions');
const verifyResult = processFolder(verifyDir, VERIFICATION_RULES_SECTION, 'Verification Instructions');

console.log('\n=== Summary ===');
console.log(`Task Instructions: ${taskResult.updated} updated, ${taskResult.skipped} skipped`);
console.log(`Verification Instructions: ${verifyResult.updated} updated, ${verifyResult.skipped} skipped`);
console.log(`Total: ${taskResult.updated + verifyResult.updated} files updated`);
