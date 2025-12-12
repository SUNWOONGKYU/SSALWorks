# Order Sheet 표준 템플릿 시스템

## 개요

사용자가 안내문 팝업에서 [확인] 버튼을 클릭하면 해당 단계의 Order Sheet 표준 템플릿이 워크스페이스에 로드됩니다.

## 시스템 구조

```
Order_Sheet_템플릿/
├── README.md                           ← 이 문서
├── P1_사업계획/
│   ├── P1-1_Vision_Mission.md
│   ├── P1-2_Market_Analysis.md
│   └── P1-3_Business_Model.md
├── P2_프로젝트_기획/
│   ├── P2-1_Directory_Structure.md
│   ├── P2-2-1_Requirements.md
│   └── ...
├── P3_프로토타입_제작/
│   └── ...
├── S1_개발_준비/ ~ S5_운영/
│   └── ...
└── 특별단계/
    ├── SP-1_디렉토리_구조_생성.md
    └── SP-2_SAL_GRID_생성.md

        ↓ 빌드 시 번들링

P3_프로토타입_제작/Frontend/Prototype/
└── ordersheets.js                      ← 번들된 JS 파일
```

## 동작 흐름

```
1. 안내문 팝업에서 [확인] 클릭
   └── executeStageAction() 호출

2. STAGE_DATA에서 orderSheetUrl 조회
   └── 예: orderSheetUrl: 'templates/P1-1_Vision_Mission.md'

3. orderSheetUrl에서 키 추출
   └── 'P1-1_Vision_Mission'

4. ORDER_SHEET_TEMPLATES[키]에서 MD 로드
   └── ORDER_SHEET_TEMPLATES['P1-1_Vision_Mission']

5. 워크스페이스(textEditor)에 템플릿 표시
   └── 사용자가 편집 후 Inbox에 발행
```

## 파일 목록 (22개)

### 특별단계 (2개)
| 파일명 | 설명 |
|--------|------|
| SP-1_디렉토리_구조_생성.md | 작업 디렉토리 구조 생성 Order Sheet |
| SP-2_SAL_GRID_생성.md | Project SAL Grid 생성 Order Sheet |

### P1 사업계획 (3개)
| 파일명 | 설명 |
|--------|------|
| P1-1_Vision_Mission.md | Vision & Mission 정의 Order Sheet |
| P1-2_Market_Analysis.md | 시장 분석 Order Sheet |
| P1-3_Business_Model.md | 비즈니스 모델 Order Sheet |

### P2 프로젝트 기획 (8개)
| 파일명 | 설명 |
|--------|------|
| P2-1_Directory_Structure.md | 디렉토리 구조 설계 Order Sheet |
| P2-2-1_Requirements.md | 요구사항 정의 Order Sheet |
| P2-2-2_User_Flows.md | 사용자 흐름 설계 Order Sheet |
| P2-2-3_Workflows.md | 워크플로우 설계 Order Sheet |
| P2-3-1_Design_Guidelines.md | 디자인 가이드라인 Order Sheet |
| P2-3-2_Mockup.md | 목업 제작 Order Sheet |
| P2-3-3_Prototype.md | 프로토타입 설계 Order Sheet |
| P2-4_Database_Design.md | 데이터베이스 설계 Order Sheet |

### P3 프로토타입 제작 (4개)
| 파일명 | 설명 |
|--------|------|
| P3-1-1_Frontend_Prototype.md | 프론트엔드 프로토타입 Order Sheet |
| P3-1-2_Frontend_Pages.md | 프론트엔드 페이지 개발 Order Sheet |
| P3-2_Database.md | 데이터베이스 구축 Order Sheet |
| P3-3_Scripts.md | 스크립트 개발 Order Sheet |

### S 개발단계 (5개)
| 파일명 | 설명 |
|--------|------|
| S1_개발_준비.md | 개발 준비 단계 Order Sheet |
| S2_개발_1차.md | 개발 1차 Order Sheet |
| S3_개발_2차.md | 개발 2차 Order Sheet |
| S4_개발_3차.md | 개발 3차 Order Sheet |
| S5_운영.md | 운영 단계 Order Sheet |

## 빌드 방법

### ordersheets.js 생성 스크립트

```bash
node scripts/generate-ordersheets-js.js
```

### 스크립트 위치
```
scripts/generate-ordersheets-js.js
```

### 스크립트 동작
1. `Order_Sheet_템플릿/` 폴더의 모든 MD 파일 재귀 탐색
2. 파일명(확장자 제외)을 키로, 내용을 값으로 저장
3. `ordersheets.js` 파일 생성

### 생성되는 파일
```
P3_프로토타입_제작/Frontend/Prototype/ordersheets.js
```

### ordersheets.js 구조
```javascript
const ORDER_SHEET_TEMPLATES = {
    'P1-1_Vision_Mission': '# Order Sheet - P1-1 Vision...',
    'P1-2_Market_Analysis': '# Order Sheet - P1-2 Market...',
    // ...
};
```

## Order Sheet 템플릿 작성 가이드

### 기본 구조
```markdown
# Order Sheet - [단계명]

## 작업 지시

**Claude AI에게**: [작업 내용 설명]

---

## 작업 내용

### 1. [작업 항목 1]
[상세 설명]

### 2. [작업 항목 2]
[상세 설명]

---

## 사용자 입력 (필수)

**[입력 항목명]:**
```
[여기에 입력하세요]
```

---

## 결과물 저장 위치

- `[저장 경로]`

---

## 제약 조건

- [제약 사항 1]
- [제약 사항 2]
```

### 작성 원칙
1. **명확한 작업 지시**: Claude AI가 이해할 수 있도록 구체적으로
2. **사용자 입력 섹션**: 사용자가 채워야 할 부분 명시
3. **결과물 경로**: 저장 위치 명확히 지정
4. **제약 조건**: 작업 시 지켜야 할 규칙

## 새 템플릿 추가 방법

1. 해당 폴더에 MD 파일 생성 (예: `P1_사업계획/P1-4_New_Template.md`)
2. 위 작성 가이드에 따라 내용 작성
3. `node scripts/generate-ordersheets-js.js` 실행
4. `index.html`의 STAGE_DATA에 orderSheetUrl 추가
   ```javascript
   'new_stage': {
       stageId: 'new_stage',
       guideUrl: 'guides/P1-4_New_Template.html',
       orderSheetUrl: 'templates/P1-4_New_Template.md',
       // ...
   }
   ```

## 안내문과 Order Sheet 연결

| STAGE_DATA 필드 | 역할 | 예시 |
|-----------------|------|------|
| guideUrl | 안내문 HTML 경로 | `'guides/P1-1_Vision_Mission.html'` |
| orderSheetUrl | Order Sheet MD 경로 | `'templates/P1-1_Vision_Mission.md'` |

### 연결 흐름
```
사이드바 클릭
    ↓
guideUrl → GUIDE_CONTENTS → 안내문 팝업
    ↓
[확인] 클릭
    ↓
orderSheetUrl → ORDER_SHEET_TEMPLATES → 워크스페이스 로드
    ↓
사용자 편집 → Inbox 발행 → Claude Code 처리
```

## 연관 파일

- **스크립트**: `scripts/generate-ordersheets-js.js`
- **번들 파일**: `P3_프로토타입_제작/Frontend/Prototype/ordersheets.js`
- **메인 HTML**: `P3_프로토타입_제작/Frontend/Prototype/index.html`
- **STAGE_DATA**: index.html 내 JavaScript 객체
- **안내문 시스템**: `상황별_안내문/README.md`
