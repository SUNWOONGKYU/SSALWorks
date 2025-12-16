# Verification Instruction - S1O1

## Task ID
S1O1

## Task Name
DNS 설정

## Verification Checklist

### 1. 도메인 현황 확인 검증
- [ ] 구매한 도메인 확인 완료
- [ ] 도메인 등록 업체 확인 완료
- [ ] DNS 관리 패널 접속 방법 확인 완료

### 2. DNS 레코드 준비 검증
- [ ] A 레코드 정보 준비 (@ → 76.76.21.21)
- [ ] CNAME 레코드 정보 준비 (www → cname.vercel-dns.com)

### 3. DNS 설정 문서 검증
- [ ] `DNS_SETUP.md` 문서 존재
- [ ] 레코드 설정 방법 가이드 포함
- [ ] 각 레코드 타입 설명 포함
- [ ] TTL 권장값 설명 포함

### 4. DNS 전파 확인 방법 검증
- [ ] dig 명령어 사용법 설명
- [ ] 온라인 도구 링크 제공

### 5. 체크리스트 검증
- [ ] 도메인 등록 업체 로그인 정보 확인
- [ ] DNS 관리 패널 접속 가능 확인
- [ ] 현재 DNS 레코드 백업

## Test Commands
```bash
# DNS 레코드 확인 (적용 후)
dig @8.8.8.8 ssalworks.com A
dig @8.8.8.8 www.ssalworks.com CNAME
```

## Expected Results
- DNS 설정 가이드 문서 존재
- Vercel DNS 레코드 정보 준비 완료
- 체크리스트 작성 완료

## Verification Agent
devops-troubleshooter

## Pass Criteria
- 도메인 현황 확인 완료
- DNS 레코드 준비 완료
- DNS 설정 가이드 문서 작성 완료

## ⚠️ Human-AI Task 검증 주의사항

이 Task는 **Human-AI** 유형입니다.
- DNS 설정 가이드 작성은 AI가 수행
- **실제 DNS 레코드 적용은 S5O2에서 PO가 수행**
- 도메인 등록 업체 접속은 Human 필수

---

## ⚠️ 저장 위치 검증 항목

### 필수 검증
- [ ] DNS 설정 문서가 `S1_개발_준비/DevOps/`에 저장되었는가?
