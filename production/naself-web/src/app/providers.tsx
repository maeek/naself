'use client'

import { PropsWithChildren, useRef, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { i18n } from 'i18next'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import { trpc } from '@/app/_trpc/client'
import i18nInstance from '@/lib/i18n/instance'
import { AppStore, createStore } from '@/lib/store'

const Providers = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: '/api/trpc'
        })
      ]
    })
  )
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    storeRef.current = createStore()
  }

  return (
    <trpc.Provider
      client={trpcClient}
      queryClient={queryClient}
    >
      <QueryClientProvider client={queryClient}>
        <Provider store={storeRef.current}>
          <I18nextProvider
            i18n={i18nInstance as i18n}
            defaultNS='common'
          >
            {children}
          </I18nextProvider>
        </Provider>
      </QueryClientProvider>
    </trpc.Provider>
  )
}

export default Providers
