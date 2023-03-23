import { createGlobalState } from '@vueuse/shared'
import { ref } from 'vue'
import getRestApiConfig from '../getRestApiConfig'
import useHandlesErrors from './useHandlesErrors'
import useAuthState from './useAuthState'
import { UseFetchUser } from '@vueauth/core'

const useFetchUser: UseFetchUser = () => {
  const { makeRequester } = getRestApiConfig()
  const { getUser } = makeRequester()

  console.log('useFetchuser ???')

  const { loading } = createGlobalState(() => {
    return {
      loading: ref(false),
    }
  })()

  const { user, authIsReady } = useAuthState()
  const {
    hasErrors,
    errors,
    resetStandardErrors,
    resetErrors,
    fromResponse: setErrorsFromResponse,
  } = useHandlesErrors()

  const fetch = async () => {
    loading.value = true
    const response = await getUser()
    if (response.error) {
      setErrorsFromResponse(response)
      loading.value = false
      authIsReady.value = true
      return
    }

    authIsReady.value = true
    user.value = (response.data as any).data
    loading.value = false
  }

  return {
    fetch,
    loading,

    // Error Handling
    hasErrors,
    errors,
    resetStandardErrors,
    resetErrors,
  }
}

export {
  useFetchUser as default,
  useFetchUser,
}
