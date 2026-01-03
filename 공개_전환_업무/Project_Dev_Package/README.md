# Development Package

SSAL Works 프로젝트 개발을 위한 표준 디렉토리 구조와 AI 작업 규칙을 포함합니다.

---

## 1. 필수 도구 설치

이 패키지를 사용하려면 **먼저 다음 도구를 설치**해야 합니다:

| 도구 | 용도 | 설치 |
|------|------|------|
| **Git** | 버전 관리 | https://git-scm.com |
| **Node.js** | JavaScript 런타임 | https://nodejs.org (LTS 버전) |
| **Claude Code** | AI 개발 어시스턴트 | `npm install -g @anthropic-ai/claude-code` |

---

## 2. 패키지 설치

1. 압축 해제 후 원하는 위치에 폴더 이동
2. 폴더 이름을 프로젝트에 맞게 변경 (예: `MyProject`)
3. 터미널에서 해당 폴더로 이동

---

## 3. 개발 시작

폴더에서 터미널을 열고 Claude Code 실행:

```bash
claude
```

Claude Code가 자동으로:
- 개발 환경 확인 및 설정
- 프로젝트 초기화
- Pre-commit Hook 설치

---

## 4. 패키지 구조

```
Project_Dev_Package/
├── .claude/                       # AI 설정 및 규칙
├── api/                           # 백엔드 API (배포)
├── pages/                         # 프론트엔드 페이지 (배포)
├── assets/                        # 정적 자원 (배포)
├── scripts/                       # 자동화 도구
├── P0_작업_디렉토리_구조_생성/
├── P1_사업계획/
├── P2_프로젝트_기획/
├── P3_프로토타입_제작/
├── S0_Project-SAL-Grid_생성/     # SAL Grid (JSON Method)
├── S1_개발_준비/ ~ S5_개발_마무리/
├── Development_Process_Monitor/   # 진행 상황 모니터
├── Human_ClaudeCode_Bridge/       # Human-AI 협업
├── .ssal-project.json             # 프로젝트 설정
├── .env.sample                    # 환경 변수 템플릿
└── .gitignore
```

---

## 5. 데이터 저장

| 용도 | 방식 | 위치 |
|------|------|------|
| Task 관리 | JSON | `S0_.../method/json/data/` |
| 진행률 표시 | DB (선택) | SSAL Works 연동 시 설정 |

---

## 6. 다음 단계

1. SSAL Works 웹사이트에서 사이드바 확인
2. 현재 단계의 안내문 읽기
3. Order Sheet로 Claude Code에게 작업 지시

---

## 도움말

SSAL Works 웹사이트에서 확인:

- **📚 학습용 Books** - Claude/Claude Code, 풀스택 개발, 프로젝트 관리 (80편)
- **💡 실전 Tips** - 18개 카테고리, 65개 팁
- **🔗 외부 연동 설정 Guide** - Supabase, Vercel, OAuth 등 (5개)
- **☀️ Sunny에게 질문하기** - 1:1 개발/창업/경영 상담
