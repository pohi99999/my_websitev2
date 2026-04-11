'use client';

import dynamic from 'next/dynamic';

const MobileCTA = dynamic(() => import('./MobileCTA'), { ssr: false });
const SequentialVideoBackground = dynamic(() => import('./SequentialVideoBackground'), { ssr: false });

export default function DeferredLayoutEnhancements() {
  return (
    <>
      <SequentialVideoBackground />
      <MobileCTA />
    </>
  );
}
