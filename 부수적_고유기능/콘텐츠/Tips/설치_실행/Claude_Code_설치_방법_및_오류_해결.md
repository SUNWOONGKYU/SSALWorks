# Claude Code 설치 방법 및 오류 해결

> 이 문서는 Claude Code를 설치하고 자주 발생하는 오류를 해결하는 방법을 설명합니다.

---

## 사전 요구사항

- Node.js 18 이상
- npm 또는 yarn
- Anthropic 계정

---

## 설치 방법

```bash
# 1. Node.js 버전 확인 (18 이상 필요)
node -v

# 2. Claude Code 설치
npm install -g @anthropic-ai/claude-code

# 3. 설치 확인
claude --version
```

---

## 첫 실행

```bash
# 프로젝트 폴더로 이동
cd /path/to/your/project

# Claude Code 시작
claude
```

첫 실행 시 브라우저에서 Anthropic 계정 인증이 필요합니다.

---

## 자주 발생하는 오류

| 오류 | 원인 | 해결 방법 |
|------|------|----------|
| EACCES 권한 오류 | 전역 설치 권한 없음 | 관리자 권한 또는 `sudo npm install` |
| Node.js 버전 오류 | 버전 18 미만 | `nvm install 20 && nvm use 20` |
| 네트워크 오류 | npm 캐시 문제 | `npm cache clean --force` |
| 인증 실패 | 토큰 만료 | `claude --logout` 후 재로그인 |

---

## 업데이트

```bash
npm update -g @anthropic-ai/claude-code
```

---

## Claude Code에게 요청하기

```
"현재 Claude Code 버전 확인해줘"
"설정 파일 위치 알려줘"
```

---

## 체크리스트

- [ ] Node.js 18 이상 설치되었는가?
- [ ] `npm install -g`로 전역 설치했는가?
- [ ] `claude --version`으로 확인했는가?
- [ ] Anthropic 계정 인증 완료했는가?

---

*상세 내용: https://docs.anthropic.com/claude-code 참조*

