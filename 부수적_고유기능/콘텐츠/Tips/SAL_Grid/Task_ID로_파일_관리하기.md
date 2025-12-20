# Task ID로 파일 관리하기

> 이 문서는 SAL Grid에서 Task ID를 활용하여 파일을 체계적으로 관리하는 방법을 설명합니다.

---

## Task ID란

Task ID는 각 작업을 고유하게 식별하는 코드입니다. `S2BA1`이라는 ID는: S2(Stage 2) + BA(Backend APIs) + 1(첫 번째 Task)를 의미합니다.

---

## Task ID 구조

**Stage 코드 (5개)**

| Stage | 폴더명 | 설명 |
|-------|--------|------|
| S1 | S1_개발_준비 | 환경 설정, DB 스키마 |
| S2 | S2_개발-1차 | 핵심 기능 개발 |
| S3 | S3_개발-2차 | 추가 기능 개발 |
| S4 | S4_개발-3차 | QA, 최적화 |
| S5 | S5_운영 | 배포, 모니터링 |

**Area 코드 (11개)**

| Area | Production 저장 | 설명 |
|------|:---------------:|------|
| F | ✅ | Frontend |
| BA | ✅ | Backend APIs |
| S | ✅ | Security |
| BI | ✅ | Backend Infrastructure |
| E | ✅ | External |
| D, M, U, T, O, C | ❌ | DB, 문서, 디자인, 테스트, DevOps, 콘텐츠 |

---

## 파일에 Task ID 표기

**JavaScript**
```javascript
/**
 * @task S2BA1
 * @description 구독 취소 API
 */
export default async function handler(req, res) { }
```

**HTML**
```html
<!--
@task S2F1
@description Google 로그인 페이지
-->
```

**SQL**
```sql
-- @task S1D1
-- @description users 테이블 생성
```

---

## Task ID로 저장 위치 결정

**예시: S2BA1**
- Stage: S2 (개발 1차)
- Area: BA (Backend APIs, Production 저장 대상)
- 저장 위치:
  - `S2_개발-1차/Backend_APIs/subscription-cancel.js`
  - `Production/api/Backend_APIs/subscription-cancel.js`

**예시: S1D1**
- Stage: S1, Area: D (Database, Production 저장 안 함)
- 저장 위치: `S1_개발_준비/Database/` (Supabase에서 직접 실행)

---

## 장점

- **추적성**: Task ID로 언제, 왜 만들어졌는지 추적 가능
- **일관성**: 동일한 규칙으로 모든 파일 관리
- **자동화**: 파일 위치, 검증 결과 자동 연결

---

## 주의사항

- 모든 코드 파일에 Task ID 주석 필수
- Production 복사 시에도 Task ID 유지
- 한 번 정해진 Task ID는 변경하지 않음

---

*상세 내용: `.claude/rules/01_file-naming.md`, `03_area-stage.md` 참조*

