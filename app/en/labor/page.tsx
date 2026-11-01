// /en/labor and /de/labor as their own routes, not cases of the [[...slug]] catch-all: the catch-all
// is also the /en and /de homepage, and importing this page there put its client components into that
// homepage's JS (measured: +4 KB). The middleware sets x-site-language from the path, so the shared
// page answers in the right language.
export { default, generateMetadata } from '../../labor/page';
