<template>
  <q-page padding class="flex flex-center text-center">
    <h3 class="text-weight-thin">
      There is nothing you can't build...
    </h3>
  </q-page>
</template>

<script setup>
import { useVueUseAuthState } from 'src/auth/Identity/RestApi';
// 🤿 It all starts here...

const {
  authIsReady,
  isAuthenticated,
  user,
} = useVueUseAuthState()


console.log(authIsReady.value, isAuthenticated.value, user.value)
</script>
