# S0-3 SAL Grid Supabase 연동 안내문

> **단계**: S0-3
> **버전**: 5.4

---

## 개요

Project SAL Grid의 Supabase 연동을 설정하는 작업입니다.
DB 테이블과 동기화 스크립트를 구축합니다.

---

## 목적

- Grid 데이터 저장소 구축
- 실시간 진행 상황 조회
- 팀 협업 지원
- 자동화된 데이터 관리

---

## 주요 내용

### Supabase 설정

| 항목 | 설명 |
|------|------|
| project_sal_grid | Task 데이터 테이블 |
| stage_verification | Stage Gate 검증 테이블 |
| RLS 정책 | 접근 권한 설정 |

### 동기화 스크립트

| 스크립트 | 용도 |
|----------|------|
| sync_task_results_to_db.js | JSON → DB |
| generate_result_json_from_db.js | DB → JSON |
| auto_update.js | 자동 업데이트 |

---

## 산출물

| 산출물 | 저장 위치 |
|--------|----------|
| schema.sql | `S0_Project-SSAL-Grid_생성/supabase/` |
| seed_project_sal_grid.sql | `S0_Project-SSAL-Grid_생성/supabase/` |
| 동기화 스크립트 | `S0_Project-SSAL-Grid_생성/scripts/` |
| 완료 보고서 | `Human_ClaudeCode_Bridge/Reports/` |

---

## 실행 조건

| 항목 | 값 |
|------|-----|
| 의존성 | S0-1 완료 후 |
| PO 입력 필요 | Supabase 프로젝트 정보 |
| PO 작업 필요 | Supabase SQL Editor에서 SQL 실행 |
| 다음 단계 | S0-4 |

---

## Order Sheet 로딩

이 작업을 실행하려면 Order Sheet를 로딩하세요.

**Order Sheet 위치:** `Briefings_OrderSheets/OrderSheet_Templates/S0/S0-3_OrderSheet.md`

---

> 본 Briefing은 템플릿입니다. Project Owner가 프로젝트에 맞게 자유롭게 수정할 수 있습니다.
