# Claude Code 설치 방법과 흔한 오류 해결

> 이 문서는 Claude Code 설치 방법과 설치 중 발생하는 오류 해결 방법을 설명합니다.

---

## 설치 전 요구사항

| 항목 | 요구 버전 |
|------|----------|
| Node.js | 18.0 이상 |
| npm | Node.js에 포함 |
| OS | Windows 10+, macOS, Linux |

---

## 설치 방법

```bash
npm install -g @anthropic-ai/claude-code
```

설치 확인:
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
- Node.js 최신 버전 설치: https://nodejs.org
- nvm 사용자: `nvm install 20 && nvm use 20`

---

### 3. PATH 설정 오류

```
'claude'은(는) 내부 또는 외부 명령... 이 아닙니다
```

**해결:**
- 터미널 재시작
- 또는 npx로 실행: `npx @anthropic-ai/claude-code`

---

## API 키 설정

첫 실행 시 API 키 입력:
```bash
claude
# API 키 입력 프롬프트 표시됨
```

또는 환경 변수로 설정:
```bash
export ANTHROPIC_API_KEY=sk-ant-...
```

---

## 실행 확인

```bash
claude
# "무엇을 도와드릴까요?" 메시지 표시되면 성공
```

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
2. npm 캐시 정리: `npm cache clean --force`
3. 재설치: `npm install -g @anthropic-ai/claude-code`

---

*상세 내용: `폴더에서_터미널_열어_실행하기.md` 참조*
