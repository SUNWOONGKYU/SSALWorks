# Production Data 폴더

배포용 정적 데이터 파일들이 저장됩니다.

## 파일 구조

```
data/
├── sal_grid.csv           ← SAL Grid Task 데이터 (57개)
├── phase_progress.json    ← P0~S5 진행률 데이터
└── README.md
```

## 데이터 생성 방법

### sal_grid.csv (DB Method)

Supabase에서 데이터를 가져와 CSV로 변환합니다.

```bash
cd Production
node build-sal-grid-csv.js
```

### phase_progress.json (공통)

폴더 구조와 CSV를 분석하여 진행률을 계산합니다.

```bash
cd Production
node build-progress.js
```

## Viewer 파일

| 파일 | 방식 | 용도 |
|------|------|------|
| viewer_database.html | DB Method | Supabase 직접 연동 |
| viewer_csv.html | CSV Method | 로컬 CSV 파일 기반 |
| viewer_mobile_database.html | DB Method (Mobile) | 모바일 DB 뷰어 |
| viewer_mobile_csv.html | CSV Method (Mobile) | 모바일 CSV 뷰어 |

## 데이터 소스 구분

| 방식 | 데이터 소스 | 대상 사용자 |
|------|------------|------------|
| **DB Method** | Supabase `project_sal_grid` 테이블 | SSAL Works 내부 |
| **CSV Method** | `data/sal_grid.csv` 파일 | 일반 사용자 |

---

*Production 폴더 - 웹 배포용 정적 파일*
