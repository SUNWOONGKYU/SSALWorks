#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""모바일에서 viewer/manual 모바일 버전으로 리다이렉트"""

import os

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(os.path.dirname(os.path.dirname(os.path.dirname(script_dir))))

    file_path = 'Production/index.html'

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    changes = []

    # 1. openManual 함수 수정
    old_manual = '''        // 매뉴얼 보기
        function openManual() {
            // PROJECT SAL GRID 매뉴얼 뷰어 열기
            window.open('manual.html', '_blank');
        }'''

    new_manual = '''        // 매뉴얼 보기
        function openManual() {
            // 모바일이면 모바일 버전으로
            const isMobile = window.innerWidth <= 768;
            const url = isMobile ? 'manual_mobile.html' : 'manual.html';
            window.open(url, '_blank');
        }'''

    if old_manual in content:
        content = content.replace(old_manual, new_manual)
        changes.append("openManual: mobile redirect added")

    # 2. openViewer 함수 수정
    old_viewer = '''        // Viewer 열기
        function openViewer() {
            // viewer.html 페이지 열기 (S0_Project-SSAL-Grid_생성 폴더)
            window.open('viewer.html', '_blank');
        }'''

    new_viewer = '''        // Viewer 열기
        function openViewer() {
            // 모바일이면 모바일 버전으로
            const isMobile = window.innerWidth <= 768;
            const url = isMobile ? 'viewer_mobile.html' : 'viewer.html';
            window.open(url, '_blank');
        }'''

    if old_viewer in content:
        content = content.replace(old_viewer, new_viewer)
        changes.append("openViewer: mobile redirect added")

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

    print("=== Mobile Redirect Fix ===")
    for c in changes:
        print(f"  - {c}")

if __name__ == '__main__':
    main()
