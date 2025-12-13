# Verification Instruction - S4F1

## Task ID
S4F1

## Task Name
결제 UI

## Verification Checklist

### 1. 파일 존재 검증
- [ ] pages/subscription/payment.html 존재
- [ ] payment.js 존재
- [ ] payment.css 존재

### 2. 결제 페이지 UI 검증
- [ ] 주문 정보 섹션
- [ ] 토스 결제 위젯 영역
- [ ] 약관 동의 영역
- [ ] 결제 버튼

### 3. 토스 SDK 연동 검증
- [ ] PaymentWidget 초기화
- [ ] 결제 위젯 렌더링
- [ ] 약관 위젯 렌더링

### 4. URL 파라미터 처리 검증
- [ ] plan 파라미터 처리
- [ ] amount 파라미터 처리
- [ ] UI에 정보 반영

### 5. 결제 요청 검증
- [ ] requestPayment 함수 호출
- [ ] successUrl 설정
- [ ] failUrl 설정

## Test Commands
```bash
# 파일 존재 확인
ls -la P3_프로토타입_제작/Frontend/Prototype/pages/subscription/payment.html

# 토스 SDK 로드 확인
grep "tosspayments" P3_프로토타입_제작/Frontend/Prototype/pages/subscription/payment.html
```

## Expected Results
- 결제 페이지 존재
- 토스 위젯 로드
- 결제 요청 가능

## Verification Agent
frontend-developer

## Pass Criteria
- 결제 UI 표시 정상
- 토스 위젯 렌더링
- 결제 버튼 동작
