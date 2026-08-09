import { test, expect } from '@playwright/test';
import * as sinon from 'sinon';
import { POST } from '../app/api/instant-responder/demo/route';
import { rateMemory } from '../app/api/chat/rate-limiter';

test.describe('Instant Responder Demo API', () => {
  let fetchStub: sinon.SinonStub;

  test.beforeEach(() => {
    fetchStub = sinon.stub(global, 'fetch');
    rateMemory.clear();
  });

  test.afterEach(() => {
    fetchStub.restore();
  });

  function createRequest(body: any) {
    return new Request('http://localhost/api/instant-responder/demo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    });
  }

  test('POST success handles expected path and returns reply', async () => {
    const mockN8nResponse = { response: 'Sikeres válasz' };
    fetchStub.resolves({
      ok: true,
      json: async () => mockN8nResponse
    } as any);

    const req = createRequest({ message: 'Hello' });
    const res = await POST(req as any);

    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.ok).toBe(true);
    expect(data.reply).toBe('Sikeres válasz');

    expect(fetchStub.calledOnce).toBe(true);
    const fetchArgs = fetchStub.firstCall.args;
    expect(fetchArgs[1].method).toBe('POST');
    const body = JSON.parse(fetchArgs[1].body);
    expect(body.message).toBe('Hello');
    expect(body.tone).toBe('professzionális és udvarias');
    expect(body.source).toBe('website_demo');
  });

  test('POST uses provided tone', async () => {
    const mockN8nResponse = { response: 'Sikeres válasz' };
    fetchStub.resolves({
      ok: true,
      json: async () => mockN8nResponse
    } as any);

    const req = createRequest({ message: 'Hello', tone: 'barátságos' });
    const res = await POST(req as any);

    expect(res.status).toBe(200);

    const fetchArgs = fetchStub.firstCall.args;
    const body = JSON.parse(fetchArgs[1].body);
    expect(body.tone).toBe('barátságos');
  });

  test('POST handles n8n error response', async () => {
    fetchStub.resolves({
      ok: false,
      statusText: 'Bad Request'
    } as any);

    const req = createRequest({ message: 'Hello' });
    const res = await POST(req as any);

    expect(res.status).toBe(500);
    const data = await res.json();
    expect(data.ok).toBe(false);
    expect(data.error).toBe('Internal Server Error');
  });

  test('POST handles fetch exception', async () => {
    fetchStub.rejects(new Error('Network error'));

    const req = createRequest({ message: 'Hello' });
    const res = await POST(req as any);

    expect(res.status).toBe(500);
    const data = await res.json();
    expect(data.ok).toBe(false);
    expect(data.error).toBe('Internal Server Error');
  });

  test('POST handles missing response field in n8n response', async () => {
    const mockN8nResponse = { success: true };
    fetchStub.resolves({
      ok: true,
      json: async () => mockN8nResponse
    } as any);

    const req = createRequest({ message: 'Hello' });
    const res = await POST(req as any);

    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.ok).toBe(true);
    expect(data.reply).toBe('Hiba történt a válasz generálása során.');
  });

  test('POST applies rate limiting', async () => {
    // Make 20 requests (the limit)
    for (let i = 0; i < 20; i++) {
      const req = createRequest({ message: 'Hello' });
      Object.defineProperty(req, 'headers', {
        value: new Headers({ 'x-forwarded-for': '192.168.1.1' }),
      });
      fetchStub.resolves({
        ok: true,
        json: async () => ({ response: 'Sikeres válasz' })
      } as any);
      await POST(req as any);
    }

    // The 21st request should be rate limited
    const req = createRequest({ message: 'Hello' });
    Object.defineProperty(req, 'headers', {
      value: new Headers({ 'x-forwarded-for': '192.168.1.1' }),
    });
    const res = await POST(req as any);
    expect(res.status).toBe(429);
    const data = await res.json();
    expect(data.error).toBe('Too many requests. Please try again shortly.');
  });
});
