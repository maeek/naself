'use client'

import { useState } from 'react'
import { HomeIcon } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
  BreadcrumbEllipsis
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import {
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
  Drawer
} from '@/components/ui/drawer'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useMediaQuery } from '@/hooks/use-media-query'

const ITEMS_TO_DISPLAY = 3

export default function PathBreadCrumbs() {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const query = useSearchParams()
  const path = query.get('path') || ''
  const folders = path.split('/').filter(Boolean)

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            asChild
            className='flex items-center'
          >
            <Link href='/files'>
              <HomeIcon className='w-4 h-4 mr-2 stroke-accent-foreground' /> Home
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {folders.length > 0 ? <BreadcrumbSeparator /> : null}

        {folders.length > ITEMS_TO_DISPLAY ? (
          <>
            <BreadcrumbItem>
              {isDesktop ? (
                <DropdownMenu
                  open={open}
                  onOpenChange={setOpen}
                >
                  <DropdownMenuTrigger
                    className='flex items-center gap-1'
                    aria-label='Toggle menu'
                  >
                    <BreadcrumbEllipsis className='h-4 w-4' />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align='start'
                    className='w-64'
                  >
                    {folders.slice(0, -3).map((item, index, parts) => {
                      const currentPath = parts.slice(0, index + 1).join('/')
                      return (
                        <DropdownMenuItem key={index}>
                          <Link href={`/files?path=${currentPath}`}>{item}</Link>
                        </DropdownMenuItem>
                      )
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Drawer
                  open={open}
                  onOpenChange={setOpen}
                >
                  <DrawerTrigger aria-label='Toggle Menu'>
                    <BreadcrumbEllipsis className='h-4 w-4' />
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader className='text-left'>
                      <DrawerTitle>Navigate to</DrawerTitle>
                      <DrawerDescription>Select a page to navigate to.</DrawerDescription>
                    </DrawerHeader>
                    <div className='grid gap-1 px-4'>
                      {folders.slice(1, -2).map((item, index, parts) => {
                        const currentPath = parts.slice(0, index + 1).join('/')
                        return (
                          <Link
                            key={index}
                            href={`/files?path=${currentPath}`}
                            className='py-1 text-sm'
                          >
                            {item}
                          </Link>
                        )
                      })}
                    </div>
                    <DrawerFooter className='pt-4'>
                      <DrawerClose asChild>
                        <Button variant='outline'>Close</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              )}
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        ) : null}
        {folders.slice(-ITEMS_TO_DISPLAY).map((part, index, parts) => {
          const isLast = index === parts.length - 1
          const currentPath = parts.slice(0, index + 1).join('/')

          return (
            <>
              <BreadcrumbItem key={part}>
                {isLast ? (
                  <BreadcrumbPage>{part}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    asChild
                    href={`/files?path=${currentPath}`}
                    className='flex items-center'
                  >
                    <Link href={`/files?path=${currentPath}`}>{part}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
