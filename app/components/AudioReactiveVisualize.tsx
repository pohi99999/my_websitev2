'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function AudioReactive() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const initAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(stream);
      
      analyser.fftSize = 256;
      source.connect(analyser);
      
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      dataArrayRef.current = dataArray;
      
      setHasPermission(true);
      setIsListening(true);
      animate();
    } catch (error) {
      console.log('Microphone access denied or not available');
      setHasPermission(false);
      startDemoMode();
    }
  };

  const startDemoMode = () => {
    setIsListening(true);
    animateDemo();
  };

  const animate = () => {
    if (!analyserRef.current || !dataArrayRef.current || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    analyserRef.current.getByteFrequencyData(dataArrayRef.current);
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const bufferLength = dataArrayRef.current.length;
    const barWidth = canvas.width / bufferLength * 2;
    let x = 0;
    
    for (let i = 0; i < bufferLength; i++) {
      const barHeight = (dataArrayRef.current[i] / 255) * canvas.height * 0.8;
      
      const hue = (i / bufferLength) * 360;
      const saturation = 70;
      const lightness = 50 + (dataArrayRef.current[i] / 255) * 30;
      
      ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      ctx.shadowColor = ctx.fillStyle;
      ctx.shadowBlur = 20;
      
      ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
      
      x += barWidth + 2;
    }
    
    animationRef.current = requestAnimationFrame(animate);
  };

  const animateDemo = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const barCount = 64;
    const barWidth = canvas.width / barCount;
    const time = Date.now() * 0.001;
    
    for (let i = 0; i < barCount; i++) {
      const frequency = i * 0.1;
      const amplitude = Math.sin(time * 2 + frequency) * 0.5 + 0.5;
      const barHeight = amplitude * canvas.height * 0.8;
      
      const hue = (i / barCount) * 360 + time * 30;
      const saturation = 70;
      const lightness = 50 + amplitude * 30;
      
      ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      ctx.shadowColor = ctx.fillStyle;
      ctx.shadowBlur = 15;
      
      ctx.fillRect(i * barWidth, canvas.height - barHeight, barWidth - 2, barHeight);
    }
    
    animationRef.current = requestAnimationFrame(animateDemo);
  };

  const toggleAudio = () => {
    if (!isListening) {
      initAudio();
    } else {
      setIsListening(false);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    }
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <motion.div 
      className="fixed bottom-4 right-4 z-50"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-black/80 backdrop-blur-md rounded-lg p-4 border border-cyan-500/30">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={toggleAudio}
            className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/50 rounded text-cyan-400 hover:bg-cyan-500/30 transition-colors text-sm"
          >
            {isListening ? 'Stop' : 'Start'} Audio
          </button>
          <span className="text-cyan-400 text-xs">
            {hasPermission === false ? 'Demo Mode' : isListening ? 'Listening...' : 'Stopped'}
          </span>
        </div>
        
        <canvas
          ref={canvasRef}
          className="w-48 h-16 bg-black/50 rounded border border-cyan-500/20"
        />
        
        {hasPermission === false && (
          <p className="text-xs text-cyan-400/70 mt-2 max-w-48">
            Enable microphone for audio visualization or enjoy demo mode
          </p>
        )}
      </div>
    </motion.div>
  );
}