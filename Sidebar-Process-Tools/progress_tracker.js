// progress_tracker.js - 프론트엔드 진행률 추적 모듈
// HTML에 <script src="progress_tracker.js"></script>로 포함

const PROGRESS_SERVER = 'http://localhost:3032';

// 폴더 기반 진행률 조회 (사업계획, 프로젝트 기획)
async function calculateFolderProgress() {
    try {
        const response = await fetch(`${PROGRESS_SERVER}/check-folder-progress`);
        if (!response.ok) throw new Error('서버 연결 실패');

        const data = await response.json();

        if (data.business) updatePrepProgress('사업계획', data.business.progress);
        if (data.planning) updatePrepProgress('프로젝트 기획', data.planning.progress);

        console.log('📊 폴더 진행률:', data);
        return data;
    } catch (error) {
        console.warn('⚠️ 폴더 진행률 조회 실패:', error.message);
        return null;
    }
}

// 준비단계 진행률 UI 업데이트
function updatePrepProgress(stageName, progress) {
    document.querySelectorAll('.process-prep').forEach(el => {
        const nameEl = el.querySelector('.process-prep-name');
        if (nameEl && nameEl.textContent.includes(stageName)) {
            el.setAttribute('data-progress', progress);

            const fillEl = el.querySelector('.process-progress-fill');
            if (fillEl) fillEl.style.width = `${progress}%`;

            const percentEl = el.querySelector('.process-percent');
            if (percentEl) percentEl.textContent = `${progress}%`;

            if (progress === 100) {
                el.classList.add('completed');
            } else {
                el.classList.remove('completed');
            }
        }
    });
}

// Supabase 기반 진행률 조회 (S1~S6)
async function calculateStageProgress() {
    try {
        const response = await fetch(`${PROGRESS_SERVER}/check-stage-progress`);
        if (!response.ok) throw new Error('서버 연결 실패');

        const data = await response.json();

        Object.entries(data).forEach(([key, value]) => {
            updateMajorProgress(key, value.progress);
        });

        console.log('📊 Stage 진행률:', data);
        return data;
    } catch (error) {
        console.warn('⚠️ Stage 진행률 조회 실패:', error.message);
        return null;
    }
}

// 개발단계 진행률 UI 업데이트
function updateMajorProgress(stageKey, progress) {
    const stageMap = {
        's1': 'S1.', 's2': 'S2.', 's3': 'S3.',
        's4': 'S4.', 's5': 'S5.', 's6': 'S6.'
    };

    const stageIcon = stageMap[stageKey];
    if (!stageIcon) return;

    document.querySelectorAll('.process-major').forEach(el => {
        const iconEl = el.querySelector('.process-icon');
        if (iconEl && iconEl.textContent === stageIcon) {
            el.setAttribute('data-progress', progress);

            const fillEl = el.querySelector('.process-progress-fill');
            if (fillEl) fillEl.style.width = `${progress}%`;

            const percentEl = el.querySelector('.process-percent');
            if (percentEl) percentEl.textContent = `${progress}%`;

            if (progress === 100) {
                el.classList.add('completed');
            } else {
                el.classList.remove('completed');
            }
        }
    });
}

// 전체 진행률 새로고침
async function refreshAllProgress() {
    console.log('🔄 진행률 새로고침...');
    await Promise.all([calculateFolderProgress(), calculateStageProgress()]);
    console.log('✅ 완료');
}

// 페이지 로드 시 자동 실행
window.addEventListener('load', () => setTimeout(refreshAllProgress, 1000));

// 30초마다 자동 갱신
setInterval(refreshAllProgress, 30000);

// 외부 호출용
window.progressTracker = {
    refreshAllProgress,
    calculateFolderProgress,
    calculateStageProgress
};

console.log('✅ Progress Tracker 로드됨 (서버: ' + PROGRESS_SERVER + ')');
