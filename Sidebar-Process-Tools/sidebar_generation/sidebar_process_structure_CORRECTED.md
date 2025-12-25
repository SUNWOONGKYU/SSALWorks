# SSALWorks 웹사이트 사이드바 구조

> **최종 업데이트**: 2025-12-24
> **기준**: 실제 디렉토리 구조 (자동 생성)
> **목적**: SSALWorks 웹사이트 사이드바에 표시할 개발 프로세스 구조

---

## 📘 상단 링크

**PROJECT SAL GRID 매뉴얼**
- 위치: `S1_개발_준비/Documentation/PROJECT_SAL_GRID_매뉴얼.md`
- 용도: 프로젝트 그리드 작성 방법, Task ID 규칙, Dual Execution System

---

## 📂 개발 프로세스

### P1_사업계획

- Business_Model
- BusinessPlan
- Market_Analysis
#### Patent
- drawings

- Vision_Mission
---

### P2_프로젝트_기획

- Design_System
- Project_Plan
- Requirements
- Service_Introduction
- Tech_Stack
#### UI_UX_Mockup
- Design_Specs
- Mockups
- Wireframes

#### User_Flows
- 1_Signup
- 2_Project_Registration
- 3_Subscription
- 4_Credit_Purchase
- 5_Development_Process

- Workflows
---

### P3_프로토타입_제작

- Database (데이터베이스)
- Documentation (문서화)
#### Frontend (프론트엔드)
- Prototype
  - _archive
  - pages
  - scripts

---

### S1_개발_준비

#### Backend_Infra (백엔드 인프라)
- Environment

- Database (데이터베이스)
- DevOps (DevOps)
- Documentation (문서화)
- Frontend (프론트엔드)
- Security (보안)
#### Testing (테스트)
- docs
- tests
  - e2e
  - unit

---

### S2_개발-1차

#### Backend_APIs
- api
  - lib
  - projects

#### Backend_Infra (백엔드 인프라)
- api
  - lib
- assets
  - css
  - js

- Content_System (콘텐츠 시스템)
- Database (데이터베이스)
- Documentation (문서화)
#### Frontend (프론트엔드)
- assets
  - css
  - js
- pages
  - auth

#### Security (보안)
- api
  - lib

#### Testing (테스트)
- __mocks__
- __tests__
  - auth
- node_modules
  - .bin
  - @babel
  - @bcoe
  - @isaacs
  - @istanbuljs
  - @jest
  - @jridgewell
  - @one-ini
  - @pkgjs
  - @react-email
  - @selderee
  - @sinclair
  - @sinonjs
  - @supabase
  - @types
  - @ungap
  - abbrev
  - ansi-escapes
  - ansi-regex
  - ansi-styles
  - anymatch
  - argparse
  - babel-jest
  - babel-plugin-istanbul
  - babel-plugin-jest-hoist
  - babel-plugin-polyfill-corejs2
  - babel-plugin-polyfill-corejs3
  - babel-plugin-polyfill-regenerator
  - babel-preset-current-node-syntax
  - babel-preset-jest
  - balanced-match
  - baseline-browser-mapping
  - brace-expansion
  - braces
  - browserslist
  - bser
  - buffer-from
  - callsites
  - camelcase
  - caniuse-lite
  - chalk
  - char-regex
  - ci-info
  - cjs-module-lexer
  - cliui
  - co
  - collect-v8-coverage
  - color-convert
  - color-name
  - commander
  - concat-map
  - config-chain
  - convert-source-map
  - core-js-compat
  - create-jest
  - cross-spawn
  - debug
  - dedent
  - deepmerge
  - detect-newline
  - diff-sequences
  - dom-serializer
  - domelementtype
  - domhandler
  - domutils
  - eastasianwidth
  - editorconfig
  - electron-to-chromium
  - emittery
  - emoji-regex
  - entities
  - error-ex
  - escalade
  - escape-string-regexp
  - esprima
  - esutils
  - execa
  - exit
  - expect
  - fast-deep-equal
  - fast-json-stable-stringify
  - fb-watchman
  - fill-range
  - find-up
  - foreground-child
  - fs.realpath
  - function-bind
  - gensync
  - get-caller-file
  - get-package-type
  - get-stream
  - glob
  - graceful-fs
  - has-flag
  - hasown
  - html-escaper
  - html-to-text
  - htmlparser2
  - human-signals
  - iceberg-js
  - import-local
  - imurmurhash
  - inflight
  - inherits
  - ini
  - is-arrayish
  - is-core-module
  - is-fullwidth-code-point
  - is-generator-fn
  - is-number
  - is-stream
  - isexe
  - istanbul-lib-coverage
  - istanbul-lib-instrument
  - istanbul-lib-report
  - istanbul-lib-source-maps
  - istanbul-reports
  - jackspeak
  - jest
  - jest-changed-files
  - jest-circus
  - jest-cli
  - jest-config
  - jest-diff
  - jest-docblock
  - jest-each
  - jest-environment-node
  - jest-get-type
  - jest-haste-map
  - jest-leak-detector
  - jest-matcher-utils
  - jest-message-util
  - jest-mock
  - jest-pnp-resolver
  - jest-regex-util
  - jest-resolve
  - jest-resolve-dependencies
  - jest-runner
  - jest-runtime
  - jest-snapshot
  - jest-util
  - jest-validate
  - jest-watcher
  - jest-worker
  - js-beautify
  - js-cookie
  - js-tokens
  - js-yaml
  - jsesc
  - json-parse-even-better-errors
  - json5
  - kleur
  - leac
  - leven
  - lines-and-columns
  - locate-path
  - lodash.debounce
  - loose-envify
  - lru-cache
  - make-dir
  - makeerror
  - merge-stream
  - micromatch
  - mimic-fn
  - minimatch
  - minipass
  - ms
  - natural-compare
  - node-int64
  - node-releases
  - nopt
  - normalize-path
  - npm-run-path
  - once
  - onetime
  - p-limit
  - p-locate
  - p-try
  - package-json-from-dist
  - parse-json
  - parseley
  - path-exists
  - path-is-absolute
  - path-key
  - path-parse
  - path-scurry
  - peberminta
  - picocolors
  - picomatch
  - pirates
  - pkg-dir
  - pretty-format
  - prompts
  - proto-list
  - pure-rand
  - react
  - react-dom
  - react-is
  - react-promise-suspense
  - regenerate
  - regenerate-unicode-properties
  - regexpu-core
  - regjsgen
  - regjsparser
  - require-directory
  - resend
  - resolve
  - resolve-cwd
  - resolve-from
  - resolve.exports
  - scheduler
  - selderee
  - semver
  - shebang-command
  - shebang-regex
  - signal-exit
  - sisteransi
  - slash
  - source-map
  - source-map-support
  - sprintf-js
  - stack-utils
  - string-length
  - string-width
  - string-width-cjs
  - strip-ansi
  - strip-ansi-cjs
  - strip-bom
  - strip-final-newline
  - strip-json-comments
  - supports-color
  - supports-preserve-symlinks-flag
  - test-exclude
  - tmpl
  - to-regex-range
  - tslib
  - type-detect
  - type-fest
  - undici-types
  - unicode-canonical-property-names-ecmascript
  - unicode-match-property-ecmascript
  - unicode-match-property-value-ecmascript
  - unicode-property-aliases-ecmascript
  - update-browserslist-db
  - v8-to-istanbul
  - walker
  - which
  - wrap-ansi
  - wrap-ansi-cjs
  - wrappy
  - write-file-atomic
  - ws
  - y18n
  - yallist
  - yargs
  - yargs-parser
  - yocto-queue

---

### S3_개발-2차

#### Backend_APIs
- api
  - ai
  - lib

#### Backend_Infra (백엔드 인프라)
- ai

- Database (데이터베이스)
- External (외부 연동)
#### Frontend (프론트엔드)
- assets
  - css
  - js
- pages
  - ai

#### Security (보안)
- api
- lib
  - subscription

---

### S4_개발-3차

#### Backend_APIs
- admin
- api
  - admin
  - credit
  - payment
  - webhook
- projects

#### Backend_Infra (백엔드 인프라)
- ai

- Database (데이터베이스)
#### DevOps (DevOps)
- api
  - cron
  - utils

- Documentation (문서화)
- External (외부 연동)
#### Frontend (프론트엔드)
- pages
  - admin
  - mypage
  - subscription

#### Security (보안)
- api
  - lib
- google

#### Testing (테스트)
- screenshots-mobile
- tests
  - e2e
  - integration

---

### S5_운영

---

## 📝 구조 설명

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
