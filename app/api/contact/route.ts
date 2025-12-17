import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

function asNonEmptyString(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
}

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return NextResponse.json({ ok: false, error: 'Invalid content-type' }, { status: 415 });
    }

    const body = (await req.json()) as {
      name?: unknown;
      email?: unknown;
      message?: unknown;
      website?: unknown; // honeypot
    };

    const honeypot = asNonEmptyString(body.website);
    if (honeypot) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const name = asNonEmptyString(body.name);
    const email = asNonEmptyString(body.email);
    const message = asNonEmptyString(body.message);

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 });
    }

    if (name.length > 120 || email.length > 200 || message.length > 6000) {
      return NextResponse.json({ ok: false, error: 'Input too long' }, { status: 400 });
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPortRaw = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    const to = process.env.CONTACT_TO || 'peterpohankapersonal@gmail.com';
    const from = process.env.CONTACT_FROM || smtpUser || 'no-reply@pohanka.vercel.app';

    if (!smtpHost || !smtpPortRaw || !smtpUser || !smtpPass) {
      return NextResponse.json(
        {
          ok: false,
          error:
            'Email service not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS (and optionally CONTACT_TO/CONTACT_FROM).'
        },
        { status: 500 }
      );
    }

    const smtpPort = Number(smtpPortRaw);
    if (!Number.isFinite(smtpPort)) {
      return NextResponse.json({ ok: false, error: 'Invalid SMTP_PORT' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass }
    });

    const subject = `Kapcsolat űrlap: ${name}`;
    const text = [
      'Új üzenet érkezett a kapcsolat űrlapról.',
      '',
      `Név: ${name}`,
      `Email: ${email}`,
      '',
      'Üzenet:',
      message
    ].join('\n');

    await transporter.sendMail({
      to,
      from,
      replyTo: email,
      subject,
      text
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ ok: false, error: 'Unexpected error' }, { status: 500 });
  }
}
