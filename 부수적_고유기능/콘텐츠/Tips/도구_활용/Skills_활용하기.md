# Skills 활용하기

## 요약
`.claude/skills/`에 전문 지식 문서 정의. `api-builder`, `db-schema` 등 프로젝트 규칙을 Skills로 작성하면 Claude Code가 일관된 방식으로 작업.

## 상세

### Skills vs Commands vs Subagents

| 구분 | 역할 | 위치 |
|------|------|------|
| Skills | 전문 지식/지침 | `.claude/skills/` |
| Commands | 단축 명령어 | `.claude/commands/` |
| Subagents | 전문 역할 수행자 | `.claude/subagents/` |

### Skill 작성 예시

```markdown
# api-builder

## 응답 형식
{ success: boolean, data?: T, error?: string }

## 에러 처리
try-catch 필수, 에러 메시지 한글로

## 네이밍
- 엔드포인트: kebab-case
- 함수: camelCase
```

### 활용 방법

```
"로그인 API 만들어줘"
→ Claude Code가 api-builder Skill 자동 참조
→ 정의된 형식대로 API 생성
```

### 권장 Skills
- `api-builder.md`: API 설계 규칙
- `db-schema.md`: DB 설계 규칙
- `code-review.md`: 코드 리뷰 기준

---
📚 더 자세히: `.claude/skills/` 폴더 예시 파일
