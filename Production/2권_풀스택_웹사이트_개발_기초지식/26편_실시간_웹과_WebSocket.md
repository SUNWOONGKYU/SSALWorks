# 26편 | 실시간 웹과 WebSocket

---

25편에서 클라우드와 서버리스를 배웠습니다. 이제 현대 웹에서 점점 중요해지는 **실시간 통신**에 대해 알아보겠습니다. 채팅 앱, 실시간 알림, 협업 도구 같은 서비스들은 모두 **실시간 기술**을 사용합니다. 전통적인 HTTP 요청-응답 방식으로는 이런 기능을 효율적으로 구현하기 어렵습니다.

## 1. 실시간 웹의 필요성

### 1-1. 전통적 HTTP의 한계

HTTP는 **클라이언트가 요청해야만 서버가 응답**하는 구조입니다.

```
HTTP 통신:
Client ─► Request  ─► Server
Client ◄─ Response ◄─ Server
       (다음 요청까지 대기)
```

**문제점**:
- 서버가 먼저 메시지를 보낼 수 없음
- 새 데이터를 확인하려면 계속 요청해야 함
- 불필요한 네트워크 트래픽 발생

### 1-2. 실시간 통신이 필요한 서비스

| 서비스 유형 | 예시 |
|------------|------|
| 메시징 | 카카오톡, Slack, Discord |
| 협업 도구 | Google Docs, Figma, Notion |
| 게임 | 온라인 멀티플레이어 게임 |
| 금융 | 주식 시세, 암호화폐 거래소 |
| IoT | 센서 데이터 모니터링 |

## 2. 실시간 통신 방법들

### 2-1. Polling (폴링)

가장 단순한 방법으로, **주기적으로 서버에 요청**합니다.

```javascript
// 5초마다 서버에 새 메시지 확인
setInterval(async () => {
    const response = await fetch('/api/messages');
    const messages = await response.json();
    updateUI(messages);
}, 5000);
```

**장점**: 구현이 간단
**단점**: 불필요한 요청 발생, 실시간성 떨어짐

### 2-2. Long Polling (롱 폴링)

서버가 새 데이터가 있을 때까지 **응답을 지연**시킵니다.

```javascript
async function longPoll() {
    try {
        const response = await fetch('/api/messages/long-poll');
        const messages = await response.json();
        updateUI(messages);
    } finally {
        // 응답 받자마자 다시 요청
        longPoll();
    }
}

longPoll();
```

**장점**: 폴링보다 효율적
**단점**: 서버 리소스 소모, 연결 관리 복잡

### 2-3. Server-Sent Events (SSE)

서버가 클라이언트로 **단방향 실시간 데이터**를 전송합니다.

```javascript
// 클라이언트
const eventSource = new EventSource('/api/events');

eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log('새 데이터:', data);
};

eventSource.onerror = (error) => {
    console.error('SSE 에러:', error);
};
```

```javascript
// 서버 (Node.js/Express)
app.get('/api/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // 5초마다 데이터 전송
    const interval = setInterval(() => {
        res.write(`data: ${JSON.stringify({ time: new Date() })}\n\n`);
    }, 5000);

    req.on('close', () => clearInterval(interval));
});
```

**장점**: HTTP 기반, 자동 재연결
**단점**: 서버→클라이언트 단방향만 가능

### 2-4. WebSocket

**양방향 실시간 통신**을 위한 프로토콜입니다.

```
WebSocket 통신:
Client ◄─────────────────────► Server
       (양방향, 상시 연결)
```

## 3. WebSocket 상세

### 3-1. WebSocket이란?

WebSocket은 **단일 TCP 연결 위에서 전이중(full-duplex) 통신**을 제공합니다.

**특징**:
- 한 번 연결 후 계속 유지
- 서버와 클라이언트 모두 메시지 전송 가능
- 낮은 지연시간
- 적은 오버헤드

### 3-2. WebSocket 연결 과정

```
1. HTTP 업그레이드 요청
   Client → Server: "WebSocket으로 업그레이드 해주세요"

2. 서버 승인
   Server → Client: "좋습니다, WebSocket으로 전환합니다"

3. WebSocket 연결 수립
   Client ◄───────────────────► Server
          (양방향 메시지 교환)
```

### 3-3. 기본 WebSocket API

```javascript
// WebSocket 연결
const socket = new WebSocket('ws://localhost:8080');

// 연결 성공
socket.onopen = () => {
    console.log('연결됨');
    socket.send('안녕하세요!');
};

// 메시지 수신
socket.onmessage = (event) => {
    console.log('받은 메시지:', event.data);
};

// 에러 처리
socket.onerror = (error) => {
    console.error('에러:', error);
};

// 연결 종료
socket.onclose = () => {
    console.log('연결 끊김');
};

// 메시지 전송
socket.send('보낼 메시지');

// 연결 종료
socket.close();
```

## 4. Socket.IO

### 4-1. Socket.IO란?

**Socket.IO**는 실시간 양방향 통신을 쉽게 구현할 수 있는 라이브러리입니다.

**특징**:
- WebSocket 기반이지만 폴백 지원
- 자동 재연결
- 이벤트 기반 API
- 방(Room) 기능 지원

### 4-2. 서버 설정 (Node.js)

```javascript
const { Server } = require('socket.io');
const io = new Server(3000);

io.on('connection', (socket) => {
    console.log('사용자 연결:', socket.id);

    // 메시지 수신
    socket.on('chat message', (msg) => {
        console.log('메시지:', msg);
        // 모든 클라이언트에 전송
        io.emit('chat message', msg);
    });

    // 연결 종료
    socket.on('disconnect', () => {
        console.log('사용자 연결 해제:', socket.id);
    });
});
```

### 4-3. 클라이언트 설정

```html
<script src="/socket.io/socket.io.js"></script>
<script>
    const socket = io();

    // 메시지 전송
    function sendMessage() {
        const message = document.getElementById('message').value;
        socket.emit('chat message', message);
    }

    // 메시지 수신
    socket.on('chat message', (msg) => {
        const li = document.createElement('li');
        li.textContent = msg;
        document.getElementById('messages').appendChild(li);
    });
</script>
```

### 4-4. Room (방) 기능

```javascript
// 서버
io.on('connection', (socket) => {
    // 방 입장
    socket.on('join room', (roomName) => {
        socket.join(roomName);
        io.to(roomName).emit('notification', `새 사용자 입장`);
    });

    // 특정 방에만 메시지 전송
    socket.on('room message', ({ room, message }) => {
        io.to(room).emit('message', message);
    });
});
```

## 5. Supabase Realtime

### 5-1. Supabase 실시간 기능

Supabase는 PostgreSQL 기반의 **실시간 데이터베이스 변경 감지**를 제공합니다.

```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(url, key)

// 실시간 구독
const subscription = supabase
    .channel('messages')
    .on(
        'postgres_changes',
        {
            event: 'INSERT',
            schema: 'public',
            table: 'messages'
        },
        (payload) => {
            console.log('새 메시지:', payload.new)
        }
    )
    .subscribe()

// 구독 해제
subscription.unsubscribe()
```

### 5-2. 채널과 브로드캐스트

```javascript
// 브로드캐스트 (데이터베이스 없이 실시간 통신)
const channel = supabase.channel('room-1')

channel
    .on('broadcast', { event: 'cursor' }, (payload) => {
        console.log('다른 사용자 커서:', payload)
    })
    .subscribe()

// 커서 위치 전송
channel.send({
    type: 'broadcast',
    event: 'cursor',
    payload: { x: 100, y: 200 }
})
```

### 5-3. Presence (참석 상태)

```javascript
const channel = supabase.channel('room-1')

// 현재 접속자 추적
channel.on('presence', { event: 'sync' }, () => {
    const state = channel.presenceState()
    console.log('접속자 목록:', state)
})

// 내 상태 설정
channel.subscribe(async (status) => {
    if (status === 'SUBSCRIBED') {
        await channel.track({
            user_id: 'user-123',
            online_at: new Date().toISOString()
        })
    }
})
```

## 6. 실시간 앱 설계 패턴

### 6-1. 이벤트 기반 아키텍처

```
Event:  UserJoined, MessageSent, UserLeft
        │
        ▼
    ┌───────────┐
    │  Handler  │ ─► 처리 로직
    └───────────┘
        │
        ▼
    ┌───────────┐
    │ Broadcast │ ─► 관련 클라이언트에 전송
    └───────────┘
```

### 6-2. 메시지 형식

```javascript
// 표준화된 메시지 형식
const message = {
    type: 'CHAT_MESSAGE',
    payload: {
        id: 'msg-123',
        userId: 'user-456',
        content: '안녕하세요!',
        timestamp: '2025-01-01T12:00:00Z'
    }
};
```

### 6-3. 연결 상태 관리

```javascript
class ConnectionManager {
    constructor() {
        this.isConnected = false;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
    }

    connect() {
        this.socket = new WebSocket(this.url);

        this.socket.onopen = () => {
            this.isConnected = true;
            this.reconnectAttempts = 0;
        };

        this.socket.onclose = () => {
            this.isConnected = false;
            this.attemptReconnect();
        };
    }

    attemptReconnect() {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            setTimeout(() => this.connect(), 1000 * this.reconnectAttempts);
        }
    }
}
```

## 7. 실시간 통신 비교

### 7-1. 방법별 비교

| 방법 | 방향 | 지연시간 | 복잡도 | 사용 사례 |
|------|------|----------|--------|----------|
| Polling | 단방향 | 높음 | 낮음 | 간단한 업데이트 |
| Long Polling | 단방향 | 중간 | 중간 | 알림 |
| SSE | 단방향 | 낮음 | 중간 | 피드, 알림 |
| WebSocket | 양방향 | 낮음 | 높음 | 채팅, 게임 |

### 7-2. 선택 가이드

**WebSocket 사용**:
- 양방향 통신이 필요할 때
- 낮은 지연시간이 중요할 때
- 채팅, 게임, 협업 도구

**SSE 사용**:
- 서버에서 클라이언트로만 데이터 전송
- 뉴스 피드, 알림
- 간단한 실시간 업데이트

## 8. 보안과 최적화

### 8-1. WebSocket 보안

```javascript
// WSS (WebSocket Secure) 사용
const socket = new WebSocket('wss://secure.example.com');

// 인증 토큰 전송
socket.onopen = () => {
    socket.send(JSON.stringify({
        type: 'AUTH',
        token: 'jwt-token-here'
    }));
};
```

### 8-2. 메시지 검증

```javascript
// 서버에서 메시지 검증
socket.on('message', (data) => {
    try {
        const message = JSON.parse(data);

        // 필수 필드 확인
        if (!message.type || !message.payload) {
            throw new Error('잘못된 메시지 형식');
        }

        // XSS 방지
        message.payload.content = sanitize(message.payload.content);

        processMessage(message);
    } catch (error) {
        console.error('메시지 처리 실패:', error);
    }
});
```

## 핵심 정리

| 기술 | 특징 | 추천 사용처 |
|------|------|------------|
| **WebSocket** | 양방향, 저지연 | 채팅, 게임 |
| **SSE** | 단방향, 간단 | 알림, 피드 |
| **Socket.IO** | WebSocket + 편의기능 | 범용 실시간 앱 |
| **Supabase Realtime** | DB 변경 감지 | 데이터 동기화 |

실시간 웹 기술은 현대 웹 애플리케이션에서 **사용자 경험을 크게 향상**시킵니다. 적절한 기술을 선택하고 올바르게 구현하면 빠르고 반응적인 애플리케이션을 만들 수 있습니다. 다음 편에서는 앞으로의 학습 로드맵에 대해 안내하겠습니다.

---

**작성일: 2025-01-01 / 수정일: 2025-12-20 / 글자수: 약 5,800자 / 작성자: Claude / 프롬프터: 써니**
