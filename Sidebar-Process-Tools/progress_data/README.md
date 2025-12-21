# Progress Tracking - 진행률 추적 시스템

> **버전**: v3.0
> **최종 업데이트**: 2025-12-22
> **기준**: 폴더 기반 진행률 추적 (P0~S0) + Grid 기반 (S1~S5)

---

## 🎯 진행률 추적 규칙 (핵심)

| 단계 | 추적 방식 | 기준 |
|------|----------|------|
| **P0** 작업 디렉토리 구조 생성 | **폴더 기반** | 하위 폴더에 파일 존재 여부 |
| **P1** 사업계획 | **폴더 기반** | 하위 폴더에 파일 존재 여부 |
| **P2** 프로젝트 기획 | **폴더 기반** | 하위 폴더에 파일 존재 여부 |
| **P3** 프로토타입 제작 | **폴더 기반** | 하위 폴더에 파일 존재 여부 |
| **S0** 개발 준비 | **폴더 기반** | 하위 폴더에 파일 존재 여부 |
| **S1** 개발 1차 | **Grid 기반** | DB Task 진행률 조회 |
| **S2** 개발 2차 | **Grid 기반** | DB Task 진행률 조회 |
| **S3** 개발 3차 | **Grid 기반** | DB Task 진행률 조회 |
| **S4** 테스트/최적화 | **Grid 기반** | DB Task 진행률 조회 |
| **S5** 운영 | **Grid 기반** | DB Task 진행률 조회 |

---

## 📁 폴더 기반 진행률 계산 (P0 ~ S0)

### 계산 방식

```
진행률 = (파일이 있는 하위 폴더 수 / 전체 하위 폴더 수) × 100%
```

### 예시

```
P1_사업계획/
├── 0-1_Vision_Mission/      ← 파일 있음 → ✅ 완료
├── 0-2_Market_Analysis/     ← 파일 없음 → ❌ 미완료
└── 0-3_Business_Model/      ← 파일 있음 → ✅ 완료

진행률 = 2/3 = 67%
```

---

## 📋 단계별 폴더 구조

### P0: 작업 디렉토리 구조 생성
- **기준 폴더**: `P0_작업_디렉토리_구조_생성/`

### P1: 사업계획
- **기준 폴더**: `P1_사업계획/`
- **하위 폴더**:
  - `0-1_Vision_Mission/`
  - `0-2_Market_Analysis/`
  - `0-3_Business_Model/`

### P2: 프로젝트 기획
- **기준 폴더**: `P2_프로젝트_기획/`
- **하위 폴더**:
  - `1-1_Directory_Structure/`
  - `1-2_Project_Plan/`
  - `1-3_UI_UX_Design/`
  - `1-4_Database_Design/`

### P3: 프로토타입 제작
- **기준 폴더**: `P3_프로토타입_제작/`
- **하위 폴더**:
  - `Frontend/`
  - `Database/`
  - `Scripts/`

### S0: 개발 준비
- **기준 폴더**: `S1_개발_준비/`
- **하위 폴더**:
  - `Tech_Stack/`
  - `Architecture/`
  - `Development_Setup/`
  - `Backend_Infra/`
  - `Project_Grid/`

---

## 📊 Grid 기반 단계 (S1 ~ S5)

S1부터 S5까지는 **Stage Gate 승인 상태**로 진행률을 결정합니다.

### 진행률 규칙

| stage_gate_status | 진행률 |
|-------------------|--------|
| `Approved` | **100%** |
| `AI Verified` | 90% (PO 승인 대기) |
| `Not Started` / `Rejected` | Task 진행률 평균 |

### 진행률 계산 방식

```javascript
// 1. Stage Gate 상태 확인
SELECT stage_name, stage_gate_status
FROM stage_verification
WHERE project_id = 'SSALWORKS';

// 2. Approved면 100%, 아니면 Task 진행률 평균
if (stage_gate_status === 'Approved') {
    return 100;
} else if (stage_gate_status === 'AI Verified') {
    return 90;
} else {
    // Task 진행률 평균 계산
    SELECT AVG(task_progress) as progress
    FROM ssalworks_tasks
    WHERE stage = ?;
}
```

### DB 테이블
- **Stage Gate 상태**: `stage_verification.stage_gate_status`
- **Task 진행률**: `ssalworks_tasks.task_progress`
- **사용자 프로젝트**: `user_project_tasks` (향후 구현)

---

## 🔄 진행률 계산 코드

```javascript
// 폴더 기반 진행률 계산 (P0~S0)
function calculateFolderProgress(baseFolder, subFolders) {
    let completedCount = 0;

    subFolders.forEach(folder => {
        const folderPath = baseFolder + folder;
        // 폴더에 파일이 1개 이상 있으면 완료
        if (hasFilesInFolder(folderPath)) {
            completedCount++;
        }
    });

    return Math.round((completedCount / subFolders.length) * 100);
}

// 폴더에 파일 존재 여부 확인
function hasFilesInFolder(folderPath) {
    const files = fs.readdirSync(folderPath);
    return files.some(file => !fs.statSync(folderPath + '/' + file).isDirectory());
}
```

---

## 📝 Dashboard 사이드바 연동

Dashboard는 폴더를 스캔하여 "진행 프로세스" 섹션에 진행률 표시:

**폴더 기반 (P0~S0):**
- 해당 폴더의 하위 폴더들을 스캔
- 파일이 있는 폴더 수 / 전체 폴더 수 = 진행률

**Grid 기반 (S1~S5):**
- DB에서 Task 진행률 조회
- Stage별 평균 계산

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
| v3.0 | 2025-12-22 | P0~S0 폴더 기반으로 변경, S1~S5 Stage Gate 승인 기준 명시 |

---

**"SSALWorks - 프롬프팅으로 AI를 운전하듯 프로젝트를 관리하세요."**
