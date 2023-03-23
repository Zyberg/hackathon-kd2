<template>
  <router-view />
</template>

<script setup>
//import { authenticateRoutes } from "@vueauth/quasar-ui-auth"

import authenticateRoutes from './auth/helpers/authenticateRoutes';
authenticateRoutes()

</script>
