<template>
    <div class="q-pa-md">
      <h2>{{ editMode ? 'Edit challenge' : 'Create challenge' }}</h2>
      <q-form @submit.prevent="submitChallenge">
        <q-input v-model="challenge.title" label="Challenge title" dense rounded outlined required />
        <q-input v-model="challenge.description" label="Challenge description" dense rounded outlined required />
        <q-toggle label="isActive" color="pink" :true-value="false" :false-value="true" v-model="challenge.isActive"></q-toggle>
        <!-- change to select when there will be unit enums -->
        <q-input v-model="challenge.unitId" label="unit id" type="number" dense rounded outlined required />
        <q-date v-model="challenge.startAt" label="Start Date" dense rounded outlined required />
        <q-date v-model="challenge.endAt" label="End Date" dense rounded outlined required />
        <!-- <q-select
          v-model="activityType"
          label="Activity Type"
          dense
          rounded
          outlined
          options-dense
          required
          :options="activityTypes"
        /> -->
        <q-select v-model="challenge.type" label="Challenge Type" dense rounded outlined options-dense required
          :options="challengeTypes" />
        <q-input v-model.number="challenge.goalCount" label="Goal Distance (miles)" type="number" dense rounded outlined required />
        <div class="q-mt-md">
          <q-btn type="submit" class="primary-button">{{ editMode ? 'Save challenge Group' : 'Create challenge' }}</q-btn>
        </div>
      </q-form>
    </div>
  </template>
  
  <script>
  import { api } from 'src/boot/axios';
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router'
  
  export default {
    setup() {
      const route = useRoute();
  
      const challenge = ref({
        isActive: true,
        isComplete: false,
        title: '',
        description: '',
        unitId: 1,
        startAt: '2023-03-25T10:38:23.277Z',
        endAt: '2023-03-25T10:38:23.277Z',
        goalCount: 0,
        type: "GoalMax",
        parentId:	null,
        id: null,
      })
  
      const editMode = ref(false);
  
  
      // const activityTypes = [
      //   {
      //     label: 'Running',
      //     value: 'Running',
      //   },
      //   {
      //     label: 'Cycling',
      //     value: 'Cycling',
      //   },
      //   {
      //     label: 'Swimming',
      //     value: 'Swimming',
      //   },
      // ];
  
      const challengeTypes = [ 'GoalMax', 'GoalCount' ]
  
  
      const submitChallenge = () => {
        challenge.value.startAt = new Date(challenge.value.startAt).toISOString()
        challenge.value.endAt = new Date(challenge.value.endAt).toISOString()
        challenge.value.unitId = +challenge.value.unitId
        if(route.params.id){
          api.challenges.update(route.params.id, challenge.value)
        } else {
          api.challenges.create(challenge.value)
        }
      };
  
      onMounted(async () => {
  
        const id = route.params.id;
        if (id) {
          editMode.value = true;
          challenge.value = await api.challenges.getChallengeById(id).then(r => r.data)
          const a = new Date(challenge.value.startAt)
          
        }
      })
  
      return {
        // activityType,
        // activityTypes,
        challenge,
        challengeTypes,
        submitChallenge,
        editMode,
      };
    },
  };
  </script>
  