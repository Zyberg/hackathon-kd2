<template>
  <div class="q-ma-lg" v-if="!!challenge">
    <StatusChip style="width: 100%" class="full-width" :start-date="new Date(challenge.startAt)" :end-date="new Date(challenge.endAt)"/>
    <div class="challenge-header">
      <q-parallax style="text-align: center;border-radius: 24px" :src='challenge.image_path != "" ? `http://localhost:9000/images/${challenge.image_path}` : "https://dgalywyr863hv.cloudfront.net/challenges/3667/3667-cover.png"'>
        <h3 v-if="challenge.title" class=" challenge-title image-header">
          {{ challenge.title }}
        </h3>
      </q-parallax>
    </div>
    <div class="q-mb-lg">
      <div v-if="challenge.description">
        <h4 class="q-mt-sm q-mb-sm">Description</h4>
        <div v-html="challenge.description" class="challenge-description"></div>
      </div>
      <div v-if="challenge.goal">
        <h4 class="q-mt-lg q-mb-sm">Goal</h4>
        <body1 class="challenge-description">{{ challenge.goal }}</body1>
      </div>
      <div v-if="challenge.startAt">
        <h4 class="q-mt-lg q-mb-sm">Starts at</h4>
        <body1 class="challenge-description">
          {{ challenge.startAt }}
        </body1>
      </div>
      <div v-if="challenge.endAt">
        <h4 class="q-mt-lg q-mb-sm">Ends at</h4>
        <body1 class="challenge-description">
          {{ challenge.endAt }}
        </body1>
      </div>
      <div v-if="challenge.goalCount">
        <h4 class="q-mt-lg q-mb-sm">Goal</h4>
        <body1 class="challenge-description">
          {{ challenge.goalCount }}
        </body1>
      </div>
      <div v-if="challenge.type">
        <h4 class="q-mt-lg q-mb-sm">Type</h4>
        <body1 class="challenge-description">
          {{ challenge.type }}
        </body1>
      </div>
      <div>
        <q-btn v-if="!isUserJoined" class="primary-button" style="width: 100%" label="Join Challenge" @click="onJoinChallenge" />
        <q-btn v-else class="secondary-button" style="width: 100%" label="Leave Challenge" @click="onLeaveChallenge" />
      </div>
      <div>
        <h6 class="q-mt-lg q-mb-sm">Leaderboard</h6>
        <LeaderboardTable :challengers="challengers" />
      </div>
    </div>
  </div>
</template>


<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import LeaderboardTable from "components/LeaderboardTable.vue";
import { api } from "../../boot/axios"
import { useAuthState } from '@vueauth/core'
import StatusChip from 'src/components/challenges/StatusChip.vue'

export default {
  name: 'ChallengeViewPage',
  components: { LeaderboardTable, StatusChip },
  setup(props) {
    //TODO getChallengers and their info
    const challengers = ref([])
    const leaderboard = ref({})
    const route = useRoute()

    const { user } = useAuthState();

    const isUserJoined = ref(false);

    const challenge = ref(null)
    onMounted(async () => {
      const id = route.params.id;
      if (id) {
        challenge.value = await api.challenges
          .getChallengeById(id)
          .then((r) => ({ ...r.data, image: 'https://dgalywyr863hv.cloudfront.net/challenges/3667/3667-cover.png' }));

        const userChallenges = await api.users.getUserChallenges(user.value.id).then(r => r.data.challenges)

        isUserJoined.value = userChallenges.some(i => i.id === +id)

        const unit = challenge.value.unit.title

        challengers.value = challenge.value.participants.map(p => ({
          name: p.user.name,
          points: p.userPoints.length !== 0 ? p.userPoints[p.userPoints.length - 1].value : 0,
          unit
        }))

      }
    })

    async function onJoinChallenge() {
      const res = await api.challenges.join(route.params.id, user.value.id)
      location.reload();
    }

    async function onLeaveChallenge() {
      const res = await api.challenges.leave(route.params.id, user.value.id)
      location.reload();
    }

    return {
      challenge,
      isUserJoined,
      challengers,
      leaderboard,
      onJoinChallenge,
      onLeaveChallenge
    }
  },
}
</script>

<style scoped>
.img {
  opacity: 0.7;
}

.image-header {
  padding: 12px;
  color: #312939;
  background-color: rgba(245, 245, 245, 0.93);
  border-radius: 14px
}

.challenge-header {
  display: flex;
  justify-content: center;
  align-items: center;
}

.challenge-description {
  margin-bottom: 1em;
}

.my-card {
  margin-top: 1em;
}
</style>
