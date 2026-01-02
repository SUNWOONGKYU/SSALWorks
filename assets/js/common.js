/**
 * SSAL Works - Common Utilities
 * @task S5F3
 * @version 1.0.0
 * @created 2026-01-02
 * @description 공통 유틸리티 함수 모듈
 *
 * 제공 함수:
 * - showStatus(message, type, duration): 토스트 메시지 표시
 * - formatTimeAgo(dateStr): 상대 시간 표시 (몇 분 전, 몇 시간 전)
 * - customConfirm(message, title): 커스텀 확인 다이얼로그
 */

// 환경 감지 - 배포 환경에서는 localhost 서버 기능 비활성화
// (inline script에서 먼저 선언될 수 있으므로 조건부 설정)
if (typeof window.IS_PRODUCTION === 'undefined') {
    window.IS_PRODUCTION = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
}

/**
 * 상태 메시지 표시 (토스트)
 * @param {string} message - 표시할 메시지
 * @param {string} type - 메시지 유형 (info, success, error, warning)
 * @param {number} duration - 표시 시간 (ms)
 */
function showStatus(message, type = 'info', duration = 3000) {
    const status = document.getElementById('serverStatus');
    if (!status) {
        console.warn('serverStatus 요소가 없습니다.');
        return;
    }

    status.textContent = message;
    status.className = 'server-status show ' + type;

    setTimeout(() => {
        status.className = 'server-status';
    }, duration);
}

/**
 * 상대 시간 표시 (몇 분 전, 몇 시간 전)
 * @param {string} dateStr - ISO 날짜 문자열
 * @returns {string} 상대 시간 문자열
 */
function formatTimeAgo(dateStr) {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now - date;
    const diffMin = Math.floor(diffMs / 60000);
    const diffHour = Math.floor(diffMs / 3600000);
    const diffDay = Math.floor(diffMs / 86400000);

    if (diffMin < 1) return '방금 전';
    if (diffMin < 60) return `${diffMin}분 전`;
    if (diffHour < 24) return `${diffHour}시간 전`;
    if (diffDay < 7) return `${diffDay}일 전`;

    return date.toLocaleDateString('ko-KR');
}

/**
 * 커스텀 확인 다이얼로그
 * @param {string} message - 확인 메시지
 * @param {string} title - 다이얼로그 제목
 * @returns {Promise<boolean>} 확인: true, 취소: false
 */
function customConfirm(message, title = '확인') {
    return new Promise((resolve) => {
        const dialog = document.getElementById('customConfirmDialog');
        if (!dialog) {
            // fallback to native confirm
            resolve(confirm(message));
            return;
        }

        const titleEl = document.getElementById('confirmDialogTitle');
        const messageEl = document.getElementById('confirmDialogMessage');
        const confirmBtn = document.getElementById('confirmDialogConfirm');
        const cancelBtn = document.getElementById('confirmDialogCancel');

        if (titleEl) titleEl.textContent = title;
        if (messageEl) messageEl.textContent = message;
        dialog.style.display = 'flex';

        const handleConfirm = () => {
            dialog.style.display = 'none';
            cleanup();
            resolve(true);
        };

        const handleCancel = () => {
            dialog.style.display = 'none';
            cleanup();
            resolve(false);
        };

        const cleanup = () => {
            if (confirmBtn) confirmBtn.removeEventListener('click', handleConfirm);
            if (cancelBtn) cancelBtn.removeEventListener('click', handleCancel);
        };

        if (confirmBtn) confirmBtn.addEventListener('click', handleConfirm);
        if (cancelBtn) cancelBtn.addEventListener('click', handleCancel);
    });
}

/**
 * HTML 이스케이프 처리
 * @param {string} text - 원본 텍스트
 * @returns {string} 이스케이프된 텍스트
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * 숫자 포맷팅 (천 단위 콤마)
 * @param {number} num - 숫자
 * @returns {string} 포맷팅된 문자열
 */
function formatNumber(num) {
    return num.toLocaleString('ko-KR');
}

// 전역 함수로 노출
window.showStatus = showStatus;
window.formatTimeAgo = formatTimeAgo;
window.customConfirm = customConfirm;
window.escapeHtml = escapeHtml;
window.formatNumber = formatNumber;

console.log('📦 common.js 로드 완료');
