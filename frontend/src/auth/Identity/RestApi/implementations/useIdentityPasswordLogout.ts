import { ref } from 'vue'
import getRestApiConfig from '../getRestApiConfig'
import useHandlesErrors from './useHandlesErrors'
import useAuthState from './useAuthState'
import { UseIdentityPasswordLogout } from '@vueauth/core'
import LocalStorageService from 'src/utility/LocalStorageService'

const useIdentityPasswordLogout: UseIdentityPasswordLogout = () => {
  const loading = ref(false)
  const { makeRequester } = getRestApiConfig()
  const { logout: logoutRequest } = makeRequester()

  const { user } = useAuthState()
  const {
    hasErrors,
    errors,
    resetStandardErrors,
    resetErrors,
    fromResponse: setErrorsFromResponse,
  } = useHandlesErrors()

  const logout = async () => {
    loading.value = true
    const response = await logoutRequest()
    if (response.error) {
      setErrorsFromResponse(response)
      loading.value = false
      return
    }

    LocalStorageService.clearToken();

    user.value = null
    loading.value = false
  }

  return {
    logout,
    loading,

    // Error Handling
    hasErrors,
    errors,
    resetStandardErrors,
    resetErrors,
  }
}

export {
  useIdentityPasswordLogout as default,
  useIdentityPasswordLogout,
}
