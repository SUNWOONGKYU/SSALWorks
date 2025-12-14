// progress_server.js - 사이드바 진행률 계산 서버
// 실행: node progress_server.js

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3032;

app.use(cors());
app.use(express.json());

// 기본 경로 설정
const SSAL_WORKS_PATH = 'C:/!SSAL_Works_Private';

// Health check
app.get('/ping', (req, res) => {
    res.json({ status: 'ok', message: 'Progress server running', port: PORT });
});

// ================================================================
// 폴더 기반 진행률 계산 (사업계획, 프로젝트 기획)
// ================================================================
app.get('/check-folder-progress', (req, res) => {
    try {
        // 사업계획 폴더 (5개)
        const businessFolders = ['Vision_Mission', 'Market_Analysis', 'Business_Model', 'Patent', 'BusenessPlan'];
        const businessPath = path.join(SSAL_WORKS_PATH, 'P1_사업계획');
        let businessCompleted = 0;
        const businessDetails = [];

        businessFolders.forEach(folder => {
            const folderPath = path.join(businessPath, folder);
            let hasContent = false;
            let fileCount = 0;

            if (fs.existsSync(folderPath)) {
                const files = fs.readdirSync(folderPath).filter(f =>
                    f.endsWith('.md') || f.endsWith('.json') || f.endsWith('.txt')
                );
                fileCount = files.length;
                if (fileCount > 0) {
                    hasContent = true;
                    businessCompleted++;
                }
            }

            businessDetails.push({ folder, hasContent, fileCount });
        });

        // 프로젝트 기획 폴더 (9개)
        const planningFolders = ['Project_Plan', 'User_Flows', 'Requirements', 'Workflows', 'Design_System', 'UI_UX_Mockup', 'Tech_Stack', 'Content_System', 'DomainRegistration'];
        const planningPath = path.join(SSAL_WORKS_PATH, 'P2_프로젝트_기획');
        let planningCompleted = 0;
        const planningDetails = [];

        planningFolders.forEach(folder => {
            const folderPath = path.join(planningPath, folder);
            let hasContent = false;
            let fileCount = 0;

            if (fs.existsSync(folderPath)) {
                const files = fs.readdirSync(folderPath).filter(f =>
                    f.endsWith('.md') || f.endsWith('.json') || f.endsWith('.html') || f.endsWith('.jpg') || f.endsWith('.png')
                );
                fileCount = files.length;
                if (fileCount > 0) {
                    hasContent = true;
                    planningCompleted++;
                }
            }

            planningDetails.push({ folder, hasContent, fileCount });
        });

        // P3 프로토타입 제작 (Agenda 10개 완료 여부)
        const prototypePath = path.join(SSAL_WORKS_PATH, 'P3_프로토타입_제작');
        let prototypeCompleted = 0;
        const prototypeTotal = 10; // Agenda #1~#10
        const prototypeDetails = [];

        // 핵심 파일/폴더 존재 여부로 완료 체크 (실제 파일명에 맞춤)
        const prototypeChecks = [
            { name: 'Agenda #1 공지사항', check: () => fs.existsSync(path.join(prototypePath, 'Database/01_notices_tables.sql')) },
            { name: 'Agenda #2 학습용 콘텐츠', check: () => fs.existsSync(path.join(prototypePath, 'Database/06_create_learning_contents.sql')) },
            { name: 'Agenda #3 FAQ', check: () => fs.existsSync(path.join(prototypePath, 'Database/09_create_faqs.sql')) },
            { name: 'Agenda #4 회원가입/인증', check: () => fs.existsSync(path.join(prototypePath, 'Database/12_extend_users_table.sql')) },
            { name: 'Agenda #5 프로젝트 등록', check: () => fs.existsSync(path.join(prototypePath, 'Database/15_create_projects.sql')) },
            { name: 'Agenda #6 플랫폼 이용료', check: () => fs.existsSync(path.join(prototypePath, 'Database/20_create_billing_history.sql')) },
            { name: 'Agenda #7 AI 크레딧', check: () => fs.existsSync(path.join(prototypePath, 'Database/24_create_credit_tables.sql')) },
            { name: 'Agenda #8 My Page', check: () => fs.existsSync(path.join(prototypePath, 'Frontend/Prototype/pages/mypage/index.html')) },
            { name: 'Agenda #9 고객 문의', check: () => fs.existsSync(path.join(prototypePath, 'Database/28_create_inquiries_table.sql')) },
            { name: 'Agenda #10 매뉴얼', check: () => fs.existsSync(path.join(prototypePath, 'Database/18_create_manuals.sql')) }
        ];

        prototypeChecks.forEach(item => {
            let completed = false;
            try {
                completed = item.check();
            } catch (e) {
                completed = false;
            }
            if (completed) prototypeCompleted++;
            prototypeDetails.push({ name: item.name, completed });
        });

        const result = {
            business: {
                completed: businessCompleted,
                total: businessFolders.length,
                progress: Math.round((businessCompleted / businessFolders.length) * 100),
                details: businessDetails
            },
            planning: {
                completed: planningCompleted,
                total: planningFolders.length,
                progress: Math.round((planningCompleted / planningFolders.length) * 100),
                details: planningDetails
            },
            prototype: {
                completed: prototypeCompleted,
                total: prototypeTotal,
                progress: Math.round((prototypeCompleted / prototypeTotal) * 100),
                details: prototypeDetails
            }
        };

        console.log(`📊 사업계획: ${result.business.progress}% (${businessCompleted}/${businessFolders.length})`);
        console.log(`📊 프로젝트기획: ${result.planning.progress}% (${planningCompleted}/${planningFolders.length})`);
        console.log(`📊 프로토타입: ${result.prototype.progress}% (${prototypeCompleted}/${prototypeTotal})`);

        res.json(result);
    } catch (error) {
        console.error('❌ 폴더 진행률 조회 실패:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// ================================================================
// Stage Gate 기반 진행률 계산 (S1~S5 개발단계)
// Stage Gate 검증 리포트 파일 존재 여부로 완료 판단
// ================================================================
app.get('/check-stage-progress', (req, res) => {
    try {
        const stageGatePath = path.join(SSAL_WORKS_PATH, 'S0_Project-SSAL-Grid_생성/ssal-grid/stage-gates');

        // Stage별 정보 (Task 수는 SSALWORKS_TASK_PLAN.md 기준)
        const stages = {
            s1: { name: 'S1. 개발 준비', gateFile: 'S1GATE_verification_report.md', totalTasks: 8 },
            s2: { name: 'S2. 개발 1차', gateFile: 'S2GATE_verification_report.md', totalTasks: 12 },
            s3: { name: 'S3. 개발 2차', gateFile: 'S3GATE_verification_report.md', totalTasks: 4 },
            s4: { name: 'S4. 개발 3차', gateFile: 'S4GATE_verification_report.md', totalTasks: 7 },
            s5: { name: 'S5. 운영', gateFile: 'S5GATE_verification_report.md', totalTasks: 6 }
        };

        const result = {};

        Object.entries(stages).forEach(([key, stage]) => {
            const gateFilePath = path.join(stageGatePath, stage.gateFile);
            const gateExists = fs.existsSync(gateFilePath);

            // Stage Gate 파일이 존재하면 100% 완료
            const progress = gateExists ? 100 : 0;
            const completed = gateExists ? stage.totalTasks : 0;

            result[key] = {
                stage: stage.name,
                completed: completed,
                total: stage.totalTasks,
                progress: progress,
                gateStatus: gateExists ? 'Verified' : 'Pending'
            };
        });

        console.log('📊 Stage Gate 기반 진행률 조회:');
        Object.entries(result).forEach(([key, val]) => {
            console.log(`   ${val.stage}: ${val.progress}% (${val.gateStatus})`);
        });

        res.json(result);
    } catch (error) {
        console.error('❌ Stage 진행률 조회 실패:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// ================================================================
// 특별단계 진행률 계산 (dir_structure, sal_grid)
// ================================================================
app.get('/check-special-progress', (req, res) => {
    try {
        // 특별단계 1: 작업 디렉토리 구조 생성
        const dirStructureChecks = [
            { name: 'P1_사업계획', check: () => fs.existsSync(path.join(SSAL_WORKS_PATH, 'P1_사업계획')) },
            { name: 'P2_프로젝트_기획', check: () => fs.existsSync(path.join(SSAL_WORKS_PATH, 'P2_프로젝트_기획')) },
            { name: 'P3_프로토타입_제작', check: () => fs.existsSync(path.join(SSAL_WORKS_PATH, 'P3_프로토타입_제작')) }
        ];
        let dirCompleted = 0;
        dirStructureChecks.forEach(item => { if (item.check()) dirCompleted++; });
        const dirProgress = Math.round((dirCompleted / dirStructureChecks.length) * 100);

        // 특별단계 2: Project SAL Grid 생성
        const salGridPath = path.join(SSAL_WORKS_PATH, 'P3_프로토타입_제작/Frontend/Prototype/project_ssal_grid.json');
        const salGridExists = fs.existsSync(salGridPath);
        const salGridProgress = salGridExists ? 100 : 0;

        const result = {
            dir_structure: { name: '작업 디렉토리 구조', completed: dirCompleted, total: dirStructureChecks.length, progress: dirProgress },
            sal_grid: { name: 'Project SAL Grid', completed: salGridExists ? 1 : 0, total: 1, progress: salGridProgress }
        };
        console.log(`📊 특별단계 - 디렉토리구조: ${dirProgress}%, SAL Grid: ${salGridProgress}%`);
        res.json(result);
    } catch (error) {
        console.error('❌ 특별단계 진행률 조회 실패:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════════════╗
║   📊 Sidebar Progress Server                          ║
║   포트: ${PORT}                                         ║
║                                                       ║
║   API 엔드포인트:                                      ║
║   - GET /check-folder-progress  (폴더 기반)           ║
║   - GET /check-stage-progress   (Supabase 기반)       ║
╚═══════════════════════════════════════════════════════╝
`);
});
