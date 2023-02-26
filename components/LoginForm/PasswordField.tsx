'use client'
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
import { Field } from 'formik'
import { useRef } from 'react'
import { HiEye, HiEyeOff } from 'react-icons/hi'

type Props = {
  errors: any
  touched: any
}

export const PasswordField = ({ errors, touched }: Props) => {
  const { isOpen, onToggle } = useDisclosure()
  const inputRef = useRef<HTMLInputElement>(null)

  const onClickReveal = () => {
    onToggle()
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true })
    }
  }

  return (
    <>
      <FormControl isInvalid={!!errors.password && touched.password}>
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
          <Field
            as={Input}
            id="password"
            ref={inputRef}
            name="password"
            type={isOpen ? 'text' : 'password'}
            autoComplete="current-password"
            validate={(value: string) => {
              if (value.length === 0) {
                return 'Password is required'
              } else if (value.length < 8) {
                return 'Password must be at least 8 characters'
              }
            }}
          />
        </InputGroup>
        <FormErrorMessage>{errors.password}</FormErrorMessage>
      </FormControl>
    </>
  )
}

PasswordField.displayName = 'PasswordField'
