'use client'

import { useRef, useEffect, useCallback, useState } from 'react'
import WaveSurfer from 'wavesurfer.js'

export interface UseWaveSurferOptions {
  url: string
  height?: number
  waveColor?: string
  progressColor?: string
  initialVolume?: number
  playbackRate?: number
  onReady?: (wavesurfer: WaveSurfer) => void
  onPlay?: () => void
  onPause?: () => void
  onFinish?: () => void
  onError?: (error: Error) => void
}

export interface UseWaveSurferReturn {
  containerRef: React.RefObject<HTMLDivElement>
  wavesurferRef: React.RefObject<WaveSurfer | null>
  isPlaying: boolean
  currentTime: number
  duration: number
  isLoading: boolean
  play: () => void
  pause: () => void
  playPause: () => void
  setCurrentTime: (time: number) => void
  setVolume: (volume: number) => void
  setPlaybackRate: (rate: number) => void
  seek: (percent: number) => void
  destroy: () => void
}

/**
 * Hook personalizado para controlar WaveSurfer
 * Proporciona una interfaz reactiva para reproducir audio
 * 
 * @example
 * const { containerRef, isPlaying, playPause, currentTime, duration } = useWaveSurfer({
 *   url: 'https://example.com/audio.mp3',
 *   height: 60
 * })
 */
export function useWaveSurfer({
  url,
  height = 60,
  waveColor = '#9F7AEA',
  progressColor = '#6D28D9',
  initialVolume = 0.5,
  playbackRate = 1,
  onReady,
  onPlay,
  onPause,
  onFinish,
  onError
}: UseWaveSurferOptions): UseWaveSurferReturn {
  const containerRef = useRef<HTMLDivElement>(null)
  const wavesurferRef = useRef<WaveSurfer | null>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [_currentTime, _setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  // Inicializar
  useEffect(() => {
    if (!containerRef.current || !url) return

    const ws = WaveSurfer.create({
      container: containerRef.current,
      waveColor,
      progressColor,
      height,
      cursorColor: 'transparent',
      barGap: 3,
      barHeight: 1.5,
      barRadius: 3,
      barMinHeight: 1,
      dragToSeek: true,
      hideScrollbar: true,
      media: new Audio(),
      autoplay: false,
      interact: true,
      url
    })

    ws.setVolume(initialVolume)
    ws.getMediaElement().playbackRate = playbackRate

    wavesurferRef.current = ws

    // Event listeners
    ws.on('ready', () => {
      setIsLoading(false)
      setDuration(ws.getDuration())
      if (onReady) onReady(ws)
    })

    ws.on('play', () => {
      setIsPlaying(true)
      if (onPlay) onPlay()
    })

    ws.on('pause', () => {
      setIsPlaying(false)
      if (onPause) onPause()
    })

    ws.on('timeupdate', (time: number) => {
      _setCurrentTime(time)
    })

    ws.on('finish', () => {
      setIsPlaying(false)
      if (onFinish) onFinish()
    })

    ws.on('error', (error: Error) => {
      console.error('WaveSurfer error:', error)
      if (onError) onError(error)
    })

    ws.on('loading', (percent: number) => {
      setIsLoading(percent < 100)
    })

    return () => {
      ws.destroy()
    }
  }, [url, height, waveColor, progressColor, initialVolume, playbackRate, onReady, onPlay, onPause, onFinish, onError])

  const play = useCallback(() => {
    if (wavesurferRef.current) {
      wavesurferRef.current.play()
    }
  }, [])

  const pause = useCallback(() => {
    if (wavesurferRef.current) {
      wavesurferRef.current.pause()
    }
  }, [])

  const playPause = useCallback(() => {
    if (wavesurferRef.current) {
      wavesurferRef.current.playPause()
    }
  }, [])

  const setCurrentTime = useCallback((time: number) => {
    if (wavesurferRef.current) {
      wavesurferRef.current.setTime(time)
    }
  }, [])

  const setVolume = useCallback((volume: number) => {
    if (wavesurferRef.current) {
      wavesurferRef.current.setVolume(Math.max(0, Math.min(1, volume)))
    }
  }, [])

  const setPlaybackRate = useCallback((rate: number) => {
    if (wavesurferRef.current) {
      wavesurferRef.current.getMediaElement().playbackRate = rate
    }
  }, [])

  const seek = useCallback((percent: number) => {
    if (wavesurferRef.current && duration > 0) {
      const time = (Math.max(0, Math.min(100, percent)) / 100) * duration
      wavesurferRef.current.setTime(time)
    }
  }, [duration])

  const destroy = useCallback(() => {
    if (wavesurferRef.current) {
      wavesurferRef.current.destroy()
      wavesurferRef.current = null
    }
  }, [])

  return {
    containerRef: containerRef as React.RefObject<HTMLDivElement>,
    wavesurferRef,
    isPlaying,
    currentTime: _currentTime,
    duration,
    isLoading,
    play,
    pause,
    playPause,
    setCurrentTime,
    setVolume,
    setPlaybackRate,
    seek,
    destroy
  }
}
