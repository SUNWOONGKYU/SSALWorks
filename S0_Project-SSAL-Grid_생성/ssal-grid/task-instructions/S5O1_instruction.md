# Task Instruction - S5O1

## Task ID
S5O1

## Task Name
도메인 연결

## Task Goal
커스텀 도메인 구매 및 Vercel 프로젝트에 연결

## Prerequisites (Dependencies)
- S5M1 (출시 체크리스트) 완료
- S1O1 (Vercel 프로젝트 설정) 완료

## Specific Instructions

### 1. 도메인 구매
```
권장 도메인 등록 업체:
- Namecheap (가성비)
- Google Domains (신뢰성)
- GoDaddy (대중적)
- 가비아 (한국)

도메인 선택 기준:
- 브랜드와 일치
- 짧고 기억하기 쉬움
- .com 또는 .co.kr 권장
- 오타 도메인 같이 구매 고려

예시: ssalworks.com
```

### 2. Vercel 도메인 추가
```
1. Vercel Dashboard > Project > Settings > Domains
2. "Add Domain" 클릭
3. 도메인 입력 (ssalworks.com)
4. DNS 설정 안내 확인
```

### 3. DNS 설정

#### A. Vercel DNS 사용 (권장)
```
Vercel을 네임서버로 사용:
1. 도메인 등록 업체에서 네임서버 변경:
   - ns1.vercel-dns.com
   - ns2.vercel-dns.com

2. Vercel이 자동으로 DNS 관리
3. SSL 자동 발급
```

#### B. 외부 DNS 사용
```
도메인 등록 업체 DNS에서 설정:

# A Record (루트 도메인)
Type: A
Name: @
Value: 76.76.21.21

# CNAME (www 서브도메인)
Type: CNAME
Name: www
Value: cname.vercel-dns.com

# 또는 CNAME Flattening 지원시
Type: CNAME
Name: @
Value: cname.vercel-dns.com
```

### 4. DNS 전파 확인
```bash
# DNS 전파 확인
dig ssalworks.com
dig www.ssalworks.com

# 또는 온라인 도구
# https://dnschecker.org/
# https://www.whatsmydns.net/
```

### 5. SSL 인증서 확인
```
Vercel은 자동으로 Let's Encrypt SSL 발급:
1. 도메인 연결 후 자동 발급
2. 최대 24시간 소요 (보통 몇 분)
3. 자동 갱신

확인 방법:
- https://ssalworks.com 접속
- 브라우저 주소창 자물쇠 아이콘 확인
```

### 6. 리다이렉트 설정
- 위치: `vercel.json`

```json
{
  "redirects": [
    {
      "source": "/",
      "has": [
        {
          "type": "host",
          "value": "www.ssalworks.com"
        }
      ],
      "destination": "https://ssalworks.com",
      "permanent": true
    }
  ]
}
```

### 7. 도메인별 환경 변수
```
Vercel Dashboard > Settings > Environment Variables

Production 환경:
- NEXT_PUBLIC_SITE_URL=https://ssalworks.com
- SITE_URL=https://ssalworks.com

Preview 환경:
- NEXT_PUBLIC_SITE_URL=https://preview.ssalworks.com
```

### 8. 서브도메인 설정 (선택)
```
필요한 서브도메인:
- www.ssalworks.com → ssalworks.com (리다이렉트)
- api.ssalworks.com → API 전용 (선택)
- docs.ssalworks.com → 문서 사이트 (선택)

Vercel에서 설정:
1. Domains 페이지에서 서브도메인 추가
2. DNS에 CNAME 레코드 추가
```

### 9. 도메인 설정 체크리스트
```markdown
## 도메인 설정 체크리스트

### 구매 및 등록
- [ ] 도메인 구매 완료
- [ ] WHOIS 개인정보 보호 활성화
- [ ] 자동 갱신 설정

### DNS 설정
- [ ] 네임서버 변경 또는 DNS 레코드 추가
- [ ] DNS 전파 완료 (최대 48시간)
- [ ] A/CNAME 레코드 확인

### Vercel 연결
- [ ] Vercel에 도메인 추가
- [ ] SSL 인증서 발급 확인
- [ ] HTTPS 리다이렉트 확인

### 테스트
- [ ] https://ssalworks.com 접속 확인
- [ ] https://www.ssalworks.com 리다이렉트 확인
- [ ] API 엔드포인트 동작 확인
```

### 10. 트러블슈팅
```
문제: SSL 인증서 발급 안 됨
해결: DNS 설정 확인, Vercel에서 도메인 재추가

문제: DNS 전파 오래 걸림
해결: 48시간까지 대기, ISP 캐시 문제일 수 있음

문제: www 리다이렉트 안 됨
해결: vercel.json 리다이렉트 설정 확인
```

## Expected Output Files
- `vercel.json` (리다이렉트 설정)
- 도메인 DNS 설정 완료
- Vercel 도메인 연결 완료

## Completion Criteria
- [ ] 도메인 구매 완료
- [ ] DNS 설정 완료
- [ ] Vercel 도메인 연결
- [ ] SSL 인증서 활성화
- [ ] www 리다이렉트 설정
- [ ] HTTPS 접속 확인

## Tech Stack
- Vercel
- DNS

## Tools
- 웹 브라우저 (Vercel Dashboard, 도메인 등록 업체)
- Bash (dig, curl)

## Execution Type
Human-Assisted

## Remarks
- DNS 전파는 최대 48시간 소요
- WHOIS 개인정보 보호 권장
- 도메인 자동 갱신 설정 필수
- 중요 도메인은 여러 TLD 확보 고려

---

## ⚠️ 작업 결과물 저장 2대 규칙

> **이 규칙은 반드시 준수하세요!**

### 제1 규칙: Stage + Area 폴더에 저장
- Task ID의 Stage와 Area에 해당하는 폴더에 저장
- 예: S1S1 → `S1_개발_준비/Security/`
- 예: S2F1 → `S2_개발-1차/Frontend/`

### 제2 규칙: Production 코드는 이중 저장
- Frontend, Database, Backend_APIs 코드는 Stage 폴더 + Production 폴더 둘 다 저장
- 문서(Documentation, Security, Testing, DevOps)는 Stage 폴더에만 저장

**Area 폴더 매핑:** M→Documentation, F→Frontend, BI→Backend_Infra, BA→Backend_APIs, D→Database, S→Security, T→Testing, O→DevOps, E→External, C→Content

