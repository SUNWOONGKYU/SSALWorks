# User Flow #4: AI 크레딧 충전 및 사용

> **최종 수정:** 2025-12-02
> **버전:** 1.0

---

## 1. 플로우 개요

**목적:** 사용자가 AI 크레딧을 충전하고 AI Q&A 서비스를 이용한다.

**전제 조건:** 회원가입 완료 (무료 회원도 가능)

**시작:** 크레딧 잔액 부족 또는 충전 버튼 클릭
**종료:** 크레딧 충전 완료 및 AI 서비스 이용
**주기:** 필요시

---

## 2. 핵심 기능 요약

### 🎯 주요 특징

1. **💰 유연한 충전 시스템**
   - 5가지 충전 옵션 (₩5,000 ~ ₩100,000)
   - 충전액에 따른 보너스 (최대 25%)
   - 다양한 결제 수단 지원

2. **⚡ 실시간 가격 시스템**
   - DB 기반 동적 가격 표시
   - API 원가 + 마진 20% 자동 계산
   - 가격 변경 시 즉시 반영 및 알림

3. **🔒 트랜잭션 기반 안전성**
   - FOR UPDATE 잠금으로 정확한 잔액 관리
   - 동시 요청 100개 이상 처리 가능
   - Race Condition 완벽 방지

4. **📊 실시간 UI 업데이트**
   - Supabase Realtime으로 즉시 반영
   - 잔액 변경 시 1초 이내 UI 갱신
   - 별도 새로고침 불필요

5. **🤖 자동 가격 관리**
   - 매일 00:00 API 비용 자동 집계
   - 최근 7일 평균 원가 기반 가격 계산
   - 가격 이력 관리 및 변경 추적

### 🔄 자동화 프로세스

```
매일 00:00 자동 실행:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. API 사용 로그 집계
   ↓
2. 일일 평균 비용 계산
   ↓
3. 최근 7일 평균 원가 조회
   ↓
4. 마진 20% 적용
   ↓
5. 10원 단위 절상
   ↓
6. ai_pricing 테이블 업데이트
   ↓
7. 가격 변경 10% 이상 시 알림
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 3. AI 크레딧 체계

### AI 서비스

| AI 서비스 | 특징 |
|-----------|------|
| ChatGPT (GPT-4) | 코드 작성, 기술 문서 생성 |
| Gemini 2.5 Pro | 코드 리뷰, 아키텍처 설계 |
| Perplexity | 최신 기술 정보, 실시간 검색 |

**가격 정책:**
- 가격은 수시로 변동될 수 있습니다
- 실제 가격은 서비스 이용 시 실시간으로 표시됩니다
- API 원가 + 마진 20% 적용
- 10원 단위 절상
- 가격은 DB에서 자동 관리 (실제 API 사용 비용 기반)

### 충전 금액 옵션

| 충전 금액 | 보너스 | 실제 크레딧 | 할인율 |
|-----------|--------|-------------|--------|
| ₩5,000 | - | ₩5,000 | 0% |
| ₩10,000 | ₩1,000 | ₩11,000 | 10% |
| ₩30,000 | ₩5,000 | ₩35,000 | 16.7% |
| ₩50,000 | ₩10,000 | ₩60,000 | 20% |
| ₩100,000 | ₩25,000 | ₩125,000 | 25% |

### 특별 혜택

**설치비 납부 시 지급:**
- ✅ AI 크레딧 ₩5,000 무료 지급

---

## 4. 정상 플로우 (Normal Flow)

### Step 1: 크레딧 잔액 확인

**위치:** 우측 상단 또는 AI Q&A 페이지

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💰 AI 크레딧

잔액: ₩2,500

사용 가능:
- ChatGPT: 25회
- Gemini: 31회
- Perplexity: 50회

[충전하기] [사용 내역]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### Step 2: 크레딧 충전 페이지 진입

**경로 1:** 크레딧 잔액 위젯에서 [충전하기] 클릭
**경로 2:** AI 사용 시 잔액 부족 알림

**잔액 부족 시 자동 팝업:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️ 크레딧 잔액 부족

현재 잔액: ₩50
ChatGPT 사용: ₩100 필요

크레딧을 충전하시겠습니까?

[충전하기] [취소]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### Step 3: 충전 금액 선택

**페이지:** `/credit/purchase`

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💳 AI 크레딧 충전

현재 잔액: ₩2,500

충전 금액을 선택하세요:

○ ₩5,000
  → 크레딧 ₩5,000 지급

○ ₩10,000 (인기) 🔥
  → 크레딧 ₩11,000 지급 (+10% 보너스)

○ ₩30,000 (추천) ⭐
  → 크레딧 ₩35,000 지급 (+16.7% 보너스)

○ ₩50,000
  → 크레딧 ₩60,000 지급 (+20% 보너스)

○ ₩100,000 (최고 혜택) 💎
  → 크레딧 ₩125,000 지급 (+25% 보너스)

○ 직접 입력 (최소 ₩1,000)
  ┌──────────────────────────────┐
  │ ₩                            │
  └──────────────────────────────┘

[다음]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### Step 4: 결제 수단 선택

**페이지:** `/credit/payment`

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💳 결제 수단 선택

충전 금액: ₩10,000
지급 크레딧: ₩11,000 (+10% 보너스)

결제 수단:

○ 신용/체크카드
  - 즉시 충전
  - 카드번호, 유효기간, CVC 입력

○ 계좌이체
  - 즉시 충전
  - 은행 선택, 계좌번호 입력

○ 무통장 입금
  - 입금 확인 후 충전 (영업일 기준 24시간 이내)
  - 입금 계좌: 하나은행 287-910921-40507 (선웅규)
  - 입금자명: 김써니 (실명)

[결제하기]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### Step 5: 결제 진행

**API:** `POST /api/credit/purchase`

**Request:**
```json
{
  "user_id": "A3B5C7D9",
  "amount": 10000,
  "payment_method": "card",
  "card_info": {
    "card_number": "****-****-****-1234",
    "expiry": "12/28",
    "cvc": "***",
    "owner_name": "김써니"
  }
}
```

**PG사 결제 API 호출:**
- 결제 승인 요청
- 결제 결과 수신

---

### Step 6: 충전 완료

**결제 성공 시:**

**DB 업데이트:**
```sql
-- 크레딧 잔액 업데이트
UPDATE users SET
  credit_balance = credit_balance + 11000
WHERE user_id = 'A3B5C7D9';

-- 충전 내역 기록
INSERT INTO credit_history (
  id, user_id, transaction_type, amount, bonus_amount,
  payment_amount, payment_method, status, created_at
) VALUES (
  'uuid', 'A3B5C7D9', 'purchase', 11000, 1000,
  10000, 'card_****1234', 'completed', NOW()
);
```

**성공 팝업:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ 충전 완료!

결제 금액: ₩10,000
보너스: +₩1,000
충전 크레딧: ₩11,000

현재 잔액: ₩13,500

이제 AI 서비스를 이용하실 수 있습니다!

[AI Q&A 바로가기] [확인]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**플랫폼 알림:**
```
💰 AI 크레딧이 충전되었습니다
충전 금액: ₩11,000
현재 잔액: ₩13,500
```

---

### Step 7: AI 서비스 사용

**페이지:** `/ai/qa`

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 AI Q&A

현재 크레딧: ₩13,500

AI 선택:

○ ChatGPT (GPT-4)
  질문당 실시간 가격 표시
  코드 작성, 기술 문서 생성

○ Gemini 2.5 Pro
  질문당 실시간 가격 표시
  코드 리뷰, 아키텍처 설계

○ Perplexity
  질문당 실시간 가격 표시
  최신 기술 정보, 실시간 검색

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

질문을 입력하세요:

┌──────────────────────────────┐
│                              │
│                              │
│                              │
└──────────────────────────────┘

예상 비용: ₩[실시간 조회] (AI 선택 시)
사용 후 잔액: ₩[자동 계산]

[질문하기]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**실시간 가격 조회 API:** `GET /api/ai/pricing`

**Response:**
```json
{
  "chatgpt": {
    "price_per_query": 100,
    "last_updated": "2025-12-02T00:00:00Z"
  },
  "gemini": {
    "price_per_query": 80,
    "last_updated": "2025-12-02T00:00:00Z"
  },
  "perplexity": {
    "price_per_query": 50,
    "last_updated": "2025-12-02T00:00:00Z"
  }
}
```

---

### Step 8: AI 응답 및 실시간 크레딧 차감

**API:** `POST /api/ai/query`

**Request:**
```json
{
  "user_id": "A3B5C7D9",
  "ai_service": "chatgpt",
  "query": "React에서 useState와 useEffect의 차이점은?"
}
```

**서버 처리 (트랜잭션 기반):**

1. **실시간 가격 조회 및 잔액 확인 (원자적 처리)**
```javascript
// Transaction 시작
const transaction = await db.transaction();

try {
  // 1. 사용자 잔액 조회 (FOR UPDATE - 행 잠금)
  const user = await db.query(`
    SELECT credit_balance
    FROM users
    WHERE user_id = $1
    FOR UPDATE
  `, ['A3B5C7D9']);

  // 2. 실시간 가격 조회 (DB에서)
  const pricing = await db.query(`
    SELECT price_per_query
    FROM ai_pricing
    WHERE ai_service = $1
  `, ['chatgpt']);

  const balance = user.credit_balance; // ₩13,500
  const cost = pricing.price_per_query; // ₩100 (실시간 가격)

  // 3. 잔액 확인
  if (balance < cost) {
    await transaction.rollback();
    throw new Error('잔액 부족');
  }

  // 4. AI API 호출
  const aiResponse = await callChatGPT(query);

  // 5. 크레딧 차감 (동일 트랜잭션 내)
  await db.query(`
    UPDATE users
    SET credit_balance = credit_balance - $1,
        last_updated = NOW()
    WHERE user_id = $2
  `, [cost, 'A3B5C7D9']);

  // 6. 사용 내역 기록
  await db.query(`
    INSERT INTO credit_history (
      id, user_id, transaction_type, amount, ai_service,
      query, ai_response, status, created_at
    ) VALUES (
      $1, $2, 'usage', $3, $4, $5, $6, 'completed', NOW()
    )
  `, [uuid(), 'A3B5C7D9', -cost, 'chatgpt', query, aiResponse]);

  // 7. API 사용 로그 기록 (가격 계산용)
  await db.query(`
    INSERT INTO api_usage_log (
      id, user_id, ai_service, cost_krw, tokens_used, created_at
    ) VALUES (
      $1, $2, $3, $4, $5, NOW()
    )
  `, [uuid(), 'A3B5C7D9', 'chatgpt', cost, aiResponse.tokens]);

  // Transaction 커밋
  await transaction.commit();

  // 8. 새 잔액 조회
  const newBalance = balance - cost;

  return {
    success: true,
    response: aiResponse,
    cost: cost,
    new_balance: newBalance
  };

} catch (error) {
  await transaction.rollback();
  throw error;
}
```

**동시 요청 처리 (Race Condition 방지):**

```
사용자가 동시에 3개 요청 전송:
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│ 요청 1      │  │ 요청 2      │  │ 요청 3      │
│ (ChatGPT)   │  │ (Gemini)    │  │ (Perplexity)│
└─────────────┘  └─────────────┘  └─────────────┘
       ↓                ↓                ↓
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       FOR UPDATE 행 잠금으로 순차 처리
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       ↓
   요청 1 처리 (₩13,500 → ₩13,400)
       ↓
   요청 2 처리 (₩13,400 → ₩13,320)
       ↓
   요청 3 처리 (₩13,320 → ₩13,270)

✅ 결과: 모든 차감이 정확하게 처리됨
❌ 잠금 없이: 3개 모두 ₩13,500에서 차감 → 잔액 오류 발생
```

**API Response:**
```json
{
  "success": true,
  "ai_service": "chatgpt",
  "response": "useState와 useEffect는 React Hooks의 핵심입니다...",
  "cost": 100,
  "new_balance": 13400,
  "timestamp": "2025-12-02T14:30:00Z"
}
```

**UI 실시간 업데이트 (Supabase Realtime):**
```javascript
// 프론트엔드: Supabase Realtime 구독
const subscription = supabase
  .channel('credit-balance')
  .on('postgres_changes', {
    event: 'UPDATE',
    schema: 'public',
    table: 'users',
    filter: `user_id=eq.A3B5C7D9`
  }, (payload) => {
    // 잔액 변경 시 즉시 UI 업데이트
    const newBalance = payload.new.credit_balance;
    updateBalanceUI(newBalance); // ₩13,400
  })
  .subscribe();
```

**응답 표시:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 ChatGPT 응답

질문: React에서 useState와 useEffect의 차이점은?

답변:
useState와 useEffect는 React Hooks의 핵심입니다...
[상세 답변 표시]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

사용 크레딧: ₩100
남은 잔액: ₩13,400 ⚡ (실시간 업데이트)

[새 질문하기] [복사] [저장]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### Step 9: 사용 내역 조회

**페이지:** `/credit/history`

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💰 크레딧 사용 내역

현재 잔액: ₩13,400

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

최근 내역:

2025-12-02 14:30
🤖 ChatGPT 사용  -₩100
질문: "React에서 useState와..."
잔액: ₩13,400

2025-12-02 10:00
💳 크레딧 충전  +₩11,000
결제: ₩10,000 (보너스 +₩1,000)
잔액: ₩13,500

2025-12-01 15:20
🤖 Gemini 사용  -₩80
질문: "Python 비동기 처리..."
잔액: ₩2,500

2025-12-01 09:00
🎁 설치비 혜택  +₩5,000
잔액: ₩2,580

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[더보기] [내보내기 (CSV)]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### Step 10: 자동 가격 관리 시스템

**목적:** API 원가 변동에 맞춰 사용자 요금을 자동으로 조정

**실행 주기:** 매일 00:00 (자동)

---

#### 10-1. 일일 API 비용 집계

**서버 크론잡:** 매일 00:00 실행

```javascript
// cron job: 매일 00:00
async function calculateDailyAPICosts() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  // 1. 전날 각 AI 서비스별 사용 로그 집계
  const usageLogs = await db.query(`
    SELECT
      ai_service,
      COUNT(*) as total_queries,
      SUM(cost_krw) as total_cost_krw,
      SUM(tokens_used) as total_tokens
    FROM api_usage_log
    WHERE DATE(created_at) = $1
    GROUP BY ai_service
  `, [yesterday]);

  // 2. 평균 비용 계산
  for (const log of usageLogs) {
    const avgCostPerQuery = log.total_cost_krw / log.total_queries;

    // 3. api_cost_daily 테이블에 기록
    await db.query(`
      INSERT INTO api_cost_daily (
        id, ai_service, date, total_queries, avg_cost_per_query,
        total_cost_krw, total_tokens, created_at
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, NOW()
      )
    `, [
      uuid(),
      log.ai_service,
      yesterday,
      log.total_queries,
      avgCostPerQuery,
      log.total_cost_krw,
      log.total_tokens
    ]);
  }
}
```

---

#### 10-2. 사용자 요금 자동 계산

**실행:** 일일 비용 집계 직후

```javascript
async function updateUserPricing() {
  // 1. 최근 7일 평균 비용 조회
  const aiServices = ['chatgpt', 'gemini', 'perplexity'];

  for (const service of aiServices) {
    // 최근 7일 평균 API 원가
    const avgCost = await db.query(`
      SELECT AVG(avg_cost_per_query) as avg_cost
      FROM api_cost_daily
      WHERE ai_service = $1
        AND date >= NOW() - INTERVAL '7 days'
    `, [service]);

    const apiCost = avgCost.avg_cost; // 예: ₩83.33

    // 2. 마진 20% 적용
    const costWithMargin = apiCost * 1.20; // ₩83.33 * 1.20 = ₩100

    // 3. 10원 단위 절상
    const finalPrice = Math.ceil(costWithMargin / 10) * 10; // ₩100

    // 4. ai_pricing 테이블 업데이트
    await db.query(`
      INSERT INTO ai_pricing (
        id, ai_service, price_per_query, api_cost,
        margin_rate, last_updated
      ) VALUES (
        $1, $2, $3, $4, $5, NOW()
      )
      ON CONFLICT (ai_service)
      DO UPDATE SET
        price_per_query = $3,
        api_cost = $4,
        last_updated = NOW()
    `, [uuid(), service, finalPrice, apiCost, 0.20]);

    console.log(`${service} 가격 업데이트: ₩${finalPrice}`);
  }
}
```

---

#### 10-3. 가격 변경 알림

**조건:** 가격이 ±10% 이상 변경되었을 때

```javascript
async function notifyPriceChanges() {
  // 1. 이전 가격과 비교
  const priceChanges = await db.query(`
    SELECT
      current.ai_service,
      current.price_per_query as new_price,
      previous.price_per_query as old_price,
      ((current.price_per_query - previous.price_per_query) / previous.price_per_query * 100) as change_percent
    FROM ai_pricing current
    LEFT JOIN ai_pricing_history previous
      ON current.ai_service = previous.ai_service
      AND previous.is_latest = true
    WHERE ABS((current.price_per_query - previous.price_per_query) / previous.price_per_query * 100) >= 10
  `);

  // 2. 가격 변경 공지
  for (const change of priceChanges) {
    // 모든 활성 사용자에게 알림
    await notifyAllUsers({
      type: 'price_change',
      ai_service: change.ai_service,
      old_price: change.old_price,
      new_price: change.new_price,
      change_percent: change.change_percent
    });
  }
}
```

**사용자 알림:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💰 AI 서비스 가격 변경 안내

ChatGPT 가격이 변경되었습니다:
- 이전 가격: ₩100
- 새 가격: ₩110 (+10%)

변경 사유: API 원가 상승
적용일: 2025-12-03

[자세히 보기]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

#### 10-4. DB 스키마

**api_usage_log 테이블:**
```sql
CREATE TABLE api_usage_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id VARCHAR(8) NOT NULL REFERENCES users(user_id),
  ai_service VARCHAR(50) NOT NULL,
  cost_krw INTEGER NOT NULL,
  tokens_used INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_usage_log_date ON api_usage_log(DATE(created_at));
CREATE INDEX idx_usage_log_service ON api_usage_log(ai_service);
```

**api_cost_daily 테이블:**
```sql
CREATE TABLE api_cost_daily (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ai_service VARCHAR(50) NOT NULL,
  date DATE NOT NULL,
  total_queries INTEGER NOT NULL,
  avg_cost_per_query NUMERIC(10,2) NOT NULL,
  total_cost_krw INTEGER NOT NULL,
  total_tokens BIGINT,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(ai_service, date)
);
```

**ai_pricing 테이블:**
```sql
CREATE TABLE ai_pricing (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ai_service VARCHAR(50) UNIQUE NOT NULL,
  price_per_query INTEGER NOT NULL,
  api_cost NUMERIC(10,2) NOT NULL,
  margin_rate NUMERIC(4,2) DEFAULT 0.20,
  last_updated TIMESTAMP DEFAULT NOW()
);

-- 초기 데이터
INSERT INTO ai_pricing (ai_service, price_per_query, api_cost, margin_rate) VALUES
('chatgpt', 100, 83.33, 0.20),
('gemini', 80, 66.67, 0.20),
('perplexity', 50, 41.67, 0.20);
```

**ai_pricing_history 테이블:**
```sql
CREATE TABLE ai_pricing_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ai_service VARCHAR(50) NOT NULL,
  price_per_query INTEGER NOT NULL,
  api_cost NUMERIC(10,2) NOT NULL,
  margin_rate NUMERIC(4,2),
  is_latest BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 5. 예외 플로우 (Exception Flows)

### 5-1. 결제 실패

**원인:**
- 카드 한도 초과
- 잔액 부족
- 카드 정지/만료
- 네트워크 오류

**시스템 응답:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
❌ 결제 실패

실패 사유: 카드 한도 초과

다른 결제 수단을 사용하시거나
카드사에 문의해주세요.

[다시 시도] [다른 결제 수단] [취소]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### 5-2. 무통장 입금

**Step 1: 입금 정보 안내**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💳 무통장 입금 안내

충전 금액: ₩10,000
지급 크레딧: ₩11,000

입금 정보:
- 은행: 하나은행
- 계좌번호: 287-910921-40507
- 예금주: 선웅규
- 입금액: ₩10,000

⚠️ 입금자명: 김써니 (실명과 일치해야 함)

입금 후 아래 버튼을 클릭해주세요.

[입금 완료]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Step 2: 입금 완료 클릭**

**API:** `POST /api/credit/deposit-confirm`

```json
{
  "user_id": "A3B5C7D9",
  "amount": 10000,
  "depositor_name": "김써니"
}
```

**응답:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
입금 확인 요청 접수

입금 확인 후 크레딧이 자동 충전됩니다.

평균 확인 시간: 24시간 이내 (영업일 기준)

확인 완료 시 알림을 보내드립니다.

[확인]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Step 3: 관리자 입금 확인**

- 계좌 입금 내역 확인
- 입금자명 일치 확인
- 금액 확인
- 승인 처리 → 크레딧 자동 충전

---

### 5-3. 크레딧 부족

**AI 사용 시도 시:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️ 크레딧 부족

현재 잔액: ₩50
필요 크레딧: ₩100 (ChatGPT)

크레딧을 충전하시겠습니까?

추천 충전 금액:
₩10,000 → ₩11,000 크레딧 (+10% 보너스)

[충전하기] [취소]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### 5-4. 환불 요청

**조건:**
- 크레딧 미사용
- 충전 후 7일 이내

**페이지:** `/credit/refund`

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💰 크레딧 환불

환불 가능 조건:
- ✅ 크레딧 미사용
- ✅ 충전 후 7일 이내

현재 잔액: ₩11,000
사용 내역: 0건 (미사용)

환불 금액: ₩10,000 (결제 금액)
보너스 크레딧: -₩1,000 (차감)

환불 사유: [필수]
┌──────────────────────────────┐
│                              │
└──────────────────────────────┘

[환불 신청] [취소]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**DB 처리:**
```sql
UPDATE users SET
  credit_balance = credit_balance - 11000
WHERE user_id = 'A3B5C7D9';

INSERT INTO credit_history (
  user_id, transaction_type, amount, refund_amount,
  status, created_at
) VALUES (
  'A3B5C7D9', 'refund', -11000, 10000,
  'completed', NOW()
);
```

---

## 6. 데이터 플로우

### 6-1. credit_history 테이블

**목적:** 모든 크레딧 거래 내역 기록

```sql
CREATE TABLE credit_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id VARCHAR(8) NOT NULL REFERENCES users(user_id),
  transaction_type VARCHAR(20) NOT NULL,
  amount INTEGER NOT NULL,
  bonus_amount INTEGER DEFAULT 0,
  payment_amount INTEGER,
  payment_method VARCHAR(50),
  ai_service VARCHAR(50),
  query TEXT,
  ai_response TEXT,
  status VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_credit_history_user ON credit_history(user_id);
CREATE INDEX idx_credit_history_date ON credit_history(created_at DESC);
```

**예시 데이터:**

**충전 내역:**
```json
{
  "id": "uuid-001",
  "user_id": "A3B5C7D9",
  "transaction_type": "purchase",
  "amount": 11000,
  "bonus_amount": 1000,
  "payment_amount": 10000,
  "payment_method": "card_****1234",
  "ai_service": null,
  "query": null,
  "ai_response": null,
  "status": "completed",
  "created_at": "2025-12-02T10:00:00Z"
}
```

**AI 사용 내역:**
```json
{
  "id": "uuid-002",
  "user_id": "A3B5C7D9",
  "transaction_type": "usage",
  "amount": -100,
  "bonus_amount": 0,
  "payment_amount": null,
  "payment_method": null,
  "ai_service": "chatgpt",
  "query": "React에서 useState와 useEffect의 차이점은?",
  "ai_response": "useState와 useEffect는...",
  "status": "completed",
  "created_at": "2025-12-02T14:30:00Z"
}
```

**transaction_type 종류:**
- `purchase`: 크레딧 충전
- `usage`: AI 사용
- `bonus`: 보너스 지급
- `refund`: 환불

---

### 6-2. users 테이블 (크레딧 잔액 관리)

```sql
CREATE TABLE users (
  user_id VARCHAR(8) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  credit_balance INTEGER DEFAULT 0,
  installation_fee_paid BOOLEAN DEFAULT false,
  subscription_status VARCHAR(20) DEFAULT 'inactive',
  last_updated TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
```

---

### 6-3. 가격 관리 테이블

**위치:** Step 10-4 참조

- `api_usage_log`: 모든 API 사용 로그
- `api_cost_daily`: 일일 비용 집계
- `ai_pricing`: 현재 사용자 요금
- `ai_pricing_history`: 가격 변경 이력

> **⚠️ 구현 시점:** S1. 프로토타입 제작 단계에서 실제 DB 테이블 생성
> **참조:** `P3_프로토타입_제작/Database/` 폴더

---

## 7. 성공 기준

### 7-1. 기능적 성공
- ✅ 크레딧 충전 가능
- ✅ 보너스 자동 적용
- ✅ AI 서비스 사용 가능
- ✅ 크레딧 자동 차감
- ✅ 사용 내역 조회 가능
- ✅ **실시간 가격 조회 및 표시**
- ✅ **실시간 잔액 업데이트 (Supabase Realtime)**
- ✅ **동시 요청 시 정확한 잔액 차감 (트랜잭션 기반)**
- ✅ **자동 가격 계산 시스템 작동**

### 7-2. UX 성공
- ✅ 충전 프로세스 간단 (3단계 이내)
- ✅ 잔액 부족 시 즉시 알림
- ✅ 보너스 혜택 명확히 표시
- ✅ **잔액 변경 시 UI 즉시 업데이트 (1초 이내)**
- ✅ **현재 AI 가격 투명하게 표시**
- ✅ **가격 변경 시 사전 알림 제공**

### 7-3. 비즈니스 성공
- ✅ 평균 충전 금액 ₩10,000 이상
- ✅ 보너스로 인한 재충전율 증가
- ✅ AI 서비스 이용률 향상
- ✅ **마진율 20% 유지**
- ✅ **API 원가 변동 대응 자동화**
- ✅ **가격 투명성으로 사용자 신뢰 확보**

### 7-4. 기술적 성공
- ✅ **트랜잭션 처리로 잔액 정확도 100%**
- ✅ **동시 요청 100개 이상 처리 가능**
- ✅ **Realtime 업데이트 지연 시간 1초 이내**
- ✅ **일일 자동 가격 계산 정상 작동 (99.9% 가동률)**
- ✅ **DB 쿼리 성능 최적화 (인덱스 활용)**

---

**문서 작성:** Claude Code
**승인:** 2025-12-02
