<template>
  <div>
    <q-chip
      v-if="isChallengeOngoing"
      color="green"
      text-color="white"
      label="Ongoing Challenge"
      icon="check_circle"
    />
    <q-chip
      v-if="isChallengeUpcoming"
      color="orange"
      text-color="white"
      label="Upcoming Challenge"
      icon="access_time"
    />
    <q-chip
      v-if="isChallengeEnded"
      color="red"
      text-color="white"
      label="Challenge Ended"
      icon="cancel"
    />
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { QChip } from 'quasar'

export default {
  components: {
    QChip,
  },
  props: {
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  setup(props) {
    const now = ref(new Date())

    const isChallengeOngoing = computed(() => {
      return props.startDate <= now.value && now.value <= props.endDate
    })

    const isChallengeUpcoming = computed(() => {
      return now.value < props.startDate
    })

    const isChallengeEnded = computed(() => {
      return now.value > props.endDate
    })

    return {
      now,
      isChallengeOngoing,
      isChallengeUpcoming,
      isChallengeEnded,
    }
  },
}
</script>
