# Docker 설정 가이드

## 📋 개요

Docker 컨테이너화를 위한 설정 파일 및 가이드입니다.

## 📂 폴더 내용

- `Dockerfile` - Docker 이미지 빌드 파일
- `.dockerignore` - Docker 빌드 시 제외할 파일 목록
- `docker-compose.yml` - 다중 컨테이너 구성 (선택사항)
- `docker_installation.md` - Docker 설치 가이드

## 🚀 사용 방법

### 1. Docker 설치
```bash
# Docker Desktop 설치 (Windows/Mac)
# 또는 Docker Engine 설치 (Linux)
```

### 2. 이미지 빌드
```bash
docker build -t ssalworks:latest .
```

### 3. 컨테이너 실행
```bash
docker run -p 3000:3000 ssalworks:latest
```

## 📌 중요 사항

- 환경 변수는 `.env` 파일로 관리
- `.dockerignore`에 불필요한 파일 추가
- 프로덕션용 멀티 스테이지 빌드 사용

## 🔗 관련 문서

- 배포 설정: `3_개발/3-9_Deployment/`
