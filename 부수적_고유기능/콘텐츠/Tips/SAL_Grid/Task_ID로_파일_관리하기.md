# Task ID로 파일 관리하기

## 요약
모든 파일 첫 줄에 Task ID 주석(예: `// Task ID: S2BA1`)을 넣으면 어떤 Task에서 생성된 파일인지 추적이 쉬워진다. 유지보수와 디버깅에 필수.

## 상세

### Task ID 주석 형식

```javascript
// JavaScript/TypeScript
// Task ID: S2BA1

export async function signup() { ... }
```

```html
<!-- HTML -->
<!-- Task ID: S2F1 -->

<!DOCTYPE html>
```

```sql
-- SQL
-- Task ID: S1D1

CREATE TABLE users (...);
```

### Task ID 구조

```
S2BA1 = [Stage][Area][Number]

S2  = Stage 2 (개발 1차)
BA  = Backend APIs
1   = 순번
```

### Stage/Area 코드

| Stage | 설명 | Area | 설명 |
|-------|------|------|------|
| S1 | 개발 준비 | F | Frontend |
| S2 | 개발 1차 | BA | Backend APIs |
| S3 | 개발 2차 | D | Database |
| S4 | 개발 3차 | S | Security |
| S5 | 운영 | M | Documentation |

### 주의
- 모든 코드 파일에 Task ID 주석 필수
- Production 폴더 파일도 Task ID 주석 필수
- JSON 파일은 `"_task_id": "S2BA1"` 형태로 기록

---
📚 더 자세히: `.claude/rules/01_file-naming.md`
