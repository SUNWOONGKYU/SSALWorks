# Verification Instruction - S5O3

## Task ID
S5O3

## Task Name
모니터링 설정

## Verification Checklist

### 1. Vercel Analytics 검증
- [ ] Analytics 활성화
- [ ] Web Vitals 수집 시작
- [ ] 대시보드 접근 가능

### 2. 외부 모니터링 서비스 검증
- [ ] UptimeRobot 설정 (또는 유사 서비스)
- [ ] 모니터링 간격 설정
- [ ] 알림 설정

### 3. 커스텀 대시보드 검증
- [ ] admin/monitoring.html 존재
- [ ] 실시간 상태 표시
- [ ] 에러 목록 표시

### 4. 알림 설정 검증
- [ ] Slack 웹훅 설정
- [ ] 이메일 알림 설정
- [ ] 알림 트리거 설정

### 5. 모니터링 문서 검증
- [ ] MONITORING_GUIDE.md 존재
- [ ] 알림 임계치 정의
- [ ] 대응 절차 정의

## Test Commands
```bash
# 모니터링 대시보드 확인
curl https://ssalworks.com/admin/monitoring.html

# 알림 파일 확인
ls -la api/lib/notifications/

# Cron 모니터링 테스트
curl https://ssalworks.com/api/cron/monitoring \
  -H "Authorization: Bearer <cron_secret>"
```

## Expected Results
- 모니터링 시스템 활성화
- 알림 설정 완료
- 대시보드 동작

## Verification Agent
devops-troubleshooter

## Pass Criteria
- Vercel Analytics 활성화
- 외부 모니터링 설정
- 알림 수신 확인
