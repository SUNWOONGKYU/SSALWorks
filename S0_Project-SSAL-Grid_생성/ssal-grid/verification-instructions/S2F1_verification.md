# Verification Instruction - S2F1

## Task ID
S2F1

## Task Name
마이페이지 UI

## Verification Checklist

### 1. 파일 존재 검증
- [ ] mypage/index.html 존재
- [ ] mypage/subscription.html 존재
- [ ] mypage/usage.html 존재

### 2. 프로필 섹션 검증
- [ ] 사용자 정보 표시 영역
- [ ] 프로필 편집 기능
- [ ] 비밀번호 변경 링크

### 3. 구독 관리 섹션 검증
- [ ] 현재 구독 상태 표시
- [ ] 구독 플랜 정보
- [ ] 다음 결제일 표시
- [ ] 구독 변경/해지 버튼

### 4. 사용량 섹션 검증
- [ ] AI 사용량 표시
- [ ] 사용량 그래프/차트
- [ ] 남은 한도 표시

### 5. 네비게이션 검증
- [ ] 사이드바 메뉴
- [ ] 탭 네비게이션
- [ ] 반응형 메뉴

## Test Commands
```bash
# 파일 존재 확인
ls -la P3_프로토타입_제작/Frontend/Prototype/pages/mypage/

# HTML 구조 확인
grep -E "(section|div class)" P3_프로토타입_제작/Frontend/Prototype/pages/mypage/index.html
```

## Expected Results
- 마이페이지 파일 존재
- 프로필, 구독, 사용량 섹션 포함
- 반응형 레이아웃 동작

## Verification Agent
frontend-developer

## Pass Criteria
- 3개 주요 섹션 존재
- 네비게이션 동작
- 반응형 레이아웃 확인

---

## ⚠️ 저장 위치 검증 항목

### 필수 검증
- [ ] Task ID의 Stage에 맞는 폴더에 저장되었는가? (S1→S1_개발_준비/, S2→S2_개발-1차/, ...)
- [ ] Task ID의 Area에 맞는 폴더에 저장되었는가? (S→Security/, F→Frontend/, ...)
- [ ] Production 관련 코드(F, BA, D)는 Production 폴더에도 저장되었는가?

