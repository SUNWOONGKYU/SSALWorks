# CSV CRUD 작업 방법

> CSV 파일 CRUD 작업 시 반드시 이 방법을 따르세요.

---

## 핵심 원칙

```
✅ AI가 Edit 도구로 CSV 파일 직접 수정!
✅ CSV 파일 위치: method/csv/data/sal_grid.csv
✅ 수정 후 반드시 저장 확인!
```

---

## CSV 파일 수정 프로세스

```
1. CSV 파일 읽기 (Read 도구)
     ↓
2. 해당 Task 행 찾기
     ↓
3. 필드 값 수정 (Edit 도구)
     ↓
4. 저장 확인
```

---

## CSV 파일 위치

```
{project-root}/S0_Project-SAL-Grid_생성/data/sal_grid.csv
```

---

## 읽기 (Read)

```javascript
const fs = require('fs');
const csvPath = 'S0_Project-SAL-Grid_생성/data/sal_grid.csv';
const csvContent = fs.readFileSync(csvPath, 'utf-8');

// CSV 파싱
const lines = csvContent.trim().split('\n');
const headers = lines[0].split(',');
const data = lines.slice(1).map(line => {
    const values = parseCSVLine(line);
    const row = {};
    headers.forEach((h, i) => row[h.trim()] = values[i]);
    return row;
});
```

---

## 수정 (Update)

```javascript
// 특정 Task 찾기
const taskIndex = data.findIndex(row => row.task_id === 'S1F1');

if (taskIndex !== -1) {
    // 필드 수정
    data[taskIndex].task_status = 'Completed';
    data[taskIndex].task_progress = '100';
    data[taskIndex].verification_status = 'Verified';
}
```

---

## 쓰기 (Write)

```javascript
// CSV 문자열 생성
const csvLines = [headers.join(',')];
data.forEach(row => {
    const values = headers.map(h => {
        const val = row[h.trim()] || '';
        // 쉼표나 줄바꿈 포함 시 따옴표로 감싸기
        return val.includes(',') || val.includes('\n') ? `"${val}"` : val;
    });
    csvLines.push(values.join(','));
});

fs.writeFileSync(csvPath, csvLines.join('\n'), 'utf-8');
```

---

## 주의사항

- 쉼표(,) 포함된 값은 따옴표로 감싸기
- UTF-8 인코딩 유지
- 행 순서 변경 금지
- 수정 후 반드시 저장 확인

---

## 상세 규칙

자세한 내용은 `.claude/rules/04_grid-writing-csv.md` 참조
