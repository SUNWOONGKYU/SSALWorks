# CLAUDE.md에 AI가 따라야 할 규칙과 참고사항 정리하기

> 이 문서는 프로젝트 루트에 CLAUDE.md 파일을 만들어 Claude Code가 참조할 규칙과 참고사항을 정리하는 방법을 설명합니다.

---

## CLAUDE.md란?

프로젝트의 규칙, 구조, 주의사항을 정리한 문서입니다. Claude Code는 매 세션 시작 시 이 파일을 자동으로 읽어 일관된 작업을 수행합니다.

---

## 저장 위치

```
프로젝트/
├── CLAUDE.md              ← 여기
├── .claude/
│   └── CLAUDE.md          ← 또는 여기
└── ...
```

---

## 기본 구조

```markdown
# CLAUDE.md

## 프로젝트 개요
- 목적: [프로젝트 설명]
- 기술 스택: HTML, CSS, JavaScript, Supabase

## 절대 규칙
1. 새 폴더 생성 전 사용자 승인 필수
2. Production 코드는 Stage와 이중 저장

## 세션 시작 시 확인
1. .claude/work_logs/current.md 읽기
2. Project_Status.md 확인

## 파일 저장 규칙
- Frontend: S?_*/Frontend/ + Production/Frontend/
- Backend: S?_*/Backend_API/ + Production/Backend_API/
```

---

## 포함할 내용

| 섹션 | 내용 | 예시 |
|------|------|------|
| 프로젝트 개요 | 목적, 기술 스택 | "구독 관리 서비스" |
| 절대 규칙 | 반드시 지켜야 할 사항 | "폴더 생성 전 승인" |
| 세션 시작/종료 | 해야 할 일 | "work_logs 확인" |
| 파일 저장 규칙 | 어디에 무엇을 저장 | "Frontend → Production/" |
| 금지 사항 | 하면 안 되는 것 | "node_modules 커밋 금지" |

---

## 절대 규칙 예시

```markdown
## 🛑 절대 규칙

### 1. 새 폴더 생성 전 승인 필수
폴더가 없으면 사용자에게 물어야 합니다.

### 2. 이중 저장 필수
Frontend, Backend_API는 Stage 폴더와 Production 폴더 둘 다 저장.

### 3. 민감정보 커밋 금지
.env 파일은 절대 Git에 올리지 않습니다.
```

---

## Claude Code에게 요청하기

```
"CLAUDE.md 파일 만들어줘"
"CLAUDE.md에 파일 저장 규칙 추가해줘"
"현재 CLAUDE.md 내용 확인해줘"
"CLAUDE.md 규칙 지키고 있는지 점검해줘"
```

---

## 체크리스트

- [ ] CLAUDE.md 파일이 존재하는가?
- [ ] 프로젝트 개요가 명확한가?
- [ ] 절대 규칙이 정의되어 있는가?
- [ ] 파일 저장 규칙이 명시되어 있는가?

---

*상세 내용: `디렉터리_구조_문서_만들기.md` 참조*

