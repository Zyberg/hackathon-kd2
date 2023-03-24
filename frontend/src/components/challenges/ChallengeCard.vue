<template>
  <div class="q-pa-sm row items-start" style="width: 100%">
    <q-card class="my-card" bordered clickable @click="redirectToChallenge">
      <q-img
      :src="`http://127.0.0.1:9000/images/${challenge.image_path}`"></q-img>
      <q-card-section>
        <div class="text-h5 q-mt-sm q-mb-xs">{{ challenge.title }}</div>
        <StatusChip :start-date="new Date(challenge.startAt)" :end-date="new Date(challenge.endAt)"/>
        <div class="text-overline text-orange-9">{{ challenge.type }}</div>
        <div class="text-caption text-grey">
          {{ challenge.description }}
        </div>
      </q-card-section>

      <q-card-actions>
        <q-btn v-if="!challenge.isJoined || !challenge.isActive" class="primary-button" style="width: 100%" label="Join Challenge"/>
        <q-btn v-else class="secondary-button" style="width: 100%" label="View Challenge"/>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import {useRouter} from 'vue-router'
import StatusChip from './StatusChip.vue'

export default {
  name: 'ChallengeCard',
  components: {StatusChip},
  props: {
    challenge: {
      type: Object,
      default: () => ({
        image: 'https://dgalywyr863hv.cloudfront.net/challenges/3667/3667-cover.png',
        title: 'RUN PUMA Fueled By NITRO 42km',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        isActive: true,
        unitId: 0,
        type: 'Running',
        isJoined: false
      })
    },
  },
  setup(props) {
    const router = useRouter();

    function redirectToChallenge() {
      router.push(`/challenges/${props.challenge.id}`)
    }

    return {
      redirectToChallenge
    }
  }
}
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 350px;
}

.fontas {
  font-size: 14px !important;
  all: unset;
}
</style>
