# Task Instruction - S5O3

---

## 📌 필수 참조 규칙 파일 (2025-12-19)

> **⚠️ 작업 전 반드시 아래 규칙 파일을 확인하세요!**

| 규칙 파일 | 내용 | 참조 시점 |
|----------|------|----------|
| `.claude/rules/01_file-naming.md` | 파일 명명 규칙 | 파일 생성 시 |
| `.claude/rules/02_save-location.md` | 저장 위치 규칙 | 파일 저장 시 |
| `.claude/rules/03_area-stage.md` | Area/Stage 매핑 | 폴더 선택 시 |
| `.claude/rules/05_execution-process.md` | 6단계 실행 프로세스 | 작업 전체 |



## Task ID
S5O3

## Task Name
SSL 인증서 확인

## Task Goal
HTTPS 설정 확인 및 SSL 인증서 자동 갱신 상태 점검

## Prerequisites (Dependencies)
- S5O1 (프로덕션 배포) 완료
- S1O1 (DNS 설정 및 도메인 연결) 완료

## Specific Instructions

### 1. Vercel SSL 자동 관리 확인

```markdown
## Vercel SSL 특징

Vercel은 자동으로 SSL 인증서를 관리합니다:
- **발급**: Let's Encrypt 인증서 자동 발급
- **갱신**: 만료 전 자동 갱신
- **적용**: 도메인 연결 시 자동 활성화

### 확인 방법
1. Vercel Dashboard > Project > Settings > Domains
2. 도메인 옆의 녹색 자물쇠 아이콘 확인
3. SSL Certificate 상태: "Valid" 확인
```

### 2. SSL 인증서 상태 확인

```bash
# 인증서 정보 확인
openssl s_client -connect ssalworks.ai.kr:443 -servername ssalworks.ai.kr 2>/dev/null | openssl x509 -noout -dates

# 결과 예시:
# notBefore=Dec 19 00:00:00 2024 GMT
# notAfter=Mar 19 23:59:59 2025 GMT

# 또는 curl로 확인
curl -vI https://ssalworks.ai.kr 2>&1 | grep -i "expire"
```

### 3. HTTPS 강제 리다이렉트 확인

```bash
# HTTP → HTTPS 리다이렉트 확인
curl -I http://ssalworks.ai.kr

# 기대 결과:
# HTTP/1.1 308 Permanent Redirect
# Location: https://ssalworks.ai.kr/
```

### 4. 보안 헤더 확인

```bash
# 모든 보안 헤더 확인
curl -I https://ssalworks.ai.kr

# 기대 결과:
# Strict-Transport-Security: max-age=31536000; includeSubDomains
# X-Content-Type-Options: nosniff
# X-Frame-Options: DENY
# X-XSS-Protection: 1; mode=block
```

### 5. SSL 등급 테스트

```markdown
## 외부 도구로 SSL 등급 확인

### SSL Labs
- URL: https://www.ssllabs.com/ssltest/
- 도메인 입력: ssalworks.ai.kr
- 목표 등급: A 이상

### Security Headers
- URL: https://securityheaders.com/
- 도메인 입력: ssalworks.ai.kr
- 목표 등급: A 이상
```

### 6. SSL 모니터링 스크립트
- 위치: `scripts/check-ssl.js`

```javascript
// scripts/check-ssl.js
const https = require('https');

const DOMAINS = [
    'ssalworks.ai.kr',
    'www.ssalworks.ai.kr'
];

function checkSSL(hostname) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname,
            port: 443,
            method: 'GET',
            rejectUnauthorized: true
        };

        const req = https.request(options, (res) => {
            const cert = res.socket.getPeerCertificate();

            if (cert) {
                const validTo = new Date(cert.valid_to);
                const daysUntilExpiry = Math.ceil((validTo - new Date()) / (1000 * 60 * 60 * 24));

                resolve({
                    hostname,
                    valid: true,
                    issuer: cert.issuer?.O || 'Unknown',
                    validFrom: cert.valid_from,
                    validTo: cert.valid_to,
                    daysUntilExpiry,
                    warning: daysUntilExpiry < 30
                });
            } else {
                resolve({ hostname, valid: false, error: 'No certificate' });
            }
        });

        req.on('error', (error) => {
            resolve({ hostname, valid: false, error: error.message });
        });

        req.end();
    });
}

async function main() {
    console.log('🔒 SSL 인증서 확인 시작...\n');

    for (const domain of DOMAINS) {
        const result = await checkSSL(domain);

        if (result.valid) {
            const status = result.warning ? '⚠️' : '✅';
            console.log(`${status} ${result.hostname}`);
            console.log(`   발급자: ${result.issuer}`);
            console.log(`   만료일: ${result.validTo}`);
            console.log(`   남은 기간: ${result.daysUntilExpiry}일`);

            if (result.warning) {
                console.log(`   ⚠️ 30일 이내 만료 예정!`);
            }
        } else {
            console.log(`❌ ${result.hostname}: ${result.error}`);
        }
        console.log('');
    }
}

main();
```

### 7. SSL 체크리스트
- 위치: `docs/SSL_CHECKLIST.md`

```markdown
# SSL 인증서 체크리스트

## 자동 관리 (Vercel)
- [x] Let's Encrypt 인증서 자동 발급
- [x] 자동 갱신 활성화
- [x] 도메인별 인증서 발급

## 보안 설정
- [ ] HSTS 헤더 적용 (Strict-Transport-Security)
- [ ] HTTP → HTTPS 리다이렉트
- [ ] TLS 1.2 이상만 허용

## 확인 항목
- [ ] 메인 도메인 SSL 유효
- [ ] www 서브도메인 SSL 유효
- [ ] 인증서 만료일 30일 이상 여유
- [ ] SSL Labs 등급 A 이상

## 정기 점검
- 점검 주기: 월 1회
- 점검 담당: DevOps
- 마지막 점검일: YYYY-MM-DD
```

### 8. 인증서 만료 알림 설정

```javascript
// api/cron/ssl-check.js
// 매주 월요일 실행하여 인증서 만료 확인

module.exports = async (req, res) => {
    if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const domains = ['ssalworks.ai.kr'];
    const results = [];

    for (const domain of domains) {
        const sslInfo = await checkSSL(domain);

        if (sslInfo.daysUntilExpiry < 14) {
            // 14일 이내 만료 시 알림
            await sendAlert(
                `⚠️ SSL 인증서 만료 임박: ${domain}`,
                `${sslInfo.daysUntilExpiry}일 후 만료됩니다.`
            );
        }

        results.push(sslInfo);
    }

    res.status(200).json({ checked: results });
};
```

### 9. vercel.json HSTS 설정 확인

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains"
        }
      ]
    }
  ]
}
```

## Expected Output Files
- `scripts/check-ssl.js`
- `docs/SSL_CHECKLIST.md`
- SSL 상태 확인 보고서

## Completion Criteria
- [ ] SSL 인증서 유효성 확인
- [ ] HTTPS 강제 리다이렉트 확인
- [ ] HSTS 헤더 적용 확인
- [ ] SSL Labs 등급 A 이상
- [ ] 자동 갱신 상태 확인
- [ ] 모니터링 스크립트 작성
- [ ] 체크리스트 문서화

## Tech Stack
- Vercel (Let's Encrypt)
- Node.js

## Task Agent
`devops-troubleshooter`

## Verification Agent
`qa-specialist`

## Tools
- Bash (openssl, curl)
- 웹 브라우저 (SSL Labs)

## Execution Type
AI-Only (스크립트 작성) / Human-Assisted (외부 도구 확인)

## Remarks
- Vercel은 SSL 자동 관리 (수동 작업 불필요)
- 정기적인 상태 확인만 필요
- 문제 발생 시 Vercel 지원 문의
- 커스텀 인증서 사용 시 별도 관리 필요

---

## ⚠️ 작업 결과물 저장 2대 규칙

> **이 규칙은 반드시 준수하세요!**

### 제1 규칙: Stage + Area 폴더에 저장
- Task ID의 Stage와 Area에 해당하는 폴더에 저장
- 예: S5O3 → `S5_개발_마무리/DevOps/`

### 제2 규칙: Production 코드는 이중 저장
- DevOps 스크립트/문서는 Stage 폴더에만 저장

**Area 폴더 매핑:** M→Documentation, F→Frontend, BI→Backend_Infra, BA→Backend_APIs, D→Database, S→Security, T→Testing, O→DevOps, E→External, C→Content
