# Vanilla와 React란 무엇인가

> 웹사이트를 만드는 두 가지 방식을 이해하고, 각각의 특징과 폴더 구조를 알아봅니다.

---

## Vanilla란 무엇인가

Vanilla는 순수하다는 뜻입니다. 바닐라 아이스크림이 아무것도 섞지 않은 기본 맛인 것처럼, Vanilla HTML/JS는 프레임워크 없이 순수 웹 기술만 사용하는 방식입니다.

HTML로 화면 구조를 만들고, CSS로 꾸미고, JavaScript로 동작을 추가합니다. 별도의 설치나 빌드 과정이 없습니다. 파일을 만들면 바로 브라우저에서 열어볼 수 있습니다.

레스토랑으로 비유하면 직접 운영하는 식당입니다. 프랜차이즈 시스템 없이 주인이 원하는 대로 운영합니다. 메뉴를 바꾸고 싶으면 바로 바꿀 수 있습니다.

Vanilla로도 완전한 프로덕션 서비스를 만들 수 있습니다. 수많은 웹사이트가 프레임워크 없이 운영되고 있습니다. 단순하다고 해서 부족한 것이 아닙니다.

---

## Vanilla 폴더 구조

Vanilla 방식에서는 6개 요소가 필요합니다. 4개 폴더와 2개 파일입니다.

### api 폴더 (백엔드 인터페이스)

api는 Application Programming Interface의 약자입니다. 프론트엔드와 백엔드가 대화하는 창구입니다.

Vercel에 배포하면 이 폴더 안의 JavaScript 파일들이 자동으로 API 엔드포인트가 됩니다. 별도의 서버 설정 없이 서버리스 함수로 동작합니다.

폴더명을 바꾸면 안 됩니다. Vercel이 api라는 이름을 인식해서 자동 처리하기 때문입니다.

하위 구조 예시:
- api/Backend_APIs/ - 회원가입, 프로젝트 관리 등 핵심 API
- api/Security/ - 로그인, 로그아웃, 인증 관련
- api/External/ - 외부 서비스(AI, 결제) 연동

### pages 폴더 (화면/페이지)

사용자가 보는 HTML 페이지들을 담습니다. 브라우저에서 직접 열리는 화면입니다.

하위 구조 예시:
- pages/auth/ - 로그인, 회원가입, 비밀번호 찾기
- pages/subscription/ - 구독 관리, 결제
- pages/mypage/ - 마이페이지, 설정

각 HTML 파일이 하나의 화면입니다. signup.html은 회원가입 화면, login.html은 로그인 화면입니다.

### assets 폴더 (정적 자원)

assets는 자산이라는 뜻입니다. 웹사이트를 꾸미고 동작하게 하는 정적 파일들입니다.

하위 구조 예시:
- assets/css/ - 스타일시트 (화면 꾸미기)
- assets/js/ - JavaScript (동작 추가)
- assets/images/ - 이미지, 아이콘
- assets/fonts/ - 글꼴 파일

정적 파일이란 서버에서 가공 없이 그대로 전달되는 파일입니다. 한 번 만들어두면 모든 사용자에게 동일하게 제공됩니다.

### scripts 폴더 (자동화 도구)

scripts는 자동화 도구를 담는 폴더입니다. 배포되는 코드가 아니라 개발 과정에서 사용하는 도구입니다.

예시:
- build-web-assets.js - 여러 파일을 한 번에 빌드
- generate-ordersheets-js.js - Markdown을 JavaScript로 변환

스크립트 저장 원칙:
1. 단일 대상 스크립트 → 해당 폴더에 저장
2. 복수 대상 스크립트 → 루트 scripts/에 저장

### 루트 파일 (index.html, 404.html)

index.html은 메인 페이지입니다. 사용자가 사이트에 접속하면 가장 먼저 보는 화면입니다.

404.html은 에러 페이지입니다. 존재하지 않는 주소로 접속했을 때 보여주는 화면입니다. 404는 HTTP 상태 코드로 "찾을 수 없음"을 의미합니다.

---

## React란 무엇인가

React는 Facebook(현 Meta)이 만든 JavaScript 라이브러리입니다. 화면을 컴포넌트 단위로 쪼개서 만듭니다. 헤더, 사이드바, 버튼 같은 UI 조각을 한 번 만들어두면 여러 곳에서 재사용할 수 있습니다.

레스토랑으로 비유하면 프랜차이즈 시스템입니다. 본사가 제공하는 인테리어 가이드, 조리 매뉴얼, 재고 관리 시스템을 따릅니다. 체계적이지만 그 체계를 배워야 합니다.

React를 사용하려면 학습이 필요합니다. 컴포넌트, JSX 문법, 훅(Hook) 사용법을 알아야 합니다. 빌드 과정도 필요합니다. 코드를 작성한 후 변환 과정을 거쳐야 브라우저에서 실행됩니다.

Next.js는 React를 기반으로 한 프레임워크입니다. React에 라우팅, 서버사이드 렌더링, 이미지 최적화 기능을 추가한 것입니다.

---

## React/Next.js 폴더 구조

React(Next.js) 방식에서는 4개 폴더만 있으면 됩니다. 루트 레벨 파일이 없어 더 깔끔합니다.

### app 폴더 (애플리케이션 핵심)

Next.js 13부터 도입된 App Router 방식의 핵심 폴더입니다. 페이지, API, 레이아웃이 모두 여기 들어갑니다.

Vanilla와 다른 점:
- index.html → app/page.tsx
- 404.html → app/not-found.tsx
- 각 폴더가 URL 경로가 됨 (app/auth/login/page.tsx → /auth/login)

하위 구조 예시:
- app/page.tsx - 메인 페이지
- app/auth/login/page.tsx - 로그인 페이지
- app/api/ - API 라우트 (Vanilla의 api 폴더와 유사)
- app/layout.tsx - 공통 레이아웃 (헤더, 푸터 등)

### components 폴더 (재사용 UI 조각)

컴포넌트는 UI를 작은 조각으로 나눈 것입니다. 한 번 만들어두면 여러 페이지에서 재사용할 수 있습니다.

하위 구조 예시:
- components/Header.tsx - 상단 네비게이션
- components/Sidebar.tsx - 좌측 메뉴
- components/Modal.tsx - 팝업 창
- components/Button.tsx - 버튼

Vanilla에서는 같은 HTML을 여러 파일에 복사해야 하지만, React에서는 컴포넌트를 import해서 재사용합니다.

### public 폴더 (정적 자원)

Vanilla의 assets 폴더와 같은 역할입니다. 이미지, 폰트, 아이콘 같은 정적 파일을 담습니다.

하위 구조 예시:
- public/images/ - 이미지 파일
- public/fonts/ - 글꼴 파일
- public/favicon.ico - 브라우저 탭 아이콘

public 폴더의 파일은 루트 URL로 접근합니다. public/images/logo.png는 /images/logo.png로 접근합니다.

### lib 폴더 (유틸리티와 설정)

lib는 library의 줄임말입니다. 여러 곳에서 공통으로 사용하는 유틸리티와 설정을 담습니다.

하위 구조 예시:
- lib/supabase.ts - Supabase 클라이언트 설정
- lib/utils.ts - 공통 유틸리티 함수
- lib/api-client.ts - API 호출 함수

Vanilla에서는 각 파일에서 직접 설정을 작성하지만, React에서는 lib에 한 번 작성하고 import해서 사용합니다.

---

## React 보안 이슈 (2025년 12월)

2025년 12월, React Server Components에서 치명적 취약점이 발견되었습니다. CVE-2025-55182, 일명 React2Shell입니다. CVSS 10.0 등급으로 가장 심각한 수준입니다.

이 취약점은 인증 없이 서버에서 원격 코드 실행(RCE)이 가능합니다. 기본 설정 상태의 Next.js 앱도 공격 대상이 됩니다. HTTP 요청 하나로 서버를 장악할 수 있습니다.

공개 직후 중국 연계 해커 그룹들이 실제 공격을 시작했습니다. Wiz 조사에 따르면 클라우드 환경의 39%가 이 취약점에 노출되어 있습니다.

Vanilla HTML/JS로 만든 사이트는 이 취약점과 무관합니다. React Server Components를 사용하지 않기 때문입니다.

프레임워크를 사용하면 편리하지만, 이런 보안 위험도 함께 가져갑니다. 단순한 사이트라면 Vanilla로 유지하는 것이 보안 측면에서도 유리할 수 있습니다.

---

## SSALWorks 방법론과의 연결

SSALWorks에서는 현재 Vanilla를 사용합니다. 프로젝트 특성상 Vanilla로 충분하기 때문입니다.

Vanilla든 React든 도구일 뿐입니다. 중요한 것은 프로젝트를 완성하는 것입니다. SAL Grid로 작업 순서를 관리하고, 폴더 규칙으로 파일을 정리하고, 검증 프로세스로 품질을 확인합니다.

도구가 바뀌어도 방법론은 그대로입니다. 도구는 손이고, 방법론은 두뇌입니다.

---

*다음 편: Vanilla에서 React로 전환하는 경우*
*참고: Human_ClaudeCode_Bridge/Reports/Folder_Structure_Comparison.md*
