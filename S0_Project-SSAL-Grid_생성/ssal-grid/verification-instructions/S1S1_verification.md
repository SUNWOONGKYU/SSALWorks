# Verification Instruction - S1S1

## Task ID
S1S1

## Task Name
보안 정책 문서

## Verification Checklist

### 1. 문서 존재 검증
- [ ] SECURITY_POLICY.md 파일 존재
- [ ] 모든 필수 섹션 포함

### 2. 인증 보안 섹션
- [ ] 비밀번호 정책 정의
- [ ] 세션 관리 정책
- [ ] OAuth 보안 고려사항
- [ ] 토큰 관리 정책

### 3. API 보안 섹션
- [ ] Rate Limiting 정책
- [ ] CORS 설정 정책
- [ ] 입력 검증 정책
- [ ] 에러 응답 정책

### 4. 데이터 보안 섹션
- [ ] RLS 정책 명시
- [ ] 민감 데이터 암호화 정책
- [ ] 백업 정책
- [ ] 데이터 보존 정책

### 5. 결제 보안 섹션
- [ ] PCI DSS 고려사항
- [ ] 결제 정보 처리 정책
- [ ] 웹훅 검증 정책

## Test Commands
```bash
# 파일 존재 확인
ls -la docs/SECURITY_POLICY.md

# 섹션 확인
grep -E "^##" docs/SECURITY_POLICY.md
```

## Expected Results
- 보안 정책 문서 존재
- 모든 영역(인증, API, 데이터, 결제) 커버
- 구체적인 정책 정의

## Verification Agent
code-reviewer

## Pass Criteria
- 문서 완성도 100%
- 4개 주요 영역 모두 포함
- 구체적인 정책 수치 명시
