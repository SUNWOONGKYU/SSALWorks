# Claude Code 설치 방법과 흔한 오류 해결

> Claude Code를 설치하기 전에 Node.js와 Git을 먼저 설치해야 합니다.

---

## 설치 순서 (중요!)

```
1. Node.js 설치 (npm 포함)
      ↓
2. Git 설치
      ↓
3. Claude Code 설치
```

---

## Step 1: Node.js 설치

Node.js는 Claude Code가 실행되는 환경입니다. npm(패키지 관리자)이 함께 설치됩니다.

### 설치 방법

1. https://nodejs.org 접속
2. **LTS 버전** 다운로드 (안정 버전 권장)
3. 설치 파일 실행 → 기본 설정으로 Next 클릭

### 설치 확인

```bash
node --version    # v18.0.0 이상
npm --version     # 9.0.0 이상
```

---

## Step 2: Git 설치

Git은 코드 버전 관리 도구입니다. Claude Code가 프로젝트를 관리할 때 사용합니다.

### Windows 설치

1. https://git-scm.com 접속
2. **Download for Windows** 클릭
3. 설치 파일 실행 → 기본 설정으로 Next 클릭

### Mac 설치

```bash
# 터미널에서 실행
xcode-select --install
```

### 설치 확인

```bash
git --version    # git version 2.x.x
```

---

## Step 3: Claude Code 설치

Node.js와 Git이 설치되어 있어야 합니다.

### 설치 명령어

```bash
npm install -g @anthropic-ai/claude-code
```

### 설치 확인

```bash
claude --version
```

---

## 흔한 설치 오류

### 1. npm 권한 오류 (Windows)

```
Error: EPERM: operation not permitted
```

**해결:**
- 관리자 권한으로 PowerShell 실행
- 또는 npm 캐시 정리: `npm cache clean --force`

---

### 2. Node.js 버전 오류

```
Error: Node.js version must be >= 18
```

**해결:**
- Node.js 최신 LTS 버전 재설치: https://nodejs.org
- nvm 사용자: `nvm install 20 && nvm use 20`

---

### 3. 'claude' 명령어를 찾을 수 없음

```
'claude'은(는) 내부 또는 외부 명령... 이 아닙니다
```

**해결:**
- 터미널 완전히 닫고 재시작
- 또는 npx로 실행: `npx @anthropic-ai/claude-code`

---

### 4. Git이 설치되지 않음

```
git is not recognized as an internal or external command
```

**해결:**
- Git 설치: https://git-scm.com
- 설치 후 터미널 재시작

---

## 첫 실행 및 로그인

```bash
# 프로젝트 폴더에서 실행
cd 내프로젝트폴더
claude
```

첫 실행 시:
1. 브라우저가 자동으로 열림
2. Anthropic 계정으로 로그인
3. 로그인 완료 후 터미널로 돌아오면 사용 가능

**필요한 구독:**
- Claude Pro ($20/월) 또는 Claude Max ($100/월)
- 또는 Anthropic API 키 + 크레딧 충전

---

## 업데이트 방법

```bash
npm update -g @anthropic-ai/claude-code
```

---

## 제거 방법

```bash
npm uninstall -g @anthropic-ai/claude-code
```

---

## 문제 해결 안 될 때

1. Node.js 완전 제거 후 재설치
2. Git 재설치
3. npm 캐시 정리: `npm cache clean --force`
4. Claude Code 재설치: `npm install -g @anthropic-ai/claude-code`

---

*관련 문서: `Claude_Code_설치_전에_Node.js와_Git을_설치하는_이유.md`*
