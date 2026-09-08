import { test, expect } from '@playwright/test';
import { POST, OPTIONS } from '../app/api/contact/route';

test.describe('Contact API', () => {
  let ipCounter = 0;

  function createRequest(body: any, headers: Record<string, string> = {}) {
    ipCounter++;
    const reqHeaders = new Headers(headers);
    if (!reqHeaders.has('content-type')) {
      reqHeaders.set('content-type', 'application/json');
    }
    if (!reqHeaders.has('x-forwarded-for')) {
      reqHeaders.set('x-forwarded-for', `192.168.1.${ipCounter}`);
    }

    return new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: reqHeaders,
      body: typeof body === 'string' ? body : JSON.stringify(body),
    });
  }

  // --- Origin-ellenorzes. A lenyeg NEM az, hogy az idegen origint tiltja,
  // hanem hogy a JOGOSAT tovabbra is atengedi -- a produkcion ES az elonezeten is.
  test.describe('origin check', () => {
    const savedEnv = { ...process.env };

    test.afterEach(() => {
      for (const key of ['VERCEL_ENV', 'VERCEL_URL', 'VERCEL_BRANCH_URL', 'VERCEL_PROJECT_PRODUCTION_URL', 'CONTACT_ALLOWED_ORIGINS']) {
        if (savedEnv[key] === undefined) delete process.env[key];
        else process.env[key] = savedEnv[key];
      }
    });

    test('a produkcios domain ATMEGY (nem 403)', async () => {
      const req = createRequest({ name: 'John' }, { origin: 'https://www.pohankaestarsa.com' });
      const res = await POST(req);
      expect(res.status).not.toBe(403);
      expect(res.headers.get('access-control-allow-origin')).toBe('https://www.pohankaestarsa.com');
    });

    test('a csupasz produkcios domain is ATMEGY', async () => {
      const req = createRequest({ name: 'John' }, { origin: 'https://pohankaestarsa.com' });
      const res = await POST(req);
      expect(res.status).not.toBe(403);
    });

    test('a Vercel-ELONEZET sajat hosztneve ATMEGY', async () => {
      process.env.VERCEL_ENV = 'preview';
      process.env.VERCEL_URL = 'pohankaestarsa-abc123-brunellaagent.vercel.app';
      const req = createRequest({ name: 'John' }, { origin: 'https://pohankaestarsa-abc123-brunellaagent.vercel.app' });
      const res = await POST(req);
      expect(res.status).not.toBe(403);
      expect(res.headers.get('access-control-allow-origin')).toBe('https://pohankaestarsa-abc123-brunellaagent.vercel.app');
    });

    test('az ag-alias (VERCEL_BRANCH_URL) is ATMEGY', async () => {
      process.env.VERCEL_ENV = 'preview';
      process.env.VERCEL_BRANCH_URL = 'pohankaestarsa-git-cors-fix.vercel.app';
      const req = createRequest({ name: 'John' }, { origin: 'https://pohankaestarsa-git-cors-fix.vercel.app' });
      const res = await POST(req);
      expect(res.status).not.toBe(403);
    });

    test('Origin fejlec nelkul ATMEGY (nem bongeszo)', async () => {
      const req = createRequest({ name: 'John' });
      const res = await POST(req);
      expect(res.status).not.toBe(403);
    });

    test('IDEGEN origin ELUTASITVA', async () => {
      const req = createRequest({ name: 'John' }, { origin: 'https://evil.example' });
      const res = await POST(req);
      expect(res.status).toBe(403);
      expect((await res.json()).error).toBe('Forbidden');
    });

    test('IDEGEN vercel.app is ELUTASITVA (nem a teljes nevteret engedjuk)', async () => {
      process.env.VERCEL_ENV = 'preview';
      process.env.VERCEL_URL = 'pohankaestarsa-abc123-brunellaagent.vercel.app';
      const req = createRequest({ name: 'John' }, { origin: 'https://tamado-oldal.vercel.app' });
      const res = await POST(req);
      expect(res.status).toBe(403);
    });

    test('OPTIONS: jogos origin 204, idegen 403', async () => {
      const ok = await OPTIONS(new Request('http://localhost/api/contact', {
        method: 'OPTIONS',
        headers: { origin: 'https://www.pohankaestarsa.com' }
      }));
      expect(ok.status).toBe(204);
      expect(ok.headers.get('access-control-allow-origin')).toBe('https://www.pohankaestarsa.com');

      const bad = await OPTIONS(new Request('http://localhost/api/contact', {
        method: 'OPTIONS',
        headers: { origin: 'https://evil.example' }
      }));
      expect(bad.status).toBe(403);
    });
  });

  test('POST missing fields returns 400', async () => {
    const req = createRequest({ name: 'John' }); // Missing email and message
    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe('Missing fields');
  });

  test('POST input too long returns 400', async () => {
    const req = createRequest({
      name: 'a'.repeat(121), // > 120
      email: 'test@example.com',
      message: 'Hello!',
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe('Input too long');
  });

  test('POST invalid content-type returns 415', async () => {
    const req = createRequest('name=John&email=test@example.com&message=Hello', {
      'content-type': 'text/plain'
    });
    const res = await POST(req);
    expect(res.status).toBe(415);
    const data = await res.json();
    expect(data.error).toBe('Invalid content-type');
  });

  test('POST with honeypot returns 200 early', async () => {
    const req = createRequest({
      website: 'http://spam.com', // Honeypot field filled
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.ok).toBe(true);
  });

  test('POST rate limiting block', async () => {
    const ip = `10.0.0.${ipCounter + 1}`;

    let req = createRequest({ website: 'spam' }, { 'x-forwarded-for': ip });
    let res = await POST(req);
    expect(res.status).toBe(200);

    req = createRequest({ website: 'spam' }, { 'x-forwarded-for': ip });
    res = await POST(req);
    expect(res.status).toBe(200);

    req = createRequest({ website: 'spam' }, { 'x-forwarded-for': ip });
    res = await POST(req);
    expect(res.status).toBe(429);
    const data = await res.json();
    expect(data.error).toBe('Too many requests. Please try again shortly.');
    expect(res.headers.get('Retry-After')).toBeTruthy();
  });

  test('POST missing env vars for nodemailer returns 500', async () => {
    const originalHost = process.env.SMTP_HOST;
    delete process.env.SMTP_HOST;

    try {
      const req = createRequest({
        name: 'John',
        email: 'john@example.com',
        message: 'Hello!',
      });
      const res = await POST(req);
      expect(res.status).toBe(500);
      const data = await res.json();
      expect(data.error).toContain('Email service not configured');
    } finally {
      process.env.SMTP_HOST = originalHost;
    }
  });

  test('POST invalid SMTP_PORT returns 500', async () => {
    const originalHost = process.env.SMTP_HOST;
    const originalPort = process.env.SMTP_PORT;
    const originalUser = process.env.SMTP_USER;
    const originalPass = process.env.SMTP_PASS;

    process.env.SMTP_HOST = 'smtp.example.com';
    process.env.SMTP_PORT = 'invalid';
    process.env.SMTP_USER = 'user';
    process.env.SMTP_PASS = 'pass';

    try {
      const req = createRequest({
        name: 'John',
        email: 'john@example.com',
        message: 'Hello!',
      });
      const res = await POST(req);
      expect(res.status).toBe(500);
      const data = await res.json();
      expect(data.error).toBe('Invalid SMTP_PORT');
    } finally {
      process.env.SMTP_HOST = originalHost;
      process.env.SMTP_PORT = originalPort;
      process.env.SMTP_USER = originalUser;
      process.env.SMTP_PASS = originalPass;
    }
  });

  test('POST success handles expected path and uses nodemailer', async () => {
    const originalHost = process.env.SMTP_HOST;
    const originalPort = process.env.SMTP_PORT;
    const originalUser = process.env.SMTP_USER;
    const originalPass = process.env.SMTP_PASS;
    const originalTo = process.env.CONTACT_TO;
    const originalFrom = process.env.CONTACT_FROM;

    process.env.SMTP_HOST = 'smtp.example.com';
    process.env.SMTP_PORT = '587';
    process.env.SMTP_USER = 'user';
    process.env.SMTP_PASS = 'pass';
    process.env.CONTACT_TO = 'to@example.com';
    process.env.CONTACT_FROM = 'from@example.com';

    try {
      const req = createRequest({
        name: 'John',
        email: 'john@example.com',
        message: 'Hello!',
      });
      const res = await POST(req);
      const data = await res.json();

      expect(res.status).toBe(500);
      expect(data.error).toBe('Unexpected error');
    } finally {
      process.env.SMTP_HOST = originalHost;
      process.env.SMTP_PORT = originalPort;
      process.env.SMTP_USER = originalUser;
      process.env.SMTP_PASS = originalPass;
      process.env.CONTACT_TO = originalTo;
      process.env.CONTACT_FROM = originalFrom;
    }
  });
});
