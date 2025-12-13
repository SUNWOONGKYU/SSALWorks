# Verification Instruction - S5BA1

## Task ID
S5BA1

## Task Name
모니터링 API

## Verification Checklist

### 1. 파일 존재 검증
- [ ] api/health.js 존재
- [ ] api/status.js 존재
- [ ] api/log-error.js 존재

### 2. Health Check API 검증
- [ ] GET /api/health
- [ ] 서비스 상태 반환
- [ ] 응답 시간 포함

### 3. 상세 상태 API 검증
- [ ] GET /api/status
- [ ] 관리자 인증 필수
- [ ] 상세 메트릭 반환

### 4. 에러 로깅 API 검증
- [ ] POST /api/log-error
- [ ] error_logs 테이블 저장
- [ ] 클라이언트 에러 캡처

### 5. 응답 형식 검증
```json
{
  "status": "healthy",
  "timestamp": "...",
  "services": {
    "database": { "status": "healthy" },
    "payment": { "status": "healthy" }
  }
}
```

## Test Commands
```bash
# Health Check 테스트
curl http://localhost:3000/api/health

# 상세 상태 테스트 (관리자 토큰 필요)
curl http://localhost:3000/api/status \
  -H "Authorization: Bearer <admin_token>"

# 에러 로깅 테스트
curl -X POST http://localhost:3000/api/log-error \
  -H "Content-Type: application/json" \
  -d '{"error":{"message":"test error"}}'
```

## Expected Results
- 모니터링 API 동작
- 서비스 상태 정확
- 에러 로깅 동작

## Verification Agent
backend-developer

## Pass Criteria
- Health Check 응답 정상
- 서비스별 상태 반환
- 에러 로깅 저장

---

## ⚠️ 저장 위치 검증 항목

### 필수 검증
- [ ] Task ID의 Stage에 맞는 폴더에 저장되었는가? (S1→S1_개발_준비/, S2→S2_개발-1차/, ...)
- [ ] Task ID의 Area에 맞는 폴더에 저장되었는가? (S→Security/, F→Frontend/, ...)
- [ ] Production 관련 코드(F, BA, D)는 Production 폴더에도 저장되었는가?

