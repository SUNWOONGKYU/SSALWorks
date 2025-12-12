# 프로젝트 그리드 (Project Grid)

## 📋 개요

SAL 3D 그리드 시스템 기반 프로젝트 관리 도구입니다.

## 📂 폴더 구조

```
2-4_Project_Grid/
├── manual/                  # 프로젝트 그리드 매뉴얼 (중요!)
│   ├── PROJECT_GRID_매뉴얼_V4.0.md
│   ├── quick_start.md
│   └── advanced_usage.md
├── project_grid/            # 프로젝트 그리드 파일
│   ├── project_grid.json
│   ├── project_grid.md
│   └── project_grid.html
├── tasks/                   # 작업 목록
│   ├── phase1_tasks.json
│   ├── phase2_tasks.json
│   └── ...
├── validation/              # 검증 도구
│   ├── instructions/        # 검증 지침서
│   └── results/             # 검증 결과
├── scripts/                 # 유틸리티 스크립트
│   ├── create_task.py
│   ├── update_status.py
│   └── export_grid.py
└── README.md                # 이 파일
```

## 🎯 SAL 3D 그리드 시스템

### X축: Stage (개발 단계)
- P1: 기획
- P2: 설계
- P3: 개발
- P4: 테스트
- P5: 배포

### Y축: Area (개발 영역)
- O: DevOps
- D: Database
- BI: Backend Infrastructure
- BA: Backend APIs
- F: Frontend
- T: Test

### Z축: Level (작업 단위)
개별 Task (P1F1, P2BA3 등의 Task ID)

## 📌 Task ID 규칙

```
P{Phase}{Area}{Number}
```

**예시:**
- `P1F1`: Phase 1 (기획) - Frontend - Task 1
- `P3BA2`: Phase 3 (개발) - Backend APIs - Task 2
- `P2D1`: Phase 2 (설계) - Database - Task 1

## 🚀 사용 방법

### 1. 매뉴얼 읽기
```
manual/PROJECT_GRID_매뉴얼_V4.0.md를 먼저 읽으세요!
```

### 2. 작업 생성
```bash
python scripts/create_task.py --phase 1 --area F --task-name "회원가입 화면"
```

### 3. 상태 업데이트
```bash
python scripts/update_status.py --task-id P1F1 --status completed
```

### 4. 그리드 뷰어로 확인
```
project_grid/project_grid.html을 브라우저에서 열기
```

## 📊 Task 상태

- `pending`: 대기 중
- `in_progress`: 진행 중
- `completed`: 완료
- `blocked`: 블로킹됨

## 🔗 관련 문서

- 프로젝트 그리드 DB: `참고자료/Project_Grid_DB/`
- 개발 워크플로우: `2_개발준비/2-1_Tech_Stack/`

## ⚠️ 중요 사항

**매뉴얼 파일은 Git에 커밋되지 않습니다!**
- `.gitignore`에 포함되어 있음
- 비밀 노하우이므로 외부 공유 금지
