#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""manual.html 모바일 최적화"""

import os

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(os.path.dirname(os.path.dirname(os.path.dirname(script_dir))))

    file_path = 'Production/manual.html'

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    changes = []

    # 1. 기존 모바일 CSS 확장 - @media (max-width: 768px) 찾아서 교체
    old_mobile_css = '''        @media (max-width: 768px) {
            .sidebar {
                display: none;
            }
            .main-content {
                margin-left: 0;
                padding: 20px;
            }
        }'''

    new_mobile_css = '''        /* 모바일 햄버거 메뉴 버튼 */
        .mobile-menu-btn {
            display: none;
            width: 40px;
            height: 40px;
            background: rgba(255, 255, 255, 0.15);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 8px;
            color: white;
            font-size: 18px;
            cursor: pointer;
            transition: all 0.2s;
            flex-shrink: 0;
        }
        .mobile-menu-btn:hover {
            background: rgba(255, 255, 255, 0.25);
        }

        /* 사이드바 오버레이 */
        .sidebar-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 999;
        }
        .sidebar-overlay.active {
            display: block;
        }

        @media (max-width: 768px) {
            /* 헤더 */
            .header {
                padding: 12px 16px;
            }
            .header-title {
                font-size: 16px;
            }
            #headerMeta {
                display: none;
            }
            .close-btn {
                padding: 4px 10px;
                font-size: 11px;
            }

            /* 햄버거 버튼 표시 */
            .mobile-menu-btn {
                display: flex;
                align-items: center;
                justify-content: center;
            }

            /* 사이드바 - 슬라이드 인/아웃 */
            .sidebar {
                display: block;
                transform: translateX(-100%);
                transition: transform 0.3s ease;
                z-index: 1001;
                width: 280px;
            }
            .sidebar.open {
                transform: translateX(0);
            }

            /* 컨테이너 */
            .container {
                margin-top: 60px;
            }

            /* 메인 콘텐츠 */
            .main-content {
                margin-left: 0;
                padding: 16px;
            }

            /* 마크다운 스타일 조정 */
            .markdown-body h1 { font-size: 16px; }
            .markdown-body h2 { font-size: 14px; }
            .markdown-body h3 { font-size: 13px; }
            .markdown-body p, .markdown-body li { font-size: 12px; }
            .markdown-body pre { font-size: 11px; padding: 10px; }
            .markdown-body table { font-size: 11px; }
            .markdown-body th, .markdown-body td { padding: 4px 6px; }
        }

        @media (max-width: 480px) {
            .header-title { font-size: 14px; }
            .markdown-body h1 { font-size: 15px; }
            .markdown-body h2 { font-size: 13px; }
        }'''

    if old_mobile_css in content:
        content = content.replace(old_mobile_css, new_mobile_css)
        changes.append("Replaced mobile CSS with enhanced version")

    # 2. toggleSidebar 함수 추가 (</body> 앞에)
    sidebar_script = '''
    <script>
    // 모바일 사이드바 토글
    function toggleSidebar() {
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.querySelector('.sidebar-overlay');
        if (sidebar) {
            sidebar.classList.toggle('open');
        }
        if (overlay) {
            overlay.classList.toggle('active');
        }
    }

    function closeSidebar() {
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.querySelector('.sidebar-overlay');
        if (sidebar) {
            sidebar.classList.remove('open');
        }
        if (overlay) {
            overlay.classList.remove('active');
        }
    }

    // ESC 키로 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeSidebar();
        }
    });

    // 목차 링크 클릭 시 모바일에서 사이드바 닫기
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('toc-link')) {
            if (window.innerWidth <= 768) {
                closeSidebar();
            }
        }
    });
    </script>
'''

    if 'function toggleSidebar()' not in content:
        content = content.replace('</body>', sidebar_script + '</body>')
        changes.append("Added toggleSidebar/closeSidebar functions")

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

    print("=== manual.html Mobile Fix Complete ===")
    for c in changes:
        print(f"  - {c}")

if __name__ == '__main__':
    main()
