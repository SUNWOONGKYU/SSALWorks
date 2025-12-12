# 배포 (Deployment)

## 📋 개요

Vercel 배포 및 GitHub Actions CI/CD 설정 파일 저장소입니다.

## 📂 폴더 구조

```
3-9_Deployment/
├── .github/
│   └── workflows/
│       ├── ci.yml           # CI 파이프라인
│       ├── deploy.yml       # 배포 자동화
│       └── test.yml         # 자동 테스트
├── scripts/
│   ├── deploy.sh            # 배포 스크립트
│   ├── rollback.sh          # 롤백 스크립트
│   └── health_check.sh      # 헬스 체크
└── README.md                # 이 파일
```

## 🚀 GitHub Actions 워크플로우

### ci.yml - 지속적 통합
```yaml
# PR 생성 시 자동 실행
- 코드 린트
- 타입 체크
- 유닛 테스트
```

### deploy.yml - 자동 배포
```yaml
# main 브랜치 머지 시 자동 실행
- 빌드
- Vercel에 배포
- 배포 URL 코멘트
```

### test.yml - 자동 테스트
```yaml
# 매일 자동 실행
- E2E 테스트
- API 테스트
```

## 📌 배포 프로세스

1. **개발** → feature 브랜치에서 작업
2. **테스트** → PR 생성 시 CI 자동 실행
3. **검토** → 코드 리뷰 및 승인
4. **배포** → main 머지 시 자동 배포
5. **확인** → 배포 URL에서 동작 확인

## 🔧 Vercel 설정

### 환경 변수
Vercel 대시보드에서 설정:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### 도메인 설정
- Production: `ssalworks.world`
- Preview: `[branch]-ssalworks.vercel.app`

## 🔗 관련 문서

- Git 설정: `2_개발준비/2-3_Development_Setup/Git/`
- 테스트: `3_개발/3-8_Test/`
