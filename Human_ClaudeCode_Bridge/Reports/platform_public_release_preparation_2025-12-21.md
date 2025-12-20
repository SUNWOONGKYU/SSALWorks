# SSALWorks 플랫폼 공개 준비사항 종합 리포트

> **작성일**: 2025-12-21
> **작성자**: Claude Code (Opus 4.5)
> **목적**: 외부 사용자 대상 플랫폼 공개(Platform Public Release) 준비사항 종합 정리

---

## 용어 정의

| 용어 | 설명 |
|------|------|
| **플랫폼 공개 (Platform Public Release)** | PO 전용에서 → 외부 사용자도 사용 가능하게 전환 |
| **일반 사용자 (General Users)** | SSALWorks 방법론을 자기 프로젝트에 적용하려는 외부 사용자 |
| **예제 프로젝트 (Example Project)** | SSALWorks 전체 구조와 코드를 예제로 제공하는 것 |

---

## 1. GitHub 설정 변경

### 현재 상태
- GitHub 레포: **Public** (누구나 볼 수 있음)

### 변경 계획
- GitHub 레포: **Private** (PO만 접근 가능)
- 외부 공유: **Google Drive** (보안 정보 제외)

### 변경 방법
1. GitHub 레포 페이지 → **Settings**
2. 맨 아래 "Danger Zone" 섹션
3. **"Change repository visibility"** 클릭
4. **Private** 선택 → 확인

---

## 2. Google Drive 공유 준비

### 공유 대상 (전체 프로젝트 - 예제용)

```
공유할 폴더/파일:
├── .claude/                         # Claude Code 설정
│   ├── CLAUDE.md                   # 작업 규칙
│   ├── rules/                      # 6대 작업 규칙
│   ├── commands/                   # Slash Commands
│   ├── skills/                     # Skills
│   └── subagents/                  # Subagents
│
├── S0_Project-SAL-Grid_생성/       # SAL Grid 시스템
│   ├── manual/                     # 매뉴얼
│   ├── sal-grid/                   # Task/Verification Instructions
│   ├── supabase/                   # DB 스키마
│   └── viewer/                     # Grid Viewer
│
├── S1~S5_*/                        # Stage별 작업 결과물 (예제)
├── P0~P3_*/                        # 예비단계 결과물 (예제)
├── Production/                     # 배포용 코드 (예제)
│
├── Human_ClaudeCode_Bridge/        # Order Sheet 시스템
│   ├── Orders/                     # Order Sheet 템플릿
│   └── 가이드 문서
│
└── 부수적_고유기능/                 # 학습 콘텐츠, 외부 연동 가이드
```

### 제외할 보안 정보

```
⛔ 절대 포함 금지:
├── .env                            # 환경변수 (API 키)
├── .env.local                      # 로컬 환경변수
├── SUPABASE_URL (실제 값)          # Supabase 연결 정보
├── SUPABASE_KEY (실제 값)          # Supabase 키
├── SUPABASE_SERVICE_ROLE_KEY       # 서비스 롤 키
├── TOSS_CLIENT_KEY                 # 토스 페이먼트 키
├── TOSS_SECRET_KEY                 # 토스 시크릿 키
├── SENTRY_DSN                      # Sentry 연결 정보
├── OPENAI_API_KEY                  # OpenAI API 키
├── GOOGLE_API_KEY                  # Google AI API 키
└── PERPLEXITY_API_KEY              # Perplexity API 키
```

### 보안 정보 처리 방법

| 파일 | 처리 방법 |
|------|----------|
| `.env` | 복사하지 않음 (`.env.example` 생성하여 대체) |
| `viewer.html` | Supabase URL/Key → 플레이스홀더로 교체 |
| `index.html` | Supabase URL/Key → 플레이스홀더로 교체 |
| API 파일들 | `process.env.XXX` 형태 유지 (값 노출 안 됨) |

### `.env.example` 예시 (새로 생성)

```bash
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# AI APIs
OPENAI_API_KEY=your-openai-key
GOOGLE_API_KEY=your-google-ai-key
PERPLEXITY_API_KEY=your-perplexity-key

# Payment (토스 페이먼트)
TOSS_CLIENT_KEY=your-toss-client-key
TOSS_SECRET_KEY=your-toss-secret-key

# Monitoring
SENTRY_DSN=your-sentry-dsn
```

### Google Drive 공유 설정

1. **공유 폴더 생성**: "SSALWorks_예제_프로젝트"
2. **파일 복사**: 보안 정보 제외한 전체 프로젝트
3. **공유 설정**: "링크가 있는 모든 사용자" → "뷰어"
4. **다운로드**: 허용

---

## 3. 대시보드 링크 추가

### 추가할 버튼/링크

```
┌─────────────────────────────────────────────────────────────┐
│  대시보드 (index.html)                                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  [📁 예제 프로젝트 보기]  ← Google Drive 링크                │
│                                                              │
│  전체 코드와 문서를 예제로 제공합니다.                         │
│  자신의 프로젝트에 참고하여 활용하세요.                        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 위치 제안
- 사이드바 하단 또는
- 헤더 영역

---

## 4. Order Sheet 양식 일반화

### 현재 문제
- SSALWorks 전용으로 하드코딩됨
- 사용자가 자기 프로젝트에 맞게 수정하기 어려움

### 해결: Part A + Part B 구조

```
┌─────────────────────────────────────────────────────────────┐
│  PART A: 일반론 (모든 프로젝트 공통)                         │
├─────────────────────────────────────────────────────────────┤
│  • order_id, created_at, stage, version                     │
│  • 6대 작업 규칙 (.claude/rules/)                           │
│  • 상태 전이 규칙 (Pending → In Progress → Executed → ...)  │
│  • 실행 단계 (Grid 확인 → Task 실행 → 검증 → 저장)          │
│  • Grid 필수 체크리스트 (16-22번 필드)                       │
└─────────────────────────────────────────────────────────────┘
                              +
┌─────────────────────────────────────────────────────────────┐
│  PART B: 추가 사항 (프로젝트별 커스터마이징)                  │
├─────────────────────────────────────────────────────────────┤
│  • project_name: "사용자 프로젝트명"                         │
│  • project_specific_rules: [프로젝트 특수 규칙]              │
│  • custom_agents: [프로젝트에서 사용하는 Agent]              │
│  • custom_references: [프로젝트별 참조 문서]                 │
│  • supabase_config: {프로젝트별 DB 설정}                     │
└─────────────────────────────────────────────────────────────┘
```

### Order Sheet v5 구조 (향후 작업)

```json
{
  "order_id": "ORDER-{PROJECT}-{STAGE}-YYYYMMDD-NNN",

  "general": {
    "mandatory_rules": { "location": ".claude/rules/" },
    "status_transition": { "task_status": [...], "verification_status": [...] },
    "execution_steps": ["Grid 확인", "Task 실행", "검증", "저장"]
  },

  "project_specific": {
    "project_name": "사용자 프로젝트명",
    "custom_rules": [],
    "supabase_config": { "project_url": "...", "table_name": "..." }
  }
}
```

---

## 5. Supabase 멀티테넌트 설계 (향후)

### 현재 상태
- 단일 사용자 (PO)
- `ssal_grid` 테이블에 모든 Task

### 향후 확장 (일반 사용자 제공 시)

```sql
-- 사용자/프로젝트 분리 컬럼 추가
ALTER TABLE ssal_grid ADD COLUMN user_id UUID REFERENCES auth.users(id);
ALTER TABLE ssal_grid ADD COLUMN project_id TEXT;

-- RLS 정책으로 사용자별 데이터 분리
CREATE POLICY "Users can only see their own data" ON ssal_grid
  FOR ALL USING (auth.uid() = user_id);
```

### 두 가지 배포 모드

| 모드 | 설명 | Supabase 필요 |
|------|------|--------------|
| **데모 보기** | Grid 기능 체험, 샘플 데이터 조회 | ❌ (읽기 전용) |
| **내 DB 연결** | 자기 프로젝트에서 Grid 운영 | ✅ (자기 계정) |

---

## 6. 절대 규칙 (CLAUDE.md)

### 현재 적용된 4대 절대 규칙

| # | 규칙 | 적용 대상 |
|---|------|----------|
| 1 | 폴더 임의 생성 금지 | 모든 작업 |
| 2 | 일반 작업 - 검증 및 문서화 필수 | Grid Task 외 모든 요청 |
| 3 | Grid Task - 프로세스/상태 전이 + **검증 기록 필수** | SAL Grid Task |
| 4 | **Production 코드 이중 저장** | F, BA, D Area 코드 |

### 규칙 적용 파일 (4곳)

| 우선순위 | 파일 | 설명 |
|---------|------|------|
| 1 | `.claude/CLAUDE.md` | 세션 시작 시 자동 로드 |
| 2 | `PROJECT_SAL_GRID_MANUAL.md` | Grid 작업 시 참조 |
| 3 | `seed_ssalworks_tasks.sql` | 데이터 생성 시 |
| 4 | `TEMPLATE_instruction.md` | Task 작성 시 |

---

## 7. 종합 검증 프로세스

### 1단계: Task 실행 및 검증

```
[Task 작업]
Main Agent → Task Agent 서브에이전트 투입
           → 작업 수행
           → 결과 반환
           → Main Agent가 Grid에 기록 (#10-13)

[Task 검증]
Main Agent → Verification Agent 서브에이전트 투입
           → 검증 수행
           → 결과 반환
           → Main Agent가 Grid에 기록 (#16-21)
```

### 2단계: Stage Gate 검증

```
[Stage Gate 검증]
1. Main Agent가 직접 Stage 전체 검증 수행
2. 검증 리포트 파일 생성 → sal-grid/stage-gates/S{N}GATE_verification_report.md
3. DB에 파일 경로 기록 → stage_verification.verification_report_path
```

### 3단계: PO 최종 승인

- AI 검증 리포트 검토
- 최종 승인/거부 → `stage_gate_status: 'Approved'/'Rejected'`

---

## 8. 배포 패키지 구성

### 필수 포함 파일

```
SSALWorks_예제_프로젝트/
│
├── .claude/
│   ├── CLAUDE.md                    ⭐ 절대 규칙 포함
│   ├── rules/                       ⭐ 6대 작업 규칙
│   ├── commands/
│   ├── skills/
│   └── subagents/
│
├── S0_Project-SAL-Grid_생성/
│   ├── manual/
│   │   └── PROJECT_SAL_GRID_MANUAL.md  ⭐ AI 필수 준수 규칙
│   ├── sal-grid/
│   │   ├── task-instructions/       ⭐ 53개 예제
│   │   ├── verification-instructions/
│   │   ├── stage-gates/
│   │   └── SSALWORKS_TASK_PLAN.md
│   └── supabase/
│       ├── schema.sql               ⭐ 테이블 스키마
│       └── seed_ssalworks_tasks.sql ⭐ 샘플 데이터
│
├── Human_ClaudeCode_Bridge/
│   ├── Orders/
│   │   └── ORDER_TEMPLATE_v4.json   ⭐ Order Sheet 템플릿
│   └── HUMAN_CLAUDECODE_BRIDGE_GUIDE.md
│
├── Production/                       ⭐ 배포용 코드 예제
├── S1~S5_*/                         Stage별 작업 예제
├── P0~P3_*/                         예비단계 예제
│
├── 부수적_고유기능/
│   ├── 학습용_콘텐츠/               Tips, Books
│   └── 외부_연동_설정_Guide/        연동 가이드
│
├── .env.example                     ⭐ 환경변수 예시 (값 없음)
└── README.md                        시작 가이드
```

---

## 9. 플랫폼 공개 체크리스트

### 사전 준비 (GitHub/공유)

- [ ] GitHub 레포 Private으로 변경
- [ ] `.env.example` 파일 생성 (실제 값 없이)
- [ ] viewer.html Supabase 키 → 플레이스홀더 교체
- [ ] index.html Supabase 키 → 플레이스홀더 교체
- [ ] Google Drive 공유 폴더 생성
- [ ] 보안 정보 제외하고 전체 복사
- [ ] 공유 설정: "링크가 있는 모든 사용자 - 뷰어"

### 대시보드 업데이트

- [ ] Google Drive 링크 버튼 추가
- [ ] 버튼 위치 결정 (사이드바/헤더)

### 문서 정비

- [ ] CLAUDE.md 일반화 버전 검토
- [ ] Order Sheet v5 템플릿 작성 (Part A + Part B)
- [ ] README.md 시작 가이드 작성
- [ ] Supabase 설정 가이드 정비

### 향후 작업 (선택)

- [ ] Supabase 멀티테넌트 설계 (user_id 추가)
- [ ] Viewer 데모/연결 모드 구현
- [ ] 온보딩 튜토리얼 작성

---

## 10. 관련 문서

| 문서 | 경로 |
|------|------|
| 기존 배포 준비 문서 | `SSAL_GRID_활용_및_배포_준비사항.md` |
| 플랫폼 일반화 연구 | `Human_ClaudeCode_Bridge/Reports/platform_generalization_research_2025-12-20.md` |
| 절대 규칙 | `.claude/CLAUDE.md` |
| SAL Grid 매뉴얼 | `S0_Project-SAL-Grid_생성/manual/PROJECT_SAL_GRID_MANUAL.md` |
| Order Sheet 템플릿 | `Human_ClaudeCode_Bridge/Orders/ORDER_TEMPLATE_v4.json` |

---

**문서 끝**
