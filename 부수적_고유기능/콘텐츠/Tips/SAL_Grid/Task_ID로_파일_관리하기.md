# Task ID로 파일 관리하기

## 요약
모든 파일 첫 줄에 Task ID 주석(예: `/** @task S2BA1 */`)을 넣으면 어떤 Task에서 생성된 파일인지 추적이 쉬워진다. 유지보수와 디버깅에 필수.

## 상세

### Task ID 주석 형식

```javascript
/**
 * @task S2BA1
 */
export async function signup() { ... }
```

```html
<!--
@task S2F1
-->
<!DOCTYPE html>
```

```sql
-- @task S1D1
CREATE TABLE users (...);
```

### Task ID 구조

```
S2BA1 = [Stage][Area][Number]

S2  = Stage 2 (개발 1차)
BA  = Backend APIs
1   = 순번
```

### Stage 코드 (5개)

| Stage | 폴더명 | 설명 |
|-------|--------|------|
| S1 | S1_개발_준비 | 환경 설정, DB 스키마 |
| S2 | S2_개발-1차 | 핵심 기능 개발 |
| S3 | S3_개발-2차 | 추가 기능 개발 |
| S4 | S4_개발-3차 | QA, 최적화 |
| S5 | S5_운영 | 배포, 모니터링 |

### Area 코드 (11개)

| Area | 설명 | Production 저장 |
|------|------|:---------------:|
| F | Frontend | O |
| BA | Backend APIs | O |
| S | Security | O |
| BI | Backend Infrastructure | O |
| E | External 연동 | O |
| D | Database | X |
| M | Documentation | X |
| U | Design | X |
| T | Testing | X |
| O | DevOps | X |
| C | Content System | X |

### 주의
- 모든 코드 파일에 Task ID 주석 필수
- Production 폴더 파일도 Task ID 주석 필수
- JSON 파일은 `"_task_id": "S2BA1"` 형태로 기록

---
📚 더 자세히: `.claude/rules/01_file-naming.md`
