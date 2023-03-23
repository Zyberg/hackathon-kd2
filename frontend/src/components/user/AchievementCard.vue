<template>
  <q-card class="q-mt-lg" style="background: #F5F5F2">
    <div class="flex flex-center">
      <q-icon size="50px" name="workspace_premium"/>
      <div class="q-ma-sm" style="text-align: center">{{ description ? description : 'Achievements description' }}</div>
    </div>
  </q-card>
</template>

<script>

export default {
  name: 'AchievementCard',
  props: {
    description: String,
  },
};
</script>
