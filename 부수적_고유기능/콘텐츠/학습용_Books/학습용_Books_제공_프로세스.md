# 학습용 Books 콘텐츠 작성 및 배포 프로세스

> **Claude Code 필독**: 학습용 Books 콘텐츠 작성 요청을 받으면 이 문서를 따라 MD 파일 작성부터 Production 반영까지 완료하세요.

---

## 1. 전체 프로세스 요약 (자동화)

```
[1단계] 카테고리 확인
    ↓
[2단계] MD 파일 작성
    ↓
[3단계] books-list.json에 항목 추가
    ↓
[4단계] node sync-books.js 실행 → 3개 파일 자동 업데이트
    ↓
[5단계] 완료 보고
```

**핵심**: `books-list.json` 하나만 수정하면 스크립트가 3개 파일 자동 동기화!

---

## 2. 1단계: 카테고리 확인

### 2.1 기존 카테고리 목록

| ID | 카테고리명 | 아이콘 | 폴더 |
|----|-----------|--------|------|
| `1_Claude_사용법` | Claude & Claude Code 사용법 | 🤖 | `1. Claude&ClaudeCode사용법` |
| `2_웹개발_지식` | 웹개발 기초지식 | 💻 | `2. 웹개발 기초지식` |
| `3_프로젝트_관리` | 프로젝트 관리 방법 | 📋 | `3권_프로젝트_관리_방법` |

### 2.2 새 카테고리 필요 시

`books-list.json`의 `categories` 배열에 새 객체 추가 (3단계에서 함께 처리)

---

## 3. 2단계: MD 파일 작성

### 3.1 저장 위치

```
부수적_고유기능/콘텐츠/학습용_Books/{카테고리폴더}/{파일명}.md
```

또는 (새 형식):
```
부수적_고유기능/콘텐츠/학습용_Books_New/{카테고리폴더}/{파일명}.md
```

### 3.2 파일명 규칙

- `{번호}편_{제목}.md` 형식 권장
- 한글 사용 가능
- 특수문자 최소화

### 3.3 작성 규칙

- 비개발자 대상 설명식 문장
- 코드 블록 최소화
- SSALWorks 방법론 가치 강조
- 분량 제한 없음 (책 형식)

---

## 4. 3단계: books-list.json에 항목 추가

### 4.1 파일 위치

```
부수적_고유기능/콘텐츠/학습용_Books/books-list.json
```

### 4.2 기존 카테고리에 파일 추가

해당 카테고리의 `files` 배열에 추가:

```json
{
  "id": "1_Claude_사용법",
  "name": "Claude & Claude Code 사용법",
  "icon": "🤖",
  "description": "AI 활용의 기초부터 고급까지",
  "folder": "학습용_Books/1. Claude&ClaudeCode사용법",
  "files": [
    { "name": "1편 - Claude란 무엇인가", "file": "1편_Claude란_무엇인가.md" },
    { "name": "21편 - 새로운 내용", "file": "21편_새로운_내용.md" }
  ]
}
```

**필드 설명:**
- `name`: 뷰어에 표시될 제목
- `file`: 파일명만 (경로 제외)

### 4.3 새 카테고리 추가

`categories` 배열에 새 객체 추가:

```json
{
  "id": "4_새카테고리",
  "name": "새 카테고리 이름",
  "icon": "🆕",
  "description": "카테고리 설명",
  "folder": "학습용_Books/4. 새카테고리",
  "files": [
    { "name": "1편 - 첫 번째 내용", "file": "1편_첫번째_내용.md" }
  ]
}
```

**⚠️ 주의:**
- `id`: 언더스코어 사용, 고유해야 함
- `folder`: 실제 폴더 경로 (basePath 이후)

---

## 5. 4단계: 동기화 스크립트 실행

### 5.1 스크립트 실행

```bash
cd 부수적_고유기능/콘텐츠/학습용_Books
node sync-books.js
```

### 5.2 실행 결과

```
🔄 학습용 Books 동기화 시작...

📄 books-list.json 로드...
   카테고리: 3개
   콘텐츠 파일: 56개

📝 파일 업데이트...
  ✅ 업데이트: viewer.html
  ✅ 업데이트: learning-viewer.html
  ✅ 업데이트: index.html (LEARNING_CONTENTS)

✅ 동기화 완료!
```

### 5.3 자동 업데이트되는 파일

| # | 파일 | 용도 |
|---|------|------|
| 1 | `학습용_Books/viewer.html` | 원본 뷰어 |
| 2 | `Production/learning-viewer.html` | Production 뷰어 |
| 3 | `Production/index.html` | 대시보드 검색/팝업 |

**스크립트가 형식 변환까지 자동 처리!** (CONTENTS 객체, LEARNING_CONTENTS 배열)

---

## 6. 5단계: 완료 보고

작업 완료 후 사용자에게 보고:

```
학습용 Books 콘텐츠 작성 완료:

1. MD 파일 생성: {폴더}/{파일명}.md
2. books-list.json 업데이트 완료
3. sync-books.js 실행 → 3개 파일 자동 동기화 ✅

뷰어에서 "{카테고리명} > {파일 제목}"으로 접근 가능합니다.
```

---

## 7. 시스템 구조

```
GitHub 저장소
    ↓ (push)
jsdelivr CDN (자동 반영)
    ↓ (fetch)
viewer.html (Marked.js로 렌더링)
    ↓
사용자 화면
```

### 파일 관계

```
학습용_Books/
├── books-list.json              ← 단일 소스 (이것만 수정!)
├── sync-books.js                ← 동기화 스크립트
├── viewer.html                  ← 자동 업데이트됨
├── 학습용_Books_제공_프로세스.md ← 이 문서
│
├── 1. Claude&ClaudeCode사용법/  ← 카테고리 1
│   └── *.md
├── 2. 웹개발 기초지식/          ← 카테고리 2
│   └── *.md
└── ...
```

### CDN URL 형식

```
https://cdn.jsdelivr.net/gh/SUNWOONGKYU/SSALWorks@master/부수적_고유기능/콘텐츠/{경로}
```

---

## 8. 체크리스트

학습용 Books 작성 완료 전 확인:

**MD 파일:**
- [ ] 올바른 카테고리 폴더에 저장했는가?
- [ ] 파일명이 `{번호}편_{제목}.md` 형식인가?
- [ ] 비개발자 대상 설명식으로 작성했는가?

**JSON 업데이트:**
- [ ] `books-list.json`에 항목 추가했는가?
- [ ] `folder`가 실제 폴더 경로와 일치하는가?
- [ ] `file`에 파일명만 적었는가? (경로 제외)

**동기화:**
- [ ] `node sync-books.js` 실행했는가?
- [ ] 3개 파일 모두 업데이트 확인했는가?

---

## 9. Production 배포 확인

동기화 후 다음 파일들이 자동 업데이트됩니다:

1. **Production/learning-viewer.html** - 학습 콘텐츠 뷰어
2. **Production/index.html** - 메인 대시보드 (학습 검색 기능)

git push하면 Vercel이 자동 배포하여 메인 화면에 즉시 반영됩니다.
