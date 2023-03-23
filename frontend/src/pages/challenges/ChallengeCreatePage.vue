<template>
  <div class="q-pa-md">
    <h2>Create Sports Challenge</h2>
    <q-form @submit.prevent="submitChallenge">
      <q-input
        v-model="challengeName"
        label="Challenge Name"
        dense
        rounded
        outlined
        required
      />
      <q-date
        v-model="startDate"
        label="Start Date"
        dense
        rounded
        outlined
        required
      />
      <q-date
        v-model="endDate"
        label="End Date"
        dense
        rounded
        outlined
        required
      />
      <q-select
        v-model="activityType"
        label="Activity Type"
        dense
        rounded
        outlined
        options-dense
        required
        :options="activityTypes"
      />
      <q-input
        v-model.number="goalDistance"
        label="Goal Distance (miles)"
        type="number"
        dense
        rounded
        outlined
        required
      />
      <div class="q-mt-md">
        <q-btn type="submit" class="primary-button" label="Create Challenge" />
        <q-btn class="primary-button">TEXTAS</q-btn>
        <q-btn class="secondary-button">TEXTAS</q-btn>
        <q-checkbox modelValue="false" />
        <q-radio />
        <q-toggle />
      </div>
    </q-form>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const challengeName = ref('');
    const startDate = ref('');
    const endDate = ref('');
    const activityType = ref('');
    const goalDistance = ref('');

    const activityTypes = [
      {
        label: 'Running',
        value: 'Running',
      },
      {
        label: 'Cycling',
        value: 'Cycling',
      },
      {
        label: 'Swimming',
        value: 'Swimming',
      },
    ];

    const submitChallenge = () => {
      // Use the data to create a new challenge
      const newChallenge = {
        name: challengeName.value,
        startDate: startDate.value,
        endDate: endDate.value,
        activityType: activityType.value,
        goalDistance: goalDistance.value,
      };
      // You can use this data to make an API request to save the challenge
    };

    return {
      challengeName,
      startDate,
      endDate,
      activityType,
      goalDistance,
      activityTypes,
      submitChallenge,
    };
  },
};
</script>
