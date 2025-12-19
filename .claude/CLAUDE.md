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

---

## 🌾 세션 시작 시

### 1. 작업 기록 확인
`.claude/work_logs/current.md` 🔴 최우선

### 2. 프로젝트 상태 (필요시)
- `P0_작업_디렉토리_구조_생성/Project_Status.md`
- `P0_작업_디렉토리_구조_생성/Project_Directory_Structure.md`

---

## ⚠️ CRITICAL 경고

### 개발 환경 RLS 정책
**현재:** 개발용 RLS 적용 중 (anon 접근 허용)

**프로덕션 배포 전 필수:**
```sql
-- 원래 RLS로 교체
07_learning_contents_rls.sql
10_faqs_rls.sql
```

### 본개발 TODO
- [ ] 토스 페이먼트 가맹점 등록
- [ ] 빌링키 발급 API 연동
- [ ] PG 이용약관 동의 체크박스

---

## 📂 웹 배포 파일 업데이트

Order Sheet, 안내문, Manual 수정 시:
```bash
node Production/build-web-assets.js
```
