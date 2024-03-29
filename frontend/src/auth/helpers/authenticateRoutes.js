import { useRouter } from 'vue-router'
import { useAuthenticatedRedirector, useUnauthenticatedRedirector } from '@vueauth/core'
import { Loading } from 'quasar'
import { unref } from 'vue'

export default () => {
  const router = useRouter()

  const authenticatedRedirector = useAuthenticatedRedirector({ redirectTo: { name: 'UserDashboard' }, router })
  const unauthenticatedRedirector = useUnauthenticatedRedirector({ redirectTo: { name: 'auth.login' }, router })

  authenticatedRedirector.onChecked.value = () => Loading.hide()
  unauthenticatedRedirector.onChecked.value = () => Loading.hide()

  router.isReady().then(() => {
    const route = unref(router.currentRoute)


    if (route.meta.authOnly) {
      Loading.show()
      unauthenticatedRedirector.execOnAuthStateEnsured(route.meta.role)
    }

    if (route.meta.unauthOnly) {
      authenticatedRedirector.execOnAuthStateEnsured()
    }
  })

  router.beforeEach((to, from) => {
    if (to.meta.authOnly) {
      Loading.show()
      unauthenticatedRedirector.execOnAuthStateEnsured(to.meta.role)
    }

    if (to.meta.unauthOnly) {
      authenticatedRedirector.execOnAuthStateEnsured()
    }
  })
}
