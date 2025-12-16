# Supabase 쿼리 최적화

## 💡 Tip

필요한 컬럼만 선택하고, 인덱스를 활용하면 쿼리 성능이 크게 향상됩니다.

## 기본 최적화

### 1. 필요한 컬럼만 선택

```javascript
// ❌ 모든 컬럼 가져오기
const { data } = await supabase.from('users').select('*');

// ✅ 필요한 컬럼만 가져오기
const { data } = await supabase.from('users').select('id, nickname, email');
```

### 2. 페이지네이션 사용

```javascript
// ❌ 전체 데이터 가져오기
const { data } = await supabase.from('posts').select('*');

// ✅ 페이지네이션 적용
const { data } = await supabase
    .from('posts')
    .select('*')
    .range(0, 9);  // 10개씩
```

### 3. 필터링은 서버에서

```javascript
// ❌ 클라이언트에서 필터링
const { data } = await supabase.from('users').select('*');
const activeUsers = data.filter(u => u.status === 'active');

// ✅ 서버에서 필터링
const { data } = await supabase
    .from('users')
    .select('*')
    .eq('status', 'active');
```

## 인덱스 활용

### 자주 검색하는 컬럼에 인덱스 추가

```sql
-- 이메일로 자주 검색하는 경우
CREATE INDEX idx_users_email ON users(email);

-- 상태별 조회가 많은 경우
CREATE INDEX idx_users_status ON users(subscription_status);

-- 복합 인덱스 (여러 컬럼)
CREATE INDEX idx_posts_user_created ON posts(user_id, created_at DESC);
```

## JOIN 최적화

```javascript
// Supabase에서 JOIN
const { data } = await supabase
    .from('posts')
    .select(`
        id,
        title,
        users (
            nickname,
            avatar_url
        )
    `)
    .eq('status', 'published')
    .limit(10);
```

## 실시간 구독 시 주의

```javascript
// ❌ 전체 테이블 구독
const subscription = supabase
    .channel('all-changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'posts' },
        payload => handleChange(payload))
    .subscribe();

// ✅ 필요한 이벤트만 구독
const subscription = supabase
    .channel('my-posts')
    .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'posts',
        filter: `user_id=eq.${userId}`
    }, payload => handleChange(payload))
    .subscribe();
```

## 관련 파일
- `S2_개발-1차/Database/S2D1_index_optimization.sql`
