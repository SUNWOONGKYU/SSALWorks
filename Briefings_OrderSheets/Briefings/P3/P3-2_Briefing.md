# P3-2 데이터베이스 구축 안내문

> **단계**: P3-2
> **버전**: 5.4

---

## 개요

데이터베이스를 구축하는 작업입니다.
P2-4에서 설계한 스키마를 실제로 생성합니다.

---

## 목적

- 테이블 생성
- 초기 데이터 삽입
- RLS 정책 적용
- 인덱스 생성

---

## 주요 내용

### 데이터베이스 구축

| 항목 | 설명 |
|------|------|
| 테이블 생성 | CREATE TABLE SQL |
| RLS 정책 | Row Level Security |
| 초기 데이터 | 테스트/데모 데이터 |

### 보안 설정

| 항목 | 설명 |
|------|------|
| RLS | 행 수준 보안 |
| 역할 권한 | 인증 기반 접근 |
| API 키 | 환경 변수 관리 |

---

## 산출물

| 산출물 | 저장 위치 |
|--------|----------|
| 테이블 생성 SQL | `P3_프로토타입_제작/Database/` |
| (이중 저장) | `Production/Database/` |
| 완료 보고서 | `Human_ClaudeCode_Bridge/Reports/` |

---

## 실행 조건

| 항목 | 값 |
|------|-----|
| 의존성 | P2-4 완료 후 |
| PO 입력 필요 | 테이블 목록, DB 유형, 초기 데이터 |
| PO 작업 필요 | Supabase SQL Editor에서 실행 |
| 다음 단계 | P3-3 |

---

## Order Sheet 로딩

이 작업을 실행하려면 Order Sheet를 로딩하세요.

**Order Sheet 위치:** `Briefings_OrderSheets/OrderSheet_Templates/P3/P3-2_OrderSheet.md`

---

> 본 Briefing은 템플릿입니다. Project Owner가 프로젝트에 맞게 자유롭게 수정할 수 있습니다.
