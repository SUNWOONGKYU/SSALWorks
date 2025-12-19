# SQL 직접 실행해야 할 경우

## 요약
MCP 서버나 CLI 설정 있으면 Claude Code가 SQL 직접 실행 가능. 없으면 SQL 파일 생성 후 사용자가 Supabase SQL Editor에서 직접 실행.

## 상세

### Claude Code가 직접 실행 가능한 경우

| 방법 | 설정 | 확인 명령 |
|------|------|----------|
| Supabase MCP | MCP 서버 설정 | `claude mcp list` |
| Supabase CLI | CLI 설치 + 연결 | `supabase status` |
| psql | psql + 연결문자열 | `psql --version` |

### MCP로 실행 요청

```
"MCP로 users 테이블 생성해줘"
"Supabase MCP 써서 이 SQL 실행해줘"
```

### 사용자가 직접 실행해야 할 경우

MCP/CLI 미설정 시:
1. "users 테이블 생성 SQL 작성해줘"
2. Claude Code가 .sql 파일 생성
3. Supabase SQL Editor에서 붙여넣기 → Run
4. "SQL 실행 완료됐어" 알려주기

### 권장: MCP 설정

```bash
claude mcp add supabase
```
한 번 설정하면 이후 모든 SQL 작업을 Claude Code가 대신 실행.

---
📚 더 자세히: `외부_연동_설정_Guide/MCP_설정_가이드.md`
