# Verification Instruction - S5O1

---

## 📌 필수 참조 규칙 파일 (2025-12-19)

> **⚠️ 검증 전 반드시 아래 규칙 파일을 확인하세요!**

| 규칙 파일 | 내용 | 참조 시점 |
|----------|------|----------|
| `.claude/rules/04_grid-writing.md` | Grid 속성 검증 | 결과 기록 시 |
| `.claude/rules/05_execution-process.md` | 검증 프로세스 | 검증 수행 순서 |
| `.claude/rules/06_verification.md` | 검증 기준 | **핵심 참조** |



## Task ID
S5O1

## Task Name
도메인 연결

## Verification Checklist

### 1. 도메인 구매 검증
- [ ] 도메인 구매 완료
- [ ] WHOIS 개인정보 보호
- [ ] 자동 갱신 설정

### 2. DNS 설정 검증
- [ ] 네임서버 설정 완료
- [ ] A/CNAME 레코드 설정
- [ ] DNS 전파 완료

### 3. Vercel 도메인 연결 검증
- [ ] Vercel에 도메인 추가
- [ ] SSL 인증서 발급
- [ ] 도메인 접속 확인

### 4. 리다이렉트 설정 검증
- [ ] www → non-www 리다이렉트
- [ ] HTTP → HTTPS 리다이렉트

### 5. 접속 테스트 검증
- [ ] https://ssalworks.com 접속
- [ ] https://www.ssalworks.com 리다이렉트
- [ ] API 엔드포인트 동작

## Test Commands
```bash
# DNS 확인
dig ssalworks.com

# SSL 확인
curl -I https://ssalworks.com

# 리다이렉트 확인
curl -I http://ssalworks.com
curl -I https://www.ssalworks.com
```

## Expected Results
- 도메인 연결 완료
- SSL 활성화
- 리다이렉트 동작

## Verification Agent
devops-troubleshooter

## Pass Criteria
- 도메인 접속 가능
- SSL 인증서 유효
- www 리다이렉트 동작

---

## ⚠️ 저장 위치 검증 항목

### 필수 검증
- [ ] Task ID의 Stage에 맞는 폴더에 저장되었는가? (S1→S1_개발_준비/, S2→S2_개발-1차/, ...)
- [ ] Task ID의 Area에 맞는 폴더에 저장되었는가? (S→Security/, F→Frontend/, ...)
- [ ] Production 관련 코드(F, BA, D)는 Production 폴더에도 저장되었는가?

