#!/usr/bin/env node
/**
 * MD → HTML 변환기
 * Claude_Code_Master_Guide_SAL_Grid_Edition.md → HTML (단일 파일, 외부 의존성 0)
 */

const fs = require('fs');
const path = require('path');

const INPUT = path.join(__dirname, 'Claude_Code_Master_Guide_SAL_Grid_Edition.md');
const OUTPUT = path.join(__dirname, 'claude-code-sal-grid-guide.html');

const md = fs.readFileSync(INPUT, 'utf-8');

// ── Markdown → HTML 변환 ──

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function convertMd(src) {
  const lines = src.split('\n');
  const out = [];
  const toc = []; // {level, id, text}
  let inCode = false, codeLang = '', codeLines = [];
  let inTable = false, tableRows = [];
  let inList = false, listType = '', listItems = [];
  let inBlockquote = false, bqLines = [];
  let sectionId = 0;

  function flushBlockquote() {
    if (!inBlockquote) return;
    inBlockquote = false;
    const content = bqLines.join('<br>');
    out.push(`<blockquote>${content}</blockquote>`);
    bqLines = [];
  }

  function flushTable() {
    if (!inTable) return;
    inTable = false;
    if (tableRows.length === 0) return;
    let html = '<div class="table-wrap"><table>';
    tableRows.forEach((row, i) => {
      const cells = row.split('|').filter((_, idx, arr) => idx > 0 && idx < arr.length);
      const tag = i === 0 ? 'th' : 'td';
      html += '<tr>' + cells.map(c => `<${tag}>${inlineFormat(c.trim())}</${tag}>`).join('') + '</tr>';
    });
    html += '</table></div>';
    out.push(html);
    tableRows = [];
  }

  function flushList() {
    if (!inList) return;
    inList = false;
    const tag = listType === 'ol' ? 'ol' : 'ul';
    out.push(`<${tag}>${listItems.map(li => `<li>${inlineFormat(li)}</li>`).join('')}</${tag}>`);
    listItems = [];
  }

  function inlineFormat(s) {
    // bold+italic
    s = s.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
    // bold
    s = s.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // italic
    s = s.replace(/\*(.*?)\*/g, '<em>$1</em>');
    // inline code
    s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
    // links
    s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
    return s;
  }

  function makeId(text) {
    sectionId++;
    return 'sec-' + sectionId;
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code block
    if (line.startsWith('```')) {
      if (!inCode) {
        flushBlockquote(); flushTable(); flushList();
        inCode = true;
        codeLang = line.slice(3).trim();
        codeLines = [];
      } else {
        inCode = false;
        const langLabel = codeLang ? `<span class="code-lang">${escapeHtml(codeLang)}</span>` : '';
        out.push(`<div class="code-block">${langLabel}<pre><code>${escapeHtml(codeLines.join('\n'))}</code></pre></div>`);
      }
      continue;
    }
    if (inCode) { codeLines.push(line); continue; }

    // Horizontal rule
    if (/^---+\s*$/.test(line)) {
      flushBlockquote(); flushTable(); flushList();
      out.push('<hr>');
      continue;
    }

    // Table row
    if (line.includes('|') && line.trim().startsWith('|')) {
      flushBlockquote(); flushList();
      // separator row
      if (/^\|[\s\-:|]+\|$/.test(line.trim())) {
        inTable = true;
        continue;
      }
      if (!inTable && i + 1 < lines.length && /^\|[\s\-:|]+\|$/.test(lines[i + 1].trim())) {
        inTable = true;
      }
      if (inTable || tableRows.length > 0) {
        inTable = true;
        tableRows.push(line);
        continue;
      }
    } else if (inTable) {
      flushTable();
    }

    // Blockquote
    if (line.startsWith('>')) {
      flushTable(); flushList();
      inBlockquote = true;
      bqLines.push(inlineFormat(line.replace(/^>\s*/, '')));
      continue;
    } else if (inBlockquote) {
      flushBlockquote();
    }

    // Headings
    const hMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (hMatch) {
      flushTable(); flushList(); flushBlockquote();
      const level = hMatch[1].length;
      const text = hMatch[2].trim();
      const id = makeId(text);

      // TOC: only h2, h3, h4
      if (level >= 2 && level <= 4) {
        toc.push({ level, id, text: text.replace(/[*`]/g, '') });
      }

      // Add stage class for styling
      let cls = '';
      if (level === 2 && /^S[1-5]/.test(text)) cls = ' class="stage-heading"';
      else if (level === 2 && text.includes('부록')) cls = ' class="appendix-heading"';
      else if (level === 3 && /S\d[A-Z]{2}/.test(text)) cls = ' class="area-heading"';

      out.push(`<h${level} id="${id}"${cls}>${inlineFormat(text)}</h${level}>`);
      continue;
    }

    // Unordered list
    if (/^[-*]\s+/.test(line.trim())) {
      flushTable(); flushBlockquote();
      if (!inList || listType !== 'ul') {
        flushList();
        inList = true;
        listType = 'ul';
      }
      listItems.push(line.trim().replace(/^[-*]\s+/, ''));
      continue;
    }

    // Ordered list
    if (/^\d+\.\s+/.test(line.trim())) {
      flushTable(); flushBlockquote();
      if (!inList || listType !== 'ol') {
        flushList();
        inList = true;
        listType = 'ol';
      }
      listItems.push(line.trim().replace(/^\d+\.\s+/, ''));
      continue;
    }

    // Continue list with indented content
    if (inList && /^\s{2,}/.test(line) && line.trim()) {
      listItems[listItems.length - 1] += '<br>' + inlineFormat(line.trim());
      continue;
    }

    if (inList && line.trim() === '') {
      // might continue list
      continue;
    }

    if (inList && line.trim()) {
      flushList();
    }

    // Empty line
    if (!line.trim()) {
      continue;
    }

    // Paragraph
    out.push(`<p>${inlineFormat(line)}</p>`);
  }

  flushBlockquote(); flushTable(); flushList();

  return { html: out.join('\n'), toc };
}

const { html: bodyHtml, toc } = convertMd(md);

// ── TOC (사이드바 네비게이션) 생성 — 접기/펼치기 아코디언 ──

function buildTocHtml(toc) {
  let html = '';
  let inGroup = false; // h2 그룹 안에 있는지

  for (let i = 0; i < toc.length; i++) {
    const item = toc[i];
    const indent = (item.level - 2) * 16;

    // Stage badge
    let badge = '';
    if (/^S1/.test(item.text)) badge = '<span class="badge s1">S1</span>';
    else if (/^S2/.test(item.text)) badge = '<span class="badge s2">S2</span>';
    else if (/^S3/.test(item.text)) badge = '<span class="badge s3">S3</span>';
    else if (/^S4/.test(item.text)) badge = '<span class="badge s4">S4</span>';
    else if (/^S5/.test(item.text)) badge = '<span class="badge s5">S5</span>';

    const displayText = item.text.length > 50 ? item.text.slice(0, 47) + '...' : item.text;

    if (item.level === 2) {
      // 이전 그룹 닫기
      if (inGroup) html += '</div>\n</div>\n';

      // h2 다음에 하위 항목(h3/h4)이 있는지 확인
      const hasChildren = (i + 1 < toc.length && toc[i + 1].level > 2);
      const groupId = 'toc-group-' + i;

      if (hasChildren) {
        html += `<div class="toc-section">\n`;
        html += `<div class="toc-h2-row">\n`;
        html += `  <button class="toc-toggle" data-group="${groupId}" aria-label="Toggle">▶</button>\n`;
        html += `  <a href="#${item.id}" class="toc-item toc-h2">${badge}${escapeHtml(displayText)}</a>\n`;
        html += `</div>\n`;
        html += `<div class="toc-children" id="${groupId}">\n`;
        inGroup = true;
      } else {
        html += `<div class="toc-h2-row toc-h2-no-children">\n`;
        html += `  <a href="#${item.id}" class="toc-item toc-h2" style="padding-left:12px">${badge}${escapeHtml(displayText)}</a>\n`;
        html += `</div>\n`;
        inGroup = false;
      }
    } else {
      // h3, h4 — 하위 항목
      let cls = 'toc-item toc-child';
      if (item.level === 3) cls += ' toc-h3';
      else cls += ' toc-h4';

      html += `<a href="#${item.id}" class="${cls}" style="padding-left:${28 + indent}px">${badge}${escapeHtml(displayText)}</a>\n`;
    }
  }

  // 마지막 그룹 닫기
  if (inGroup) html += '</div>\n</div>\n</div>\n';

  return html;
}

const tocHtml = buildTocHtml(toc);

// ── 최종 HTML ──

const finalHtml = `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Claude Code Master Guide — SAL Grid Edition</title>
<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg: #0f172a;
  --bg2: #1e293b;
  --bg3: #334155;
  --text: #e2e8f0;
  --muted: #94a3b8;
  --accent: #38bdf8;
  --accent2: #a78bfa;
  --green: #4ade80;
  --orange: #fb923c;
  --red: #f87171;
  --yellow: #fbbf24;
  --sidebar-w: 320px;
  --header-h: 56px;
  --code-bg: #0d1117;
  --header-bg: rgba(15,23,42,0.92);
  --sidebar-border: rgba(148,163,184,0.08);
  --table-hover: rgba(56,189,248,0.04);
  --td-border: rgba(148,163,184,0.1);
  --bq-bg: rgba(167,139,250,0.06);
}

/* ── Light Theme ── */
html.light {
  --bg: #f8fafc;
  --bg2: #ffffff;
  --bg3: #e2e8f0;
  --text: #1e293b;
  --muted: #64748b;
  --accent: #2563eb;
  --accent2: #7c3aed;
  --green: #16a34a;
  --orange: #ea580c;
  --red: #dc2626;
  --yellow: #ca8a04;
  --code-bg: #f1f5f9;
  --header-bg: rgba(248,250,252,0.92);
  --sidebar-border: rgba(226,232,240,0.8);
  --table-hover: rgba(37,99,235,0.04);
  --td-border: rgba(226,232,240,0.6);
  --bq-bg: rgba(124,58,237,0.06);
}

html { scroll-behavior: smooth; scroll-padding-top: 70px; }
body { font-family: 'Pretendard', 'Apple SD Gothic Neo', 'Malgun Gothic', -apple-system, sans-serif; background: var(--bg); color: var(--text); line-height: 1.75; transition: background 0.3s, color 0.3s; }

/* ── Header ── */
.header {
  position: fixed; top: 0; left: 0; right: 0; height: var(--header-h);
  background: var(--header-bg); backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--td-border);
  display: flex; align-items: center; padding: 0 24px; z-index: 200;
  gap: 16px;
}
.header-title { font-size: 1.1rem; font-weight: 800; color: var(--accent); white-space: nowrap; }
.header-sub { font-size: 0.8rem; color: var(--muted); }
.menu-btn {
  display: none; background: none; border: 1px solid var(--bg3); color: var(--text);
  padding: 6px 10px; border-radius: 6px; cursor: pointer; font-size: 1.2rem;
}
.search-box {
  margin-left: auto; position: relative;
}
.search-box input {
  background: var(--bg2); border: 1px solid var(--bg3); color: var(--text);
  padding: 6px 12px 6px 32px; border-radius: 8px; font-size: 0.85rem; width: 220px;
  outline: none; transition: border-color 0.2s;
}
.search-box input:focus { border-color: var(--accent); }
.search-box::before { content: '\\1F50D'; position: absolute; left: 8px; top: 50%; transform: translateY(-50%); font-size: 0.85rem; }

/* ── Sidebar ── */
.sidebar {
  position: fixed; top: var(--header-h); left: 0; bottom: 0; width: var(--sidebar-w);
  background: var(--bg2); border-right: 1px solid var(--sidebar-border);
  overflow-y: auto; z-index: 100; padding: 16px 0;
  scrollbar-width: thin; scrollbar-color: var(--bg3) transparent;
}
.sidebar::-webkit-scrollbar { width: 4px; }
.sidebar::-webkit-scrollbar-thumb { background: var(--bg3); border-radius: 4px; }

.toc-item {
  display: block; padding: 5px 12px; color: var(--muted); text-decoration: none;
  font-size: 0.82rem; border-left: 2px solid transparent; transition: all 0.15s;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.toc-item:hover { color: var(--text); background: rgba(56,189,248,0.05); }
.toc-item.active { color: var(--accent); border-left-color: var(--accent); background: rgba(56,189,248,0.08); }
.toc-h2 { font-weight: 700; font-size: 0.88rem; color: var(--text); margin-top: 8px; }
.toc-h3 { font-weight: 600; }
.toc-h4 { font-size: 0.78rem; }

/* ── TOC 접기/펼치기 ── */
.toc-section { position: relative; }
.toc-h2-row {
  display: flex; align-items: center; margin-top: 4px;
}
.toc-h2-no-children { padding-left: 8px; }
.toc-h2-row .toc-item { flex: 1; min-width: 0; }
.toc-toggle {
  width: 24px; height: 24px; flex-shrink: 0; display: flex; align-items: center; justify-content: center;
  background: none; border: 1px solid var(--bg3); color: var(--muted); border-radius: 4px;
  cursor: pointer; font-size: 0.55rem; margin-left: 6px; margin-right: 2px;
  transition: all 0.2s; line-height: 1;
}
.toc-toggle:hover { background: var(--accent); color: var(--bg); border-color: var(--accent); }
.toc-toggle.open { transform: rotate(90deg); color: var(--accent); border-color: var(--accent); }
.toc-children {
  max-height: 0; overflow: hidden; transition: max-height 0.35s ease;
}
.toc-children.open { max-height: 8000px; }
.toc-child { border-left: 2px solid transparent; }

/* ── Sidebar 전체 펼치기/접기 버튼 ── */
.toc-controls {
  display: flex; gap: 4px; padding: 8px 12px 12px; border-bottom: 1px solid var(--td-border); margin-bottom: 8px;
}
.toc-ctrl-btn {
  flex: 1; background: var(--bg3); border: none; color: var(--muted);
  padding: 5px 8px; border-radius: 6px; cursor: pointer; font-size: 0.75rem;
  font-weight: 600; transition: all 0.2s; font-family: inherit;
}
.toc-ctrl-btn:hover { background: var(--accent); color: var(--bg); }

.badge {
  display: inline-block; font-size: 0.65rem; font-weight: 800; padding: 1px 5px;
  border-radius: 4px; margin-right: 4px; vertical-align: middle;
}
.badge.s1 { background: #065f46; color: #6ee7b7; }
.badge.s2 { background: #1e40af; color: #93c5fd; }
.badge.s3 { background: #7e22ce; color: #d8b4fe; }
.badge.s4 { background: #9a3412; color: #fdba74; }
.badge.s5 { background: #991b1b; color: #fca5a5; }

/* ── Content ── */
.content {
  margin-left: var(--sidebar-w); margin-top: var(--header-h);
  padding: 40px 56px 100px; max-width: 920px;
}

h1 { font-size: 2.2rem; font-weight: 900; margin: 32px 0 16px; color: var(--accent); line-height: 1.3; }
h2 { font-size: 1.7rem; font-weight: 800; margin: 48px 0 20px; padding-top: 24px; border-top: 1px solid var(--bg3); color: var(--text); line-height: 1.3; }
h2.stage-heading { color: var(--accent); border-top: 2px solid var(--accent); }
h2.appendix-heading { color: var(--accent2); border-top: 2px solid var(--accent2); }
h3 { font-size: 1.25rem; font-weight: 700; margin: 32px 0 12px; color: var(--text); }
h3.area-heading { color: var(--accent2); }
h4 { font-size: 1.05rem; font-weight: 700; margin: 24px 0 10px; color: var(--orange); }
h5 { font-size: 0.95rem; font-weight: 600; margin: 16px 0 8px; }
h6 { font-size: 0.88rem; font-weight: 600; margin: 12px 0 6px; color: var(--muted); }

p { margin: 10px 0; color: var(--text); font-size: 0.95rem; }
a { color: var(--accent); text-decoration: none; }
a:hover { text-decoration: underline; }

strong { color: var(--accent); font-weight: 700; }
em { color: var(--muted); font-style: italic; }
code { background: var(--bg3); padding: 1px 6px; border-radius: 4px; font-size: 0.88em; font-family: 'Fira Code', 'Cascadia Code', Consolas, monospace; }

/* ── Code block ── */
.code-block {
  position: relative; margin: 16px 0; border-radius: 10px; overflow: hidden;
  background: var(--code-bg); border: 1px solid var(--td-border);
}
.code-lang {
  position: absolute; top: 8px; right: 12px; font-size: 0.7rem; color: var(--muted);
  background: rgba(148,163,184,0.1); padding: 2px 8px; border-radius: 4px;
}
.code-block pre {
  padding: 20px 24px; overflow-x: auto; margin: 0;
  font-size: 0.85rem; line-height: 1.6;
  font-family: 'Fira Code', 'Cascadia Code', Consolas, monospace;
  color: #c9d1d9;
}
html.light .code-block pre { color: #1e293b; }
html.light .code-block { background: #f1f5f9; }
html.light .code-lang { background: rgba(100,116,139,0.15); }
html.light code { background: #e2e8f0; color: #1e293b; }
html.light strong { color: #2563eb; }
html.light h4 { color: #c2410c; }
html.light blockquote { border-left-color: #7c3aed; color: #475569; }
html.light .toc-item:hover { background: rgba(37,99,235,0.06); }
html.light .toc-item.active { background: rgba(37,99,235,0.08); }
html.light .badge.s1 { background: #d1fae5; color: #065f46; }
html.light .badge.s2 { background: #dbeafe; color: #1e40af; }
html.light .badge.s3 { background: #ede9fe; color: #5b21b6; }
html.light .badge.s4 { background: #ffedd5; color: #9a3412; }
html.light .badge.s5 { background: #fee2e2; color: #991b1b; }
html.light .back-top { background: #2563eb; }
html.light th { background: #e2e8f0; color: #1e293b; border-bottom-color: #2563eb; }
html.light h2 { border-top-color: #e2e8f0; }
html.light h2.stage-heading { border-top-color: #2563eb; color: #2563eb; }
html.light h2.appendix-heading { border-top-color: #7c3aed; color: #7c3aed; }
html.light h3.area-heading { color: #7c3aed; }
html.light hr { border-top-color: #e2e8f0; }
html.light mark { background: rgba(202,138,4,0.2); color: #92400e; }

/* ── Theme Toggle ── */
.theme-toggle {
  background: var(--bg3); border: none; color: var(--text);
  padding: 6px 12px; border-radius: 8px; cursor: pointer; font-size: 0.82rem;
  font-weight: 600; transition: all 0.2s; white-space: nowrap; font-family: inherit;
}
.theme-toggle:hover { background: var(--accent); color: var(--bg); }

blockquote {
  margin: 16px 0; padding: 12px 20px; border-left: 4px solid var(--accent2);
  background: var(--bq-bg); border-radius: 0 8px 8px 0;
  color: var(--muted); font-size: 0.9rem;
}

hr { border: none; border-top: 1px solid var(--bg3); margin: 32px 0; }

ul, ol { padding-left: 24px; margin: 10px 0; font-size: 0.93rem; }
li { margin: 4px 0; }
li::marker { color: var(--accent); }

/* ── Table ── */
.table-wrap { overflow-x: auto; margin: 16px 0; }
table { width: 100%; border-collapse: collapse; font-size: 0.88rem; }
th { background: var(--bg3); padding: 10px 14px; text-align: left; font-weight: 700; border-bottom: 2px solid var(--accent); white-space: nowrap; }
td { padding: 8px 14px; border-bottom: 1px solid var(--td-border); }
tr:hover td { background: var(--table-hover); }

/* ── Back to top ── */
.back-top {
  position: fixed; bottom: 24px; right: 24px; width: 44px; height: 44px;
  background: var(--accent); color: var(--bg); border: none; border-radius: 50%;
  font-size: 1.3rem; cursor: pointer; z-index: 150; display: none;
  align-items: center; justify-content: center; box-shadow: 0 4px 16px rgba(0,0,0,0.3);
  transition: opacity 0.2s;
}
.back-top.show { display: flex; }

/* ── Progress ── */
.progress { position: fixed; top: var(--header-h); left: var(--sidebar-w); right: 0; height: 3px; z-index: 150; }
.progress-bar { height: 100%; background: linear-gradient(90deg, var(--accent), var(--accent2)); width: 0; transition: width 0.1s; }

/* ── Search highlight ── */
mark { background: rgba(251,191,36,0.3); color: var(--yellow); padding: 0 2px; border-radius: 2px; }

/* ── Print ── */
@media print {
  .sidebar, .header, .back-top, .progress, .search-box, .menu-btn { display: none !important; }
  .content { margin: 0; padding: 20px; max-width: 100%; }
  body { background: #fff; color: #000; }
  h2 { border-color: #ccc; }
  .code-block { border: 1px solid #ccc; }
  .code-block pre { color: #000; }
  table { border: 1px solid #ccc; }
  th { background: #eee; border-color: #999; }
  td { border-color: #ccc; }
}

/* ── Mobile ── */
@media (max-width: 900px) {
  .sidebar { transform: translateX(-100%); transition: transform 0.3s; width: 280px; }
  .sidebar.open { transform: translateX(0); box-shadow: 4px 0 24px rgba(0,0,0,0.5); }
  .content { margin-left: 0; padding: 24px 20px 80px; }
  .menu-btn { display: block; }
  .progress { left: 0; }
  .header-sub { display: none; }
}
</style>
</head>
<body>

<header class="header">
  <button class="menu-btn" id="menuBtn" aria-label="Toggle menu">&#9776;</button>
  <div class="header-title">Claude Code Master Guide</div>
  <div class="header-sub">SAL Grid Edition v3.0</div>
  <button class="theme-toggle" id="themeToggle" title="Dark / Light">Light</button>
  <div class="search-box">
    <input type="text" id="searchInput" placeholder="Search... (Ctrl+K)">
  </div>
</header>

<div class="progress"><div class="progress-bar" id="progressBar"></div></div>

<nav class="sidebar" id="sidebar">
<div class="toc-controls">
  <button class="toc-ctrl-btn" id="tocExpandAll">전체 펼치기</button>
  <button class="toc-ctrl-btn" id="tocCollapseAll">전체 접기</button>
</div>
${tocHtml}
</nav>

<main class="content" id="content">
${bodyHtml}
</main>

<button class="back-top" id="backTop" title="Back to top">&#8593;</button>

<script>
// ── Theme toggle ──
const themeToggle = document.getElementById('themeToggle');
function setTheme(light) {
  document.documentElement.classList.toggle('light', light);
  themeToggle.textContent = light ? 'Dark' : 'Light';
  localStorage.setItem('theme', light ? 'light' : 'dark');
}
// Load saved preference
if (localStorage.getItem('theme') === 'light') setTheme(true);
themeToggle.addEventListener('click', () => {
  setTheme(!document.documentElement.classList.contains('light'));
});

// ── Scroll progress ──
const bar = document.getElementById('progressBar');
const content = document.getElementById('content');
window.addEventListener('scroll', () => {
  const h = document.documentElement.scrollHeight - window.innerHeight;
  bar.style.width = h > 0 ? (window.scrollY / h * 100) + '%' : '0%';
});

// ── Back to top ──
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
  backTop.classList.toggle('show', window.scrollY > 400);
});
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ── Active TOC highlight ──
const tocLinks = document.querySelectorAll('.toc-item');
const headings = [];
tocLinks.forEach(a => {
  const id = a.getAttribute('href').slice(1);
  const el = document.getElementById(id);
  if (el) headings.push({ el, link: a });
});

function updateActive() {
  let current = null;
  for (const h of headings) {
    if (h.el.getBoundingClientRect().top <= 100) current = h;
  }
  tocLinks.forEach(a => a.classList.remove('active'));
  if (current) {
    current.link.classList.add('active');
    // 현재 활성 항목이 보이도록 부모 그룹 자동 펼치기
    if (typeof autoExpandActiveGroup === 'function') autoExpandActiveGroup();
    current.link.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }
}
window.addEventListener('scroll', updateActive);
updateActive();

// ── TOC 접기/펼치기 ──
document.querySelectorAll('.toc-toggle').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const groupId = btn.dataset.group;
    const children = document.getElementById(groupId);
    if (children) {
      children.classList.toggle('open');
      btn.classList.toggle('open');
    }
  });
});

// 전체 펼치기/접기
document.getElementById('tocExpandAll').addEventListener('click', () => {
  document.querySelectorAll('.toc-children').forEach(c => c.classList.add('open'));
  document.querySelectorAll('.toc-toggle').forEach(b => b.classList.add('open'));
});
document.getElementById('tocCollapseAll').addEventListener('click', () => {
  document.querySelectorAll('.toc-children').forEach(c => c.classList.remove('open'));
  document.querySelectorAll('.toc-toggle').forEach(b => b.classList.remove('open'));
});

// 스크롤 시 현재 보이는 섹션의 TOC 그룹 자동 펼치기
function autoExpandActiveGroup() {
  const activeLink = document.querySelector('.toc-item.active');
  if (activeLink && activeLink.classList.contains('toc-child')) {
    const parentGroup = activeLink.closest('.toc-children');
    if (parentGroup && !parentGroup.classList.contains('open')) {
      parentGroup.classList.add('open');
      // 해당 토글 버튼도 열기
      const section = parentGroup.closest('.toc-section');
      if (section) {
        const toggleBtn = section.querySelector('.toc-toggle');
        if (toggleBtn) toggleBtn.classList.add('open');
      }
    }
  }
}

// ── Mobile menu ──
const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
menuBtn.addEventListener('click', () => sidebar.classList.toggle('open'));
sidebar.addEventListener('click', e => {
  if (e.target.tagName === 'A') sidebar.classList.remove('open');
});

// ── Search ──
const searchInput = document.getElementById('searchInput');
document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); searchInput.focus(); }
  if (e.key === 'Escape') searchInput.blur();
});

let searchTimeout;
searchInput.addEventListener('input', () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(doSearch, 300);
});

function doSearch() {
  // Clear previous
  document.querySelectorAll('mark').forEach(m => {
    m.replaceWith(m.textContent);
  });
  content.normalize();

  const q = searchInput.value.trim().toLowerCase();
  if (!q || q.length < 2) return;

  // Filter TOC
  tocLinks.forEach(a => {
    const text = a.textContent.toLowerCase();
    a.style.display = text.includes(q) || !q ? '' : '';
  });

  // Highlight in content (first 50 matches)
  const walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT, null);
  const matches = [];
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node.parentElement.tagName === 'SCRIPT' || node.parentElement.tagName === 'STYLE') continue;
    if (node.parentElement.tagName === 'CODE' || node.parentElement.tagName === 'PRE') continue;
    const idx = node.textContent.toLowerCase().indexOf(q);
    if (idx >= 0) matches.push({ node, idx });
    if (matches.length >= 50) break;
  }

  if (matches.length > 0) {
    // Scroll to first
    const first = matches[0];
    const range = document.createRange();
    range.setStart(first.node, first.idx);
    range.setEnd(first.node, first.idx + q.length);
    const mark = document.createElement('mark');
    range.surroundContents(mark);
    mark.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }
}
</script>
</body>
</html>`;

fs.writeFileSync(OUTPUT, finalHtml, 'utf-8');
const sizeKB = Math.round(fs.statSync(OUTPUT).size / 1024);
console.log('\\n✅ HTML 생성 완료');
console.log('   파일: ' + OUTPUT);
console.log('   용량: ' + sizeKB + ' KB');
console.log('   TOC 항목: ' + toc.length + '개');
