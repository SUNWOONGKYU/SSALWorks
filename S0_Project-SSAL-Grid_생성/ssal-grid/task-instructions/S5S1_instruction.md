# Task Instruction - S5S1

---

## 📌 필수 참조 규칙 파일 (2025-12-19)

> **⚠️ 작업 전 반드시 아래 규칙 파일을 확인하세요!**

| 규칙 파일 | 내용 | 참조 시점 |
|----------|------|----------|
| `.claude/rules/01_file-naming.md` | 파일 명명 규칙 | 파일 생성 시 |
| `.claude/rules/02_save-location.md` | 저장 위치 규칙 | 파일 저장 시 |
| `.claude/rules/03_area-stage.md` | Area/Stage 매핑 | 폴더 선택 시 |
| `.claude/rules/05_execution-process.md` | 6단계 실행 프로세스 | 작업 전체 |



## Task ID
S5S1

## Task Name
보안 점검 및 패치

## Task Goal
프로덕션 환경의 SSL 인증서 및 보안 헤더 설정

## Prerequisites (Dependencies)
- S5O1 (도메인 연결) 완료
- S5M1 (출시 체크리스트) 완료

## Specific Instructions

### 1. Vercel SSL 자동 설정 확인
```
Vercel은 자동으로 SSL 인증서를 제공:
- Let's Encrypt 인증서 자동 발급
- 자동 갱신
- HTTPS 강제 리다이렉트

확인 방법:
1. Vercel Dashboard > Project > Settings > Domains
2. SSL Certificate 상태 확인 (녹색 자물쇠)
```

### 2. 보안 헤더 설정
- 위치: `vercel.json`

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains"
        }
      ]
    },
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "no-store, max-age=0"
        }
      ]
    }
  ]
}
```

### 3. Content Security Policy (CSP)
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' https://js.tosspayments.com https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://*.supabase.co https://api.anthropic.com https://api.tosspayments.com; frame-src https://js.tosspayments.com;"
        }
      ]
    }
  ]
}
```

### 4. CORS 설정
- 위치: `api/lib/cors.js`

```javascript
// api/lib/cors.js
const ALLOWED_ORIGINS = [
  'https://ssalworks.com',
  'https://www.ssalworks.com',
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : null
].filter(Boolean);

function cors(handler) {
  return async (req, res) => {
    const origin = req.headers.origin;

    // Origin 검증
    if (origin && ALLOWED_ORIGINS.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Max-Age', '86400');

    // Preflight 요청 처리
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    return handler(req, res);
  };
}

module.exports = { cors, ALLOWED_ORIGINS };
```

### 5. API 보안 미들웨어
- 위치: `api/lib/security.js`

```javascript
// api/lib/security.js

// IP Rate Limiting
const ipRequestCounts = new Map();

function ipRateLimit(req, maxRequests = 100, windowMs = 60000) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const now = Date.now();

  let record = ipRequestCounts.get(ip);
  if (!record || now - record.windowStart > windowMs) {
    record = { windowStart: now, count: 0 };
  }

  record.count++;
  ipRequestCounts.set(ip, record);

  if (record.count > maxRequests) {
    return {
      allowed: false,
      retryAfter: Math.ceil((record.windowStart + windowMs - now) / 1000)
    };
  }

  return { allowed: true };
}

// 입력 검증
function sanitizeInput(input) {
  if (typeof input !== 'string') return input;

  // XSS 방지
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// SQL Injection 검사
function checkSqlInjection(input) {
  if (typeof input !== 'string') return false;

  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER)\b)/i,
    /(--|;|\/\*|\*\/)/,
    /('|")\s*(OR|AND)\s*('|")/i
  ];

  return sqlPatterns.some(pattern => pattern.test(input));
}

module.exports = { ipRateLimit, sanitizeInput, checkSqlInjection };
```

### 6. 환경 변수 보안
```
보안 체크리스트:
- [ ] .env 파일이 .gitignore에 포함
- [ ] 프로덕션 키는 Vercel 환경 변수에만 저장
- [ ] API 키 노출 로그 없음
- [ ] 클라이언트에 서버 키 노출 없음

환경 변수 검증:
- SUPABASE_SERVICE_ROLE_KEY: 서버 전용
- TOSS_SECRET_KEY: 서버 전용
- ANTHROPIC_API_KEY: 서버 전용
```

### 7. 보안 점검 스크립트
- 위치: `scripts/security-check.js`

```javascript
// scripts/security-check.js
const fs = require('fs');
const path = require('path');

const SENSITIVE_PATTERNS = [
  /sk-ant-api/i,        // Anthropic API Key
  /test_sk_|live_sk_/i, // Toss Secret Key
  /eyJ[a-zA-Z0-9_-]+/,  // JWT Token
  /service_role/i        // Supabase Service Role
];

function scanFile(filepath) {
  const content = fs.readFileSync(filepath, 'utf8');
  const issues = [];

  SENSITIVE_PATTERNS.forEach(pattern => {
    if (pattern.test(content)) {
      issues.push({
        file: filepath,
        pattern: pattern.toString(),
        message: 'Potential sensitive data found'
      });
    }
  });

  return issues;
}

function scanDirectory(dir, extensions = ['.js', '.ts', '.html', '.json']) {
  const issues = [];

  function scan(currentDir) {
    const files = fs.readdirSync(currentDir);

    files.forEach(file => {
      if (file.startsWith('.') || file === 'node_modules') return;

      const filepath = path.join(currentDir, file);
      const stat = fs.statSync(filepath);

      if (stat.isDirectory()) {
        scan(filepath);
      } else if (extensions.some(ext => file.endsWith(ext))) {
        issues.push(...scanFile(filepath));
      }
    });
  }

  scan(dir);
  return issues;
}

// 실행
const issues = scanDirectory('./');
if (issues.length > 0) {
  console.error('⚠️ Security issues found:');
  issues.forEach(issue => console.error(`  - ${issue.file}: ${issue.message}`));
  process.exit(1);
} else {
  console.log('✅ No security issues found');
}
```

### 8. 보안 헤더 테스트
```bash
# 보안 헤더 확인
curl -I https://ssalworks.com

# 기대 결과:
# X-Content-Type-Options: nosniff
# X-Frame-Options: DENY
# Strict-Transport-Security: max-age=31536000
# Content-Security-Policy: ...
```

## Expected Output Files
- `vercel.json` (보안 헤더 설정)
- `api/lib/cors.js`
- `api/lib/security.js`
- `scripts/security-check.js`

## Completion Criteria
- [ ] SSL 인증서 활성화 확인
- [ ] 보안 헤더 설정
- [ ] CSP 설정
- [ ] CORS 설정
- [ ] Rate Limiting 구현
- [ ] 입력 검증 구현
- [ ] 보안 점검 스크립트 실행 통과
- [ ] 환경 변수 보안 확인

## Tech Stack
- Vercel
- Node.js

## Tools
- Write, Read
- Bash (curl, 보안 테스트)

## Execution Type
AI-Only

## Remarks
- Vercel은 SSL 자동 관리
- CSP는 서비스에 맞게 조정 필요
- 정기적인 보안 점검 권장
- OWASP Top 10 참고

---

## ⚠️ 작업 결과물 저장 2대 규칙

> **이 규칙은 반드시 준수하세요!**

### 제1 규칙: Stage + Area 폴더에 저장
- Task ID의 Stage와 Area에 해당하는 폴더에 저장
- 예: S1S1 → `S1_개발_준비/Security/`
- 예: S2F1 → `S2_개발-1차/Frontend/`

### 제2 규칙: Production 코드는 이중 저장
- Frontend, Database, Backend_APIs 코드는 Stage 폴더 + Production 폴더 둘 다 저장
- 문서(Documentation, Security, Testing, DevOps)는 Stage 폴더에만 저장

**Area 폴더 매핑:** M→Documentation, F→Frontend, BI→Backend_Infra, BA→Backend_APIs, D→Database, S→Security, T→Testing, O→DevOps, E→External, C→Content

