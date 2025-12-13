# Task Instruction - S5O3

## Task ID
S5O3

## Task Name
모니터링 설정

## Task Goal
프로덕션 환경 모니터링 및 알림 시스템 구축

## Prerequisites (Dependencies)
- S5O2 (Vercel 프로덕션 배포) 완료
- S5BA1 (모니터링 API) 완료

## Specific Instructions

### 1. Vercel Analytics 활성화
```
1. Vercel Dashboard > Project > Analytics
2. "Enable Analytics" 클릭
3. Web Vitals 자동 수집 시작

모니터링 지표:
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- First Input Delay (FID)
- Time to First Byte (TTFB)
```

### 2. 외부 모니터링 서비스 연동 (권장)

#### Sentry 설정 (에러 모니터링)
```javascript
// lib/sentry.js
import * as Sentry from '@sentry/browser';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1, // 10% 샘플링
});

export default Sentry;
```

#### UptimeRobot (가동시간 모니터링)
```
무료 서비스 설정:
1. https://uptimerobot.com 가입
2. Monitor 추가:
   - Monitor Type: HTTPS
   - URL: https://ssalworks.com
   - Interval: 5분
3. Alert Contact 설정 (이메일, Slack)
```

### 3. 커스텀 모니터링 대시보드
- 위치: `P3_프로토타입_제작/Frontend/Prototype/admin/monitoring.html`

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <title>SSALWorks 모니터링</title>
</head>
<body>
    <div class="dashboard">
        <h1>시스템 모니터링</h1>

        <section class="status-cards">
            <div class="card" id="apiStatus">
                <h3>API 상태</h3>
                <span class="status">-</span>
            </div>
            <div class="card" id="dbStatus">
                <h3>데이터베이스</h3>
                <span class="status">-</span>
            </div>
            <div class="card" id="paymentStatus">
                <h3>결제 시스템</h3>
                <span class="status">-</span>
            </div>
        </section>

        <section class="metrics">
            <h2>주요 지표</h2>
            <div id="metricsChart"></div>
        </section>

        <section class="errors">
            <h2>최근 에러</h2>
            <table id="errorTable">
                <thead>
                    <tr>
                        <th>시간</th>
                        <th>에러</th>
                        <th>사용자</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </section>
    </div>

    <script src="./monitoring.js"></script>
</body>
</html>
```

### 4. 모니터링 JavaScript
- 위치: `P3_프로토타입_제작/Frontend/Prototype/admin/monitoring.js`

```javascript
// admin/monitoring.js
class MonitoringDashboard {
  constructor() {
    this.init();
  }

  async init() {
    await this.checkAuth();
    this.loadStatus();
    this.loadErrors();

    // 30초마다 갱신
    setInterval(() => {
      this.loadStatus();
      this.loadErrors();
    }, 30000);
  }

  async checkAuth() {
    // 관리자 인증 확인
    const token = localStorage.getItem('accessToken');
    if (!token) {
      window.location.href = '/pages/auth/login.html';
    }
  }

  async loadStatus() {
    try {
      const response = await fetch('/api/health');
      const data = await response.json();

      this.updateStatusCard('apiStatus', data.status);
      this.updateStatusCard('dbStatus', data.services.database?.status || 'unknown');
      this.updateStatusCard('paymentStatus', data.services.payment?.status || 'unknown');
    } catch (error) {
      console.error('Status load failed:', error);
    }
  }

  updateStatusCard(id, status) {
    const card = document.getElementById(id);
    const statusEl = card.querySelector('.status');

    statusEl.textContent = status;
    statusEl.className = `status ${status}`;
  }

  async loadErrors() {
    try {
      const response = await fetch('/api/status', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      const data = await response.json();

      this.renderErrors(data.recentErrors || []);
    } catch (error) {
      console.error('Errors load failed:', error);
    }
  }

  renderErrors(errors) {
    const tbody = document.querySelector('#errorTable tbody');
    tbody.innerHTML = errors.map(error => `
      <tr>
        <td>${new Date(error.created_at).toLocaleString('ko-KR')}</td>
        <td>${error.error_message}</td>
        <td>${error.user_id || '-'}</td>
      </tr>
    `).join('');
  }
}

new MonitoringDashboard();
```

### 5. 알림 설정

#### Slack 웹훅 알림
- 위치: `api/lib/notifications/slack.js`

```javascript
// api/lib/notifications/slack.js
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

async function sendSlackAlert(message, level = 'info') {
  if (!SLACK_WEBHOOK_URL) return;

  const colors = {
    info: '#36a64f',
    warning: '#ff9800',
    error: '#f44336',
    critical: '#9c27b0'
  };

  await fetch(SLACK_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      attachments: [{
        color: colors[level],
        title: `[${level.toUpperCase()}] SSALWorks Alert`,
        text: message,
        ts: Date.now() / 1000
      }]
    })
  });
}

module.exports = { sendSlackAlert };
```

#### 이메일 알림
```javascript
// api/lib/notifications/email.js
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendAlertEmail(subject, body) {
  await resend.emails.send({
    from: 'alerts@ssalworks.com',
    to: 'admin@ssalworks.com',
    subject: `[Alert] ${subject}`,
    html: body
  });
}

module.exports = { sendAlertEmail };
```

### 6. 자동 알림 트리거
- 위치: `api/lib/notifications/triggers.js`

```javascript
// api/lib/notifications/triggers.js
const { sendSlackAlert } = require('./slack');
const { sendAlertEmail } = require('./email');

// 에러율 임계치 초과 시 알림
async function checkErrorRate() {
  const { count } = await supabase
    .from('error_logs')
    .select('*', { count: 'exact' })
    .gte('created_at', new Date(Date.now() - 3600000).toISOString());

  if (count > 100) { // 시간당 100개 초과
    await sendSlackAlert(
      `🚨 에러율 급증: 지난 1시간 동안 ${count}개 에러 발생`,
      'critical'
    );
  }
}

// 결제 실패율 체크
async function checkPaymentFailureRate() {
  const { data: payments } = await supabase
    .from('payments')
    .select('status')
    .gte('created_at', new Date(Date.now() - 3600000).toISOString());

  const failed = payments?.filter(p => p.status === 'FAILED').length || 0;
  const total = payments?.length || 0;
  const failureRate = total > 0 ? (failed / total) * 100 : 0;

  if (failureRate > 10) { // 10% 초과
    await sendSlackAlert(
      `💳 결제 실패율 증가: ${failureRate.toFixed(1)}% (${failed}/${total})`,
      'warning'
    );
  }
}

module.exports = { checkErrorRate, checkPaymentFailureRate };
```

### 7. Cron 모니터링 작업
- 위치: `api/cron/monitoring.js`

```javascript
// api/cron/monitoring.js
const { checkErrorRate, checkPaymentFailureRate } = require('../lib/notifications/triggers');

module.exports = async (req, res) => {
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  await Promise.all([
    checkErrorRate(),
    checkPaymentFailureRate()
  ]);

  res.status(200).json({ checked: true });
};
```

### 8. vercel.json Cron 설정
```json
{
  "crons": [
    {
      "path": "/api/cron/monitoring",
      "schedule": "*/15 * * * *"
    }
  ]
}
```

### 9. 모니터링 문서
- 위치: `docs/MONITORING_GUIDE.md`

```markdown
# SSALWorks 모니터링 가이드

## 모니터링 도구

| 도구 | 용도 | URL |
|------|------|-----|
| Vercel Analytics | 성능 모니터링 | Vercel Dashboard |
| UptimeRobot | 가동시간 모니터링 | uptimerobot.com |
| 커스텀 대시보드 | 실시간 상태 | /admin/monitoring |

## 알림 채널

- Slack: #ssalworks-alerts
- Email: admin@ssalworks.com

## 알림 임계치

| 지표 | 임계치 | 알림 수준 |
|------|--------|----------|
| 에러율 | >100/시간 | Critical |
| 결제 실패율 | >10% | Warning |
| API 응답시간 | >2초 | Warning |
| 서버 다운 | 3분 이상 | Critical |

## 대응 절차

### 에러율 급증
1. 에러 로그 확인
2. 최근 배포 확인
3. 필요시 롤백

### 결제 실패 증가
1. 토스 페이먼트 상태 확인
2. 결제 로그 분석
3. 필요시 토스 지원 연락
```

## Expected Output Files
- `P3_프로토타입_제작/Frontend/Prototype/admin/monitoring.html`
- `P3_프로토타입_제작/Frontend/Prototype/admin/monitoring.js`
- `api/lib/notifications/slack.js`
- `api/lib/notifications/email.js`
- `api/lib/notifications/triggers.js`
- `api/cron/monitoring.js`
- `docs/MONITORING_GUIDE.md`

## Completion Criteria
- [ ] Vercel Analytics 활성화
- [ ] 외부 모니터링 서비스 연동 (UptimeRobot)
- [ ] 커스텀 모니터링 대시보드 구현
- [ ] Slack 알림 설정
- [ ] 이메일 알림 설정
- [ ] 자동 모니터링 Cron 설정
- [ ] 모니터링 문서 작성

## Tech Stack
- Vercel Analytics
- Supabase
- Slack Webhook
- Resend (이메일)

## Tools
- Write, Read
- Bash
- 웹 브라우저

## Execution Type
Human-Assisted

## Remarks
- 무료 모니터링 도구 활용
- 알림 피로 방지 (임계치 적절히 설정)
- 정기적인 모니터링 리뷰
- 인시던트 대응 프로세스 수립

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

