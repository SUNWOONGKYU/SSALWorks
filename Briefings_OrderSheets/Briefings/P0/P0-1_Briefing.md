# P0-1 디렉토리 구조 생성 안내문

> **단계**: P0-1
> **버전**: 5.4

---

## 개요

SSALWorks 프로젝트의 표준 디렉토리 구조를 자동으로 생성하는 작업입니다.
이 작업은 새 프로젝트를 시작할 때 가장 먼저 수행되어야 합니다.

---

## 목적

- 일관된 프로젝트 구조 확립
- 팀원 간 협업 효율성 향상
- 파일 위치 혼란 방지
- AI-Human 협업을 위한 표준화된 환경 구축

---

## 주요 내용

### 생성되는 폴더 구조

| 구분 | 폴더 | 설명 |
|------|------|------|
| 예비단계 | P0~P3 | 기획, 프로토타입 |
| 실행단계 | S0~S5 | 개발, 운영 |
| 배포 | Production | 배포용 코드 |
| 브릿지 | Human_ClaudeCode_Bridge | AI 통신용 |
| 문서 | Briefings_OrderSheets | 안내문, Order Sheet |

### 생성되는 문서

| 문서 | 설명 |
|------|------|
| `Project_Directory_Structure.md` | 디렉토리 구조 설명 |
| `Project_Status.md` | 프로젝트 진행 상황 |
| `.claude/CLAUDE.md` | Claude Code 설정 |

---

## 산출물

| 산출물 | 저장 위치 |
|--------|----------|
| 전체 폴더 구조 | 프로젝트 루트 |
| 기본 문서 | `P0_작업_디렉토리_구조_생성/` |
| 설정 파일 | `.claude/` |
| 완료 보고서 | `Human_ClaudeCode_Bridge/Reports/` |

---

## 실행 조건

| 항목 | 값 |
|------|-----|
| 실행 유형 | AI-Only (AI가 자동 수행) |
| 의존성 | 없음 (첫 번째 작업) |
| 다음 단계 | P0-2 |

---

## Order Sheet 로딩

이 작업을 실행하려면 Order Sheet를 로딩하세요.

**Order Sheet 위치:** `Briefings_OrderSheets/OrderSheet_Templates/P0/P0-1_OrderSheet.md`

---

> 본 Briefing은 템플릿입니다. Project Owner가 프로젝트에 맞게 자유롭게 수정할 수 있습니다.
