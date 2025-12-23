# Development Process Monitor

SSALWorks 프로젝트 진행률 관리 시스템

## 구조

```
Development_Process_Monitor/
├── README.md                              # 이 파일
├── DEVELOPMENT_PROCESS_WORKFLOW.md        # 개발 프로세스 워크플로우 설명
└── create_project_phase_progress.sql      # DB 테이블 생성 스크립트
```

## 진행률 관리 방식

### DB 테이블: `project_phase_progress`

모든 진행률은 Supabase DB에서 관리됩니다.

| 컬럼 | 설명 |
|------|------|
| phase_code | P0, P1, P2, P3, S0, S1~S5 |
| phase_name | 단계 이름 |
| progress | 진행률 (0~100) |
| completed_items | 완료된 항목 수 |
| total_items | 전체 항목 수 |
| status | Not Started / In Progress / Completed |

### 프론트엔드 로드

`Production/index.html`의 `loadPhaseProgressFromDB()` 함수가 DB에서 진행률을 로드합니다.

```javascript
const { data } = await supabaseClient
    .from('project_phase_progress')
    .select('phase_code, progress')
    .eq('project_id', 'SSALWORKS');
```

## 진행률 업데이트

Task 완료 시 DB에서 직접 업데이트:

```sql
UPDATE project_phase_progress
SET progress = 100,
    completed_items = 7,
    status = 'Completed',
    updated_at = NOW()
WHERE phase_code = 'S4' AND project_id = 'SSALWORKS';
```

## 현재 진행률

| Phase | 이름 | 진행률 |
|-------|-----|--------|
| P0 | 작업 디렉토리 구조 생성 | 100% |
| P1 | 사업계획 | 100% |
| P2 | 프로젝트 기획 | 100% |
| P3 | 프로토타입 제작 | 100% |
| S0 | Project SAL Grid 생성 | 100% |
| S1 | 개발 준비 | 100% |
| S2 | 개발 1차 | 100% |
| S3 | 개발 2차 | 100% |
| S4 | 개발 3차 | 86% |
| S5 | 운영 | 0% |

---

**최종 업데이트**: 2025-12-23
