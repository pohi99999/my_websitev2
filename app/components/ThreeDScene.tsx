"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ThreeDSceneProps {
  className?: string;
}

const ThreeDScene: React.FC<ThreeDSceneProps> = ({ className }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const objectRef = useRef<THREE.Mesh | null>(null); // A 3D objektum, amit animálni fogunk

  const [isMounted, setIsMounted] = useState(false);

  // Jelenet inicializálása
  const initScene = useCallback(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Jelenet
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Kamera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderelő
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Fény
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // 3D Objektum (pl. egy kocka)
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff9d, transparent: true, opacity: 0.8 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    objectRef.current = cube;

    // Animációs ciklus
    const animate = () => {
      requestAnimationFrame(animate);
      if (objectRef.current) {
        // Alap rotáció, ha nincs GSAP vezérlés
        // objectRef.current.rotation.x += 0.005;
        // objectRef.current.rotation.y += 0.005;
      }
      renderer.render(scene, camera);
    };
    animate();

    // Ablak átméretezés kezelése
    const handleResize = () => {
      if (mountRef.current && cameraRef.current && rendererRef.current) {
        const newWidth = mountRef.current.clientWidth;
        const newHeight = mountRef.current.clientHeight;
        cameraRef.current.aspect = newWidth / newHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(newWidth, newHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && rendererRef.current.domElement) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // Fontos: GSAP triggerek törlése
    };
  }, []);

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
      initScene();
    }
  }, [isMounted, initScene]);

  // GSAP ScrollTrigger integráció
  useEffect(() => {
    if (isMounted && objectRef.current) {
      // Példa: Objektum rotációja görgetésre
      gsap.to(objectRef.current.rotation, {
        x: Math.PI * 2, // Egy teljes fordulat
        y: Math.PI * 4, // Két teljes fordulat
        scrollTrigger: {
          trigger: mountRef.current, // Melyik elem görgetésére reagáljon
          start: "top top", // Mikor induljon az animáció
          end: "bottom top", // Mikor fejeződjön be
          scrub: true, // Görgetéshez szinkronizált animáció
          // markers: true, // Hibakereséshez
        }
      });

      // Példa: Objektum pozíciójának változtatása egy másik szekció görgetésére
      // Feltételezve, hogy van egy #services-section az oldalon
      const servicesSection = document.querySelector('#services-section');
      if (servicesSection) {
        gsap.to(objectRef.current.position, {
          x: 2,
          y: -1,
          z: 0,
          scrollTrigger: {
            trigger: servicesSection,
            start: "top center",
            end: "bottom center",
            scrub: true,
            // markers: true,
          }
        });
      }
    }
  }, [isMounted]);

  return (
    <div ref={mountRef} className={`absolute inset-0 z-0 ${className}`}>
      {/* A three.js canvas ide kerül */}
    </div>
  );
};

export default ThreeDScene;
