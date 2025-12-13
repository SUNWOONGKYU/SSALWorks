# Task Instruction - S5BA1

## Task ID
S5BA1

## Task Name
모니터링 API

## Task Goal
시스템 상태 및 에러 모니터링을 위한 Health Check API 구현

## Prerequisites (Dependencies)
- S5M1 (출시 체크리스트) 완료

## Specific Instructions

### 1. Health Check API
- 위치: `api/health.js`

```javascript
// api/health.js
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

module.exports = async (req, res) => {
  const startTime = Date.now();

  const healthStatus = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.APP_VERSION || '1.0.0',
    services: {}
  };

  // 1. Database 연결 체크
  try {
    const { error } = await supabase.from('health_check').select('id').limit(1);
    healthStatus.services.database = {
      status: error ? 'unhealthy' : 'healthy',
      latency: Date.now() - startTime + 'ms'
    };
  } catch (error) {
    healthStatus.services.database = { status: 'unhealthy', error: error.message };
    healthStatus.status = 'degraded';
  }

  // 2. AI API 체크 (선택적)
  if (process.env.ANTHROPIC_API_KEY) {
    try {
      // 간단한 핑 테스트 (실제 API 호출 대신)
      healthStatus.services.ai = {
        status: 'healthy',
        configured: true
      };
    } catch {
      healthStatus.services.ai = { status: 'unknown' };
    }
  }

  // 3. 결제 시스템 체크
  if (process.env.TOSS_SECRET_KEY) {
    healthStatus.services.payment = {
      status: 'healthy',
      configured: true
    };
  }

  // 전체 응답 시간
  healthStatus.responseTime = Date.now() - startTime + 'ms';

  const statusCode = healthStatus.status === 'healthy' ? 200 : 503;
  res.status(statusCode).json(healthStatus);
};
```

### 2. 상세 상태 API (관리자용)
- 위치: `api/status.js`

```javascript
// api/status.js
const { withAuth } = require('./lib/auth/withAuth');

module.exports = withAuth(async (req, res) => {
  // 관리자 권한 체크
  if (!req.user.is_admin) {
    return res.status(403).json({ error: 'Admin access required' });
  }

  const status = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    version: process.env.APP_VERSION || '1.0.0',

    metrics: {
      uptime: process.uptime(),
      memory: process.memoryUsage(),
    },

    services: {
      database: await checkDatabase(),
      auth: await checkAuth(),
      payment: checkPayment(),
      ai: checkAI()
    },

    recentErrors: await getRecentErrors()
  };

  res.status(200).json(status);
});

async function checkDatabase() {
  const start = Date.now();
  try {
    const { count } = await supabase.from('users').select('*', { count: 'exact', head: true });
    return {
      status: 'healthy',
      latency: Date.now() - start,
      userCount: count
    };
  } catch (error) {
    return { status: 'unhealthy', error: error.message };
  }
}

async function checkAuth() {
  return {
    status: 'healthy',
    provider: 'supabase',
    oauthEnabled: ['google']
  };
}

function checkPayment() {
  return {
    status: process.env.TOSS_SECRET_KEY ? 'healthy' : 'not_configured',
    provider: 'toss_payments',
    mode: process.env.TOSS_SECRET_KEY?.startsWith('live_') ? 'production' : 'test'
  };
}

function checkAI() {
  return {
    status: process.env.ANTHROPIC_API_KEY ? 'healthy' : 'not_configured',
    provider: 'anthropic'
  };
}

async function getRecentErrors() {
  const { data } = await supabase
    .from('error_logs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);

  return data || [];
}
```

### 3. 에러 로깅 API
- 위치: `api/log-error.js`

```javascript
// api/log-error.js
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { error, context, userId, url } = req.body;

  try {
    await supabase.from('error_logs').insert({
      error_message: error.message || error,
      error_stack: error.stack,
      context,
      user_id: userId,
      url,
      user_agent: req.headers['user-agent'],
      created_at: new Date().toISOString()
    });

    // 심각한 에러인 경우 알림 (선택)
    if (context?.severity === 'critical') {
      await sendAlert(error);
    }

    res.status(200).json({ logged: true });
  } catch (err) {
    console.error('Error logging failed:', err);
    res.status(500).json({ error: 'Logging failed' });
  }
};

async function sendAlert(error) {
  // Slack, Discord, Email 등으로 알림
  // 추후 구현
}
```

### 4. 에러 로그 테이블
```sql
-- error_logs 테이블
CREATE TABLE IF NOT EXISTS error_logs (
    id SERIAL PRIMARY KEY,
    error_message TEXT NOT NULL,
    error_stack TEXT,
    context JSONB,
    user_id UUID REFERENCES auth.users(id),
    url TEXT,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_error_logs_created_at ON error_logs(created_at DESC);
CREATE INDEX idx_error_logs_user_id ON error_logs(user_id);
```

### 5. 클라이언트 에러 캡처
- 위치: `P3_프로토타입_제작/Frontend/Prototype/lib/error-tracker.js`

```javascript
// lib/error-tracker.js
class ErrorTracker {
  static init() {
    // 전역 에러 핸들러
    window.onerror = (message, source, lineno, colno, error) => {
      ErrorTracker.capture(error || message, { source, lineno, colno });
    };

    // Promise 에러 핸들러
    window.addEventListener('unhandledrejection', (event) => {
      ErrorTracker.capture(event.reason, { type: 'unhandledrejection' });
    });
  }

  static async capture(error, context = {}) {
    const userId = localStorage.getItem('userId');

    try {
      await fetch('/api/log-error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          error: {
            message: error.message || String(error),
            stack: error.stack
          },
          context: {
            ...context,
            url: window.location.href,
            timestamp: new Date().toISOString()
          },
          userId
        })
      });
    } catch {
      console.error('Failed to log error');
    }
  }
}

// 초기화
ErrorTracker.init();

export default ErrorTracker;
```

### 6. Health Check 테이블 (선택)
```sql
-- health_check 테이블 (DB 연결 테스트용)
CREATE TABLE IF NOT EXISTS health_check (
    id INTEGER PRIMARY KEY DEFAULT 1,
    last_checked TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO health_check (id) VALUES (1) ON CONFLICT DO NOTHING;
```

## Expected Output Files
- `api/health.js`
- `api/status.js`
- `api/log-error.js`
- `P3_프로토타입_제작/Frontend/Prototype/lib/error-tracker.js`
- Supabase에 `error_logs` 테이블 생성

## Completion Criteria
- [ ] Health Check API 구현
- [ ] 상세 상태 API 구현 (관리자용)
- [ ] 에러 로깅 API 구현
- [ ] 클라이언트 에러 캡처 구현
- [ ] 에러 로그 테이블 생성
- [ ] API 테스트 완료

## Tech Stack
- Vercel Serverless Functions
- Supabase

## Tools
- Write, Read
- Bash (API 테스트)

## Execution Type
AI-Only

## Remarks
- Health Check는 인증 없이 접근 가능
- 상세 상태는 관리자만 접근
- 에러 로그 주기적 정리 필요
- 외부 모니터링 서비스 연동 고려 (Sentry, LogRocket)
