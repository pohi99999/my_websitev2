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
    });

    const req = createRequest({ message: 'Hello' });
    const res = await POST(req);

    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.ok).toBe(true);
    expect(data.reply).toBe('Sikeres válasz');

    // Verify fetch was called with correct arguments
    expect(fetchStub.calledOnce).toBe(true);
    const fetchArgs = fetchStub.firstCall.args;
    expect(fetchArgs[1].method).toBe('POST');
    const body = JSON.parse(fetchArgs[1].body);
    expect(body.message).toBe('Hello');
    expect(body.tone).toBe('professzionális és udvarias'); // default tone
    expect(body.source).toBe('website_demo');
  });

  test('POST uses provided tone', async () => {
    const mockN8nResponse = { response: 'Sikeres válasz' };
    fetchStub.resolves({
      ok: true,
      json: async () => mockN8nResponse
    });

    const req = createRequest({ message: 'Hello', tone: 'barátságos' });
    const res = await POST(req);

    expect(res.status).toBe(200);

    // Verify fetch was called with correct tone
    const fetchArgs = fetchStub.firstCall.args;
    const body = JSON.parse(fetchArgs[1].body);
    expect(body.tone).toBe('barátságos');
  });

  test('POST handles n8n error response', async () => {
    fetchStub.resolves({
      ok: false,
      statusText: 'Bad Request'
    });

    const req = createRequest({ message: 'Hello' });
    const res = await POST(req);

    expect(res.status).toBe(500);
    const data = await res.json();
    expect(data.ok).toBe(false);
    expect(data.error).toBe('Internal Server Error');
  });

  test('POST handles fetch exception', async () => {
    fetchStub.rejects(new Error('Network error'));

    const req = createRequest({ message: 'Hello' });
    const res = await POST(req);

    expect(res.status).toBe(500);
    const data = await res.json();
    expect(data.ok).toBe(false);
    expect(data.error).toBe('Internal Server Error');
  });

  test('POST handles missing response field in n8n response', async () => {
    // Missing 'response' field
    const mockN8nResponse = { success: true };
    fetchStub.resolves({
      ok: true,
      json: async () => mockN8nResponse
    });

    const req = createRequest({ message: 'Hello' });
    const res = await POST(req);

    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.ok).toBe(true);
    expect(data.reply).toBe('Hiba történt a válasz generálása során.');
  });
});
