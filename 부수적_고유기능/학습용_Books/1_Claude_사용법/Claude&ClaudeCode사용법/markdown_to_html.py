import markdown2
from pathlib import Path
import webbrowser

# Markdown 파일 읽기
md_file = Path("1편_Claude란_무엇인가_수정.md")
html_file = Path("1편_Claude란_무엇인가_인쇄용.html")

with open(md_file, 'r', encoding='utf-8') as f:
    md_content = f.read()

# Markdown을 HTML로 변환
html_content = markdown2.markdown(md_content, extras=['tables', 'fenced-code-blocks'])

# 인쇄용 HTML 템플릿
html_template = f"""
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>1편 | Claude란 무엇인가? - AI 혁명의 최전선</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;700&family=Noto+Serif+KR:wght@400;700&display=swap');
        
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}
        
        body {{
            font-family: 'Noto Serif KR', serif;
            line-height: 1.8;
            color: #2c3e50;
            max-width: 210mm;
            margin: 0 auto;
            padding: 20mm;
            font-size: 11pt;
            background-color: white;
        }}
        
        h1 {{
            font-family: 'Noto Sans KR', sans-serif;
            color: #1a1a1a;
            font-size: 24pt;
            margin-top: 30pt;
            margin-bottom: 20pt;
            padding-bottom: 10pt;
            border-bottom: 3pt solid #3498db;
            page-break-after: avoid;
        }}
        
        h2 {{
            font-family: 'Noto Sans KR', sans-serif;
            color: #2c3e50;
            font-size: 18pt;
            margin-top: 24pt;
            margin-bottom: 12pt;
            page-break-after: avoid;
        }}
        
        h3 {{
            font-family: 'Noto Sans KR', sans-serif;
            color: #34495e;
            font-size: 14pt;
            margin-top: 18pt;
            margin-bottom: 10pt;
            page-break-after: avoid;
        }}
        
        p {{
            margin-bottom: 12pt;
            text-align: justify;
            text-indent: 0;
        }}
        
        blockquote {{
            margin: 15pt 0;
            padding: 12pt 15pt;
            border-left: 4pt solid #3498db;
            background-color: #f8f9fa;
            font-style: italic;
            page-break-inside: avoid;
        }}
        
        ul, ol {{
            margin-left: 20pt;
            margin-bottom: 12pt;
        }}
        
        li {{
            margin-bottom: 6pt;
        }}
        
        code {{
            font-family: 'Courier New', monospace;
            background-color: #f4f4f4;
            padding: 2pt 4pt;
            border-radius: 2pt;
            font-size: 10pt;
        }}
        
        pre {{
            background-color: #f8f9fa;
            border: 1pt solid #dee2e6;
            border-radius: 4pt;
            padding: 12pt;
            overflow-x: auto;
            font-size: 9pt;
            page-break-inside: avoid;
        }}
        
        strong {{
            font-weight: 700;
            color: #1a1a1a;
        }}
        
        em {{
            font-style: italic;
        }}
        
        hr {{
            border: none;
            border-top: 2pt solid #dee2e6;
            margin: 24pt 0;
            page-break-after: avoid;
        }}
        
        /* 인쇄 최적화 */
        @page {{
            size: A4;
            margin: 20mm;
        }}
        
        @media print {{
            body {{
                font-size: 11pt;
                color: black;
            }}
            
            h1 {{
                page-break-before: auto;
                page-break-after: avoid;
            }}
            
            h2, h3 {{
                page-break-after: avoid;
            }}
            
            p {{
                orphans: 3;
                widows: 3;
            }}
            
            blockquote, pre {{
                page-break-inside: avoid;
            }}
            
            .no-print {{
                display: none;
            }}
        }}
        
        /* 인쇄 안내 메시지 */
        .print-info {{
            position: fixed;
            top: 10px;
            right: 10px;
            background-color: #3498db;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            font-family: 'Noto Sans KR', sans-serif;
            font-size: 14px;
            cursor: pointer;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            z-index: 1000;
        }}
        
        .print-info:hover {{
            background-color: #2980b9;
        }}
        
        @media print {{
            .print-info {{
                display: none;
            }}
        }}
    </style>
</head>
<body>
    <div class="print-info no-print" onclick="window.print()">
        📄 PDF로 저장하기 (Ctrl+P)
    </div>
    {html_content}
    
    <script>
        // 페이지 로드 후 안내 메시지
        window.onload = function() {{
            console.log('PDF로 저장하려면:');
            console.log('1. Ctrl+P 또는 상단의 "PDF로 저장하기" 버튼 클릭');
            console.log('2. 대상: "PDF로 저장" 또는 "Microsoft Print to PDF" 선택');
            console.log('3. 저장 버튼 클릭');
        }};
    </script>
</body>
</html>
"""

# HTML 파일 생성
with open(html_file, 'w', encoding='utf-8') as f:
    f.write(html_template)

print(f"HTML 파일이 생성되었습니다: {html_file}")
print("\nPDF로 저장하는 방법:")
print("1. 생성된 HTML 파일을 브라우저에서 엽니다")
print("2. Ctrl+P 또는 '파일 > 인쇄'를 선택합니다")
print("3. 대상을 'PDF로 저장' 또는 'Microsoft Print to PDF'로 선택합니다")
print("4. '저장' 버튼을 클릭합니다")
print("\n브라우저에서 자동으로 열기...")

# 브라우저에서 자동으로 열기
import os
html_path = str(html_file.absolute())
os.startfile(html_path)