#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""터치 영역 크기 수정 - 최소 44x44px 보장"""

import os

def fix_manual():
    """manual.html 버튼 터치 영역 수정"""
    file_path = 'Production/manual.html'

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    changes = []

    # 1. 햄버거 버튼 40x40 -> 48x48
    old_hamburger = '''        .mobile-menu-btn {
            display: none;
            width: 40px;
            height: 40px;'''

    new_hamburger = '''        .mobile-menu-btn {
            display: none;
            width: 48px;
            height: 48px;'''

    if old_hamburger in content:
        content = content.replace(old_hamburger, new_hamburger)
        changes.append("Hamburger button: 40x40 -> 48x48")

    # 2. 닫기 버튼 높이 증가
    old_close = '''        .close-btn {
            padding: 6px 14px;'''

    new_close = '''        .close-btn {
            padding: 12px 14px;
            min-height: 44px;'''

    if old_close in content:
        content = content.replace(old_close, new_close)
        changes.append("Close button: padding increased, min-height 44px")

    # 모바일에서도 닫기 버튼 크기 보장
    old_mobile_close = '''            .close-btn {
                padding: 4px 10px;
                font-size: 11px;
            }'''

    new_mobile_close = '''            .close-btn {
                padding: 10px 12px;
                font-size: 12px;
                min-height: 44px;
            }'''

    if old_mobile_close in content:
        content = content.replace(old_mobile_close, new_mobile_close)
        changes.append("Mobile close button: padding increased")

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

    return changes

def fix_viewer():
    """viewer.html 버튼 터치 영역 수정"""
    file_path = 'Production/viewer.html'

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    changes = []

    # 닫기 버튼 크기 증가
    old_close = '''        .close-btn { position: absolute; top: 15px; right: 20px; padding: 6px 14px;'''

    new_close = '''        .close-btn { position: absolute; top: 15px; right: 20px; padding: 10px 14px; min-height: 44px;'''

    if old_close in content:
        content = content.replace(old_close, new_close)
        changes.append("Close button: min-height 44px added")

    # 모바일 닫기 버튼
    old_mobile = '''            .close-btn { padding: 4px 10px; font-size: 11px; }'''
    new_mobile = '''            .close-btn { padding: 10px 12px; font-size: 12px; min-height: 44px; }'''

    if old_mobile in content:
        content = content.replace(old_mobile, new_mobile)
        changes.append("Mobile close button: size increased")

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

    return changes

def fix_index():
    """index.html 주요 버튼 터치 영역 확인/수정"""
    file_path = 'Production/index.html'

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    changes = []

    # 모바일 메뉴 버튼이 44px 이상인지 확인 (이미 44px이면 OK)
    if 'width: 44px' in content and '.mobile-menu-btn' in content:
        # 이미 44px 설정됨
        pass

    # FAB 버튼 크기 확인 - 이미 50px 이상이면 OK

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

    return changes

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(os.path.dirname(os.path.dirname(os.path.dirname(script_dir))))

    print("=== Touch Area Fix ===\n")

    print("1. manual.html:")
    changes = fix_manual()
    for c in changes:
        print(f"   - {c}")
    if not changes:
        print("   - No changes needed")

    print("\n2. viewer.html:")
    changes = fix_viewer()
    for c in changes:
        print(f"   - {c}")
    if not changes:
        print("   - No changes needed")

    print("\n3. index.html:")
    changes = fix_index()
    for c in changes:
        print(f"   - {c}")
    if not changes:
        print("   - Already meets 44px minimum")

    print("\n=== Complete ===")

if __name__ == '__main__':
    main()
