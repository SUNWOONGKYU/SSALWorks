# DB 삭제해도 복구 가능

## 핵심 요약

데이터베이스가 실수로 삭제되어도 복구 방법이 있습니다. Supabase는 Point-in-Time Recovery(PITR), 일일 백업 등의 복구 기능을 제공하니 겁먹지 말고 침착하게 대응하세요.

## 삭제 발생 시 첫 번째 행동

### 즉시 중단

```
⚠️ 데이터 삭제/손실 발견 시:

1. 추가 작업 즉시 중단
   - 더 이상의 DELETE/DROP 실행 금지
   - 애플리케이션 쓰기 작업 중단 (가능하면)

2. 상황 파악
   - 무엇이 삭제됐는지 확인
   - 언제 삭제됐는지 확인
   - 영향 범위 확인

3. 복구 방법 선택
```

## Supabase 복구 옵션

### 복구 방법 비교

| 방법 | 설명 | 사용 조건 |
|------|------|----------|
| Point-in-Time Recovery | 특정 시점으로 복원 | Pro 플랜 이상 |
| Daily Backups | 일일 백업에서 복원 | 모든 플랜 |
| Database Dump | SQL 덤프 파일 복원 | 수동 백업 있을 경우 |

### 1. Point-in-Time Recovery (PITR)

```
Pro 플랜 이상에서 사용 가능

특징:
- 최근 7일 내 아무 시점으로 복원 가능
- 분 단위 정밀도
- 가장 정확한 복구

사용 방법:
1. Supabase Dashboard → Settings → Database
2. Point-in-Time Recovery 섹션
3. 복원할 시점 선택
4. 복원 시작
```

### 2. Daily Backups

```
모든 플랜에서 사용 가능

특징:
- 매일 자동 백업
- 최근 7일간 보관
- 전체 데이터베이스 복원

사용 방법:
1. Supabase Dashboard → Settings → Database
2. Backups 섹션
3. 원하는 날짜의 백업 선택
4. Download 또는 Restore
```

### 3. 수동 백업 복원

```
사전에 백업했던 경우

방법:
1. 백업 파일(SQL dump) 준비
2. Supabase SQL Editor 열기
3. SQL 파일 내용 실행
4. 데이터 확인
```

## 복구 절차

### 단계별 진행

```
[1단계: 상황 파악]
"다음 상황인데 복구 가능해?
- 삭제된 내용: [테이블/데이터]
- 삭제 시점: [시간]
- 현재 플랜: [Free/Pro/Team]"

[2단계: 복구 방법 선택]
Claude Code에게 물어보기:
"이 상황에서 가장 좋은 복구 방법 알려줘"

[3단계: 복구 실행]
- Dashboard에서 직접 실행하거나
- SQL로 복구 스크립트 실행

[4단계: 확인]
"복구 완료됐는지 확인해줘"
```

## 시나리오별 대응

### 시나리오 1: 테이블 삭제 (DROP TABLE)

```sql
-- 테이블이 완전히 삭제된 경우
-- PITR 또는 백업에서 복원 필요

-- 복원 후 테이블 존재 확인
SELECT * FROM information_schema.tables
WHERE table_name = '삭제된_테이블명';
```

### 시나리오 2: 데이터 삭제 (DELETE)

```sql
-- 행 데이터만 삭제된 경우

-- 옵션 1: PITR로 특정 시점 복원
-- 옵션 2: 백업에서 해당 테이블 데이터만 추출

-- 삭제된 행 수 확인
SELECT COUNT(*) FROM 테이블명;
```

### 시나리오 3: 컬럼 삭제 (ALTER TABLE DROP COLUMN)

```sql
-- 컬럼이 삭제된 경우
-- PITR 또는 백업 필요

-- 복원 후 컬럼 확인
SELECT column_name FROM information_schema.columns
WHERE table_name = '테이블명';
```

## 예방 조치

### 삭제 전 확인 습관

```sql
-- DELETE 전 확인
SELECT * FROM 테이블명 WHERE 조건;
-- 삭제될 행 확인 후

DELETE FROM 테이블명 WHERE 조건;
```

### 백업 습관

```
권장 백업 주기:

1. 중요한 작업 전
   - 스키마 변경 전
   - 대량 데이터 수정 전

2. 정기 백업
   - 수동 SQL dump 주 1회
   - 중요 테이블 CSV 내보내기

3. 마일스톤 백업
   - Stage 완료 시
   - 배포 전
```

### SQL dump 명령어

```bash
# Supabase CLI로 백업
supabase db dump > backup_$(date +%Y%m%d).sql

# 또는 pg_dump 사용 (connection string 필요)
pg_dump "postgresql://..." > backup.sql
```

## Claude Code에게 요청하기

### 복구 도움 요청

```
"users 테이블을 실수로 DROP했어.
10분 전에 삭제했고 Pro 플랜이야.
복구 방법 알려줘"
```

### 백업 생성 요청

```
"현재 DB 스키마 백업 SQL 파일 만들어줘"

"users 테이블 데이터를 SQL INSERT문으로 추출해줘"
```

### 복구 스크립트 요청

```
"백업 파일에서 users 테이블만 복원하는 SQL 만들어줘"
```

## 주의사항

- PITR은 Pro 플랜 이상에서만 가능
- Daily Backup은 전체 복원만 가능 (부분 복원 불가)
- 복원 시 현재 데이터가 덮어씌워질 수 있음
- 복원 전 현재 상태도 백업해두기
- 삭제 후 시간이 오래 지나면 복구 어려울 수 있음
- 중요한 작업 전 항상 백업하는 습관

