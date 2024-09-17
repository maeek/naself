import classNames from 'classnames'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { NaselfLogo } from '../ui/naself-logo'
import { ThemeToggle } from '../ui/theme-toggle'

export const TopBar = () => {
  const sectionClasses = 'flex items-center h-full px-4 gap-x-4'

  return (
    <div className='flex justify-between h-16 w-dvw border-b border-b-layout-border bg-layout flex-shrink-0 sticky top-0'>
      <div className={classNames(sectionClasses, 'justify-start')}>
        <Link href='/'>
          <NaselfLogo />
        </Link>
      </div>
      <div className={classNames(sectionClasses, 'justify-center flex-initial w-full max-w-screen-sm')}>
        <Input
          placeholder='Search files or execute an action'
          type='search'
          className='h-10'
        />
      </div>
      <div className={classNames(sectionClasses, 'justify-end')}>
        <Button>Login</Button>
        <ThemeToggle />
      </div>
    </div>
  )
}
