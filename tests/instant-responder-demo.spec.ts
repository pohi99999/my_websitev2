import { test, expect } from '@playwright/test';
import * as sinon from 'sinon';
import { POST } from '../app/api/instant-responder/demo/route';

test.describe('Instant Responder Demo API', () => {
  let fetchStub: sinon.SinonStub;

  test.beforeEach(() => {
    fetchStub = sinon.stub(global, 'fetch');
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

  test('POST handles request json parsing error', async () => {
    const req = new Request('http://localhost/api/instant-responder/demo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: 'invalid json', // This will cause req.json() to throw
    });

    // Create a mock request that throws on json()
    const mockReq = {
      json: async () => { throw new Error('Invalid JSON'); }
    };

    const res = await POST(mockReq as any);

    expect(res.status).toBe(500);
    const data = await res.json();
    expect(data.ok).toBe(false);
    expect(data.error).toBe('Internal Server Error');
  });


  test('POST uses custom N8N_WEBHOOK_URL from environment', async () => {
    const originalEnv = process.env.N8N_WEBHOOK_URL;
    process.env.N8N_WEBHOOK_URL = 'http://custom-url.com/webhook';

    const mockN8nResponse = { response: 'Sikeres válasz' };
    fetchStub.resolves({
      ok: true,
      json: async () => mockN8nResponse
    } as any);

    const req = createRequest({ message: 'Hello' });
    const res = await POST(req as any);

    expect(res.status).toBe(200);

    expect(fetchStub.calledOnce).toBe(true);
    const fetchArgs = fetchStub.firstCall.args;
    expect(fetchArgs[0]).toBe('http://custom-url.com/webhook');

    // Restore environment variable
    if (originalEnv === undefined) {
      delete process.env.N8N_WEBHOOK_URL;
    } else {
      process.env.N8N_WEBHOOK_URL = originalEnv;
    }
  });

});
