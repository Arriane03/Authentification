"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { VideoIcon, X, Play } from "lucide-react"

interface VideoUploadProps {
  onVideoSelect: (file: File | null) => void
  currentVideo?: string | null
}

export default function VideoUpload({ onVideoSelect, currentVideo }: VideoUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentVideo || null)
  const [isPlaying, setIsPlaying] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Vérifier le type de fichier
      if (!file.type.startsWith("video/")) {
        alert("Veuillez sélectionner un fichier vidéo valide")
        return
      }

      // Vérifier la taille (50MB max)
      if (file.size > 50 * 1024 * 1024) {
        alert("La vidéo ne peut pas dépasser 50MB")
        return
      }

      const reader = new FileReader()
      reader.onload = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      onVideoSelect(file)
    }
  }

  const handleRemoveVideo = () => {
    setPreview(null)
    setIsPlaying(false)
    onVideoSelect(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("video/")) {
      const event = { target: { files: [file] } } as any
      handleFileSelect(event)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  return (
    <div className="space-y-3">
      {!preview ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <VideoIcon className="mx-auto h-8 w-8 text-gray-400 mb-2" />
          <p className="text-sm text-gray-600">Glissez une vidéo ici ou cliquez pour sélectionner</p>
          <p className="text-xs text-gray-500 mt-1">MP4, WebM, MOV jusqu'à 50MB</p>
        </div>
      ) : (
        <div className="relative">
          <video
            ref={videoRef}
            src={preview}
            className="rounded-lg max-h-60 w-full object-cover"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            controls={false}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              variant="secondary"
              size="sm"
              className="bg-black/50 hover:bg-black/70 text-white"
              onClick={togglePlay}
            >
              <Play size={16} fill={isPlaying ? "none" : "currentColor"} />
            </Button>
          </div>
          <Button variant="destructive" size="sm" className="absolute top-2 right-2" onClick={handleRemoveVideo}>
            <X size={16} />
          </Button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="video/mp4,video/webm,video/mov,video/avi"
        onChange={handleFileSelect}
        className="hidden"
      />

      {!preview && (
        <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="w-full">
          <VideoIcon className="mr-2" size={16} />
          Ajouter une vidéo
        </Button>
      )}
    </div>
  )
}
