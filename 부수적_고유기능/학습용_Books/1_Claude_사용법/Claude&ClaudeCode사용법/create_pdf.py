import markdown2
from weasyprint import HTML, CSS
import os

# Read markdown file
with open('1편_Claude란_무엇인가.md', 'r', encoding='utf-8') as f:
    md_content = f.read()

# Convert to HTML
html_content = markdown2.markdown(md_content, extras=['tables', 'fenced-code-blocks'])

# Create styled HTML
html_template = """<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <style>
        @page {
            size: A4;
            margin: 2.5cm;
        }
        body {
            font-family: 'Malgun Gothic', sans-serif;
            line-height: 1.8;
            color: #333;
        }
        h1 {
            color: #2c3e50;
            border-bottom: 3px solid #3498db;
            padding-bottom: 10px;
            page-break-before: always;
        }
        h1:first-of-type {
            page-break-before: avoid;
        }
        h2 {
            color: #34495e;
            margin-top: 30px;
            border-left: 4px solid #3498db;
            padding-left: 10px;
        }
        h3 {
            color: #555;
            margin-top: 20px;
        }
        p {
            text-align: justify;
            margin: 12px 0;
        }
        ul, ol {
            margin: 15px 0;
            padding-left: 25px;
        }
        li {
            margin: 8px 0;
        }
        strong {
            font-weight: bold;
            color: #2c3e50;
        }
        code {
            background: #f4f4f4;
            padding: 2px 5px;
            border-radius: 3px;
        }
    </style>
</head>
<body>
    """ + html_content + """
</body>
</html>"""

# Generate PDF
output_pdf = '1편_Claude란_무엇인가.pdf'
HTML(string=html_template).write_pdf(output_pdf)

print(f"PDF created: {output_pdf}")
print(f"File size: {os.path.getsize(output_pdf):,} bytes")