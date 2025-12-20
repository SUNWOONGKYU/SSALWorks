# 07. Supabase 연결 규칙

> Supabase 연결 시 준수 사항

---

## 환경변수 위치

```
📁 P3_프로토타입_제작/Database/.env
```

---

## 환경변수 목록

| 변수명 | 용도 |
|--------|------|
| `SUPABASE_URL` | 프로젝트 URL |
| `SUPABASE_ANON_KEY` | 공개 키 (클라이언트용) |
| `SUPABASE_SERVICE_ROLE_KEY` | 관리자 키 (서버용) |

---

## 테이블명

| 용도 | 테이블명 |
|------|---------|
| Task 관리 | `ssalworks_tasks` |
| Stage 검증 | `stage_verification` |

---

## 스크립트 작성 예시

```javascript
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const fs = require('fs');

// .env 파일에서 환경변수 읽기
const envPath = path.join(__dirname, 'P3_프로토타입_제작/Database/.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) envVars[match[1].trim()] = match[2].trim();
});

const supabase = createClient(
  envVars.SUPABASE_URL,
  envVars.SUPABASE_ANON_KEY
);
```

---

## 체크리스트

- [ ] .env 파일에서 환경변수를 읽었는가?
- [ ] 테이블명이 `ssalworks_tasks`인가? (`tasks` 아님)
- [ ] 하드코딩된 URL/KEY를 사용하지 않았는가?
