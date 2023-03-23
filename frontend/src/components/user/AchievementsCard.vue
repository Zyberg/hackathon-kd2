<template>
  <q-card class="q-pa-md flex" style="height: 100%; flex-direction: column">
    <div class="flex flex-center justify-between">
      <div>
        <div>Achievements</div>
      </div>
      <div>
        <q-btn icon="chevron_left" @click="prevAchievement"/>
        <q-btn icon="chevron_right" @click="nextAchievement"/>
      </div>

    </div>
    <div class="achievements flex flex-center" style="gap: 20px">
      <AchievementCard />
      <AchievementCard />
    </div>
    <div>
    </div>


  </q-card>
</template>

<script>
import {reactive, ref} from 'vue';
import AchievementCard from 'components/user/AchievementCard.vue';

export default {
  name: 'AchievementsCard',
  components: {AchievementCard},
  props: {
    header: String,
    achievements: Array,
  },

  setup(props) {
    const activeIndex = ref(0);
    const achievementss = reactive([
      {
        title: 'Begimas',
        description: 'Daug bego'
      }
    ]);

    function prev() {
      activeIndex.value = activeIndex.value === 0 ? props.achievements.length - 1 : activeIndex.value - 1;
    }

    function next() {
      activeIndex.value = (activeIndex.value + 1) % props.achievements.length;
    }

    return {
      activeIndex,
      achievementss,
      prev,
      next,
    };
  },
};
</script>
