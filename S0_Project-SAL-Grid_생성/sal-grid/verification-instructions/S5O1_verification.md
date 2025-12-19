# Verification Instruction - S5O1

---

## Task ID
S5O1

## Task Name
프로덕션 배포

## Verification Agent
qa-specialist

## Verification Criteria

### 1. 배포 전 체크리스트 확인
- [ ] 모든 테스트 통과 (npm test)
- [ ] E2E 테스트 통과
- [ ] 린트 에러 없음 (npm run lint)
- [ ] 빌드 성공 (npm run build)

### 2. 환경변수 설정 확인
- [ ] SUPABASE_URL 설정
- [ ] SUPABASE_ANON_KEY 설정
- [ ] SUPABASE_SERVICE_ROLE_KEY 설정
- [ ] TOSS_CLIENT_KEY 설정 (live 키)
- [ ] TOSS_SECRET_KEY 설정 (live 키)
- [ ] RESEND_API_KEY 설정
- [ ] SENTRY_DSN 설정
- [ ] CRON_SECRET 설정

### 3. Vercel 프로덕션 배포 확인
- [ ] vercel --prod 실행 성공
- [ ] 배포 URL 확인
- [ ] 프로덕션 도메인 연결

### 4. 배포 후 검증
- [ ] 메인 페이지 로드 (https://ssalworks.ai.kr)
- [ ] SSL 인증서 확인
- [ ] 로그인 기능 동작
- [ ] 결제 페이지 동작
- [ ] API 엔드포인트 동작

### 5. Health Check API 확인
- [ ] /api/health 응답 200
- [ ] /api/ai/health AI 서비스 상태
- [ ] /api/subscription/status 구독 상태

### 6. 배포 기록 작성
- [ ] DEPLOYMENT_LOG.md 업데이트
- [ ] Git 커밋 해시 기록
- [ ] 변경 사항 기록

## Test Commands
```bash
# 프로덕션 배포
vercel --prod

# Health Check
curl https://ssalworks.ai.kr/api/health

# SSL 확인
curl -I https://ssalworks.ai.kr

# 보안 헤더 확인
curl -I https://ssalworks.ai.kr | grep -E "Strict-Transport|X-Content-Type|X-Frame"
```

## Build Verification
- [ ] 빌드 에러 없음
- [ ] 번들 사이즈 적정
- [ ] 정적 파일 생성 완료

## Integration Verification
- [ ] S4T2 API 통합 테스트 통과 후 배포
- [ ] 모든 외부 서비스 연결 정상
- [ ] Sentry 에러 수집 정상

## Expected Files
- S5_운영/DevOps/DEPLOYMENT_LOG.md
- scripts/verify-deployment.js

## Pass Criteria
- 프로덕션 배포 성공
- 모든 Health Check 통과
- 주요 기능 동작 확인
- 배포 기록 작성

---

## 저장 위치 검증 항목
- [ ] S5_운영/DevOps/ 폴더에 문서 저장되었는가?
