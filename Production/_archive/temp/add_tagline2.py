#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""모바일 태그라인 HTML 추가 v2"""

import os

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(os.path.dirname(os.path.dirname(os.path.dirname(script_dir))))

    file_path = 'Production/index.html'

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 정확한 패턴으로 교체
    old = '''                    <h1>SSAL Works</h1>
                </div>
                <div class="header-center">'''

    new = '''                    <h1>SSAL Works</h1>
                </div>
                <!-- 모바일 태그라인 -->
                <div class="header-tagline-mobile">AI 협업 웹개발 플랫폼</div>
                <div class="header-center">'''

    if 'header-tagline-mobile">AI' not in content:
        if old in content:
            content = content.replace(old, new)
            print("Mobile tagline HTML added")
        else:
            print("Pattern not found")
    else:
        print("Mobile tagline already exists")

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == '__main__':
    main()
