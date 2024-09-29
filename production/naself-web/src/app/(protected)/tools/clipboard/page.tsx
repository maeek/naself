'use client'
import { useRef, useState } from 'react'
import { Copy, Download, Link, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'

export default function ClipboardPage() {
  const [clipboard, setClipboard] = useState('')
  const { toast } = useToast()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  return (
    <main className='row-layout flex-col max-w-100dvh h-full'>
      <section className='py-4 px-4 flex items-center justify-between gap-3 flex-shrink-0'>
        <h2 className='text-xl font-semibold'>Clipboard</h2>
        <div className='flex'>
          <Button
            size='sm'
            className='flex items-center rounded-tr-none rounded-br-none border-r'
            variant='secondary'
            onClick={() => {
              navigator.clipboard
                .writeText(clipboard)
                .then(() => {
                  toast({
                    title: 'Copied to clipboard'
                  })
                })
                .catch(() => {
                  toast({
                    title: 'Failed to copy to clipboard',
                    description: 'Clipboard write is not allowed',
                    variant: 'destructive'
                  })
                })
            }}
          >
            <Copy className='h-4 w-4' />
          </Button>
          <Button
            size='sm'
            className='flex items-center rounded-tl-none rounded-bl-none'
            variant='secondary'
            onClick={() => {
              const blob = new Blob([clipboard], { type: 'text/plain' })
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              const date = new Date()
              a.download = `${date.toISOString().split('.')[0]}_clipboard.txt`
              a.click()
              URL.revokeObjectURL(url)
            }}
          >
            <Download className='h-4 w-4' />
          </Button>
          <Button
            size='sm'
            className='flex items-center ml-2'
            variant='secondary'
          >
            <Link className='h-4 w-4' />
          </Button>
          <Button
            size='sm'
            className='flex items-center ml-2 gap-2 font-semibold'
          >
            <Save className='h-4 w-4' /> Save
          </Button>
        </div>
      </section>
      <section className='w-full h-[calc(100dvh-9rem)] max-sm:h-[calc(100dvh-8rem)] flex-grow flex-shrink max-sm:px-0 px-2'>
        <Textarea
          ref={textareaRef}
          className='h-full bg-input border rounded-md max-sm:rounded-none'
          onChange={e => setClipboard(e.target.value)}
          value={clipboard}
          placeholder='Paste your text here'
        />
      </section>
    </main>
  )
}
