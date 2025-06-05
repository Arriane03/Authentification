"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ImageIcon, X } from "lucide-react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"
import { useI18n } from "@/hooks/use-i18n"

interface ImageUploadProps {
  onImageSelect: (file: File | null) => void
  currentImage?: string | null
}

export default function ImageUpload({ onImageSelect, currentImage }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentImage || null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()
  const { t } = useI18n()

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {      
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        toast({
          title: t("common.error"),
          description: t("upload.fileTooLarge"),
          variant: "destructive",
        })
        return
      }

      const reader = new FileReader()
      reader.onload = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      onImageSelect(file)
    }
  }

  const handleRemoveImage = () => {
    setPreview(null)
    onImageSelect(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
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
          <ImageIcon className="mx-auto h-8 w-8 text-gray-400 mb-2" />
          <p className="text-sm text-gray-600">Glissez une image ici ou cliquez pour sélectionner</p>
          <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF jusqu'à 5MB</p>
        </div>
      ) : (
        <div className="relative">
          <Image
            src={preview || "/placeholder.svg"}
            alt="Preview"
            width={400}
            height={300}
            className="rounded-lg max-h-60 w-full object-cover"
          />
          <Button variant="destructive" size="sm" className="absolute top-2 right-2" onClick={handleRemoveImage}>
            <X size={16} />
          </Button>
        </div>
      )}

      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />

      {!preview && (
        <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="w-full">
          <ImageIcon className="mr-2" size={16} />
          Ajouter une image
        </Button>
      )}
    </div>
  )
}
