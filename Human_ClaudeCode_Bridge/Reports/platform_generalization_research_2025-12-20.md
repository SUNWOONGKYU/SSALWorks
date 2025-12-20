# SSALWorks 플랫폼 일반화 연구 보고서

> **작성일**: 2025-12-20
> **작성자**: Claude Code (Opus 4.5)
> **목적**: 일반 사용자 대상 플랫폼 제공을 위한 기획

---

## 배경

SSALWorks를 직접 사용하는 것에서 → 일반 사용자들이 자기 프로젝트를 진행할 수 있도록 플랫폼화

---

## 고민 1: Order Sheet 양식 일반화

### 현재 문제
- SSALWorks 전용으로 하드코딩됨
- 사용자가 자기 프로젝트에 맞게 수정하기 어려움

### 일반화 방안

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
│  • project_name: "내 프로젝트"                               │
│  • project_specific_rules: [프로젝트 특수 규칙]              │
│  • custom_agents: [프로젝트에서 사용하는 Agent]              │
│  • custom_references: [프로젝트별 참조 문서]                 │
│  • custom_checklist: [프로젝트별 추가 체크리스트]            │
│  • supabase_config: {프로젝트별 DB 설정}                     │
└─────────────────────────────────────────────────────────────┘
```

### Order Sheet v5 구조 (제안)

```json
{
  "order_id": "ORDER-{PROJECT}-{STAGE}-YYYYMMDD-NNN",

  "// PART A: 일반론 (공통)": "=========================",
  "general": {
    "mandatory_rules": {
      "location": ".claude/rules/",
      "rules": ["01_file-naming.md", "02_save-location.md", "..."]
    },
    "status_transition": {
      "task_status": ["Pending", "In Progress", "Executed", "Completed"],
      "verification_status": ["Not Verified", "In Review", "Needs Fix", "Verified"]
    },
    "execution_steps": [
      "Grid 확인", "Task 실행", "검증", "저장"
    ],
    "grid_checklist": {
      "task_execution": "[10-13]",
      "verification_execution": "[16-19]",
      "verification_completion": "[20-22]"
    }
  },

  "// PART B: 추가 사항 (프로젝트별)": "=========================",
  "project_specific": {
    "project_name": "사용자 프로젝트명",
    "project_description": "프로젝트 설명",
    "custom_rules": [
      "프로젝트 특수 규칙 1",
      "프로젝트 특수 규칙 2"
    ],
    "custom_agents": [
      "custom-agent-1",
      "custom-agent-2"
    ],
    "custom_references": {
      "doc1": "경로/문서1.md",
      "doc2": "경로/문서2.md"
    },
    "custom_checklist": [
      "추가 체크리스트 1",
      "추가 체크리스트 2"
    ],
    "supabase_config": {
      "project_url": "https://xxx.supabase.co",
      "table_name": "project_grid"
    }
  }
}
```

---

## 고민 2: 플랫폼 사용자 관점 변화 대비

### 현재 (PO 직접 사용) vs 일반 사용자

| 항목 | 현재 (PO) | 일반 사용자 | 대비 필요 |
|------|----------|------------|----------|
| Supabase | 직접 관리 | 별도 프로젝트 or 멀티테넌트 | **테넌트 분리 설계** |
| .claude/rules/ | 직접 수정 | 템플릿 제공 → 커스터마이징 | **템플릿화** |
| CLAUDE.md | 프로젝트 전용 | 일반화된 버전 제공 | **일반화** |
| Grid 데이터 | 1개 프로젝트 | 사용자별 분리 | **user_id 필드 추가** |
| Order Sheet | SSALWorks 전용 | Part A + Part B 구조 | **양식 분리** |

### 핵심 대비 사항

#### 1. Supabase 멀티테넌트 설계
```sql
-- ssal_grid 테이블에 user_id 또는 project_id 컬럼 추가
ALTER TABLE ssal_grid ADD COLUMN user_id UUID REFERENCES auth.users(id);
ALTER TABLE ssal_grid ADD COLUMN project_id TEXT;

-- RLS 정책으로 사용자별 데이터 분리
CREATE POLICY "Users can only see their own data" ON ssal_grid
  FOR ALL USING (auth.uid() = user_id);
```

#### 2. 템플릿 패키지 제공
```
SSALWorks_Starter_Kit/
├── .claude/
│   ├── CLAUDE.md (일반화 버전)
│   ├── CAUTION.md (주의사항)
│   └── rules/
│       ├── 01_file-naming.md
│       ├── 02_save-location.md
│       ├── 03_area-stage.md
│       ├── 04_grid-writing.md
│       ├── 05_execution-process.md
│       ├── 06_verification.md
│       └── 07_supabase.md
├── Project-SAL-Grid/
│   ├── manual/
│   │   └── PROJECT_SAL_GRID_MANUAL.md
│   └── sal-grid/
│       ├── TASK_PLAN_TEMPLATE.md
│       ├── task-instructions/
│       │   └── TEMPLATE_instruction.md
│       └── verification-instructions/
│           └── TEMPLATE_verification.md
├── Human_ClaudeCode_Bridge/
│   ├── Orders/
│   │   └── ORDER_TEMPLATE_v5.json
│   └── Reports/
└── README.md (시작 가이드)
```

#### 3. 온보딩 가이드 필요 내용
- "시작하기" 문서
- Supabase 프로젝트 생성 방법
- 첫 Task 실행 튜토리얼
- 자주 묻는 질문 (FAQ)

---

## 고민 3: 문서/파일 공유 방법

### 옵션 비교

| 방법 | 장점 | 단점 | 적합도 |
|------|------|------|--------|
| **구글 드라이브** | 쉬움, 즉시 공유 | 버전관리 어려움, 코드 보기 불편 | ⭐⭐ |
| **GitHub Public** | 버전관리, 코드 포함, 무료 | 비개발자 접근성 낮음 | ⭐⭐⭐⭐ |
| **웹사이트** | 접근성 최고, 브랜딩 | 관리 필요, 업데이트 번거로움 | ⭐⭐⭐⭐⭐ |
| **Notion** | 문서 정리 좋음 | 유료, 코드 제한 | ⭐⭐⭐ |

### 추천 조합

```
1. 웹사이트 (ssalworks.ai.kr)
   ├── 매뉴얼, 가이드 (일반 사용자용)
   ├── 온보딩 튜토리얼
   └── 다운로드 링크 → GitHub

2. GitHub Public Repo (SSALWorks-Starter-Kit)
   ├── 템플릿 코드
   ├── 규칙 파일
   ├── DB 스키마
   ├── 버전 관리
   └── 이슈 트래킹

3. 구글 드라이브 (보조)
   ├── 대용량 파일 (영상, 이미지)
   └── 빠른 공유 필요할 때
```

### 구글 드라이브 공유 방법
- 폴더 공유 → "링크가 있는 모든 사용자" 설정
- 뷰어 권한으로 공유 (수정 불가)
- 다운로드 허용/차단 설정 가능

---

## 다음 단계 (TODO)

### 우선순위 1: Order Sheet v5 설계
- [ ] Part A (일반론) 확정
- [ ] Part B (추가 사항) 구조 설계
- [ ] ORDER_TEMPLATE_v5.json 작성

### 우선순위 2: 템플릿 패키지 구성
- [ ] CLAUDE.md 일반화 버전 작성
- [ ] 규칙 파일 템플릿화
- [ ] Starter Kit 폴더 구조 생성

### 우선순위 3: GitHub Public Repo 준비
- [ ] SSALWorks-Starter-Kit 레포 생성
- [ ] README.md 작성 (온보딩 가이드)
- [ ] 라이선스 결정

### 우선순위 4: 웹사이트 문서화
- [ ] 매뉴얼 페이지 추가
- [ ] 다운로드 링크 연결
- [ ] FAQ 페이지

---

## 참고

- 현재 Order Sheet: `Human_ClaudeCode_Bridge/Orders/ORDER_TEMPLATE_v4.json`
- 현재 CLAUDE.md: `.claude/CLAUDE.md`
- Grid 매뉴얼: `S0_Project-SAL-Grid_생성/manual/PROJECT_SAL_GRID_MANUAL.md`

---

**문서 끝**
