// api/projects/create.js
/**
 * @task S2BA5
 * 프로젝트 생성 API
 */

import { createClient } from '@supabase/supabase-js';
import { verifyToken } from '../../lib/auth-middleware.js';

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // 인증 확인
    const user = await verifyToken(req);
    if (!user) {
        return res.status(401).json({ error: '인증이 필요합니다' });
    }

    const { name, description, template_id } = req.body;

    if (!name || name.trim().length === 0) {
        return res.status(400).json({ error: '프로젝트 이름은 필수입니다' });
    }

    try {
        // 프로젝트 생성
        const { data: project, error } = await supabase
            .from('projects')
            .insert({
                user_id: user.id,
                name: name.trim(),
                description: description || '',
                template_id: template_id || null,
                status: 'active',
                created_at: new Date().toISOString()
            })
            .select()
            .single();

        if (error) throw error;

        // 템플릿 기반 초기 데이터 생성 (있는 경우)
        if (template_id) {
            await initializeFromTemplate(project.id, template_id);
        }

        return res.status(201).json({
            success: true,
            project
        });

    } catch (error) {
        console.error('Project creation error:', error);
        return res.status(500).json({ error: '프로젝트 생성 중 오류가 발생했습니다' });
    }
}

async function initializeFromTemplate(projectId, templateId) {
    // 템플릿에서 초기 Task 복사 등의 로직
    // 향후 구현
}
