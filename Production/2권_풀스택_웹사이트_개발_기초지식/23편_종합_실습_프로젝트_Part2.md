# 23편 | 종합 실습 프로젝트 Part 2 - JavaScript와 배포

---

20편에서 HTML과 CSS로 포트폴리오의 기본 구조를 완성하고, 이제 JavaScript로 동적 기능을 추가하고 실제 배포까지 마무리하겠습니다. Part 1에서 제작한 정적 웹사이트에 동적 기능을 추가하겠습니다. JavaScript로 인터랙티브한 기능들을 추가하고, Git으로 버전 관리를 하며, 마지막에는 실제 인터넷에 배포하여 전 세계 누구나 접근할 수 있는 웹사이트로 완성하겠습니다. 웹개발 시리즈의 마지막 단계를 진행하겠습니다.

## 프로젝트 완성하기

20편에서 제작한 HTML과 CSS에 JavaScript 기능을 추가하고, 실제로 배포까지 진행하겠습니다.

## STEP 4: JavaScript로 동작 추가하기

### 4-1. script.js - 인터랙티브 기능

```javascript
// 부드러운 스크롤 효과
document.querySelectorAll("a[href^=\"#\"]").forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

// 스크롤 시 네비게이션 바 스타일 변경
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 100) {
        navbar.style.background = "rgba(51, 51, 51, 0.95)";
        navbar.style.backdropFilter = "blur(10px)";
    } else {
        navbar.style.background = "#333";
    }
});

// 프로젝트 카드 클릭 이벤트
const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach(card => {
    card.addEventListener("click", function() {
        const projectTitle = this.querySelector("h3").textContent;
        alert(`${projectTitle}의 상세 페이지로 이동합니다.`);
    });
});

// 폼 제출 처리 (이메일 보내기 시뮬레이션)
const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        // 실제로는 서버로 전송하지만, 여기서는 콘솔에 출력
        console.log("폼 데이터:", { name, email, message });

        alert("메시지가 전송되었습니다.");
        this.reset();
    });
}

// 타이핑 효과
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = "";

    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }

    typing();
}

// 페이지 로드 시 타이핑 효과 실행
window.addEventListener("load", () => {
    const heroTitle = document.querySelector(".hero h1");
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        typeWriter(heroTitle, "안녕하세요. 홍길동입니다", 150);
    }
});

// 프로젝트 데이터 동적 생성
const projects = [
    {
        title: "쇼핑몰 웹사이트",
        description: "React로 만든 온라인 쇼핑몰",
        tech: "React, Node.js, MongoDB"
    },
    {
        title: "날씨 앱",
        description: "실시간 날씨 정보 제공",
        tech: "JavaScript, Weather API"
    },
    {
        title: "포트폴리오 사이트",
        description: "개인 포트폴리오 웹사이트",
        tech: "HTML, CSS, JavaScript"
    }
];

// 프로젝트 카드 동적 생성
function createProjectCards() {
    const projectGrid = document.querySelector(".project-grid");

    if (!projectGrid) return;

    projectGrid.innerHTML = "";

    projects.forEach(project => {
        const card = document.createElement("div");
        card.className = "project-card";

        card.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <p><small>${project.tech}</small></p>
            <a href="#">자세히 보기 →</a>
        `;

        projectGrid.appendChild(card);
    });
}

// 페이지 로드 시 프로젝트 카드 생성
document.addEventListener("DOMContentLoaded", createProjectCards);
```

## STEP 5: 연락처 폼 개선하기

### 5-1. HTML에 폼 추가 (contact 섹션 수정)

```html
<!-- 연락처 섹션 개선 -->
<section id="contact" class="contact">
    <div class="container">
        <h2>Contact</h2>
        <form id="contact-form">
            <input type="text" id="name" placeholder="이름" required>
            <input type="email" id="email" placeholder="이메일" required>
            <textarea id="message" rows="5" placeholder="메시지" required></textarea>
            <button type="submit" class="btn">메시지 보내기</button>
        </form>
    </div>
</section>
```

### 5-2. 폼 스타일 추가 (style.css에 추가)

```css
/* 폼 스타일 */
#contact-form {
    max-width: 600px;
    margin: 0 auto;
}

#contact-form input,
#contact-form textarea {
    width: 100%;
    padding: 12px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
    background: rgba(255, 255, 255, 0.1);
    color: white;
}

#contact-form input::placeholder,
#contact-form textarea::placeholder {
    color: rgba(255, 255, 255, 0.7);
}

#contact-form button {
    width: 100%;
    background: #4CAF50;
    color: white;
}
```

## STEP 6: Git으로 버전 관리하기

### 6-1. Git 초기화와 커밋

```bash
# Git 저장소 만들기
git init

# .gitignore 파일 생성
echo "node_modules/
.DS_Store
*.log" > .gitignore

# 첫 커밋
git add .
git commit -m "첫 번째 커밋: 포트폴리오 사이트 완성"

# GitHub에 저장소 만들고 연결
git remote add origin https://github.com/[username]/my-portfolio.git
git push -u origin main
```

## STEP 7: 배포하기

### 7-1. GitHub Pages로 배포

GitHub Pages는 무료로 정적 웹사이트를 호스팅할 수 있습니다.

1. GitHub에서 새 저장소 만들기
2. 코드 푸시하기
3. Settings → Pages → Source를 main 브랜치로 설정
4. 몇 분 후 `https://[username].github.io/my-portfolio` 에서 확인

### 7-2. Netlify로 배포 (더 쉬운 방법)

1. [netlify.com](https://netlify.com) 접속
2. GitHub 계정으로 로그인
3. "New site from Git" 클릭
4. GitHub 저장소 선택
5. Deploy 클릭
6. 자동으로 배포 완료

## STEP 8: 성능 최적화

### 8-1. 이미지 최적화

```html
<!-- 이미지 지연 로딩 추가 -->
<img src="profile.jpg" loading="lazy" alt="프로필">
```

### 8-2. CSS/JS 파일 압축

```html
<!-- 프로덕션에서는 압축된 파일 사용 -->
<link rel="stylesheet" href="style.min.css">
<script src="script.min.js"></script>
```

## 프로젝트 완성 체크리스트

### 완료한 것들
- [x] HTML 구조 완성
- [x] CSS 스타일링
- [x] 반응형 디자인
- [x] JavaScript 인터랙션
- [x] 부드러운 스크롤
- [x] 동적 콘텐츠 생성
- [x] 폼 처리

### 추가로 할 수 있는 것들
- [ ] 다크 모드 추가
- [ ] 애니메이션 더 추가
- [ ] 블로그 섹션 추가
- [ ] 실제 프로젝트 연결
- [ ] SEO 최적화
- [ ] PWA로 만들기

## 학습 포인트 정리

**이 프로젝트를 통해 배운 것들**:

1. **HTML** (5편): 시맨틱 태그로 구조 만들기
2. **CSS** (6편): 스타일과 레이아웃
3. **JavaScript** (7편): 동적 기능 구현
4. **Git** (9편): 버전 관리
5. **반응형** (7편): 모바일 대응
6. **배포** (19편): 실제 웹에 공개

이제 각자만의 포트폴리오를 제작해보십시오. 학습한 내용을 활용하여 자신만의 독특한 사이트를 제작할 수 있습니다.

## 도움이 되는 리소스

- **무료 이미지**: [Unsplash](https://unsplash.com)
- **아이콘**: [Font Awesome](https://fontawesome.com)
- **색상 팔레트**: [Coolors](https://coolors.co)
- **폰트**: [Google Fonts](https://fonts.google.com)

---

**작성일: 2025-01-01 / 수정일: 2025-12-20 / 글자수: 약 5,800자 / 작성자: Claude / 프롬프터: 써니**
