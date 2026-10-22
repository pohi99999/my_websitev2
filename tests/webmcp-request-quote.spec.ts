import { test, expect } from '@playwright/test';
import { POST, rateMemory } from '../app/api/contact/route';
import { buildContactPayload } from '../app/lib/quoteRequest';
import {
  REQUEST_QUOTE_INPUT_SCHEMA,
  REQUEST_QUOTE_TOOL_NAME,
  getModelContext,
  registerRequestQuoteTool,
} from '../app/lib/webmcp/requestQuoteTool';

// A kiserleti WebMCP request_quote eszkoz egysegtesztjei (Node, bongeszo nelkul).
// Minden teszt-payload [TESZT] jelolesu. Valodi email NEM mehet ki: az SMTP_*
// valtozokat a teszt idejere toroljuk, igy a route legrosszabb esetben is
// "Email service not configured" 500-zal all meg, mielott barmit kuldene.

const VALID_INPUT = {
  name: '[TESZT] WebMCP Teszt Elek',
  email: 'teszt@example.com',
  need: 'accounting',
  business: '[TESZT] automata teszt, ne valaszolj',
};

type RegisteredTool = { name: string; description: string; inputSchema: unknown; execute: Function; annotations?: unknown };

function mockModelContext() {
  const active: RegisteredTool[] = [];
  const modelContext = {
    registerTool: async (tool: RegisteredTool, options?: { signal?: AbortSignal }) => {
      active.push(tool);
      options?.signal?.addEventListener('abort', () => {
        const index = active.indexOf(tool);
        if (index >= 0) active.splice(index, 1);
      });
    },
  };
  return { modelContext: modelContext as unknown as WebMCP.ModelContext, active };
}

function fetchStub(status: number, body: unknown) {
  const calls: { url: string; init: RequestInit }[] = [];
  const impl = (async (url: string, init: RequestInit) => {
    calls.push({ url, init });
    return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });
  }) as unknown as typeof fetch;
  return { impl, calls };
}

// A valodi /api/contact POST handlert hivja, ugy ahogy a bongeszo tenne.
function fetchViaRealRoute(origin: string, ip: string) {
  const calls: string[] = [];
  const impl = (async (url: string, init: RequestInit) => {
    calls.push(url);
    const headers = new Headers(init.headers);
    headers.set('origin', origin);
    headers.set('x-forwarded-for', ip);
    return POST(new Request(`http://localhost${ url }`, { method: init.method, headers, body: init.body }));
  }) as unknown as typeof fetch;
  return { impl, calls };
}

const confirmYes = async () => true;
const confirmNo = async () => false;

test.describe('WebMCP request_quote tool (unit)', () => {
  const SMTP_KEYS = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS'];
  const saved: Record<string, string | undefined> = {};

  test.beforeAll(() => {
    for (const key of SMTP_KEYS) {
      saved[key] = process.env[key];
      delete process.env[key];
    }
  });

  test.afterAll(() => {
    for (const key of SMTP_KEYS) {
      if (saved[key] === undefined) delete process.env[key];
      else process.env[key] = saved[key];
    }
  });

  test('(a) without document.modelContext nothing is registered', () => {
    expect(getModelContext(undefined)).toBeUndefined();
    expect(getModelContext({} as Document)).toBeUndefined();
    expect(registerRequestQuoteTool({ getLanguage: () => 'hu', confirm: confirmYes }, undefined)).toBeNull();
  });

  test('(b) with a mocked document.modelContext exactly one tool is registered with the expected schema', () => {
    const { modelContext, active } = mockModelContext();
    const unregister = registerRequestQuoteTool({ getLanguage: () => 'hu', confirm: confirmYes }, modelContext);

    expect(active).toHaveLength(1);
    const tool = active[0];
    expect(tool.name).toBe(REQUEST_QUOTE_TOOL_NAME);
    expect(tool.description).toContain('HU:');
    expect(tool.description).toContain('EN:');
    expect(tool.annotations).toEqual({ readOnlyHint: false, consequentialHint: true });
    expect(tool.inputSchema).toEqual({
      type: 'object',
      properties: {
        name: expect.objectContaining({ type: 'string', minLength: 1, maxLength: 120 }),
        email: expect.objectContaining({ type: 'string', format: 'email', maxLength: 200 }),
        need: expect.objectContaining({ type: 'string', enum: ['lead', 'accounting', 'support', 'other'] }),
        business: expect.objectContaining({ type: 'string', maxLength: 1000 }),
      },
      required: ['name', 'email', 'need'],
      additionalProperties: false,
    });
    expect(tool.inputSchema).toEqual(REQUEST_QUOTE_INPUT_SCHEMA);

    unregister?.();
    expect(active).toHaveLength(0);
  });

  test('(c) execute posts the validated payload to /api/contact, exactly like the form', async () => {
    const { modelContext, active } = mockModelContext();
    const stub = fetchStub(200, { ok: true });
    registerRequestQuoteTool({ getLanguage: () => 'hu', confirm: confirmYes, fetchImpl: stub.impl }, modelContext);

    const result = await active[0].execute({ ...VALID_INPUT, name: `  ${ VALID_INPUT.name }  ` }, { signal: new AbortController().signal });

    expect(result.isError).toBeUndefined();
    expect(stub.calls).toHaveLength(1);
    expect(stub.calls[0].url).toBe('/api/contact');
    expect(stub.calls[0].init.method).toBe('POST');
    expect(new Headers(stub.calls[0].init.headers).get('content-type')).toBe('application/json');
    expect(JSON.parse(String(stub.calls[0].init.body))).toEqual(
      buildContactPayload('hu', { name: VALID_INPUT.name, email: VALID_INPUT.email, need: 'accounting', business: VALID_INPUT.business })
    );
    expect(JSON.parse(String(stub.calls[0].init.body)).website).toBe('');
  });

  test('(c) invalid input is rejected with readable errors, before confirmation and without any request', async () => {
    const { modelContext, active } = mockModelContext();
    const stub = fetchStub(200, { ok: true });
    let confirmCalls = 0;
    registerRequestQuoteTool(
      { getLanguage: () => 'hu', confirm: async () => { confirmCalls++; return true; }, fetchImpl: stub.impl },
      modelContext
    );

    const result = await active[0].execute(
      { name: '   ', email: 'nem-email', need: 'bitcoin', business: 'x'.repeat(1001) },
      { signal: new AbortController().signal }
    );

    expect(result.isError).toBe(true);
    const text = result.content[0].text as string;
    expect(text).toContain('name:');
    expect(text).toContain('email:');
    expect(text).toContain('need:');
    expect(text).toContain('business:');
    expect(confirmCalls).toBe(0);
    expect(stub.calls).toHaveLength(0);
  });

  test('(c) server-side errors from /api/contact are surfaced to the agent', async () => {
    const { modelContext, active } = mockModelContext();
    const stub = fetchStub(400, { ok: false, error: 'Missing fields' });
    registerRequestQuoteTool({ getLanguage: () => 'en', confirm: confirmYes, fetchImpl: stub.impl }, modelContext);

    const result = await active[0].execute(VALID_INPUT, { signal: new AbortController().signal });
    expect(result.isError).toBe(true);
    expect(result.content[0].text).toContain('HTTP 400');
    expect(result.content[0].text).toContain('Missing fields');
  });

  test('(c) the real route Origin check still applies to tool submissions', async () => {
    const { modelContext, active } = mockModelContext();
    const viaRoute = fetchViaRealRoute('https://evil.example', '10.77.0.1');
    registerRequestQuoteTool({ getLanguage: () => 'hu', confirm: confirmYes, fetchImpl: viaRoute.impl }, modelContext);

    const result = await active[0].execute(VALID_INPUT, { signal: new AbortController().signal });
    expect(viaRoute.calls).toEqual(['/api/contact']);
    expect(result.isError).toBe(true);
    expect(result.content[0].text).toContain('HTTP 403');
  });

  test('(c) the real route rate limit still applies to tool submissions', async () => {
    const ip = '10.77.0.2';
    const key = `contact:burst:ip:${ ip }`;
    rateMemory.set(key, { count: 2, resetAtMs: Date.now() + 60_000 });
    try {
      const { modelContext, active } = mockModelContext();
      const viaRoute = fetchViaRealRoute('https://www.pohankaestarsa.com', ip);
      registerRequestQuoteTool({ getLanguage: () => 'hu', confirm: confirmYes, fetchImpl: viaRoute.impl }, modelContext);

      const result = await active[0].execute(VALID_INPUT, { signal: new AbortController().signal });
      expect(result.isError).toBe(true);
      expect(result.content[0].text).toContain('HTTP 429');
    } finally {
      rateMemory.delete(key);
    }
  });

  test('(d) nothing is submitted when the user declines the confirmation', async () => {
    const { modelContext, active } = mockModelContext();
    const stub = fetchStub(200, { ok: true });
    registerRequestQuoteTool({ getLanguage: () => 'hu', confirm: confirmNo, fetchImpl: stub.impl }, modelContext);

    const result = await active[0].execute(VALID_INPUT, { signal: new AbortController().signal });
    expect(result.isError).toBe(true);
    expect(stub.calls).toHaveLength(0);
  });

  test('(d) nothing is submitted before the confirmation resolves, nor when the agent aborts', async () => {
    const { modelContext, active } = mockModelContext();
    const stub = fetchStub(200, { ok: true });
    let resolveConfirm: (value: boolean) => void = () => {};
    registerRequestQuoteTool(
      {
        getLanguage: () => 'hu',
        confirm: (_data, signal) => new Promise((resolve) => {
          resolveConfirm = resolve;
          signal.addEventListener('abort', () => resolve(false));
        }),
        fetchImpl: stub.impl,
      },
      modelContext
    );

    const controller = new AbortController();
    const running = active[0].execute(VALID_INPUT, { signal: controller.signal });
    await new Promise((r) => setTimeout(r, 50));
    expect(stub.calls).toHaveLength(0);

    controller.abort();
    const result = await running;
    expect(result.isError).toBe(true);
    expect(stub.calls).toHaveLength(0);
    resolveConfirm(true); // egy keso jovahagyas sem kuldhet mar
    await new Promise((r) => setTimeout(r, 20));
    expect(stub.calls).toHaveLength(0);
  });
});
