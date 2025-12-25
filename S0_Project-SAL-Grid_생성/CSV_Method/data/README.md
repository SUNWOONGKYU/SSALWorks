# CSV Method 데이터 폴더

이 폴더에는 프로젝트의 SAL Grid JSON 데이터가 저장됩니다.

## 파일 구조

```
data/
├── project_sal_grid.json    ← 프로젝트 Task 데이터
└── README.md
```

## JSON 파일 생성 방법

### 방법 1: 템플릿에서 시작

```bash
# 템플릿 복사
cp ../templates/project_sal_grid_template.json project_sal_grid.json
```

### 방법 2: CSV에서 변환

```bash
# CSV → JSON 변환
node ../scripts/csv-to-json.js --input {CSV파일경로} --output project_sal_grid.json
```

### 방법 3: Claude Code가 직접 생성

Task Plan을 기반으로 Claude Code가 JSON 파일을 자동 생성합니다.

## JSON → CSV 변환

```bash
# JSON → CSV 변환 (Production 배포용)
node ../scripts/json-to-csv.js
```

## 데이터 구조

```json
{
  "metadata": {
    "project_name": "프로젝트명",
    "project_id": "PROJECT-001",
    "created_at": "2025-01-01T00:00:00Z",
    "updated_at": "2025-01-01T00:00:00Z",
    "version": "1.0"
  },
  "tasks": [
    {
      "task_id": "S1D1",
      "task_name": "Task 이름",
      "stage": 1,
      "area": "D",
      "task_status": "Pending",
      ...
    }
  ],
  "stage_gates": {
    "S1": { "status": "Pending", "verified_at": null },
    ...
  }
}
```

---

*CSV Method - Supabase 없이 로컬에서 SAL Grid 관리*
