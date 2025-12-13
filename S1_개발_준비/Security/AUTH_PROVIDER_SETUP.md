# SSALWorks v1.0 Auth Provider Setup Guide

## Overview

SSALWorks v1.0 인증 Provider 설정 가이드입니다.
Supabase Authentication과 Google OAuth Provider 설정을 다룹니다.

**Task ID**: S1S1
**Area**: Security (S)
**Stage**: S1 (개발 준비)

---

## 1. Supabase Authentication 구조

### 1.1 인증 흐름

```
사용자 → Google OAuth → Supabase Auth → SSALWorks 앱
                ↓
        Google Cloud Console
        (OAuth 2.0 Client)
```

### 1.2 지원 인증 방식

| 방식 | 상태 | 설명 |
|------|------|------|
| Google OAuth | ✅ 활성화 | 주요 인증 방식 |
| Email/Password | ❌ 비활성화 | 사용 안 함 |
| Magic Link | ❌ 비활성화 | 사용 안 함 |

---

## 2. Google OAuth Provider 설정

### 2.1 Google Cloud Console 설정

**Step 1: 프로젝트 생성/선택**
```
Google Cloud Console → 프로젝트 선택 또는 새 프로젝트 생성
```

**Step 2: OAuth 동의 화면 구성**
```
APIs & Services → OAuth consent screen

- User Type: External
- App name: SSALWorks
- User support email: [관리자 이메일]
- Developer contact: [개발자 이메일]
- Scopes: email, profile, openid
```

**Step 3: OAuth 2.0 클라이언트 생성**
```
APIs & Services → Credentials → Create Credentials → OAuth client ID

- Application type: Web application
- Name: SSALWorks Web Client
- Authorized JavaScript origins:
  - http://localhost:3000 (개발)
  - https://ssalworks.com (프로덕션)
- Authorized redirect URIs:
  - https://[project-id].supabase.co/auth/v1/callback
```

**Step 4: 클라이언트 정보 저장**
```
Client ID: [발급된 Client ID]
Client Secret: [발급된 Client Secret]
```

### 2.2 Supabase Dashboard 설정

**Step 1: Auth Provider 활성화**
```
Supabase Dashboard → Authentication → Providers → Google

- Enable Google provider: ON
- Client ID: [Google Cloud에서 발급받은 ID]
- Client Secret: [Google Cloud에서 발급받은 Secret]
```

**Step 2: Redirect URL 확인**
```
Supabase Dashboard → Authentication → URL Configuration

- Site URL: https://ssalworks.com
- Redirect URLs:
  - http://localhost:3000/** (개발)
  - https://ssalworks.com/** (프로덕션)
```

---

## 3. Redirect URL 설정

### 3.1 개발 환경

| 설정 위치 | URL |
|-----------|-----|
| Site URL | http://localhost:3000 |
| Redirect URLs | http://localhost:3000/** |
| Google OAuth Redirect | https://[project-id].supabase.co/auth/v1/callback |

### 3.2 프로덕션 환경

| 설정 위치 | URL |
|-----------|-----|
| Site URL | https://ssalworks.com |
| Redirect URLs | https://ssalworks.com/** |
| Google OAuth Redirect | https://[project-id].supabase.co/auth/v1/callback |

### 3.3 Redirect URL 체크리스트

- [ ] Google Cloud Console에 Supabase callback URL 등록
- [ ] Supabase Dashboard에 Site URL 설정
- [ ] Supabase Dashboard에 Redirect URLs 등록
- [ ] 개발/프로덕션 환경별 URL 구분 확인

---

## 4. 클라이언트 구현

### 4.1 Supabase Client 초기화

```javascript
// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://[project-id].supabase.co';
const supabaseAnonKey = '[anon-key]';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### 4.2 Google OAuth 로그인

```javascript
// Google OAuth 로그인 시작
async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${window.location.origin}/auth/callback`
        }
    });

    if (error) {
        console.error('Login error:', error.message);
        return;
    }
}
```

### 4.3 세션 확인

```javascript
// 현재 세션 확인
async function getSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    return session;
}

// 세션 변경 감지
supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN') {
        console.log('User signed in:', session.user);
    } else if (event === 'SIGNED_OUT') {
        console.log('User signed out');
    }
});
```

### 4.4 로그아웃

```javascript
// 로그아웃
async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error('Logout error:', error.message);
    }
}
```

---

## 5. 보안 설정

### 5.1 RLS (Row Level Security)

```sql
-- users 테이블 RLS 정책
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- 자신의 데이터만 조회 가능
CREATE POLICY "Users can view own data" ON users
    FOR SELECT USING (auth.uid() = id);

-- 자신의 데이터만 수정 가능
CREATE POLICY "Users can update own data" ON users
    FOR UPDATE USING (auth.uid() = id);
```

### 5.2 Auth 설정

```
Supabase Dashboard → Authentication → Settings

- Enable email confirmations: OFF (Google OAuth 사용)
- Enable double opt-in: OFF
- Minimum password length: N/A (비밀번호 미사용)
- JWT expiry: 3600 (1시간)
- Enable refresh token rotation: ON
```

### 5.3 보안 체크리스트

- [ ] RLS 정책 설정 완료
- [ ] Service Role Key는 서버사이드에서만 사용
- [ ] Anon Key는 클라이언트에서 안전하게 사용
- [ ] Redirect URL 화이트리스트 설정
- [ ] JWT 만료 시간 적절히 설정

---

## 6. 트러블슈팅

### 6.1 일반적인 오류

| 오류 | 원인 | 해결 |
|------|------|------|
| `redirect_uri_mismatch` | Google Console의 Redirect URI 불일치 | Supabase callback URL 정확히 등록 |
| `invalid_client` | Client ID/Secret 오류 | 값 다시 확인 |
| `access_denied` | OAuth 동의 화면 미완료 | 동의 화면 설정 완료 |
| `CORS error` | 도메인 미등록 | JavaScript origins 추가 |

### 6.2 디버깅

```javascript
// 인증 상태 확인
const { data, error } = await supabase.auth.getSession();
console.log('Session:', data.session);
console.log('User:', data.session?.user);

// 에러 로깅
supabase.auth.onAuthStateChange((event, session) => {
    console.log('Auth event:', event);
    console.log('Session:', session);
});
```

---

## 7. 관련 Task

| Task ID | 설명 | 상태 |
|---------|------|------|
| S1S1 | Supabase Auth Provider 설정 | ✅ 완료 |
| S1BI1 | 환경변수 설정 | ✅ 완료 |

---

## 8. 참고 문서

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Google OAuth Setup](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [Supabase RLS Guide](https://supabase.com/docs/guides/auth/row-level-security)

---

**Last Updated**: 2025-12-13
**Version**: 1.0
