with open("tests/instant-responder-demo.spec.ts", "r") as f:
    content = f.read()

import re

old = """  test('POST applies rate limiting', async () => {
    const req = createRequest({ message: 'Hello' });
    Object.defineProperty(req, 'headers', {
      value: new Headers({ 'x-forwarded-for': '192.168.1.1' }),
    });

    // Make 20 requests (the limit)
    for (let i = 0; i < 20; i++) {
      await POST(req as any);
    }

    // The 21st request should be rate limited
    const res = await POST(req as any);"""

new = """  test('POST applies rate limiting', async () => {
    // Make 20 requests (the limit)
    for (let i = 0; i < 20; i++) {
      const req = createRequest({ message: 'Hello' });
      Object.defineProperty(req, 'headers', {
        value: new Headers({ 'x-forwarded-for': '192.168.1.1' }),
      });
      await POST(req as any);
    }

    // The 21st request should be rate limited
    const req = createRequest({ message: 'Hello' });
    Object.defineProperty(req, 'headers', {
      value: new Headers({ 'x-forwarded-for': '192.168.1.1' }),
    });
    const res = await POST(req as any);"""

content = content.replace(old, new)

with open("tests/instant-responder-demo.spec.ts", "w") as f:
    f.write(content)
