# Task Instruction - S3F1

---

## 필수 참조 규칙 파일 (2025-12-19)

> **작업 전 반드시 아래 규칙 파일을 확인하세요!**

| 규칙 파일 | 내용 | 참조 시점 |
|----------|------|----------|
| `.claude/rules/01_file-naming.md` | 파일 명명 규칙 | 파일 생성 시 |
| `.claude/rules/02_save-location.md` | 저장 위치 규칙 | 파일 저장 시 |
| `.claude/rules/03_area-stage.md` | Area/Stage 매핑 | 폴더 선택 시 |
| `.claude/rules/05_execution-process.md` | 6단계 실행 프로세스 | 작업 전체 |

## 필수 참조 리포트

| 리포트 | 용도 |
|--------|------|
| `Human_ClaudeCode_Bridge/Reports/SSALWorks_요금체계_정리.json` | 크레딧 충전 옵션 및 정책 참조 |

---

## Task ID
S3F1

## Task Name
AI Q&A 인터페이스 + 크레딧 부족 모달

## Task Goal
Gemini/ChatGPT/Claude/Perplexity AI 선택, 질문 입력, 답변 표시, 크레딧 차감 인터페이스 구현
**+ 크레딧 부족 시 충전 안내 모달 (토스 페이먼트 연동)**

## Prerequisites (Dependencies)
- S3BA1 (AI Q&A API) 완료
- S4BA3 (토스 페이먼트 결제 API) 완료

---

## 크레딧 시스템 개요

### 크레딧 충전 옵션 (S4BA3 참조)
| 충전 금액 | 결제 방법 |
|----------|----------|
| ₩10,000 | 토스 페이먼트 |
| ₩20,000 | 토스 페이먼트 |
| ₩30,000 | 토스 페이먼트 |
| ₩50,000 | 토스 페이먼트 |

### 크레딧 소진 시 대안
- **옵션 1**: 크레딧 충전 (토스 페이먼트)
- **옵션 2**: "써니에게 묻기" 사용 (크레딧 소모 없음)

---

## Specific Instructions

### 1. AI Q&A 페이지 구현
- 위치: `P3_프로토타입_제작/Frontend/Prototype/pages/ai/qa.html`

```html
<!-- pages/ai/qa.html -->
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Q&A - SSALWorks</title>
    <link rel="stylesheet" href="../../shared.css">
    <link rel="stylesheet" href="../../ai-qa.css">
</head>
<body>
    <nav class="top-nav">
        <!-- 기존 네비게이션 -->
    </nav>

    <main class="qa-container">
        <!-- AI 선택 영역 -->
        <div class="ai-selector">
            <h2>AI 모델 선택</h2>
            <div class="ai-options">
                <button class="ai-option selected" data-ai="gemini">
                    <span class="ai-icon">🌟</span>
                    <span class="ai-name">Gemini</span>
                    <span class="ai-price" id="gemini-price">-</span>
                </button>
                <button class="ai-option" data-ai="chatgpt">
                    <span class="ai-icon">🤖</span>
                    <span class="ai-name">ChatGPT</span>
                    <span class="ai-price" id="chatgpt-price">-</span>
                </button>
                <button class="ai-option" data-ai="claude">
                    <span class="ai-icon">🧠</span>
                    <span class="ai-name">Claude</span>
                    <span class="ai-price" id="claude-price">-</span>
                </button>
                <button class="ai-option" data-ai="perplexity">
                    <span class="ai-icon">🔍</span>
                    <span class="ai-name">Perplexity</span>
                    <span class="ai-price" id="perplexity-price">-</span>
                </button>
            </div>
        </div>

        <!-- 크레딧 정보 -->
        <div class="credit-info">
            <span>보유 크레딧:</span>
            <span id="user-credit" class="credit-balance">₩0</span>
            <button class="btn-charge" onclick="openCreditModal()">충전하기</button>
        </div>

        <!-- 대화 영역 -->
        <div class="chat-area" id="chat-area">
            <!-- 대화 메시지들 -->
        </div>

        <!-- 입력 영역 -->
        <div class="input-area">
            <textarea
                id="question-input"
                placeholder="AI에게 질문하세요..."
                rows="3"
            ></textarea>
            <button id="send-button" class="btn-send">
                <span>전송</span>
                <span class="send-icon">➤</span>
            </button>
        </div>
    </main>

    <!-- 크레딧 부족 모달 -->
    <div class="modal" id="credit-insufficient-modal" style="display:none;">
        <div class="modal-content">
            <div class="modal-header">
                <span class="modal-icon">💳</span>
                <h2>크레딧이 부족합니다</h2>
            </div>

            <div class="credit-status">
                <div class="credit-row">
                    <span class="label">현재 잔액</span>
                    <span class="value insufficient" id="modal-current-credit">₩0</span>
                </div>
                <div class="credit-row">
                    <span class="label">필요 크레딧</span>
                    <span class="value" id="modal-required-credit">약 ₩50</span>
                </div>
            </div>

            <div class="charge-options">
                <h3>크레딧 충전</h3>
                <p class="charge-desc">토스 페이먼트로 간편하게 충전하세요</p>
                <div class="charge-buttons">
                    <button class="charge-option" onclick="chargeCredit(10000)">
                        <span class="amount">₩10,000</span>
                    </button>
                    <button class="charge-option" onclick="chargeCredit(20000)">
                        <span class="amount">₩20,000</span>
                    </button>
                    <button class="charge-option recommended" onclick="chargeCredit(30000)">
                        <span class="badge">추천</span>
                        <span class="amount">₩30,000</span>
                    </button>
                    <button class="charge-option" onclick="chargeCredit(50000)">
                        <span class="amount">₩50,000</span>
                    </button>
                </div>
            </div>

            <div class="alternative-section">
                <div class="divider">
                    <span>또는</span>
                </div>
                <div class="sunny-option">
                    <span class="sunny-icon">☀️</span>
                    <div class="sunny-info">
                        <h4>써니에게 묻기</h4>
                        <p>크레딧 없이 기본 질문에 답변받으세요</p>
                    </div>
                    <button class="btn-sunny" onclick="goToSunny()">이용하기</button>
                </div>
            </div>

            <div class="modal-actions">
                <button class="btn-secondary" onclick="closeCreditModal()">닫기</button>
            </div>
        </div>
    </div>

    <!-- 크레딧 충전 모달 (정상 상태) -->
    <div class="modal" id="credit-charge-modal" style="display:none;">
        <div class="modal-content">
            <div class="modal-header">
                <span class="modal-icon">🎫</span>
                <h2>크레딧 충전</h2>
            </div>

            <div class="credit-status">
                <div class="credit-row">
                    <span class="label">현재 잔액</span>
                    <span class="value" id="charge-modal-credit">₩0</span>
                </div>
            </div>

            <div class="charge-options">
                <p class="charge-desc">충전할 금액을 선택하세요</p>
                <div class="charge-buttons">
                    <button class="charge-option" onclick="chargeCredit(10000)">
                        <span class="amount">₩10,000</span>
                    </button>
                    <button class="charge-option" onclick="chargeCredit(20000)">
                        <span class="amount">₩20,000</span>
                    </button>
                    <button class="charge-option recommended" onclick="chargeCredit(30000)">
                        <span class="badge">추천</span>
                        <span class="amount">₩30,000</span>
                    </button>
                    <button class="charge-option" onclick="chargeCredit(50000)">
                        <span class="amount">₩50,000</span>
                    </button>
                </div>
            </div>

            <div class="modal-actions">
                <button class="btn-secondary" onclick="closeChargeModal()">취소</button>
            </div>
        </div>
    </div>

    <script type="module" src="../../ai-qa.js"></script>
</body>
</html>
```

---

### 2. AI Q&A JavaScript (크레딧 모달 포함)
- 위치: `P3_프로토타입_제작/Frontend/Prototype/ai-qa.js`

```javascript
// ai-qa.js
/**
 * @task S3F1
 * AI Q&A 인터페이스 로직 + 크레딧 부족 모달
 */

let selectedAI = 'gemini';
let userCredit = 0;
const chatHistory = [];

// 크레딧 부족 임계값 (예상 비용보다 낮으면 경고)
const LOW_CREDIT_THRESHOLD = 100; // ₩100

document.addEventListener('DOMContentLoaded', async () => {
    await loadUserCredit();
    await loadAIPricing();
    setupEventListeners();
});

async function loadUserCredit() {
    try {
        const response = await fetch('/api/user/credit', {
            headers: { 'Authorization': `Bearer ${getAccessToken()}` }
        });
        const data = await response.json();
        userCredit = data.credit || 0;
        updateCreditDisplay();
    } catch (error) {
        console.error('크레딧 로드 실패:', error);
    }
}

function updateCreditDisplay() {
    const creditEl = document.getElementById('user-credit');
    creditEl.textContent = `₩${userCredit.toLocaleString()}`;

    // 잔액 부족 시 스타일 변경
    if (userCredit < LOW_CREDIT_THRESHOLD) {
        creditEl.classList.add('low');
    } else {
        creditEl.classList.remove('low');
    }
}

async function loadAIPricing() {
    try {
        const response = await fetch('/api/ai/pricing');
        const data = await response.json();

        document.getElementById('gemini-price').textContent = `~₩${data.gemini}/질문`;
        document.getElementById('chatgpt-price').textContent = `~₩${data.chatgpt}/질문`;
        document.getElementById('claude-price').textContent = `~₩${data.claude}/질문`;
        document.getElementById('perplexity-price').textContent = `~₩${data.perplexity}/질문`;
    } catch (error) {
        console.error('가격 정보 로드 실패:', error);
    }
}

function setupEventListeners() {
    // AI 선택 버튼
    document.querySelectorAll('.ai-option').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.ai-option.selected')?.classList.remove('selected');
            btn.classList.add('selected');
            selectedAI = btn.dataset.ai;
        });
    });

    // 전송 버튼
    document.getElementById('send-button').addEventListener('click', sendQuestion);

    // Enter 키 전송 (Shift+Enter는 줄바꿈)
    document.getElementById('question-input').addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendQuestion();
        }
    });
}

async function sendQuestion() {
    const input = document.getElementById('question-input');
    const question = input.value.trim();

    if (!question) return;

    // 크레딧 부족 체크 (예상 비용 확인)
    if (userCredit < LOW_CREDIT_THRESHOLD) {
        showCreditInsufficientModal();
        return;
    }

    // 사용자 메시지 표시
    addMessage('user', question);
    input.value = '';

    // 로딩 표시
    const loadingId = addMessage('ai', '답변 생성 중...', true);

    try {
        const response = await fetch('/api/ai/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAccessToken()}`
            },
            body: JSON.stringify({
                question,
                aiModel: selectedAI
            })
        });

        const data = await response.json();

        if (!response.ok) {
            // 크레딧 부족 에러 처리
            if (response.status === 402 || data.error === 'INSUFFICIENT_CREDIT') {
                removeMessage(loadingId);
                showCreditInsufficientModal(data.required_credit);
                return;
            }
            throw new Error(data.message || 'AI 응답 실패');
        }

        // 로딩 메시지 제거 후 실제 답변 표시
        removeMessage(loadingId);
        addMessage('ai', data.answer, false, selectedAI);

        // 크레딧 업데이트
        userCredit = data.remainingCredit;
        updateCreditDisplay();

        // 크레딧 부족 경고
        if (userCredit < LOW_CREDIT_THRESHOLD) {
            showLowCreditWarning();
        }

    } catch (error) {
        removeMessage(loadingId);
        addMessage('error', error.message);
    }
}

// ========== 크레딧 모달 관련 함수 ==========

function showCreditInsufficientModal(requiredCredit = 50) {
    document.getElementById('modal-current-credit').textContent =
        `₩${userCredit.toLocaleString()}`;
    document.getElementById('modal-required-credit').textContent =
        `약 ₩${requiredCredit.toLocaleString()}`;
    document.getElementById('credit-insufficient-modal').style.display = 'flex';
}

function closeCreditModal() {
    document.getElementById('credit-insufficient-modal').style.display = 'none';
}

function openCreditModal() {
    document.getElementById('charge-modal-credit').textContent =
        `₩${userCredit.toLocaleString()}`;
    document.getElementById('credit-charge-modal').style.display = 'flex';
}

function closeChargeModal() {
    document.getElementById('credit-charge-modal').style.display = 'none';
}

async function chargeCredit(amount) {
    // 모달 닫기
    closeCreditModal();
    closeChargeModal();

    try {
        // 토스 페이먼트 결제 요청 (S4BA3 API 호출)
        const response = await fetch('/api/payment/credit/request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAccessToken()}`
            },
            body: JSON.stringify({ amount })
        });

        const data = await response.json();

        if (data.success && data.checkout_url) {
            // 토스 페이먼트 결제 페이지로 리다이렉트
            window.location.href = data.checkout_url;
        } else {
            alert('결제 요청 중 오류가 발생했습니다: ' + (data.error || '알 수 없는 오류'));
        }
    } catch (error) {
        console.error('결제 요청 실패:', error);
        alert('결제 요청 중 오류가 발생했습니다.');
    }
}

function goToSunny() {
    // 모달 닫기
    closeCreditModal();
    // 써니에게 묻기 페이지로 이동
    window.location.href = '/pages/ai/sunny.html';
}

function showLowCreditWarning() {
    // 토스트 알림 표시
    const toast = document.createElement('div');
    toast.className = 'toast warning';
    toast.innerHTML = `
        <span class="toast-icon">⚠️</span>
        <span class="toast-message">크레딧이 부족합니다. 충전하시겠습니까?</span>
        <button class="toast-action" onclick="openCreditModal()">충전</button>
        <button class="toast-close" onclick="this.parentElement.remove()">✕</button>
    `;
    document.body.appendChild(toast);

    // 5초 후 자동 제거
    setTimeout(() => toast.remove(), 5000);
}

// ========== 기존 함수들 ==========

function addMessage(type, content, isLoading = false, aiModel = null) {
    const chatArea = document.getElementById('chat-area');
    const messageId = `msg-${Date.now()}`;

    const messageDiv = document.createElement('div');
    messageDiv.id = messageId;
    messageDiv.className = `message ${type}`;

    if (isLoading) {
        messageDiv.classList.add('loading');
    }

    if (aiModel) {
        messageDiv.dataset.ai = aiModel;
    }

    messageDiv.innerHTML = `
        <div class="message-content">
            ${type === 'ai' ? `<span class="ai-badge">${getAIName(aiModel)}</span>` : ''}
            <div class="message-text">${formatMessage(content)}</div>
        </div>
    `;

    chatArea.appendChild(messageDiv);
    chatArea.scrollTop = chatArea.scrollHeight;

    return messageId;
}

function removeMessage(messageId) {
    document.getElementById(messageId)?.remove();
}

function formatMessage(content) {
    return content
        .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>');
}

function getAIName(model) {
    const names = {
        gemini: '🌟 Gemini',
        chatgpt: '🤖 ChatGPT',
        claude: '🧠 Claude',
        perplexity: '🔍 Perplexity'
    };
    return names[model] || model;
}

function getAccessToken() {
    return localStorage.getItem('accessToken') || '';
}
```

---

### 3. AI Q&A CSS (크레딧 모달 스타일 포함)
- 위치: `P3_프로토타입_제작/Frontend/Prototype/ai-qa.css`

```css
/* ai-qa.css */
/**
 * @task S3F1
 * AI Q&A 스타일 + 크레딧 모달
 */

.qa-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    height: calc(100vh - 60px);
}

/* AI 선택 영역 */
.ai-selector {
    margin-bottom: 1rem;
}

.ai-options {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

.ai-option {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem 1.5rem;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    background: white;
    cursor: pointer;
    transition: all 0.2s;
}

.ai-option:hover {
    border-color: #3182ce;
}

.ai-option.selected {
    border-color: #3182ce;
    background: #ebf8ff;
}

.ai-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
}

.ai-name {
    font-weight: 600;
    margin-bottom: 0.25rem;
}

.ai-price {
    font-size: 0.8rem;
    color: #718096;
}

/* 크레딧 정보 */
.credit-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    background: #f7fafc;
    border-radius: 8px;
    margin-bottom: 1rem;
}

.credit-balance {
    font-weight: 700;
    color: #2d3748;
}

.credit-balance.low {
    color: #e53e3e;
}

.btn-charge {
    margin-left: auto;
    padding: 0.5rem 1rem;
    background: #3182ce;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9rem;
}

.btn-charge:hover {
    background: #2c5282;
}

/* 대화 영역 */
.chat-area {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
    background: #f7fafc;
    border-radius: 12px;
    margin-bottom: 1rem;
}

.message {
    margin-bottom: 1rem;
    display: flex;
}

.message.user {
    justify-content: flex-end;
}

.message.user .message-content {
    background: #3182ce;
    color: white;
    border-radius: 18px 18px 4px 18px;
}

.message.ai .message-content {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 18px 18px 18px 4px;
}

.message.error .message-content {
    background: #fed7d7;
    color: #822727;
    border-radius: 8px;
}

.message-content {
    max-width: 70%;
    padding: 1rem;
}

.ai-badge {
    display: inline-block;
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    background: #edf2f7;
    border-radius: 4px;
    margin-bottom: 0.5rem;
}

.message-text {
    line-height: 1.6;
}

.message-text pre {
    background: #1a202c;
    color: #e2e8f0;
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;
}

.message-text code {
    background: #edf2f7;
    padding: 0.125rem 0.25rem;
    border-radius: 4px;
    font-family: monospace;
}

.message.loading .message-text::after {
    content: '';
    animation: dots 1.5s infinite;
}

@keyframes dots {
    0%, 20% { content: '.'; }
    40% { content: '..'; }
    60%, 100% { content: '...'; }
}

/* 입력 영역 */
.input-area {
    display: flex;
    gap: 1rem;
    align-items: flex-end;
}

#question-input {
    flex: 1;
    padding: 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    resize: none;
    font-size: 1rem;
}

#question-input:focus {
    outline: none;
    border-color: #3182ce;
}

.btn-send {
    padding: 1rem 1.5rem;
    background: #3182ce;
    color: white;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.btn-send:hover {
    background: #2c5282;
}

.btn-send:disabled {
    background: #a0aec0;
    cursor: not-allowed;
}

/* ========== 크레딧 모달 ========== */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal-content {
    background: white;
    border-radius: 16px;
    padding: 2rem;
    max-width: 450px;
    width: 90%;
    animation: modalIn 0.2s ease-out;
}

@keyframes modalIn {
    from {
        opacity: 0;
        transform: scale(0.95);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

.modal-header {
    text-align: center;
    margin-bottom: 1.5rem;
}

.modal-icon {
    font-size: 3rem;
    display: block;
    margin-bottom: 0.5rem;
}

.modal-header h2 {
    margin: 0;
    font-size: 1.5rem;
    color: #2d3748;
}

/* 크레딧 상태 */
.credit-status {
    background: #f7fafc;
    border-radius: 12px;
    padding: 1rem;
    margin-bottom: 1.5rem;
}

.credit-row {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
}

.credit-row .label {
    color: #718096;
}

.credit-row .value {
    font-weight: 700;
    color: #2d3748;
}

.credit-row .value.insufficient {
    color: #e53e3e;
}

/* 충전 옵션 */
.charge-options {
    margin-bottom: 1.5rem;
}

.charge-options h3 {
    font-size: 1rem;
    margin: 0 0 0.25rem 0;
}

.charge-desc {
    color: #718096;
    font-size: 0.9rem;
    margin: 0 0 1rem 0;
}

.charge-buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
}

.charge-option {
    position: relative;
    padding: 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    background: white;
    cursor: pointer;
    transition: all 0.2s;
}

.charge-option:hover {
    border-color: #3182ce;
    background: #ebf8ff;
}

.charge-option.recommended {
    border-color: #48bb78;
    background: #f0fff4;
}

.charge-option .badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background: #48bb78;
    color: white;
    font-size: 0.7rem;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
}

.charge-option .amount {
    font-size: 1.25rem;
    font-weight: 700;
    color: #2d3748;
}

/* 대안 섹션 (써니) */
.alternative-section {
    margin-top: 1.5rem;
}

.divider {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: #a0aec0;
    font-size: 0.9rem;
    margin-bottom: 1rem;
}

.divider::before,
.divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e2e8f0;
}

.sunny-option {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: #fffbeb;
    border: 1px solid #fcd34d;
    border-radius: 12px;
}

.sunny-icon {
    font-size: 2rem;
}

.sunny-info h4 {
    margin: 0;
    font-size: 1rem;
}

.sunny-info p {
    margin: 0.25rem 0 0 0;
    font-size: 0.85rem;
    color: #92400e;
}

.btn-sunny {
    margin-left: auto;
    padding: 0.5rem 1rem;
    background: #f59e0b;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
}

.btn-sunny:hover {
    background: #d97706;
}

/* 모달 액션 버튼 */
.modal-actions {
    display: flex;
    justify-content: center;
    margin-top: 1.5rem;
}

.btn-secondary {
    padding: 0.75rem 2rem;
    background: #e2e8f0;
    color: #4a5568;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
}

.btn-secondary:hover {
    background: #cbd5e0;
}

/* 토스트 알림 */
.toast {
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 1.5rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    animation: slideUp 0.3s ease-out;
    z-index: 1001;
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateX(-50%) translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
    }
}

.toast.warning {
    border-left: 4px solid #f59e0b;
}

.toast-icon {
    font-size: 1.5rem;
}

.toast-message {
    color: #2d3748;
}

.toast-action {
    padding: 0.5rem 1rem;
    background: #3182ce;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}

.toast-close {
    padding: 0.25rem 0.5rem;
    background: transparent;
    border: none;
    color: #a0aec0;
    cursor: pointer;
    font-size: 1rem;
}

/* 반응형 */
@media (max-width: 600px) {
    .ai-options {
        flex-direction: column;
    }

    .charge-buttons {
        grid-template-columns: 1fr;
    }

    .sunny-option {
        flex-direction: column;
        text-align: center;
    }

    .btn-sunny {
        margin-left: 0;
        margin-top: 0.5rem;
        width: 100%;
    }
}
```

---

## Expected Output Files
- `P3_프로토타입_제작/Frontend/Prototype/pages/ai/qa.html`
- `P3_프로토타입_제작/Frontend/Prototype/ai-qa.js`
- `P3_프로토타입_제작/Frontend/Prototype/ai-qa.css`

---

## Completion Criteria
- [ ] AI 모델 선택 UI (Gemini, ChatGPT, Claude, Perplexity)
- [ ] 크레딧 잔액 표시
- [ ] 질문 입력 및 전송
- [ ] AI 답변 표시 (마크다운 지원)
- [ ] **크레딧 부족 모달** (충전 옵션 4개)
- [ ] **토스 페이먼트 결제 연동** (S4BA3)
- [ ] **써니에게 묻기 대안 제공**
- [ ] 크레딧 부족 경고 토스트
- [ ] 모바일 반응형 디자인

---

## Tech Stack
- HTML/CSS/JavaScript

## Tools
- S3BA1 (AI Q&A API) 연동
- S4BA3 (토스 페이먼트 결제 API) 연동

## Execution Type
AI-Only

## Remarks
- **크레딧 부족 시 2가지 대안 제공**: 충전(토스페이먼트) / 써니에게 묻기
- 충전 금액: ₩10,000 / ₩20,000 / ₩30,000(추천) / ₩50,000
- 대화 기록은 로컬에서만 유지 (새로고침 시 초기화)
- 토스 페이먼트 checkout_url로 리다이렉트

---

## 작업 결과물 저장 2대 규칙

> **이 규칙은 반드시 준수하세요!**

### 제1 규칙: Stage + Area 폴더에 저장
- Task ID의 Stage와 Area에 해당하는 폴더에 저장
- S3F1 → `S3_개발-2차/Frontend/`

### 제2 규칙: Production 코드는 이중 저장
- Frontend 코드는 Stage 폴더 + Production 폴더 둘 다 저장
- `Production/Frontend/pages/ai/`에도 저장

**Area 폴더 매핑:** F→Frontend
