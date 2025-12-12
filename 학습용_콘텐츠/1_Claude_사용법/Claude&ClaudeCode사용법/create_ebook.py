import os
import subprocess

# Simple approach: Use pandoc if available, otherwise create enhanced HTML
md_file = '1편_Claude란_무엇인가.md'
html_file = '1편_Claude란_무엇인가_ebook.html'

# Read markdown
with open(md_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Create enhanced HTML ebook with better styling
html_template = """<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Claude와 Claude Code의 이해 및 활용법</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif;
            line-height: 1.8;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
            min-height: 100vh;
        }
        
        .book-container {
            max-width: 900px;
            margin: 0 auto;
            background: white;
            border-radius: 10px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            overflow: hidden;
        }
        
        .book-header {
            background: linear-gradient(135deg, #3498db 0%, #2c3e50 100%);
            color: white;
            padding: 60px 40px;
            text-align: center;
        }
        
        .book-title {
            font-size: 3em;
            margin-bottom: 20px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        .book-subtitle {
            font-size: 1.3em;
            opacity: 0.9;
        }
        
        .book-content {
            padding: 60px;
        }
        
        h1 {
            color: #2c3e50;
            font-size: 2.2em;
            margin: 40px 0 20px;
            padding-bottom: 10px;
            border-bottom: 3px solid #3498db;
        }
        
        h2 {
            color: #34495e;
            font-size: 1.8em;
            margin: 35px 0 15px;
            padding-left: 15px;
            border-left: 4px solid #3498db;
        }
        
        h3 {
            color: #555;
            font-size: 1.4em;
            margin: 25px 0 10px;
            background: #f8f9fa;
            padding: 10px 15px;
            border-radius: 5px;
        }
        
        p {
            margin: 15px 0;
            text-align: justify;
        }
        
        ul, ol {
            margin: 20px 0;
            padding-left: 30px;
        }
        
        li {
            margin: 10px 0;
            line-height: 1.6;
        }
        
        strong {
            color: #2c3e50;
            font-weight: 600;
        }
        
        .price-tag {
            background: #e8f4f8;
            padding: 8px 12px;
            border-radius: 5px;
            display: inline-block;
            margin: 5px 0;
            font-weight: bold;
        }
        
        .warning-box {
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin: 20px 0;
            border-radius: 5px;
        }
        
        .info-box {
            background: #d1ecf1;
            border-left: 4px solid #17a2b8;
            padding: 15px;
            margin: 20px 0;
            border-radius: 5px;
        }
        
        .footer {
            background: #f8f9fa;
            padding: 30px;
            text-align: center;
            color: #666;
            border-top: 2px solid #dee2e6;
        }
        
        @media print {
            body {
                background: white;
                padding: 0;
            }
            .book-container {
                box-shadow: none;
                border-radius: 0;
            }
            .book-header {
                page-break-after: always;
            }
            h1 {
                page-break-before: auto;
                page-break-after: avoid;
            }
        }
        
        /* Special formatting for specific sections */
        h3:contains("$") {
            background: #e8f5e9;
            border-left: 3px solid #4caf50;
        }
        
        h3:contains("⚠️"), h3:contains("⏰"), h3:contains("🔒"), h3:contains("🌐") {
            background: #fff3cd;
            padding: 12px 15px;
        }
    </style>
</head>
<body>
    <div class="book-container">
        <div class="book-header">
            <h1 class="book-title">Claude와 Claude Code의 이해 및 활용법</h1>
            <p class="book-subtitle">제1부 기초지식 - 1편 | Claude란 무엇인가?</p>
        </div>
        <div class="book-content">
"""

# Convert markdown to HTML manually (basic conversion)
import re

# Remove the first two headers (book title and chapter title) to avoid duplication
lines = content.split('\n')
# Skip the first lines that contain the book and chapter titles
content_without_titles = '\n'.join(lines[5:])  # Skip first 5 lines (title, blank, subtitle, blank, ---)

# Convert headers
content_html = content_without_titles
content_html = re.sub(r'^### (.+)$', r'<h2>\1</h2>', content_html, flags=re.MULTILINE)
content_html = re.sub(r'^#### (.+)$', r'<h3>\1</h3>', content_html, flags=re.MULTILINE)

# Convert bold
content_html = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', content_html)

# Convert lists
lines = content_html.split('\n')
new_lines = []
in_ul = False

for line in lines:
    if line.strip().startswith('- '):
        if not in_ul:
            new_lines.append('<ul>')
            in_ul = True
        new_lines.append(f'<li>{line.strip()[2:]}</li>')
    else:
        if in_ul and not line.strip().startswith('- '):
            new_lines.append('</ul>')
            in_ul = False
        # Convert paragraphs
        if line.strip() and not line.strip().startswith('<'):
            new_lines.append(f'<p>{line.strip()}</p>')
        else:
            new_lines.append(line)

if in_ul:
    new_lines.append('</ul>')

content_html = '\n'.join(new_lines)

# Add special formatting for price sections
content_html = re.sub(r'\$(\d+)', r'<span class="price-tag">$\1</span>', content_html)

# Complete HTML
html_complete = html_template + content_html + """
        </div>
        <div class="footer">
            <p><strong>글자수: 6,910자</strong></p>
            <p>작성자: Claude | 프롬프터: 써니</p>
        </div>
    </div>
</body>
</html>"""

# Save enhanced HTML ebook
with open(html_file, 'w', encoding='utf-8') as f:
    f.write(html_complete)

print(f"Enhanced HTML ebook created: {html_file}")
print(f"File size: {os.path.getsize(html_file):,} bytes")
print("\nThis file can be:")
print("- Opened in any web browser")
print("- Printed to PDF using browser's print function (Ctrl+P)")
print("- Converted to EPUB using online converters")