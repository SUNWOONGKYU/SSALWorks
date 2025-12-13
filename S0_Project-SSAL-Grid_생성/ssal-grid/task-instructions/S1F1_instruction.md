# Task Instruction - S1F1

## Task ID
S1F1

## Task Name
Vercel 프로젝트 설정

## Task Goal
SSALWorks 프로덕션 배포를 위한 Vercel 프로젝트 생성 및 GitHub 저장소 연결

## Prerequisites (Dependencies)
- 없음 (독립 Task)
- GitHub 저장소 존재 확인 필요

## Specific Instructions

### 1. Vercel 프로젝트 생성
- Vercel Dashboard (https://vercel.com) 접속
- "New Project" 클릭
- GitHub 저장소 `SUNWOONGKYU/SSALWorks` 선택
- 프로젝트명: `ssalworks`

### 2. 프레임워크 설정
- Framework Preset: `Other` (순수 HTML/JS)
- Build Command: (비워두기 또는 `echo "No build needed"`)
- Output Directory: `P3_프로토타입_제작/Frontend/Prototype`
- Install Command: `npm install` (필요시)

### 3. Root Directory 설정
- Root Directory: `P3_프로토타입_제작/Frontend/Prototype`

### 4. Git 연결 확인
- Production Branch: `master`
- Auto-deploy on push: 활성화

### 5. 초기 배포 테스트
- 수동 배포 트리거
- 배포 URL 확인
- 기본 페이지 접속 테스트

## Expected Output Files
- Vercel 프로젝트 생성 완료 (Vercel Dashboard에서 확인)
- 배포 URL 기록 (예: `ssalworks.vercel.app`)

## Completion Criteria
- [ ] Vercel 프로젝트 생성 완료
- [ ] GitHub 저장소 연결 완료
- [ ] 프레임워크 설정 완료
- [ ] 초기 배포 성공
- [ ] 배포 URL 접속 가능

## Tech Stack
- Vercel
- GitHub

## Tools
- WebFetch (Vercel Dashboard 확인)
- Bash (gh CLI 사용 가능시)

## Execution Type
Human-AI (Vercel Dashboard 접속 필요)

## Remarks
- Vercel 계정 로그인 필요 (Human 개입)
- 배포 URL은 S5O2에서 커스텀 도메인 연결 예정
- 환경변수는 S1BI1에서 설정
