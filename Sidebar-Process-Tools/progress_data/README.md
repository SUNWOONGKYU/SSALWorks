# Progress Tracking - 진행률 추적 시스템

> **버전**: v2.0
> **최종 업데이트**: 2025-12-22
> **기준**: 사이드바 P0~S5 단계별 진행률 추적

---

## 🎯 진행률 추적 규칙 (핵심)

| 단계 | 추적 방식 | 기준 |
|------|----------|------|
| **P0** 작업 디렉토리 구조 생성 | 파일 기반 | 폴더에 산출물 파일 존재 여부 |
| **P1** 사업계획 | 파일 기반 | 폴더에 산출물 파일 존재 여부 |
| **P2** 프로젝트 기획 | 파일 기반 | 폴더에 산출물 파일 존재 여부 |
| **P3** 프로토타입 제작 | 파일 기반 | 폴더에 산출물 파일 존재 여부 |
| **S0** 개발 준비 | 파일 기반 | 폴더에 산출물 파일 존재 여부 |
| **S1** 개발 1차 | **Grid 기반** | DB Task 진행률 조회 |
| **S2** 개발 2차 | **Grid 기반** | DB Task 진행률 조회 |
| **S3** 개발 3차 | **Grid 기반** | DB Task 진행률 조회 |
| **S4** 테스트/최적화 | **Grid 기반** | DB Task 진행률 조회 |
| **S5** 운영 | **Grid 기반** | DB Task 진행률 조회 |

---

## 📁 파일 구조

```
progress_data/
├── P0_directory_structure.json    # P0: 작업 디렉토리 구조 생성
├── P1_business_planning.json      # P1: 사업계획
├── P2_project_planning.json       # P2: 프로젝트 기획
├── P3_prototype.json              # P3: 프로토타입 제작
├── S0_dev_preparation.json        # S0: 개발 준비
└── README.md                      # 이 파일
```

---

## 📋 파일 기반 단계 (P0 ~ S0)

### P0: 작업 디렉토리 구조 생성
- **파일**: `P0_directory_structure.json`
- **기준 폴더**: `P0_작업_디렉토리_구조_생성/`
- **산출물**:
  - Project_Directory_Structure.md
  - Project_Status.md

### P1: 사업계획
- **파일**: `P1_business_planning.json`
- **기준 폴더**: `P1_사업계획/`
- **산출물**:
  - Vision_Mission.md
  - Market_Analysis.md
  - Business_Model.md
  - Target_Users.md

### P2: 프로젝트 기획
- **파일**: `P2_project_planning.json`
- **기준 폴더**: `P2_프로젝트_기획/`
- **산출물**:
  - Project_Plan.md
  - Requirements.md
  - User_Flows.md
  - Design_System.md
  - UI_UX_Mockup/
  - Database_Schema.md

### P3: 프로토타입 제작
- **파일**: `P3_prototype.json`
- **기준 폴더**: `P3_프로토타입_제작/`
- **산출물**:
  - Frontend/ (HTML/CSS/JS)
  - Database/ (SQL 스키마)
  - Scripts/

### S0: 개발 준비
- **파일**: `S0_dev_preparation.json`
- **기준 폴더**: `S1_개발_준비/`
- **산출물**:
  - Tech_Stack.md
  - Architecture.md
  - Development_Setup/
  - Project_Grid/
  - Environment/

---

## 📊 Grid 기반 단계 (S1 ~ S5)

S1부터 S5까지는 **Project SAL Grid** 테이블에서 Task 진행률을 조회합니다.

### 진행률 계산 방식

```javascript
// 각 Stage의 진행률 = Stage 내 Task들의 task_progress 평균
SELECT stage, AVG(task_progress) as progress
FROM ssalworks_tasks  -- 또는 user_project_tasks
WHERE stage IN (1, 2, 3, 4, 5)
GROUP BY stage;
```

### DB 테이블
- **SSAL Works 프로젝트**: `ssalworks_tasks`
- **사용자 프로젝트**: `user_project_tasks` (향후 구현)

## 📊 JSON 구조

```json
{
  "phase": "Phase 이름",
  "phase_code": "P0",
  "description": "설명",
  "base_folder": "기준 폴더",
  "items": [
    {
      "id": "고유ID",
      "name": "작업명",
      "description": "상세 설명",
      "folder": "하위 폴더",
      "weight": 가중치,
      "completed": true/false
    }
  ],
  "total_weight": 100,
  "progress": 계산된_진행률,
  "last_updated": "2025-11-17"
}
```

## 🔄 진행률 계산 방법

```javascript
// 가중치 기반 진행률 계산
function calculateProgress(checklist) {
    let completedWeight = 0;

    checklist.items.forEach(item => {
        if (item.completed) {
            completedWeight += item.weight;
        }
    });

    return Math.round((completedWeight / checklist.total_weight) * 100);
}
```

## 📝 사용 방법

### 1. 작업 완료 표시

```json
{
  "id": "P1-02",
  "name": "UI/UX 디자인 가이드라인",
  "completed": false  // 작업 완료 시 true로 변경
}
```

### 2. Dashboard 좌측 사이드바 연동

Dashboard는 이 JSON 파일들을 읽어서 "진행 프로세스" 섹션에 진행률 표시:

**파일 기반 (P0~S0):**
- **P0 작업 디렉토리**: `P0_directory_structure.json` → progress 값
- **P1 사업계획**: `P1_business_planning.json` → progress 값
- **P2 프로젝트 기획**: `P2_project_planning.json` → progress 값
- **P3 프로토타입**: `P3_prototype.json` → progress 값
- **S0 개발 준비**: `S0_dev_preparation.json` → progress 값

**Grid 기반 (S1~S5):**
- **S1~S5**: Project SAL Grid (`ssalworks_tasks` 또는 `user_project_tasks`) → Task 완료율 자동 계산

### 3. 진행률 업데이트 주기

- 문서/폴더 작업 완료 시 즉시
- 주요 마일스톤 달성 시
- Dashboard 로드 시 자동 계산

---

## 🔗 관련 문서

- **개발 프로세스 워크플로우**: `DEVELOPMENT_PROCESS_WORKFLOW.md`
- **사이드바 동기화**: `sidebar_generation/README.md`
- **프로젝트 디렉토리 구조**: `PROJECT_DIRECTORY_STRUCTURE.md`

---

## ⚠️ 주의사항

- ✅ 각 단계의 `weight` 합계는 반드시 100
- ✅ `completed` 값은 `true` 또는 `false`만 가능
- ✅ `last_updated` 날짜는 변경 시마다 업데이트
- ✅ JSON 형식 오류 없도록 주의
- ✅ P0~S0는 파일 기반, S1~S5는 Grid 기반

---

## 📝 변경 이력

| 버전 | 날짜 | 변경 내용 |
|------|------|----------|
| v1.0 | 2025-11-17 | 초기 문서 작성 |
| v2.0 | 2025-12-22 | P0~S0 파일 기반, S1~S5 Grid 기반으로 규칙 정리 |

---

**"SSALWorks - 프롬프팅으로 AI를 운전하듯 프로젝트를 관리하세요."**
