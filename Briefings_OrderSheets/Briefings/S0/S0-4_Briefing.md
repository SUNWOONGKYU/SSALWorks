# S0-4 Viewer (조회 도구)

## 개요

SAL Grid 데이터를 **시각적으로 조회**할 수 있는 HTML 뷰어를 제공합니다. 선택한 Method에 맞는 뷰어를 사용하세요.

## 뷰어 종류

- `viewer_database.html`: PC용 (Database Method) / Supabase
- `viewer_csv.html`: PC용 (CSV Method) / JSON 파일
- `viewer_mobile_database.html`: 모바일용 (Database) / Supabase
- `viewer_mobile_csv.html`: 모바일용 (CSV) / JSON 파일

## 제공 기능

### 전체 현황 대시보드
- Stage별 진행률 (막대 그래프)
- Area별 분포 (파이 차트)
- 완료/진행중/대기 Task 카운트

### Task 목록
- Stage/Area 필터링
- 상태별 필터링 (Pending/In Progress/Executed/Completed)
- 검색 기능

### Task 상세 정보
- 22개 속성 전체 표시
- 의존성 Task 링크
- 검증 결과 확인

## 저장 위치

```
S0_Project-SAL-Grid_생성/
└── viewer/
    ├── viewer_database.html
    ├── viewer_csv.html
    ├── viewer_mobile_database.html
    └── viewer_mobile_csv.html
```

## 사용 방법

### Database Method 사용 시

1. `viewer_database.html` 파일을 브라우저에서 엽니다
2. Supabase 연결 정보가 자동으로 설정됩니다
3. 실시간으로 최신 데이터를 조회합니다

### CSV Method 사용 시

1. `viewer_csv.html` 파일을 브라우저에서 엽니다
2. JSON 파일 경로가 올바른지 확인합니다
3. 새로고침하여 최신 데이터를 반영합니다

## 참고사항

- 뷰어는 **읽기 전용**입니다. 데이터 수정은 원본 파일이나 DB에서 직접 수행합니다.
- 모바일에서는 mobile 버전 뷰어를 사용하면 화면에 최적화됩니다.

