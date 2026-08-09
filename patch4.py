with open("app/api/instant-responder/demo/route.ts", "r") as f:
    content = f.read()

old = """function getClientIp(req: NextRequest | Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]?.trim() ?? 'unknown';
  return req.headers.get('x-real-ip') ?? 'unknown';
}

export async function POST(req: NextRequest | Request) {"""

new = """function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]?.trim() ?? 'unknown';
  return req.headers.get('x-real-ip') ?? 'unknown';
}

export async function POST(req: Request) {"""

content = content.replace(old, new)
content = content.replace("import { NextRequest, NextResponse } from 'next/server';", "import { NextResponse } from 'next/server';")

with open("app/api/instant-responder/demo/route.ts", "w") as f:
    f.write(content)
