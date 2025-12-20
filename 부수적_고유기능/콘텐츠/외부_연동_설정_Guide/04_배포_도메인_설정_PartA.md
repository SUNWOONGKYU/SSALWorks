# 배포 및 도메인 설정 가이드 (Part A - 초보자용)

> Vercel 배포부터 도메인 연결까지 - 단계별 클릭 가이드

**대상**: 비개발자, 처음 설정하는 분
**소요**: 약 30분 (DNS 전파 대기 별도)

---

## 이 가이드에서 할 일

1. ✅ Vercel에 프로젝트 배포
2. ✅ 환경변수 설정
3. ✅ 도메인 연결 (Whois DNS)
4. ✅ SSL 인증서 자동 발급

**대부분 클릭 작업이며, 일부 복사/붙여넣기가 필요합니다!**

---

## 전체 흐름 이해하기

```
GitHub에 코드 업로드
    ↓
Vercel이 자동으로 배포
    ↓
도메인 연결 (Whois DNS 설정)
    ↓
SSL 자동 발급
    ↓
https://www.yourdomain.com 접속 가능!
```

---

## Phase 1: Vercel 프로젝트 생성

### 1-1. Vercel 로그인
1. 웹 브라우저에서 https://vercel.com 접속
2. **"Log In"** 클릭
3. **"Continue with GitHub"** 선택
4. GitHub 계정으로 로그인

### 1-2. 새 프로젝트 추가
1. Dashboard에서 **"Add New..."** 클릭
2. **"Project"** 선택
3. **"Import Git Repository"** 섹션에서 프로젝트 선택

### 1-3. 프로젝트 설정

| 항목 | 입력할 내용 | 설명 |
|------|-------------|------|
| Project Name | ssal-works | 소문자, 하이픈만 가능! |
| Framework Preset | Other | 선택 |
| Root Directory | Production/Frontend | 클릭해서 변경 |

> ⚠️ **Project Name 규칙**:
> - ✅ 소문자: `ssal-works`
> - ✅ 숫자: `ssal-works-v1`
> - ❌ 대문자: `SSALWorks` (안 됨!)
> - ❌ 한글: `쌀웍스` (안 됨!)

4. **"Deploy"** 클릭
5. 배포 완료까지 대기 (약 1-2분)

---

## Phase 2: 환경변수 설정

### 2-1. 환경변수 설정 페이지로 이동
1. Vercel Dashboard에서 프로젝트 클릭
2. 상단 **"Settings"** 탭 클릭
3. 좌측 메뉴에서 **"Environment Variables"** 클릭

### 2-2. 환경변수 추가

> 이전 단계에서 메모해둔 값들을 입력합니다.

| Key | Value | 어디서 가져오나요? |
|-----|-------|-------------------|
| SUPABASE_URL | https://xxx.supabase.co | Supabase Dashboard > Settings > API |
| SUPABASE_ANON_KEY | eyJxxx... | 위와 같은 곳 |
| SUPABASE_SERVICE_ROLE_KEY | eyJxxx... | 위와 같은 곳 |
| RESEND_API_KEY | re_xxx... | Resend Dashboard > API Keys |

각 환경변수마다:
1. **Key** 입력
2. **Value** 입력
3. Environment는 **"All"** 선택 (Production, Preview, Development 모두)
4. **"Add"** 클릭

### 2-3. 재배포
환경변수 추가 후:
1. 상단 **"Deployments"** 탭 클릭
2. 가장 최근 배포 옆 **"..."** 클릭
3. **"Redeploy"** 선택

---

## Phase 3: 도메인 연결 (Vercel 설정)

### 3-1. 도메인 추가
1. 상단 **"Settings"** 탭 클릭
2. 좌측 메뉴에서 **"Domains"** 클릭
3. 입력창에 도메인 입력: `www.ssalworks.ai.kr`
4. **"Add"** 클릭

> 💡 **www를 붙이는 이유**: Whois DNS에서 루트 도메인(@) 설정이 어렵습니다.
> `www.ssalworks.ai.kr`로 설정하면 문제없이 됩니다.

### 3-2. DNS 설정 정보 확인
도메인 추가 후 화면에 다음 정보가 표시됩니다:

```
A Record:
  Name: www
  Value: 76.76.21.21  ← 이 IP를 메모!

TXT Record:
  Name: _vercel
  Value: vc-domain-verify=ssalworks.ai.kr,xxxxxxxxx  ← 이 값을 메모!
```

이 정보를 메모장에 복사해두세요. Whois에서 사용합니다.

---

## Phase 4: Whois DNS 설정

### 4-1. Whois 로그인
1. https://whois.co.kr 접속
2. 로그인

### 4-2. 네임서버 고급설정 찾기

> ⚠️ **중요**: 일반 DNS 관리가 아닌 **"네임서버 고급설정"**을 사용해야 합니다!

**경로**:
```
도메인 관리
  ↓
[도메인 선택]
  ↓
부가서비스
  ↓
네임서버 변경/부가서비스
  ↓
네임서버 고급설정  ← 여기!
```

### 4-3. A 레코드 추가

1. **"A 레코드 관리(네임서버 호스팅)"** 클릭
2. **"관리페이지 열기"** 클릭
3. 입력:

| 필드 | 입력값 |
|------|--------|
| 호스트명 | www |
| IP 주소 | 76.76.21.21 |

4. **"추가"** 클릭

### 4-4. TXT 레코드 추가 (소유권 확인)

1. **"SPF(TXT) 레코드 관리"** 클릭
2. **"관리페이지 열기"** 클릭
3. 입력:

| 필드 | 입력값 |
|------|--------|
| 호스트명 | _vercel |
| 값 | vc-domain-verify=ssalworks.ai.kr,xxxxxxxxx |

> ⚠️ 값은 Vercel에서 복사한 것을 그대로 붙여넣기!

4. **"추가"** 클릭

### 4-5. DNS 전파 대기

- **소요 시간**: 5분 ~ 2시간 (최대 48시간)
- 보통 5-30분이면 됩니다
- 커피 한 잔 마시고 오세요! ☕

### 4-6. 확인 방법

**Windows 명령 프롬프트**:
```
nslookup www.ssalworks.ai.kr 8.8.8.8
```

**성공 시 결과**:
```
Name:    www.ssalworks.ai.kr
Address:  76.76.21.21
```

---

## Phase 5: Vercel에서 최종 확인

### 5-1. 도메인 상태 확인
1. Vercel Dashboard → Settings → Domains
2. 도메인 상태 확인:

| 상태 | 의미 |
|------|------|
| ⚠️ Verification Needed | DNS 전파 대기 중 |
| 🔄 Generating SSL | SSL 인증서 생성 중 (1-5분) |
| ✅ Valid Configuration | 성공! |

### 5-2. 접속 테스트
브라우저에서 접속:
```
https://www.ssalworks.ai.kr
```

페이지가 정상적으로 뜨면 성공!

---

## 완료! 🎉

축하합니다! 배포와 도메인 연결이 완료되었어요.

### 지금까지 한 것
- ✅ Vercel 프로젝트 생성 및 배포
- ✅ 환경변수 설정
- ✅ Whois DNS 레코드 추가
- ✅ SSL 인증서 자동 발급
- ✅ 도메인 연결 완료

### 접속 URL
- https://www.ssalworks.ai.kr

---

## 체크리스트

### Vercel
- [ ] GitHub 연동
- [ ] 프로젝트 생성 (소문자 이름!)
- [ ] Root Directory 설정
- [ ] 환경변수 4개 추가
- [ ] 재배포 완료

### Whois DNS
- [ ] 네임서버 고급설정 접속
- [ ] A 레코드 추가 (www → 76.76.21.21)
- [ ] TXT 레코드 추가 (_vercel)

### 최종 확인
- [ ] DNS 전파 확인 (nslookup)
- [ ] Vercel 도메인 상태 ✅ 초록색
- [ ] https://www.yourdomain.com 접속 성공

---

## 자주 하는 실수

### ❌ Project Name에 대문자 사용
- **문제**: "The name contains invalid characters" 에러
- **해결**: 소문자, 숫자, 하이픈만 사용

### ❌ 일반 DNS 관리에서 레코드 추가
- **문제**: `_vercel` 같은 특수문자 입력 불가
- **해결**: **네임서버 고급설정** 사용

### ❌ DNS 전파 전에 확인
- **문제**: 사이트 접속 안 됨
- **해결**: 5-30분 기다렸다가 다시 시도

---

**다음**: Part B는 Claude Code가 알아서 처리합니다!
