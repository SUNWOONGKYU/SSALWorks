# Verification Instruction - S1O1

## Task ID
S1O1

## Task Name
Vercel 프로젝트 설정

## Verification Checklist

### 1. 프로젝트 설정 검증
- [ ] Vercel 프로젝트 생성 확인
- [ ] GitHub 리포지토리 연결
- [ ] 자동 배포 설정 확인

### 2. 환경 변수 설정
- [ ] SUPABASE_URL 설정
- [ ] SUPABASE_ANON_KEY 설정
- [ ] 환경별 변수 분리 (Development, Preview, Production)

### 3. 빌드 설정 검증
- [ ] vercel.json 파일 존재
- [ ] 빌드 명령어 설정
- [ ] 출력 디렉토리 설정

### 4. 배포 테스트
- [ ] Preview 배포 성공
- [ ] 배포된 URL 접근 가능
- [ ] API 엔드포인트 동작

### 5. 도메인 설정 (선택)
- [ ] 커스텀 도메인 연결 준비
- [ ] SSL 자동 설정 확인

## Test Commands
```bash
# Vercel CLI로 프로젝트 확인
vercel ls

# 배포 상태 확인
vercel inspect <deployment-url>

# API 테스트
curl https://<deployment-url>/api/health
```

## Expected Results
- Vercel 프로젝트 활성화
- 환경 변수 설정 완료
- Preview 배포 성공

## Verification Agent
devops-troubleshooter

## Pass Criteria
- 프로젝트 생성 및 연결 완료
- 필수 환경 변수 설정
- Preview 배포 성공
