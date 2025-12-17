# SQL 직접 실행해야 할 경우

## 핵심 요약

Claude Code가 SQL 작업을 직접 할 수 없는 경우가 있습니다. 테이블 생성, RLS 정책 설정, 인덱스 추가 등은 Supabase SQL Editor에서 직접 실행해야 합니다. Claude Code에게 SQL을 작성하게 하고 사용자가 직접 실행하는 방식으로 진행하세요.

## Claude Code가 직접 실행할 수 없는 작업

### 직접 실행 필요 목록

| 작업 유형 | 예시 | 이유 |
|----------|------|------|
| DDL (스키마 변경) | CREATE TABLE, ALTER TABLE | 관리자 권한 필요 |
| RLS 정책 | CREATE POLICY, ALTER POLICY | 보안 관련 |
| 인덱스 | CREATE INDEX | DB 구조 변경 |
| 함수/트리거 | CREATE FUNCTION, CREATE TRIGGER | 서버사이드 코드 |
| 권한 설정 | GRANT, REVOKE | 보안 관련 |
| Extension | CREATE EXTENSION | 시스템 설정 |

### Claude Code가 할 수 있는 작업

| 작업 유형 | 가능 여부 | 방법 |
|----------|----------|------|
| SQL 작성 | ✅ 가능 | 코드 생성 |
| 파일 저장 | ✅ 가능 | .sql 파일 생성 |
| 문법 검증 | ✅ 가능 | 리뷰 |
| 실행 | ❌ 불가 | 사용자 직접 실행 |

## 작업 흐름

### 1단계: Claude Code에게 SQL 작성 요청

```
"users 테이블 생성 SQL 작성해줘.
- id: UUID (PK)
- email: VARCHAR(255) UNIQUE
- created_at: TIMESTAMP
- profile: JSONB"
```

### 2단계: SQL 파일 확인

```sql
-- Claude Code가 생성한 SQL
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  profile JSONB DEFAULT '{}'::jsonb
);
```

### 3단계: Supabase SQL Editor에서 실행

```
1. Supabase Dashboard 접속
2. SQL Editor 클릭
3. SQL 붙여넣기
4. Run 버튼 클릭
5. 결과 확인
```

### 4단계: 실행 결과 공유

```
"SQL 실행했어. 결과:
- Success: Query executed successfully
또는
- Error: [오류 메시지]"
```

## 상황별 요청 방법

### 테이블 생성

```
"다음 테이블 생성 SQL 만들어줘:

테이블명: products
컬럼:
- id: UUID (PK)
- name: TEXT
- price: INTEGER
- category_id: UUID (FK → categories)
- created_at: TIMESTAMP

외래키 제약조건과 인덱스도 포함해줘"
```

### RLS 정책 설정

```
"users 테이블에 RLS 정책 설정 SQL 만들어줘:
- SELECT: 모든 사용자 가능
- INSERT: 인증된 사용자만
- UPDATE/DELETE: 본인 데이터만"
```

### 인덱스 추가

```
"products 테이블에 인덱스 추가 SQL 만들어줘:
- category_id 컬럼 인덱스
- name 컬럼 검색용 인덱스
- created_at 정렬용 인덱스"
```

### 함수 생성

```
"사용자 통계 조회 함수 SQL 만들어줘:
- 함수명: get_user_stats
- 파라미터: user_id UUID
- 반환: 주문 수, 총 결제액, 마지막 주문일"
```

## SQL Editor 사용법

### Supabase Dashboard에서

```
1. 프로젝트 선택
2. 왼쪽 메뉴 → SQL Editor
3. New Query 또는 기존 쿼리 선택
4. SQL 입력
5. Run (Ctrl/Cmd + Enter)
6. 결과 확인
```

### 여러 SQL 실행

```sql
-- 여러 명령을 한 번에 실행 가능
-- 각 명령은 세미콜론으로 구분

CREATE TABLE table1 (...);

CREATE TABLE table2 (...);

CREATE INDEX idx_name ON table1 (column);
```

### 오류 발생 시

```
오류 메시지 복사해서 Claude Code에게:

"이 SQL 실행했는데 오류 발생:
[오류 메시지]

어떻게 수정해야 해?"
```

## 작업 유형별 템플릿

### 테이블 생성 SQL 요청 템플릿

```
"[테이블명] 테이블 생성 SQL 작성해줘:

컬럼:
- [컬럼1]: [타입] [제약조건]
- [컬럼2]: [타입] [제약조건]

필요한 것:
- [ ] 기본키
- [ ] 외래키
- [ ] 인덱스
- [ ] RLS 정책
- [ ] 기본값

Database 폴더에 저장해줘"
```

### RLS 정책 요청 템플릿

```
"[테이블명] 테이블 RLS 정책 SQL 작성해줘:

권한:
- SELECT: [누가 가능]
- INSERT: [누가 가능]
- UPDATE: [누가 가능]
- DELETE: [누가 가능]

조건:
- [추가 조건]"
```

## 실행 후 확인

### 테이블 생성 확인

```sql
-- 테이블 존재 확인
SELECT * FROM information_schema.tables
WHERE table_schema = 'public';

-- 컬럼 확인
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = '테이블명';
```

### RLS 정책 확인

```sql
-- 정책 목록 확인
SELECT * FROM pg_policies
WHERE tablename = '테이블명';
```

### 인덱스 확인

```sql
-- 인덱스 목록 확인
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = '테이블명';
```

## 체크리스트

### SQL 실행 전 확인

- [ ] SQL 문법 검토했는가?
- [ ] 테이블/컬럼명 올바른가?
- [ ] 데이터 타입 적절한가?
- [ ] 기존 테이블에 영향 없는가?
- [ ] 백업했는가? (구조 변경 시)

### SQL 실행 후 확인

- [ ] 오류 없이 실행됐는가?
- [ ] 테이블/인덱스 생성 확인했는가?
- [ ] RLS 정책 적용 확인했는가?
- [ ] 애플리케이션에서 정상 동작하는가?

## 주의사항

- 프로덕션 DB에서는 더욱 신중하게
- 중요 변경 전 백업 필수
- DROP/DELETE 명령어 실행 전 재확인
- 오류 메시지는 정확히 복사해서 공유
- SQL 파일은 Database 폴더에 버전 관리

