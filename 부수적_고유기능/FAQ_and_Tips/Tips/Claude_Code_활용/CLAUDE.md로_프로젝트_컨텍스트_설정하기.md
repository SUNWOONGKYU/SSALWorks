# CLAUDE.md로 프로젝트 컨텍스트 설정하기

## 💡 Tip

프로젝트 루트에 `CLAUDE.md` 파일을 만들어두면 Claude Code가 자동으로 읽고 프로젝트를 이해합니다.

## 왜 필요한가?

- Claude Code는 매 세션마다 프로젝트를 새로 파악해야 함
- CLAUDE.md가 있으면 즉시 프로젝트 컨텍스트를 이해
- 더 정확하고 일관된 답변 제공

## SSAL Works의 CLAUDE.md 구조

```markdown
# CLAUDE.md

## 🌾 SSALWorks Project - FIRST THINGS FIRST

### 0단계: Order Sheet 처리 규칙
- 사용자가 명시적으로 요청할 때만 Inbox 확인
- 자동으로 Order 찾기 금지

### 1단계: 작업 기록 확인
- `.claude/work_logs/current.md` 최우선 확인
- 이전 세션 작업 내용 파악

### 2단계: 프로젝트 상태 확인
- `PROJECT_STATUS.md` 확인
- `PROJECT_DIRECTORY_STRUCTURE.md` 확인

### 작업 6대 원칙
1. AI-Only 원칙
2. 시간 추정 금지
3. 문서 생성 전 승인
4. Skills/Subagents/Commands 활용
5. 필수 검증
6. 거짓 보고 금지
```

## 포함하면 좋은 내용

- 프로젝트 개요
- 디렉토리 구조 설명
- 코딩 컨벤션
- 주의사항 및 금지 사항
- 자주 사용하는 명령어

## 관련 파일
- `C:\!SSAL_Works_Private\.claude\CLAUDE.md`
