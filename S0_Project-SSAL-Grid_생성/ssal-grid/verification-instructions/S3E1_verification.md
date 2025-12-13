# Verification Instruction - S3E1

## Task ID
S3E1

## Task Name
AI API 키 설정

## Verification Checklist

### 1. API 키 발급 검증
- [ ] Anthropic Console 계정 생성
- [ ] API 키 발급 완료
- [ ] 키 이름 설정 (ssalworks-xxx)

### 2. 환경 변수 설정 검증
- [ ] Vercel에 ANTHROPIC_API_KEY 등록
- [ ] 환경별 설정 (Development, Preview, Production)

### 3. 로컬 환경 설정 검증
- [ ] .env.local 파일 존재
- [ ] ANTHROPIC_API_KEY 설정
- [ ] .gitignore에 포함 확인

### 4. 검증 스크립트 검증
- [ ] scripts/verify-api-key.js 존재
- [ ] npm run verify:api-key 실행 성공

### 5. 보안 검증
- [ ] 코드에 API 키 하드코딩 없음
- [ ] 클라이언트에 키 노출 없음
- [ ] 환경 변수만 사용

## Test Commands
```bash
# 환경 변수 확인 (마스킹)
echo $ANTHROPIC_API_KEY | cut -c1-10

# 검증 스크립트 실행
npm run verify:api-key

# 코드에서 키 노출 확인
grep -r "sk-ant" --include="*.js" --include="*.ts"
```

## Expected Results
- API 키 발급 완료
- 환경 변수 설정 완료
- 검증 스크립트 통과

## Verification Agent
devops-troubleshooter

## Pass Criteria
- API 키 유효성 확인
- 환경 변수 설정 완료
- 코드에 키 노출 없음
