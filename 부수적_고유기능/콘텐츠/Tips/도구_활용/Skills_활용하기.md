# Skills 활용하기

## 핵심 요약

`.claude/skills/` 폴더에 정의된 Skills를 활용하면 특정 작업을 더 잘 수행할 수 있습니다. `api-builder`, `db-schema`, `test-runner` 등 프로젝트에 맞는 Skills를 정의하고 활용하세요.

## Skills란?

Claude Code가 특정 작업을 수행할 때 참고하는 **전문 지식 및 지침 문서**입니다. Skills를 정의해두면 해당 분야의 작업을 더 정확하고 일관되게 수행합니다.

### 비유로 이해하기

```
Skills = 업무 매뉴얼

신입 직원에게 매뉴얼을 주면
일관된 방식으로 업무를 처리하듯

Claude Code에게 Skills를 주면
정의된 방식으로 작업을 처리
```

## Skills vs Slash Commands vs Subagents

| 구분 | 역할 | 위치 |
|------|------|------|
| **Skills** | 전문 지식/지침 제공 | `.claude/skills/` |
| **Slash Commands** | 단축 명령어 | `.claude/commands/` |
| **Subagents** | 전문 역할 수행자 | `.claude/subagents/` |

### 관계 이해하기

```
Subagent = 전문가 (사람)
Skills = 전문 지식 (지식)
Slash Commands = 단축키 (도구)

예: backend-developer (Subagent)가
    api-builder (Skill)을 참고하여
    /api-create (Command)를 실행
```

## 왜 Skills를 정의하나?

### 1. 프로젝트 규칙 일관성

```
Skills 없이:
"API 만들어줘" → 매번 다른 형식의 코드

api-builder Skill 정의 후:
"API 만들어줘" → 항상 동일한 패턴/형식
```

### 2. 반복 설명 제거

```
매번 이렇게 설명하는 대신:
"응답은 { success: boolean, data: T, error: string } 형식으로,
에러 핸들링은 try-catch로, 로깅은 console.log로..."

Skills에 한 번 정의:
→ Claude Code가 자동으로 참고
```

### 3. 팀 표준 공유

Skills 파일을 Git에 포함하면 팀 전체가 동일한 기준으로 작업합니다.

## Skill 정의 방법

### 파일 위치

```
.claude/skills/
├── api-builder.md
├── db-schema.md
├── test-runner.md
├── code-review.md
└── ...
```

### 기본 구조

```markdown
# api-builder

API 엔드포인트를 생성할 때 참고하는 지침입니다.

## 응답 형식

모든 API는 다음 형식으로 응답합니다:

```typescript
{
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}
```

## 에러 처리

```typescript
try {
  // 로직
} catch (error) {
  return {
    success: false,
    error: error.message,
    timestamp: new Date().toISOString()
  };
}
```

## 네이밍 규칙

- 엔드포인트: kebab-case (예: /user-profile)
- 함수명: camelCase (예: getUserProfile)
- 파일명: [기능명].ts (예: auth.ts)
```

## 자주 사용하는 Skills 예시

### api-builder

```markdown
# api-builder

## 목적
일관된 API 엔드포인트 생성

## 포함 내용
- 응답 형식 표준
- 에러 처리 패턴
- 인증 처리 방법
- 입력 검증 규칙
```

### db-schema

```markdown
# db-schema

## 목적
데이터베이스 스키마 설계 지침

## 포함 내용
- 테이블 네이밍 규칙
- 컬럼 타입 표준
- 인덱스 설정 기준
- RLS 정책 패턴
```

### test-runner

```markdown
# test-runner

## 목적
테스트 작성 및 실행 지침

## 포함 내용
- 테스트 파일 위치
- 테스트 케이스 작성법
- Mock 데이터 규칙
- 커버리지 기준
```

### code-review

```markdown
# code-review

## 목적
코드 리뷰 체크리스트

## 포함 내용
- 필수 확인 항목
- 보안 검토 항목
- 성능 검토 항목
- 가독성 기준
```

## Skill 작성 팁

### 1. 구체적인 예시 포함

```markdown
## 좋은 예

❌ 추상적:
"응답 형식을 통일하세요"

✅ 구체적:
"모든 API 응답은 다음 형식을 따릅니다:
```json
{
  "success": true,
  "data": { "id": 1, "name": "홍길동" }
}
```"
```

### 2. Do / Don't 명시

```markdown
## 규칙

✅ DO:
- 모든 입력값 검증
- 에러 메시지 한글로 작성
- 민감정보 로깅 금지

❌ DON'T:
- SQL 직접 작성 (ORM 사용)
- console.log 남기기
- 하드코딩된 값 사용
```

### 3. 실제 코드 템플릿 제공

```markdown
## 템플릿

새 API 파일 생성 시 이 템플릿 사용:

```typescript
// [파일명].ts
import { createClient } from '@supabase/supabase-js';

export async function handler(req, res) {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );

  try {
    // 로직 구현
    return res.json({ success: true, data: result });
  } catch (error) {
    return res.json({ success: false, error: error.message });
  }
}
```
```

## Skills 활용 방법

### 자동 참조

Claude Code는 관련 작업 시 자동으로 해당 Skill을 참조합니다.

```
"로그인 API 만들어줘"
→ Claude Code가 api-builder Skill 자동 참조
→ 정의된 형식대로 API 생성
```

### 명시적 참조

```
"db-schema Skill을 참고해서 users 테이블 설계해줘"
→ 명시적으로 해당 Skill 참조
```

## 프로젝트별 권장 Skills

### 웹 개발 프로젝트

```
.claude/skills/
├── api-builder.md      # API 설계 규칙
├── db-schema.md        # DB 설계 규칙
├── component-design.md # UI 컴포넌트 규칙
├── test-runner.md      # 테스트 규칙
└── code-review.md      # 코드 리뷰 기준
```

### 문서화 프로젝트

```
.claude/skills/
├── doc-writer.md       # 문서 작성 규칙
├── api-doc.md          # API 문서화 규칙
└── readme-template.md  # README 템플릿
```

## 주의사항

- Skills는 너무 길지 않게 (핵심만 간결하게)
- 프로젝트 실정에 맞게 커스터마이즈
- 정기적으로 업데이트 (프로젝트 변화 반영)
- 팀원과 Skills 내용 합의 필요
- 상충되는 규칙 없도록 주의
