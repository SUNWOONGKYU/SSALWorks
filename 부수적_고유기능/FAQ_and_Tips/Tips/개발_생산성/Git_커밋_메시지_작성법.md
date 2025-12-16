# Git 커밋 메시지 작성법

## 💡 Tip

**Conventional Commits** 형식을 따르면 커밋 이력을 쉽게 파악할 수 있습니다.

## 커밋 메시지 형식

```
<type>: <description>

[optional body]
[optional footer]
```

## Type 종류

| Type | 용도 | 예시 |
|------|------|------|
| `feat` | 새 기능 | feat: Google OAuth 로그인 구현 |
| `fix` | 버그 수정 | fix: 로그인 redirect URL 수정 |
| `docs` | 문서 변경 | docs: README 업데이트 |
| `style` | 포맷팅 | style: 코드 들여쓰기 수정 |
| `refactor` | 리팩토링 | refactor: 인증 로직 분리 |
| `test` | 테스트 | test: 회원가입 API 테스트 추가 |
| `chore` | 기타 | chore: 패키지 업데이트 |

## 좋은 커밋 메시지 예시

```
feat: 로그인 시 사용자 닉네임 표시 기능 추가

- users 테이블에서 닉네임 조회
- 헤더에 닉네임 표시 요소 추가
- 닉네임 없을 경우 이메일 앞부분 사용
```

## 나쁜 커밋 메시지 예시

```
❌ "수정"
❌ "fix bug"
❌ "작업 완료"
❌ "asdfasdf"
```

## SSAL Works 실제 커밋 예시

```bash
# 실제 커밋 이력
177329e feat: 로그인 시 사용자 닉네임 표시 기능 추가
cbbd27c fix: Production 경로로 redirect URL 수정
ccc9392 fix: 좌측 사이드바-디렉토리 구조 일치 수정
```

## Claude Code에서 커밋하기

```
"지금까지 작업한 내용 커밋해줘"
```

Claude Code가 자동으로:
1. 변경 내용 분석
2. 적절한 커밋 메시지 생성
3. git add && git commit 실행

## 관련 문서
- `S1_개발_준비/Documentation/DEVELOPMENT_GUIDE.md`
