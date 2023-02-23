import { atom } from 'jotai'
import { LoginFormProps } from './types'

export const countAtom = atom(0)

export const loginAtom = atom<LoginFormProps>({
  email: '',
  password: '',
})
