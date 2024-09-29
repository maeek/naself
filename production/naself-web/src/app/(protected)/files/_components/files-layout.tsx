import { ReactNode } from 'react'

export const FilesLayout = ({ children }: { children: ReactNode }) => (
  <section className='grid grid-cols-8 max-sm:grid-cols-2 max-md:grid-cols-3 max-[868px]:grid-cols-4 max-lg:grid-cols-4 max-xl:grid-cols-5 max-2xl:grid-cols-6 max-[1900px]:grid-cols-7 gap-2 px-6'>
    {children}
  </section>
)
