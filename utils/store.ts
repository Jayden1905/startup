import { atom } from 'jotai'
import { LoginFormProps } from './types'

export const loginAtom = atom<LoginFormProps>({
  email: '',
  password: '',
})
