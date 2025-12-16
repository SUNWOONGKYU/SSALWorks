# work_logs로 세션 연속성 유지하기

## 💡 Tip

`.claude/work_logs/current.md` 파일을 활용하면 세션이 끊어져도 작업을 이어서 할 수 있습니다.

## 왜 필요한가?

- Claude Code 세션은 언제든 끊어질 수 있음
- 긴 작업 중간에 컨텍스트 손실 방지
- 다음 세션에서 "이전 작업 이어서 해줘"로 복구 가능

## work_logs 구조

```
.claude/
└── work_logs/
    ├── current.md          ← 현재 활성 로그
    ├── 2024-12-15.md       ← 날짜별 아카이브
    └── archive/            ← 30일 이상 된 로그
```

## current.md 작성 예시

```markdown
# 작업 로그 - 2024-12-16

## 오늘 작업 내용
- Google OAuth 로그인 구현
- 닉네임 표시 기능 추가

## 수정된 파일
- Production/Frontend/index.html
- Production/Frontend/pages/auth/login.html

## 다음 작업
- FAQ & Tip 섹션 구현

## 참고사항
- Redirect URL은 Supabase Dashboard에서 설정 필요
```

## 자동 순환 규칙

- `current.md` 50KB 초과 시 → 날짜별 파일로 이동
- 30일 이상 된 로그 → `archive/`로 이동

## 활용 방법

**새 세션 시작 시:**
```
"이전 작업 기록 확인하고 이어서 진행해줘"
```

**작업 완료 시:**
```
"작업 내용 work_logs에 기록해줘"
```

## 관련 파일
- `.claude/work_logs/current.md`
