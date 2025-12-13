# Verification Instruction - S1BI1

## Task ID
S1BI1

## Task Name
Supabase 클라이언트 설정

## Verification Checklist

### 1. 파일 존재 검증
- [ ] supabase-client.js 파일 존재
- [ ] 환경 설정 파일 존재 (.env.local 또는 config.js)

### 2. 클라이언트 초기화 검증
- [ ] createClient 함수 사용
- [ ] URL 환경 변수 참조
- [ ] Anon Key 환경 변수 참조
- [ ] 클라이언트 export 확인

### 3. 기능 검증
```javascript
// 연결 테스트 코드
const { data, error } = await supabase.from('health_check').select('*').limit(1);
console.log('Connection:', error ? 'Failed' : 'Success');
```

### 4. 보안 검증
- [ ] Service Role Key가 클라이언트에 노출되지 않음
- [ ] Anon Key만 클라이언트에서 사용
- [ ] 환경 변수 하드코딩 없음

### 5. 에러 핸들링 검증
- [ ] 연결 실패 시 에러 처리
- [ ] 타임아웃 설정 (선택)

## Test Commands
```bash
# 파일 존재 확인
ls -la P3_프로토타입_제작/Frontend/Prototype/lib/supabase-client.js

# 하드코딩된 키 확인
grep -E "(eyJ|supabase.co)" P3_프로토타입_제작/Frontend/Prototype/lib/*.js
```

## Expected Results
- Supabase 클라이언트 파일 존재
- 환경 변수로 설정값 관리
- 보안 키 노출 없음

## Verification Agent
backend-developer

## Pass Criteria
- 클라이언트 초기화 성공
- 환경 변수 사용
- Service Role Key 클라이언트 노출 없음

---

## ⚠️ 저장 위치 검증 항목

### 필수 검증
- [ ] Task ID의 Stage에 맞는 폴더에 저장되었는가? (S1→S1_개발_준비/, S2→S2_개발-1차/, ...)
- [ ] Task ID의 Area에 맞는 폴더에 저장되었는가? (S→Security/, F→Frontend/, ...)
- [ ] Production 관련 코드(F, BA, D)는 Production 폴더에도 저장되었는가?

