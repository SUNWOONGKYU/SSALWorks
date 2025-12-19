# API 키 보안 관리

## 요약
API 키는 .env에 저장하고 .gitignore에 추가. 프론트엔드에 민감한 키 노출 금지. 서버 측 또는 Edge Function을 통해서만 호출.

## 상세

### Edge Function이란?

서버 없이도 서버 역할을 하는 코드. Supabase/Vercel에서 제공하며, API 키를 안전하게 보관하고 외부 API를 호출할 수 있다.

```
[브라우저] → [Edge Function] → [외부 API (OpenAI 등)]
                   ↑
            API 키는 여기에만 저장
            (브라우저에서 볼 수 없음)
```

### 키 종류별 관리

| 키 종류 | 노출 가능 | 저장 위치 | 이유 |
|---------|:--------:|----------|------|
| Supabase anon key | O | 프론트엔드 | RLS가 보호 |
| Supabase service_role | X | 서버 전용 | RLS 우회 가능 |
| OpenAI API key | X | 서버 전용 | 과금 발생 |
| 결제 API key | X | 서버 전용 | 금융 정보 |

### Edge Function 환경변수 설정

```bash
# Supabase Edge Function에 비밀 키 설정
supabase secrets set OPENAI_API_KEY=sk-xxx

# 설정된 비밀 키 확인
supabase secrets list
```

### Edge Function 코드 예시

```typescript
// supabase/functions/ai-chat/index.ts
const apiKey = Deno.env.get('OPENAI_API_KEY');  // 서버에서만 접근 가능

const response = await fetch('https://api.openai.com/v1/chat', {
  headers: { 'Authorization': `Bearer ${apiKey}` }
});
```

### 키 노출 시 대응
1. 즉시 해당 키 비활성화 (서비스 대시보드에서)
2. 새 키 발급
3. 환경변수 업데이트
4. 배포 재실행

---
📚 더 자세히: `환경변수_관리_베스트_프랙티스.md`
