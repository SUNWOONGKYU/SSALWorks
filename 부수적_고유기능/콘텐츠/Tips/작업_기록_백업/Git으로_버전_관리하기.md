# Git으로 버전 관리하기

## 요약
`git init` → `git add .` → `git commit -m "메시지"` 순서로 사용. 파일 변경 이력이 기록되어 실수해도 이전 버전으로 복구 가능. 기능 완료 시마다 커밋.

## 상세

### 자주 사용하는 명령어

| 명령어 | 설명 |
|--------|------|
| `git status` | 현재 상태 확인 |
| `git add .` | 모든 변경 파일 스테이징 |
| `git commit -m "메시지"` | 변경사항 저장 |
| `git log --oneline` | 커밋 이력 보기 |
| `git checkout -- file.js` | 파일 복구 |

### 커밋 메시지 형식

```
feat: 기능 추가
fix: 버그 수정
docs: 문서 수정
refactor: 코드 구조 개선
```

### 실수 복구

```bash
# 파일 하나 복구
git checkout -- login.js

# 마지막 커밋 취소 (파일 유지)
git reset --soft HEAD~1

# 완전히 되돌리기
git reset --hard HEAD~1
```

### 커밋 시점

| 좋은 시점 | 피할 시점 |
|----------|----------|
| 기능 완료 시 | 동작 안 하는 코드 |
| 버그 수정 후 | 민감정보 포함 |
| 작업 중단 전 | 임시 디버깅 코드 |

---
📚 더 자세히: `.gitignore로_민감정보_보호하기.md`
