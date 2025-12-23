# S2 개발 1차 (Auth & Registration) 안내문

## 개요

핵심 기능을 개발하는 단계입니다.
MVP에 필요한 필수 기능들을 구현합니다.

## 목적

- 핵심 기능 구현
- MVP 완성
- 기본 사용자 흐름 구현
- 필수 API 개발

## Stage 범위

### Area별 작업
| Area | 내용 |
|------|------|
| M (Documentation) | API 문서화 |
| F (Frontend) | 핵심 화면 개발 |
| BI (Backend Infra) | 인프라 확장 |
| BA (Backend APIs) | 핵심 API 개발 |
| D (Database) | 데이터 모델 확장 |
| S (Security) | 인증/인가 구현 |
| T (Testing) | 통합 테스트 |
| O (DevOps) | 배포 자동화 |
| C (Content) | 콘텐츠 시스템 |

## 실행 방식

- **Project SAL Grid 기반**: tasks 테이블에서 Stage=2인 Task 실행
- **서브에이전트 투입**: Task별 지정된 agent 사용
- **검증 필수**: Verification Agent로 검증 후 완료

## 완료 조건

- 모든 S2 Task 완료
- Stage Gate 검증 통과
- PO 승인

---

## Order Sheet 로딩

이 Stage의 모든 Task를 실행하려면 Order Sheet를 로딩하세요.

**[Order Sheet 로딩하기]** → `S2_개발_1차.md`
