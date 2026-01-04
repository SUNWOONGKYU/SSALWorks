# 처음 프로젝트 개발환경설정 가이드

**이 안내는 첫 번째 프로젝트 등록 시에만 표시됩니다.**

두 번째 이후 프로젝트는 이미 개발 환경이 구축되어 있으므로 간단한 폴더 준비만 하면 됩니다.

---

## 왜 개발 환경 설정이 필요한가요?

이 플랫폼은 **내 컴퓨터에서 직접 개발**하는 방식입니다. 3가지가 필요합니다:

| 구성 요소 | 역할 |
|----------|------|
| **Dev Package** | 프로젝트 폴더 + AI 작업 규칙 |
| **개발 도구** (Git, Node.js) | 코드 실행 및 버전 관리 |
| **Claude Code** | AI가 코드 작성 |

한 번만 설치하면 이후 프로젝트에서 다시 설치할 필요 없습니다.

---

## STEP 1: Dev Package 다운로드

### Dev Package 전체 구조

```
Project_Dev_Package/
├── .claude/                          # Claude Code 설정 (AI 작업 규칙)
├── api/                              # 백엔드 API (배포용)
├── assets/                           # 정적 자원 (CSS, JS, 이미지)
├── pages/                            # 프론트엔드 페이지 (배포용)
├── scripts/                          # 자동화 스크립트
├── Development_Process_Monitor/      # 진행률 모니터
├── Human_ClaudeCode_Bridge/          # Human-AI 협업 브릿지
├── P0_작업_디렉토리_구조_생성/        # 프로젝트 상태 문서
├── P1_사업계획/                      # 사업계획
├── P2_프로젝트_기획/                  # 프로젝트 기획
├── P3_프로토타입_제작/                # 프로토타입 제작
├── S0_Project-SAL-Grid_생성/         # SAL Grid 시스템
├── S1_개발_준비/                     # Stage 1: 개발 환경 준비
├── S2_개발-1차/                      # Stage 2: 핵심 기능
├── S3_개발-2차/                      # Stage 3: 확장 기능
├── S4_개발-3차/                      # Stage 4: 고급 기능
├── S5_개발_마무리/                   # Stage 5: 배포/안정화
├── .ssal-project.json                # 프로젝트 설정 파일
├── .env.sample                       # 환경 변수 템플릿
├── .gitignore                        # Git 제외 설정
└── README.md                         # Claude Code용 상세 가이드
```

**총 119개 폴더, 107개 파일** | 상세 설명: `README.md` 참조

### 핵심 폴더 요약

| 폴더 | 역할 |
|------|------|
| `.claude/` | AI 작업 규칙, 7대 규칙, 서브에이전트 정의 |
| `S0_Project-SAL-Grid_생성/` | Task 관리, 진행률 추적 |
| `P0~P3/` | 기획 단계 (사업계획, 프로젝트 기획, 프로토타입) |
| `S1~S5/` | 개발 단계 (11개 Area별 코드 저장) |

### 다운로드

👉 **[파일 다운로드 페이지로 이동](/pages/mypage/downloads.html)**

1. 위 링크에서 Dev Package 다운로드
2. ZIP 파일 압축 해제
3. 원하는 위치에 폴더 이동 (권장: `C:\Projects\내프로젝트명` 또는 `~/Projects/내프로젝트명`)
4. 폴더 이름을 프로젝트에 맞게 변경

---

## STEP 2: 개발 도구 설치

### 2-1. Git 설치

코드 변경 이력을 기록하는 "버전 관리 시스템". 실수로 삭제해도 복구 가능.

**Windows:**
1. https://git-scm.com 방문
2. "Download for Windows" 클릭
3. 설치 (기본값으로 Next)

**Mac:**
```bash
# Homebrew로 설치 (권장)
brew install git

# 또는 Xcode Command Line Tools
xcode-select --install
```

**설치 확인:** `git --version`

---

### 2-2. Node.js 설치

JavaScript를 컴퓨터에서 실행하는 환경. npm(패키지 관리자)도 함께 설치됨.

**Windows / Mac 공통:**
1. https://nodejs.org 방문
2. **LTS 버전** (왼쪽 초록색) 다운로드
3. 설치 (기본값으로 Next)

**설치 확인:** `node --version` / `npm --version`

---

### 2-3. Claude Code 설치

AI 개발 어시스턴트. 터미널에서 코드 작성, 파일 수정, 명령어 실행.

**설치:**
```bash
npm install -g @anthropic-ai/claude-code
```

**설치 확인:** `claude --version`

### Claude Code 사용 요건

| 옵션 | 비용 | 설명 |
|------|------|------|
| **Claude Pro** | $20/월 | claude.ai Pro 구독 시 포함 |
| **Claude Max** | $100/월 | 더 많은 사용량 |
| **API 크레딧** | 사용량 기반 | Anthropic API 키 + 크레딧 충전 |

> 무료 플랜으로는 Claude Code 사용이 **제한**됩니다.

---

## STEP 3: Claude Code로 개발 시작

### 3-1. 터미널 열기

**Windows:**
- 프로젝트 폴더에서 마우스 우클릭 → "터미널에서 열기"
- 또는 폴더 주소창에 `cmd` 입력 후 Enter

**Mac:**
- Finder에서 폴더 우클릭 → "폴더에서 새로운 터미널 열기"
- 또는 Terminal 앱 실행 후 `cd 폴더경로`

### 3-2. .ssal-project.json 확인

다운로드한 폴더 루트에 있는 `.ssal-project.json` 파일을 열어 확인:

```json
{
  "project_id": "YOUR_PROJECT_ID",
  "project_name": "YOUR_PROJECT_NAME",
  "created_at": "",
  "github_repo_url": ""
}
```

> Claude Code 첫 실행 시 자동으로 설정을 도와줍니다.

### 3-3. Claude Code 실행

```bash
claude
```

첫 실행 시:
1. Anthropic 계정 로그인
2. Pro/Max 구독 또는 API 키 연결

### 3-4. 초기화 요청

Claude Code에게 다음과 같이 요청:

```
프로젝트 초기 설정을 진행해줘:
1. .ssal-project.json 파일 확인 및 설정
2. Git 저장소 초기화 여부 확인
3. 필수 폴더 구조 확인
4. 개발 준비 상태 보고
```

---

## Claude Code 자동 초기화 체크리스트

> **Claude Code용**: 사용자가 초기화 요청 시 수행할 작업

### 1. 환경 확인
- [ ] Git 설치 확인 (`git --version`)
- [ ] Node.js 설치 확인 (`node --version`)
- [ ] npm 설치 확인 (`npm --version`)

### 2. 프로젝트 설정
- [ ] `.ssal-project.json` 존재 확인
- [ ] `project_id`, `project_name` 필드가 비어있으면 사용자에게 입력 요청
- [ ] `created_at` 자동 설정 (현재 날짜)

### 3. 폴더 구조 확인
- [ ] `.claude/` 폴더 존재
- [ ] `S0_Project-SAL-Grid_생성/` 폴더 존재
- [ ] Stage 폴더 (S1~S5) 존재

### 4. 초기화 완료 보고
```
프로젝트 초기화 완료!

✅ 프로젝트 ID: {project_id}
✅ 프로젝트명: {project_name}
✅ Git: 초기화됨
✅ 폴더 구조: 정상
✅ 규칙 파일: 로드됨

다음 단계: 진행 프로세스에서 P0부터 시작하세요.
```

---

## STEP 4: 설치 완료 후

컨트롤 데스크로 가서 Claude Code와 함께 개발을 시작하세요.

### 개발 진행 방법

1. **진행 프로세스 확인** - 왼쪽 사이드바
2. **안내문 읽기** - 각 단계별 안내
3. **Order Sheet 전달** - Claude Code에게 작업 지시
4. **결과 확인** - AI 작업 결과 검토

### 개발 프로세스 요약

| 단계 | 내용 |
|------|------|
| **P0~P3** | 기획 (디렉토리, 사업계획, 프로젝트 기획, 프로토타입) |
| **S1~S5** | 본개발 (인증, API, 결제, 배포) |

---

## 도움이 필요하면

- **학습용 Books**, **실전 Tips**, **외부 연동 설정 가이드** 확인
- **AI 튜터**에게 질문하거나 **써니에게 질문하기**
