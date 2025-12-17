# Task ID로 파일 관리하기

## 핵심 요약

모든 파일 첫 줄에 Task ID 주석(예: `// Task ID: S2BA1`)을 넣으면 어떤 Task에서 생성된 파일인지 추적이 쉬워집니다. 이는 유지보수와 디버깅에 필수적인 관행입니다.

## 왜 Task ID를 파일에 기록해야 하나?

### 장점

| 장점 | 설명 |
|------|------|
| 추적성 | 파일이 어떤 Task에서 생성되었는지 즉시 파악 |
| 유지보수 | 수정이 필요할 때 관련 Task 찾기 쉬움 |
| 디버깅 | 문제 발생 시 원인 Task 빠르게 특정 |
| 문서화 | Grid와 코드 간 연결고리 역할 |
| 협업 | 팀원 간 작업 범위 명확화 |

### Task ID 없을 때 vs 있을 때

```
❌ Task ID 없이:
"이 파일 누가 언제 왜 만들었지?"
"이거 수정해도 되나? 어디서 쓰이지?"
"버그 원인이 이 파일인데, 관련 Task가 뭐지?"

✅ Task ID 있을 때:
// Task ID: S2BA1
→ Grid에서 S2BA1 검색
→ 담당자, 목적, 의존성, 테스트 방법 모두 파악
→ 안전하게 수정 가능
```

## Task ID 주석 형식

### 언어별 형식

```javascript
// JavaScript/TypeScript
// Task ID: S2BA1
// Description: 회원가입 API

export async function signup() { ... }
```

```python
# Python
# Task ID: S2BA1
# Description: 회원가입 API

def signup():
    ...
```

```sql
-- SQL
-- Task ID: S1D1
-- Description: users 테이블 생성

CREATE TABLE users (
    ...
);
```

```html
<!-- HTML -->
<!-- Task ID: S2F1 -->
<!-- Description: 로그인 페이지 -->

<!DOCTYPE html>
<html>
...
```

```css
/* CSS */
/* Task ID: S2F1 */
/* Description: 로그인 페이지 스타일 */

.login-form {
    ...
}
```

```json
{
  "_task_id": "S2BA1",
  "_description": "API 설정 파일",
  "config": {
    ...
  }
}
```

### 권장 형식 (확장)

```javascript
// Task ID: S2BA1
// Task Name: 회원가입 API 구현
// Stage: S2 (개발 1차)
// Area: BA (Backend APIs)
// Created: 2025-01-15
// Dependencies: S1D1, S1S1

/**
 * 회원가입 API
 * - 이메일/비밀번호 검증
 * - Supabase Auth 연동
 * - 프로필 생성
 */
```

## Task ID 체계

### 구조 설명

```
Task ID: S2BA1

S2  = Stage 2 (개발 1차)
BA  = Area (Backend APIs)
1   = 순번

전체 구조:
[Stage][Area][Number]
```

### Stage 코드

| Stage | 명칭 | 설명 |
|-------|------|------|
| S1 | 개발 준비 | 환경 설정, 기초 구조 |
| S2 | 개발 1차 | 핵심 기능 개발 |
| S3 | 개발 2차 | 고급 기능 개발 |
| S4 | 개발 3차 | QA, 최적화 |
| S5 | 운영 | 배포, 운영 |

### Area 코드

| Area | 명칭 | 파일 예시 |
|------|------|----------|
| M | Documentation | 문서 (.md) |
| U | Design | 디자인 파일 |
| F | Frontend | .html, .jsx, .tsx |
| BI | Backend Infra | 설정 파일 |
| BA | Backend APIs | API 코드 |
| D | Database | .sql 파일 |
| S | Security | 인증/보안 코드 |
| T | Testing | 테스트 파일 |
| O | DevOps | CI/CD, 배포 |
| E | External | 외부 연동 |
| C | Content | 콘텐츠 관련 |

## 파일 저장 규칙

### 2대 규칙 요약

```
규칙 1: Stage + Area 폴더에 저장
규칙 2: Production 코드는 이중 저장
```

### Task ID별 파일 위치

```
S2BA1 (Backend API)
├── 개발 폴더: S2_개발-1차/Backend_API/S2BA1_signup.ts
└── Production: Production/Backend_API/signup.ts

S2F1 (Frontend)
├── 개발 폴더: S2_개발-1차/Frontend/S2F1_login.html
└── Production: Production/Frontend/pages/auth/login.html

S1D1 (Database)
├── 개발 폴더: S1_개발_준비/Database/S1D1_users.sql
└── Production: Production/Database/01_users.sql
```

### 파일명에 Task ID 포함 여부

```
개발 폴더: Task ID 포함 권장
예: S2BA1_signup.ts, S2F1_login.html

Production 폴더: Task ID 생략 가능
예: signup.ts, login.html
(대신 파일 첫 줄에 Task ID 주석 필수)
```

## Grid와 파일 연결

### Grid의 generated_files 필드

```javascript
// Grid 데이터 예시
{
  "task_id": "S2BA1",
  "task_name": "회원가입 API",
  "generated_files": [
    "S2_개발-1차/Backend_API/S2BA1_signup.ts",
    "Production/Backend_API/signup.ts"
  ]
}
```

### 파일에서 Grid 찾기

```
파일 열기 → 첫 줄 Task ID 확인 → Grid에서 검색

예:
// Task ID: S2BA1
↓
Grid에서 S2BA1 검색
↓
Task 상세 정보 확인 (목적, 의존성, 검증 상태 등)
```

### Grid에서 파일 찾기

```
Grid에서 Task 선택 → generated_files 확인 → 파일 열기

예:
Task ID: S2BA1 선택
↓
generated_files: ["S2_개발-1차/Backend_API/S2BA1_signup.ts"]
↓
해당 파일 열기
```

## 파일 추적 활용

### 버그 발생 시

```
[버그 발생]
파일: signup.ts에서 오류
    ↓
[Task ID 확인]
// Task ID: S2BA1
    ↓
[Grid 검색]
S2BA1 → 의존성: S1D1, S1S1
    ↓
[관련 파일 확인]
S1D1: users 테이블
S1S1: 인증 설정
    ↓
[원인 분석]
테이블 스키마 또는 인증 설정 문제일 수 있음
```

### 수정 영향 분석

```
[수정 예정]
파일: users.sql (Task ID: S1D1)
    ↓
[의존 Task 확인]
Grid에서 S1D1에 의존하는 Task 검색
→ S2BA1, S2BA2, S2S1 등
    ↓
[영향 범위 파악]
위 Task들의 generated_files도 수정 필요할 수 있음
    ↓
[테스트 범위 결정]
의존 Task들의 테스트도 재실행 필요
```

## Claude Code에게 요청하기

### 파일 생성 시 Task ID 포함 요청

```
"S2BA1 회원가입 API 파일 만들어줘.
파일 첫 줄에 Task ID 주석 넣어줘."
```

### Task ID로 파일 찾기 요청

```
"S2BA1 Task의 generated_files 찾아줘"

"Task ID: S2BA1이 포함된 파일들 찾아줘"
```

### 의존성 분석 요청

```
"S1D1 파일 수정하면 영향받는 Task 뭐야?"

"S2BA1에 의존하는 다른 Task 목록 알려줘"
```

## 체크리스트

### 파일 생성 시

- [ ] 파일 첫 줄에 Task ID 주석 추가
- [ ] Task Name, Stage, Area 정보 포함
- [ ] 의존성 Task ID 기록 (필요시)
- [ ] Grid의 generated_files에 파일 경로 기록

### 파일 수정 시

- [ ] Task ID 주석이 있는지 확인
- [ ] 올바른 Task ID인지 확인
- [ ] Grid 정보와 일치하는지 확인
- [ ] 수정 후 관련 테스트 실행

## 주의사항

- 모든 코드 파일에 Task ID 주석 필수
- Task ID는 Grid와 정확히 일치해야 함
- 파일 이동/복사 시 Task ID 주석도 함께 유지
- Production 폴더 파일도 Task ID 주석 필수
- JSON 파일은 `_task_id` 필드로 기록
- Task ID 없는 고아 파일 발생 주의

