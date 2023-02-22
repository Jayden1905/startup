import {
  Box,
  Button,
  HStack,
  Text,
  useColorMode,
  VStack,
} from '@chakra-ui/react'

export const NavBar = () => {
  const { toggleColorMode, colorMode } = useColorMode()
  return (
    <HStack justifyContent={'space-between'} alignItems='center'>
      <Text>Logo</Text>
      <Button rounded={'full'}>Join Now</Button>
    </HStack>
  )
}
