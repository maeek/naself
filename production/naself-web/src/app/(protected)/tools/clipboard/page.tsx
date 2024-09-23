'use client'
import { useRef, useState } from 'react'
import { Copy, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export default function ClipboardPage() {
  const [clipboard, setClipboard] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  return (
    <main className='row-layout flex-col max-w-100dvh h-full'>
      <section className='py-4 px-4 flex items-center justify-between gap-3 flex-shrink-0'>
        <h2 className='text-xl font-semibold'>Clipboard</h2>
        <div className='flex gap-2'>
          <Button
            size='sm'
            className='flex items-center'
            variant='secondary'
            onClick={() => {
              textareaRef.current?.select()
              void navigator.clipboard.writeText(clipboard)
            }}
          >
            <Copy className='h-4 w-4' />
          </Button>
          <Button
            size='sm'
            className='flex items-center'
            variant='secondary'
            onClick={() => {
              const blob = new Blob([clipboard], { type: 'text/plain' })
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = 'clipboard.txt'
              a.click()
              URL.revokeObjectURL(url)
            }}
          >
            <Download className='h-4 w-4' />
          </Button>
        </div>
      </section>
      <section className='w-full h-[calc(100%-5rem)] flex-grow flex-shrink px-4'>
        <Textarea
          ref={textareaRef}
          className='h-full bg-card'
          onChange={e => setClipboard(e.target.value)}
          value={clipboard}
        />
      </section>
    </main>
  )
}
