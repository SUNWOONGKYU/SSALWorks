# Verification Instruction - S2M1

## Task ID
S2M1

## Task Name
기능 명세서

## Verification Checklist

### 1. 문서 존재 검증
- [ ] FEATURE_SPEC.md 파일 존재
- [ ] 모든 기능 명세 포함

### 2. 인증 기능 명세
- [ ] 이메일 로그인 명세
- [ ] Google OAuth 명세
- [ ] 세션 관리 명세
- [ ] 비밀번호 재설정 명세

### 3. 구독 기능 명세
- [ ] 구독 플랜 구조
- [ ] 구독 신청 프로세스
- [ ] 구독 관리 기능
- [ ] 결제 연동 명세

### 4. AI 기능 명세
- [ ] AI Q&A 기능 명세
- [ ] 사용량 추적 명세
- [ ] 사용량 제한 명세

### 5. 명세 품질
- [ ] 입력/출력 정의
- [ ] 에러 케이스 정의
- [ ] API 엔드포인트 정의

## Test Commands
```bash
# 파일 존재 확인
ls -la docs/FEATURE_SPEC.md

# 섹션 확인
grep -E "^##" docs/FEATURE_SPEC.md
```

## Expected Results
- 기능 명세서 완성
- 모든 주요 기능 포함
- API 엔드포인트 정의

## Verification Agent
code-reviewer

## Pass Criteria
- 인증, 구독, AI 3대 기능 명세 완료
- API 엔드포인트 목록 포함
- 에러 케이스 정의

---

## ⚠️ 저장 위치 검증 항목

### 필수 검증
- [ ] Task ID의 Stage에 맞는 폴더에 저장되었는가? (S1→S1_개발_준비/, S2→S2_개발-1차/, ...)
- [ ] Task ID의 Area에 맞는 폴더에 저장되었는가? (S→Security/, F→Frontend/, ...)
- [ ] Production 관련 코드(F, BA, D)는 Production 폴더에도 저장되었는가?

