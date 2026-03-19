'use client'

import AudioVisualizer, { AudioVisualizerProps } from './AudioVisualizer'
import { AudioEntity } from '../../domain/entities/audio.entity'
import { selectAvatar } from '../utils/helpers/select-avatar.helper'

export interface AudioPlayerProps extends Omit<AudioVisualizerProps, 'url'> {
  /** Entidad de audio con los datos completos */
  audio: AudioEntity
}

/**
 * Componente AudioPlayer que integra AudioVisualizer con AudioEntity
 * Muestra la información del modelo de audio junto con el visualizador
 */
export default function AudioPlayer({
  audio,
  ...audioVisualizerProps
}: AudioPlayerProps) {
  return (
    <div className="rounded-lg bg-[#0a0a0a] p-4 space-y-3">
      {/* Encabezado con información del audio */}
      <div className="flex items-start gap-3">
        <img
          src={selectAvatar(audio.idModel)}
          alt={audio.nameModelAudio}
          className="size-10 rounded-full shrink-0 border border-purple-600"
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white truncate">
            {audio.nameModelAudio}
          </p>
          <p className="text-xs text-gray-400 truncate">
            {audio.prompt.length > 60
              ? audio.prompt.substring(0, 60) + '...'
              : audio.prompt}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {new Date(audio.createDate).toLocaleDateString('es-ES')}
          </p>
        </div>
      </div>

      {/* Visualizador de audio */}
      <AudioVisualizer url={audio.urlAudio} {...audioVisualizerProps} />

      {/* Parámetros del audio (opcional) */}
      {(audio.speed || audio.stability || audio.similarity || audio.exaggeration) && (
        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          {audio.speed && (
            <div className="bg-[#1a1a1a] rounded p-2">
              <p className="text-gray-400">Velocidad</p>
              <p className="text-purple-400 font-semibold">{audio.speed.toFixed(1)}</p>
            </div>
          )}
          {audio.stability && (
            <div className="bg-[#1a1a1a] rounded p-2">
              <p className="text-gray-400">Estabilidad</p>
              <p className="text-purple-400 font-semibold">{audio.stability.toFixed(1)}</p>
            </div>
          )}
          {audio.similarity && (
            <div className="bg-[#1a1a1a] rounded p-2">
              <p className="text-gray-400">Similitud</p>
              <p className="text-purple-400 font-semibold">{audio.similarity.toFixed(1)}</p>
            </div>
          )}
          {audio.exaggeration && (
            <div className="bg-[#1a1a1a] rounded p-2">
              <p className="text-gray-400">Exageración</p>
              <p className="text-purple-400 font-semibold">{audio.exaggeration.toFixed(1)}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
