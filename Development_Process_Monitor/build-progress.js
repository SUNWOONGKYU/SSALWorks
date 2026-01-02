/**
 * build-progress.js
 *
 * P0~S0 진행률을 폴더/파일 구조에서 자동 계산하여 JSON 생성
 * S1~S5 진행률은 sal_grid.csv에서 자동 계산
 *
 * 사용법: node build-progress.js
 */

const fs = require('fs');
const path = require('path');

// 프로젝트 루트 경로
const PROJECT_ROOT = path.join(__dirname, '..');

// Phase 정의 (P0~S0)
const PHASES = {
    'P0': {
        folder: 'P0_작업_디렉토리_구조_생성',
        name: '작업 디렉토리 구조 생성'
    },
    'P1': {
        folder: 'P1_사업계획',
        name: '사업계획'
    },
    'P2': {
        folder: 'P2_프로젝트_기획',
        name: '프로젝트 기획'
    },
    'P3': {
        folder: 'P3_프로토타입_제작',
        name: '프로토타입 제작'
    },
    'S0': {
        folder: 'S0_Project-SAL-Grid_생성',
        name: 'Project SAL Grid 생성'
    }
};

// 파일에 내용이 있는지 확인 (크기 > 0)
function hasContent(filePath) {
    try {
        const stats = fs.statSync(filePath);
        return stats.size > 0;
    } catch (e) {
        return false;
    }
}

// 폴더 안에 파일이 1개 이상 있는지 확인 (하위 폴더 포함)
function hasFiles(folderPath) {
    try {
        const items = fs.readdirSync(folderPath);
        return items.some(item => {
            const itemPath = path.join(folderPath, item);
            try {
                const stats = fs.statSync(itemPath);
                if (stats.isFile()) {
                    return true;
                }
                // 하위 폴더도 재귀적으로 확인
                if (stats.isDirectory() && !item.startsWith('.') && !item.startsWith('_')) {
                    return hasFiles(itemPath);
                }
                return false;
            } catch (e) {
                return false;
            }
        });
    } catch (e) {
        return false;
    }
}

// Phase 진행률 계산
function calculatePhaseProgress(phaseCode, phasePath) {
    try {
        const items = fs.readdirSync(phasePath);

        // 하위 폴더 목록 (숨김 폴더 제외)
        const subfolders = items.filter(item => {
            if (item.startsWith('.') || item.startsWith('_')) return false;
            const itemPath = path.join(phasePath, item);
            try {
                return fs.statSync(itemPath).isDirectory();
            } catch (e) {
                return false;
            }
        });

        // 파일 목록 (숨김 파일 제외, .md/.json/.js 등 주요 파일만)
        const files = items.filter(item => {
            if (item.startsWith('.') || item.startsWith('_')) return false;
            const itemPath = path.join(phasePath, item);
            try {
                return fs.statSync(itemPath).isFile();
            } catch (e) {
                return false;
            }
        });

        let completed, total, details;

        if (subfolders.length > 0) {
            // 폴더 기반 계산 (P1~S0)
            total = subfolders.length;
            const completedFolders = subfolders.filter(folder => {
                const folderPath = path.join(phasePath, folder);
                return hasFiles(folderPath);
            });
            completed = completedFolders.length;

            details = subfolders.map(folder => ({
                name: folder,
                completed: hasFiles(path.join(phasePath, folder))
            }));
        } else {
            // 파일 기반 계산 (P0)
            total = files.length;
            const completedFiles = files.filter(file => {
                const filePath = path.join(phasePath, file);
                return hasContent(filePath);
            });
            completed = completedFiles.length;

            details = files.map(file => ({
                name: file,
                completed: hasContent(path.join(phasePath, file))
            }));
        }

        const progress = total > 0 ? Math.round(completed / total * 100) : 0;

        return {
            completed,
            total,
            progress,
            details
        };
    } catch (e) {
        console.error(`Error calculating progress for ${phaseCode}:`, e.message);
        return {
            completed: 0,
            total: 0,
            progress: 0,
            details: []
        };
    }
}

// SAL Grid CSV에서 S1~S5 진행률 계산
function calculateStageProgressFromCSV(csvPath) {
    const stageProgress = {
        'S1': { name: '개발 준비', progress: 0, completed: 0, total: 0 },
        'S2': { name: '개발 1차', progress: 0, completed: 0, total: 0 },
        'S3': { name: '개발 2차', progress: 0, completed: 0, total: 0 },
        'S4': { name: '개발 3차', progress: 0, completed: 0, total: 0 },
        'S5': { name: '개발 마무리', progress: 0, completed: 0, total: 0 }
    };

    try {
        if (!fs.existsSync(csvPath)) {
            console.warn('sal_grid.csv not found, S1~S5 progress will be 0');
            return stageProgress;
        }

        const csvContent = fs.readFileSync(csvPath, 'utf-8');
        const lines = csvContent.trim().split('\n');

        if (lines.length < 2) {
            return stageProgress;
        }

        // 헤더 파싱
        const headers = lines[0].split(',').map(h => h.trim());
        const stageIndex = headers.indexOf('stage');
        const statusIndex = headers.indexOf('task_status');

        if (stageIndex === -1 || statusIndex === -1) {
            console.warn('CSV format error: stage or task_status column not found');
            return stageProgress;
        }

        // 데이터 파싱
        for (let i = 1; i < lines.length; i++) {
            const values = parseCSVLine(lines[i]);
            const stage = values[stageIndex];
            const status = values[statusIndex];

            const stageKey = `S${stage}`;
            if (stageProgress[stageKey]) {
                stageProgress[stageKey].total++;
                if (status === 'Completed') {
                    stageProgress[stageKey].completed++;
                }
            }
        }

        // 진행률 계산
        Object.keys(stageProgress).forEach(key => {
            const s = stageProgress[key];
            s.progress = s.total > 0 ? Math.round(s.completed / s.total * 100) : 0;
        });

        return stageProgress;
    } catch (e) {
        console.error('Error reading sal_grid.csv:', e.message);
        return stageProgress;
    }
}

// CSV 라인 파싱 (쉼표가 포함된 값 처리)
function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    result.push(current.trim());

    return result;
}

// 메인 실행
function main() {
    console.log('📊 Progress Builder - P0~S5 진행률 계산\n');

    const result = {
        project_id: 'SSALWORKS',
        updated_at: new Date().toISOString(),
        phases: {}
    };

    // P0~S0 진행률 계산 (폴더/파일 기반)
    console.log('=== P0~S0 (폴더/파일 기반) ===');
    Object.entries(PHASES).forEach(([code, config]) => {
        const phasePath = path.join(PROJECT_ROOT, config.folder);
        const progress = calculatePhaseProgress(code, phasePath);

        result.phases[code] = {
            name: config.name,
            progress: progress.progress,
            completed: progress.completed,
            total: progress.total
        };

        const status = progress.progress === 100 ? '✅' : progress.progress > 0 ? '🔄' : '⏳';
        console.log(`${status} ${code}: ${progress.completed}/${progress.total} = ${progress.progress}%`);
    });

    // S1~S5 진행률 계산 (CSV 기반)
    console.log('\n=== S1~S5 (SAL Grid CSV 기반) ===');
    const csvPath = path.join(PROJECT_ROOT, 'S0_Project-SAL-Grid_생성', 'method', 'csv', 'data', 'in_progress', 'sal_grid.csv');
    const stageProgress = calculateStageProgressFromCSV(csvPath);

    Object.entries(stageProgress).forEach(([code, data]) => {
        result.phases[code] = {
            name: data.name,
            progress: data.progress,
            completed: data.completed,
            total: data.total
        };

        const status = data.progress === 100 ? '✅' : data.progress > 0 ? '🔄' : '⏳';
        console.log(`${status} ${code}: ${data.completed}/${data.total} = ${data.progress}%`);
    });

    // JSON 파일 저장 (Development_Process_Monitor/data/ 폴더)
    const outputDir = path.join(__dirname, 'data');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, 'phase_progress.json');
    fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf-8');

    console.log(`\n✅ 저장 완료: ${outputPath}`);

    return result;
}

// 실행
main();
