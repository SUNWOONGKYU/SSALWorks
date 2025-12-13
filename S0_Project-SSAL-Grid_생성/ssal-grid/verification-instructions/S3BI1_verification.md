# Verification Instruction - S3BI1

## Task ID
S3BI1

## Task Name
AI API 클라이언트 통합

## Verification Checklist

### 1. 파일 존재 검증
- [ ] api/lib/ai/anthropic-client.js 존재
- [ ] api/lib/ai/usage-limiter.js 존재
- [ ] api/lib/ai/errors.js 존재

### 2. Anthropic 클라이언트 검증
- [ ] SDK 초기화 확인
- [ ] sendMessage 함수 구현
- [ ] 응답 파싱 정확

### 3. 사용량 로깅 검증
- [ ] logUsage 함수 구현
- [ ] ai_usage_logs 테이블 연동
- [ ] 토큰 수 정확히 기록

### 4. 사용량 제한 검증
- [ ] checkUsageLimit 함수 구현
- [ ] 플랜별 한도 적용
- [ ] 초과 시 에러 반환

### 5. 에러 핸들링 검증
- [ ] AI_ERRORS 정의
- [ ] API 에러 처리
- [ ] Rate Limit 에러 처리

## Test Commands
```bash
# 파일 존재 확인
ls -la api/lib/ai/

# SDK 설치 확인
npm ls @anthropic-ai/sdk
```

## Expected Results
- AI 클라이언트 파일 존재
- Anthropic SDK 연동
- 사용량 추적 동작

## Verification Agent
backend-developer

## Pass Criteria
- sendMessage 함수 동작
- 사용량 로깅 동작
- 사용량 제한 동작

---

## ⚠️ 저장 위치 검증 항목

### 필수 검증
- [ ] Task ID의 Stage에 맞는 폴더에 저장되었는가? (S1→S1_개발_준비/, S2→S2_개발-1차/, ...)
- [ ] Task ID의 Area에 맞는 폴더에 저장되었는가? (S→Security/, F→Frontend/, ...)
- [ ] Production 관련 코드(F, BA, D)는 Production 폴더에도 저장되었는가?

