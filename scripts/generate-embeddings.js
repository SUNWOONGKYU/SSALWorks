/**
 * @task S3BI2
 * @description 콘텐츠 임베딩 생성 스크립트
 *
 * 실행: node scripts/generate-embeddings.js
 *
 * 225개 MD 파일을 청킹하고 Gemini 임베딩을 생성하여 Supabase에 저장
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// 환경 변수 로드 (.env.local 우선, 없으면 .env)
const envLocalPath = path.join(__dirname, '../P3_프로토타입_제작/Database/.env.local');
const envPath = path.join(__dirname, '../P3_프로토타입_제작/Database/.env');
const fs_env = require('fs');
if (fs_env.existsSync(envLocalPath)) {
    require('dotenv').config({ path: envLocalPath });
} else {
    require('dotenv').config({ path: envPath });
}

// 설정
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// 검증
if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error('❌ SUPABASE_URL 또는 SUPABASE_SERVICE_ROLE_KEY가 설정되지 않았습니다.');
    process.exit(1);
}

if (!GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY가 설정되지 않았습니다.');
    process.exit(1);
}

// 클라이언트 초기화
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// 콘텐츠 경로 설정 (전체 콘텐츠)
const BASE_PATH = path.join(__dirname, '..');
const CONTENT_PATHS = {
    // 학습용 콘텐츠 (3개)
    tips: path.join(BASE_PATH, '부수적_고유기능/콘텐츠/실전_Tips'),
    books: path.join(BASE_PATH, '부수적_고유기능/콘텐츠/학습용_Books_New'),
    guides: path.join(BASE_PATH, '부수적_고유기능/콘텐츠/외부_연동_설정_Guide'),

    // 브리핑스 (P0-S5 + Situational)
    briefings: path.join(BASE_PATH, 'Briefings_OrderSheets/Briefings'),

    // 오더시트 템플릿
    ordersheets: path.join(BASE_PATH, 'Briefings_OrderSheets/OrderSheet_Templates'),

    // 매뉴얼 (Project SAL Grid 등)
    manuals: path.join(BASE_PATH, 'S0_Project-SAL-Grid_생성/manual'),

    // 서비스 안내문
    service_guides: path.join(BASE_PATH, 'P3_프로토타입_제작/Frontend/Prototype')
};

// 청킹 설정
const CHUNK_SIZE = 1000;
const CHUNK_OVERLAP = 200;

// Rate limiting (Gemini 무료 티어: 분당 60회)
const DELAY_MS = 150; // 100ms + 여유

/**
 * 텍스트 청킹
 */
function chunkText(text, chunkSize = CHUNK_SIZE, overlap = CHUNK_OVERLAP) {
    if (!text || text.length === 0) return [];
    if (text.length <= chunkSize) return [text];

    const chunks = [];
    let start = 0;

    while (start < text.length) {
        const end = Math.min(start + chunkSize, text.length);
        chunks.push(text.slice(start, end));
        start = end - overlap;
        if (start + overlap >= text.length) break;
    }

    return chunks;
}

/**
 * 제목 추출
 */
function extractTitle(content, fallback) {
    const match = content.match(/^#\s+(.+)$/m);
    return match ? match[1].trim() : fallback;
}

/**
 * 프론트매터 제거
 */
function removeFrontmatter(content) {
    return content.replace(/^---\n[\s\S]*?\n---\n/, '').trim();
}

/**
 * Gemini 임베딩 생성
 */
async function generateEmbedding(text) {
    const model = genAI.getGenerativeModel({ model: 'embedding-001' });
    const result = await model.embedContent(text);
    return result.embedding.values;
}

/**
 * MD 파일 재귀 검색
 */
function findMdFiles(dir, files = []) {
    if (!fs.existsSync(dir)) return files;

    const items = fs.readdirSync(dir);
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            findMdFiles(fullPath, files);
        } else if (item.endsWith('.md')) {
            files.push(fullPath);
        }
    }

    return files;
}

/**
 * 파일 처리
 */
async function processFile(filePath, contentType, stats) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const fileName = path.basename(filePath, '.md');

    // 프론트매터 제거 및 제목 추출
    const cleanContent = removeFrontmatter(content);
    const title = extractTitle(content, fileName);

    // 청킹
    const chunks = chunkText(cleanContent);

    // 상대 경로 계산
    const relativePath = path.relative(BASE_PATH, filePath);

    console.log(`  📄 ${fileName} (${chunks.length} chunks)`);

    // 각 청크 처리
    for (let i = 0; i < chunks.length; i++) {
        try {
            // 임베딩 생성
            const embedding = await generateEmbedding(chunks[i]);

            // Supabase에 저장
            const { error } = await supabase.from('content_embeddings').insert({
                content_type: contentType,
                content_id: fileName,
                chunk_index: i,
                title: title,
                content: chunks[i],
                embedding: embedding,
                metadata: {
                    file_path: relativePath,
                    total_chunks: chunks.length
                }
            });

            if (error) {
                console.error(`    ❌ Chunk ${i + 1}: ${error.message}`);
                stats.errors++;
            } else {
                stats.chunks++;
            }

            // Rate limiting
            await new Promise(resolve => setTimeout(resolve, DELAY_MS));

        } catch (err) {
            console.error(`    ❌ Chunk ${i + 1}: ${err.message}`);
            stats.errors++;
        }
    }

    stats.files++;
}

/**
 * 기존 데이터 삭제 (선택적)
 */
async function clearExistingData() {
    console.log('\n🗑️  기존 임베딩 데이터 삭제 중...');
    const { error } = await supabase
        .from('content_embeddings')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // 모든 행 삭제

    if (error) {
        console.error('  ❌ 삭제 실패:', error.message);
    } else {
        console.log('  ✅ 삭제 완료');
    }
}

/**
 * 메인 함수
 */
async function main() {
    console.log('═══════════════════════════════════════════════');
    console.log('  SSAL Works 콘텐츠 임베딩 생성');
    console.log('═══════════════════════════════════════════════');
    console.log(`  청크 크기: ${CHUNK_SIZE}자`);
    console.log(`  오버랩: ${CHUNK_OVERLAP}자`);
    console.log(`  모델: Gemini embedding-001 (768차원)`);
    console.log('═══════════════════════════════════════════════\n');

    // 기존 데이터 삭제 (필요시 주석 해제)
    // await clearExistingData();

    const stats = { files: 0, chunks: 0, errors: 0 };
    const startTime = Date.now();

    // 각 콘텐츠 타입 처리
    for (const [contentType, basePath] of Object.entries(CONTENT_PATHS)) {
        console.log(`\n📁 ${contentType.toUpperCase()} 처리 중...`);
        console.log(`   경로: ${basePath}`);

        if (!fs.existsSync(basePath)) {
            console.log(`   ⚠️ 경로가 존재하지 않습니다.`);
            continue;
        }

        const files = findMdFiles(basePath);
        console.log(`   파일 수: ${files.length}개\n`);

        for (const file of files) {
            await processFile(file, contentType, stats);
        }
    }

    // 결과 출력
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log('\n═══════════════════════════════════════════════');
    console.log('  완료!');
    console.log('═══════════════════════════════════════════════');
    console.log(`  처리된 파일: ${stats.files}개`);
    console.log(`  생성된 청크: ${stats.chunks}개`);
    console.log(`  오류: ${stats.errors}개`);
    console.log(`  소요 시간: ${elapsed}초`);
    console.log('═══════════════════════════════════════════════\n');
}

// 실행
main().catch(console.error);
