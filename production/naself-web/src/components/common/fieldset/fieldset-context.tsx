import { ChangeEventHandler, createContext, useContext } from 'react'

export interface FieldsetContext {
  name?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  disabled?: boolean
}

export const fieldsetContext = createContext<FieldsetContext>({})

export const FieldsetContextProvider = fieldsetContext.Provider

export const useFieldSetContext = () => {
  const context = useContext(fieldsetContext)

  if (context === undefined) {
    return {} as FieldsetContext
  }

  return context
}
