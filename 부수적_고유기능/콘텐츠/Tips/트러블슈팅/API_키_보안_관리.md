# API 키 보안 관리

## 핵심 요약

API 키는 .env 파일에 저장하고 .gitignore에 추가하세요. 프론트엔드 코드에 API 키를 직접 넣지 마세요. 서버 측에서만 사용하거나 Supabase Edge Functions를 통해 호출하세요.

## API 키 보안이 중요한 이유

### 노출 시 위험

| 위험 | 결과 |
|------|------|
| 무단 사용 | 대규모 과금 청구 |
| 서비스 남용 | API 할당량 소진 |
| 데이터 유출 | 사용자 정보 노출 |
| 서비스 차단 | API 제공업체에서 차단 |
| 평판 손상 | 보안 사고로 인한 신뢰 하락 |

### 실제 사고 사례

```
❌ GitHub에 API 키 푸시
→ 봇이 몇 분 내에 스캔하여 키 탈취
→ AWS 키 노출 시 수천 달러 청구된 사례 다수

❌ 프론트엔드 코드에 API 키 노출
→ 개발자 도구에서 누구나 확인 가능
→ 악의적 사용자가 키 탈취하여 남용
```

## API 키 관리 원칙

### 기본 원칙

```
1. 코드에 API 키 직접 작성 금지
2. .env 파일에 저장
3. .gitignore에 .env 추가
4. 프론트엔드에 민감한 키 노출 금지
5. 정기적으로 키 교체
```

### 키 종류별 관리

| 키 종류 | 저장 위치 | 노출 가능 여부 |
|---------|----------|---------------|
| Supabase anon key | 프론트엔드 가능 | ✅ 공개 가능 (RLS로 보호) |
| Supabase service_role key | 서버 전용 | ❌ 절대 노출 금지 |
| OpenAI API key | 서버 전용 | ❌ 절대 노출 금지 |
| 결제 API key | 서버 전용 | ❌ 절대 노출 금지 |
| OAuth 시크릿 | 서버 전용 | ❌ 절대 노출 금지 |

## .env 파일 설정

### 파일 구조

```
프로젝트 루트/
├── .env.example       # Git에 커밋 (빈 값)
├── .env.local         # 로컬 개발용 (gitignore)
├── .env.production    # 프로덕션용 (gitignore)
└── .gitignore
```

### .env.example 작성

```bash
# .env.example (Git에 커밋)
# 이 파일을 복사하여 .env.local 생성 후 실제 값 입력

# Supabase
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# OpenAI
OPENAI_API_KEY=

# 결제 (토스)
TOSS_CLIENT_KEY=
TOSS_SECRET_KEY=

# 이메일 (Resend)
RESEND_API_KEY=
```

### .env.local 작성

```bash
# .env.local (Git에 커밋하지 않음)

# Supabase
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJ...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJ...

# OpenAI
OPENAI_API_KEY=sk-...

# 결제 (토스)
TOSS_CLIENT_KEY=test_ck_...
TOSS_SECRET_KEY=test_sk_...

# 이메일 (Resend)
RESEND_API_KEY=re_...
```

### .gitignore 설정

```gitignore
# 환경변수 파일
.env
.env.local
.env.*.local
.env.production
.env.development

# 예외: .env.example은 커밋
!.env.example
```

## 프론트엔드 vs 서버 구분

### 프론트엔드에서 사용 가능한 키

```javascript
// ✅ 프론트엔드에서 사용 가능 (Supabase anon key)
// RLS(Row Level Security)로 보호되므로 안전

const supabase = createClient(
  'https://xxx.supabase.co',    // 공개 가능
  'eyJhbGciOiJ...'              // anon key - 공개 가능
);
```

### 서버에서만 사용해야 하는 키

```javascript
// ❌ 프론트엔드에서 절대 사용 금지

// OpenAI API
const openai = new OpenAI({
  apiKey: 'sk-...'  // 서버에서만!
});

// Supabase Admin (service_role)
const supabaseAdmin = createClient(
  url,
  'service_role_key'  // 서버에서만!
);
```

## Supabase Edge Functions 활용

### 민감한 API 호출 패턴

```
[프론트엔드] → [Supabase Edge Function] → [외부 API]
                    ↑
              API 키는 여기서만 사용
```

### Edge Function 예시

```typescript
// supabase/functions/call-openai/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

serve(async (req) => {
  const { prompt } = await req.json()

  // API 키는 Edge Function 환경변수에서 가져옴
  const apiKey = Deno.env.get('OPENAI_API_KEY')

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  const data = await response.json()
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  })
})
```

### 프론트엔드에서 호출

```javascript
// 프론트엔드 - API 키 노출 없이 안전하게 호출
const { data, error } = await supabase.functions.invoke('call-openai', {
  body: { prompt: '안녕하세요' }
})
```

## 환경별 키 관리

### Vercel 환경변수 설정

```
1. Vercel Dashboard → 프로젝트 → Settings → Environment Variables
2. 각 환경(Production, Preview, Development)별로 키 설정
3. 민감한 키는 "Sensitive" 체크
```

### Supabase Edge Function 환경변수

```bash
# Supabase CLI로 시크릿 설정
supabase secrets set OPENAI_API_KEY=sk-xxx

# 또는 Dashboard에서 설정
# Supabase Dashboard → Edge Functions → Secrets
```

## 키 노출 시 대응

### 즉시 조치

```
1. 즉시 해당 키 비활성화/삭제
2. 새 키 발급
3. 환경변수 업데이트
4. 배포 재실행
5. 사용량/청구서 확인
6. Git 히스토리에서 키 제거 (git filter-branch 또는 BFG)
```

### Git 히스토리에서 키 제거

```bash
# BFG Repo-Cleaner 사용 (권장)
bfg --replace-text passwords.txt my-repo.git

# 또는 git filter-branch
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch path/to/file" \
  --prune-empty --tag-name-filter cat -- --all
```

## Claude Code에게 요청하기

### API 키 보안 검토 요청

```
"현재 코드에서 API 키가 노출된 부분 있는지 검토해줘"

"프론트엔드에 민감한 키가 있는지 확인해줘"
```

### Edge Function 작성 요청

```
"OpenAI API 호출을 Edge Function으로 감싸줘.
프론트엔드에서 API 키 없이 호출하도록."
```

### 환경변수 설정 요청

```
".env.example 파일 만들어줘.
필요한 환경변수 목록 정리해서."
```

## 체크리스트

### API 키 보안 체크리스트

- [ ] 모든 API 키가 .env 파일에 있는가?
- [ ] .env 파일이 .gitignore에 추가되었는가?
- [ ] .env.example이 Git에 커밋되었는가?
- [ ] 프론트엔드에 민감한 키가 없는가?
- [ ] service_role 키가 서버에서만 사용되는가?
- [ ] 외부 API 호출이 Edge Function을 통하는가?
- [ ] Vercel/Supabase 환경변수가 설정되었는가?

### 배포 전 확인

- [ ] 코드에 하드코딩된 키가 없는가?
- [ ] Git 히스토리에 키가 남아있지 않은가?
- [ ] 프로덕션 환경변수가 올바르게 설정되었는가?

## 주의사항

- API 키를 Slack, 이메일, 메신저로 공유 금지
- 스크린샷에 API 키 노출 주의
- 개발자 도구 콘솔에 키 출력하지 않기
- 에러 메시지에 API 키 포함하지 않기
- 정기적으로 키 교체하기 (최소 분기별)
- 사용하지 않는 키는 즉시 삭제

