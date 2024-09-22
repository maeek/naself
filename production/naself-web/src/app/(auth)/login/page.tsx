import { Fingerprint } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function Login() {
  return (
    <main className='flex items-center w-full flex-col py-12'>
      <Card className='w-96'>
        <CardHeader>
          <div className='flex gap-2'>
            <CardTitle className='text-3xl'>Welcome</CardTitle>
            <CardTitle className='text-3xl text-blue-300'>Back!</CardTitle>
          </div>
          <CardDescription className='pt-1'>Login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='w-full flex flex-col gap-2'>
            <Label htmlFor='username'>Username</Label>
            <Input
              id='username'
              placeholder='username'
            />
          </div>
          <div className='w-full flex flex-col gap-2 pt-6'>
            <Label htmlFor='password'>Password</Label>
            <Input
              className='placeholder:text-2xl placeholder:align-middle'
              id='password'
              placeholder='········'
            />
            <Link
              href='/forgot-password'
              className='flex justify-end text-sm text-blue-200 mt-2'
            >
              Forgot password?
            </Link>
          </div>
        </CardContent>
        <CardFooter>
          <div className='flex flex-col w-full'>
            <Button
              className='w-full font-bold'
              size='lg'
            >
              Login
            </Button>
          </div>
        </CardFooter>
      </Card>
      <div className='w-full flex justify-center my-6'>OR CONTINUE WITH</div>
      <Button
        variant='secondary'
        className='w-96'
        size='lg'
      >
        <Fingerprint className='h-4 mr-2' /> Passkey
      </Button>
    </main>
  )
}
