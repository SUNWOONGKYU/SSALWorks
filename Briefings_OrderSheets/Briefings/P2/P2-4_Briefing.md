# P2-4 데이터베이스 설계 안내문

> **단계**: P2-4
> **버전**: 5.4

---

## 개요

데이터베이스를 설계하는 작업입니다.
데이터 모델과 스키마를 정의합니다.

---

## 목적

- 데이터 구조 설계
- 테이블 관계 정의
- 인덱스 전략 수립
- 데이터 무결성 보장

---

## 주요 내용

### ERD (Entity-Relationship Diagram)

| 항목 | 설명 |
|------|------|
| 엔티티 | 주요 데이터 객체 |
| 관계 | 1:1, 1:N, N:M |
| 속성 | 컬럼 정의 |

### 스키마 설계

| 항목 | 설명 |
|------|------|
| 테이블 구조 | 컬럼 및 타입 |
| 제약 조건 | PK, FK, NOT NULL 등 |
| 인덱스 | 성능 최적화 |

### 보안 설계

| 항목 | 설명 |
|------|------|
| RLS | Row Level Security |
| 권한 관리 | 역할별 접근 제어 |

---

## 산출물

| 산출물 | 저장 위치 |
|--------|----------|
| `ERD.md` | `P2_프로젝트_기획/Database_Design/` |
| `Schema.md` | `P2_프로젝트_기획/Database_Design/` |
| SQL 스크립트 | `P3_프로토타입_제작/Database/` |
| 완료 보고서 | `Human_ClaudeCode_Bridge/Reports/` |

---

## 실행 조건

| 항목 | 값 |
|------|-----|
| 의존성 | P2-3 완료 후 |
| PO 입력 필요 | 서비스 설명, 주요 엔티티, DB 유형 |
| 다음 단계 | P3-1 |

---

## Order Sheet 로딩

이 작업을 실행하려면 Order Sheet를 로딩하세요.

**Order Sheet 위치:** `Briefings_OrderSheets/OrderSheet_Templates/P2/P2-4_OrderSheet.md`

---

> 본 Briefing은 템플릿입니다. Project Owner가 프로젝트에 맞게 자유롭게 수정할 수 있습니다.
