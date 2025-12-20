# /review-pr, /deploy 같은 슬래시 명령어로 반복 작업 자동화하기

> 이 문서는 Slash Commands를 활용하여 반복 작업을 자동화하는 방법을 설명합니다.

---

## Slash Commands란 무엇인가

`/명령어` 형식으로 자주 사용하는 작업을 한 단어로 실행합니다. `/commit`을 입력하면 변경사항 분석부터 커밋까지 자동 실행됩니다.

---

## 정의 위치

```
.claude/commands/
├── commit.md   → /commit
├── review.md   → /review
├── test.md     → /test
└── deploy.md   → /deploy
```

파일명이 곧 명령어 이름입니다.

---

## 명령어 작성 예시

**`.claude/commands/commit.md`**

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
- refactor: 리팩토링
```

---

## 사용 예시

```
입력: /commit
→ 변경사항 분석 → 커밋 메시지 자동 생성 → 커밋 실행

입력: /review
→ 최근 변경 코드 검토 → 품질/버그 분석 → 개선 제안

입력: /test
→ 테스트 파일 찾기 → 테스트 실행 → 결과 보고
```

---

## 자주 쓰는 명령어

| 명령어 | 용도 |
|--------|------|
| `/commit` | 변경사항 커밋 |
| `/review` | 코드 리뷰 |
| `/test` | 테스트 실행 |
| `/status` | 프로젝트 현황 |
| `/deploy` | 배포 준비 |

---

## Claude Code에게 요청하기

```
"/commit 명령어 만들어줘"
"현재 등록된 Slash Commands 확인해줘"
"/review 명령어에 보안 검토도 추가해줘"
```

---

## 체크리스트

- [ ] `.claude/commands/` 폴더가 있는가?
- [ ] 자주 사용하는 작업을 명령어로 만들었는가?
- [ ] 각 명령어에 명확한 절차가 정의되어 있는가?

---

*상세 내용: `.claude/commands/` 폴더 예시 파일 참조*

