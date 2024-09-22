'use client'
import { useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Badge } from '@/components/ui/badge'

const tagsList = ['all', 'files', 'folders', 'documents', 'images', 'media']

export const FileTags = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [selectedTag, setSelectedTag] = useState(searchParams.get('tag'))

  const handleTagClick = (nextTag: string) => {
    const path = searchParams.get('path')
    const newTag = nextTag === 'all' ? '' : nextTag
    setSelectedTag(newTag)
    router.replace(
      `${pathname}?${path ? 'path=' + path.toString() : ''}${path && newTag ? '&' : ''}${newTag ? 'tag=' + newTag : ''}`
    )
  }

  return (
    <section className='px-6 py-2 flex gap-2 max-w-fit overflow-auto'>
      {tagsList.map((tagItem, i) => (
        <Badge
          key={tagItem}
          className='cursor-pointer capitalize'
          onClick={() => handleTagClick(tagItem)}
          variant={selectedTag === tagItem || (!selectedTag && i === 0) ? 'default' : 'outline'}
        >
          {tagItem}
        </Badge>
      ))}
    </section>
  )
}
