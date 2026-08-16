const { performance } = require('perf_hooks');

async function run() {
  // Polyfill window and document
  global.window = {};
  global.document = {
    createElement: () => ({ style: {} }),
    querySelector: () => null,
  };
  global.navigator = { userAgent: 'node' };

  const { gsap } = await import('gsap');
  const { ScrollTrigger } = await import('gsap/ScrollTrigger.js');
  gsap.registerPlugin(ScrollTrigger);

  const dummyElement = { nodeType: 1, style: {}, addEventListener: () => {}, removeEventListener: () => {} };

  for (let i = 0; i < 10000; i++) {
    ScrollTrigger.create({
      trigger: dummyElement,
      start: 'top top',
      end: 'bottom bottom'
    });
  }

  ScrollTrigger.create({ trigger: dummyElement, start: 'top top' });
  ScrollTrigger.create({ trigger: dummyElement, start: 'top top' });

  const startOld = performance.now();
  ScrollTrigger.getAll().forEach(t => t.kill());
  const endOld = performance.now();

  console.log(`Old behavior (kill all ${10002} triggers) took: ${endOld - startOld} ms`);

  for (let i = 0; i < 10000; i++) {
    ScrollTrigger.create({
      trigger: dummyElement,
      start: 'top top',
      end: 'bottom bottom'
    });
  }

  const t1 = ScrollTrigger.create({ trigger: dummyElement, start: 'top top' });
  const t2 = ScrollTrigger.create({ trigger: dummyElement, start: 'top top' });

  const myTriggers = [t1, t2];

  const startNew = performance.now();
  myTriggers.forEach(t => t.kill());
  const endNew = performance.now();

  console.log(`New behavior (kill 2 triggers) took: ${endNew - startNew} ms`);
}

run();
