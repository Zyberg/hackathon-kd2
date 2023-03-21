// Plugin
export { RestApiPlugin } from './RestApiPlugin'

// Implementations
export { useIdentityPasswordLogin } from './implementations/useIdentityPasswordLogin'
export { useIdentityPasswordRegister } from './implementations/useIdentityPasswordRegister'
export { usePasswordResetViaEmail } from './implementations/usePasswordResetViaEmail'
export { useAuthState } from './implementations/useAuthState'
export { useIdentityPasswordLogout } from './implementations/useIdentityPasswordLogout'
export { useFetchUser } from './implementations/useFetchUser'
export { useUpdatePassword } from './implementations/useUpdatePassword'

export { getRestApiConfig } from './getRestApiConfig'

export { useAuthRedirector } from './implementations/useAuthRedirector'
export { useAuthenticatedRedirector } from './implementations/useAuthenticatedRedirector'
export { useUnauthenticatedRedirector } from './implementations/useUnauthenticatedRedirector'
export { useHandlesErrors } from './implementations/useHandlesErrors'

export { useVueUseAuthState } from './implementations/useVueUseAuthState'

export type {
  RestApiEndpoints,
  RestApiOptionsEndpoints,
  RestApiConfig,
  PluginOptions,
} from './types/PluginOptions'
