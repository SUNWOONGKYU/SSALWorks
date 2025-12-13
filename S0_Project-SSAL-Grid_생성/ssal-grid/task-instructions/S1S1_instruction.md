# Task Instruction - S1S1

## Task ID
S1S1

## Task Name
Supabase Auth Provider 설정

## Task Goal
Supabase에서 Google OAuth Provider 설정 및 Redirect URL 등록

## Prerequisites (Dependencies)
- S1BI1 (환경변수 설정) 완료
- Google Cloud Console 프로젝트 존재

## Specific Instructions

### 1. Google Cloud Console 설정
- Google Cloud Console (https://console.cloud.google.com) 접속
- 프로젝트 선택 또는 생성
- APIs & Services > Credentials 이동

### 2. OAuth 2.0 클라이언트 생성
- "Create Credentials" > "OAuth client ID"
- Application type: "Web application"
- Name: "SSALWorks"
- Authorized JavaScript origins:
  - `http://localhost:3000` (개발)
  - `https://ssalworks.vercel.app` (프로덕션)
  - `https://ssalworks.com` (커스텀 도메인, 추후)
- Authorized redirect URIs:
  - `https://[supabase-project-id].supabase.co/auth/v1/callback`

### 3. Client ID/Secret 저장
- Client ID 복사 → Vercel 환경변수 `GOOGLE_CLIENT_ID`
- Client Secret 복사 → Vercel 환경변수 `GOOGLE_CLIENT_SECRET`

### 4. Supabase Dashboard 설정
- Supabase Dashboard > Authentication > Providers
- Google 활성화
- Client ID 입력
- Client Secret 입력
- Redirect URL 확인

### 5. OAuth Consent Screen 설정
- User Type: External
- App name: SSALWorks
- User support email 설정
- Developer contact email 설정
- Scopes: email, profile, openid

## Expected Output Files
- 없음 (외부 서비스 설정)
- `docs/GOOGLE_OAUTH_SETUP.md` (설정 가이드 문서)

## Completion Criteria
- [ ] Google Cloud OAuth 클라이언트 생성
- [ ] Supabase Google Provider 활성화
- [ ] Redirect URL 등록 완료
- [ ] 환경변수 설정 완료
- [ ] OAuth Consent Screen 설정 완료
- [ ] 설정 가이드 문서 작성

## Tech Stack
- Google Cloud Console
- Supabase Authentication
- OAuth 2.0

## Tools
- WebFetch (Dashboard 접속)
- Write (문서 작성)

## Execution Type
Human-AI (Dashboard 접속 필요)

## Remarks
- OAuth Consent Screen 승인에 시간 소요 가능
- 개발 중에는 Test users 추가하여 사용
- 프로덕션 배포 시 OAuth 앱 승인 신청 필요
