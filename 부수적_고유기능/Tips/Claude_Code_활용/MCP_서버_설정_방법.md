# MCP 서버 설정 방법

## 질문
MCP 서버는 무엇이고 어떻게 설정하나요?

## 답변

### MCP(Model Context Protocol)란?
Claude Code의 기능을 확장하는 프로토콜입니다.
- 파일 시스템 접근
- 데이터베이스 연동
- 웹 검색
- GitHub 연동 등

### MCP 서버 추가 방법

**1. 명령어로 추가**
```bash
claude mcp add [서버명]
```

**2. 설정 파일 직접 편집**
```json
// ~/.claude/claude_desktop_config.json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/project"]
    }
  }
}
```

### 자주 사용하는 MCP 서버

| 서버 | 용도 |
|------|------|
| `@modelcontextprotocol/server-filesystem` | 파일 시스템 접근 |
| `@modelcontextprotocol/server-memory` | 세션 간 메모리 유지 |
| `@modelcontextprotocol/server-github` | GitHub 연동 |
| `@anthropics/claude-code-supabase-mcp` | Supabase 연동 |

### SSAL Works 프로젝트 MCP 설정

SSAL Works에서는 Memory MCP 서버가 설정되어 있어서:
- 중요한 정보 자동 기억
- 이전 세션 컨텍스트 활용 가능

### 관련 문서
- `학습용_Books/1_Claude_사용법/Claude&ClaudeCode사용법/15편_MCP_서버_활용.md`
