# Verification Instruction - S2BI3

## Task ID
S2BI3

## Task Name
이메일 도메인 인증 (Resend)

## Verification Checklist

### 1. Resend 도메인 상태 검증
- [ ] Resend Dashboard > Domains 접속
- [ ] ssalworks.ai.kr 도메인 존재 확인
- [ ] 도메인 상태: **"Verified"** (초록색 체크)

### 2. DNS 레코드 검증

#### SPF 레코드 확인
```bash
nslookup -type=TXT ssalworks.ai.kr
# 예상 결과: v=spf1 include:_spf.resend.com ~all
```
- [ ] SPF 레코드 존재
- [ ] Resend SPF 포함 확인

#### DKIM 레코드 확인
```bash
nslookup -type=TXT resend._domainkey.ssalworks.ai.kr
# 또는
nslookup -type=CNAME resend._domainkey.ssalworks.ai.kr
```
- [ ] DKIM 레코드 존재
- [ ] Resend DKIM 값 일치

### 3. 이메일 발송 테스트 검증
- [ ] 발신자: `noreply@ssalworks.ai.kr` (커스텀 도메인)
- [ ] 수신자: 외부 이메일 주소 (등록 이메일이 아닌 다른 주소)
- [ ] 이메일 발송 성공
- [ ] 수신자 메일함에서 이메일 도착 확인

### 4. 문서 존재 검증
- [ ] `S2_개발-1차/Backend_Infra/RESEND_EMAIL_DOMAIN_WHOIS_DNS_SETUP.md` 존재
- [ ] `S2_개발-1차/Backend_Infra/RESEND_DOMAIN_SETUP_REPORT.md` 존재

### 5. 코드 업데이트 검증
- [ ] `resend.js`에서 발신자가 `@ssalworks.ai.kr` 도메인 사용
- [ ] 또는 환경변수로 발신자 설정 가능하도록 구현

## Test Commands
```bash
# DNS 레코드 확인
nslookup -type=TXT ssalworks.ai.kr
nslookup -type=TXT resend._domainkey.ssalworks.ai.kr

# 또는 dig 사용
dig TXT ssalworks.ai.kr
dig TXT resend._domainkey.ssalworks.ai.kr

# 파일 존재 확인
ls -la S2_개발-1차/Backend_Infra/RESEND_EMAIL_DOMAIN_WHOIS_DNS_SETUP.md
ls -la S2_개발-1차/Backend_Infra/RESEND_DOMAIN_SETUP_REPORT.md
```

## Expected Results
- Resend 도메인 "Verified" 상태
- DNS 레코드 (SPF, DKIM) 정상 설정
- 커스텀 도메인으로 이메일 발송 성공
- 외부 수신자에게 이메일 도착

## Verification Agent
devops-troubleshooter

## Pass Criteria
- Resend Dashboard에서 ssalworks.ai.kr "Verified" 상태
- SPF 레코드 DNS 조회 성공
- DKIM 레코드 DNS 조회 성공
- noreply@ssalworks.ai.kr로 외부 이메일 발송 성공
- 수신자 메일함에서 이메일 확인

## Fail Criteria
- 도메인이 "Pending" 또는 "Failed" 상태
- DNS 레코드 조회 실패
- 이메일 발송 실패
- 이메일이 스팸함으로 분류 (경고)

---

## ⚠️ 저장 위치 검증 항목

### 필수 검증
- [ ] 문서가 `S2_개발-1차/Backend_Infra/`에 저장되었는가?
