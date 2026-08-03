const fs = require('fs');
const file = 'app/api/instant-responder/demo/route.ts';
let code = fs.readFileSync(file, 'utf8');

const validationCode = `
    if (!message || typeof message !== 'string' || message.trim() === '') {
      return NextResponse.json({ ok: false, error: 'Érvénytelen kérés: a message mező kötelező és szövegnek kell lennie.' }, { status: 400 });
    }

    if (message.length > 2000) {
      return NextResponse.json({ ok: false, error: 'Érvénytelen kérés: a message túl hosszú (maximum 2000 karakter).' }, { status: 400 });
    }

    if (tone !== undefined && typeof tone !== 'string') {
      return NextResponse.json({ ok: false, error: 'Érvénytelen kérés: a tone mezőnek szövegnek kell lennie.' }, { status: 400 });
    }

    if (tone && tone.length > 100) {
      return NextResponse.json({ ok: false, error: 'Érvénytelen kérés: a tone túl hosszú (maximum 100 karakter).' }, { status: 400 });
    }
`;

code = code.replace('const { message, tone } = await req.json();', `const { message, tone } = await req.json();\n${validationCode}`);

fs.writeFileSync(file, code);
console.log('File patched');
