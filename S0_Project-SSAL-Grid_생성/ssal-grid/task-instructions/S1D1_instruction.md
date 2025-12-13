# Task Instruction - S1D1

## Task ID
S1D1

## Task Name
DB 스키마 확정

## Task Goal
P3 프로토타입에서 사용된 Supabase 스키마 점검 및 프로덕션용 확정, RLS 정책 검토

## Prerequisites (Dependencies)
- 없음 (독립 Task)
- P3_프로토타입_제작/Database/ 폴더의 SQL 파일 존재

## Specific Instructions

### 1. 기존 스키마 파일 점검
- 위치: `P3_프로토타입_제작/Database/`
- 모든 SQL 파일 검토

### 2. 테이블 목록 확인
```sql
-- 핵심 테이블
- users (사용자)
- subscriptions (구독)
- subscription_plans (구독 플랜)
- learning_contents (학습 콘텐츠)
- books (도서)
- faqs (FAQ)
- ai_credits (AI 크레딧)
- ai_usage_logs (AI 사용 로그)
```

### 3. RLS 정책 검토
- 각 테이블별 RLS 정책 확인
- SELECT/INSERT/UPDATE/DELETE 권한 검토
- anon vs authenticated 역할 구분

### 4. 인덱스 확인
- 자주 사용하는 쿼리 기반 인덱스 존재 여부
- email, user_id, created_at 등 인덱스 확인

### 5. 스키마 확정 문서 작성
- 위치: `docs/DATABASE_SCHEMA.md`
- 각 테이블 설명
- 컬럼별 설명
- 관계도 (ERD 텍스트 표현)

### 6. 마이그레이션 파일 정리
- 실행 순서 확인
- 의존성 확인
- README 작성

## Expected Output Files
- `docs/DATABASE_SCHEMA.md`
- `P3_프로토타입_제작/Database/README.md` (실행 순서 가이드)

## Completion Criteria
- [ ] 모든 테이블 스키마 검토 완료
- [ ] RLS 정책 검토 완료
- [ ] 인덱스 확인 완료
- [ ] DATABASE_SCHEMA.md 문서 작성
- [ ] 마이그레이션 README 작성
- [ ] 프로덕션 배포 전 RLS 정책 변경 필요사항 식별

## Tech Stack
- PostgreSQL (Supabase)
- SQL

## Tools
- Read, Write, Glob
- Grep (SQL 파일 검색)

## Execution Type
AI-Only

## Remarks
- CLAUDE.md에 언급된 개발환경 RLS 정책 경고 확인 필요
- 프로덕션 배포 전 RLS 정책 강화 필수 (07_learning_contents_rls_dev.sql → 원본으로 교체)
- 현재 anon 역할에 INSERT/UPDATE/DELETE 허용 상태 (개발용)

---

## ⚠️ 작업 결과물 저장 2대 규칙

> **이 규칙은 반드시 준수하세요!**

### 제1 규칙: Stage + Area 폴더에 저장
- Task ID의 Stage와 Area에 해당하는 폴더에 저장
- 예: S1S1 → `S1_개발_준비/Security/`
- 예: S2F1 → `S2_개발-1차/Frontend/`

### 제2 규칙: Production 코드는 이중 저장
- Frontend, Database, Backend_APIs 코드는 Stage 폴더 + Production 폴더 둘 다 저장
- 문서(Documentation, Security, Testing, DevOps)는 Stage 폴더에만 저장

**Area 폴더 매핑:** M→Documentation, F→Frontend, BI→Backend_Infra, BA→Backend_APIs, D→Database, S→Security, T→Testing, O→DevOps, E→External, C→Content

