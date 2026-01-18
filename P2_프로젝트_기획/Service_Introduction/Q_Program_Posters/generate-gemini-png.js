const puppeteer = require('puppeteer');
const path = require('path');

async function generatePNG() {
    console.log('Starting PNG generation for Gemini Posters...');
    const browser = await puppeteer.launch();

    const files = [
        { html: 'poster_gemini_1_tech.html', png: 'poster_gemini_1_tech.png' },
        { html: 'poster_gemini_2_authority.html', png: 'poster_gemini_2_authority.png' },
        { html: 'poster_gemini_3_urgent.html', png: 'poster_gemini_3_urgent.png' },
        { html: 'poster_gemini_4_minimal.html', png: 'poster_gemini_4_minimal.png' },
        { html: 'poster_gemini_5_viral.html', png: 'poster_gemini_5_viral.png' }
    ];

    for (const file of files) {
        try {
            const page = await browser.newPage();
            // Set viewport large enough to capture everything if needed, though we screenshot the element
            await page.setViewport({ width: 1200, height: 1500 });

            const htmlPath = path.join(__dirname, file.html);
            const fileUrl = `file://${htmlPath}`;
            
            console.log(`Processing: ${file.html}`);
            await page.goto(fileUrl, { waitUntil: 'networkidle0' });

            // Wait for the container to be present
            const selector = '.poster-container';
            await page.waitForSelector(selector);
            
            const element = await page.$(selector);

            if (element) {
                await element.screenshot({
                    path: path.join(__dirname, file.png),
                    type: 'png'
                });
                console.log(`✅ Created: ${file.png}`);
            } else {
                console.error(`❌ Element not found in ${file.html}`);
            }
            await page.close();
        } catch (error) {
            console.error(`❌ Error processing ${file.html}:`, error);
        }
    }

    await browser.close();
    console.log('\nAll Gemini images generated successfully!');
}

generatePNG().catch(console.error);
