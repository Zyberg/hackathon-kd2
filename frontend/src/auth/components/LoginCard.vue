<script setup>
import { QCard, QCardSection, QBtn } from 'quasar';
import AuthLoginForm from 'src/auth/components/forms/LoginForm.vue';
import useLogin from 'auth/composables/useLogin';
import AuthErrorsBanner from './ErrorsBanner.vue';
import { api } from 'src/boot/axios';

const {
  onLoginClicked,
  form,
  loading,
  errors,
  validationErrors,
  hasValidationErrors,
} = useLogin();
</script>

<template>
  <q-card style="padding: 10px;">
    <q-card-section class="text-center">
      <!-- Login Form -->
      <AuthLoginForm
        v-model:email="form.email"
        v-model:password="form.password"
        :validation-errors="validationErrors"
      />

      <!-- Errors -->
      <div v-if="!hasValidationErrors">
        <AuthErrorsBanner :errors="errors" />
      </div>
    </q-card-section>

    <!-- Login Button -->
    <q-btn
      :loading="loading"
      class="primary-button full-width"
      label="login"
      unelevated
      @click="onLoginClicked"
    />

    <!-- Login via Strava button-->
    <q-btn
      class="primary-button full-width"
      label="Login via Strava"
      unelevated
      type="a"
      href="/api/auth/login/strava"
    />
  </q-card>
</template>
