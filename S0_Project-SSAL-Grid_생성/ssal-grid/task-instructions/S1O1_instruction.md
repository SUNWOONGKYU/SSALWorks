# Task Instruction - S1O1

## Task ID
S1O1

## Task Name
DNS 설정

## Task Goal
커스텀 도메인 연결을 위한 DNS 레코드 설정 준비 (도메인은 P2에서 구매 완료)

## Prerequisites (Dependencies)
- 없음 (독립 Task)
- 도메인 구매 완료 (ssalworks.com 또는 유사)

## Specific Instructions

### 1. 도메인 현황 확인
- 구매한 도메인 확인
- 도메인 등록 업체 (Registrar) 확인
- DNS 관리 패널 접속 방법 확인

### 2. Vercel DNS 레코드 준비
- Vercel 연결에 필요한 레코드:
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 3. DNS 설정 문서 작성
- 위치: `docs/DNS_SETUP.md`
- 레코드 설정 방법 가이드
- 각 레코드 타입 설명
- TTL 권장값 (3600초 또는 1시간)

### 4. DNS 전파 확인 방법
```bash
# A 레코드 확인
dig @8.8.8.8 ssalworks.com A

# CNAME 확인
dig @8.8.8.8 www.ssalworks.com CNAME

# 또는 온라인 도구
# https://www.whatsmydns.net/
```

### 5. 체크리스트 작성
- [ ] 도메인 등록 업체 로그인 정보 확인
- [ ] DNS 관리 패널 접속 가능 확인
- [ ] 현재 DNS 레코드 백업
- [ ] Vercel 레코드 설정 준비

## Expected Output Files
- `docs/DNS_SETUP.md`

## Completion Criteria
- [ ] 도메인 현황 확인 완료
- [ ] DNS 레코드 준비 완료
- [ ] DNS 설정 가이드 문서 작성
- [ ] 레코드 설정 체크리스트 작성

## Tech Stack
- DNS
- Domain Management

## Tools
- Write, Read
- Bash (dig 명령어)
- WebFetch (DNS 조회 도구)

## Execution Type
Human-AI (도메인 등록 업체 접속 필요)

## Remarks
- 실제 DNS 레코드 적용은 S5O2에서 수행
- DNS 전파에 최대 48시간 소요 가능 (보통 몇 시간)
- 현재 DNS 레코드 변경 전 백업 필수
- 이 Task는 준비 단계이며, 실제 적용은 프로덕션 배포 시점에 수행
