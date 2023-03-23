<template>
  <div class="user-profile-page">
    <div class="user-profile-flex">
      <div class="profile-info-card">
        <ProfileInfoCard/>
      </div>
      <div class="achievements-card">
        <AchievementsCard/>
      </div>
      <div class="activity-card">
        <ActivityCard/>
      </div>
      <div class="active-challenges-card">
        <ActiveChallengesCard/>
      </div>
    </div>
  </div>
</template>

<script>

import ProfileInfoCard from 'src/components/user/ProfileInfoCard.vue'
import AchievementsCard from 'src/components/user/AchievementsCard.vue'
import ActivityCard from 'src/components/user/ActivityCard.vue'
import ActiveChallengesCard from 'src/components/user/ActiveChallengesCard.vue'

export default {
  name: 'UserProfilePage',
  components: {
    ProfileInfoCard,
    AchievementsCard,
    ActivityCard,
    ActiveChallengesCard,
  },
}
</script>

<style scoped>

div {
  width: 100%;
}

.user-profile-flex {
  display: grid;
  grid-template-columns: 70% 30%;
  grid-gap: 20px;
  margin: 16px;
}

@media (max-width: 768px) {
  .user-profile-flex {
    display: flex;
    flex-wrap: wrap;
    margin: 16px;
  }
}

</style>
