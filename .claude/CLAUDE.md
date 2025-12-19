# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## 📋 핵심 규칙 참조

### AI 12대 준수사항
> `.claude/compliance/AI_12_COMPLIANCE.md`

### 6대 작업 규칙
> `.claude/rules/` 폴더

| 파일 | 내용 |
|------|------|
| `01_file-naming.md` | 파일 명명 규칙 |
| `02_save-location.md` | 저장 위치 규칙 |
| `03_area-stage.md` | Area/Stage 매핑 |
| `04_grid-writing.md` | Grid 속성 작성 |
| `05_execution-process.md` | 6단계 실행 프로세스 |
| `06_verification.md` | 검증 기준 |

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
