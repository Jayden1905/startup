'use client'
import { loginAtom } from '@/utils/store'
import {
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  useDisclosure,
  useMergeRefs,
} from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { ChangeEvent, forwardRef, useRef } from 'react'
import { HiEye, HiEyeOff } from 'react-icons/hi'

export const PasswordField = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const { isOpen, onToggle } = useDisclosure()
    const inputRef = useRef<HTMLInputElement>(null)

    const [login, setLogin] = useAtom(loginAtom)

    const mergeRef = useMergeRefs(inputRef, ref)
    const onClickReveal = () => {
      onToggle()
      if (inputRef.current) {
        inputRef.current.focus({ preventScroll: true })
      }
    }

    return (
      <>
        <FormControl>
          <FormLabel htmlFor='password'>Password</FormLabel>
          <InputGroup>
            <InputRightElement>
              <IconButton
                variant='link'
                aria-label={isOpen ? 'Mask password' : 'Reveal password'}
                icon={isOpen ? <HiEyeOff /> : <HiEye />}
                onClick={onClickReveal}
              />
            </InputRightElement>
            <Input
              id='password'
              ref={mergeRef}
              name='password'
              type={isOpen ? 'text' : 'password'}
              autoComplete='current-password'
              required
              value={login.password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setLogin({ ...login, password: e.target.value })
              }}
              {...props}
            />
          </InputGroup>
        </FormControl>
      </>
    )
  }
)

PasswordField.displayName = 'PasswordField'
