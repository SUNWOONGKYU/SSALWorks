// api/projects/list.js
/**
 * @task S2BA5
 * 프로젝트 목록 조회 API
 */

import { createClient } from '@supabase/supabase-js';
import { verifyToken } from '../../lib/auth-middleware.js';

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const user = await verifyToken(req);
    if (!user) {
        return res.status(401).json({ error: '인증이 필요합니다' });
    }

    const { status, page = 1, limit = 10 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    try {
        let query = supabase
            .from('projects')
            .select('*', { count: 'exact' })
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .range(offset, offset + parseInt(limit) - 1);

        if (status && status !== 'all') {
            query = query.eq('status', status);
        }

        const { data: projects, count, error } = await query;

        if (error) throw error;

        return res.status(200).json({
            success: true,
            projects,
            pagination: {
                total: count,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(count / parseInt(limit))
            }
        });

    } catch (error) {
        console.error('Project list error:', error);
        return res.status(500).json({ error: '프로젝트 목록 조회 중 오류가 발생했습니다' });
    }
}
