# Verification Instruction - S5O3

---

## Task ID
S5O3

## Task Name
SSL 인증서 확인

## Verification Agent
qa-specialist

## Verification Criteria

### 1. SSL 인증서 상태 확인
- [ ] 인증서 유효 기간 확인 (30일 이상 남음)
- [ ] 인증서 발급 기관 확인
- [ ] 인증서 체인 유효성

### 2. HTTPS 강제 리다이렉트 확인
- [ ] HTTP → HTTPS 자동 리다이렉트
- [ ] 모든 서브도메인 HTTPS 적용
- [ ] Mixed Content 경고 없음

### 3. SSL 보안 등급 확인
- [ ] SSL Labs 테스트 A등급 이상
- [ ] 취약한 암호화 비활성화
- [ ] TLS 1.2 이상만 허용

### 4. 인증서 자동 갱신 확인
- [ ] Let's Encrypt 또는 Vercel 자동 갱신 설정
- [ ] 갱신 알림 설정
- [ ] 수동 갱신 절차 문서화

### 5. 도메인별 SSL 확인
- [ ] ssalworks.ai.kr SSL 유효
- [ ] api.ssalworks.ai.kr SSL 유효 (있는 경우)
- [ ] 와일드카드 인증서 확인 (필요 시)

### 6. SSL 점검 보고서 확인
- [ ] 점검 일자
- [ ] 인증서 만료일
- [ ] 보안 등급
- [ ] 권장 조치 사항

## Test Commands
```bash
# SSL 인증서 상세 확인
openssl s_client -connect ssalworks.ai.kr:443 -servername ssalworks.ai.kr 2>/dev/null | openssl x509 -noout -dates

# SSL Labs 테스트 (웹에서)
# https://www.ssllabs.com/ssltest/analyze.html?d=ssalworks.ai.kr

# HTTPS 리다이렉트 확인
curl -I http://ssalworks.ai.kr

# 보안 헤더 확인
curl -I https://ssalworks.ai.kr | grep -E "Strict-Transport"
```

## Build Verification
- [ ] 배포 성공
- [ ] SSL 경고/에러 없음
- [ ] 인증서 로드 정상

## Integration Verification
- [ ] S5O1 프로덕션 배포와 연계
- [ ] S5O2 도메인 연결과 연계
- [ ] 모든 외부 서비스 HTTPS 사용

## Expected Files
- S5_운영/DevOps/SSL_CHECK_REPORT.md

## Pass Criteria
- SSL 인증서 유효
- HTTPS 강제 리다이렉트 동작
- SSL Labs A등급 이상

---

## 저장 위치 검증 항목
- [ ] S5_운영/DevOps/ 폴더에 보고서 저장되었는가?

