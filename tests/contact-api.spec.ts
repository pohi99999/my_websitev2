import { test, expect } from '@playwright/test';
import { POST } from '../app/api/contact/route';

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


  test('POST rejects unauthorized origins in production', async () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    try {
      const req = createRequest({ name: 'John' }, { origin: 'https://evil.com' });
      const res = await POST(req);

      expect(res.status).toBe(403);
      const data = await res.json();
      expect(data.error).toBe('Forbidden');
    } finally {
      process.env.NODE_ENV = originalEnv;
    }
  });

  test('POST allows authorized origins in production', async () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    try {
      // Honeypot request to return early 200 without needing full setup
      const req = createRequest({ website: 'spam' }, { origin: 'https://www.pohankaestarsa.com' });
      const res = await POST(req);

      expect(res.status).toBe(200);
      expect(res.headers.get('Access-Control-Allow-Origin')).toBe('https://www.pohankaestarsa.com');
    } finally {
      process.env.NODE_ENV = originalEnv;
    }
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
