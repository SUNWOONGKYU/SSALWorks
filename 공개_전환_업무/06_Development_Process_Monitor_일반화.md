# Development Process Monitor 일반화

> 공개 배포용 멀티테넌트 자동화 구현

---

## 핵심 아이디어

**관리자는 기존 프로젝트 계속 사용, 일반 사용자는 자동으로 본인 프로젝트 연결**

| 사용자 | 동작 | 수동 설정 |
|--------|------|----------|
| 관리자 (ADMIN_EMAIL) | 고정 프로젝트 자동 로드 | 없음 |
| 일반 사용자 | 본인 프로젝트 자동 조회 | 없음 |

---

## 완전 자동화 프로세스

```
┌─────────────────────────────────────────────────────────────────────┐
│  1. 사용자가 프로젝트 생성 (POST /api/projects/create)               │
│       ↓                                                              │
│  2. projects 테이블에 INSERT                                        │
│       ↓                                                              │
│  3. project_phase_progress에 P0~S5 자동 INSERT ← 자동 생성!         │
│       ↓                                                              │
│  4. 로그인 시 loadPhaseProgressFromDB() 자동 호출                    │
│       ↓                                                              │
│  5. 사용자별 본인 프로젝트 진행률 자동 표시                           │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 구현 코드

### 1. 프로젝트 생성 시 phase_progress 자동 생성

**파일:** `Production/api/Backend_APIs/projects/create.js`

```javascript
// 7. project_phase_progress 초기 데이터 생성 (P0~P3, S0~S5)
const phaseProgressData = [
    { project_id: projectId, phase_code: 'P0', phase_name: '작업 디렉토리 구조 생성', progress: 0, ... },
    { project_id: projectId, phase_code: 'P1', phase_name: '사업계획', progress: 0, ... },
    { project_id: projectId, phase_code: 'P2', phase_name: '프로젝트 기획', progress: 0, ... },
    { project_id: projectId, phase_code: 'P3', phase_name: '프로토타입 제작', progress: 0, ... },
    { project_id: projectId, phase_code: 'S0', phase_name: 'Project SAL Grid 생성', progress: 0, ... },
    { project_id: projectId, phase_code: 'S1', phase_name: '개발 준비', progress: 0, ... },
    { project_id: projectId, phase_code: 'S2', phase_name: '개발 1차', progress: 0, ... },
    { project_id: projectId, phase_code: 'S3', phase_name: '개발 2차', progress: 0, ... },
    { project_id: projectId, phase_code: 'S4', phase_name: '개발 3차', progress: 0, ... },
    { project_id: projectId, phase_code: 'S5', phase_name: '개발 마무리', progress: 0, ... }
];

await supabase.from('project_phase_progress').insert(phaseProgressData);
```

### 2. 로그인 시 사용자별 분기 로드

**파일:** `Production/index.html` (loadPhaseProgressFromDB 함수)

```javascript
// 🔐 관리자 이메일: 자동으로 기본 프로젝트 로드
// 다른 사용자: 본인의 프로젝트 ID 조회 필요
const ADMIN_EMAIL = 'wksum999@gmail.com';
const DEFAULT_PROJECT_ID = 'SSALWORKS';

if (session.user.email === ADMIN_EMAIL) {
    projectId = DEFAULT_PROJECT_ID;
    console.log('📊 관리자 접속: SSALWORKS 프로젝트 자동 로드');
} else {
    // 일반 사용자: 본인의 프로젝트 조회
    const { data: userData } = await window.supabaseClient
        .from('users')
        .select('user_id')
        .eq('id', session.user.id)
        .single();

    const { data: project } = await window.supabaseClient
        .from('projects')
        .select('project_id')
        .eq('user_id', userData.user_id)
        .eq('status', 'in_progress')
        .single();

    if (!project) {
        console.log('📊 진행중인 프로젝트 없음: 프로젝트 등록 필요');
        resetAllProgressToZero();
        return;
    }

    projectId = project.project_id;
}
```

---

## 공개 배포 시 설정 방법

1. `Production/index.html`에서 `ADMIN_EMAIL` 변경
2. `DEFAULT_PROJECT_ID` 변경
3. 끝! (다른 설정 불필요)

---

## 장점

1. **관리자**: 기존 프로젝트 계속 테스트/개발 가능
2. **일반 사용자**: 프로젝트 등록만 하면 자동 연결
3. **수동 설정 불필요**: 완전 자동화
4. **멀티테넌트**: 각 사용자 별도 데이터

---

**작성일:** 2025-12-25
