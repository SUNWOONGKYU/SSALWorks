# MCP 서버 설정 방법

## 핵심 요약

MCP(Model Context Protocol)로 Claude Code의 기능을 확장할 수 있습니다. `claude mcp add [서버명]` 명령어로 추가하세요. Memory(세션 간 기억), Filesystem, GitHub, Supabase 등 필요한 서버를 설정하면 작업이 편리해집니다.

## MCP란?

**Model Context Protocol**의 약자로, Claude Code가 외부 도구 및 서비스와 연동할 수 있게 해주는 프로토콜입니다. MCP 서버를 추가하면 Claude Code가 해당 서비스의 기능을 사용할 수 있습니다.

### 비유로 이해하기

```
Claude Code = 스마트폰
MCP 서버 = 앱

스마트폰에 앱을 설치하면 기능이 늘어나듯
Claude Code에 MCP 서버를 추가하면 기능이 확장됨
```

## 왜 MCP 서버를 사용하나?

### 1. 세션 간 정보 유지 (Memory)

```
기본 Claude Code:
세션 종료 → 모든 대화 내용 사라짐

Memory MCP 추가:
세션 종료 → 중요 정보는 기억됨 → 다음 세션에서 활용
```

### 2. 외부 서비스 직접 접근

```
기본: Supabase 작업 시 SQL 직접 복사-붙여넣기

Supabase MCP 추가:
"users 테이블에서 최근 가입자 조회해줘"
→ Claude Code가 직접 Supabase에 쿼리 실행
```

### 3. 파일 시스템 확장 접근

특정 경로에 대한 확장된 접근 권한을 설정할 수 있습니다.

## 자주 사용하는 MCP 서버

| 서버 | 용도 | 설명 |
|------|------|------|
| `memory` | 세션 간 기억 | 중요 정보를 세션 간 유지 |
| `filesystem` | 파일 시스템 | 파일 읽기/쓰기 확장 |
| `github` | GitHub 연동 | PR, Issue 직접 관리 |
| `supabase` | Supabase 연동 | DB 쿼리, 인증 직접 접근 |
| `brave-search` | 웹 검색 | 인터넷 검색 기능 |
| `puppeteer` | 브라우저 | 웹 자동화, 스크린샷 |

## MCP 서버 추가 방법

### 기본 명령어

```bash
claude mcp add [서버명]
```

### Memory 서버 추가

```bash
claude mcp add memory
```

**효과**: 세션 간에 중요한 정보가 유지됩니다.

### Filesystem 서버 추가

```bash
claude mcp add filesystem --path /path/to/project
```

**효과**: 지정된 경로에 대한 확장된 파일 접근 권한.

### GitHub 서버 추가

```bash
claude mcp add github
```

**효과**: GitHub API 직접 사용 가능 (PR 생성, Issue 관리 등).

## 설정 파일 위치

MCP 설정은 다음 위치에 저장됩니다:

```
Windows: %APPDATA%\Claude\claude_desktop_config.json
macOS: ~/Library/Application Support/Claude/claude_desktop_config.json
Linux: ~/.config/claude/claude_desktop_config.json
```

### 설정 파일 예시

```json
{
  "mcpServers": {
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/dir"]
    }
  }
}
```

## 서버별 상세 설정

### Memory 서버

```json
{
  "memory": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-memory"]
  }
}
```

**활용 예시**:
```
"이 프로젝트의 기술 스택을 기억해줘"
→ 다음 세션에서 "기술 스택이 뭐였지?" 물으면 답변 가능
```

### Supabase 서버

```json
{
  "supabase": {
    "command": "npx",
    "args": ["-y", "@supabase/mcp-server"],
    "env": {
      "SUPABASE_URL": "https://xxx.supabase.co",
      "SUPABASE_KEY": "your-service-role-key"
    }
  }
}
```

**활용 예시**:
```
"users 테이블 스키마 보여줘"
"최근 7일 가입자 수 조회해줘"
→ Claude Code가 직접 Supabase에 접근
```

### GitHub 서버

```json
{
  "github": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-github"],
    "env": {
      "GITHUB_TOKEN": "your-github-token"
    }
  }
}
```

**활용 예시**:
```
"이 변경사항으로 PR 만들어줘"
"열린 Issue 목록 보여줘"
→ Claude Code가 직접 GitHub API 호출
```

## MCP 서버 관리 명령어

| 명령어 | 설명 |
|--------|------|
| `claude mcp list` | 설치된 MCP 서버 목록 |
| `claude mcp add [서버]` | 서버 추가 |
| `claude mcp remove [서버]` | 서버 제거 |

## 권장 설정 조합

### 기본 개발 환경

```
Memory + Filesystem
→ 세션 간 정보 유지 + 파일 작업 확장
```

### 풀스택 개발 환경

```
Memory + Filesystem + GitHub + Supabase
→ 코드 관리 + DB 접근 + 협업 기능 전체
```

### 웹 리서치 환경

```
Memory + Brave Search + Puppeteer
→ 정보 기억 + 검색 + 웹 자동화
```

## 주의사항

- API 키는 환경 변수로 관리 (설정 파일에 직접 노출 주의)
- 필요한 서버만 추가 (너무 많으면 느려질 수 있음)
- 서버마다 필요한 권한이 다름 (보안 고려)
- 일부 서버는 유료 API 사용량 발생 가능
- MCP 서버 추가 후 Claude Code 재시작 필요

## 문제 해결

### 서버가 연결되지 않을 때

1. `claude mcp list`로 서버 상태 확인
2. 설정 파일 문법 오류 확인 (JSON 형식)
3. API 키/토큰 유효성 확인
4. Claude Code 재시작

### 권한 오류 발생 시

1. 환경 변수 설정 확인
2. API 키 권한 범위 확인
3. 파일 시스템 접근 경로 확인
