# Google Drive 동기화 문제 해결

## 요약
Google Drive 동기화가 파일 잠금하면 Claude Code 작업 실패. 작업 전 동기화 일시 중지 → 작업 완료 → 동기화 재개.

## 상세

### 문제 증상

```
❌ "파일이 다른 프로세스에서 사용 중입니다"
❌ "unable to create/write file"
❌ ".git/index.lock already exists"
```

### 해결 방법

**방법 1: 동기화 일시 중지 (권장)**
1. 시스템 트레이 → Google Drive 아이콘
2. 설정 (톱니바퀴) → 동기화 일시 중지
3. 작업 수행
4. 작업 완료 후 동기화 재개

**방법 2: 프로젝트 폴더 동기화 제외**
- Google Drive 설정 → 환경설정 → 해당 폴더 동기화 해제

### Git index.lock 오류

```bash
rm -f .git/index.lock   # Linux/Mac
del .git\index.lock     # Windows
```

### 권장 폴더 구조

```
C:\Users\사용자\
├── Google Drive\      # 동기화됨 (문서)
└── Projects\          # 동기화 안 됨 (개발)
```

---
📚 더 자세히: OneDrive, Dropbox도 동일하게 적용
