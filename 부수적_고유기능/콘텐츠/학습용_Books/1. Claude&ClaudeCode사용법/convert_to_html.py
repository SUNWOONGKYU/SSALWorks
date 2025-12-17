
이미지  impo3번 ㅅ4
 ㅁrt markdown2
import os

# Read markdown file
with open('1편_Claude란_무엇인가.md', 'r', encoding='utf-8') as f:
    md_content = f.read()

# Convert to HTML with extras
html_content = markdown2.markdown(md_content, extras=['tables', 'fenced-code-blocks', 'header-ids'])

# Create full HTML document with Korean font support and styling
html_template = """<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Claude란 무엇인가?</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;700&display=swap');
        
        body {
            font-family: 'Noto Sans KR', sans-serif;
            line-height: 1.8;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
            background: #f5f5f5;
        }
        
        .container {
            background: white;
            padding: 60px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        h1 {
            color: #2c3e50;
            border-bottom: 3px solid #3498db;
            padding-bottom: 15px;
            margin-bottom: 30px;
            font-size: 2.5em;
        }
        
        h2 {
            color: #34495e;
            margin-top: 40px;
            margin-bottom: 20px;
            font-size: 1.8em;
            border-left: 4px solid #3498db;
            padding-left: 15px;
        }
        
        h3 {
            color: #555;
            margin-top: 30px;
            font-size: 1.4em;
        }
        
        p {
            text-align: justify;
            margin: 15px 0;
            color: #444;
        }
        
        strong {
            color: #2c3e50;
            font-weight: 700;
        }
        
        ul, ol {
            margin: 20px 0;
            padding-left: 30px;
        }
        
        li {
            margin: 10px 0;
            color: #555;
        }
        
        code {
            background: #f4f4f4;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
        }
        
        blockquote {
            border-left: 4px solid #3498db;
            padding-left: 20px;
            margin: 20px 0;
            color: #666;
            font-style: italic;
        }
        
        hr {
            border: none;
            border-top: 2px solid #ecf0f1;
            margin: 40px 0;
        }
        
        .subtitle {
            color: #7f8c8d;
            font-size: 1.2em;
            font-style: italic;
            margin-bottom: 30px;
        }
        
        .footer {
            margin-top: 60px;
            padding-top: 20px;
            border-top: 2px solid #ecf0f1;
            text-align: center;
            color: #95a5a6;
            font-size: 0.9em;
        }
        
        @media print {
            body {
                background: white;
            }
            .container {
                box-shadow: none;
                padding: 20px;
            }
        }
        
        /* Special styling for emoji */
        h3:first-child {
            margin-top: 20px;
        }
        
        /* Pricing sections */
        h3:contains("$") {
            background: #ecf0f1;
            padding: 10px 15px;
            border-radius: 5px;
            margin: 25px 0 15px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        {content}
    </div>
</body>
</html>
"""

# Insert converted content into template
final_html = html_template.replace('{content}', html_content)

# Save HTML file
output_path = '1편_Claude란_무엇인가.html'
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(final_html)

print(f"HTML ebook file created: {output_path}")
print(f"File size: {os.path.getsize(output_path):,} bytes")