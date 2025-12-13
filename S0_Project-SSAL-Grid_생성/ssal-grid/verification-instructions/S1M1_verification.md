# Verification Instruction - S1M1

## Task ID
S1M1

## Task Name
요구사항 검토

## Verification Checklist

### 1. 문서 완성도 검증
- [ ] 요구사항 문서 파일 존재 확인
- [ ] 모든 섹션 작성 완료 (기능/비기능/기술 요구사항)
- [ ] 요구사항 ID 체계 일관성 (FR-001, NFR-001 등)

### 2. 내용 검증
- [ ] 기능 요구사항 최소 10개 이상 정의
- [ ] 비기능 요구사항 (성능, 보안, 확장성) 정의
- [ ] 우선순위 설정 완료 (P1, P2, P3)
- [ ] 수용 기준(Acceptance Criteria) 명확

### 3. 기술 스택 검증
- [ ] 프론트엔드 기술 스택 정의
- [ ] 백엔드 기술 스택 정의
- [ ] 데이터베이스 선정
- [ ] 외부 서비스 목록 (인증, 결제, AI)

### 4. 정합성 검증
- [ ] 요구사항 간 충돌 없음
- [ ] 모든 요구사항 구현 가능성 확인
- [ ] 의존성 명시 완료

## Test Commands
```bash
# 파일 존재 확인
ls -la P3_프로토타입_제작/Documentation/01_Requirements.md

# 내용 확인
cat P3_프로토타입_제작/Documentation/01_Requirements.md | head -100
```

## Expected Results
- 요구사항 문서 파일 존재
- 모든 섹션 작성 완료
- 요구사항 ID 체계 일관성

## Verification Agent
code-reviewer

## Pass Criteria
- 문서 완성도 100%
- 모든 체크리스트 항목 통과

---

## ⚠️ 저장 위치 검증 항목

### 필수 검증
- [ ] Task ID의 Stage에 맞는 폴더에 저장되었는가? (S1→S1_개발_준비/, S2→S2_개발-1차/, ...)
- [ ] Task ID의 Area에 맞는 폴더에 저장되었는가? (S→Security/, F→Frontend/, ...)
- [ ] Production 관련 코드(F, BA, D)는 Production 폴더에도 저장되었는가?

