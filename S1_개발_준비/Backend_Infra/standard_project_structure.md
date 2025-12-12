# 표준 프로젝트 디렉토리 구조 및 기본 파일

## 개요
새 프로젝트 추가 시 자동으로 생성되는 표준 디렉토리 구조와 각 폴더에 포함될 기본 파일들의 명세입니다.

---

## 전체 디렉토리 구조

```
프로젝트명/
├── .claude/                          # Claude Code 설정
│   ├── CLAUDE.md                     # Claude Code 프로젝트 지침
│   └── commands/                     # 커스텀 슬래시 커맨드
│       └── .gitkeep
├── P1_사업계획/
│   ├── README.md
│   ├── 0-1_Vision_Mission/
│   │   ├── README.md
│   │   ├── GUIDE.md
│   │   └── .gitkeep
│   ├── 0-2_Market_Analysis/
│   │   ├── README.md
│   │   ├── GUIDE.md
│   │   └── .gitkeep
│   └── 0-3_Business_Model/
│       ├── README.md
│       ├── GUIDE.md
│       └── .gitkeep
├── 1_기획/
│   ├── README.md
│   ├── 1-1_Project_Plan/
│   │   ├── README.md
│   │   ├── GUIDE.md
│   │   └── .gitkeep
│   ├── 1-2_UI_UX_Design/
│   │   ├── README.md
│   │   ├── GUIDE.md
│   │   ├── Mockup/
│   │   └── .gitkeep
│   └── 1-3_Database_Design/
│       ├── README.md
│       ├── GUIDE.md
│       └── .gitkeep
├── 2_개발준비/
│   ├── README.md
│   ├── 2-1_Tech_Stack/
│   │   ├── README.md
│   │   ├── GUIDE.md
│   │   └── .gitkeep
│   ├── 2-2_Architecture/
│   │   ├── README.md
│   │   ├── GUIDE.md
│   │   └── .gitkeep
│   ├── 2-3_Development_Setup/
│   │   ├── README.md
│   │   ├── GUIDE.md
│   │   └── .gitkeep
│   └── 2-4_Project_Grid/
│       ├── README.md
│       ├── GUIDE.md
│       └── .gitkeep
├── 3_개발/
│   ├── README.md
│   ├── 3-1_Frontend/
│   │   ├── README.md
│   │   ├── GUIDE.md
│   │   └── .gitkeep
│   ├── 3-2_Engines/
│   │   ├── README.md
│   │   ├── GUIDE.md
│   │   └── .gitkeep
│   ├── 3-3_Authentication/
│   │   ├── README.md
│   │   ├── GUIDE.md
│   │   └── .gitkeep
│   ├── 3-4_Backend_Infrastructure/
│   │   ├── README.md
│   │   ├── GUIDE.md
│   │   └── .gitkeep
│   ├── 3-5_Backend_APIs/
│   │   ├── README.md
│   │   ├── GUIDE.md
│   │   └── .gitkeep
│   ├── 3-6_Database/
│   │   ├── README.md
│   │   ├── GUIDE.md
│   │   └── .gitkeep
│   ├── 3-7_External_Services/
│   │   ├── README.md
│   │   ├── GUIDE.md
│   │   └── .gitkeep
│   ├── 3-8_Test/
│   │   ├── README.md
│   │   ├── GUIDE.md
│   │   └── .gitkeep
│   ├── 3-9_Deployment/
│   │   ├── README.md
│   │   ├── GUIDE.md
│   │   └── .gitkeep
│   └── 3-10_Stabilization/
│       ├── README.md
│       ├── GUIDE.md
│       └── .gitkeep
├── 4_운영/
│   ├── README.md
│   ├── 4-1_Monitoring/
│   │   ├── README.md
│   │   ├── GUIDE.md
│   │   └── .gitkeep
│   ├── 4-2_Maintenance/
│   │   ├── README.md
│   │   ├── GUIDE.md
│   │   └── .gitkeep
│   ├── 4-3_Backup/
│   │   ├── README.md
│   │   ├── GUIDE.md
│   │   └── .gitkeep
│   └── 4-4_Security/
│       ├── README.md
│       ├── GUIDE.md
│       └── .gitkeep
├── Web_ClaudeCode_Bridge/
│   ├── README.md
│   ├── Inbox/
│   │   ├── README.md
│   │   └── .gitkeep
│   ├── Outbox/
│   │   ├── README.md
│   │   └── .gitkeep
│   ├── node_modules/          # npm install 실행 시 자동 생성 (Git 제외)
│   ├── inbox_server.js
│   ├── inbox_watcher.js
│   ├── outbox_watcher.js
│   ├── package.json
│   ├── package-lock.json      # npm install 실행 시 자동 생성
│   └── .env.example
├── 학습용_콘텐츠/
│   ├── README.md
│   └── .gitkeep
├── .gitignore                 # Git 제외 파일 목록
├── README.md
└── PROJECT_STRUCTURE.md
```

---

## 기본 파일 내용

### 루트 레벨 파일

#### `.claude/CLAUDE.md`
```markdown
# CLAUDE.md

이 파일은 Claude Code가 프로젝트를 이해하는데 필요한 지침을 제공합니다.

## 프로젝트 개요
[프로젝트 설명을 입력하세요]

## 기술 스택
- Frontend:
- Backend:
- Database:
- 기타:

## 개발 가이드
- 코드 스타일:
- 커밋 컨벤션:
- 브랜치 전략:

## 특이사항
[프로젝트 특수 요구사항을 입력하세요]
```

#### `README.md` (루트)
```markdown
# [프로젝트명]

## 프로젝트 소개
[프로젝트 설명]

## 디렉토리 구조
- `P1_사업계획/`: 비전, 미션, 시장 분석, 비즈니스 모델
- `1_기획/`: 프로젝트 계획, UI/UX, DB 설계
- `2_개발준비/`: 기술 스택, 아키텍처, 개발 환경
- `3_개발/`: 실제 개발 코드 및 테스트
- `4_운영/`: 모니터링, 유지보수, 백업, 보안
- `Web_ClaudeCode_Bridge/`: Claude Code 연동 폴더

## 시작하기

### 1. Claude Code 실행
\`\`\`bash
cd [프로젝트 경로]
claude
\`\`\`

### 2. Order Sheet 작성
- SSAL Works 대시보드에서 Order Sheet 작성
- `Web_ClaudeCode_Bridge/Inbox/`에 자동 저장

### 3. 결과 확인
- `Web_ClaudeCode_Bridge/Outbox/`에서 Claude Code 응답 확인

## 라이선스
[라이선스 정보]
```

#### `.gitignore`
```gitignore
# Node.js
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Build outputs
dist/
build/
*.log

# Temporary files
*.tmp
temp/
tmp/

# Claude Code
.claude/sessions/
```

#### `PROJECT_STRUCTURE.md`
```markdown
# 프로젝트 디렉토리 구조

이 문서는 프로젝트의 표준 디렉토리 구조를 설명합니다.

## 대분류 (Major Phases)

### P1_사업계획
비즈니스 관련 문서 및 전략

### 1_기획
프로젝트 기획 및 설계 문서

### 2_개발준비
개발 환경 및 인프라 설정

### 3_개발
실제 개발 코드

### 4_운영
운영 및 유지보수

## Web_ClaudeCode_Bridge
Claude Code와의 통신을 위한 폴더

- **Inbox/**: Order Sheet 저장
- **Outbox/**: Claude Code 응답 저장

## 학습용_콘텐츠
프로젝트 관련 학습 자료 및 문서
```

---

### 각 대분류 폴더의 README.md 템플릿

#### `P1_사업계획/README.md`
```markdown
# 사업계획 (Business Planning)

## 목적
프로젝트의 비즈니스 측면을 정의하고 계획합니다.

## 포함 내용
- **0-1_Vision_Mission**: 비전과 미션 정의
- **0-2_Market_Analysis**: 시장 분석 및 경쟁사 분석
- **0-3_Business_Model**: 수익 모델 및 비즈니스 전략

## 작업 순서
1. 비전/미션 수립
2. 시장 조사 및 분석
3. 비즈니스 모델 설계
```

#### `1_기획/README.md`
```markdown
# 기획 (Planning)

## 목적
프로젝트의 기술적 기획 및 설계를 수행합니다.

## 포함 내용
- **1-1_Project_Plan**: 프로젝트 전체 계획
- **1-2_UI_UX_Design**: 사용자 인터페이스 및 경험 설계
- **1-3_Database_Design**: 데이터베이스 스키마 설계

## 작업 순서
1. 프로젝트 범위 및 일정 수립
2. UI/UX 설계 및 프로토타입
3. 데이터베이스 ERD 작성
```

#### `2_개발준비/README.md`
```markdown
# 개발준비 (Development Setup)

## 목적
개발 환경 및 인프라를 구축합니다.

## 포함 내용
- **2-1_Tech_Stack**: 기술 스택 선정
- **2-2_Architecture**: 시스템 아키텍처 설계
- **2-3_Development_Setup**: 개발 환경 설정
- **2-4_Project_Grid**: 프로젝트 관리 그리드

## 작업 순서
1. 기술 스택 선정 및 검증
2. 시스템 아키텍처 설계
3. 로컬 개발 환경 구축
4. 프로젝트 그리드 설정
```

#### `3_개발/README.md`
```markdown
# 개발 (Development)

## 목적
실제 프로덕트를 개발합니다.

## 포함 내용
- **3-1_Frontend**: 프론트엔드 코드
- **3-2_Engines**: 핵심 비즈니스 로직
- **3-3_Authentication**: 인증 시스템
- **3-4_Backend_Infrastructure**: 백엔드 인프라
- **3-5_Backend_APIs**: API 개발
- **3-6_Database**: 데이터베이스 구현
- **3-7_External_Services**: 외부 서비스 연동
- **3-8_Test**: 테스트 코드
- **3-9_Deployment**: 배포 설정
- **3-10_Stabilization**: 안정화 작업

## 개발 가이드
- 코드 리뷰 필수
- 테스트 커버리지 80% 이상 유지
- 문서화 철저히
```

#### `4_운영/README.md`
```markdown
# 운영 (Operations)

## 목적
서비스 운영 및 유지보수를 수행합니다.

## 포함 내용
- **4-1_Monitoring**: 모니터링 및 로깅
- **4-2_Maintenance**: 유지보수 작업
- **4-3_Backup**: 백업 및 복구
- **4-4_Security**: 보안 관리

## 운영 가이드
- 일일 모니터링 체크
- 주간 백업 확인
- 월간 보안 점검
```

---

### Web_ClaudeCode_Bridge 폴더

#### `Web_ClaudeCode_Bridge/README.md`
```markdown
# Web_ClaudeCode_Bridge

Claude Code와 대시보드 간의 통신을 담당하는 폴더입니다.

## 폴더 구조

- **Inbox/**: 대시보드에서 작성한 Order Sheet가 저장됩니다
- **Outbox/**: Claude Code의 작업 결과가 저장됩니다

## 서버 실행

\`\`\`bash
cd Web_ClaudeCode_Bridge
npm install
node inbox_server.js
\`\`\`

## 환경 변수 설정

\`.env\` 파일을 생성하고 다음 변수를 설정하세요:

\`\`\`
OPENAI_API_KEY=your_openai_api_key
GEMINI_API_KEY=your_gemini_api_key
PERPLEXITY_API_KEY=your_perplexity_api_key
\`\`\`
```

#### `Web_ClaudeCode_Bridge/Inbox/README.md`
```markdown
# Inbox

## 용도
SSAL Works 대시보드에서 작성한 Order Sheet가 이 폴더에 자동 저장됩니다.

## 파일 형식
- 파일명: `ordersheet_YYYY-MM-DD_HH-mm-ss.md`
- 형식: Markdown

## 주의사항
- 이 폴더의 파일을 직접 수정하지 마세요
- Claude Code가 자동으로 모니터링합니다
```

#### `Web_ClaudeCode_Bridge/Outbox/README.md`
```markdown
# Outbox

## 용도
Claude Code의 작업 완료 결과가 이 폴더에 저장됩니다.

## 내용
- 생성된 코드
- 분석 결과
- 테스트 결과
- 문서

## 사용법
대시보드의 "Load from Outbox" 버튼으로 결과를 확인할 수 있습니다.
```

#### `Web_ClaudeCode_Bridge/package.json`
```json
{
  "name": "web-claudecode-bridge",
  "version": "1.0.0",
  "description": "Bridge between SSAL Works Dashboard and Claude Code",
  "main": "inbox_server.js",
  "scripts": {
    "start": "node inbox_server.js",
    "watch:inbox": "node inbox_watcher.js",
    "watch:outbox": "node outbox_watcher.js"
  },
  "dependencies": {
    "express": "^4.18.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.0",
    "chokidar": "^3.5.0"
  }
}
```

#### `Web_ClaudeCode_Bridge/.env.example`
```env
# OpenAI API Key
OPENAI_API_KEY=your_openai_api_key_here

# Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here

# Perplexity API Key
PERPLEXITY_API_KEY=your_perplexity_api_key_here

# Server Port
PORT=3030
```

---

### 각 소분류 폴더의 기본 파일

#### `GUIDE.md` 템플릿 (예: 1-2_UI_UX_Design/GUIDE.md)
```markdown
# UI/UX Design 작업 가이드

## 작업 목표
사용자 중심의 직관적인 인터페이스 설계

## 작업 순서

1. **사용자 리서치**
   - 타겟 사용자 정의
   - 사용자 페르소나 작성

2. **정보 아키텍처**
   - 사이트맵 작성
   - 사용자 플로우 설계

3. **와이어프레임**
   - 저해상도 와이어프레임
   - 고해상도 와이어프레임

4. **프로토타입**
   - 인터랙티브 프로토타입 제작
   - 사용성 테스트

5. **최종 디자인**
   - 비주얼 디자인 완성
   - 디자인 시스템 구축

## 산출물
- 와이어프레임
- 프로토타입
- 디자인 파일
- 디자인 가이드

## 참고 자료
- [UI/UX 디자인 베스트 프랙티스]
- [디자인 시스템 예시]
```

---

## 파일 생성 우선순위

### 1단계: 필수 파일
- `.claude/CLAUDE.md`
- 루트 `README.md`
- `.gitignore`
- `PROJECT_STRUCTURE.md`

### 2단계: 대분류 README
- `P1_사업계획/README.md`
- `1_기획/README.md`
- `2_개발준비/README.md`
- `3_개발/README.md`
- `4_운영/README.md`

### 3단계: 소분류 파일
- 각 소분류의 `README.md`
- 각 소분류의 `GUIDE.md`
- 각 소분류의 `.gitkeep`

### 4단계: Web_ClaudeCode_Bridge
- `Web_ClaudeCode_Bridge/` 관련 파일 전체
- Node.js 서버 파일들

---

## 다음 단계

1. Node.js 스크립트 작성 (디렉토리 자동 생성)
2. 대시보드에 "새 프로젝트 추가" 기능 구현
3. 템플릿 파일 자동 생성 로직 구현
