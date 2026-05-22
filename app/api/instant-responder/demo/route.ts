import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message, tone } = await req.json();

    // Call the n8n webhook instead of Gemini directly
    // This allows tracking, CRM integration, and easier workflow changes
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL || 'http://localhost:5678/webhook/instant-responder';
    
    const response = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        tone: tone || 'professzionális és udvarias',
        source: 'website_demo'
      })
    });

    if (!response.ok) {
      console.error('n8n Webhook error:', response.statusText);
      throw new Error('Failed to fetch from n8n');
    }

    const data = await response.json();
    // Assuming n8n returns { success: true, response: "reply text" }
    const reply = data.response || "Hiba történt a válasz generálása során.";

    return NextResponse.json({ ok: true, reply });
  } catch (error) {
    console.error('Demo error:', error);
    return NextResponse.json({ ok: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
