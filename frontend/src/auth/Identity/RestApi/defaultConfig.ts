import { useVueUseAuthState } from './implementations/useVueUseAuthState'
import { PluginOptions } from './types/PluginOptions'
import { makeApiRequester } from './implementations/makeApiRequester'

export default (): PluginOptions => {
  return {
    makeRequester: makeApiRequester,
    useAuthState: useVueUseAuthState,
    baseUrl: undefined,
    endpoints: {
      login: '/login',
      register: '/register',
      logout: '/logout',
      getUser: 'api/user',
      resetPassword: '/reset-password',
      forgotPassword: '/forgot-password',
      password: '/user/password',
    },
  }
}
