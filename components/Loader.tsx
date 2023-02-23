'use client'
import { Box, Spinner } from '@chakra-ui/react'

export default function Loader() {
  return (
    <Box
      position={'fixed'}
      width={'full'}
      inset={0}
      height={'100vh'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Spinner size={'xl'} />
    </Box>
  )
}
