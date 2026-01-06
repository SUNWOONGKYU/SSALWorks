import markdown
import os

# Configuration
input_files = [
    ("01_특허출원서.md", "1. 특허출원서"),
    ("03_Complete_Patent_Application_v3.md", "2. 명세서")
]
output_file = "Patent_Submission_Package.html"

# CSS Styles for KIPO-friendly view
css_styles = """
<style>
    body { font-family: 'Malgun Gothic', 'Batang', serif; line-height: 1.6; max-width: 800px; margin: 40px auto; color: #000; }
    h1, h2, h3, h4, h5 { color: #000; margin-top: 1.5em; margin-bottom: 0.5em; }
    h1 { font-size: 24px; border-bottom: 2px solid #000; padding-bottom: 10px; }
    h2 { font-size: 20px; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
    h3 { font-size: 18px; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { border: 1px solid #000; padding: 8px; text-align: left; }
    th { background-color: #f2f2f2; }
    pre { background-color: #f9f9f9; border: 1px solid #ddd; padding: 10px; overflow-x: auto; font-family: Consolas, monospace; }
    blockquote { border-left: 4px solid #ccc; margin: 0; padding-left: 10px; color: #555; }
    .page-break { page-break-before: always; border-top: 1px dashed #aaa; margin: 40px 0; padding-top: 20px; }
    .doc-title { text-align: center; font-size: 28px; font-weight: bold; margin-bottom: 40px; text-decoration: underline; }
</style>
"""

html_content = ["<!DOCTYPE html><html><head><meta charset='utf-8'><title>특허 출원용 제출 패키지</title>" + css_styles + "</head><body>"]

for filepath, title in input_files:
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            md_text = f.read()
            # Convert Markdown to HTML with tables extension
            html_body = markdown.markdown(md_text, extensions=['tables', 'fenced_code'])
            
            html_content.append(f"<div class='page-break'></div>")
            html_content.append(f"<h1 class='doc-title'>{title}</h1>")
            html_content.append(html_body)
    else:
        print(f"Warning: File not found - {filepath}")

html_content.append("</body></html>")

with open(output_file, 'w', encoding='utf-8') as f:
    f.write("\n".join(html_content))

print(f"Successfully created {output_file}")
