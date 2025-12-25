# 02. Save Location Rules

> 5 Areas saved to Production require dual storage

---

## 1. Dual Storage Targets (5 Areas)

| # | Area | Description | Stage Folder | Production Folder |
|---|------|-------------|--------------|-------------------|
| 1 | **F** | Frontend | `S?_*/Frontend/` | `Production/Frontend/` |
| 2 | **BA** | Backend APIs | `S?_*/Backend_APIs/` | `Production/api/Backend_APIs/` |
| 3 | **S** | Security | `S?_*/Security/` | `Production/api/Security/` |
| 4 | **BI** | Backend Infra | `S?_*/Backend_Infra/` | `Production/api/Backend_Infra/` |
| 5 | **E** | External | `S?_*/External/` | `Production/api/External/` |

---

## 2. Areas Not Saved to Production (6 Areas)

| # | Area | Description | Reason |
|---|------|-------------|--------|
| 1 | M | Documentation | Documentation - no deployment needed |
| 2 | U | Design | Design files - no deployment needed |
| 3 | D | Database | SQL - executed directly in database |
| 4 | T | Testing | Test code - no deployment needed |
| 5 | O | DevOps | Config/scripts - managed separately |
| 6 | C | Content | Content - stored in database |

---

## 3. Storage Examples

### Frontend (F Area)
```
Task: S2F1
File: google-login.html

Storage locations:
1. S2_Dev-Phase1/Frontend/pages/auth/google-login.html     <- Stage
2. Production/Frontend/pages/auth/google-login.html        <- Production
```

### Backend APIs (BA Area)
```
Task: S2BA1
File: subscription-cancel.js

Storage locations:
1. S2_Dev-Phase1/Backend_APIs/subscription-cancel.js       <- Stage
2. Production/api/Backend_APIs/subscription-cancel.js      <- Production
```

### Security (S Area)
```
Task: S2S1
File: google-callback.js

Storage locations:
1. S2_Dev-Phase1/Security/google-callback.js               <- Stage
2. Production/api/Security/google-callback.js              <- Production
```

---

## 4. Production Folder Structure

```
Production/
├── index.html                    <- Main dashboard
│
├── Frontend/                     <- F Area
│   ├── pages/
│   │   ├── auth/                 # Auth-related pages
│   │   └── subscription/         # Subscription-related pages
│   └── assets/                   # CSS, JS, images
│
├── api/                          <- API (4 Areas)
│   ├── Backend_APIs/             # BA Area
│   ├── Security/                 # S Area
│   ├── Backend_Infra/            # BI Area
│   └── External/                 # E Area
│
├── vercel.json                   <- Vercel config
└── package.json                  <- Package config
```

---

## 5. Copy Rules

**Copy as-is without renaming:**
```
Stage:      S2_Dev-Phase1/Backend_APIs/google-login.js
                         | (copy as-is)
Production: Production/api/Backend_APIs/google-login.js
```

---

## Checklist

- [ ] Is it one of the 5 Areas (F, BA, S, BI, E)?
- [ ] Saved to Stage folder?
- [ ] Copied to Production folder?
- [ ] Same filename?
