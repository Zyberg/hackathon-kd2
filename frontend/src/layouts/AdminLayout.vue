<template>
  <q-layout view="hHh lpR fff">
    <q-header>
      <q-toolbar elevated class="flex flex-center justify-start">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <img class="q-mt-sm" src="src/assets/MB_horizontal.svg"/>
        </q-toolbar-title>
        <q-btn
          icon="person"
          round
          flat
        >
          <AuthAccountMenu/>
        </q-btn>
        <LogoutItem />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      behavior="default"
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
      <router-view/>
    </q-page-container>

    <q-footer elevated>
      <q-toolbar style="text-align: center">
        MobilePay A/S,  Vester Søgade 10, 6., 1601 København V, Denmark. Email: mobilepay@mobilepay.dk, VAT: 38 29 21 88. Copyright ©2023 MobilePay A/S. MobilePay A/S is supervised by the Danish Financial Supervisory Authority. Read processing of personal data and cookies and terms of use. Complaints department: MobilePay A/S,  Vester Søgade 10, 6., 1601 København V.
      </q-toolbar>
    </q-footer>

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
