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

**📁 위치:** `.claude/rules/`

### ⚠️ 규칙 미확인으로 발생한 문제들
- `Backend_API` vs `Backend_APIs` 혼용 → 폴더 중복 생성
- `API/` vs `api/` 대소문자 혼용 → 경로 불일치
- `Backend_Infrastructure` vs `Backend_Infra` → 폴더명 불일치

### ✅ 올바른 작업 순서
```
1. 파일 저장 필요 → 02_save-location.md 읽기
2. 규칙에 정의된 경로 확인
3. 그 경로에 저장 (추측 X, 규칙대로!)
```

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

## 🚨 상태 전이 규칙 (CRITICAL - 2025-12-20 NEW)

### task_status 전이 (4단계)
```
Pending → In Progress → Executed → Completed
         (작업 시작)   (파일 완료)  (검증 통과)
```

### verification_status 전이 (4단계)
```
Not Verified → In Review → Needs Fix → Verified
              (검증 시작)  (이슈 발견)  (검증 통과)
                    ↓
                 Verified (이슈 없음)
```

### ⛔ 완료 조건
- `task_status = Completed` 설정하려면 `verification_status = Verified` 필수!
- DB 트리거로 강제됨 (schema_v4.1_status_expansion.sql)

---

## 🚨 Grid 업데이트 필수 체크리스트 (CRITICAL)

**Task 완료 시 반드시 모든 필드를 채워야 합니다!**

### [10-13] Task Execution
- [ ] `task_progress`: 100
- [ ] `task_status`: **Executed** (파일 생성 완료 시) → **Completed** (검증 통과 후)
- [ ] `generated_files`: 파일 경로 목록

### [16-19] Verification Execution ⚠️ 자주 빠뜨림!
- [ ] `test`: `{"unit_test": "✅ ...", "integration_test": "✅ ..."}`
- [ ] `build`: `{"lint": "✅ 통과", "compile": "✅ 문법 오류 없음"}`
- [ ] `integration_verification`: `{"data_flow": "✅ ...", "cross_task_connection": "✅ ..."}`
- [ ] `blockers`: `{"status": "No Blockers ✅"}`

### [20-22] Verification Completion
- [ ] `comprehensive_verification`: [task] ✅ [test] ✅ [build] ✅ [final] ✅ Passed
- [ ] `verification_status`: **Verified** (검증 통과 시)

**⛔ [16-19] 필드가 null이면 Completed 금지!**
**⛔ verification_status가 Verified가 아니면 Completed 금지!**

---

## 📂 웹 배포 파일 업데이트

Order Sheet, 안내문, Manual 수정 시:
```bash
node Production/build-web-assets.js
```
