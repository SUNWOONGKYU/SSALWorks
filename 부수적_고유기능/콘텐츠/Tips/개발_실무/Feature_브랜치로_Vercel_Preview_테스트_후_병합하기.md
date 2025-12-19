# Feature 브랜치로 Vercel Preview 테스트 후 병합하기

## 요약
프로덕션에 바로 배포하지 말고 Feature 브랜치를 만들어 Vercel Preview에서 먼저 테스트한 후 main에 병합한다. 실서비스 장애 없이 안전하게 변경사항을 적용할 수 있다.

## 상세

### 워크플로우

```
1. Feature 브랜치 생성
   git checkout -b feature/design-update
    ↓
2. 작업 후 Push
   git push origin feature/design-update
    ↓
3. Vercel 자동 Preview 배포
   https://프로젝트-git-브랜치명-계정.vercel.app
    ↓
4. Preview에서 테스트
    ↓
5. 문제없으면 main에 병합
   git checkout main && git merge feature/design-update
    ↓
6. 프로덕션 자동 배포
```

### Claude Code에게 요청

```
"feature/design-update 브랜치 만들어줘"

"Preview 테스트 완료됐으니 main에 병합하고 Push해줘"
```

### Preview 환경 변수 주의

Preview에서 데이터가 안 보이면 환경 변수가 Production에만 설정된 것. Vercel 대시보드에서 Preview 환경에도 변수 추가 필요.

### 주의
- Preview 배포 실패 시 Vercel 대시보드 → Deployments → 로그 확인
- 병합 후 Feature 브랜치는 삭제: `git branch -d feature/기능명`

---
📚 더 자세히: Vercel 공식 문서
