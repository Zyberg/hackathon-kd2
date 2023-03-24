<template>
  <div>
    <q-input v-model="search" label="Search" dense outlined/>
    <div class="flex justify-start">
      <div class="q-mt-md" v-for="challenge in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]" :key="challenge">
        <ChallengeCard/>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue'
import ChallengeCard from "components/challenges/ChallengeCard.vue";
import { useRouter } from 'vue-router'


export default {
  name: 'ChallengesList',
  components: {
    ChallengeCard,
  },
  setup() {
    const search = ref('')
    const page = ref(1)
    const pageSize = 20 // number of challenges per page
	const router = useRouter();

    const challenge = {
      title: 'RUN PUMA Fueled By NITRO 42km',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      isActive: true,
      unitId: 0,
      type: 'Running'
    };

    // const numPages = computed(() =>
    //   Math.ceil(challenges.length / pageSize)
    // )

    return {
      search,
      page,
      challenge,
      // numPages,
    }
  },
}

</script>
