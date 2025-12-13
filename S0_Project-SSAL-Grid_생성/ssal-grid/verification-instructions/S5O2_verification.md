# Verification Instruction - S5O2

## Task ID
S5O2

## Task Name
Vercel 프로덕션 배포

## Verification Checklist

### 1. 환경 변수 검증
- [ ] 모든 프로덕션 환경 변수 설정
- [ ] 테스트 키가 아닌 프로덕션 키 사용
- [ ] Environment: Production 설정

### 2. 빌드 설정 검증
- [ ] vercel.json 설정 확인
- [ ] 빌드 성공
- [ ] 에러 없음

### 3. 배포 검증
- [ ] 프로덕션 배포 성공
- [ ] 배포 URL 접근 가능
- [ ] 모든 페이지 로드

### 4. API 동작 검증
- [ ] /api/health 응답
- [ ] 인증 API 동작
- [ ] 결제 API 동작

### 5. 롤백 절차 검증
- [ ] 이전 배포 확인 가능
- [ ] 롤백 방법 문서화

## Test Commands
```bash
# 배포 상태 확인
vercel ls

# 프로덕션 URL 테스트
curl https://ssalworks.com
curl https://ssalworks.com/api/health

# 배포 로그 확인
vercel logs <deployment-url>
```

## Expected Results
- 프로덕션 배포 성공
- 모든 기능 동작
- 롤백 준비 완료

## Verification Agent
devops-troubleshooter

## Pass Criteria
- 배포 성공
- 모든 API 동작
- 롤백 절차 준비

---

## ⚠️ 저장 위치 검증 항목

### 필수 검증
- [ ] Task ID의 Stage에 맞는 폴더에 저장되었는가? (S1→S1_개발_준비/, S2→S2_개발-1차/, ...)
- [ ] Task ID의 Area에 맞는 폴더에 저장되었는가? (S→Security/, F→Frontend/, ...)
- [ ] Production 관련 코드(F, BA, D)는 Production 폴더에도 저장되었는가?

