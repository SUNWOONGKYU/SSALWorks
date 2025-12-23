# S0-4 SAL Grid Viewer 개발 안내문

> **단계**: S0-4
> **버전**: 5.4

---

## 개요

Project SAL Grid 현황을 시각화하는 뷰어를 개발하는 작업입니다.
웹 대시보드로 진행 상황을 확인합니다.

---

## 목적

- 진행 상황 시각화
- 실시간 모니터링
- 이해관계자 보고
- 병목 지점 파악

---

## 주요 내용

### 뷰어 기능

| 항목 | 설명 |
|------|------|
| 5x11 매트릭스 | Stage별/Area별 시각화 |
| Task 상태 | 진행률 및 상태 표시 |
| 필터링 | Stage/Area 필터 |
| 상세 팝업 | Task 22개 속성 표시 |

### 대시보드 구성

| 항목 | 설명 |
|------|------|
| 전체 현황 | 요약 통계 |
| Stage별 상세 | Stage 진행률 |
| Task 목록 | 개별 Task 상태 |
| Stage Gate | 검증 상태 |

---

## 산출물

| 산출물 | 저장 위치 |
|--------|----------|
| viewer.html | `S0_Project-SSAL-Grid_생성/viewer/` |
| 스타일/스크립트 | `S0_Project-SSAL-Grid_생성/viewer/` |
| 완료 보고서 | `Human_ClaudeCode_Bridge/Reports/` |

---

## 실행 조건

| 항목 | 값 |
|------|-----|
| 의존성 | S0-1, S0-3 완료 후 |
| PO 입력 필요 | 추가 UI/UX 요구사항 |
| 다음 단계 | S1 (개발 준비) |

---

## Order Sheet 로딩

이 작업을 실행하려면 Order Sheet를 로딩하세요.

**Order Sheet 위치:** `Briefings_OrderSheets/OrderSheet_Templates/S0/S0-4_OrderSheet.md`

---

> 본 Briefing은 템플릿입니다. Project Owner가 프로젝트에 맞게 자유롭게 수정할 수 있습니다.
