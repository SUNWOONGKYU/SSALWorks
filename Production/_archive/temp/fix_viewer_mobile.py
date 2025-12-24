#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""viewer.html 모바일 최적화"""

import os

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(os.path.dirname(os.path.dirname(os.path.dirname(script_dir))))

    file_path = 'Production/viewer.html'

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    changes = []

    # 1. 기존 @media (max-width: 768px) 찾아서 확장
    old_media = '''        @media (max-width: 768px) {
            .area-content { grid-template-columns: 1fr; }
            .attr-row { grid-template-columns: 1fr; }
            .stage-tabs { flex-wrap: wrap; }
        }'''

    new_media = '''        /* 모바일 반응형 개선 */
        @media (max-width: 768px) {
            /* Header */
            header h1 { font-size: 1.2em; padding: 0 60px; }
            header p { font-size: 0.8em; }
            .close-btn { padding: 4px 10px; font-size: 11px; }

            /* View Switch */
            .view-switch button { padding: 8px 16px; font-size: 0.9em; }

            /* Toolbar - 세로 배치 */
            .toolbar {
                flex-direction: column;
                gap: 12px;
                padding: 12px;
            }
            .search-box input {
                min-width: 100%;
                width: 100%;
            }

            /* Filter Buttons - 가로 스크롤 */
            .toolbar > div[style*="display: flex"] {
                width: 100%;
                overflow-x: auto;
                -webkit-overflow-scrolling: touch;
            }
            .toolbar > div > div[style*="display: flex"] {
                flex-wrap: nowrap;
                min-width: max-content;
            }
            .filter-btn {
                padding: 8px 12px;
                font-size: 0.85em;
                white-space: nowrap;
            }

            /* Stats Bar - 세로 배치 */
            .stats-bar {
                flex-direction: column;
                gap: 12px;
                padding: 12px;
            }
            .stats-bar > div > div[style*="border-right"] {
                border-right: none !important;
                padding-right: 0 !important;
                border-bottom: 1px solid #dee2e6;
                padding-bottom: 12px;
            }
            .stats-bar > div > div > div[style*="display: flex"] {
                flex-wrap: wrap;
                gap: 8px;
            }

            /* Stage Tabs - 스크롤 */
            .stage-tabs {
                flex-wrap: nowrap;
                overflow-x: auto;
                -webkit-overflow-scrolling: touch;
                padding-bottom: 8px;
            }
            .stage-tab {
                padding: 10px 14px;
                font-size: 0.85em;
            }

            /* Task Cards */
            .area-content { grid-template-columns: 1fr; }
            .attr-row { grid-template-columns: 1fr; }
            .task-card { padding: 15px; }
            .task-id { font-size: 1.1em; }
            .task-title { font-size: 1em; }

            /* Action Buttons */
            .action-buttons { flex-direction: column; }
            .action-btn { padding: 12px; }

            /* Stage Gate Panel */
            #stageGatePanel > div[style*="display: flex"] {
                flex-direction: column;
            }

            /* 3D View */
            #info-3d {
                max-width: 200px;
                padding: 12px;
                font-size: 0.85em;
            }
            .controls-3d { top: 10px; right: 10px; }
            .btn-3d { padding: 8px 12px; font-size: 0.85em; }
            .legend-3d {
                top: auto;
                bottom: 10px;
                right: 10px;
                font-size: 0.8em;
            }
        }

        @media (max-width: 480px) {
            header h1 { font-size: 1em; }
            .view-switch button { padding: 6px 12px; font-size: 0.8em; }
            .filter-btn { padding: 6px 10px; font-size: 0.8em; }
            .stage-tab { padding: 8px 10px; font-size: 0.8em; }
        }'''

    if old_media in content:
        content = content.replace(old_media, new_media)
        changes.append("Extended mobile media queries")
    else:
        # 없으면 </style> 앞에 추가
        content = content.replace('    </style>', new_media + '\n    </style>')
        changes.append("Added mobile media queries")

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

    print("=== viewer.html Mobile Fix Complete ===")
    for c in changes:
        print(f"  - {c}")

if __name__ == '__main__':
    main()
