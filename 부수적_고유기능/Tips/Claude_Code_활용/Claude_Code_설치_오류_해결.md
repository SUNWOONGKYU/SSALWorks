# Claude Code 설치 오류 해결

## 질문
Claude Code 설치 시 오류가 발생해요.

## 답변

### 사전 요구사항
- **Node.js 18 이상** 필수
- 터미널에서 `node -v`로 버전 확인

### 설치 명령어
```bash
npm install -g @anthropic-ai/claude-code
```

### 흔한 오류와 해결책

**1. 권한 오류 (EACCES)**
```bash
# Mac/Linux
sudo npm install -g @anthropic-ai/claude-code

# Windows (관리자 권한으로 터미널 실행)
```

**2. Node.js 버전 오류**
```bash
# nvm으로 Node.js 업그레이드
nvm install 18
nvm use 18
```

**3. 네트워크 오류**
```bash
# npm 레지스트리 확인
npm config set registry https://registry.npmjs.org/
```

### API 키 설정

설치 후 Anthropic API 키 필요:
```bash
# 환경변수 설정
export ANTHROPIC_API_KEY="your-api-key"

# 또는 Claude Code 실행 시 입력
```

### API 키 발급
- Anthropic Console: https://console.anthropic.com/
- Account Settings → API Keys → Create Key

### 관련 문서
- `학습용_콘텐츠/1_Claude_사용법/Claude&ClaudeCode사용법/`
