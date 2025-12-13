# Verification Instruction - S2F2

## Task ID
S2F2

## Task Name
구독 플랜 페이지

## Verification Checklist

### 1. 파일 존재 검증
- [ ] pricing.html 존재
- [ ] 가격 표시 스타일

### 2. 플랜 카드 검증
- [ ] Free 플랜 카드
- [ ] Basic 플랜 카드
- [ ] Premium 플랜 카드
- [ ] 각 플랜 가격 표시
- [ ] 기능 목록 표시

### 3. CTA 버튼 검증
- [ ] 각 플랜별 선택 버튼
- [ ] 로그인 상태별 버튼 텍스트
- [ ] 결제 페이지 연결

### 4. 비교 표 검증 (선택)
- [ ] 기능별 비교 표
- [ ] 체크마크/X 아이콘

### 5. 반응형 검증
- [ ] 모바일에서 카드 세로 배치
- [ ] 가격 정보 가독성

## Test Commands
```bash
# 파일 존재 확인
ls -la P3_프로토타입_제작/Frontend/Prototype/pages/subscription/pricing.html

# 플랜 카드 확인
grep -E "(plan|price)" P3_프로토타입_제작/Frontend/Prototype/pages/subscription/pricing.html
```

## Expected Results
- 가격 페이지 존재
- 3개 플랜 카드 표시
- CTA 버튼 동작

## Verification Agent
frontend-developer

## Pass Criteria
- Free, Basic, Premium 3개 플랜 표시
- 가격 정보 정확
- 결제 페이지 연결

---

## ⚠️ 저장 위치 검증 항목

### 필수 검증
- [ ] Task ID의 Stage에 맞는 폴더에 저장되었는가? (S1→S1_개발_준비/, S2→S2_개발-1차/, ...)
- [ ] Task ID의 Area에 맞는 폴더에 저장되었는가? (S→Security/, F→Frontend/, ...)
- [ ] Production 관련 코드(F, BA, D)는 Production 폴더에도 저장되었는가?

