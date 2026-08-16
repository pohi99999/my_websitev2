const fs = require('fs');
const file = 'app/components/ThreeDScene.tsx';
let content = fs.readFileSync(file, 'utf8');

const search = `      if ( objectRef.current )
      {
        gsap.to( objectRef.current.rotation, {
          x: Math.PI * 2,
          y: Math.PI * 4,
          scrollTrigger: {
            trigger: mountRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        } );

        const servicesSection = document.querySelector( '#services-section' );
        if ( servicesSection )
        {
          gsap.to( objectRef.current.position, {
            x: 2,
            y: -1,
            z: 0,
            scrollTrigger: {
              trigger: servicesSection,
              start: 'top center',
              end: 'bottom center',
              scrub: true,
            },
          } );
        }

        killGsap = () =>
        {
          ScrollTrigger.getAll().forEach( ( t ) => t.kill() );
          gsap.killTweensOf( objectRef.current );
        };
      }`;

const replace = `      if ( objectRef.current )
      {
        const ctx = gsap.context(() => {
          gsap.to( objectRef.current!.rotation, {
            x: Math.PI * 2,
            y: Math.PI * 4,
            scrollTrigger: {
              trigger: mountRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          } );

          const servicesSection = document.querySelector( '#services-section' );
          if ( servicesSection )
          {
            gsap.to( objectRef.current!.position, {
              x: 2,
              y: -1,
              z: 0,
              scrollTrigger: {
                trigger: servicesSection,
                start: 'top center',
                end: 'bottom center',
                scrub: true,
              },
            } );
          }
        });

        killGsap = () =>
        {
          ctx.revert();
          // We can optionally keep gsap.killTweensOf(objectRef.current) just in case,
          // but ctx.revert() removes everything created in the context.
        };
      }`;

if (content.includes(search)) {
  content = content.replace(search, replace);
  fs.writeFileSync(file, content);
  console.log('Patched successfully.');
} else {
  console.error('Search string not found.');
}
