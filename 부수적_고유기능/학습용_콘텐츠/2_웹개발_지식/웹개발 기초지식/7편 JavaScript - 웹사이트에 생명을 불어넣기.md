# 7편 | JavaScript - 웹사이트에 생명을 불어넣기

---

CSS 디자인 완성에 이어서, 지금부터 JavaScript로 동적 기능을 추가해봅니다. 정적인 웹페이지에 동적인 기능과 상호작용을 추가하는 JavaScript의 핵심을 알아봅니다. 변수와 함수 같은 프로그래밍 기초부터 DOM 조작, 이벤트 처리, 서버 통신까지 웹사이트를 살아 움직이게 하는 실전 기술들을 단계별로 살펴보겠습니다.

## 1. JavaScript란 무엇인가

### 1-1. 웹사이트를 움직이게 하는 언어

JavaScript는 웹사이트에 동적인 기능을 추가하는 프로그래밍 언어입니다. HTML이 뼈대를 만들고 CSS가 디자인을 입힙니다. JavaScript는 실제로 움직이고 반응하는 기능을 담당합니다.

JavaScript가 없는 웹사이트는 마치 정지된 그림 같습니다. 버튼을 클릭해도 아무 일도 일어나지 않습니다. 양식을 작성해도 검증이 안 됩니다. 내용이 자동으로 업데이트되지도 않습니다. JavaScript가 있어야 사용자와 상호작용하는 살아있는 웹사이트가 됩니다.

구체적인 예시를 들어보면 다양하고 흥미롭습니다. 네이버 메인에서 검색어를 몇 글자만 입력해도 자동완성이 나타나는 것, 온라인 쇼핑에서 장바구니에 물건을 담는 순간 개수가 실시간으로 업데이트되는 것, 그리고 유튜브에서 동영상이 자동 재생되는 것 모두가 JavaScript의 작품들입니다.

### 1-2. 프로그래밍 언어로서의 JavaScript

JavaScript는 단순한 웹 스크립트를 넘어서 완전한 프로그래밍 언어로 발전했습니다. 웹 스크립트란 간단한 프로그램을 말합니다. JavaScript는 변수를 선언하고 조건문으로 판단합니다. 반복문으로 작업을 자동화하고 함수로 코드를 재사용할 수 있습니다.

변수는 데이터를 담는 상자입니다. 조건문은 if문을 뜻합니다. 반복문은 for문을 가리킵니다. 함수는 재사용 가능한 코드 묶음입니다.

초기에는 웹브라우저에서만 작동했습니다. 이제는 다양한 환경에서 실행됩니다. Node.js를 통해 서버에서도 실행됩니다. React Native로 모바일 앱도 만들 수 있습니다. Electron으로 데스크톱 프로그램도 개발할 수 있습니다. VS Code 자체도 JavaScript로 만들어진 프로그램입니다.

Node.js는 서버에서 JavaScript를 실행하는 환경입니다. React Native는 모바일 앱 개발 도구입니다. Electron은 데스크톱 앱 개발 도구입니다.

### 1-3. HTML, CSS와의 협력 관계

JavaScript는 HTML과 CSS와 긴밀하게 협력합니다. HTML 요소를 선택해서 내용을 바꿀 수 있습니다. CSS 스타일을 동적으로 변경할 수도 있습니다. 새로운 HTML 요소를 생성하고 삭제하는 것도 가능합니다.

예를 들어 다크모드 전환 버튼을 만들어보겠습니다. JavaScript가 버튼 클릭을 감지합니다. HTML의 body 태그에 dark-mode 클래스를 추가합니다. 그러면 CSS에서 미리 정의한 다크모드 스타일이 적용됩니다. 세 기술이 완벽하게 협력해서 기능을 구현하는 것입니다.

## 2. JavaScript 기본 개념

### 2-1. 변수와 데이터 타입

JavaScript에서 변수는 데이터를 저장하는 상자와 같습니다. Variable이 변수의 영어 단어입니다. `let name = "홍길동"`이라고 쓰면 name이라는 상자에 "홍길동"이라는 텍스트를 담는 것입니다.

데이터 타입은 여러 종류가 있습니다. 데이터 타입을 자료형이라고도 부릅니다.

문자열은 텍스트를 담습니다. String이 문자열의 영어 표현입니다. 숫자는 계산할 수 있는 값을 담습니다. Number가 숫자의 영어 표현입니다. 불린은 참/거짓을 판단합니다. Boolean이 불린의 영어 표현이며 참/거짓 값을 의미합니다.

배열은 여러 데이터를 순서대로 담습니다. Array가 배열의 영어 표현이며 순서가 있는 목록입니다. 객체는 관련된 데이터를 그룹으로 묶어서 관리합니다. Object가 객체의 영어 표현이며 속성을 가진 데이터입니다.

최근에는 `const`와 `let`을 주로 사용합니다. `const`는 상수를 만들 때 사용합니다. 상수란 값이 바뀌지 않는 변수입니다. `let`은 값이 바뀔 수 있는 변수를 만들 때 사용합니다. 예전에 쓰던 `var`는 여러 문제가 있습니다. 가능하면 사용하지 않는 것이 좋습니다.

### 2-2. 조건문과 반복문

조건문은 프로그램이 스스로 판단하도록 만듭니다. `if`문을 사용해서 논리를 코드로 표현할 수 있습니다. "만약 나이가 18세 이상이면 성인입니다"같은 논리를 구현할 수 있습니다.

```javascript
let age = 20;
if (age >= 18) {
    console.log("성인입니다");  // console.log는 결과를 출력하는 명령
} else {
    console.log("미성년자입니다");
}
```

반복문은 같은 작업을 여러 번 수행할 때 사용합니다. `for`문으로 1부터 10까지 숫자를 출력할 수 있습니다. 배열의 모든 항목을 하나씩 처리하는 것도 가능합니다. 

```javascript
// 1부터 5까지 출력하기
for (let i = 1; i <= 5; i++) {
    console.log(i);  // 1, 2, 3, 4, 5가 순서대로 출력됨
}
```

### 2-3. 함수의 개념과 활용

함수는 특정 작업을 수행하는 코드 묶음입니다. Function이 함수의 영어 표현입니다. 한 번 만들어두면 필요할 때마다 호출해서 재사용할 수 있습니다. 호출이란 함수를 실행하는 것을 말하며 영어로는 Call이라고 합니다.

```javascript
// 두 숫자를 더하는 함수
function add(a, b) {
    return a + b;  // return은 결과를 돌려주는 명령
}

let result = add(3, 5);  // 8
console.log(result);  // 8이 출력됨
```

## 3. DOM 조작하기

### 3-1. DOM이란 무엇인가

DOM을 이해하는 것이 JavaScript 마스터의 핵심입니다. DOM은 HTML 문서를 JavaScript가 쉽게 이해할 수 있는 객체 형태로 번역해놓은 것입니다. DOM은 Document Object Model의 줄임말이며, 우리말로는 '문서 객체 모델'이라고 부릅니다. 중요한 개념입니다.

웹페이지의 모든 요소를 나무처럼 가지가 뻗은 트리 구조로 표현합니다. 가계도를 그리는 것처럼, 부모-자식 관계로 모든 HTML 요소들을 체계적으로 정리해놓는 것입니다. 이렇게 하면 JavaScript가 자유롭게 접근하고 수정할 수 있게 됩니다.

쉽게 말해 DOM은 JavaScript와 HTML 사이의 다리 역할을 합니다. JavaScript는 DOM을 통해 다양한 작업을 수행합니다. HTML 요소를 찾고 내용을 바꿀 수 있습니다. 스타일을 변경하고 새로운 요소를 추가하는 것도 가능합니다.

### 3-2. 요소 선택하기

JavaScript로 HTML 요소를 제어하려면 먼저 그 요소를 선택해야 합니다. 

`document.getElementById("header")`는 id가 header인 요소를 선택합니다. `document.querySelector(".menu")`는 class가 menu인 첫 번째 요소를 선택합니다.

querySelector는 선택자를 사용해 요소를 찾는 메소드입니다. CSS 선택자와 똑같은 방식으로 요소를 선택할 수 있어서 편리합니다.

```javascript
// id가 title인 요소 선택
let titleElement = document.getElementById("title");

// class가 button인 첫 번째 요소 선택
let buttonElement = document.querySelector(".button");
```

### 3-3. 내용과 스타일 변경하기

요소를 선택한 후에는 다양한 변경이 가능합니다.

```javascript
// 텍스트 내용 바꾸기
let title = document.getElementById("title");
title.textContent = "새로운 제목";

// 색상 바꾸기
title.style.color = "blue";

// 클래스 추가하기 (CSS에 미리 정의된 스타일 적용)
title.classList.add("highlight");
```

## 4. 이벤트 처리하기

### 4-1. 이벤트의 개념

이벤트는 웹페이지에서 일어나는 모든 일을 말합니다. Event가 이벤트의 영어 표현입니다. 사용자가 버튼을 클릭하는 것도 이벤트입니다. 마우스를 움직이거나 키보드를 누르는 것도 이벤트입니다. 페이지가 로드되는 것 모두 이벤트입니다.

JavaScript는 이런 이벤트를 감지하고 반응할 수 있습니다. 버튼을 클릭했을 때 팝업을 띄울 수 있습니다. 마우스를 올렸을 때 메뉴를 표시할 수도 있습니다. 스크롤했을 때 애니메이션을 실행하는 등 다양한 상호작용을 만들 수 있습니다.

### 4-2. 이벤트 리스너 등록하기

이벤트 리스너는 특정 이벤트가 발생하기를 기다리다가 발생하면 지정된 함수를 실행합니다. Event Listener가 영어 표현이며 이벤트 감지기라고도 부릅니다.

```javascript
// 버튼 요소 선택
let button = document.querySelector("#myButton");

// 클릭 이벤트 리스너 추가
button.addEventListener('click', function() {
    alert('버튼이 클릭되었습니다');  // alert는 경고창을 띄우는 명령
});
```

### 4-3. 자주 사용하는 이벤트들

**click**: 요소를 클릭했을 때 발생합니다. 버튼, 링크, 이미지 등 모든 요소에 사용할 수 있습니다.

**submit**: 폼(form, 입력 양식)이 제출될 때 발생합니다. 사용자가 입력한 데이터를 검증하거나 서버로 전송하기 전에 처리할 작업이 있을 때 사용합니다.

**input**: 입력 필드의 값이 바뀔 때 발생합니다. 실시간으로 입력값을 검증하거나 자동완성 기능을 만들 때 사용합니다.

**load**: 페이지나 이미지가 완전히 로드되었을 때 발생합니다. 모든 리소스(자원)가 준비된 후 실행해야 할 코드가 있을 때 사용합니다.

## 5. 서버와 통신하기

### 5-1. 서버와 데이터 주고받기

웹페이지는 서버와 데이터를 주고받아야 합니다. 로그인할 때 아이디와 비밀번호를 서버로 보내거나, 상품 목록을 서버에서 받아오는 것이 대표적인 예입니다.

예전에는 데이터를 주고받을 때마다 페이지 전체를 새로고침했습니다. 이제는 JavaScript를 사용해서 페이지를 새로고침하지 않고도 서버와 통신할 수 있습니다.

이를 AJAX라고 부릅니다. AJAX는 Asynchronous JavaScript and XML의 줄임말입니다. 우리말로는 비동기 자바스크립트와 XML이라고 합니다.

### 5-2. Fetch API로 데이터 가져오기

Fetch API는 서버와 통신하는 최신 방법입니다. 서버에서 데이터를 가져올 때 사용합니다. 이를 GET이라고 부릅니다. 서버로 데이터를 보낼 때도 사용합니다. 이를 POST라고 부릅니다.

```javascript
// 서버에서 데이터 가져오기
fetch('https://api.example.com/products')  // fetch는 서버에 요청을 보내는 함수
    .then(response => response.json())     // then은 응답을 처리하는 메소드
    .then(data => {
        console.log(data);  // 받아온 데이터 출력
    });
```

대부분의 웹 API는 JSON 형식으로 데이터를 주고받습니다. JSON은 JavaScript Object Notation의 줄임말입니다. 우리말로는 자바스크립트 객체 표기법이라고 합니다.

JSON은 JavaScript 객체와 비슷하게 생긴 텍스트 형식입니다. 다양한 프로그래밍 언어에서 사용할 수 있습니다.

## 6. JavaScript 실전 활용

### 6-1. 폼 유효성 검사

사용자가 입력한 데이터가 올바른지 검사하는 것은 JavaScript의 중요한 역할입니다. 

```javascript
// 이메일 입력 필드 선택
let emailInput = document.querySelector("#email");

// 입력값이 바뀔 때마다 검사
emailInput.addEventListener('input', function() {
    let email = emailInput.value;
    
    // @ 기호가 있는지 간단히 확인
    if (email.includes('@')) {
        emailInput.style.borderColor = 'green';  // 올바른 형식
    } else {
        emailInput.style.borderColor = 'red';     // 잘못된 형식
    }
});
```

### 6-2. 동적 콘텐츠 추가

버튼을 클릭하면 새로운 항목이 추가되는 할 일 목록을 만들어봅시다.

```javascript
// 추가 버튼과 목록 요소 선택
let addButton = document.querySelector("#addButton");
let todoList = document.querySelector("#todoList");

// 버튼 클릭 시 새 항목 추가
addButton.addEventListener('click', function() {
    // 새로운 li 요소 생성
    let newItem = document.createElement('li');  // createElement는 새 요소를 만드는 메소드
    newItem.textContent = "새로운 할 일";
    
    // 목록에 추가
    todoList.appendChild(newItem);  // appendChild는 자식 요소를 추가하는 메소드
});
```

### 6-3. API 호출 맛보기 (14편에서 자세히 다룹니다)

외부 데이터를 가져오는 간단한 예제를 살펴보겠습니다. 실제 API 통신은 14편에서 깊이 있게 다룹니다.

```javascript
// 가짜 날씨 데이터를 가져오는 예제
// fetch는 외부 데이터를 가져오는 JavaScript 함수입니다
fetch('https://api.example.com/weather')
    .then(response => response.json())  // 응답을 JSON으로 변환
    .then(data => {
        // 받아온 데이터를 화면에 표시
        document.querySelector('#weather').textContent = data.temperature + '도';
    })
    .catch(error => {
        // 오류 발생 시 처리
        console.log('날씨 정보를 가져올 수 없습니다');
    });
```

이렇게 JavaScript는 외부 서버와 통신하여 실시간 데이터를 가져올 수 있습니다. 자세한 내용은 14편에서 다룹니다.

### 6-4. 간단한 애니메이션

요소를 부드럽게 숨기고 보이게 하는 토글 기능을 만들 수 있습니다. Toggle이 토글의 영어 표현이며 전환을 의미합니다.

```javascript
// 메뉴 버튼과 메뉴 요소 선택
let menuButton = document.querySelector("#menuButton");
let menu = document.querySelector("#menu");

// 버튼 클릭 시 메뉴 토글
menuButton.addEventListener('click', function() {
    // hidden 클래스가 있으면 제거, 없으면 추가
    menu.classList.toggle('hidden');  // toggle은 클래스를 켰다 껐다 하는 메소드
});
```

이런 기능들을 조합하면 탭 메뉴, 이미지 슬라이더, 모달 창, 드롭다운 메뉴 등 다양한 인터랙티브한 요소들을 만들 수 있습니다.

## 7. 에러 처리와 디버깅 기초

### 7-1. 자주 만나는 JavaScript 에러들

개발하다 보면 반드시 만나게 되는 에러들을 미리 알아두면 당황하지 않습니다.

**TypeError: Cannot read property of undefined**
```javascript
// 문제 상황
let user = {};
console.log(user.name.length);  // 에러! user.name이 undefined입니다

// 해결 방법
if (user.name) {
    console.log(user.name.length);
}
```

**ReferenceError: variable is not defined**
```javascript
// 문제 상황
console.log(myVariable);  // 에러! 선언하지 않은 변수

// 해결 방법
let myVariable = "값";
console.log(myVariable);
```

### 7-2. 디버깅 도구 활용하기

**console.log()로 값 확인하기**
```javascript
function calculateTotal(price, quantity) {
    console.log('가격:', price);  // 중간값 확인
    console.log('수량:', quantity);

    let total = price * quantity;
    console.log('합계:', total);  // 결과값 확인

    return total;
}
```

**브라우저 개발자 도구 활용**
- F12키로 개발자 도구 열기
- Console 탭에서 에러 메시지 확인
- Sources 탭에서 중단점(breakpoint) 설정하여 코드 실행 추적
- Network 탭에서 API 호출 상태 확인

### 7-3. 에러 예방 팁

1. **변수 선언 전 사용 확인**: 항상 변수를 먼저 선언하고 사용
2. **null/undefined 체크**: 객체 속성 접근 전 존재 여부 확인
3. **타입 확인**: typeof로 데이터 타입 확인
4. **try-catch 사용**: 예상되는 에러를 우아하게 처리

```javascript
try {
    // 위험할 수 있는 코드
    let data = JSON.parse(userInput);
} catch (error) {
    // 에러 발생 시 처리
    console.log('올바른 JSON 형식이 아닙니다');
}
```

---

**작성일: 2025-09-01 / 글자수: 5,527자 / 작성자: Claude / 프롬프터: 써니**