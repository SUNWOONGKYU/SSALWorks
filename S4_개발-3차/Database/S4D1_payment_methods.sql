-- @task S4D1
-- S4D1: 결제 수단 테이블

CREATE TABLE IF NOT EXISTS payment_methods (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    billing_key TEXT NOT NULL,
    customer_key TEXT NOT NULL,
    card_company VARCHAR(50),
    card_number VARCHAR(20), -- 마스킹된 번호 (예: **** **** **** 1234)
    card_type VARCHAR(20), -- 신용/체크
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스
CREATE INDEX idx_payment_methods_user_id ON payment_methods(user_id);
CREATE UNIQUE INDEX idx_payment_methods_billing_key ON payment_methods(billing_key);

-- RLS
ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own payment methods"
    ON payment_methods FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own payment methods"
    ON payment_methods FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own payment methods"
    ON payment_methods FOR DELETE
    USING (auth.uid() = user_id);
