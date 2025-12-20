# 이메일 시스템 설정 가이드 (Part A - 초보자용)

> Resend 가입부터 DKIM 설정까지 - 단계별 클릭 가이드

**대상**: 비개발자, 처음 설정하는 분
**소요**: 약 20분 (DNS 전파 대기 별도)

---

## 이 가이드에서 할 일

1. ✅ Resend 계정 만들고 API Key 발급
2. ✅ 도메인 등록 및 DKIM 설정
3. ✅ Supabase에 SMTP 연결
4. ✅ 이메일 템플릿 URL 수정

**대부분 클릭 작업이며, 일부 복사/붙여넣기가 필요합니다!**

---

## 전체 흐름 이해하기

```
사용자가 회원가입
    ↓
우리 앱이 Supabase에 요청
    ↓
Supabase가 Resend를 통해 이메일 발송
    ↓
사용자 이메일에 인증 링크 도착
    ↓
링크 클릭하면 인증 완료!
```

---

## Phase 1: Resend 설정 (이메일 발송 서비스)

### 1-1. Resend 가입
1. 웹 브라우저에서 https://resend.com 접속
2. **"Sign up"** 클릭
3. Google 계정 또는 이메일로 가입

### 1-2. API Key 발급

> ⚠️ API Key는 한 번만 보여주니 꼭 복사해두세요!

1. Resend Dashboard에서 왼쪽 메뉴 **"API Keys"** 클릭
2. **"Create API Key"** 클릭
3. 설정 입력:

| 항목 | 입력할 내용 |
|------|-------------|
| Name | ssalworks-production |
| Permission | Full access |

4. **"Create"** 클릭
5. 화면에 나타난 API Key 복사 (형식: `re_xxxxxxxxx...`)
6. 메모장에 저장!

### 1-3. 도메인 등록
1. 왼쪽 메뉴 **"Domains"** 클릭
2. **"Add Domain"** 클릭
3. 본인 도메인 입력 (예: `ssalworks.ai.kr`)
4. **"Add"** 클릭
5. 상태가 **"Pending"**으로 표시됨 (정상)

---

## Phase 2: DKIM DNS 설정 (스팸 방지)

> DKIM: 이메일이 진짜 우리가 보낸 건지 인증하는 방법

### 2-1. Resend에서 DKIM 정보 확인
1. Resend Dashboard → **"Domains"** → 등록한 도메인 클릭
2. **"DNS Records"** 섹션에서 정보 확인:

```
Type: TXT
Name: resend._domainkey
Value: p=MIGfMA0GCSqGSIb3DQEBA... (긴 문자열)
```

3. **Value** 값을 복사

### 2-2. Whois DNS에 TXT 레코드 추가

> ⚠️ 일반 DNS 관리가 아닌 **"네임서버 고급설정"** 사용!

**경로 (Whois 기준)**:
1. Whois 로그인
2. **"도메인 관리"** 클릭
3. **"부가서비스"** → **"네임서버 변경/부가서비스"** 클릭
4. **"네임서버 고급설정"** 클릭
5. **"SPF(TXT) 레코드 관리"** → **"관리페이지 열기"** 클릭

**입력**:
| 항목 | 입력할 내용 |
|------|-------------|
| 호스트명 | resend._domainkey |
| TXT 값 | Resend에서 복사한 Value 값 |

6. **"등록"** 클릭

### 2-3. DNS 전파 대기
- **소요 시간**: 1~2시간 (최대 48시간)
- 커피 한 잔 마시고 오세요! ☕

### 2-4. 인증 확인
1. Resend Dashboard → **"Domains"** → 도메인 클릭
2. **"Verify"** 버튼 클릭
3. 상태가 **"✅ Verified"**로 바뀌면 성공!

> 💡 아직 Pending이면 좀 더 기다렸다가 다시 시도

---

## Phase 3: Supabase SMTP 연결

### 3-1. Supabase SMTP 설정 화면으로 이동
1. Supabase Dashboard 접속
2. 프로젝트 선택
3. 왼쪽 메뉴 **"Settings"** (톱니바퀴) 클릭
4. **"Auth"** 클릭
5. 아래로 스크롤해서 **"SMTP Settings"** 찾기

### 3-2. SMTP 정보 입력

**"Enable Custom SMTP"** 토글을 ON으로 바꾸고 입력:

| 항목 | 입력할 내용 |
|------|-------------|
| SMTP Host | smtp.resend.com |
| SMTP Port | 587 |
| SMTP Username | resend |
| SMTP Password | Phase 1에서 복사한 API Key (`re_xxx...`) |
| Sender Email | noreply@yourdomain.com (본인 도메인) |
| Sender Name | SSALWorks (사용자에게 보이는 이름) |

**"Save"** 클릭

### 3-3. Site URL 설정
1. 같은 페이지에서 위로 스크롤
2. **"URL Configuration"** 섹션 찾기
3. **Site URL** 입력: `https://www.yourdomain.com` (프로덕션 URL)

### 3-4. Redirect URLs 설정
**"Redirect URLs"** 섹션에서 **"Add URL"** 클릭하고 다음 추가:
```
http://localhost:3000/**
http://localhost:8888/**
https://www.yourdomain.com/**
```

**"Save"** 클릭

---

## Phase 4: 이메일 템플릿 수정 (중요!)

> ⚠️ 이 단계를 빼먹으면 이메일 링크가 작동 안 할 수 있어요!

### 4-1. 템플릿 편집 화면으로 이동
1. Supabase Dashboard → **"Authentication"**
2. **"Email Templates"** 탭 클릭

### 4-2. Confirm signup 템플릿 수정
1. **"Confirm signup"** 클릭
2. HTML 코드에서 링크 부분 찾기:

**변경 전** (찾아서):
```html
{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=signup
```

**변경 후** (이렇게 바꾸기):
```html
https://www.yourdomain.com/auth/callback?token_hash={{ .TokenHash }}&type=signup
```

3. **"Save"** 클릭

### 4-3. 다른 템플릿도 동일하게 수정
- **Magic Link** 템플릿
- **Reset Password** 템플릿
- **Change Email** 템플릿

모두 `{{ .SiteURL }}`을 실제 도메인으로 바꿔주세요.

---

## 완료! 🎉

축하합니다! 이메일 시스템 기본 설정이 끝났어요.

### 지금까지 한 것
- ✅ Resend 계정 생성 및 API Key 발급
- ✅ 도메인 DKIM 인증 설정
- ✅ Supabase SMTP 연결
- ✅ 이메일 템플릿 URL 수정

### 다음 단계
- Part B (기술 문서)의 코드 작업은 Claude Code가 처리합니다
- 회원가입 API와 테이블 동기화 로직이 필요합니다

---

## 체크리스트

### Resend
- [ ] Resend 계정 생성
- [ ] API Key 발급 및 메모장에 저장
- [ ] 도메인 등록

### DKIM (DNS)
- [ ] Whois 네임서버 고급설정 접속
- [ ] TXT 레코드 추가 (resend._domainkey)
- [ ] DNS 전파 대기 (1-2시간)
- [ ] Resend에서 Verified 확인

### Supabase SMTP
- [ ] Custom SMTP 활성화
- [ ] SMTP Host, Port, Username, Password 입력
- [ ] Sender Email, Sender Name 설정
- [ ] Site URL 설정
- [ ] Redirect URLs 등록

### 이메일 템플릿
- [ ] Confirm signup 템플릿 URL 수정
- [ ] Magic Link 템플릿 URL 수정
- [ ] Reset Password 템플릿 URL 수정

---

## 자주 하는 실수

### ❌ 일반 DNS 관리에서 TXT 레코드 추가
- **문제**: `_domainkey` 같은 특수문자 입력 불가
- **해결**: **네임서버 고급설정** 사용

### ❌ {{ .SiteURL }} 그대로 사용
- **문제**: 잘못된 URL로 이메일 링크 생성
- **해결**: 실제 도메인으로 **하드코딩**

### ❌ DNS 전파 전에 Verify 시도
- **문제**: 계속 Pending 상태
- **해결**: 1-2시간 기다렸다가 다시 시도

---

**다음**: Part B는 Claude Code가 알아서 처리합니다!
