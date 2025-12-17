# Git으로 버전 관리하기

## 핵심 요약

Git을 설치하고 수시로 커밋하세요. 파일이 잘못 수정되거나 삭제되어도 이전 버전으로 복구할 수 있습니다. `git init` → `git add .` → `git commit -m "메시지"` 순서로 사용합니다.

## Git이란?

코드와 파일의 **변경 이력을 추적하는 버전 관리 시스템**입니다. 언제, 무엇을, 왜 변경했는지 기록되므로 문제가 생기면 과거로 돌아갈 수 있습니다.

### 비유로 이해하기

```
Git = 타임머신

문서 작성 중 "저장" 버튼을 누르면
그 시점의 상태가 기록됨

잘못 수정해도 과거 버전으로 돌아갈 수 있음
```

## 왜 Git을 사용하나?

### 1. 실수 복구

```
잘못된 코드 수정 → git checkout으로 복구
파일 삭제 → git restore로 복구
전체 엉망 → git reset으로 과거로 복귀
```

### 2. 변경 이력 추적

```
"이 코드 언제 바뀌었지?"
→ git log로 확인

"누가 이렇게 바꿨지?"
→ git blame으로 확인
```

### 3. 협업 지원

여러 사람이 같은 프로젝트에서 작업할 때 충돌을 관리합니다.

## Git 설치

### Windows

1. https://git-scm.com 에서 다운로드
2. 설치 마법사 실행 (기본 옵션 유지)
3. 설치 후 터미널에서 확인:
```bash
git --version
```

### 초기 설정

```bash
git config --global user.name "홍길동"
git config --global user.email "hong@example.com"
```

## 기본 사용법

### 프로젝트에서 Git 시작

```bash
cd /path/to/project
git init
```

### 변경사항 저장 (커밋)

```bash
# 1. 변경된 파일 확인
git status

# 2. 저장할 파일 선택 (모든 파일)
git add .

# 3. 커밋 (저장)
git commit -m "feat: 로그인 기능 추가"
```

### 세 단계 흐름

```
작업 디렉토리    →    스테이징    →    저장소
(Working)           (Staging)       (Repository)
   ↓                    ↓               ↓
파일 수정          git add         git commit
```

## 자주 사용하는 명령어

| 명령어 | 설명 | 예시 |
|--------|------|------|
| `git status` | 현재 상태 확인 | `git status` |
| `git add` | 변경 파일 스테이징 | `git add .` |
| `git commit` | 변경사항 저장 | `git commit -m "메시지"` |
| `git log` | 커밋 이력 보기 | `git log --oneline` |
| `git diff` | 변경 내용 보기 | `git diff` |
| `git checkout` | 파일 복구 | `git checkout -- file.js` |
| `git reset` | 커밋 되돌리기 | `git reset --hard HEAD~1` |

## 커밋 메시지 작성법

### Conventional Commits 형식

```
<타입>: <설명>

예시:
feat: 로그인 기능 추가
fix: 이메일 유효성 검사 버그 수정
docs: README 업데이트
style: 코드 포맷팅
refactor: 함수 구조 개선
test: 단위 테스트 추가
chore: 패키지 업데이트
```

### 좋은 커밋 메시지

```
✅ 좋은 예:
feat: 회원가입 폼 유효성 검사 추가
fix: 로그인 시 빈 이메일 허용 버그 수정
docs: API 문서에 인증 섹션 추가

❌ 나쁜 예:
수정
update
asdf
작업중
```

## 실수 복구 방법

### 파일 하나 복구

```bash
# 수정 취소 (커밋 전)
git checkout -- login.js

# 삭제된 파일 복구
git restore login.js
```

### 마지막 커밋 취소

```bash
# 커밋만 취소 (파일은 유지)
git reset --soft HEAD~1

# 커밋과 파일 모두 되돌리기
git reset --hard HEAD~1
```

### 특정 커밋으로 돌아가기

```bash
# 커밋 이력 확인
git log --oneline

# 특정 커밋으로 이동
git reset --hard abc1234
```

## GitHub 연동

### 원격 저장소 연결

```bash
# 원격 저장소 추가
git remote add origin https://github.com/username/repo.git

# 푸시 (업로드)
git push -u origin main

# 풀 (다운로드)
git pull origin main
```

### GitHub 사용 이점

| 이점 | 설명 |
|------|------|
| 백업 | 로컬 파일 손실 시 복구 가능 |
| 협업 | 여러 사람이 함께 작업 |
| 이력 보관 | 모든 변경 이력 영구 보관 |
| 접근성 | 어디서든 코드 접근 가능 |

## Claude Code와 함께 사용

### 작업 완료 후 커밋 요청

```
"변경사항 커밋해줘"
또는
/commit (Slash Command 정의 시)
```

### Claude Code가 하는 일

```
1. git status로 변경 확인
2. 변경 내용 분석
3. 적절한 커밋 메시지 생성
4. git add → git commit 실행
```

## 커밋 주기

### 권장 커밋 시점

```
✅ 커밋하기 좋은 시점:
- 기능 하나 완료 시
- 버그 수정 완료 시
- 작업 중단 전 (퇴근, 휴식)
- 중요한 변경 후

❌ 피해야 할 커밋:
- 동작하지 않는 코드
- 임시 디버깅 코드 포함
- 민감정보 포함
```

### 작은 단위로 자주

```
❌ 나쁜 예:
하루 작업 전체를 한 번에 커밋

✅ 좋은 예:
기능 A 완료 → 커밋
기능 B 완료 → 커밋
버그 수정 → 커밋
```

## 주의사항

- 민감정보(API 키, 비밀번호)는 절대 커밋하지 않기 (.gitignore 활용)
- 커밋 메시지는 의미 있게 작성
- 동작하지 않는 코드는 커밋 전 수정
- 대용량 파일은 Git LFS 사용 권장
- 정기적으로 원격 저장소에 푸시
