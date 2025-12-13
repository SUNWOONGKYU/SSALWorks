# Task Instruction - S2C1

## Task ID
S2C1

## Task Name
Books 콘텐츠 업로드

## Task Goal
Claude 사용법 기초 콘텐츠를 데이터베이스에 등록

## Prerequisites (Dependencies)
- S1D1 (DB 스키마 확정) 완료

## Specific Instructions

### 1. 콘텐츠 소스 확인
- 위치: `학습용_콘텐츠/1_Claude_사용법/Claude&ClaudeCode사용법/`
- 이미 작성된 MD 파일 목록 확인

### 2. learning_contents 테이블 구조 확인
```sql
-- 테이블 구조
id, title, category, subcategory, content_path, sort_order, is_premium, created_at, updated_at
```

### 3. 콘텐츠 INSERT SQL 생성
- 위치: `P3_프로토타입_제작/Database/seed_learning_contents.sql`

```sql
-- Claude 사용법 기초 콘텐츠
INSERT INTO learning_contents (title, category, subcategory, content_path, sort_order, is_premium) VALUES
('Claude란 무엇인가', 'Claude_사용법', 'Claude&ClaudeCode사용법', '학습용_콘텐츠/1_Claude_사용법/Claude&ClaudeCode사용법/1편_Claude란_무엇인가.md', 1, false),
('프롬프트 엔지니어링 기초편', 'Claude_사용법', 'Claude&ClaudeCode사용법', '학습용_콘텐츠/1_Claude_사용법/Claude&ClaudeCode사용법/2편_프롬프트_엔지니어링_기초편.md', 2, false),
-- ... 더 많은 콘텐츠
```

### 4. 카테고리 구조
```
1_Claude_사용법/
  └── Claude&ClaudeCode사용법/ (20편)
2_웹개발_지식/
  └── 웹개발 기초지식/ (21편)
3_AI_도구_활용/
  └── Claude_Code/ (고급)
```

### 5. viewer.html의 CONTENTS 객체와 동기화
- `학습용_콘텐츠/viewer.html`의 CONTENTS 객체 참조
- DB 데이터와 일치하도록 동기화

### 6. 콘텐츠 메타데이터 확인
- title: 콘텐츠 제목
- category: 대분류
- subcategory: 중분류
- content_path: jsdelivr CDN 경로용
- sort_order: 정렬 순서
- is_premium: 유료 콘텐츠 여부

## Expected Output Files
- `P3_프로토타입_제작/Database/seed_learning_contents.sql`
- `docs/CONTENT_STRUCTURE.md` (콘텐츠 구조 문서)

## Completion Criteria
- [ ] 모든 기존 콘텐츠 목록 확인
- [ ] INSERT SQL 파일 생성
- [ ] Supabase에서 SQL 실행
- [ ] 데이터 삽입 확인
- [ ] viewer.html과 동기화 확인
- [ ] 콘텐츠 구조 문서화

## Tech Stack
- PostgreSQL (Supabase)
- SQL

## Tools
- Read, Write, Glob
- Supabase SQL Editor

## Execution Type
AI-Only

## Remarks
- 콘텐츠는 MD 파일로 유지 (DB는 메타데이터만)
- jsdelivr CDN을 통해 콘텐츠 접근
- viewer.html이 이미 콘텐츠 표시 기능 구현됨
