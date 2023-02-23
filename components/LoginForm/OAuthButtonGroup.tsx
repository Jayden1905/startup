'use client'
import { Button, ButtonGroup, VisuallyHidden } from '@chakra-ui/react'
import {
  AuthCredential,
  AuthProvider,
  FacebookAuthProvider,
  fetchSignInMethodsForEmail,
  GithubAuthProvider,
  GoogleAuthProvider,
  linkWithCredential,
  OAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  updateProfile,
} from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { auth } from 'utils/firebase'
import { FaceBookIcon, GitHubIcon, GoogleIcon } from './ProviderIcons'

export const OAuthButtonGroup = () => {
  const router = useRouter()

  const providers = [
    {
      name: 'Google',
      icon: <GoogleIcon boxSize="5" />,
      provider: new GoogleAuthProvider(),
    },
    {
      name: 'FaceBook',
      icon: <FaceBookIcon boxSize="5" />,
      provider: new FacebookAuthProvider(),
    },
    {
      name: 'GitHub',
      icon: <GitHubIcon boxSize="5" />,
      provider: new GithubAuthProvider(),
    },
  ]

  function getProvider(providerId: string) {
    switch (providerId) {
      case GoogleAuthProvider.PROVIDER_ID:
        return new GoogleAuthProvider()
      case FacebookAuthProvider.PROVIDER_ID:
        return new FacebookAuthProvider()
      default:
        throw new Error(`No provider implemented for ${providerId}`)
    }
  }

  const supportedPopupSignInMethods = [
    GoogleAuthProvider.PROVIDER_ID,
    FacebookAuthProvider.PROVIDER_ID,
  ]

  async function authLogin(provider: AuthProvider) {
    try {
      const result = await signInWithPopup(auth, provider)
      if (provider.providerId === 'facebook.com') {
        const userCredential = FacebookAuthProvider.credentialFromResult(result)
        const token = userCredential?.accessToken
        const photo = result.user.photoURL + '?height=500&access_token=' + token
        await updateProfile(auth?.currentUser!, { photoURL: photo })
        router.replace('/')
      }

      router.replace('/')
    } catch (error: any) {
      if (error.code === 'auth/account-exists-with-different-credential') {
        const email = error.customData.email
        const pendingCred = OAuthProvider.credentialFromError(
          error
        ) as AuthCredential

        const providers = await fetchSignInMethodsForEmail(auth, email)

        const firstPopupProviderMethod = providers.find((p: any) =>
          supportedPopupSignInMethods.includes(p)
        )

        if (!firstPopupProviderMethod) {
          throw new Error(
            `Your account is linked to a provider that isn't supported.`
          )
        }

        const linkedProvider = getProvider(firstPopupProviderMethod)
        linkedProvider.setCustomParameters({ login_hint: email })

        const result = await signInWithRedirect(auth, linkedProvider)
        linkWithCredential(result, pendingCred)
        router.replace('/')
      }
    }
  }
  return (
    <ButtonGroup variant="outline" spacing="4" width="full">
      {providers.map(({ name, icon, provider }) => (
        <Button key={name} width="full" onClick={() => authLogin(provider)}>
          <VisuallyHidden>Sign in with {name}</VisuallyHidden>
          {icon}
        </Button>
      ))}
    </ButtonGroup>
  )
}
