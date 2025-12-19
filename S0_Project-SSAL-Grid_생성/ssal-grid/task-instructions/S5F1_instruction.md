# Task Instruction - S5F1

---

## 📌 필수 참조 규칙 파일 (2025-12-19)

> **⚠️ 작업 전 반드시 아래 규칙 파일을 확인하세요!**

| 규칙 파일 | 내용 | 참조 시점 |
|----------|------|----------|
| `.claude/rules/01_file-naming.md` | 파일 명명 규칙 | 파일 생성 시 |
| `.claude/rules/02_save-location.md` | 저장 위치 규칙 | 파일 저장 시 |
| `.claude/rules/03_area-stage.md` | Area/Stage 매핑 | 폴더 선택 시 |
| `.claude/rules/05_execution-process.md` | 6단계 실행 프로세스 | 작업 전체 |



## Task ID
S5F1

## Task Name
버그 수정 (프론트엔드)

## Task Goal
SEO 및 성능 최적화된 프로덕션 랜딩페이지 완성

## Prerequisites (Dependencies)
- S1F1 (랜딩페이지 시안) 완료
- S5M1 (출시 체크리스트) 완료

## Specific Instructions

### 1. SEO 메타 태그 최적화
- 위치: `P3_프로토타입_제작/Frontend/Prototype/index.html`

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Primary Meta Tags -->
    <title>SSALWorks - AI와 함께하는 웹개발 학습 플랫폼</title>
    <meta name="title" content="SSALWorks - AI와 함께하는 웹개발 학습 플랫폼">
    <meta name="description" content="Claude AI 튜터와 함께 웹개발을 배우세요. 초보자부터 전문가까지, 맞춤형 학습 경험을 제공합니다.">
    <meta name="keywords" content="웹개발, 프로그래밍, AI학습, Claude, 코딩교육, 온라인강의">
    <meta name="author" content="SSALWorks">
    <meta name="robots" content="index, follow">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://ssalworks.com/">
    <meta property="og:title" content="SSALWorks - AI와 함께하는 웹개발 학습 플랫폼">
    <meta property="og:description" content="Claude AI 튜터와 함께 웹개발을 배우세요. 초보자부터 전문가까지, 맞춤형 학습 경험을 제공합니다.">
    <meta property="og:image" content="https://ssalworks.com/assets/og-image.png">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://ssalworks.com/">
    <meta property="twitter:title" content="SSALWorks - AI와 함께하는 웹개발 학습 플랫폼">
    <meta property="twitter:description" content="Claude AI 튜터와 함께 웹개발을 배우세요.">
    <meta property="twitter:image" content="https://ssalworks.com/assets/og-image.png">

    <!-- Canonical URL -->
    <link rel="canonical" href="https://ssalworks.com/">

    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">

    <!-- Preconnect for performance -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://cdn.jsdelivr.net">
</head>
```

### 2. 구조화된 데이터 (Schema.org)
```html
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "SSALWorks",
    "url": "https://ssalworks.com",
    "description": "AI와 함께하는 웹개발 학습 플랫폼",
    "potentialAction": {
        "@type": "SearchAction",
        "target": "https://ssalworks.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
    }
}
</script>

<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SSALWorks",
    "url": "https://ssalworks.com",
    "logo": "https://ssalworks.com/assets/logo.png",
    "sameAs": [
        "https://twitter.com/ssalworks",
        "https://github.com/ssalworks"
    ]
}
</script>
```

### 3. 성능 최적화

#### 이미지 최적화
```html
<!-- Lazy loading -->
<img src="hero-image.webp"
     alt="SSALWorks 학습 플랫폼"
     loading="lazy"
     width="800"
     height="600">

<!-- WebP with fallback -->
<picture>
    <source srcset="image.webp" type="image/webp">
    <source srcset="image.jpg" type="image/jpeg">
    <img src="image.jpg" alt="Description">
</picture>
```

#### Critical CSS 인라인
```html
<style>
/* Critical CSS - Above the fold */
body { font-family: system-ui, sans-serif; margin: 0; }
.hero { min-height: 100vh; display: flex; align-items: center; }
.hero h1 { font-size: 3rem; }
/* ... */
</style>

<!-- Non-critical CSS -->
<link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="styles.css"></noscript>
```

#### JavaScript 최적화
```html
<!-- Defer non-critical scripts -->
<script src="analytics.js" defer></script>
<script src="animations.js" defer></script>

<!-- Critical scripts -->
<script>
// Inline critical JS
</script>
```

### 4. robots.txt
- 위치: `public/robots.txt`

```txt
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /private/

Sitemap: https://ssalworks.com/sitemap.xml
```

### 5. sitemap.xml
- 위치: `public/sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://ssalworks.com/</loc>
        <lastmod>2024-01-01</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://ssalworks.com/pages/subscription/pricing.html</loc>
        <lastmod>2024-01-01</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://ssalworks.com/pages/learning/index.html</loc>
        <lastmod>2024-01-01</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>
</urlset>
```

### 6. Lighthouse 최적화 목표
```
Performance: > 90
Accessibility: > 90
Best Practices: > 90
SEO: > 90

주요 최적화:
- FCP (First Contentful Paint): < 1.8s
- LCP (Largest Contentful Paint): < 2.5s
- CLS (Cumulative Layout Shift): < 0.1
- TBT (Total Blocking Time): < 200ms
```

### 7. 접근성 최적화
```html
<!-- Skip link -->
<a href="#main-content" class="skip-link">메인 콘텐츠로 건너뛰기</a>

<!-- ARIA labels -->
<nav aria-label="주 메뉴">
    <ul>
        <li><a href="/">홈</a></li>
        <li><a href="/pricing">가격</a></li>
    </ul>
</nav>

<!-- Alt text for images -->
<img src="feature.png" alt="AI 튜터 기능 설명 이미지">

<!-- Form labels -->
<label for="email">이메일</label>
<input type="email" id="email" name="email" required>
```

## Expected Output Files
- `P3_프로토타입_제작/Frontend/Prototype/index.html` (최적화 버전)
- `public/robots.txt`
- `public/sitemap.xml`
- `public/favicon.ico`
- `public/og-image.png`

## Completion Criteria
- [ ] SEO 메타 태그 완성
- [ ] Open Graph 태그 추가
- [ ] 구조화된 데이터 추가
- [ ] 이미지 최적화 (WebP, lazy loading)
- [ ] Critical CSS 인라인
- [ ] robots.txt 생성
- [ ] sitemap.xml 생성
- [ ] Lighthouse 점수 90+ 달성
- [ ] 접근성 점수 90+ 달성

## Tech Stack
- HTML/CSS/JavaScript
- Schema.org

## Tools
- Write, Read
- Bash (Lighthouse CLI)

## Execution Type
AI-Only

## Remarks
- OG 이미지 크기: 1200x630px
- 페이지 로드 목표: 3초 이내
- 모바일 우선 최적화
- Core Web Vitals 기준 충족

---

## ⚠️ 작업 결과물 저장 2대 규칙

> **이 규칙은 반드시 준수하세요!**

### 제1 규칙: Stage + Area 폴더에 저장
- Task ID의 Stage와 Area에 해당하는 폴더에 저장
- 예: S1S1 → `S1_개발_준비/Security/`
- 예: S2F1 → `S2_개발-1차/Frontend/`

### 제2 규칙: Production 코드는 이중 저장
- Frontend, Database, Backend_APIs 코드는 Stage 폴더 + Production 폴더 둘 다 저장
- 문서(Documentation, Security, Testing, DevOps)는 Stage 폴더에만 저장

**Area 폴더 매핑:** M→Documentation, F→Frontend, BI→Backend_Infra, BA→Backend_APIs, D→Database, S→Security, T→Testing, O→DevOps, E→External, C→Content

