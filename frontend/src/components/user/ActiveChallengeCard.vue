<template>
  <q-card class="q-mt-lg" style="background: #F5F5F2">
    <div class="flex flex-center">
      <q-icon size="25px" name="workspace_premium"/>
      <div style="text-align: center">{{ description ? description : 'Achievements description' }}</div>
    </div>
  </q-card>
</template>

<script>

export default {
  name: 'ActiveChallengeCard',
  props: {
    description: String,
    time: String,
    speed: String,
    distance: String,
  },
};
</script>
