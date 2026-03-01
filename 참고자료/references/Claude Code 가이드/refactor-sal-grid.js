/**
 * SAL Grid Refactoring Script
 * 원본 Claude Code 마스터 가이드를 SAL Grid 구조로 재배치
 */
const fs = require('fs');
const path = require('path');

const baseDir = __dirname;
const inputFile = path.join(baseDir, 'claude-code-mastering-guide.md');
const outputFile = path.join(baseDir, 'Claude_Code_Master_Guide_SAL_Grid_Edition.md');

const content = fs.readFileSync(inputFile, 'utf-8');
const lines = content.split('\n');

// Helper: extract line range (1-indexed, inclusive)
function extract(startLine, endLine) {
  return lines.slice(startLine - 1, endLine).join('\n');
}

// ─── Section-to-LineRange Mapping ───
const sections = {
  preface: { start: 33, end: 130, title: '서문' },
  '01': { start: 131, end: 474, title: '바이브 코딩이란? (Claude Code란 무엇인가?)' },
  '02': { start: 267, end: 327, title: '6대 핵심 철학 (Claude Code의 핵심 철학)' },
  '03': { start: 5013, end: 5185, title: '4단계 황금 워크플로우 (탐색-계획-코딩-커밋 사이클)' },
  '04': { start: 1767, end: 2481, title: 'CLAUDE.md 완전 가이드' },
  // [05] 컨텍스트 관리 → split into 05a, 05b (내용 기준 분할)
  '05a': { start: 1027, end: 1047, title: '컨텍스트 기초 — 토큰과 비용',
    note: '⚠️쪼갬: 200K 토큰 이해, /clear /compact 기본, 토큰과 비용 관계',
    extraRanges: [{ start: 1230, end: 1265 }] },
  '05b': { start: 6074, end: 6220, title: '컨텍스트 관리 전략',
    note: '⚠️쪼갬: Handoff 패턴, 전략적 컨텍스트 설계, 멀티 인스턴스 컨텍스트, 병렬 처리' },
  // [06] 프롬프팅 → split into 06a, 06b
  '06a': { start: 1203, end: 1435, title: '프롬프팅 기본 기법',
    note: '⚠️쪼갬: 명확한 지시, 단계별 요청, 기본 구조' },
  '06b': { start: 5186, end: 5501, title: '프롬프팅 고급 기법',
    note: '⚠️쪼갬: 검증 수단, 인터뷰 기법, TDD, 리팩토링, 문서화 자동화' },
  // [07] 서브에이전트 → split into 07a, 07b (내용 기준 분할)
  '07a': { start: 5550, end: 5646, title: '멀티 인스턴스 기본 — 유형과 역할 이해',
    note: '⚠️쪼갬: 학습 목표, 멀티 인스턴스 개념, 역할 분담 아키텍처 (이해/개념)' },
  '07b': { start: 5647, end: 5872, title: '멀티 인스턴스 실전 — 병렬 개발 패턴',
    note: '⚠️쪼갬: 인스턴스별 상세 설정, 병렬 개발 실전 코드, Git Worktree 연동 (활용/실전)' },
  '08': { start: 5963, end: 6073, title: 'Agent Teams — 멀티 에이전트 협업' },
  '09': { start: 6347, end: 6552, title: 'Hooks 시스템' },
  '10': { start: 14708, end: 14988, title: '플러그인 & 확장 생태계' },
  '11': { start: 11899, end: 11946, title: '보안 위험 & 체크리스트',
    extraRanges: [{ start: 14208, end: 14428 }] },
  '12': { start: 17410, end: 17566, title: '바이브 코딩 7대 실수 (고급 도전과제와 해결 전략)' },
  // [13] Git → split into 13a, 13b (내용 기준 분할)
  '13a': { start: 1527, end: 1580, title: 'Git 기본 — 절대 금지 & 레드 플래그',
    note: '⚠️쪼갬: 기본 Git 작업, 고급 Git 작업, PR 작성 (금지사항 포함)',
    extraRanges: [{ start: 2348, end: 2364 }] },
  '13b': { start: 2208, end: 2232, title: 'Git 전략 — 커밋 & 브랜치',
    note: '⚠️쪼갬: 브랜치 명명 규칙, 브랜치 플로우, 머지 전략, 커밋 메시지',
    extraRanges: [{ start: 5168, end: 5184 }] },
  '14': { start: 1203, end: 1284, title: '필수 단축키 & 명령어',
    note: '통째. 참고: [06a]와 시작점 공유, 이 섹션은 3.1절만 포함' },
  '15': { start: 1626, end: 1746, title: '10대 황금 원칙 (프로 팁: 효율성 극대화 + 워크플로우)',
    extraRanges: [{ start: 5474, end: 5549 }] },
  '16': { start: 33, end: 130, title: '최신 업데이트 & 시대 변천',
    extraRanges: [{ start: 19581, end: 19789 }] },
  '17': { start: 5260, end: 5407, title: '고급 꿀팁 & 워크플로우' },
  '18': { start: 328, end: 474, title: '바이브 코딩 적합성 판단 (다른 AI 코딩 도구와의 차별점)' },
  '19': { start: 748, end: 883, title: '요금제 선택 가이드 (기본 설정 최적화)' },
  '20': { start: 2482, end: 4971, title: '실전 프로젝트 레시피 12종 (프레임워크별 + 언어별)' },
  '21': { start: 5408, end: 5501, title: '프롬프트 템플릿 라이브러리 (실전 워크플로우)' },
  '22': { start: 1436, end: 1526, title: '디버깅 마스터 전략',
    extraRanges: [{ start: 5299, end: 5342 }] },
  '23': { start: 5873, end: 6281, title: '멀티세션 워크플로우 8가지 패턴' },
  '24': { start: 14989, end: 15210, title: '비용 최적화 10가지 전략 (모니터링과 성능 최적화)' },
  // [25] 비개발자 가이드 → split into 25a, 25b (내용 기준 분할)
  '25a': { start: 17895, end: 17908, title: '비개발자 가이드 — 개념편',
    note: '⚠️쪼갬: 필수 지식, 잘할 수 있는 영역, 학습 로드맵 (머리로 이해)',
    extraRanges: [
      { start: 19058, end: 19310 },
      { start: 19515, end: 19531 }
    ] },
  '25b': { start: 475, end: 1026, title: '환경 설정 & 첫 프로젝트',
    note: '⚠️쪼갬: 설치/초기설정(제2장), 첫 프로젝트 실행, 기본 설정 (손으로 실행)',
    extraRanges: [{ start: 16069, end: 16080 }] },
  '26': { start: 14429, end: 14988, title: 'MCP 서버 실전 활용 10종 (다중 클라우드 + 커스터마이제이션)' },
  '27': { start: 16155, end: 16568, title: 'AI 코드 리뷰 8가지 마스터 패턴' },
};

// Helper to get section content
function getSectionContent(sectionId) {
  const sec = sections[sectionId];
  if (!sec) return '[콘텐츠 없음]';
  let text = extract(sec.start, sec.end);
  if (sec.extraRanges) {
    for (const r of sec.extraRanges) {
      text += '\n\n' + extract(r.start, r.end);
    }
  }
  return text;
}

// Format section header
function formatHeader(sectionId, title, cell, level, type, note) {
  const isReserved = type === 'reserved';
  const isSplit = type === 'split';

  if (isReserved) {
    return `#### 🌾 [추후 삽입] ${title}
> **셀**: ${cell} | **Level**: ${level}
> 이 슬롯은 추후 콘텐츠가 삽입될 예정입니다.
`;
  }

  const sourceType = isSplit ? `쪼갬 variant` : '통째';
  return `#### [${sectionId}] ${title}
> **출처**: 섹션${sectionId.replace(/[ab]$/, '')} (${sourceType}) | **셀**: ${cell} | **Level**: ${level}${note ? '\n> ' + note : ''}

`;
}

// ─── Build the output ───
const output = [];

// ═══ Front Matter ═══
output.push(`# Claude Code Master Guide (SAL Grid Edition)

> 원본: Claude Code 완전 정복 마스터 가이드 (황민호, 2025.06)
> 재편: SAL Grid (Stage × Area × Level)
> 버전: v3.0
> 생성일: ${new Date().toISOString().split('T')[0]}

---

## SAL Grid 구조 안내

SAL Grid는 3차원 지식 관리 체계입니다:
- **Stage (Y축)**: 난이도 단계 — 순차적 (S1→S2→S3→S4→S5)
- **Area (X축)**: 지식 영역 — 병렬적 (순서 없음)
- **Level (Z축)**: 셀 내 의존성 순서 — 순차적 (L1→L2→L3)
- **Variant**: 같은 섹션의 분리본 — 소문자 (a, b, c)

### Stage 정의 (5단계)

| ID | 이름 | 영문 | 대상 |
|----|------|------|------|
| S1 | 입문 | Beginner | 비개발자도 즉시 시작 가능 |
| S2 | 초급 | Elementary | 핵심 개념과 기본 사용법 |
| S3 | 중급 | Intermediate | 실무 프로젝트 직접 적용 |
| S4 | 고급 | Advanced | 멀티 에이전트, 자동화, 고급 기법 |
| S5 | 마스터 | Master | 대규모 운영, 방법론 설계 |

### Area 정의 (6영역)

| ID | 이름 | 영문 | 핵심 질문 |
|----|------|------|-----------|
| CO | 개념 | Concept | 이것은 무엇이고 왜 하는가? |
| ST | 스트럭처 | Structure | 어떤 틀/구조에서 일하는가? |
| WF | 워크플로우 | Workflow | 그 안에서 어떻게 진행하는가? |
| TO | 팀운용 | Team Operations | 누구와/무엇과 함께 일하는가? |
| QC | 품질관리 | Quality Control | 어떻게 안전하고 좋게 만드는가? |
| CM | 비용관리 | Cost Management | 어떻게 효율적으로 쓰는가? |

---

## 30셀 그리드 맵

\`\`\`
         │ CO(개념)     │ ST(스트럭처)  │ WF(워크플로우) │ TO(팀운용)    │ QC(품질관리)  │ CM(비용관리)
━━━━━━━━━┿━━━━━━━━━━━━━┿━━━━━━━━━━━━━┿━━━━━━━━━━━━━━┿━━━━━━━━━━━━━┿━━━━━━━━━━━━━┿━━━━━━━━━━━━━
S1 입문  │ [01] [25a]  │ (빈 셀)      │ [25b]        │ (빈 셀)      │ (빈 셀)      │ [19]
S2 초급  │ [02][18][15]│ [04]         │ [03][06a][14]│ [07a]        │ [12][13a]    │ [05a]
S3 중급  │ [16]        │ [20]         │ [06b][21][05b]│ [07b][10]   │ [11][13b][22]│ [24]
S4 고급  │ 🌾추후      │ [23]         │ [09][17]     │ [08][26]     │ [27]         │ 🌾추후
S5 마스터│ 🌾추후      │ 🌾추후       │ 🌾추후       │ 🌾추후       │ 🌾추후       │ 🌾추후
\`\`\`

주황색 = 쪼갬 variant: [05a][05b] [06a][06b] [07a][07b] [13a][13b] [25a][25b]
검정색 = 원본 통째: [01][02][03][04]...[27]

---

`);

// ═══ S1 입문 (Beginner) ═══
output.push(`## S1 입문 (Beginner)

---

### S1CO — 개념 (Concept)

${formatHeader('01', '바이브 코딩이란?', 'S1CO', 'L1', 'whole')}
${getSectionContent('01')}

---

${formatHeader('25a', '비개발자 가이드 — 개념편', 'S1CO', 'L2', 'split', '⚠️쪼갬: "필수 지식", "잘할 수 있는 영역", "학습 로드맵"')}
${getSectionContent('25a')}

---

#### 🌾 [추후 삽입] 비개발자 관점
> **셀**: S1CO | **Level**: L2a
> 이 슬롯은 추후 콘텐츠가 삽입될 예정입니다.

---

### S1ST — 스트럭처 (Structure)

> (빈 셀)

---

### S1WF — 워크플로우 (Workflow)

${formatHeader('25b', '환경 설정 & 첫 프로젝트', 'S1WF', 'L1', 'split', '⚠️쪼갬: "환경 설정", "첫 프로젝트", "흔한 실수 5가지"')}
${getSectionContent('25b')}

---

#### 🌾 [추후 삽입] SSAL Works 설치 가이드
> **셀**: S1WF | **Level**: L1a
> 이 슬롯은 추후 콘텐츠가 삽입될 예정입니다.

---

### S1TO — 팀운용 (Team Operations)

> (빈 셀)

---

### S1QC — 품질관리 (Quality Control)

> (빈 셀)

---

### S1CM — 비용관리 (Cost Management)

${formatHeader('19', '요금제 선택 가이드', 'S1CM', 'L1', 'whole')}
${getSectionContent('19')}

---

`);

// ═══ S2 초급 (Elementary) ═══
output.push(`## S2 초급 (Elementary)

---

### S2CO — 개념 (Concept)

${formatHeader('02', '6대 핵심 철학', 'S2CO', 'L1', 'whole')}
${getSectionContent('02')}

---

#### 🌾 [추후 삽입] 7번째 철학 "Muscle Memory Outsourcing"
> **셀**: S2CO | **Level**: L1a
> 이 슬롯은 추후 콘텐츠가 삽입될 예정입니다.

---

${formatHeader('18', '바이브 코딩 적합성 판단', 'S2CO', 'L2', 'whole')}
${getSectionContent('18')}

---

${formatHeader('15', '10대 황금 원칙', 'S2CO', 'L3', 'whole')}
${getSectionContent('15')}

---

### S2ST — 스트럭처 (Structure)

${formatHeader('04', 'CLAUDE.md 완전 가이드', 'S2ST', 'L1', 'whole')}
${getSectionContent('04')}

---

#### 🌾 [추후 삽입] SSAL 프로젝트 통합 연동
> **셀**: S2ST | **Level**: L1a
> 이 슬롯은 추후 콘텐츠가 삽입될 예정입니다.

---

### S2WF — 워크플로우 (Workflow)

${formatHeader('03', '4단계 황금 워크플로우', 'S2WF', 'L1', 'whole')}
${getSectionContent('03')}

---

${formatHeader('06a', '프롬프팅 기본 기법', 'S2WF', 'L2', 'split', '⚠️쪼갬: 명확한 지시, 단계별 요청, 기본 구조')}
${getSectionContent('06a')}

---

#### 🌾 [추후 삽입] 오더시트 시스템
> **셀**: S2WF | **Level**: L2a
> 이 슬롯은 추후 콘텐츠가 삽입될 예정입니다.

---

${formatHeader('14', '필수 단축키 & 명령어', 'S2WF', 'L3', 'whole')}
${getSectionContent('14')}

---

### S2TO — 팀운용 (Team Operations)

${formatHeader('07a', '서브에이전트 기본', 'S2TO', 'L1', 'split', '⚠️쪼갬: 3가지 유형, 프론트매터 필드')}
${getSectionContent('07a')}

---

### S2QC — 품질관리 (Quality Control)

${formatHeader('12', '바이브 코딩 7대 실수', 'S2QC', 'L1', 'whole')}
${getSectionContent('12')}

---

${formatHeader('13a', 'Git 기본 — 절대 금지 & 레드 플래그', 'S2QC', 'L2', 'split', '⚠️쪼갬: 레드 플래그, 절대 금지 목록')}
${getSectionContent('13a')}

---

### S2CM — 비용관리 (Cost Management)

${formatHeader('05a', '컨텍스트 기초 — 토큰과 비용', 'S2CM', 'L1', 'split', '⚠️쪼갬: 200K 토큰 이해, /clear /compact 기본, 토큰과 비용 관계')}
${getSectionContent('05a')}

---

`);

// ═══ S3 중급 (Intermediate) ═══
output.push(`## S3 중급 (Intermediate)

---

### S3CO — 개념 (Concept)

${formatHeader('16', '최신 업데이트 & 시대 변천', 'S3CO', 'L1', 'whole')}
${getSectionContent('16')}

---

### S3ST — 스트럭처 (Structure)

${formatHeader('20', '실전 프로젝트 레시피 12종', 'S3ST', 'L1', 'whole')}
${getSectionContent('20')}

---

#### 🌾 [추후 삽입] 5개 도메인 레시피
> **셀**: S3ST | **Level**: L1a
> 이 슬롯은 추후 콘텐츠가 삽입될 예정입니다.

---

#### 🌾 [추후 삽입] Inbox/Outbox JSON 기초
> **셀**: S3ST | **Level**: L2
> 이 슬롯은 추후 콘텐츠가 삽입될 예정입니다.

---

### S3WF — 워크플로우 (Workflow)

${formatHeader('06b', '프롬프팅 고급 기법', 'S3WF', 'L1', 'split', '⚠️쪼갬: 검증 수단, 인터뷰 기법, @ 참조, 파이프')}
${getSectionContent('06b')}

---

${formatHeader('21', '프롬프트 템플릿 라이브러리', 'S3WF', 'L2', 'whole')}
${getSectionContent('21')}

---

#### 🌾 [추후 삽입] 확장 템플릿 (스무고개, 5단계, 3대안)
> **셀**: S3WF | **Level**: L2a
> 이 슬롯은 추후 콘텐츠가 삽입될 예정입니다.

---

${formatHeader('05b', '컨텍스트 관리 전략', 'S3WF', 'L3', 'split', '⚠️쪼갬: Handoff 패턴, 7개 명령어 고급, 전략적 설계')}
${getSectionContent('05b')}

---

### S3TO — 팀운용 (Team Operations)

${formatHeader('07b', '서브에이전트 병렬 개발', 'S3TO', 'L1', 'split', '⚠️쪼갬: Writer/Reviewer 패턴, 병렬 개발')}
${getSectionContent('07b')}

---

${formatHeader('10', '플러그인 & 확장 생태계', 'S3TO', 'L2', 'whole')}
${getSectionContent('10')}

---

### S3QC — 품질관리 (Quality Control)

${formatHeader('11', '보안 위험 & 체크리스트', 'S3QC', 'L1', 'whole')}
${getSectionContent('11')}

---

${formatHeader('13b', 'Git 전략 — 커밋 & 브랜치', 'S3QC', 'L2', 'split', '⚠️쪼갬: 커밋 전략, 브랜치 전략')}
${getSectionContent('13b')}

---

${formatHeader('22', '디버깅 마스터 전략', 'S3QC', 'L3', 'whole')}
${getSectionContent('22')}

---

### S3CM — 비용관리 (Cost Management)

${formatHeader('24', '비용 최적화 10가지 전략', 'S3CM', 'L1', 'whole')}
${getSectionContent('24')}

---

`);

// ═══ S4 고급 (Advanced) ═══
output.push(`## S4 고급 (Advanced)

---

### S4CO — 개념 (Concept)

#### 🌾 [추후 삽입] SSAL 철학
> **셀**: S4CO | **Level**: L1
> 이 슬롯은 추후 콘텐츠가 삽입될 예정입니다.

---

### S4ST — 스트럭처 (Structure)

${formatHeader('23', '멀티세션 워크플로우 8가지 패턴', 'S4ST', 'L1', 'whole')}
${getSectionContent('23')}

---

#### 🌾 [추후 삽입] Inbox/Outbox 완전 가이드
> **셀**: S4ST | **Level**: L2
> 이 슬롯은 추후 콘텐츠가 삽입될 예정입니다.

---

#### 🌾 [추후 삽입] 소대편제
> **셀**: S4ST | **Level**: L3
> 이 슬롯은 추후 콘텐츠가 삽입될 예정입니다.

---

### S4WF — 워크플로우 (Workflow)

${formatHeader('09', 'Hooks 시스템', 'S4WF', 'L1', 'whole')}
${getSectionContent('09')}

---

${formatHeader('17', '고급 꿀팁 & 워크플로우', 'S4WF', 'L2', 'whole')}
${getSectionContent('17')}

---

### S4TO — 팀운용 (Team Operations)

${formatHeader('08', 'Agent Teams — 멀티 에이전트 협업', 'S4TO', 'L1', 'whole')}
${getSectionContent('08')}

---

${formatHeader('26', 'MCP 서버 실전 활용 10종', 'S4TO', 'L2', 'whole')}
${getSectionContent('26')}

---

#### 🌾 [추후 삽입] 용병체계
> **셀**: S4TO | **Level**: L2a
> 이 슬롯은 추후 콘텐츠가 삽입될 예정입니다.

---

### S4QC — 품질관리 (Quality Control)

${formatHeader('27', 'AI 코드 리뷰 8가지 마스터 패턴', 'S4QC', 'L1', 'whole')}
${getSectionContent('27')}

---

#### 🌾 [추후 삽입] Stage Gate 디버깅
> **셀**: S4QC | **Level**: L1a
> 이 슬롯은 추후 콘텐츠가 삽입될 예정입니다.

---

### S4CM — 비용관리 (Cost Management)

#### 🌾 [추후 삽입] MoAI 비용 전략
> **셀**: S4CM | **Level**: L1
> 이 슬롯은 추후 콘텐츠가 삽입될 예정입니다.

---

`);

// ═══ S5 마스터 (Master) — 전체 추후 삽입 ═══
output.push(`## S5 마스터 (Master) — 전체 추후 삽입

---

### S5CO — 개념 (Concept)

#### 🌾 [추후 삽입] 13DGC-AODM 방법론
> **셀**: S5CO | **Level**: L1
> 이 슬롯은 추후 콘텐츠가 삽입될 예정입니다.

#### 🌾 [추후 삽입] 4계층 역할 체계
> **셀**: S5CO | **Level**: L2
> 이 슬롯은 추후 콘텐츠가 삽입될 예정입니다.

#### 🌾 [추후 삽입] 6대 철학 확장
> **셀**: S5CO | **Level**: L3
> 이 슬롯은 추후 콘텐츠가 삽입될 예정입니다.

---

### S5ST — 스트럭처 (Structure)

#### 🌾 [추후 삽입] SAL Grid 완전 가이드
> **셀**: S5ST | **Level**: L1
> 이 슬롯은 추후 콘텐츠가 삽입될 예정입니다.

#### 🌾 [추후 삽입] PROJECT SAL GRID 실전
> **셀**: S5ST | **Level**: L2
> 이 슬롯은 추후 콘텐츠가 삽입될 예정입니다.

#### 🌾 [추후 삽입] 3D 시각화
> **셀**: S5ST | **Level**: L3
> 이 슬롯은 추후 콘텐츠가 삽입될 예정입니다.

---

### S5WF — 워크플로우 (Workflow)

#### 🌾 [추후 삽입] SSAL 프로세스
> **셀**: S5WF | **Level**: L1
> 이 슬롯은 추후 콘텐츠가 삽입될 예정입니다.

#### 🌾 [추후 삽입] Inbox/Outbox 실전 운용
> **셀**: S5WF | **Level**: L2
> 이 슬롯은 추후 콘텐츠가 삽입될 예정입니다.

---

### S5TO — 팀운용 (Team Operations)

#### 🌾 [추후 삽입] MoAI v2.5 시스템
> **셀**: S5TO | **Level**: L1
> 이 슬롯은 추후 콘텐츠가 삽입될 예정입니다.

#### 🌾 [추후 삽입] Mercenary Types 고급 운용
> **셀**: S5TO | **Level**: L2
> 이 슬롯은 추후 콘텐츠가 삽입될 예정입니다.

---

### S5QC — 품질관리 (Quality Control)

#### 🌾 [추후 삽입] 이중 검증 체계
> **셀**: S5QC | **Level**: L1
> 이 슬롯은 추후 콘텐츠가 삽입될 예정입니다.

#### 🌾 [추후 삽입] 품질 보증 프로세스
> **셀**: S5QC | **Level**: L2
> 이 슬롯은 추후 콘텐츠가 삽입될 예정입니다.

---

### S5CM — 비용관리 (Cost Management)

#### 🌾 [추후 삽입] 비용 극대화 전략
> **셀**: S5CM | **Level**: L1
> 이 슬롯은 추후 콘텐츠가 삽입될 예정입니다.

#### 🌾 [추후 삽입] 대규모 프로젝트 비용 시뮬레이션
> **셀**: S5CM | **Level**: L2
> 이 슬롯은 추후 콘텐츠가 삽입될 예정입니다.

---

`);

// ═══ 부록 ═══
output.push(`## 부록

---

### 출처 & 크레딧

- **원본**: Claude Code 마스터하기 — AI 페어 프로그래밍의 혁명 (황민호, 2025.06)
- **재편**: SAL Grid (Stage × Area × Level) 구조
- **리팩토링 도구**: Claude Code (Anthropic)

---

### 쪼갬 섹션 추적표

| 원본 섹션 | variant a | 배치 셀 | variant b | 배치 셀 | 추적 |
|-----------|-----------|---------|-----------|---------|------|
| 섹션05 컨텍스트 관리 | [05a] 토큰과 비용 | S2CM | [05b] 관리 전략 | S3WF | [05a]+[05b]=섹션05 전체 ✅ |
| 섹션06 프롬프팅 | [06a] 기본 기법 | S2WF | [06b] 고급 기법 | S3WF | [06a]+[06b]=섹션06 전체 ✅ |
| 섹션07 서브에이전트 | [07a] 기본 | S2TO | [07b] 병렬 개발 | S3TO | [07a]+[07b]=섹션07 전체 ✅ |
| 섹션13 Git | [13a] 절대 금지 | S2QC | [13b] 커밋/브랜치 | S3QC | [13a]+[13b]=섹션13 전체 ✅ |
| 섹션25 비개발자 가이드 | [25a] 개념편 | S1CO | [25b] 환경 설정 | S1WF | [25a]+[25b]=섹션25 전체 ✅ |

---

### 통계

| 항목 | 수량 |
|------|------|
| 총 셀 | 30개 (5 Stage × 6 Area) |
| 활성 셀 | 27개 |
| 빈 셀 | 3개 (S1ST, S1TO, S1QC) |
| 배치 항목 | 32개 (원본 22개 통째 + 쪼갬 5개×2 variant = 10개) |
| 쪼갬 섹션 | 5개 → 10개 variant |
| 🌾 예약 슬롯 | 22개 |
| 중복 | 0건 |

---

### 파일 순서 인덱스

\`\`\`
S1CO → S1ST(빈) → S1WF → S1TO(빈) → S1QC(빈) → S1CM
→ S2CO → S2ST → S2WF → S2TO → S2QC → S2CM
→ S3CO → S3ST → S3WF → S3TO → S3QC → S3CM
→ S4CO → S4ST → S4WF → S4TO → S4QC → S4CM
→ S5CO → S5ST → S5WF → S5TO → S5QC → S5CM
→ 부록
\`\`\`
`);

// Write the file
const result = output.join('\n');
fs.writeFileSync(outputFile, result, 'utf-8');

const lineCount = result.split('\n').length;
const sizeKB = Math.round(result.length / 1024);
console.log(`✅ SAL Grid Edition 생성 완료!`);
console.log(`   파일: ${outputFile}`);
console.log(`   라인: ${lineCount}줄`);
console.log(`   용량: ${sizeKB} KB`);
