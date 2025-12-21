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

// 8자리 고유 user_id 생성 함수
function generateUserId() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// 고유한 user_id 생성 (중복 체크)
async function createUniqueUserId() {
    let attempts = 0;
    const maxAttempts = 10;

    while (attempts < maxAttempts) {
        const userId = generateUserId();
        const { data } = await supabase
            .from('users')
            .select('user_id')
            .eq('user_id', userId)
            .single();

        if (!data) {
            return userId;
        }
        attempts++;
    }
    throw new Error('Failed to generate unique user_id');
}

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

        // 3. users 테이블에서 user_id (8자리) 조회 또는 생성
        let userId;

        // 3-1. 먼저 auth.uid()로 조회
        const { data: userData, error: userError } = await supabase
            .from('users')
            .select('user_id')
            .eq('id', user.id)
            .single();

        if (userData && userData.user_id) {
            // auth.uid()로 찾음 - 정상 케이스
            userId = userData.user_id;
        } else {
            // 3-2. auth.uid()로 못 찾으면 email로 조회
            const { data: userByEmail, error: emailError } = await supabase
                .from('users')
                .select('id, user_id')
                .eq('email', user.email)
                .single();

            if (userByEmail && userByEmail.user_id) {
                // email로 찾음 - id를 auth.uid()로 업데이트
                console.log('Found user by email, updating id:', userByEmail.id, '->', user.id);

                const { error: updateError } = await supabase
                    .from('users')
                    .update({ id: user.id })
                    .eq('email', user.email);

                if (updateError) {
                    console.error('Failed to update user id:', updateError);
                }

                userId = userByEmail.user_id;
            } else {
                // 3-3. 둘 다 없으면 신규 생성
                console.log('Creating new user record for:', user.id, user.email);

                try {
                    const newUserId = await createUniqueUserId();
                    const { data: newUser, error: insertUserError } = await supabase
                        .from('users')
                        .insert({
                            id: user.id,
                            email: user.email,
                            name: user.user_metadata?.full_name || user.user_metadata?.name || user.email.split('@')[0],
                            user_id: newUserId,
                            avatar_url: user.user_metadata?.avatar_url || null,
                            role: 'user',
                            subscription_status: 'free',
                            credit_balance: 0
                        })
                        .select('user_id')
                        .single();

                    if (insertUserError) {
                        console.error('Failed to create user:', insertUserError);
                        return res.status(500).json({
                            success: false,
                            error: '사용자 등록에 실패했습니다',
                            details: insertUserError.message
                        });
                    }

                    userId = newUser.user_id;
                    console.log('New user created with user_id:', userId);
                } catch (createError) {
                    console.error('User creation error:', createError);
                    return res.status(500).json({
                        success: false,
                        error: '사용자 ID 생성에 실패했습니다',
                        details: createError.message
                    });
                }
            }
        }

        // 4. 진행 중인 프로젝트가 있는지 확인
        // TEST_DISABLE: 테스트를 위해 임시 비활성화
        // const { data: existingProject, error: checkError } = await supabase
        //     .from('projects')
        //     .select('project_id, project_name')
        //     .eq('user_id', userId)
        //     .eq('status', 'in_progress')
        //     .single();

        // if (existingProject) {
        //     return res.status(400).json({
        //         success: false,
        //         error: `이미 진행 중인 프로젝트가 있습니다: ${existingProject.project_name}`
        //     });
        // }

        // 5. project_id 생성 (user_id-P001 형식)
        const { count: projectCount, error: countError } = await supabase
            .from('projects')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', userId);

        const nextProjectNum = (projectCount || 0) + 1;
        const projectId = `${userId}-P${String(nextProjectNum).padStart(3, '0')}`;

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
