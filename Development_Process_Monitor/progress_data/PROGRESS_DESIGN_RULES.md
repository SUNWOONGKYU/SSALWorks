# 진행 프로세스 디자인 규칙

> **버전**: v1.0
> **최종 업데이트**: 2025-12-22
> **적용 대상**: Production/index.html 사이드바 진행 프로세스

---

## 1. 색상 체계 개요

### P0, S0 (특별단계) - 청색 계열
| 상태 | 배경색 | 테두리 | 클래스/선택자 |
|------|--------|--------|--------------|
| 0% (기본) | `#f8f9fa` (회색) | `#dee2e6` | `.process-special-major` |
| 진행 중 (1-99%) | `rgba(59, 130, 246, 0.1)` | `rgba(59, 130, 246, 0.3)` | `[data-progress]:not([data-progress="0"]):not(.completed)` |
| 완료 (100%) | `rgba(59, 130, 246, 0.20)` | `rgba(59, 130, 246, 0.5)` | `.completed` |
| 호버 | `#2563eb` (진한 파란색) | - | `:hover` |

### P1~P3, S1~S5 (일반단계) - 녹색 계열
| 상태 | 배경색 | 테두리 | 클래스/선택자 |
|------|--------|--------|--------------|
| 0% (기본) | `rgba(16, 185, 129, 0.05)` | `rgba(16, 185, 129, 0.15)` | `.process-major` |
| 진행 중 (1-99%) | `rgba(16, 185, 129, 0.12)` | `rgba(16, 185, 129, 0.3)` | `[data-progress]:not([data-progress="0"]):not(.completed)` |
| 완료 (100%) | `rgba(16, 185, 129, 0.20)` | `rgba(16, 185, 129, 0.45)` | `.completed` |
| 호버 | `var(--success)` (진한 녹색) | - | `:hover` |

---

## 2. CSS 선택자 우선순위

### 중요: 선언 순서
CSS에서 동일한 `!important`를 가진 스타일은 **나중에 선언된 것이 우선**합니다.

```
1. 기본 스타일 (.process-major, .process-special-major)
2. 0% 상태 ([data-progress="0"])
3. 진행 중 상태 ([data-progress]:not([data-progress="0"]):not(.completed))
4. 완료 상태 (.completed)
5. 호버 상태 (:hover) ← 가장 마지막에 선언해야 함
```

### 예시 (올바른 순서)
```css
/* 1. 기본 스타일 */
.process-special-major {
    background: #f8f9fa;
    border: 1px solid #dee2e6;
}

/* 2. 0% 상태 */
.process-special-major[data-progress="0"] {
    background: #f8f9fa !important;
    border: 1px solid #dee2e6 !important;
}

/* 3. 진행 중 상태 */
.process-special-major[data-progress]:not([data-progress="0"]):not(.completed) {
    background: rgba(59, 130, 246, 0.1) !important;
    border: 1px solid rgba(59, 130, 246, 0.3) !important;
}

/* 4. 완료 상태 */
.process-special-major.completed {
    background: rgba(59, 130, 246, 0.20) !important;
    border: 1px solid rgba(59, 130, 246, 0.5) !important;
}

/* 5. 호버 상태 (가장 마지막!) */
.process-special-major:hover {
    background: #2563eb !important;
    color: white !important;
}
```

---

## 3. JavaScript 연동 규칙

### data-progress 속성
- HTML 요소에 `data-progress="0"` ~ `data-progress="100"` 설정
- CSS 선택자가 이 값을 기반으로 스타일 적용

### completed 클래스
- 진행률 100%일 때 `.completed` 클래스 추가
- `element.classList.add('completed')`

### Inline Style 금지
```javascript
// ❌ 잘못된 방법 - inline style 사용
element.style.background = 'rgba(16, 185, 129, 0.25)';
element.style.border = '1px solid rgba(16, 185, 129, 0.5)';

// ✅ 올바른 방법 - 클래스와 속성만 사용
element.setAttribute('data-progress', '100');
element.classList.add('completed');
```

### resetAllProgressToZero 함수
일반회원에게 0% 표시할 때 호출:
```javascript
function resetAllProgressToZero() {
    const progressItems = document.querySelectorAll('.process-major, .process-special-major');
    progressItems.forEach(item => {
        item.setAttribute('data-progress', '0');
        // inline style 제거 (CSS가 적용되도록)
        item.style.background = '';
        item.style.backgroundColor = '';
        item.style.border = '';
        item.style.borderColor = '';
        item.classList.remove('completed');
    });
}
```

---

## 4. 사용자 권한별 표시

| 사용자 유형 | 진행률 표시 | Stage Gate 반영 |
|------------|------------|----------------|
| 비로그인 | 0% (기본) | X |
| 일반회원 (installation_fee_paid=false) | 0% | X |
| 개발자 (installation_fee_paid=true, 프로젝트 없음) | 0% | X |
| 개발자 (SSAL Works 프로젝트 소유) | 실제 진행률 | O |

### loadStageGateStatus 권한 체크
```javascript
async function loadStageGateStatus() {
    // 1. 로그인 확인
    // 2. installation_fee_paid 확인
    // 3. SSAL Works 프로젝트 소유 확인
    // → 모두 통과해야 Stage Gate 상태 반영
}
```

---

## 5. 색상 코드 참조

### 녹색 계열 (P1~S5)
| 용도 | 색상 코드 |
|------|----------|
| 아주 연한 녹색 (0%) | `rgba(16, 185, 129, 0.05)` |
| 연한 녹색 테두리 | `rgba(16, 185, 129, 0.15)` |
| 중간 녹색 (진행 중) | `rgba(16, 185, 129, 0.12)` |
| 중간 녹색 테두리 | `rgba(16, 185, 129, 0.3)` |
| 진한 녹색 (완료) | `rgba(16, 185, 129, 0.20)` |
| 진한 녹색 테두리 | `rgba(16, 185, 129, 0.45)` |
| 호버 녹색 | `var(--success)` = `#10b981` |

### 청색 계열 (P0, S0)
| 용도 | 색상 코드 |
|------|----------|
| 회색 (0%) | `#f8f9fa` |
| 회색 테두리 | `#dee2e6` |
| 연한 청색 (진행 중) | `rgba(59, 130, 246, 0.1)` |
| 연한 청색 테두리 | `rgba(59, 130, 246, 0.3)` |
| 중간 청색 (완료) | `rgba(59, 130, 246, 0.20)` |
| 중간 청색 테두리 | `rgba(59, 130, 246, 0.5)` |
| 호버 청색 | `#2563eb` |

### 회색 계열 (공통)
| 용도 | 색상 코드 |
|------|----------|
| 배경 회색 | `#f8f9fa` |
| 테두리 회색 | `#dee2e6` |
| 텍스트 회색 | `#6c757d` |

---

## 6. 주의사항

1. **CSS 순서 변경 금지**: `:hover`는 항상 마지막에 위치해야 함
2. **Inline Style 사용 금지**: CSS 클래스와 data 속성만 사용
3. **!important 일관성**: 상태별 스타일에는 모두 `!important` 사용
4. **권한 체크 필수**: Stage Gate 로드 전 사용자 권한 확인

---

## 7. 변경 이력

| 날짜 | 버전 | 변경 내용 |
|------|------|----------|
| 2025-12-22 | v1.0 | 초기 문서 작성 |

---

**"SSALWorks - 프롬프팅으로 AI를 운전하듯 프로젝트를 관리하세요."**
