#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""모바일에서 English Translation 숨기기"""

import os

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(os.path.dirname(os.path.dirname(os.path.dirname(script_dir))))

    file_path = 'Production/index.html'

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    changes = []

    # 기존 모바일 CSS에서 translation-section 찾기
    # @media (max-width: 768px) 안에 display: none 추가

    old_translation_mobile = '''            .translation-section { padding: 8px 10px; }
            .translation-title { font-size: 14px; }'''

    new_translation_mobile = '''            /* English Translation - 모바일에서 숨김 (PC Order Sheet 작성용) */
            .translation-section { display: none !important; }'''

    if old_translation_mobile in content:
        content = content.replace(old_translation_mobile, new_translation_mobile)
        changes.append("768px: translation-section hidden")

    # 480px에서도 숨기기
    old_480 = '''            .translation-section { padding: 6px 8px; }
            .translation-title { font-size: 13px; }
            .translation-preview { font-size: 12px; }'''

    new_480 = '''            /* English Translation - 모바일에서 숨김 */
            .translation-section { display: none !important; }'''

    if old_480 in content:
        content = content.replace(old_480, new_480)
        changes.append("480px: translation-section hidden")

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

    print("=== English Translation Mobile Hide ===")
    for c in changes:
        print(f"  - {c}")

if __name__ == '__main__':
    main()
