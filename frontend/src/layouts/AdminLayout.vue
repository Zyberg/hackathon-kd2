<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      class="bg-white text-grey-9"
      elevated
    >
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>Quasar ADMIN {{ authProviderUpperFirst }}</q-toolbar-title>

        <q-btn
          icon="person"
          round
          flat
        >
          <AuthAccountMenu />
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item to="/admin" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="dashboard"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/admin/users" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="people"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Users</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/admin/achievements" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="star_rate"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Achievements</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/admin/challenges" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="emoji_events"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Challenges</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/admin/userGroups" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="group"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>User Groups</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/admin/units" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="square_foot"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Units</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { getDefaultProvider } from '@vueauth/core'
import AuthAccountMenu from 'src/auth/components/AccountMenu/AccountMenu.vue'

const leftDrawerOpen = ref(false)

const authProvider = getDefaultProvider()
const authProviderUpperFirst = authProvider.charAt(0).toUpperCase() + authProvider.slice(1)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
