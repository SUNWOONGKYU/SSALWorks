# 3편 | 5x11 Matrix (Stage × Area)

---

SAL Grid에서 모든 Task는 5개 Stage와 11개 Area로 구성된 Matrix 위에 배치된다. 이 Matrix가 프로젝트의 전체 지도 역할을 한다. 이 편에서는 5x11 Matrix의 구조와 각 Stage, Area의 역할을 살펴본다.

## 1. Matrix 구조 개요

### 5 × 11 = 55개 영역

Matrix는 5개 Stage(행)와 11개 Area(열)의 조합으로 구성된다.

```
         M   U   F   BI  BA  D   S   T   O   E   C
     ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
 S1  │   │   │   │   │   │   │   │   │   │   │   │
     ├───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┤
 S2  │   │   │   │   │   │   │   │   │   │   │   │
     ├───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┤
 S3  │   │   │   │   │   │   │   │   │   │   │   │
     ├───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┤
 S4  │   │   │   │   │   │   │   │   │   │   │   │
     ├───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┤
 S5  │   │   │   │   │   │   │   │   │   │   │   │
     └───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘
```

각 칸에 Task들이 배치된다. 예를 들어 S2-BA 칸에는 S2BA1, S2BA2, S2BA3... 같은 Task들이 들어간다.

### Matrix의 역할

**1. 전체 프로젝트 조감도**

Matrix를 보면 프로젝트 전체가 한눈에 들어온다. 어느 Stage의 어느 Area에 얼마나 많은 Task가 있는지, 진행 상황이 어떤지 파악할 수 있다.

**2. 진행 상황 시각화**

```
         M   U   F   BI  BA  D   S   T   O   E   C
     ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
 S1  │ ✅│ ✅│ ✅│ ✅│ ✅│ ✅│ ✅│ ✅│ ✅│ ✅│ ✅│  ← 완료
     ├───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┤
 S2  │ ✅│ ✅│ 🔄│ ✅│ 🔄│ ✅│ ✅│ ⏳│ ⏳│ ⏳│ ⏳│  ← 진행 중
     ├───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┤
 S3  │ ⏳│ ⏳│ ⏳│ ⏳│ ⏳│ ⏳│ ⏳│ ⏳│ ⏳│ ⏳│ ⏳│  ← 대기
     ...
```

**3. 병렬 작업 식별**

같은 Stage 내의 다른 Area 작업은 병렬로 진행할 수 있다. Matrix를 보면 어떤 작업들이 동시에 가능한지 쉽게 파악된다.

---

## 2. 5개 Stage 상세

Stage는 프로젝트의 시간적 흐름을 나타낸다. S1부터 S5까지 순차적으로 진행한다.

### 2.1 S1: 개발 준비 (Development Setup)

**목적**: 개발을 시작하기 전에 필요한 모든 기반을 구축한다.

**주요 작업**:
- 개발 환경 설정
- 데이터베이스 스키마 설계
- 인증/보안 기본 설정
- 프로젝트 구조 수립

**특징**:
- 다른 Stage의 선행 조건이 된다
- 여기서 잘못되면 전체 프로젝트가 흔들린다
- 시간을 충분히 투자해야 한다

**예시 Task**:
```
S1D1: users 테이블 스키마 생성
S1S1: Supabase Auth Provider 설정
S1BI1: Supabase Client 라이브러리 설정
```

### 2.2 S2: 개발 1차 (Core Development)

**목적**: 서비스의 핵심 기능을 구현한다.

**주요 작업**:
- 사용자 인증 (로그인, 회원가입)
- 이메일 시스템
- 핵심 비즈니스 로직

**특징**:
- 가장 많은 Task가 집중된다
- Frontend, Backend, Security가 밀접하게 연결된다
- S1의 기반 위에서 작업한다

**예시 Task**:
```
S2F1: Google 로그인 UI
S2BA1: 구독 관리 API
S2S1: 세션 관리 구현
```

### 2.3 S3: 개발 2차 (Advanced Features)

**목적**: 고급 기능과 외부 연동을 구현한다.

**주요 작업**:
- AI 연동 (OpenAI, Claude 등)
- 외부 서비스 통합
- 고급 사용자 기능

**특징**:
- 외부 API 의존성이 높다
- S2의 기본 기능 위에 구축된다
- External(E) Area 작업이 많다

**예시 Task**:
```
S3E1: OpenAI API 연동
S3BA1: AI 채팅 API 구현
S3F1: AI 채팅 UI
```

### 2.4 S4: 개발 3차 (Payment & Admin)

**목적**: 수익화와 관리 기능을 구현한다.

**주요 작업**:
- 결제 시스템 (PG사 연동)
- 관리자 대시보드
- 구독/크레딧 관리
- 최적화

**특징**:
- 금융 관련 보안이 중요하다
- 외부 결제 서비스 연동 필요
- 관리자 전용 기능 구현

**예시 Task**:
```
S4E1: 토스 페이먼트 연동
S4BA1: 결제 처리 API
S4F1: 결제 UI
```

### 2.5 S5: 운영 (Operations)

**목적**: 서비스를 실제로 배포하고 운영한다.

**주요 작업**:
- 프로덕션 배포
- 도메인 연결
- 모니터링 설정
- 백업/복구 체계
- 보안 점검

**특징**:
- DevOps(O) Area 작업이 집중된다
- 지속적인 운영/유지보수
- 문서화 완료

**예시 Task**:
```
S5O1: Vercel 프로덕션 배포
S5O2: 커스텀 도메인 연결
S5O3: 모니터링 설정
```

---

## 3. 11개 Area 상세

Area는 작업의 기술적 영역을 나타낸다. 각 Area는 전문성이 다르다.

### 3.1 M (Documentation) - 문서화

**역할**: 프로젝트 문서 작성 및 관리

**주요 작업**:
- API 문서
- 사용자 가이드
- 개발 문서
- README

**담당 Agent**: documentation-specialist

### 3.2 U (Design) - UI/UX 디자인

**역할**: 사용자 인터페이스 디자인

**주요 작업**:
- 와이어프레임
- UI 컴포넌트 디자인
- 사용자 경험 설계

**담당 Agent**: frontend-developer

### 3.3 F (Frontend) - 프론트엔드

**역할**: 사용자가 보는 화면 구현

**주요 작업**:
- HTML/CSS/JavaScript
- UI 컴포넌트 개발
- 사용자 인터랙션

**담당 Agent**: frontend-developer

**Production 저장**: ✅ (Production/Frontend/)

### 3.4 BI (Backend Infrastructure) - 백엔드 기반

**역할**: 백엔드 공통 라이브러리 및 기반

**주요 작업**:
- 공통 유틸리티
- 클라이언트 라이브러리
- 헬퍼 함수

**담당 Agent**: backend-developer

**Production 저장**: ✅ (Production/api/Backend_Infra/)

### 3.5 BA (Backend APIs) - 백엔드 API

**역할**: 서버 API 엔드포인트 구현

**주요 작업**:
- REST API
- 비즈니스 로직
- 데이터 처리

**담당 Agent**: backend-developer

**Production 저장**: ✅ (Production/api/Backend_APIs/)

### 3.6 D (Database) - 데이터베이스

**역할**: 데이터베이스 스키마 및 쿼리

**주요 작업**:
- 테이블 설계
- SQL 스크립트
- 마이그레이션
- RLS 정책

**담당 Agent**: database-specialist

**Production 저장**: ❌ (Supabase에서 직접 실행)

### 3.7 S (Security) - 보안/인증/인가

**역할**: 보안 관련 모든 작업

**주요 작업**:
- 인증 (Authentication)
- 인가 (Authorization)
- 보안 정책
- OAuth 설정

**담당 Agent**: security-specialist

**Production 저장**: ✅ (Production/api/Security/)

### 3.8 T (Testing) - 테스트

**역할**: 테스트 코드 작성 및 실행

**주요 작업**:
- 단위 테스트
- 통합 테스트
- E2E 테스트

**담당 Agent**: test-engineer

**Production 저장**: ❌ (테스트 코드는 배포 안 함)

### 3.9 O (DevOps) - 운영/배포

**역할**: 배포 및 운영 인프라

**주요 작업**:
- CI/CD 설정
- 배포 스크립트
- 모니터링
- 서버 설정

**담당 Agent**: devops-troubleshooter

**Production 저장**: ❌ (설정 파일은 별도 관리)

### 3.10 E (External) - 외부 연동

**역할**: 외부 서비스 API 연동

**주요 작업**:
- OpenAI API
- 결제 API (토스)
- 이메일 API (Resend)
- 기타 외부 서비스

**담당 Agent**: backend-developer

**Production 저장**: ✅ (Production/api/External/)

### 3.11 C (Content System) - 콘텐츠 시스템

**역할**: 콘텐츠 관리 시스템

**주요 작업**:
- 콘텐츠 CRUD
- 미디어 관리
- CMS 기능

**담당 Agent**: content-specialist

**Production 저장**: ❌ (DB에 저장)

---

## 4. Task ID 체계

### 구조

Task ID는 Stage + Area + Level의 조합이다.

```
S2BA1
│ │ └─ Level: 1 (작업 순서)
│ └─── Area: BA (Backend APIs)
└───── Stage: S2 (개발 1차)
```

### 예시

| Task ID | 분해 | 의미 |
|---------|------|------|
| S1D1 | S1 + D + 1 | 개발준비 - DB - 1번 |
| S2F3 | S2 + F + 3 | 개발1차 - Frontend - 3번 |
| S3E1 | S3 + E + 1 | 개발2차 - External - 1번 |
| S4BA2 | S4 + BA + 2 | 개발3차 - Backend API - 2번 |

### Task ID → 폴더 경로

Task ID를 보면 저장 위치를 알 수 있다.

| Task ID | 폴더 경로 |
|---------|----------|
| S1D1 | `S1_개발_준비/Database/` |
| S2F1 | `S2_개발-1차/Frontend/` |
| S2BA1 | `S2_개발-1차/Backend_APIs/` |
| S3E1 | `S3_개발-2차/External/` |

---

## 5. 실제 Matrix 예시

SSALWorks 프로젝트의 실제 Matrix 일부:

```
Stage   Area    Task ID    Task Name
─────────────────────────────────────────────
S1      D       S1D1       users 테이블 스키마
S1      D       S1D2       subscriptions 테이블 스키마
S1      S       S1S1       Supabase Auth 설정
S1      BI      S1BI1      Supabase Client 설정
─────────────────────────────────────────────
S2      F       S2F1       Google 로그인 UI
S2      F       S2F2       이메일 인증 UI
S2      BA      S2BA1      구독 관리 API
S2      BA      S2BA2      이메일 발송 API
S2      S       S2S1       세션 관리
─────────────────────────────────────────────
S3      E       S3E1       OpenAI API 연동
S3      BA      S3BA1      AI 채팅 API
S3      F       S3F1       AI 채팅 UI
─────────────────────────────────────────────
S4      E       S4E1       토스 페이먼트 연동
S4      BA      S4BA1      결제 처리 API
S4      F       S4F1       결제 UI
─────────────────────────────────────────────
S5      O       S5O1       프로덕션 배포
S5      O       S5O2       도메인 연결
```

---

## 6. Area별 Production 저장 규칙

5개 Area만 Production 폴더에 저장된다.

| Production 저장 | Area | 이유 |
|:---------------:|------|------|
| ✅ | F (Frontend) | 배포 필요 |
| ✅ | BA (Backend APIs) | 배포 필요 |
| ✅ | BI (Backend Infra) | 배포 필요 |
| ✅ | S (Security) | 배포 필요 |
| ✅ | E (External) | 배포 필요 |
| ❌ | M (Documentation) | 문서, 배포 불필요 |
| ❌ | U (Design) | 디자인 파일 |
| ❌ | D (Database) | Supabase 직접 실행 |
| ❌ | T (Testing) | 테스트 코드 |
| ❌ | O (DevOps) | 설정/스크립트 |
| ❌ | C (Content) | DB에 저장 |

---

## 7. 다음 단계

3편에서는 5x11 Matrix의 구조를 살펴봤다.

- 5개 Stage: S1(개발 준비) → S2(개발 1차) → S3(개발 2차) → S4(개발 3차) → S5(운영)
- 11개 Area: M, U, F, BI, BA, D, S, T, O, E, C
- Task ID = Stage + Area + Level

다음 편에서는 Task를 생성하고 의존성을 관리하는 방법을 살펴본다.

---

*다음 편: 4편 | Task 생성과 의존성 관리*

---

**작성일: 2025-12-20 / 글자수: 약 4,700자 / 작성자: Claude / 프롬프터: 써니**
