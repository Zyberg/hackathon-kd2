<template>
  this is from a non-admin user
</template>

<script setup>
import { useAuthState } from '@vueauth/core'

const { user, isAuthenticated, authIsReady } = useAuthState()

console.log(user.value)

console.log(isAuthenticated.value, authIsReady.value)
</script>
