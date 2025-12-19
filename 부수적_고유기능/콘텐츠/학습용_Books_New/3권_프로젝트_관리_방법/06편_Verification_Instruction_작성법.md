# 6편 | Verification Instruction 작성법

---

Task Instruction이 "무엇을 할지"를 정의한다면, Verification Instruction은 "어떻게 검증할지"를 정의한다. 이 편에서는 효과적인 Verification Instruction을 작성하는 방법을 살펴본다.

## 1. Verification Instruction이란

### 정의

Verification Instruction은 22개 속성 중 `verification_instruction` 필드에 들어가는 값이다. Task가 완료된 후 제대로 수행되었는지 검증하는 기준을 제공한다.

```json
{
  "task_id": "S2BA1",
  "task_instruction": "구독 취소 API 구현...",
  "verification_instruction": "1. API 호출 시 구독 상태 변경 확인..."
}
```

### Task Instruction과의 관계

두 Instruction은 짝을 이룬다.

```
Task Instruction: "무엇을 해야 하는가"
                      ↓
                   작업 수행
                      ↓
Verification Instruction: "제대로 했는가"
```

Task Instruction의 모든 요구사항은 Verification Instruction에서 검증되어야 한다.

### 왜 필요한가

```
검증 없음 → 문제 발견 지연 → 나중에 대규모 수정
검증 있음 → 즉시 문제 발견 → 바로 수정
```

검증을 건너뛰면 나중에 더 큰 비용이 든다.

---

## 2. 작성자 ≠ 검증자 원칙

### 핵심 원칙

**Task Agent와 Verification Agent는 반드시 다른 Agent여야 한다.**

```
❌ 금지:
Task Agent: backend-developer
Verification Agent: backend-developer  ← 같은 Agent!

✅ 올바름:
Task Agent: backend-developer
Verification Agent: code-reviewer  ← 다른 Agent!
```

### 왜 분리해야 하는가

**1. 자기 검증의 한계**

자기가 만든 것은 자기가 객관적으로 평가하기 어렵다. 작성자는 자신의 코드가 "당연히 맞다"고 생각하는 경향이 있다.

**2. 새로운 시각**

다른 Agent가 보면 작성자가 놓친 문제를 발견할 수 있다.

**3. 품질 보장**

두 번의 검토(작성 + 검증)를 거치면 품질이 높아진다.

### Area별 Agent 매핑

| Area | Task Agent | Verification Agent |
|------|------------|-------------------|
| M | documentation-specialist | code-reviewer |
| U | frontend-developer | qa-specialist |
| F | frontend-developer | code-reviewer |
| BI | backend-developer | code-reviewer |
| BA | backend-developer | code-reviewer |
| D | database-specialist | database-specialist* |
| S | security-specialist | security-auditor |
| T | test-engineer | qa-specialist |
| O | devops-troubleshooter | code-reviewer |
| E | backend-developer | code-reviewer |
| C | content-specialist | qa-specialist |

*D Area는 같은 전문가지만 역할(작성/검증)이 다름

---

## 3. 검증 기준 설정 방법

### 객관적/측정 가능한 기준

검증 기준은 Pass/Fail을 명확히 판단할 수 있어야 한다.

```
❌ 주관적 기준:
"코드가 깔끔해야 함"
"성능이 좋아야 함"
"UI가 예뻐야 함"

✅ 객관적 기준:
"ESLint 에러 0개"
"API 응답 시간 500ms 이내"
"디자인 시안과 일치"
```

### Pass/Fail 판단 기준

각 검증 항목에 대해 Pass/Fail 기준을 명시한다.

```
검증 항목: API 응답 상태코드
- Pass: 성공 시 200, 실패 시 적절한 4xx/5xx
- Fail: 잘못된 상태코드 반환

검증 항목: 에러 핸들링
- Pass: 모든 에러 케이스에서 적절한 메시지 반환
- Fail: 에러 시 빈 응답 또는 스택트레이스 노출
```

### 검증 유형별 기준

**1. 기능 검증**
```
- 정상 케이스: 예상대로 동작하는가
- 엣지 케이스: 경계값에서 올바르게 처리하는가
- 에러 케이스: 잘못된 입력에 적절히 대응하는가
```

**2. 빌드 검증**
```
- 컴파일: 에러 없이 빌드되는가
- 린트: 코드 스타일 규칙 준수하는가
- 배포: 배포 환경에서 정상 동작하는가
```

**3. 통합 검증**
```
- 의존성: 선행 Task 결과물과 연동되는가
- 다른 Task: 다른 Task와 충돌하지 않는가
- 데이터 흐름: 데이터가 정상적으로 전달되는가
```

---

## 4. 검증 결과 기록 형식

### test_result (#16)

테스트 수행 결과를 기록한다.

```json
{
  "unit_test": "✅ 5/5 통과",
  "integration_test": "✅ 3/3 통과",
  "edge_cases": "✅ 경계값 처리 확인",
  "manual_test": "✅ 수동 테스트 완료"
}
```

**상태 표시:**
- ✅: Pass
- ❌: Fail
- ⏳: 진행 중

### build_verification (#17)

빌드 관련 검증 결과를 기록한다.

```json
{
  "compile": "✅ 컴파일 성공",
  "lint": "✅ ESLint 에러 0개",
  "deploy": "✅ Vercel 배포 성공",
  "runtime": "✅ 런타임 에러 없음"
}
```

### integration_verification (#18)

다른 Task와의 통합 검증 결과를 기록한다.

```json
{
  "dependency_propagation": "✅ S1D1 스키마 정상 사용",
  "cross_task_connection": "✅ S2F1과 연동 확인",
  "data_flow": "✅ 입출력 데이터 정상"
}
```

### blockers (#19)

차단 요소가 있는지 기록한다.

```json
{
  "dependency": "None",
  "environment": "None",
  "external_api": "None",
  "status": "No Blockers ✅"
}
```

차단 요소가 있는 경우:
```json
{
  "dependency": "⚠️ S1S1 미완료",
  "environment": "None",
  "external_api": "None",
  "status": "1 Blocker 🚫"
}
```

### comprehensive_verification (#20)

모든 검증을 종합한다.

```json
{
  "task_instruction": "✅ 모든 요구사항 구현",
  "test": "✅ 8/8 통과",
  "build": "✅ 4/4 통과",
  "integration": "✅ 3/3 통과",
  "blockers": "✅ None",
  "final": "✅ Passed"
}
```

---

## 5. 실제 예시

### 5.1 API 검증 예시

**Task: S2BA1 구독 취소 API**

```markdown
# Verification Instruction

## 기능 검증

### 정상 케이스
1. 활성 구독 사용자로 API 호출
   - 예상: 200 OK + 성공 메시지
   - 확인: subscription_status가 'cancelled'로 변경

### 엣지 케이스
2. 이미 취소된 구독으로 API 호출
   - 예상: 409 Conflict + "이미 취소됨" 메시지

3. 구독이 없는 사용자로 API 호출
   - 예상: 404 Not Found

### 에러 케이스
4. 인증 없이 API 호출
   - 예상: 401 Unauthorized

5. 잘못된 user_id 형식
   - 예상: 400 Bad Request

## 빌드 검증
- ESLint 에러 없음
- Vercel 배포 성공

## 통합 검증
- S1D2 subscriptions 테이블 연동 확인
- S2BA2 이메일 발송 함수 호출 확인
```

### 5.2 UI 검증 예시

**Task: S2F1 Google 로그인 UI**

```markdown
# Verification Instruction

## 기능 검증

### 정상 케이스
1. 페이지 로드
   - 확인: 로고, 타이틀, 버튼 표시

2. Google 로그인 버튼 클릭
   - 예상: Google 로그인 팝업 표시

3. 로그인 성공 후
   - 예상: /index.html로 리다이렉트

### 에러 케이스
4. 로그인 실패/취소
   - 예상: 에러 메시지 표시 (alert 또는 UI)

## 빌드 검증
- HTML 유효성 검사 통과
- 브라우저 콘솔 에러 없음

## UI/UX 검증
- 반응형: 모바일/데스크톱 정상 표시
- 접근성: 버튼에 적절한 aria-label

## 통합 검증
- S1S1 Supabase Auth 연동 확인
- S1BI1 Supabase Client 정상 로드
```

### 5.3 Database 검증 예시

**Task: S1D1 users 테이블 스키마**

```markdown
# Verification Instruction

## 스키마 검증

1. 테이블 생성 확인
   - 확인: \d users 명령으로 구조 확인

2. 필드 타입 확인
   - id: UUID
   - email: TEXT, NOT NULL, UNIQUE
   - created_at: TIMESTAMPTZ

3. 기본값 확인
   - id: uuid_generate_v4()
   - subscription_status: 'free'
   - created_at: NOW()

## RLS 검증

4. SELECT 정책
   - 본인 데이터만 조회 가능
   - 다른 사용자 데이터 조회 시 빈 결과

5. UPDATE 정책
   - 본인 데이터만 수정 가능
   - 다른 사용자 데이터 수정 시도 시 에러

## 데이터 검증

6. 테스트 데이터 삽입
   - INSERT 정상 동작
   - 중복 email 삽입 시 에러
```

---

## 6. Verification Instruction 작성 팁

### Tip 1: Task Instruction과 1:1 대응

Task Instruction의 각 요구사항에 대응하는 검증 항목이 있어야 한다.

```
Task Instruction:
1. API가 200 반환 ─────→ 검증: 200 반환 확인 ✓
2. 상태가 변경됨 ─────→ 검증: DB 상태 확인 ✓
3. 이메일 발송 ─────→ 검증: 이메일 트리거 확인 ✓
```

### Tip 2: 검증 순서 명시

검증은 순서대로 진행해야 효율적이다.

```
1. 먼저: 기본 기능 검증
2. 다음: 엣지 케이스 검증
3. 그 다음: 에러 케이스 검증
4. 마지막: 통합 검증
```

### Tip 3: 자동화 가능 여부 표시

```
[자동] API 응답 코드 확인 → 테스트 코드로 자동화
[수동] UI 레이아웃 확인 → 육안 확인 필요
```

---

## 7. 다음 단계

6편에서는 Verification Instruction 작성법을 살펴봤다.

- Task Agent ≠ Verification Agent 원칙
- 객관적/측정 가능한 검증 기준
- JSON 형식의 검증 결과 기록

다음 편에서는 검증 시스템 전체와 Stage Gate 프로세스를 살펴본다.

---

*다음 편: 7편 | 검증 시스템과 Stage Gate*

---

**작성일: 2025-12-20 / 글자수: 약 4,500자 / 작성자: Claude / 프롬프터: 써니**
