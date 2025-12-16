# PG 이용약관 동의 구현 방법

## 질문
결제 기능에 약관 동의가 필요한가요?

## 답변

### 법적 필수 사항

**전자금융거래법**에 따라 결제 서비스 이용 전 다음 동의가 필수입니다:

1. **전자금융거래 이용약관** 동의
2. **개인정보 제3자 제공 동의** (카드사/PG사)

### 구현 체크리스트

```html
<!-- payment-method.html에 추가 필요 -->
<div class="terms-agreement">
    <label>
        <input type="checkbox" id="pgTerms" required>
        [필수] 전자금융거래 이용약관 동의
        <a href="#" onclick="showTerms('pg')">내용 보기</a>
    </label>

    <label>
        <input type="checkbox" id="privacyTerms" required>
        [필수] 개인정보 제3자 제공 동의
        <a href="#" onclick="showTerms('privacy')">내용 보기</a>
    </label>
</div>
```

### JavaScript 검증

```javascript
function validateTerms() {
    const pgTerms = document.getElementById('pgTerms').checked;
    const privacyTerms = document.getElementById('privacyTerms').checked;

    if (!pgTerms || !privacyTerms) {
        alert('필수 약관에 동의해주세요.');
        return false;
    }
    return true;
}
```

### 동의 이력 저장 (권장)

```javascript
// users 테이블에 저장
await supabase
    .from('users')
    .update({
        pg_terms_agreed_at: new Date().toISOString(),
        privacy_terms_agreed_at: new Date().toISOString()
    })
    .eq('id', userId);
```

### 현재 상태 (프로토타입)

⚠️ 프로토타입에서는 약관 동의 UI가 구현되지 않음
본개발 시 반드시 추가 필요

### 관련 파일
- `P3_프로토타입_제작/Frontend/Prototype/pages/subscription/payment-method.html`
