#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""모바일 UI 개선: 버튼 색상, FAB, 푸터"""

import os
import re

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(os.path.dirname(os.path.dirname(os.path.dirname(script_dir))))

    file_path = 'Production/index.html'

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    changes = []

    # 1. 모바일 메뉴 버튼 - 초록색으로 변경
    old_mobile_btn = '''        /* 모바일 메뉴 버튼 */
        .mobile-menu-btn {
            display: none;
            width: 44px;
            height: 44px;
            background: rgba(255, 255, 255, 0.15);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 8px;
            color: white;
            font-size: 20px;
            cursor: pointer;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
        }

        .mobile-menu-btn:hover {
            background: rgba(255, 255, 255, 0.25);
        }'''

    new_mobile_btn = '''        /* 모바일 메뉴 버튼 - 좌측 상단 (초록색) */
        .mobile-menu-btn {
            display: none;
            width: 44px;
            height: 44px;
            background: var(--primary);
            border: none;
            border-radius: 8px;
            color: white;
            font-size: 20px;
            cursor: pointer;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
            box-shadow: 0 2px 8px rgba(16, 185, 129, 0.4);
        }

        .mobile-menu-btn:hover {
            background: var(--primary-dark);
            transform: scale(1.05);
        }'''

    if old_mobile_btn in content:
        content = content.replace(old_mobile_btn, new_mobile_btn)
        changes.append("1. Mobile menu button - green color")

    # 2. FAB 버튼 색상 변경 - fab-info를 앰버/골드로
    old_fab = '''        .fab-btn:hover { transform: scale(1.1); }
        .fab-btn.fab-menu { background: var(--primary); }
        .fab-btn.fab-info { background: var(--info); }'''

    new_fab = '''        .fab-btn:hover { transform: scale(1.1); }
        .fab-btn.fab-menu { background: var(--primary); display: none; }
        .fab-btn.fab-info { background: var(--secondary); box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4); }'''

    if old_fab in content:
        content = content.replace(old_fab, new_fab)
        changes.append("2. FAB button - amber/gold color")

    # 3. FAB HTML 수정 - 우측 사이드바 버튼만 남기고 아이콘 변경
    old_fab_html = '''    <div class="fab-container">
        <button class="fab-btn fab-menu" onclick="toggleLeftSidebar()">☰</button>
        <button class="fab-btn fab-info" onclick="toggleRightSidebar()">ℹ</button>
    </div>'''

    new_fab_html = '''    <!-- FAB 버튼 - 우측 하단 (앰버/골드, 우측 사이드바 전용) -->
    <div class="fab-container">
        <button class="fab-btn fab-info" onclick="toggleRightSidebar()" title="우측 정보 패널">▶</button>
    </div>'''

    count = content.count(old_fab_html)
    if count > 0:
        content = content.replace(old_fab_html, new_fab_html)
        changes.append(f"3. FAB HTML - {count} locations")

    # 4. 푸터 메타데이터 모바일 스타일 추가
    footer_mobile_css = '''

        /* 푸터 메타데이터 모바일 스타일 */
        .footer-business {
            text-align: center;
        }

        @media (max-width: 768px) {
            .footer-business span {
                display: block;
                line-height: 1.8;
            }
        }

        @media (max-width: 480px) {
            .footer-business {
                font-size: 11px !important;
            }
        }'''

    if 'footer-business span' not in content or '.footer-business span {\n                display: block' not in content:
        # footer-link 모바일 스타일 뒤에 추가
        marker = '.footer-link { min-height: 44px; display: flex; align-items: center; }'
        if marker in content:
            content = content.replace(marker, marker + footer_mobile_css)
            changes.append("4. Footer mobile style added")

    # 5. 푸터 HTML 수정 - 메타데이터를 두 줄로 분리
    old_footer_meta = '<span>파인더월드 | 대표: 선웅규 | 사업자등록번호: 354-33-01641 | 서울특별시 강남구 테헤란로63길 9</span>'
    new_footer_meta = '''<span class="footer-company-info">파인더월드 | 대표: 선웅규 | 사업자등록번호: 354-33-01641</span>
                    <span class="footer-address">서울특별시 강남구 테헤란로63길 9</span>'''

    if old_footer_meta in content:
        content = content.replace(old_footer_meta, new_footer_meta)
        changes.append("5. Footer metadata - two lines")

    # 파일 저장
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

    print("=== Mobile UI Update Complete ===")
    for c in changes:
        print(f"  - {c}")
    if not changes:
        print("  No changes made (already updated)")

if __name__ == '__main__':
    main()
