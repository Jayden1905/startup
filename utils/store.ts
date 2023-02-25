import { atom } from 'jotai'
import { LoginFormProps } from './types'

export const loginAtom = atom<LoginFormProps>({
  username: '',
  email: '',
  password: '',
})

export const formValidationAtom = atom({
  email: false,
  password: false,
  usernmae: false,
})

export const onSubmitAtom = atom(false)
export const onSubmitSuccessAtom = atom(false)
