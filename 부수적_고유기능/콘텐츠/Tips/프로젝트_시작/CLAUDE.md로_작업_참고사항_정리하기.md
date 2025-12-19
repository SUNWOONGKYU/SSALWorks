# CLAUDE.md로 작업 참고사항 정리하기

## 요약
`.claude/CLAUDE.md`에 작업 규칙, 프로젝트 구조, 주의사항 정리. Claude Code가 매 세션마다 자동으로 읽어 일관된 작업 수행.

## 상세

### 기본 구조

```markdown
# CLAUDE.md

## 프로젝트 개요
- 목적: [설명]
- 기술 스택: HTML, CSS, JavaScript, Supabase

## 🛑 절대 규칙
1. 새 폴더 생성 전 사용자 승인 필수
2. Production 코드는 Stage와 이중 저장

## 세션 시작 시 확인
1. .claude/work_logs/current.md 읽기
2. Project_Status.md 확인

## 파일 저장 규칙
- Frontend: S?_*/Frontend/ + Production/Frontend/
- Backend: S?_*/Backend_API/ + Production/Backend_API/
```

### 포함할 내용

| 섹션 | 내용 |
|------|------|
| 프로젝트 개요 | 목적, 기술 스택 |
| 절대 규칙 | 반드시 지켜야 할 사항 |
| 세션 시작/종료 | 해야 할 일 |
| 파일 저장 규칙 | 어디에 무엇을 저장 |

---
📚 더 자세히: `디렉터리_구조_문서_만들기.md`
