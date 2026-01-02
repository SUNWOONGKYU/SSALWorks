/**
 * @task S2S-2FA
 * 2FA 검증 API - TOTP 코드 확인 및 활성화
 * POST /api/auth/mfa/verify
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // 인증 확인
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            return res.status(401).json({ error: '인증이 필요합니다' });
        }

        const token = authHeader.replace('Bearer ', '');
        const { factor_id, code } = req.body;

        if (!factor_id || !code) {
            return res.status(400).json({ error: 'factor_id와 code가 필요합니다' });
        }

        // 6자리 코드 검증
        if (!/^\d{6}$/.test(code)) {
            return res.status(400).json({ error: '6자리 숫자를 입력하세요' });
        }

        // 먼저 challenge 생성
        const challengeResponse = await fetch(
            `${process.env.SUPABASE_URL}/auth/v1/factors/${factor_id}/challenge`,
            {
                method: 'POST',
                headers: {
                    'apikey': process.env.SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const challengeData = await challengeResponse.json();

        if (!challengeResponse.ok) {
            return res.status(challengeResponse.status).json({
                error: challengeData.error_description || 'Challenge 생성 실패'
            });
        }

        // challenge verify
        const verifyResponse = await fetch(
            `${process.env.SUPABASE_URL}/auth/v1/factors/${factor_id}/verify`,
            {
                method: 'POST',
                headers: {
                    'apikey': process.env.SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    challenge_id: challengeData.id,
                    code: code
                })
            }
        );

        const verifyData = await verifyResponse.json();

        if (!verifyResponse.ok) {
            return res.status(verifyResponse.status).json({
                error: verifyData.error_description || '인증 코드가 올바르지 않습니다'
            });
        }

        return res.status(200).json({
            success: true,
            message: '2FA가 성공적으로 활성화되었습니다'
        });

    } catch (error) {
        console.error('MFA verify error:', error);
        return res.status(500).json({
            error: '2FA 검증 실패',
            message: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}
