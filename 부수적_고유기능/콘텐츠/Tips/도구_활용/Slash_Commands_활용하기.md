# Slash Commands 활용하기

## 요약
`/명령어`로 반복 작업 자동화. `.claude/commands/`에 마크다운 파일로 정의. `/commit`, `/review`, `/test` 등 자주 쓰는 작업을 한 단어로 실행.

## 상세

### 정의 위치

```
.claude/commands/
├── commit.md   → /commit
├── review.md   → /review
├── test.md     → /test
└── deploy.md   → /deploy
```

### 명령어 작성 예시

```markdown
# commit

## 절차
1. git status로 변경 파일 확인
2. git diff로 변경 내용 분석
3. Conventional Commits 형식으로 메시지 작성
4. git add . 후 커밋 실행

## 커밋 형식
- feat: 새 기능
- fix: 버그 수정
- docs: 문서 변경
```

### 사용 예시

```
입력: /commit
→ 변경사항 분석 → 커밋 메시지 자동 생성 → 커밋 실행

입력: /review
→ 최근 변경 코드 검토 → 품질/버그 분석 → 개선 제안
```

### 자주 쓰는 명령어

| 명령어 | 용도 |
|--------|------|
| `/commit` | 변경사항 커밋 |
| `/review` | 코드 리뷰 |
| `/test` | 테스트 실행 |
| `/status` | 프로젝트 현황 |

---
📚 더 자세히: `.claude/commands/` 폴더 예시 파일
