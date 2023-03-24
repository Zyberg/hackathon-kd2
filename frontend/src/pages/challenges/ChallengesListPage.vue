<template>
  <div>
    <!-- <q-input v-model="search" label="Search" dense outlined/> -->
    <div class="flex justify-start">
      <div class="q-mt-md" v-for="challenge in challenges" :key="challenge.id">
        <ChallengeCard :challenge="challenge"/>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import ChallengeCard from "components/challenges/ChallengeCard.vue";
import { useRouter } from 'vue-router'
import { api } from 'src/boot/axios';


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

    const challenges = ref([]);

    onMounted(async () => {
      challenges.value = await api.challenges.getAllChallenges().then(d => d.data.data)
    })


    // const numPages = computed(() =>
    //   Math.ceil(challenges.length / pageSize)
    // )

    return {
      search,
      page,
      challenges,
      // numPages,
    }
  },
}

</script>
