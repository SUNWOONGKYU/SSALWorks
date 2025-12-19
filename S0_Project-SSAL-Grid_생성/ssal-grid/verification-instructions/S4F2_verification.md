# Verification Instruction - S4F2

---

## 📌 필수 참조 규칙 파일 (2025-12-19)

> **⚠️ 검증 전 반드시 아래 규칙 파일을 확인하세요!**

| 규칙 파일 | 내용 | 참조 시점 |
|----------|------|----------|
| `.claude/rules/04_grid-writing.md` | Grid 속성 검증 | 결과 기록 시 |
| `.claude/rules/05_execution-process.md` | 검증 프로세스 | 검증 수행 순서 |
| `.claude/rules/06_verification.md` | 검증 기준 | **핵심 참조** |



## Task ID
S4F2

## Task Name
결제 완료 페이지

## Verification Checklist

### 1. 파일 존재 검증
- [ ] pages/subscription/payment-success.html 존재
- [ ] pages/subscription/payment-fail.html 존재
- [ ] payment-success.js 존재
- [ ] payment-result.css 존재

### 2. 성공 페이지 UI 검증
- [ ] 성공 아이콘 표시
- [ ] 결제 정보 표시 (주문번호, 금액, 결제수단)
- [ ] 구독 혜택 안내
- [ ] 다음 단계 버튼 (학습 시작, 구독 관리)

### 3. 실패 페이지 UI 검증
- [ ] 실패 아이콘 표시
- [ ] 에러 코드/메시지 표시
- [ ] 해결 방법 안내
- [ ] 재시도 버튼

### 4. URL 파라미터 처리 검증
- [ ] paymentKey 파라미터 처리
- [ ] orderId 파라미터 처리
- [ ] error 파라미터 처리 (실패 시)

### 5. API 연동 검증
- [ ] /api/payment/confirm 호출
- [ ] 결제 승인 결과 처리
- [ ] 실패 시 리다이렉트

## Test Commands
```bash
# 파일 존재 확인
ls -la P3_프로토타입_제작/Frontend/Prototype/pages/subscription/payment-*.html

# 성공 페이지 테스트
curl "http://localhost:3000/pages/subscription/payment-success.html?paymentKey=test&orderId=test&amount=9900"
```

## Expected Results
- 성공/실패 페이지 존재
- URL 파라미터 처리
- API 연동 동작

## Verification Agent
frontend-developer

## Pass Criteria
- 성공 페이지 표시 정상
- 실패 페이지 표시 정상
- 결제 정보 표시 정확

---

## ⚠️ 저장 위치 검증 항목

### 필수 검증
- [ ] Task ID의 Stage에 맞는 폴더에 저장되었는가? (S1→S1_개발_준비/, S2→S2_개발-1차/, ...)
- [ ] Task ID의 Area에 맞는 폴더에 저장되었는가? (S→Security/, F→Frontend/, ...)
- [ ] Production 관련 코드(F, BA, D)는 Production 폴더에도 저장되었는가?

