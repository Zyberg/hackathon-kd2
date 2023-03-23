<template>
  <q-card class="q-pa-md" style="height: 100%">
    <div class="flex flex-center justify-between">
      <div>
        <div>Active challenges</div>
      </div>
      <div>
        <q-btn icon="chevron_left" @click="prevAchievement"/>
        <q-btn icon="chevron_right" @click="nextAchievement"/>
      </div>
    </div>
    <div class="flex flex-center grid-flex q-mr-lg" style="gap: 20px">
      <ActiveChallengeCard />
      <ActiveChallengeCard />
      <ActiveChallengeCard />
      <ActiveChallengeCard />
    </div>

  </q-card>
</template>

<script>

import ActiveChallengeCard from 'components/user/ActiveChallengeCard.vue';

export default {
  name: 'ActiveChallengesCard',
  components: {ActiveChallengeCard},
}
</script>

<style scoped>

.grid-flex {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-gap: 20px;
}

@media (max-width: 768px) {
  .grid-flex {
    display: flex;
    flex-wrap: wrap;
    margin: 16px;
  }
}

</style>
