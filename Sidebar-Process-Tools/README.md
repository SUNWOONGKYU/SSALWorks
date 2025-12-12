# Sidebar Progress Tools

SSALWorks 사이드바 진행률 계산 시스템

## 구조

```
Sidebar-Process-Tools/
├── progress_server.js     # 진행률 계산 서버 (포트 3032)
├── progress_tracker.js    # 프론트엔드 모듈 (HTML에 포함)
├── package.json           # npm 의존성
├── progress_data/         # 진행률 JSON 데이터 (레거시)
└── sidebar_generation/    # 사이드바 생성 도구 (레거시)
```

## 실행 방법

```bash
cd Sidebar-Process-Tools
npm install
npm start
```

## API 엔드포인트

### GET /check-folder-progress

폴더 기반 진행률 계산 (사업계획, 프로젝트 기획)

**응답 예시:**
```json
{
  "business": {
    "completed": 4,
    "total": 4,
    "progress": 100,
    "details": [...]
  },
  "planning": {
    "completed": 5,
    "total": 6,
    "progress": 83,
    "details": [...]
  }
}
```

### GET /check-stage-progress

Supabase 기반 진행률 계산 (S1~S6 개발단계)

**응답 예시:**
```json
{
  "s1": { "stage": "S1. 프로토타입 제작", "completed": 3, "total": 9, "progress": 33 },
  "s2": { "stage": "S2. 개발 준비", "completed": 0, "total": 8, "progress": 0 },
  ...
}
```

## 프론트엔드 연동

HTML에 스크립트 추가:
```html
<script src="progress_tracker.js"></script>
```

수동 새로고침:
```javascript
window.progressTracker.refreshAllProgress();
```

## 진행률 계산 방식

### 사업계획 & 프로젝트 기획 (폴더 기반)
- 폴더 내 `.md`, `.json`, `.html` 파일이 있으면 완료로 간주
- 완료된 폴더 수 / 전체 폴더 수 × 100%

### S1~S6 개발단계 (Supabase 기반)
- `project_ssal_grid_tasks` 테이블에서 `task_status = 'Completed'` 조회
- 완료된 task 수 / 전체 task 수 × 100%
