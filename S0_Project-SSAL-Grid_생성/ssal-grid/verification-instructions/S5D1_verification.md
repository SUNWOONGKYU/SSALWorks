# Verification Instruction - S5D1

## Task ID
S5D1

## Task Name
백업 설정

## Verification Checklist

### 1. Supabase 백업 검증
- [ ] 자동 백업 활성화 확인
- [ ] 백업 보존 기간 확인 (7일+)

### 2. 백업 스크립트 검증
- [ ] scripts/backup-database.js 존재
- [ ] scripts/restore-database.js 존재
- [ ] pg_dump 명령어 사용

### 3. 자동 백업 Cron 검증
- [ ] api/cron/backup.js 존재
- [ ] vercel.json Cron 설정
- [ ] 매일 실행 스케줄

### 4. 백업 정책 문서 검증
- [ ] BACKUP_POLICY.md 존재
- [ ] 백업 주기 정의
- [ ] 복원 절차 정의

### 5. 백업 테스트 검증
- [ ] 수동 백업 실행 성공
- [ ] 복원 테스트 성공

## Test Commands
```bash
# 스크립트 파일 확인
ls -la scripts/backup-*.js
ls -la scripts/restore-*.js

# 수동 백업 테스트
npm run backup

# 백업 파일 확인
ls -la backups/
```

## Expected Results
- 백업 스크립트 존재
- 자동 백업 설정 완료
- 복원 절차 문서화

## Verification Agent
devops-troubleshooter

## Pass Criteria
- Supabase 자동 백업 활성화
- 수동 백업 스크립트 동작
- 복원 테스트 성공

---

## ⚠️ 저장 위치 검증 항목

### 필수 검증
- [ ] Task ID의 Stage에 맞는 폴더에 저장되었는가? (S1→S1_개발_준비/, S2→S2_개발-1차/, ...)
- [ ] Task ID의 Area에 맞는 폴더에 저장되었는가? (S→Security/, F→Frontend/, ...)
- [ ] Production 관련 코드(F, BA, D)는 Production 폴더에도 저장되었는가?

