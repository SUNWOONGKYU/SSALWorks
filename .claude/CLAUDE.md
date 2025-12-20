# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## 🚨🚨🚨 6대 작업 규칙 - 반드시 먼저 확인! 🚨🚨🚨

> **⛔ 파일 생성/저장 전 반드시 해당 규칙 파일을 읽어야 함!**
> **⛔ 규칙 확인 없이 폴더 생성/파일 저장 절대 금지!**
> **⛔ "이렇게 하면 되겠지" 추측 금지 - 규칙 파일이 정답!**

| # | 규칙 파일 | 확인 시점 | 내용 |
|---|----------|----------|------|
| 1 | `01_file-naming.md` | 파일명 정할 때 | 파일 명명 규칙 |
| 2 | `02_save-location.md` | **파일 저장할 때** ⭐ | 저장 위치 규칙 |
| 3 | `03_area-stage.md` | 폴더 선택할 때 | Area/Stage 매핑 |
| 4 | `04_grid-writing.md` | Grid 업데이트할 때 | Grid 속성 작성 |
| 5 | `05_execution-process.md` | Task 실행할 때 | 6단계 실행 프로세스 |
| 6 | `06_verification.md` | 검증할 때 | 검증 기준 |
| 7 | `07_supabase.md` | DB 연결할 때 | Supabase 연결 |

**📁 위치:** `.claude/rules/`

---

## 📋 기타 참조 문서

### AI 12대 준수사항
> `.claude/compliance/AI_12_COMPLIANCE.md`

### SAL Grid 매뉴얼
> `S0_Project-SAL-Grid_생성/manual/PROJECT_SAL_GRID_MANUAL.md`

### 주의사항
> `.claude/CAUTION.md` (RLS, 본개발 TODO, Supabase 대안 프로세스)

---

## 🌾 세션 시작 시 확인

### 1. 작업 기록
`.claude/work_logs/current.md` 🔴 최우선

### 2. 이전 작업 결과
`Human_ClaudeCode_Bridge/Reports/` 확인

### 3. 프로젝트 상태
- `P0_작업_디렉토리_구조_생성/Project_Status.md`
- `P0_작업_디렉토리_구조_생성/Project_Directory_Structure.md`

---

## 📂 웹 배포 파일 업데이트

Order Sheet, 안내문, Manual 수정 시:
```bash
node Production/build-web-assets.js
```

