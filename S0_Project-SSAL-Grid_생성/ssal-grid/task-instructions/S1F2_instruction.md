# Task Instruction - S1F2

## Task ID
S1F2

## Task Name
vercel.json 설정

## Task Goal
Vercel 배포 설정, 라우팅, 보안 헤더, CORS 설정을 위한 vercel.json 파일 작성

## Prerequisites (Dependencies)
- S1F1 (Vercel 프로젝트 설정) 완료

## Specific Instructions

### 1. 파일 생성
- 위치: `P3_프로토타입_제작/Frontend/Prototype/vercel.json`

### 2. 기본 설정
```json
{
  "version": 2,
  "buildCommand": "",
  "outputDirectory": ".",
  "cleanUrls": true,
  "trailingSlash": false
}
```

### 3. 보안 헤더 설정
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    }
  ]
}
```

### 4. API 라우팅 설정
```json
{
  "rewrites": [
    { "source": "/api/:path*", "destination": "/api/:path*" }
  ]
}
```

### 5. CORS 설정 (API용)
```json
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Origin", "value": "*" },
        { "key": "Access-Control-Allow-Methods", "value": "GET, POST, PUT, DELETE, OPTIONS" },
        { "key": "Access-Control-Allow-Headers", "value": "Content-Type, Authorization" }
      ]
    }
  ]
}
```

### 6. 정적 파일 캐싱
```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

## Expected Output Files
- `P3_프로토타입_제작/Frontend/Prototype/vercel.json`

## Completion Criteria
- [ ] vercel.json 파일 생성
- [ ] 보안 헤더 설정 완료
- [ ] CORS 설정 완료
- [ ] 라우팅 설정 완료
- [ ] Vercel 재배포 후 헤더 확인 (curl -I)
- [ ] JSON 문법 검증

## Tech Stack
- Vercel Configuration
- JSON

## Tools
- Write, Read
- Bash (curl로 헤더 확인)

## Execution Type
AI-Only

## Remarks
- CORS는 프로덕션에서 도메인 제한 필요 (S5O2 이후)
- 보안 헤더는 OWASP 권장사항 기반
