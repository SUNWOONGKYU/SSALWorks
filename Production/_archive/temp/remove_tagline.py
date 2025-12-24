#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""모바일 태그라인 제거"""

import os

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(os.path.dirname(os.path.dirname(os.path.dirname(script_dir))))

    file_path = 'Production/index.html'

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. HTML 제거
    old_html = '''                </div>
                <!-- 모바일 태그라인 -->
                <div class="header-tagline-mobile">AI 협업 웹개발 플랫폼</div>
                <div class="header-center">'''

    new_html = '''                </div>
                <div class="header-center">'''

    if 'header-tagline-mobile">AI' in content:
        content = content.replace(old_html, new_html)
        print("1. Mobile tagline HTML removed")

    # 2. CSS도 제거 (선택사항 - 남겨둬도 무해)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

    print("Done")

if __name__ == '__main__':
    main()
