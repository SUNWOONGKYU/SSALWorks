// Task ID: S2BA2
// ================================================================
// S2BA2: 비밀번호 재설정 이메일 발송 API
// ================================================================
// 작성일: 2025-12-14
// 목적: 비밀번호 재설정 이메일 발송
// ================================================================

const { verifyAuth } = require('../../../Security/api/lib/auth/middleware');
const { sendPasswordResetEmail } = require('../../../Backend_Infra/api/lib/email');

/**
 * 비밀번호 재설정 이메일 발송 API
 * @method POST
 * @auth Bearer Token (Required) 또는 내부 호출용
 * @body {string} to - 수신자 이메일
 * @body {string} name - 사용자 이름
 * @body {string} resetToken - 재설정 토큰
 * @body {number} [expiryMinutes=30] - 토큰 유효 시간 (분)
 * @returns {Object} { success, data: { id } }
 */
module.exports = async (req, res) => {
  // ================================================================
  // 1. HTTP 메서드 검증
  // ================================================================
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: {
        code: 'METHOD_NOT_ALLOWED',
        message: 'Only POST method is allowed'
      }
    });
  }

  // ================================================================
  // 2. 인증 토큰 검증 (선택적 - 내부 호출 지원)
  // ================================================================
  // 내부 호출인지 확인 (특정 헤더 또는 IP 기반 검증 가능)
  const isInternalCall = req.headers['x-internal-call'] === process.env.INTERNAL_API_SECRET;

  if (!isInternalCall) {
    // 외부 호출인 경우 인증 필요
    const { user, error: authError } = await verifyAuth(req);

    if (authError) {
      return res.status(401).json({
        error: authError
      });
    }
  }

  // ================================================================
  // 3. 요청 데이터 검증
  // ================================================================
  const { to, name, resetToken, expiryMinutes = 30 } = req.body;

  // 필수 필드 검증
  if (!to || !name || !resetToken) {
    return res.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Missing required fields: to, name, resetToken'
      }
    });
  }

  // 이메일 형식 검증
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(to)) {
    return res.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid email format'
      }
    });
  }

  // 토큰 검증 (최소 길이 확인)
  if (resetToken.length < 20) {
    return res.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid reset token format'
      }
    });
  }

  // ================================================================
  // 4. 비밀번호 재설정 이메일 발송
  // ================================================================
  try {
    // 재설정 URL 생성
    const resetUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password?token=${resetToken}`;

    const result = await sendPasswordResetEmail(to, {
      name,
      resetUrl,
      expiryMinutes
    });

    // 발송 성공
    if (result.success) {
      return res.status(200).json({
        success: true,
        data: {
          id: result.data.id,
          to,
          name,
          expiresIn: `${expiryMinutes} minutes`
        },
        message: 'Password reset email sent successfully'
      });
    }

    // 발송 실패
    return res.status(500).json({
      error: {
        code: 'EMAIL_SEND_ERROR',
        message: result.error || 'Failed to send password reset email'
      }
    });

  } catch (error) {
    console.error('Password reset email send error:', error);
    return res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An unexpected error occurred while sending password reset email'
      }
    });
  }
};
