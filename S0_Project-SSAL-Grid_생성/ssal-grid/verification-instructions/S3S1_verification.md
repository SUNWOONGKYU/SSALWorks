# Verification Instruction - S3S1

## Task ID
S3S1

## Task Name
구독 권한 체크

## Verification Checklist

### 1. 파일 존재 검증
- [ ] api/lib/subscription/check-permission.js 존재
- [ ] api/lib/subscription/withSubscription.js 존재
- [ ] api/subscription/check.js 존재

### 2. 권한 체크 함수 검증
- [ ] checkSubscriptionPermission 함수
- [ ] 기능별 권한 매핑 (FEATURE_REQUIREMENTS)
- [ ] 현재 구독 조회

### 3. withSubscription 래퍼 검증
- [ ] 인증 체크 포함
- [ ] 구독 권한 체크
- [ ] 403 응답 반환 (권한 없음)

### 4. 권한 체크 API 검증
- [ ] GET /api/subscription/check?feature=xxx
- [ ] 권한 여부 반환
- [ ] 필요 플랜 정보 반환

### 5. 응답 형식 검증
```json
{
  "hasPermission": true,
  "currentPlan": "basic",
  "requiredPlans": ["basic", "premium"]
}
```

## Test Commands
```bash
# 파일 존재 확인
ls -la api/lib/subscription/

# API 테스트
curl "http://localhost:3000/api/subscription/check?feature=ai-qa" \
  -H "Authorization: Bearer <token>"
```

## Expected Results
- 권한 체크 파일 존재
- 권한 검증 동작
- 적절한 응답 반환

## Verification Agent
backend-developer

## Pass Criteria
- checkSubscriptionPermission 동작
- withSubscription 래퍼 동작
- Free/Basic/Premium 구분 정확
