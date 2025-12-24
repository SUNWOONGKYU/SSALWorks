#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""CSS 오류 수정"""

import os

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(os.path.dirname(os.path.dirname(os.path.dirname(script_dir))))

    file_path = 'Production/index.html'

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    changes = []

    # 1. 불완전한 @media 수정
    if '}media (max-width: 480px)' in content:
        content = content.replace('}media (max-width: 480px)', '}\n\n        @media (max-width: 480px)')
        changes.append("Fixed incomplete @media")

    # 2. 태그라인 기본 display: none 추가
    old_tagline_css = '''            /* 모바일 태그라인 */
            .header-tagline-mobile {
                display: block;'''

    new_tagline_css = '''            /* 모바일 태그라인 */
            .header-tagline-mobile {
                display: block !important;'''

    if old_tagline_css in content:
        content = content.replace(old_tagline_css, new_tagline_css)
        changes.append("Added !important to tagline display")

    # 3. 태그라인 기본 숨김 추가 (모바일 CSS 외부에)
    tagline_hide = '''
        /* 태그라인 - 기본 숨김, 모바일에서만 표시 */
        .header-tagline-mobile {
            display: none;
        }'''

    if '.header-tagline-mobile {\n            display: none;' not in content:
        # mobile-login-btn 기본 스타일 앞에 추가
        marker = '        /* 모바일 헤더 개선 */'
        if marker in content:
            content = content.replace(marker, tagline_hide + '\n\n' + marker)
            changes.append("Added tagline default hide")

    # 4. 불완전한 @ 기호 수정 (라인 2552 근처)
    if '        /* Mobile: 480px 이하 */\n        @\n' in content:
        content = content.replace('        /* Mobile: 480px 이하 */\n        @\n', '')
        changes.append("Removed incomplete @ symbol")

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

    print("=== CSS Fix Complete ===")
    for c in changes:
        print(f"  - {c}")

if __name__ == '__main__':
    main()
