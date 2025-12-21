/**
 * @task S4BA1
 * @description 개발자 계정 개설비 정보 조회 API (인증 불필요)
 */

const BANK_INFO = {
  bank_name: process.env.BANK_NAME || '국민은행',
  account_number: process.env.BANK_ACCOUNT || '123-456-789012',
  account_holder: process.env.BANK_HOLDER || '주식회사 SSAL'
};

const INSTALLATION_FEE = 3000000;
const INITIAL_CREDIT = 50000;
const FREE_MONTHS = 3;
const MONTHLY_FEE = 50000;

module.exports = async (req, res) => {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        res.status(200).json({
            success: true,
            installation_fee: {
                amount: INSTALLATION_FEE,
                description: '개발자 계정 개설비 (1회)',
                payment_methods: ['bank_transfer']
            },
            bank_info: BANK_INFO,
            benefits: {
                initial_credit: INITIAL_CREDIT,
                initial_credit_description: '즉시 크레딧 지급',
                free_months: FREE_MONTHS,
                free_months_description: '3개월 무료 사용',
                monthly_fee_after: MONTHLY_FEE,
                monthly_fee_description: '이후 월 이용료'
            },
            payment_process: [
                '1. 개발자 계정 개설비 입금 요청',
                '2. 계좌 정보 및 입금자명 확인',
                '3. 7일 이내 입금',
                '4. 관리자 확인 후 즉시 크레딧 지급',
                '5. 3개월 무료 기간 시작'
            ],
            notes: [
                '입금자명에 표시된 코드를 반드시 포함해주세요.',
                '입금 후 관리자 확인까지 영업일 기준 1-2일 소요됩니다.',
                '입금 기한은 요청일로부터 7일입니다.'
            ]
        });
    } catch (error) {
        console.error('Installation info error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
