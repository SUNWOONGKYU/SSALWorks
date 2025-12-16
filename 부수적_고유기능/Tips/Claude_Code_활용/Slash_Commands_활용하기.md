# Slash Commands 활용하기

## 💡 Tip

자주 사용하는 작업은 **Slash Commands**로 만들어두면 빠르게 실행할 수 있습니다.

## Slash Command란?

`/명령어` 형식으로 미리 정의된 작업을 실행하는 기능입니다.

## SSAL Works 커스텀 Commands

| 명령어 | 용도 |
|-------|------|
| `/commit` | Git 커밋 자동화 |
| `/review` | 코드 리뷰 |
| `/test` | 테스트 실행 |
| `/deploy` | 배포 |

## 커스텀 Command 만들기

**1. 폴더 구조**
```
.claude/
└── commands/
    └── my-command.md
```

**2. Command 파일 작성**
```markdown
<!-- .claude/commands/check-status.md -->
# check-status

다음을 확인해주세요:
1. git status 실행
2. 변경된 파일 목록 표시
3. 커밋되지 않은 변경 사항 요약
```

**3. 사용**
```
/check-status
```

## 실제 예시: /commit

```markdown
<!-- .claude/commands/commit.md -->
# commit

다음 단계를 수행해주세요:
1. git status로 변경 파일 확인
2. git diff로 변경 내용 확인
3. 변경 내용 분석하여 커밋 메시지 작성
4. Conventional Commits 형식 사용
5. git add && git commit 실행
```

## 장점

1. **일관성**: 같은 작업을 항상 같은 방식으로
2. **효율성**: 긴 지시 대신 짧은 명령어로
3. **재사용**: 한 번 만들면 계속 사용
4. **공유**: 팀원과 Command 공유 가능

## 관련 파일
- `.claude/commands/` - 커스텀 Commands
