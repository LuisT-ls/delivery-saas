'use client';

import { useEffect, useRef } from 'react';

interface NotificationSoundProps {
  play: boolean;
}

export default function NotificationSound({ play }: NotificationSoundProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const playNotificationSound = () => {
    // Usar Web Audio API diretamente para garantir compatibilidade
    playFallbackSound();
  };

  const playFallbackSound = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);

      oscillator.frequency.setValueAtTime(800, audioContextRef.current.currentTime);
      oscillator.frequency.setValueAtTime(600, audioContextRef.current.currentTime + 0.1);
      oscillator.frequency.setValueAtTime(800, audioContextRef.current.currentTime + 0.2);

      gainNode.gain.setValueAtTime(0.3, audioContextRef.current.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.3);

      oscillator.start(audioContextRef.current.currentTime);
      oscillator.stop(audioContextRef.current.currentTime + 0.3);
    } catch (error) {
      console.log('Erro ao tocar som de notificação:', error);
    }
  };

  useEffect(() => {
    if (play) {
      playNotificationSound();
    }
  }, [play]);

  return null; // Não precisamos mais do elemento audio
}
