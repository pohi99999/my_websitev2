const assert = require('assert');
try {
    assert.ok(process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL, 'NEXT_PUBLIC_N8N_WEBHOOK_URL is not defined');
    console.log('Test Passed');
} catch (e) {
    console.error('Test Failed:', e.message);
    process.exit(1);
}
