# Claude Code 설치 방법 및 오류 해결

## 요약
Node.js 18 이상 필수. `npm install -g @anthropic-ai/claude-code`로 설치. 권한 오류 시 관리자 권한, 버전 오류 시 nvm으로 업그레이드.

## 상세

### 설치

```bash
# Node.js 버전 확인 (18 이상 필요)
node -v

# Claude Code 설치
npm install -g @anthropic-ai/claude-code

# 설치 확인
claude --version
```

### 자주 발생하는 오류

| 오류 | 해결 |
|------|------|
| EACCES 권한 오류 | 관리자 권한으로 실행 또는 `sudo npm install` |
| Node.js 버전 오류 | `nvm install 20 && nvm use 20` |
| 네트워크 오류 | `npm cache clean --force` 후 재시도 |

### 설치 후 첫 실행

```bash
cd /path/to/your/project
claude
```
첫 실행 시 브라우저에서 Anthropic 계정 인증 필요.

---
📚 더 자세히: https://docs.anthropic.com/claude-code
