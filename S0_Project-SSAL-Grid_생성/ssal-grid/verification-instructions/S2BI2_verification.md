# Verification Instruction - S2BI2

## Task ID
S2BI2

## Task Name
구독 클라이언트 모듈

## Verification Checklist

### 1. 파일 존재 검증
- [ ] subscription.js 파일 존재
- [ ] 모든 구독 함수 export

### 2. 함수 구현 검증
- [ ] getSubscription 함수
- [ ] getPlans 함수
- [ ] checkAccess 함수

### 3. 구독 상태 조회 검증
- [ ] 현재 구독 정보 조회
- [ ] 구독 만료일 확인
- [ ] 구독 상태 (active, cancelled, expired)

### 4. 플랜 정보 검증
- [ ] 플랜 목록 조회
- [ ] 플랜별 기능 목록
- [ ] 플랜별 가격 정보

### 5. 권한 체크 검증
- [ ] 기능별 접근 권한 확인
- [ ] 등급별 권한 매핑

## Test Commands
```bash
# 파일 존재 확인
ls -la P3_프로토타입_제작/Frontend/Prototype/lib/subscription.js

# 함수 확인
grep -E "^(export|async function|function)" P3_프로토타입_제작/Frontend/Prototype/lib/subscription.js
```

## Expected Results
- 구독 모듈 파일 존재
- 구독 조회/권한 체크 함수
- API 연동 준비

## Verification Agent
backend-developer

## Pass Criteria
- 3개 핵심 함수 구현
- 구독 상태 조회 가능
- 권한 체크 함수 동작

---

## ⚠️ 저장 위치 검증 항목

### 필수 검증
- [ ] Task ID의 Stage에 맞는 폴더에 저장되었는가? (S1→S1_개발_준비/, S2→S2_개발-1차/, ...)
- [ ] Task ID의 Area에 맞는 폴더에 저장되었는가? (S→Security/, F→Frontend/, ...)
- [ ] Production 관련 코드(F, BA, D)는 Production 폴더에도 저장되었는가?

