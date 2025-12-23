# Sidebar 자동 동기화 시스템

## 개요

`sidebar_structure.json`을 단일 진실 공급원(Single Source of Truth)으로 사용하여 `Production/Frontend/index.html`의 사이드바 S1-S5 Area 항목을 자동으로 동기화하는 시스템입니다.

---

## 파일 구조

```
Development_Process_Monitor/
└── sidebar_generation/
    ├── sidebar_structure.json    # 소스 데이터 (Area 정의)
    ├── update_sidebar_html.js    # 동기화 스크립트
    └── README.md                 # 이 문서
```

**대상 파일:**
```
Production/
└── Frontend/
    └── index.html                # 업데이트 대상 (사이드바 HTML)
```

---

## 사용 방법

### 1. Area 수정이 필요한 경우

`sidebar_structure.json`에서 해당 Stage의 categories 배열을 수정합니다:

```json
{
  "id": "S1_개발_준비",
  "name_ko": "개발 준비",
  "categories": [
    { "id": "Documentation", "name_ko": "문서화 (M)" },
    { "id": "Frontend", "name_ko": "프론트엔드 (F)" },
    // ... 추가/수정/삭제
  ]
}
```

### 2. 동기화 스크립트 실행

```bash
cd "C:/!SSAL_Works_Private/Development_Process_Monitor/sidebar_generation"
node update_sidebar_html.js
```

### 3. 실행 결과 확인

```
🚀 Sidebar HTML 자동 업데이트 시작...

📂 sidebar_structure.json 읽는 중...
✅ sidebar_structure.json 읽기 완료
   - 최종 업데이트: 2025-12-13

📋 실행 단계(S1-S5) 추출: 5개
   - S1_개발_준비: 7개 Area
   - S2_개발-1차: 8개 Area
   - S3_개발-2차: 4개 Area
   - S4_개발-3차: 7개 Area
   - S5_개발_마무리: 6개 Area

📂 Production/Frontend/index.html 읽는 중...
✅ HTML 파일 읽기 완료

🔄 각 Stage의 Area 목록 교체 중...
   ✅ S1_개발_준비: 7개 Area로 업데이트
   ✅ S2_개발-1차: 8개 Area로 업데이트
   ✅ S3_개발-2차: 4개 Area로 업데이트
   ✅ S4_개발-3차: 7개 Area로 업데이트
   ✅ S5_개발_마무리: 6개 Area로 업데이트

💾 파일 저장 중...
✅ Production/Frontend/index.html 업데이트 완료!

🎉 완료! sidebar_structure.json 기준으로 S1-S5 Area가 동기화되었습니다.
```

---

## 현재 Area 구성 (2025-12-13 기준)

| Stage | Area 수 | Areas |
|-------|---------|-------|
| S1 개발 준비 | 7개 | Documentation, Frontend, Backend_Infra, Database, Security, Testing, DevOps |
| S2 개발 1차 | 8개 | Documentation, Frontend, Backend_Infra, Backend_APIs, Database, Security, Testing, Content_System |
| S3 개발 2차 | 4개 | Backend_Infra, Backend_APIs, Security, External |
| S4 개발 3차 | 7개 | Documentation, Frontend, Backend_Infra, Backend_APIs, Security, Testing, DevOps |
| S5 개발 마무리 | 6개 | Documentation, Frontend, Backend_APIs, Database, Security, DevOps |

---

## 기술 상세

### 동작 원리

1. **JSON 읽기**: `sidebar_structure.json`에서 S1-S5 Stage 데이터 추출
2. **HTML 마커 찾기**: 각 Stage의 HTML 주석 마커 위치 확인
   - `<!-- S1. 개발 준비 -->`
   - `<!-- S2. 개발 1차 -->`
   - `<!-- S3. 개발 2차 -->`
   - `<!-- S4. 개발 3차 -->`
   - `<!-- S5. 운영 -->`
3. **process-small-list 찾기**: 마커 이후 `<div class="process-small-list">` 위치 탐색
4. **중첩 div 추적**: 정확한 닫는 태그 위치를 찾기 위해 div 깊이 추적
5. **내용 교체**: 기존 process-small 항목들을 새 데이터로 교체
6. **파일 저장**: 수정된 HTML 저장

### HTML 구조 (보존됨)

```html
<!-- S1. 개발 준비 -->
<div class="process-item" onclick="toggleProcess(this)">
    <div class="process-major">
        <span class="process-arrow">▶</span>
        <span>S1. 개발 준비</span>
    </div>
    <div class="process-small-list">
        <!-- ↓ 이 부분만 자동 교체됨 ↓ -->
        <div class="process-small">
            <div class="process-small-content">
                <span class="process-small-bullet">●</span>
                <span>Documentation</span>
            </div>
        </div>
        <!-- ... 추가 Area 항목들 ... -->
        <!-- ↑ 이 부분만 자동 교체됨 ↑ -->
    </div>
</div>
```

### 핵심 설계 결정

1. **HTML만 수정**: JavaScript 변수(`SIDEBAR_STRUCTURE`)는 수정하지 않음
   - JavaScript 코드 수정 시 구문 오류 위험 있음
   - HTML만 수정해도 사이드바 표시에 충분함

2. **중첩 div 깊이 추적**: 정규식 대신 indexOf + 깊이 카운터 사용
   - 중첩된 div 구조에서 정확한 닫는 태그 위치 찾기
   - 복잡한 HTML 구조에서도 안정적 동작

3. **CRLF 줄바꿈 유지**: Windows 호환성 보장
   - 생성되는 HTML이 기존 파일과 동일한 줄바꿈 형식 사용

---

## 주의사항

1. **HTML 마커 유지 필수**: HTML 파일에서 `<!-- S1. 개발 준비 -->` 등의 주석 마커를 삭제하면 스크립트가 해당 섹션을 찾을 수 없음

2. **process-small-list 구조 유지**: `<div class="process-small-list">` 태그 구조 변경 시 스크립트 수정 필요

3. **백업 권장**: 대규모 수정 전 `index.html` 백업 권장

---

## 문제 해결

### 스크립트 실행 후 펼치기/닫기가 안 되는 경우

- 원인: HTML 구조가 손상되었을 가능성
- 해결: `Production/Frontend/index_before.html` (백업본)에서 복원 후 재실행

### 특정 Stage만 업데이트 안 되는 경우

- 원인: HTML 마커 주석이 누락되었거나 변경됨
- 해결: HTML 파일에서 해당 Stage의 `<!-- S1. 개발 준비 -->` 형식 마커 확인

---

## 관련 파일

- **소스 데이터**: `Development_Process_Monitor/sidebar_generation/sidebar_structure.json`
- **동기화 스크립트**: `Development_Process_Monitor/sidebar_generation/update_sidebar_html.js`
- **대상 HTML**: `Production/Frontend/index.html`
- **HTML 백업**: `Production/Frontend/index_before.html`

---

## 변경 이력

| 날짜 | 변경 내용 |
|------|-----------|
| 2025-12-13 | 초기 버전 생성. S1-S5 Area 자동 동기화 구현 |

---

**Last Updated**: 2025-12-13
