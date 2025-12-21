# Task Instruction - S5O1

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
S5O1

## Task Name
프로덕션 배포

## Task Goal
Vercel 프로덕션 배포 및 환경변수 확인, 최종 배포 검증

## Prerequisites (Dependencies)
- S4T2 (API 통합 테스트) 완료

## Specific Instructions

### 1. 배포 전 체크리스트

```markdown
## 프로덕션 배포 체크리스트

### 코드 준비
- [ ] 모든 테스트 통과 (npm test)
- [ ] E2E 테스트 통과
- [ ] 린트 에러 없음 (npm run lint)
- [ ] 빌드 성공 (npm run build)
- [ ] 스테이징 환경 테스트 완료

### 환경변수
- [ ] SUPABASE_URL 설정
- [ ] SUPABASE_ANON_KEY 설정
- [ ] SUPABASE_SERVICE_ROLE_KEY 설정
- [ ] TOSS_CLIENT_KEY 설정 (live_ck_xxx)
- [ ] TOSS_SECRET_KEY 설정 (live_sk_xxx)
- [ ] TOSS_WEBHOOK_SECRET 설정
- [ ] RESEND_API_KEY 설정
- [ ] SENTRY_DSN 설정
- [ ] CRON_SECRET 설정

### 외부 서비스
- [ ] Supabase 프로덕션 설정 확인
- [ ] 토스 페이먼트 라이브 모드 확인
- [ ] Resend 도메인 인증 완료
- [ ] Sentry 프로젝트 설정 완료
```

### 2. Vercel 프로덕션 배포

```bash
# CLI로 배포
vercel --prod

# 또는 Dashboard에서
# 1. Vercel Dashboard > Project > Deployments
# 2. Production 브랜치 (main) 선택
# 3. Deploy 클릭
```

### 3. 환경변수 설정 확인

```bash
# Vercel CLI로 환경변수 확인
vercel env ls production

# 환경변수 추가 (필요시)
vercel env add VARIABLE_NAME production
```

### 4. 프로덕션 환경변수 목록
- 위치: `docs/PRODUCTION_ENV.md`

```markdown
# 프로덕션 환경변수

## Supabase
| 변수명 | 설명 | 예시 |
|--------|------|------|
| SUPABASE_URL | Supabase 프로젝트 URL | https://xxx.supabase.co |
| SUPABASE_ANON_KEY | 공개 키 | eyJxxx... |
| SUPABASE_SERVICE_ROLE_KEY | 서버 전용 키 | eyJxxx... |

## 토스 페이먼트
| 변수명 | 설명 | 예시 |
|--------|------|------|
| TOSS_CLIENT_KEY | 클라이언트 키 | live_ck_xxx |
| TOSS_SECRET_KEY | 시크릿 키 | live_sk_xxx |
| TOSS_WEBHOOK_SECRET | 웹훅 시크릿 | xxx |

## 이메일 (Resend)
| 변수명 | 설명 | 예시 |
|--------|------|------|
| RESEND_API_KEY | Resend API 키 | re_xxx |

## 모니터링
| 변수명 | 설명 | 예시 |
|--------|------|------|
| SENTRY_DSN | Sentry DSN | https://xxx@sentry.io/xxx |

## Cron
| 변수명 | 설명 | 예시 |
|--------|------|------|
| CRON_SECRET | Cron 인증 키 | random-secret |
```

### 5. 배포 후 검증

```markdown
## 배포 후 검증 항목

### 기본 동작
- [ ] 메인 페이지 로드 (https://ssalworks.ai.kr)
- [ ] SSL 인증서 확인 (자물쇠 아이콘)
- [ ] 보안 헤더 확인 (curl -I)

### 인증
- [ ] 회원가입 테스트
- [ ] 로그인 테스트
- [ ] Google OAuth 테스트
- [ ] 비밀번호 재설정 이메일 발송

### 핵심 기능
- [ ] 구독 플랜 페이지
- [ ] 결제 페이지 (토스 위젯 로드)
- [ ] AI Q&A 페이지 (프리미엄 사용자)
- [ ] 관리자 대시보드 (관리자 계정)

### API
- [ ] /api/health 응답 확인
- [ ] /api/ai/health AI 서비스 상태
- [ ] /api/subscription/status 구독 상태

### 모니터링
- [ ] Sentry 에러 캡처 확인
- [ ] Vercel Analytics 데이터 수집
```

### 6. 배포 검증 스크립트
- 위치: `scripts/verify-deployment.js`

```javascript
// scripts/verify-deployment.js
const PROD_URL = 'https://ssalworks.ai.kr';

async function verifyDeployment() {
    console.log('🚀 프로덕션 배포 검증 시작...\n');

    const checks = [
        { name: '메인 페이지', url: PROD_URL },
        { name: 'Health Check', url: `${PROD_URL}/api/health` },
        { name: 'AI Health', url: `${PROD_URL}/api/ai/health` },
        { name: '로그인 페이지', url: `${PROD_URL}/pages/auth/login.html` },
        { name: '가격 페이지', url: `${PROD_URL}/pages/subscription/pricing.html` }
    ];

    let passed = 0;
    let failed = 0;

    for (const check of checks) {
        try {
            const response = await fetch(check.url);
            if (response.ok) {
                console.log(`✅ ${check.name}: OK (${response.status})`);
                passed++;
            } else {
                console.log(`❌ ${check.name}: FAIL (${response.status})`);
                failed++;
            }
        } catch (error) {
            console.log(`❌ ${check.name}: ERROR (${error.message})`);
            failed++;
        }
    }

    console.log(`\n📊 결과: ${passed}/${checks.length} 통과`);

    if (failed > 0) {
        console.log('⚠️ 일부 검증 실패. 확인이 필요합니다.');
        process.exit(1);
    } else {
        console.log('🎉 모든 검증 통과!');
    }
}

verifyDeployment();
```

### 7. 롤백 절차

```markdown
## 롤백 절차

### Vercel Dashboard에서 롤백
1. Vercel Dashboard > Project > Deployments
2. 이전 성공한 배포 찾기
3. "..." 메뉴 클릭
4. "Promote to Production" 선택

### CLI로 롤백
```bash
# 특정 배포로 롤백
vercel rollback [DEPLOYMENT_URL]
```

### 롤백 후 확인
- [ ] 메인 페이지 정상 로드
- [ ] 주요 기능 동작 확인
- [ ] 에러 로그 확인
```

### 8. 배포 기록
- 위치: `docs/DEPLOYMENT_LOG.md`

```markdown
# 배포 기록

## v1.0.0 - YYYY-MM-DD
- **배포 URL**: https://ssalworks.ai.kr
- **Git Commit**: abc1234
- **변경 사항**:
  - 초기 프로덕션 배포
  - 모든 핵심 기능 포함
- **테스트 결과**: 모든 테스트 통과
- **배포자**: [이름]
```

## Expected Output Files
- `docs/PRODUCTION_ENV.md`
- `scripts/verify-deployment.js`
- `docs/DEPLOYMENT_LOG.md`
- Vercel 프로덕션 배포 완료

## Completion Criteria
- [ ] 모든 테스트 통과
- [ ] 환경변수 설정 완료
- [ ] Vercel 프로덕션 배포 성공
- [ ] 배포 후 검증 완료
- [ ] SSL/HTTPS 작동 확인
- [ ] 주요 기능 동작 확인
- [ ] 배포 기록 작성

## Tech Stack
- Vercel
- GitHub
- Node.js

## Task Agent
`devops-troubleshooter`

## Verification Agent
`qa-specialist`

## Tools
- Bash (vercel CLI)
- 웹 브라우저

## Execution Type
Human-Assisted

## Remarks
- 프로덕션 배포 전 스테이징 테스트 필수
- 배포 시간은 트래픽 낮은 시간대 권장
- 롤백 절차 숙지 후 배포
- 배포 후 30분간 모니터링 필수

---

## ⚠️ 작업 결과물 저장 2대 규칙

> **이 규칙은 반드시 준수하세요!**

### 제1 규칙: Stage + Area 폴더에 저장
- Task ID의 Stage와 Area에 해당하는 폴더에 저장
- 예: S5O1 → `S5_개발_마무리/DevOps/`

### 제2 규칙: Production 코드는 이중 저장
- DevOps 문서/스크립트는 Stage 폴더에만 저장

**Area 폴더 매핑:** M→Documentation, F→Frontend, BI→Backend_Infra, BA→Backend_APIs, D→Database, S→Security, T→Testing, O→DevOps, E→External, C→Content
