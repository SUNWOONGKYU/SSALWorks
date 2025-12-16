# Phase Gate 검증 체크리스트

## 💡 Tip

각 Phase가 끝나면 **Phase Gate 검증**을 통과해야 다음 단계로 넘어갈 수 있습니다.

## Phase Gate란?

품질 관리를 위한 관문입니다:
- 각 Phase 완료 시 필수 검증
- Main Agent가 직접 수행
- PO(Product Owner) 최종 승인

## 검증 체크리스트

### 1. 코드 품질
- [ ] 모든 파일에 Task ID 주석 있음
- [ ] 네이밍 컨벤션 준수
- [ ] 에러 핸들링 구현됨
- [ ] 보안 취약점 없음

### 2. 테스트
- [ ] 단위 테스트 통과 (80% 이상)
- [ ] 통합 테스트 통과
- [ ] E2E 테스트 통과 (핵심 기능)

### 3. 문서화
- [ ] API 문서 업데이트
- [ ] README 업데이트
- [ ] 변경 사항 기록

### 4. 빌드
- [ ] 빌드 성공
- [ ] 린트 오류 없음
- [ ] 타입 체크 통과

## 검증 결과 저장

```
ssal-grid/stage-gates/
└── S2GATE_verification_report.md
```

## 검증 결과 예시

```markdown
# S2 Stage Gate 검증 리포트

## 검증 결과: ✅ 통과

### 코드 품질: A
- Task ID 주석: 100%
- 네이밍 컨벤션: 100%

### 테스트 결과
- Unit Tests: 26/30 (86.7%)
- E2E Tests: 5/5 (100%)

### 결론
Phase 3 진행 가능
```

## 관련 문서
- `PROJECT_STATUS.md` - Phase 현황
