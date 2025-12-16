# Production vs Prototype 폴더 차이

## 질문
Production 폴더와 Prototype 폴더의 차이가 뭔가요?

## 답변

### 폴더 구조

```
C:\!SSAL_Works_Private\
├── Production\           ← 실제 배포용
│   └── Frontend\
│       ├── index.html
│       └── pages\
│
└── P3_프로토타입_제작\    ← 개발/테스트용
    └── Frontend\
        └── Prototype\
            ├── index.html
            └── pages\
```

### 차이점

| 항목 | Production | Prototype |
|------|-----------|-----------|
| 용도 | 실제 배포 | 개발/테스트 |
| 경로 | `/Production/Frontend/` | `/P3_프로토타입_제작/Frontend/Prototype/` |
| 데이터 | 실제 데이터 | 테스트 데이터 |
| OAuth | 프로덕션 Redirect URL | localhost |

### 주의사항

**경로 혼동 문제**
- 개발 중 실수로 Prototype 경로를 Production에 사용하면 오류 발생
- 특히 OAuth Redirect URL 설정 시 주의

**잘못된 예:**
```javascript
// Production 파일인데 Prototype 경로 사용
redirectTo: '/P3_프로토타입_제작/Frontend/Prototype/index.html'  // ❌
```

**올바른 예:**
```javascript
// Production 파일에는 Production 경로
redirectTo: '/Production/Frontend/index.html'  // ✅
```

### 개발 완료 후

프로토타입 개발 완료 시:
1. Prototype 코드를 Production으로 복사/이동
2. 모든 경로를 Production 경로로 수정
3. 환경변수를 프로덕션용으로 변경

### 실제 경험

SSAL Works 개발 중 Production 폴더의 login.html에서 Prototype 경로로 redirect 설정되어 있어 Google 로그인 후 오류 발생.
모든 redirect 경로를 Production으로 수정하여 해결.

### 관련 커밋
- `cbbd27c` - fix: Production 경로로 redirect URL 수정
