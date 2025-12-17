# GitHub Push Pull로 작업 반영하기

## 핵심 요약

웹브라우저 Claude와 로컬 Claude Code 간에 GitHub를 통해 작업을 동기화할 수 있습니다. 웹에서 작업 후 Push → 로컬에서 Pull하면 양쪽의 작업이 합쳐집니다.

## 왜 GitHub 동기화가 필요한가?

### 웹 Claude와 로컬 Claude Code 병행 사용

```
웹 Claude (claude.ai)     로컬 Claude Code
        │                        │
        ▼                        ▼
GitHub Repository ◀──── 동기화 ────▶ 로컬 파일
```

### 동기화가 필요한 상황

| 상황 | 설명 |
|------|------|
| 외출 중 작업 | 웹에서 코드 작성 → 귀가 후 로컬 반영 |
| 모바일 검토 | 웹에서 리뷰/수정 → 로컬에 반영 |
| 환경 전환 | 다른 컴퓨터에서 작업 후 메인 PC로 동기화 |
| 백업 목적 | 로컬 작업을 클라우드에 안전하게 보관 |

## 기본 작업 흐름

### 로컬 → GitHub (Push)

```bash
# 1. 변경사항 확인
git status

# 2. 파일 스테이징
git add .

# 3. 커밋
git commit -m "feat: 로그인 기능 구현"

# 4. 원격 저장소로 Push
git push origin main
```

### GitHub → 로컬 (Pull)

```bash
# 원격 저장소에서 최신 변경사항 가져오기
git pull origin main
```

## 상황별 사용법

### 1. 웹에서 작업 후 로컬에 반영

```
[웹 Claude에서 작업]
1. 웹 Claude가 코드 작성
2. GitHub에 커밋 & Push

[로컬 Claude Code에서]
"GitHub에서 최신 변경사항 Pull해줘"
또는 직접:
git pull origin main
```

### 2. 로컬에서 작업 후 웹에서 확인

```
[로컬 Claude Code에서]
"작업 내용 커밋하고 GitHub에 Push해줘"
또는 직접:
git add . && git commit -m "작업 내용" && git push

[웹 Claude에서]
GitHub에서 최신 코드 확인 가능
```

### 3. 양쪽에서 동시 작업 (충돌 주의)

```
⚠️ 같은 파일 동시 수정 시 충돌 발생 가능

권장 방법:
1. 작업 전 항상 Pull 먼저
2. 다른 파일에서 작업하도록 분리
3. 충돌 발생 시 수동 해결
```

## Claude Code에게 지시하기

### Push 지시

```
"현재 변경사항 GitHub에 Push해줘"

"feat: 회원가입 기능이라는 메시지로 커밋하고 Push해줘"
```

### Pull 지시

```
"GitHub에서 최신 변경사항 Pull해줘"

"main 브랜치에서 Pull해줘"
```

### 상태 확인 지시

```
"git status 확인해줘"

"커밋되지 않은 변경사항 있어?"
```

## 충돌 해결

### 충돌 발생 시

```bash
# 충돌 메시지 예시
CONFLICT (content): Merge conflict in src/login.js
Automatic merge failed; fix conflicts and then commit.
```

### 해결 방법

```
Claude Code에게:
"Git 충돌 해결해줘"
"login.js 파일 충돌 내용 보여줘"
"원격 버전으로 유지해줘" 또는 "로컬 버전으로 유지해줘"
```

### 충돌 파일 형식

```javascript
<<<<<<< HEAD
// 로컬 버전
const message = "Hello";
=======
// 원격 버전
const message = "Hi";
>>>>>>> origin/main
```

## 브랜치 활용

### 기능별 브랜치 생성

```bash
# 새 브랜치 생성 및 전환
git checkout -b feature/login

# 작업 후 Push
git push origin feature/login

# main에 병합
git checkout main
git merge feature/login
```

### Claude Code에게 브랜치 지시

```
"feature/payment 브랜치 만들어줘"

"현재 브랜치 main으로 전환해줘"

"feature/login 브랜치를 main에 병합해줘"
```

## 자주 사용하는 Git 명령어

| 명령어 | 설명 |
|--------|------|
| `git status` | 현재 상태 확인 |
| `git add .` | 모든 변경사항 스테이징 |
| `git commit -m "메시지"` | 커밋 |
| `git push origin main` | 원격으로 Push |
| `git pull origin main` | 원격에서 Pull |
| `git branch` | 브랜치 목록 확인 |
| `git checkout -b 이름` | 새 브랜치 생성 |
| `git log --oneline` | 커밋 히스토리 확인 |

## 주의사항

- Push 전에 항상 Pull을 먼저 수행 (충돌 최소화)
- 민감정보는 `.gitignore`에 추가하여 Push 방지
- 커밋 메시지는 변경 내용을 명확하게 작성
- 큰 파일(100MB 이상)은 GitHub에 Push 불가
- 양쪽에서 같은 파일 동시 수정 피하기

