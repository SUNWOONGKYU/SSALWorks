# 음성으로 지시하기 - AI 활용

## 요약
ChatGPT/Gemini 웹에서 음성 입력 → 인식된 텍스트 복사 → Claude Code에 붙여넣기. Windows 기본보다 기술 용어와 영어 혼용 인식률 높음.

## 상세

### 왜 AI 서비스를 활용하나?

```
말한 것:
"API 만들어줘 파라미터는 userId랑 email이고 리턴은 boolean으로"

Windows 인식: "에이피아이 만들어줘 파라미터는 유저아이디랑..."
ChatGPT 인식: "API 만들어줘. 파라미터는 userId와 email이고, 리턴은 boolean으로"
```

### 사용법

1. chat.openai.com 또는 gemini.google.com 접속
2. 마이크 아이콘 클릭
3. 음성으로 지시사항 말하기
4. 인식된 텍스트 복사 (Ctrl+C)
5. Claude Code에 붙여넣기 (Ctrl+V)

### 서비스 비교

| 특징 | ChatGPT | Gemini |
|------|---------|--------|
| 영어 혼용 | 매우 좋음 | 좋음 |
| 코드 용어 | 매우 좋음 | 좋음 |
| 한국어 | 좋음 | 매우 좋음 |

### 추천 상황

| 상황 | 추천 |
|------|------|
| 짧은 한국어 지시 | Windows 기본 (Win+H) |
| 영어 혼용, 코드 용어 | ChatGPT 음성 |

---
📚 더 자세히: `음성으로_지시하기_-_Windows_기본.md`
