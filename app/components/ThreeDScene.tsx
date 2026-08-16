"use client";

// Three.js and GSAP are loaded lazily inside useEffect to keep the initial
// JS bundle small. Heavy 3-D assets are only fetched when the component
// actually mounts in the browser — zero impact on first paint or SSR.
import React, { useRef, useEffect, useState, useCallback } from 'react';
import type * as THREE from 'three';

interface ThreeDSceneProps
{
  className?: string;
}

const ThreeDScene: React.FC<ThreeDSceneProps> = ( { className } ) =>
{
  const mountRef = useRef<HTMLDivElement>( null );
  const sceneRef = useRef<THREE.Scene | null>( null );
  const cameraRef = useRef<THREE.PerspectiveCamera | null>( null );
  const rendererRef = useRef<THREE.WebGLRenderer | null>( null );
  const objectRef = useRef<THREE.Mesh | null>( null ); // A 3D objektum

  const [isMounted, setIsMounted] = useState( false );

  // Jelenet inicializálása — Three.js is imported dynamically here
  const initScene = useCallback( async () =>
  {
    if ( !mountRef.current ) return undefined;

    // Lazy-load Three.js (heavy library — not needed in SSR or on first paint)
    const THREE = await import( 'three' );

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Jelenet
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Kamera
    const camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderelő
    const renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
    renderer.setSize( width, height );
    renderer.setPixelRatio( window.devicePixelRatio );
    mountRef.current.appendChild( renderer.domElement );
    rendererRef.current = renderer;

    // Fény
    const ambientLight = new THREE.AmbientLight( 0xffffff, 0.5 );
    scene.add( ambientLight );
    const pointLight = new THREE.PointLight( 0xffffff, 1 );
    pointLight.position.set( 5, 5, 5 );
    scene.add( pointLight );

    // 3D Objektum (holografikus kocka)
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshStandardMaterial( { color: 0x00e5ff, transparent: true, opacity: 0.8 } );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    objectRef.current = cube;

    // Animációs ciklus
    const animate = () =>
    {
      requestAnimationFrame( animate );
      renderer.render( scene, camera );
    };
    animate();

    // Ablak átméretezés kezelése
    const handleResize = () =>
    {
      if ( mountRef.current && cameraRef.current && rendererRef.current )
      {
        const newWidth = mountRef.current.clientWidth;
        const newHeight = mountRef.current.clientHeight;
        cameraRef.current.aspect = newWidth / newHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize( newWidth, newHeight );
      }
    };
    window.addEventListener( 'resize', handleResize );

    // Return cleanup function
    return () =>
    {
      window.removeEventListener( 'resize', handleResize );
      if ( rendererRef.current?.domElement && mountRef.current?.contains( rendererRef.current.domElement ) )
      {
        mountRef.current.removeChild( rendererRef.current.domElement );
      }
      renderer.dispose();
    };
  }, [] );

  useEffect( () =>
  {
    if ( isMounted ) return;
    setIsMounted( true );

    let cleanup: ( () => void ) | undefined;
    initScene().then( ( cleanupFn ) =>
    {
      cleanup = cleanupFn;
    } );

    return () =>
    {
      cleanup?.();
    };
  }, [isMounted, initScene] );

  // GSAP ScrollTrigger integráció — GSAP is also imported dynamically
  useEffect( () =>
  {
    if ( !isMounted || !objectRef.current ) return;

    let isCancelled = false;
    let killGsap: ( () => void ) | undefined;

    ( async () =>
    {
      // Lazy-load GSAP and ScrollTrigger plugin
      const { gsap } = await import( 'gsap' );
      const { ScrollTrigger } = await import( 'gsap/ScrollTrigger' );
      if ( isCancelled ) return;

      gsap.registerPlugin( ScrollTrigger );

      if ( objectRef.current )
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
        };
      }
    } )();

    return () =>
    {
      isCancelled = true;
      killGsap?.();
    };
  }, [isMounted] );

  return (
    <div ref={ mountRef } className={ `absolute inset-0 z-0 ${ className }` }>
      {/* Three.js canvas is injected here at runtime after lazy load */ }
    </div>
  );
};

export default ThreeDScene;
