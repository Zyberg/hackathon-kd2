<template>
  <q-layout view="hHh lpR fff">
    <q-header style="background: #F5F5F2" elevated>
      <q-toolbar elevated class="flex flex-center justify-start">
        <q-btn
          flat
          dense
          round
          style="color: #504678"
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <img class="q-mt-sm" src="src/assets/MB_horizontal.svg"/>
        </q-toolbar-title>
        <q-btn
          style="color: #504678"
          icon="person"
          round
          flat
        >
          <AuthAccountMenu/>
        </q-btn>
        <LogoutItem />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" behavior="default" style="background: #F5F5F2">
      <!-- drawer content -->
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
import {ref} from 'vue'
import AuthAccountMenu from 'src/auth/components/AccountMenu/AccountMenu.vue'
import LogoutItem from 'src/auth/components/AccountMenu/LogoutItem.vue'

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<style scoped>
.q-item {
  border-radius: 24px;
}

</style>
