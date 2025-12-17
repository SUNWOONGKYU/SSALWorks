# Tips 제공 프로세스

## 핵심 구조

```
GitHub (저장소) + jsdelivr (CDN) + Marked.js (렌더링)
= DB 없이 Tips 관리 시스템 완성
```

---

## 1. 시스템 구성 요소

### 1.1 GitHub (저장소)
- **역할**: MD 파일 저장 및 버전 관리
- **위치**: `부수적_고유기능/콘텐츠/Tips/` 폴더
- **장점**:
  - 무료 호스팅
  - 버전 관리 자동
  - 수정 이력 보관

### 1.2 jsdelivr CDN
- **역할**: GitHub 파일을 전 세계에서 빠르게 접근 가능하게 함
- **URL 형식**: `https://cdn.jsdelivr.net/gh/{사용자명}/{저장소명}@{브랜치}/{파일경로}`
- **예시**: `https://cdn.jsdelivr.net/gh/SUNWOONGKYU/SSALWorks@master/부수적_고유기능/콘텐츠/Tips/프로젝트_시작/...`
- **장점**:
  - CORS 문제 해결 (브라우저에서 직접 fetch 가능)
  - 빠른 응답 속도 (전 세계 CDN)
  - 무료

### 1.3 Marked.js (렌더링 라이브러리)
- **역할**: MD(Markdown) → HTML 실시간 변환
- **위치**: viewer.html에서 CDN으로 로드
- **장점**:
  - 서버 변환 불필요
  - 브라우저에서 즉시 렌더링

### 1.4 viewer.html (뷰어)
- **역할**: Tips 목록 표시 + MD 파일 로드 + 렌더링
- **위치**: `부수적_고유기능/콘텐츠/Tips/viewer.html`
- **기능**:
  - 사이드바에 카테고리별 Tips 목록
  - 검색 기능
  - MD 파일 fetch → Marked.js로 렌더링

---

## 2. 작동 원리

```
[사용자가 Tip 클릭]
        ↓
[viewer.html이 jsdelivr CDN URL 생성]
        ↓
[fetch()로 MD 파일 가져오기]
        ↓
[Marked.js가 MD → HTML 변환]
        ↓
[화면에 렌더링]
```

### 상세 흐름

1. **viewer.html 열림**
2. **CONTENTS 객체에서 Tips 목록 읽기** (하드코딩됨)
3. **사이드바에 카테고리/Tips 목록 표시**
4. **사용자가 Tip 클릭**
5. **jsdelivr CDN URL로 MD 파일 fetch**
6. **Marked.js가 MD를 HTML로 변환**
7. **메인 영역에 렌더링**

---

## 3. 새 Tip 추가 방법

### 3.1 MD 파일 작성
1. 적절한 카테고리 폴더에 MD 파일 생성
   - 예: `부수적_고유기능/콘텐츠/Tips/프로젝트_시작/새로운_팁.md`
2. Markdown 형식으로 내용 작성

### 3.2 viewer.html 업데이트 (Claude Code에게 요청)
**요청 예시:**
```
"부수적_고유기능/콘텐츠/Tips/프로젝트_시작/새로운_팁.md 파일 추가했어.
viewer.html에 추가해줘."
```

**Claude Code가 업데이트하는 곳:**
1. `부수적_고유기능/콘텐츠/Tips/viewer.html` - CONTENTS 객체에 파일 추가
2. `Production/Frontend/index.html` - TIPS_CONTENTS 배열에 추가 (검색용)

### 3.3 GitHub Push
```bash
git add .
git commit -m "새 Tip 추가: 새로운_팁"
git push
```

### 3.4 완료
- jsdelivr CDN이 자동으로 새 파일 인식
- viewer.html에서 바로 접근 가능

---

## 4. 폴더 구조

```
부수적_고유기능/
└── 콘텐츠/
    └── Tips/
        ├── viewer.html                  ← 뷰어 (핵심 파일)
        ├── Tips_제공_프로세스.md        ← 이 문서
        │
        ├── 프로젝트_시작/               ← 카테고리
        │   ├── 작업_디렉터리_구조_먼저_생성하기.md
        │   └── ...
        │
        ├── 설치_실행/                   ← 카테고리
        │   ├── Claude_Code_설치_방법_및_오류_해결.md
        │   └── ...
        │
        ├── 도구_활용/                   ← 카테고리
        ├── 작업_기록_백업/              ← 카테고리
        ├── 세션_관리/                   ← 카테고리
        ├── 검증_문서화/                 ← 카테고리
        ├── 개발_실무/                   ← 카테고리
        ├── 효율적인_소통/               ← 카테고리
        ├── 데이터베이스/                ← 카테고리
        ├── SAL_Grid/                    ← 카테고리
        ├── 트러블슈팅/                  ← 카테고리
        └── 입력_편의/                   ← 카테고리
```

**폴더 구조 = 카테고리 구조**
- 폴더 이름이 곧 카테고리명
- 정리된 폴더 구조 = 정리된 Tips 구조

---

## 5. 장점 요약

### 현재 방식 (간단)
```
MD 작성 → viewer.html 목록 추가 → GitHub Push → 끝
```
- DB 불필요
- 어드민 불필요
- GitHub Actions 불필요
- 간단한 프로세스

### 비용
- **GitHub**: 무료
- **jsdelivr CDN**: 무료
- **Marked.js**: 무료 (MIT 라이선스)
- **서버 비용**: 없음
- **DB 비용**: 없음

---

## 6. 주의사항

### 6.1 viewer.html 업데이트 필수
- 새 MD 파일 추가 시 viewer.html의 CONTENTS 객체에 수동 추가 필요
- Claude Code에게 요청하면 자동 처리

### 6.2 파일명 규칙
- 한글 파일명 가능 (jsdelivr가 URL 인코딩 처리)
- 공백 가능하나 언더스코어(_) 권장
- 특수문자 최소화 권장

### 6.3 jsdelivr 캐시
- 새 파일 push 후 CDN 반영까지 약간의 시간 소요 가능 (보통 즉시~수분)
- 캐시 강제 갱신: URL에 `?v=버전번호` 추가

---

## 7. 빠른 참조

### 새 Tip 추가 시
1. MD 파일 작성 (카테고리 폴더에 저장)
2. Claude Code에게 "viewer.html에 추가해줘" 요청
3. git push

### 파일 위치
- 뷰어: `부수적_고유기능/콘텐츠/Tips/viewer.html`
- 콘텐츠: `부수적_고유기능/콘텐츠/Tips/{카테고리}/{파일명}.md`
- 검색 목록: `Production/Frontend/index.html` (TIPS_CONTENTS)

### CDN URL 형식
```
https://cdn.jsdelivr.net/gh/SUNWOONGKYU/SSALWorks@master/부수적_고유기능/콘텐츠/Tips/{파일경로}
```
