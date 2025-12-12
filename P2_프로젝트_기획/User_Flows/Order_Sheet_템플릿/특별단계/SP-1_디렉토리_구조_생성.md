# Order Sheet - SP-1 디렉토리 구조 자동 생성

## 작업 지시

**Claude AI에게**: 새 프로젝트를 위한 표준 디렉토리 구조를 자동 생성해주세요.

---

## 작업 내용

### 1. 표준 디렉토리 구조 생성
- P1~P3 Preliminary 단계 폴더
- S1~S5 Stage 단계 폴더
- 하위 폴더 구조

### 2. 기본 문서 생성
- PROJECT_DIRECTORY_STRUCTURE.md
- PROJECT_STATUS.md
- README.md
- .gitignore

### 3. 설정 파일 생성
- .claude/CLAUDE.md (Claude Code 설정)
- .env.example (환경 변수 템플릿)

---

## 사용자 입력 (필수)

**프로젝트명:**
```
[새 프로젝트 이름]
```

**저장 경로:**
```
[프로젝트를 생성할 디렉토리 경로]
```

**프로젝트 유형:**
```
[예: 웹앱, API, 풀스택 등]
```

---

## SSALWorks 표준 구조

```
[프로젝트명]/
├── P1_사업계획/
├── P2_프로젝트_기획/
│   ├── 1-1_Project_Plan/
│   ├── 1-2_User_Flows/
│   └── 1-3_UI_UX_Design/
├── P3_프로토타입_제작/
│   ├── Frontend/
│   ├── Database/
│   └── Scripts/
├── S1_개발_준비/
├── S2_개발-1차/
├── S3_개발-2차/
├── S4_개발-3차/
├── S5_운영/
├── Web_ClaudeCode_Bridge/
├── .claude/
├── PROJECT_DIRECTORY_STRUCTURE.md
├── PROJECT_STATUS.md
└── README.md
```

---

## 결과물

- 전체 디렉토리 구조
- 기본 문서 파일
- 설정 파일

---

## 제약 조건

- SSALWorks 표준 구조 준수
- 네이밍 규칙 준수 (대분류: 한글, 하위: 영문)
