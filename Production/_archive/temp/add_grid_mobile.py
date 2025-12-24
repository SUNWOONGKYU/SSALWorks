#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""실행 상태 카드를 모바일에서 2열 그리드로 변경"""

import os

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(os.path.dirname(os.path.dirname(os.path.dirname(script_dir))))

    file_path = 'Production/index.html'

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 모바일 CSS 추가 - stats-bar 2열 그리드
    stats_mobile_css = '''
        /* 실행 상태 카드 - 모바일 2열 그리드 */
        @media (max-width: 768px) {
            .stats-bar {
                display: grid !important;
                grid-template-columns: repeat(2, 1fr);
                gap: 8px;
                padding: 10px;
            }
            .stats-bar > div:first-child {
                grid-column: 1 / -1;
                text-align: center;
                margin-bottom: 4px;
            }
            .stat-item {
                padding: 8px;
            }
            .stat-label {
                font-size: 10px;
            }
            .stat-value {
                font-size: 16px;
            }
            /* 5번째 아이템 (Fixing)은 전체 너비 */
            .stats-bar > .stat-item:nth-child(6) {
                grid-column: 1 / -1;
            }
        }

        @media (max-width: 480px) {
            .stats-bar {
                gap: 6px;
                padding: 8px;
            }
            .stat-item {
                padding: 6px;
            }
            .stat-label {
                font-size: 9px;
            }
            .stat-value {
                font-size: 14px;
            }
        }'''

    # footer-business 스타일 뒤에 추가
    marker = '/* 푸터 메타데이터 모바일 스타일 */'

    if '실행 상태 카드 - 모바일 2열 그리드' not in content:
        if marker in content:
            # marker 블록 끝을 찾아서 그 뒤에 추가
            pos = content.find(marker)
            # 해당 @media 블록들 끝을 찾음
            search_start = pos
            last_brace = pos
            for _ in range(3):  # 3개의 } 찾기
                last_brace = content.find('}', last_brace + 1)

            content = content[:last_brace+1] + stats_mobile_css + content[last_brace+1:]
            print("Stats bar mobile grid CSS added")
        else:
            print("Marker not found, trying alternative...")
            # 대안: .footer-link 모바일 스타일 뒤에 추가
            alt_marker = '.footer-link { min-height: 44px;'
            if alt_marker in content:
                pos = content.find(alt_marker)
                end_pos = content.find('}', pos)
                content = content[:end_pos+1] + stats_mobile_css + content[end_pos+1:]
                print("Stats bar mobile grid CSS added (alternative location)")
    else:
        print("Stats bar mobile CSS already exists")

    # 파일 저장
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

    print("=== Complete ===")

if __name__ == '__main__':
    main()
