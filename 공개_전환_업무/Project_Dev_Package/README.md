# Development Package

SSAL Works 프로젝트 개발을 위한 표준 디렉토리 구조와 AI 작업 규칙을 포함합니다.

---

## 1. 필수 도구 설치

이 패키지를 사용하려면 **먼저 다음 도구를 설치**해야 합니다:

| 도구 | 용도 | 설치 방법 |
|------|------|----------|
| **Git** | 버전 관리 | https://git-scm.com 에서 다운로드 |
| **Node.js** | JavaScript 런타임 | https://nodejs.org 에서 LTS 버전 다운로드 |
| **Claude Code** | AI 개발 어시스턴트 | 터미널에서 `npm install -g @anthropic-ai/claude-code` 실행 |

---

## 2. 패키지 설치

1. 다운로드한 압축 파일 해제
2. 폴더 이름을 프로젝트에 맞게 변경 (예: `MyProject`)
3. 원하는 위치로 폴더 이동

---

## 3. 개발 시작

### Step 1: 터미널 열기

- **Windows**: 폴더에서 우클릭 → "터미널에서 열기" 또는 주소창에 `cmd` 입력
- **Mac**: 폴더에서 우클릭 → "폴더에서 새로운 터미널 열기"

### Step 2: Claude Code 실행

```bash
claude
```

### Step 3: 자동 초기화

Claude Code가 자동으로 다음을 수행합니다:
- 개발 환경 확인 및 설정
- 프로젝트 초기화
- Pre-commit Hook 설치

---

## 4. 패키지 구조

### 개발 프로세스 폴더 (순서대로 진행)

```
├── P0_작업_디렉토리_구조_생성/    # Step 1: 폴더 구조 만들기
├── P1_사업계획/                  # Step 2: 사업 계획 작성
├── P2_프로젝트_기획/              # Step 3: 기능/화면 기획
├── P3_프로토타입_제작/            # Step 4: 프로토타입 만들기
├── S0_Project-SAL-Grid_생성/     # Step 5: Task 목록 생성
├── S1_개발_준비/                 # Step 6: 개발 환경 설정
├── S2_개발-1차/                  # Step 7: 인증/회원가입
├── S3_개발-2차/                  # Step 8: AI 연동
├── S4_개발-3차/                  # Step 9: 결제/관리자
└── S5_개발_마무리/               # Step 10: QA/배포
```

### 배포용 폴더 (자동으로 생성됨)

```
├── api/                         # 백엔드 API 코드
├── pages/                       # 프론트엔드 페이지
└── assets/                      # 이미지, CSS, JS 등
```

### 설정 및 도구 폴더

```
├── .claude/                     # AI 작업 규칙 (수정 X)
├── scripts/                     # 자동화 스크립트
├── Development_Process_Monitor/  # 진행률 확인
├── Human_ClaudeCode_Bridge/      # Claude Code와 파일 주고받기
├── .ssal-project.json           # 프로젝트 설정 (자동 생성)
├── .env.sample                  # 환경 변수 템플릿
└── .gitignore                   # Git 제외 파일 목록
```

---

## 5. 작업 흐름

```
1. SSAL Works 웹사이트 (www.ssalworks.ai.kr) 접속
        ↓
2. 왼쪽 사이드바에서 현재 단계 확인 (P0 → P1 → ... → S5)
        ↓
3. 해당 단계의 "안내문" 읽기 (무엇을 해야 하는지 설명)
        ↓
4. "Order Sheet"를 Claude Code에게 전달
        ↓
5. Claude Code가 작업 수행
        ↓
6. 다음 단계로 이동
```

---

## 6. 데이터 저장

| 용도 | 방식 | 위치 |
|------|------|------|
| Task 관리 | JSON | `S0_.../method/json/data/` |
| 진행률 표시 | DB (선택) | SSAL Works 연동 시 설정 |

---

## 7. 도움이 필요할 때

SSAL Works 웹사이트에서 확인:

- **📚 학습용 Books** - Claude/Claude Code, 풀스택 개발, 프로젝트 관리 (80편)
- **💡 실전 Tips** - 18개 카테고리, 65개 팁
- **🔗 외부 연동 설정 Guide** - Supabase, Vercel, OAuth 등 (5개)
- **☀️ Sunny에게 질문하기** - 1:1 개발/창업/경영 상담

---

## 자주 묻는 질문

### Q: 어디서 시작해야 하나요?
**A:** SSAL Works 웹사이트 사이드바에서 P0부터 시작하세요. 각 단계마다 안내문이 있습니다.

### Q: Claude Code가 뭔가요?
**A:** Anthropic이 만든 AI 개발 어시스턴트입니다. 터미널에서 `claude` 명령어로 실행합니다.

### Q: Order Sheet가 뭔가요?
**A:** Claude Code에게 작업을 지시하는 문서입니다. 복사해서 붙여넣기만 하면 됩니다.

### Q: 코딩을 몰라도 되나요?
**A:** 네. Claude Code가 코드를 작성합니다. 여러분은 지시만 하면 됩니다.
