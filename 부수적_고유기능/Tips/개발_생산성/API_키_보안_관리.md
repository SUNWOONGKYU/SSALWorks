# API 키 보안 관리

## 질문
API 키를 안전하게 관리하려면 어떻게 해야 하나요?

## 답변

### 절대 하지 말아야 할 것

❌ **금지 사항:**
1. API 키를 코드에 직접 작성 (하드코딩)
2. `.env` 파일을 Git에 커밋
3. API 키를 채팅/이메일로 공유
4. 클라이언트 코드에 Secret Key 노출

### 올바른 API 키 관리

**1. 환경변수 사용**
```javascript
// ❌ 잘못된 방법
const API_KEY = 'sk-ant-api03-xxx';

// ✅ 올바른 방법
const API_KEY = process.env.ANTHROPIC_API_KEY;
```

**2. .gitignore 설정**
```gitignore
# 환경변수 파일
.env
.env.local
.env.*.local
```

**3. Vercel 환경변수 (프로덕션)**
```
Vercel Dashboard → Settings → Environment Variables
- ANTHROPIC_API_KEY: sk-ant-xxx
- SUPABASE_SERVICE_ROLE_KEY: eyJxxx
```

### 키 종류별 노출 가능 여부

| 키 종류 | 클라이언트 | 서버 | 비고 |
|--------|----------|------|------|
| SUPABASE_URL | ✅ OK | ✅ OK | 공개 가능 |
| SUPABASE_ANON_KEY | ✅ OK | ✅ OK | RLS로 보호됨 |
| SERVICE_ROLE_KEY | ❌ 금지 | ✅ OK | 모든 권한 |
| TOSS_SECRET_KEY | ❌ 금지 | ✅ OK | 결제 권한 |
| ANTHROPIC_API_KEY | ❌ 금지 | ✅ OK | 과금 발생 |

### 키가 노출되었을 때

1. **즉시 키 비활성화**
   - 해당 서비스 대시보드에서 키 삭제/회전
2. **새 키 발급**
3. **환경변수 업데이트**
4. **사용 내역 확인**
   - 비정상적인 사용이 있었는지 확인

### 관련 문서
- `S1_개발_준비/Backend_Infra/Environment/ENV_SETUP.md`
