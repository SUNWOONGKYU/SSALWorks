# SSAL Works 플랫폼 공개 전환 계획서

작성일: 2025-12-22

---

## 1. GitHub 전략

**결정: Public 유지 + 법적 보호 (당당한 공개)**

- GitHub Private 변경 시 불이익: Stars/Watchers 삭제, Fork 처리 문제 등
- Public 유지하면서 법적 보호 수단 확보:
  - 소프트웨어 등록
  - 상표 등록
  - 필요시 특허 등록
- "당당하게 공개, 뺏길 사람 있으면 뺏겨라" 전략

---

## 2. Google Drive 공유 전략

**결정: 보안 파일 제외하고 업로드**

- Google Drive는 "다운로드, 인쇄, 복사" 한 묶음으로만 제한/허용
- 다운로드 제한하고 싶은 파일은 아예 업로드하지 않음
- 이용자 다운로드 편의성: GitHub보다 Google Drive가 편리

---

## 3. .gitignore 전략

**결정: 그대로 유지**

- .gitignore만으로는 이미 올라간 파일 제외 안 됨 (삭제 필요)
- GitHub를 백업 용도로도 사용하므로 현재 상태 유지
- 공개하기 싫은 파일은 Google Drive에서 제외

---

## 4. 제외 항목

| 항목 | 결정 | 이유 |
|------|------|------|
| .env.example | 불필요 | Google Drive에 안 넣으니까 |
| 키 플레이스홀더 교체 | 불필요 | 업로드 시 해당 파일 제외 |
| README.md 시작 가이드 | 불필요 | 웹사이트 푸터에 이미 있음 |

---

## 5. 일반화 작업 (계획)

다음 항목들을 범용 버전으로 일반화 작업 예정:

1. **CLAUDE.md 일반화**
   - 현재 399줄 → 약 150-200줄 예상
   - SSALWorks 전용 부분 제거/템플릿화
   - 범용 가능 부분 유지 (폴더 생성 금지, 검증/문서화, Production 이중 저장 등)

2. **Order Sheet 템플릿 일반화**
   - SSALWorks 전용 항목 제거
   - 범용 프로젝트에 적용 가능하도록 수정

3. **안내문 일반화**
   - 브랜드명 템플릿화
   - 범용 가이드 형태로 수정

---

## 6. 패키지 정의

### ssalworks development setup package
(SSAL Works 개발 환경 설정 패키지)

---

SSAL Works 플랫폼에서 [닉네임] 개발자 님의
웹사이트 개발 프로젝트를 시작하기 위한
필수적인 폴더와 파일이 들어있는 패키지입니다.

---

**[패키지 내용물]**

폴더:
- 표준 디렉터리 구조 (P0~P3, S0~S5, Production 등)
- .claude 폴더 (CLAUDE.md, commands, skills, subagents, work_logs 등)
- Human_ClaudeCode_Bridge 폴더 (bridge_server.js, Orders, Reports 등)
- Sidebar-Process-Tools 폴더 (사이드바 생성 도구)

파일:
- Project_Directory_Structure.md (프로젝트 디렉터리 구조 안내)
- Project_Status.md (프로젝트 진행 상태 관리)

---

**[추가 설치 안내]**

다음 도구들은 이 패키지에 포함되어 있지 않습니다.
패키지 다운로드 후 Claude Code를 실행하고 설치를 요청하세요.

**1. Git (버전 관리 시스템)**
- 코드 변경 이력을 추적하고 관리하는 도구입니다.
- 여러 버전의 코드를 저장하고, 필요할 때 이전 버전으로 되돌릴 수 있습니다.
- GitHub와 연동하여 코드를 백업하고 공유할 수 있습니다.
- 요청 예시: "Git 설치해 줘"

**2. Node.js (JavaScript 런타임)**
- JavaScript 코드를 컴퓨터에서 실행할 수 있게 해주는 환경입니다.
- 웹 브라우저 없이도 JavaScript를 실행할 수 있습니다.
- 개발 서버 실행, 빌드 도구 사용 등에 필요합니다.
- 요청 예시: "Node.js 설치해 줘"

**3. npm 패키지 (Node Package Manager)**
- 프로젝트에 필요한 외부 라이브러리들을 설치하고 관리합니다.
- package.json 파일에 정의된 모든 패키지를 한 번에 설치합니다.
- npm install 명령어로 설치합니다.
- 요청 예시: "npm 패키지 설치해 줘"

---

**[Claude Code에게 요청하는 방법]**

패키지 다운로드 후 Claude Code를 실행하고 다음과 같이 요청하세요:

```
"프로젝트 개발 환경 설정을 위한 필수 도구 다 설치해 줘"
```

Claude Code가 Git, Node.js 설치 여부를 확인하고,
npm 패키지 설치까지 자동으로 진행합니다.

---

## 7. 브랜드명 표기 규칙

- **올바른 표기**: SSAL Works (띄어쓰기)
- **잘못된 표기**: SSALWorks
- **호칭**: "OOO 개발자 님" (당신 사용 금지)
- **분류**: 플랫폼 (프로젝트 아님)

---

## 작성자

🤖 Generated with [Claude Code](https://claude.com/claude-code)
