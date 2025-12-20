# Google Drive 동기화 문제 해결

> 이 문서는 Google Drive 동기화로 인한 파일 잠금 문제를 해결하는 방법을 설명합니다.

---

## 문제 원인

Google Drive가 파일을 동기화할 때 해당 파일을 잠급니다. Claude Code가 파일을 수정하려고 하면 "다른 프로세스에서 사용 중" 오류가 발생합니다.

---

## 문제 증상

```
❌ "파일이 다른 프로세스에서 사용 중입니다"
❌ "unable to create/write file"
❌ ".git/index.lock already exists"
```

---

## 해결 방법

### 방법 1: 동기화 일시 중지 (권장)

1. 시스템 트레이에서 Google Drive 아이콘 클릭
2. 설정 (톱니바퀴) 클릭
3. **"동기화 일시 중지"** 선택
4. Claude Code로 작업 수행
5. 작업 완료 후 **"동기화 재개"**

### 방법 2: 프로젝트 폴더 동기화 제외

Google Drive 설정 → 환경설정 → 해당 폴더 동기화 해제

---

## Git index.lock 오류

Git 작업 중 동기화가 끼어들면 lock 파일이 남습니다.

```bash
# Linux/Mac
rm -f .git/index.lock

# Windows
del .git\index.lock
```

---

## 권장 폴더 구조

```
C:\Users\사용자\
├── Google Drive\      # 동기화됨 (문서, 백업)
└── Projects\          # 동기화 안 됨 (개발 프로젝트)
```

개발 프로젝트는 동기화 폴더 바깥에 배치하는 것이 좋습니다.

---

## Claude Code에게 요청하기

```
".git/index.lock 파일 삭제해줘"
"현재 폴더 권한 상태 확인해줘"
```

---

## 체크리스트

- [ ] 개발 폴더가 동기화 폴더 안에 있는가?
- [ ] 작업 전 동기화를 일시 중지했는가?
- [ ] 파일 잠금 오류가 발생하면 lock 파일을 확인했는가?

---

*OneDrive, Dropbox도 동일한 문제가 발생할 수 있습니다.*

