# 11편 | SEO와 웹 접근성

---

검색 엔진에서 찾기 쉽고, 모든 사람이 사용할 수 있는 웹사이트를 만드는 영역입니다. **SEO**는 검색 최적화, **웹 접근성**은 장애인을 포함한 모든 사용자의 접근성을 다룹니다.

---

## SEO의 핵심

### 검색 엔진이 보는 것

```
[사용자] → 검색어 입력 → [검색 엔진] → 웹사이트 순위 결정
                              ↓
                        - 메타 태그
                        - 콘텐츠 품질
                        - 페이지 속도
                        - 모바일 최적화
```

| 요소 | 설명 | 중요도 |
|-----|------|-------|
| 콘텐츠 | 유용하고 고유한 내용 | ⭐⭐⭐⭐⭐ |
| 메타 태그 | 제목, 설명, 키워드 | ⭐⭐⭐⭐ |
| 페이지 속도 | 로딩 시간 | ⭐⭐⭐⭐ |
| 모바일 대응 | 반응형 디자인 | ⭐⭐⭐⭐ |
| HTTPS | 보안 연결 | ⭐⭐⭐ |

---

## 11.1 Language (언어)

### HTML (시맨틱 태그)

시맨틱 태그는 의미를 가진 HTML 태그입니다.

```html
<!-- ❌ 나쁜 예: div만 사용 -->
<div class="header">...</div>
<div class="nav">...</div>
<div class="content">...</div>

<!-- ✅ 좋은 예: 시맨틱 태그 -->
<header>사이트 헤더</header>
<nav>네비게이션</nav>
<main>
    <article>
        <h1>글 제목</h1>
        <section>본문 섹션</section>
    </article>
</main>
<footer>사이트 푸터</footer>
```

**주요 시맨틱 태그:**

| 태그 | 용도 |
|-----|------|
| `<header>` | 페이지/섹션 헤더 |
| `<nav>` | 네비게이션 |
| `<main>` | 주요 콘텐츠 |
| `<article>` | 독립적인 콘텐츠 |
| `<section>` | 콘텐츠 섹션 |
| `<aside>` | 사이드바 |
| `<footer>` | 페이지/섹션 푸터 |

### 메타 태그

```html
<head>
    <!-- 기본 메타 -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- SEO 메타 -->
    <title>SSALWorks - AI 기반 학습 플랫폼</title>
    <meta name="description" content="AI와 함께 성장하는 학습 플랫폼">
    <meta name="keywords" content="AI, 학습, 교육, 플랫폼">

    <!-- Open Graph (소셜 미디어) -->
    <meta property="og:title" content="SSALWorks">
    <meta property="og:description" content="AI 기반 학습 플랫폼">
    <meta property="og:image" content="https://ssalworks.com/og-image.png">
    <meta property="og:url" content="https://ssalworks.com">

    <!-- 트위터 카드 -->
    <meta name="twitter:card" content="summary_large_image">
</head>
```

---

## 11.2~11.3 Runtime, Package Manager

SEO/접근성 영역에서는 별도의 런타임이나 패키지 관리자를 사용하지 않습니다.

---

## 11.4 Tools (도구)

### Lighthouse

Chrome DevTools에 내장된 웹 품질 측정 도구입니다.

**사용법:**
```
1. Chrome DevTools 열기 (F12)
2. Lighthouse 탭 선택
3. "Analyze page load" 클릭
```

**측정 항목:**

| 항목 | 설명 | 목표 점수 |
|-----|------|----------|
| Performance | 로딩 속도 | 90+ |
| Accessibility | 접근성 | 90+ |
| Best Practices | 모범 사례 | 90+ |
| SEO | 검색 최적화 | 90+ |

### WAVE

웹 접근성 평가 도구입니다.

**사용법:**
```
1. https://wave.webaim.org/ 접속
2. URL 입력
3. 접근성 문제 확인
```

**SSALWorks**: Lighthouse + WAVE로 품질을 측정합니다.

---

## 11.5 Library (라이브러리)

### next-seo

Next.js용 SEO 라이브러리입니다.

**설치:**
```bash
npm install next-seo
```

**사용법:**

```tsx
// app/layout.tsx
import { DefaultSeo } from 'next-seo';

export default function RootLayout({ children }) {
    return (
        <html>
            <head>
                <DefaultSeo
                    title="SSALWorks"
                    description="AI 기반 학습 플랫폼"
                    openGraph={{
                        type: 'website',
                        locale: 'ko_KR',
                        url: 'https://ssalworks.com',
                        siteName: 'SSALWorks',
                    }}
                />
            </head>
            <body>{children}</body>
        </html>
    );
}
```

**페이지별 SEO:**

```tsx
// app/about/page.tsx
import { NextSeo } from 'next-seo';

export default function AboutPage() {
    return (
        <>
            <NextSeo
                title="소개 | SSALWorks"
                description="SSALWorks 서비스를 소개합니다"
            />
            <main>...</main>
        </>
    );
}
```

---

## 11.6 Framework (프레임워크)

### Next.js (SEO 기능)

Next.js는 SEO에 최적화된 기능을 제공합니다.

**Metadata API:**

```tsx
// app/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'SSALWorks - 홈',
    description: 'AI 기반 학습 플랫폼',
    keywords: ['AI', '학습', '교육'],
    openGraph: {
        title: 'SSALWorks',
        description: 'AI와 함께 성장하는 학습 플랫폼',
        images: ['/og-image.png'],
    },
};

export default function HomePage() {
    return <main>...</main>;
}
```

**동적 메타데이터:**

```tsx
// app/posts/[id]/page.tsx
export async function generateMetadata({ params }) {
    const post = await getPost(params.id);

    return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            images: [post.thumbnail],
        },
    };
}
```

**sitemap.xml 생성:**

```tsx
// app/sitemap.ts
export default async function sitemap() {
    const posts = await getAllPosts();

    return [
        { url: 'https://ssalworks.com', lastModified: new Date() },
        { url: 'https://ssalworks.com/about', lastModified: new Date() },
        ...posts.map(post => ({
            url: `https://ssalworks.com/posts/${post.id}`,
            lastModified: post.updatedAt,
        })),
    ];
}
```

**SSALWorks**: Next.js Metadata API를 사용합니다.

---

## 11.7 Service (서비스)

### Google Search Console

Google 검색 성능을 모니터링하는 서비스입니다.

**주요 기능:**
- 검색 노출 현황 확인
- 클릭률(CTR) 분석
- 색인 상태 확인
- 사이트맵 제출

**설정 방법:**
```
1. https://search.google.com/search-console 접속
2. 속성 추가 (도메인 또는 URL)
3. 소유권 확인 (DNS 또는 HTML 태그)
4. sitemap.xml 제출
```

### Naver Search Advisor

네이버 검색 최적화 서비스입니다.

**설정 방법:**
```
1. https://searchadvisor.naver.com 접속
2. 사이트 등록
3. 소유권 확인
4. 사이트맵 제출
```

**SSALWorks**: Google Search Console + Naver Search Advisor를 사용합니다.

---

## 웹 접근성 (WCAG)

### WCAG 4대 원칙

| 원칙 | 설명 | 예시 |
|-----|------|------|
| 인식 가능 | 정보를 인식할 수 있어야 함 | 이미지 대체 텍스트 |
| 운용 가능 | 키보드로 조작 가능해야 함 | 키보드 네비게이션 |
| 이해 가능 | 내용을 이해할 수 있어야 함 | 명확한 레이블 |
| 견고함 | 다양한 기술에서 작동해야 함 | 표준 HTML 사용 |

### 접근성 체크리스트

**이미지:**
```html
<!-- 대체 텍스트 필수 -->
<img src="logo.png" alt="SSALWorks 로고">

<!-- 장식용 이미지는 빈 alt -->
<img src="decoration.png" alt="">
```

**폼 요소:**
```html
<!-- label과 input 연결 -->
<label for="email">이메일</label>
<input type="email" id="email" name="email">

<!-- placeholder만으로는 불충분 -->
<input type="email" placeholder="이메일"> <!-- ❌ -->
```

**색상 대비:**
```css
/* 4.5:1 이상의 대비율 필요 */
.text {
    color: #333;      /* 충분한 대비 */
    background: #fff;
}
```

**키보드 접근:**
```css
/* focus 스타일 유지 */
button:focus {
    outline: 2px solid #007bff;
    outline-offset: 2px;
}
```

---

## 정리

| 기술 스택 | SSALWorks 선택 |
|----------|---------------|
| Language | **HTML (시맨틱 태그)**, 메타 태그 |
| Runtime | - |
| Package Manager | - |
| Tools | **Lighthouse**, **WAVE** |
| Library | **next-seo** |
| Framework | **Next.js (Metadata API)** |
| Service | **Google Search Console**, **Naver Search Advisor** |

SEO와 접근성은 모든 사용자를 위한 배려입니다. 다음 편에서는 **성능 최적화**를 알아봅니다.

---

**작성일: 2025-12-21 / 글자수: 약 5,300자 / 작성자: Claude / 프롬프터: 써니**
