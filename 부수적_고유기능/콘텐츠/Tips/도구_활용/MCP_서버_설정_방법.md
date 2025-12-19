# MCP 서버 설정 방법

## 요약
MCP(Model Context Protocol)로 Claude Code 기능 확장. `claude mcp add [서버명]`으로 추가. Memory(세션 간 기억), Supabase(DB 직접 접근), GitHub(PR/Issue 관리) 등.

## 상세

### 자주 사용하는 MCP 서버

| 서버 | 용도 |
|------|------|
| `memory` | 세션 간 정보 유지 |
| `supabase` | DB 쿼리 직접 실행 |
| `github` | PR, Issue 직접 관리 |
| `filesystem` | 파일 접근 확장 |

### 추가 명령어

```bash
claude mcp add memory       # 세션 간 기억
claude mcp add supabase     # Supabase 연동
claude mcp list             # 설치된 서버 목록
```

### 설정 파일 예시

```json
{
  "mcpServers": {
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    }
  }
}
```
위치: `%APPDATA%\Claude\claude_desktop_config.json` (Windows)

### 권장 조합
- 기본: Memory + Filesystem
- 풀스택: Memory + Supabase + GitHub

---
📚 더 자세히: `외부_연동_설정_Guide/MCP_설정_가이드.md`
