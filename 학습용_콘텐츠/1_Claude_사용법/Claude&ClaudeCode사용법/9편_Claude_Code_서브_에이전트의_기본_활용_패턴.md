# 9편 | Claude Code 서브 에이전트의 기본 활용 패턴

---

서브 에이전트의 개념을 이해하고 생성 방법을 익혔다면, 이제 서브 에이전트를 효과적으로 활용하기 위한 기본 패턴들에 대해서 알아보도록 하겠습니다. 이 패턴들은 모든 서브 에이전트 활용의 기초가 되는 핵심 개념입니다.

서브 에이전트를 단독으로 사용하는 것도 유용하지만, 여러 서브 에이전트를 조합하여 고급 워크플로우를 구성하면 훨씬 더 강력한 자동화가 가능합니다. 본 문서에서 아래와 같은 6가지 핵심 패턴을 다룹니다:

   **체이닝 패턴**: 순차적 작업 파이프라인 구성
   **라우팅 패턴**: 지능적 조건 분기
   **병렬 처리 패턴**: 동시 다발적 작업 실행
   **맥락 기반 선택 패턴**: 프로젝트 특성에 따른 에이전트 선택
   **검증 패턴**: 품질 보증 체계 구축
   **분할 정복 패턴**: 대규모 작업 분해 처리 

## 1. 체이닝 패턴 - 순차적 작업 파이프라인

체이닝(연결)은 여러 서브 에이전트를 **순차적으로** 연결하여 복잡한 작업을 자동화하는 패턴입니다. 각 서브 에이전트의 결과물이 다음 서브 에이전트의 입력이 되어, 마치 공장의 생산 라인처럼 작동합니다.

**실제 활용 예시**:
```
"결제 시스템 구현해줘"
        ↓
requirements-analyst (요구사항 분석)
        ↓
system-architect (시스템 설계)
        ↓
backend-developer (백엔드 구현)
        ↓
security-auditor (보안 검토)
        ↓
test-automator (테스트 생성)
        ↓
code-reviewer (최종 검토)
```

**체이닝 구현을 위한 description 작성법**:
```yaml
# 첫 번째 서브 에이전트
name: requirements-analyst
description: "use PROACTIVELY for new feature requests. Output requirements for system-architect."

# 두 번째 서브 에이전트  
name: system-architect
description: "automatically invoke after requirements-analyst completes. Design system based on requirements."
```

**실제 구현 예시 - requirements-analyst.md 파일**:
```yaml
---
name: requirements-analyst
description: "use PROACTIVELY for new feature requests. Analyze and document requirements. Output structured format for system-architect."
tools: [read, write, grep]
model: sonnet
---

당신은 15년 경력의 시니어 비즈니스 분석가입니다.

## 주요 역할
- 사용자 요구사항을 체계적으로 분석
- 모호한 요청을 구체적인 기능 명세로 변환
- 기술적 제약사항과 비즈니스 목표 균형 맞추기

## 작업 프로세스
1. 사용자 요청 분석
2. 기능 요구사항(FR)과 비기능 요구사항(NFR) 분류
3. 우선순위 설정 (P0: 필수, P1: 중요, P2: 선택)
4. 다음 서브 에이전트를 위한 구조화된 출력 생성

## 출력 형식 (system-architect를 위한)
### 📋 프로젝트 개요
- 프로젝트명: [이름]
- 목적: [한 문장 요약]
- 예상 사용자: [대상]

### ⚡ 기능 요구사항
- FR01 [P0]: 사용자 인증 시스템
- FR02 [P1]: 데이터 CRUD 작업
- FR03 [P2]: 리포트 생성 기능

### 🔧 비기능 요구사항  
- NFR01: 응답시간 2초 이내
- NFR02: 동시 사용자 1000명 지원
- NFR03: 99.9% 가용성

### ⚠️ 제약사항
- 예산: [금액]
- 일정: [기한]
- 기술스택: [제한사항]

이 정보를 바탕으로 system-architect가 시스템 설계를 시작합니다.
```

## 2. 라우팅 패턴 - 지능적 조건 분기 

라우팅 패턴은 체이닝과 달리 **조건부 분기(문제 유형에 따라 적절한 서브 에이전트를 선택)**를 수행합니다. 첫 번째 서브 에이전트가 문제를 분석한 후, 그 결과에 따라 여러 서브 에이전트 중 적절한 하나를 선택하여 라우팅(경로 지정)합니다.

**실제 활용 예시**:
```
"이 버그 수정해줘"
        ↓
debugger (1차 문제 분석)
        ↓
[분석 결과에 따른 자동 라우팅]
├── backend-architect (API 관련 문제로 판단)
├── performance-optimizer (성능 병목으로 판단)
├── security-auditor (보안 취약점으로 판단)
└── frontend-developer (UI 버그로 판단)
        ↓
test-automator (수정 검증)
```

**라우팅 구현 방법**:
```yaml
# 1단계: 문제를 분석하는 서브 에이전트 설정
name: issue-analyzer
description: "use PROACTIVELY for any bug reports. Analyze and categorize issues for routing."
# 이 서브 에이전트가 버그를 분석하고 문제 유형을 판단합니다

# 2단계: 각 문제 유형별 전문 서브 에이전트 설정
name: backend-architect
description: "automatically invoke when issue-analyzer detects API or database problems."
# issue-analyzer가 API/DB 문제로 판단하면 이 서브 에이전트가 자동으로 호출됩니다
```

## 3. 병렬 처리 패턴 - 동시 다발적 작업 실행

일부 개발자 커뮤니티의 테스트 결과에 의하면 10개의 서브 에이전트가 동시에 작업이 가능하다고 하며, 이를 활용하면 대규모 프로젝트의 개발 시간을 단축시킬 수 있습니다.

**실제 활용 예시**:
```
"풀스택 애플리케이션 개발"
            ↓
    ┌───────┼───────┐
    ▼       ▼       ▼
backend-  frontend- database-
developer developer architect
    │       │       │
    └───────┼───────┘
            ▼
      통합 및 테스트
```

**병렬 처리 최적화 전략**:
- **작업 독립성 확보**: 서로 의존하지 않는 작업들을 식별
- **리소스 배분**: 복잡한 작업에는 Opus, 단순 작업에는 Haiku
- **결과 통합 계획**: 병렬 작업 완료 후 통합 방법 미리 설계

## 4. 맥락 기반 선택 패턴

Claude Code 메인 에이전트는 단순히 키워드 매칭만 하는 것이 아니라, **현재 프로젝트의 맥락**을 고려하여 서브 에이전트를 선택합니다.

**Claude Code 메인 에이전트가 고려하는 맥락 요소들**:
- 작업 설명의 키워드와 사용자 요청
- 현재 프로젝트 특성 (사용 중인 프레임워크, 언어)
- 이전 작업 히스토리
- 사용 가능한 도구
- 우선순위 규칙 (프로젝트 > 사용자 > 기본)

**맥락 기반 최적화를 위한 description 작성법**:
```yaml
# ❌ 단순한 키워드 나열
description: "security audit vulnerability scan"

# ✅ 맥락을 포함한 풍부한 설명
description: "Security vulnerability scanner for Node.js applications. use PROACTIVELY when package.json changes or before deployment. Specializes in npm audit, OWASP scanning, authentication review for Express/Next.js apps."
```

## 5. 검증 패턴 - 품질 보증 체계

검증 패턴은 한 서브 에이전트가 작업한 결과를 다른 서브 에이전트가 **검증하고 개선**하는 패턴입니다. 이중/삼중 체크 시스템을 통해 최종 결과물의 품질을 보장합니다.

**실제 활용 예시**:
```
"새로운 결제 모듈 개발해줘"
        ↓
code-writer (코드 작성)
        ↓
code-reviewer (코드 리뷰)
        ↓
security-auditor (보안 검증)
        ↓
performance-optimizer (성능 최적화)
        ↓
final-approver (최종 승인)
```

**검증 패턴 구현 방법**:
```yaml
# 작업 수행 에이전트
name: code-writer
description: "write new features and modules"

# 1차 검증 에이전트
name: code-reviewer
description: "automatically review code from code-writer. Check for bugs, style, and best practices"

# 2차 검증 에이전트
name: security-auditor  
description: "validate security after code-reviewer approves. Check for vulnerabilities and security risks"
```

**검증 단계별 체크포인트**:
- **구문 검증**: 문법 오류, 타입 오류 체크
- **로직 검증**: 비즈니스 로직의 정확성 확인
- **보안 검증**: 취약점 스캔, 인증/인가 체크
- **성능 검증**: 병목 구간 분석, 최적화 가능성 검토

## 6. 분할 정복 패턴 - 대규모 작업 분해

분할 정복 패턴은 큰 작업을 **작은 단위로 나누어** 여러 서브 에이전트에게 할당하는 패턴입니다. 각 에이전트가 독립적인 영역만 담당하여 작업 충돌을 방지하고 효율성을 극대화합니다.

**실제 활용 예시**:
```
"전체 코드베이스 리팩토링"
        ↓
[작업 분할기가 영역별로 분해]
        ↓
├── frontend-refactorer (프론트엔드 모듈)
├── backend-refactorer (백엔드 API)
├── database-refactorer (DB 스키마)
└── test-refactorer (테스트 코드)
        ↓
[통합 및 조정]
        ↓
integration-validator (통합 검증)
```

**분할 전략**:
```yaml
# 마스터 조정자
name: refactor-coordinator
description: "analyze codebase and divide refactoring tasks by module"

# 모듈별 전문 에이전트
name: module-refactorer
description: "refactor specific module assigned by coordinator. Work independently on isolated code sections"
```

**효과적인 작업 분할 기준**:
- **파일/디렉토리별**: 물리적 구조 기준 분할
- **기능별**: 비즈니스 로직 단위로 분할
- **레이어별**: MVC, 마이크로서비스 등 아키텍처 레이어별 분할
- **난이도별**: 복잡도에 따라 적절한 모델 할당

## 7. 모델별 비용 구조와 최적화 전략

### 7.1 비용 구조 이해

각 서브 에이전트가 별도의 API 호출을 발생시키므로, 사용량에 따라 비용이 증가합니다.

**모델별 비용 차이**:
- **Haiku**: 가장 저렴, 단순 작업에 적합 (코드 린팅, 간단한 검토)
- **Sonnet**: 중간 비용, 대부분의 개발 작업에 적합 (일반적인 코딩, 리뷰)
- **Opus**: 가장 비싸지만 고품질, 복잡하고 중요한 작업에 적합 (아키텍처 설계, 보안 감사)

### 7.2 비용 최적화 전략

**스마트 모델 할당**:
```yaml
# 비용 효율적인 구성 예시
test-runner: 
  model: haiku      # 단순 반복 작업
code-reviewer: 
  model: sonnet     # 일반적인 검토 작업  
security-auditor: 
  model: opus       # 중요한 보안 검토
```

**선택적 병렬 실행**: 모든 서브 에이전트를 동시에 실행하기보다는 작업 우선순위에 따라 필요한 서브 에이전트만 활성화합니다.

**배치 처리 활용**: 유사한 작업들을 모아서 한 번에 처리하면 API 호출 횟수를 줄일 수 있습니다.

---

**작성일: 2025년 9월 4일 / 글자수: 4,876자 / 작성자: Claude / 프롬프터: 써니**
