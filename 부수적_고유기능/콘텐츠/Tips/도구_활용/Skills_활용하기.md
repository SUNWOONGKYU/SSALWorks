# PDF, Excel 등 Skills로 문서 분석하고 데이터 처리하기

> 이 문서는 Skills를 활용하여 Claude Code에게 프로젝트별 전문 지식을 제공하는 방법을 설명합니다.

---

## Skills란 무엇인가

Skills는 `.claude/skills/` 폴더에 정의된 전문 지식 문서입니다. Claude Code가 특정 작업을 할 때 해당 Skill을 참조하여 일관된 방식으로 작업합니다.

---

## Skills vs Commands vs Subagents

| 구분 | 역할 | 위치 | 예시 |
|------|------|------|------|
| Skills | 전문 지식/지침 | `.claude/skills/` | api-builder.md |
| Commands | 단축 명령어 | `.claude/commands/` | /commit |
| Subagents | 전문 역할 수행자 | `.claude/subagents/` | backend-developer |

---

## Skill 작성 예시

**`.claude/skills/api-builder.md`**

```markdown
# api-builder

## 응답 형식
{ success: boolean, data?: T, error?: string }

## 에러 처리
try-catch 필수, 에러 메시지 한글로

## 네이밍
- 엔드포인트: kebab-case (/user-profile)
- 함수: camelCase (getUserProfile)

## 인증
모든 API는 JWT 토큰 검증 필수
```

---

## 활용 방법

```
"로그인 API 만들어줘"
→ Claude Code가 api-builder Skill 자동 참조
→ 정의된 응답 형식, 에러 처리 규칙대로 API 생성
```

---

## 권장 Skills

| Skill 이름 | 용도 |
|------------|------|
| `api-builder.md` | API 설계 규칙 |
| `db-schema.md` | DB 설계 규칙 |
| `code-review.md` | 코드 리뷰 기준 |
| `testing.md` | 테스트 작성 규칙 |
| `documentation.md` | 문서 작성 규칙 |

---

## Claude Code에게 요청하기

```
"api-builder Skill 만들어줘"
"현재 Skills 목록 확인해줘"
"db-schema Skill 참고해서 테이블 만들어줘"
```

---

## 체크리스트

- [ ] 프로젝트에 맞는 Skills를 정의했는가?
- [ ] `.claude/skills/` 폴더에 마크다운 파일이 있는가?
- [ ] 각 Skill에 명확한 규칙이 정의되어 있는가?

---

*상세 내용: `.claude/skills/` 폴더 예시 파일 참조*

