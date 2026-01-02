/**
 * SSAL Works - Authentication Module
 * @task S5F3
 * @version 1.0.0
 * @created 2026-01-02
 * @description 인증 관련 함수 모듈
 *
 * 의존성:
 * - supabase-init.js (window.supabaseClient)
 *
 * 제공 함수:
 * - checkAuthStatus(): 로그인 상태 확인
 * - showLoggedInUI(nickname, email): 로그인 UI 표시
 * - showLoggedOutUI(): 로그아웃 UI 표시
 * - logoutFromMain(): 로그아웃 실행
 */

// 관리자 이메일 정의
const ADMIN_EMAIL = 'wksun999@gmail.com';
window.ADMIN_EMAIL = ADMIN_EMAIL;

/**
 * 로그인 상태 확인 및 UI 업데이트
 */
async function checkAuthStatus() {
    try {
        if (!window.supabaseClient) {
            console.warn('⚠️ Supabase 클라이언트가 초기화되지 않았습니다.');
            showLoggedOutUI();
            return;
        }

        const { data: { session }, error } = await window.supabaseClient.auth.getSession();

        if (session && session.user) {
            console.log('✅ 로그인 상태:', session.user.email);

            // 사용자 이름 및 크레딧 잔액 가져오기
            const { data: userData, error: userError } = await window.supabaseClient
                .from('users')
                .select('name, nickname, credit_balance')
                .eq('id', session.user.id)
                .single();

            let displayName = '사용자';
            if (userData && userData.nickname) {
                displayName = userData.nickname;
            } else if (userData && userData.name) {
                displayName = userData.name;
            } else if (session.user.user_metadata?.name) {
                displayName = session.user.user_metadata.name;
            } else if (session.user.email) {
                displayName = session.user.email.split('@')[0];
            }

            // 크레딧 잔액 표시 업데이트
            const creditBalanceEl = document.getElementById('perplexityCreditBalance');
            if (creditBalanceEl && userData) {
                const balance = userData.credit_balance || 0;
                creditBalanceEl.textContent = balance.toLocaleString();
            }

            showLoggedInUI(displayName, session.user.email);

            // 진행중 프로젝트 로드 (있는 경우)
            if (typeof loadInProgressProject === 'function') {
                loadInProgressProject(session.user.id);
            }
        } else {
            console.log('ℹ️ 로그인되지 않은 상태');
            showLoggedOutUI();
        }
    } catch (error) {
        console.error('❌ 인증 상태 확인 실패:', error);
        showLoggedOutUI();
    }
}

/**
 * 로그인 UI 표시
 * @param {string} nickname - 사용자 닉네임
 * @param {string} email - 사용자 이메일
 */
function showLoggedInUI(nickname = '사용자', email = '') {
    const guestBtns = document.getElementById('headerGuestBtns');
    const userBtns = document.getElementById('headerUserBtns');
    const nicknameEl = document.getElementById('userNickname');
    const adminModeBtn = document.getElementById('adminModeBtn');

    // 이메일을 localStorage에 저장 (viewer_csv.html 등에서 사용)
    if (email) {
        localStorage.setItem('userEmail', email);
    }

    if (guestBtns) guestBtns.style.display = 'none';
    if (userBtns) userBtns.style.display = 'flex';
    if (nicknameEl) nicknameEl.textContent = nickname + '님';

    // 관리자 이메일만 버튼 표시
    if (adminModeBtn) {
        adminModeBtn.style.display = (email === ADMIN_EMAIL) ? 'inline-block' : 'none';
    }

    // 모바일 로그인 상태 표시
    const mobileLoginBtn = document.getElementById('mobileLoginBtn');
    const mobileUserBadge = document.getElementById('mobileUserBadge');
    if (mobileLoginBtn) {
        mobileLoginBtn.classList.add('logged-in');
        const shortName = nickname.length > 2 ? nickname.substring(0, 2) : nickname;
        mobileLoginBtn.textContent = shortName;
        mobileLoginBtn.href = 'pages/mypage.html';
        mobileLoginBtn.style.fontSize = '12px';
        mobileLoginBtn.style.fontWeight = '700';
    }
    if (mobileUserBadge) {
        mobileUserBadge.style.display = 'none';
    }

    // 알림 로드 (있는 경우)
    if (typeof loadUserNotifications === 'function') {
        loadUserNotifications();
    }
}

/**
 * 로그아웃 UI 표시
 */
function showLoggedOutUI() {
    // localStorage에서 이메일 제거
    localStorage.removeItem('userEmail');

    const guestBtns = document.getElementById('headerGuestBtns');
    const userBtns = document.getElementById('headerUserBtns');
    if (guestBtns) guestBtns.style.display = 'flex';
    if (userBtns) userBtns.style.display = 'none';

    // 모바일 로그아웃 상태 표시
    const mobileLoginBtn = document.getElementById('mobileLoginBtn');
    const mobileUserBadge = document.getElementById('mobileUserBadge');
    if (mobileLoginBtn) {
        mobileLoginBtn.classList.remove('logged-in');
        mobileLoginBtn.textContent = '👤';
        mobileLoginBtn.href = '/pages/auth/login.html';
        mobileLoginBtn.style.fontSize = '18px';
        mobileLoginBtn.style.fontWeight = 'normal';
    }
    if (mobileUserBadge) {
        mobileUserBadge.style.display = 'none';
    }
}

/**
 * 로그아웃 실행
 */
async function logoutFromMain() {
    try {
        if (!window.supabaseClient) {
            console.warn('⚠️ Supabase 클라이언트가 초기화되지 않았습니다.');
            return;
        }

        await window.supabaseClient.auth.signOut();
        console.log('✅ 로그아웃 완료');
        showLoggedOutUI();

        // 관리자 모드 해제 (있는 경우)
        if (typeof exitAdminMode === 'function') {
            exitAdminMode();
        }
    } catch (error) {
        console.error('❌ 로그아웃 실패:', error);
        alert('로그아웃에 실패했습니다.');
    }
}

// 전역 함수로 노출
window.checkAuthStatus = checkAuthStatus;
window.showLoggedInUI = showLoggedInUI;
window.showLoggedOutUI = showLoggedOutUI;
window.logoutFromMain = logoutFromMain;

console.log('📦 auth.js 로드 완료');
