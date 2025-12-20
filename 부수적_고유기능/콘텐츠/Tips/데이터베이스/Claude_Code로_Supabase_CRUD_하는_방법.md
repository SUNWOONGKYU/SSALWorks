# Claude Code로 Supabase CRUD 하는 방법

> 이 문서는 Claude Code가 Supabase 데이터베이스에 직접 CRUD(생성/조회/수정/삭제)하는 방법과 AI/PO 역할 분담을 설명합니다.

---

## CRUD란?

| 영어 | 한글 | SQL | 예시 |
|------|------|-----|------|
| **C**reate | 생성 | INSERT | 새 회원 등록 |
| **R**ead | 조회 | SELECT | 회원 목록 보기 |
| **U**pdate | 수정 | UPDATE | 회원 정보 변경 |
| **D**elete | 삭제 | DELETE | 회원 탈퇴 |

---

## AI가 할 수 있는 것 vs PO가 해야 하는 것

### AI (Claude Code + MCP)가 할 수 있는 작업

| 작업 | MCP 도구 | 비고 |
|------|----------|------|
| 테이블 생성 (CREATE TABLE) | `apply_migration` | 스키마 변경 추적됨 |
| 테이블 수정 (ALTER TABLE) | `apply_migration` | 컬럼 추가/변경 등 |
| RLS 정책 생성/수정 | `apply_migration` | 보안 정책 설정 |
| 데이터 INSERT/UPDATE/DELETE | `execute_sql` | 일반 CRUD |
| SELECT 쿼리 | `execute_sql` | 데이터 조회 |

**조건**: MCP가 정상 연결되고, Read-only 모드가 꺼져 있어야 함

### PO가 직접 해야 하는 작업

| 작업 | 이유 | 어디서? |
|------|------|---------|
| **OAuth Provider 설정** | MCP 미지원 | Dashboard > Auth > Providers |
| **API 키 재생성** | 보안상 이유 | Dashboard > Project Settings |
| **환경 변수 배포** | 외부 서비스 연동 | Vercel Dashboard |
| **프로덕션 DB 직접 실행** | 실수 방지 | Dashboard > SQL Editor |
| **프로젝트 생성/삭제** | 중요 작업 | Dashboard |

---

## MCP가 불안정한 이유

### 주요 원인

| 원인 | 증상 | 해결 |
|------|------|------|
| **Windows 한글 인코딩** | 한글 포함 쿼리 실패 | 영문 위주로 작업 |
| **HTTP 연결 타임아웃** | 응답 없음, 무한 대기 | 세션 재시작 |
| **네트워크 불안정** | 간헐적 연결 끊김 | 재시도 |
| **토큰 만료** | 인증 실패 | 토큰 재발급 |
| **Supabase 서버 상태** | 전체 서비스 느림 | 잠시 후 재시도 |

### MCP 연결 확인

```bash
# MCP 목록 확인
claude mcp list

# supabase가 보이면 연결됨
# 안 보이면 설정 필요
```

---

## API 키 종류와 권한

| 키 | 권한 | RLS 적용 | 용도 |
|----|------|:--------:|------|
| **Anon Key** | 제한적 | ✅ 적용 | 클라이언트 (웹, 앱) |
| **Service Role Key** | 무제한 | ❌ 무시 | 서버, MCP (개발용) |

**주의**: Service Role Key는 RLS를 무시하므로 **절대 클라이언트에 노출 금지**

---

## 방법 비교

| 순위 | 방법 | 장점 | 단점 |
|:----:|------|------|------|
| 1 | Supabase MCP | 빠르고 편함 | 불안정할 수 있음 |
| 2 | Supabase CLI | 안정적 | 설치 필요 |
| 3 | Dashboard SQL Editor | 항상 가능 | 수동 복사 필요 |
| 4 | JSON+Node.js | 자동화 가능 | 스크립트 필요 |

---

## 방법 1: Supabase MCP (권장)

```bash
# MCP 서버 확인
claude mcp list
```

**스키마 변경 (DDL)**:
```
"MCP apply_migration으로 users 테이블 생성해줘"
```

**데이터 변경 (DML)**:
```
"MCP execute_sql로 users 테이블에 INSERT 해줘"
```

---

## 방법 2: Dashboard SQL Editor (안정적)

MCP가 불안정할 때 가장 확실한 방법:

1. AI가 SQL 파일 생성
2. PO가 Dashboard > SQL Editor에서 실행

```
"users 테이블 생성 SQL 파일 만들어줘"
→ AI가 .sql 파일 생성
→ PO가 Dashboard에서 복사해서 실행
```

---

## 방법 3: Supabase CLI

```bash
# 연결 확인
supabase status

# SQL 실행
supabase db execute "INSERT INTO users (name) VALUES ('홍길동')"

# 마이그레이션 푸시
supabase db push
```

---

## 방법 4: JSON + Node.js (대안)

MCP/CLI가 안 될 때 사용:

```bash
cd S0_Project-SAL-Grid_생성/supabase
node sync_task_results_to_db.js
```

---

## 결정 흐름

```
[1차] MCP 연결됨? → MCP로 실행
        ↓ 안 됨
[2차] CLI 설치됨? → CLI로 실행
        ↓ 안 됨
[3차] AI가 SQL 파일 생성 → PO가 Dashboard에서 실행
```

---

## 실수로 삭제했을 때

1. 추가 작업 중단
2. 복구 방법 선택

| 방법 | 사용 조건 |
|------|----------|
| PITR (Point-in-Time Recovery) | Pro 플랜 이상 |
| Daily Backup | 모든 플랜 |
| 수동 백업 | 사전 백업 있을 때 |

**예방**: DELETE 전 SELECT로 확인, 중요 작업 전 백업

---

## 체크리스트

- [ ] MCP 연결 상태 확인했는가?
- [ ] 어떤 키(Anon/Service Role)를 사용하는지 알고 있는가?
- [ ] DDL(스키마 변경)은 apply_migration을 사용하는가?
- [ ] 프로덕션 환경은 Dashboard에서 직접 실행하는가?

---

*상세 내용: `외부_연동_설정_Guide/MCP_설정_가이드.md` 참조*

