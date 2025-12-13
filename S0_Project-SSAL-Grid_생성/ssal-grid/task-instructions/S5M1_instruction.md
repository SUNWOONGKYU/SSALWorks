# Task Instruction - S5M1

## Task ID
S5M1

## Task Name
출시 체크리스트

## Task Goal
프로덕션 배포 전 최종 출시 준비 상태 점검

## Prerequisites (Dependencies)
- S4T2 (E2E 결제 테스트) 완료
- S4O1 (PG사 설정) 완료

## Specific Instructions

### 1. 기능 완성도 체크리스트

#### 인증 시스템
- [ ] Google OAuth 로그인
- [ ] 이메일 로그인
- [ ] 비밀번호 재설정
- [ ] 세션 관리
- [ ] 로그아웃

#### 구독 시스템
- [ ] 구독 플랜 표시
- [ ] 구독 신청
- [ ] 구독 상태 조회
- [ ] 구독 해지
- [ ] 결제 수단 변경

#### 결제 시스템
- [ ] 카드 결제
- [ ] 정기 결제 (빌링)
- [ ] 결제 취소
- [ ] 환불 처리
- [ ] 결제 내역 조회

#### AI 시스템
- [ ] AI Q&A 기능
- [ ] 사용량 추적
- [ ] 사용량 제한
- [ ] 구독 등급별 권한

#### 콘텐츠 시스템
- [ ] 학습 콘텐츠 목록
- [ ] 콘텐츠 상세 조회
- [ ] CDN 연동

### 2. 성능 점검

```
성능 기준:
- 페이지 로드: < 3초
- API 응답: < 500ms
- Time to First Byte: < 200ms
- Lighthouse 점수: > 80

테스트 방법:
- Lighthouse 실행
- WebPageTest
- 실제 디바이스 테스트
```

### 3. 보안 점검

```
보안 체크:
- [ ] HTTPS 강제
- [ ] API 키 노출 없음
- [ ] SQL Injection 방지
- [ ] XSS 방지
- [ ] CORS 설정
- [ ] Rate Limiting
- [ ] 민감정보 암호화
```

### 4. SEO 점검

```
SEO 체크:
- [ ] 메타 태그 (title, description)
- [ ] Open Graph 태그
- [ ] robots.txt
- [ ] sitemap.xml
- [ ] 구조화된 데이터
- [ ] 모바일 친화성
```

### 5. 법적 요구사항

```
필수 페이지:
- [ ] 이용약관
- [ ] 개인정보처리방침
- [ ] 결제/환불 정책
- [ ] 쿠키 정책

표시 사항:
- [ ] 사업자 정보
- [ ] 연락처
- [ ] 통신판매업 신고번호
```

### 6. 운영 준비

```
운영 체크:
- [ ] 도메인 확보
- [ ] SSL 인증서
- [ ] 이메일 서비스 설정
- [ ] 고객 지원 채널
- [ ] 모니터링 도구
- [ ] 에러 알림 설정
```

### 7. 출시 체크리스트 문서
- 위치: `docs/LAUNCH_CHECKLIST.md`

```markdown
# SSALWorks 출시 체크리스트

## 출시일: YYYY-MM-DD

---

## 1. 기능 완성도 (/20)
| 항목 | 상태 | 담당 | 비고 |
|------|------|------|------|
| Google OAuth | ✅ | | |
| 이메일 로그인 | ✅ | | |
| ... | | | |

## 2. 성능 (/5)
| 지표 | 목표 | 현재 | 상태 |
|------|------|------|------|
| 페이지 로드 | <3s | 2.1s | ✅ |
| API 응답 | <500ms | 320ms | ✅ |
| Lighthouse | >80 | 85 | ✅ |

## 3. 보안 (/7)
- [x] HTTPS 강제
- [x] API 키 보호
- ...

## 4. SEO (/6)
- [x] 메타 태그
- [x] sitemap.xml
- ...

## 5. 법적 요구사항 (/4)
- [x] 이용약관
- [x] 개인정보처리방침
- ...

## 6. 운영 준비 (/6)
- [x] 도메인 연결
- [x] 모니터링 설정
- ...

---

## 총점: __/48

## 출시 승인
- [ ] 기술 검토 완료
- [ ] 법무 검토 완료
- [ ] 경영진 승인

## 출시 담당자 서명
- 기술: _____________
- 운영: _____________
```

### 8. 출시 후 모니터링 계획

```
출시 후 24시간:
- 실시간 에러 모니터링
- 결제 성공률 확인
- 사용자 피드백 수집

출시 후 1주일:
- 성능 지표 분석
- 버그 리포트 처리
- 사용 패턴 분석

출시 후 1개월:
- KPI 달성 여부 확인
- 사용자 만족도 조사
- 개선 사항 도출
```

## Expected Output Files
- `docs/LAUNCH_CHECKLIST.md`
- `docs/POST_LAUNCH_PLAN.md`

## Completion Criteria
- [ ] 기능 완성도 체크리스트 100%
- [ ] 성능 기준 충족
- [ ] 보안 점검 완료
- [ ] SEO 점검 완료
- [ ] 법적 요구사항 충족
- [ ] 운영 준비 완료
- [ ] 출시 체크리스트 문서 완성

## Tech Stack
- N/A (검토 작업)

## Tools
- Read
- Bash (테스트 도구 실행)

## Execution Type
Human-Assisted

## Remarks
- 체크리스트 미충족 항목은 출시 전 반드시 해결
- 각 항목별 담당자 지정
- 출시일 최소 1주일 전 완료 목표

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

