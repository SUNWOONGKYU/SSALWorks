# work_logs로 작업 기록 관리하기

## 요약
`.claude/work_logs/current.md`에 작업 내역 기록. 무엇을 했는지, 다음에 할 것, 참고사항 적어두면 세션 끊어져도 이어서 작업 가능.

## 상세

### 폴더 구조

```
.claude/work_logs/
├── current.md    # 현재 활성 로그
└── archive/      # 과거 로그
```

### current.md 구조

```markdown
# Work Log - Current
> 최종 업데이트: 2025-01-15 14:30

## 현재 상태
- 진행 중: S2F1 (로그인 UI)
- 다음 예정: S2BA1 (로그인 API)

## 완료된 작업
- [x] 로그인 페이지 UI 구현

## 생성된 파일
- `Production/Frontend/pages/auth/login.html`

## 다음 작업
- [ ] 로그인 API 연동
```

### 기록 시점

| 기록 O | 기록 X |
|--------|--------|
| Task 완료 시 | 오타 수정 |
| 파일 생성/수정 시 | 임시 파일 |
| 세션 종료 전 | 바로 되돌릴 변경 |

### 자동 순환
- current.md 50KB 초과 시 → 날짜별 파일로 이동
- 30일 이상 된 로그 → archive/로 이동

---
📚 더 자세히: `.claude/work_logs/current.md`
