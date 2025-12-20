/**
 * @task S4F5
 * @description 프로젝트 생성 API
 *
 * POST /api/projects/create
 *
 * Request Body:
 * {
 *   "projectName": "string",
 *   "description": "string" (optional)
 * }
 *
 * Response:
 * {
 *   "success": true,
 *   "projectId": "A3B5C7D9-P001",
 *   "projectName": "string",
 *   "projectPath": "virtual path for display"
 * }
 */

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

module.exports = async (req, res) => {
    // CORS 헤더
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // OPTIONS 요청 처리
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // POST 메서드만 허용
    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            error: 'Method not allowed'
        });
    }

    try {
        // 1. 사용자 인증 확인
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                error: '로그인이 필요합니다'
            });
        }

        const token = authHeader.substring(7);
        const { data: { user }, error: authError } = await supabase.auth.getUser(token);

        if (authError || !user) {
            return res.status(401).json({
                success: false,
                error: '유효하지 않은 인증 토큰입니다'
            });
        }

        // 2. 요청 데이터 검증
        const { projectName, description } = req.body;

        if (!projectName || projectName.trim() === '') {
            return res.status(400).json({
                success: false,
                error: '프로젝트 이름을 입력해주세요'
            });
        }

        // 3. users 테이블에서 user_id (8자리) 조회
        const { data: userData, error: userError } = await supabase
            .from('users')
            .select('user_id')
            .eq('id', user.id)
            .single();

        if (userError || !userData) {
            console.error('User query failed:', userError);
            return res.status(500).json({
                success: false,
                error: '사용자 정보를 찾을 수 없습니다'
            });
        }

        const userId = userData.user_id;

        // 4. 진행 중인 프로젝트가 있는지 확인
        const { data: existingProject, error: checkError } = await supabase
            .from('projects')
            .select('project_id, project_name')
            .eq('user_id', userId)
            .eq('status', 'in_progress')
            .single();

        if (existingProject) {
            return res.status(400).json({
                success: false,
                error: `이미 진행 중인 프로젝트가 있습니다: ${existingProject.project_name}`
            });
        }

        // 5. project_id 생성 (user_id-P001 형식)
        const { data: countData, error: countError } = await supabase
            .from('projects')
            .select('id', { count: 'exact', head: true })
            .eq('user_id', userId);

        const projectCount = (countData?.length || 0) + 1;
        const projectId = `${userId}-P${String(projectCount).padStart(3, '0')}`;

        // 6. 프로젝트 생성
        const { data: newProject, error: insertError } = await supabase
            .from('projects')
            .insert({
                user_id: userId,
                project_id: projectId,
                project_name: projectName.trim(),
                description: description?.trim() || null,
                status: 'in_progress',
                progress: 0,
                current_stage: 0,
                total_stages: 5
            })
            .select()
            .single();

        if (insertError) {
            console.error('Project insert failed:', insertError);
            return res.status(500).json({
                success: false,
                error: '프로젝트 생성에 실패했습니다',
                details: insertError.message
            });
        }

        // 7. 성공 응답
        return res.status(200).json({
            success: true,
            projectId: projectId,
            projectName: newProject.project_name,
            projectPath: `C:/!SSAL_Works_Private/${projectName.trim()}/`,
            message: '프로젝트가 성공적으로 생성되었습니다'
        });

    } catch (error) {
        console.error('Project creation error:', error);
        return res.status(500).json({
            success: false,
            error: '프로젝트 생성 중 오류가 발생했습니다',
            details: error.message
        });
    }
};
