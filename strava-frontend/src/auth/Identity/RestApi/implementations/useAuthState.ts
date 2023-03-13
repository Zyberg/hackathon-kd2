import getRestApiConfig from '../getRestApiConfig'
import { UseAuthState } from '@vueauth/core'

const useAuthState: UseAuthState = () => {
  const config = getRestApiConfig()
  return config.useAuthState()
}

export {
  useAuthState as default,
  useAuthState,
}
