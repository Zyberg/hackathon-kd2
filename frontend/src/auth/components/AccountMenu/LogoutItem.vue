<script setup>
import useLogout from 'auth/composables/useLogout'

const { loading, onLogoutClicked } = useLogout()
</script>

<template>
  <q-item
    style=""
    clickable
    @click="onLogoutClicked"
  >
    <q-item-section>
      <img src="src/assets/signout_icon.svg" />
    </q-item-section>
  </q-item>
</template>
