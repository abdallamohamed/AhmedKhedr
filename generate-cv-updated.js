const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generatePDF() {
    try {
        // Launch browser
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();

        // Read the HTML file
        const htmlPath = path.join(__dirname, 'cv-template-updated.html');
        const htmlContent = fs.readFileSync(htmlPath, 'utf8');

        // Set content and wait for images to load
        await page.setContent(htmlContent, {
            waitUntil: 'networkidle0'
        });

        // Generate PDF
        const pdfPath = path.join(__dirname, 'public', 'assets', 'Ahmed_Khedr_CV.pdf');
        
        await page.pdf({
            path: pdfPath,
            format: 'A4',
            margin: {
                top: '15mm',
                right: '15mm',
                bottom: '15mm',
                left: '15mm'
            },
            printBackground: true,
            displayHeaderFooter: false
        });

        console.log(`Updated PDF generated successfully at: ${pdfPath}`);
        await browser.close();

    } catch (error) {
        console.error('Error generating PDF:', error);
        process.exit(1);
    }
}

generatePDF(); 