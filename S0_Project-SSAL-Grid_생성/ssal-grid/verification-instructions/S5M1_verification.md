# Verification Instruction - S5M1

---

## 📌 필수 참조 규칙 파일 (2025-12-19)

> **⚠️ 검증 전 반드시 아래 규칙 파일을 확인하세요!**

| 규칙 파일 | 내용 | 참조 시점 |
|----------|------|----------|
| `.claude/rules/04_grid-writing.md` | Grid 속성 검증 | 결과 기록 시 |
| `.claude/rules/05_execution-process.md` | 검증 프로세스 | 검증 수행 순서 |
| `.claude/rules/06_verification.md` | 검증 기준 | **핵심 참조** |



## Task ID
S5M1

## Task Name
출시 체크리스트

## Verification Checklist

### 1. 체크리스트 문서 검증
- [ ] LAUNCH_CHECKLIST.md 존재
- [ ] 모든 섹션 작성

### 2. 기능 완성도 검증
- [ ] 인증 시스템 100%
- [ ] 구독 시스템 100%
- [ ] 결제 시스템 100%
- [ ] AI 시스템 100%
- [ ] 콘텐츠 시스템 100%

### 3. 성능 검증
- [ ] 페이지 로드 < 3초
- [ ] API 응답 < 500ms
- [ ] Lighthouse 점수 > 80

### 4. 보안 검증
- [ ] HTTPS 강제
- [ ] API 키 노출 없음
- [ ] 취약점 점검 완료

### 5. 법적 요구사항 검증
- [ ] 이용약관 페이지
- [ ] 개인정보처리방침 페이지
- [ ] 사업자 정보 표시

## Test Commands
```bash
# 체크리스트 파일 확인
ls -la docs/LAUNCH_CHECKLIST.md

# Lighthouse 실행
lighthouse https://preview-url --output json

# 보안 점검
grep -r "sk-" --include="*.js" --include="*.html"
```

## Expected Results
- 출시 체크리스트 완성
- 모든 항목 통과
- 출시 준비 완료

## Verification Agent
code-reviewer

## Pass Criteria
- 기능 체크리스트 100%
- 성능 기준 충족
- 보안/법적 요구사항 충족

---

## ⚠️ 저장 위치 검증 항목

### 필수 검증
- [ ] Task ID의 Stage에 맞는 폴더에 저장되었는가? (S1→S1_개발_준비/, S2→S2_개발-1차/, ...)
- [ ] Task ID의 Area에 맞는 폴더에 저장되었는가? (S→Security/, F→Frontend/, ...)
- [ ] Production 관련 코드(F, BA, D)는 Production 폴더에도 저장되었는가?

