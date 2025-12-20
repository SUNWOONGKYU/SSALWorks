# 데이터베이스 설정 가이드 (Part A - 초보자용)

> Supabase 계정 생성부터 API 키 확인까지 - 클릭만으로 완료!

**대상**: 비개발자, 처음 설정하는 분
**소요**: 약 10분

---

## 이 가이드에서 할 일

1. ✅ Supabase 무료 계정 만들기
2. ✅ 프로젝트 생성하기
3. ✅ API 키 복사해두기

**코딩 없이 웹사이트에서 클릭만 하면 됩니다!**

---

## Step 1: Supabase 계정 만들기

### 1-1. 사이트 접속
1. 웹 브라우저에서 https://supabase.com 접속
2. 우측 상단 **"Start your project"** 버튼 클릭

### 1-2. GitHub로 로그인
1. **"Continue with GitHub"** 클릭
2. GitHub 계정으로 로그인
3. (GitHub 계정이 없다면 먼저 https://github.com 에서 가입)

> 💡 **왜 GitHub?** Supabase는 GitHub 계정으로 간편하게 가입할 수 있어요.

---

## Step 2: 프로젝트 만들기

### 2-1. 새 프로젝트 버튼 클릭
1. 대시보드에서 **"New Project"** 버튼 클릭
2. Organization 선택 (처음이라면 자동 생성됨)

### 2-2. 프로젝트 정보 입력

| 항목 | 입력할 내용 | 설명 |
|------|-------------|------|
| **Name** | ssalworks | 원하는 프로젝트 이름 |
| **Database Password** | 강력한 비밀번호 입력 | **꼭 메모해두세요!** |
| **Region** | Northeast Asia (Seoul) | 한국 서버 선택 |

### 2-3. 생성 완료
1. **"Create new project"** 클릭
2. 약 2분 정도 대기 (프로젝트 생성 중)
3. 대시보드가 나오면 완료!

> ⚠️ **중요**: Database Password는 나중에 필요하니 안전한 곳에 저장해두세요!

---

## Step 3: API 키 확인하기

### 3-1. 설정 메뉴로 이동
1. 왼쪽 메뉴에서 **톱니바퀴 아이콘 (Project Settings)** 클릭
2. **"API"** 메뉴 클릭

### 3-2. 필요한 정보 3가지

아래 3가지 정보를 메모장에 복사해두세요:

| 항목 | 어디에 있나요? | 용도 |
|------|---------------|------|
| **Project URL** | `https://xxxxxx.supabase.co` | 프로젝트 주소 |
| **anon public** | `eyJhbGci...` 로 시작하는 긴 문자열 | 웹사이트에서 사용 |
| **service_role** | `eyJhbGci...` 로 시작하는 다른 긴 문자열 | 서버에서 사용 |

> ⚠️ **주의**: service_role 키는 비밀번호처럼 절대 남에게 보여주면 안 돼요!

### 3-3. 복사하는 방법
- 각 키 옆에 **복사 버튼** (📋 아이콘)이 있어요
- 클릭하면 자동으로 복사됩니다
- 메모장에 붙여넣기 해두세요

---

## 완료! 🎉

축하합니다! 데이터베이스 기본 설정이 끝났어요.

### 지금까지 한 것
- ✅ Supabase 계정 생성
- ✅ 프로젝트 생성 (Seoul 리전)
- ✅ API 키 3개 확인 및 저장

### 다음 단계
- Part B (기술 문서)의 내용은 Claude Code가 처리합니다
- 복사해둔 API 키를 Claude Code에게 전달하면 나머지 설정을 도와줍니다

---

## 체크리스트

### Step 1: 계정
- [ ] Supabase 사이트 접속 완료
- [ ] GitHub으로 로그인 완료

### Step 2: 프로젝트
- [ ] 프로젝트 이름 입력
- [ ] Database Password 입력 및 메모
- [ ] Seoul 리전 선택
- [ ] 프로젝트 생성 완료

### Step 3: API 키
- [ ] Project URL 복사
- [ ] anon public key 복사
- [ ] service_role key 복사
- [ ] 3개 모두 안전한 곳에 저장

---

**다음**: Part B는 Claude Code가 알아서 처리합니다!
