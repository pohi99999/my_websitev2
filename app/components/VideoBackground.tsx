
'use client';

import React from 'react';

interface VideoBackgroundProps {
  src: string;
  className?: string;
}

/**
 * Renders a full-screen, looping video as a background with a dark overlay.
 * This component is designed to create an immersive and dynamic visual atmosphere.
 *
 * @param {VideoBackgroundProps} props - The component props.
 * @param {string} props.src - The URL of the video file to be used as the background.
 * @param {string} [props.className=''] - Additional Tailwind CSS classes to apply to the container div.
 * @returns {JSX.Element} The rendered video background component.
 */
const VideoBackground: React.FC<VideoBackgroundProps> = ({ src, className }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <video
        className="absolute top-1/2 left-1/2 w-full h-full object-cover -translate-x-1/2 -translate-y-1/2"
        src={src}
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-black opacity-50"></div> {/* Sötét overlay */}
    </div>
  );
};

export default VideoBackground;
