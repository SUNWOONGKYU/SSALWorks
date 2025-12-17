# SQL 직접 실행해야 할 경우

## 핵심 요약

Claude Code가 SQL을 직접 실행할 수 있는 경우도 있고, 사용자가 직접 실행해야 하는 경우도 있습니다. MCP 서버 설정이나 CLI 도구가 있으면 Claude Code가 대신 실행할 수 있습니다.

## Claude Code가 SQL을 직접 실행할 수 있는 경우

### 전제조건

| 방법 | 필요 설정 | 설명 |
|------|----------|------|
| **Supabase MCP 서버** | MCP 서버 설정 | 가장 권장되는 방법 |
| **Supabase CLI** | CLI 설치 + 프로젝트 연결 | 터미널에서 실행 |
| **psql 클라이언트** | psql 설치 + 연결 문자열 | PostgreSQL 직접 연결 |

### 1. Supabase MCP 서버 (권장)

```
MCP 서버가 설정되어 있으면:
✅ Claude Code가 SQL 직접 실행 가능
✅ 테이블 생성, RLS 정책, 인덱스 등 모두 가능
```

**설정 확인:**
```
claude mcp list

출력에 supabase가 있으면 설정됨:
- supabase: connected
```

**MCP로 실행 예시:**
```
"users 테이블 생성해줘"
→ Claude Code가 MCP를 통해 직접 CREATE TABLE 실행
```

### 2. Supabase CLI

```
CLI가 설치되고 프로젝트가 연결되어 있으면:
✅ Claude Code가 supabase db 명령어로 실행 가능
```

**설정 확인:**
```bash
supabase --version  # CLI 설치 확인
supabase status     # 프로젝트 연결 확인
```

**CLI로 실행 예시:**
```bash
# Claude Code가 이 명령을 실행
supabase db execute -f create_users.sql
```

### 3. psql 클라이언트

```
psql이 설치되고 연결 문자열이 있으면:
✅ Claude Code가 psql 명령으로 실행 가능
```

**설정 확인:**
```bash
psql --version  # psql 설치 확인
```

**연결 문자열 필요:**
```
DATABASE_URL=postgresql://user:password@host:port/database
```

**psql로 실행 예시:**
```bash
# Claude Code가 이 명령을 실행
psql "$DATABASE_URL" -f create_users.sql
psql "$DATABASE_URL" -c "CREATE TABLE users (...);"
```

## Claude Code 대신 실행 요청 방법

### MCP가 설정된 경우

```
"MCP로 users 테이블 생성해줘"

"Supabase MCP 써서 이 SQL 실행해줘:
CREATE TABLE products (...);"
```

### CLI가 설정된 경우

```
"Supabase CLI로 이 SQL 파일 실행해줘"

"supabase db execute로 스키마 적용해줘"
```

## 사용자가 직접 실행해야 하는 경우

### 직접 실행이 필요한 상황

| 상황 | 이유 | 대안 |
|------|------|------|
| MCP 미설정 | Claude Code가 DB에 접근 불가 | MCP 설정 또는 SQL Editor |
| CLI 미설치 | 명령어 실행 불가 | CLI 설치 또는 SQL Editor |
| 보안 제한 | 연결 정보 없음 | SQL Editor에서 직접 |
| 특수 권한 필요 | 슈퍼유저 권한 등 | Dashboard에서 직접 |

### 직접 실행 필요 시 작업 흐름

```
[1단계: Claude Code에게 SQL 작성 요청]
"users 테이블 생성 SQL 작성해줘"

[2단계: SQL 파일 확인]
Claude Code가 .sql 파일 생성

[3단계: Supabase SQL Editor에서 실행]
1. Supabase Dashboard 접속
2. SQL Editor 클릭
3. SQL 붙여넣기
4. Run 버튼 클릭

[4단계: 결과 공유]
"SQL 실행 완료됐어" 또는 "이런 오류 발생: [오류]"
```

## 설정 방법

### Supabase MCP 서버 설정

```bash
# MCP 서버 추가
claude mcp add supabase

# 또는 설정 파일에서 추가
# .claude/mcp_servers.json
```

**설정 후 확인:**
```
"Supabase MCP 연결 상태 확인해줘"
```

### Supabase CLI 설정

```bash
# CLI 설치
npm install -g supabase

# 로그인
supabase login

# 프로젝트 연결
supabase link --project-ref [project-id]
```

**설정 후 확인:**
```
"Supabase CLI로 DB 상태 확인해줘"
```

## 작업 유형별 실행 방법

### 테이블 생성

```
[MCP 있을 때]
"MCP로 users 테이블 생성해줘"
→ Claude Code가 직접 실행

[MCP 없을 때]
"users 테이블 생성 SQL 작성해줘"
→ 사용자가 SQL Editor에서 실행
```

### RLS 정책 설정

```
[CLI 있을 때]
"CLI로 RLS 정책 SQL 실행해줘"
→ Claude Code가 supabase db execute 실행

[CLI 없을 때]
"RLS 정책 SQL 작성해줘"
→ 사용자가 SQL Editor에서 실행
```

### 인덱스 추가

```
[psql 있을 때]
"psql로 인덱스 추가해줘"
→ Claude Code가 psql -c 명령 실행

[psql 없을 때]
"인덱스 추가 SQL 만들어줘"
→ 사용자가 SQL Editor에서 실행
```

## 권장 설정

### 가장 편리한 방법: MCP 서버 설정

```
✅ 한 번 설정하면 이후 모든 SQL 작업을 Claude Code가 대신 실행
✅ "~해줘"라고만 하면 됨
✅ SQL Editor 왔다갔다 불필요

설정 명령:
claude mcp add supabase
```

### 차선책: Supabase CLI 설정

```
✅ 파일 기반 SQL 실행 가능
✅ 마이그레이션 관리 가능
✅ 버전 관리와 연동 용이
```

## 현재 설정 확인 요청

```
"현재 Supabase 연결 방법 확인해줘:
- MCP 서버 설정됐어?
- CLI 설치됐어?
- psql 사용 가능해?"
```

## 체크리스트

### SQL 실행 전 확인

- [ ] MCP/CLI/psql 중 하나 설정됐는가?
- [ ] DB 연결 확인됐는가?
- [ ] SQL 문법 검토했는가?
- [ ] 백업 필요한 작업인가?

### 설정이 안 된 경우

- [ ] SQL 파일 생성 요청
- [ ] SQL Editor에서 직접 실행
- [ ] 실행 결과 Claude Code에게 공유

## 주의사항

- MCP/CLI 설정 시 연결 정보(비밀번호 등) 보안 주의
- 프로덕션 DB에서는 더욱 신중하게
- 중요 변경 전 백업 필수
- DROP/DELETE 명령어 실행 전 재확인
- 오류 메시지는 정확히 복사해서 공유
- SQL 파일은 Database 폴더에 버전 관리

