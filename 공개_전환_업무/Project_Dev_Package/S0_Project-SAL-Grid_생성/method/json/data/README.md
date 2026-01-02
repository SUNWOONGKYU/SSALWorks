# CSV Data Folder Structure

> Project SAL Grid CSV 데이터 관리 가이드

---

## 폴더 구조

```
data/
├── in_progress/        ← 진행 중인 프로젝트 (Viewer가 읽는 폴더)
│   └── sal_grid.csv    ← 현재 프로젝트의 Task Grid
│
├── completed/          ← 완료된 프로젝트 (보관용)
│   └── [project]_sal_grid.csv
│
└── README.md           ← 이 파일
```

---

## 사용 방법

### 1. 진행 중인 프로젝트

- `in_progress/` 폴더에 `sal_grid.csv` 파일을 저장
- **Viewer는 이 폴더의 CSV만 로드**
- Task 완료 시 CSV 파일 업데이트

### 2. 프로젝트 완료 시

프로젝트가 완료되면 CSV를 `completed/` 폴더로 이동:

```bash
# 예시: 프로젝트명을 붙여서 이동
mv in_progress/sal_grid.csv completed/myproject_sal_grid.csv
```

### 3. 새 프로젝트 시작 시

1. 기존 CSV가 있다면 `completed/`로 이동
2. 새 `sal_grid.csv`를 `in_progress/`에 생성

---

## Viewer 동작

| Viewer | 읽는 폴더 | 설명 |
|--------|----------|------|
| `viewer_csv.html` | `in_progress/` | 진행 중인 프로젝트만 표시 |

**경로**: `../method/csv/data/in_progress/sal_grid.csv`

---

## 여러 프로젝트 관리

여러 프로젝트를 순차적으로 진행할 경우:

1. **현재 프로젝트**: `in_progress/sal_grid.csv`
2. **이전 프로젝트**: `completed/project1_sal_grid.csv`
3. **더 이전**: `completed/project2_sal_grid.csv`

**핵심**: `in_progress/`에는 항상 하나의 프로젝트만 존재

---

## 주의사항

- `in_progress/` 폴더가 비어있으면 Viewer에서 오류 표시
- CSV 파일명은 반드시 `sal_grid.csv`로 유지 (in_progress 내)
- 완료된 프로젝트는 구분을 위해 프로젝트명 접두사 권장
