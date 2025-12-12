# SSALWorks 웹사이트 - 왼쪽 사이드바 프로세스 구조

> **3단계 계층 구조:** 대분류 → 중분류 → 소분류
> **용도:** 왼쪽 사이드바 네비게이션

---

## 📋 프로세스 계층 구조

### ✅ 대분류 (Level 1) - 2개
```
1. 예비 개발
2. 본 개발
```

### ✅ 중분류 (Level 2) - 6개
```
예비 개발
  ├─ 1. 기획
  ├─ 2. 프로토타입
  └─ 3. 프로젝트 그리드

본 개발
  ├─ 1. 프로덕션 전환
  ├─ 2. 통합 테스트
  └─ 3. 배포 & 운영
```

### ✅ 소분류 (Level 3) - 약 25-30개

---

## 🌲 완전한 트리 구조

```
📦 SSALWorks 프로세스
│
├─ 📘 예비 개발 (3-4주)
│  │
│  ├─ 🎯 1. 기획 (5-10일)
│  │  ├─ 1.1 비즈니스 모델 작성
│  │  ├─ 1.2 플로우차트 작성
│  │  ├─ 1.3 기술 스택 결정
│  │  └─ 1.4 완료 체크리스트
│  │
│  ├─ 🛠️ 2. 프로토타입 제작 (10-15일)
│  │  ├─ 2.1 프로토타입 요구사항
│  │  ├─ 2.2 모의 데이터베이스 준비
│  │  ├─ 2.3 디렉토리 구조 설계
│  │  ├─ 2.4 AI 활용 제작
│  │  ├─ 2.5 리뷰 및 개선
│  │  ├─ 2.6 프로토타입 배포
│  │  └─ 2.7 완료 체크리스트
│  │
│  └─ 📋 3. 프로젝트 그리드 작성 (3-5일)
│     ├─ 3.1 그리드 구조 이해
│     ├─ 3.2 Stage 구분 방법론
│     ├─ 3.3 Phase 정의
│     ├─ 3.4 Area 정의
│     ├─ 3.5 Task 작성
│     ├─ 3.6 작업 지시서 작성
│     ├─ 3.7 DB 스키마 설계
│     ├─ 3.8 그리드 뷰어 구축
│     ├─ 3.9 웹사이트 ↔ CLI 워크플로우
│     ├─ 3.10 Task 자동 생성
│     └─ 3.11 완료 체크리스트
│
└─ 🚀 본 개발 (6-9주)
   │
   ├─ 💻 1. 프로덕션 전환 (40-50일)
   │  ├─ 1.1 핵심 워크플로우
   │  ├─ 1.2 Export → CLI → Import
   │  ├─ 1.3 Dual Execution System
   │  ├─ 1.4 Phase별 진행
   │  └─ 1.5 완료 체크리스트
   │
   ├─ 🧪 2. 통합 테스트 & 디버깅 (5-10일)
   │  ├─ 2.1 테스트 체크리스트
   │  ├─ 2.2 기능 테스트
   │  ├─ 2.3 크로스 브라우저
   │  ├─ 2.4 반응형 테스트
   │  ├─ 2.5 성능 테스트
   │  ├─ 2.6 보안 점검
   │  └─ 2.7 버그 처리 프로세스
   │
   └─ 🌐 3. 배포 & 운영 (2-5일)
      ├─ 3.1 Vercel 배포
      ├─ 3.2 도메인 연결
      ├─ 3.3 환경 변수 설정
      ├─ 3.4 모니터링 설정
      └─ 3.5 챌린지 완성 신고
```

---

## 🎨 사이드바 UI 구조 제안

### 스타일 1: 아코디언 방식

```
┌─────────────────────────────────┐
│ 📦 SSALWorks 프로세스            │
├─────────────────────────────────┤
│                                 │
│ ▼ 📘 예비 개발                   │
│   ▼ 🎯 1. 기획                  │
│      • 1.1 비즈니스 모델 작성    │
│      • 1.2 플로우차트 작성       │
│      • 1.3 기술 스택 결정        │
│      • 1.4 완료 체크리스트       │
│   ▶ 🛠️ 2. 프로토타입 제작       │
│   ▶ 📋 3. 프로젝트 그리드 작성   │
│                                 │
│ ▶ 🚀 본 개발                     │
│                                 │
└─────────────────────────────────┘
```

### 스타일 2: 접을 수 있는 트리

```
┌─────────────────────────────────┐
│ 📦 프로세스                      │
├─────────────────────────────────┤
│                                 │
│ 📘 예비 개발 [3-4주]             │
│ ├─ 🎯 1. 기획 [5-10일]          │
│ │  ├─ 1.1 비즈니스 모델         │
│ │  ├─ 1.2 플로우차트            │
│ │  ├─ 1.3 기술 스택             │
│ │  └─ 1.4 체크리스트            │
│ ├─ 🛠️ 2. 프로토타입 [10-15일]  │
│ │  ├─ 2.1 요구사항              │
│ │  ├─ 2.2 모의 DB               │
│ │  ├─ 2.3 디렉토리 구조         │
│ │  ├─ 2.4 AI 제작               │
│ │  ├─ 2.5 리뷰                  │
│ │  ├─ 2.6 배포                  │
│ │  └─ 2.7 체크리스트            │
│ └─ 📋 3. 그리드 작성 [3-5일]    │
│    ├─ 3.1 구조 이해             │
│    ├─ 3.2 Stage 방법론          │
│    ├─ 3.3 Phase 정의            │
│    ├─ 3.4 Area 정의             │
│    ├─ 3.5 Task 작성             │
│    ├─ 3.6 작업 지시서           │
│    ├─ 3.7 DB 스키마             │
│    ├─ 3.8 그리드 뷰어           │
│    ├─ 3.9 워크플로우            │
│    ├─ 3.10 자동 생성            │
│    └─ 3.11 체크리스트           │
│                                 │
│ 🚀 본 개발 [6-9주]               │
│ ├─ 💻 1. 전환 [40-50일]         │
│ │  ├─ 1.1 워크플로우            │
│ │  ├─ 1.2 Export/Import         │
│ │  ├─ 1.3 Dual Execution        │
│ │  ├─ 1.4 Phase 진행            │
│ │  └─ 1.5 체크리스트            │
│ ├─ 🧪 2. 테스트 [5-10일]        │
│ │  ├─ 2.1 체크리스트            │
│ │  ├─ 2.2 기능                  │
│ │  ├─ 2.3 브라우저              │
│ │  ├─ 2.4 반응형                │
│ │  ├─ 2.5 성능                  │
│ │  ├─ 2.6 보안                  │
│ │  └─ 2.7 버그 처리             │
│ └─ 🌐 3. 배포 [2-5일]           │
│    ├─ 3.1 Vercel                │
│    ├─ 3.2 도메인                │
│    ├─ 3.3 환경변수              │
│    ├─ 3.4 모니터링              │
│    └─ 3.5 완성 신고             │
│                                 │
└─────────────────────────────────┘
```

---

## 📊 데이터 구조 (JSON)

```json
{
  "process": [
    {
      "id": "pre-dev",
      "level": 1,
      "title": "예비 개발",
      "duration": "3-4주",
      "icon": "📘",
      "children": [
        {
          "id": "planning",
          "level": 2,
          "title": "1. 기획",
          "duration": "5-10일",
          "icon": "🎯",
          "children": [
            {
              "id": "planning-1-1",
              "level": 3,
              "title": "1.1 비즈니스 모델 작성",
              "link": "/process/pre-dev/planning/business-model"
            },
            {
              "id": "planning-1-2",
              "level": 3,
              "title": "1.2 플로우차트 작성",
              "link": "/process/pre-dev/planning/flowchart"
            },
            {
              "id": "planning-1-3",
              "level": 3,
              "title": "1.3 기술 스택 결정",
              "link": "/process/pre-dev/planning/tech-stack"
            },
            {
              "id": "planning-1-4",
              "level": 3,
              "title": "1.4 완료 체크리스트",
              "link": "/process/pre-dev/planning/checklist"
            }
          ]
        },
        {
          "id": "prototype",
          "level": 2,
          "title": "2. 프로토타입 제작",
          "duration": "10-15일",
          "icon": "🛠️",
          "children": [
            {
              "id": "prototype-2-1",
              "level": 3,
              "title": "2.1 프로토타입 요구사항",
              "link": "/process/pre-dev/prototype/requirements"
            },
            {
              "id": "prototype-2-2",
              "level": 3,
              "title": "2.2 모의 데이터베이스 준비",
              "link": "/process/pre-dev/prototype/mock-database"
            },
            {
              "id": "prototype-2-3",
              "level": 3,
              "title": "2.3 디렉토리 구조 설계",
              "link": "/process/pre-dev/prototype/directory"
            },
            {
              "id": "prototype-2-4",
              "level": 3,
              "title": "2.4 AI 활용 제작",
              "link": "/process/pre-dev/prototype/ai-development"
            },
            {
              "id": "prototype-2-5",
              "level": 3,
              "title": "2.5 리뷰 및 개선",
              "link": "/process/pre-dev/prototype/review"
            },
            {
              "id": "prototype-2-6",
              "level": 3,
              "title": "2.6 프로토타입 배포",
              "link": "/process/pre-dev/prototype/deploy"
            },
            {
              "id": "prototype-2-7",
              "level": 3,
              "title": "2.7 완료 체크리스트",
              "link": "/process/pre-dev/prototype/checklist"
            }
          ]
        },
        {
          "id": "project-grid",
          "level": 2,
          "title": "3. 프로젝트 그리드 작성",
          "duration": "3-5일",
          "icon": "📋",
          "children": [
            {
              "id": "grid-3-1",
              "level": 3,
              "title": "3.1 그리드 구조 이해",
              "link": "/process/pre-dev/grid/structure"
            },
            {
              "id": "grid-3-2",
              "level": 3,
              "title": "3.2 Stage 구분 방법론",
              "link": "/process/pre-dev/grid/stage-methodology"
            },
            {
              "id": "grid-3-3",
              "level": 3,
              "title": "3.3 Phase 정의",
              "link": "/process/pre-dev/grid/phase"
            },
            {
              "id": "grid-3-4",
              "level": 3,
              "title": "3.4 Area 정의",
              "link": "/process/pre-dev/grid/area"
            },
            {
              "id": "grid-3-5",
              "level": 3,
              "title": "3.5 Task 작성",
              "link": "/process/pre-dev/grid/task"
            },
            {
              "id": "grid-3-6",
              "level": 3,
              "title": "3.6 작업 지시서 작성",
              "link": "/process/pre-dev/grid/prompt"
            },
            {
              "id": "grid-3-7",
              "level": 3,
              "title": "3.7 DB 스키마 설계",
              "link": "/process/pre-dev/grid/database"
            },
            {
              "id": "grid-3-8",
              "level": 3,
              "title": "3.8 그리드 뷰어 구축",
              "link": "/process/pre-dev/grid/viewer"
            },
            {
              "id": "grid-3-9",
              "level": 3,
              "title": "3.9 웹사이트 ↔ CLI 워크플로우",
              "link": "/process/pre-dev/grid/workflow"
            },
            {
              "id": "grid-3-10",
              "level": 3,
              "title": "3.10 Task 자동 생성",
              "link": "/process/pre-dev/grid/auto-generation"
            },
            {
              "id": "grid-3-11",
              "level": 3,
              "title": "3.11 완료 체크리스트",
              "link": "/process/pre-dev/grid/checklist"
            }
          ]
        }
      ]
    },
    {
      "id": "main-dev",
      "level": 1,
      "title": "본 개발",
      "duration": "6-9주",
      "icon": "🚀",
      "children": [
        {
          "id": "production",
          "level": 2,
          "title": "1. 프로덕션 전환",
          "duration": "40-50일",
          "icon": "💻",
          "children": [
            {
              "id": "production-1-1",
              "level": 3,
              "title": "1.1 핵심 워크플로우",
              "link": "/process/main-dev/production/workflow"
            },
            {
              "id": "production-1-2",
              "level": 3,
              "title": "1.2 Export → CLI → Import",
              "link": "/process/main-dev/production/export-import"
            },
            {
              "id": "production-1-3",
              "level": 3,
              "title": "1.3 Dual Execution System",
              "link": "/process/main-dev/production/dual-execution"
            },
            {
              "id": "production-1-4",
              "level": 3,
              "title": "1.4 Phase별 진행",
              "link": "/process/main-dev/production/phase-progress"
            },
            {
              "id": "production-1-5",
              "level": 3,
              "title": "1.5 완료 체크리스트",
              "link": "/process/main-dev/production/checklist"
            }
          ]
        },
        {
          "id": "testing",
          "level": 2,
          "title": "2. 통합 테스트 & 디버깅",
          "duration": "5-10일",
          "icon": "🧪",
          "children": [
            {
              "id": "testing-2-1",
              "level": 3,
              "title": "2.1 테스트 체크리스트",
              "link": "/process/main-dev/testing/checklist"
            },
            {
              "id": "testing-2-2",
              "level": 3,
              "title": "2.2 기능 테스트",
              "link": "/process/main-dev/testing/functional"
            },
            {
              "id": "testing-2-3",
              "level": 3,
              "title": "2.3 크로스 브라우저",
              "link": "/process/main-dev/testing/cross-browser"
            },
            {
              "id": "testing-2-4",
              "level": 3,
              "title": "2.4 반응형 테스트",
              "link": "/process/main-dev/testing/responsive"
            },
            {
              "id": "testing-2-5",
              "level": 3,
              "title": "2.5 성능 테스트",
              "link": "/process/main-dev/testing/performance"
            },
            {
              "id": "testing-2-6",
              "level": 3,
              "title": "2.6 보안 점검",
              "link": "/process/main-dev/testing/security"
            },
            {
              "id": "testing-2-7",
              "level": 3,
              "title": "2.7 버그 처리 프로세스",
              "link": "/process/main-dev/testing/bug-process"
            }
          ]
        },
        {
          "id": "deployment",
          "level": 2,
          "title": "3. 배포 & 운영",
          "duration": "2-5일",
          "icon": "🌐",
          "children": [
            {
              "id": "deployment-3-1",
              "level": 3,
              "title": "3.1 Vercel 배포",
              "link": "/process/main-dev/deployment/vercel"
            },
            {
              "id": "deployment-3-2",
              "level": 3,
              "title": "3.2 도메인 연결",
              "link": "/process/main-dev/deployment/domain"
            },
            {
              "id": "deployment-3-3",
              "level": 3,
              "title": "3.3 환경 변수 설정",
              "link": "/process/main-dev/deployment/env-variables"
            },
            {
              "id": "deployment-3-4",
              "level": 3,
              "title": "3.4 모니터링 설정",
              "link": "/process/main-dev/deployment/monitoring"
            },
            {
              "id": "deployment-3-5",
              "level": 3,
              "title": "3.5 챌린지 완성 신고",
              "link": "/process/main-dev/deployment/completion"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 🎯 구현 가이드라인

### Level 1 (대분류) - 2개
- **스타일**: 볼드체, 큰 폰트 (18px)
- **색상**: 강조 색상 (Primary Color)
- **아이콘**: 대표 이모지 (📘, 🚀)
- **상태**: 항상 표시, 접기/펼치기 가능

### Level 2 (중분류) - 6개
- **스타일**: 세미볼드, 중간 폰트 (16px)
- **색상**: 세컨더리 색상
- **아이콘**: 카테고리별 이모지 (🎯, 🛠️, 📋, 💻, 🧪, 🌐)
- **인덴트**: 좌측 16px
- **상태**: 접기/펼치기 가능, 소요 시간 표시

### Level 3 (소분류) - 25-30개
- **스타일**: 일반 폰트 (14px)
- **색상**: 일반 텍스트 색상
- **아이콘**: Bullet point (•) 또는 없음
- **인덴트**: 좌측 32px
- **상태**: 클릭 시 해당 섹션으로 이동
- **호버**: 배경 색상 변경

---

## 💾 React 컴포넌트 구조 예시

```jsx
<Sidebar>
  <ProcessTree>
    {/* Level 1: 예비 개발 */}
    <TreeNode level={1} icon="📘" title="예비 개발" duration="3-4주">

      {/* Level 2: 기획 */}
      <TreeNode level={2} icon="🎯" title="1. 기획" duration="5-10일">
        <TreeNode level={3} title="1.1 비즈니스 모델 작성" link="/..." />
        <TreeNode level={3} title="1.2 플로우차트 작성" link="/..." />
        <TreeNode level={3} title="1.3 기술 스택 결정" link="/..." />
        <TreeNode level={3} title="1.4 완료 체크리스트" link="/..." />
      </TreeNode>

      {/* Level 2: 프로토타입 */}
      <TreeNode level={2} icon="🛠️" title="2. 프로토타입 제작" duration="10-15일">
        <TreeNode level={3} title="2.1 프로토타입 요구사항" link="/..." />
        <TreeNode level={3} title="2.2 모의 데이터베이스 준비" link="/..." />
        <TreeNode level={3} title="2.3 디렉토리 구조 설계" link="/..." />
        <TreeNode level={3} title="2.4 AI 활용 제작" link="/..." />
        <TreeNode level={3} title="2.5 리뷰 및 개선" link="/..." />
        <TreeNode level={3} title="2.6 프로토타입 배포" link="/..." />
        <TreeNode level={3} title="2.7 완료 체크리스트" link="/..." />
      </TreeNode>

      {/* Level 2: 프로젝트 그리드 */}
      <TreeNode level={2} icon="📋" title="3. 프로젝트 그리드 작성" duration="3-5일">
        <TreeNode level={3} title="3.1 그리드 구조 이해" link="/..." />
        <TreeNode level={3} title="3.2 Stage 구분 방법론" link="/..." />
        <TreeNode level={3} title="3.3 Phase 정의" link="/..." />
        <TreeNode level={3} title="3.4 Area 정의" link="/..." />
        <TreeNode level={3} title="3.5 Task 작성" link="/..." />
        <TreeNode level={3} title="3.6 작업 지시서 작성" link="/..." />
        <TreeNode level={3} title="3.7 DB 스키마 설계" link="/..." />
        <TreeNode level={3} title="3.8 그리드 뷰어 구축" link="/..." />
        <TreeNode level={3} title="3.9 웹사이트 ↔ CLI 워크플로우" link="/..." />
        <TreeNode level={3} title="3.10 Task 자동 생성" link="/..." />
        <TreeNode level={3} title="3.11 완료 체크리스트" link="/..." />
      </TreeNode>
    </TreeNode>

    {/* Level 1: 본 개발 */}
    <TreeNode level={1} icon="🚀" title="본 개발" duration="6-9주">

      {/* Level 2: 프로덕션 전환 */}
      <TreeNode level={2} icon="💻" title="1. 프로덕션 전환" duration="40-50일">
        <TreeNode level={3} title="1.1 핵심 워크플로우" link="/..." />
        <TreeNode level={3} title="1.2 Export → CLI → Import" link="/..." />
        <TreeNode level={3} title="1.3 Dual Execution System" link="/..." />
        <TreeNode level={3} title="1.4 Phase별 진행" link="/..." />
        <TreeNode level={3} title="1.5 완료 체크리스트" link="/..." />
      </TreeNode>

      {/* Level 2: 통합 테스트 */}
      <TreeNode level={2} icon="🧪" title="2. 통합 테스트 & 디버깅" duration="5-10일">
        <TreeNode level={3} title="2.1 테스트 체크리스트" link="/..." />
        <TreeNode level={3} title="2.2 기능 테스트" link="/..." />
        <TreeNode level={3} title="2.3 크로스 브라우저" link="/..." />
        <TreeNode level={3} title="2.4 반응형 테스트" link="/..." />
        <TreeNode level={3} title="2.5 성능 테스트" link="/..." />
        <TreeNode level={3} title="2.6 보안 점검" link="/..." />
        <TreeNode level={3} title="2.7 버그 처리 프로세스" link="/..." />
      </TreeNode>

      {/* Level 2: 배포 & 운영 */}
      <TreeNode level={2} icon="🌐" title="3. 배포 & 운영" duration="2-5일">
        <TreeNode level={3} title="3.1 Vercel 배포" link="/..." />
        <TreeNode level={3} title="3.2 도메인 연결" link="/..." />
        <TreeNode level={3} title="3.3 환경 변수 설정" link="/..." />
        <TreeNode level={3} title="3.4 모니터링 설정" link="/..." />
        <TreeNode level={3} title="3.5 챌린지 완성 신고" link="/..." />
      </TreeNode>
    </TreeNode>
  </ProcessTree>
</Sidebar>
```

---

## 📱 반응형 고려사항

### 데스크톱 (1024px 이상)
- 왼쪽 사이드바 고정 (280px)
- 3단계 모두 표시
- 호버 효과 활성화

### 태블릿 (768px - 1023px)
- 햄버거 메뉴로 토글
- 3단계 모두 표시
- 터치 제스처 지원

### 모바일 (767px 이하)
- 상단 드롭다운 또는 전체 화면 메뉴
- Level 1, 2만 기본 표시
- Level 3은 선택 시 확장

---

## ✅ 핵심 요약

**대분류 (2개):**
1. 📘 예비 개발
2. 🚀 본 개발

**중분류 (6개):**
- 예비: 기획, 프로토타입, 그리드
- 본개발: 전환, 테스트, 배포

**소분류 (약 28개):**
- 각 중분류 아래 3-11개 세부 항목

**총 계층:**
- Level 1: 2개
- Level 2: 6개
- Level 3: 28개
- **총 노드 수: 36개**

---

## 🎨 색상 & 스타일 가이드

### Level 1 (대분류)
```css
.level-1 {
  font-size: 18px;
  font-weight: 700;
  color: #1a202c;
  padding: 12px 16px;
  margin-bottom: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
}
```

### Level 2 (중분류)
```css
.level-2 {
  font-size: 16px;
  font-weight: 600;
  color: #2d3748;
  padding: 10px 16px 10px 32px;
  margin: 4px 0;
  border-left: 3px solid #667eea;
}

.level-2:hover {
  background: #f7fafc;
  cursor: pointer;
}
```

### Level 3 (소분류)
```css
.level-3 {
  font-size: 14px;
  font-weight: 400;
  color: #4a5568;
  padding: 8px 16px 8px 48px;
  transition: all 0.2s;
}

.level-3:hover {
  background: #edf2f7;
  color: #667eea;
  cursor: pointer;
  padding-left: 52px;
}

.level-3.active {
  background: #e6fffa;
  color: #319795;
  border-left: 3px solid #319795;
}
```

---

이 구조로 SSALWorks 웹사이트의 왼쪽 사이드바를 구현하면 사용자가 전체 프로세스를 한눈에 파악하고 원하는 단계로 쉽게 이동할 수 있습니다!
