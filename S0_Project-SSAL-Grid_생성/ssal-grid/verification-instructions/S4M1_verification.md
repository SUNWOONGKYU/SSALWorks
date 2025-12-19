# Verification Instruction - S4M1

---

## 📌 필수 참조 규칙 파일 (2025-12-19)

> **⚠️ 검증 전 반드시 아래 규칙 파일을 확인하세요!**

| 규칙 파일 | 내용 | 참조 시점 |
|----------|------|----------|
| `.claude/rules/04_grid-writing.md` | Grid 속성 검증 | 결과 기록 시 |
| `.claude/rules/05_execution-process.md` | 검증 프로세스 | 검증 수행 순서 |
| `.claude/rules/06_verification.md` | 검증 기준 | **핵심 참조** |



## Task ID
S4M1

## Task Name
MVP 최종 검토

## Verification Checklist

### 1. 기능 완성도 검증
- [ ] 인증 시스템 동작 확인
- [ ] 구독 시스템 동작 확인
- [ ] AI 시스템 동작 확인
- [ ] 콘텐츠 시스템 동작 확인

### 2. 성능 기준 검증
- [ ] API 응답 < 500ms
- [ ] 페이지 로드 < 3초
- [ ] AI 응답 < 5초

### 3. 보안 점검 검증
- [ ] API 키 노출 없음
- [ ] SQL Injection 방지
- [ ] XSS 방지
- [ ] CORS 설정 확인

### 4. 검토 보고서 검증
- [ ] MVP_REVIEW_REPORT.md 존재
- [ ] 모든 섹션 작성
- [ ] 점검 결과 기록

### 5. 결제 연동 준비 검증
- [ ] 토스 페이먼트 계정 준비
- [ ] 테스트 환경 준비

## Test Commands
```bash
# 보고서 파일 확인
ls -la docs/MVP_REVIEW_REPORT.md

# API 응답 시간 테스트
time curl http://localhost:3000/api/health

# 보안 점검
grep -r "sk-" --include="*.js" --include="*.html"
```

## Expected Results
- 모든 기능 동작 확인
- 성능 기준 충족
- 보안 점검 통과

## Verification Agent
code-reviewer

## Pass Criteria
- 기능 체크리스트 100%
- 성능 기준 충족
- 보안 점검 통과
- 검토 보고서 완성

---

## ⚠️ 저장 위치 검증 항목

### 필수 검증
- [ ] Task ID의 Stage에 맞는 폴더에 저장되었는가? (S1→S1_개발_준비/, S2→S2_개발-1차/, ...)
- [ ] Task ID의 Area에 맞는 폴더에 저장되었는가? (S→Security/, F→Frontend/, ...)
- [ ] Production 관련 코드(F, BA, D)는 Production 폴더에도 저장되었는가?

