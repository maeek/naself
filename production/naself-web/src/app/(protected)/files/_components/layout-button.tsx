import { LayoutListIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

export const LayoutButton = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        size='sm'
        className='flex items-center'
        variant='secondary'
      >
        <LayoutListIcon className='h-4 w-4' />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      className='w-28'
      align='center'
    >
      <DropdownMenuLabel>Layout</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Icons</DropdownMenuItem>
      <DropdownMenuItem>Grid</DropdownMenuItem>
      <DropdownMenuItem>Gallery</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
)
