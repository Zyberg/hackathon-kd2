import useAuthState from './useAuthState';
import { ref, unref, watch, WatchStopHandle, watchEffect, Ref } from 'vue';
import { RouteLocationRaw, useRouter } from 'vue-router';
import useFetchUser from './useFetchUser';
import { UseAuthRedirector } from '@vueauth/core';
import { MaybeRef } from '@vueuse/shared';

export interface UseAuthRedirectorReturn {
  execOnAuthStateChange: () => void;
  execOnAuthStateEnsured: (roles: string[]) => void;
  exec: () => void;
  redirectTo: MaybeRef<RouteLocationRaw>;
  checking: Ref<boolean>;
  onChecked: Ref<UserOnCheckedFunction | null>;
}

type UserOnCheckedFunction = (user: unknown | null) => void;

const useAuthRedirector: UseAuthRedirector = (
  config = {
    redirectOn: 'authenticated',
    redirectTo: ref('/'),
  }
): UseAuthRedirectorReturn => {
  const checking = ref(false);
  const { loading: fetchingUser, fetch: fetchUser } = useFetchUser();
  const roles = ref([] as string[]);

  config.redirectTo = config.redirectTo ?? ref('/');
  config.router = config.router ?? useRouter();

  const { isAuthenticated, user, authIsReady } = useAuthState();

  watchEffect(() => {
    if (user.value !== null) {
      authIsReady.value = true;
    }
  });

  const onChecked = ref(null as null | UserOnCheckedFunction);

  function exec() {
    if (typeof onChecked.value === 'function') {
      onChecked.value(user.value);
    }
    triggerRedirect();
  }

  function execOnAuthStateEnsured(_roles: string[]) {
    roles.value = _roles;

    if (authIsReady.value) {
      return exec();
    }
    return execOnAuthStateChange();
  }

  function handleUnauthenticatedRedirect() {
    const userRole = user.value?.role;

    if (!isAuthenticated.value && config.redirectOn === 'unauthenticated') {
      if (!config.router) {
        throw new Error('config.router not defined: cannot redirect');
      }
      if (!config.redirectTo) {
        throw new Error('config.redirectTo not defined: cannot redirect');
      }
      if (location) {
        return config.router.push({ name: 'auth.login' });
      }
    } else if (!!isAuthenticated.value) {
      if (!config.router) {
        throw new Error('config.router not defined: cannot redirect');
      }
      if (!config.redirectTo) {
        throw new Error('config.redirectTo not defined: cannot redirect');
      }

      if (!userRole) return config.router.push({ name: 'auth.login' });
      else if (!roles.value || !roles.value.includes(userRole)) {
        if (userRole === 'Admin')
          return config.router.push({ name: 'AdminDashboard' });
        else return config.router.push({ name: 'UserDashboard' });
      }
    }
  }

  function handleUserRedirect() {
    if (isAuthenticated.value && config.redirectOn === 'authenticated') {
      if (!config.router) {
        throw new Error('config.router not defined: cannot redirect');
      }
      if (!config.redirectTo) {
        throw new Error('config.redirectTo not defined: cannot redirect');
      }

      const userRole = user.value?.role;

      if (userRole === 'Admin')
        return config.router.push({ name: 'AdminDashboard' });
      else return config.router.push({ name: 'UserDashboard' });
    } else if (
      isAuthenticated.value &&
      config.redirectOn === 'unauthenticated'
    ) {
      console.log('');
    }
  }

  let authReadyWatcher: WatchStopHandle | undefined;
  function execOnAuthStateChange() {
    if (authIsReady.value === false) {
      checking.value = true;
      authReadyWatcher = watch(authIsReady, (newAuthIsReady) => {
        authIsReady.value = newAuthIsReady;
        if (typeof onChecked.value === 'function') {
          onChecked.value(user);
        }

        handleUnauthenticatedRedirect();
        handleUserRedirect();

        checking.value = false;
        if (authReadyWatcher !== undefined) {
          authReadyWatcher();
        }
      });
    }

    if (fetchingUser.value === false) {
      fetchUser();
    }
  }

  function triggerRedirect() {
    handleUserRedirect();
    handleUnauthenticatedRedirect();
  }

  return {
    execOnAuthStateChange,
    execOnAuthStateEnsured,
    exec,
    redirectTo: config.redirectTo,
    checking,
    onChecked,
  };
};

useAuthRedirector.baseConfig = {};

export { useAuthRedirector as default, useAuthRedirector };
