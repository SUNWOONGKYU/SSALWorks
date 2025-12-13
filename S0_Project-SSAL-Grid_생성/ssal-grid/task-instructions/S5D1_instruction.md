# Task Instruction - S5D1

## Task ID
S5D1

## Task Name
백업 설정

## Task Goal
Supabase 데이터베이스 백업 정책 수립 및 설정

## Prerequisites (Dependencies)
- S1D1 (DB 스키마 확정) 완료
- S5M1 (출시 체크리스트) 완료

## Specific Instructions

### 1. Supabase 자동 백업 확인
```
Supabase 제공 백업:
- Pro Plan: 7일 자동 백업
- Team Plan: 14일 자동 백업
- Enterprise: 커스텀 보존 기간

확인 방법:
1. Supabase Dashboard 접속
2. Settings > Database > Backups
3. 백업 상태 및 보존 기간 확인
```

### 2. 수동 백업 스크립트
- 위치: `scripts/backup-database.js`

```javascript
// scripts/backup-database.js
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const SUPABASE_DB_URL = process.env.SUPABASE_DB_URL;
const BACKUP_DIR = './backups';

async function createBackup() {
  // 백업 디렉토리 생성
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `backup_${timestamp}.sql`;
  const filepath = path.join(BACKUP_DIR, filename);

  console.log('Starting database backup...');

  try {
    // pg_dump 실행
    execSync(`pg_dump "${SUPABASE_DB_URL}" > "${filepath}"`, {
      stdio: 'inherit'
    });

    console.log(`Backup created: ${filepath}`);

    // 백업 파일 크기 확인
    const stats = fs.statSync(filepath);
    console.log(`Backup size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);

    // 압축 (선택)
    execSync(`gzip "${filepath}"`);
    console.log(`Compressed: ${filepath}.gz`);

    return `${filepath}.gz`;
  } catch (error) {
    console.error('Backup failed:', error);
    throw error;
  }
}

// 오래된 백업 정리
function cleanupOldBackups(retentionDays = 30) {
  const files = fs.readdirSync(BACKUP_DIR);
  const now = Date.now();
  const maxAge = retentionDays * 24 * 60 * 60 * 1000;

  files.forEach(file => {
    const filepath = path.join(BACKUP_DIR, file);
    const stats = fs.statSync(filepath);
    const age = now - stats.mtime.getTime();

    if (age > maxAge) {
      fs.unlinkSync(filepath);
      console.log(`Deleted old backup: ${file}`);
    }
  });
}

// 실행
createBackup()
  .then(() => cleanupOldBackups())
  .catch(console.error);
```

### 3. Vercel Cron으로 자동 백업
- 위치: `vercel.json`

```json
{
  "crons": [
    {
      "path": "/api/cron/backup",
      "schedule": "0 3 * * *"
    }
  ]
}
```

- 위치: `api/cron/backup.js`

```javascript
// api/cron/backup.js
module.exports = async (req, res) => {
  // Cron 인증
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // 중요 데이터만 JSON으로 백업 (Serverless 환경)
    const backup = await createJsonBackup();

    // 외부 스토리지에 저장 (S3, GCS 등)
    await uploadToStorage(backup);

    res.status(200).json({ success: true, timestamp: new Date().toISOString() });
  } catch (error) {
    console.error('Backup failed:', error);
    res.status(500).json({ error: 'Backup failed' });
  }
};

async function createJsonBackup() {
  const tables = ['users', 'subscriptions', 'payments', 'ai_usage_logs'];
  const backup = {};

  for (const table of tables) {
    const { data } = await supabase.from(table).select('*');
    backup[table] = data;
  }

  return backup;
}

async function uploadToStorage(backup) {
  // AWS S3 또는 Google Cloud Storage에 업로드
  // 추후 구현
}
```

### 4. 백업 복원 스크립트
- 위치: `scripts/restore-database.js`

```javascript
// scripts/restore-database.js
const { execSync } = require('child_process');
const fs = require('fs');

const SUPABASE_DB_URL = process.env.SUPABASE_DB_URL;

function restoreBackup(backupFile) {
  if (!fs.existsSync(backupFile)) {
    throw new Error(`Backup file not found: ${backupFile}`);
  }

  console.log(`Restoring from: ${backupFile}`);

  // 압축 해제 (필요시)
  let sqlFile = backupFile;
  if (backupFile.endsWith('.gz')) {
    execSync(`gunzip -k "${backupFile}"`);
    sqlFile = backupFile.replace('.gz', '');
  }

  // 복원 실행
  try {
    execSync(`psql "${SUPABASE_DB_URL}" < "${sqlFile}"`, {
      stdio: 'inherit'
    });
    console.log('Restore completed successfully');
  } catch (error) {
    console.error('Restore failed:', error);
    throw error;
  }
}

// 사용: node scripts/restore-database.js ./backups/backup_2024-01-01.sql.gz
const backupFile = process.argv[2];
if (backupFile) {
  restoreBackup(backupFile);
} else {
  console.log('Usage: node restore-database.js <backup-file>');
}
```

### 5. 백업 정책 문서
- 위치: `docs/BACKUP_POLICY.md`

```markdown
# SSALWorks 백업 정책

## 자동 백업

### Supabase 자동 백업
- **주기**: 매일 자동
- **보존 기간**: 7일 (Pro Plan)
- **복원 방법**: Supabase Dashboard > Database > Backups

### Cron 자동 백업
- **주기**: 매일 03:00 UTC
- **저장 위치**: 외부 스토리지 (S3)
- **보존 기간**: 30일

## 수동 백업

### 전체 백업
\`\`\`bash
node scripts/backup-database.js
\`\`\`

### 특정 테이블 백업
\`\`\`bash
pg_dump -t users -t subscriptions $SUPABASE_DB_URL > users_backup.sql
\`\`\`

## 복원 절차

### 1. 전체 복원
\`\`\`bash
node scripts/restore-database.js ./backups/backup_YYYY-MM-DD.sql.gz
\`\`\`

### 2. Supabase 대시보드에서 복원
1. Dashboard > Database > Backups
2. 원하는 시점 선택
3. "Restore" 클릭

## 백업 테스트

- **주기**: 월 1회
- **테스트 내용**: 복원 후 데이터 무결성 확인
- **담당자**: DevOps

## 긴급 연락처

- 기술 담당: tech@ssalworks.com
- Supabase 지원: support@supabase.com
```

### 6. package.json 스크립트
```json
{
  "scripts": {
    "backup": "node scripts/backup-database.js",
    "backup:restore": "node scripts/restore-database.js",
    "backup:list": "ls -la backups/"
  }
}
```

## Expected Output Files
- `scripts/backup-database.js`
- `scripts/restore-database.js`
- `api/cron/backup.js`
- `docs/BACKUP_POLICY.md`

## Completion Criteria
- [ ] Supabase 자동 백업 설정 확인
- [ ] 수동 백업 스크립트 작성
- [ ] 자동 백업 Cron 설정
- [ ] 복원 스크립트 작성
- [ ] 백업 테스트 성공
- [ ] 백업 정책 문서 작성

## Tech Stack
- Supabase
- PostgreSQL (pg_dump)
- Node.js

## Tools
- Write, Read
- Bash (pg_dump, 스크립트 실행)

## Execution Type
Human-Assisted

## Remarks
- Pro Plan 이상에서 자동 백업 지원
- 백업 파일 암호화 권장
- 정기적인 복원 테스트 필수
- 외부 스토리지 비용 고려

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

