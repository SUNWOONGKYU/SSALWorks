# Verification Instruction - S5F1

---

## Task ID
S5F1

## Task Name
버그 수정 (프론트엔드)

## Verification Agent
code-reviewer

## Verification Criteria

### 1. 버그 추적 시스템 확인
- [ ] 버그 리포트 문서 존재
- [ ] 버그 우선순위 분류 (P1-P4)
- [ ] 수정 상태 추적

### 2. P1/P2 버그 수정 확인
- [ ] 서비스 이용 불가 버그 (P1) 모두 수정
- [ ] 핵심 기능 장애 버그 (P2) 모두 수정
- [ ] 수정 내역 문서화

### 3. 버그 수정 보고서 확인
- [ ] 버그 ID
- [ ] 증상 설명
- [ ] 원인 분석
- [ ] 수정 내용
- [ ] 테스트 결과

### 4. 크로스 브라우저 테스트
- [ ] Chrome 정상 동작
- [ ] Firefox 정상 동작
- [ ] Safari 정상 동작
- [ ] Edge 정상 동작

### 5. 모바일 테스트
- [ ] iOS Safari 정상
- [ ] Android Chrome 정상
- [ ] 반응형 레이아웃 정상

### 6. 회귀 테스트
- [ ] 기존 기능 영향 없음
- [ ] E2E 테스트 통과

## Test Commands
```bash
# E2E 테스트 실행
npx playwright test

# 접근성 테스트
npx axe-cli https://ssalworks.ai.kr

# Lighthouse 테스트
lighthouse https://ssalworks.ai.kr --output json
```

## Build Verification
- [ ] 빌드 성공
- [ ] 콘솔 에러 없음
- [ ] 린트 통과

## Integration Verification
- [ ] S5O1 프로덕션 배포 후 테스트
- [ ] Sentry 에러 로그 확인
- [ ] 사용자 피드백 확인

## Expected Files
- S5_운영/Frontend/BUG_FIX_REPORT.md
- 수정된 HTML/CSS/JS 파일들

## Pass Criteria
- P1/P2 버그 100% 수정
- 크로스 브라우저 호환
- 모바일 정상 동작
- 회귀 테스트 통과

---

## 저장 위치 검증 항목
- [ ] S5_운영/Frontend/ 폴더에 보고서 저장되었는가?
- [ ] Production/Frontend/ 폴더에 수정된 코드 저장되었는가?
