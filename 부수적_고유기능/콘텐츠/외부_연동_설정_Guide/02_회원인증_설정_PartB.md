# 회원인증 설정 가이드 (Part B - Claude Code용)

> 기술 참조 문서: OAuth 클라이언트 구현, 세션 관리, 트러블슈팅

**대상**: Claude Code / 개발자
**전제조건**: Part A 완료 (Google OAuth 클라이언트, Supabase Provider 설정)

---

## 1. 인증 구조

```
사용자 (브라우저)
    ↓ Google 로그인 버튼 클릭
SSALWorks 앱
    ↓ signInWithOAuth('google')
Supabase Auth
    ↓ OAuth 요청
Google OAuth
    ↓ 인증 완료
Supabase Callback URL
    ↓ 세션 생성
SSALWorks 앱 (로그인 완료)
```

---

## 2. 클라이언트 구현

### 2.1 Supabase Client 초기화

```html
<!-- Supabase JS CDN -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

<script>
const SUPABASE_URL = 'https://[프로젝트ID].supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGci...';

const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
</script>
```

### 2.2 Google 로그인 함수

```javascript
async function handleGoogleLogin() {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: window.location.origin + '/index.html',
            queryParams: {
                access_type: 'offline',
                prompt: 'consent'
            }
        }
    });

    if (error) {
        console.error('로그인 오류:', error.message);
        alert('로그인 실패: ' + error.message);
        return;
    }
}
```

### 2.3 세션 확인

```javascript
async function checkSession() {
    const { data: { session } } = await supabaseClient.auth.getSession();

    if (session) {
        console.log('로그인됨:', session.user.email);
        return session.user;
    } else {
        console.log('로그인 안됨');
        return null;
    }
}

// 페이지 로드 시 세션 확인
window.addEventListener('load', checkSession);
```

### 2.4 로그아웃

```javascript
async function handleLogout() {
    const { error } = await supabaseClient.auth.signOut();

    if (!error) {
        window.location.href = '/pages/auth/login.html';
    }
}
```

### 2.5 인증 상태 변경 감지

```javascript
supabaseClient.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN') {
        console.log('로그인됨:', session.user);
        // 로그인 후 처리
    } else if (event === 'SIGNED_OUT') {
        console.log('로그아웃됨');
        // 로그아웃 후 처리
    }
});
```

---

## 3. 로컬 테스트

### 3.1 로컬 서버 실행

```bash
# Production/Frontend 폴더에서
cd Production/Frontend
npx serve . -l 8888

# 브라우저에서 접속
http://localhost:8888/pages/auth/google-login.html
```

> ⚠️ `file://` 프로토콜로 직접 열면 OAuth가 작동하지 않음

### 3.2 Supabase Redirect URLs 설정

```
http://localhost:3000/**
http://localhost:8888/**
https://yourdomain.com/**
```

---

## 4. 트러블슈팅

### 문제 1: "Unsupported provider: provider is not enabled"

**원인**: Supabase에서 Google Provider 미활성화

**해결**:
1. Supabase Dashboard → Authentication → Providers
2. Google 클릭 → Enable 토글 ON
3. Client ID, Client Secret 입력

### 문제 2: "redirect_uri_mismatch" 오류

**원인**: Google Console Redirect URI 불일치

**해결**:
1. Google Cloud Console → Credentials → OAuth 2.0 Client
2. Authorized redirect URIs 확인:
   ```
   https://[프로젝트ID].supabase.co/auth/v1/callback
   ```

### 문제 3: OAuth Client Type 오류

**증상**: Redirect URI 설정란 미표시

**원인**: "Desktop" 타입으로 생성

**해결**: 클라이언트 삭제 후 "Web application"으로 재생성

### 문제 4: 로컬 테스트 실패

**증상**: "페이지를 찾을 수 없음"

**원인**: `file://` 프로토콜 사용

**해결**:
```bash
cd Production/Frontend
npx serve . -l 8888
```

### 문제 5: 로그인 후 리다이렉트 실패

**원인**: redirectTo 미설정 또는 Redirect URLs 미등록

**해결**:
1. 코드에서 `redirectTo` 확인
2. Supabase → Authentication → URL Configuration
3. Redirect URLs에 패턴 추가

---

## 5. 세션 정보 활용

### 5.1 사용자 정보 접근

```javascript
const { data: { session } } = await supabaseClient.auth.getSession();

if (session) {
    const user = session.user;
    console.log('User ID:', user.id);
    console.log('Email:', user.email);
    console.log('Provider:', user.app_metadata.provider);
    console.log('Avatar:', user.user_metadata.avatar_url);
    console.log('Full Name:', user.user_metadata.full_name);
}
```

### 5.2 Access Token 사용

```javascript
const { data: { session } } = await supabaseClient.auth.getSession();

if (session) {
    const accessToken = session.access_token;
    // API 요청에 사용
    fetch('/api/protected', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
}
```

---

## 6. 보안 고려사항

### 필수 사항
- ✅ HTTPS 환경에서만 프로덕션 사용
- ✅ Client Secret은 서버에서만 사용 (브라우저 노출 금지)
- ✅ Redirect URLs 화이트리스트 관리

### 권장 사항
- ✅ 세션 만료 처리 구현
- ✅ CSRF 토큰 검증 (Supabase가 자동 처리)
- ✅ 로그인 시도 제한

---

## 7. 관련 파일

| 파일 | 용도 |
|------|------|
| `Production/Frontend/pages/auth/google-login.html` | Google 로그인 UI |
| `Production/Frontend/assets/js/auth.js` | 인증 관련 함수 |

---

## 참고 문서

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Google OAuth Setup (Supabase)](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/auth-signinwithoauth)
