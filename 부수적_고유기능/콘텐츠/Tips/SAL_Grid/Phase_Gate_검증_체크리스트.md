# Phase Gate 검증 체크리스트

## 핵심 요약

Phase Gate는 다음 단계 진행 전 품질을 보장하는 관문입니다. 1) 모든 Task 완료, 2) 테스트 통과, 3) 코드 리뷰 완료, 4) 문서화 완료 - 4가지 모두 충족해야 다음 Phase로 진행합니다.

## Phase Gate란?

### 개념

```
Phase Gate = 단계 관문

각 Stage 완료 시 품질을 검증하는 체크포인트
→ 통과해야만 다음 Stage 진행 가능
→ 문제를 조기에 발견하여 비용 절감
```

### Phase Gate 통과 조건

| 조건 | 설명 | 필수 여부 |
|------|------|----------|
| 모든 Task 완료 | Stage 내 전체 Task 100% 완료 | ✅ 필수 |
| 테스트 통과 | 단위/통합/E2E 테스트 전체 통과 | ✅ 필수 |
| 코드 리뷰 완료 | Verification Agent 검증 완료 | ✅ 필수 |
| 문서화 완료 | 작업 결과 및 검증 리포트 작성 | ✅ 필수 |
| PO 승인 | Project Owner 최종 승인 | ✅ 필수 |

## 검증 프로세스

### 전체 흐름

```
[Stage 내 모든 Task 완료]
    ↓
[AI Stage Gate 검증]
    ├── 1. 모든 Task 완료 확인
    ├── 2. 테스트 전체 통과 확인
    ├── 3. 빌드 성공 확인
    └── 4. 의존성 체인 완결성 확인
    ↓
[검증 리포트 작성]
    └── stage-gates/S{N}GATE_verification_report.md
    ↓
[PO 테스트 가이드 제공]
    ↓
[PO 직접 테스트]
    ↓
[PO 최종 승인]
    ↓
[다음 Stage 진행]
```

### 검증 단계별 수행자

| 단계 | 수행자 | 역할 |
|------|--------|------|
| Task 검증 | Verification Agent (서브에이전트) | 개별 Task 검증 |
| Stage Gate 검증 | Main Agent (직접) | 전체 Stage 검증 |
| 테스트 가이드 | Main Agent | PO용 가이드 작성 |
| 최종 승인 | Project Owner | 최종 확인 및 승인 |

## 상세 체크리스트

### 1. 모든 Task 완료 확인

```
체크 항목:

□ Stage 내 모든 Task의 status가 '완료'인가?
□ 각 Task의 progress가 100%인가?
□ 누락된 Task가 없는가?
□ 미완료 Task에 대한 사유가 문서화되었는가?

확인 방법:
- SAL Grid에서 Stage 필터링
- 완료되지 않은 Task 목록 확인
- 각 Task의 generated_files 확인
```

### 2. 테스트 통과 확인

```
체크 항목:

□ 단위 테스트 전체 통과 (Unit Tests)
□ 통합 테스트 전체 통과 (Integration Tests)
□ E2E 테스트 전체 통과 (End-to-End Tests)
□ 테스트 커버리지 기준 충족
□ 새로운 테스트 케이스 추가됨

테스트 실행 명령어:
npm test              # 단위 테스트
npm run test:e2e      # E2E 테스트
npm run test:coverage # 커버리지 확인
```

### 3. 빌드 확인

```
체크 항목:

□ 빌드가 성공하는가?
□ 린트 에러가 없는가?
□ 타입 에러가 없는가?
□ 빌드 경고가 허용 범위 내인가?

빌드 명령어:
npm run build   # 빌드
npm run lint    # 린트 검사
npm run typecheck  # 타입 검사
```

### 4. 코드 리뷰 완료 확인

```
체크 항목:

□ 각 Task별 Verification Agent 검증 완료
□ 검증 결과가 Grid에 기록됨
□ 발견된 이슈가 모두 해결됨
□ 코드 품질 기준 충족

Grid 필드 확인:
- #16 Test: 테스트 결과
- #17 Build: 빌드 결과
- #18 Integration: 통합 검증
- #20 Comprehensive Verification: 종합 검증
```

### 5. 문서화 완료 확인

```
체크 항목:

□ 각 Task별 작업 결과 보고서 작성됨
□ 검증 결과 보고서 작성됨
□ API 문서 업데이트됨 (해당 시)
□ 사용자 가이드 업데이트됨 (해당 시)
□ Stage Gate 검증 리포트 작성됨

문서 위치:
- 작업 결과: Web_ClaudeCode_Bridge/outbox/
- Stage Gate: S0_Project-SSAL-Grid_생성/ssal-grid/stage-gates/
```

## Stage Gate 검증 리포트 형식

### 리포트 저장 위치

```
S0_Project-SSAL-Grid_생성/ssal-grid/stage-gates/
├── S1GATE_verification_report.md
├── S2GATE_verification_report.md
├── S3GATE_verification_report.md
├── S4GATE_verification_report.md
└── S5GATE_verification_report.md
```

### 리포트 템플릿

```markdown
# S{N} Stage Gate 검증 리포트

## 검증 일시
- 검증일: YYYY-MM-DD
- 검증자: Claude Code (Main Agent)

## Task 완료 현황
| Task ID | Task명 | 상태 | 검증 결과 |
|---------|--------|------|----------|
| S{N}XX1 | ... | ✅ 완료 | ✅ 통과 |

## 테스트 결과
- 단위 테스트: ✅ N/N 통과
- 통합 테스트: ✅ N/N 통과
- E2E 테스트: ✅ N/N 통과

## 빌드 결과
- 컴파일: ✅ 성공
- 린트: ✅ 0 errors
- 타입체크: ✅ 0 errors

## 종합 판정
- AI 검증 결과: ✅ 통과 / ❌ 불통과
- 비고: [추가 의견]

## PO 승인
- [ ] PO 테스트 완료
- [ ] PO 승인
```

## PO 테스트 가이드 제공

### 필수 제공 항목

```
AI 검증 완료 후 PO에게 제공해야 할 것:

1. 테스트 가능 조건
   - 필요한 외부 설정 완료 여부
   - 서버 실행 방법
   - 환경 변수 설정 상태

2. 기능별 테스트 가이드
   - 테스트 파일/URL
   - 테스트 단계
   - 예상 결과
   - 필요 설정

3. 설정 완료 체크리스트
   - [ ] 설정 항목 1
   - [ ] 설정 항목 2
```

### 테스트 가이드 예시

```
"S2 Stage Gate AI 검증 완료되었습니다.

[테스트 1: 회원가입]
- 파일: Production/Frontend/pages/auth/signup.html
- 방법: 브라우저에서 열고 폼 작성 후 제출
- 예상 결과: 성공 메시지 표시, DB에 사용자 생성
- 필요 설정: Supabase 연결 완료

[테스트 2: 로그인]
- 파일: Production/Frontend/pages/auth/login.html
- 방법: 가입한 계정으로 로그인 시도
- 예상 결과: 대시보드로 이동
- 필요 설정: 위 회원가입 테스트 완료

테스트 후 결과 알려주세요."
```

## Stage별 특수 검증 항목

### S1 (개발 준비) Gate

```
추가 검증 항목:
□ 개발 환경 설정 완료
□ DB 스키마 생성 완료
□ 인증 설정 완료
□ 기본 프로젝트 구조 완성
```

### S2-S4 (개발) Gate

```
추가 검증 항목:
□ 신규 기능 테스트 완료
□ 기존 기능 회귀 테스트 완료
□ API 문서 업데이트
□ 성능 기준 충족
```

### S5 (운영) Gate

```
추가 검증 항목:
□ 프로덕션 배포 완료
□ 도메인 연결 완료
□ SSL 인증서 설정
□ 모니터링 설정 완료
□ 백업 설정 완료
```

## 주의사항

- AI 검증만으로 Stage Gate 통과 불가 (PO 승인 필수)
- 검증 리포트는 반드시 파일로 저장
- PO 테스트 가이드 없이 승인 요청 금지
- 외부 설정 미완료 시 테스트 요청 금지
- 하나라도 실패 시 전체 Gate 불통과
- Gate 불통과 시 문제 해결 후 재검증

