# Task Instruction - S5O2

## Task ID
S5O2

## Task Name
Vercel 프로덕션 배포

## Task Goal
최종 프로덕션 환경 배포 및 배포 파이프라인 설정

## Prerequisites (Dependencies)
- S5O1 (도메인 연결) 완료
- S5S1 (SSL/보안 설정) 완료
- S5M1 (출시 체크리스트) 완료

## Specific Instructions

### 1. 프로덕션 환경 변수 설정
```
Vercel Dashboard > Settings > Environment Variables

필수 환경 변수 (Production):
- SUPABASE_URL
- SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- ANTHROPIC_API_KEY
- TOSS_CLIENT_KEY (live_ck_xxx)
- TOSS_SECRET_KEY (live_sk_xxx)
- TOSS_WEBHOOK_SECRET
- CRON_SECRET
- APP_VERSION
- NODE_ENV=production
```

### 2. 프로덕션 브랜치 설정
```
Vercel Dashboard > Settings > Git

Production Branch: main (또는 master)
Preview Branches: 다른 모든 브랜치

브랜치 전략:
- main: 프로덕션 배포
- develop: 개발 통합
- feature/*: 기능 개발
```

### 3. 빌드 설정 확인
- 위치: `vercel.json`

```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/**/*.js",
      "use": "@vercel/node"
    },
    {
      "src": "P3_프로토타입_제작/Frontend/Prototype/**",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/P3_프로토타입_제작/Frontend/Prototype/$1"
    }
  ],
  "functions": {
    "api/**/*.js": {
      "memory": 1024,
      "maxDuration": 30
    }
  }
}
```

### 4. 배포 전 체크리스트
```markdown
## 프로덕션 배포 체크리스트

### 코드
- [ ] 모든 테스트 통과
- [ ] 린트 에러 없음
- [ ] 콘솔 로그 제거
- [ ] 하드코딩된 값 없음
- [ ] 환경별 설정 분리

### 환경 변수
- [ ] 모든 프로덕션 키 등록
- [ ] 테스트 키가 아닌 실제 키 사용
- [ ] 민감 정보 노출 없음

### 데이터베이스
- [ ] 프로덕션 DB 연결 확인
- [ ] 마이그레이션 완료
- [ ] 백업 설정 확인

### 외부 서비스
- [ ] Supabase 프로덕션 프로젝트
- [ ] 토스 페이먼트 라이브 모드
- [ ] Anthropic API 활성화
```

### 5. 배포 실행
```bash
# Vercel CLI로 프로덕션 배포
vercel --prod

# 또는 Git push (자동 배포)
git push origin main
```

### 6. 배포 후 확인
```bash
# 사이트 접속 확인
curl -I https://ssalworks.com

# API 헬스 체크
curl https://ssalworks.com/api/health

# SSL 확인
curl -vI https://ssalworks.com 2>&1 | grep -i ssl
```

### 7. 롤백 절차
```
문제 발생 시 롤백:

1. Vercel Dashboard > Deployments
2. 이전 정상 배포 찾기
3. "..." 메뉴 > "Promote to Production"

또는 CLI:
vercel rollback <deployment-url>
```

### 8. 자동 배포 파이프라인
```yaml
# GitHub Actions (선택)
# .github/workflows/deploy.yml

name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Run tests
        run: |
          npm ci
          npm test

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

### 9. 배포 알림 설정
```
Vercel 알림 설정:
1. Dashboard > Settings > Notifications
2. 배포 성공/실패 알림 설정
   - Email
   - Slack
   - Discord

설정 항목:
- [ ] 배포 완료 알림
- [ ] 배포 실패 알림
- [ ] 도메인 인증서 만료 알림
```

### 10. 모니터링 연동
```
배포 후 모니터링:
- Vercel Analytics 활성화
- 실시간 로그 확인
- 에러 알림 설정

Vercel Dashboard > Analytics:
- Web Vitals 확인
- 방문자 통계
- 지역별 성능
```

### 11. 배포 문서
- 위치: `docs/DEPLOYMENT_GUIDE.md`

```markdown
# SSALWorks 배포 가이드

## 배포 환경

| 환경 | 브랜치 | URL |
|------|--------|-----|
| Production | main | https://ssalworks.com |
| Preview | feature/* | https://xxx.vercel.app |
| Development | develop | https://dev.ssalworks.com |

## 배포 절차

### 1. 코드 준비
\`\`\`bash
git checkout main
git pull origin main
\`\`\`

### 2. 배포 실행
\`\`\`bash
vercel --prod
\`\`\`

### 3. 배포 확인
- https://ssalworks.com 접속
- /api/health 확인

## 롤백 절차

1. Vercel Dashboard 접속
2. Deployments 탭
3. 이전 배포 선택 > Promote to Production

## 긴급 연락처

- DevOps: devops@ssalworks.com
- Vercel 지원: support@vercel.com
```

## Expected Output Files
- `vercel.json` (배포 설정)
- `.github/workflows/deploy.yml` (선택)
- `docs/DEPLOYMENT_GUIDE.md`
- 프로덕션 배포 완료

## Completion Criteria
- [ ] 프로덕션 환경 변수 설정
- [ ] 빌드 설정 확인
- [ ] 배포 전 체크리스트 완료
- [ ] 프로덕션 배포 성공
- [ ] 배포 후 테스트 통과
- [ ] 롤백 절차 문서화
- [ ] 배포 알림 설정
- [ ] 배포 가이드 문서 작성

## Tech Stack
- Vercel
- Git

## Tools
- Vercel CLI
- Bash
- 웹 브라우저 (Vercel Dashboard)

## Execution Type
Human-Assisted

## Remarks
- 프로덕션 배포는 업무 시간 내 진행 권장
- 배포 후 최소 30분 모니터링
- 문제 발생 시 즉시 롤백
- 배포 이력 관리 중요

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

