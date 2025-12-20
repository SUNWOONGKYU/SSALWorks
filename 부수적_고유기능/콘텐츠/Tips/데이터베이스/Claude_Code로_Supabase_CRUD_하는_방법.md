# Claude Code로 Supabase CRUD 하는 방법

> 이 문서는 Claude Code가 Supabase 데이터베이스에 직접 CRUD(생성/조회/수정/삭제)하는 방법을 설명합니다.

---

## CRUD란?

| 영어 | 한글 | SQL | 예시 |
|------|------|-----|------|
| **C**reate | 생성 | INSERT | 새 회원 등록 |
| **R**ead | 조회 | SELECT | 회원 목록 보기 |
| **U**pdate | 수정 | UPDATE | 회원 정보 변경 |
| **D**elete | 삭제 | DELETE | 회원 탈퇴 |

---

## 방법 비교

| 순위 | 방법 | 왜 안 될 수 있나? |
|:----:|------|------------------|
| 1 | Supabase MCP | MCP 서버 설정 안 했으면 사용 불가 |
| 2 | Supabase CLI | CLI 설치 안 했으면 사용 불가 |
| 3 | psql | PostgreSQL 클라이언트 미설치 시 불가 |
| 4 | JSON+Node.js | 스크립트만 있으면 항상 가능 |

---

## 방법 1: Supabase MCP (권장)

```bash
# MCP 서버 추가 확인
claude mcp list

# supabase 보이면 사용 가능
```

```
"MCP로 users 테이블에 새 사용자 INSERT 해줘"
```

---

## 방법 2: Supabase CLI

```bash
# 설정 확인
supabase status

# 쿼리 실행
supabase db execute "INSERT INTO users (name) VALUES ('홍길동')"
```

---

## 방법 3: JSON + Node.js (대안)

MCP/CLI가 안 될 때 사용합니다.

1. JSON 파일 생성
2. Node.js 스크립트로 DB에 반영

```bash
cd S0_Project-SAL-Grid_생성/supabase
node sync_task_results_to_db.js
```

---

## 어떤 방법을 써야 하나?

```
[확인] claude mcp list → supabase 있음? → 방법 1
[확인] supabase status → 연결됨? → 방법 2
[확인] 스크립트 있음? → 방법 3
[없음] → SQL 파일 생성 후 Dashboard에서 직접 실행
```

---

## 실수로 삭제했을 때

1. 추가 작업 중단
2. 복구 방법 선택

| 방법 | 사용 조건 |
|------|----------|
| PITR | Pro 플랜 이상 |
| Daily Backup | 모든 플랜 |
| 수동 백업 | 사전 백업 있을 때 |

**예방**: DELETE 전 SELECT로 확인, 중요 작업 전 백업

---

*상세 내용: `외부_연동_설정_Guide/MCP_설정_가이드.md` 참조*

