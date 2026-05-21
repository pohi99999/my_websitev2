import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // Call Gemini 2.0 Flash directly for the demo response
    // (In production, this would go through an n8n webhook for tracking/CRM)
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
    
    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          role: 'user',
          parts: [{
            text: `Te egy profi ügyfélszolgálati AI vagy a Pohánka & Társánál. Az alábbi üzenetre válaszolj rendkívül segítőkészen, profin, de barátságos SME-barát stílusban. A válaszod legyen rövid (max 3-4 mondat). Üzenet: "${message}"`
          }]
        }]
      })
    });

    const data = await response.json();
    const reply = data.candidates[0].content.parts[0].text;

    return NextResponse.json({ ok: true, reply });
  } catch (error) {
    console.error('Demo error:', error);
    return NextResponse.json({ ok: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
