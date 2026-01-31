// Auto-generated Custom Skills Bundle
// Generated at: 2026-01-31T16:17:37.911Z
// Total skills: 1

window.CUSTOM_SKILLS = {
  "deal-news": {
    "content": "---\r\nname: deal-news\r\ndescription: Deal 뉴스 수동 수집 - GitHub Actions 트리거 + 모니터링 + 결과 확인\r\nargument-hint: \"[날짜 YYYY-MM-DD]\"\r\nallowed-tools: \"Bash(gh *), Bash(cd *), Bash(sleep *), Read, Grep\"\r\n---\r\n\r\n# Deal News 수동 수집\r\n\r\n투자 뉴스를 수동으로 수집합니다. GitHub Actions 워크플로우를 트리거하고 결과를 확인합니다.\r\n\r\n## 프로세스\r\n\r\n### Step 1: 워크플로우 트리거\r\n\r\n날짜 인자가 있으면 해당 날짜, 없으면 어제 날짜로 수집합니다.\r\n\r\n```bash\r\n# 인자 있을 때\r\ngh workflow run \"Daily Investment News Scraper\" --ref master -f target_date=$ARGUMENTS\r\n\r\n# 인자 없을 때\r\ngh workflow run \"Daily Investment News Scraper\" --ref master\r\n```\r\n\r\n실행 디렉토리: 레포지토리 루트 (C:\\ValueLink)\r\n\r\n### Step 2: 실행 대기 및 모니터링\r\n\r\n```bash\r\n# 10초 대기 후 상태 확인\r\nsleep 10\r\ngh run list --workflow=\"Daily Investment News Scraper\" --limit 1\r\n```\r\n\r\n- `in_progress`이면 완료될 때까지 30초 간격으로 재확인 (최대 5분)\r\n- `completed`이면 Step 3으로\r\n\r\n### Step 3: 결과 확인\r\n\r\n```bash\r\n# 최신 run ID로 결과 확인\r\ngh run view {RUN_ID}\r\n```\r\n\r\n- **success**: Step 4로 → 상세 로그 확인\r\n- **failure**: Step 5로 → 에러 분석\r\n\r\n### Step 4: 성공 시 상세 로그\r\n\r\n```bash\r\ngh run view {RUN_ID} --log 2>&1 | grep -E \"수집|저장|완료|기사|deal|0개|건|투자|❌|✅|⚠️\"\r\n```\r\n\r\n사용자에게 보고할 내용:\r\n- 수집된 기사 수\r\n- 저장된 건수\r\n- 탈락된 기사와 사유\r\n- 이메일 발송 여부\r\n\r\n### Step 5: 실패 시 에러 분석\r\n\r\n```bash\r\ngh run view {RUN_ID} --log-failed 2>&1 | grep -E \"error|Error|Traceback|TypeError|ModuleNotFoundError|exit code\" | head -20\r\n```\r\n\r\n에러 원인을 분석하고 사용자에게 보고:\r\n- 에러 종류 (스크립트 오류, 환경변수 누락, 의존성 문제 등)\r\n- 해당 코드 위치\r\n- 수정 방안 제안\r\n\r\n## 사용 예시\r\n\r\n```\r\n/deal-news              # 어제 날짜 뉴스 수집\r\n/deal-news 2026-01-30   # 특정 날짜 뉴스 수집\r\n```\r\n\r\n## 관련 파일\r\n\r\n- 워크플로우: `.github/workflows/daily-news-scraper.yml`\r\n- 수집 스크립트: `Valuation_Company/scripts/investment-news-scraper/daily_auto_collect.py`\r\n- 이메일 발송: `Valuation_Company/scripts/investment-news-scraper/send_daily_email.py`\r\n",
    "meta": {
      "id": "deal-news",
      "title": "Deal 뉴스 자동 수집",
      "icon": "📰",
      "category": "자동화",
      "description": "GitHub Actions로 투자 뉴스를 수집하고 결과를 확인하는 워크플로우 자동화 스킬"
    }
  }
};
