# 회원인증 설정 가이드 (Part A - 초보자용)

> Google 로그인 설정하기 - 단계별 클릭 가이드

**대상**: 비개발자, 처음 설정하는 분
**소요**: 약 15분

---

## 이 가이드에서 할 일

1. ✅ Google Cloud Console에서 OAuth 설정
2. ✅ Supabase에서 Google 로그인 활성화
3. ✅ 두 서비스 연결하기

**코딩 없이 웹사이트에서 클릭만 하면 됩니다!**

---

## 전체 흐름 이해하기

```
사용자가 "Google 로그인" 버튼 클릭
    ↓
Google 로그인 화면으로 이동
    ↓
Google에서 인증 완료
    ↓
우리 앱으로 돌아옴 (로그인 완료!)
```

---

## Step 1: Google Cloud Console 설정

### 1-1. Google Cloud Console 접속
1. 웹 브라우저에서 https://console.cloud.google.com 접속
2. Google 계정으로 로그인

### 1-2. 새 프로젝트 만들기
1. 상단 프로젝트 선택 드롭다운 클릭
2. **"새 프로젝트"** 클릭
3. 프로젝트 이름 입력 (예: `ssalworks`)
4. **"만들기"** 클릭

### 1-3. OAuth 동의 화면 설정

1. 왼쪽 메뉴에서 **"APIs & Services"** 클릭
2. **"OAuth consent screen"** 클릭
3. User Type에서 **"External"** 선택 후 **"만들기"**

4. 앱 정보 입력:

| 항목 | 입력할 내용 |
|------|-------------|
| App name | SSAL Works (사용자에게 보이는 이름) |
| User support email | 본인 이메일 선택 |
| Developer contact | 본인 이메일 입력 |

5. **"저장 후 계속"** 클릭
6. Scopes 화면: 그냥 **"저장 후 계속"**
7. Test users: 테스트할 이메일 추가 (선택) → **"저장 후 계속"**

### 1-4. OAuth 클라이언트 만들기

> ⚠️ **중요**: Application type은 반드시 **"Web application"** 선택!

1. 왼쪽 메뉴 **"Credentials"** 클릭
2. 상단 **"+ CREATE CREDENTIALS"** 클릭
3. **"OAuth client ID"** 선택

4. 설정 입력:

| 항목 | 선택/입력 |
|------|-----------|
| Application type | **Web application** (필수!) |
| Name | SSALWorks Web |

5. **"Authorized redirect URIs"** 섹션에서 **"+ ADD URI"** 클릭
6. Supabase Callback URL 입력:
   ```
   https://[프로젝트ID].supabase.co/auth/v1/callback
   ```
   > 💡 [프로젝트ID]는 Step 2에서 확인합니다

7. **"CREATE"** 클릭

### 1-5. 발급된 키 저장하기

화면에 나타난 정보를 메모장에 복사:

| 항목 | 복사할 내용 |
|------|-------------|
| **Client ID** | 긴 문자열 (xxx.apps.googleusercontent.com) |
| **Client Secret** | 짧은 문자열 |

> ⚠️ **주의**: Client Secret은 비밀번호처럼 관리하세요!

---

## Step 2: Supabase에서 Google 로그인 활성화

### 2-1. Supabase Dashboard 접속
1. https://supabase.com 접속
2. 프로젝트 선택 (01_데이터베이스_설정에서 만든 프로젝트)

### 2-2. Callback URL 확인하기
1. 왼쪽 메뉴에서 **"Authentication"** 클릭
2. **"Providers"** 탭 클릭
3. **"Google"** 클릭
4. **"Callback URL (read-only)"** 확인 및 복사:
   ```
   https://[프로젝트ID].supabase.co/auth/v1/callback
   ```

> 💡 이 URL을 Google Cloud Console의 Redirect URI에 입력했어야 합니다!

### 2-3. Google Provider 활성화
1. 같은 화면에서 **"Enable Google provider"** 토글 ON
2. Step 1에서 복사한 정보 입력:

| 항목 | 입력할 내용 |
|------|-------------|
| Client ID | Google에서 발급받은 Client ID |
| Client Secret | Google에서 발급받은 Client Secret |

3. **"Save"** 클릭

### 2-4. Redirect URLs 설정
1. 왼쪽 메뉴 **"Authentication"** → **"URL Configuration"**
2. **Site URL** 입력: `https://yourdomain.com` (나중에 도메인 생기면)
3. **Redirect URLs** 섹션에서 **"Add URL"** 클릭
4. 다음 URL들 추가:
   ```
   http://localhost:3000/**
   http://localhost:8888/**
   https://yourdomain.com/**
   ```
5. **"Save"** 클릭

---

## 완료! 🎉

축하합니다! Google 로그인 설정이 끝났어요.

### 지금까지 한 것
- ✅ Google Cloud Console에서 OAuth 클라이언트 생성
- ✅ Supabase에서 Google Provider 활성화
- ✅ 두 서비스 연결 완료

### 다음 단계
- Part B (기술 문서)의 실제 로그인 코드는 Claude Code가 구현합니다
- 테스트할 때는 로컬 서버를 실행해야 합니다 (Claude Code가 안내)

---

## 체크리스트

### Google Cloud Console
- [ ] 프로젝트 생성 완료
- [ ] OAuth 동의 화면 설정 완료
- [ ] OAuth 클라이언트 생성 (**Web application** 타입!)
- [ ] Redirect URI에 Supabase Callback URL 등록
- [ ] Client ID 복사 및 저장
- [ ] Client Secret 복사 및 저장

### Supabase
- [ ] Google Provider 활성화
- [ ] Client ID 입력
- [ ] Client Secret 입력
- [ ] Redirect URLs 설정

---

## 자주 하는 실수

### ❌ Application type을 "Desktop"으로 선택
- **문제**: Redirect URI 설정란이 안 보임
- **해결**: 클라이언트 삭제 후 **"Web application"**으로 다시 생성

### ❌ Redirect URI 오타
- **문제**: "redirect_uri_mismatch" 오류
- **해결**: URL 정확히 확인 (특히 `/auth/v1/callback` 부분)

---

**다음**: Part B는 Claude Code가 알아서 처리합니다!
