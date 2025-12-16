# Task Instruction - S2C1

## Task ID
S2C1

## Task Name
학습용 콘텐츠 시스템 정비

## Task Goal
학습용 콘텐츠(Books, Tips) 목록을 viewer.html 및 index.html과 동기화

## Prerequisites (Dependencies)
- 없음 (독립 Task)

## Specific Instructions

### 1. 아키텍처 이해 (DB 미사용!)

**핵심 구조:**
```
GitHub (저장소) + jsdelivr (CDN) + Marked.js (렌더링)
= DB 없이 콘텐츠 관리 시스템
```

**참고 문서:** `부수적_고유기능/학습용_Books/학습용_콘텐츠_제공_프로세스.md`

### 2. 콘텐츠 폴더 구조

```
부수적_고유기능/
├── 학습용_콘텐츠/
│   ├── 1. Claude&ClaudeCode사용법/     ← 20편
│   ├── 2. 웹개발 기초지식/             ← 21편
│   └── 3_프로젝트관리방법/             ← AI 도구
│
└── Tips/
    ├── 프로젝트_시작/                  ← 4개
    ├── 설치_실행/                      ← 3개
    ├── 도구_활용/                      ← 4개
    └── ... (총 12 카테고리, 48개)
```

### 3. 목록 동기화 작업

**학습 콘텐츠:**
1. `부수적_고유기능/학습용_Books/viewer.html` - CONTENTS 객체 업데이트
2. `Production/Frontend/index.html` - LEARNING_CONTENTS 배열 업데이트

**Tips:**
1. `Production/Frontend/index.html` - TIPS_CONTENTS 배열 업데이트

### 4. 작업 프로세스

```
[폴더 구조 확인]
        ↓
[실제 MD 파일 목록 추출]
        ↓
[viewer.html CONTENTS 객체 업데이트]
        ↓
[index.html 배열 업데이트]
        ↓
[Git Push → jsdelivr CDN 반영]
```

### 5. 새 콘텐츠 추가 시

1. MD 파일을 적절한 폴더에 저장
2. viewer.html CONTENTS 객체에 추가
3. index.html 배열에 추가 (검색용)
4. Git Push

## Expected Output Files
- `부수적_고유기능/학습용_Books/viewer.html` (CONTENTS 동기화)
- `Production/Frontend/index.html` (LEARNING_CONTENTS, TIPS_CONTENTS 동기화)

## Completion Criteria
- [ ] 학습 콘텐츠 폴더 구조 확인
- [ ] Tips 폴더 구조 확인
- [ ] viewer.html CONTENTS 객체와 실제 파일 동기화
- [ ] index.html LEARNING_CONTENTS 배열 동기화
- [ ] index.html TIPS_CONTENTS 배열 동기화
- [ ] jsdelivr CDN에서 콘텐츠 접근 테스트

## Tech Stack
- GitHub (저장소)
- jsdelivr CDN
- Marked.js (MD 렌더링)
- JavaScript

## Tools
- Read, Write, Glob, Bash

## Execution Type
AI-Only

## Remarks
- **DB 사용하지 않음!** - jsdelivr CDN 방식으로 변경됨
- 콘텐츠 목록은 HTML 파일에 하드코딩
- jsdelivr CDN을 통해 MD 파일 직접 접근
- viewer.html이 Marked.js로 실시간 렌더링

---

## ⚠️ 작업 결과물 저장 2대 규칙

> **이 규칙은 반드시 준수하세요!**

### 제1 규칙: Stage + Area 폴더에 저장
- Task ID의 Stage와 Area에 해당하는 폴더에 저장
- 예: S2C1 → `S2_개발-1차/Content_System/`

### 제2 규칙: Production 코드는 이중 저장
- Frontend 코드는 Stage 폴더 + Production 폴더 둘 다 저장

**Area 폴더 매핑:** M→Documentation, F→Frontend, BI→Backend_Infra, BA→Backend_APIs, D→Database, S→Security, T→Testing, O→DevOps, E→External, C→Content_System
