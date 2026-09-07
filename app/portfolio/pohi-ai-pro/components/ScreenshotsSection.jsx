import React from 'react';
import GsapFadeIn from '../../../components/GsapFadeIn';
import ImageLightboxGallery from '../../../components/ImageLightboxGallery';
import { screenshots } from './data';

export default function ScreenshotsSection() {
  return (
    <section className="px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <GsapFadeIn>
          <h2 className="text-3xl font-bold mb-10 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Pohi AI Pro élesben
          </h2>
        </GsapFadeIn>
        <ImageLightboxGallery
          screenshots={screenshots.slice(1)}
          heroSrc="/images/pohi-ai-pro/pro-01.jpg"
          heroAlt="Pohi AI Pro"
          thumbAlt="Pohi AI Pro képernyőkép"
          accentColor="purple"
        />
      </div>
    </section>
  );
}
