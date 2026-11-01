// Sets every <lastmod> in public/sitemap.xml to the real date the page's content last changed, from
// git, not the build time (Marveen 5521, owner GO 11981, 2026-10-30).
//
//   node scripts/sitemap-lastmod.mjs          rewrite public/sitemap.xml
//   node scripts/sitemap-lastmod.mjs --check  exit 1 if any date is off (writes nothing)
//
// A page's date is the newest commit among its page file and the components it imports directly
// (UI wrappers excluded). /en and /de render the same components, so they get the Hungarian page's
// date. Blog posts all live in one file, so a post's date is the newest commit on ITS lines
// (git blame on the post body and on its meta entry). Run it after the content commit, then commit
// the sitemap.
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, normalize } from 'node:path';

const SITEMAP = 'public/sitemap.xml';
const BLOG_BODIES = 'app/blog/[slug]/page.jsx';
const BLOG_META = 'app/blog/blogPosts.meta.ts';
// Shared UI wrappers: a change there is not a content change of every page that uses them.
const NOT_CONTENT = new Set(['GsapFadeIn', 'SpotlightCard', 'SpotlightCardMotion']);
const EXTS = ['.tsx', '.ts', '.jsx', '.js'];

const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();

function resolveFile(base) {
  if (existsSync(base) && !base.endsWith('/')) {
    for (const ext of EXTS) if (base.endsWith(ext)) return base;
  }
  for (const ext of EXTS) if (existsSync(base + ext)) return base + ext;
  return null;
}

function pageFile(huPath) {
  const dir = huPath === '/' ? 'app' : join('app', huPath);
  return resolveFile(join(dir, 'page'));
}

function directImports(file) {
  const src = readFileSync(file, 'utf8');
  const out = [];
  for (const [, spec] of src.matchAll(/^import\s[^'"]*['"](\.[^'"]+)['"]/gm)) {
    const name = spec.split('/').pop();
    if (NOT_CONTENT.has(name)) continue;
    const resolved = resolveFile(normalize(join(dirname(file), spec)));
    if (resolved && resolved.startsWith('app/')) out.push(resolved);
  }
  return out;
}

function newestCommitDate(files) {
  return git('log', '-1', '--format=%cs', '--', ...files);
}

/** Line ranges [from, to] (1-based) of a post: its body block and its meta entry. */
function blogRanges(slug) {
  const ranges = [];
  const bodies = readFileSync(BLOG_BODIES, 'utf8').split('\n');
  const starts = bodies.map((l, i) => (/^ {2}'[a-z0-9-]+': \{/.test(l) ? i : -1)).filter((i) => i >= 0);
  const at = bodies.findIndex((l) => l.startsWith(`  '${slug}': {`));
  if (at >= 0) {
    const next = starts.find((i) => i > at) ?? bodies.findIndex((l, i) => i > at && l.startsWith('};'));
    ranges.push([BLOG_BODIES, at + 1, next]);
  }
  const meta = readFileSync(BLOG_META, 'utf8').split('\n');
  const metaStarts = meta.map((l, i) => (/^\s+slug: '/.test(l) ? i : -1)).filter((i) => i >= 0);
  const m = meta.findIndex((l) => l.includes(`slug: '${slug}'`));
  if (m >= 0) {
    const next = metaStarts.find((i) => i > m) ?? meta.length;
    ranges.push([BLOG_META, m + 1, next - 1]);
  }
  return ranges;
}

function blogDate(slug) {
  let newest = 0;
  for (const [file, from, to] of blogRanges(slug)) {
    const blame = git('blame', '--line-porcelain', '-L', `${from},${to}`, '--', file);
    for (const [, t] of blame.matchAll(/^committer-time (\d+)$/gm)) newest = Math.max(newest, Number(t));
  }
  if (!newest) return null;
  return new Date(newest * 1000).toLocaleDateString('sv-SE', { timeZone: 'Europe/Budapest' });
}

function lastmodFor(loc) {
  const path = new URL(loc).pathname.replace(/\/$/, '') || '/';
  const hu = path.replace(/^\/(en|de)(?=\/|$)/, '') || '/';
  const post = hu.match(/^\/blog\/([a-z0-9-]+)$/);
  if (post) return blogDate(post[1]);
  const page = pageFile(hu);
  if (!page) return null;
  return newestCommitDate([page, ...directImports(page)]);
}

const check = process.argv.includes('--check');
const xml = readFileSync(SITEMAP, 'utf8');
const changes = [];
const missing = [];
const updated = xml.replace(/<url>([\s\S]*?)<\/url>/g, (block, inner) => {
  const loc = inner.match(/<loc>(.*?)<\/loc>/)[1];
  const date = lastmodFor(loc);
  if (!date) {
    missing.push(loc);
    return block;
  }
  const old = inner.match(/<lastmod>(.*?)<\/lastmod>/)?.[1];
  if (old !== date) changes.push(`${old ?? '-'} -> ${date}  ${loc}`);
  return block.replace(/<lastmod>.*?<\/lastmod>/, `<lastmod>${date}</lastmod>`);
});

for (const line of changes) console.log(line);
for (const loc of missing) console.error(`no source found, left as is: ${loc}`);
console.log(`${changes.length} lastmod changed, ${missing.length} without a source`);
if (check) process.exit(changes.length || missing.length ? 1 : 0);
writeFileSync(SITEMAP, updated);
