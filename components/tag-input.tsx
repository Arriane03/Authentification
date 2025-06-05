"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { useI18n } from "@/hooks/use-i18n"

interface TagInputProps {
  tags: string[]
  onTagsChange: (tags: string[]) => void
  placeholder?: string
  maxTags?: number
}

export default function TagInput({ tags, onTagsChange, placeholder, maxTags = 5 }: TagInputProps) {
  const [inputValue, setInputValue] = useState("")
  const { t } = useI18n()

  const actualPlaceholder = placeholder || t("post.addTags")

  const addTag = (tag: string) => {
    const cleanTag = tag.replace("#", "").trim().toLowerCase()
    if (cleanTag && !tags.includes(cleanTag) && tags.length < maxTags) {
      onTagsChange([...tags, cleanTag])
    }
    setInputValue("")
  }

  const removeTag = (tagToRemove: string) => {
    onTagsChange(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      addTag(inputValue)
    } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      removeTag(tags[tags.length - 1])
    }
  }

  return (
    <div className="space-y-2">
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder={actualPlaceholder}
        disabled={tags.length >= maxTags}
      />

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" className="flex items-center gap-1">
              #{tag}
              <X size={12} className="cursor-pointer hover:text-red-500" onClick={() => removeTag(tag)} />
            </Badge>
          ))}
        </div>
      )}

      <p className="text-xs text-gray-500">
        {tags.length}/{maxTags} tags • Appuyez sur Entrée ou Espace pour ajouter
      </p>
    </div>
  )
}
