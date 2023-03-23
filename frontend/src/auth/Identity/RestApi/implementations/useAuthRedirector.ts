import useAuthState from './useAuthState'
import { ref, unref, watch, WatchStopHandle, watchEffect, Ref } from 'vue'
import { RouteLocationRaw, useRouter } from 'vue-router'
import useFetchUser from './useFetchUser'
import { UseAuthRedirector } from '@vueauth/core'
import { MaybeRef } from '@vueuse/shared'

export interface UseAuthRedirectorReturn {
  execOnAuthStateChange: () => void;
  execOnAuthStateEnsured: (roles: string[]) => void;
  exec: () => void;
  redirectTo: MaybeRef<RouteLocationRaw>;
  checking: Ref<boolean>;
  onChecked: Ref<UserOnCheckedFunction | null>;
}

type UserOnCheckedFunction = (user: unknown | null) => void

const useAuthRedirector: UseAuthRedirector = (
  config = {
    redirectOn: 'authenticated',
    redirectTo: ref('/'),
  },
): UseAuthRedirectorReturn => {
  const checking = ref(false)
  const { loading: fetchingUser, fetch: fetchUser } = useFetchUser()
  const roles = ref([] as string[])

  config.redirectTo = config.redirectTo ?? ref('/')
  config.router = config.router ?? useRouter()

  const {
    isAuthenticated,
    user,
    authIsReady,
  } = useAuthState()

  watchEffect(() => {
    if (user.value !== null) {
      authIsReady.value = true
    }
  })

  const onChecked = ref(null as null | UserOnCheckedFunction)

  function exec () {
    if (typeof onChecked.value === 'function') {
      onChecked.value(user.value)
    }
    triggerRedirect()
  }

  function execOnAuthStateEnsured (_roles: string[]) {
    roles.value = _roles;

    if (authIsReady.value) {
      return exec()
    }
    return execOnAuthStateChange()
  }

  function handleUnauthenticatedRedirect () {
    if (!isAuthenticated.value && config.redirectOn === 'unauthenticated') {
      if (!config.router) {
        throw new Error('config.router not defined: cannot redirect')
      }
      if (!config.redirectTo) {
        throw new Error('config.redirectTo not defined: cannot redirect')
      }
      if (location) {
        config.router.push(unref(config.redirectTo ?? ''))
      }
    }

    console.log('yo from unauth')
  }

  function handleUserRedirect () {
    console.log('roleee', user.value!.role, roles.value)
    const userRole = user.value!.role

    console.log(userRole)

    //TODO: let user to do this
    if (roles.value.includes(userRole)) {
      if (userRole === 'Admin')
        config.router!.push({ name: 'AdminDashboard' })
      else
        config.router!.push({ name: 'UserDashboard' })
    }

    if (isAuthenticated.value && config.redirectOn === 'authenticated') {
      if (!config.router) {
        throw new Error('config.router not defined: cannot redirect')
      }
      if (!config.redirectTo) {
        throw new Error('config.redirectTo not defined: cannot redirect')
      }
      config.router.push(unref(config.redirectTo ?? ''))
    }

    console.log('yo')
  }

  function handleAdminRedirect() {
    if (isAuthenticated.value && config.redirectOn === 'authenticated') {
      if (!config.router) {
        throw new Error('config.router not defined: cannot redirect')
      }
      if (!config.redirectTo) {
        throw new Error('config.redirectTo not defined: cannot redirect')
      }
      if (location) {
        config.router.push(unref(config.redirectTo ?? ''))
      }
    }
  }

  let authReadyWatcher: WatchStopHandle | undefined
  function execOnAuthStateChange () {
    if (authIsReady.value === false) {
      checking.value = true
      authReadyWatcher = watch(authIsReady, newAuthIsReady => {
        authIsReady.value = newAuthIsReady
        if (typeof onChecked.value === 'function') {
          onChecked.value(user)
        }

        handleUnauthenticatedRedirect()
        handleAdminRedirect()
        handleUserRedirect()


        console.log('test this place', user.value)

        checking.value = false
        if (authReadyWatcher !== undefined) {
          authReadyWatcher()
        }
      })
    }

    if (fetchingUser.value === false) {
      fetchUser()
    }
  }

  function triggerRedirect () {
    handleAdminRedirect()
    handleUserRedirect()
    handleUnauthenticatedRedirect()
  }

  return {
    execOnAuthStateChange,
    execOnAuthStateEnsured,
    exec,
    redirectTo: config.redirectTo,
    checking,
    onChecked,
  }
}

useAuthRedirector.baseConfig = {}

export {
  useAuthRedirector as default,
  useAuthRedirector,
}
