# 데이터베이스 (Database)

## 📋 개요

Supabase 데이터베이스 관련 파일 및 스크립트 저장소입니다.

## 📂 폴더 구조

```
3-6_Database/
├── Supabase/
│   ├── migrations/          # 데이터베이스 마이그레이션 파일
│   ├── seeds/               # 초기 데이터 시드 파일
│   ├── .env.example         # 환경 변수 예제
│   └── README.md
├── scripts/                 # 유틸리티 스크립트
│   ├── check_tables.py
│   ├── backup_db.sh
│   └── restore_db.sh
└── README.md                # 이 파일
```

## 🗄️ Supabase 구조

### migrations/
순서대로 실행되는 SQL 마이그레이션 파일:
```
001_create_users_table.sql
002_create_politicians_table.sql
003_create_posts_table.sql
...
```

### seeds/
초기 데이터 삽입 파일:
```
insert_sample_users.sql
insert_sample_politicians.sql
insert_sample_posts.sql
```

## 🚀 사용 방법

### 1. 환경 변수 설정
```bash
cp Supabase/.env.example Supabase/.env
# .env 파일에 실제 값 입력
```

### 2. 마이그레이션 실행
```bash
cd Supabase
supabase db push
```

### 3. 시드 데이터 입력
```bash
psql -h [HOST] -U [USER] -d [DATABASE] -f seeds/insert_sample_users.sql
```

## 📌 중요 사항

- 마이그레이션 파일명은 순서대로 번호 붙이기
- `.env` 파일은 절대 커밋하지 않기 (`.gitignore`에 포함됨)
- 프로덕션 DB는 신중하게 조작

## 🔗 관련 문서

- DB 설계: `1_기획/1-3_Database_Design/`
- Supabase 설정: `2_개발준비/2-3_Development_Setup/Supabase/`
