# Verification Instruction - S2BA3

## Task ID
S2BA3

## Task Name
구독 관리 API

## Verification Checklist

### 1. 파일 존재 검증
- [ ] api/subscription/status.js 존재
- [ ] api/subscription/create.js 존재
- [ ] api/subscription/cancel.js 존재

### 2. 구독 상태 조회 API
- [ ] GET /api/subscription/status
- [ ] 인증 필수
- [ ] 현재 구독 정보 반환

### 3. 구독 신청 API
- [ ] POST /api/subscription/create
- [ ] plan_id 파라미터
- [ ] 인증 필수
- [ ] 구독 레코드 생성

### 4. 구독 해지 API
- [ ] POST /api/subscription/cancel
- [ ] 인증 필수
- [ ] 상태 변경 (cancelled)

### 5. 응답 형식 검증
```json
// 구독 조회 응답
{
  "subscription": {
    "id": "...",
    "plan_id": "...",
    "status": "active",
    "end_date": "..."
  }
}
```

## Test Commands
```bash
# 파일 존재 확인
ls -la api/subscription/

# API 테스트
curl http://localhost:3000/api/subscription/status \
  -H "Authorization: Bearer <token>"
```

## Expected Results
- 구독 API 파일 존재
- CRUD 동작 정상
- 인증 검증 동작

## Verification Agent
backend-developer

## Pass Criteria
- 3개 API 엔드포인트 동작
- 인증 미들웨어 적용
- 구독 상태 관리 정상

---

## ⚠️ 저장 위치 검증 항목

### 필수 검증
- [ ] Task ID의 Stage에 맞는 폴더에 저장되었는가? (S1→S1_개발_준비/, S2→S2_개발-1차/, ...)
- [ ] Task ID의 Area에 맞는 폴더에 저장되었는가? (S→Security/, F→Frontend/, ...)
- [ ] Production 관련 코드(F, BA, D)는 Production 폴더에도 저장되었는가?

