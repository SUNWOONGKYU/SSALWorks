# 5편 | Task Instruction 작성법

---

Task Instruction은 AI에게 주는 작업 지시서이다. Instruction이 명확할수록 AI의 결과물이 좋아진다. 이 편에서는 효과적인 Task Instruction을 작성하는 방법을 살펴본다.

## 1. Task Instruction이란

### 정의

Task Instruction은 22개 속성 중 `task_instruction` 필드에 들어가는 값이다. AI가 이 Task에서 무엇을 해야 하는지 상세하게 기술한다.

```json
{
  "task_id": "S2BA1",
  "task_name": "구독 취소 API",
  "task_instruction": "POST /api/subscription/cancel 엔드포인트 구현..."
}
```

### 왜 중요한가

```
모호한 Instruction → AI가 추측 → 잘못된 결과
명확한 Instruction → AI가 정확히 이해 → 원하는 결과
```

Instruction의 품질이 곧 결과물의 품질이다.

### Instruction vs 대화

일반적인 AI 대화와 달리, Instruction은 구조화되어 있다.

```
❌ 대화 방식:
"구독 취소 기능 만들어줘. 아 그리고 취소하면 이메일도 보내야 하고..."

✅ Instruction 방식:
"구현 사항:
1. POST /api/subscription/cancel 엔드포인트
2. 입력: user_id
3. 처리: subscription_status를 'cancelled'로 변경
4. 출력: 성공/실패 JSON
5. 부가 기능: 취소 확인 이메일 발송 트리거"
```

---

## 2. Instruction 구조

좋은 Instruction은 다음 요소를 포함한다.

### 2.1 목표 (Goal)

이 Task가 완료되면 무엇이 달성되는가?

```
목표: 사용자가 구독을 취소할 수 있는 API 엔드포인트 구현
```

### 2.2 입력/출력 (Input/Output)

무엇을 받아서 무엇을 반환하는가?

```
입력:
- user_id: 사용자 UUID (필수)
- reason: 취소 사유 (선택)

출력:
- 성공: { success: true, message: "구독이 취소되었습니다" }
- 실패: { success: false, error: "취소할 구독이 없습니다" }
```

### 2.3 세부 요구사항 (Requirements)

구체적으로 어떻게 구현해야 하는가?

```
요구사항:
1. Supabase에서 user_id로 구독 정보 조회
2. subscription_status가 'active'인 경우만 취소 가능
3. 취소 시 subscription_status를 'cancelled'로 변경
4. cancelled_at 필드에 현재 시각 기록
5. 성공 시 취소 확인 이메일 발송 함수 호출
```

### 2.4 예외 처리 (Error Handling)

예상되는 오류 상황과 처리 방법:

```
예외 처리:
- 사용자를 찾을 수 없는 경우: 404 반환
- 이미 취소된 구독인 경우: 400 반환 + "이미 취소된 구독입니다"
- DB 오류 발생 시: 500 반환 + 에러 로깅
```

### 2.5 참고 사항 (Notes)

추가로 알아야 할 정보:

```
참고:
- 이메일 발송은 S2BA2에서 구현된 sendEmail 함수 사용
- Supabase Client는 S1BI1에서 설정한 것 사용
- 환불 처리는 S4에서 별도 구현 예정
```

---

## 3. 좋은 Instruction vs 나쁜 Instruction

### 비교 1: 목표

```
❌ 나쁜 예:
"로그인 기능 구현"

✅ 좋은 예:
"Google OAuth를 통한 소셜 로그인 구현.
- Supabase Auth의 signInWithOAuth 사용
- 로그인 성공 시 /dashboard로 리다이렉트
- 실패 시 에러 메시지 표시"
```

### 비교 2: 구체성

```
❌ 나쁜 예:
"사용자 정보 저장"

✅ 좋은 예:
"users 테이블에 다음 필드 저장:
- id: UUID (Supabase Auth에서 생성)
- email: 이메일 주소
- full_name: 전체 이름
- avatar_url: 프로필 이미지 URL
- created_at: 가입 시각
- updated_at: 정보 수정 시각"
```

### 비교 3: 완료 기준

```
❌ 나쁜 예:
"API가 잘 동작해야 함"

✅ 좋은 예:
"완료 기준:
1. POST /api/subscription/cancel 호출 시 200 반환
2. 구독 상태가 'cancelled'로 변경됨
3. cancelled_at 필드가 기록됨
4. 중복 취소 시 400 에러 반환"
```

### 비교 4: 예외 처리

```
❌ 나쁜 예:
"에러 처리도 해줘"

✅ 좋은 예:
"에러 처리:
- 401: 인증되지 않은 사용자
- 404: 구독 정보 없음
- 409: 이미 취소된 구독
- 500: 서버 내부 오류 (로깅 필수)"
```

---

## 4. 작성 가이드라인

### 4.1 구체적으로 작성

추상적인 표현 대신 구체적인 표현을 사용한다.

| 추상적 | 구체적 |
|--------|--------|
| 사용자 정보 | user_id, email, full_name |
| 적절한 에러 처리 | 401, 404, 500 상태코드 반환 |
| 빠르게 | 3초 이내 응답 |
| 안전하게 | RLS 정책 적용, 입력값 검증 |

### 4.2 측정 가능하게 작성

완료 여부를 객관적으로 판단할 수 있어야 한다.

```
❌ 측정 불가:
"UI가 예쁘게"
"빠르게 동작"
"안정적으로"

✅ 측정 가능:
"디자인 시안 figma.com/xxx 참조"
"API 응답 시간 500ms 이내"
"에러율 1% 미만"
```

### 4.3 예시 포함

복잡한 요구사항은 예시로 보여준다.

```
API 응답 예시:

성공 시:
{
  "success": true,
  "data": {
    "subscription_id": "sub_123",
    "status": "cancelled",
    "cancelled_at": "2025-12-20T10:30:00Z"
  }
}

실패 시:
{
  "success": false,
  "error": {
    "code": "ALREADY_CANCELLED",
    "message": "이미 취소된 구독입니다"
  }
}
```

### 4.4 의존성 명시

다른 Task의 결과물을 사용하는 경우 명확히 표시한다.

```
참고:
- Supabase Client: S1BI1에서 생성한 supabaseClient 사용
- 이메일 함수: S2BA2에서 구현한 sendEmail() 사용
- DB 스키마: S1D1의 users 테이블, S1D2의 subscriptions 테이블
```

---

## 5. 실제 예시

### 5.1 Frontend Task 예시

```markdown
# S2F1: Google 로그인 UI

## 목표
Google OAuth 로그인 버튼이 있는 로그인 페이지 구현

## 파일 위치
- Production/Frontend/pages/auth/google-login.html

## 요구사항
1. "Google로 로그인" 버튼 표시
2. 버튼 클릭 시 Supabase signInWithOAuth 호출
3. 로그인 성공 시 /index.html로 리다이렉트
4. 로그인 실패 시 에러 메시지 표시

## UI 요소
- 로고 (SSALWorks)
- 타이틀 ("로그인")
- Google 로그인 버튼 (Google 아이콘 포함)
- 에러 메시지 영역

## 의존성
- S1S1: Supabase Auth 설정 완료 필요
- S1BI1: Supabase Client 사용

## 완료 기준
1. 페이지 정상 로드
2. 버튼 클릭 시 Google 로그인 창 표시
3. 로그인 성공 시 /index.html 이동
```

### 5.2 Backend Task 예시

```markdown
# S2BA1: 구독 취소 API

## 목표
사용자의 구독을 취소하는 API 엔드포인트 구현

## 파일 위치
- Production/api/Backend_APIs/subscription-cancel.js

## 엔드포인트
POST /api/subscription/cancel

## 입력
```json
{
  "user_id": "uuid",
  "reason": "string (optional)"
}
```

## 출력
```json
// 성공
{ "success": true, "message": "구독이 취소되었습니다" }

// 실패
{ "success": false, "error": "에러 메시지" }
```

## 처리 로직
1. user_id로 subscriptions 테이블 조회
2. 현재 상태가 'active'인지 확인
3. 'active'면 'cancelled'로 변경
4. cancelled_at에 현재 시각 기록
5. 취소 확인 이메일 발송

## 에러 처리
- 401: 인증 실패
- 404: 구독 정보 없음
- 409: 이미 취소됨
- 500: 서버 오류

## 의존성
- S1D2: subscriptions 테이블
- S2BA2: sendEmail 함수
```

### 5.3 Database Task 예시

```markdown
# S1D1: users 테이블 스키마

## 목표
사용자 정보를 저장할 users 테이블 생성

## 파일 위치
- S1_개발_준비/Database/S1D1_users_schema.sql

## 테이블 구조
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  subscription_status TEXT DEFAULT 'free',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## 필드 설명
- id: Supabase Auth와 연동되는 UUID
- email: 로그인 이메일
- full_name: 표시 이름
- avatar_url: 프로필 이미지
- subscription_status: free, active, cancelled
- created_at: 가입일시
- updated_at: 정보 수정일시

## RLS 정책
- SELECT: 본인 데이터만 조회 가능
- UPDATE: 본인 데이터만 수정 가능

## 완료 기준
1. 테이블 생성 완료
2. RLS 정책 적용 완료
3. 테스트 데이터 삽입 성공
```

---

## 6. 다음 단계

5편에서는 Task Instruction 작성법을 살펴봤다.

- Instruction 구조: 목표, 입력/출력, 요구사항, 예외 처리, 참고
- 작성 원칙: 구체적으로, 측정 가능하게, 예시 포함
- 좋은 Instruction = 좋은 결과물

다음 편에서는 Verification Instruction 작성법을 살펴본다. Task가 완료된 후 어떻게 검증할지 정의하는 방법이다.

---

*다음 편: 6편 | Verification Instruction 작성법*

---

**작성일: 2025-12-20 / 글자수: 약 4,600자 / 작성자: Claude / 프롬프터: 써니**
