# Task ID로 파일 관리하기

## 💡 Tip

모든 파일 첫 줄에 **Task ID 주석**을 넣으면 어떤 작업에서 만들어진 파일인지 쉽게 추적할 수 있습니다.

## Task ID 형식

```
S{Stage}{Area}{Number}

예시:
- S2BA1: Stage 2, Backend API, Task 1
- S2F1: Stage 2, Frontend, Task 1
- S2D1: Stage 2, Database, Task 1
```

## 주석 작성 예시

### JavaScript/TypeScript

```javascript
/**
 * Task ID: S2BA1
 * Task Name: 회원가입 API
 * Description: 이메일/비밀번호 기반 회원가입
 */

async function signUp(email, password, nickname) {
    // ...
}
```

### SQL

```sql
-- Task ID: S2D1
-- Task Name: 인덱스 최적화
-- Description: 자주 조회되는 컬럼에 인덱스 추가

CREATE INDEX idx_users_email ON users(email);
```

### HTML

```html
<!--
    Task ID: S2F1
    Task Name: 로그인 페이지
    Description: Google OAuth 로그인 UI
-->
<!DOCTYPE html>
<html>
```

## 장점

1. **추적성**: 파일이 어떤 Task에서 만들어졌는지 바로 확인
2. **검증**: Phase Gate 검증 시 Task ID로 파일 찾기 쉬움
3. **문서화**: 자동 문서화 도구가 Task ID 활용 가능
4. **협업**: 팀원이 파일 목적을 쉽게 파악

## SAL Grid 연동

```markdown
## S2BA1: 회원가입 API

### 산출물
- `S2_개발-1차/Backend_API/auth/S2BA1_signup.ts`
- `S2_개발-1차/Backend_API/auth/S2BA1_signup.test.ts`
```

## 검증 시 활용

```bash
# Task ID로 파일 검색
grep -r "Task ID: S2BA1" --include="*.ts"
```

## 관련 문서
- `PROJECT_STATUS.md` - Task 목록
- `CLAUDE.md` - 네이밍 규칙
