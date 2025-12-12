'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';

const videos = {
  '/': '/0.mp4',
  '/szolgaltatasok': '/1.mp4',
  '/termekek': '/2.mp4',
  '/rolunk': '/3.mp4',
  '/portfolio': '/4.mp4',
  '/blog': '/5.mp4',
  '/kapcsolat': '/1.mp4', // Placeholder, as 6.mp4 is not available
};

// Function to determine the correct video for a given path, handling sub-routes
const getVideoForPath = (path: string): string => {
  if (path === '/') return videos['/'];
  const topLevelPath = '/' + path.split('/')[1];
  return videos[topLevelPath] || videos['/']; // Default to homepage video if no match
};

const SequentialVideoBackground: React.FC = () => {
  const pathname = usePathname();
  const [activePlayer, setActivePlayer] = useState(0); // 0 or 1
  const video0Ref = useRef<HTMLVideoElement>(null);
  const video1Ref = useRef<HTMLVideoElement>(null);

  // Function to switch video with cross-fade
  const switchVideo = useCallback((newSrc: string) => {
    const currentPlayerRef = activePlayer === 0 ? video0Ref : video1Ref;
    if (currentPlayerRef.current && currentPlayerRef.current.src.endsWith(newSrc)) {
      return; // Don't switch if the correct video is already playing
    }

    const inactivePlayer = 1 - activePlayer;
    const inactivePlayerRef = inactivePlayer === 0 ? video0Ref : video1Ref;

    if (inactivePlayerRef.current) {
      inactivePlayerRef.current.src = newSrc;
      inactivePlayerRef.current.load();

      const playPromise = inactivePlayerRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Autoplay was prevented for new video:", error);
        });
      }
      
      // The CSS transition will handle the fade
      setActivePlayer(inactivePlayer);
    }
  }, [activePlayer, video0Ref, video1Ref]);

  // Main effect to handle route changes
  useEffect(() => {
    const targetVideo = getVideoForPath(pathname);
    switchVideo(targetVideo);
  }, [pathname, switchVideo]);
  
  // Set initial video source on component mount
  useEffect(() => {
    const initialSrc = getVideoForPath(pathname);
    const currentRef = activePlayer === 0 ? video0Ref : video1Ref;
    if (currentRef.current) {
      currentRef.current.src = initialSrc;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
      <video
        ref={video0Ref}
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${activePlayer === 0 ? 'opacity-100' : 'opacity-0'}`}
        autoPlay
        muted
        playsInline
        loop
      />
      <video
        ref={video1Ref}
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${activePlayer === 1 ? 'opacity-100' : 'opacity-0'}`}
        autoPlay
        muted
        playsInline
        loop
      />
      <div className="absolute inset-0 bg-black/60"></div>
    </div>
  );
};

export default SequentialVideoBackground;
