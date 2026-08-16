import { test, expect } from '@playwright/test';

test('benchmark array cleanup', async ({ page }) => {
  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js"></script>
    </head>
    <body>
      <div id="dummy"></div>
      <script>
        window.runBenchmark = async () => {
          gsap.registerPlugin(ScrollTrigger);
          const dummy = document.getElementById('dummy');

          // Create 10000 background triggers
          for (let i = 0; i < 10000; i++) {
            ScrollTrigger.create({ trigger: dummy, start: 'top top' });
          }

          // Component creates 2
          const t1 = ScrollTrigger.create({ trigger: dummy, start: 'top top' });
          const t2 = ScrollTrigger.create({ trigger: dummy, start: 'top top' });

          const startOld = performance.now();
          ScrollTrigger.getAll().forEach(t => t.kill());
          const endOld = performance.now();

          const oldTime = endOld - startOld;

          // Re-create background
          for (let i = 0; i < 10000; i++) {
            ScrollTrigger.create({ trigger: dummy, start: 'top top' });
          }

          const t3 = ScrollTrigger.create({ trigger: dummy, start: 'top top' });
          const t4 = ScrollTrigger.create({ trigger: dummy, start: 'top top' });
          const myTriggers = [t3, t4];

          const startNew = performance.now();
          myTriggers.forEach(t => t.kill());
          const endNew = performance.now();

          const newTime = endNew - startNew;

          return { oldTime, newTime };
        };
      </script>
    </body>
    </html>
  `);

  const result = await page.evaluate(() => window.runBenchmark());
  console.log('--- BENCHMARK 2 RESULTS ---');
  console.log(`Old behavior (kill all): ${result.oldTime.toFixed(2)} ms`);
  console.log(`New behavior (array kill): ${result.newTime.toFixed(2)} ms`);
  console.log(`Improvement: ${(result.oldTime / result.newTime).toFixed(2)}x faster`);
  console.log('-------------------------');
});
