# 20편 | 종합 실습 프로젝트 Part 1 - 기초 구조와 스타일링

---

마침내 **실습할 시간**이 왔습니다. 19편에서 전체 개발 프로세스의 전체상을 살펴본 후, 이제는 **실제로 구현하는 단계**입니다.

지금까지 학습한 **HTML과 CSS 지식을 실전에 적용**하여, 마치 **요리사가 전체 코스 요리를 완성하듯** 하나의 완성된 개인 포트폴리오 웹사이트를 처음부터 끝까지 만들어보겠습니다.

**오늘의 목표**: 시맨틱 HTML 구조 설계부터 아름다운 CSS 스타일링, 그리고 모바일에서도 **완벽하게 표시되는** 반응형 디자인까지 하나씩 차근차근 구현하겠습니다.

## 프로젝트 소개 - 무엇을 만들지 말씨드리겠습니다

19편까지 학습한 **모든 내용을 활용**하여 마치 **실제 기업의 포트폴리오 사이트**처럼 보이는 사이트를 만들어보겠습니다. 너무 복잡하게 시작하면 **완성하기 전에 지칠 수 있기 때문에**, 핵심 기능만 깔끔하게 구현하는 것이 목표입니다.

**오늘 만들 웹사이트**: 개인 소개 웹사이트
- **자기소개 페이지** - 자신을 소개하는 섹션
- **프로젝트 쇼케이스** (3개) - 제작한 작품들을 소개하는 섹션
- **연락처 정보** - 소통할 수 있는 연락 방법 안내

**Part 1에서 오늘 진행할 내용**:
- **프로젝트 폴더 구조 만들기** - 기초 구조 준비
- **HTML 페이지 작성** - 웹사이트의 기본 구조 설계
- **CSS로 디자인하기** - 시각적 스타일링 적용
- **반응형 만들기** - 데스크톱, 태블릿, 모바일 모든 기기에서 최적화된 디스플레이

## STEP 1: 프로젝트 시작하기 - 준비 단계

### 1-1. 폴더 구조 만들기 - 기본 구조 설정

처음은 **간단하고 깔끔하게** 시작하는 것이 핵심입니다.

```bash
# 프로젝트 폴더 생성
my-portfolio/
├── index.html      # 메인 HTML 파일
├── style.css       # CSS 스타일
├── script.js       # JavaScript 코드
└── images/         # 이미지 폴더
```

**VS Code로 개발 환경 세팅하기**:
1. **VS Code 실행** - 안정적인 작업 환경
2. **File → Open Folder → my-portfolio 선택** - 작업 공간 설정
3. **Live Server 확장 프로그램 설치** - **실시간으로 변경사항을 즉시 확인할 수 있는** 도구입니다. 없으면 매우 불편합니다

## STEP 2: HTML 작성하기

### 2-1. index.html - 기본 구조

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>홍길동 - 포트폴리오</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- 네비게이션 -->
    <nav class="navbar">
        <div class="nav-container">
            <a href="#" class="logo">홍길동</a>
            <ul class="nav-menu">
                <li><a href="#about">소개</a></li>
                <li><a href="#projects">프로젝트</a></li>
                <li><a href="#contact">연락처</a></li>
            </ul>
        </div>
    </nav>

    <!-- 메인 섹션 -->
    <section class="hero">
        <h1>안녕하세요. <span>홍길동</span>입니다</h1>
        <p>웹 개발을 공부하고 있는 학생입니다</p>
        <button class="btn">프로젝트 보기</button>
    </section>

    <!-- 소개 섹션 -->
    <section id="about" class="about">
        <div class="container">
            <h2>About Me</h2>
            <p>웹개발을 배우고 있는 열정적인 학습자입니다.</p>
            <p>HTML, CSS, JavaScript를 공부했고, React를 배우고 있습니다.</p>
        </div>
    </section>

    <!-- 프로젝트 섹션 -->
    <section id="projects" class="projects">
        <div class="container">
            <h2>My Projects</h2>
            <div class="project-grid">
                <div class="project-card">
                    <h3>프로젝트 1</h3>
                    <p>첫 번째 웹사이트</p>
                    <a href="#">자세히 보기</a>
                </div>
                <div class="project-card">
                    <h3>프로젝트 2</h3>
                    <p>투두리스트 앱</p>
                    <a href="#">자세히 보기</a>
                </div>
                <div class="project-card">
                    <h3>프로젝트 3</h3>
                    <p>날씨 정보 앱</p>
                    <a href="#">자세히 보기</a>
                </div>
            </div>
        </div>
    </section>

    <!-- 연락처 섹션 -->
    <section id="contact" class="contact">
        <div class="container">
            <h2>Contact</h2>
            <p>이메일: hong@example.com</p>
            <p>GitHub: github.com/honggildong</p>
        </div>
    </section>

    <script src="script.js"></script>
</body>
</html>
```

## STEP 3: CSS 스타일링

### 3-1. style.css - 디자인 추가하기

```css
/* 기본 리셋 */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* 전체 스타일 */
body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
}

/* 네비게이션 바 */
.navbar {
    background: #333;
    color: white;
    padding: 1rem;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1000;
}

.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    color: white;
    text-decoration: none;
    font-size: 1.5rem;
    font-weight: bold;
}

.nav-menu {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.nav-menu a {
    color: white;
    text-decoration: none;
    transition: color 0.3s;
}

.nav-menu a:hover {
    color: #4CAF50;
}

/* 히어로 섹션 */
.hero {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 200px 20px 100px;
    text-align: center;
}

.hero h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.hero span {
    color: #FFD700;
}

.hero p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
}

.btn {
    background: white;
    color: #667eea;
    padding: 12px 30px;
    border: none;
    border-radius: 25px;
    font-size: 1rem;
    cursor: pointer;
    transition: transform 0.3s;
}

.btn:hover {
    transform: translateY(-3px);
}

/* 섹션 공통 스타일 */
section {
    padding: 80px 20px;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
}

h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 2rem;
    color: #333;
}

/* About 섹션 */
.about {
    background: #f4f4f4;
}

.about p {
    text-align: center;
    max-width: 800px;
    margin: 0 auto 1rem;
    font-size: 1.1rem;
}

/* 프로젝트 섹션 */
.project-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
}

.project-card {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    transition: transform 0.3s;
}

.project-card:hover {
    transform: translateY(-5px);
}

.project-card h3 {
    color: #667eea;
    margin-bottom: 1rem;
}

.project-card p {
    margin-bottom: 1rem;
    color: #666;
}

.project-card a {
    color: #667eea;
    text-decoration: none;
    font-weight: bold;
}

/* 연락처 섹션 */
.contact {
    background: #333;
    color: white;
    text-align: center;
}

.contact h2 {
    color: white;
}

.contact p {
    font-size: 1.1rem;
    margin-bottom: 1rem;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
    .nav-menu {
        flex-direction: column;
        gap: 1rem;
    }

    .hero h1 {
        font-size: 2rem;
    }

    .project-grid {
        grid-template-columns: 1fr;
    }
}
```

## 핵심 정리 - 오늘 진행한 내용

훌륭합니다. Part 1에서 **HTML과 CSS만으로도 완성된 포트폴리오 사이트**를 제작하였습니다.

**오늘 사용한 기술들**:
- **HTML** (5편에서 학습했습니다): 시맨틱 태그로 **의미 있는 구조** 구성
- **CSS** (6편 참고): **아름다운 스타일과 레이아웃** 적용
- **반응형 디자인** (7편 노하우): 어떤 기기에서도 **어울리게 표시되는** 모바일 대응

하지만 아직 **과정이 남아있습니다**. Part 2에서는 JavaScript로 **사이트에 동적 기능을 추가하고**, 실제로 **인터넷에 배포**까지 해서 전 세계 누구나 접근할 수 있도록 만들어보겠습니다.

---

**작성일: 2025-01-01 / 글자수: 5,928자 / 작성자: Claude / 프롬프터: 써니**