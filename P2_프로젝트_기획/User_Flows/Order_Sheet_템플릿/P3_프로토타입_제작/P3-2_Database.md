# Order Sheet - P3-2 데이터베이스 구축

> **작성일**: 2025-12-17
> **버전**: 2.0 (종합 템플릿)
> **Stage**: P3 프로토타입 제작
> **Task ID**: P3-2

---

## 1. Task 개요

### 1.1 목표
프로토타입용 데이터베이스 테이블과 초기 데이터를 생성합니다.

### 1.2 Task 정보

| 항목 | 값 |
|------|-----|
| Task ID | P3-2 |
| Task Name | 데이터베이스 구축 |
| Stage | P3 (프로토타입 제작) |
| Area | Database |
| 실행 유형 | Human-AI |
| 의존성 | P2-4 완료 |
| Task Agent | database-specialist |
| Verification Agent | qa-specialist |

---

## 2. 작업 내용

### 2.1 테이블 생성
- DB 설계서 기반 테이블 SQL 작성
- 제약조건 및 인덱스 설정
- 관계(FK) 설정

### 2.2 RLS 정책 설정
- 테이블별 접근 권한 정책
- 인증 기반 접근 제어
- 역할별 권한 분리

### 2.3 초기 데이터 (Seed)
- 테스트용 샘플 데이터
- 기본 설정 데이터
- 데모용 데이터

### 2.4 함수/트리거 (필요시)
- 자동화 로직
- 데이터 검증 로직

---

## 3. Order Sheet 템플릿

```json
{
  "task_id": "P3-2",
  "task_name": "데이터베이스 구축",
  "stage": "P3",
  "area": "Database",
  "execution_type": "Human-AI",

  "task_instruction": {
    "목표": "데이터베이스 테이블 생성 및 초기 데이터 설정",
    "산출물": [
      "테이블 생성 SQL",
      "RLS 정책 SQL",
      "초기 데이터 Seed SQL",
      "함수/트리거 SQL (선택)"
    ]
  },

  "user_input": {
    "생성할_테이블": "[테이블 이름과 용도 목록]",
    "데이터베이스_유형": "[Supabase/MySQL 등]",
    "초기_데이터_요구": "[필요한 샘플 데이터 설명]"
  },

  "po_action": {
    "필수": [
      "Supabase SQL Editor에서 SQL 실행",
      "테이블 생성 확인",
      "RLS 정책 활성화 확인"
    ]
  },

  "output": {
    "파일_저장": [
      "P3_프로토타입_제작/Database/",
      "Production/Database/ (이중 저장)"
    ]
  },

  "task_agent": "database-specialist",
  "verification_agent": "qa-specialist"
}
```

---

## 4. 검증 기준

- [ ] DB 설계 문서와 일치하는가?
- [ ] RLS 정책이 올바르게 설정되었는가?
- [ ] 초기 데이터가 정상 입력되었는가?
- [ ] 테스트 가능한 상태인가?

---

## 5. PO 작업 가이드

### Supabase SQL 실행 순서
```
1. 01_create_tables.sql 실행
2. 02_rls_policies.sql 실행
3. 03_seed_data.sql 실행
4. 04_functions.sql 실행 (있는 경우)
```

### 확인 사항
- Table Editor에서 테이블 확인
- RLS 정책 활성화 확인
- 데이터 조회 테스트

---

## 6. 다음 Task
P3-2 완료 → P3-3 (유틸리티 스크립트) 진행

---

| 버전 | 날짜 | 내용 |
|------|------|------|
| 1.0 | - | 기본 템플릿 |
| 2.0 | 2025-12-17 | 종합 템플릿 업데이트 |
