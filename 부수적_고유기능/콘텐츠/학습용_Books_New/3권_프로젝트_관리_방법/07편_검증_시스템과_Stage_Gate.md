# 7편 | 검증 시스템과 Stage Gate

---

SAL Grid에서는 모든 작업이 체계적으로 검증된다. Task 실행 → Task 검증 → Stage Gate 검증 → PO 승인의 단계를 거친다. 이 편에서는 전체 검증 시스템과 Stage Gate 프로세스를 살펴본다.

## 1. 실행과 검증 프로세스

### 전체 흐름

```
┌─────────────────────────────────────────────────────────────────┐
│                      실행 및 검증 프로세스                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  [실행] Task Agent ─────────────→ 작업 수행, 결과물 생성         │
│                                                                 │
│  [검증 1단계] Verification Agent ─→ Task 결과물 검증             │
│                                                                 │
│  [검증 2단계] Main Agent ─────────→ Stage 전체 검증              │
│                                                                 │
│  [검증 3단계] PO (Human) ─────────→ 최종 테스트 및 승인           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 각 단계의 역할

| 단계 | 수행자 | 역할 |
|------|--------|------|
| 실행 | Task Agent | 실제 작업 수행 (코드 작성, 파일 생성 등) |
| 검증 1단계 | Verification Agent | 개별 Task 결과물 검증 |
| 검증 2단계 | Main Agent | Stage 전체 통합 검증 |
| 검증 3단계 | PO (Human) | 최종 테스트 및 승인 |

---

## 2. Task 실행 (Task Agent)

### 역할

Task Agent는 task_instruction에 따라 실제 작업을 수행한다.

```
Task Agent (예: backend-developer)
    ↓
task_instruction 읽기
    ↓
작업 수행 (코드 작성, 파일 생성)
    ↓
결과물 생성
    ↓
generated_files, build_result 기록
```

### 기록 항목

Task 완료 후 다음 속성을 기록한다:

| 속성 | 내용 |
|------|------|
| generated_files | 생성된 파일 목록 |
| duration | 소요 시간 |
| build_result | 빌드 결과 |
| status | 'completed'로 변경 |

### 주의사항

- Task Agent는 검증을 하지 않는다
- 검증은 Verification Agent의 역할이다
- 작성자 ≠ 검증자 원칙

---

## 3. 검증 1단계: Task 검증 (Verification Agent)

### 역할

Verification Agent는 verification_instruction에 따라 Task 결과물을 검증한다.

```
Verification Agent (예: code-reviewer)
    ↓
verification_instruction 읽기
    ↓
Task 결과물 검증
    ↓
검증 결과 기록
```

### 검증 항목

| 검증 유형 | 내용 | 기록 속성 |
|----------|------|----------|
| 테스트 | 단위/통합/엣지 케이스 | test_result |
| 빌드 | 컴파일/린트/배포/런타임 | build_verification |
| 통합 | 의존성/연결/데이터 흐름 | integration_verification |
| 차단 요소 | 의존성/환경/외부 API | blockers |

### 검증 결과 예시

```json
{
  "test_result": {
    "unit_test": "✅ 5/5 통과",
    "integration_test": "✅ 3/3 통과",
    "edge_cases": "✅ 경계값 처리 확인",
    "manual_test": "✅ 수동 테스트 완료"
  },
  "build_verification": {
    "compile": "✅ 컴파일 성공",
    "lint": "✅ ESLint 에러 0개",
    "deploy": "✅ 배포 성공",
    "runtime": "✅ 런타임 에러 없음"
  },
  "comprehensive_verification": {
    "final": "✅ Passed"
  }
}
```

### Pass/Fail 판정

```
모든 항목 Pass → comprehensive_verification.final = "✅ Passed"
하나라도 Fail → comprehensive_verification.final = "❌ Failed"
```

---

## 4. 검증 2단계: Stage Gate (Main Agent)

### Stage Gate란

Stage Gate는 Stage 간의 관문이다. 현재 Stage의 모든 Task가 완료되고 검증을 통과해야 다음 Stage로 넘어갈 수 있다.

```
S1 ──[S1 Gate]──→ S2 ──[S2 Gate]──→ S3 ──[S3 Gate]──→ S4 ──[S4 Gate]──→ S5
      ↑                ↑                ↑                ↑
   모든 S1 Task     모든 S2 Task     모든 S3 Task     모든 S4 Task
   검증 통과 필요   검증 통과 필요   검증 통과 필요   검증 통과 필요
```

### Stage Gate 통과 조건

| 조건 | 확인 사항 |
|------|----------|
| Task 완료 | Stage 내 모든 Task status = 'completed' |
| 검증 통과 | 모든 Task comprehensive_verification = 'Passed' |
| Blocker 없음 | 모든 Task blockers.status = 'No Blockers' |
| 빌드 성공 | 전체 빌드가 정상 동작 |
| 통합 확인 | Task 간 연동이 정상 |

### Stage Gate 리포트

Main Agent가 Stage Gate 검증을 수행하고 리포트를 작성한다.

```markdown
# S2 Stage Gate Verification Report

## 1. Task 완료 현황

| Task ID | Task Name | Status | Verification |
|---------|-----------|--------|--------------|
| S2F1 | Google 로그인 UI | ✅ 완료 | ✅ Passed |
| S2F2 | 이메일 인증 UI | ✅ 완료 | ✅ Passed |
| S2BA1 | 구독 관리 API | ✅ 완료 | ✅ Passed |
| S2BA2 | 이메일 발송 API | ✅ 완료 | ✅ Passed |
| S2S1 | 세션 관리 | ✅ 완료 | ✅ Passed |

**완료율**: 5/5 (100%)

## 2. 검증 결과 종합

| 검증 유형 | 결과 |
|----------|------|
| 단위 테스트 | ✅ 24/24 통과 |
| 통합 테스트 | ✅ 8/8 통과 |
| 빌드 검증 | ✅ 에러 없음 |
| Blockers | ✅ 없음 |

## 3. AI 검증 의견

모든 S2 Task가 정상적으로 완료되었습니다.
Google 로그인, 이메일 인증, 구독 관리 기능이 정상 동작합니다.
S3 진행 준비 완료.

## 4. PO 테스트 가이드

### 테스트 1: Google 로그인
- 파일: Production/Frontend/pages/auth/google-login.html
- 방법: 브라우저에서 열고 버튼 클릭
- 예상: Google 로그인 후 대시보드 이동

### 테스트 2: 구독 취소
- 파일: Production/Frontend/pages/subscription/cancel.html
- 방법: 취소 버튼 클릭
- 예상: 구독 상태 'cancelled'로 변경

---

**검증일**: 2025-12-20
**검증자**: Main Agent (Claude)
**상태**: PO 승인 대기
```

---

## 5. 검증 3단계: PO 승인 (Human)

### 역할

PO(Project Owner, 사람)가 최종 테스트를 수행하고 Stage Gate 통과를 승인한다.

```
AI 검증 리포트 확인
    ↓
테스트 가이드 따라 직접 테스트
    ↓
기능 정상 작동 확인
    ↓
승인 또는 거부
```

### PO 테스트 가이드

AI가 제공하는 테스트 가이드 형식:

```markdown
## PO 테스트 가이드

### 테스트 전 확인사항
- [ ] 외부 서비스 설정 완료 (Supabase, Resend 등)
- [ ] 환경 변수 설정 완료
- [ ] 로컬 서버 실행 (필요 시)

### 기능별 테스트

#### [기능 1: Google 로그인]
- 테스트 파일: Production/Frontend/pages/auth/google-login.html
- 테스트 방법:
  1. 브라우저에서 파일 열기
  2. "Google로 로그인" 버튼 클릭
  3. Google 계정 선택
  4. 로그인 완료 후 대시보드 이동 확인
- 예상 결과: /index.html로 리다이렉트
- 필요 설정: Supabase Google Provider ✅

#### [기능 2: 구독 취소]
...
```

### 승인/거부

| 결과 | stage_gate_status | 다음 단계 |
|------|-------------------|----------|
| 승인 | 'approved' | 다음 Stage 진행 |
| 거부 | 'rejected' + 사유 | 문제 해결 후 재검증 |

---

## 6. 전체 프로세스 요약

```
┌─────────────────────────────────────────────────────────────────┐
│ Stage 시작                                                       │
│     ↓                                                            │
│ Task 1: Task Agent 실행 → Verification Agent 검증               │
│ Task 2: Task Agent 실행 → Verification Agent 검증               │
│ Task 3: Task Agent 실행 → Verification Agent 검증               │
│ ...                                                              │
│     ↓                                                            │
│ 모든 Task 완료                                                   │
│     ↓                                                            │
│ Main Agent: Stage Gate 검증                                     │
│     ↓                                                            │
│ Stage Gate 리포트 작성                                           │
│     ↓                                                            │
│ PO: 테스트 가이드 따라 테스트                                    │
│     ↓                                                            │
│ PO 승인                                                          │
│     ↓                                                            │
│ 다음 Stage 진행                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 7. 검증 실패 시 대응

### Task 검증 실패

```
Verification Agent: "❌ unit_test 2개 실패"
    ↓
Task Agent: 문제 수정
    ↓
Verification Agent: 재검증
    ↓
Pass될 때까지 반복
```

### Stage Gate 검증 실패

```
Main Agent: "❌ S2BA1과 S2F1 연동 오류"
    ↓
해당 Task 수정
    ↓
Verification Agent 재검증
    ↓
Main Agent Stage Gate 재검증
```

### PO 승인 거부

```
PO: "거부 - 로그인 후 리다이렉트 안 됨"
    ↓
문제 분석 및 수정
    ↓
전체 검증 재수행
    ↓
PO 재테스트
```

---

## 8. 다음 단계

7편에서는 검증 시스템과 Stage Gate를 살펴봤다.

- 실행: Task Agent
- 검증 1단계: Verification Agent (Task 검증)
- 검증 2단계: Main Agent (Stage Gate)
- 검증 3단계: PO (최종 승인)

다음 편에서는 Supabase DB와 HTML Viewer를 통해 Grid 데이터를 저장하고 조회하는 방법을 살펴본다.

---

*다음 편: 8편 | Supabase + HTML Viewer*

---

**작성일: 2025-12-20 / 글자수: 약 4,800자 / 작성자: Claude / 프롬프터: 써니**
