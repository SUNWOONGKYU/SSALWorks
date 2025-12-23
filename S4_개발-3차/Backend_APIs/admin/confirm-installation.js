/**
 * @task S4BA5
 * @description 입금 확인 API (관리자용)
 * POST /api/admin/confirm-installation
 *
 * 기능:
 * - 관리자 권한 필수 (isAdmin 체크)
 * - 입금 상태 업데이트 (confirm/reject)
 * - 프로젝트 installation_paid 플래그 업데이트
 * - 사용자 이메일 알림
 */

import { createClient } from '@supabase/supabase-js';

// 빌더 ID 일련번호 저장 (메모리 - 실제로는 DB 사용 권장)
const builderIdCounters = {};

// JS에서 빌더 ID 생성 (DB 함수 사용 불가시 폴백)
function generateBuilderIdJS(amount) {
  const now = new Date();
  const yearMonth = now.toISOString().slice(2, 4) + String(now.getMonth() + 1).padStart(2, '0');

  // 월별 카운터
  if (!builderIdCounters[yearMonth]) {
    builderIdCounters[yearMonth] = 0;
  }
  builderIdCounters[yearMonth]++;
  const seq = String(builderIdCounters[yearMonth]).padStart(6, '0');

  // 금액 코드
  const amountCodes = {
    3000000: 'TH',
    4000000: 'FO',
    5000000: 'FI',
    6000000: 'SI',
    7000000: 'SE',
    8000000: 'EI',
    9000000: 'NI'
  };
  const amountCode = amountCodes[amount] || 'XX';

  return yearMonth + seq + amountCode;
}

export default async function handler(req, res) {
  // CORS 헤더 설정
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
    // Authorization 헤더에서 토큰 추출
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: '인증이 필요합니다.' });
    }

    const token = authHeader.split(' ')[1];

    // Supabase 클라이언트 생성
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY,
      {
        global: {
          headers: { Authorization: `Bearer ${token}` }
        }
      }
    );

    // 사용자 인증 확인
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return res.status(401).json({ error: '유효하지 않은 인증 정보입니다.' });
    }

    // 관리자 권한 확인
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('is_admin')
      .eq('id', user.id)
      .single();

    if (userError || !userData || !userData.is_admin) {
      return res.status(403).json({ error: '관리자 권한이 필요합니다.' });
    }

    // 요청 데이터 검증
    const { paymentId, action, memo } = req.body;

    if (!paymentId || !action) {
      return res.status(400).json({
        error: '필수 정보가 누락되었습니다.',
        required: ['paymentId', 'action']
      });
    }

    if (!['confirm', 'reject'].includes(action)) {
      return res.status(400).json({
        error: '유효하지 않은 action입니다.',
        validActions: ['confirm', 'reject']
      });
    }

    // 입금 신청 정보 조회
    const { data: payment, error: paymentError } = await supabase
      .from('installation_payments')
      .select(`
        id,
        project_id,
        user_id,
        amount,
        depositor_name,
        bank_name,
        status,
        requested_at,
        projects (
          id,
          project_name,
          owner_id
        ),
        users (
          id,
          email,
          display_name
        )
      `)
      .eq('id', paymentId)
      .single();

    if (paymentError || !payment) {
      return res.status(404).json({ error: '입금 신청을 찾을 수 없습니다.' });
    }

    // 이미 처리된 신청인지 확인
    if (payment.status !== 'pending') {
      return res.status(400).json({
        error: '이미 처리된 입금 신청입니다.',
        currentStatus: payment.status
      });
    }

    // 상태 업데이트
    const newStatus = action === 'confirm' ? 'confirmed' : 'rejected';
    const { error: updateError } = await supabase
      .from('installation_payments')
      .update({
        status: newStatus,
        confirmed_at: action === 'confirm' ? new Date().toISOString() : null,
        admin_memo: memo || null
      })
      .eq('id', paymentId);

    if (updateError) {
      console.error('상태 업데이트 오류:', updateError);
      return res.status(500).json({ error: '상태 업데이트 중 오류가 발생했습니다.' });
    }

    // confirm인 경우 추가 처리
    let generatedBuilderId = null;
    if (action === 'confirm') {
      // 1. 프로젝트 installation_paid 플래그 업데이트
      const { error: projectUpdateError } = await supabase
        .from('projects')
        .update({
          installation_paid: true,
          installation_paid_at: new Date().toISOString()
        })
        .eq('id', payment.project_id);

      if (projectUpdateError) {
        console.error('프로젝트 업데이트 오류:', projectUpdateError);
        // 롤백 처리
        await supabase
          .from('installation_payments')
          .update({ status: 'pending', confirmed_at: null })
          .eq('id', paymentId);

        return res.status(500).json({ error: '프로젝트 업데이트 중 오류가 발생했습니다.' });
      }

      // 2. 빌더 ID 생성 (YYMMNNNNNNXX 형식)
      try {
        const { data: builderIdResult, error: builderIdError } = await supabase
          .rpc('generate_builder_id', { amount: payment.amount });

        if (builderIdError) {
          console.error('빌더 ID 생성 오류:', builderIdError);
          // DB 함수가 없으면 JS에서 직접 생성
          generatedBuilderId = generateBuilderIdJS(payment.amount);
        } else {
          generatedBuilderId = builderIdResult;
        }
      } catch (err) {
        console.error('빌더 ID 생성 예외:', err);
        generatedBuilderId = generateBuilderIdJS(payment.amount);
      }

      // 3. 사용자 정보 업데이트 (빌더 ID + 설치비 납부 상태 + 웰컴 크레딧)
      const welcomeCredits = 50000; // ₩50,000 웰컴 크레딧
      const { error: userUpdateError } = await supabase
        .from('users')
        .update({
          builder_id: generatedBuilderId,
          installation_fee_paid: true,
          installation_date: new Date().toISOString(),
          credit_balance: supabase.raw(`COALESCE(credit_balance, 0) + ${welcomeCredits}`),
          subscription_status: 'active'
        })
        .eq('id', payment.user_id);

      if (userUpdateError) {
        console.error('사용자 업데이트 오류:', userUpdateError);
        // 크레딧 증가는 raw SQL이 안될 수 있으므로 별도 처리
        const { data: currentUser } = await supabase
          .from('users')
          .select('credit_balance')
          .eq('id', payment.user_id)
          .single();

        const newBalance = (currentUser?.credit_balance || 0) + welcomeCredits;
        await supabase
          .from('users')
          .update({
            builder_id: generatedBuilderId,
            installation_fee_paid: true,
            installation_date: new Date().toISOString(),
            credit_balance: newBalance,
            subscription_status: 'active'
          })
          .eq('id', payment.user_id);
      }

      // 4. 크레딧 거래 내역 기록
      await supabase
        .from('credit_transactions')
        .insert({
          user_id: payment.user_id,
          amount: welcomeCredits,
          type: 'welcome_bonus',
          description: '빌더 계정 개설 웰컴 크레딧',
          created_at: new Date().toISOString()
        });
    }

    // 사용자 이메일 알림
    try {
      const userEmail = payment.users.email;
      const projectName = payment.projects.project_name;

      let emailSubject, emailHtml;

      if (action === 'confirm') {
        emailSubject = `[SSAL Works] 🎉 빌더 계정이 개설되었습니다! - ${projectName}`;
        emailHtml = `
          <div style="font-family: 'Pretendard', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #2563eb;">🎉 빌더 계정 개설이 완료되었습니다!</h2>
            <p>안녕하세요, <strong>${payment.users.display_name || '고객'}</strong>님</p>

            <div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #1e40af;">📋 계정 정보</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #64748b;">빌더 계정 ID</td><td style="padding: 8px 0; font-weight: bold; color: #2563eb;">${generatedBuilderId}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b;">프로젝트</td><td style="padding: 8px 0;">${projectName}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b;">입금액</td><td style="padding: 8px 0;">₩${payment.amount.toLocaleString()}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b;">입금자명</td><td style="padding: 8px 0;">${payment.depositor_name}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b;">확인일시</td><td style="padding: 8px 0;">${new Date().toLocaleString('ko-KR')}</td></tr>
              </table>
            </div>

            <div style="background: #ecfdf5; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #059669;">🎁 웰컴 혜택</h3>
              <p style="margin: 0;"><strong>₩50,000 크레딧</strong>이 지급되었습니다!</p>
              <p style="margin: 8px 0 0 0; color: #64748b; font-size: 14px;">AI Q&A (ChatGPT, Gemini, Perplexity) 이용에 사용하세요.</p>
            </div>

            ${memo ? `<p style="color: #64748b;"><strong>관리자 메모:</strong> ${memo}</p>` : ''}

            <p>이제 SSAL Works의 모든 기능을 이용하실 수 있습니다.</p>
            <p>감사합니다. 🙏</p>

            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">
            <p style="color: #94a3b8; font-size: 12px;">SSAL Works Team</p>
          </div>
        `;
      } else {
        emailSubject = `[SSAL Grid] 빌더 계정 개설비 입금 신청이 반려되었습니다 - ${projectName}`;
        emailHtml = `
          <h2>빌더 계정 개설비 입금 신청이 반려되었습니다</h2>
          <p>안녕하세요, ${payment.users.display_name || '고객'}님</p>
          <p><strong>프로젝트:</strong> ${projectName}</p>
          <p><strong>입금자명:</strong> ${payment.depositor_name}</p>
          <p><strong>반려일시:</strong> ${new Date().toLocaleString('ko-KR')}</p>
          ${memo ? `<p><strong>반려 사유:</strong> ${memo}</p>` : ''}
          <br>
          <p>자세한 사항은 고객센터로 문의해주세요.</p>
        `;
      }

      const emailResponse = await fetch(`${process.env.VERCEL_URL || 'http://localhost:3000'}/api/email/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: userEmail,
          subject: emailSubject,
          html: emailHtml
        })
      });

      if (!emailResponse.ok) {
        console.error('사용자 이메일 발송 실패:', await emailResponse.text());
      }
    } catch (emailError) {
      console.error('이메일 발송 오류:', emailError);
      // 이메일 발송 실패는 치명적이지 않으므로 계속 진행
    }

    return res.status(200).json({
      success: true,
      message: action === 'confirm'
        ? '빌더 계정이 개설되었습니다.'
        : '입금 신청이 반려되었습니다.',
      payment: {
        id: payment.id,
        status: newStatus,
        projectId: payment.project_id,
        projectName: payment.projects.project_name
      },
      ...(action === 'confirm' && {
        builder: {
          builderId: generatedBuilderId,
          welcomeCredits: 50000,
          subscriptionStatus: 'active'
        }
      })
    });

  } catch (error) {
    console.error('입금 확인 오류:', error);
    return res.status(500).json({
      error: '서버 오류가 발생했습니다.',
      details: error.message
    });
  }
}
