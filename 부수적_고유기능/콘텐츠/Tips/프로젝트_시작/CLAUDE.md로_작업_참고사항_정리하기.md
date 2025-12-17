# CLAUDE.md로 작업 참고사항 정리하기

## 핵심 요약

`.claude` 폴더를 만들고 `CLAUDE.md` 파일에 작업 규칙, 프로젝트 구조, 주의사항을 정리하세요. Claude Code가 매 세션마다 이 파일을 읽어 일관된 작업을 수행합니다.

## CLAUDE.md란?

Claude Code가 프로젝트 작업 시 자동으로 읽는 설정 파일입니다. 여기에 작성한 규칙과 지침을 Claude Code가 따릅니다.

## 왜 CLAUDE.md가 필요한가?

### 1. 세션 간 일관성 유지

Claude Code는 세션이 바뀌면 이전 대화를 기억하지 못합니다. 하지만 CLAUDE.md에 규칙을 적어두면:
- 매 세션마다 동일한 규칙 적용
- 프로젝트 특성에 맞는 작업 수행
- 반복 설명 불필요

### 2. 실수 방지

```markdown
# CLAUDE.md 예시
⛔ 새 폴더 생성 전 반드시 사용자 승인 필요
⛔ Production 폴더 직접 수정 금지 (Stage 폴더에서 작업 후 복사)
```

이런 규칙이 있으면 Claude Code가 실수로 잘못된 작업을 하는 것을 방지합니다.

### 3. 프로젝트 맥락 전달

- 프로젝트 목적과 구조
- 사용 중인 기술 스택
- 코딩 컨벤션
- 특별히 주의할 사항

## CLAUDE.md 작성 방법

### 기본 구조

```markdown
# CLAUDE.md

## 프로젝트 개요
- 프로젝트명: [이름]
- 목적: [설명]
- 기술 스택: HTML, CSS, JavaScript, Supabase

## 🛑 절대 규칙
1. 새 폴더 생성 전 사용자 승인 필수
2. 파일 저장 전 Project_Directory_Structure.md 확인
3. Production 코드는 Stage 폴더와 이중 저장

## 세션 시작 시 확인 사항
1. .claude/work_logs/current.md 읽기
2. P0_프로젝트_구조/Project_Status.md 확인
3. P0_프로젝트_구조/Project_Directory_Structure.md 참조

## 작업 완료 시 필수 작업
1. work_logs/current.md 업데이트
2. 변경 파일 목록 기록
3. 다음 작업 예정 사항 기록

## 파일 저장 규칙
- Frontend 코드: S?_*/Frontend/ + Production/Frontend/
- Backend API: S?_*/Backend_API/ + Production/Backend_API/
- Database: S?_*/Database/ + Production/Database/
- 문서: S?_*/Documentation/
```

### 포함하면 좋은 내용

| 섹션 | 내용 |
|------|------|
| 프로젝트 개요 | 목적, 기술 스택 |
| 절대 규칙 | 반드시 지켜야 할 사항 (⛔ 이모지로 강조) |
| 세션 시작/종료 | 시작/종료 시 해야 할 일 |
| 파일 저장 규칙 | 어디에 무엇을 저장하는지 |
| 주의사항 | 프로젝트 특이사항 |

## .claude 폴더 구조

```
.claude/
├── CLAUDE.md           # 메인 설정 파일 (필수)
├── work_logs/          # 작업 로그
│   ├── current.md      # 현재 활성 로그 (필수)
│   └── archive/        # 과거 로그 보관
├── commands/           # 커스텀 슬래시 명령어 (선택)
├── skills/             # 스킬 정의 (선택)
└── subagents/          # 서브에이전트 정의 (선택)
```

## 효과적인 활용 팁

### 1. 다른 문서와 연계

```markdown
## 세션 시작 시 필수 확인
1. `.claude/work_logs/current.md` - 이전 작업 내역
2. `P0_프로젝트_구조/Project_Status.md` - 현재 진행 상황
3. `P0_프로젝트_구조/Project_Directory_Structure.md` - 폴더 구조
```

### 2. 구체적인 규칙 작성

```markdown
# 나쁜 예
파일을 잘 정리하세요.

# 좋은 예
HTML 파일은 반드시 S?_*/Frontend/pages/ 폴더에 저장하세요.
SQL 파일은 S?_*/Database/ 폴더에 저장하세요.
```

### 3. 실수했던 사항 추가

작업 중 실수가 발생하면 그것을 방지하는 규칙을 CLAUDE.md에 추가하세요.

```markdown
## 과거 실수 방지 규칙
- ⚠️ RLS 정책 파일은 _dev.sql과 원본을 구분하세요
- ⚠️ 환경변수는 .env.example에 템플릿만 기록
```

## 주의사항

- CLAUDE.md가 너무 길면 핵심이 묻힐 수 있음 (적정 분량 유지)
- 모호한 표현 피하기 (구체적으로 작성)
- 상충되는 규칙 없도록 주의
- 정기적으로 불필요한 규칙 정리
