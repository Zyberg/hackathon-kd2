import Requester, { ResetPasswordForm, ResetPasswordRequestForm, RestApiResponse, UpdatePasswordForm } from '../types/MakeRequester'
import { createFetch, UseFetchReturn } from '@vueuse/core'
import { useCookies } from '@vueuse/integrations/useCookies'
import { RestApiEndpoints } from '../types/PluginOptions'
import getRestApiConfig from '../getRestApiConfig'

const makeFetchRequester = (
  baseUrl: string | undefined = undefined,
): Requester => {
  const { endpoints: configuredEndpoints, baseUrl: configuredBaseUrl } = getRestApiConfig()
  baseUrl = baseUrl ?? configuredBaseUrl

  const cookies = useCookies(['XSRF-TOKEN'])

  const endpoints: RestApiEndpoints = configuredEndpoints

  function makeRestApiResponse<T> (fetch: UseFetchReturn<T>): RestApiResponse<T> {
    return {
      isFinished: fetch.isFinished.value,
      statusCode: fetch.statusCode.value,
      response: fetch.response.value,
      asJson: () => {
        if (typeof fetch.data.value === 'string') {
          return JSON.parse(fetch.data.value)
        }
        if (typeof fetch.data.value === 'object') {
          return fetch.data.value
        }
        return {}
      },
      error: fetch.error.value,
      data: fetch.data.value as T,
      isFetching: fetch.isFetching.value,
    }
  }

  const useFetch = createFetch({
    baseUrl,
    fetchOptions: {
      headers: {
        Accept: 'application/json',
      },
      credentials: 'include',
    },
    options: {
      beforeFetch ({ options }) {
        const xsrfToken = decodeURIComponent(cookies.get('XSRF-TOKEN'))
        if (!options.headers) {
          options.headers = {}
        }

        // TODO: better solution with axios :)
        const token = localStorage.getItem('token');
        if (!!token) (options.headers as any).Authorization = `Bearer ${token}`;

        if (xsrfToken) {
          (options.headers as any)['X-XSRF-TOKEN'] = xsrfToken
        }
      },
      afterFetch (ctx) {
        let data;
        try {
          data = JSON.parse(ctx.data)
        } catch (e) {}

        if (!!data && !!data?.token) {
          localStorage.setItem('token', data.token)
        }

        return ctx;
      },
      immediate: false,
    },
  })

  const loginFetcher = useFetch(endpoints.login)
  const registerFetcher = useFetch(endpoints.register)
  const logoutFetcher = useFetch(endpoints.logout)
  const userFetcher = useFetch<Record<string | number, unknown> | null>(endpoints.getUser)
  // const csrfTokenFetcher = useFetch(endpoints.csrfCookie)
  const resetPasswordFetcher = useFetch(endpoints.resetPassword)
  const forgotPasswordFetcher = useFetch(endpoints.forgotPassword)
  const updatePasswordFetcher = useFetch(endpoints.password)

  // TODO: investigate, if rest api needs this
  /*
  async function fetchCsrfToken () {
    await csrfTokenFetcher.get().execute()
    return makeRestApiResponse(csrfTokenFetcher)
  }
  */

  async function login (credentials: Record<string, string | number>) {
    // await fetchCsrfToken()
    await loginFetcher.post(credentials).execute()
    return makeRestApiResponse(loginFetcher)
  }

  async function register (credentials: Record<string, string | number>) {
    // await fetchCsrfToken()
    await registerFetcher.post(credentials).execute()
    return makeRestApiResponse(registerFetcher)
  }

  async function logout () {
    await logoutFetcher.post().execute()
    return makeRestApiResponse(logoutFetcher)
  }

  async function getUser () {
    await userFetcher.get().json().execute()
    return makeRestApiResponse(userFetcher)
  }

  async function updatePassword (form: UpdatePasswordForm) {
    await updatePasswordFetcher.put(form).json().execute()
    return makeRestApiResponse(updatePasswordFetcher)
  }

  async function resetPassword (form: ResetPasswordForm) {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')
    if (typeof token !== 'string') {
      throw Error('"token" missing: Unable to find the query paramater "token"')
    }
    form.token = token
    await resetPasswordFetcher.post(form).json().execute()
    return makeRestApiResponse(resetPasswordFetcher)
  }

  async function forgotPassword (form: ResetPasswordRequestForm) {
    // await fetchCsrfToken()
    await forgotPasswordFetcher.post(form).json().execute()
    return makeRestApiResponse(forgotPasswordFetcher)
  }

  return {
    // fetchCsrfToken,
    login,
    register,
    logout,
    getUser,
    resetPassword,
    forgotPassword,
    updatePassword,
  }
}

export {
  makeFetchRequester as default,
  makeFetchRequester,
}
