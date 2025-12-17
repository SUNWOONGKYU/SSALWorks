# Google Drive 동기화 문제 해결

## 핵심 요약

Google Drive를 사용할 때 동기화 때문에 Claude Code 작업이 안 되는 경우가 있습니다. 그럴 때는 Google Drive 동기화를 일시 중지했다가 작업 완료 후 다시 실행하세요.

## 문제 현상

### 발생하는 증상

```
❌ 파일 저장 실패
"파일이 다른 프로세스에서 사용 중입니다"

❌ 파일 읽기 오류
"파일에 접근할 수 없습니다"

❌ Git 오류
"unable to create/write file"
"index.lock already exists"
```

### 원인

```
Google Drive 동기화가 파일을 잠금 → Claude Code가 접근 불가

동기화 중:
Google Drive ← 파일 잠금 → Claude Code 접근 불가
```

## 해결 방법

### 방법 1: 동기화 일시 중지 (권장)

**Windows 트레이에서:**
1. 시스템 트레이에서 **Google Drive 아이콘** 찾기
2. 아이콘 클릭 → **설정 (톱니바퀴)** 클릭
3. **동기화 일시 중지** 선택
4. Claude Code 작업 수행
5. 작업 완료 후 **동기화 재개**

### 방법 2: 특정 폴더 제외

**Google Drive 설정에서:**
1. Google Drive 아이콘 → **설정** → **환경설정**
2. **내 컴퓨터의 폴더** 탭
3. 프로젝트 폴더 **동기화 해제**
4. 또는 `.gitignore` 스타일로 제외 설정

### 방법 3: 스트리밍 모드 사용

```
미러링 모드 → 스트리밍 모드로 변경

미러링: 모든 파일이 로컬에 저장 (충돌 발생)
스트리밍: 필요할 때만 다운로드 (충돌 감소)
```

**설정 방법:**
1. Google Drive → **설정** → **환경설정**
2. **Google Drive 스트리밍 옵션**
3. **파일 스트리밍** 선택

## 작업 흐름 권장

### Claude Code 작업 시

```
1. Google Drive 동기화 일시 중지
2. Claude Code 작업 수행
3. 작업 완료 확인
4. 파일 저장 완료 확인
5. Google Drive 동기화 재개
6. 동기화 완료 대기
```

### 작업 빈도별 권장

| 상황 | 권장 방법 |
|------|----------|
| 짧은 작업 (5분 이내) | 동기화 일시 중지 |
| 긴 작업 (30분 이상) | 폴더 제외 설정 |
| 상시 개발 | 프로젝트 폴더 동기화 제외 |

## Git과의 충돌

### index.lock 오류

```bash
# 오류 메시지
fatal: Unable to create '.git/index.lock': File exists.

# 해결
rm -f .git/index.lock
# 또는 Windows
del .git\index.lock
```

### 원인 및 예방

```
Google Drive가 .git 폴더도 동기화
→ index.lock 파일 잠금
→ Git 작업 실패

예방: .git 폴더 동기화 제외
```

## OneDrive / Dropbox 동일 적용

### OneDrive

```
설정 → 동기화 일시 중지
또는
폴더 우클릭 → OneDrive → 이 장치에서 항상 유지 해제
```

### Dropbox

```
시스템 트레이 → Dropbox 아이콘
동기화 일시 중지 선택
```

## 권장 설정

### 개발 프로젝트 폴더 구조

```
C:\Users\사용자\
├── Google Drive\           # 동기화됨
│   └── Documents\          # 문서류
└── Projects\               # 동기화 안 됨 (개발용)
    └── my-project\         # Claude Code 작업 폴더
```

### 이점

```
✅ 개발 폴더는 동기화 충돌 없음
✅ 문서는 클라우드 백업됨
✅ Git으로 코드 버전 관리
✅ GitHub으로 코드 백업
```

## 주의사항

- 동기화 재개 전 모든 파일 저장 확인
- 긴 작업 시 중간중간 동기화 상태 확인
- .git 폴더는 동기화에서 제외 권장
- 중요한 파일은 Git 커밋으로 별도 백업
- 동기화 충돌 시 최신 버전 선택 주의
