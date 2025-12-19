# Verification Instruction - S5O3

---

## 📌 필수 참조 규칙 파일 (2025-12-19)

> **⚠️ 검증 전 반드시 아래 규칙 파일을 확인하세요!**

| 규칙 파일 | 내용 | 참조 시점 |
|----------|------|----------|
| `.claude/rules/04_grid-writing.md` | Grid 속성 검증 | 결과 기록 시 |
| `.claude/rules/05_execution-process.md` | 검증 프로세스 | 검증 수행 순서 |
| `.claude/rules/06_verification.md` | 검증 기준 | **핵심 참조** |



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

---

## ⚠️ 저장 위치 검증 항목

### 필수 검증
- [ ] Task ID의 Stage에 맞는 폴더에 저장되었는가? (S1→S1_개발_준비/, S2→S2_개발-1차/, ...)
- [ ] Task ID의 Area에 맞는 폴더에 저장되었는가? (S→Security/, F→Frontend/, ...)
- [ ] Production 관련 코드(F, BA, D)는 Production 폴더에도 저장되었는가?

