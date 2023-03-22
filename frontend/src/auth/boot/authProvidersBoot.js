import { boot } from 'quasar/wrappers'
import { AuthPlugin } from '@vueauth/core'
import restApiConfig from 'app/config/restApi'
import {
  RestApiPlugin,
  useIdentityPasswordRegister,
  useIdentityPasswordLogin,
  useIdentityPasswordLogout,
  useUnauthenticatedRedirector,
  useAuthRedirector,
  useHandlesErrors,
  useAuthState,
  useAuthenticatedRedirector,
  useFetchUser,
  usePasswordResetViaEmail,
  useUpdatePassword
} from '../Identity/RestApi'

export default boot(({ app }) => {
  app.use(RestApiPlugin, restApiConfig)

  app.use(AuthPlugin, {
    default: 'custom',
    providers: {
      custom: {
        features: {
          'identityPassword:register': useIdentityPasswordRegister,
          'identityPassword:login': useIdentityPasswordLogin,
          'identityPassword:logout': useIdentityPasswordLogout,
          unauthenticatedRedirector: useUnauthenticatedRedirector,
          authenticatedRedirector: useAuthenticatedRedirector,
          errorHandler: useHandlesErrors,
          fetchUser: useFetchUser,
          authState: useAuthState,
          authRedirector: useAuthRedirector,
          passwordResetViaEmail: usePasswordResetViaEmail,
          updatePassword: useUpdatePassword
        }
      }
    }
  })
})
