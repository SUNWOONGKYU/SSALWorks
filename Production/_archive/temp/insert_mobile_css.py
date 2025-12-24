#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Insert mobile responsive CSS into Production/index.html"""

import os

# CSS to insert
mobile_css = '''
        /* ========== 모바일 반응형 CSS (인라인) ========== */

        /* 모바일 메뉴 버튼 */
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
        }

        /* 사이드바 닫기 버튼 */
        .sidebar-close-btn {
            display: none;
            position: absolute;
            top: 12px;
            right: 12px;
            width: 36px;
            height: 36px;
            background: var(--bg-tertiary);
            border: 1px solid var(--border-color);
            border-radius: 50%;
            color: var(--text-secondary);
            font-size: 18px;
            cursor: pointer;
            align-items: center;
            justify-content: center;
            z-index: 10;
        }

        .sidebar-close-btn:hover {
            background: var(--danger);
            color: white;
        }

        /* FAB 컨테이너 */
        .fab-container {
            display: none;
            position: fixed !important;
            bottom: 20px;
            right: 20px;
            flex-direction: column;
            gap: 12px;
            z-index: 1000;
        }

        .fab-btn {
            width: 56px;
            height: 56px;
            border-radius: 50%;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.2s;
        }

        .fab-btn:hover { transform: scale(1.1); }
        .fab-btn.fab-menu { background: var(--primary); }
        .fab-btn.fab-info { background: var(--info); }

        /* Large Desktop: 1400px+ */
        @media (min-width: 1400px) {
            .layout-container { grid-template-columns: 280px 1fr 320px; }
        }

        /* Desktop: 1024-1399px */
        @media (max-width: 1399px) and (min-width: 1024px) {
            .layout-container { grid-template-columns: 240px 1fr 280px; }
            .header-tagline { font-size: 13px; }
            .logo h1 { font-size: 22px; }
        }

        /* Tablet Landscape: 769-1023px */
        @media (max-width: 1023px) and (min-width: 769px) {
            .layout-container { grid-template-columns: 220px 1fr; }
            .header-inner { padding: 0 16px; }
            .header-tagline { font-size: 12px; }
            .logo h1 { font-size: 20px; }

            .right-sidebar {
                position: fixed !important;
                right: -320px !important;
                top: 0;
                bottom: 0;
                width: 300px;
                z-index: 1001;
                background: #f8f9fa !important;
                box-shadow: -4px 0 20px rgba(0, 0, 0, 0.15);
                transition: right 0.3s ease;
                overflow-y: auto;
                padding-top: 20px;
            }

            .right-sidebar.open { right: 0 !important; }
            .right-sidebar .sidebar-close-btn { display: flex; }
            .fab-container { display: flex; }
            .fab-container .fab-menu { display: none; }

            .left-sidebar { padding: 12px 10px; }
            .workspace-header { padding: 12px 16px; }
            .workspace-title { font-size: 18px; }
            .action-btn { padding: 8px 12px; font-size: 12px; min-height: 44px; }
        }

        /* Tablet Portrait: 768px 이하 */
        @media (max-width: 768px) {
            .layout-container { display: grid !important; grid-template-columns: 1fr !important; grid-template-rows: 1fr !important; }
            .mobile-menu-btn { display: flex; }
            .header-inner { height: 60px; padding: 0 12px; }
            .header-center { display: none; }
            .header-right { display: none; }
            .logo h1 { font-size: 20px; }

            .left-sidebar {
                position: fixed !important;
                left: -320px !important;
                top: 0;
                bottom: 0;
                width: 300px;
                z-index: 1001;
                background: #f8f9fa !important;
                box-shadow: 4px 0 20px rgba(0, 0, 0, 0.15);
                transition: left 0.3s ease;
                overflow-y: auto;
                padding-top: 60px;
                -webkit-overflow-scrolling: touch;
                grid-column: unset !important;
                grid-row: unset !important;
            }

            .left-sidebar.open { left: 0 !important; }
            .left-sidebar .sidebar-close-btn { display: flex; top: 16px; }

            .right-sidebar {
                position: fixed !important;
                right: -320px !important;
                top: 0;
                bottom: 0;
                width: 300px;
                z-index: 1001;
                background: #f8f9fa !important;
                box-shadow: -4px 0 20px rgba(0, 0, 0, 0.15);
                transition: right 0.3s ease;
                overflow-y: auto;
                padding-top: 60px;
                -webkit-overflow-scrolling: touch;
                grid-column: unset !important;
                grid-row: unset !important;
            }

            .right-sidebar.open { right: 0 !important; }
            .right-sidebar .sidebar-close-btn { display: flex; top: 16px; }
            .fab-container { display: flex; }

            .center-workspace { grid-column: 1 !important; grid-row: 1 !important; min-height: calc(100vh - 60px - 50px); display: flex !important; width: 100% !important; overflow-y: auto !important; }
            .workspace-top { height: auto; min-height: 30vh; max-height: 50vh; }
            .workspace-header { flex-direction: column; gap: 12px; align-items: stretch; padding: 12px; }
            .workspace-actions { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; width: 100%; }
            .action-btn { min-height: 44px; padding: 10px 8px; font-size: 12px; justify-content: center; width: 100%; }

            .footer-inner { flex-direction: column; gap: 12px; padding: 12px 16px; }
            .footer-left, .footer-right { width: 100%; justify-content: center; flex-wrap: wrap; }
            .footer-btn { min-height: 44px; }
            .text-editor { min-height: 200px; }
            .translation-section { padding: 8px 10px; }
            .translation-title { font-size: 14px; }
        }

        /* Mobile: 480px 이하 */
        @media (max-width: 480px) {
            .header-inner { padding: 0 10px; height: 56px; }
            .logo { gap: 8px; }
            .logo h1 { font-size: 18px; }
            .rice-grain { width: 8px; height: 14px; }
            .mobile-menu-btn { width: 40px; height: 40px; font-size: 18px; }

            .left-sidebar, .right-sidebar { width: 280px; }
            .left-sidebar { left: -290px; }
            .right-sidebar { right: -290px; }

            .sidebar-title, .sidebar-section h3 { font-size: 13px; }
            .process-major, .process-prep, .process-special { padding: 10px 12px; min-height: 44px; }
            .process-name, .process-prep-name, .process-special-name { font-size: 12px; }

            .workspace-header { padding: 10px; }
            .workspace-title { font-size: 16px; }
            .workspace-actions { grid-template-columns: repeat(2, 1fr); gap: 6px; }
            .action-btn { padding: 8px 6px; font-size: 11px; min-height: 44px; }
            .workspace-content { padding: 8px; }
            .text-editor { min-height: 150px; padding: 10px; font-size: 13px; }

            .translation-section { padding: 6px 8px; }
            .translation-title { font-size: 13px; }
            .translation-preview { font-size: 12px; }

            .footer-inner { padding: 10px; }
            .footer-btn { padding: 10px 12px; font-size: 12px; min-height: 44px; }

            .knowledge-major, .knowledge-medium, .knowledge-small { padding: 10px 12px; min-height: 44px; }
            .knowledge-name { font-size: 12px; }
            .quick-link-btn { padding: 12px; min-height: 44px; }
            .project-list-item { padding: 10px 12px; min-height: 44px; }
            .project-name { font-size: 12px; }
            .project-status { font-size: 10px; padding: 3px 6px; }

            .fab-btn { width: 52px; height: 52px; font-size: 18px; }

            .outbox-notification { top: auto; right: 10px; left: 10px; bottom: 80px; }
            .outbox-notification-content { min-width: auto; padding: 12px; }
            .outbox-notification-icon { font-size: 20px; }
            .outbox-notification-title { font-size: 13px; }
            .outbox-notification-message { font-size: 12px; }
        }

        /* Touch-friendly */
        @media (hover: none) and (pointer: coarse) {
            .process-major, .process-small, .process-tiny, .process-prep, .process-special,
            .knowledge-major, .knowledge-medium, .knowledge-small,
            .quick-link-btn, .project-menu-item, .project-list-item {
                min-height: 44px;
                display: flex;
                align-items: center;
            }
            .action-btn, .header-btn, .footer-btn, .mobile-menu-btn, .sidebar-close-btn, .fab-btn { min-height: 44px; }
            .left-sidebar, .right-sidebar, .workspace-content { -webkit-overflow-scrolling: touch; }
        }

        /* 텍스트 오버플로우 - 모바일 */
        .process-name, .process-prep-name, .process-special-name,
        .knowledge-name, .project-name, .notice-title {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .workspace-title {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: 100%;
        }

        /* Print styles */
        @media print {
            .header, .footer, .left-sidebar, .right-sidebar, .fab-container, .sidebar-overlay, .mobile-menu-btn { display: none !important; }
            .layout-container { display: block; }
            .center-workspace { width: 100%; }
        }

'''

def main():
    # Change to script directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(os.path.dirname(os.path.dirname(os.path.dirname(script_dir))))

    file_path = 'Production/index.html'

    # Read the file
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Check if CSS already exists
    if '모바일 반응형 CSS (인라인)' in content:
        print("CSS already exists in file - skipping")
        return

    # Find the pattern: .notice-date { ... } followed by </style>
    # Replace the first </style> after .notice-date with CSS + </style>

    lines = content.split('\n')
    found_notice_date = False
    inserted = False

    for i, line in enumerate(lines):
        if '.notice-date' in line:
            found_notice_date = True

        if found_notice_date and '    </style>' in line and not inserted:
            # Found the first </style> after .notice-date
            lines[i] = mobile_css + '\n    </style>'
            inserted = True
            break

    if not inserted:
        print("ERROR: Could not find insertion point")
        return

    new_content = '\n'.join(lines)

    # Write back
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

    # Verify
    with open(file_path, 'r', encoding='utf-8') as f:
        final_content = f.read()

    line_count = final_content.count('\n') + 1
    css_count = final_content.count('모바일 반응형 CSS')
    mobile_btn_count = final_content.count('.mobile-menu-btn')

    print(f"SUCCESS: CSS inserted")
    print(f"  - Total lines: {line_count}")
    print(f"  - '모바일 반응형 CSS' occurrences: {css_count}")
    print(f"  - '.mobile-menu-btn' occurrences: {mobile_btn_count}")

if __name__ == '__main__':
    main()
