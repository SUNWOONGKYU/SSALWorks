const puppeteer = require('puppeteer');
const path = require('path');

async function convertToPng() {
    const htmlPath = path.join(__dirname, 'AI_3단계_개발방법론_다이어그램.html');
    const pngPath = path.join(__dirname, 'AI_3단계_개발방법론_다이어그램.png');

    console.log('브라우저 시작...');
    const browser = await puppeteer.launch({
        headless: 'new'
    });

    const page = await browser.newPage();

    // 뷰포트 설정
    await page.setViewport({
        width: 800,
        height: 1000,
        deviceScaleFactor: 2  // 고해상도
    });

    console.log('HTML 파일 로딩...');
    await page.goto(`file://${htmlPath}`, {
        waitUntil: 'networkidle0'
    });

    // 컨테이너 요소만 캡처
    const container = await page.$('.container');

    if (container) {
        console.log('PNG 저장 중...');
        await container.screenshot({
            path: pngPath,
            type: 'png',
            omitBackground: false
        });
        console.log(`✅ 저장 완료: ${pngPath}`);
    } else {
        // 전체 페이지 캡처
        await page.screenshot({
            path: pngPath,
            type: 'png',
            fullPage: false
        });
        console.log(`✅ 전체 페이지 저장 완료: ${pngPath}`);
    }

    await browser.close();
    console.log('완료!');
}

convertToPng().catch(console.error);
