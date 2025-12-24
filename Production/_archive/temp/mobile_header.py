#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""모바일 헤더 개선: 2줄 + 로그인 아이콘"""

import os

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(os.path.dirname(os.path.dirname(os.path.dirname(script_dir))))

    file_path = 'Production/index.html'

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    changes = []

    # 1. 모바일 로그인 아이콘 버튼 HTML 추가 (mobile-menu-btn 다음에)
    old_mobile_btn = '<button class="mobile-menu-btn" onclick="toggleLeftSidebar()">≡</button>'
    new_mobile_btn = '''<button class="mobile-menu-btn" onclick="toggleLeftSidebar()">≡</button>
                <!-- 모바일 로그인 아이콘 -->
                <a href="pages/auth/login.html" class="mobile-login-btn" id="mobileLoginBtn">👤</a>'''

    if 'mobile-login-btn' not in content:
        content = content.replace(old_mobile_btn, new_mobile_btn)
        changes.append("1. Mobile login button HTML added")

    # 2. 모바일 CSS 추가
    mobile_header_css = '''

        /* 모바일 헤더 개선 */
        .mobile-login-btn {
            display: none;
            width: 44px;
            height: 44px;
            background: rgba(255, 255, 255, 0.15);
            border: none;
            border-radius: 8px;
            color: white;
            font-size: 18px;
            cursor: pointer;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            transition: all 0.2s;
            position: absolute;
            right: 12px;
        }

        .mobile-login-btn:hover {
            background: rgba(255, 255, 255, 0.25);
        }

        @media (max-width: 768px) {
            .mobile-login-btn {
                display: flex;
            }

            .header-inner {
                flex-wrap: wrap;
                height: auto !important;
                min-height: 60px;
                padding-top: 8px !important;
                padding-bottom: 8px !important;
                position: relative;
            }

            .logo {
                flex: 1;
                justify-content: center;
            }

            /* 모바일 태그라인 */
            .header-tagline-mobile {
                display: block;
                width: 100%;
                text-align: center;
                font-size: 11px;
                color: rgba(255, 255, 255, 0.8);
                margin-top: 4px;
                order: 3;
            }
        }

        @media (max-width: 480px) {
            .mobile-login-btn {
                width: 40px;
                height: 40px;
                font-size: 16px;
                right: 10px;
            }

            .header-tagline-mobile {
                font-size: 10px;
            }
        }'''

    if '모바일 헤더 개선' not in content:
        # 실행 상태 카드 CSS 뒤에 추가
        marker = '/* 실행 상태 카드 - 모바일 2열 그리드 */'
        if marker in content:
            pos = content.find(marker)
            # 해당 블록 끝 찾기 (여러 개의 } 지나서)
            search_pos = pos
            for _ in range(10):  # 충분히 많은 } 찾기
                next_brace = content.find('}', search_pos + 1)
                if next_brace == -1:
                    break
                # @media 블록이 끝나는지 확인
                between = content[search_pos:next_brace]
                if '@media' not in between or search_pos == pos:
                    search_pos = next_brace
                else:
                    break

            # 마지막 @media 블록 끝을 찾음
            last_pos = pos
            while True:
                next_media = content.find('@media', last_pos + 1)
                if next_media == -1 or next_media > pos + 2000:
                    break
                last_pos = next_media

            # @media 블록 끝 찾기
            brace_count = 0
            end_pos = last_pos
            for i in range(last_pos, min(last_pos + 500, len(content))):
                if content[i] == '{':
                    brace_count += 1
                elif content[i] == '}':
                    brace_count -= 1
                    if brace_count == 0:
                        end_pos = i
                        break

            content = content[:end_pos+1] + mobile_header_css + content[end_pos+1:]
            changes.append("2. Mobile header CSS added")

    # 3. 모바일 태그라인 HTML 추가 (logo 다음에)
    old_logo_end = '''<h1>SSAL Works</h1>
                </div>
                <div class="header-center">'''

    new_logo_end = '''<h1>SSAL Works</h1>
                </div>
                <!-- 모바일 태그라인 -->
                <div class="header-tagline-mobile">AI 협업 웹개발 플랫폼</div>
                <div class="header-center">'''

    if 'header-tagline-mobile' not in content:
        content = content.replace(old_logo_end, new_logo_end)
        changes.append("3. Mobile tagline HTML added")

    # 파일 저장
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

    print("=== Mobile Header Update ===")
    for c in changes:
        print(f"  - {c}")
    if not changes:
        print("  No changes (already updated)")

if __name__ == '__main__':
    main()
