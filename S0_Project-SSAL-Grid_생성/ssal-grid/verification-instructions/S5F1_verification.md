# Verification Instruction - S5F1

## Task ID
S5F1

## Task Name
랜딩페이지 최적화

## Verification Checklist

### 1. SEO 메타 태그 검증
- [ ] title 태그
- [ ] meta description
- [ ] meta keywords
- [ ] canonical URL

### 2. Open Graph 태그 검증
- [ ] og:title
- [ ] og:description
- [ ] og:image
- [ ] og:url

### 3. 구조화된 데이터 검증
- [ ] Schema.org WebSite
- [ ] Schema.org Organization

### 4. 성능 최적화 검증
- [ ] 이미지 최적화 (WebP)
- [ ] Lazy loading 적용
- [ ] Critical CSS 인라인

### 5. 파일 검증
- [ ] robots.txt 존재
- [ ] sitemap.xml 존재
- [ ] favicon 존재

### 6. Lighthouse 점수 검증
- [ ] Performance > 90
- [ ] Accessibility > 90
- [ ] Best Practices > 90
- [ ] SEO > 90

## Test Commands
```bash
# 메타 태그 확인
curl https://preview-url | grep -E "(meta|title|og:)"

# robots.txt 확인
curl https://preview-url/robots.txt

# sitemap.xml 확인
curl https://preview-url/sitemap.xml

# Lighthouse 실행
lighthouse https://preview-url --output json
```

## Expected Results
- SEO 최적화 완료
- Lighthouse 점수 90+
- Core Web Vitals 통과

## Verification Agent
frontend-developer

## Pass Criteria
- 모든 메타 태그 존재
- Lighthouse 모든 항목 90+
- robots.txt, sitemap.xml 존재

---

## ⚠️ 저장 위치 검증 항목

### 필수 검증
- [ ] Task ID의 Stage에 맞는 폴더에 저장되었는가? (S1→S1_개발_준비/, S2→S2_개발-1차/, ...)
- [ ] Task ID의 Area에 맞는 폴더에 저장되었는가? (S→Security/, F→Frontend/, ...)
- [ ] Production 관련 코드(F, BA, D)는 Production 폴더에도 저장되었는가?

