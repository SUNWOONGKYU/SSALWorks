# method

## 개요

SAL Grid 데이터를 **JSON 파일**로 저장하고 관리합니다. 외부 서비스 없이 독립적으로 운영 가능합니다.

## CSV Method (기본)

로컬 JSON 파일로 Task 상태를 관리합니다.

### 제공 파일

- `project_sal_grid.json`: Task 데이터 (22개 속성)
- `stage_verification.json`: Stage 검증 데이터
- `json-to-csv.js`: JSON → CSV 변환 스크립트
- `template.json`: 빈 프로젝트 템플릿

### 저장 위치

```
S0_Project-SAL-Grid_생성/
└── method/
    └── csv/
        ├── data/
        │   ├── project_sal_grid.json
        │   └── stage_verification.json
        ├── scripts/
        │   └── json-to-csv.js
        └── templates/
            └── template.json
```

## 사용 방법

1. `project_sal_grid.json` 파일에 Task 데이터 작성
2. Claude Code가 Task 수행 시 JSON 파일 직접 수정
3. 필요시 `json-to-csv.js`로 CSV 변환 가능

