# Google OAuth Redirect URL 설정 문제

## 질문
Google 소셜 로그인 시 다른 사이트로 리다이렉트되거나 오류가 발생해요.

## 답변

### 원인
Supabase Dashboard에서 Redirect URLs를 설정하지 않았거나 잘못 설정한 경우 발생합니다.

### 해결 방법

1. **Supabase Dashboard 접속**
   - https://supabase.com/dashboard → 프로젝트 선택
   - Authentication → URL Configuration

2. **Redirect URLs 설정**
   ```
   # 개발 환경
   http://localhost:8888/**
   http://localhost:3000/**

   # 프로덕션 환경
   https://ssalworks.com/**
   ```

3. **Google Cloud Console 확인**
   - APIs & Services → Credentials → OAuth 2.0 Client
   - Authorized redirect URIs에 Supabase callback URL 추가:
   ```
   https://[프로젝트ID].supabase.co/auth/v1/callback
   ```

### 실제 경험
SSAL Works 개발 중 Google 로그인 테스트 시 PoliticianFinder 프로젝트로 리다이렉트되는 문제가 있었습니다.
원인은 Supabase Redirect URLs에 localhost가 등록되지 않아서였습니다.

### 관련 문서
- `S1_개발_준비/Security/GOOGLE_OAUTH_SETUP.md`
