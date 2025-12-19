# Phase Gate 검증

## 요약
Phase Gate는 다음 단계 진행 전 품질을 보장하는 관문. 모든 Task 완료 + 테스트 통과 + 코드 리뷰 완료 + 문서화 완료 + PO 승인 → 다음 Phase 진행.

## 상세

### Phase Gate 통과 조건

| 조건 | 설명 |
|------|------|
| 모든 Task 완료 | Stage 내 전체 Task 100% 완료 |
| 테스트 통과 | 단위/통합/E2E 테스트 전체 통과 |
| 코드 리뷰 완료 | Verification Agent 검증 완료 |
| 문서화 완료 | 작업 결과 및 검증 리포트 작성 |
| PO 승인 | Project Owner 최종 승인 |

### 검증 프로세스

```
Stage 내 모든 Task 완료
    ↓
AI Stage Gate 검증 (Main Agent)
    ↓
검증 리포트 작성 (stage-gates/S{N}GATE_verification_report.md)
    ↓
PO 테스트 가이드 제공
    ↓
PO 직접 테스트 및 승인
    ↓
다음 Stage 진행
```

### 주의
- AI 검증만으로 Stage Gate 통과 불가 (PO 승인 필수)
- 하나라도 실패 시 전체 Gate 불통과

---
📚 더 자세히: `.claude/rules/06_verification.md`
