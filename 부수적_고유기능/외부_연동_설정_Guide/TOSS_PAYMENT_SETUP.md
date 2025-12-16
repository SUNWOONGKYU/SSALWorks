# 토스 페이먼트 결제 설정 가이드

## ⚠️ 준비 중

이 가이드는 현재 작성 중입니다.

---

## 개요

토스 페이먼트 연동을 위한 설정 가이드입니다.

## 사전 준비

1. **가맹점 등록**
   - 토스 페이먼트 가맹점 신청: https://developers.tosspayments.com/
   - 심사 기간: 약 1-2주 소요

2. **API 키 발급**
   - 테스트 API 키
   - 프로덕션 API 키

## 설정 단계

### 1단계: 가맹점 등록

(추후 작성 예정)

### 2단계: 빌링키 발급 설정

(추후 작성 예정)

### 3단계: 웹훅 설정

(추후 작성 예정)

### 4단계: 환경변수 설정

```env
# 토스 페이먼트 (테스트)
TOSS_CLIENT_KEY=test_ck_xxx
TOSS_SECRET_KEY=test_sk_xxx

# 토스 페이먼트 (프로덕션)
# TOSS_CLIENT_KEY=live_ck_xxx
# TOSS_SECRET_KEY=live_sk_xxx
```

## 참고 문서

- [토스 페이먼트 개발자 문서](https://docs.tosspayments.com/)
- [빌링키 발급 가이드](https://docs.tosspayments.com/guides/billing)
- [결제 웹훅 가이드](https://docs.tosspayments.com/guides/webhook)

---

> 📝 이 문서는 본개발 단계에서 상세하게 작성될 예정입니다.
