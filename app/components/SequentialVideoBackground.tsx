'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';

const videos: Record<string, string> = {
  '/': '/home.mp4',
  '/szolgaltatasok': '/services.mp4',
  '/termekek': '/products.mp4',
  '/rolunk': '/about.mp4',
  '/portfolio': '/portfolio.mp4',
  '/blog': '/blog.mp4',
  '/kapcsolat': '/contact.mp4',
};

// Function to determine the correct video for a given path, handling sub-routes and locale prefixes (en/de)
const getVideoForPath = ( path: string ): string =>
{
  if ( path === '/' ) return videos['/'];
  const segments = path.split( '/' ).filter( Boolean );
  // Strip locale prefix if present (en, de)
  const first = segments[0];
  const isLocale = first === 'en' || first === 'de';
  const topLevelKey = '/' + ( isLocale && segments[1] ? segments[1] : first );
  return videos[topLevelKey] || videos['/']; // Default to homepage video if no match
};

const SequentialVideoBackground: React.FC = () =>
{
  const pathname = usePathname();
  const [activePlayer, setActivePlayer] = useState( 0 ); // 0 or 1
  const [videoError, setVideoError] = useState( false );
  const video0Ref = useRef<HTMLVideoElement>( null );
  const video1Ref = useRef<HTMLVideoElement>( null );

  // Function to switch video with cross-fade
  const switchVideo = useCallback( ( newSrc: string ) =>
  {
    const currentPlayerRef = activePlayer === 0 ? video0Ref : video1Ref;
    if ( currentPlayerRef.current && currentPlayerRef.current.src.endsWith( newSrc ) )
    {
      return; // Don't switch if the correct video is already playing
    }

    const inactivePlayer = 1 - activePlayer;
    const inactivePlayerRef = inactivePlayer === 0 ? video0Ref : video1Ref;

    if ( inactivePlayerRef.current )
    {
      inactivePlayerRef.current.src = newSrc;
      inactivePlayerRef.current.load();

      const playPromise = inactivePlayerRef.current.play();
      if ( playPromise !== undefined )
      {
        playPromise.catch( error =>
        {
          console.error( "Autoplay was prevented for new video:", error );
        } );
      }

      // The CSS transition will handle the fade
      setActivePlayer( inactivePlayer );
    }
  }, [activePlayer, video0Ref, video1Ref] );

  // Main effect to handle route changes
  useEffect( () =>
  {
    const targetVideo = getVideoForPath( pathname );
    switchVideo( targetVideo );
  }, [pathname, switchVideo] );

  // Set initial video source on component mount
  useEffect( () =>
  {
    const initialSrc = getVideoForPath( pathname );
    const currentRef = activePlayer === 0 ? video0Ref : video1Ref;
    if ( currentRef.current )
    {
      currentRef.current.src = initialSrc;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] );


  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
      { videoError ? (
        // Ha a videó nem érhető el → szép gradient CSS háttér (Tailwind arbitrary value)
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(59,130,246,0.30)_0%,transparent_60%),radial-gradient(ellipse_at_80%_80%,rgba(147,51,234,0.25)_0%,transparent_60%),linear-gradient(135deg,#050a14_0%,#0a1628_50%,#050a14_100%)]"
        />
      ) : (
        <>
          <video
            ref={ video0Ref }
            className={ `absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${ activePlayer === 0 ? 'opacity-100' : 'opacity-0' }` }
            autoPlay
            muted
            playsInline
            loop
            onError={ () => setVideoError( true ) }
          />
          <video
            ref={ video1Ref }
            className={ `absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${ activePlayer === 1 ? 'opacity-100' : 'opacity-0' }` }
            autoPlay
            muted
            playsInline
            loop
            onError={ () => setVideoError( true ) }
          />
        </>
      ) }
      <div className="absolute inset-0 bg-black/60"></div>
    </div>
  );
};

export default SequentialVideoBackground;
