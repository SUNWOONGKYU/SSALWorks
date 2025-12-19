/**
 * Stage Gate 업데이트 스크립트
 * 용도: stage_verification 테이블 업데이트
 *
 * 사용법:
 * node update-stage-gate.js <stage_number>
 *
 * 예시:
 * node update-stage-gate.js 3
 */

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://zwjmfewyshhwpgwdtrus.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3am1mZXd5c2hod3Bnd2R0cnVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1NzE1NTEsImV4cCI6MjA3OTE0NzU1MX0.AJy34h5VR8QS6WFEcUcBeJJu8I3bBQ6UCk1I84Wb7y4';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function updateStageGate(stageNumber) {
    const stageName = `Stage ${stageNumber}`;
    const reportPath = `S0_Project-SSAL-Grid_생성/ssal-grid/stage-gates/S${stageNumber}GATE_verification_report.md`;

    console.log(`\n📝 Stage Gate UPDATE: ${stageName}`);
    console.log('─'.repeat(50));

    const updates = {
        verification_report_path: reportPath,
        ai_verification_note: 'S3 Stage 4개 Task 모두 완료 (100%). AI API 3종(Gemini/ChatGPT/Perplexity) 연동 성공. 헬스체크 API 정상 작동. 프론트엔드 AI Q&A 기능 테스트 통과. 시스템 프롬프트 제거로 Gemini 정체성 혼동 이슈 해결. Stage 폴더 이중 저장 완료. Critical Blocker 없음. Stage Gate 통과 권장.',
        ai_verification_date: new Date().toISOString(),
        stage_gate_status: 'AI Verified',
        auto_verification_status: 'Verified',
        auto_verification_result: 'PASS - 4/4 Tasks Completed, AI API 3종 정상'
    };

    console.log('Updates:', JSON.stringify(updates, null, 2));
    console.log('─'.repeat(50));

    try {
        // stage_name으로 UPDATE
        const { data, error } = await supabase
            .from('stage_verification')
            .update(updates)
            .eq('stage_name', stageName)
            .select();

        if (error) {
            console.error('❌ UPDATE 실패:', error.message);
            console.error('Error details:', error);
            return { success: false, error };
        }

        if (data && data.length > 0) {
            console.log('✅ Stage Gate 업데이트 성공!');
            console.log('Result:', JSON.stringify(data[0], null, 2));
            return { success: true, data: data[0] };
        } else {
            console.log('⚠️ 업데이트된 레코드 없음');
            return { success: false, error: 'No records updated' };
        }

    } catch (err) {
        console.error('❌ 예외 발생:', err.message);
        return { success: false, error: err };
    }
}

// CLI 실행
async function main() {
    const stageNumber = parseInt(process.argv[2]) || 3;

    console.log(`\n🚀 Stage ${stageNumber} Gate 업데이트 시작...\n`);

    const result = await updateStageGate(stageNumber);

    if (result.success) {
        console.log('\n✅ Stage Gate 업데이트 완료!');
        console.log('📋 Project Owner 승인 대기 상태');
    }

    process.exit(result.success ? 0 : 1);
}

main();
