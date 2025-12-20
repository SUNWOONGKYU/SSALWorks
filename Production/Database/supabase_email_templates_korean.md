# Supabase 이메일 템플릿 (한글)

> **적용 방법**: Supabase Dashboard → Authentication → Email Templates

---

## 1. Confirm signup (회원가입 인증)

**Subject:**
```
SSALWorks 회원가입 인증
```

**Body:**
```html
<h2>SSALWorks에 오신 것을 환영합니다!</h2>

<p>안녕하세요,</p>

<p>SSALWorks 회원가입을 완료하려면 아래 버튼을 클릭해주세요.</p>

<p>
  <a href="{{ .ConfirmationURL }}" style="display: inline-block; padding: 12px 24px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">
    이메일 인증하기
  </a>
</p>

<p>버튼이 작동하지 않으면 아래 링크를 복사하여 브라우저에 붙여넣으세요:</p>
<p style="word-break: break-all; color: #666;">{{ .ConfirmationURL }}</p>

<hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">

<p style="color: #888; font-size: 12px;">
  본 메일을 요청하지 않으셨다면 무시해주세요.<br>
  SSALWorks 팀 드림
</p>
```

---

## 2. Reset password (비밀번호 재설정)

**Subject:**
```
SSALWorks 비밀번호 재설정
```

**Body:**
```html
<h2>비밀번호 재설정</h2>

<p>안녕하세요,</p>

<p>비밀번호 재설정을 요청하셨습니다. 아래 버튼을 클릭하여 새 비밀번호를 설정해주세요.</p>

<p>
  <a href="{{ .ConfirmationURL }}" style="display: inline-block; padding: 12px 24px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">
    비밀번호 재설정
  </a>
</p>

<p>버튼이 작동하지 않으면 아래 링크를 복사하여 브라우저에 붙여넣으세요:</p>
<p style="word-break: break-all; color: #666;">{{ .ConfirmationURL }}</p>

<p style="color: #e74c3c; font-size: 12px;">⚠️ 이 링크는 1시간 후 만료됩니다.</p>

<hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">

<p style="color: #888; font-size: 12px;">
  비밀번호 재설정을 요청하지 않으셨다면 본 메일을 무시해주세요.<br>
  계정 보안에 문제가 있다고 생각되시면 즉시 비밀번호를 변경해주세요.<br>
  SSALWorks 팀 드림
</p>
```

---

## 3. Magic Link (매직 링크 로그인)

**Subject:**
```
SSALWorks 로그인 링크
```

**Body:**
```html
<h2>로그인 링크</h2>

<p>안녕하세요,</p>

<p>SSALWorks 로그인 링크입니다. 아래 버튼을 클릭하여 로그인하세요.</p>

<p>
  <a href="{{ .ConfirmationURL }}" style="display: inline-block; padding: 12px 24px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">
    로그인하기
  </a>
</p>

<p>버튼이 작동하지 않으면 아래 링크를 복사하여 브라우저에 붙여넣으세요:</p>
<p style="word-break: break-all; color: #666;">{{ .ConfirmationURL }}</p>

<p style="color: #e74c3c; font-size: 12px;">⚠️ 이 링크는 1시간 후 만료됩니다.</p>

<hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">

<p style="color: #888; font-size: 12px;">
  로그인을 요청하지 않으셨다면 본 메일을 무시해주세요.<br>
  SSALWorks 팀 드림
</p>
```

---

## 4. Change Email Address (이메일 변경)

**Subject:**
```
SSALWorks 이메일 변경 확인
```

**Body:**
```html
<h2>이메일 주소 변경</h2>

<p>안녕하세요,</p>

<p>이메일 주소 변경을 요청하셨습니다. 아래 버튼을 클릭하여 새 이메일 주소를 확인해주세요.</p>

<p>
  <a href="{{ .ConfirmationURL }}" style="display: inline-block; padding: 12px 24px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">
    이메일 변경 확인
  </a>
</p>

<p>버튼이 작동하지 않으면 아래 링크를 복사하여 브라우저에 붙여넣으세요:</p>
<p style="word-break: break-all; color: #666;">{{ .ConfirmationURL }}</p>

<hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">

<p style="color: #888; font-size: 12px;">
  이메일 변경을 요청하지 않으셨다면 즉시 계정을 확인해주세요.<br>
  SSALWorks 팀 드림
</p>
```

---

## 5. Invite user (사용자 초대)

**Subject:**
```
SSALWorks에 초대되었습니다
```

**Body:**
```html
<h2>SSALWorks 초대</h2>

<p>안녕하세요,</p>

<p>SSALWorks에 초대되었습니다! 아래 버튼을 클릭하여 계정을 활성화하세요.</p>

<p>
  <a href="{{ .ConfirmationURL }}" style="display: inline-block; padding: 12px 24px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">
    초대 수락하기
  </a>
</p>

<p>버튼이 작동하지 않으면 아래 링크를 복사하여 브라우저에 붙여넣으세요:</p>
<p style="word-break: break-all; color: #666;">{{ .ConfirmationURL }}</p>

<hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">

<p style="color: #888; font-size: 12px;">
  SSALWorks 팀 드림
</p>
```

---

## 적용 순서

1. **Supabase Dashboard 접속**: https://supabase.com/dashboard
2. **프로젝트 선택**: zwjmfewyshhwpgwdtrus
3. **Authentication → Email Templates** 이동
4. 각 템플릿 선택 후 Subject와 Body 내용 붙여넣기
5. **Save** 클릭

---

**작성일**: 2025-12-20
