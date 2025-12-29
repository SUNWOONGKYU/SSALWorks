const fs = require('fs');
const path = require('path');

function searchFiles(dir, pattern) {
  const results = [];
  const files = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      results.push(...searchFiles(fullPath, pattern));
    } else if (file.name.endsWith('.md')) {
      try {
        const content = fs.readFileSync(fullPath, 'utf8');
        const lines = content.split('\n');
        lines.forEach((line, idx) => {
          if (line.toLowerCase().includes('supabase')) {
            results.push({file: fullPath, line: idx+1, text: line.substring(0,100)});
          }
        });
      } catch(e) {}
    }
  }
  return results;
}

const results = searchFiles('Briefings_OrderSheets', /supabase/i);
results.forEach(r => console.log(r.file + ':' + r.line + ' - ' + r.text));
