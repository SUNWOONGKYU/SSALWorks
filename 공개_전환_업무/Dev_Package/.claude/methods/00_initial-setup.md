# 00. 초기 설정 (Dev Package 첫 실행 시)

> **적용 시점**: 사용자가 Dev Package 다운로드 후 처음 `claude` 명령어를 실행했을 때
> **트리거 표현**: "개발 환경 확인해줘", "프로젝트 초기 설정 해줘", "개발 환경 설정"

---

## 핵심 원칙

```
사용자가 Dev Package를 다운로드하고 Claude Code를 실행했다면,
나머지는 모두 Claude Code가 알아서 처리한다.
```

---

## 1. 개발 도구 확인 (필수)

### 확인할 도구 목록

| 도구 | 확인 명령어 | 필수 여부 |
|------|------------|----------|
| Git | `git --version` | 필수 |
| Node.js | `node --version` | 설치됨 (Claude Code 실행 가능하면) |
| npm | `npm --version` | 설치됨 (Node.js에 포함) |

### 확인 프로세스

```bash
# Step 1: Git 확인
git --version

# Step 2: Git 사용자 설정 확인
git config user.name
git config user.email

# Step 3: Node.js 확인 (이미 설치됨 - Claude Code 실행 가능하면)
node --version

# Step 4: npm 확인
npm --version
```

### Git 사용자 설정 안내

Git 사용자 정보가 설정되어 있지 않으면 커밋이 불가능합니다.

**미설정 시 안내:**
```
"Git 사용자 정보가 설정되어 있지 않습니다.

다음 명령어로 설정해주세요:
git config --global user.name \"이름\"
git config --global user.email \"이메일@example.com\"

설정 완료 후 '다시 확인해줘'라고 말씀해주세요."
```

### 결과별 대응

**모두 설치됨:**
```
"개발 도구가 모두 설치되어 있습니다.

- Git: v2.x.x
- Node.js: v20.x.x
- npm: v10.x.x

다음 단계로 프로젝트 초기화를 진행하겠습니다."
```

**Git 미설치:**
```
"Git이 설치되어 있지 않습니다. Git 설치가 필요합니다.

설치 방법:
- Windows: https://git-scm.com 에서 다운로드
- Mac: 터미널에서 'xcode-select --install' 실행

설치 완료 후 '다시 확인해줘'라고 말씀해주세요."
```

---

## 2. 프로젝트 초기화

### Git 저장소 확인 및 초기화

```bash
# .git 폴더 존재 확인
ls -la .git

# 없으면 초기화
git init
```

### 설정 파일 확인

확인할 파일 목록:

| 파일 | 용도 | 없으면? |
|------|------|---------|
| `.claude/CLAUDE.md` | AI 최상위 지침 | Dev Package 손상 - 재다운로드 안내 |
| `.ssal-project.json` | 프로젝트 설정 | 수정 필요 안내 |
| `.gitignore` | Git 제외 설정 | 존재해야 함 |
| `README.md` | 패키지 설명 | 존재해야 함 |

### .ssal-project.json 설정 안내

**필드 설명:**

| 필드 | 설명 | 예시 |
|------|------|------|
| `project_id` | 프로젝트 고유 식별자 (영문, 숫자, 하이픈) | `my-saas-project` |
| `project_name` | 프로젝트 표시명 (한글 가능) | `내 SaaS 프로젝트` |
| `owner_email` | SSAL Works 가입 이메일 | `user@example.com` |

```
".ssal-project.json 파일을 확인해주세요.

현재 내용:
{
  \"project_id\": \"your-project-id\",
  \"project_name\": \"내 프로젝트명\",
  \"owner_email\": \"your-email@example.com\"
}

→ 프로젝트에 맞게 수정이 필요합니다.
  수정하시겠습니까? (프로젝트명과 이메일을 알려주세요)"
```

> **참고**: `owner_email`은 SSAL Works 플랫폼 연동 시 사용됩니다. 가입한 이메일과 동일해야 합니다.

---

## 3. 초기 커밋 (선택)

Git 저장소가 초기화되고 변경 사항이 있으면:

```bash
git add .
git commit -m "Initial commit: Project setup complete"
```

---

## 4. 다음 단계 안내

### 완료 메시지

```
"프로젝트 초기 설정이 완료되었습니다!

현재 상태:
- Git 저장소: 초기화 완료
- 개발 도구: 모두 설치됨
- 프로젝트 설정: 확인 완료

다음 단계:
1. SSAL Works 사이트의 '진행 프로세스'에서 현재 단계 확인
2. 안내문 읽고 Order Sheet 작성
3. Claude Code에게 Order Sheet 전달하여 작업 지시

'진행 프로세스 확인해줘' 또는 '다음 단계 알려줘'라고 말씀해주세요."
```

---

# 후속 단계 (S0 완료 후)

> 아래 내용은 초기 설정이 아닌, S0 (Project SAL Grid 생성) 완료 후 수행하는 작업입니다.

---

## 5. GitHub 배포 안내 (S0 완료 후)

S0 (Project SAL Grid 생성)이 완료되면:

### 사전 조건 확인

```bash
# GitHub CLI 설치 확인
gh --version

# GitHub 로그인 상태 확인
gh auth status
```

### 미설치 시 안내

```
"GitHub Pages 배포를 위해 설정이 필요합니다.

1. GitHub CLI 설치:
   - Windows: winget install GitHub.cli
   - Mac: brew install gh
   - 또는: https://cli.github.com/

2. GitHub 로그인:
   gh auth login
   (브라우저에서 인증)

설정 완료 후 '배포해줘'라고 말씀해주세요."
```

### 배포 프로세스

```bash
# Step 1: Git 초기화 (없으면)
git init

# Step 2: 커밋
git add .
git commit -m "Initial commit: Project SAL Grid setup complete"

# Step 3: GitHub 레포 생성 + 푸시
gh repo create {프로젝트명} --public --source=. --push

# Step 4: GitHub Pages 활성화
gh api repos/{owner}/{repo}/pages -X POST --input - <<< '{"build_type":"legacy","source":{"branch":"main","path":"/"}}'
```

---

## 6. SSAL Works 플랫폼 연동 (선택)

사용자가 "Viewer 연결해줘"라고 말하면:

### 수행 작업

```bash
# 1. Git remote URL 확인
git remote get-url origin
```

### Supabase users 테이블 업데이트

SSAL Works 플랫폼의 users 테이블에 GitHub 레포지토리 URL을 등록합니다.

```bash
# REST API로 users 테이블 업데이트
curl -X PATCH "https://zwjmfewyshhwpgwdtrus.supabase.co/rest/v1/users?email=eq.{사용자이메일}" \
  -H "apikey: {SUPABASE_ANON_KEY}" \
  -H "Authorization: Bearer {SUPABASE_ANON_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"github_repo_url": "https://github.com/{username}/{repo}"}'
```

> **참고**: 환경변수는 SSAL Works 플랫폼에서 제공됩니다. Claude Code가 자동으로 처리합니다.

### 완료 메시지

```
"SSAL Works 플랫폼 연동 완료!

www.ssalworks.ai.kr에서 확인할 수 있습니다:
1. 사이트 접속 후 로그인
2. 사이드바 → Project SAL Grid → '내 프로젝트'

GitHub URL: https://github.com/{username}/{repo}

Task 완료 후 git push하면 실시간으로 반영됩니다."
```

---

## 체크리스트

### 초기 설정

- [ ] Git 설치 확인
- [ ] Node.js 설치 확인 (Claude Code 실행 가능하면 OK)
- [ ] .claude/CLAUDE.md 존재 확인
- [ ] .ssal-project.json 확인/수정
- [ ] Git 저장소 초기화
- [ ] 초기 커밋 (선택)

### S0 완료 후

- [ ] GitHub CLI 설치 확인
- [ ] GitHub 로그인 확인
- [ ] GitHub 레포 생성
- [ ] GitHub Pages 활성화
- [ ] Viewer URL 안내

### SSAL Works 연동

- [ ] Git remote URL 확인
- [ ] users 테이블 github_repo_url 업데이트
- [ ] 연동 완료 안내

---

## 참고 문서

- SSAL Works 웹사이트: www.ssalworks.ai.kr
- Project_Registration.md: 개발환경설정 상세 가이드 (사람용)
- .claude/CLAUDE.md: AI 최상위 지침
