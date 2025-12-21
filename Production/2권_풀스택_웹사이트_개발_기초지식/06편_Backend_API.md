# 6편 | Backend API (백엔드 API)

---

프론트엔드와 데이터베이스를 연결하는 다리, **Backend API**입니다. 비즈니스 로직을 처리하고, 데이터를 검증하고, 응답을 반환하는 핵심 영역입니다.

---

## 6.1 Language (언어)

### JavaScript & TypeScript

API 개발에도 TypeScript를 사용합니다.

```typescript
// API 핸들러 예시
export async function POST(request: Request) {
    const body = await request.json();

    // 타입 안전하게 처리
    const { email, password }: LoginRequest = body;

    // 비즈니스 로직
    const user = await authenticateUser(email, password);

    return Response.json({ success: true, user });
}
```

**TypeScript의 이점:**
- 요청/응답 타입 정의
- 실수 방지 (잘못된 필드명 등)
- IDE 자동완성 지원

---

## 6.2 Runtime (실행 환경)

### Node.js

전통적인 서버 실행 환경입니다.

```typescript
// Node.js 런타임
export const runtime = 'nodejs';

export async function GET() {
    // Node.js API 사용 가능 (fs, path 등)
    const data = await fs.readFile('./data.json');
    return Response.json(JSON.parse(data));
}
```

### Edge Runtime

CDN 엣지에서 실행되는 경량 런타임입니다.

```typescript
// Edge 런타임
export const runtime = 'edge';

export async function GET() {
    // 빠른 응답, 전 세계 분산 실행
    return Response.json({ message: 'Hello from Edge!' });
}
```

**Node.js vs Edge Runtime:**

| 구분 | Node.js | Edge |
|-----|---------|------|
| 콜드 스타트 | 느림 | 빠름 |
| API 지원 | 전체 | 제한적 |
| 실행 위치 | 특정 리전 | 전 세계 CDN |
| 용도 | 복잡한 로직 | 간단한 API |

**SSALWorks**: 대부분 Node.js, 간단한 API는 Edge 사용.

---

## 6.3 Package Manager (패키지 관리자)

### npm

API 개발에 필요한 패키지를 관리합니다.

```bash
# API 개발 필수 패키지
npm install zod           # 데이터 검증
npm install @supabase/supabase-js  # DB 연동
```

---

## 6.4 Tools (도구)

### Postman

API를 테스트하는 도구입니다.

**주요 기능:**
- 요청 보내기 (GET, POST, PUT, DELETE)
- 헤더, 바디 설정
- 환경 변수 관리
- 자동화 테스트

**사용 예시:**
```
POST https://api.ssalworks.com/auth/login
Headers:
  Content-Type: application/json
Body:
  {
    "email": "user@example.com",
    "password": "password123"
  }
```

### Thunder Client

VS Code 확장 프로그램으로, Postman과 유사한 기능을 제공합니다.

**장점:**
- VS Code 내에서 바로 사용
- 가볍고 빠름
- 무료

**SSALWorks**: Thunder Client를 주로 사용합니다.

---

## 6.5 Library (라이브러리)

### Zod

TypeScript 기반 데이터 검증 라이브러리입니다.

```typescript
import { z } from 'zod';

// 스키마 정의
const UserSchema = z.object({
    email: z.string().email('올바른 이메일을 입력하세요'),
    password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다'),
    name: z.string().min(2, '이름은 2자 이상이어야 합니다'),
});

// 타입 추론
type User = z.infer<typeof UserSchema>;

// 검증
export async function POST(request: Request) {
    const body = await request.json();

    const result = UserSchema.safeParse(body);

    if (!result.success) {
        return Response.json(
            { error: result.error.errors },
            { status: 400 }
        );
    }

    // result.data는 타입 안전함
    const user = result.data;
    // ...
}
```

**Zod의 장점:**
- 런타임 검증 + 타입 추론
- 상세한 에러 메시지
- 체이닝 가능한 API
- Next.js와 완벽 호환

**SSALWorks**: 모든 API 입력값을 Zod로 검증합니다.

---

## 6.6 Framework (프레임워크)

### Next.js API Routes

Next.js의 내장 API 기능입니다.

```
app/
└── api/
    ├── auth/
    │   ├── login/
    │   │   └── route.ts     # POST /api/auth/login
    │   └── logout/
    │       └── route.ts     # POST /api/auth/logout
    └── users/
        ├── route.ts         # GET, POST /api/users
        └── [id]/
            └── route.ts     # GET, PUT, DELETE /api/users/:id
```

**라우트 핸들러 작성:**

```typescript
// app/api/users/route.ts

// GET /api/users
export async function GET() {
    const users = await db.user.findMany();
    return Response.json(users);
}

// POST /api/users
export async function POST(request: Request) {
    const body = await request.json();
    const user = await db.user.create({ data: body });
    return Response.json(user, { status: 201 });
}
```

**동적 라우트:**

```typescript
// app/api/users/[id]/route.ts

// GET /api/users/123
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const user = await db.user.findUnique({
        where: { id: params.id }
    });

    if (!user) {
        return Response.json(
            { error: 'User not found' },
            { status: 404 }
        );
    }

    return Response.json(user);
}
```

**SSALWorks**: Next.js API Routes를 기본으로 사용합니다.

---

## 6.7 Service (서비스)

Backend API 영역에서는 별도의 외부 서비스를 사용하지 않습니다. 필요한 서비스는 다른 영역에서 연동합니다:
- 데이터베이스 → Database 영역 (Supabase)
- 인증 → Security 영역 (Supabase Auth)
- 이메일 → Backend Infra 영역 (Resend)

---

## API 설계 원칙

### RESTful API

```
GET    /api/users       # 목록 조회
GET    /api/users/123   # 단일 조회
POST   /api/users       # 생성
PUT    /api/users/123   # 수정
DELETE /api/users/123   # 삭제
```

### 응답 형식

```typescript
// 성공
{ success: true, data: { ... } }

// 에러
{ success: false, error: { code: 'VALIDATION_ERROR', message: '...' } }
```

---

## 정리

| 기술 스택 | SSALWorks 선택 |
|----------|---------------|
| Language | JavaScript, **TypeScript** |
| Runtime | **Node.js**, Edge Runtime |
| Package Manager | **npm** |
| Tools | Postman, **Thunder Client** |
| Library | **Zod** |
| Framework | **Next.js API Routes** |
| Service | - |

Backend API는 비즈니스 로직의 핵심입니다. 다음 편에서는 데이터를 저장하는 **Database**를 알아봅니다.

---

**작성일: 2025-12-21 / 글자수: 약 5,200자 / 작성자: Claude / 프롬프터: 써니**
