import { cache } from 'react';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeSanitize, { defaultSchema, type Options } from 'rehype-sanitize';
import rehypeExternalLinks from 'rehype-external-links';

const schema: Options = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    a: [
      ...(defaultSchema.attributes?.a ?? []),
      ['target', '_blank'],
      ['rel', 'noopener noreferrer', 'noopener', 'noreferrer']
    ]
  }
};

export const renderMarkdownToHtml = cache(async (markdown: string) => {
  const file = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] })
    .use(rehypeSanitize, schema)
    .use(rehypeStringify)
    .process(markdown);

  return String(file);
});
