// generate_from_actual_directories.js
// 실제 디렉토리 구조를 읽어서 sidebar 생성

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..', '..');
const OUTPUT_PATH = path.join(__dirname, 'sidebar_process_structure_CORRECTED.md');

// 실제 디렉토리 구조 읽기 (재귀)
function readDirStructure(dirPath, maxDepth = 3, currentDepth = 0) {
    if (currentDepth >= maxDepth) return [];

    const items = [];
    try {
        const entries = fs.readdirSync(dirPath, { withFileTypes: true });

        for (const entry of entries) {
            if (entry.isDirectory()) {
                const item = {
                    name: entry.name,
                    path: path.join(dirPath, entry.name),
                    children: []
                };

                // 하위 디렉토리 재귀 읽기
                item.children = readDirStructure(item.path, maxDepth, currentDepth + 1);
                items.push(item);
            }
        }
    } catch (err) {
        console.error(`Error reading ${dirPath}:`, err.message);
    }

    // 숫자 순서대로 정렬 (3-1, 3-2, ... 3-10)
    return items.sort((a, b) => {
        const matchA = a.name.match(/^(\d+)-(\d+)_/);
        const matchB = b.name.match(/^(\d+)-(\d+)_/);

        if (matchA && matchB) {
            const phase1A = parseInt(matchA[1]);
            const phase1B = parseInt(matchB[1]);
            if (phase1A !== phase1B) return phase1A - phase1B;

            const phase2A = parseInt(matchA[2]);
            const phase2B = parseInt(matchB[2]);
            return phase2A - phase2B;
        }

        return a.name.localeCompare(b.name);
    });
}

// 한글명 추출 (주석에서)
function getKoreanName(folderName) {
    const mapping = {
        // P1_사업계획
        '0-1_Vision_Mission': '비전과 미션',
        '0-2_Market_Analysis': '시장 분석',
        '0-3_Business_Model': '비즈니스 모델',
        '0-4_Patent': '특허',

        // P2_프로젝트_기획
        '1-1_Project_Plan': '프로젝트 계획',
        '1-2_User_Flows': '사용자 플로우',
        '1-3_Requirements': '요구사항',
        '1-4_Workflows': '워크플로우',
        '1-5_Design_System': '디자인 시스템',
        '1-6_UI_UX_Mockup': 'UI/UX 목업',
        '1-7_Tech_Stack': '기술 스택',
        '1-8_Content_System': '콘텐츠 시스템',

        // P3_프로토타입_제작
        'Frontend': '프론트엔드',
        'Database': '데이터베이스',
        'Scripts': '스크립트',
        'Documentation': '문서화',

        // S1_개발_준비 ~ S5_운영 공통
        'Backend_Infra': '백엔드 인프라',
        'Backend_API': '백엔드 API',
        'Content_System': '콘텐츠 시스템',
        'Design': '디자인',
        'DevOps': 'DevOps',
        'External': '외부 연동',
        'Security': '보안',
        'Testing': '테스트'
    };

    return mapping[folderName] || null;
}

// 마크다운 생성
function generateMarkdown(phases) {
    let md = `# SSALWorks 웹사이트 사이드바 구조

> **최종 업데이트**: ${new Date().toISOString().split('T')[0]}
> **기준**: 실제 디렉토리 구조 (자동 생성)
> **목적**: SSALWorks 웹사이트 사이드바에 표시할 개발 프로세스 구조

---

## 📘 상단 링크

**PROJECT SAL GRID 매뉴얼**
- 위치: \`S1_개발_준비/Documentation/PROJECT_SAL_GRID_매뉴얼.md\`
- 용도: 프로젝트 그리드 작성 방법, Task ID 규칙, Dual Execution System

---

## 📂 개발 프로세스

`;

    phases.forEach(phase => {
        md += `### ${phase.name}\n\n`;

        phase.children.forEach(category => {
            const koreanName = getKoreanName(category.name);
            // X-Y_ 패턴으로 시작하는 폴더는 항상 중분류(####)
            const isMainCategory = /^\d-\d+_/.test(category.name);

            if (isMainCategory) {
                // 중분류는 항상 ####로 표시 (첫 번째 _만 점으로)
                const displayName = category.name.replace(/^(\d+-\d+)_/, '$1.');
                if (koreanName) {
                    md += `#### ${displayName} (${koreanName})\n`;
                } else {
                    md += `#### ${displayName}\n`;
                }

                // 하위 항목이 있으면 표시
                if (category.children.length > 0) {
                    category.children.forEach(subItem => {
                        const subKoreanName = getKoreanName(subItem.name);

                        if (subItem.children.length > 0) {
                            // 3단계 중첩
                            if (subKoreanName) {
                                md += `- ${subItem.name} (${subKoreanName})\n`;
                            } else {
                                md += `- ${subItem.name}\n`;
                            }
                            subItem.children.forEach(deepItem => {
                                md += `  - ${deepItem.name}\n`;
                            });
                        } else {
                            // 2단계 항목
                            if (subKoreanName) {
                                md += `- ${subItem.name} (${subKoreanName})\n`;
                            } else {
                                md += `- ${subItem.name}\n`;
                            }
                        }
                    });
                }
                md += '\n';
            } else {
                // X-Y_ 패턴 아닌 폴더는 기존 로직 유지
                if (category.children.length > 0) {
                    // 하위 항목이 있으면 카테고리로
                    if (koreanName) {
                        md += `#### ${category.name} (${koreanName})\n`;
                    } else {
                        md += `#### ${category.name}\n`;
                    }

                    category.children.forEach(subItem => {
                        const subKoreanName = getKoreanName(subItem.name);

                        if (subItem.children.length > 0) {
                            // 3단계 중첩
                            if (subKoreanName) {
                                md += `- ${subItem.name} (${subKoreanName})\n`;
                            } else {
                                md += `- ${subItem.name}\n`;
                            }
                            subItem.children.forEach(deepItem => {
                                md += `  - ${deepItem.name}\n`;
                            });
                        } else {
                            // 2단계 항목
                            if (subKoreanName) {
                                md += `- ${subItem.name} (${subKoreanName})\n`;
                            } else {
                                md += `- ${subItem.name}\n`;
                            }
                        }
                    });
                    md += '\n';
                } else {
                    // 하위 항목 없으면 직접 항목으로
                    if (koreanName) {
                        md += `- ${category.name} (${koreanName})\n`;
                    } else {
                        md += `- ${category.name}\n`;
                    }
                }
            }
        });

        md += '---\n\n';
    });

    md += `## 📝 구조 설명

### 계층 구조
- **Preliminary (P)**: P1_사업계획, P2_프로젝트_기획, P3_프로토타입_제작
- **Stage (S)**: S1_개발_준비, S2_개발-1차, S3_개발-2차, S4_개발-3차, S5_운영
- **하위 (####)**: 각 단계의 하위 폴더

### 특징
- **영문 + 한글 병기**: 폴더명과 한글 설명 함께 표시
- **일관된 형식**: 모든 항목이 동일한 형식 사용
- **최하위 항목**: 오더시트 템플릿 대상

### 사용 방법
1. **웹사이트 사이드바**: 이 구조를 웹사이트 네비게이션으로 표시
2. **프로젝트 그리드 연동**: Task ID와 매핑하여 진행 상황 추적
3. **오더시트 생성**: 최하위 항목(-)에 대해 오더시트 템플릿 생성

---

**이 문서는 실제 디렉토리 구조를 기준으로 자동 생성되었습니다.**
`;

    return md;
}

// 실행
try {
    console.log('📂 실제 디렉토리 구조 읽는 중...');

    const phases = [
        { name: 'P1_사업계획', children: readDirStructure(path.join(ROOT_DIR, 'P1_사업계획')) },
        { name: 'P2_프로젝트_기획', children: readDirStructure(path.join(ROOT_DIR, 'P2_프로젝트_기획')) },
        { name: 'P3_프로토타입_제작', children: readDirStructure(path.join(ROOT_DIR, 'P3_프로토타입_제작')) },
        { name: 'S1_개발_준비', children: readDirStructure(path.join(ROOT_DIR, 'S1_개발_준비')) },
        { name: 'S2_개발-1차', children: readDirStructure(path.join(ROOT_DIR, 'S2_개발-1차')) },
        { name: 'S3_개발-2차', children: readDirStructure(path.join(ROOT_DIR, 'S3_개발-2차')) },
        { name: 'S4_개발-3차', children: readDirStructure(path.join(ROOT_DIR, 'S4_개발-3차')) },
        { name: 'S5_운영', children: readDirStructure(path.join(ROOT_DIR, 'S5_운영')) }
    ];

    console.log('✅ 디렉토리 읽기 완료');

    console.log('\n📝 사이드바 마크다운 생성 중...');
    const markdown = generateMarkdown(phases);

    console.log('💾 파일 저장 중...');
    fs.writeFileSync(OUTPUT_PATH, markdown, 'utf8');

    console.log(`✅ 사이드바 파일 생성 완료: ${OUTPUT_PATH}\n`);

} catch (error) {
    console.error('❌ 에러 발생:', error.message);
    console.error(error.stack);
    process.exit(1);
}
