# GitHub Push Pull로 작업 반영하기

## 요약
웹 Claude와 로컬 Claude Code 간에 GitHub를 통해 작업을 동기화한다. 웹에서 작업 후 Push → 로컬에서 Pull하면 양쪽 작업이 합쳐진다.

## 상세

### 기본 명령어

```bash
# 로컬 → GitHub (Push)
git add . && git commit -m "feat: 기능 구현" && git push origin main

# GitHub → 로컬 (Pull)
git pull origin main
```

### Claude Code에게 요청

```
"현재 변경사항 GitHub에 Push해줘"

"GitHub에서 최신 변경사항 Pull해줘"

"git status 확인해줘"
```

### 충돌 발생 시

```
충돌 메시지: CONFLICT (content): Merge conflict in src/login.js

Claude Code에게: "Git 충돌 해결해줘"
```

### 주의
- Push 전에 항상 Pull 먼저 (충돌 최소화)
- 민감정보는 `.gitignore`에 추가
- 양쪽에서 같은 파일 동시 수정 피하기

---
📚 더 자세히: Git 공식 문서
