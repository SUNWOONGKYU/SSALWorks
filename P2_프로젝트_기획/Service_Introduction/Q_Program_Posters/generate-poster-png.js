const puppeteer = require('puppeteer');
const path = require('path');

async function generatePNG() {
    const browser = await puppeteer.launch();

    const files = [
        { html: 'facebook_poster_q_program.html', png: 'poster_original.png' },
        { html: 'poster_v1_hook.html', png: 'poster_v1_hook.png' },
        { html: 'poster_v2_price.html', png: 'poster_v2_price.png' },
        { html: 'poster_v3_badges.html', png: 'poster_v3_badges.png' }
    ];

    for (const file of files) {
        const page = await browser.newPage();

        // 뷰포트를 충분히 크게 설정 (2000x3000 포스터 수용)
        await page.setViewport({ width: 2100, height: 3500 });

        const htmlPath = path.join(__dirname, file.html);

        await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });

        const poster = await page.$('.poster');

        await poster.screenshot({
            path: path.join(__dirname, file.png),
            type: 'png'
        });

        console.log(`생성 완료: ${file.png}`);
        await page.close();
    }

    await browser.close();
    console.log('\n모든 PNG 파일 생성 완료!');
}

generatePNG().catch(console.error);
