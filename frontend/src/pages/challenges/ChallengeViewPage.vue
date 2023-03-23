<template>
  <div class="q-ma-lg">
    <div class="challenge-header">
      <q-parallax style="border-radius: 24px" :src="challenge.image">
        <h3 class=" challenge-title image-header">
          {{ challenge.name }}
        </h3>
      </q-parallax>
    </div>
    <div class="q-mb-lg">
      <div>
        <h4 class="q-mt-lg q-mb-sm">Description</h4>
        <body1 class="challenge-description">{{ challenge.description }}</body1>
      </div>
      <div>
        <h4 class="q-mt-lg q-mb-sm">Goal</h4>
        <body1 class="challenge-description">{{ challenge.goal }}</body1>
      </div>
      <div>
        <q-btn disable class="primary-button" style="width: 100%" label="Join Challenge"/>
        <q-btn class="secondary-button" style="width: 100%" label="Leave Challenge"/>
      </div>
      <div>
        <h6 class="q-mt-lg q-mb-sm">Leaderboard</h6>
        <LeaderboardTable :challengers="challengers"/>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue'
import LeaderboardTable from "components/LeaderboardTable.vue";

export default {
  name: 'ChallengeViewPage',
  components: {LeaderboardTable},
  props: {
    challenge: {
      type: Object,
      default: () => ({
        name: 'RUN PUMA Fueled By NITRO 42km',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        isActive: true,
        unitId: 0,
        type: 'Running',
        goal: '42km',
        image: 'https://dgalywyr863hv.cloudfront.net/challenges/3667/3667-cover.png',
        leaderboard: [
          {rank: 1, name: 'Alice', distance: 42},
          {rank: 2, name: 'Bob', distance: 38},
          {rank: 3, name: 'Charlie', distance: 30},
        ],
      }),
    },
  },
  setup(props) {
    //TODO getChallengers and their info
    const challengers = ref([
      {
        name: 'Jane',
        surname: 'Smith',
        points: 15,
        units: 500,
      },

      {
        name: 'Mark',
        surname: 'Johnson',
        points: 30,
        units: 1200,
      },
      {
        name: 'Sarah',
        surname: 'Lee',
        points: 10,
        units: 800,
      }
    ])
    const leaderboard = ref(props.challenge.leaderboard)

    return {
      challengers,
      leaderboard,
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
