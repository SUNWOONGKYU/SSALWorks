# 02. 저장위치 규칙

> Production에 저장하는 5개 Area는 이중 저장 필수

---

## 1. 이중 저장 대상 (5개 Area)

| # | Area | 설명 | Stage 폴더 | Production 폴더 |
|---|------|------|------------|-----------------|
| 1 | **F** | Frontend | `S?_*/Frontend/` | `Production/Frontend/` |
| 2 | **BA** | Backend APIs | `S?_*/Backend_APIs/` | `Production/api/Backend_APIs/` |
| 3 | **S** | Security | `S?_*/Security/` | `Production/api/Security/` |
| 4 | **BI** | Backend Infra | `S?_*/Backend_Infra/` | `Production/api/Backend_Infra/` |
| 5 | **E** | External | `S?_*/External/` | `Production/api/External/` |

---

## 2. 저장 안 하는 Area (6개)

| # | Area | 설명 | 이유 |
|---|------|------|------|
| 1 | M | Documentation | 문서 - 배포 불필요 |
| 2 | U | Design | 디자인 파일 - 배포 불필요 |
| 3 | D | Database | SQL - Supabase에서 직접 실행 |
| 4 | T | Testing | 테스트 코드 - 배포 불필요 |
| 5 | O | DevOps | 설정/스크립트 - 별도 관리 |
| 6 | C | Content | 콘텐츠 - DB에 저장 |

---

## 3. 저장 예시

### Frontend (F Area)
```
Task: S2F1
파일: google-login.html

저장 위치:
1. S2_개발-1차/Frontend/pages/auth/google-login.html     ← Stage
2. Production/Frontend/pages/auth/google-login.html      ← Production
```

### Backend APIs (BA Area)
```
Task: S2BA1
파일: subscription-cancel.js

저장 위치:
1. S2_개발-1차/Backend_APIs/subscription-cancel.js       ← Stage
2. Production/api/Backend_APIs/subscription-cancel.js    ← Production
```

### Security (S Area)
```
Task: S2S1
파일: google-callback.js

저장 위치:
1. S2_개발-1차/Security/google-callback.js               ← Stage
2. Production/api/Security/google-callback.js            ← Production
```

---

## 4. Production 폴더 구조

```
Production/
├── index.html                    ← 메인 대시보드
│
├── Frontend/                     ← F Area
│   ├── pages/
│   │   ├── auth/                 # 인증 관련 페이지
│   │   └── subscription/         # 구독 관련 페이지
│   └── assets/                   # CSS, JS, 이미지
│
├── api/                          ← API (4개 Area)
│   ├── Backend_APIs/             # BA Area
│   ├── Security/                 # S Area
│   ├── Backend_Infra/            # BI Area
│   └── External/                 # E Area
│
├── vercel.json                   ← Vercel 설정
└── package.json                  ← 패키지 설정
```

---

## 5. 복사 규칙

**이름 변경 없이 그대로 복사:**
```
Stage:      S2_개발-1차/Backend_APIs/google-login.js
                         ↓ (그대로 복사)
Production: Production/api/Backend_APIs/google-login.js
```

---

## 체크리스트

- [ ] 5개 Area (F, BA, S, BI, E) 중 하나인가?
- [ ] Stage 폴더에 저장했는가?
- [ ] Production 폴더에도 복사했는가?
- [ ] 파일명이 동일한가?
