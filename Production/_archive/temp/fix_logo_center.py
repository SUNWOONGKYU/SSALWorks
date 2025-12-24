#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""로고 정중앙 배치 수정"""

import os

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(os.path.dirname(os.path.dirname(os.path.dirname(script_dir))))

    file_path = 'Production/index.html'

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    changes = []

    # 모바일에서 로고를 진정한 가운데로 배치
    # 기존: flex: 1; justify-content: center;
    # 수정: position: absolute; left: 50%; transform: translateX(-50%);

    old_logo_css = '''            .logo {
                flex: 1;
                justify-content: center;
            }'''

    new_logo_css = '''            .logo {
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                flex: none;
            }'''

    if old_logo_css in content:
        content = content.replace(old_logo_css, new_logo_css)
        changes.append("Logo: flex -> absolute center")

    # header-inner에 position: relative 확인 (이미 있을 수 있음)
    if 'position: relative;' not in content[content.find('.header-inner'):content.find('.header-inner')+500]:
        # header-inner에 position: relative 추가
        old_header_inner = '''            .header-inner {
                flex-wrap: wrap;
                height: auto !important;
                min-height: 60px;
                padding-top: 8px !important;
                padding-bottom: 8px !important;
                position: relative;
            }'''
        # 이미 position: relative가 있음, 확인 완료
        if old_header_inner in content:
            changes.append("header-inner already has position: relative")

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

    print("=== Logo Center Fix ===")
    for c in changes:
        print(f"  - {c}")
    if not changes:
        print("  - No changes made")

if __name__ == '__main__':
    main()
