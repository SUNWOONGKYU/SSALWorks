# 배포 및 도메인 설정 가이드 (Part B - Claude Code용)

> 기술 참조 문서: 폴더 구조, vercel.json, Serverless Functions, 트러블슈팅

**대상**: Claude Code / 개발자
**전제조건**: Part A 완료 (Vercel 프로젝트 생성, 환경변수 설정, DNS 레코드 추가)

---

## 1. 배포 구조

```
GitHub Repository
    ↓ Push
Vercel (자동 빌드/배포)
    ↓ 도메인 연결
Whois DNS (A/TXT 레코드)
    ↓ DNS 전파
사용자 → www.ssalworks.ai.kr → Vercel 서버
```

---

## 2. 폴더 구조

### 2.1 Vercel 요구사항

Vercel Serverless Functions는 **Root Directory 안에 `api/` 폴더**가 있어야 함.

### 2.2 권장 구조

```
Production/
├── Database/          ← DB 스키마/SQL
└── Frontend/          ← Vercel Root Directory
    ├── api/           ← Serverless Functions
    │   ├── auth/
    │   ├── email/
    │   ├── lib/
    │   └── subscription/
    ├── assets/
    ├── pages/
    ├── index.html
    └── vercel.json
```

### 2.3 폴더 정리 명령어

```bash
# Backend_API/api를 Frontend/api로 이동
cp -r Production/Backend_API/api Production/Frontend/

# 불필요한 폴더 삭제
rm -rf Production/Backend_API
rm -rf Production/Backend_APIs
```

---

## 3. vercel.json 설정

### 3.1 파일 위치
`Production/Frontend/vercel.json`

### 3.2 권장 설정

```json
{
  "version": 2,
  "name": "ssalworks-v1",
  "buildCommand": null,
  "outputDirectory": ".",
  "framework": null,
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/api/:path*"
    }
  ],
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Credentials", "value": "true" },
        { "key": "Access-Control-Allow-Origin", "value": "*" },
        { "key": "Access-Control-Allow-Methods", "value": "GET,POST,PUT,DELETE,OPTIONS" },
        { "key": "Access-Control-Allow-Headers", "value": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization" }
      ]
    }
  ],
  "functions": {
    "api/**/*.js": {
      "maxDuration": 30,
      "memory": 1024
    }
  },
  "env": {
    "NODE_ENV": "production"
  }
}
```

### 3.3 주의사항

**존재하지 않는 함수 패턴 제거**:
```json
// ❌ 에러 발생 (폴더 없으면)
"functions": {
  "api/ai/*.js": { ... },
  "api/payment/*.js": { ... }
}

// ✅ 와일드카드 사용
"functions": {
  "api/**/*.js": { ... }
}
```

---

## 4. 환경변수

### 4.1 필수 환경변수

| Key | Value | 설명 |
|-----|-------|------|
| SUPABASE_URL | https://xxx.supabase.co | Supabase URL |
| SUPABASE_ANON_KEY | eyJxxx... | 클라이언트용 키 |
| SUPABASE_SERVICE_ROLE_KEY | eyJxxx... | 서버용 키 |
| RESEND_API_KEY | re_xxx... | 이메일 API |

### 4.2 선택 환경변수

| Key | Value | 설명 |
|-----|-------|------|
| NEXT_PUBLIC_SITE_URL | https://www.ssalworks.ai.kr | 사이트 URL |
| INTERNAL_API_SECRET | 임의 문자열 | 내부 API 보안 |

---

## 5. DNS 레코드

### 5.1 A 레코드

```
Type: A
Name: www
Value: 76.76.21.21
```

### 5.2 TXT 레코드 (소유권 확인)

```
Type: TXT
Name: _vercel
Value: vc-domain-verify=ssalworks.ai.kr,xxxxxxxxx
```

### 5.3 DNS 확인 명령어

```bash
# Windows
nslookup www.ssalworks.ai.kr 8.8.8.8

# Mac/Linux
dig www.ssalworks.ai.kr

# 온라인 도구
https://dnschecker.org/
```

---

## 6. 트러블슈팅

### 문제 1: Project Name 에러

**증상**: "The name contains invalid characters"

**해결**: 소문자, 숫자, 하이픈만 사용
- ❌ `SSALWorks` → ✅ `ssal-works`

### 문제 2: 함수 패턴 에러

**증상**: "The pattern doesn't match any Serverless Functions"

**해결**: vercel.json에서 존재하지 않는 패턴 제거

### 문제 3: Build 에러

**증상**: "sh: line 1: vercel: command not found"

**원인**: package.json에 `"build": "vercel build"` 설정됨

**해결**: build 스크립트 제거 또는 변경
```json
{
  "scripts": {
    "dev": "npx serve . -l 8888"
  }
}
```

### 문제 4: 도메인 권한 에러

**증상**: "This domain is linked to another Vercel account"

**해결**:
1. TXT 레코드 추가 (_vercel)
2. DNS 전파 대기
3. Vercel에서 "Refresh" 클릭

### 문제 5: DNS_PROBE_FINISHED_NXDOMAIN

**증상**: 브라우저에서 "사이트에 연결할 수 없음"

**해결**:
1. nslookup으로 DNS 확인
2. 전파 완료까지 대기 (최대 48시간)
3. 레코드 저장 완료 확인

### 문제 6: 특수문자 입력 불가

**증상**: `@` 또는 `_vercel` 입력 시 에러

**해결**: 일반 DNS 관리가 아닌 **네임서버 고급설정** 사용

---

## 7. 시도했으나 실패한 방법들

### ❌ 방법 1: Vercel DNS 사용

```bash
# 네임서버를 Vercel로 변경
ns1.vercel-dns.com
ns2.vercel-dns.com

# 결과: 403 권한 오류
Error: Not authorized to use ssalworks.ai.kr (403)
```

### ❌ 방법 2: Whois 일반 DNS 관리

- CNAME 레코드에 IP만 입력 가능
- TXT에 `_vercel` 입력 불가
- A 레코드 호스트명에 `@` 입력 불가

### ✅ 최종 성공: Whois 네임서버 고급설정

네임서버를 Whois 기본값으로 유지하고, **네임서버 고급설정**에서 A/TXT 레코드 직접 관리.

---

## 8. 권장 설정 요약

| 항목 | 권장 값 |
|------|---------|
| 네임서버 | Whois 기본값 (ns1.whoisdomain.kr) |
| DNS 관리 | Whois 네임서버 고급설정 |
| 도메인 | www.ssalworks.ai.kr (www 포함) |
| A 레코드 | 76.76.21.21 |
| 호스팅 | Vercel |

**권장하지 않는 방법**:
- ❌ 루트 도메인(@) 직접 설정 (Whois에서 설정 어려움)
- ❌ Vercel DNS 사용 (권한 충돌 가능)

---

## 참고 문서

- [Vercel - Adding a Domain](https://vercel.com/docs/projects/domains/add-a-domain)
- [Vercel - Serverless Functions](https://vercel.com/docs/functions)
- [Vercel - Environment Variables](https://vercel.com/docs/projects/environment-variables)
