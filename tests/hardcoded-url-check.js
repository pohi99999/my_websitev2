const fs = require('fs');
const files = [
    'F:/my_websitev2/app/components/SmartContactForm.tsx',
    'F:/my_websitev2/app/components/AbandonedCartDemo.tsx'
];

let failed = false;
files.forEach(file => {
    if (!fs.existsSync(file)) {
        console.error(`File not found: ${file}`);
        failed = true;
        return;
    }
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes("fetch('http://localhost:5678") || content.includes('fetch("http://localhost:5678')) {
        console.error(`Test Failed: Direct hardcoded fetch found in ${file}`);
        failed = true;
    }
});

if (failed) {
    process.exit(1);
} else {
    console.log('Test Passed: No hardcoded URLs found');
}
