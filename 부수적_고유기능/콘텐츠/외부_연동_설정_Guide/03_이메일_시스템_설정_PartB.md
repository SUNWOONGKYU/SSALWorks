# 이메일 시스템 설정 가이드 (Part B - Claude Code용)

> 기술 참조 문서: 환경변수, API 구현, 테이블 동기화, 트러블슈팅

**대상**: Claude Code / 개발자
**전제조건**: Part A 완료 (Resend API Key, DKIM 인증, Supabase SMTP 연결)

---

## 1. 시스템 구조

```
사용자 (브라우저)
    ↓ 회원가입
Next.js/앱 (Vercel)
    ↓ API 요청
Supabase Auth
    ↓ SMTP 요청
Resend (SMTP)
    ↓ DKIM 검증 (DNS)
Whois (도메인 DNS)
    ↓ 이메일 발송
사용자 이메일
    ↓ 링크 클릭
앱 (/auth/callback)
    ↓ 세션 생성
로그인 완료
```

---

## 2. 환경변수 설정

### 2.1 로컬 개발 (.env.local)

```bash
# Supabase
SUPABASE_URL=https://[프로젝트ID].supabase.co
SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...

# Resend
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 2.2 Vercel 환경변수

```
| Key                       | Value                        | Environment |
|---------------------------|------------------------------|-------------|
| SUPABASE_URL              | https://xxx.supabase.co      | All         |
| SUPABASE_ANON_KEY         | eyJxxx...                    | All         |
| SUPABASE_SERVICE_ROLE_KEY | eyJxxx...                    | All         |
| RESEND_API_KEY            | re_xxx...                    | All         |
| NEXT_PUBLIC_SITE_URL      | https://www.ssalworks.ai.kr  | Production  |
```

---

## 3. auth.users ↔ users 테이블 동기화

### 3.1 문제: 로그인 실패

**증상**:
- 이메일 인증 완료 (auth.users에 email_confirmed_at 있음)
- 로그인 실패: "이메일 또는 비밀번호가 올바르지 않습니다"

**원인**: auth.users에는 존재하지만 users 테이블에는 없음

```sql
-- auth.users에는 존재
SELECT * FROM auth.users WHERE email = 'test@test.com';
-- ✅ 1 row

-- users 테이블에는 없음
SELECT * FROM users WHERE email = 'test@test.com';
-- ❌ 0 rows
```

### 3.2 회원가입 API에서 동기화

```typescript
export async function POST(request: NextRequest) {
  const { email, password, nickname } = await request.json();

  // 1. Supabase Auth에 사용자 생성
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name: nickname },
      emailRedirectTo: 'https://www.ssalworks.ai.kr/auth/callback',
    },
  });

  if (authError) {
    return NextResponse.json({ error: authError.message }, { status: 400 });
  }

  // 2. users 테이블에 프로필 생성 (중요!)
  const adminClient = createAdminClient();
  const { error: profileError } = await adminClient
    .from('users')
    .insert({
      user_id: authData.user.id,  // ⚠️ 컬럼명 확인! (id가 아니라 user_id)
      email,
      nickname,
      role: 'user',
      is_active: true,
    });

  // 3. users 테이블 삽입 실패 시 롤백 (필수!)
  if (profileError) {
    await adminClient.auth.admin.deleteUser(authData.user.id);
    return NextResponse.json({ error: '회원가입 실패' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
```

### 3.3 로그인 API에서 이중 안전장치

```typescript
export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  // 1. Supabase Auth 로그인
  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  // 2. users 테이블에서 프로필 조회
  const { data: userProfile } = await supabase
    .from('users')
    .select('*')
    .eq('user_id', authData.user.id)  // ⚠️ user_id로 조회!
    .single();

  // 3. 프로필 없으면 자동 생성 (이중 안전장치)
  if (!userProfile) {
    await supabase.from('users').insert({
      user_id: authData.user.id,
      email: authData.user.email,
      nickname: authData.user.email.split('@')[0],
      role: 'user',
      is_active: true,
    });
  }

  return NextResponse.json({ success: true, user: authData.user });
}
```

### 3.4 스키마 확인 쿼리

```sql
-- users 테이블 컬럼명 확인
SELECT column_name FROM information_schema.columns
WHERE table_name = 'users';

-- 결과: user_id, email, nickname, ... (id가 아님!)
```

---

## 4. 이메일 템플릿 변수

### 4.1 변수 비교

| 변수 | 동작 | emailRedirectTo 반영 |
|------|------|---------------------|
| `{{ .SiteURL }}` | Dashboard 설정값 그대로 | ❌ 무시함 |
| `{{ .ConfirmationURL }}` | Supabase 자동 생성 | ✅ 반영됨 |
| `{{ .RedirectTo }}` | emailRedirectTo 값 | ✅ 반영됨 |
| **하드코딩** | 직접 입력한 URL | N/A (가장 확실) |

### 4.2 권장 템플릿 (하드코딩)

```html
<a href="https://www.ssalworks.ai.kr/auth/callback?token_hash={{ .TokenHash }}&type=signup">
  이메일 인증하기
</a>
```

---

## 5. 트러블슈팅

### 문제 1: 이메일 링크가 잘못된 도메인

**증상**: `https://ssalworks.ai.kr/auth/callback` (www 없음)

**시도한 해결책 (모두 실패)**:
1. ❌ `NEXT_PUBLIC_SITE_URL` 환경변수 변경
2. ❌ Supabase Site URL 설정 변경
3. ❌ `emailRedirectTo` 하드코딩
4. ❌ Send Email Hook 구현

**최종 해결**: 템플릿에서 직접 하드코딩

### 문제 2: 인증 후 로그인 실패

**원인**: 잘못된 컬럼명 사용

```typescript
// ❌ 잘못된 코드
.insert({ id: authData.user.id, ... })

// ✅ 올바른 코드
.insert({ user_id: authData.user.id, ... })
```

### 문제 3: 이메일이 스팸으로 분류

**원인**: DKIM 인증 미완료

**해결**: Resend에서 DKIM TXT 레코드 → Whois DNS 고급설정 → Verify

### 문제 4: RESEND_API_KEY not set

**해결**:
1. `.env.local` 파일 존재 확인
2. API 키 복사 시 공백 확인
3. 개발 서버 재시작

### 문제 5: Send Email Hook 에러

**결론**: Send Email Hook은 사용하지 않음

**이유**:
- webhook 인증 문제
- 복잡도 증가
- 디버깅 어려움

**권장**: SMTP (Resend) + 템플릿 수정

---

## 6. 테스트 체크리스트

- [ ] 회원가입 → 이메일 발송 확인
- [ ] 이메일 링크 클릭 → 인증 완료
- [ ] 로그인 성공
- [ ] users 테이블에 데이터 생성 확인
- [ ] 스팸 폴더 아닌 받은편지함 도착 확인

---

## 7. 핵심 교훈

1. **이메일 템플릿은 하드코딩하라** (`{{ .SiteURL }}` 함정 조심)
2. **auth.users와 users 테이블을 항상 동기화하라** (롤백 로직 필수)
3. **Send Email Hook은 복잡도만 높인다** (SMTP + 템플릿으로 충분)

---

## 참고 문서

- [Supabase SMTP Configuration](https://supabase.com/docs/guides/auth/auth-smtp)
- [Supabase Email Templates](https://supabase.com/docs/guides/auth/auth-email-templates)
- [Resend Documentation](https://resend.com/docs)
