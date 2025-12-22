# SSAL GRID 활용 및 배포 준비사항

> **작성일**: 2025-12-13
> **목적**: SSAL Grid를 다른 사용자에게 배포할 때 준비해야 할 사항 정리

---

## 1. 배경: 왜 이 문서가 필요한가?

### 발생했던 문제 (2025-12-13)

SSAL Grid 데이터 작성 시 다음과 같은 오류가 발생:

| 항목 | 잘못된 값 | 올바른 값 |
|------|-----------|-----------|
| Stage S1 명칭 | "기반 구축" | "개발 준비" |
| Area M 명칭 | "Management" | "Documentation" |
| Task Agent | "code-reviewer" | 실제 작업 담당 Agent |
| Tools | "Read, Write" | Skills/Commands/MCP/CLI |
| Verification 필드 | 비어있음 | JSON 형식 검증 결과 |

### 해결책

**4곳에 Grid 데이터 작성 규칙을 추가**하여 AI가 반복적으로 참조하도록 함.

---

## 2. 규칙이 적용된 4개 파일

### 2.1 CLAUDE.md (1순위 - 자동 로드)
- **경로**: `.claude/CLAUDE.md`
- **섹션**: `## PROJECT SSAL GRID 데이터 작성 규칙`
- **특징**: Claude Code 세션 시작 시 자동으로 로드됨
- **적용 범위**: 해당 레포지토리에서 Claude Code 실행 시

### 2.2 매뉴얼 (2순위 - Grid 작업 시 참조)
- **경로**: `S0_Project-SSAL-Grid_생성/manual/PROJECT_SSAL_GRID_MANUAL.md`
- **섹션**: `## ⚠️ AI 필수 준수 규칙` (TOC 바로 아래)
- **특징**: Grid 관련 작업 시 AI에게 매뉴얼 참조 지시
- **적용 범위**: 매뉴얼을 읽는 모든 AI/사용자

### 2.3 Seed 파일 (3순위 - 데이터 생성 시)
- **경로**: `S0_Project-SSAL-Grid_생성/supabase/seed_project_sal_grid.sql`
- **섹션**: 파일 최상단 주석 블록 (50줄)
- **특징**: seed 데이터 생성/수정 시 규칙 참조
- **적용 범위**: SQL seed 파일 작업 시

### 2.4 Task Instruction 템플릿 (4순위 - Task 작성 시)
- **경로**: `S0_Project-SSAL-Grid_생성/ssal-grid/task-instructions/TEMPLATE_instruction.md`
- **섹션**: `## ⚠️ SSAL GRID 데이터 작성 필수 규칙`
- **특징**: 새 Task Instruction 작성 시 템플릿으로 사용
- **적용 범위**: Task Instruction 파일 작성 시

---

## 3. 배포 시 필수 포함 파일

다른 사용자에게 SSAL Grid를 배포할 때 반드시 포함해야 할 파일:

```
SSAL_Grid_배포_패키지/
│
├── .claude/
│   └── CLAUDE.md                    ⭐ Grid 규칙 포함 필수
│
├── manual/
│   └── PROJECT_SSAL_GRID_MANUAL.md  ⭐ AI 필수 준수 규칙 포함
│
├── supabase/
│   ├── schema.sql                   테이블 스키마
│   └── seed_project_sal_grid.sql     ⭐ 상단 규칙 주석 포함
│
├── ssal-grid/
│   └── task-instructions/
│       └── TEMPLATE_instruction.md  ⭐ 규칙 포함 템플릿
│
├── viewer/
│   ├── viewer.html                  Grid 뷰어
│   └── viewer.css                   뷰어 스타일
│
└── README.md                        사용 가이드
```

---

## 4. 적용된 규칙 요약

### Stage 명칭 (5개)
| Stage | 정확한 명칭 |
|-------|-------------|
| S1 | 개발 준비 (Development Setup) |
| S2 | 개발 1차 (Auth & Registration) |
| S3 | 개발 2차 (AI Integration) |
| S4 | 개발 3차 (Payment & Admin) |
| S5 | 운영 (Operations) |

### Area 명칭 (11개)
| Code | 정확한 명칭 |
|------|-------------|
| M | Documentation (문서화) |
| U | Design (UI/UX 디자인) |
| F | Frontend (프론트엔드) |
| BI | Backend Infrastructure (백엔드 기반) |
| BA | Backend APIs (백엔드 API) |
| D | Database (데이터베이스) |
| S | Security (보안) |
| T | Testing (테스트) |
| O | DevOps (데브옵스) |
| E | External (외부 연동) |
| C | Content (콘텐츠) |

### Agent 규칙
- **Task Agent**: 실제 작업 수행자 (backend-developer, frontend-developer 등)
- **Verification Agent**: 검증 수행자 (code-reviewer, test-engineer)
- **원칙**: 작성자 ≠ 검증자

### 🔄 종합 검증 프로세스 규칙 (2025-12-13 확정)

#### 1단계: Task 실행 및 검증

| 단계 | 수행자 | 기록자 | 기록 필드 |
|------|--------|--------|----------|
| Task 작업 | Task Agent **서브에이전트** | Main Agent | Grid #10-13 |
| Task 검증 | Verification Agent **서브에이전트** | Main Agent | Grid #16-21 |

**프로세스:**
```
[Task 작업]
Main Agent → Task Agent 서브에이전트 투입 → 작업 → 결과 반환 → Main Agent가 Grid 기록

[Task 검증]
Main Agent → Verification Agent 서브에이전트 투입 → 검증 → 결과 반환 → Main Agent가 Grid 기록
```

**❌ 금지:**
- Main Agent가 직접 Task 작업/검증 수행
- Task Agent가 검증까지 수행 (작성자 ≠ 검증자)

#### 2단계: Stage Gate 검증 (Main Agent 직접)

```
[Stage Gate 검증]
1. Main Agent가 직접 Stage 전체 검증 수행
2. 검증 리포트 파일 생성 → ssal-grid/stage-gates/S{N}GATE_verification_report.md
3. DB에 파일 경로 기록 → stage_verification.verification_report_path
```

**⭐ Stage Gate 리포트 저장:**
```
[파일 저장 위치]
S0_Project-SSAL-Grid_생성/ssal-grid/stage-gates/
├── S1GATE_verification_report.md
├── S2GATE_verification_report.md
└── ...

[DB 기록] stage_verification 테이블
- verification_report_path: 리포트 파일 경로
- ai_verification_note: 검증 의견
- stage_gate_status: 'AI Verified'
```

#### 3단계: Project Owner 최종 승인

- AI 검증 리포트 (파일 경로로 찾아서) 검토
- 최종 승인/거부 → `stage_gate_status: 'Approved'/'Rejected'`

### Tools 규칙
- **포함**: Skills, Commands, MCP Servers, CLI Tools
- **제외**: Read, Write, Glob (Claude 기본 도구)

### Verification 필드
```json
{
  "test": {"unit": "24/24 passed", "e2e": "5/5 passed"},
  "build": {"status": "success", "size": "245KB"},
  "integration": {"api": "ok", "db": "ok"},
  "blockers": [],
  "comprehensive": {"coverage": "85%", "quality": "A"}
}
```

---

## 5. 다른 사용자 적용 방법

### Step 1: 파일 복사
배포 패키지의 모든 파일을 사용자 프로젝트에 복사

### Step 2: CLAUDE.md 확인
`.claude/CLAUDE.md`에 Grid 규칙 섹션이 포함되어 있는지 확인

### Step 3: Supabase 설정
1. `schema.sql`로 테이블 생성
2. `seed_project_sal_grid.sql`로 초기 데이터 삽입

### Step 4: 프로젝트 맞춤 수정
- Task 내용을 자신의 프로젝트에 맞게 수정
- TEMPLATE_instruction.md를 참고하여 새 Task Instruction 작성

---

## 6. 주의사항

1. **CLAUDE.md 규칙 섹션 삭제 금지**
   - 삭제 시 AI가 규칙을 참조하지 못함

2. **매뉴얼 상단 규칙 유지**
   - AI에게 매뉴얼 참조 지시 시 규칙도 함께 읽게 됨

3. **템플릿 사용 권장**
   - 새 Task Instruction 작성 시 TEMPLATE_instruction.md 복사 후 수정

4. **규칙 일관성 유지**
   - 4개 파일의 규칙 내용은 동일해야 함
   - 하나를 수정하면 나머지도 동기화

---

## 7. 관련 파일 경로 (현재 프로젝트 기준)

```
C:\!SSAL_Works_Private\
├── .claude\CLAUDE.md
├── S0_Project-SSAL-Grid_생성\
│   ├── manual\PROJECT_SSAL_GRID_MANUAL.md
│   ├── supabase\seed_project_sal_grid.sql
│   ├── ssal-grid\task-instructions\TEMPLATE_instruction.md
│   └── viewer\viewer.html
└── SSAL_GRID_활용_및_배포_준비사항.md  ← 이 문서
```

---

## 8. Viewer 배포 방식 (Supabase 분리)

### 문제: Supabase 계정 공유 불가

현재 viewer.html에는 Supabase URL/Key가 하드코딩되어 있음:
```javascript
const SUPABASE_URL = 'https://xxx.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIs...';
```

→ 이대로 배포하면 모든 사용자가 **동일한 DB**에 접속하게 됨

### 해결: 2가지 모드 제공

viewer.html을 수정하여 두 가지 모드를 제공:

```
┌─────────────────────────────────────────────────────┐
│                   viewer.html                        │
├─────────────────────────────────────────────────────┤
│                                                     │
│   [📖 데모 보기]          [🔗 내 DB 연결]            │
│         │                        │                  │
│         ▼                        ▼                  │
│   읽기 전용 샘플            Supabase 설정 안내       │
│   (Grid 기능 체험)          (자기 계정 만들기)        │
│                                  │                  │
│                                  ▼                  │
│                           자기 프로젝트에서          │
│                           직접 Grid 운영            │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 모드 설명

| 모드 | 용도 | Supabase 필요 |
|------|------|--------------|
| **데모 보기** | Grid 기능 체험, 샘플 데이터 조회 | ❌ (읽기 전용) |
| **내 DB 연결** | 자기 프로젝트에서 Grid 운영 | ✅ (자기 계정) |

### 사용자 여정

```
1. viewer.html 열기
2. "데모 보기" 클릭 → 샘플 Grid로 기능 체험
3. 마음에 들면 "내 DB 연결" 클릭
4. Supabase 가입/설정 안내 따라하기
5. schema.sql 실행 (테이블 생성)
6. 자기 URL/Key 입력
7. 자기 프로젝트에서 Grid 운영!
```

### viewer.html 수정 필요 사항

배포 전 viewer.html에 다음 기능 추가 필요:

1. **모드 선택 UI**: 첫 화면에 "데모 보기" / "내 DB 연결" 버튼
2. **설정 모달**: Supabase URL/Key 입력 폼
3. **localStorage 저장**: 입력한 설정 브라우저에 저장
4. **Supabase 설정 가이드**: 연결 방법 안내 링크/문서

### 장점

- ✅ 원본 제작자의 Supabase Key 노출 안 됨
- ✅ 각 사용자가 자신의 DB에서 독립적으로 운영
- ✅ 데모 모드로 기능 체험 후 도입 결정 가능
- ✅ Supabase 무료 티어로 비용 부담 없음

---

*이 문서는 SSALWorks 완성 시 배포 패키지 구성에 활용됩니다.*
