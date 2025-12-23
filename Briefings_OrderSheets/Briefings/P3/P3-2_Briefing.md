# P3-2 Database 안내문

## 개요

데이터베이스를 구축하는 작업입니다.
P2-4에서 설계한 스키마를 실제로 생성합니다.

## 목적

- 테이블 생성
- 초기 데이터 삽입
- RLS 정책 적용
- 인덱스 생성

## 주요 내용

### 데이터베이스 구축
- Supabase 프로젝트 설정
- 테이블 생성 SQL 실행
- RLS 정책 적용
- 초기 데이터 시딩

### 보안 설정
- Row Level Security
- 역할별 권한
- API 키 관리

## 예상 산출물

| 산출물 | 설명 |
|--------|------|
| 테이블 생성 SQL | schema.sql |
| RLS 정책 SQL | rls_policies.sql |
| 시드 데이터 SQL | seed_data.sql |

## 실행 조건

- **실행 유형**: AI-Only + Human (Supabase 설정)
- **의존성**: P2-4 (DB 설계) 완료

---

## Order Sheet 로딩

**[Order Sheet 로딩하기]** → `P3-2_Database.md`
