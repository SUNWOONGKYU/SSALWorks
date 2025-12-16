# Order Sheet - P2-4 데이터베이스 설계

> **작성일**: 2025-12-17
> **버전**: 2.0 (종합 템플릿)
> **Stage**: P2 프로젝트 기획
> **Task ID**: P2-4

---

## 1. Task 개요

### 1.1 목표
데이터베이스 스키마를 설계하고 ERD를 작성합니다.

### 1.2 Task 정보

| 항목 | 값 |
|------|-----|
| Task ID | P2-4 |
| Task Name | 데이터베이스 설계 |
| Stage | P2 (프로젝트 기획) |
| Area | Database |
| 실행 유형 | AI-Only |
| 의존성 | P2-3 완료 |
| Task Agent | database-specialist |
| Verification Agent | qa-specialist |

---

## 2. 작업 내용

### 2.1 엔티티 정의
- 주요 엔티티 식별
- 엔티티별 속성 정의
- 관계 설정 (1:1, 1:N, N:M)

### 2.2 테이블 스키마 설계
- 컬럼 정의 (이름, 타입, 제약조건)
- Primary Key / Foreign Key
- 인덱스 전략

### 2.3 ERD 작성
- 엔티티 관계 다이어그램
- 관계 유형 및 카디널리티 표시
- 텍스트/Mermaid 형식

### 2.4 SQL 스크립트 생성
- 테이블 생성 SQL
- RLS 정책 (Supabase 사용 시)
- 초기 데이터 시드

---

## 3. Order Sheet 템플릿

```json
{
  "task_id": "P2-4",
  "task_name": "데이터베이스 설계",
  "stage": "P2",
  "area": "Database",
  "execution_type": "AI-Only",

  "task_instruction": {
    "목표": "데이터베이스 스키마 및 ERD 설계",
    "산출물": [
      "ERD 문서",
      "테이블 스키마 명세",
      "SQL 스크립트 (CREATE TABLE)",
      "RLS 정책 (선택)"
    ]
  },

  "user_input": {
    "서비스_설명": "[데이터를 다루는 서비스 설명]",
    "주요_엔티티": "[사용자, 게시물, 주문 등]",
    "데이터베이스_유형": "[PostgreSQL/MySQL/MongoDB]"
  },

  "output": {
    "파일_저장": [
      "P2_프로젝트_기획/Database_Design/ERD.md",
      "P2_프로젝트_기획/Database_Design/Schema.md",
      "P3_프로토타입_제작/Database/"
    ]
  },

  "task_agent": "database-specialist",
  "verification_agent": "qa-specialist"
}
```

---

## 4. 검증 기준

- [ ] 정규화가 적절히 적용되었는가? (최소 3NF)
- [ ] 관계 설정이 올바른가?
- [ ] 성능 최적화가 고려되었는가?
- [ ] 확장성 있는 설계인가?

---

## 5. Stage 완료 후
P2 완료 → P3 (프로토타입 제작) 진행

---

| 버전 | 날짜 | 내용 |
|------|------|------|
| 1.0 | - | 기본 템플릿 |
| 2.0 | 2025-12-17 | 종합 템플릿 업데이트 |
