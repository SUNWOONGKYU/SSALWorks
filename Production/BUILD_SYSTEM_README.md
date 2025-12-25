# SSALWORKS 빌드 시스템

## 개요

이 문서는 SSALWORKS 프로젝트의 빌드 시스템을 설명합니다.

---

## 통합 빌드 (권장)

### 실행 방법

```bash
node Production/build-all.js
```

### 자동 실행 시점

| 시점 | 설명 |
|------|------|
| **git push** | Vercel 배포 시 자동 실행 (`vercel.json`의 `buildCommand`) |
| **수동** | 로컬에서 확인 필요 시 직접 실행 |

---

## 빌드 스크립트 목록

| # | 스크립트 | 역할 | 출력 파일 |
|---|---------|------|----------|
| 1 | `build-progress.js` | 진행률 계산 | `data/phase_progress.json` |
| 2 | `build-web-assets.js` | MD → JS 번들 | `ordersheets.js`, `guides.js`, `service-guides.js` |
| 3 | `S0_.../build-sal-grid-csv.js` | SAL Grid CSV 생성 | `data/sal_grid.csv` |

---

## 1. build-progress.js (진행률 계산)

### 역할
프로젝트 진행률을 계산하여 `phase_progress.json` 생성

### 계산 방식
- **P0~S0**: 폴더/파일 구조 기반 (각 폴더에 파일이 있으면 완료)
- **S1~S5**: `sal_grid.csv`의 Task 상태 기반 (Completed 개수)

### 출력
```
Production/data/phase_progress.json
```

### 입력 소스

| Phase | 폴더 | 하위 폴더 |
|-------|------|----------|
| P0 | `P0_작업_디렉토리_구조_생성/` | 2개 |
| P1 | `P1_사업계획/` | 5개 |
| P2 | `P2_프로젝트_기획/` | 8개 |
| P3 | `P3_프로토타입_제작/` | Database, Documentation, Frontend |
| S0 | `S0_Project-SAL-Grid_생성/` | CSV_Method, Database_Method, manual, sal-grid |
| S1~S5 | `Production/data/sal_grid.csv` | Task 상태 기반 |

---

## 2. build-web-assets.js (MD → JS 번들)

### 역할
Markdown 파일들을 JavaScript 번들로 변환

### 포함된 빌드 작업

#### 2-1. Order Sheets (32개 파일)

**소스 폴더:** `Briefings_OrderSheets/OrderSheet_Templates/`

| 폴더 | 파일 |
|------|------|
| P0/ | P0-1_OrderSheet.md, P0-2_OrderSheet.md |
| P1/ | P1-1_OrderSheet.md, P1-2_OrderSheet.md, P1-3_OrderSheet.md |
| P2/ | P2-1_OrderSheet.md, P2-2-1_OrderSheet.md, P2-2-2_OrderSheet.md, P2-2-3_OrderSheet.md, P2-3-1_OrderSheet.md, P2-3-2_OrderSheet.md, P2-3-3_OrderSheet.md, P2-4_OrderSheet.md, P2-5_OrderSheet.md |
| P3/ | P3-1-1_OrderSheet.md, P3-1-2_OrderSheet.md, P3-2_OrderSheet.md, P3-3_OrderSheet.md |
| S0/ | S0-1_OrderSheet.md, S0-2_OrderSheet.md, S0-3_OrderSheet.md, S0-4_OrderSheet.md, S0-5_OrderSheet.md, S0-6_OrderSheet.md |
| S1/ | S1_OrderSheet.md |
| S2/ | S2_OrderSheet.md |
| S3/ | S3_OrderSheet.md |
| S4/ | S4_OrderSheet.md |
| S5/ | S5_OrderSheet.md |
| Situational/ | Completed_Project_Revision_OrderSheet.md |
| (루트) | P0-S0_표준양식.md, S1-S5_표준양식.md |

**출력:** `Production/Frontend/ordersheets.js`

**복사 위치:**
- `Production/ordersheets.js`
- `P3_프로토타입_제작/Frontend/Prototype/ordersheets.js`

---

#### 2-2. Guides/Briefings (29개 파일)

**소스 폴더:** `Briefings_OrderSheets/Briefings/`

| 폴더 | 파일 |
|------|------|
| P0/ | P0-1_Briefing.md, P0-2_Briefing.md |
| P1/ | P1-1_Briefing.md, P1-2_Briefing.md, P1-3_Briefing.md |
| P2/ | P2-1_Briefing.md, P2-2-1_Briefing.md, P2-2-2_Briefing.md, P2-2-3_Briefing.md, P2-3-1_Briefing.md, P2-3-2_Briefing.md, P2-3-3_Briefing.md, P2-4_Briefing.md, P2-5_Briefing.md |
| P3/ | P3-1-1_Briefing.md, P3-1-2_Briefing.md, P3-2_Briefing.md, P3-3_Briefing.md |
| S0/ | S0-1_Briefing.md, S0-2_Briefing.md, S0-3_Briefing.md, S0-4_Briefing.md, S0-5_Briefing.md, S0-6_Briefing.md |
| S1/ | S1_Briefing.md |
| S2/ | S2_Briefing.md |
| S3/ | S3_Briefing.md |
| S4/ | S4_Briefing.md |
| S5/ | S5_Briefing.md |

**출력:** `Production/Frontend/guides.js`

**복사 위치:**
- `Production/guides.js`
- `P3_프로토타입_제작/Frontend/Prototype/guides.js`

---

#### 2-3. Service Guides (5개 파일)

**소스 폴더:** `부수적_고유기능/콘텐츠/외부_연동_설정_Guide/`

| 파일 |
|------|
| 01_데이터베이스_설정.md |
| 02_회원인증_설정.md |
| 03_이메일_시스템_설정.md |
| 04_배포_도메인_설정.md |
| 05_결제_시스템_설정.md |

**출력:** `Production/Frontend/service-guides.js`

**복사 위치:**
- `Production/service-guides.js`
- `P3_프로토타입_제작/Frontend/Prototype/service-guides.js`

---

#### 2-4. Service Introduction Modal (1개 파일)

**소스 폴더:** `P2_프로젝트_기획/Service_Introduction/`

| 파일 |
|------|
| 서비스_소개_모달_초안.md |

**출력:** `Production/index.html` 내 서비스 소개 모달 섹션 업데이트

---

#### 2-5. Manual HTML (1개 파일)

**소스:** `S0_Project-SAL-Grid_생성/manual/PROJECT_SAL_GRID_MANUAL.md`

**출력:** `참고자료/PROJECT_SAL_GRID_MANUAL.html`

---

## 3. build-sal-grid-csv.js (SAL Grid CSV)

**위치:** `S0_Project-SAL-Grid_생성/build-sal-grid-csv.js`

### 역할
Supabase `project_sal_grid` 테이블에서 데이터를 가져와 CSV 생성

### 데이터 흐름
```
Supabase DB (project_sal_grid 테이블, 61개 Task)
    ↓
Production/data/sal_grid.csv
    ↓
build-progress.js에서 S1~S5 진행률 계산에 사용
```

### 출력
```
Production/data/sal_grid.csv
```

### 포함 컬럼 (10개)
- task_id
- task_name
- stage
- area
- task_status
- task_progress
- verification_status
- dependencies
- execution_type
- remarks

---

## 파일 구조 요약

```
Production/
├── build-all.js              ← 통합 빌드 (이것만 실행)
├── build-progress.js         ← 진행률 계산
├── build-web-assets.js       ← MD → JS 번들
│   (build-sal-grid-csv.js는 S0_Project-SAL-Grid_생성/ 폴더에 위치)
├── vercel.json               ← buildCommand: "node build-all.js"
│
├── data/
│   ├── phase_progress.json   ← 진행률 (P0~S5)
│   └── sal_grid.csv          ← SAL Grid (61개 Task)
│
├── Frontend/
│   ├── ordersheets.js        ← 32개 Order Sheet
│   ├── guides.js             ← 29개 Briefing
│   └── service-guides.js     ← 5개 Service Guide
│
├── ordersheets.js            ← 복사본
├── guides.js                 ← 복사본
└── service-guides.js         ← 복사본

Briefings_OrderSheets/
├── OrderSheet_Templates/     ← Order Sheet 소스 (32개 MD)
└── Briefings/                ← Briefing 소스 (29개 MD)

부수적_고유기능/콘텐츠/
└── 외부_연동_설정_Guide/     ← Service Guide 소스 (5개 MD)

P2_프로젝트_기획/
└── Service_Introduction/     ← 서비스 소개 소스 (1개 MD)

S0_Project-SAL-Grid_생성/
└── manual/                   ← Manual 소스 (1개 MD)
```

---

## 요약

| 빌드 | 소스 파일 수 | 출력 |
|------|-------------|------|
| Order Sheets | 32개 MD | ordersheets.js |
| Briefings | 29개 MD | guides.js |
| Service Guides | 5개 MD | service-guides.js |
| Service Intro | 1개 MD | index.html 모달 |
| Manual | 1개 MD | HTML |
| 진행률 | 폴더 구조 + CSV | phase_progress.json |
| SAL Grid | Supabase DB | sal_grid.csv |

**총합:** 68개 MD 파일 + DB 데이터

---

## 사용법

```bash
# 전체 빌드 (수동)
node Production/build-all.js

# 자동 실행
git push → Vercel 배포 시 자동
```
