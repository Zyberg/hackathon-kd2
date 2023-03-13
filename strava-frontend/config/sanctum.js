import { makeFetchRequester, useVueUseAuthState } from '@vueauth/sanctum'

export default {
  /**
   * By default, Quasar Auth will make requests using Fetch.
   * If you want to use a different library for backend
   * requests you can provide an implemntation here.
   */
  requester: makeFetchRequester,

  /**
   * Quasar Auth uses "createGlobalState" from "vueuse" to store
   * the user. Feel free to use your own by implementing
   * the UseAuthState contract and passing it below.
   */
  useAuthState: useVueUseAuthState,

  /**
   * You may want to configure the endpoints Sanctum uses. We use
   * sensible defaults aligned with fortify, but you can of
   * course configure your own.
   */
  endpoints: {
    login: '/auth/login/password',
    register: '/auth/signup',
    logout: '/auth/logout',
    getUser: '/auth/user',

    //TODO: check whether this contract needs it
    csrfCookie: '/sanctum/csrf-cookie',

    //TODO: Implement backend for this
    resetPassword: '/auth/reset-password',
    forgotPassword: '/auth/forgot-password',
    password: '/auth/user/password'
  }
}
