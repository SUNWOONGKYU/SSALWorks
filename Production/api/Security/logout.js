// Task ID: S2BA1
// 로그아웃 엔드포인트
// Supabase 세션을 종료하고 쿠키를 삭제

import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  // CORS 헤더 설정
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  // Preflight 요청 처리
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // POST 메서드만 허용
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    // 쿠키에서 액세스 토큰 추출
    const cookies = req.headers.cookie || '';
    const accessTokenMatch = cookies.match(/sb-access-token=([^;]+)/);
    const accessToken = accessTokenMatch ? accessTokenMatch[1] : null;

    // Supabase 클라이언트 초기화
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    );

    // 액세스 토큰이 있으면 세션 종료
    if (accessToken) {
      // 사용자 세션으로 클라이언트 설정
      const { data: { user } } = await supabase.auth.getUser(accessToken);

      if (user) {
        // Supabase 세션 종료
        const { error: signOutError } = await supabase.auth.signOut();

        if (signOutError) {
          console.error('Supabase 로그아웃 오류:', signOutError);
          // 오류가 있어도 쿠키는 삭제
        }
      }
    }

    // 쿠키 삭제 (만료 시간을 과거로 설정)
    res.setHeader('Set-Cookie', [
      'sb-access-token=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0',
      'sb-refresh-token=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0',
    ]);

    // 성공 응답
    return res.status(200).json({
      success: true,
      message: '로그아웃 성공',
    });

  } catch (err) {
    console.error('로그아웃 중 서버 오류:', err);

    // 에러가 있어도 쿠키는 삭제
    res.setHeader('Set-Cookie', [
      'sb-access-token=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0',
      'sb-refresh-token=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0',
    ]);

    return res.status(500).json({
      error: 'Internal server error',
      details: err.message,
    });
  }
}
