import { boot } from 'quasar/wrappers';

export default boot(({ router }) => {
  router.addRoute('/', {
    name: 'auth.register',
    path: '/register',
    meta: { unauthOnly: true },
    component: () => import('src/auth/pages/IdentityPasswordRegisterPage.vue'),
  });

  router.addRoute('/', {
    name: 'auth.login',
    path: '/login',
    meta: { unauthOnly: true },
    component: () => import('src/auth/pages/IdentityPasswordLoginPage.vue'),
  });

  router.addRoute('/', {
    name: 'auth.requestPasswordReset',
    path: '/forgot-password',
    meta: { unauthOnly: true },
    component: () =>
      import('src/auth/pages/PasswordResetRequestViaEmailPage.vue'),
  });

  router.addRoute('/', {
    name: 'auth.resetPassword',
    path: '/password-reset',
    meta: { unauthOnly: true },
    component: () => import('src/auth/pages/PasswordResetViaEmailPage.vue'),
  });

  // Authenticated user Admin routes
  router.addRoute('/admin', {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        name: 'AdminDashboard',
        component: () => import('src/pages/user/UserDashboard.vue'),
        meta: { authOnly: true, role: ['Admin'] },
      },
      {
        path: 'users',
        name: 'users',
        component: () => import('src/pages/user/UsersList.vue'),
        meta: { unauthOnly: true, role: ['Admin'] },
      },
      {
        path: 'userGroups',
        name: 'userGroups',
        component: () => import('pages/user-group/UserGroupsListPage.vue'),
        meta: { authOnly: true, role: ['Admin'] },
      },
      {
        path: 'userGroups/:id',
        name: 'userGroup',
        component: () => import('pages/user-group/UserGroupCreatePage.vue'),
        meta: { authOnly: true, role: ['Admin'] },
      },
      {
        path: 'userGroups/create',
        name: 'userGroupsCreate',
        component: () => import('pages/user-group/UserGroupCreatePage.vue'),
        meta: { authOnly: true, role: ['Admin'] },
      },
      {
        path: 'units',
        name: 'units',
        component: () => import('pages/units/UnitsListPage.vue'),
        meta: { authOnly: true, role: ['Admin'] },
      },
      {
        path: 'units/create',
        name: 'unitsCreate',
        component: () => import('pages/units/UnitCreatePage.vue'),
        meta: { authOnly: true, role: ['Admin'] },
      },
      {
        path: 'units/:id',
        name: 'unit',
        component: () => import('pages/units/UnitCreatePage.vue'),
        meta: { authOnly: true, role: ['Admin'] },
      },
      {
        path: 'users/example',
        name: 'usersExample',
        component: () => import('src/pages/user/UserProfilePage.vue'),
        meta: { authOnly: true, role: ['User'] },
      },
      {
        path: 'achievements',
        name: 'achievements',
        component: () => import('src/pages/achievements/AchievementsPage.vue'),
        meta: { authOnly: true, role: ['Admin'] },
      },
      {
        path: 'challenges',
        name: 'adminChallenges',
        component: () => import('pages/admin/challenges/ChallengesListPage.vue'),
        meta: { authOnly: true, role: ['Admin'] },
      },
      {
        path: 'challenges/create',
        name: 'adminChallengeCreate',
        component: () => import('pages/admin/challenges/ChallengeCreatePage.vue'),
        meta: { authOnly: true, role: ['Admin'] },
      },
      {
        path: 'challenges/:id',
        name: 'adminChallengeUpdate',
        component: () => import('pages/admin/challenges/ChallengeCreatePage.vue'),
        meta: { authOnly: true, role: ['Admin'] },
      },
    ],
  });

  // Authenticated user User routes
  router.addRoute('/', {
    path: '/',
    component: () => import('layouts/UserLayout.vue'),
    children: [
      {
        path: '',
        name: 'UserDashboard',
        component: () => import('src/pages/BasicUserPage.vue'),
        meta: { authOnly: true, role: ['User'] },
      },
      {
        path: 'challenges',
        name: 'challenges',
        component: () => import('pages/challenges/ChallengesListPage.vue'),
        meta: { authOnly: true, role: ['User'] },
      },
      {
        path: 'challenges/:id',
        name: 'example',
        component: () => import('pages/challenges/ChallengeViewPage.vue'),
        meta: { authOnly: true, role: ['User'] },
      },
    ],
  });

  router.replace({ name: 'UserDashboard' });
});
