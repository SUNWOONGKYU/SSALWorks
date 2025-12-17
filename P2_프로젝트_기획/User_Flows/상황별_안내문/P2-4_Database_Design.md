# P2-4 데이터베이스 설계 안내

> **Stage**: P2 프로젝트 기획
> **Task ID**: P2-4
> **버전**: 2.1 (Stage Context 추가)

---

## 1. Stage 맥락 (Context)

### P2 Stage 내 항목 위치
```
P2 프로젝트 기획
├── P2-1: Directory Structure ✅
├── P2-2-1: Requirements ✅
├── P2-2-2: User Flows ✅
├── P2-2-3: Workflows ✅
├── P2-3-1: Design Guidelines ✅
├── P2-3-2: Mockup ✅
├── P2-3-3: Prototype ✅
└── [P2-4] Database Design ← 현재 항목 (P2 마지막)
```

### 이전 항목에서 완료된 것 (P2-3-3)
- ✅ 프로토타입 범위 정의
- ✅ 인터랙션 구현
- ✅ 테스트 시나리오 작성

### 현재 항목에서 수행할 것 (P2-4)
- 🔄 엔티티 정의
- 🔄 테이블 스키마 설계
- 🔄 ERD 작성
- 🔄 SQL 스크립트 생성

### 다음 Stage에서 수행할 것 (P3)
- ⏳ 프론트엔드 프로토타입 구현
- ⏳ 데이터베이스 구축
- ⏳ 스크립트 및 자동화

---

## 2. 이 단계에서 수행하는 작업

**데이터베이스 스키마 설계**를 위한 Order Sheet를 발행합니다.

---

## 3. 작업 목적

프로젝트에서 사용할 데이터베이스 구조를 설계합니다.

---

## 4. 주요 작업 내용

### 3.1 엔티티 정의
- 주요 엔티티 식별
- 엔티티별 속성 정의
- 관계 설정 (1:1, 1:N, N:M)

### 3.2 테이블 스키마 설계
- 컬럼 정의 (이름, 타입, 제약조건)
- Primary Key / Foreign Key
- 인덱스 전략

### 3.3 ERD 작성
- 엔티티 관계 다이어그램
- 관계 유형 및 카디널리티 표시

### 3.4 SQL 스크립트 생성
- 테이블 생성 SQL
- RLS 정책 (Supabase 사용 시)
- 초기 데이터 시드

---

## 5. 필요한 입력 정보

| 항목 | 설명 |
|------|------|
| 데이터 항목 목록 | 저장할 데이터 종류 |
| 데이터 관계 | 엔티티 간 관계 |
| 보안 요구사항 | 접근 권한 정책 |

---

## 6. 예상 결과물

- `P2_프로젝트_기획/Database_Design/ERD.md`
- `P2_프로젝트_기획/Database_Design/Schema.md`
- `P3_프로토타입_제작/Database/` SQL 파일

---

## 7. Task 정보

| 항목 | 값 |
|------|-----|
| Task Agent | database-specialist |
| Verification Agent | qa-specialist |
| 실행 유형 | AI-Only |
| 의존성 | P2-3 완료 |

---

## 8. Stage 완료 후

P2 완료 → P3 (프로토타입 제작) 진행

---

**확인 버튼을 클릭하면 Workspace에 Order Sheet가 로드됩니다.**
