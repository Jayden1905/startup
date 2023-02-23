import { atom } from 'jotai'
import { LoginFormProps } from './types'

export const loginAtom = atom<LoginFormProps>({
  email: '',
  password: '',
})

export const onSubmitAtom = atom<boolean>(false)

export const onSubmitSuccessAtom = atom<boolean>(false)
