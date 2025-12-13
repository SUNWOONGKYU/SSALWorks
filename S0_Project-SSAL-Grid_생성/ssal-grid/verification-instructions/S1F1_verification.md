# Verification Instruction - S1F1

## Task ID
S1F1

## Task Name
랜딩페이지 시안

## Verification Checklist

### 1. 파일 존재 검증
- [ ] index.html 파일 존재
- [ ] shared.css 파일 존재
- [ ] 필요한 에셋 파일 존재

### 2. UI 구성 요소 검증
- [ ] 히어로 섹션 존재
- [ ] 기능 소개 섹션 존재
- [ ] 가격 섹션 존재
- [ ] CTA 버튼 존재
- [ ] 푸터 존재

### 3. 반응형 검증
- [ ] 데스크톱 레이아웃 정상 (1200px+)
- [ ] 태블릿 레이아웃 정상 (768px-1199px)
- [ ] 모바일 레이아웃 정상 (~767px)

### 4. 접근성 검증
- [ ] 적절한 heading 구조 (h1, h2, h3)
- [ ] 이미지 alt 텍스트
- [ ] 키보드 네비게이션 가능
- [ ] 색상 대비 적절

### 5. 링크 검증
- [ ] 내부 링크 동작 확인
- [ ] CTA 버튼 링크 설정

## Test Commands
```bash
# 파일 존재 확인
ls -la P3_프로토타입_제작/Frontend/Prototype/index.html
ls -la P3_프로토타입_제작/Frontend/Prototype/shared.css

# HTML 유효성 검사 (온라인 도구 사용)
# https://validator.w3.org/
```

## Expected Results
- 모든 필수 파일 존재
- 반응형 레이아웃 동작
- 접근성 기준 충족

## Verification Agent
frontend-developer

## Pass Criteria
- 모든 UI 구성 요소 존재
- 반응형 3개 브레이크포인트 동작
- 접근성 기본 요소 충족
