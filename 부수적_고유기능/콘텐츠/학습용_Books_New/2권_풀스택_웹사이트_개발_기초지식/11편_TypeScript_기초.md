# 11편 | TypeScript 기초

---

10편에서 패키지 관리와 빌드 도구를 배웠습니다. 이제 현대 웹 개발에서 빠르게 표준이 되어가는 **TypeScript**를 배워보겠습니다. TypeScript는 **JavaScript에 안전벨트를 장착한 것**과 같습니다. 코드를 작성할 때 실수를 미리 잡아주어 더 안정적인 프로그램을 만들 수 있게 해줍니다.

## 1. TypeScript란?

### 1-1. JavaScript의 한계

JavaScript는 **동적 타입 언어**입니다. 변수에 어떤 값이든 넣을 수 있어 유연하지만, 이것이 때로는 문제가 됩니다.

```javascript
// JavaScript - 문제가 될 수 있는 코드
function add(a, b) {
    return a + b;
}

add(5, 3);        // 8 (정상)
add("5", 3);      // "53" (문자열 연결 - 의도하지 않은 결과)
add(null, 3);     // 3 (예상치 못한 동작)
```

이런 문제들은 **실행하기 전까지 발견하기 어렵습니다**.

### 1-2. TypeScript의 해결책

TypeScript는 **정적 타입 시스템**을 추가하여 코드를 실행하기 전에 오류를 발견합니다.

```typescript
// TypeScript - 안전한 코드
function add(a: number, b: number): number {
    return a + b;
}

add(5, 3);        // 8 (정상)
add("5", 3);      // 컴파일 에러! - 문자열은 허용되지 않음
```

### 1-3. TypeScript의 특징

- **JavaScript의 슈퍼셋**: 모든 JavaScript 코드는 TypeScript에서 작동
- **컴파일 시점 타입 체크**: 실행 전에 오류 발견
- **최신 JavaScript 기능 지원**: ES6+ 문법 사용 가능
- **풍부한 개발 도구 지원**: 자동완성, 리팩토링 등

## 2. TypeScript 시작하기

### 2-1. 설치

```bash
# 전역 설치
npm install -g typescript

# 프로젝트 로컬 설치 (권장)
npm install --save-dev typescript
```

### 2-2. 기본 사용

TypeScript 파일은 `.ts` 확장자를 사용합니다.

```bash
# TypeScript 파일을 JavaScript로 컴파일
tsc hello.ts

# 컴파일 결과: hello.js 파일 생성
```

### 2-3. tsconfig.json 설정

프로젝트 루트에 `tsconfig.json` 파일을 생성하여 컴파일 옵션을 설정합니다.

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "strict": true,
    "outDir": "./dist"
  },
  "include": ["src/**/*"]
}
```

## 3. 기본 타입

### 3-1. 원시 타입

```typescript
// 문자열
let name: string = "홍길동";

// 숫자
let age: number = 25;

// 불린
let isStudent: boolean = true;

// null과 undefined
let nothing: null = null;
let notDefined: undefined = undefined;
```

### 3-2. 배열 타입

```typescript
// 숫자 배열
let numbers: number[] = [1, 2, 3];

// 문자열 배열
let names: string[] = ["철수", "영희"];

// 제네릭 문법
let items: Array<number> = [1, 2, 3];
```

### 3-3. 객체 타입

```typescript
// 객체 타입 정의
let user: { name: string; age: number } = {
    name: "홍길동",
    age: 25
};
```

## 4. 타입 별칭과 인터페이스

### 4-1. 타입 별칭 (Type Alias)

복잡한 타입에 이름을 붙일 수 있습니다.

```typescript
// 타입 별칭 정의
type User = {
    name: string;
    age: number;
    email: string;
};

// 사용
let user: User = {
    name: "홍길동",
    age: 25,
    email: "hong@example.com"
};
```

### 4-2. 인터페이스 (Interface)

객체의 구조를 정의하는 또 다른 방법입니다.

```typescript
// 인터페이스 정의
interface Product {
    id: number;
    name: string;
    price: number;
}

// 사용
let item: Product = {
    id: 1,
    name: "노트북",
    price: 1500000
};
```

### 4-3. Type vs Interface

| 특징 | Type | Interface |
|------|------|-----------|
| 객체 타입 | 가능 | 가능 |
| 유니온 타입 | 가능 | 불가능 |
| 확장 | `&` 사용 | `extends` 사용 |
| 선언 병합 | 불가능 | 가능 |

일반적으로 **객체는 interface**, **그 외는 type**을 사용합니다.

## 5. 함수 타입

### 5-1. 매개변수와 반환 타입

```typescript
// 매개변수와 반환 타입 지정
function greet(name: string): string {
    return `안녕하세요, ${name}님!`;
}

// 화살표 함수
const add = (a: number, b: number): number => a + b;
```

### 5-2. 선택적 매개변수

`?`를 사용하여 선택적 매개변수를 정의합니다.

```typescript
function greet(name: string, title?: string): string {
    if (title) {
        return `안녕하세요, ${title} ${name}님!`;
    }
    return `안녕하세요, ${name}님!`;
}

greet("홍길동");           // "안녕하세요, 홍길동님!"
greet("홍길동", "교수");    // "안녕하세요, 교수 홍길동님!"
```

### 5-3. 기본값 매개변수

```typescript
function greet(name: string, greeting: string = "안녕하세요"): string {
    return `${greeting}, ${name}님!`;
}

greet("홍길동");                  // "안녕하세요, 홍길동님!"
greet("홍길동", "반갑습니다");     // "반갑습니다, 홍길동님!"
```

## 6. 유니온 타입과 타입 가드

### 6-1. 유니온 타입

여러 타입 중 하나를 가질 수 있음을 표현합니다.

```typescript
// string 또는 number
let id: string | number;

id = "abc123";  // OK
id = 12345;     // OK
id = true;      // 에러!
```

### 6-2. 타입 가드

유니온 타입에서 특정 타입을 구분합니다.

```typescript
function printId(id: string | number): void {
    if (typeof id === "string") {
        // 이 블록에서 id는 string 타입
        console.log(id.toUpperCase());
    } else {
        // 이 블록에서 id는 number 타입
        console.log(id.toFixed(2));
    }
}
```

### 6-3. 리터럴 타입

특정 값만 허용하는 타입을 정의합니다.

```typescript
type Status = "pending" | "approved" | "rejected";

let orderStatus: Status = "pending";    // OK
orderStatus = "cancelled";              // 에러!
```

## 7. 제네릭

### 7-1. 제네릭이란?

제네릭은 **타입을 매개변수처럼** 사용하는 기능입니다. 다양한 타입에서 재사용 가능한 컴포넌트를 만들 수 있습니다.

```typescript
// T는 타입 매개변수
function identity<T>(arg: T): T {
    return arg;
}

identity<string>("hello");  // "hello"
identity<number>(42);       // 42
```

### 7-2. 제네릭 인터페이스

```typescript
interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
}

// 사용 예시
const userResponse: ApiResponse<User> = {
    data: { name: "홍길동", age: 25, email: "hong@example.com" },
    status: 200,
    message: "성공"
};
```

### 7-3. 제네릭 제약 조건

```typescript
// T는 반드시 length 속성을 가져야 함
interface HasLength {
    length: number;
}

function logLength<T extends HasLength>(arg: T): void {
    console.log(arg.length);
}

logLength("hello");     // 5
logLength([1, 2, 3]);   // 3
logLength(123);         // 에러! number에는 length가 없음
```

## 8. 유틸리티 타입

TypeScript는 자주 사용되는 타입 변환을 위한 유틸리티 타입을 제공합니다.

### 8-1. Partial<T>

모든 속성을 선택적으로 만듭니다.

```typescript
interface User {
    name: string;
    age: number;
}

// 모든 속성이 선택적
type PartialUser = Partial<User>;
// { name?: string; age?: number; }
```

### 8-2. Required<T>

모든 속성을 필수로 만듭니다.

```typescript
interface Config {
    debug?: boolean;
    logging?: boolean;
}

type RequiredConfig = Required<Config>;
// { debug: boolean; logging: boolean; }
```

### 8-3. Pick<T, K>와 Omit<T, K>

```typescript
interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

// 특정 속성만 선택
type UserPreview = Pick<User, "id" | "name">;
// { id: number; name: string; }

// 특정 속성 제외
type UserSafe = Omit<User, "password">;
// { id: number; name: string; email: string; }
```

## 9. TypeScript와 React

### 9-1. 컴포넌트 타입

```typescript
// 함수 컴포넌트
interface ButtonProps {
    text: string;
    onClick: () => void;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, disabled = false }) => {
    return (
        <button onClick={onClick} disabled={disabled}>
            {text}
        </button>
    );
};
```

### 9-2. 이벤트 타입

```typescript
const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
};

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
};
```

## 핵심 정리

| 개념 | 설명 | 예시 |
|------|------|------|
| 기본 타입 | string, number, boolean 등 | `let name: string` |
| 인터페이스 | 객체 구조 정의 | `interface User { }` |
| 유니온 | 여러 타입 중 하나 | `string \| number` |
| 제네릭 | 타입 매개변수화 | `Array<T>` |
| 유틸리티 | 타입 변환 도구 | `Partial<T>` |

TypeScript는 처음에는 타이핑이 많아 보이지만, **큰 프로젝트에서 버그를 줄이고 생산성을 높여줍니다**. 많은 기업들이 TypeScript를 도입하고 있으며, 현대 웹 개발의 필수 기술이 되어가고 있습니다. 다음 편에서는 라이브러리와 프레임워크에 대해 배워보겠습니다.

---

**작성일: 2025-01-01 / 수정일: 2025-12-20 / 글자수: 약 5,900자 / 작성자: Claude / 프롬프터: 써니**
