# Verification Instruction - S2S1

## Task ID
S2S1

## Task Name
인증 미들웨어

## Verification Checklist

### 1. 파일 존재 검증
- [ ] api/lib/auth/middleware.js 존재
- [ ] api/lib/auth/withAuth.js 존재
- [ ] api/lib/auth/errors.js 존재

### 2. verifyAuth 함수 검증
- [ ] Authorization 헤더 확인
- [ ] Bearer 토큰 추출
- [ ] Supabase 토큰 검증
- [ ] user 객체 반환

### 3. withAuth 래퍼 검증
- [ ] 인증 실패 시 401 반환
- [ ] 인증 성공 시 req.user 설정
- [ ] 핸들러 호출

### 4. 에러 응답 검증
- [ ] NO_TOKEN 에러 정의
- [ ] INVALID_TOKEN 에러 정의
- [ ] TOKEN_EXPIRED 에러 정의

### 5. 보안 검증
- [ ] Service Role Key 서버에서만 사용
- [ ] 토큰 만료 처리
- [ ] 에러 메시지에 민감 정보 없음

## Test Commands
```bash
# 파일 존재 확인
ls -la api/lib/auth/

# 함수 export 확인
grep -E "module.exports" api/lib/auth/middleware.js
```

## Expected Results
- 인증 미들웨어 파일 존재
- 토큰 검증 동작
- 에러 응답 표준화

## Verification Agent
backend-developer

## Pass Criteria
- verifyAuth 함수 동작
- withAuth 래퍼 동작
- 401 응답 정상 반환

---

## ⚠️ 저장 위치 검증 항목

### 필수 검증
- [ ] Task ID의 Stage에 맞는 폴더에 저장되었는가? (S1→S1_개발_준비/, S2→S2_개발-1차/, ...)
- [ ] Task ID의 Area에 맞는 폴더에 저장되었는가? (S→Security/, F→Frontend/, ...)
- [ ] Production 관련 코드(F, BA, D)는 Production 폴더에도 저장되었는가?

