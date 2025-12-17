# 외부 연동 설정 Guide 제공 프로세스

## 핵심 구조

```
GitHub (저장소) + jsdelivr (CDN) + Marked.js (렌더링)
= DB 없이 서비스 연동 가이드 관리 시스템 완성
```

---

## 1. 시스템 구성 요소

### 1.1 GitHub (저장소)
- **역할**: MD 파일 저장 및 버전 관리
- **위치**: `부수적_고유기능/콘텐츠/외부_연동_설정_Guide/` 폴더
- **장점**:
  - 무료 호스팅
  - 버전 관리 자동
  - 수정 이력 보관

### 1.2 jsdelivr CDN
- **역할**: GitHub 파일을 전 세계에서 빠르게 접근 가능하게 함
- **URL 형식**: `https://cdn.jsdelivr.net/gh/{사용자명}/{저장소명}@{브랜치}/{파일경로}`
- **예시**: `https://cdn.jsdelivr.net/gh/SUNWOONGKYU/SSALWorks@master/부수적_고유기능/콘텐츠/외부_연동_설정_Guide/01_데이터베이스_설정.md`
- **장점**:
  - CORS 문제 해결 (브라우저에서 직접 fetch 가능)
  - 빠른 응답 속도 (전 세계 CDN)
  - 무료

### 1.3 Marked.js (렌더링 라이브러리)
- **역할**: MD(Markdown) → HTML 실시간 변환
- **위치**: index.html에서 CDN으로 로드
- **장점**:
  - 서버 변환 불필요
  - 브라우저에서 즉시 렌더링

### 1.4 index.html (메인 페이지)
- **역할**: 서비스 연동 가이드 목록 표시 + MD 파일 로드 + 모달로 렌더링
- **위치**: `Production/Frontend/index.html`
- **기능**:
  - 사이드바에 서비스 연동 가이드 목록
  - 클릭 시 모달로 가이드 내용 표시
  - MD 파일 fetch → Marked.js로 렌더링

---

## 2. 작동 원리

```
[사용자가 가이드 클릭]
        ↓
[index.html이 jsdelivr CDN URL 생성]
        ↓
[fetch()로 MD 파일 가져오기]
        ↓
[Marked.js가 MD → HTML 변환]
        ↓
[모달에 렌더링]
```

### 상세 흐름

1. **사용자가 사이드바에서 "서비스 연동 설정" 클릭**
2. **가이드 목록 모달 표시**
3. **사용자가 특정 가이드 클릭**
4. **jsdelivr CDN URL로 MD 파일 fetch**
5. **Marked.js가 MD를 HTML로 변환**
6. **상세 모달에 렌더링**

---

## 3. 새 가이드 추가 방법

### 3.1 MD 파일 작성
1. `부수적_고유기능/콘텐츠/외부_연동_설정_Guide/` 폴더에 MD 파일 생성
   - 파일명 형식: `{번호}_{서비스명}_설정.md`
   - 예: `06_SMS_시스템_설정.md`
2. Markdown 형식으로 내용 작성

### 3.2 index.html 업데이트 (Claude Code에게 요청)
**요청 예시:**
```
"부수적_고유기능/콘텐츠/외부_연동_설정_Guide/06_SMS_시스템_설정.md 파일 추가했어.
index.html에 추가해줘."
```

**Claude Code가 업데이트하는 곳:**
1. `Production/Frontend/index.html` - SERVICE_GUIDE_PATHS 객체에 경로 추가
2. `Production/Frontend/index.html` - SERVICE_GUIDE_TITLES 객체에 제목 추가
3. `Production/Frontend/index.html` - 가이드 목록 HTML에 항목 추가

### 3.3 GitHub Push
```bash
git add .
git commit -m "새 서비스 연동 가이드 추가: SMS 시스템 설정"
git push
```

### 3.4 완료
- jsdelivr CDN이 자동으로 새 파일 인식
- index.html에서 바로 접근 가능

---

## 4. 폴더 구조

```
부수적_고유기능/
└── 콘텐츠/
    └── 외부_연동_설정_Guide/
        ├── 외부_연동_설정_Guide_제공_프로세스.md  ← 이 문서
        │
        ├── 01_데이터베이스_설정.md       ← Supabase 프로젝트 + DB + RLS
        ├── 02_회원인증_설정.md           ← Google OAuth + Supabase Auth
        ├── 03_이메일_시스템_설정.md      ← Resend + SMTP + 템플릿
        ├── 04_배포_도메인_설정.md        ← Vercel + DNS 설정
        └── 05_결제_시스템_설정.md        ← 토스 페이먼트
```

**파일 순서 = 설정 순서**
- 번호 순서대로 설정하면 됨
- DB → 인증 → 이메일 → 배포 → 결제

---

## 5. 장점 요약

### 현재 방식 (간단)
```
MD 작성 → index.html 목록 추가 → GitHub Push → 끝
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

## 6. 가이드 작성 규칙

### 6.1 파일명 규칙
- 형식: `{번호}_{서비스명}_설정.md`
- 번호는 2자리 (01, 02, 03...)
- 언더스코어(_)로 단어 구분

### 6.2 내용 구성
1. **개요**: 해당 서비스가 무엇인지, 왜 필요한지
2. **사전 준비**: 필요한 계정, 도구 등
3. **설정 단계**: 스크린샷 포함 단계별 가이드
4. **환경 변수**: 설정해야 할 환경 변수 목록
5. **테스트 방법**: 설정 완료 후 확인 방법
6. **트러블슈팅**: 자주 발생하는 문제와 해결 방법

### 6.3 특징
- **실전 경험 기반**: 직접 설정하면서 겪은 문제들 포함
- **스크린샷 권장**: 가능하면 스크린샷으로 설명
- **복사-붙여넣기 가능**: Claude Code에게 그대로 전달 가능하도록 작성

---

## 7. 주의사항

### 7.1 index.html 업데이트 필수
- 새 MD 파일 추가 시 index.html의 SERVICE_GUIDE_PATHS, SERVICE_GUIDE_TITLES 수정 필요
- Claude Code에게 요청하면 자동 처리

### 7.2 jsdelivr 캐시
- 새 파일 push 후 CDN 반영까지 약간의 시간 소요 가능 (보통 즉시~수분)
- 캐시 강제 갱신: URL에 `?v=버전번호` 추가

### 7.3 민감 정보 주의
- API 키, 비밀번호 등 실제 값은 포함하지 않음
- `YOUR_API_KEY`, `your-password` 같은 플레이스홀더 사용

---

## 8. 빠른 참조

### 새 가이드 추가 시
1. MD 파일 작성 (`{번호}_{서비스명}_설정.md` 형식)
2. Claude Code에게 "index.html에 추가해줘" 요청
3. git push

### 파일 위치
- 가이드: `부수적_고유기능/콘텐츠/외부_연동_설정_Guide/{번호}_{서비스명}_설정.md`
- 메인 페이지: `Production/Frontend/index.html`

### CDN URL 형식
```
https://cdn.jsdelivr.net/gh/SUNWOONGKYU/SSALWorks@master/부수적_고유기능/콘텐츠/외부_연동_설정_Guide/{파일명}
```

### 현재 가이드 목록
| 번호 | 서비스 | 파일명 |
|------|--------|--------|
| 01 | 데이터베이스 (Supabase) | `01_데이터베이스_설정.md` |
| 02 | 회원인증 (Google OAuth) | `02_회원인증_설정.md` |
| 03 | 이메일 (Resend) | `03_이메일_시스템_설정.md` |
| 04 | 배포/도메인 (Vercel) | `04_배포_도메인_설정.md` |
| 05 | 결제 (토스 페이먼트) | `05_결제_시스템_설정.md` |
