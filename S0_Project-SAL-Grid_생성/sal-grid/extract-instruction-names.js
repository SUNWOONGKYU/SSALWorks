const fs = require('fs');
const path = require('path');

const dir = './task-instructions';
const files = fs.readdirSync(dir).filter(f => f.endsWith('_instruction.md') && f.startsWith('S'));

const results = [];

files.forEach(file => {
    const content = fs.readFileSync(path.join(dir, file), 'utf-8');
    const taskId = file.replace('_instruction.md', '');
    
    // task_name 찾기
    const match = content.match(/task_name:\s*["']?([^"'\n]+)["']?/i) 
        || content.match(/## Task:\s*(.+)/i)
        || content.match(/# (.+)/);
    
    const taskName = match ? match[1].trim() : 'N/A';
    results.push({ taskId, taskName });
});

// Stage별로 정렬
results.sort((a, b) => a.taskId.localeCompare(b.taskId));

console.log('Task ID | Task Instruction Name');
console.log('--------|----------------------');
results.forEach(r => {
    console.log(`${r.taskId} | ${r.taskName}`);
});
