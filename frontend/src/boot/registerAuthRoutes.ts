import { boot } from 'quasar/wrappers'


export default boot(({ router }) => {
  router.addRoute('/', {
    name: 'auth.register',
    path: '/register',
    meta: { unauthOnly: true },
    component: () => import('src/auth/pages/IdentityPasswordRegisterPage.vue')
  })

  router.addRoute('/', {
    name: 'auth.login',
    path: '/login',
    meta: { unauthOnly: true },
    component: () => import('src/auth/pages/IdentityPasswordLoginPage.vue')
  })

  router.addRoute('/', {
    name: 'auth.requestPasswordReset',
    path: '/forgot-password',
    meta: { unauthOnly: true },
    component: () => import('src/auth/pages/PasswordResetRequestViaEmailPage.vue')
  })

  router.addRoute('/', {
    name: 'auth.resetPassword',
    path: '/password-reset',
    meta: { unauthOnly: true },
    component: () => import('src/auth/pages/PasswordResetViaEmailPage.vue')
  })

  // Authenticated user Admin routes
  router.addRoute('/admin', {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        name: 'AdminDashboard',
        component: () => import('src/pages/UserDashboard.vue'),
        meta: { authOnly: true, role: ['Admin'] }
      },
      {
        path: 'users',
        name: 'users',
        component: () => import('src/pages/users/UsersList.vue'),
        meta: { authOnly: true, role: ['Admin'] }
      },
      {
        path: 'achievements',
        name: 'achievements',
        component: () => import('src/pages/AchievementsPage.vue'),
        meta: { authOnly: true, role: ['Admin'] }
      },
      {
        path: 'challenges',
        name: 'challenges',
        component: () => import('pages/challenges/ChallengesListPage.vue'),
        meta: { unauthOnly: true, role: ['Admin'] },
      },
      {
        path: 'challenges/create',
        name: 'create',
        component: () => import('pages/challenges/ChallengeCreatePage.vue'),
        meta: { unauthOnly: true, role: ['Admin'] },
      },
      {
        path: 'challenges/example',
        name: 'example',
        component: () => import('pages/challenges/ChallengeViewPage.vue'),
        meta: { unauthOnly: true, role: ['Admin'] },
      },
    ]
  })

  // Authenticated user User routes
  router.addRoute('/', {
    path: '/',
    component: () => import('layouts/UserLayout.vue'),
    children: [
      {
        path: '',
        name: 'UserDashboard',
        component: () => import('src/pages/BasicUserPage.vue'),
        meta: { authOnly: true, role: ['User'] }
      },
    ]
  })

  router.replace({ name: 'UserDashboard' })
})
