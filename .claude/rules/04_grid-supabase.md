# 04. Grid 작성 및 Supabase 작업 규칙

> PROJECT SAL Grid 데이터 작성 및 Supabase CRUD 작업 시 준수 사항

---

## 1. Grid 22개 속성

| # | 필드명 | 설명 | 작성자 |
|---|--------|------|--------|
| 1 | task_id | Task 고유 ID | 설계 시 |
| 2 | task_name | Task 이름 | 설계 시 |
| 3 | stage | Stage 코드 (S1~S5) | 설계 시 |
| 4 | area | Area 코드 (11개) | 설계 시 |
| 5 | level | Level (1~3) | 설계 시 |
| 6 | status | 상태 (대기/진행/완료) | Main Agent |
| 7 | progress | 진행률 (0~100) | Main Agent |
| 8 | dependencies | 선행 Task | 설계 시 |
| 9 | task_instruction | Task 수행 지침 | 설계 시 |
| 10 | task_agent | Task 수행 Agent | 설계 시 |
| 11 | generated_files | 생성된 파일 | Main Agent |
| 12 | duration | 소요 시간 | Main Agent |
| 13 | build_result | 빌드 결과 | Main Agent |
| 14 | verification_instruction | 검증 지침 | 설계 시 |
| 15 | verification_agent | 검증 Agent | 설계 시 |
| 16 | test_result | 테스트 결과 | Main Agent |
| 17 | build_verification | 빌드 검증 | Main Agent |
| 18 | integration_verification | 통합 검증 | Main Agent |
| 19 | blockers | 차단 요소 | Main Agent |
| 20 | comprehensive_verification | 종합 검증 | Main Agent |
| 21 | ai_verification_note | AI 검증 의견 | Main Agent |
| 22 | stage_gate_status | Stage Gate 상태 | PO |

---

## 2. Task Agent 올바른 값

| Area | Task Agent |
|------|------------|
| M (Documentation) | `documentation-specialist` |
| U (Design) | `frontend-developer` |
| F (Frontend) | `frontend-developer` |
| BI (Backend Infra) | `backend-developer`, `devops-troubleshooter` |
| BA (Backend APIs) | `backend-developer` |
| D (Database) | `database-specialist` |
| S (Security) | `security-specialist` |
| T (Testing) | `test-engineer` |
| O (DevOps) | `devops-troubleshooter` |
| E (External) | `backend-developer`, `devops-troubleshooter` |
| C (Content) | `content-specialist` |

---

## 3. Verification Agent 올바른 값

| 용도 | Verification Agent |
|------|-------------------|
| 코드 리뷰 | `code-reviewer` |
| 품질 보증 | `qa-specialist` |
| 보안 감사 | `security-auditor` |
| DB 검증 | `database-specialist` |

**핵심 원칙:** Task Agent ≠ Verification Agent (작성자와 검증자 분리)

---

## 4. Verification 필드 JSON 형식

### #16 Test Result
```json
{
    "unit_test": "✅/❌/⏳ 설명",
    "integration_test": "✅/❌/⏳ 설명",
    "edge_cases": "✅/❌/⏳ 설명",
    "manual_test": "✅/❌/⏳ 설명"
}
```

### #17 Build Verification
```json
{
    "compile": "✅/❌/N/A 설명",
    "lint": "✅/❌/N/A 설명",
    "deploy": "✅/❌/N/A 설명",
    "runtime": "✅/❌/N/A 설명"
}
```

### #18 Integration Verification
```json
{
    "dependency_propagation": "✅/❌ 설명",
    "cross_task_connection": "✅/❌ 설명",
    "data_flow": "✅/❌ 설명"
}
```

### #19 Blockers
```json
{
    "dependency": "None/⚠️ 설명",
    "environment": "None/⚠️ 설명",
    "external_api": "None/⚠️ 설명",
    "status": "No Blockers ✅ / N Blockers 🚫"
}
```

### #20 Comprehensive Verification
```json
{
    "task_instruction": "✅/❌ 설명",
    "test": "✅/❌ N/N 통과",
    "build": "✅/❌ N/N 통과",
    "integration": "✅/❌ N/N 통과",
    "blockers": "✅ None/❌ N개",
    "final": "✅ Passed / ❌ Failed"
}
```

---

## 5. Tools 필드 올바른 값

**포함해야 할 것:**
- Slash Commands: `/review-pr`, `/deploy`, `/test`
- CLI 도구: `gh`, `vercel-cli`, `npm`
- MCP Servers: `/mcp__supabase__*`, `browser-mcp`
- Skills: `pdf-skill`, `playwright-mcp`
- SDK: `openai-sdk`, `toss-payments-sdk`

**포함하면 안 되는 것:**
- `Read`, `Write` (기본 동작)
- `TypeScript`, `React` (기술 스택)

---

## 6. Supabase 연결 정보

### 환경변수 위치
```
📁 P3_프로토타입_제작/Database/.env
```

### 환경변수 목록

| 변수명 | 용도 |
|--------|------|
| `SUPABASE_URL` | 프로젝트 URL |
| `SUPABASE_ANON_KEY` | 공개 키 (클라이언트용) |
| `SUPABASE_SERVICE_ROLE_KEY` | 관리자 키 (서버용) |

### 테이블명

| 용도 | 테이블명 |
|------|---------|
| Task 관리 | `ssalworks_tasks` |
| Stage 검증 | `stage_verification` |

---

## 7. Supabase CRUD 작업 방법

### 핵심 원칙

```
🚫 PO(사람)에게 SQL 실행을 요청하지 마라!
✅ AI가 직접 실행해야 함!
```

### 우선순위

| 순위 | 방법 | 사용 조건 |
|:----:|------|----------|
| **1** | REST API (Node.js) | **기본 방법** - 항상 작동 |
| 2 | Supabase MCP | MCP 연결 시 |
| 3 | Supabase CLI | CLI 설치 시 |
| 4 | Dashboard SQL Editor | 최후 수단 (PO 수동) |

### REST API 사용법

```
URL: https://{프로젝트}.supabase.co/rest/v1/{테이블명}
인증: apikey + Authorization 헤더에 SERVICE_ROLE_KEY
```

| 작업 | HTTP | 경로 예시 |
|------|------|----------|
| 조회 | GET | `/rest/v1/ssalworks_tasks?select=*` |
| 생성 | POST | `/rest/v1/ssalworks_tasks` |
| 수정 | PATCH | `/rest/v1/ssalworks_tasks?task_id=eq.S5U2` |
| 삭제 | DELETE | `/rest/v1/ssalworks_tasks?task_id=eq.S5U2` |

### PO(사람)에게 요청해야 하는 경우

아래 조건을 **모두** 만족할 때만 PO에게 요청:

1. REST API 시도 → 실패 (3회 이상)
2. MCP 시도 → 실패 또는 연결 안 됨
3. CLI 시도 → 설치 안 됨 또는 실패

**위 3가지 모두 실패한 경우에만:**
- "모든 방법 시도 후 실패했습니다. Dashboard에서 실행해주세요."
- SQL 파일 생성하여 제공

---

## 체크리스트

### Grid 작성
- [ ] Task Agent가 Area에 맞는가?
- [ ] Verification Agent가 Task Agent와 다른가?
- [ ] Verification 필드가 JSON 형식인가?
- [ ] Tools에 기본 도구(Read/Write)가 없는가?

### Supabase 작업
- [ ] 테이블명이 `ssalworks_tasks`인가? (`tasks` 아님)
- [ ] REST API를 먼저 시도했는가?
- [ ] .env 파일에서 SERVICE_ROLE_KEY를 사용했는가?
- [ ] PO 요청은 3가지 방법 모두 실패 후인가?
