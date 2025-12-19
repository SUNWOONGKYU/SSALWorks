# Order Sheet - SAL Grid Supabase 작업

## 기본 정보
- **Order ID**: OS-SSAL-SUPABASE-001
- **단계 유형**: Project SSAL Grid > Supabase
- **작성일**: [자동입력]

---

## 작업 유형 선택

### 스키마 작업
- [ ] 테이블 스키마 수정
- [ ] 새 컬럼 추가
- [ ] 인덱스 추가/수정
- [ ] RLS 정책 수정

### 데이터 작업
- [ ] Task 데이터 삽입
- [ ] Task 데이터 수정
- [ ] Task 데이터 삭제
- [ ] 데이터 마이그레이션

### SQL 파일 작업
- [ ] schema.sql 수정
- [ ] seed_ssalworks_tasks.sql 수정
- [ ] 새 SQL 파일 생성

---

## 작업 대상 테이블

- [ ] `ssalworks_tasks` (SSALWorks 실전 Task)
- [ ] `project_ssal_grid_tasks_template` (템플릿 Task)
- [ ] `stage_verification` (Stage Gate 검증)

---

## SQL 파일 위치
```
Project-SSAL-Grid/supabase/
├── schema.sql                    (테이블 생성)
├── seed_ssalworks_tasks.sql      (42개 Task 데이터)
└── TEMPLATE_STANDARD_...sql      (참고용 템플릿)
```

---

## 상세 요청사항

[구체적인 작업 내용을 작성하세요]

---

## 실행 순서 참고
1. schema.sql 실행 (테이블 생성)
2. seed_ssalworks_tasks.sql 실행 (데이터 삽입)
3. 검증: `SELECT COUNT(*) FROM ssalworks_tasks;`

---

> 본 Order Sheet는 예시입니다. Project Owner가 프로젝트에 맞게 자유롭게 수정할 수 있습니다.
