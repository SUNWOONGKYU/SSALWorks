# Supabase RLS 정책 관리

## 요약
RLS(Row Level Security)는 행 단위 접근 제어. 개발 환경에서는 완화된 정책(*_dev.sql), 프로덕션 배포 전 반드시 강화 정책(*.sql)으로 교체.

## 상세

### 개발 vs 프로덕션

| 환경 | 파일명 | 특징 |
|------|--------|------|
| 개발 | `*_rls_dev.sql` | 테스트 편의, 모든 접근 허용 |
| 프로덕션 | `*_rls.sql` | 실제 보안 정책 적용 |

### 일반적인 RLS 패턴

```sql
-- SELECT: 모든 사용자
CREATE POLICY "users_select" ON users FOR SELECT USING (true);

-- INSERT: 인증된 사용자만
CREATE POLICY "users_insert" ON users FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- UPDATE/DELETE: 본인만
CREATE POLICY "users_update" ON users FOR UPDATE
  USING (auth.uid() = id);
```

### 배포 전 필수

1. 개발용 정책 삭제: `DROP POLICY "dev_allow_all" ON 테이블;`
2. 프로덕션 정책 적용
3. 역할별 테스트 (anon, authenticated)

### Supabase 유용한 함수

| 함수 | 설명 |
|------|------|
| `auth.uid()` | 현재 로그인 사용자 UUID |
| `auth.role()` | 'anon' 또는 'authenticated' |

---
📚 더 자세히: `CLAUDE.md` 개발 환경 RLS 정책 경고 섹션
