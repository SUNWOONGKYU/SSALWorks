// Task ID: S2BA1
// Google OAuth 콜백 엔드포인트
// Google 인증 후 콜백을 처리하고 세션을 설정

import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  // CORS 헤더 설정
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Preflight 요청 처리
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // GET 메서드만 허용
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed. Use GET.' });
  }

  try {
    // URL에서 코드와 에러 파라미터 추출
    const { code, error: authError, error_description } = req.query;

    // OAuth 인증 실패 확인
    if (authError) {
      console.error('Google OAuth 에러:', authError, error_description);

      // 프론트엔드로 에러와 함께 리다이렉트
      const errorRedirectUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/login?error=${encodeURIComponent(authError)}&error_description=${encodeURIComponent(error_description || 'Unknown error')}`;
      return res.redirect(302, errorRedirectUrl);
    }

    // 코드가 없는 경우
    if (!code) {
      const errorRedirectUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/login?error=missing_code`;
      return res.redirect(302, errorRedirectUrl);
    }

    // Supabase 클라이언트 초기화
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    );

    // OAuth 코드를 세션으로 교환
    const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError) {
      console.error('코드 교환 오류:', exchangeError);

      const errorRedirectUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/login?error=exchange_failed&error_description=${encodeURIComponent(exchangeError.message)}`;
      return res.redirect(302, errorRedirectUrl);
    }

    // 세션 확인
    if (!data?.session) {
      const errorRedirectUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/login?error=no_session`;
      return res.redirect(302, errorRedirectUrl);
    }

    const { session, user } = data;

    // 세션을 쿠키에 저장 (HttpOnly, Secure)
    const maxAge = 60 * 60 * 24 * 7; // 7일
    res.setHeader('Set-Cookie', [
      `sb-access-token=${session.access_token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`,
      `sb-refresh-token=${session.refresh_token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`,
    ]);

    // users 테이블에 사용자 정보 업데이트/삽입 (upsert)
    try {
      const { error: upsertError } = await supabase
        .from('users')
        .upsert({
          user_id: user.id,
          email: user.email,
          name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0],
          profile_image: user.user_metadata?.avatar_url || user.user_metadata?.picture || null,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id'
        });

      if (upsertError) {
        console.error('사용자 정보 업데이트 실패:', upsertError);
        // 오류를 로그하지만 로그인은 성공으로 처리
      }
    } catch (dbError) {
      console.error('DB 업데이트 중 예외 발생:', dbError);
      // 로그만 남기고 계속 진행
    }

    // 로그인 성공 - 메인 페이지로 리다이렉트
    const successRedirectUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/`;
    return res.redirect(302, successRedirectUrl);

  } catch (err) {
    console.error('콜백 처리 중 서버 오류:', err);

    const errorRedirectUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/login?error=server_error&error_description=${encodeURIComponent(err.message)}`;
    return res.redirect(302, errorRedirectUrl);
  }
}
