# Claude Code 설치 방법 및 오류 해결

## 핵심 요약

Node.js 18 이상이 필수입니다. `npm install -g @anthropic-ai/claude-code`로 설치하세요. 권한 오류 시 관리자 권한으로 실행, 버전 오류 시 nvm으로 Node.js 업그레이드, 네트워크 오류 시 npm 레지스트리를 확인하세요.

## 설치 전 준비사항

### 1. Node.js 버전 확인

```bash
node -v
# v18.0.0 이상이어야 함
```

Node.js가 없거나 버전이 낮으면 설치/업그레이드가 필요합니다.

### 2. Node.js 설치 방법

**Windows:**
1. https://nodejs.org 에서 LTS 버전 다운로드
2. 설치 마법사 실행
3. 터미널 재시작

**nvm 사용 (권장):**
```bash
# nvm 설치 후
nvm install 20
nvm use 20
```

## Claude Code 설치

### 기본 설치 명령어

```bash
npm install -g @anthropic-ai/claude-code
```

### 설치 확인

```bash
claude --version
```

## 자주 발생하는 오류 및 해결

### 1. 권한 오류 (EACCES)

**증상:**
```
Error: EACCES: permission denied
```

**해결:**

Windows:
```bash
# 관리자 권한으로 PowerShell 실행 후
npm install -g @anthropic-ai/claude-code
```

Mac/Linux:
```bash
sudo npm install -g @anthropic-ai/claude-code
```

또는 npm 전역 경로 변경:
```bash
npm config set prefix ~/.npm-global
# PATH에 ~/.npm-global/bin 추가
```

### 2. Node.js 버전 오류

**증상:**
```
Error: Node.js 18 or higher is required
```

**해결:**
```bash
# nvm으로 업그레이드
nvm install 20
nvm use 20

# 또는 Node.js 재설치
```

### 3. 네트워크 오류

**증상:**
```
npm ERR! network timeout
npm ERR! ETIMEDOUT
```

**해결:**
```bash
# npm 레지스트리 확인
npm config get registry

# 기본 레지스트리로 설정
npm config set registry https://registry.npmjs.org/

# 캐시 정리 후 재시도
npm cache clean --force
npm install -g @anthropic-ai/claude-code
```

### 4. 이미 설치된 경우 업데이트

```bash
npm update -g @anthropic-ai/claude-code
```

## 설치 후 첫 실행

설치가 완료되면 프로젝트 폴더에서 `claude` 명령어로 실행합니다.

```bash
cd /path/to/your/project
claude
```

> **실행 방법 상세**: "폴더에서 터미널 열어 실행하기" 팁을 참고하세요.

## 인증

첫 실행 시 브라우저에서 Anthropic 계정 인증이 필요합니다.
- Claude Max 또는 Pro 구독이 필요합니다
- 인터넷 연결 필수

## 주의사항

- Node.js 18 이상 필수
- Claude Max 또는 Pro 구독 필요
- 회사 네트워크에서는 프록시 설정이 필요할 수 있음
- 정기적으로 업데이트 확인 (`npm update -g @anthropic-ai/claude-code`)
