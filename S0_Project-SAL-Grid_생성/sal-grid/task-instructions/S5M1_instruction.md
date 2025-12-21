# Task Instruction - S5M1

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
S5M1

## Task Name
운영 매뉴얼

## Task Goal
시스템 관리, 백업, 복구 절차, 장애 대응을 위한 운영 매뉴얼 문서 작성

## Prerequisites (Dependencies)
- S5O1 (프로덕션 배포) 완료

## Specific Instructions

### 1. 문서 구조
- 위치: `S5_개발_마무리/Documentation/OPERATIONS_MANUAL.md`
- 형식: Markdown

### 2. 필수 포함 내용

#### 2.1 시스템 아키텍처 개요
```markdown
## 시스템 아키텍처

### 인프라 구성
- **Frontend Hosting**: Vercel (Edge Network)
- **Backend**: Vercel Serverless Functions
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth + Google OAuth
- **Email**: Resend
- **Payment**: Toss Payments
- **Monitoring**: Sentry

### 도메인 정보
- **Production**: https://ssalworks.ai.kr
- **Vercel Dashboard**: https://vercel.com/ssalworks
- **Supabase Dashboard**: https://app.supabase.com/project/xxx
```

#### 2.2 일상 운영 업무
```markdown
## 일상 운영

### 매일 점검 사항
1. Sentry 에러 대시보드 확인
2. Vercel 배포 상태 확인
3. Supabase 서비스 상태 확인
4. 결제 처리 정상 여부 확인

### 주간 점검 사항
1. 사용자 증가 추이 분석
2. API 응답 시간 모니터링
3. 스토리지 사용량 확인
4. 보안 알림 검토

### 월간 점검 사항
1. 백업 복구 테스트
2. 보안 업데이트 적용
3. 비용 분석 및 최적화
4. 서비스 품질 리뷰
```

#### 2.3 백업 및 복구
```markdown
## 백업 및 복구

### Supabase 자동 백업
- **빈도**: 매일 자동 백업
- **보관 기간**: Pro 플랜 7일, Pro Plus 30일
- **위치**: Supabase 관리형

### 백업 확인 방법
1. Supabase Dashboard 접속
2. Settings > Database > Backups
3. 최근 백업 목록 확인

### 복구 절차 (Point-in-Time Recovery)
1. Supabase Dashboard > Backups
2. 복구 시점 선택
3. "Restore" 클릭
4. 새 데이터베이스로 복구 또는 기존 대체

### 수동 백업 (추가 안전)
```bash
# pg_dump를 통한 수동 백업
pg_dump -h [SUPABASE_HOST] -U postgres -d postgres > backup_$(date +%Y%m%d).sql
```

### 코드 백업
- Git 저장소에 모든 코드 버전 관리
- GitHub에 자동 미러링 권장
```

#### 2.4 장애 대응
```markdown
## 장애 대응

### 장애 등급 분류
| 등급 | 설명 | 대응 시간 |
|------|------|----------|
| P1 Critical | 전체 서비스 중단 | 15분 이내 |
| P2 High | 핵심 기능 장애 (결제, 로그인) | 1시간 이내 |
| P3 Medium | 일부 기능 장애 | 4시간 이내 |
| P4 Low | 경미한 버그, UI 이슈 | 24시간 이내 |

### 장애 대응 프로세스
1. **감지**: Sentry 알림 또는 사용자 신고
2. **분류**: 장애 등급 판단
3. **공지**: 사용자에게 상황 안내 (필요시)
4. **분석**: 로그 분석, 원인 파악
5. **조치**: 핫픽스 또는 롤백
6. **검증**: 복구 확인
7. **사후 분석**: 포스트모템 작성

### 주요 장애 시나리오별 대응

#### Vercel 배포 실패
1. Vercel Dashboard에서 빌드 로그 확인
2. 에러 원인 파악 및 수정
3. 재배포 또는 이전 버전 롤백

#### Supabase 연결 실패
1. Supabase 서비스 상태 확인 (status.supabase.com)
2. Connection Pool 상태 확인
3. API 키 유효성 확인
4. 필요시 Supabase 지원 연락

#### 결제 오류
1. Toss Payments 대시보드에서 거래 내역 확인
2. 웹훅 로그 확인
3. 사용자에게 상황 안내
4. 필요시 수동 처리

### 롤백 절차
```bash
# Vercel 이전 배포로 롤백
# 1. Vercel Dashboard > Deployments
# 2. 이전 성공한 배포 선택
# 3. "Promote to Production" 클릭
```
```

#### 2.5 접근 권한 관리
```markdown
## 접근 권한 관리

### Vercel 접근
- Owner: [관리자 이메일]
- 권한 수정: Team Settings > Members

### Supabase 접근
- Owner: [관리자 이메일]
- 권한 수정: Organization Settings > Members

### 토스 페이먼트 접근
- 가맹점 관리자: [관리자 이메일]
- 권한 수정: 토스 페이먼트 사업자 대시보드

### API 키 관리
- 모든 API 키는 환경변수로 관리
- 정기적 키 로테이션 권장 (분기별)
- 키 노출 시 즉시 재발급
```

#### 2.6 연락처 및 에스컬레이션
```markdown
## 연락처

### 내부 담당자
- 기술 담당: [이름] ([연락처])
- 운영 담당: [이름] ([연락처])

### 외부 서비스 지원
- Vercel Support: https://vercel.com/support
- Supabase Support: support@supabase.io
- Toss Payments: [고객센터 번호]
- Resend Support: support@resend.com

### 에스컬레이션 경로
1. 1차: 기술 담당자
2. 2차: CTO / 기술 책임자
3. 3차: CEO (P1 Critical 시)
```

### 3. 부록
```markdown
## 부록

### 환경변수 목록
| 변수명 | 설명 | 관리 위치 |
|--------|------|----------|
| SUPABASE_URL | Supabase URL | Vercel |
| SUPABASE_KEY | Supabase anon key | Vercel |
| TOSS_SECRET_KEY | 토스 시크릿 키 | Vercel |
| RESEND_API_KEY | Resend API 키 | Vercel |
| SENTRY_DSN | Sentry DSN | Vercel |

### 유용한 명령어
```bash
# Vercel 로그 확인
vercel logs [deployment-url]

# Supabase 상태 확인
supabase status
```

### 체크리스트 템플릿
- [ ] 장애 발생 시간 기록
- [ ] 영향 범위 파악
- [ ] 대응 조치 기록
- [ ] 복구 완료 시간 기록
- [ ] 포스트모템 작성
```

## Expected Output Files
- `S5_개발_마무리/Documentation/OPERATIONS_MANUAL.md`

## Completion Criteria
- [ ] 시스템 아키텍처 문서화
- [ ] 일상 운영 가이드
- [ ] 백업/복구 절차
- [ ] 장애 대응 가이드 (등급별)
- [ ] 롤백 절차
- [ ] 접근 권한 관리 가이드
- [ ] 연락처 및 에스컬레이션 경로

## Tech Stack
- Markdown

## Task Agent
`documentation-specialist`

## Verification Agent
`code-reviewer`

## Tools
- 없음 (문서 작업)

## Execution Type
AI-Only

## Remarks
- 실제 담당자 연락처 업데이트 필요
- 정기적으로 문서 갱신
- 신규 팀원 온보딩 시 필독

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
