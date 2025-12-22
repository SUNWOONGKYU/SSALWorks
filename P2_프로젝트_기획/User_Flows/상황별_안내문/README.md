# 상황별 안내문 시스템

## 개요

사용자가 사이드바에서 진행 프로세스 단계를 클릭하면 해당 단계의 안내문이 팝업으로 표시됩니다.

## 시스템 구조

```
상황별_안내문/
├── README.md                    ← 이 문서
├── P1-1_Vision_Mission.html     ← 안내문 HTML 파일들
├── P1-2_Market_Analysis.html
├── ...
└── (총 25개 HTML 파일)

        ↓ 빌드 시 번들링

P3_프로토타입_제작/Frontend/Prototype/
└── guides.js                    ← 번들된 JS 파일
```

## 동작 흐름

```
1. 사이드바 클릭
   └── loadProcessStage(stageId) 호출

2. STAGE_DATA에서 guideUrl 조회
   └── 예: guideUrl: 'guides/P1-1_Vision_Mission.html'

3. guideUrl에서 키 추출
   └── 'P1-1_Vision_Mission'

4. GUIDE_CONTENTS[키]에서 HTML 로드
   └── GUIDE_CONTENTS['P1-1_Vision_Mission']

5. 팝업에 안내문 표시
   └── [확인] / [취소] 버튼
```

## 파일 목록 (25개)

### 특별단계 (2개)
| 파일명 | 설명 |
|--------|------|
| SP-1_디렉토리_구조_생성.html | 작업 디렉토리 구조 생성 안내 |
| SP-2_SAL_GRID_생성.html | Project SAL Grid 생성 안내 |

### P1 사업계획 (3개)
| 파일명 | 설명 |
|--------|------|
| P1-1_Vision_Mission.html | Vision & Mission 정의 안내 |
| P1-2_Market_Analysis.html | 시장 분석 안내 |
| P1-3_Business_Model.html | 비즈니스 모델 안내 |

### P2 프로젝트 기획 (10개)
| 파일명 | 설명 |
|--------|------|
| P2-1_Directory_Structure.html | 디렉토리 구조 설계 안내 |
| P2-2-1_Requirements.html | 요구사항 정의 안내 |
| P2-2-2_User_Flows.html | 사용자 흐름 설계 안내 |
| P2-2-3_Workflows.html | 워크플로우 설계 안내 |
| P2-3-1_Design_Guidelines.html | 디자인 가이드라인 안내 |
| P2-3-2_Mockup.html | 목업 제작 안내 |
| P2-3-3_Prototype.html | 프로토타입 설계 안내 |
| P2-4_Database_Design.html | 데이터베이스 설계 안내 |

### P3 프로토타입 제작 (4개)
| 파일명 | 설명 |
|--------|------|
| P3-1-1_Frontend_Prototype.html | 프론트엔드 프로토타입 안내 |
| P3-1-2_Frontend_Pages.html | 프론트엔드 페이지 개발 안내 |
| P3-2_Database.html | 데이터베이스 구축 안내 |
| P3-3_Scripts.html | 스크립트 개발 안내 |

### S 개발단계 (5개)
| 파일명 | 설명 |
|--------|------|
| S1_개발_준비.html | 개발 준비 단계 안내 |
| S2_개발_1차.html | 개발 1차 안내 |
| S3_개발_2차.html | 개발 2차 안내 |
| S4_개발_3차.html | 개발 3차 안내 |
| S5_개발_마무리.html | 운영 단계 안내 |

### 기타 (3개)
| 파일명 | 설명 |
|--------|------|
| Welcome.html | 환영 메시지 |
| Project_Example.html | 예시 프로젝트 안내 |
| Project_Work.html | 프로젝트 작업 안내 |

## 빌드 방법

### guides.js 생성 스크립트

```bash
node scripts/generate-guides-js.js
```

### 스크립트 위치
```
scripts/generate-guides-js.js
```

### 스크립트 동작
1. `상황별_안내문/` 폴더의 모든 HTML 파일 읽기
2. 파일명(확장자 제외)을 키로, 내용을 값으로 저장
3. `guides.js` 파일 생성

### 생성되는 파일
```
P3_프로토타입_제작/Frontend/Prototype/guides.js
```

### guides.js 구조
```javascript
const GUIDE_CONTENTS = {
    'P1-1_Vision_Mission': '<h2>...</h2>...',
    'P1-2_Market_Analysis': '<h2>...</h2>...',
    // ...
};
```

## 안내문 HTML 작성 가이드

### 기본 구조
```html
<h2 style="color: var(--primary-dark); border-bottom: 2px solid var(--primary); padding-bottom: 8px;">
    [이모지] [제목]
</h2>

<p>[간단한 설명]</p>

<h3 style="margin-top: 24px; color: #333;">[섹션 제목]</h3>
<ul style="padding-left: 20px;">
    <li style="margin-bottom: 8px;">[항목]</li>
</ul>

<div style="margin-top: 16px; padding: 12px; background: #f0fdf4; border-radius: 8px; border-left: 4px solid var(--primary);">
    <strong>[아이콘] [강조 제목]:</strong> [내용]
</div>
```

### 스타일 가이드
- 제목: `var(--primary-dark)` 색상, 하단 보더
- 섹션 제목: `#333` 색상, 상단 마진 24px
- 리스트: 좌측 패딩 20px
- 강조 박스: 배경 `#f0fdf4`, 좌측 보더

## 새 안내문 추가 방법

1. `상황별_안내문/` 폴더에 HTML 파일 생성
2. 위 작성 가이드에 따라 내용 작성
3. `node scripts/generate-guides-js.js` 실행
4. `index.html`의 STAGE_DATA에 guideUrl 추가

## 안내문 표시 규칙

### 프로세스 단계별 안내문 규칙

| 단계 | 안내문 표시 레벨 | 설명 |
|------|-----------------|------|
| P1 사업계획 | **하위 항목별** | 각 하위 항목 클릭 시 안내문 표시 |
| P2 프로젝트 기획 | **하위 항목별** | 각 하위 항목 클릭 시 안내문 표시 |
| P3 프로토타입 제작 | **하위 항목별** | 각 하위 항목 클릭 시 안내문 표시 |
| ☆ Project SAL Grid 생성 | **Phase 레벨** | Phase 클릭 시에만 안내문 표시 |
| S1 개발 준비 | **Phase 레벨** | Phase 클릭 시에만 안내문 표시 |
| S2 개발 1차 | **Phase 레벨** | Phase 클릭 시에만 안내문 표시 |
| S3 개발 2차 | **Phase 레벨** | Phase 클릭 시에만 안내문 표시 |
| S4 개발 3차 | **Phase 레벨** | Phase 클릭 시에만 안내문 표시 |
| S5 개발 마무리 | **Phase 레벨** | Phase 클릭 시에만 안내문 표시 |

### 규칙 설명

**SAL Grid 생성 이전 (P1, P2, P3)**:
- 각 하위 항목별로 안내문이 표시됨
- 사용자가 개별 작업 항목을 클릭하면 해당 안내문 팝업이 뜸
- `loadProcessStage()` 함수로 안내문 로드

**SAL Grid 생성 이후 (S1 ~ S5)**:
- Phase 레벨에서만 안내문이 표시됨
- 하위 항목 클릭 시 안내문이 뜨지 않음
- 이유: SAL Grid가 생성된 후에는 Project SAL Grid에서 작업이 관리되기 때문
- 하위 항목은 폴더 구조 표시 목적으로만 사용

### 코드 구현

```javascript
// P1/P2/P3 하위 항목 (안내문 O)
<div class="process-small" onclick="loadProcessStage('biz_0_1', 'Vision & Mission', 'P1')">

// S1~S5 하위 항목 (안내문 X - onclick 없음)
<div class="process-small">
```

## 연관 파일

- **스크립트**: `scripts/generate-guides-js.js`
- **번들 파일**: `P3_프로토타입_제작/Frontend/Prototype/guides.js`
- **메인 HTML**: `P3_프로토타입_제작/Frontend/Prototype/index.html`
- **STAGE_DATA**: index.html 내 JavaScript 객체
