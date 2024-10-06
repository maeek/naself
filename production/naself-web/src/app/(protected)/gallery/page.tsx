import { XIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

export default function Gallery() {
  const url = 'https://static.suchanecki.me/nasa.jpg'
  return (
    <div className='bg-black/60 w-full h-[calc(100dvh-4rem)] flex flex-col py-2 backdrop-blur-md overflow-hidden'>
      <img
        src={url}
        alt='image.png'
        className='w-full h-full object-cover absolute top-0 left-0 z-[-1] opacity-10 blur-xl'
      />
      <div className='w-full flex gap-2 justify-between px-4'>
        <h3 className='text-lg'>image.png</h3>
        <div className='flex gap-2 items-center'>
          <Button
            variant='secondary'
            size='sm'
          >
            Download
          </Button>
          <XIcon className='h-6 w-6 ml-6' />
        </div>
      </div>
      <div className='w-full flex-shrink-1 flex-grow overflow-hidden my-3 flex justify-center'>
        <Carousel
          className='w-full h-full overflow-hidden [&>div]:h-full relative'
          opts={{
            align: 'start',
            loop: false
          }}
        >
          <CarouselPrevious className='z-10 left-2' />
          <CarouselNext className='z-10 right-2' />
          <CarouselContent className='h-full'>
            {Array.from({ length: 12 }).map((_, index) => (
              <CarouselItem
                key={index}
                className='basis-full'
              >
                <img
                  src={url}
                  alt='image.png'
                  className='w-full h-full object-contain'
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        {/* <img
          src={url}
          alt='image.png'
          className='w-full h-full object-contain'
        /> */}
      </div>
    </div>
  )
}
