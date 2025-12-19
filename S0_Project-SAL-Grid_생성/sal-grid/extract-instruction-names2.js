const fs = require('fs');
const path = require('path');

const dir = './task-instructions';
const files = fs.readdirSync(dir).filter(f => f.endsWith('_instruction.md') && f.startsWith('S'));

const results = [];

files.forEach(file => {
    const content = fs.readFileSync(path.join(dir, file), 'utf-8');
    const taskId = file.replace('_instruction.md', '');
    
    // 여러 패턴으로 task_name 찾기
    let taskName = 'N/A';
    
    // 패턴 1: task_name: "xxx" 또는 task_name: xxx
    let match = content.match(/task_name:\s*["']?([^"'\n|]+)["']?/i);
    if (match) {
        taskName = match[1].trim();
    } else {
        // 패턴 2: | task_name | xxx |
        match = content.match(/\|\s*task_name\s*\|\s*([^|]+)\s*\|/i);
        if (match) {
            taskName = match[1].trim();
        } else {
            // 패턴 3: **Task Name**: xxx
            match = content.match(/\*\*Task Name\*\*:\s*(.+)/i);
            if (match) {
                taskName = match[1].trim();
            } else {
                // 패턴 4: ## xxx (두 번째 헤더)
                const lines = content.split('\n');
                for (let i = 0; i < lines.length; i++) {
                    if (lines[i].startsWith('## ') && !lines[i].includes('Task Instruction')) {
                        taskName = lines[i].replace('## ', '').trim();
                        break;
                    }
                }
            }
        }
    }
    
    results.push({ taskId, taskName });
});

// Stage별로 정렬
results.sort((a, b) => a.taskId.localeCompare(b.taskId));

console.log('| Task ID | Task Instruction |');
console.log('|---------|------------------|');
results.forEach(r => {
    console.log(`| ${r.taskId} | ${r.taskName} |`);
});
