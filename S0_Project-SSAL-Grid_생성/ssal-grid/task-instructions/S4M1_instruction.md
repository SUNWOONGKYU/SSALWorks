# Task Instruction - S4M1

## Task ID
S4M1

## Task Name
MVP 최종 검토

## Task Goal
결제 연동 전 전체 시스템 검토 및 준비 상태 확인

## Prerequisites (Dependencies)
- S3BA1 (AI Q&A API) 완료
- S3S1 (구독 권한 체크) 완료
- S3E1 (AI API 키 설정) 완료

## Specific Instructions

### 1. 기능 체크리스트 검토

#### 인증 시스템
- [ ] Google OAuth 로그인 동작
- [ ] 이메일 로그인 동작
- [ ] 세션 유지 및 갱신
- [ ] 로그아웃 동작

#### 구독 시스템
- [ ] 구독 상태 조회 API
- [ ] 구독 신청 API
- [ ] 구독 해지 API
- [ ] 권한 체크 동작

#### AI 시스템
- [ ] AI Q&A API 동작
- [ ] 사용량 추적 동작
- [ ] 사용량 제한 동작
- [ ] 에러 핸들링

#### 콘텐츠 시스템
- [ ] 학습 콘텐츠 목록 조회
- [ ] 콘텐츠 상세 조회
- [ ] CDN 연동 동작

### 2. 성능 기준 확인
```
API 응답 시간:
- 인증 API: < 500ms
- 조회 API: < 200ms
- AI API: < 5000ms

가용성:
- Vercel: 99.9% uptime
- Supabase: 99.9% uptime
```

### 3. 보안 점검
- [ ] API 키 노출 없음
- [ ] SQL Injection 방지
- [ ] XSS 방지
- [ ] CORS 설정 확인
- [ ] Rate Limiting 설정

### 4. 결제 연동 준비 사항
- [ ] 토스 페이먼트 계정 준비
- [ ] 사업자 정보 확인
- [ ] 결제 테스트 환경 준비
- [ ] 결제 실패 시 처리 로직 설계

### 5. 검토 보고서 작성
- 위치: `docs/MVP_REVIEW_REPORT.md`

```markdown
# MVP 검토 보고서

## 검토 일자
YYYY-MM-DD

## 기능 검토 결과
| 기능 | 상태 | 비고 |
|------|------|------|
| Google OAuth | ✅ | |
| 이메일 로그인 | ✅ | |
| ... | | |

## 성능 측정 결과
| API | 평균 응답시간 | 기준 | 결과 |
|-----|--------------|------|------|
| /api/auth/google | 320ms | <500ms | ✅ |
| ... | | | |

## 보안 점검 결과
- SQL Injection: ✅ 안전
- XSS: ✅ 안전
- ...

## 결제 연동 준비 상태
- [ ] PG사 계정: 준비됨/미준비
- [ ] 테스트 환경: 준비됨/미준비

## 종합 의견
결제 연동 진행 가능/불가능 (사유: xxx)
```

## Expected Output Files
- `docs/MVP_REVIEW_REPORT.md`
- 검토 체크리스트 완료

## Completion Criteria
- [ ] 모든 기능 체크리스트 확인
- [ ] 성능 기준 충족 확인
- [ ] 보안 점검 완료
- [ ] 결제 연동 준비 상태 확인
- [ ] 검토 보고서 작성

## Tech Stack
- N/A (검토 작업)

## Tools
- Read
- Bash (API 테스트)

## Execution Type
Human-Assisted

## Remarks
- 결제 연동 전 필수 관문
- 문제 발견 시 해당 Task로 돌아가 수정
- PG사 심사 기간 고려 (1-2주)

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

