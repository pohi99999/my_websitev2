with open("tests/instant-responder-demo.spec.ts", "r") as f:
    content = f.read()

import re

old = """    // Make 20 requests (the limit)
    for (let i = 0; i < 20; i++) {
      const req = createRequest({ message: 'Hello' });
      Object.defineProperty(req, 'headers', {
        value: new Headers({ 'x-forwarded-for': '192.168.1.1' }),
      });
      await POST(req as any);
    }"""

new = """    // Make 20 requests (the limit)
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
    }"""

content = content.replace(old, new)

with open("tests/instant-responder-demo.spec.ts", "w") as f:
    f.write(content)
