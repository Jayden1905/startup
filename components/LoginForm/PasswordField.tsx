'use client'
import { loginAtom } from '@/utils/store'
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
} from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { ChangeEvent, useRef } from 'react'
import { HiEye, HiEyeOff } from 'react-icons/hi'

type Props = {
  handleSubmit: (email: string, password: string) => void
  passwordValidation: boolean
  setPasswordValidation: (value: boolean) => void
}

export const PasswordField = ({
  handleSubmit,
  passwordValidation,
  setPasswordValidation,
}: Props) => {
  const { isOpen, onToggle } = useDisclosure()
  const inputRef = useRef<HTMLInputElement>(null)

  const [login, setLogin] = useAtom(loginAtom)

  const onClickReveal = () => {
    onToggle()
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true })
    }
  }

  return (
    <>
      <FormControl isInvalid={passwordValidation}>
        <FormLabel htmlFor="password">Password</FormLabel>
        <InputGroup>
          <InputRightElement>
            <IconButton
              variant="link"
              aria-label={isOpen ? 'Mask password' : 'Reveal password'}
              icon={isOpen ? <HiEyeOff /> : <HiEye />}
              onClick={onClickReveal}
            />
          </InputRightElement>
          <Input
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSubmit(login.email, login.password)
              }
            }}
            id="password"
            ref={inputRef}
            name="password"
            type={isOpen ? 'text' : 'password'}
            autoComplete="current-password"
            value={login.password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (e.target.value.length < 6) {
                setPasswordValidation(true)
              } else {
                setPasswordValidation(false)
              }
              setLogin({ ...login, password: e.target.value })
            }}
          />
        </InputGroup>
        {passwordValidation && (
          <FormErrorMessage>Invalid password</FormErrorMessage>
        )}
      </FormControl>
    </>
  )
}

PasswordField.displayName = 'PasswordField'
