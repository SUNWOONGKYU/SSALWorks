#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""아이콘 변경: 햄버거와 FAB 둘 다 삼선(≡)으로 통일"""

import os

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(os.path.dirname(os.path.dirname(os.path.dirname(script_dir))))

    file_path = 'Production/index.html'

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    changes = []

    # 1. 좌측 상단 햄버거 버튼: ☰ → ≡
    old_hamburger = '>☰</button>'
    new_hamburger = '>≡</button>'

    count1 = content.count(old_hamburger)
    if count1 > 0:
        content = content.replace(old_hamburger, new_hamburger)
        changes.append(f"Hamburger icon: {count1} locations")

    # 2. FAB 버튼: ▶ → ≡
    old_fab = '>▶</button>'
    new_fab = '>≡</button>'

    count2 = content.count(old_fab)
    if count2 > 0:
        content = content.replace(old_fab, new_fab)
        changes.append(f"FAB icon: {count2} locations")

    # 파일 저장
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

    print("=== Icon Change Complete ===")
    for c in changes:
        print(f"  - {c}")

    print("")
    print("Result:")
    print("  - Left sidebar button: Green + ≡")
    print("  - Right sidebar FAB: Amber/Gold + ≡")

if __name__ == '__main__':
    main()
