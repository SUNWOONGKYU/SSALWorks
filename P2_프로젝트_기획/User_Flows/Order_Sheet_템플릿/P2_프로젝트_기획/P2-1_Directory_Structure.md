# Order Sheet - P2-1 디렉토리 구조 설계

## 작업 지시

**Claude AI에게**: 이 프로젝트의 전체 디렉토리 구조를 설계하고 PROJECT_DIRECTORY_STRUCTURE.md 문서를 작성해주세요.

---

## 작업 내용

### 1. 디렉토리 구조 설계
- SSALWorks 표준 구조 기반 설계
- 프로젝트 특성에 맞는 폴더 구성
- 확장 가능한 구조 고려

### 2. 네이밍 규칙 정의
- 폴더명 규칙 (대분류: 한글, 하위: 영문)
- 파일명 규칙
- 특수 규칙 (있는 경우)

### 3. 문서화
- PROJECT_DIRECTORY_STRUCTURE.md 작성
- 각 폴더의 목적 및 용도 설명

---

## 사용자 입력 (필수)

**프로젝트 유형:**
```
[웹앱/모바일앱/API/풀스택 등]
```

**사용 기술 스택:**
```
[프레임워크, 언어, DB 등]
```

**특별 요구사항 (선택):**
```
[커스텀 폴더 요구사항 있으면 작성]
```

---

## SSALWorks 표준 구조 참조

```
프로젝트명/
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
└── Web_ClaudeCode_Bridge/
```

---

## 결과물 저장 위치

- `PROJECT_DIRECTORY_STRUCTURE.md` (루트)
- `P2_프로젝트_기획/1-1_Project_Plan/Directory_Structure.md`

---

## 제약 조건

- 확장 가능한 구조
- 명확하고 일관된 네이밍
- SSALWorks 표준 준수
