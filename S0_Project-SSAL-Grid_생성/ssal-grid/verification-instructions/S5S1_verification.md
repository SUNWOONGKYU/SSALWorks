# Verification Instruction - S5S1

## Task ID
S5S1

## Task Name
SSL/보안 설정

## Verification Checklist

### 1. SSL 인증서 검증
- [ ] HTTPS 접속 가능
- [ ] SSL 인증서 유효
- [ ] 자동 갱신 설정

### 2. 보안 헤더 검증
- [ ] X-Content-Type-Options: nosniff
- [ ] X-Frame-Options: DENY
- [ ] X-XSS-Protection: 1
- [ ] Strict-Transport-Security
- [ ] Content-Security-Policy

### 3. CORS 설정 검증
- [ ] api/lib/cors.js 존재
- [ ] 허용 Origin 목록 설정
- [ ] Preflight 요청 처리

### 4. 보안 미들웨어 검증
- [ ] api/lib/security.js 존재
- [ ] IP Rate Limiting
- [ ] 입력 검증

### 5. 보안 점검 스크립트 검증
- [ ] scripts/security-check.js 존재
- [ ] API 키 노출 검사
- [ ] 실행 결과 통과

## Test Commands
```bash
# SSL 확인
curl -vI https://ssalworks.com 2>&1 | grep -i ssl

# 보안 헤더 확인
curl -I https://ssalworks.com | grep -E "(X-Content|X-Frame|Strict)"

# 보안 점검 스크립트 실행
node scripts/security-check.js
```

## Expected Results
- SSL 인증서 활성화
- 보안 헤더 설정
- 보안 점검 통과

## Verification Agent
devops-troubleshooter

## Pass Criteria
- HTTPS 강제
- 모든 보안 헤더 존재
- 보안 점검 스크립트 통과

---

## ⚠️ 저장 위치 검증 항목

### 필수 검증
- [ ] Task ID의 Stage에 맞는 폴더에 저장되었는가? (S1→S1_개발_준비/, S2→S2_개발-1차/, ...)
- [ ] Task ID의 Area에 맞는 폴더에 저장되었는가? (S→Security/, F→Frontend/, ...)
- [ ] Production 관련 코드(F, BA, D)는 Production 폴더에도 저장되었는가?

