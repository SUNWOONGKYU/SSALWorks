# API 키 보안 관리

## 요약
API 키는 .env에 저장하고 .gitignore에 추가. 프론트엔드에 민감한 키 노출 금지. 서버 측 또는 Edge Function을 통해서만 호출.

## 상세

### 키 종류별 관리

| 키 종류 | 노출 가능 여부 | 저장 위치 |
|---------|--------------|----------|
| Supabase anon key | O (RLS 보호) | 프론트엔드 |
| Supabase service_role | X | 서버 전용 |
| OpenAI API key | X | 서버 전용 |
| 결제 API key | X | 서버 전용 |

### 안전한 API 호출 패턴

```
[프론트엔드] → [Edge Function] → [외부 API]
                    ↑
              API 키는 여기서만
```

### Edge Function 환경변수 설정

```bash
supabase secrets set OPENAI_API_KEY=sk-xxx
```

### 키 노출 시 대응
1. 즉시 해당 키 비활성화
2. 새 키 발급
3. 환경변수 업데이트
4. 배포 재실행

---
📚 더 자세히: `환경변수_관리_베스트_프랙티스.md`
