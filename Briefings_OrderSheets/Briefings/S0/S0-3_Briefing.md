# S0-3 Method (데이터 관리 방식)

## 개요

SAL Grid 데이터를 저장하고 관리하는 **두 가지 방식**을 제공합니다. 프로젝트 환경에 맞는 방식을 선택하세요.

---

## 방식 비교

| 항목 | Database Method | CSV Method |
|------|-----------------|------------|
| **저장소** | Supabase (PostgreSQL) | JSON 파일 |
| **동기화** | 실시간 | 파일 저장 시 |
| **다중 사용자** | 지원 | 미지원 |
| **외부 의존성** | Supabase 필요 | 없음 (독립 실행) |
| **권장 상황** | 팀 프로젝트 | 개인/오프라인 |

---

## Database Method (Supabase)

외부 데이터베이스를 사용하여 Task 상태를 관리합니다.

### 제공 파일

| 파일 | 설명 |
|------|------|
| `schema.sql` | DB 테이블 스키마 |
| `triggers.sql` | 상태 검증 트리거 |
| `rls_policies.sql` | Row Level Security 정책 |

### 저장 위치

```
S0_Project-SAL-Grid_생성/
└── method/
    └── database/
        └── supabase/
            └── schema.sql
```

---

## CSV Method (JSON)

로컬 JSON 파일로 Task 상태를 관리합니다. 외부 서비스 없이 독립적으로 운영 가능합니다.

### 제공 파일

| 파일 | 설명 |
|------|------|
| `project_sal_grid.json` | Task 데이터 (22개 속성) |
| `stage_verification.json` | Stage 검증 데이터 |
| `json-to-csv.js` | JSON → CSV 변환 스크립트 |
| `template.json` | 빈 프로젝트 템플릿 |

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

---

## 방식 선택 가이드

| 상황 | 권장 방식 |
|------|----------|
| 팀 프로젝트, 실시간 공유 필요 | Database Method |
| 개인 프로젝트, 빠른 시작 | CSV Method |
| 오프라인 환경 | CSV Method |
| 대규모 Task (100개 이상) | Database Method |

---

> **위의 작업을 위하여 준비된 Order Sheet 템플릿을 Control Desk에 로딩하시겠습니까?**
