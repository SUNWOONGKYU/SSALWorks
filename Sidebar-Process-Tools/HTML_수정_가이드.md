# prototype_index_최종개선.html 수정 가이드

## 1. 파일 위치
`C:\!SSAL_Works_Private\P3_프로토타입_제작\Frontend\Prototype\prototype_index_최종개선.html`

## 2. 수정 방법

### A. CSS 추가 (head 안 style 태그 내부 마지막)

```css
/* 진행률 표시 스타일 */
.process-prep, .process-major {
    position: relative;
}

.process-prep[data-progress="100"],
.process-major[data-progress="100"] {
    background: linear-gradient(135deg, #e8f5e9, #c8e6c9);
    border-left: 3px solid #4caf50;
}

.process-progress-fill {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #4caf50, #8bc34a);
    transition: width 0.3s ease;
}

.process-percent {
    position: absolute;
    top: 8px;
    right: 12px;
    font-size: 11px;
    font-weight: bold;
    color: #666;
}

.process-prep[data-progress="100"] .process-percent,
.process-major[data-progress="100"] .process-percent {
    color: #4caf50;
}
```

### B. HTML 구조 수정 (사이드바 각 항목에 추가)

**사업계획 항목:**
```html
<div class="process-prep" data-progress="0">
    <span class="process-prep-icon">📋</span>
    <span class="process-prep-name">사업계획</span>
    <span class="process-percent">0%</span>
    <div class="process-progress-fill" style="width: 0%;"></div>
</div>
```

**프로젝트 기획 항목:**
```html
<div class="process-prep" data-progress="0">
    <span class="process-prep-icon">🎯</span>
    <span class="process-prep-name">프로젝트 기획</span>
    <span class="process-percent">0%</span>
    <div class="process-progress-fill" style="width: 0%;"></div>
</div>
```

**S1~S6 개발단계:**
```html
<div class="process-major" data-progress="0">
    <span class="process-icon">S1.</span>
    <span class="process-name">프로토타입 제작</span>
    <span class="process-percent">0%</span>
    <div class="process-progress-fill" style="width: 0%;"></div>
</div>
```

### C. JavaScript 추가 (파일 끝 `</script>` 바로 위)

`C:\!SSAL_Works_Private\Sidebar-Process-Tools\progress_inject.js` 파일의 내용을 복사해서 붙여넣기

## 3. 서버 실행

```bash
cd C:\!SSAL_Works_Private\Sidebar-Process-Tools
npm start
```

## 4. 확인

1. prototype_index_최종개선.html을 브라우저에서 열기
2. 개발자 도구 콘솔에서 확인:
   ```
   📊 폴더 진행률: 사업계획 100%, 프로젝트기획 83%
   ```
3. 사이드바에 진행률 바와 퍼센트 표시 확인

## 현재 진행률 (실측)

| 단계 | 진행률 | 상세 |
|------|--------|------|
| 사업계획 | 100% | 4/4 폴더 완료 |
| 프로젝트 기획 | 83% | 5/6 폴더 완료 (1-3_User_Flows 비어있음) |
| S1~S6 | 0% | Supabase 연동 필요 |

## 트러블슈팅

### Q. 진행률이 0%로 표시됨
A. progress_server.js가 실행 중인지 확인:
```bash
curl http://localhost:3032/check-folder-progress
```

### Q. CORS 에러
A. progress_server.js에 cors 설정 확인 (이미 포함됨)

### Q. 파일이 자꾸 수정됨
A. 에디터 자동 저장 기능 끄고 수동으로 저장
