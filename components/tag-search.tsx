"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, X } from "lucide-react"
import { useI18n } from "@/hooks/use-i18n"

interface TagSearchProps {
  onTagsChange: (tags: string[]) => void
  placeholder?: string
}

export default function TagSearch({ onTagsChange, placeholder }: TagSearchProps) {
  const [searchValue, setSearchValue] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const { t } = useI18n()

  const actualPlaceholder = placeholder || t("post.addTags")

  const handleSearch = () => {
    if (searchValue.trim() && !selectedTags.includes(searchValue.trim())) {
      const newTags = [...selectedTags, searchValue.trim()]
      setSelectedTags(newTags)
      onTagsChange(newTags)
      setSearchValue("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    const newTags = selectedTags.filter((tag) => tag !== tagToRemove)
    setSelectedTags(newTags)
    onTagsChange(newTags)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSearch()
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={actualPlaceholder}
            className="pl-10"
          />
        </div>
        <Button onClick={handleSearch} disabled={!searchValue.trim()}>
          Ajouter
        </Button>
      </div>

      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
              #{tag}
              <X size={14} className="cursor-pointer hover:text-red-500" onClick={() => removeTag(tag)} />
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
