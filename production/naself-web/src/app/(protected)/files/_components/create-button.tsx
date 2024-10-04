'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

export const CreateButton = () => {
  const [isCreateDropdownOpen, setIsCreateDropdownOpen] = useState(false)
  return (
    <DropdownMenu
      open={isCreateDropdownOpen}
      onOpenChange={setIsCreateDropdownOpen}
    >
      <DropdownMenuTrigger asChild>
        <Button
          size='sm'
          className='flex items-center'
        >
          Create{' '}
          {isCreateDropdownOpen ? <ChevronUp className='ml-2 h-4 w-4' /> : <ChevronDown className='ml-2 h-4 w-4' />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-56'
        align='end'
      >
        <DropdownMenuItem>File</DropdownMenuItem>
        <DropdownMenuItem>Folder</DropdownMenuItem>
        <DropdownMenuItem>Share</DropdownMenuItem>
        <DropdownMenuItem>Upload</DropdownMenuItem>
        <DropdownMenuItem>Folder description</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
