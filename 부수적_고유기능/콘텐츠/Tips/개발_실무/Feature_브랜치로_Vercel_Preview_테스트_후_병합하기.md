# Feature 브랜치로 Vercel Preview 테스트 후 병합하기

## 핵심 요약

프로덕션 사이트에 바로 배포하지 말고, Feature 브랜치를 만들어 Vercel Preview에서 먼저 테스트한 후 문제가 없으면 main에 병합하세요. 실서비스 장애 없이 안전하게 변경사항을 적용할 수 있습니다.

## 왜 Preview 테스트가 필요한가?

### 직접 배포 vs Preview 테스트

```
❌ 직접 배포 (위험)
main 브랜치 → 바로 프로덕션 배포
→ 버그 발생 시 실제 사용자에게 영향
→ 롤백까지 시간 소요

✅ Preview 테스트 (안전)
Feature 브랜치 → Preview URL에서 테스트 → 확인 후 main 병합
→ 실서비스 영향 없이 미리 검증
→ 문제 발견 시 수정 후 다시 테스트
```

### Preview 테스트가 필요한 상황

| 상황 | 설명 |
|------|------|
| 디자인 변경 | UI 수정이 의도대로 보이는지 확인 |
| 새 기능 추가 | 기능이 정상 작동하는지 검증 |
| 라이브러리 업데이트 | 호환성 문제 없는지 확인 |
| 대규모 리팩토링 | 기존 기능 깨지지 않았는지 검증 |
| 빌드 에러 가능성 | 프로덕션 빌드 성공 여부 사전 확인 |

## 전체 워크플로우

```
[1. 브랜치 생성]
main ──────────────────────────▶
     └── feature/design-update ──▶

[2. 작업 & Push]
feature 브랜치에서 수정 작업 후 GitHub Push

[3. Vercel 자동 Preview 배포]
GitHub Push 감지 → Vercel이 자동으로 Preview URL 생성
https://프로젝트명-git-브랜치명-계정명.vercel.app

[4. Preview에서 테스트]
Preview URL 접속하여 변경사항 확인

[5. 문제없으면 main에 병합]
git checkout main
git merge feature/design-update
git push origin main

[6. 프로덕션 자동 배포]
main 브랜치 Push → 프로덕션 자동 배포
```

## 단계별 상세 가이드

### 1단계: Feature 브랜치 생성

```bash
# main 브랜치가 최신인지 확인
git checkout main
git pull origin main

# Feature 브랜치 생성 및 전환
git checkout -b feature/design-update
```

#### Claude Code에게 지시

```
"feature/design-update 브랜치 만들어줘"

"디자인 개선용 새 브랜치 만들어줘"
```

### 2단계: 작업 후 Push

```bash
# 변경사항 확인
git status

# 커밋 및 Push
git add .
git commit -m "feat: 버튼 디자인 개선"
git push origin feature/design-update
```

#### Claude Code에게 지시

```
"현재 변경사항 feature 브랜치에 Push해줘"

"디자인 수정 작업 커밋하고 Push해줘"
```

### 3단계: Vercel Preview URL 확인

```
Push 후 Vercel이 자동으로 Preview 배포

Preview URL 패턴:
https://[프로젝트명]-git-[브랜치명]-[계정명].vercel.app

예시:
https://my-app-git-feature-design-update-myteam.vercel.app
```

#### Preview URL 찾는 방법

| 방법 | 설명 |
|------|------|
| Vercel 대시보드 | Deployments 탭에서 Preview 확인 |
| GitHub PR | PR 생성 시 Vercel이 코멘트로 URL 제공 |
| Vercel CLI | `vercel ls` 명령어로 확인 |

### 4단계: Preview에서 테스트

```
확인 체크리스트:

□ 페이지가 정상적으로 로드되는가?
□ 디자인 변경이 의도대로 적용됐는가?
□ 기존 기능들이 정상 작동하는가?
□ 모바일/태블릿에서도 문제없는가?
□ 콘솔에 에러가 없는가?
```

### 5단계: main에 병합

```bash
# main 브랜치로 전환
git checkout main

# 최신 상태 확인
git pull origin main

# Feature 브랜치 병합
git merge feature/design-update

# 프로덕션으로 Push
git push origin main
```

#### Claude Code에게 지시

```
"feature/design-update 브랜치를 main에 병합해줘"

"Preview 테스트 완료됐으니 main에 병합하고 Push해줘"
```

## 주의사항: Preview 환경 변수

### 문제 상황

```
Preview에서 데이터가 안 보여요!
디자인만 보이고 API 연동이 안 돼요!
```

### 원인

Vercel 환경 변수가 **Production에만** 설정되어 있으면 Preview에서는 DB 연결 등이 안 됩니다.

### 확인 방법

```bash
# Vercel CLI로 환경 변수 확인
vercel env ls
```

```
결과 예시:
SUPABASE_URL           Production     ← Production에만 있음
SUPABASE_KEY           Production     ← Production에만 있음
NEXT_PUBLIC_API_URL    Preview, Production  ← 둘 다 있음
```

### 해결 방법

```bash
# Preview 환경에도 환경 변수 추가
echo "your-supabase-url" | vercel env add SUPABASE_URL preview
```

또는 Vercel 대시보드에서:
```
Settings → Environment Variables → 변수 선택 → Preview 체크
```

## 빌드 에러 발생 시

### Preview 배포 실패 확인

```
Vercel 대시보드 → Deployments → 실패한 배포 클릭 → 로그 확인
```

### 흔한 빌드 에러

| 에러 | 원인 | 해결 |
|------|------|------|
| `supabaseUrl is required` | 환경 변수 미설정 | Preview 환경에 변수 추가 |
| `Missing API key` | API 키 미설정 | Preview 환경에 키 추가 |
| `Module not found` | 의존성 누락 | `npm install` 확인 |
| `Type error` | TypeScript 오류 | 코드 수정 후 다시 Push |

### Claude Code에게 지시

```
"Vercel 빌드 에러 해결해줘"

"Preview 배포 실패 원인 찾아줘"
```

## 브랜치 정리

### 병합 후 Feature 브랜치 삭제

```bash
# 로컬 브랜치 삭제
git branch -d feature/design-update

# 원격 브랜치 삭제
git push origin --delete feature/design-update
```

## 전체 명령어 요약

| 단계 | 명령어 |
|------|--------|
| 브랜치 생성 | `git checkout -b feature/기능명` |
| Push | `git push origin feature/기능명` |
| Preview 확인 | Vercel 대시보드 또는 URL 직접 접속 |
| main 전환 | `git checkout main` |
| 병합 | `git merge feature/기능명` |
| 프로덕션 배포 | `git push origin main` |
| 브랜치 삭제 | `git branch -d feature/기능명` |

## 체크리스트

### Preview 테스트 전

- [ ] Feature 브랜치에서 작업했는가?
- [ ] 변경사항을 커밋하고 Push했는가?
- [ ] Vercel에서 Preview 배포가 성공했는가?

### Preview 테스트 중

- [ ] 페이지 로드 정상 확인
- [ ] 변경사항 의도대로 적용 확인
- [ ] 기존 기능 동작 확인
- [ ] 콘솔 에러 없음 확인

### 병합 전

- [ ] main 브랜치 최신 상태로 Pull
- [ ] 충돌 없이 병합 가능한지 확인

### 병합 후

- [ ] 프로덕션 배포 성공 확인
- [ ] 실서비스에서 최종 확인
- [ ] Feature 브랜치 삭제

