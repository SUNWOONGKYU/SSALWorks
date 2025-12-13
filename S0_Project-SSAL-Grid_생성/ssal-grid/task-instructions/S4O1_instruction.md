# Task Instruction - S4O1

## Task ID
S4O1

## Task Name
PG사 설정

## Task Goal
토스 페이먼트 가맹점 등록 및 운영 환경 설정

## Prerequisites (Dependencies)
- S4M1 (MVP 최종 검토) 완료
- 사업자등록증 준비

## Specific Instructions

### 1. 토스 페이먼트 계정 생성
- URL: https://developers.tosspayments.com/
- 회원가입 진행
- 개발자 대시보드 접근

### 2. 테스트 환경 설정
```
1. 개발자센터 > 개발정보 > 테스트 API 키 확인
   - Client Key: test_ck_xxxxxxxxxxxxxxx
   - Secret Key: test_sk_xxxxxxxxxxxxxxx

2. 테스트 환경 특징:
   - 실제 결제 없이 테스트 가능
   - 테스트 카드 번호 사용
   - 샌드박스 환경
```

### 3. 프로덕션 가맹점 등록
```
1. 가맹점 신청
   - 사업자 정보 입력
   - 서비스 정보 입력
   - 정산 계좌 정보

2. 필요 서류
   - 사업자등록증
   - 대표자 신분증
   - 통장 사본

3. 심사 기간
   - 일반적으로 영업일 기준 3-5일
   - 고위험 업종은 추가 심사 필요
```

### 4. Vercel 환경 변수 등록
```bash
# 테스트 환경
vercel env add TOSS_CLIENT_KEY       # test_ck_xxx
vercel env add TOSS_SECRET_KEY       # test_sk_xxx
vercel env add TOSS_WEBHOOK_SECRET   # 웹훅 시크릿

# 프로덕션 환경 (가맹점 승인 후)
vercel env add TOSS_CLIENT_KEY production    # live_ck_xxx
vercel env add TOSS_SECRET_KEY production    # live_sk_xxx
```

### 5. 웹훅 URL 등록
```
1. 토스 개발자센터 > 웹훅 설정
2. 웹훅 URL 등록:
   - 테스트: https://your-preview.vercel.app/api/webhook/toss-payments
   - 프로덕션: https://your-domain.com/api/webhook/toss-payments

3. 구독할 이벤트:
   - PAYMENT_STATUS_CHANGED
   - BILLING_STATUS_CHANGED
   - DEPOSIT_CALLBACK
```

### 6. 결제 수단 설정
```
활성화할 결제 수단:
- [x] 신용/체크카드
- [x] 간편결제 (토스페이, 카카오페이 등)
- [ ] 가상계좌 (선택)
- [ ] 계좌이체 (선택)
- [ ] 휴대폰 결제 (선택)
```

### 7. 정기결제(빌링) 설정
```
1. 빌링 서비스 신청
   - 별도 심사 필요
   - 서비스 설명 문서 제출

2. 빌링 설정
   - 결제 주기: 월 단위
   - 결제일: 가입일 기준 또는 고정일
   - 재시도 정책: 3회 (1일, 3일, 7일 후)
```

### 8. 설정 확인 체크리스트
- 위치: `docs/PG_SETUP_CHECKLIST.md`

```markdown
# PG사 설정 체크리스트

## 계정 및 키
- [ ] 토스 페이먼트 계정 생성
- [ ] 테스트 API 키 확인
- [ ] 프로덕션 API 키 발급 (가맹점 승인 후)

## 가맹점 등록
- [ ] 사업자 정보 입력
- [ ] 필요 서류 제출
- [ ] 가맹점 심사 완료

## 환경 설정
- [ ] Vercel 환경 변수 등록 (테스트)
- [ ] Vercel 환경 변수 등록 (프로덕션)
- [ ] 웹훅 URL 등록

## 결제 수단
- [ ] 카드 결제 활성화
- [ ] 간편결제 활성화
- [ ] 정기결제(빌링) 신청

## 테스트
- [ ] 테스트 환경에서 결제 테스트 완료
- [ ] 웹훅 수신 테스트 완료
- [ ] 취소/환불 테스트 완료

## 운영 준비
- [ ] 모니터링 대시보드 설정
- [ ] 알림 설정 (결제 실패 등)
- [ ] 정산 주기 확인
```

### 9. 테스트 카드 정보
```
토스 페이먼트 테스트 카드:
- 카드번호: 4330000000000000
- 유효기간: 12/25 (미래 날짜)
- CVC: 123
- 비밀번호: 00

테스트 시나리오:
- 성공: 위 카드 정보 사용
- 실패: 카드번호 4000000000000002
- 잔액부족: 카드번호 4000000000000010
```

### 10. 문의 및 지원
```
토스 페이먼트 지원:
- 기술 문의: tech@tosspayments.com
- 가맹점 문의: merchant@tosspayments.com
- 전화: 1599-4905

문서:
- 개발자 문서: https://docs.tosspayments.com/
- API 레퍼런스: https://docs.tosspayments.com/reference
```

## Expected Output Files
- `docs/PG_SETUP_CHECKLIST.md`
- Vercel 환경 변수 설정 완료
- 토스 페이먼트 웹훅 설정 완료

## Completion Criteria
- [ ] 토스 페이먼트 계정 생성
- [ ] 테스트 API 키 확인 및 저장
- [ ] Vercel 환경 변수 등록
- [ ] 웹훅 URL 등록
- [ ] 테스트 결제 성공
- [ ] 가맹점 신청 (프로덕션용)
- [ ] 설정 체크리스트 완료

## Tech Stack
- 토스 페이먼트
- Vercel

## Tools
- Bash (vercel env)
- 웹 브라우저 (토스 개발자센터)

## Execution Type
Human-Assisted

## Remarks
- 가맹점 심사에 3-5 영업일 소요
- 정기결제는 별도 심사 필요
- 테스트 환경에서 충분히 테스트 후 프로덕션 이관
- PCI DSS 규정 준수 필요

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

