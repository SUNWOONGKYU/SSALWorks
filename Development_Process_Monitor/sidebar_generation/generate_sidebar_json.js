// generate_sidebar_json.js
// sidebar_process_structure_CORRECTED.md를 파싱하여 대시보드용 JSON으로 변환

const fs = require('fs');
const path = require('path');

// 입력 파일 경로
const SIDEBAR_MD_PATH = path.join(__dirname, 'sidebar_process_structure_CORRECTED.md');

// 출력 파일 경로
const OUTPUT_JSON_PATH = path.join(__dirname, 'sidebar_structure.json');

/**
 * 사이드바 마크다운 파일을 파싱하여 JSON으로 변환
 */
function parseSidebarMarkdown() {
    // 파일 읽기
    const content = fs.readFileSync(SIDEBAR_MD_PATH, 'utf8');

    const result = {
        metadata: {
            lastUpdate: extractLastUpdate(content),
            source: 'PROJECT_DIRECTORY_STRUCTURE.md'
        },
        manual: extractManualInfo(content),
        structure: []
    };

    // 줄 단위로 분리
    const lines = content.split('\n');

    let currentPhase = null;
    let currentCategory = null;

    for (const line of lines) {
        // 구조 설명 섹션 시작 시 파싱 중단
        if (line.match(/^## 📝 구조 설명/)) {
            break;
        }

        // 대분류 (### P1_사업계획)
        if (line.match(/^### \d_/)) {
            const match = line.match(/^### (.+)$/);
            if (match) {
                currentPhase = {
                    id: match[1].trim(),
                    name: match[1].trim(),
                    categories: []
                };
                result.structure.push(currentPhase);
                currentCategory = null;
            }
        }
        // 중분류 (#### Project_Plan (프로젝트 계획))
        else if (line.match(/^#### /)) {
            const match = line.match(/^#### (.+?) \((.+?)\)$/);
            if (match && currentPhase) {
                currentCategory = {
                    id: match[1].trim(),
                    name_en: match[1].trim(),
                    name_ko: match[2].trim(),
                    items: []
                };
                currentPhase.categories.push(currentCategory);
            }
        }
        // 소분류 (- business_requirements (비즈니스 요구사항) 또는 - val)
        else if (line.match(/^- /)) {
            // 먼저 한글명이 있는 패턴 시도
            let match = line.match(/^- (.+?) \((.+?)\)$/);
            let item;

            if (match) {
                // 한글명이 있는 경우
                item = {
                    id: match[1].trim(),
                    name_en: match[1].trim(),
                    name_ko: match[2].trim()
                };
            } else {
                // 한글명이 없는 경우 (- val 같은 형식)
                match = line.match(/^- (.+)$/);
                if (match) {
                    const name = match[1].trim();
                    item = {
                        id: name,
                        name_en: name,
                        name_ko: null
                    };
                }
            }

            if (item) {
                // 중분류가 있으면 중분류에 추가, 없으면 대분류에 직접 추가
                if (currentCategory) {
                    currentCategory.items.push(item);
                } else if (currentPhase) {
                    // 중분류가 없는 경우 (대분류 직속 항목)
                    if (!currentPhase.items) {
                        currentPhase.items = [];
                    }
                    currentPhase.items.push(item);
                }
            }
        }
    }

    return result;
}

/**
 * 마지막 업데이트 날짜 추출
 */
function extractLastUpdate(content) {
    const match = content.match(/\*\*최종 업데이트\*\*: (.+)/);
    return match ? match[1].trim() : null;
}

/**
 * 매뉴얼 정보 추출
 */
function extractManualInfo(content) {
    const manual = {
        title: 'PROJECT SAL GRID 매뉴얼',
        path: null,
        description: null
    };

    const pathMatch = content.match(/- 위치: `(.+?)`/);
    if (pathMatch) {
        manual.path = pathMatch[1];
    }

    const descMatch = content.match(/- 용도: (.+)/);
    if (descMatch) {
        manual.description = descMatch[1];
    }

    return manual;
}

/**
 * JSON 파일로 저장
 */
function saveToJson(data) {
    const jsonString = JSON.stringify(data, null, 2);
    fs.writeFileSync(OUTPUT_JSON_PATH, jsonString, 'utf8');
    console.log(`✅ JSON 파일 생성 완료: ${OUTPUT_JSON_PATH}`);
    console.log(`📊 통계:`);
    console.log(`   - 대분류: ${data.structure.length}개`);

    let totalCategories = 0;
    let totalItems = 0;

    data.structure.forEach(phase => {
        totalCategories += phase.categories ? phase.categories.length : 0;
        totalItems += phase.items ? phase.items.length : 0;

        if (phase.categories) {
            phase.categories.forEach(cat => {
                totalItems += cat.items ? cat.items.length : 0;
            });
        }
    });

    console.log(`   - 중분류: ${totalCategories}개`);
    console.log(`   - 소분류: ${totalItems}개`);
}

/**
 * HTML 파일 생성 (선택사항)
 */
function generateHtmlSidebar(data) {
    let html = `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SSALWorks 사이드바</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            margin: 0;
            padding: 20px;
            background: #f5f5f5;
        }
        .sidebar {
            max-width: 400px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            padding: 20px;
        }
        .manual {
            background: #667eea;
            color: white;
            padding: 15px;
            border-radius: 6px;
            margin-bottom: 20px;
        }
        .manual h3 {
            margin: 0 0 10px 0;
            font-size: 16px;
        }
        .manual p {
            margin: 5px 0;
            font-size: 13px;
            opacity: 0.9;
        }
        .phase {
            margin-bottom: 20px;
        }
        .phase-title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 10px;
            color: #333;
        }
        .category {
            margin-left: 15px;
            margin-bottom: 10px;
        }
        .category-title {
            font-size: 15px;
            font-weight: 600;
            color: #555;
            margin-bottom: 5px;
        }
        .item {
            margin-left: 30px;
            padding: 5px 0;
            font-size: 14px;
            color: #666;
        }
        .item:hover {
            color: #667eea;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div class="sidebar">
        <div class="manual">
            <h3>📘 ${data.manual.title}</h3>
            <p>${data.manual.description}</p>
            <p><small>${data.manual.path}</small></p>
        </div>
`;

    data.structure.forEach(phase => {
        html += `        <div class="phase">
            <div class="phase-title">${phase.name}</div>
`;

        // 대분류 직속 항목
        if (phase.items) {
            phase.items.forEach(item => {
                html += `            <div class="item">${item.name_en} (${item.name_ko})</div>\n`;
            });
        }

        // 중분류
        if (phase.categories) {
            phase.categories.forEach(category => {
                html += `            <div class="category">
                <div class="category-title">${category.name_en} (${category.name_ko})</div>
`;
                if (category.items) {
                    category.items.forEach(item => {
                        html += `                <div class="item">${item.name_en} (${item.name_ko})</div>\n`;
                    });
                }
                html += `            </div>\n`;
            });
        }

        html += `        </div>\n`;
    });

    html += `    </div>
</body>
</html>`;

    const htmlPath = path.join(__dirname, 'sidebar_preview.html');
    fs.writeFileSync(htmlPath, html, 'utf8');
    console.log(`✅ HTML 미리보기 생성: ${htmlPath}`);
}

// 실행
try {
    console.log('📂 사이드바 마크다운 파일 파싱 중...');
    const data = parseSidebarMarkdown();

    console.log('💾 JSON 파일 생성 중...');
    saveToJson(data);

    console.log('🌐 HTML 미리보기 생성 중...');
    generateHtmlSidebar(data);

    console.log('\n✅ 완료!');
    console.log(`\n사용 방법:`);
    console.log(`1. JSON: ${OUTPUT_JSON_PATH} 파일을 웹사이트에서 로드`);
    console.log(`2. HTML: sidebar_preview.html을 브라우저에서 열어서 미리보기`);

} catch (error) {
    console.error('❌ 에러 발생:', error.message);
    process.exit(1);
}
