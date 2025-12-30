
                const puppeteer = require('puppeteer');
                (async () => {
                    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
                    const page = await browser.newPage();
                    await page.goto('file:///C:/!SSAL_Works_Private/pages/mypage/manual.html', { waitUntil: 'networkidle0' });
                    await page.pdf({
                        path: 'C:/!SSAL_Works_Private/pages/mypage/manual.pdf',
                        format: 'A4',
                        margin: { top: '20mm', right: '15mm', bottom: '20mm', left: '15mm' },
                        printBackground: true
                    });
                    await browser.close();
                    console.log('PDF 생성 완료');
                })();
            