-- =====================================================
-- S4 Payment System Seed SQL
-- SSALWorks 결제 시스템 초기 데이터
--
-- Task References: S4BA1, S4BA2, S4BA3, S4O1
-- Created: 2025-12-19
-- =====================================================

-- =====================================================
-- 1. installation_deposits 테이블 (설치비 입금 요청)
-- =====================================================
CREATE TABLE IF NOT EXISTS installation_deposits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    deposit_code VARCHAR(6) UNIQUE NOT NULL,
    amount INTEGER NOT NULL DEFAULT 3000000,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    expires_at TIMESTAMPTZ NOT NULL,
    confirmed_at TIMESTAMPTZ,
    confirmed_by UUID REFERENCES auth.users(id),
    rejected_at TIMESTAMPTZ,
    rejected_by UUID REFERENCES auth.users(id),
    reject_reason VARCHAR(50),
    reject_detail TEXT,
    admin_note TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT valid_status CHECK (status IN ('pending', 'confirmed', 'rejected', 'expired', 'cancelled'))
);

-- 인덱스
CREATE INDEX IF NOT EXISTS idx_deposits_user_id ON installation_deposits(user_id);
CREATE INDEX IF NOT EXISTS idx_deposits_status ON installation_deposits(status);
CREATE INDEX IF NOT EXISTS idx_deposits_code ON installation_deposits(deposit_code);
CREATE INDEX IF NOT EXISTS idx_deposits_expires ON installation_deposits(expires_at);

-- =====================================================
-- 2. payment_methods 테이블 (결제 수단 - 빌링키)
-- =====================================================
CREATE TABLE IF NOT EXISTS payment_methods (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    billing_key VARCHAR(100) NOT NULL,
    card_company VARCHAR(50),
    card_number_masked VARCHAR(20),
    is_primary BOOLEAN DEFAULT TRUE,
    is_active BOOLEAN DEFAULT TRUE,
    registered_at TIMESTAMPTZ DEFAULT NOW(),
    last_used_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_payment_methods_user ON payment_methods(user_id);

-- =====================================================
-- 3. payments 테이블 (결제 내역)
-- =====================================================
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    payment_type VARCHAR(20) NOT NULL,
    amount INTEGER NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    toss_payment_key VARCHAR(100),
    toss_order_id VARCHAR(100),
    card_company VARCHAR(50),
    card_number_masked VARCHAR(20),
    receipt_url TEXT,
    failure_code VARCHAR(50),
    failure_message TEXT,
    refunded_at TIMESTAMPTZ,
    refund_amount INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT valid_payment_type CHECK (payment_type IN ('credit', 'subscription')),
    CONSTRAINT valid_payment_status CHECK (status IN ('pending', 'success', 'failed', 'cancelled', 'refunded'))
);

CREATE INDEX IF NOT EXISTS idx_payments_user ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_type ON payments(payment_type);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_created ON payments(created_at DESC);

-- =====================================================
-- 4. toss_webhook_logs 테이블 (토스 웹훅 로그)
-- =====================================================
CREATE TABLE IF NOT EXISTS toss_webhook_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type VARCHAR(50) NOT NULL,
    payment_key VARCHAR(100),
    order_id VARCHAR(100),
    status VARCHAR(20),
    raw_data JSONB NOT NULL,
    processed BOOLEAN DEFAULT FALSE,
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_webhook_payment_key ON toss_webhook_logs(payment_key);
CREATE INDEX IF NOT EXISTS idx_webhook_processed ON toss_webhook_logs(processed);

-- =====================================================
-- 5. credit_transactions 테이블 (크레딧 거래 내역)
-- =====================================================
CREATE TABLE IF NOT EXISTS credit_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    transaction_type VARCHAR(30) NOT NULL,
    amount INTEGER NOT NULL,
    balance_before INTEGER NOT NULL,
    balance_after INTEGER NOT NULL,
    description TEXT,
    reference_id UUID,
    reference_type VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT valid_transaction_type CHECK (transaction_type IN (
        'initial_grant',      -- 설치비 입금 확인 시 초기 지급
        'charge',             -- 충전
        'ai_usage',           -- AI 사용
        'admin_grant',        -- 관리자 수동 지급
        'admin_deduct',       -- 관리자 수동 차감
        'refund',             -- 환불
        'expiry'              -- 만료
    ))
);

CREATE INDEX IF NOT EXISTS idx_credit_tx_user ON credit_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_credit_tx_type ON credit_transactions(transaction_type);
CREATE INDEX IF NOT EXISTS idx_credit_tx_created ON credit_transactions(created_at DESC);

-- =====================================================
-- 6. system_config 테이블 (시스템 설정)
-- =====================================================
CREATE TABLE IF NOT EXISTS system_config (
    key VARCHAR(100) PRIMARY KEY,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 결제 관련 설정값 삽입
INSERT INTO system_config (key, value, description) VALUES
    ('INSTALLATION_FEE', '{"amount": 3000000, "currency": "KRW"}', '설치비 (₩3,000,000)'),
    ('INITIAL_CREDIT', '{"amount": 50000, "currency": "KRW"}', '초기 지급 크레딧 (₩50,000)'),
    ('FREE_PERIOD_MONTHS', '{"months": 3}', '무료 이용 기간 (3개월)'),
    ('MONTHLY_FEE', '{"amount": 50000, "currency": "KRW"}', '월 이용료 (₩50,000)'),
    ('DEPOSIT_EXPIRY_DAYS', '{"days": 7}', '입금 대기 만료 기간 (7일)'),
    ('CREDIT_OPTIONS', '{"options": [10000, 20000, 30000, 50000]}', '크레딧 충전 옵션'),
    ('AI_MARGIN_RATE', '{"rate": 1.2}', 'AI API 비용 마진율 (20%)'),
    ('USD_TO_KRW', '{"rate": 1300}', 'USD-KRW 환율')
ON CONFLICT (key) DO UPDATE SET
    value = EXCLUDED.value,
    updated_at = NOW();

-- =====================================================
-- 7. bank_account_info 테이블 (입금 계좌 정보)
-- =====================================================
CREATE TABLE IF NOT EXISTS bank_account_info (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    bank_name VARCHAR(50) NOT NULL,
    account_number VARCHAR(50) NOT NULL,
    account_holder VARCHAR(50) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 기본 계좌 정보 삽입 (환경변수로 덮어쓰기 가능)
-- 실제 운영시에는 환경변수에서 읽어오도록 API 수정 필요
INSERT INTO bank_account_info (bank_name, account_number, account_holder, is_active) VALUES
    ('기업은행', '000-000000-00-000', 'SSALWorks', TRUE)
ON CONFLICT DO NOTHING;

-- =====================================================
-- 8. users 테이블 확장 (크레딧/구독 필드 추가)
-- =====================================================
-- 기존 users 테이블에 필드 추가 (이미 존재하면 무시)
DO $$
BEGIN
    -- credit_balance 필드
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'users' AND column_name = 'credit_balance'
    ) THEN
        ALTER TABLE users ADD COLUMN credit_balance INTEGER DEFAULT 0;
    END IF;

    -- subscription_started_at 필드
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'users' AND column_name = 'subscription_started_at'
    ) THEN
        ALTER TABLE users ADD COLUMN subscription_started_at TIMESTAMPTZ;
    END IF;

    -- subscription_status 필드
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'users' AND column_name = 'subscription_status'
    ) THEN
        ALTER TABLE users ADD COLUMN subscription_status VARCHAR(30) DEFAULT 'pending';
    END IF;

    -- next_billing_date 필드
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'users' AND column_name = 'next_billing_date'
    ) THEN
        ALTER TABLE users ADD COLUMN next_billing_date TIMESTAMPTZ;
    END IF;

    -- billing_failure_count 필드
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'users' AND column_name = 'billing_failure_count'
    ) THEN
        ALTER TABLE users ADD COLUMN billing_failure_count INTEGER DEFAULT 0;
    END IF;

    -- is_service_active 필드
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'users' AND column_name = 'is_service_active'
    ) THEN
        ALTER TABLE users ADD COLUMN is_service_active BOOLEAN DEFAULT FALSE;
    END IF;
END $$;

-- =====================================================
-- 9. RLS 정책
-- =====================================================

-- installation_deposits RLS
ALTER TABLE installation_deposits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own deposits" ON installation_deposits
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own deposits" ON installation_deposits
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all deposits" ON installation_deposits
    FOR ALL USING (
        EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
    );

-- payment_methods RLS
ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own payment methods" ON payment_methods
    FOR ALL USING (auth.uid() = user_id);

-- payments RLS
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own payments" ON payments
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all payments" ON payments
    FOR ALL USING (
        EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
    );

-- credit_transactions RLS
ALTER TABLE credit_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own credit transactions" ON credit_transactions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all transactions" ON credit_transactions
    FOR ALL USING (
        EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
    );

-- =====================================================
-- 10. Functions (헬퍼 함수)
-- =====================================================

-- 입금 코드 생성 함수
CREATE OR REPLACE FUNCTION generate_deposit_code()
RETURNS VARCHAR(6) AS $$
DECLARE
    chars VARCHAR(36) := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    result VARCHAR(6) := '';
    i INTEGER;
BEGIN
    FOR i IN 1..6 LOOP
        result := result || substr(chars, floor(random() * length(chars) + 1)::int, 1);
    END LOOP;
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- 크레딧 차감 함수
CREATE OR REPLACE FUNCTION deduct_credit(
    p_user_id UUID,
    p_amount INTEGER,
    p_description TEXT,
    p_reference_id UUID DEFAULT NULL,
    p_reference_type VARCHAR DEFAULT NULL
)
RETURNS TABLE(success BOOLEAN, new_balance INTEGER, error_message TEXT) AS $$
DECLARE
    current_balance INTEGER;
BEGIN
    -- 현재 잔액 조회 (락)
    SELECT credit_balance INTO current_balance
    FROM users WHERE id = p_user_id FOR UPDATE;

    IF current_balance IS NULL THEN
        RETURN QUERY SELECT FALSE, 0, '사용자를 찾을 수 없습니다.'::TEXT;
        RETURN;
    END IF;

    IF current_balance < p_amount THEN
        RETURN QUERY SELECT FALSE, current_balance, '크레딧이 부족합니다.'::TEXT;
        RETURN;
    END IF;

    -- 크레딧 차감
    UPDATE users SET credit_balance = credit_balance - p_amount
    WHERE id = p_user_id;

    -- 거래 내역 기록
    INSERT INTO credit_transactions (
        user_id, transaction_type, amount,
        balance_before, balance_after,
        description, reference_id, reference_type
    ) VALUES (
        p_user_id, 'ai_usage', -p_amount,
        current_balance, current_balance - p_amount,
        p_description, p_reference_id, p_reference_type
    );

    RETURN QUERY SELECT TRUE, (current_balance - p_amount), NULL::TEXT;
END;
$$ LANGUAGE plpgsql;

-- 크레딧 충전 함수
CREATE OR REPLACE FUNCTION add_credit(
    p_user_id UUID,
    p_amount INTEGER,
    p_type VARCHAR,
    p_description TEXT,
    p_reference_id UUID DEFAULT NULL
)
RETURNS TABLE(success BOOLEAN, new_balance INTEGER) AS $$
DECLARE
    current_balance INTEGER;
BEGIN
    -- 현재 잔액 조회
    SELECT credit_balance INTO current_balance
    FROM users WHERE id = p_user_id FOR UPDATE;

    IF current_balance IS NULL THEN
        current_balance := 0;
    END IF;

    -- 크레딧 추가
    UPDATE users SET credit_balance = credit_balance + p_amount
    WHERE id = p_user_id;

    -- 거래 내역 기록
    INSERT INTO credit_transactions (
        user_id, transaction_type, amount,
        balance_before, balance_after,
        description, reference_id
    ) VALUES (
        p_user_id, p_type, p_amount,
        current_balance, current_balance + p_amount,
        p_description, p_reference_id
    );

    RETURN QUERY SELECT TRUE, (current_balance + p_amount);
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 완료 로그
-- =====================================================
DO $$
BEGIN
    RAISE NOTICE 'S4 Payment System Seed SQL executed successfully.';
    RAISE NOTICE 'Tables created: installation_deposits, payment_methods, payments, toss_webhook_logs, credit_transactions, system_config, bank_account_info';
    RAISE NOTICE 'Functions created: generate_deposit_code, deduct_credit, add_credit';
END $$;
